/* Reset */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f4f8; /* Very soft pale blue */
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

header h1 {
  font-weight: 900;
  font-size: 2.5rem;
  color: #264653;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

#stats {
  margin: 15px 0;
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  user-select: none;
  display: flex;
  gap: 30px;
  justify-content: center;
  color: #2a9d8f;
}

#cps-spc span {
  display: flex;
  align-items: center;
  gap: 8px;
}

#buttons-container {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

button {
  background-color: #e76f51;
  border: none;
  border-radius: 15px;
  padding: 15px 35px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 12px #bb5137;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.25s ease, transform 0.2s ease;
  user-select: none;
}

button:hover {
  background-color: #f4a261;
  transform: scale(1.07);
}

button:active {
  background-color: #d45730;
  transform: scale(0.95);
}

button:disabled {
  background-color: #9e7a6d;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

/* Shop panel styling */
#upgrades {
  position: fixed;
  top: 80px;
  right: 0;
  width: 350px;
  max-width: 90vw;
  height: calc(100vh - 100px);
  background: #264653; /* dark teal */
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
  border-left: 4px solid #2a9d8f;
  padding: 25px;
  overflow-y: auto;
  transform: translateX(110%);
  transition: transform 0.4s ease;
  user-select: none;
  z-index: 1000;
  color: #f4f1de;
  font-weight: 600;
}

#upgrades.shop-open {
  transform: translateX(0);
}

.upgrade {
  background: #2a9d8f;
  margin-bottom: 15px;
  padding: 14px 18px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  transition: background-color 0.3s ease;
}

.upgrade:hover {
  background: #3caea3;
  cursor: pointer;
}

.upgrade .info {
  flex-grow: 1;
}

.upgrade .name {
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f4f1de;
}

.upgrade .desc {
  font-size: 0.9rem;
  opacity: 0.8;
  color: #c1dcdc;
  margin-top: 3px;
}

.upgrade .cost {
  font-weight: 700;
  color: #ffe066;
  min-width: 80px;
  text-align: right;
}

.upgrade button {
  background-color: #e76f51;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.15s ease;
  user-select: none;
}

.upgrade button:hover:not(:disabled) {
  background-color: #f4a261;
  transform: scale(1.1);
}

.upgrade button:disabled {
  background-color: #a78e85;
  cursor: not-allowed;
  transform: none;
}

/* Icons inside upgrades */
.upgrade .icon {
  font-size: 1.8rem;
  color: #ffe066;
}

/* Footer */
footer {
  margin-top: auto;
  font-size: 0.9rem;
  color: #264653;
  opacity: 0.6;
  user-select: none;
  text-align: center;
  width: 100%;
  padding: 15px 0 5px;
}
