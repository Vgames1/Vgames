document.addEventListener("DOMContentLoaded", () => {
    const previewButton = document.getElementById("previewButton");
    const downloadButton = document.getElementById("downloadButton");
    const timeDisplay = document.getElementById("time");

    // Display current time
    setInterval(() => {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString();
    }, 1000);

    // Preview Button: Open a new window to preview HTML content
    previewButton.addEventListener("click", () => {
        const userHtml = document.getElementById("htmlContent").value;
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(buildSlideHtml(userHtml));
        previewWindow.document.close();
    });

    // Download Button: Generate downloadable HTML file
    downloadButton.addEventListener("click", () => {
        const userHtml = document.getElementById("htmlContent").value;
        const blob = new Blob([buildSlideHtml(userHtml)], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "custom_slide.html";
        link.click();
    });

    // Construct HTML with custom slides
    function buildSlideHtml(userHtml) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Custom Slide</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; background: black; color: white; }
        .slide { display: flex; align-items: center; justify-content: center; height: 100vh; }
        #slide1 { background: black; animation: fade 5s forwards; }
        #slide2 { background: linear-gradient(to bottom, #111, #800000); animation: fade 5s forwards 5s; }
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body>
    <div id="slide1" class="slide">
        <div>
            <h1>VGAMES</h1>
            <h2>V.S VILAKAZI</h2>
        </div>
    </div>
    <div id="slide2" class="slide">
        ${userHtml}
    </div>
</body>
</html>`;
    }
});
