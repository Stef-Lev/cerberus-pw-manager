const navbarPathnames = ['/analysis', '/search', '/settings'];

const selectedNavbarItem = path => {
  return navbarPathnames.includes(path) ? path : '/';
};

export default selectedNavbarItem;
