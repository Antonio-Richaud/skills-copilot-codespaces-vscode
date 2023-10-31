// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');

// Create comment

router.post('/create', ensureAuthenticated, (req, res) => {

    // Get data from form
    const { comment, post_id } = req.body;

    // Create comment
    Comment.create({
        comment,
        post_id,
        user_id: req.user.id
    })
        .then(comment => {
            res.redirect(`/posts/${post_id}`);
        })
        .catch(err => console.log(err));
}
);

// Delete comment

router.delete('/delete/:id', ensureAuthenticated, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(comment => {
            res.redirect('back');
        })
        .catch(err => console.log(err));
}
);

