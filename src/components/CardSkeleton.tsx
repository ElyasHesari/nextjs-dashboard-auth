export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md animate-pulse border border-gray-100">
      <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded-lg w-3/4"></div>
    </div>
  );
};