const express  = require('express');
const { GenerateWebsite,DownloadZipFile,deployHtmlToNetlify } = require('../Controllers/WebsiteController');
const route = express.Router();

route.post('/generate/:id',GenerateWebsite);
route.post('/downloadFile',DownloadZipFile);
route.post('/deployeOnNetlify',deployHtmlToNetlify)

module.exports = route;