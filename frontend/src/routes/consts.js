import AuthLayout from '../layouts/AuthLayout';
import BasicLayout from '../layouts/BasicLayout';
import ChartPie from '../pages/ChartPie/ChartPie';
import Login from '../pages/Login/Login';
import PrivateRoute from '../pages/Login/PrivateRoute';
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
    Route: PrivateRoute,
  },
  {
    path: ROUTES.TASKS,
    Component: Tasks,
    Layout: BasicLayout,
    Route: PrivateRoute,
  },
  {
    path: ROUTES.PIE,
    Component: ChartPie,
    Layout: BasicLayout,
    Route: PrivateRoute,
  },
];

export const navigationBarLinks = [
  {
    title: 'Users',
    path: ROUTES.USERS,
  },
  {
    title: 'Tasks',
    path: ROUTES.TASKS,
  },
  {
    title: 'Pie',
    path: ROUTES.PIE,
  },
];
