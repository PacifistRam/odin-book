const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// get all users

const getAllUsers = async () => {
   try {
     const allUsers = await prisma.user.findMany({
         include: {
             profile: true,
             posts: true,
         }
     })
 
     if(allUsers.length > 0) {
         return {
             data: allUsers,
             message: null
         }
     } else {
         return {
             data: null,
             message: "no users found "
         }
     }
   } catch (error) {
    console.error(error)
    return {
        data: null,
        message: " error in retrieving users",
        error: error.message
    }
   }
}




module.exports = {
    getAllUsers
}