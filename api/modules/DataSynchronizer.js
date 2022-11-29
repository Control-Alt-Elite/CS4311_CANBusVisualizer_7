var Rsync = require('rsync');
var fs = require('fs');
const { exec, spawn } = require('child_process');

const syncPWPath = './sync/sync-data.txt';

// Creates secret file with pw for sync
function savePasswordToSecret(password) {
  return fs.writeFileSync('./sync/sync-data.txt', `${password}`, { flag: 'w+', mode: 400 });
}

module.exports = function (sync, req, res) {
  var syncFile = savePasswordToSecret(sync.password);

  // Rsync command spawned
  var rsyncCommand = `sshpass -p $(cat ./sync/sync-data.txt) rsync -ave ssh -o StrictHostKeyChecking=no -l root ${sync.senderFilePath} ${sync.username}@${sync.receiverIp}:${sync.receiverFilePath}`;
  var rsyncPid = spawn(rsyncCommand, [], { shell: true });

  // signal handler function
  var quitting = function () {
    if (rsyncPid) {
      rsyncPid.kill();
    }
    process.exit();
  }
  process.on("SIGINT", quitting); // run signal handler on CTRL-C
  process.on("SIGTERM", quitting); // run signal handler on SIGTERM
  process.on("exit", quitting); // run signal handler when main process exits

  const emitSyncResponse = (res, response, syncStatus) => {
    res.write(`data: {"response": "${response}", "syncStatus": "${syncStatus}"}`);
    res.write("\n\n");
  }


  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-control": "no-cache",
    "Connection": "keep-alive"
  });

  // Response from rsync command
  rsyncPid.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    emitSyncResponse(res, data, 'In progress');
  });

  rsyncPid.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    console.log(`stderr: ${data}`)
    emitSyncResponse(res, data, 'Incomplete');
  });

  rsyncPid.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    fs.unlink('./sync/sync-data.txt');
    emitSyncResponse(res, 'Data has been sent.', 'Complete');
  });
}
