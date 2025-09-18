const { createUserProfileSchema } = require("./dto/userProfileDto");
const { userService } = require("./userService");
const { ROLES } = require("../constants/constant");

async function createProfile(req, res) {
    try {
        const profileData = createUserProfileSchema.parse(req.body);
        const userProfile = await userService.create(profileData);
        
        console.log("User profile has been created");

        res.status(201).json({
            status: true,
            message: "Profile created successfully",
            data: {}
        });

    } catch (err) {
        console.error("Error creating profile", err.message);
        res.status(500).json({
            status: false,
            message: "Error creating profile",
            error: err.message
        });
    }
};

module.exports={createProfile};