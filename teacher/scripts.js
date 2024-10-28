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
        previewWindow.document.body.requestFullscreen();
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

    // Construct HTML with custom slides and logo
    function buildSlideHtml(userHtml) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Custom Slide</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; background: black; color: white; }
        #logo {
            text-align: center;
            color: white;
            padding: 20px;
        }
        #logo h1 {
            font-size: 100px;
            font-weight: bold;
            text-transform: uppercase;
            animation: glow 2s infinite alternate;
        }
        #logo h2 {
            font-size: 30px;
            font-style: italic;
            margin-top: 20px;
            animation: glow 3s infinite alternate;
        }
        @keyframes glow {
            from {
                color: white;
                text-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px white;
            }
            to {
                color: blue;
                text-shadow: 0 0 20px blue, 0 0 40px blue, 0 0 50px blue;
            }
        }
    </style>
</head>
<body>
    <div id="logo">
        <h1>VGAMES</h1>
        <h2>V.S VILAKAZI</h2>
    </div>
    <div>${userHtml}</div>
</body>
</html>`;
    }
});
