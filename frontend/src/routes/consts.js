import AuthLayout from '../layouts/AuthLayout';
import BasicLayout from '../layouts/BasicLayout';
import Login from '../pages/Login/Login';
import Users from '../pages/Users/Users';

export const ROUTES = {
  LOGIN: '/',
  REGISTER: '/register',
  USERS: '/users',
};

export const routes = [
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: AuthLayout,
  },

  {
    path: ROUTES.USERS,
    Component: Users,
    Layout: BasicLayout,
  },
];

export const navigationBarLinks = [
  {
    title: 'Users',
    path: ROUTES.USERS,
  },
];
