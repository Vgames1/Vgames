document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("liveVideo");
  const offlineImage = document.getElementById("offlineImage");
  const commentInput = document.getElementById("commentInput");
  const sendComment = document.getElementById("sendComment");
  const commentsDisplay = document.getElementById("commentsDisplay");

  // Check if live stream exists
  if (!video.src) {
    video.style.display = "none";
    offlineImage.style.display = "block";
  }

  // Handle comments
  sendComment.addEventListener("click", () => {
    const comment = commentInput.value.trim();
    if (comment) {
      const p = document.createElement("p");
      p.textContent = comment;
      commentsDisplay.appendChild(p);
      commentInput.value = ""; // Clear input
    }
  });
});
