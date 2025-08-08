// escort-detail.js

// Helper: Get ID from URL
function getEscortIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Helper: Populate the DOM
function populateEscortDetail(record) {
    if (!record || !record.fields) {
        alert("Escort data missing.");
        return;
    }
    const fields = record.fields;

    // Fill Carousel
    const photos = fields.Photo || [];
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        carouselInner.innerHTML = photos.map((photo, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${photo.url}" class="d-block w-100 h-100" style="object-fit:cover; height:350px;" alt="Escort Photo ${index + 1}">
            </div>
        `).join('');
    }

    // Update Video if available
    const videoEl = document.querySelector("video");
    if (videoEl && fields.video && fields.video[0]?.url) {
        const sourceEl = videoEl.querySelector("source");
        if (sourceEl) {
            sourceEl.src = fields.video[0].url;
            videoEl.poster = photos[0]?.url || "img/default.jpg";
            videoEl.load();
        }
    }

    // Summary Section
    if (document.getElementById('escort-name')) {
        document.getElementById('escort-name').textContent = fields.Name || 'N/A';
    }
    if (document.getElementById('escort-gender')) {
        document.getElementById('escort-gender').textContent = fields.Gender || 'N/A';
    }
    if (document.getElementById('escort-location')) {
        document.getElementById('escort-location').textContent = fields.Location || 'Nairobi';
    }
    if (document.getElementById('escort-services')) {
    const servicesArr = (fields.services || '').split(',').map(s => s.trim()).filter(s => s);
    document.getElementById('escort-services').innerHTML = servicesArr.length
        ? `<ul style="padding-left:18px; margin-bottom:0;">${servicesArr.map(s => `<li>${s}</li>`).join('')}</ul>`
        : 'N/A';
    }
    if (document.getElementById('escort-availability')) {
        document.getElementById('escort-availability').textContent = fields.Availability || 'N/A';
    }
    if (document.getElementById('escort-about')) {
        document.getElementById('escort-about').textContent = fields.about || '';
    }
    if (document.getElementById('escort-contact-links')) {
        const telegram = fields.telegram_username ? `https://t.me/${fields.telegram_username.replace('@','')}` : null;
        const phone = fields.phone ? `tel:${fields.phone}` : null;
        document.getElementById('escort-contact-links').innerHTML = `
            ${telegram ? `<a href="${telegram}" target="_blank" class="btn btn-danger rounded-pill me-2 telegram-btn"><i class="fab fa-telegram-plane"></i> Chat on Telegram</a>` : ''}
            ${phone ? `<a href="${phone}" class="btn btn-danger rounded-pill"><i class="fa fa-phone"></i> Call Escort</a>` : ''}
        `;
    }
}

// Main Loader
function loadEscortDetail() {
    const escortId = getEscortIdFromURL();
    if (!escortId) {
        alert("No escort ID provided in URL.");
        return;
    }

    fetch(`https://mahanjam254.onrender.com/api/escorts/${escortId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Escort not found (API returned " + response.status + ")");
            }
            return response.json();
        })
        .then(record => {
            console.log("Fetched record:", record); // Debug log
            populateEscortDetail(record);
        })
        .catch(err => {
            console.error("Error fetching escort:", err);
            alert("Escort not found.");
        });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", loadEscortDetail);