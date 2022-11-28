var spawn = require('child_process').spawn;
const axios = require('axios');
const { execFile } = require('node:child_process');

function player(){
    /*
    //Format project information
    function formatResponse(res) {
        var value = JSON.parse(res);
        return value['fileName'];
    }
    
    //Get all files names from database
    async function getAllFileNames() {
        try {
        const res = await axios.get('http://localhost:3001/project/file'); //Necesito corregir esta parte
        console.log(res.data);
        }catch (err) {
            console.error("Error Parsing Data");
        }
    };
    getAllFileNames(); */

    //We can use candump filters e.g. 'candump vcan0,9803FEFE:1ffffff' (extended version 29-bits) or 201:7ff (11-bit)
    var child = execFile('canplayer',['-I', 'log-files/test.log', 'vcan0=vcan0', '-v']);

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

module.exports = {player}