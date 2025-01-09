const User = require('../Models/UserSchema');
const { GenerateContent } = require('../Ai');
const { GenerateHtmlFile } = require('../GenerateFile');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const { default: axios } = require('axios');

// Ensure the MyFiles folder exists
const ensureFolderExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const GenerateWebsite = async (req, res) => {
    const Uid = req.params.id;
    const prompt = req.body.prompt;
    const myFilesPath = path.join(__dirname, '..', 'MyFiles');

    try {
        ensureFolderExists(myFilesPath);

        const creator = await User.findById(Uid);
        if (!creator) return res.status(404).json("User Not Found!");
        let fileCode = await GenerateContent(prompt);
        const Htmlfile = GenerateHtmlFile(fileCode, myFilesPath); // Pass the directory path
        res.status(200).json({ Htmlfile, fileCode });
    } catch (error) {
        console.error('Error generating website:', error);
        res.status(500).send('Error generating website.');
    }
};



const DownloadZipFile = async (req, res) => {
    try {
        const fileName = req.body.filename;

        if (!fileName) {
            console.error('Filename not provided');
            return res.status(400).send('Filename is required.');
        }

        // Construct the full file path
        const myFilesPath = path.join(__dirname, '..', 'MyFiles');
        const filePath = path.join(myFilesPath, fileName);

        // Validate the file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            return res.status(404).send('File not found.');
        }

        const zipFileName = `download.zip`;
        const zipFilePath = path.join(myFilesPath, zipFileName);

        // Create a writable stream for the ZIP file
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Listen for archive errors
        archive.on('error', (err) => {
            console.error('Error creating ZIP:', err);
            return res.status(500).send('Error creating ZIP file.');
        });

        // Pipe the archive data to the writable stream
        archive.pipe(output);

        // Add the file to the archive
        archive.file(filePath, { name: path.basename(fileName) });

        // Finalize the archive
        await archive.finalize();

        // Ensure the stream closes properly
        output.on('close', () => {
            console.log(`ZIP file created successfully: ${zipFilePath}`);

            // Send the ZIP file as a response
            res.download(zipFilePath, zipFileName, (err) => {
                if (err) {
                    console.error('Error sending ZIP file:', err);
                }

                // Clean up the temporary ZIP file after sending
                fs.unlinkSync(zipFilePath);
            });
        });

        // Handle output stream errors
        output.on('error', (err) => {
            console.error('Write stream error:', err);
            res.status(500).send('Error writing ZIP file.');
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('An error occurred.');
    }
};

const  Token = process.env.Netlify_Token;

const deployHtmlToNetlify = async (req, res) => {
    try {
        const {filename , customSubDomain} = req.body.fromData;
        console.log(filename,customSubDomain)
        if(!filename){
            return res.status(400).json({error:"File Name is required"});
        }
        const myFilesPath = path.join(__dirname, '..', 'MyFiles');
        const filePath = path.join(myFilesPath,filename);

        if(!fs.existsSync(filePath)){
            return res.status(404).json({error:`File ${filename} does not exist`});
        }

        const fileContent = fs.readFileSync(filePath,"utf-8");

        //create a new site
        const siteRes =  await axios.post(
            "https://api.netlify.com/api/v1/sites",
            {},
            {
                headers:{
                    Authorization: `Bearer ${Token}`,
                },
            }
        )

        const siteId = siteRes.data.id;

        //deploye the content

        await axios.post(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
            {
              files: {
                [`index.html`]: fileContent, // The file will be deployed as `index.html`
              },
            },
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          let updateSiteRes;
          if(customSubDomain){   
                updateSiteRes =await axios.post(
                  `https://api.netlify.com/api/v1/sites/${siteId}`,
                  {
                      name: customSubDomain, // Set the custom subdomain
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        },
                    }
                )
            }
                
          res.status(200).json({
            message: "Deployed successfully",
            siteUrl: updateSiteRes.data.ssl_url,
          });

    } catch (error) {
        console.error("Error during deployment:", error.message);
    res.status(500).json({
      error: "Failed to deploy file",
      details: error.response ? error.response.data : error.message,
    });
    }
}


module.exports = {
    GenerateWebsite,
    DownloadZipFile,
    deployHtmlToNetlify
};
