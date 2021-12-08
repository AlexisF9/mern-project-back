const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs'); // file system
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
}

module.exports.createPost = async (req, res) => {

    let fileName;

    // add picture
    if(req.file !== null) {
        try { // verif format img + taille
            if(req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") {
                throw Error('Invalid file');
            }
            if(req.file.size > 500000) {
                throw Error("Max size")
            }
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({errors});
        }
    
        fileName = req.body.posterId + Date.now() + '.jpg'; // le nom de l'image est l'id du poster + la date du post

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "", // réccupération de l'img si elle existe
        video: req.body.video,
        likers: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    let isUpdate = null;
    
    try{
        isUpdate = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$set: {message: req.body.message}},
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
        res.status(201).send(isUpdate)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }
  
    try {
      await PostModel.remove({_id: req.params.id}).exec();
      res.status(200).json({message: "Post successfully deleted."})
    } catch (err) {
      return res.status(500).json({message : err});
    }
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    let isLike = null;

    try {
        // add user like to likers
        isLike = await PostModel.findByIdAndUpdate(
            req.params.id, // id du post qui est liké
            {$addToSet: {likers: req.body.id}}, // on ajoute l'id de la personne qui a like, au tab des likers
            {new: true}
        );
        // add like in likes
        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id } } // id de la personne qui like
        );
        res.status(201).json(isLike)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    let isUnLike = null;

    try {
        // add user like to likers
        isUnLike = await PostModel.findByIdAndUpdate(
            req.params.id, // id du post qui est liké
            {$pull: {likers: req.body.id}}, // on ajoute l'id de la personne qui a like, au tab des likers
            {new: true}
        );
        // add like in likes
        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id } } // id de la personne qui like
        );
        res.status(201).json(isUnLike)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
