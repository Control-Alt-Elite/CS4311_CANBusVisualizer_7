var Rsync = require('rsync');
 
// Build the command
var rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .source('./packets/decoded.pcap')
  .destination('kali@127.0.0.1:~/dbc-files/');

  // TODO: Update source and destination
 
// signal handler function
var quitting = function() {
    if (rsyncPid) {
      rsyncPid.kill();
    }
    process.exit();
  }
  process.on("SIGINT", quitting); // run signal handler on CTRL-C
  process.on("SIGTERM", quitting); // run signal handler on SIGTERM
  process.on("exit", quitting); // run signal handler when main process exits

  const emitSyncResponse = (res, success, syncStatus, message) =>{
    res.write(`data: {"response": "${success}", "syncStatus": "${syncStatus}", "message": "${message}"}`);
    res.write("\n\n");
  }

module.exports = (req,res) => {
    res.writeHead(200, {"Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"});
                        // execute with stream callbacks
  var rsyncPid = rsync.execute(
    function(error, code, cmd) {
      emitSyncResponse(res, true, cmd, error);
        // we're done
    }, function(data){
        // do things like parse progress
        emitSyncResponse(res, true, 'Syncing', data);

    }, function(data) {
        // do things like parse error output
    }
);
  }