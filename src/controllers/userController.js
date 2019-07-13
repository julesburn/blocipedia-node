const userQueries = require("../db/queries.users.js");
const passport = require("passport");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    signUp(req, res, next){
      res.render("users/sign_up");
    },

    create(req, res, next){

           let newUser = {
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
             passwordConfirmation: req.body.passwordConfirmation
           };

           const msg = {
            to: newUser.email,
            from: "cmbenson88@gmail.com",
            subject: "Welcome to Blocipedia",
            text: "Create, collaborate, and share wikis anytime!",
            html: "<strong>Get started on a wiki today!</strong>"
        };

          userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
      

               passport.authenticate("local")(req, res, () => {
                 req.flash("notice", "You've successfully signed in!");
                 res.redirect("/");
               })
             }
           });

           sgMail.send(msg).catch(err => {
            console.log(err);
          });

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