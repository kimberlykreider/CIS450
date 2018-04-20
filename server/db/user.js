var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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

//given info, creates a new user and adds them to the database
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

//given a username and password, checks whether such a user exists and whether the password is correct. Returns a boolean.
userSchema.statics.authenticate = function(username, password) {
    return this.findOne({username: username})
    .then((user) => {
        if (!user) {
            throw new Error('Username does not exist');
        }
        return bcrypt.compare(password, user.password);
    });
}

module.exports = mongoose.model('User', userSchema);

