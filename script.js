/* ==========================
   🌙 MOONVEIL STORIES
========================== */

let currentPage = "home";
let editingStoryIndex = null;
let editingCharacterIndex = null;

/* ==========================
   📕 BOOK CONTROLS
========================== */

function openBook() {
  document.getElementById("book").style.display = "none";
  document.getElementById("openBook").classList.remove("hidden");
}

function closeBook() {
  document.getElementById("openBook").classList.add("hidden");
  document.getElementById("book").style.display = "flex";
}

/* ==========================
   📖 NAVIGATION
========================== */

function goTo(page) {
  currentPage = page;
  renderPage();
}

/* ==========================
   📜 PAGE RENDERER
========================== */

function renderPage() {

  const content =
    document.getElementById("content");

  content.style.animation = "none";
  void content.offsetWidth;
  content.style.animation = "pageFlip 0.5s ease";

  if (currentPage === "stories") {

    renderStories();

  } else if (currentPage === "write") {

    content.innerHTML = `
      <h2>✍️ Write</h2>

      <input
        id="storyTitle"
        type="text"
        placeholder="Story Title"
      >

      <br><br>

      <textarea
        id="storyBody"
        placeholder="Begin your story..."
        style="height:300px;"
      ></textarea>

      <br><br>

      <button onclick="saveStory()">
        🌙 Save Story
      </button>
    `;

  } else if (currentPage === "mood") {

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

  } else if (currentPage === "characters") {

    renderCharacters();

  } else {

    content.innerHTML = `
      <h2>🌙 Welcome to Moonveil</h2>

      <p>
        Select a page from the left to begin your story.
      </p>
    `;
  }
}

/* ==========================
   📖 STORY SYSTEM
========================== */

function saveStory() {

  const title =
    document.getElementById("storyTitle").value.trim();

  const body =
    document.getElementById("storyBody").value.trim();

  if (!title || !body) {

    alert("Please enter a title and story.");

    return;
  }

  let stories =
    JSON.parse(
      localStorage.getItem("moonveilStories")
    ) || [];

if (editingStoryIndex !== null) {

  stories[editingStoryIndex] = {
    title,
    body
  };

  editingStoryIndex = null;

} else {

  stories.push({
    title,
    body
  });

}
   

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
    JSON.parse(
      localStorage.getItem("moonveilStories")
    ) || [];

  let html = `
    <h2>📖 Stories</h2>
  `;

  if (stories.length === 0) {

    html += `
      <p>
        🌙 No stories rest beneath this moon yet.
      </p>
    `;

  } else {

    stories.forEach((story, index) => {

      html += `
        <div class="story-card">

          <h3
            style="cursor:pointer"
            onclick="openStory(${index})"
          >
            🌙 ${story.title}
          </h3>

          <button
            onclick="deleteStory(${index})"
          >
            🗑 Delete
          </button>

        </div>
      `;
    });
  }

  content.innerHTML = html;
}

function openStory(index) {

  let stories =
    JSON.parse(
      localStorage.getItem("moonveilStories")
    ) || [];

  let story = stories[index];

document.getElementById("content").innerHTML = `
  <h2>${story.title}</h2>

  <div class="story-view">
    ${story.body.replace(/\n/g, "<br>")}
  </div>

  <br>

  <button onclick="editStory(${index})">
    ✏️ Edit
  </button>

  <button onclick="goTo('stories')">
    📖 Back
  </button>
 `;
}
function editStory(index) {

  let stories =
    JSON.parse(
      localStorage.getItem("moonveilStories")
    ) || [];

  let story = stories[index];

  editingStoryIndex = index;

  currentPage = "write";

  renderPage();

  document.getElementById("storyTitle").value =
    story.title;

  document.getElementById("storyBody").value =
    story.body;
}


function deleteStory(index) {

  let stories =
    JSON.parse(
      localStorage.getItem("moonveilStories")
    ) || [];

  stories.splice(index, 1);

  localStorage.setItem(
    "moonveilStories",
    JSON.stringify(stories)
  );

  renderStories();
}

/* ==========================
   🌌 MOOD BOARD
========================== */

function setupMoodBoard() {

  const upload =
    document.getElementById("imageUpload");

  const gallery =
    document.getElementById("gallery");

  let images =
    JSON.parse(
      localStorage.getItem("moonveilImages")
    ) || [];

  renderImages();

  upload.addEventListener("change", function () {

    const files = upload.files;

    for (let file of files) {

      const reader = new FileReader();

      reader.onload = function (e) {

        images.push(
          e.target.result
        );

        localStorage.setItem(
          "moonveilImages",
          JSON.stringify(images)
        );

        renderImages();
      };

      reader.readAsDataURL(file);
    }
  });

  function renderImages() {

    gallery.innerHTML = "";

    images.forEach((src, index) => {

      gallery.innerHTML += `
        <div class="image-wrapper">

          <img src="${src}">

          <br><br>

          <button
            onclick="deleteImage(${index})"
          >
            🗑 Delete
          </button>

        </div>
      `;
    });
  }
}

function deleteImage(index) {

  let images =
    JSON.parse(
      localStorage.getItem("moonveilImages")
    ) || [];

  images.splice(index, 1);

  localStorage.setItem(
    "moonveilImages",
    JSON.stringify(images)
  );

  goTo("mood");
}

/* ==========================
   🎭 CHARACTERS
========================== */

function renderCharacters() {

  const content =
    document.getElementById("content");

  let characters =
    JSON.parse(
      localStorage.getItem("moonveilCharacters")
    ) || [];

  let html = `
    <h2>🎭 Character Snapshots</h2>

    <input
      type="text"
      id="characterName"
      placeholder="Character Name"
    >

    <br><br>

    <textarea
      id="characterDescription"
      placeholder="Describe your character..."
      style="height:120px;"
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

        <h3>
          ⭐ ${character.name}
        </h3>

        <p>
          ${character.description}
        </p>

<button
  onclick="editCharacter(${index})"
>
  ✏️ Edit
</button>

<button
  onclick="deleteCharacter(${index})"
>
  🗑 Delete
</button>

      </div>
    `;
  });

  content.innerHTML = html;
}

function saveCharacter() {

  const name =
    document.getElementById("characterName")
      .value.trim();

  const description =
    document.getElementById(
      "characterDescription"
    ).value.trim();

  const image =
    document.getElementById(
      "characterImage"
    ).files[0];

  if (!name || !description) {

    alert("Please fill all fields.");

    return;
  }

  let characters =
    JSON.parse(
      localStorage.getItem(
        "moonveilCharacters"
      )
    ) || [];

  if (image) {

    const reader =
      new FileReader();

    reader.onload = function (e) {

if (editingCharacterIndex !== null) {

  const oldImage =
    characters[editingCharacterIndex].image;

  characters[editingCharacterIndex] = {
    name,
    description,
    image: oldImage
  };

  editingCharacterIndex = null;

} else {

  characters.push({
    name,
    description,
    image: ""
  });

}
       
function editCharacter(index) {

  let characters =
    JSON.parse(
      localStorage.getItem(
        "moonveilCharacters"
      )
    ) || [];

  let character = characters[index];

  editingCharacterIndex = index;

  renderCharacters();

  document.getElementById(
    "characterName"
  ).value = character.name;

  document.getElementById(
    "characterDescription"
  ).value = character.description;
}
      localStorage.setItem(
        "moonveilCharacters",
        JSON.stringify(characters)
      );

      renderCharacters();
    };

    reader.readAsDataURL(image);

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

function deleteCharacter(index) {

  let characters =
    JSON.parse(
      localStorage.getItem(
        "moonveilCharacters"
      )
    ) || [];

  characters.splice(index, 1);

  localStorage.setItem(
    "moonveilCharacters",
    JSON.stringify(characters)
  );

  renderCharacters();
}
