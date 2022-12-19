exports.logos = [
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

exports.existingIcon = (url) => {
  const splitUrl = url.split(".")[1];
  return logos.find((logo) => splitUrl.includes(logo));
};

exports.randomRGB = () => {
  let R = Math.floor(Math.random() * 160);
  let G = Math.floor(Math.random() * 160);
  let B = Math.floor(Math.random() * 160);

  return `rgb(${R},${G},${B})`;
};

exports.recordIcon = (url) => {
  const splitUrl = url.split(".")[1];
  if (existingIcon(url)) {
    return `image:${splitUrl}`;
  } else {
    return `icon:${randomRGB()}:${splitUrl[0]}`;
  }
};
