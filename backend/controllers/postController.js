const asyncHandler = require("express-async-handler");
const postQuery = require("../models/postQuery");
const { body, param, validationResult } = require("express-validator");

// get post by postId
exports.getPostByPostId = [
  param("postId").trim().notEmpty(),

  asyncHandler(async (req, res) => {
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid post id",
        error: errorMsgArray,
      });
    }
    const { postId } = req.params;

    const result = await postQuery.getPostById(postId);
    if (result.data) {
      return res.status(200).json(result.data);
    }
    return res.status(400).json({
      message: result.message,
      error: result.error || " no error",
    });
  }),
];

// get posts by an user
exports.getUserPosts = [
  param("postId").trim().notEmpty(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid post id",
        error: errorMsgArray,
      });
    }
    const { authorId } = req.params;
    const result = await postQuery.postsByUser(authorId);
    if (result.data) {
      return res.status(200).json({
        result,
      });
    }
    return res.status(400).json({
      message: result.message,
      error: result.error,
    });
  }),
];

// create new post

exports.createPost = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(" post cannot be empty")
    .isLength({ max: 70 })
    .withMessage("post too long, need to be lower than 70 characters"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid post fields",
        error: errorMsgArray,
      });
    }

    const authorId = req.user.id;
    const { content } = req.body;

    const result = await postQuery.createPost(authorId, content);
    if (result.data) {
      return res.status(200).json({
        message: result.message,
        post: result.data,
      });
    }
    return res.status(500).json({
      message: result.message,
      error: result.error,
    });
  }),
];

// create comment on a post
exports.postComment = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("comment can't be empty")
    .isLength({ max: 70 })
    .withMessage(" comment is too long, it cant be more than 80 characters")
    .escape(),

  body("postId").trim().notEmpty().withMessage("postId cannot be empty"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid comment fields",
        error: errorMsgArray,
      });
    }

    const commenterId = req.user.id;

    const { postId, text } = req.body;
    if (!postId || isNaN(postId) || parseInt(postId, 10) <= 0) {
      return res.status(403).json({ message: "invalid post id" });
    }

    const postExists = await postQuery.verifyPostById(postId);
    if (!postExists.data) {
      return res.status(403).json({ message: postExists.message });
    }

    const result = await postQuery.createComment(postId, commenterId, text);
    if (result.data) {
      return res.status(200).json({
        message: result.message,
        comment: result.data,
      });
    }
    return res.status(500).json({
      message: result.message,
      error: result.error,
    });
  }),
];

//  like a post

exports.postLike = [
  body("postId").trim().notEmpty().withMessage("postId cannot be empty"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid  fields",
        error: errorMsgArray,
      });
    }
    const userId = req.user.id;
    const { postId } = req.body;
    if (!postId || isNaN(postId) || parseInt(postId, 10) <= 0) {
      return res.status(403).json({ message: "invalid post id" });
    }

    const postExists = await postQuery.verifyPostById(postId);
    if (!postExists.data) {
      return res.status(403).json({ message: postExists.message });
    }

    const result = await postQuery.likePost(postId, userId);
    if (result.data) {
      return res.status(200).json(result.message);
    }
    return res
      .status(400)
      .json({ message: result.message, error: result.error });
  }),
];
