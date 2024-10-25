function getRandomEmoji() {
    const emojis = ['🌍', '🌟', '🚀', '💻', '🎉', '📚', '🎨', '📝'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Function to add a new link to the shortcuts section
function addLinkToShortcut(link) {
    const shortcutContainer = document.querySelector('.shortcut-container');

    const item = document.createElement('div');
    item.classList.add('item', 'm-3');
    item.innerHTML = `
        <span class="emoji">${getRandomEmoji()}</span> <!-- Random Emoji -->
        <p>${link.title.length > 20 ? link.title.substring(0, 20) + '...' : link.title}</p>
    `;
    item.onclick = () => {
        window.open(link.url, '_self'); // Open link in the same tab
    };
    shortcutContainer.appendChild(item);
}

// Function to save links to local storage
function saveLinksToLocalStorage(links) {
    localStorage.setItem('savedLinks', JSON.stringify(links));
}

// Function to load links from local storage
function loadLinksFromLocalStorage() {
    const savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    savedLinks.forEach(link => addLinkToShortcut(link));
}

// Handle form submission for adding a new link
document.getElementById('linkForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const linkInput = document.getElementById('linkInput').value;
    const titleInput = document.getElementById('titleInput').value; // Get title from the input field

    // Validate URL format
    // if (!linkInput.startsWith('http://') && !linkInput.startsWith('https://')) {
    //     alert('Please enter a valid URL starting with http:// or https://');
    //     return;
    // }

    const newLink = { url: linkInput, title: titleInput }; // Use title from input

    // Save to local storage
    let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    savedLinks.push(newLink);
    saveLinksToLocalStorage(savedLinks);

    // Add link to the shortcut section
    addLinkToShortcut(newLink); // No need to fetch title

    document.getElementById('linkInput').value = ''; // Clear input field
    document.getElementById('titleInput').value = ''; // Clear title field
    var modal = bootstrap.Modal.getInstance(document.getElementById('addLinkModal'));
    modal.hide(); // Close the modal
});

// Load links from local storage on page load
document.addEventListener('DOMContentLoaded', loadLinksFromLocalStorage);
