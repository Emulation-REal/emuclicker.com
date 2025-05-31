// == EmuClicker main.js ==

// Subscribers and subs per click count
let subscribers = 0;
let subsPerClick = 1;

// For tracking clicks for CPS calculation
let lastClickTimes = [];

// Upgrade data with icon classes (Font Awesome)
const upgrades = [
  {
    id: 1,
    name: "Video Editor",
    desc: "Increase Subs Per Click by 1",
    cost: 50,
    spcIncrease: 1,
    icon: "fa-solid fa-video",
  },
  {
    id: 2,
    name: "Better Camera",
    desc: "Increase Subs Per Click by 3",
    cost: 150,
    spcIncrease: 3,
    icon: "fa-solid fa-camera",
  },
  {
    id: 3,
    name: "Collaborations",
    desc: "Increase Subs Per Click by 10",
    cost: 500,
    spcIncrease: 10,
    icon: "fa-solid fa-handshake",
  },
  {
    id: 4,
    name: "Custom Thumbnails",
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
  } else {
    upgradesContainer.classList.remove("shop-open");
    upgradesContainer.setAttribute("aria-hidden", "true");
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
    const iconEl = document.createElement("i");
    iconEl.className = `icon ${upgrade.icon}`;
    upgradeDiv.appendChild(iconEl);

    // Info container
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    // Name + Description
    const nameEl = document.createElement("div");
    nameEl.classList.add("name");
    nameEl.textContent = upgrade.name;

    // Append icon next to name
    nameEl.prepend(iconEl.cloneNode(true));

    const descEl = document.createElement("div");
    descEl.classList.add("desc");
    descEl.textContent = upgrade.desc;

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(descEl);

    // Cost
    const costEl = document.createElement("div");
    costEl.classList.add("cost");
    costEl.textContent = `${upgrade.cost.toLocaleString()} Subs`;

    // Buy button
    const buyBtn = document.createElement("button");
    buyBtn.textContent = "Buy";

    // Buy upgrade on click
    buyBtn.addEventListener("click", () => {
      if (subscribers >= upgrade.cost) {
        subscribers -= upgrade.cost;
        subsPerClick += upgrade.spcIncrease;

        updateSubscriberDisplay();
        updateSPC();

        // Disable button after buying to avoid multiple purchases (optional: you can allow multiple)
        buyBtn.disabled = true;
        buyBtn.textContent = "Bought";

        // Animate upgrade purchase
        upgradeDiv.animate(
          [
            { backgroundColor: "#2a9d8f" },
            { backgroundColor: "#55a630" },
            { backgroundColor: "#2a9d8f" },
          ],
          { duration: 800 }
        );
      } else {
        // Animate shake to indicate not enough subs
        upgradeDiv.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 400 }
        );
      }
    });

    // Compose upgrade div layout
    upgradeDiv.appendChild(infoDiv);
    upgradeDiv.appendChild(costEl);
    upgradeDiv.appendChild(buyBtn);

    upgradesContainer.appendChild(upgradeDiv);
  });
}

// Initialize UI
updateSubscriberDisplay();
updateSPC();
updateCPS();
createUpgradesUI();
