const fs = require('fs');
const path = require('path');


const getUniqueFileName = ()=>{
  const timestamp = Date.now();
  const uniqueFileName = `file_${timestamp}.html`;
  return uniqueFileName;
}

const folderName = path.join(__dirname,'MyFiles');

const GenerateHtmlFile = (htmlData)=>{
  const uniqueFileName = getUniqueFileName();
  const filePath = path.join(folderName,uniqueFileName);
  fs.writeFile(filePath,htmlData,(err)=>{
    if(err) console.error(err);
    else console.log(`File created successfully at ${filePath}`);
  })
  return uniqueFileName;
}




module.exports = {
  GenerateHtmlFile
}