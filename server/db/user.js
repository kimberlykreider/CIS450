import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
        },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.statics.createUser = function(username, password, email) {
    let newUser = new this({
        username: username,
        password: password,
        email: email
    });
    return bcrypt.hash(newUser.password, 1).then((hash) => {
        newUser.password = hash;
        return newUser.save();
    });
}

userSchema.statics.authenticate = function(username, password) {
    return this.findOne({username: username})
    .then((user) => {
        if (!user) {
            throw new Error('Username does not exist');
        }
        return bcrypt.compare(password, user.password);
    });
}

module.exports = mongoose.Model('User', userSchema);

