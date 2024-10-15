const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// getPosts Of Following users

const getPostsByFollowedUsers = async (currentUserId) => {
  try {
    // get all ids of users that current user is following
    const followingIds = await prisma.follows
      .findMany({
        where: {
          followerId: +currentUserId,
        },
        select: {
          followingId: true,
        },
      })
      .then((follows) => follows.map((follow) => follow.followingId));

    // retrieve all post authored by those users

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      include: {
        author:{
            select: {
                id: true,
                userName:  true
            }
        },
        comments: true,
        likes: true,
      },
    });

    if(posts.length > 0) {
        return{
            data: posts,
            message: "posts retrieved successfully",
            error: null
        }
    }else {
        return{
            data: null,
            message: "no posts found",
            error: null
        }
    }
  } catch (error) {
    console.error(error)
    return{
        data: null,
        message: "database error ",
        error: error.message
    }
  }
};
