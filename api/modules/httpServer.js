const HTTPPORT = 8080
const http = require('http');

const requestListener = function (req, res) {

    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>HTTP Server home Page.</p></body></html>');
        res.end();  
    }

    else if (req.url == "/raw") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Raw Packets Page.(Not implemented)</p></body></html>');
        res.end();
        
    }
    else if (req.url == "/decoded") {
        
        res.writeHead(200, { "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream",
        "Cache-control": "no-cache",
        'Connection': 'keep-alive'});
    }
    else
        res.end('Invalid Request!');
}

const server = http.createServer(requestListener);
server.listen(HTTPPORT);