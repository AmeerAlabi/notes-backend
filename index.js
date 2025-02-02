const bodyParser = require('body-parser');
const express = require('express');


const app = express();
app.use(bodyParser.json());


let notes  = [];
let idCounter = 1;

const port = 3000

// post
app.post('/notes' , (req , res) => {

    const {title , content} = req.body
    if (!title || !content) {
        return res.status(400).json({error : 'Title and content are required'});
    }

    const note = { id: idCounter++ , title , content };
    notes.push(note);
    res.status(201).json(note);

})

// get all notes

app.get('/notes' , (req, res) => {
    res.status(200).json(notes);
})

// get a note by id 
app.get('/notes/:id' , (req , res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === parseInt(id));
    if (!note) {
        return res.status(401).json({error : 'Note not found'});
        }
        res.status(200).json(notes);
})

// edit a note 
app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const { title, content } = req.body;

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(403).json({ error: 'Notes not found' });
    }

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    note.title = title;
    note.content = content;

    res.json(note);
});

// delete note
app.delete("/notes/:id", (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found." });
    }
    notes.splice(noteIndex, 1);
    res.status(204).send();
});



app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
});