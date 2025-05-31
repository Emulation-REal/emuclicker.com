// Game state
let subscribers = 0;
let subsPerClick = 1;
let subsPerSecond = 0;
let lastClickTimes = [];

// Upgrade data: id, name, desc, baseCost, spcIncrease, spsIncrease, icon
const upgrades = [
  { id: 1, name: "Subscribe Button", desc: "Increase Subs Per Click by 1", baseCost: 50, spcIncrease: 1, spsIncrease: 0, icon: "fa-solid fa-mouse-pointer" },
  { id: 2, name: "YouTube Logo", desc: "Increase Subs Per Click by 3", baseCost: 100, spcIncrease: 3, spsIncrease: 0, icon: "fa-brands fa-youtube" },
  { id: 3, name: "Trending Shorts", desc: "Increase Subs Per Click by 5", baseCost: 250, spcIncrease: 5, spsIncrease: 0, icon: "fa-solid fa-video" },
  { id: 4, name: "Viral Thumbnail", desc: "Increase Subs Per Click by 5", baseCost: 250, spcIncrease: 5, spsIncrease: 0, icon: "fa-solid fa-image" },
  { id: 5, name: "Trending Videos", desc: "Increase Subs Per Click by 20", baseCost: 1200, spcIncrease: 20, spsIncrease: 0, icon: "fa-solid fa-fire" },

  { id: 6, name: "Social Media Ads", desc: "Gain 1 Subs Per Second automatically", baseCost: 500, spcIncrease: 0, spsIncrease: 1, icon: "fa-brands fa-twitter" },
  { id: 7, name: "Collaborations", desc: "Gain 5 Subs Per Second automatically", baseCost: 2000, spcIncrease: 0, spsIncrease: 5, icon: "fa-solid fa-handshake" },
  { id: 8, name: "Giveaways", desc: "Gain 10 Subs Per Second automatically", baseCost: 8000, spcIncrease: 0, spsIncrease: 10, icon: "fa-solid fa-gift" },
  { id: 9, name: "Viral Challenges", desc: "Gain 25 Subs Per Second automatically", baseCost: 35000, spcIncrease: 0, spsIncrease: 25, icon: "fa-solid fa-bolt" },
  { id: 10, name: "Merch Store", desc: "Gain 50 Subs Per Second automatically", baseCost: 100000, spcIncrease: 0, spsIncrease: 50, icon: "fa-solid fa-shirt" },

  // Add more upgrades here (up to 50+)
];

// Track number of upgrades bought for each id
const upgradesBought = {};

// DOM elements
const subscriberCountEl = document.getElementById("subscriber-count");
const subscribeBtn = document.getElementById("subscribe-btn");
const cpsEl = document.getElementById("cps");
const spcEl = document.getElementById("spc");
const spsEl = document.getElementById("sps");
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
  lastClickTimes = lastClickTimes.filter((time) => now - time < 1000);
  cpsEl.textContent = lastClickTimes.length;
}

// Update SPC display
function updateSPC() {
  spcEl.textContent = subsPerClick.toFixed(1);
}

// Update SPS display
function updateSPS() {
  spsEl.textContent = subsPerSecond.toFixed(1);
}

// On subscribe button click
subscribeBtn.addEventListener("click", () => {
  subscribers += subsPerClick;

  lastClickTimes.push(Date.now());

  updateSubscriberDisplay();
  updateCPS();

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

// Calculate cost for upgrade count (exponential scaling)
function calculateCost(baseCost, count) {
  return Math.floor(baseCost * Math.pow(1.15, count));
}

// Create upgrades UI
function createUpgradesUI() {
  upgradesContainer.innerHTML = "";
  subsPerSecond = 0; // reset, will sum below

  upgrades.forEach((upgrade) => {
    if (!upgradesBought[upgrade.id]) upgradesBought[upgrade.id] = 0;
    const count = upgradesBought[upgrade.id];
    const cost = calculateCost(upgrade.baseCost, count);

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

    // Name and count
    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = upgrade.name + (count > 0 ? ` x${count}` : "");

    // Cost
    const costSpan = document.createElement("span");
    costSpan.classList.add("cost");
    costSpan.textContent = `${cost.toLocaleString()} subs`;
    name.prepend(costSpan);

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
    buyBtn.disabled = subscribers < cost;

    buyBtn.addEventListener("click", () => {
      if (subscribers >= cost) {
        subscribers -= cost;
        upgradesBought[upgrade.id]++;
        subsPerClick += upgrade.spcIncrease;
        subsPerSecond += upgrade.spsIncrease;

        updateSubscriberDisplay();
        updateSPC();
        updateSPS();

        createUpgradesUI();
      }
    });

    upgradeDiv.appendChild(icon);
    upgradeDiv.appendChild(info);
    upgradeDiv.appendChild(buyBtn);

    upgradesContainer.appendChild(upgradeDiv);

    // Add SPS from this upgrade
    subsPerSecond += upgrade.spsIncrease * count;
  });
}

// Game loop to add subscribers per second
function gameLoop() {
  subscribers += subsPerSecond / 10; // add 1/10th of SPS every 100ms
  updateSubscriberDisplay();
  updateSPS();
}

setInterval(gameLoop, 100);

// Update UI every 500ms for buy buttons and CPS
setInterval(() => {
  createUpgradesUI();
  updateCPS();
}, 500);

// Initial UI setup
updateSubscriberDisplay();
updateSPC();
updateSPS();
createUpgradesUI();
