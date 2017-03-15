import mongoose from 'mongoose';
import UserModel from '../server/models/user';
import RoleModel from '../server/models/role';
// connect to mongo

mongoose.connect('mongodb://localhost/jwp');

// seed users

const users = [
  {id: 1, name: 'Abaddon', roles: [1, 2, 3]},
  {id: 2, name: 'Bane', roles: [1, 3, 4]},
  {id: 3, name: 'Centaur Warruner', roles: [4, 6, 3, 5, 7]},
  {id: 4, name: 'Dark Seer', roles: [6, 8, 7, 4]},
  {id: 5, name: 'Earth Spirit', roles: [5, 7, 4, 6, 3]},
  {id: 6, name: 'Faceless Void', roles: [2, 6, 4, 7, 3]},
  {id: 7, name: 'Gyrocopter​', roles: [2, 5, 4]},
  {id: 8, name: 'Huskar', roles: [2, 3, 6]},
  {id: 9, name: 'Invoker', roles: [2, 5, 4, 7, 6]},
  {id: 10, name: 'Juggernaut', roles: [2, 5]}
];

const roles = [
  {name: 'Support'},
  {name: 'Carry'},
  {name: 'Durable'},
  {name: 'Disable'},
  {name: 'Nuker'},
  {ame: 'Initiator'},
  {name: 'Escape'},
  {name: 'Jungler'}
];

// drop users collection
/*
mongoose.connection.collections.users.drop((err) => {
  if (err) {
    console.log('create collection users');
    console.log(UserModel);
  }
  UserModel.create(users, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Seed data created.');
    }
    process.exit();
  });
});
*/
mongoose.connection.collections.users.drop((err) => {
  if (err) {
    console.log('create collection roles');
  }

  users.forEach((r) => {
    new UserModel({
      loginname: r.name,
      useralias: r.name,
      email: `${r.name}@exp.com`
    }).save();
  });
});

/*
mongoose.connection.collections.roles.drop((err) => {
  if (err) {
    console.log('create collection roles');
  }

  roles.forEach((r) => {
    new RoleModel(r).save();
  });
});
*/
