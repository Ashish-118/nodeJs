const { mongoose, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: '/images/avatar.avif'
    },
    role: {
        type: String,
        enum: ['admin', 'userSchema'],
        default: 'userSchema'
    }

}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashpassword = createHmac('sha256', salt).update(user.password).digest('hex');
    user.salt = salt;
    user.password = hashpassword;
    next();
})

const User = model('users', userSchema)
module.exports = {
    User
}

