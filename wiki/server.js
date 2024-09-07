const express = require('express');
const app = express();
const port = process.env.PORT || 80;

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
