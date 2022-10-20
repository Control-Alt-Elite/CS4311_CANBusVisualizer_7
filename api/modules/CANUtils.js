var spawn = require('child_process').spawn;
var counter = 0;

const emitSSE= (res, id, raw, decoded) =>{
    res.write('id: ' + id + '\n');
    res.write(`data: {"raw": "${raw}", "decoded": "${decoded}"}`);
    res.write("\n\n");
  }

module.exports = (req,res) => {
    res.writeHead(200, { "Content-Type": "text/event-stream",
                         "Cache-control": "no-cache",
                         'Connection': 'keep-alive'});
    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1fffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = spawn('candump -t a', ['vcan0,9803FEFE:1fffffff | python3 -m cantools decode --single-line ./dbc-files/j1939.dbc' ], {shell: true});
    //str = '';
    child.stdout.on('data', function (data) {
        str= ''
        str = data.toString() + '\n';
        var lines = str.split("\n");

        for(var i in lines) {
            raw ='';
            raw = lines[i].split("::");
            emitSSE(res, i, raw[0], raw[1]);
        }
        
        //console.log();
        //emitSSE(res,counter,packet[1])
        /*
        for(var i in packet) {
            raw ='';
            raw = packet[i].split("::",1);
            emitSSE(res, i, raw[0]);
        }
        */
        /*
        str += data.toString() + '\n';
        // just so we can see the server is doing something, (not necessary)
        //console.log("data");
        // Flush out line by line.
        var lines2 = str.split("\n");
        lines1 = lines2.toString();

        var lines = lines1.split("::");
        
        //res.write(`raw: ${lines[0]}\n\n`)
        for(var i = 0; i < lines.length; i += 2) {
            // Note: The double-newline is *required*x
            //res.write('data: ' + lines[i] + "\n\n");*/
        //counter++;
        
        //res.write(`data:${data}\n\n`);
            
        //}
    });
    /*
    // Reading packets from candump (terminal)
    child.stdout.on('data',function (data) {
        console.log(`${data}`);
    });
    */
    child.on('close', function (code) {
    res.end(str);
    });

    child.stderr.on('data', function (data) {
    res.end('stderr: ' + data);
    });

}
