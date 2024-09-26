const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:fUQWcEpE6YYE8KNF@cluster0.ku4wnda.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password:{
        type : String,
        required : true,
        minlength: 8,
        maxlength: 100
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model("User", userSchema);

module.exports= {
    User
}