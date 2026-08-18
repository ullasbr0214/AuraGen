const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const {
  register,
  login,
  googleCallback,
  githubCallback,
} = require("../controllers/authController");

// =========================
// Normal Authentication
// =========================

router.post("/register", register);
router.post("/login", login);

// =========================
// Google OAuth
// =========================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`,
  }),
  googleCallback
);
// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github`,
  }),
  githubCallback
);

module.exports = router;