const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

const multer = require('multer'); // lib d'upload d'image (bien mettre la v2)
const upload = multer();

// AUTH
router.post("/register", authController.signUp);
// POST
// http://localhost:5000/api/user/register
// "pseudo:" "",
// "email": "",
// "password": ""

router.post("/login", authController.signIn);
// POST
// http://localhost:5000/api/user/login
// "email": "",
// "password": ""

router.get("/logout", authController.logout);
// GET
// http://localhost:5000/api/user/logout
// "email": "",
// "password": ""



// USER
router.get('/', userController.getAllUsers);
// GET
// http://localhost:5000/api/user/

router.get('/:id', userController.userInfo);
// GET
// http://localhost:5000/api/user/:id

router.put('/:id', userController.updateUser);
// PUT
// http://localhost:5000/api/user/:id
// "bio": "ex bio"

router.delete('/:id', userController.deleteUser);
// DELETE
// http://localhost:5000/api/user/delete/:id

router.patch("/follow/:id", userController.follow);
// PATCH
// http://localhost:5000/api/user/follow/:id
// "idToFollow": ":id"

router.patch("/unfollow/:id", userController.unfollow);
// PATCH
// http://localhost:5000/api/user/unfollow/:id
// "idToUnFollow": ":id"


// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router;