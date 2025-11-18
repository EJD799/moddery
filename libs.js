async function makeIsometricCube(topURI, leftURI, rightURI) {
    // ---- Utility to load a PNG from data URI ----
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // ---- Load all 3 face textures ----
    const [topImg, leftImg, rightImg] = await Promise.all([
        loadImg(topURI), loadImg(leftURI), loadImg(rightURI)
    ]);

    // ---- Read pixel data from textures ----
    function getPixels(img) {
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, img.width, img.height);
    }

    const top = getPixels(topImg);
    const left = getPixels(leftImg);
    const right = getPixels(rightImg);

    // ---- Output canvas ----
    const out = document.createElement("canvas");
    out.width = 64;
    out.height = 64;
    const ctx = out.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const outData = ctx.getImageData(0, 0, 64, 64);

    // ---- 3D → isometric projection ----
    function iso(x, y, z) {
        // classic 30° isometric projection
        return {
            x: 32 + (x - y) * 0.866,   // cos 30°
            y: 48 - z + (x + y) * 0.5
        };
    }

    // ---- Helper: Draw one face from pixel data ----
    function drawFace(source, faceFunc) {
        const w = source.width;
        const h = source.height;
        const src = source.data;

        for (let py = 0; py < h; py++) {
            for (let px = 0; px < w; px++) {

                // Get original pixel
                const i = (py * w + px) * 4;
                const r = src[i + 0];
                const g = src[i + 1];
                const b = src[i + 2];
                const a = src[i + 3];
                if (a === 0) continue;

                // Map pixel to 3D cube coordinate
                const pos = faceFunc(px, py);

                // Project to screen
                const p = iso(pos.x, pos.y, pos.z);

                const xi = Math.round(p.x);
                const yi = Math.round(p.y);
                if (xi < 0 || xi >= 64 || yi < 0 || yi >= 64) continue;

                const oi = (yi * 64 + xi) * 4;
                outData.data[oi + 0] = r;
                outData.data[oi + 1] = g;
                outData.data[oi + 2] = b;
                outData.data[oi + 3] = 255;
            }
        }
    }

    // ---- Define cube dimensions ----
    const S = 16;      // block size in pixels
    const H = 16;      // height
    const half = S / 2;

    // ---- Project faces ----

    // TOP FACE (tex coords px,py → world coords)
    drawFace(top, (px, py) => ({
        x: px,
        y: py,
        z: H
    }));

    // LEFT FACE
    // maps 16×16 texture to left vertical face
    drawFace(left, (px, py) => ({
        x: 0,
        y: px,
        z: H - py
    }));

    // RIGHT FACE
    drawFace(right, (px, py) => ({
        x: px,
        y: 0,
        z: H - py
    }));

    // ---- Draw final image ----
    ctx.putImageData(outData, 0, 0);

    return out.toDataURL("image/png");
}
