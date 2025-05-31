// == EmuClicker main.js ==

let subscribers = 0;
let subsPerClick = 1;

let lastClickTimes = [];

const upgrades = [
  { id: 1, name: "Video Editor", desc: "Increase Subs Per Click by 1", cost: 50, spcIncrease: 1 },
  { id: 2, name: "Better Camera", desc: "Increase Subs Per Click by 3", cost: 150, spcIncrease: 3 },
  { id: 3, name: "Collaborations", desc: "Increase Subs Per Click by 10", cost: 500, spcIncrease: 10 },
  { id: 4, name: "Custom Thumbnails", desc: "Increase Subs Per Click by 5", cost: 300, spcIncrease: 5 },
  { id: 5, name: "Live Streams", desc: "Increase Subs Per Click by 2", cost: 100, spcIncrease: 2 },
  // Add up to 50+ upgrades as you want
];

// Keep track of how many of each upgrade bought
const upgradeCounts = {};
upgrades.forEach(upg => upgradeCounts[upg.id] = 0);

const subscriberCountEl = document.getElementById("subscriber-count");
const subscribeBtn = document.getElementById("subscribe-btn");
const upgradesContainer = document.getElementById("upgrades");
const shopToggleBtn = document.getElementById("shop-toggle-btn");
const cpsDisplay = document.getElementById("cps");
const spcDisplay = document.getElementById("spc");

function updateSubscriberCount() {
  subscriberCountEl.textContent = `Subscribers: ${subscribers.toLocaleString()}`;
}

function updateSPC() {
  spcDisplay.textContent = subsPerClick.toFixed(1);
}

function calculateCPS() {
  const now = Date.now();
  // Remove clicks older than 1 second
  lastClickTimes = lastClickTimes.filter(t => now - t < 1000);
  return lastClickTimes.length;
}

function updateCPS() {
  const cps = calculateCPS();
  cpsDisplay.textContent = cps;
}

function addSubscribers(amount) {
  subscribers += amount;
  updateSubscriberCount();
}

function buyUpgrade(upg) {
  if (subscribers >= upg.cost) {
    subscribers -= upg.cost;
    upgradeCounts[upg.id]++;
    subsPerClick += upg.spcIncrease;
    upg.cost = Math.floor(upg.cost * 1.15); // Increase cost 15%
    renderUpgrades();
    updateSubscriberCount();
    updateSPC();
  }
}

function renderUpgrades() {
  upgradesContainer.innerHTML = "";
  upgrades.forEach(upg => {
    const count = upgradeCounts[upg.id];
    const canBuy = subscribers >= upg.cost;

    const upgDiv = document.createElement("div");
    upgDiv.className = "upgrade";

    const infoDiv = document.createElement("div");
    infoDiv.className = "info";
    infoDiv.innerHTML = `<div class="name">${upg.name} ${count > 0 ? `(x${count})` : ''}</div>
                         <div class="desc">${upg.desc}</div>`;

    const costSpan = document.createElement("div");
    costSpan.className = "cost";
    costSpan.textContent = `${upg.cost.toLocaleString()} Subs`;

    const buyBtn = document.createElement("button");
    buyBtn.textContent = "Buy";
    buyBtn.disabled = !canBuy;
    buyBtn.addEventListener("click", () => buyUpgrade(upg));

    upgDiv.appendChild(infoDiv);
    upgDiv.appendChild(costSpan);
    upgDiv.appendChild(buyBtn);

    upgradesContainer.appendChild(upgDiv);
  });
}

subscribeBtn.addEventListener("click", () => {
  addSubscribers(subsPerClick);
  lastClickTimes.push(Date.now());
  updateCPS();
});

// Shop toggle button
shopToggleBtn.addEventListener("click", () => {
  if (upgradesContainer.classList.contains("shop-open")) {
    upgradesContainer.classList.remove("shop-open");
    upgradesContainer.classList.add("shop-closed");
  } else {
    upgradesContainer.classList.add("shop-open");
    upgradesContainer.classList.remove("shop-closed");
  }
});

// CPS update every 200ms (for smooth update)
setInterval(updateCPS, 200);

// Initial render
updateSubscriberCount();
updateSPC();
renderUpgrades();
