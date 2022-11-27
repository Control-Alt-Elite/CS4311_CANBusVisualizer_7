
//import fs from "fs-extra";
const fs = require('fs-extra');
  
// TODO: test this with project folder on system and archive project folder
const path = require("path");

const Archive = async (src)=> {
    
    // Source file
    //const src} =req.body; 
    console.log("in archive.js: filepath:",src)
    //console.log("in archive.js ",req.body)
    //const src = "home/kali/TestProjectArchive/projecttest.txt";
    
    // Destination path
    const dest = "/home/kali/Archives";
    
    fs.copy(src, dest, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
    });
}
module.exports = Archive;
