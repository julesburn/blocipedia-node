'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
	    unique: {
	  	  args: true,
		    msg: "Validation error"
	  },
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Name"
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }

  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });

    User.prototype.isAdmin = function() {
      return this.role === "admin";
    };

    User.prototype.isOwner = function() {
      return this.role === "owner";
    };

    User.prototype.isMember = function() {
      return this.role === "member";
    };
  };

  return User;
};