const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    pillz: {
        User: {
            type: Number,
            default: 2001
        },
        VitaminD: Number,
        Advil: Number,
        Amoxicillin: Number,
        Prednisone: Number,
        Lisinopril: Number,
        Ibuprofen: Number,
        Atenolol: Number,
        Mucinex: Number,
        Hydrochlorothiazide: Number
    },
    passwordUser: {
        type: String,
        required: true,
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);

// {
//     "first_name": "Paul",
//     "last_name": "Miller",
//     "email": "paulmiller1@example.com",
//     "password": "Supersecure56",
//     "pillz": [
//         {
//             "pill": "Tylenol",
//             "dosage": "200mg"
//         },
//         {
//             "pill": "aceteminophin",
//             "dosage": "250mg"
//         }
//     ]
// }