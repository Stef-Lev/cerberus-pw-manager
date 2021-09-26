const Yup = require("yup");
const ExpressError = require("./ExpressError");

const validate = async (req, res, next) => {
  const validationSchema = Yup.object()
    .shape({
      title: Yup.string("Enter the app title").required("Title is required"),
      username: Yup.string("Enter the username").required(
        "Username is required"
      ),
      password: Yup.string("Enter the password").required(
        "Password is required"
      ),
      url: Yup.string("Enter the app url").url("Please use a valid url"),
      iv: Yup.string().required(),
    })
    .required();

  try {
    const validData = await validationSchema.validate(req.body);
    req.validData = validData;
    return next();
  } catch (error) {
    return res
      .status(400)
      .json(new ExpressError("error", error.name, error.message, 400));
  }
};
module.exports = validate;
