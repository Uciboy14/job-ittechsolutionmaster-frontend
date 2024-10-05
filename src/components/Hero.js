import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGlobe,
  FaShareAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Hero = ({ jobTitle }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Specify the file URL you want to download
    //const fileUrl = "path/to/your/file.pdf"; // Replace with your file path

    // Create an anchor element
    //const a = document.createElement("a");
    //a.href = fileUrl;
    //a.download = "filename.pdf"; // Optionally specify a filename for the downloaded file

    // Programmatically click the anchor to trigger the download
    //document.body.appendChild(a);
    //a.click();

    // Clean up by removing the anchor element
    //document.body.removeChild(a);

    // Navigate to the job application page
    navigate("/job-application");
  };

  return (
    <div className="relative bg-top bg-cover bg-[url('../public/office.jpg')] w-full py-[6rem] pb-[4rem] h-auto">
      {/* Background overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-[#171b27] opacity-70 transition-opacity duration-300 ease-in-out z-5"></div>

      {/* Content container */}
      <div className="relative table h-full z-20 min-w-[300px] max-w-[1024px] mx-auto">
        <div className="table-cell align-middle text-center">
          {/* Company Name and Job Type */}
          <div className="flex justify-center items-center mb-2 text-[1.125rem] leading-6 px-8 break-words font-medium font-lato text-white">
            <span className="flex items-center">
              Ittechsolutionmaster Recruitment LLC
              <span className="px-2 text-[0.9375rem]">| Full time</span>
            </span>
          </div>

          {/* Dynamic Job Title */}
          <h1 className="mb-2 text-[3rem] leading-[1.2] text-white font-medium break-words">
            {jobTitle}
          </h1>

          {/* Remote Job and Posted Date */}
          <div className="flex justify-center items-center text-[1.125rem] leading-6 px-8 break-words text-white font-lato font-medium gap-x-2">
            <span className="flex items-center gap-x-1">
              <FaGlobe className="text-white text-[17px]" />
              <span className="text-[1.125rem]">Remote Job</span>
            </span>
            <span className="text-[0.9375rem]">| Posted on 09/29/2024</span>
          </div>

          {/* Share Button and Interest Button */}
          <div className="flex mt-[24px] items-center justify-center flex-col md:flex-row">
            <button
              onClick={handleButtonClick}
              className="hover:bg-[#5e6183] hover:border-[#5e6183] hover:opacity-1 border bg-[#6875e2] border-[#6875e2] rounded text-white cursor-pointer font-lato text-[18px] font-semibold mb-2 md:mb-0 md:ml-4 px-4 py-2 transition duration-200 ease-in-out"
            >
              I'm Interested
            </button>
            <button className="bg-transparent border border-white rounded text-white cursor-pointer font-lato text-[18px] font-semibold md:ml-4 px-4 py-2 text-center transition duration-200 ease-in-out hover:bg-transparent hover:text-gray-400 hover:shadow-lg">
              Share job via email
            </button>
          </div>

          {/* Share icon */}
          <div className="flex z-50 text-center mt-4 mx-auto  items-center justify-center">
            <FaShareAlt className="text-white inline-block text-[0.875rem] leading-4 font-normal antialiased" />
            <ul className="flex space-x-4 ml-4">
              {/** Share icon wrapper **/}
              <li>
                <a
                  href="https://www.facebook.com" // Replace with your Facebook page link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex  items-center justify-center border border-white rounded-full cursor-pointer w-10 h-10 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-blue-500 hover:bg-blue-400"
                >
                  <FaFacebook className="text-white text-lg" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/" // Replace with your LinkedIn profile link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-white rounded-full cursor-pointer w-10 h-10 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-blue-500 hover:bg-blue-400"
                >
                  <FaLinkedin className="text-white text-lg" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/" // Replace with your Twitter handle
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-white rounded-full cursor-pointer w-10 h-10 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-blue-500 hover:bg-blue-400"
                >
                  <FaTwitter className="text-white text-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
