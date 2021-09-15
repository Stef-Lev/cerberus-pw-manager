import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string("Enter title").required("Please add a title"),
  username: Yup.string("Enter username").required("Please add the username"),
  password: Yup.string("Enter password").required("Please add a password"),
  url: Yup.string("Enter website url").url("Please use a valid url"),
  notes: Yup.string().max(250, "Notes must be up to 250 characters"),
});

export { validationSchema };
