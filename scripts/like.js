// This file contains JavaScript code related to the "like" functionality on the website.
// It includes functions to manage likes or user feedback.

let likesCount = 0;

function likePost() {
    likesCount++;
    updateLikesDisplay();
}

function unlikePost() {
    if (likesCount > 0) {
        likesCount--;
        updateLikesDisplay();
    }
}

function updateLikesDisplay() {
    const likesDisplay = document.getElementById('likes-display');
    if (likesDisplay) {
        likesDisplay.textContent = `Likes: ${likesCount}`;
    }
}

// Event listeners for like and unlike buttons
document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.getElementById('like-button');
    const unlikeButton = document.getElementById('unlike-button');

    if (likeButton) {
        likeButton.addEventListener('click', likePost);
    }

    if (unlikeButton) {
        unlikeButton.addEventListener('click', unlikePost);
    }
});