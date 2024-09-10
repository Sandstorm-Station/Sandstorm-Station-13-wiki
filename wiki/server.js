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

//### Define routes ###
// List of page paths
const pages = [
'/', 
'test',
];

// Dynamically generate routes based on the pages list
pages.forEach((page) => {
    app.get(page === '/' ? '/' : `/${page}`, (req, res) => {
        res.render(page === '/' ? 'index' : page, { content: res.locals.content, lang: res.locals.lang });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle 404 errors (page not found)
app.use((req, res) => {
    res.status(404).render('error', { content: res.locals.content, lang: res.locals.lang, error: "404" });
});

// Handle other errors (500 and others)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { content: res.locals.content, lang: res.locals.lang, error: err });
});
