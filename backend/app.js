require('dotenv').config()

const express = require("express");

// const passport = require("passport");
// const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
const cors = require("cors")
app.use(express.json())

const authRouter = require("./routes/authRoutes")
const testRouter = require("./routes/testRoutes")

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("hello Odin-book"));
// app.get("/login", (req, res) => res.send("testing login here"));



// app.get('/auth/github', passport.authenticate('github', { scope: ['user:email']}));


// app.get('/auth/github/processLogin', passport.authenticate('github', { failureRedirect: 'login', session: false}),
// function(req, res){
//     res.redirect('/');
// });


app.use("/auth", authRouter)
app.use("/test", testRouter)



app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
