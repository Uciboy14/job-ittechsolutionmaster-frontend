import React from "react";
import JobDescription from "./JobDescription";

const jobDetails = {
  jobTitle: "Data Entry Specialist - US Remote",
  experience: "Entry-level (0-2 years)",
  employmentType: "Full-time, Remote",
  salary: "$35K - $45K",
  industry: "Administration",
  remote: true,
  companyName: "Ittechsolutionmaster Recruitment",
  companyDescription: "is a leading provider of administrative staffing services. Our goal is to match qualified candidates with opportunities across the country, specializing in remote and flexible job placements.",
  jobResponsibilities: [
    "Accurately enter data into spreadsheets, databases, and company systems.",
    "Review and verify data for accuracy and completeness.",
    "Organize and maintain files, ensuring all information is properly categorized and updated.",
    "Assist with generating reports and compiling data summaries as required.",
    "Collaborate with other departments to ensure data accuracy across the company.",
    "Maintain confidentiality of sensitive information and adhere to data protection policies."
  ],
  jobRequirements: [
    "High school diploma or equivalent.",
    "Strong attention to detail and accuracy in data entry tasks.",
    "Proficiency in using Microsoft Office Suite (Word, Excel) or similar software.",
    "Good typing speed (40 WPM or higher) and accuracy.",
    "Basic knowledge of databases and data management systems.",
    "Ability to work independently and manage time effectively.",
    "Strong written and verbal communication skills."
  ],
  preferredQualifications: [
    "Previous experience in data entry or administrative roles is a plus but not required.",
    "Experience with Google Workspace (Docs, Sheets) or similar online tools.",
    "Familiarity with CRM software or data entry platforms like Salesforce or SAP.",
    "Ability to multitask and handle large amounts of data efficiently."
  ],
  benefits: [
    "Competitive salary with annual bonuses.",
    "Remote work flexibility with opportunities for career growth.",
    "Comprehensive health, dental, and vision insurance.",
    "401(k) plan with employer matching.",
    "Paid time off, including sick leave and holidays.",
    "Access to ongoing professional development and training."
  ]
};

const JobDetails = () => {
  return (
    <section>
      <JobDescription {...jobDetails} />
    </section>
  );
};

export default JobDetails;
