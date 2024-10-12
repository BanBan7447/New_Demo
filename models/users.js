const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// users Schema định nghĩa cấu trúc, kiểu dữ liệu, và các ràng buộc (constraints)
// của các trường (fields) trong collection, nhưng bản thân Schema không phải là một collection

const users = new Schema({
    id: { type: ObjectId },
    userName: {
        type: String,
        require: true,
        unique: true,
        default: "Nothing"
    },
    email: {
        type: String,
        require: true,
        unique: true,
        default: "Nothing"
    },
    passWord: {
        type: String,
        require: true,
        default: "Nothing"
    },
    fullName: {
        type: String,
        require: true,
        default: "Nothing"
    }
});

module.exports = mongoose.models.users || mongoose.model('api_users', users);