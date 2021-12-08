const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
      pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true, //pseudo unique
        trim: true //supprime les espaces
      },
      email: {
        type: String,
        required: true,
        validate: [isEmail], //librairie validator
        lowercase: true,
        unique: true, //email unique
        trim: true,
      },
      password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
      },
      picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
      },
      bio: {
        type: String,
        max: 1024,
      },
      followers: {
        type: [String]
      },
      following: {
        type: [String]
      },
      likes: {
        type: [String]
      }
    },
    {
      timestamps: true,
    }
  );

// cryptage du password
// appel de cette fonction avant l'enregistrement de l'user dans la db (avec le pre)
// bcrypt = librairie pour crypter le mdp
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt() // utilise des caractère aléatoire
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Comparaison des password au login 
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    } else {
      throw Error('Incorrect password');
    }
  } else {
    throw Error('Incorrect email');
  }
}

// on envoi le model d'user dans mongoose pour la collection user
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;