const router = require('express').Router();
const postController = require('../controllers/post.controller');

const multer = require('multer'); // lib d'upload d'image (bien mettre la v2)
const upload = multer();

router.get('/', postController.readPost);

router.post('/', upload.single('file'), postController.createPost);
// POST
// http://localhost:5000/api/post
// "posterId:" "",
// "message": "",

router.put('/:id', postController.updatePost);
// PUT
// http://localhost:5000/api/post/:id
// "message": "ex message"

router.delete('/:id', postController.deletePost);
// DELETE
// http://localhost:5000/api/post/:id

router.patch("/like-post/:id", postController.likePost);
// PATCH
// http://localhost:5000/api/post/like-post/:id
// "id": "id de la personne qui like"

router.patch("/unlike-post/:id", postController.unlikePost);
// PATCH
// http://localhost:5000/api/post/unlike-post/:id
// "id": "id de la personne qui unlike"


module.exports = router;