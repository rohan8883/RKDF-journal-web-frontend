import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useStore } from '@/store';
import Spinner from '@/components/loaders/Spinner';

export default function AuthGuard({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const searchParam = useParams();
  const { isInitialized, isAuthenticated, initialize, user } = useStore();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  const path = user?.permission?.map((item) => {
    if (item?.path?.includes(':id')) {
      return item?.path.replace(':id', searchParam.id as string);
    }

    return item?.path;
  });
  console.log(path);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/loan" />;
  }

  // if (isAuthenticated && !path?.includes(pathname)) {
  //   return (
  //     <div className="flex flex-col h-screen">
  //       <div className="flex flex-col flex-1 items-center justify-center">
  //         <div className="flex flex-col items-center">
  //           <h1 className="text-lg font-bold text-gray-600">
  //             403
  //             <span className="text-lg font-medium text-gray-400"> | </span>
  //             Unauthorized
  //           </h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
