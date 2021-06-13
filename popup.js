const colorEl = document.getElementById("color-changer");

colorEl.addEventListener("input", e => {
  const hexValue = e.target.value;
  chrome.tabs.executeScript(null, {
    code: `document.body.style.backgroundColor="${hexValue}"`
  });
});
