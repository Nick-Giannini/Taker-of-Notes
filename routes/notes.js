const notesRouter = require('express').Router();
const notesData = require('../db/db.json')





// GET Route for notes page
notesRouter.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

//Get Route for retrieve saved notes
notesRouter.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, file) => {
        if (err) throw err;
        res.json(JSON.parse(file));
    })
});


module.exports = notesRouter;