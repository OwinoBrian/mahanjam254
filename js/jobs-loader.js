
    const airtableToken = "patCN3rBvij927PsB.4501f12b46228a4af6ed65cfc3a5d3d9532da185c46d09e4abe5882a23a061eb";
    const baseId = "appzAyJdHNvrCu67F";
    const tableName = "Job Postings";

    async function fetchJobsFromAirtable() {
        try {
            const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                }
            });

            const data = await response.json();

            const omanContainer = document.getElementById("Oman-jobs");
            const dubaiContainer = document.getElementById("Dubai-jobs");
            const qatarContainer = document.getElementById("Qatar-jobs");
            const saudiarabiaContainer = document.getElementById("saudiarabia-jobs");

            omanContainer.innerHTML = "";
            dubaiContainer.innerHTML = "";
            qatarContainer.innerHTML = "";
            saudiarabiaContainer.innerHTML = "";

            data.records.forEach(record => {
                const job = record.fields;
                const jobLocation = job["Location"];

                const jobHTML = `
                    <div class="col-12">
                        <div class="job-item p-4 mb-4 border rounded">
                            <div class="row g-4">
                                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                    <img 
                                        class="flex-shrink-0 img-fluid border rounded"
                                        src="${job['Job Pic'] ? job['Job Pic'] : 'img/default.jpg'}"
                                        alt="logo"
                                        style="width: 80px; height: 80px;"
                                    >
                                    <div class="text-start ps-4">
                                        <h5 class="mb-3">${job['Job Title'] || ''}</h5>
                                        <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${job['Location'] || ''}</span>
                                        <span class="text-truncate me-3"><i class="far fa-calendar-alt text-primary me-2"></i>${job['Date Posted'] || ''}</span>
                                        <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${job['Salary Range'] || ''}</span>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    <div class="d-flex mb-3">
                                        <button class="btn btn-primary apply-now-btn" data-job='${JSON.stringify(job).replace(/'/g, "&apos;")}'>
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Append to the correct container(s)
                if (Array.isArray(jobLocation)) {
                    if (jobLocation.includes("Dubai")) dubaiContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Oman")) omanContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Qatar")) qatarContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Saudi Arabia")) saudiarabiaContainer.innerHTML += jobHTML;
                } else if (typeof jobLocation === "string") {
                    if (jobLocation.includes("Dubai")) dubaiContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Oman")) omanContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Qatar")) qatarContainer.innerHTML += jobHTML;
                    if (jobLocation.includes("Saudi Arabia")) saudiarabiaContainer.innerHTML += jobHTML;
                }
            });
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    }

    // Load jobs on page load
    document.addEventListener("DOMContentLoaded", fetchJobsFromAirtable);

    // Handle Apply Now click
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("apply-now-btn")) {
            const jobData = JSON.parse(e.target.getAttribute("data-job").replace(/&apos;/g, "'"));
            localStorage.setItem("selectedJob", JSON.stringify(jobData));
            window.location.href = "job-detail.html";
        }
    });

    // Handle Search Form submission
    

