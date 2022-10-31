var Rsync = require('rsync');
 
// Build the command
var rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .source('/path/to/source')
  .destination('server:/path/to/destination');
 
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

  // execute with stream callbacks
  var rsyncPid = rsync.execute(
      function(error, code, cmd) {
          // we're done
      }, function(data){
          // do things like parse progress
      }, function(data) {
          // do things like parse error output
      }
  );