var fs = require('fs');
// This opens up the writeable stream to `output`
//var writeStream = fs.createWriteStream('./raw/raw.pcap',{flags: 'a'});

var spawn = require('child_process').spawn;

//This function emulates candump -L 
function toHex(number) {
    return ("00000000" + number.toString(16)).slice(-8);
}

function DataSaver(msg) {
  const out = fs.openSync('./raw/decoded.pcap','a');
  var writeStream = fs.createWriteStream('./raw/raw.pcap',{flags: 'a'});
  //var readStream = fs.createReadStream('./raw/raw.pcap');
  var child = spawn('python3 -m', ['cantools decode --single-line dbc-files/client-j1939.dbc'], {shell: true});
  child.unref();

    //This function emulates candump -L 
  function toHex(number) {
      return ("00000000" + number.toString(16)).slice(-8);
  }

  //console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
  //toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase());

  let data = '(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
      toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase() + '\n';

  writeStream.write(data);
  writeStream.end();
  //readStream.pipe(data); 
  //readStream.end();
  
  // Reading packets from candump (terminal output)
  child.stdout.on('data',function (data) {
    console.log(`${data}`);
  });
  
  child.stderr.on('data', function (data) {
    console.error(`stderr: ${data}`);
  });
  
  child.on('exit', (code) => {
    //console.log(`child process exited with code ${code}`);
  });

  child.on('close', function (code, signal) {
    if(code !== 0){
    //console.log(`cantools process exited with code ${code}`);
    }
  });

  child.kill('SIGTERM');
  
  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log(err);
  });
}

module.exports = {DataSaver};
