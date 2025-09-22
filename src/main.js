// dark theme
const ThemeToggleBtn = document.getElementById("ThemeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  sunIcon.classList.remove("hidden");
  moonIcon.classList.add("hidden");
} else {
  document.body.classList.remove("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
}
ThemeToggleBtn.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  moonIcon.classList.toggle("hidden", isDark);
  sunIcon.classList.toggle("hidden", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// handel active class
const buttons = document.querySelectorAll("#btnContainer button");
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      btn.removeAttribute("data-active");
    });
    e.target.setAttribute("data-active", "true");
    loadExtensions(e.target.innerText);
  });
});

// get extensions
const extensionsList = document.getElementById("extensionsList");
async function loadExtensions(status) {
  try {
    const res = await fetch("data.json");
    let data = await res.json();
    if (status === "Active") {
      data = data.filter((ext) => ext.isActive === true);
    }
    if (status === "Inactive") {
      data = data.filter((ext) => ext.isActive === false);
    }
    extensionsList.innerHTML = "";
    data.forEach((ext) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div class="card-header">
          <img src="${ext.logo}" alt="${ext.name}" class="card-img"/>
          <div class="card-info">
            <h2 class="card-title">${ext.name}</h2>
            <p class="card-description">${ext.description}</p>
          </div>
        </div>
        <div class="card-control">
          <button class="card-btn">Remove</button>
          <label class="card-label">
            <input type="checkbox" class="sr-only peer" ${
              ext.isActive ? "checked" : ""
            }/>
            <span
              class="card-slider"
            ></span>
          </label>
        </div>`;
      card
        .querySelector(".card-btn")
        .addEventListener("click", () => card.remove());
      extensionsList.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load extensions:", err);
  }
}
loadExtensions();