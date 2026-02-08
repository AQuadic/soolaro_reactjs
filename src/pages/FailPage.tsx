import { useNavigate } from "react-router-dom";

const FailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-[719px] w-full p-8 md:p-12 shadow-lg">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Icon */}
          <div className="w-[213px] h-[213px]">
            <img
              src="/images/checkout/fail.gif"
              alt="Failed"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-10 w-full">
            {/* Text Section */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-semibold text-[#0B0B0B] text-center font-quicksand">
                Order Failed !
              </h1>
              <p className="text-base font-medium text-[#0B0B0B] text-center max-w-md font-quicksand">
                Your order could not be processed. Please check your details or
                try again.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
              {/* Go Back Button - Stroke Style */}
              <button
                onClick={() => navigate(-1)}
                className="w-full md:w-[316px] h-14 rounded-[20px] border border-[#018884] text-[#018884] font-bold text-lg flex items-center justify-center hover:bg-[#018884] hover:text-white transition-colors duration-300 font-quicksand"
              >
                Go Back
              </button>

              {/* Try Again Button - Filled Style */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full md:w-[315px] h-14 rounded-[20px] bg-[#018884] text-white font-bold text-lg flex items-center justify-center hover:bg-[#016663] transition-colors duration-300 font-quicksand"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailPage;
