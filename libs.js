async function makeIsometricCube(topURI, leftURI, rightURI, scale = 16) {
    // Helper to load an image
    const loadImg = src => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });

    const [topImg, leftImg, rightImg] = await Promise.all([
        loadImg(topURI), loadImg(leftURI), loadImg(rightURI)
    ]);

    // --- Helper to scale down images ---
    const scaleImg = (img, targetSize) => {
        const canvas = document.createElement("canvas");
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false; // keep pixels sharp
        ctx.drawImage(img, 0, 0, targetSize, targetSize);
        return canvas;
    };

    const topScaled = scaleImg(topImg, scale);
    const leftScaled = scaleImg(leftImg, scale);
    const rightScaled = scaleImg(rightImg, scale);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const centerX = 32;
    const centerY = 32;

    // Sizes for Minecraft-style cube
    const topWidth = 32;
    const topHeight = 16;
    const sideWidth = 16;
    const sideHeight = 32;

    // --- LEFT FACE ---
    ctx.save();
    ctx.translate(centerX - sideWidth, centerY - sideHeight/2);
    ctx.transform(1, 0.5, 0, 1, -sideWidth, 0);
    ctx.drawImage(leftScaled, 0, 0, scale, scale, 0, 0, sideWidth * 2, sideHeight);
    ctx.restore();

    // --- RIGHT FACE ---
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.transform(1, -0.5, 0, 1, 0, 0);
    ctx.drawImage(rightScaled, 0, 0, scale, scale, 0, 0, sideWidth * 2, sideHeight);
    ctx.restore();

    // --- TOP FACE ---
    ctx.save();
    ctx.translate(centerX, centerY - sideHeight / 2);
    ctx.transform(1, -0.5, 1, 0.5, 0, 0);
    ctx.drawImage(topScaled, 0, 0, scale, scale, -topWidth/2, -topWidth/2, topWidth, topWidth);
    ctx.restore();

    return canvas.toDataURL("image/png");
}

function beforeLastDot(str) {
    const i = str.lastIndexOf(".");
    return i === -1 ? str : str.slice(0, i);
}
function afterLastDot(str) {
    const i = str.lastIndexOf(".");
    return i === -1 ? str : str.slice(i + 1, str.length);
}