const express = require('express');
const router = express.Router();


const {
    getPosts,
    getPost,
    getAddPost,
    deletePost,
    putEditPost
} = require('../controllers/api-post-controller');

// Get All routes
router.get('/api/posts', getPosts);

// Add new routes
router.post('/api/post', getAddPost);

// Get Post by ID
router.get('/api/post/:id', getPost);

// Delete Post by ID
router.delete('/api/post/:id', deletePost);

// Update Post by ID
router.put('/api/post/:id', putEditPost);



module.exports = router;

