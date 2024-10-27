const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//  create new posts
const createPost = async (authorId, content) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        authorId: +authorId,
        content,
      },
    });
    return {
      data: newPost,
      message: "post created",
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: "database error",
      error: error.message,
    };
  }
};

// get post by id
const verifyPostById = async (postId) => {
  try {
    const verifyPost  = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      select:{
        id: true,
        authorId: true
      }
    })
    if(verifyPost){
      return{
        data: verifyPost,
        message: "post exists",
        error: null
      }
    } else {
      return{
        data: null,
        message: "post doesn't exists",
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

// get posts by an user
const postsByUser = async (authorId, page = 1, pageSize = 10) => {
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        authorId: +authorId,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            commenter: {
              select: {
                id: true,
                userName: true,
                profile: {
                  select: {
                    profilePic: true,
                  },
                },
              },
            },
          },
        },
        likes: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
    if (posts.length > 0) {
      return {
        data: posts,
        message: "user posts fetched",
        error: null,
      };
    } else {
      return {
        data: posts,
        message: "no posts found",
        error: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: "database error",
      error: error.message,
    };
  }
};

//  create comment

const createComment = async (postId, commenterId, text) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        text,
        postId: +postId,
        commenterId: +commenterId,
      },
    });
    if (newComment) {
      return {
        data: newComment,
        message: "comment created",
        error: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: "database error",
      error: error.message,
    };
  }
};

//  create a like for post
const likePost = async (postId, userId ) => {
  try {
    const like = await prisma.likes.create({
      data:{
        userId:+userId,
        postId: +postId
      }
    })
    if(like){
      return{
        data: like,
        message: `post liked by ${userId}`,
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
        author: {
          select: {
            id: true,
            userName: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    if (posts.length > 0) {
      return {
        data: posts,
        message: "posts retrieved successfully",
        error: null,
      };
    } else {
      return {
        data: null,
        message: "no posts found",
        error: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: "database error ",
      error: error.message,
    };
  }
};

// get a post by its id
const getPostById = async (postId, commentsSize = 10) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        comments: {
          orderBy: [
            {updatedAt: "desc"},
            {createdAt: "desc"}
          ],
          take: commentsSize,
          select: {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
            commenter: {
              select: {
                id: true,
                userName: true,
                profile: {
                  select: {
                    profilePic: true,
                  },
                },
              },
            },
          },
        },
        likes:{
          select:{
            userId: true
          }
        },
      },
    });
    const totalComments = await prisma.comment.count({
      where: {
        postId: +postId
      }
    })
    const totalLikes = await prisma.likes.count({
      where: {
        postId: +postId
      }
    })
     
    if (post) {
      return {
        data: { post, totalComments, totalLikes },
        message: "post found",
        error: null,
      };
    } else
      return {
        data: null,
        message: "no post found",
        error: null,
      };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: "database error",
      error: error.message,
    };
  }
};

module.exports = {
  createPost,
  verifyPostById,
  createComment,
  likePost,
  postsByUser,
  getPostById,
  getPostsByFollowedUsers,
};
