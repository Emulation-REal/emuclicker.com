// script.js
(() => {
  const subscribeBtn = document.getElementById("subscribe-btn");
  const subscriberCountEl = document.getElementById("subscriber-count");
  const cpsEl = document.getElementById("cps");
  const spcEl = document.getElementById("spc");
  const spsEl = document.getElementById("sps");
  const shopToggleBtn = document.getElementById("shop-toggle-btn");
  const upgradesSection = document.getElementById("upgrades");

  let subscribers = 0;
  let subsPerClick = 1;
  let clicks = 0;
  let lastClickTime = 0;
  let cps = 0;
  let subsPerSecond = 0;

  // Upgrade definitions (name, base cost, base effect, icon class)
  const upgrades = [
    { id: "camera", name: "Better Camera", baseCost: 15, effect: 1, icon: "fa-camera" },
    { id: "editing", name: "Faster Editing", baseCost: 50, effect: 2, icon: "fa-film" },
    { id: "mic", name: "Quality Mic", baseCost: 120, effect: 5, icon: "fa-microphone" },
    { id: "collab", name: "Collaborations", baseCost: 400, effect: 10, icon: "fa-handshake" },
    { id: "ads", name: "Ad Revenue", baseCost: 1000, effect: 25, icon: "fa-bullhorn" },
    { id: "alg", name: "Algorithm Boost", baseCost: 3000, effect: 60, icon: "fa-rocket" },
    { id: "studio", name: "Own Studio", baseCost: 8000, effect: 150, icon: "fa-building" },
    { id: "merch", name: "Merch Store", baseCost: 20000, effect: 400, icon: "fa-tshirt" },
    { id: "manager", name: "Manager Hire", baseCost: 50000, effect: 1000, icon: "fa-user-tie" },
    { id: "team", name: "Production Team", baseCost: 120000, effect: 2500, icon: "fa-users" }
  ];

  // Tracks how many of each upgrade the player owns
  const owned = {};
  upgrades.forEach(u => owned[u.id] = 0);

  // Create upgrade elements dynamically
  function createUpgradeItem(upgrade) {
    const div = document.createElement("div");
    div.classList.add("upgrade-item");
    div.setAttribute("tabindex", "0");

    const icon = document.createElement("i");
    icon.className = `fa-solid ${upgrade.icon} upgrade-icon`;
    icon.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.classList.add("upgrade-info");

    const name = document.createElement("h3");
    name.textContent = upgrade.name;

    const cost = document.createElement("div");
    cost.classList.add("upgrade-cost");
    cost.textContent = `Cost: ${upgrade.baseCost}`;

    const ownedCount = document.createElement("div");
    ownedCount.classList.add("upgrade-owned");
    ownedCount.textContent = `Owned: 0`;

    const buyBtn = document.createElement("button");
    buyBtn.classList.add("buy-btn");
    buyBtn.textContent = "Buy";
    buyBtn.setAttribute("aria-label", `Buy upgrade ${upgrade.name}`);

    buyBtn.addEventListener("click", () => {
      const price = getUpgradeCost(upgrade.id);
      if (subscribers >= price) {
        subscribers -= price;
        owned[upgrade.id]++;
        subsPerClick += upgrade.effect;

        ownedCount.textContent = `Owned: ${owned[upgrade.id]}`;
        cost.textContent = `Cost: ${getUpgradeCost(upgrade.id)}`;
        updateSubscribers();
        updateStats();
        buyBtn.classList.add("bought-animation");
        setTimeout(() => buyBtn.classList.remove("bought-animation"), 300);
      }
    });

    info.appendChild(name);
    info.appendChild(cost);
    info.appendChild(ownedCount);
    info.appendChild(buyBtn);

    div.appendChild(icon);
    div.appendChild(info);

    return div;
  }

  // Cost increases exponentially: baseCost * 1.15^ownedCount (rounded)
  function getUpgradeCost(id) {
    const upgrade = upgrades.find(u => u.id === id);
    return Math.floor(upgrade.baseCost * Math.pow(1.15, owned[id]));
  }

  // Update subscriber count display
  function updateSubscribers() {
    subscriberCountEl.innerHTML = `<i class="fa-solid fa-users"></i> Subscribers: ${Math.floor(subscribers)}`;
  }

  // Update CPS, SPC, SPS stats
  function updateStats() {
    cpsEl.textContent = cps.toFixed(1);
    spcEl.textContent = subsPerClick.toFixed(1);
    spsEl.textContent = subsPerSecond.toFixed(1);
  }

  // Subscribe button click handler
  subscribeBtn.addEventListener("click", () => {
    subscribers += subsPerClick;
    clicks++;
    updateSubscribers();

    // Animation
    subscribeBtn.classList.add("clicked");
    setTimeout(() => subscribeBtn.classList.remove("clicked"), 150);

    // CPS calculation
    const now = Date.now();
    if (lastClickTime !== 0) {
      const delta = (now - lastClickTime) / 1000;
      cps = 1 / delta;
    }
    lastClickTime = now;

    updateStats();
  });

  // Passive subs per second from upgrades (for example, sum owned * effect * 0.1)
  function calculateSPS() {
    let spsTotal = 0;
    upgrades.forEach(upg => {
      spsTotal += owned[upg.id] * upg.effect * 0.1;
    });
    return spsTotal;
  }

  // Game loop to add passive subs and update stats
  setInterval(() => {
    subsPerSecond = calculateSPS();
    subscribers += subsPerSecond / 10; // Run 10 times per sec for smoothness
    updateSubscribers();
    updateStats();
  }, 100);

  // Shop toggle logic
  shopToggleBtn.addEventListener("click", () => {
    const isHidden = upgradesSection.getAttribute("aria-hidden") === "true";
    if (isHidden) {
      upgradesSection.style.transform = "translateX(0)";
      upgradesSection.setAttribute("aria-hidden", "false");
      shopToggleBtn.setAttribute("aria-expanded", "true");
      upgradesSection.focus();
    } else {
      upgradesSection.style.transform = "translateX(100%)";
      upgradesSection.setAttribute("aria-hidden", "true");
      shopToggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Initialize upgrades list
  function initUpgrades() {
    upgrades.forEach(upg => {
      const upgItem = createUpgradeItem(upg);
      upgradesSection.appendChild(upgItem);
    });
    // Start with shop hidden
    upgradesSection.style.transform = "translateX(100%)";
  }

  // Initialize
  initUpgrades();
  updateSubscribers();
  updateStats();
})();
