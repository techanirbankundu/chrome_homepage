// On Chrome startup, open the custom homepage
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get('homepage', (data) => {
      if (data.homepage) {
          chrome.tabs.create({ url: data.homepage });
      }
  });
});

// On a new tab, redirect to the custom homepage
chrome.tabs.onCreated.addListener((tab) => {
  chrome.storage.sync.get('homepage', (data) => {
      if (data.homepage && tab.pendingUrl === 'chrome://newtab/') {
          chrome.tabs.update(tab.id, { url: data.homepage });
      }
  });
});
