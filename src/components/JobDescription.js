import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const JobDescription = ({
  jobTitle,
  experience,
  employmentType,
  salary,
  industry,
  remote,
  companyName,
  companyDescription,
  jobResponsibilities,
  jobRequirements,
  preferredQualifications,
  benefits,
}) => {
  const [currentStep, setCurrentStep] = useState("listing");

  // Function to handle moving between steps
  const goToStep = (step) => {
    setCurrentStep(step);
  };
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
    <div className="opacity-100 relative z-4 w-full rounded-[4px] min-w-[300px] max-w-[1024px] mx-auto">
      <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8 block">
         {/* Breadcrumb */}
        <Breadcrumb currentStep={{currentStep}} />
        <div className="relative block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                Job Information
              </h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Industry:</span> {industry}
                </p>
                <p className="flex items-center">
                  <FaGlobe className="text-black text-[17px]" />
                  <span className="font-semibold px-2">Remote Job:</span>{" "}
                  {remote ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg border border-gray-200 md:col-span-2">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                Job Description
              </h2>

              <div className="mb-6">
                <p className="text-md md:text-lg font-medium">{jobTitle}</p>
                <p className="text-gray-600">Experience: {experience}</p>
                <p className="text-gray-600">
                  Employment Type: {employmentType}
                </p>
                <p className="text-gray-600">Base Salary: {salary}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
                <p>
                  <strong>{companyName}</strong> {companyDescription}
                </p>
              </div>

              <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
                Responsibilities:
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
                {jobResponsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>

              <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
                Requirements:
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
                {jobRequirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>

              <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
                Preferred Qualifications:
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
                {preferredQualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>

              <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
                Benefits:
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-14">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>

              <div className="mb-[32px]">
                <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
                  Why Ittechsolutionmaster Recruitment LLC?
                </h3>
                <p className="text-gray-700">
                  Ittechsolutionmaster Recruitment offers a vast network of
                  employers and candidates, connecting talent with suitable job
                  opportunities efficiently. By outsourcing recruitment to a
                  specialized agency, you can save time, reduce administrative
                  burdens, and find the right fit for your organization.
                </p>
              </div>

              <div className="my-11 leading-[1.7rem]">
                <button
                  onClick={handleButtonClick}
                  className="float-left min-w-[31px] py-[10px] px-[16px] appearance-none bg-[#6875e2] border border-[#6875e2] hover:bg-[#4757e7]
        rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] 
        shadow-none box-border text-white cursor-pointer inline-block font-lato text-[1.125rem] font-bold"
                >
                  I'm interested
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
