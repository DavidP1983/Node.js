// Модель
const Post = require('../models/post');

const handleError = (res, error) => {
    res.status(500).send(error.message);

}


//all posts
const getPosts = (req, res) => {

    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handleError(res, error));
}

//single post
const getPost = (req, res) => {

    Post
        .findById(req.params.id)
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));

}


// Create New post
const getAddPost = (req, res) => {
    const { title, text, author } = req.body;
    const post = new Post({ title, text, author })

    post
        .save()
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
}

// Delete one posts
const deletePost = (req, res) => {

    Post
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error));
}

// Edit Post
const putEditPost = (req, res) => {
    const { title, text, author } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, { title, text, author }, { new: true })
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
}



module.exports = {
    getPosts,
    getPost,
    getAddPost,
    deletePost,
    putEditPost
};