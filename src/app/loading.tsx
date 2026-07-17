export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-dark-500 dark:text-dark-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
