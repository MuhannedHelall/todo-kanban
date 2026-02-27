export default function TaskContainerSkelton() {
  return (
    <div className="bg-gray-200 rounded-xl flex flex-col gap-2 p-4 h-full overflow-y-auto">
      <div className="flex items-center gap-x-4 py-2 animate-pulse">
        <div className="bg-gray-600 rounded-full w-3 h-3" />
        <div className="bg-gray-400 uppercase rounded-xl h-3 w-32" />
        <div className="bg-amber-600 rounded-full w-5 h-5" />
      </div>

      <div
        role="status"
        className="max-w-sm animate-pulse bg-white rounded-lg border border-gray-300 p-2"
      >
        <div className="h-2.5 bg-gray-600 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-300 rounded-full max-w-90 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-82.5 mb-2.5" />
        <div className="h-5 bg-red-300 rounded-xl max-w-16 mb-2" />
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="max-w-sm animate-pulse bg-white rounded-lg border border-gray-300 p-2"
      >
        <div className="h-2.5 bg-gray-600 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-300 rounded-full max-w-90 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-82.5 mb-2.5" />
        <div className="h-5 bg-orange-300 rounded-xl max-w-16 mb-2" />
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="max-w-sm animate-pulse bg-white rounded-lg border border-gray-300 p-2"
      >
        <div className="h-2.5 bg-gray-600 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-300 rounded-full max-w-90 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-82.5 mb-2.5" />
        <div className="h-5 bg-gray-300 rounded-xl max-w-16 mb-2" />
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="max-w-sm animate-pulse bg-white rounded-lg border border-gray-300 p-2"
      >
        <div className="h-2.5 bg-gray-600 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-300 rounded-full max-w-90 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-82.5 mb-2.5" />
        <div className="h-5 bg-orange-300 rounded-xl max-w-16 mb-2" />
        <span className="sr-only">Loading...</span>
      </div>

      <div className="flex justify-center items-center border border-gray-300 border-dashed py-1 rounded">
        <div className="h-2 bg-gray-700 rounded-xl max-w-64 mb-2.5" />
      </div>
    </div>
  );
}
