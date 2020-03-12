const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );
  return User;
};

// class User extends Model {
//   static init(connection) {
//     super.init({
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.VIRTUAL,
//       password_hash: DataTypes.STRING
//     }, {
//       hooks: {
//         beforeSave: async user => {
//           if (user.password) {
//             user.password_hash = await bcrypt.hash(user.password, 8);
//           }
//         }
//       }
//     });

//   }
// }

// module.exports = User;