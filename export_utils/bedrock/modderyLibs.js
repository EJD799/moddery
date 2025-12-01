export function randomInt(min, max) {
  min = Math.ceil(min); // round min up
  max = Math.floor(max); // round max down
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rgbToHex(r, g, b) {
  // Clamp values between 0 and 255
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Convert each component to two-digit hex
  const rh = r.toString(16).padStart(2, '0');
  const gh = g.toString(16).padStart(2, '0');
  const bh = b.toString(16).padStart(2, '0');

  return `#${rh}${gh}${bh}`;
}

export const modderyLibs = {
    randomColor: function() {
        return rgbToHex(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
    }
}