const { Router } = require ("express")

const postRouter = Router()

const postController = require("../controllers/postController")

const {authenticateToken } = require("../middleware/jwtAuth")

// get route to get user posts
postRouter.get("/user-posts/:authorId", postController.getUserPosts)

// get route to get post by its id
postRouter.get("/post/:postId", postController.getPostByPostId)

// create a new post
postRouter.post("/create-post", authenticateToken, postController.createPost)

// create a new comment
postRouter.post("/create-comment",authenticateToken, postController.postComment)

// like a post
postRouter.post("/like-post",authenticateToken, postController.postLike)












module.exports = postRouter