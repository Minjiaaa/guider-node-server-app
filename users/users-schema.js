import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // firstName: String,
    // lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "None" },
    lastName: { type: String, default: "None" },
    email: { type: String, default: "None" },
    phone: { type: String, default: "000-000-0000" },
    role: {
        type: String,
        default: "Viewer",
    },
    dob: Date,
    created: { type: Date, default: Date.now },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'usersModel' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'usersModel' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tuitsModel' }],
}, { collection: "users" });
export default usersSchema;