const passport = require("passport");
const GoogleStrategy =
  require("passport-google-oauth20").Strategy;
const GitHubStrategy =
  require("passport-github2").Strategy;

const User = require("../models/User");

// =====================================================
// GOOGLE
// =====================================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value
          ?.trim()
          .toLowerCase();

        const name = profile.displayName || "";
        const googleId = profile.id;

        if (!email) {
          return done(
            new Error("Google account email was not provided.")
          );
        }

        let user = await User.findOne({ email });

        if (user) {
          return done(null, user);
        }

        user = await User.create({
          email,
          name,
          username: email.split("@")[0],

          // OAuth account does not use password login
          password: `google_${googleId}_${Date.now()}`,
        });

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

// =====================================================
// GITHUB
// =====================================================

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value
            ?.trim()
            .toLowerCase() ||
          `${profile.username}@github.local`;

        const username =
          profile.username || "";

        const name =
          profile.displayName ||
          username ||
          "";

        // Check existing user by email
        let user = await User.findOne({
          email,
        });

        if (user) {
          return done(null, user);
        }

        // Create new GitHub user
        user = await User.create({
          email,
          username,
          name,

          // OAuth users don't use normal password login
          password: `github_${profile.id}_${Date.now()}`,
        });

        return done(null, user);

      } catch (error) {
        console.error(
          "GitHub OAuth Error:",
          error
        );

        return done(error, null);
      }
    }
  )
);

// =====================================================
// EXPORT
// =====================================================

module.exports = passport;