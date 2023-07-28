// Create Web server application with Node.js
// Run the server and send a request to the port 3000
// Use the Postman to send a request to the server
// Use the Postman to check the response
// Use the Postman to check the headers of the response
// Use the Postman to check the body of the response
// Use the Postman to check the status of the response

// Import the required modules
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Comment, validate } = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find().sort('name');
    res.send(comments);
});

// Get a comment by id
router.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

// Create a comment
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    comment = await comment.save();
    res.send(comment);
});

// Update a comment
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }, { new: true });

    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    res.send(comment);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

module.exports = router;











