const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// get user profile by userId

const getUserProfile = async (userId) => {
    try {
        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: +userId
            },
            
        })
        if(userProfile) {
            return{
                data: userProfile,
                message: "user profile found",
                error: null
            }
        } else {
            return{
                data: null,
                message: "no profile found for this user ",
                error: null
            }
        }
    } catch (error) {
        console.error(error)
        return{
            data: null,
            message: "database error",
            error: error.message
        }
    }
}

//  create user profile

const createProfile = async (firstName, lastName, profilePic, bio, userId) => {
    try {
        const profileData = {
            userId,
            ...(firstName && { firstName}),
            ...(lastName && { lastName}),
            ...(profilePic && { profilePic}),
            ...(bio && { bio }),

        }
        const newProfile = await prisma.profile.create({
            data: profileData
        })
        return{
            data: newProfile,
            message: "Profile created successfully",
            error: null,
        }
    } catch (error) {
        console.error(error)
        return{
            data: null,
            message: "database error",
            error: error.message
        }
    }
}