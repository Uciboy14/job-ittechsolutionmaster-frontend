import React from 'react'
import { Link } from 'react-router-dom'


const Breadcrumb = ({ currentStep}) => {
  return (
    <div>
        <ul className="list-none border-b border-[#f2f4f9] py-3 font-[500] flex flex-wrap items-center space-x-2">
          <li className="flex items-center">
            <Link
              to="/payment"
              className="text-[#6875E2] no-underline text-[.9375rem] font-lato"
            >
              Job listing
            </Link>
            <span className="mx-2 text-[15px] text-[#5c6575]">&gt;</span>
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className={`no-underline text-[.9375rem] font-lato ${
                currentStep === "details" || currentStep === "application"
                ? "text-[#6875E2]"
                : "text-[#5c6575]"
            }`}
              
            >
              Job details
            </Link>
            {currentStep === "application" && (
                <span className='mx-2 text-[15px] text-[#5c6575]'>&gt;</span>
            )}
          </li>
          {currentStep === "application" && (
            <li className='flex items-center'>
                <Link
                to="/job-application"
                className='no-underline text-[.9375rem] font-lato text-[#5c6575]'>
                    Job application
                </Link>
            </li>
          )}
        </ul>
    </div>
  )
}

export default Breadcrumb