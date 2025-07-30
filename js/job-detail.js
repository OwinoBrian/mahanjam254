
document.addEventListener("DOMContentLoaded", function () {
    const jobData = JSON.parse(localStorage.getItem("selectedJob"));

    if (!jobData) {
        console.error("No job data found in localStorage.");
        return;
    }

    // Set the job title in the header
    const jobTitleHeader = document.getElementById("job-title");
    if (jobTitleHeader) {
        jobTitleHeader.textContent = jobData["Job Title"] || "";
    }

    // Job Image
    const jobImage = document.getElementById("job-image");
    if (jobImage && jobData["Job Pic"]) {
        jobImage.src = jobData["Job Pic"];
    }

    // Job Meta Section with Icons
    const jobLocation = document.getElementById("job-location");
    if (jobLocation) {
        jobLocation.innerHTML = `<i class="fas fa-map-marker-alt me-1 text-gray-600"></i> ${jobData["Location"] || "N/A"}`;
    }

    const jobSalary = document.getElementById("job-salary");
    if (jobSalary) {
        jobSalary.innerHTML = `<i class="fas fa-money-bill me-1 text-gray-600"></i> ${jobData["Salary Range"] || "N/A"}`;
    }

    const jobDatePosted = document.getElementById("job-date");
    if (jobDatePosted) {
        jobDatePosted.innerHTML = `<i class="fas fa-calendar-alt me-1 text-gray-600"></i> ${jobData["Date Posted"] || "N/A"}`;
    }

    const jobType = document.getElementById("job-type");
    if (jobType) {
        const type = Array.isArray(jobData["Job Type"]) 
            ? jobData["Job Type"].join(", ") 
            : (jobData["Job Type"] || "N/A");
        jobType.innerHTML = `<i class="fas fa-briefcase me-1 text-gray-600"></i> ${type}`;
    }

    // Job Description
    const jobDescription = document.getElementById("job-description");
    if (jobDescription) {
        jobDescription.innerHTML = jobData["Job Description"] || "";
    }

    

    // Qualifications
    const jobQualifications = document.getElementById("job-qualifications");
    if (jobQualifications) {
        jobQualifications.innerHTML = jobData["Qualifications"] || "";
    }

    // Experience
    const jobExperience = document.getElementById("job-responsibilities");
    if (jobExperience) {
        jobExperience.innerHTML = jobData["Responsibilities"] || "";
    }

    // Employer or Company Name
    const jobCompany = document.getElementById("job-company");
    if (jobCompany && jobData["Company Name"]) {
        jobCompany.innerHTML = `<i class="fas fa-building me-1 text-gray-600"></i> ${jobData["Company Name"]}`;
    }

    //Summary

    // Job Location
    const jobSalarytxt = document.getElementById("job-Salarytxt");
    if (jobSalarytxt) {
        jobSalarytxt.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i> ${jobData["Salary Range"] || ""}`;
    }

    // Job Location
    if (document.getElementById("job-locationtxt")) {
        (document.getElementById("job-locationtxt")).innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i> ${jobData["Location"] || ""}`;
    }

     // Job Requirements
    const jobRequirementstxt = document.getElementById("job-Requirementstxt");
     if (document.getElementById("job-Requirementstxt")) {
        (document.getElementById("job-Requirementstxt")).innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i> ${jobData["Job Requirements"] || ""}`;
    }



    // Apply Now Button
    const applyNowBtn = document.getElementById("apply-now-detail");
    if (applyNowBtn && jobData["Application Link"]) {
        applyNowBtn.href = jobData["Application Link"];
    }
});

