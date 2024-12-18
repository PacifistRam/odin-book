const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get user by email

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
      }
    });
    if (user) {
      return {
        data: user,
        message: "user found successfully",
        error: null
      };
    } else {
      return {
        data: null,
        message: "user doesn't exist",
        error: null
      };
    }
  } catch (error) {
    console.error("database error: ", error)
    return{
        data: null,
        message: "database error in retrieving user",
        error: error.message
    }
  }
};
// get user by username

const getUserByUsername = async (userName) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
      }
    });
    if (user) {
      return {
        data: user,
        message: "user found successfully",
        error: null
      };
    } else {
      return {
        data: null,
        message: "user doesn't exist",
        error: null
      };
    }
  } catch (error) {
    console.error("database error: ", error)
    return{
        data: null,
        message: "database error in retrieving user",
        error: error.message
    }
  }
};


const getUserById = async (userId) => {
    try {
      const user = await prisma.user.findUnique({
          where :{
              id: +userId
          },
          select:{
              id: true,
              userName: true,
              email: true
          }
  
      })
      if(user){
        return {
          data: user,
          message: "user exists"
        }
      }
      else{
        return{
          data: null,
          message: "no user found"
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


// create a new user
const createUser = async ( email, userName, password ) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        userName,
        password,
      }
    })
    return{
      data: newUser,
      message: "user created successfully",
      error: null
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




module.exports ={
  getUserByEmail,
  getUserById,
  createUser
}