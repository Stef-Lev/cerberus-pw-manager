import { INewUserData } from "./../types/helpers";
import { IRegisterResponse } from "./../types/helpers";

const createUser = async (
  userObj: INewUserData
): Promise<IRegisterResponse | string> => {
  try {
    const res: Response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: { "Content-Type": "application/json" },
    });

    const data: IRegisterResponse = await res.json();
    if (!res.ok) {
      return data.message || "Something went wrong!";
    }
    return data;
  } catch (err) {
    return "Something went wrong!";
  }
};

export default createUser;
