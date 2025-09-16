const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const mentorSchema=new Schema({

    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',  
        required: true
    },

    fullName:{
        type:String,
        required:true,
        trim:true
    },

    availability: {
        startTime: {
            type: String,  // Store as "09:30 AM"
            required:true
        },
        endTime: {
            type: String , // Store as "05:00 PM"
            required:true
        },
    },

    timezone:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    bio:{
        type:String,
        required:true
    },

    currentJobTitle:{
        type:String,
        required:true
    },

    company:{
        type:String,
        required:true
    },

    yearsOfExperience:{
        type:String,
        required:true
    },

    educationalBackground:{
        type:String,
        required:true
    },

    skills:{
        type:[String],
        required:true
    },

    mentorshipGoals:{
        type:String,
        required:true
    },

    linkedinProfile:{
        type:String,
        required:true
    },

    portfolio:{
        type:String,
        required:true
    },
   
},{timestamps:true});

module.exports = mongoose.model("Mentor", mentorSchema);