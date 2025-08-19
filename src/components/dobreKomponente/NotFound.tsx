import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="space-y-4 text-gray-400 text-sm">
            <p>• Check the URL for typos</p>
            <p>• Return to the homepage</p>
            <p>• Contact support if the problem persists</p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl"
        >
          <Home className="mr-3" size={20} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
