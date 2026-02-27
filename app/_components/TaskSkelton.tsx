export default function TaskSkelton() {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse bg-white rounded-lg border border-gray-300 p-2"
    >
      <div className="h-2.5 bg-gray-600 rounded-full w-48 mb-4" />
      <div className="h-2 bg-gray-300 rounded-full max-w-90 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-72" />
      <div className="h-2 bg-gray-200 rounded-full max-w-82.5 mb-2.5" />
      <div className="h-5 bg-gray-300 rounded-xl max-w-16 mb-2" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
