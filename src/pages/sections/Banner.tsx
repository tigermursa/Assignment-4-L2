import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center  text-center px-6 sm:px-12 lg:px-24 h-full">
        <div className=" bg-gray-900 p-10 rounded-full opacity-90">
          <h1 className="text-white  font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
            BookByte
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl">
            Welcome to BookByte, your digital haven for discovering, organizing,
            and exploring a world of books at your fingertips.
          </p>
        </div>
      </div>
      <video
        className="absolute inset-0 w-full h-full object-cover filter brightness-125"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.pexels.com/photos/3987756/pexels-photo-3987756.jpeg"
      >
        <source
          src="https://videos.pexels.com/video-files/4873467/4873467-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Banner;
