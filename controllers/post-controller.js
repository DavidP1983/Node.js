// Модель
const Post = require('../models/post');
//Путь к файлу
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: "Error" })
}


//all posts
const getPosts = (req, res) => {
    const title = 'Posts';

    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath("posts"), { posts, title }))
        .catch((error) => handleError(res, error));
}

//single post
const getPost = (req, res) => {
    const title = 'Post';

    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath("post"), { post, title }))
        .catch((error) => handleError(res, error));

}

// Form Page
const addPost = (req, res) => {
    const title = 'New Post'
    res.render(createPath("add-post"), { title })
}
// Create New post
const getAddPost = (req, res) => {
    const { title, text, author } = req.body;
    const post = new Post({ title, text, author })

    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => handleError(res, error));
}

// Delete one posts
const deletePost = (req, res) => {
    const title = 'Post';

    Post
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => handleError(res, error));
}


//Edit post
const getEditPost = (req, res) => {
    const title = 'Edit Post';

    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath("edit-post"), { post, title }))
        .catch((error) => handleError(res, error));

}

const putEditPost = (req, res) => {
    const { title, text, author } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, { title, text, author })
        .then((result) => res.redirect(`/posts/${id}`))
        .catch((error) => handleError(res, error));
}



module.exports = {
    getPosts,
    getPost,
    addPost,
    getAddPost,
    deletePost,
    getEditPost,
    putEditPost
};