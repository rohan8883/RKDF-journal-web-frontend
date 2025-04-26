export default function NotFound() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-gray-600">
            404
            <span className="text-lg font-medium text-gray-400"> | </span>
            Page Not Found
          </h1>
        </div>
      </div>
    </div>
  );
}
