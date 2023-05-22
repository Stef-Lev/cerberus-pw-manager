import { IPasswordChecker } from "@/types/helpers";

function passwordChecker(password: string): IPasswordChecker {
  let strength = 0;

  if (password.length > 8) {
    strength += 1;
  }

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  }

  if (password.match(/\d/)) {
    strength += 1;
  }

  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  }

  if (strength < 2) {
    return { percent: "20%", color: "#d63a47", text: "Weak" };
  } else if (strength === 2) {
    return { percent: "50%", color: "#edc679", text: "Medium" };
  } else if (strength === 3) {
    return { percent: "85%", color: "#10c455", text: "Strong" };
  } else {
    return { percent: "100%", color: "#35f57f", text: "Very strong" };
  }
}

export default passwordChecker;
