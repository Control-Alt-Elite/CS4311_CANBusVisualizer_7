var fs = require('fs');
import fs from "fs-extra";
  
// TODO: test this with project folder on system and archive project folder
const path = require("path");

const archive = async (req, res)=> {
    
    // Source file
    const src = "home/kali/TestProjectArchive/projecttest.txt";
    
    // Destination path
    const dest = "home/kali/Archives";
    
    fs.move(src, dest, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
    });
}
module.exports = archive;