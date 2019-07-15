
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/application");


  module.exports = {
    index(req, res, next){

        wikiQueries.getAllWikis((err, wikis) => {

            if(err){
                console.log("This is the error"+ err)
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/index", {wikis});
            }
        })
      },
      new(req, res, next){
        res.render("wikis/new");
      },
      create(req, res, next) {
        const authorized = new Authorizer(req.user).create();
    
        if (authorized) {
          let newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: req.body.private,
            userId: req.user.id
          };
          wikiQueries.addWiki(newWiki, (err, wiki) => {
            if (err) {
              res.redirect(500, "wikis/new");
            } else {
              res.redirect(303, `/wikis/${wiki.id}`);
            }
          });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect("/wikis");
        }
      },
    
      show(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
          if (err || wiki == null) {
            res.redirect(404, "/");
          } else {
            res.render("wikis/show", { wiki });
          }
        });
      }
    };