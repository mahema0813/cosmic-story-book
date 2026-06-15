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
  renderStories();
}

  else if (currentPage === "write") {
  content.innerHTML = `
    <h2>✍️ Write</h2>

    <input
      type="text"
      id="storyTitle"
      placeholder="Story Title"
      style="
        width:100%;
        padding:10px;
        margin-bottom:10px;
        border-radius:10px;
      "
    >

    <textarea
      id="storyBody"
      placeholder="Begin your story..."
      style="
        width:100%;
        height:50%;
        border-radius:10px;
        padding:15px;
        font-family:'Comic Sans MS', cursive;
        font-size:16px;
      "
    ></textarea>

    <br><br>

    <button onclick="saveStory()">
      🌙 Save Story
    </button>
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
  renderCharacters();
}
  else {
    content.innerHTML = `
      <h2>🌙 Welcome</h2>
      <p>Select a page from the left.</p>
    `;

    /* 🌌 MOOD BOARD SYSTEM */

function setupMoodBoard() {

  const upload = document.getElementById("imageUpload");
  const gallery = document.getElementById("gallery");

  let savedImages =
    JSON.parse(localStorage.getItem("moonveilImages")) || [];

  renderImages(savedImages);

  upload.addEventListener("change", function() {

    const files = upload.files;

    for (let file of files) {

      const reader = new FileReader();

      reader.onload = function(e) {

        savedImages.push(e.target.result);

        localStorage.setItem(
          "moonveilImages",
          JSON.stringify(savedImages)
        );

        renderImages(savedImages);
      };

      reader.readAsDataURL(file);
    }
  });

  function renderImages(images) {

    gallery.innerHTML = "";

    images.forEach(src => {

      const img = document.createElement("img");

      img.src = src;

      gallery.appendChild(img);

    });

  }

}
  }
}
/* 🌙 STORY SYSTEM */

function saveStory() {

  const title =
    document.getElementById("storyTitle").value.trim();

  const body =
    document.getElementById("storyBody").value.trim();

  if (!title || !body) {
    alert("Please enter both a title and story.");
    return;
  }

  let stories =
    JSON.parse(localStorage.getItem("moonveilStories")) || [];

  stories.push({
    title: title,
    body: body
  });

  localStorage.setItem(
    "moonveilStories",
    JSON.stringify(stories)
  );

  alert("Story saved 🌙");

  goTo("stories");
}

function renderStories() {

  const content =
    document.getElementById("content");

  let stories =
    JSON.parse(localStorage.getItem("moonveilStories")) || [];

  let html = `
    <h2>📖 Stories</h2>
  `;

  if (stories.length === 0) {

    html += `
      <p>No stories saved yet.</p>
    `;

  } else {

    stories.forEach((story, index) => {

      html += `
        <div
          class="story-card"
          onclick="openStory(${index})"
        >
          🌙 ${story.title}
        </div>
      `;
    });

  }

  content.innerHTML = html;
}

function openStory(index) {

  const stories =
    JSON.parse(localStorage.getItem("moonveilStories")) || [];

  const story = stories[index];

  document.getElementById("content").innerHTML = `
    <h2>${story.title}</h2>

    <div class="story-view">
      ${story.body.replace(/\n/g, "<br>")}
    </div>
  `;
}
/* 🎭 CHARACTER SYSTEM */

function renderCharacters() {

  const content =
    document.getElementById("content");

  let characters =
    JSON.parse(localStorage.getItem("moonveilCharacters")) || [];

  let html = `
    <h2>🎭 Character Snapshots</h2>

    <input
      type="text"
      id="characterName"
      placeholder="Character Name"
      style="
        width:100%;
        padding:10px;
        margin-bottom:10px;
        border-radius:10px;
      "
    >

    <textarea
      id="characterDescription"
      placeholder="Describe your character..."
      style="
        width:100%;
        height:120px;
        padding:10px;
        border-radius:10px;
      "
    ></textarea>

    <br><br>

    <input
      type="file"
      id="characterImage"
      accept="image/*"
    >

    <br><br>

    <button onclick="saveCharacter()">
      🌙 Save Character
    </button>

    <hr>
  `;

  characters.forEach((character, index) => {

    html += `
      <div class="character-card">
        ${
          character.image
          ? `<img src="${character.image}">`
          : ""
        }

        <h3>⭐ ${character.name}</h3>

        <p>${character.description}</p>
      </div>
    `;
  });

  content.innerHTML = html;
}
function saveCharacter() {

  const name =
    document.getElementById("characterName").value.trim();

  const description =
    document.getElementById("characterDescription").value.trim();

  const imageFile =
    document.getElementById("characterImage").files[0];

  if (!name || !description) {
    alert("Please fill all fields.");
    return;
  }

  let characters =
    JSON.parse(localStorage.getItem("moonveilCharacters")) || [];

  if (imageFile) {

    const reader = new FileReader();

    reader.onload = function(e) {

      characters.push({
        name,
        description,
        image: e.target.result
      });

      localStorage.setItem(
        "moonveilCharacters",
        JSON.stringify(characters)
      );

      renderCharacters();
    };

    reader.readAsDataURL(imageFile);

  } else {

    characters.push({
      name,
      description,
      image: ""
    });

    localStorage.setItem(
      "moonveilCharacters",
      JSON.stringify(characters)
    );

    renderCharacters();
  }
}
