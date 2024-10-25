// Get the DOM elements
const linkInput = document.getElementById('linkInput');
const addLinkBtn = document.getElementById('addLinkBtn');
const linkList = document.getElementById('linkList');

// Function to render the links from localStorage
// Function to render the links from localStorage
function renderLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    linkList.innerHTML = ''; // Clear current list

    links.forEach((link, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.target = '_blank'; // Open in new tab
        linkElement.className = 'flex-grow-1'; // Ensure the link takes up available space

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => removeLink(index);

        listItem.appendChild(linkElement);
        listItem.appendChild(deleteButton);
        linkList.appendChild(listItem);
    });
}


// Function to add a new link
function addLink() {
    const link = linkInput.value;
    if (link) {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        links.push(link); // Add the new link
        localStorage.setItem('links', JSON.stringify(links)); // Store in localStorage
        renderLinks(); // Update the displayed list
        linkInput.value = ''; // Clear the input field
    }
}

// Function to remove a link
function removeLink(index) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.splice(index, 1); // Remove the link by index
    localStorage.setItem('links', JSON.stringify(links)); // Update localStorage
    renderLinks(); // Update the displayed list
}

// Event listener to add a new link on button click
addLinkBtn.addEventListener('click', addLink);

// Render links on page load
document.addEventListener('DOMContentLoaded', renderLinks);
