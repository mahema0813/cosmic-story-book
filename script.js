function openBook() {
  document.getElementById("book").style.display = "none";
  document.getElementById("openBook").classList.remove("hidden");
}

/* PAGE SYSTEM */
let currentPage = "home";

function goTo(page) {
  currentPage = page;
  renderPage();
}

/* CONTENT SWITCHER */
function renderPage() {
  const content = document.getElementById("content");

  if (currentPage === "stories") {
    content.innerHTML = "<h2>📖 Stories</h2><p>Your stories will appear here.</p>";
  }

  else if (currentPage === "write") {
    content.innerHTML = "<h2>✍️ Write</h2><textarea style='width:100%; height:70%;'></textarea>";
  }

  else if (currentPage === "mood") {
    content.innerHTML = `
      <h2>🌌 Mood Board</h2>
      <input type="file" accept="image/*">
      <p>Upload your cosmic images here.</p>
    `;
  }

  else if (currentPage === "characters") {
    content.innerHTML = "<h2>🎭 Characters</h2><p>Your characters will live here.</p>";
  }

  else {
    content.innerHTML = "<h2>🌙 Welcome</h2><p>Select a page from the left.</p>";
  }
}
