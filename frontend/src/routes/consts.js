import AuthLayout from '../layouts/AuthLayout';
import BasicLayout from '../layouts/BasicLayout';
import ChartPie from '../pages/ChartPie/ChartPie';
import Login from '../pages/Login/Login';
import Tasks from '../pages/Tasks/Tasks';
import Users from '../pages/Users/Users';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  USERS: '/users',
  TASKS: '/tasks/',
  PIE: '/pie',
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
  {
    path: ROUTES.TASKS,
    Component: Tasks,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.PIE,
    Component: ChartPie,
    Layout: BasicLayout,
  },
];

export const navigationBarLinks = [
  {
    name: 'Users',
    path: ROUTES.USERS,
  },
  {
    name: 'Tasks',
    path: ROUTES.TASKS,
  },
  {
    name: 'Chart',
    path: ROUTES.PIE,
  },
];
