const { Router } = require ("express")

const testRouter = Router()
const testController = require("../controllers/testController")
const githubAuthController = require("../controllers/githubAuthController")


testRouter.get("/allUsers", testController.getAllUsers)

// testRouter.get("/github", githubAuthController.getGithubLogin)

// testRouter.get("/github/processLogin", githubAuthController.getProcessGitHubLogin)



module.exports = testRouter