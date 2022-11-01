var fs = require('fs');
var can = require('socketcan');
var channel = can.createRawChannel("vcan0", true);
// This opens up the writeable stream to `output`
//var writeStream = fs.createWriteStream('./raw/raw.pcap',{flags: 'a'});
var spawn = require('child_process').spawn;

channel.start();

//This function emulates candump -L 
function toHex(number) {
  return ("00000000" + number.toString(16)).slice(-8);
}

function dumpPacket(msg) {
  var writeStream = fs.createWriteStream('./packets/raw.pcap',{flags: 'a'});
  let data = '(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ')  ' + 'vcan0  ' +
  toHex(msg.id).toUpperCase() + '  [8]  ' + msg.data.toString('hex').toUpperCase() + '\r\n';
  writeStream.write(data); //This works perfectly to write the stream on a file
  writeStream.end();

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log(err);
  });
}

//Writing raw packets to file
channel.addListener("onMessage", dumpPacket);

function Decode() {

  //var out = fs.createWriteStream('./raw/decoded.pcap',{flags: 'a'});
  const out = fs.openSync('./packets/decoded.pcap','a');
  
  var readStream = fs.createReadStream('./packets/raw.pcap');
  var child = spawn('python3 -m', ['cantools decode --single-line dbc-files/client-j1939.dbc'],{shell: true, detached: true, stdio: ['pipe',out, 'pipe']});
  child.unref();
  //console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
  //toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase());


  /* This work but memory go high as many child are open stdio: ['pipe, 'pipe', 'pipe]
  child.stdin.write(data);
  
  child.stdout.on('data', function (data) {
        writeStream.write(data); //This works perfectly to write the stream on a file
        writeStream.end();
        console.log(data)
    });

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
      console.log(err);
  });*/

    // This will wait until we know the readable stream is actually valid before piping
  readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the child)
      readStream.pipe(child.stdin); //This work if I pipe to process.stdout
  });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
      console.log(err);
  });

  /*
    // Reading packets from candump (terminal output) If i use 'inherit' I cannot use chil.stdout
  child.stdout.on('data',function (data) {
      console.log(`${data}`);
  });
  
  /*
  //child.stdin.write(data); //This works
  child.stdout.on("data", (data) => {
    out.write(data);
    out.end();
  });

  //child.stdout.pipe(process.stdout,{end:false});
  // child.stdout.pipe(out);
  //process.stdin
  //child.once('exit', code => process.exit(code));
  //child.stdin.write(data); //This works
  //child.stdout.pipe(process.stdout);
  //child.stdout.pipe(out); //This works but not all lines are saved
  //writeStream.write(data); //This works perfectly to write the stream on a file
 // writeStream.end();
  //readStream.pipe(data); 
  //readStream.end();
  
  // Reading packets from candump (terminal output)
  child.stdout.on('data',function (data) {
    console.log(`${data}`);
  });
  
  child.stderr.on('data', function (data) {
    console.error(`stderr: ${data}`);
  });
  */
  child.on('exit', (code) => {
    //console.log(`child process exited with code ${code}`);
  });
  
  child.on('close', function (code, signal) {
    if(code !== 0){
    //console.log(`cantools process exited with code ${code}`);
    }
  });
  //child.kill('SIGTERM');
}

module.exports = {Decode};
