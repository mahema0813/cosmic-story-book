function openBook() {
  document.getElementById("book").style.display = "none";
  document.getElementById("openBook").classList.remove("hidden");
}

/* 🌙 state system */
let currentPage = "home";

/* 📖 navigation */
function goTo(page) {
  currentPage = page;
  renderPage();
}

/* 📜 renderer */
function renderPage() {
  const content = document.getElementById("content");

  // restart animation trick (for page flip feel)
  content.style.animation = "none";
  void content.offsetWidth;
  content.style.animation = "pageFlip 0.5s ease";

  if (currentPage === "stories") {
    content.innerHTML = `
      <h2>📖 Stories</h2>
      <p>Your written worlds will appear here like constellations of memory.</p>
    `;
  }

  else if (currentPage === "write") {
    content.innerHTML = `
      <h2>✍️ Write</h2>
      <textarea style="width:100%; height:70%; border-radius:10px; padding:10px;"></textarea>
    `;
  }

  else if (currentPage === "mood") {
  content.innerHTML = `
    <h2>🌌 Mood Board</h2>

    <input
      type="file"
      id="imageUpload"
      accept="image/*"
      multiple
    >

    <div id="gallery"></div>
  `;

  setupMoodBoard();
}
  else if (currentPage === "characters") {
    content.innerHTML = `
      <h2>🎭 Characters</h2>
      <p>Every soul in Moonveil begins as a sketch of starlight.</p>
    `;
  }

  else {
    content.innerHTML = `
      <h2>🌙 Welcome</h2>
      <p>Select a page from the left.</p>
    `;
  }
}
