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
    ctx.imageSmoothingEnabled = false;

    // Center of the cube
    const cx = 32;
    const cy = 32;

    // Sizes
    const cubeSize = 32; // width of top
    const sideHeight = 16; // height of top and side trapezoids

    // --- LEFT FACE ---
    // Map 16x16 texture to quadrilateral: top-left, top-right, bottom-right, bottom-left
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - cubeSize / 2, cy);        // top-left
    ctx.lineTo(cx, cy - sideHeight);         // top-right (inner corner)
    ctx.lineTo(cx, cy + cubeSize - sideHeight); // bottom-right
    ctx.lineTo(cx - cubeSize / 2, cy + cubeSize); // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(leftImg, 0, 0, 16, 16,
                  cx - cubeSize / 2, cy, cubeSize / 2, cubeSize); // stretch to quad
    ctx.restore();

    // --- RIGHT FACE ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - sideHeight);         // top-left (inner corner)
    ctx.lineTo(cx + cubeSize / 2, cy);       // top-right
    ctx.lineTo(cx + cubeSize / 2, cy + cubeSize); // bottom-right
    ctx.lineTo(cx, cy + cubeSize - sideHeight); // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(rightImg, 0, 0, 16, 16,
                  cx, cy - sideHeight, cubeSize / 2, cubeSize); // stretch to quad
    ctx.restore();

    // --- TOP FACE ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - sideHeight);         // top-left
    ctx.lineTo(cx + cubeSize / 2, cy);       // top-right
    ctx.lineTo(cx, cy + cubeSize - sideHeight); // bottom-right
    ctx.lineTo(cx - cubeSize / 2, cy);       // bottom-left
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(topImg, 0, 0, 16, 16,
                  cx - cubeSize / 2, cy - sideHeight, cubeSize, sideHeight); // stretch
    ctx.restore();

    return canvas.toDataURL("image/png");
}
