
    const airtableToken = "patCN3rBvij927PsB.4501f12b46228a4af6ed65cfc3a5d3d9532da185c46d09e4abe5882a23a061eb";
    const baseId = "appzAyJdHNvrCu67F";
    const tableName = "Job Postings";

    async function fetchJobsFromAirtable(filters = {}) {
        try {
            const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?pageSize=100`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                }
            });

            const data = await response.json();

            const featuredContainer = document.getElementById("featured-jobs");
            const fullTimeContainer = document.getElementById("fulltime-jobs");
            const partTimeContainer = document.getElementById("parttime-jobs");

            featuredContainer.innerHTML = "";
            fullTimeContainer.innerHTML = "";
            partTimeContainer.innerHTML = "";

            // Filter the jobs
            const filteredJobs = data.records.filter(record => {
                const job = record.fields;

                const keyword = filters.keyword?.toLowerCase() || "";
                const category = filters.category || "";
                const location = filters.location?.toLowerCase() || "";

                const matchKeyword = !keyword || (job["Job Title"]?.toLowerCase().includes(keyword) || job["Description"]?.toLowerCase().includes(keyword));
                const matchCategory = !category || (Array.isArray(job["Job Type"]) ? job["Job Type"].includes(category) : job["Job Type"] === category);
                const matchLocation = !location || job["Location"]?.toLowerCase().includes(location);

                return matchKeyword && matchCategory && matchLocation;
            });

            // Render filtered jobs
            filteredJobs.forEach(record => {
                const job = record.fields;
                const jobTypes = job["Job Type"];

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
                if (Array.isArray(jobTypes)) {
                    if (jobTypes.includes("Featured")) featuredContainer.innerHTML += jobHTML;
                    if (jobTypes.includes("Full-time")) fullTimeContainer.innerHTML += jobHTML;
                    if (jobTypes.includes("Part-time")) partTimeContainer.innerHTML += jobHTML;
                } else if (typeof jobTypes === "string") {
                    if (jobTypes === "Featured") featuredContainer.innerHTML += jobHTML;
                    if (jobTypes === "Full-time") fullTimeContainer.innerHTML += jobHTML;
                    if (jobTypes === "Part-time") partTimeContainer.innerHTML += jobHTML;
                }
            });

            populateCategoryAndLocationOptions(data.records); // Populate filter dropdowns

        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    }

    function populateCategoryAndLocationOptions(records) {
        const categorySelect = document.getElementById("search-category");
        const locationSelect = document.getElementById("search-location");

        const categories = new Set();
        const locations = new Set();

        records.forEach(record => {
            const job = record.fields;
            const jobTypes = job["Job Type"];
            const location = job["Location"];

            if (Array.isArray(jobTypes)) jobTypes.forEach(type => categories.add(type));
            else if (jobTypes) categories.add(jobTypes);

            if (location) locations.add(location);
        });

        categorySelect.innerHTML = `<option value="">All Job Types</option>`;
        categories.forEach(type => {
            categorySelect.innerHTML += `<option value="${type}">${type}</option>`;
        });

        locationSelect.innerHTML = `<option value="">All Locations</option>`;
        locations.forEach(loc => {
            locationSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
        });
    }

    // Handle Apply Now click
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("apply-now-btn")) {
            const jobData = JSON.parse(e.target.getAttribute("data-job").replace(/&apos;/g, "'"));
            localStorage.setItem("selectedJob", JSON.stringify(jobData));
            window.location.href = "job-detail.html";
        }
    });

    // Search Button Event
    document.getElementById("search-btn").addEventListener("click", function () {
        const keyword = document.getElementById("search-keyword").value.trim();
        const category = document.getElementById("search-category").value;
        const location = document.getElementById("search-location").value.trim();
        fetchJobsFromAirtable({ keyword, category, location });
    });

    // Load jobs on page load without filters
    document.addEventListener("DOMContentLoaded", () => fetchJobsFromAirtable());

