(() => {
  // Game state
  let subscribers = 0;
  let subscribersPerClick = 1;
  let subscribersPerSecond = 0;

  // Upgrade data: 50+ upgrades with name, description, cost, effect, type
  // type: "click" adds to per click, "auto" adds to per second

  const upgrades = [];

  // Generate 50 upgrades with increasing cost and effects
  for (let i = 1; i <= 50; i++) {
    upgrades.push({
      id: i,
      name: `Upgrade #${i}`,
      description:
        i % 2 === 0
          ? `Increases subscribers per click by ${i}`
          : `Increases subscribers per second by ${i}`,
      baseCost: Math.floor(10 * Math.pow(1.15, i * 3)),
      cost: Math.floor(10 * Math.pow(1.15, i * 3)),
      amountBought: 0,
      effectValue: i,
      type: i % 2 === 0 ? "click" : "auto",
    });
  }

  const subscriberCountEl = document.getElementById("subscriber-count");
  const subscribeBtn = document.getElementById("subscribe-btn");
  const upgradesContainer = document.getElementById("upgrades");

  // Update subscriber count text
  function updateSubscriberCount() {
    subscriberCountEl.textContent = `Subscribers: ${Math.floor(subscribers)}`;
  }

  // Update all upgrade buttons enabled/disabled status
  function updateUpgradeButtons() {
    upgrades.forEach((upg) => {
      const btn = document.getElementById(`upgrade-btn-${upg.id}`);
      if (btn) {
        btn.disabled = subscribers < upg.cost;
        btn.textContent = `Buy (${upg.amountBought}) - Cost: ${upg.cost}`;
      }
    });
  }

  // Buy upgrade
  function buyUpgrade(id) {
    const upg = upgrades.find((u) => u.id === id);
    if (!upg) return;
    if (subscribers < upg.cost) return;

    subscribers -= upg.cost;
    upg.amountBought++;
    // cost increase formula - exponential
    upg.cost = Math.floor(upg.baseCost * Math.pow(1.15, upg.amountBought));

    // Apply effect
    if (upg.type === "click") {
      subscribersPerClick += upg.effectValue;
    } else if (upg.type === "auto") {
      subscribersPerSecond += upg.effectValue;
    }

    updateSubscriberCount();
    updateUpgradeButtons();
  }

  // Handle clicking subscribe button
  subscribeBtn.addEventListener("click", () => {
    subscribers += subscribersPerClick;
    updateSubscriberCount();
    updateUpgradeButtons();
  });

  // Create upgrade elements
  function createUpgradeElements() {
    upgradesContainer.innerHTML = "";
    upgrades.forEach((upg) => {
      const upgDiv = document.createElement("div");
      upgDiv.className = "upgrade";

      upgDiv.innerHTML = `
        <div class="info">
          <div class="name">${upg.name}</div>
          <div class="desc">${upg.description}</div>
        </div>
        <div class="cost">${upg.cost}</div>
        <button id="upgrade-btn-${upg.id}" aria-label="Buy ${upg.name}">Buy (${upg.amountBought}) - Cost: ${upg.cost}</button>
      `;

      upgradesContainer.appendChild(upgDiv);

      const btn = document.getElementById(`upgrade-btn-${upg.id}`);
      btn.addEventListener("click", () => buyUpgrade(upg.id));
    });
  }

  // Auto increment subscribers
  function autoIncrement() {
    subscribers += subscribersPerSecond / 10; // 10 times per sec for smoothness
    updateSubscriberCount();
    updateUpgradeButtons();
  }

  createUpgradeElements();
  updateSubscriberCount();
  updateUpgradeButtons();

  // Interval for auto increment
  setInterval(autoIncrement, 100);
})();
