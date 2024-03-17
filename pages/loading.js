import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/images/white.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-[120vh]  mt-[-200px] lg:mt-[-200px] lg:h-[150vh] bg-[#17a2b8] bg-opacity-90 z-50">
      <div className="max-w-lg">
        <div className="flex items-center justify-center ">
          <div className="mt-[10dvh] sm:mt-[-120dvh] md:mt-[-80dvh] lg:mt-0">
            <Lottie
              isClickToPauseDisabled
              options={defaultOptions}
              height={150}
              width={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
