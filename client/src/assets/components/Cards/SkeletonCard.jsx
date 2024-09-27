
const SkeletonCard = () => {
  return (
    <div className="w-full max-w-xs rounded overflow-hidden shadow-lg mx-auto">
      {/* Skeleton for image */}
      <div className="w-full h-48 bg-gray-300 animate-pulse"></div>

      <div className="px-6 py-4">
        {/* Skeleton for job title */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
        
        {/* Skeleton for job description */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
      </div>

      <div className="px-6 pt-4 pb-2">
        {/* Skeleton for tags */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard