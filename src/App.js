import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BackToTopButton from "./components/BackToTopButton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import JobDetails from "./components/JobDetails";
import JobApplication from "./pages/JobApplication";
import PaymentPage from "./pages/PaymentPage";


function App() {
  return (
    <Router>
      <div className="App">
      <Hero jobTitle="Data Entry Specialist" />
        <Routes>
          <Route path="/" element={<><JobDetails /></>} />
          <Route path="/job-application" element={<JobApplication />} />
          <Route path="/payment" element={< PaymentPage/>} />
        </Routes>
        <BackToTopButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
