function passwordChecker(password) {
  let strength = 0;

  if (password.length < 8) {
    strength += 0;
  } else {
    strength += 1;
  }

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    strength += 0;
  }

  if (password.match(/\d/)) {
    strength += 1;
  } else {
    strength += 0;
  }

  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    strength += 0;
  }

  if (strength < 2) {
    return { percent: '20%', color: '#d63a47' };
  } else if (strength === 2) {
    return { percent: '50%', color: '#edc679' };
  } else if (strength === 3) {
    return { percent: '85%', color: '#35f57f' };
  } else {
    return { percent: '100%', color: '#10c455' };
  }
}

export default passwordChecker;
