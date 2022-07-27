const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

//User registration
router.post("/register", async (req, res) => {
  //Validate user input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //new user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //save to mongoatlas/db
  try {
    const savedUser = await user.save();
    res.send({ id: user._id, name: user.name });
  } catch (err) {
    res.status(400).send(err);
  }
});

//User Login
router.post("/login", async (req, res) => {
  //validate input from user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email exist and continue if exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist in db");

  //check if password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //res.send(user)

  //Generate and send token for Front end / Mobile app if login success
   const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT_TOKEN_SECRET)
   res.header('jwt-auth-token',token).send(token)

});

module.exports = router;
