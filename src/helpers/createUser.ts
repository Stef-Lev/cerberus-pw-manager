const createUser = async (userObj) => {
  const res = fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: { "Content-Type": "application/json" },
  });

  const data = (await res).json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

export default createUser;
