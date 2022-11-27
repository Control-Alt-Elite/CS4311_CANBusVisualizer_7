
//import fs from "fs-extra";
const fs = require('fs-extra');
  
// Works: use fullpath, if both are folders copies contents of src folder into dest folder
// TODO: get to work with fs.move-errors enoent no such file
//works with moveSync but original files in dest
const path = require("path");

const Archive = async (src)=> {
    
    // Source file
    //const src} =req.body; 
    console.log("in archive.js: filepath:",src)
    
    // Destination path
    const dest = "/home/kali/Archives";
    
    fs.move(src, dest,{overwrite:true},(err) => {
        if (err) return console.log(err);
        console.log(`File archived successfully`);
    });
}
module.exports = Archive;
