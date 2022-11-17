var fs = require('fs');
var spawn = require('child_process').spawn;
const { fork } = require('child_process');

function emitSSE(res, index, time, can, id, dt1, dt2, dt3, dt4, dt5, dt6, dt7, dt8, ecu, values) {
    res.write('id:' + index + '\n');
    res.write(`data: {"time": "${time}", "can": "${can}", "id": "${id}", "dt1": "${dt1}", "dt2": "${dt2}", "dt3": "${dt3}", "dt4": "${dt4}", "dt5": "${dt5}", "dt6": "${dt6}", "dt7": "${dt7}", "dt8": "${dt8}", "ecu": "${ecu}", "values": "${values}"}`);
    res.write("\n\n");
}

  module.exports = (req,res) => {
    //Kill all running previous child/sub-processes if any
    var cleanExit = function() { process.exit() };
    process.on('SIGINT', cleanExit); // catch ctrl-c
    process.on('SIGTERM', cleanExit);
    console.log("Killing zombies processes");

    res.writeHead(200, {"Access-Control-Allow-Origin": "*",
                        "Content-Type": "text/event-stream",
                        "Cache-control": "no-cache",
                        "Connection": "keep-alive"});
    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1ffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = spawn('candump -t a -T 40000', ['vcan0 | python3 -m cantools decode --single-line dbc-files/client-j1939.dbc'], {shell: true, detached: true});
    child.unref();
    console.log("candump running...");
    var writeStream = fs.createWriteStream('./log-files/playdecoded.pcap',{flags: 'w'});
    counter = 0;

    //Initializing child Player to replay packets
    let signal = 'START'
    const grandchild = fork(__dirname + '/Player');

    grandchild.on('message', (message) => {
        console.log(message);
    });
  
    grandchild.send(signal);
    
    //Writing to file
    child.stdout.on('data', function (data) {
        writeStream.write(data); //This works perfectly to write the stream on a file
        writeStream.end();
    });
    
    //Format string and send it to /logs page
    child.stdout.on('data', function (data) {
        str = ''
        str = data.toString() + '\n';
        var lines = str.split("\n");
        var clines = lines.filter(element => {
            return element !== '';
          });
        for(var i in clines) {
            counter++;
            packet ='';
            packet = clines[i].split("::");
            raw = packet[0].trim().replace(/\s+/g, '*');
            decode = packet[1].trim().split(/(?=\()/g);
            const chars = {'(':'{',')':'}'};
            values = decode[1].replace(/[\(\)]/g, m=>chars[m]);
            frame = '';
            frame = raw.split("*");
            emitSSE(res, counter, frame[0], frame[1], frame[2], frame[4], frame[5], frame[6], frame[7], frame[8], frame[9], frame[10], frame[11], decode[0], values);   
        }
    });
    
    /*
    // Reading packets from candump (terminal output)
    child.stdout.on('data',function (data) {
        console.log(`${data}`);
    });
    */
    child.stderr.on('data', function (data) {
        console.error(`stderr:  ${data}`);
    });

    child.on('error', (error) => {
        console.error(`error: ${error.message}`);
      });

    child.on('exit', () => {
        res.write('event: close\n');
        res.write('data: finished');
        res.write('\n\n');
        console.log(`candump terminated after 40 secs without any packets reception`);
      });

    child.on('close', () => {
        console.log(`Decode Replay packets process finished`);
    });
}