require("dotenv").config();
const userQueries = require("../db/queries.users.js");
const passport = require("passport");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

    signUp(req, res, next) {
    res.render("users/sign_up");
    },

      create(req, res, next) {
        let newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          passwordConfirmation: req.body.passwordConfirmation
        };

	if (userQueries.checkEmail(newUser.email)) {
    req.flash("error", err);
		req.flash("notice", "Sign up failed. Email already in use.")
		res.redirect("/users/sign_up");
	} else {

	userQueries.createUser(newUser, (err, user) => {
        if (err) {
          console.log(err);
          req.flash("error", err);
          res.redirect("/users/sign_up");
        } else {
          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've signed up!");
            res.redirect("/");
          });
        }
      });
  }
},

    signInForm(req, res, next){
      res.render("users/sign_in");
    },

    signIn(req, res, next){
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        }
      })
    },

    signOut(req, res, next){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    }

  }