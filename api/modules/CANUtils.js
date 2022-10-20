var spawn = require('child_process').spawn;

module.exports = (req,res) => {
    res.writeHead(200, { "Content-Type": "text/event-stream",
                            "Cache-control": "no-cache" });
    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1fffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = spawn('candump', ['vcan0,9803FEFE:1fffffff | python3 -m cantools decode ./dbc-files/j1939.dbc' ], {shell: true});
    str = '';
    lines1 = '';

    child.stdout.on('data', function (data) {
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

            res.write(`data: ${data}\n\n`); 
            
        //}
    });
    // Reading packets from candump (terminal)
    child.stdout.on('data',function (data) {
        console.log(`${data}`);
    });

    child.on('close', function (code) {
    res.end(str);
    });

    child.stderr.on('data', function (data) {
    res.end('stderr: ' + data);
    });

}
