// escort-detail.js

// Helper: Get ID from URL
function getEscortIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Helper: Populate the DOM
function populateEscortDetail(record) {
    const fields = record.fields;

    // Fill Carousel
    const photos = fields.Photos || [];
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = photos.map((photo, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${photo.url}" class="d-block w-100 h-100" style="object-fit:cover; height:350px;" alt="Escort Photo ${index + 1}">
        </div>
    `).join('');

    // Update Video if available
    const videoEl = document.querySelector("video");
    if (fields.Video && fields.Video[0]?.url) {
        videoEl.querySelector("source").src = fields.Video[0].url;
        videoEl.load();
        videoEl.poster = photos[0]?.url || "img/default.jpg";
    }

    // Summary Section
    document.querySelector('#escort-detail').querySelector('.col-lg-4').innerHTML = `
        <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
            <h4 class="mb-4">Escort Profile Summary</h4>
            <p><i class="fa fa-user text-primary me-2"></i><strong>Name:</strong> ${fields.Name || 'N/A'}</p>
            <p><i class="fa fa-venus-mars text-primary me-2"></i><strong>Gender:</strong> ${fields.Gender || 'N/A'}</p>
            <p><i class="fa fa-map-marker-alt text-primary me-2"></i><strong>Location:</strong> ${fields.Location || 'Nairobi'}</p>
            <p><i class="fa fa-star text-primary me-2"></i><strong>Services:</strong> ${fields.Services?.join(', ') || 'N/A'}</p>
            <p><i class="fa fa-clock text-primary me-2"></i><strong>Availability:</strong> ${fields.Availability || 'N/A'}</p>
            <p><i class="fa fa-info-circle text-primary me-2"></i><strong>About:</strong> ${fields.About || ''}</p>
        </div>
    `;
}

// Main Loader
function loadEscortDetail() {
    const escortId = getEscortIdFromURL();
    if (!escortId) {
        alert("No escort ID provided.");
        return;
    }

    base('Escorts').find(escortId, function(err, record) {
        if (err) {
            console.error(err);
            alert("Escort not found.");
            return;
        }

        populateEscortDetail(record);
    });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", loadEscortDetail);
