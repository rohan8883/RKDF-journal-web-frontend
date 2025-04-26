import { Outlet } from 'react-router-dom';
export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full justify-center h-screen">
      <main>
        <Outlet />
      </main>
      {/* <footer className="absolute bottom-0 w-full text-center py-4">
        <p>
          <span>© {new Date().getFullYear()} </span>
          <Link to="/">
            <span>LMS App</span>
          </Link>
          <small>, Inc. All Rights Reserved.</small>
        </p>
      </footer> */}
    </div>
  );
}
