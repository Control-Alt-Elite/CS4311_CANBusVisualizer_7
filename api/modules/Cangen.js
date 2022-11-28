var spawn = require('child_process').spawn;

function cangen(device){
    var child = spawn('cangen',[device, '-e', '-L', '8', '-g', '1000'], {detached: true});
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

    const pid = child.pid
    return pid;

}

module.exports = {cangen}