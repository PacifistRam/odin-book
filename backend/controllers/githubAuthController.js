const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// login via github strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile :", profile._json);
      const accountCred = profile._json.email || profile._json.login;

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: accountCred }, { userName: accountCred }],
        },
      });

      if (user) {
        return done(null, user);
      } else {
        const placeHolderPassword = process.env.PLACEHOLDER_PASSWORD;
        const hashedPassword = await bcrypt.hash(placeHolderPassword, 10);

        const [fName, lName] = profile._json.name
          ? profile._json.name.split(" ")
          : [null, null];

        const newUser = await prisma.user.create({
          data: {
            email: `${accountCred}@placeholdermail.com`,
            userName: accountCred,
            password: hashedPassword,
            profile: {
              create: {
                firstName: fName,
                lastName: lName,
                bio: profile._json.bio || null,
                profilePic: profile._json.avatar_url || null,
              },
            },
          },
        });
        return done(null, newUser);
      }

    }
  )
);

exports.getGithubLogin = asyncHandler(async (req, res) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res);
});

exports.getProcessGitHubLogin = [
  passport.authenticate("github", { session: false }),
  asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
        message: "Github authentication successful",
        token,
    })

  }),
  (err, req, res, next) => {
    return res.status(401).json({
        message: "GitHub authentication failed",
        error: err.message || "Unknown error",
    })
  }
];
