const logos = [
  "adobe",
  "ebay",
  "facebook",
  "google",
  "hp",
  "instagram",
  "linkedin",
  "netflix",
  "slack",
  "spotify",
  "tiktok",
  "youtube",
  "zoom",
];

const existingLogo = (url) => {
  const splitUrl = url.split(".")[1];
  return logos.find((logo) => splitUrl.includes(logo));
};

const randomRGB = () => {
  let min = 80;
  let max = 200;
  let R = Math.floor(Math.random() * (max - min + 1)) + min;
  let G = Math.floor(Math.random() * (max - min + 1)) + min;
  let B = Math.floor(Math.random() * (max - min + 1)) + min;

  return `rgb(${R},${G},${B})`;
};

exports.recordLogo = (url) => {
  const splitUrl = url.split(".")[1];
  if (existingLogo(url)) {
    return `image:${splitUrl}`;
  } else {
    return `icon:${randomRGB()}:${splitUrl[0].toUpperCase()}`;
  }
};
