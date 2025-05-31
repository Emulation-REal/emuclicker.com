// Game state
let subscribers = 0;
let subsPerClick = 1;
let lastClickTimes = [];

// Upgrade data
const upgrades = [
  {
    id: 1,
    name: "Subscribe Button",
    desc: "Increase Subs Per Click by 1",
    cost: 50,
    spcIncrease: 1,
    icon: "fa-solid fa-mouse-pointer",
  },
  {
    id: 2,
    name: "YouTube Logo",
    desc: "Increase Subs Per Click by 3",
    cost: 100,
    spcIncrease: 3,
    icon: "fa-brands fa-youtube",
  },
  {
    id: 3,
    name: "Trending Shorts",
    desc: "Increase Subs Per Click by 5",
    cost: 250,
    spcIncrease: 5,
    icon: "fa-solid fa-video",
  },
  {
    id: 4,
    name: "Viral Thumbnail",
    desc: "Increase Subs Per Click by 5",
    cost: 250,
    spcIncrease: 5,
    icon: "fa-solid fa-image",
  },
  {
    id: 5,
    name: "Trending Videos",
    desc: "Increase Subs Per Click by 20",
    cost: 1200,
    spcIncrease: 20,
    icon: "fa-solid fa-fire",
  },
];

// DOM elements
const subscriberCountEl = document.getElementById("subscriber-count");
const subscribeBtn = document.getElementById("subscribe-btn");
const cpsEl = document.getElementById("cps");
const spcEl = document.getElementById("spc");
const shopToggleBtn = document.getElementById("shop-toggle-btn");
const upgradesContainer = document.getElementById("upgrades");

let shopOpen = false;

// Update displayed subscriber count
function updateSubscriberDisplay() {
  subscriberCountEl.innerHTML = `<i class="fa-solid fa-users"></i> Subscribers: ${subscribers.toLocaleString()}`;
}

// Update CPS calculation
function updateCPS() {
  const now = Date.now();

  // Remove click timestamps older than 1 second
  lastClickTimes = lastClickTimes.filter((time) => now - time < 1000);

  cpsEl.textContent = lastClickTimes.length;
}

// Update SPC display
function updateSPC() {
  spcEl.textContent = subsPerClick;
}

// On subscribe button click
subscribeBtn.addEventListener("click", () => {
  subscribers += subsPerClick;

  // Add timestamp for CPS calculation
  lastClickTimes.push(Date.now());

  updateSubscriberDisplay();
  updateCPS();

  // Animate button press effect
  subscribeBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.95)" },
      { transform: "scale(1)" },
    ],
    { duration: 150, easing: "ease-out" }
  );
});

// Shop toggle button event
shopToggleBtn.addEventListener("click", () => {
  shopOpen = !shopOpen;

  if (shopOpen) {
    upgradesContainer.classList.add("shop-open");
    upgradesContainer.setAttribute("aria-hidden", "false");
    shopToggleBtn.setAttribute("aria-expanded", "true");
    upgradesContainer.focus();
  } else {
    upgradesContainer.classList.remove("shop-open");
    upgradesContainer.setAttribute("aria-hidden", "true");
    shopToggleBtn.setAttribute("aria-expanded", "false");
    shopToggleBtn.focus();
  }
});

// Create upgrades UI
function createUpgradesUI() {
  upgradesContainer.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const upgradeDiv = document.createElement("div");
    upgradeDiv.classList.add("upgrade");
    upgradeDiv.setAttribute("tabindex", "0");

    // Upgrade icon
    const icon = document.createElement("i");
    icon.className = `icon ${upgrade.icon}`;
    icon.setAttribute("aria-hidden", "true");

    // Info container
    const info = document.createElement("div");
    info.classList.add("info");

    // Name and cost
    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = upgrade.name;

    const cost = document.createElement("span");
    cost.classList.add("cost");
    cost.textContent = `${upgrade.cost.toLocaleString()} subs`;

    name.prepend(cost);

    // Description
    const desc = document.createElement("div");
    desc.classList.add("desc");
    desc.textContent = upgrade.desc;

    info.appendChild(name);
    info.appendChild(desc);

    // Buy button
    const buyBtn = document.createElement("button");
    buyBtn.textContent = "Buy";
    buyBtn.setAttribute("aria-label", `Buy ${upgrade.name} upgrade`);

    // Buy button enabled only if user can afford upgrade
    buyBtn.disabled = subscribers < upgrade.cost;

    buyBtn.addEventListener("click", () => {
      if (subscribers >= upgrade.cost) {
        subscribers -= upgrade.cost;
        subsPerClick += upgrade.spcIncrease;

        updateSubscriberDisplay();
        updateSPC();

        // Increase cost by 20% after purchase (optional)
        upgrade.cost = Math.floor(upgrade.cost * 1.2);

        createUpgradesUI();
      }
    });

    upgradeDiv.appendChild(icon);
    upgradeDiv.appendChild(info);
    upgradeDiv.appendChild(buyBtn);

    upgradesContainer.appendChild(upgradeDiv);
  });
}

// Update UI every 500ms to update buy button state dynamically
setInterval(() => {
  createUpgradesUI();
  updateCPS();
}, 500);

// Initial UI setup
updateSubscriberDisplay();
updateSPC();
createUpgradesUI();
