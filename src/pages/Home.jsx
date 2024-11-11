import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); // Trigger animation once component mounts
  }, []);

  return (
    <div
      className="h-[100vh] w-[100%] flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('https://example.com/your-image.jpg')" }} // Replace with your image
    >
      <div
        className={`absolute inset-0 bg-black bg-opacity-60 ${
          isLoaded ? "animate-fadeIn" : ""
        }`}
      ></div>

      <div
        className={`z-10 text-center ${
          isLoaded ? "animate-slideUp" : "opacity-0"
        }`}
      >
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Explore different topics to Learn visually while experimenting;
        </p>
        <Link to={'/bst'}>
          <button className="px-6 py-3 text-lg font-semibold rounded-xl bg-green-700 text-white hover:bg-green-800 transition-colors">
            Get Started with BST
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
