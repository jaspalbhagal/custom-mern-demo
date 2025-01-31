export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h6 className="text-xl font-semibold text-red-600">
          404 - Page Not Found
        </h6>
        <p className="text-lg text-gray-600 mt-4">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
