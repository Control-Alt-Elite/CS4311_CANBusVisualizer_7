var spawn = require('child_process').spawn;

const Player = () => {
    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1ffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = spawn('canplayer',['-I log-files/candump.log vcan0=vcan0 -v'], {shell: true, detached: true});
    child.unref();

    child.stdout.on('data', function (data) {
        console.log(`${data}`);
    });

    child.stderr.on('data', function (data) {
        console.error(`stderr: ${data}`);
    });

    child.on('exit', () => {
        console.log(`Done.`);
    });

    child.on('close', (code) => {
        console.log(`canplayer process closed with code ${code} \n`);
    });
}

//Run Player and send answer to parent
process.on('message', (message) => {
    if (message == 'START') {
      Player();
      let message = "Playing Packets...";
      process.send(message);
    } 
});