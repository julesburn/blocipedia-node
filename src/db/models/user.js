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
      defaultValue: 0
    }

  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey:"userId",
      as: "wikis"
    })
    User.hasMany(models.Collaborator, {
      foreignKey: "userId",
      as: "collaborators"
    });
    User.prototype.isAdmin = () => {
      return this.role == 2;
    }
    User.prototype.isPremium = () => {
      return this.role == 1;
    }
    User.prototype.isMember = () => {
      return this.role == 0;
    }
  };
  return User;
};