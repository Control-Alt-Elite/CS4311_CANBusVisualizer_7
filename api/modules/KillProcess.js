var spawn = require('child_process').spawn;

function killProcess (pid) {
    var child = spawn('kill',['-9', pid], {detached: true});
    child.unref();

    child.stderr.on('data', function (data) {
        console.error(`stderr: ${data}`);
    });

    child.on('exit', () => {
        console.log(`Done.`);
    });

    child.on('close', (code) => {
        console.log(`cangen process closed with code ${code} \n`);
    });
}
module.exports = {killProcess}