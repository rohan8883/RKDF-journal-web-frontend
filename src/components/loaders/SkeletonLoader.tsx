export default function SkeletonLoader() {
  return (
    <div className="animate-pulse flex space-x-4 mt-6">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-secondary rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded"></div>
          <div className="h-4 bg-secondary rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
