const UserModel = require('../models/user.model');
const fs = require('fs'); // file system
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
    try { // format img + taille
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

    const fileName = req.body.name + '.jpg';

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    let isUpload = null;
    
    // on met le chamin dans la db
    try {
        isUpload = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {$set: {picture: "./uploads/profil/" + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
        res.status(201).send(isUpload);
    } catch (err) {
        return res.status(201).json(err);
    }
};