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
  let R = Math.floor(Math.random() * 160);
  let G = Math.floor(Math.random() * 160);
  let B = Math.floor(Math.random() * 160);

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
