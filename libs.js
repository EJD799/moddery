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
