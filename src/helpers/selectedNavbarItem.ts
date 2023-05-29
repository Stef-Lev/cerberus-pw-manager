const navbarPathnames = ["/analysis", "/search", "/settings", "/"];

const selectedNavbarItem = (path: string) => {
  return navbarPathnames.includes(path) ? path : "";
};

export default selectedNavbarItem;
