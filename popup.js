const colorEl = document.getElementById("color-changer");
const rotateEl = document.getElementById("rotate");
const rotate3DEl = document.getElementById("rotate3d");

colorEl.addEventListener("input", async e => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hexValue = e.target.value;
  chrome.storage.sync.set({ hexValue }, function() {
    console.log("Value is set to " + hexValue);
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      chrome.storage.sync.get(["hexValue"], function(result) {
        console.log("Value currently is " + result.hexValue);
        document.body.style.backgroundColor = result.hexValue;
      });
    }
  });
});

rotateEl.addEventListener("input", e => {
  const degree = e.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currTab = tabs[0];
    if (currTab) {
      chrome.scripting.insertCSS(
        {
          css: `body { transform: rotate(${degree}deg) !important; }`,
          target: { tabId: currTab.id }
        },
        function() {
          if (chrome.runtime.lastError) {
            message.innerText = " error: \n" + chrome.runtime.lastError.message;
          }
        }
      );
    }
  });
});

rotate3DEl.addEventListener("input", e => {
  const degree = e.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currTab = tabs[0];
    if (currTab) {
      chrome.scripting.insertCSS(
        {
          css: `body { transform: rotate3d(1, 1, 1,${degree}deg) !important; }`,
          target: { tabId: currTab.id }
        },
        function() {
          if (chrome.runtime.lastError) {
            message.innerText = " error: \n" + chrome.runtime.lastError.message;
          }
        }
      );
    }
  });
});
