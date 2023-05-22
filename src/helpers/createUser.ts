import { INewUserData } from "./../types/helpers";
import { IRegisterResponse } from "./../types/helpers";

const createUser = async (
  userObj: INewUserData
): Promise<IRegisterResponse> => {
  const res: Response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: { "Content-Type": "application/json" },
  });

  const data: IRegisterResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

export default createUser;
