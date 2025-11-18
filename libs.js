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

    const cx = 32;
    const cy = 32;

    const faceW = 32;
    const faceH = 16;

    // ----- LEFT FACE -----
    ctx.save();
    ctx.setTransform(1, 0.5, 0, 1, cx - faceW, cy);
    ctx.drawImage(leftImg, 0, 0, 16, 16, 0, 0, faceW, faceW); // 32x32
    ctx.restore();

    // ----- RIGHT FACE -----
    ctx.save();
    ctx.setTransform(1, -0.5, 0, 1, cx, cy);
    ctx.drawImage(rightImg, 0, 0, 16, 16, 0, 0, faceW, faceW); // 32x32
    ctx.restore();

    // ----- TOP FACE -----
    ctx.save();
    ctx.setTransform(1, 0, -1, 1, cx, cy - faceH);
    ctx.drawImage(topImg, 0, 0, 16, 16, -faceW / 2, -faceH / 2, faceW, faceH); // 32x16 diamond
    ctx.restore();

    return canvas.toDataURL("image/png");
}
