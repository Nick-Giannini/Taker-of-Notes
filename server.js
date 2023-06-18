const express = require('express');
const userNotes = require('./db/db.json');
const path = require('path');
// const userAPI = require('./routes/')
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend }=require('./helpers/fsUtils')
const app = express();
const PORT = process.env.PORT || 3001;


//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('db'));
// app.use('/api', userAPI)


//helper method
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
    fs.readFile('./db/db.json', 'utf-8' ,(err,file)=>{
        if(err){
            throw err;
        }
        res.json(JSON.parse(file));
    })
});



// Post route to add new entries to the db.jason
app.post('/api/notes', (req, res) =>{
    const{title,text}=req.body
    let newNote={
        title,
        text,
        id:uuid()
    }
    readAndAppend(newNote, './db/db.json');
    readFromFile('./db/db.json', 'utf-8')
    .then(notes=>res.json(notes))
    .catch(err=>console.log(err))

});

app.delete('/api/notes/:id', (req,res)=>{
    const { id }= req.params
    readFromFile('./db/db.json', 'utf-8')
        .then(notes =>{
            const newNotes=JSON.parse(notes).filter(note=>note.id !== id)
            writeToFile('./db/db.json', newNotes)
            res.json(newNotes);

        })
        .catch(err => console.log(err))

})



app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));