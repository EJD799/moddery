async function makeIsometricCube(topURI, leftURI, rightURI) {
    const loadImg = src => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });

    const [topImg, leftImg, rightImg] = await Promise.all([
        loadImg(topURI), loadImg(leftURI), loadImg(rightURI)
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false; // keep pixelated

    // Coordinates and sizes
    const cx = 32; // center
    const cy = 32;

    const faceWidth = 32;
    const faceHeight = 16;

    // Draw left face
    ctx.save();
    ctx.setTransform(1, 0.5, 0, 1, cx - 32, cy); // skew for left
    ctx.drawImage(leftImg, 0, 0, 16, 16, 0, 0, faceWidth, faceHeight);
    ctx.restore();

    // Draw right face
    ctx.save();
    ctx.setTransform(1, -0.5, 0, 1, cx, cy); // skew for right
    ctx.drawImage(rightImg, 0, 0, 16, 16, 0, 0, faceWidth, faceHeight);
    ctx.restore();

    // Draw top face
    ctx.save();
    ctx.setTransform(1, 0, -1, 1, cx, cy - 16); // rotate/skew top
    ctx.drawImage(topImg, 0, 0, 16, 16, -16, -16, 32, 32);
    ctx.restore();

    return canvas.toDataURL("image/png");
}
