// app/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Categories Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                <div className="flex items-center mt-4 space-x-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}