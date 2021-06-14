const colorEl = document.getElementById("color-changer");

colorEl.addEventListener("input", async e => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hexValue = e.target.value;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      document.body.style.backgroundColor = hexValue;
    }
  });
});
