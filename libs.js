/**
 * Build a 64x64 isometric cube from three 16x16 PNG data URIs.
 *
 * @param {string} topURI    - data:image/png;base64,...
 * @param {string} leftURI   - data:image/png;base64,...
 * @param {string} rightURI  - data:image/png;base64,...
 *
 * @returns {Promise<string>} data URI of the 64×64 final PNG
 */
async function makeIsometricCube(topURI, leftURI, rightURI) {
    const loadImg = src =>
        new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });

    const topImg = await loadImg(topURI);
    const leftImg = await loadImg(leftURI);
    const rightImg = await loadImg(rightURI);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d", { alpha: true });

    ctx.imageSmoothingEnabled = false; // preserve pixel style

    // ---- Coordinates for the isometric layout ----
    // All three faces meet at (32, 32)

    // Top face (diamond shape)
    ctx.save();
    ctx.translate(32, 16); // shift upward
    ctx.transform(
        1, -0.5,         // skew so a square becomes an isometric rhombus
        1, 0.5,
        0, 0
    );
    ctx.drawImage(topImg, -16, -16, 32, 32);
    ctx.restore();

    // Left face
    ctx.save();
    ctx.translate(16, 32);
    ctx.transform(
        1, 0.5,
        0, 1,
        0, 0
    );
    ctx.drawImage(leftImg, -16, -16, 32, 32);
    ctx.restore();

    // Right face
    ctx.save();
    ctx.translate(48, 32);
    ctx.transform(
        1, 0.5,
        0, 1,
        0, 0
    );
    ctx.drawImage(rightImg, -16, -16, 32, 32);
    ctx.restore();

    return canvas.toDataURL("image/png");
}
