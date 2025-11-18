/**
 * Create a 64x64 PNG data URL of a cube with three 16x16 side textures.
 * @param {string} topDataURI   - data URL of 16x16 PNG for the top face
 * @param {string} frontDataURI - data URL of 16x16 PNG for the front face
 * @param {string} rightDataURI - data URL of 16x16 PNG for the right face
 * @returns {Promise<string>} - Promise that resolves to a data:image/png;base64,... URL (64x64)
 */
async function createCube64(topDataURI, frontDataURI, rightDataURI) {
  // Load an image from a data URI (returns HTMLImageElement)
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      // keep crossOrigin unset for data URIs
    });
  }

  // Draw image mapped from a source rectangle (0..w,0..h) to a destination parallelogram.
  // dest0 = mapped position of source (0,0)
  // dest1 = mapped position of source (w,0)
  // dest2 = mapped position of source (0,h)
  // Uses ctx.setTransform(a,b,c,d,e,f) where (u,v) -> (a*u + c*v + e, b*u + d*v + f)
  function drawImageToParallelogram(ctx, img, w, h, dest0, dest1, dest2) {
    // compute affine transform
    const a = (dest1.x - dest0.x) / w;
    const b = (dest1.y - dest0.y) / w;
    const c = (dest2.x - dest0.x) / h;
    const d = (dest2.y - dest0.y) / h;
    const e = dest0.x;
    const f = dest0.y;

    ctx.save();
    ctx.setTransform(a, b, c, d, e, f);
    // draw the source rectangle into transformed space
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
  }

  // load images
  const [imgTop, imgFront, imgRight] = await Promise.all([
    loadImg(topDataURI),
    loadImg(frontDataURI),
    loadImg(rightDataURI)
  ]);

  // create canvas
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // keep pixel art sharp
  ctx.imageSmoothingEnabled = false;
  // clear
  ctx.clearRect(0, 0, size, size);

  // cube layout parameters (tweakable)
  const S = 28;           // front face square size in px
  const depthX = 10;      // oblique depth X
  const depthY = 8;       // oblique depth Y (vertical)
  const px = Math.round((size - (S + depthX)) / 2); // front-top-left x
  const py = Math.round((size - (S + depthY)) / 2); // front-top-left y

  // Coordinates:
  // Front face corners:
  // top-left: (px, py)
  // top-right: (px + S, py)
  // bottom-left: (px, py + S)
  // bottom-right: (px + S, py + S)

  // Top face should map source (0,0)-> dest0 (px + depthX, py - depthY)
  // source (w,0) -> dest1 (px + S + depthX, py - depthY)
  // source (0,h) -> dest2 (px, py)
  const topDest0 = { x: px + depthX, y: py - depthY };
  const topDest1 = { x: px + S + depthX, y: py - depthY };
  const topDest2 = { x: px, y: py };

  // Front face is a plain rectangle (no transform needed) but we still use parallel mapping:
  // source (0,0) -> dest0 (px, py)
  // source (w,0) -> dest1 (px + S, py)
  // source (0,h) -> dest2 (px, py + S)
  const frontDest0 = { x: px, y: py };
  const frontDest1 = { x: px + S, y: py };
  const frontDest2 = { x: px, y: py + S };

  // Right face mapping:
  // source (0,0) -> dest0 (px + S, py)
  // source (w,0) -> dest1 (px + S + depthX, py - depthY)
  // source (0,h) -> dest2 (px + S, py + S)
  const rightDest0 = { x: px + S, y: py };
  const rightDest1 = { x: px + S + depthX, y: py - depthY };
  const rightDest2 = { x: px + S, y: py + S };

  // OPTIONAL: draw a subtle outline/shadow for depth (nice effect)
  // draw shadow polygon for right+top edges
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  // shadow under top face
  ctx.beginPath();
  ctx.moveTo(topDest0.x, topDest0.y);
  ctx.lineTo(topDest1.x, topDest1.y);
  ctx.lineTo(topDest1.x, topDest1.y + 2);
  ctx.lineTo(topDest0.x, topDest0.y + 2);
  ctx.closePath();
  ctx.fill();
  // shadow for right face (small)
  ctx.beginPath();
  ctx.moveTo(rightDest0.x + 2, rightDest0.y + 2);
  ctx.lineTo(rightDest1.x + 2, rightDest1.y + 2);
  ctx.lineTo(rightDest1.x + 2, rightDest1.y + 2 + S);
  ctx.lineTo(rightDest0.x + 2, rightDest0.y + 2 + S);
  ctx.closePath();
  ctx.fill();

  // Draw top (map imgTop 16x16 into parallelogram)
  drawImageToParallelogram(ctx, imgTop, imgTop.width, imgTop.height, topDest0, topDest1, topDest2);

  // Draw right face (map imgRight)
  drawImageToParallelogram(ctx, imgRight, imgRight.width, imgRight.height, rightDest0, rightDest1, rightDest2);

  // Draw front face (map imgFront)
  drawImageToParallelogram(ctx, imgFront, imgFront.width, imgFront.height, frontDest0, frontDest1, frontDest2);

  // optional: crisp outline around faces
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 1;
  // outline top
  ctx.beginPath();
  ctx.moveTo(topDest0.x, topDest0.y);
  ctx.lineTo(topDest1.x, topDest1.y);
  ctx.lineTo(frontDest1.x, frontDest1.y);
  ctx.lineTo(frontDest0.x, frontDest0.y);
  ctx.closePath();
  ctx.stroke();
  // outline right
  ctx.beginPath();
  ctx.moveTo(rightDest0.x, rightDest0.y);
  ctx.lineTo(rightDest1.x, rightDest1.y);
  ctx.lineTo(rightDest1.x, rightDest1.y + S);
  ctx.lineTo(rightDest0.x, rightDest0.y + S);
  ctx.closePath();
  ctx.stroke();
  // outline front
  ctx.beginPath();
  ctx.rect(frontDest0.x + 0.5, frontDest0.y + 0.5, S - 1, S - 1);
  ctx.stroke();

  // return data URL (PNG)
  return canvas.toDataURL("image/png");
}
