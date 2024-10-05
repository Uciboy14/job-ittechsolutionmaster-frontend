import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonComp from "../components/Skeleton";

const JobApplication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "None",
    countryCode: "+1",
    street: "",
    zip: "",
    city: "",
    state: "",
    country: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const titles = ["None", "Mr.", "Mrs.", "Ms."];
  const countries = [
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    // Add more countries as needed
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      const centerY = window.innerHeight / 2;

      window.scrollTo({
        top: centerY,
        behavior: "smooth",
      });
    }, 2000);
  }, []);

  // FILE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      if (file) {
        setSelectedFile(file);
        setFormData({ ...formData, [name]: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission started"); // Check if this is printed

    const formDataToSend = new FormData();

    formDataToSend.append("first_name", formData.firstName); // Updated to match serializer
    formDataToSend.append("last_name", formData.lastName); // Updated to match serializer
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("country_code", formData.countryCode); // Updated to match serializer
    formDataToSend.append("street", formData.street);
    formDataToSend.append("zip_code", formData.zip); // Updated to match serializer
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);

    if (selectedFile) {
      formDataToSend.append("resume", selectedFile); // Append file if available
    }

    console.log("form data: ", formDataToSend);
    try {
      const response = await fetch("http://localhost:8000/api/applications/", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response received"); // Check if this is printed

      if (response.ok) {
        console.log("Form submitted successfully!");
        navigate("/payment");
      } else {
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="opacity-100 relative z-4 w-full rounded-[4px] min-w-[300px] max-w-[1024px] mx-auto">
      {isLoading ? (
        <div>
          <SkeletonComp />
        </div>
      ) : (
        <>
          <div className="opacity-100 relative z-4 w-full rounded-[4px] min-w-[300px] max-w-[1024px] mx-auto">
            <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8 block">
              <Breadcrumb currentStep="application" />
              <div className="relative block">
                <div className="block w-full max-w-[754px] mx-auto font-lato text-[0.9375rem]">
                  <div className="inline-block w-full py-6 pt-6 border-t border-[#f2f4f9]">
                    <h3 className="font-lato font-semibold text-[#232933] leading-[1.1875rem] mb-4 relative">
                      Basic Info
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white rounded-md"
                    >
                      {/* First Name */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          First Name
                        </label>
                        <div className="flex">
                          <select
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-l px-2 py-2 w-[20%]"
                          >
                            {titles.map((title) => (
                              <option key={title} value={title}>
                                {title}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-2 border-gray-300 rounded-r-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                            placeholder="First Name"
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="Last Name"
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="Email"
                        />
                      </div>

                      {/* Mobile */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Mobile
                        </label>
                        <div className="flex">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="border-2 border-gray-300 rounded-l px-2 py-2 w-[20%]"
                          >
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.name} ({country.code})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-2 border-gray-300 rounded-r-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>

                      {/* Address Information */}
                      <h3 className="mt-12 font-lato font-semibold text-[#232933] leading-[1.1875rem] mb-4 relative">
                        Address Information
                      </h3>

                      {/* Street Address */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="Street Address"
                        />
                      </div>

                      {/* City */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="City"
                        />
                      </div>

                      {/* State */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="State"
                        />
                      </div>

                      {/* Zip Code */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="Zip Code"
                        />
                      </div>

                      {/* Country */}
                      <div className="mb-4">
                        <label className="font-lato text-[0.9375rem] text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="border-2 border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                          placeholder="Country"
                        />
                      </div>

                      {/* Attach Information */}
                      <h3 className="mt-12 font-lato font-semibold text-[#232933] leading-[1.1875rem] mb-4 relative">
                        Attachment Information
                      </h3>

                      {/* Resume Upload */}
                      <div className="mb-4">
                        {/* Label */}
                        <label className="font-lato text-[0.9375rem]  text-[#5c6575] w-full text-left pr-0 leading-[22px]">
                          Resume
                        </label>

                        {/* Upload Box */}
                        <div className="py-3 px-4 bg-[#f5f6fa] border border-dashed border-[#232933] rounded-md text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out">
                          <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                            className="hidden"
                            id="resumeUpload"
                          />
                          <label
                            htmlFor="resumeUpload"
                            className="cursor-pointer text-[#232933] font-medium"
                          >
                            Browse
                          </label>
                        </div>

                        {/* Display selected file */}
                        {selectedFile && (
                          <div className="mt-2 flex items-center justify-between bg-[#f5f6fa] p-2 rounded-md border border-gray-300">
                            <span className="text-sm text-gray-700 truncate max-w-[70%]">
                              {selectedFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="text-red-500 font-bold ml-2"
                            >
                              x
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="float-left min-w-[31px] py-[6px] px-[16px] appearance-none bg-[#6875e2] border border-[#6875e2] hover:bg-[#4757e7]
        rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] 
        shadow-none box-border text-white cursor-pointer inline-block font-lato text-[1.125rem] font-bold mt-4"
                      >
                        Submit Application
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobApplication;
