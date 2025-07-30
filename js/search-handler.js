
    const airtableToken = "YOUpatCN3rBvij927PsBR_AIRTABLE_TOKEN";
    const baseId = "appzAyJdHNvrCu67F";
    const tableName = "Job Postings";

    // Populate Job Types & Locations
    async function populateDropdowns() {
        try {
            const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?pageSize=100`;
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${airtableToken}` }
            });
            const data = await response.json();

            const jobTypeSet = new Set();
            const locationSet = new Set();

            data.records.forEach(record => {
                const job = record.fields;

                // Add job types
                const jobTypes = job["Job Type"];
                if (Array.isArray(jobTypes)) {
                    jobTypes.forEach(type => jobTypeSet.add(type));
                } else if (jobTypes) {
                    jobTypeSet.add(jobTypes);
                }

                // Add locations
                const location = job["Location"];
                if (location) locationSet.add(location);
            });

            const categorySelect = document.getElementById("search-category");
            jobTypeSet.forEach(type => {
                const option = document.createElement("option");
                option.value = type;
                option.textContent = type;
                categorySelect.appendChild(option);
            });

            const locationSelect = document.getElementById("search-location");
            locationSet.forEach(loc => {
                const option = document.createElement("option");
                option.value = loc;
                option.textContent = loc;
                locationSelect.appendChild(option);
            });
        } catch (err) {
            console.error("Error loading dropdowns:", err);
        }
    }

    populateDropdowns();

    // Handle Search Button Click or Enter Key
    document.getElementById("search-btn").addEventListener("click", function () {
        const keyword = document.getElementById("search-keyword")?.value.trim();
        const category = document.getElementById("search-category").value;
        const location = document.getElementById("search-location").value;

        const queryParams = new URLSearchParams();
        if (keyword) queryParams.append("keyword", keyword);
        if (category) queryParams.append("category", category);
        if (location) queryParams.append("location", location);

        window.location.href = "job-list.html?" + queryParams.toString();
    });

    // Support Enter key on keyword input
    document.getElementById("search-keyword")?.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("search-btn").click();
        }
    });

