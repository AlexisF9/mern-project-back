const UserModel = require('../models/user.model');
const ObjectID = require("mongoose").Types.ObjectId;

// Get tout les users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password'); // dans le select en enlève le password pour qu'il n'apparaisse pas
    res.status(200).json(users);
}

// Get un user
// req.params : ce qui est passé dans l'url, ici on veut l'id donc req.params.id
module.exports.userInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id)) { // si l'id n'est pas connu
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    
    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) {
           res.send(docs); 
        } else {
            console.log('ID unknown : ' + err);
        }
 
    }).select('-password');
}

// Update
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }
    let isUpdate = null;
    try{
        isUpdate = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: {bio: req.body.bio} },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            
        );
        res.status(201).send(isUpdate)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Delete 
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    await UserModel.remove({_id: req.params.id}).exec();
    res.status(200).json({message: "Successfully deleted."})
  } catch (err) {
    return res.status(500).json({message : err});
  }
  
};

// follows
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
      return res.status(400).send("ID unknown : " + req.params.id);
    } else {
  
      let isFollow = null   

      try {
        // add to the follower list
        isFollow = await UserModel.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { following: req.body.idToFollow } } // id de la personne qui est suivi
        );
        // add to following list
        await UserModel.findByIdAndUpdate(
          req.body.idToFollow,
          { $addToSet: { followers: req.params.id } } // id de la personne qui suit
        );
        res.status(201).json(isFollow)
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
    
  };

  // Unfollow
module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    } else {
  
      let isUnFollow = null   

      try {
        // remove to the follower list
        isUnFollow = await UserModel.findByIdAndUpdate(
          req.params.id,
          { $pull: { following: req.body.idToUnFollow } } // id de la personne qui n'est plus suivi
        );
        // remove to following list
        await UserModel.findByIdAndUpdate(
          req.body.idToUnFollow,
          { $pull: { followers: req.params.id } } // id de la personne qui ne suit plus
        );
        res.status(201).json(isUnFollow)
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  
}

