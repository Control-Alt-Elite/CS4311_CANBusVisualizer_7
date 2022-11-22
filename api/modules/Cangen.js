var spawn = require('child_process').spawn;

const cangen = () => {
    const canString = 'vcan0 -e -L -g 1000 -v'
    var child = spawn('cangen', [canString], {shell: true, detached: true});
    child.unref();

    child.stdout.on('data', function (data) {
        console.log(`${data}`);
    });

    child.stderr.on('data', function (data) {
        console.error(`stderr: ${data}`);
    });

    child.on('exit', () => {
        console.log(`cangen exited.`);
    });

    child.on('close', (code) => {
        console.log(`cangen process closed with code ${code} \n`);
    });

}

//Run Player and send answer to parent
process.on('message', (message) => {
    if (message == 'START') {
      cangen();
      let message = "Starting Cangen...";
      process.send(message);
    } 
});
