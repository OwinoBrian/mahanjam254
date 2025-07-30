async function fetchEscorts() {
  try {
    const response = await fetch("http://https://mahanjam254.onrender.com/api/escorts");
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

  escorts.forEach(record => {
    const escort = record.fields;
    const username = escort.telegram_username?.replace('@', '');

    const card = `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="job-item p-4 mb-4">
          <h5>${escort.Name || "Unnamed Escort"}</h5>
          <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${escort.Location || "Undisclosed"}</p>
          <p>${escort.services || "No services listed."}</p>
          
          ${username ? `
            <a href="https://t.me/${username}" class="btn btn-outline-primary telegram-btn" target="_blank">
              <i class="fab fa-telegram-plane"></i> Chat on Telegram
            </a>
          ` : `
            <p class="text-muted"><i class="fa fa-times-circle"></i> Telegram not available</p>
          `}
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}


// Kick off on page load
document.addEventListener("DOMContentLoaded", fetchEscorts);
