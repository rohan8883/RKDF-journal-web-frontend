import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout, AdminLayout, LandingLayout } from '@/layouts';
import { AuthGuard, GuestGuard } from '@/guard';
import NotFound from '@/pages/errors/NotFound';
import routes from './allRoutes';

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/Journal"
        element={<Navigate to="/Journal/landing-page" />}
        // element={<Navigate to="/loan/auth/login" />}
        index={true}
      />

      {/*************************************Auth Routes********************************************/}
      <Route
        path="/Journal/auth"
        element={
          <GuestGuard>
            <LandingLayout />
          </GuestGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'auth' &&
            pages?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>



      {/* admin */}
      <Route
        path="/Journal"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout == 'admin' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************Guest Routes********************************************/}
      <Route path="/Journal"
        element={
          <LandingLayout />
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'guest' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/***************************************404 Routes****************************************************/}
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Navigate to="/Journal" replace />} />
    </Routes>
  );
}
