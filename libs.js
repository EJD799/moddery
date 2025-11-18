async function makeIsometricCube(topURI, leftURI, rightURI) {
    // Helper to load an image
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
    ctx.imageSmoothingEnabled = false; // Keep pixels sharp

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
    ctx.transform(1, 0.5, 0, 1, -sideWidth, 0); // skew to form parallelogram
    ctx.drawImage(leftImg, 0, 0, 16, 16, 0, 0, sideWidth * 2, sideHeight);
    ctx.restore();

    // --- RIGHT FACE ---
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.transform(1, -0.5, 0, 1, 0, 0); // skew to form parallelogram
    ctx.drawImage(rightImg, 0, 0, 16, 16, 0, 0, sideWidth * 2, sideHeight);
    ctx.restore();

    // --- TOP FACE ---
    ctx.save();
    ctx.translate(centerX, centerY - sideHeight / 2); // move to top corner of cube
    ctx.transform(1, -0.5, 1, 0.5, 0, 0);            // shear to form diamond
    ctx.drawImage(topImg, 0, 0, 16, 16, -topWidth/2, -topWidth/2, topWidth, topWidth);
    ctx.restore();

    return canvas.toDataURL("image/png");
}
