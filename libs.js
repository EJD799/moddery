async function makeIsometricCube(topURI, leftURI, rightURI) {
    const loadImg = src => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });

    const [topImg, leftImg, rightImg] = await Promise.all([
        loadImg(topURI),
        loadImg(leftURI),
        loadImg(rightURI)
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // --- LEFT FACE ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(16, 32); // top-left
    ctx.lineTo(32, 32); // top-right
    ctx.lineTo(32, 64); // bottom-right
    ctx.lineTo(16, 64); // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(leftImg, 0, 0, 16, 16, 16, 32, 16, 32);
    ctx.restore();

    // --- RIGHT FACE ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(32, 32); // top-left
    ctx.lineTo(48, 32); // top-right
    ctx.lineTo(48, 64); // bottom-right
    ctx.lineTo(32, 64); // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(rightImg, 0, 0, 16, 16, 32, 32, 16, 32);
    ctx.restore();

    // --- TOP FACE ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(16, 16); // top-left
    ctx.lineTo(48, 16); // top-right
    ctx.lineTo(48, 32); // bottom-right
    ctx.lineTo(16, 32); // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(topImg, 0, 0, 16, 16, 16, 16, 32, 16);
    ctx.restore();

    return canvas.toDataURL("image/png");
}
