import { RotatingLines } from 'react-loader-spinner';
export default function OverLayLoader() {
  return (
    // full screen overlay loader with spinner and text
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <RotatingLines strokeColor="#ffff" width="30" />
        </div>
        <div className="px-6 py-3">
          <h1 className="text-sm font-semibold text-gray-100 text-center">
            Please wait...
            <small className="text-xs">
              <br />
              Do not refresh the page or press back button.
            </small>
          </h1>
        </div>
      </div>
    </div>
  );
}
