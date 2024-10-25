document.getElementById('setHomepage').addEventListener('click', () => {
    const homepage = "https://techanirbankundu.github.io/chrome_homepage/";
    
    // Save the homepage URL to chrome storage
    chrome.storage.sync.set({ homepage: homepage }, () => {
        alert('Homepage set to ' + homepage);
    });
});

// Load the saved homepage when the popup opens
chrome.storage.sync.get('homepage', (data) => {
    if (data.homepage) {
        // document.getElementById('homepage').value = data.homepage;
    }
});

// When user clicks "Go to Homepage" button, open the homepage in a new tab
document.getElementById('goToHomepage').addEventListener('click', () => {
    chrome.storage.sync.get('homepage', (data) => {
        if (data.homepage) {
            chrome.tabs.create({ url: data.homepage });
        } else {
            alert('No homepage set. Please set a homepage first.');
        }
    });
});
