import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFAFA] px-4 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative mb-12">
          <h1 className="text-[150px] md:text-[200px] font-black text-[#F0F9F9] leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <h2 className="text-3xl md:text-5xl font-bold text-[#003D3B] mb-4">
              Page Not Found
            </h2>
            <div className="w-24 h-1 bg-[#018884] rounded-full"></div>
          </div>
        </div>

        <p className="text-[#555555] text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-[#018884] text-[#018884] font-semibold rounded-full hover:bg-[#F0F9F9] transition-colors text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#018884] text-white font-semibold rounded-full hover:bg-[#003D3B] transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
