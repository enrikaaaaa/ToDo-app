import { Route, Routes } from 'react-router-dom';

import SecuredRoute from '../pages/Secured/Secured';
import { UserContext } from '../contexts/UserContext';
import { routes } from './consts';
import { useContext } from 'react';

const AppRoutes = () => {
  const { authenticated } = useContext(UserContext);
  console.log(authenticated);
  return (
    <Routes>
      {routes.map(({ path, Layout, Component, isSecured }) => (
        <Route
          key={path}
          path={path}
          element={
            isSecured && !authenticated ? (
              <SecuredRoute />
            ) : (
              <Layout>
                <Component />
              </Layout>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
