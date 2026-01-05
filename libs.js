const javaItemCDN = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.11/assets/minecraft/textures";

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

function getFormattedDateTime() {
  const now = new Date();

  // Extract parts in local time
  let month = now.getMonth() + 1; // 0-based
  let day = now.getDate();
  let year = now.getFullYear();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // AM/PM formatting
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  // Pad values to 2 digits
  const pad = (n) => (n < 10 ? "0" + n : n);

  return `${pad(month)}/${pad(day)}/${year} at ${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getMaterialInstances(geoJson) {
  const materials = [];

  const geometries = geoJson["minecraft:geometry"];
  if (!Array.isArray(geometries)) return materials;

  for (const geometry of geometries) {
    const bones = geometry.bones;
    if (!Array.isArray(bones)) continue;

    for (const bone of bones) {
      if (!Array.isArray(bone.cubes)) continue;

      for (const cube of bone.cubes) {
        const uv = cube.uv;
        if (!uv) continue;

        // Iterate through each face
        for (const faceName in uv) {
          const face = uv[faceName];
          if (face?.material_instance) {
            materials.push(face.material_instance);
          }
        }
      }
    }
  }

  // Remove duplicates while preserving order
  return [...new Set(materials)];
}

function generateSelectContents(list) {
    let str = "";
    for (let i = 0; i < list.length; i++) {
        str += `<option>${list[i]}</option>`;
    }
    return str;
}

async function downloadZip(zip, filename) {
  const blob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function copyZipIntoFolder(sourceZip, targetFolder) {
  const files = Object.values(sourceZip.files);

  for (const file of files) {
    // Skip directories; JSZip creates them automatically
    if (file.dir) continue;

    // Read file contents
    const data = await file.async("arraybuffer");

    // Recreate the same path inside the target folder
    targetFolder.file(file.name, data);
  }
}

function isBedrockShapedRecipeValid(recipeArray) {
    if (!Array.isArray(recipeArray) || recipeArray.length < 9) {
        return false;
    }

    // Extract 3x3 grid, ignore output slot (index 9)
    const grid = recipeArray
        .slice(0, 9)
        .map(e => e && e[0] ? 1 : 0);

    // Helper to count filled slots
    const count = arr => arr.reduce((a, b) => a + b, 0);

    // Check rows
    for (let r = 0; r < 3; r++) {
        const row = grid.slice(r * 3, r * 3 + 3);
        if (count(row) >= 2) return true;
    }

    // Check columns
    for (let c = 0; c < 3; c++) {
        const col = [grid[c], grid[c + 3], grid[c + 6]];
        if (count(col) >= 2) return true;
    }

    // Check orthogonal adjacency
    const directions = [
        [1, 0],  // down
        [-1, 0], // up
        [0, 1],  // right
        [0, -1]  // left
    ];

    for (let i = 0; i < 9; i++) {
        if (!grid[i]) continue;

        const x = i % 3;
        const y = Math.floor(i / 3);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx > 2 || ny < 0 || ny > 2) continue;

            const ni = ny * 3 + nx;
            if (grid[ni]) return true;
        }
    }

    // Fails all structural checks
    return false;
}

function isValidElementName(value) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(value);
}

function isValidElementID(value) {
  return /^[a-z_][a-z0-9_]*$/.test(value);
}

function isValidAssetName(value) {
  return /^[a-z_][a-z0-9_.]*$/.test(value);
}

async function generateEmptyPNGBlob(width, height) {
  // Create an in-memory canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height); // ensure fully transparent

  // Convert canvas to Blob (PNG format)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // Release canvas reference
      resolve(blob);
    }, "image/png");
  });
}

function formatTimestamp(ts) {
  let d = new Date(ts);

  let MM = String(d.getMonth() + 1).padStart(2, "0");
  let DD = String(d.getDate()).padStart(2, "0");
  let YYYY = d.getFullYear();

  let hh = String(d.getHours()).padStart(2, "0");
  let mm = String(d.getMinutes()).padStart(2, "0");
  let ss = String(d.getSeconds()).padStart(2, "0");

  let ampm;

  if (hh > 12) {
    hh -= 12;
    ampm = "PM";
  } else if (hh == 0) {
    hh = 12;
    ampm = "AM";
  } else {
    ampm = "AM";
  }

  return `${MM}/${DD}/${YYYY} ${hh}:${mm}:${ss} ${ampm}`;
}