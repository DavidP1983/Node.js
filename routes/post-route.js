const express = require('express');
const router = express.Router();

const {
    getPosts,
    getPost,
    addPost,
    getAddPost,
    deletePost,
    getEditPost,
    putEditPost
} = require('../controllers/post-controller');


//all posts
router.get('/posts', getPosts);


//single post
router.get('/posts/:id', getPost);

// Form Page
router.get('/add-post', addPost);

// Create New post
router.post('/add-post', getAddPost);

// Delete one posts
router.delete('/posts/:id', deletePost);

//Edit post
router.get('/edit/:id', getEditPost);

router.put('/edit/:id', putEditPost);

module.exports = router;

