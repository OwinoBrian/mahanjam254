async function fetchEscorts() {
  try {
    const response = await fetch("https://mahanjam254.onrender.com/api/escorts");
    const data = await response.json();
    const escorts = data.records;

    // Render to the page
    renderEscortCards(escorts);
  } catch (error) {
    console.error("Error fetching escorts:", error);
    document.getElementById("escort-listings").innerHTML = `<p class="text-white">Failed to load data.</p>`;
  }
}

function renderEscortCards(escorts) {
  const container = document.getElementById("escort-listings");
  container.innerHTML = "";

  // Collect unique locations
  const locationsSet = new Set();
  escorts.forEach(record => {
    const escort = record.fields;
    if (escort.Location) {
      locationsSet.add(escort.Location);
    }
  });

  // --- Inject manual locations here ---
  const manualLocations = ['Gilgil','Naivasha','Dunga','Mamboleo', 'Nyali', 'Bamburi', 'Mtwapa', 'Shanzu', 'Tudor', 'Likoni', 'Changamwe','Lavington', 'Eastleigh', 'Lang’ata', 'South B', 'Kasarani','Parklands','Thika Rd', 'Nyalenda', 'Kahawa Sukari','Westlands' ,'Kilimani', 'CBD' ,'Karen' ,'Upper Hill', 'Parklands', 'Nyali', 'Bamburi', 'Mtwapa', 'Shanzu', 'Milimani','Dunga Beach', 'Kapsoya', 'West Indies' ]; // Add your custom locations
  manualLocations.forEach(loc => locationsSet.add(loc));
  //
  const locations = Array.from(locationsSet);

  // Render location filter buttons
  const filterContainer = document.getElementById("escort-location-filters");
  filterContainer.innerHTML = `
    <button class="btn btn-outline-primary mx-1 escort-location-filter active" data-location="All">All</button>
    ${locations.map(loc => `
      <button class="btn btn-outline-primary mx-1 escort-location-filter" data-location="${loc}">${loc}</button>
    `).join('')}
  `;

  // Render escort cards
  escorts.forEach(record => {
    const escort = record.fields;
    const username = escort.telegram_username?.replace('@', '');
    const propicUrl = escort.propic && escort.propic[0]?.url
      ? escort.propic[0].url
      : 'img/default-profile.png'; // fallback image

    const card = `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" data-location="${escort.Location || 'Undisclosed'}">
        <div class="job-item p-4 mb-4 d-flex align-items-center justify-content-between" style="gap:16px;">
          <div style="flex:1;">
            <a href="job-detail.html?id=${record.id}" style="text-decoration: none; color: inherit;">
              <h5>${escort.Name || "Unnamed Escort"}</h5>
              <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${escort.Location || "Undisclosed"}</p>
              
              <p class="escort-services-truncate">${escort.services || "No services listed."}</p>
              
            </a>
            ${username ? `
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a href="https://t.me/${username}" class="btn btn-outline-primary telegram-btn" target="_blank">
                <i class="fab fa-telegram-plane"></i> Chat on Telegram
              </a>
              <a href="job-detail.html?id=${record.id}" class="btn btn-outline-primary telegram-btn">
                <i class="fa fa-user"></i> View Profile
              </a>
            </div>
          ` : `
            <p class="text-muted"><i class="fa fa-times-circle"></i> Telegram not available</p>
            <a href="job-detail.html?id=${record.id}" class="btn btn-outline-primary telegram-btn">
              <i class="fa fa-user"></i> View Profile
            </a>
`}
          </div>
          <div style="flex-shrink:0;">
            <img src="${propicUrl}" alt="Profile Picture" style="width:150px; height:150px; object-fit:cover; border-radius:50%; border:2px solid #e52d27;">
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });

  // Add filtering logic after rendering buttons
  filterContainer.querySelectorAll('.escort-location-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      const selected = this.getAttribute('data-location');
      container.querySelectorAll('[data-location]').forEach(card => {
        if (selected === 'All' || card.getAttribute('data-location') === selected) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
      filterContainer.querySelectorAll('.escort-location-filter').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}


// Kick off on page load
document.addEventListener("DOMContentLoaded", fetchEscorts);
