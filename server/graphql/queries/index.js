import user from './user';
import role from './role';
import moduler from './module';
import resource from './resource';
import operation from './operation';

export default {
  ...user,
  ...role,
  ...moduler,
  ...resource,
  ...operation
};
