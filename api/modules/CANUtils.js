var spawn = require('child_process').spawn;

const emitSSE= (res, id, raw, decoded) =>{
    res.write('id: ' + id + '\n');
    res.write(`data: {"raw": "${raw}", "decoded": "${decoded}"}`);
    res.write("\n\n");
  }

module.exports = (req,res) => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*",
                         "Content-Type": "text/event-stream",
                         "Cache-control": "no-cache",
                         'Connection': 'keep-alive'});
    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1ffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = spawn('candump -t a', ['vcan0,9803FEFE:ffffffff,80F02BFE:ffffffff,84F031FE:ffffffff,84F032FE:ffffffff,88F02CFE:ffffffff,88F02DFE:ffffffff,88F062FE:ffffffff,88F110FE:ffffffff,88FE6EFE:ffffffff,8C00FEFE:ffffffff,8C01FEFE:ffffffff,8C04FEFE:ffffffff,8C08FEFE:ffffffff,8C09FEFE:ffffffff,8C0AFEFE:ffffffff,8C0BFEFE:ffffffff,8C0DFEFE:ffffffff,8C1BFEFE:ffffffff,8C1CFEFE:ffffffff,8C1DFEFE:ffffffff,8C1EFEFE:ffffffff,8C99FEFE:ffffffff,8CD1FEFE:ffffffff,8CD2FEFE:ffffffff,8CF002FE:ffffffff,8CF003FE:ffffffff,8CF004FE:ffffffff,8CF00AFE:ffffffff,8CF00CFE:ffffffff,8CF00DFE:ffffffff,8CF013FE:ffffffff,8CF014FE:ffffffff,8CF015FE:ffffffff,8CF016FE:ffffffff | python3 -m cantools decode --single-line dbc-files/client-j1939.dbc'], {shell: true});
 
    child.stdout.on('data', function (data) {
        str= ''
        str = data.toString() + '\n';
        var lines = str.split("\n");

        for(var i in lines) {
            raw ='';
            raw = lines[i].split("::");
            emitSSE(res, i, raw[0], raw[1]);
        }
        
    });

    
    // Reading packets from candump (terminal output)
    child.stdout.on('data',function (data) {
        console.log(`${data}`);
    });
    
    child.stderr.on('data', function (data) {
    res.end('stderr: ' + data);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    
}
