const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both

const User = require('./users-model');
const Post = require('../posts/posts-model');

// The middleware functions also need to be required


const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  //  Posts.insert(req.body)
  //   .then(post => {
  //     res.status(201).json(post);
  //   })
  //   .catch(next);
  console.log(req.user)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'The user has been deleted.'})
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, post_id: req.params.id };

  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(next);
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({ 
    customMessage: "Something tragic inside posts router happened", 
    message: err.message, 
    stack: err.stack 
  })
})

module.exports = router;
