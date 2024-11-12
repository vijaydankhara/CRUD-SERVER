import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,   
    },
    lastName: {
        type: String,
        required: true,   
    },
    gender: {
        type: String,
        required: true,   
        enum: ['Male', 'Female']
    },
    email: {
        type: String,       
        required: true,     
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

export default mongoose.model("User", userSchema);
