const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 80;
const usecert = process.env.CERT  || false;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Middleware to set default language and load language files
const EN = require('./localization/en.json');
const PT = require('./localization/pt.json');

app.use((req, res, next) => {
    const lang = req.query.lang || 'en';
    res.locals.lang = lang;

    switch (lang) {
        case 'en':
            res.locals.content = EN;
            break;
        case 'pt':
            res.locals.content = PT;
            break;
        default:
            res.locals.content = EN; // Fallback to English if lang is not recognized
    }

    next();
});

// Define routes
app.get('/', (req, res) => {
    res.render('index', { content: res.locals.content, lang: res.locals.lang });
});

options = {};
// Read SSL certificate and key
if (usecert)
{
    options = {
        key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/certificate.crt'),
        ca: fs.readFileSync('./ssl/ca_bundle.crt')  // optional, depends on certificate provider
    };
}


// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server is running on https://localhost:${port}`);
});
