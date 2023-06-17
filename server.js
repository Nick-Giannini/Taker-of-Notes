const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const userNotes = require('./db/db.json');


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
app.get('/api/notes', (req, res) => {
    res.json(userNotes)

});

//Post route to add new entries to the db.jason
app.post('/api/notes', (req, res) =>{

    const{title,text}=req.body

    let newNote={
        title,
        text,
        id:uuid()
    }

    readAndAppend(newNote, './db/db.json');

});


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));