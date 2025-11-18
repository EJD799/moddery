/**
 * Create a 64x64 PNG of a cube whose inner corner is at the center (32,32).
 * topURI  - data URI 16x16 for the top face
 * leftURI - data URI 16x16 for the left face
 * rightURI- data URI 16x16 for the right face
 * Returns Promise<string> -> data:image/png;base64,...
 */
async function makeIsometricCube(topURI, leftURI, rightURI) {
  // load data-URI image
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // draw image stretched into a parallelogram using an affine transform
  function drawImageToParallelogram(ctx, img, w, h, dest0, dest1, dest2) {
    // compute affine transform mapping (0,0)->dest0, (w,0)->dest1, (0,h)->dest2
    const a = (dest1.x - dest0.x) / w;
    const b = (dest1.y - dest0.y) / w;
    const c = (dest2.x - dest0.x) / h;
    const d = (dest2.y - dest0.y) / h;
    const e = dest0.x;
    const f = dest0.y;

    ctx.save();
    ctx.setTransform(a, b, c, d, e, f);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
  }

  // load images
  const [topImg, leftImg, rightImg] = await Promise.all([
    loadImg(topURI),
    loadImg(leftURI),
    loadImg(rightURI)
  ]);

  // canvas setup
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.imageSmoothingEnabled = false;

  // Parameters you can tweak:
  const Cx = size / 2; // center x (meeting corner)
  const Cy = size / 2; // center y (meeting corner)
  const S = 26;        // projected half-width/size basis for faces (tweak if needed)
  const depthX = 14;   // horizontal skew for top->right/left
  const depthY = 8;    // vertical skew for top

  // We'll map each 16x16 source to a parallelogram sized roughly S x S,
  // positioned so their inner corner is at (Cx,Cy).

  // TOP face mapping:
  // Source coordinates: (0,0) top-left, (w,0) top-right, (0,h) bottom-left.
  // We want the bottom edge of the top face to meet at center.
  const top_w = topImg.width;
  const top_h = topImg.height;
  const half = S / 2;

  // Place the top face above the center, slanted back
  const topDest0 = { x: Cx - half + depthX, y: Cy - S - depthY };         // mapped (0,0)
  const topDest1 = { x: Cx + half + depthX, y: Cy - S - depthY };         // mapped (w,0)
  const topDest2 = { x: Cx - half,             y: Cy - half };            // mapped (0,h)
  // Note: The bottom-right of the top face will be roughly at center-ish

  // LEFT face mapping:
  const left_w = leftImg.width;
  const left_h = leftImg.height;
  // left face has its inner corner at center, extends left-down
  const leftDest0 = { x: Cx - half,               y: Cy - half };         // (0,0) -> inner corner top
  const leftDest1 = { x: Cx - half - depthX,      y: Cy - half - depthY }; // (w,0) -> back/top-left
  const leftDest2 = { x: Cx - half,               y: Cy + half };          // (0,h) -> bottom-left

  // RIGHT face mapping:
  const right_w = rightImg.width;
  const right_h = rightImg.height;
  // right face inner corner at center, extends right-down
  const rightDest0 = { x: Cx + half,              y: Cy - half };         // (0,0)
  const rightDest1 = { x: Cx + half + depthX,     y: Cy - half - depthY }; // (w,0)
  const rightDest2 = { x: Cx + half,              y: Cy + half };          // (0,h)

  // clear
  ctx.clearRect(0, 0, size, size);

  // subtle shadow under top face (gives depth)
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.beginPath();
  ctx.moveTo(topDest0.x, topDest0.y);
  ctx.lineTo(topDest1.x, topDest1.y);
  ctx.lineTo(topDest1.x, topDest1.y + 3);
  ctx.lineTo(topDest0.x, topDest0.y + 3);
  ctx.closePath();
  ctx.fill();

  // draw top
  drawImageToParallelogram(ctx, topImg, top_w, top_h, topDest0, topDest1, topDest2);

  // draw left (draw darker overlay to mimic Minecraft shading)
  drawImageToParallelogram(ctx, leftImg, left_w, left_h, leftDest0, leftDest1, leftDest2);
  // apply slight darkening for left face
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.beginPath();
  ctx.moveTo(leftDest0.x, leftDest0.y);
  ctx.lineTo(leftDest1.x, leftDest1.y);
  ctx.lineTo(leftDest1.x, leftDest1.y + S);
  ctx.lineTo(leftDest0.x, leftDest0.y + S);
  ctx.closePath();
  ctx.fill();

  // draw right
  drawImageToParallelogram(ctx, rightImg, right_w, right_h, rightDest0, rightDest1, rightDest2);
  // slight shading on right face
  ctx.fillStyle = "rgba(0,0,0,0.04)";
  ctx.beginPath();
  ctx.moveTo(rightDest0.x, rightDest0.y);
  ctx.lineTo(rightDest1.x, rightDest1.y);
  ctx.lineTo(rightDest1.x, rightDest1.y + S);
  ctx.lineTo(rightDest0.x, rightDest0.y + S);
  ctx.closePath();
  ctx.fill();

  // crisp outline for clarity
  ctx.strokeStyle = "rgba(0,0,0,0.28)";
  ctx.lineWidth = 1;
  // outline seam around the three faces
  ctx.beginPath();
  ctx.moveTo(topDest0.x, topDest0.y);
  ctx.lineTo(topDest1.x, topDest1.y);
  ctx.lineTo(rightDest1.x + 0.5, rightDest1.y + 0.5);
  ctx.lineTo(rightDest2.x + 0.5, rightDest2.y + 0.5);
  ctx.lineTo(rightDest0.x + 0.5, rightDest0.y + 0.5);
  ctx.lineTo(leftDest2.x - 0.5, leftDest2.y + 0.5);
  ctx.lineTo(leftDest0.x - 0.5, leftDest0.y - 0.5);
  ctx.closePath();
  ctx.stroke();

  // Return PNG data URI
  return canvas.toDataURL("image/png");
}
