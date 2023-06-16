const express = require('express');
const app = express();
const PORT = 3001;
const userNotes = require('./db/db.json');
const path = require('path');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//helper methods
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');



// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

//Get Route for retrieve saved notes
app.get('/api/notes', (req, res) => res.json(userNotes));

// get('/', (req, res) => {
//     // console.info(`${req.method} request received for notes`);
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });





app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));