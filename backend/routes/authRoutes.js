const { Router } = require ("express")

const authRouter = Router()
const authController = require("../controllers/authController")
const githubAuthController = require("../controllers/githubAuthController")

authRouter.post("/log-in", authController.postLocalLogin)

authRouter.get("/github-login", githubAuthController.getGithubLogin)

authRouter.get("/github/processLogin", githubAuthController.getProcessGitHubLogin)





module.exports = authRouter