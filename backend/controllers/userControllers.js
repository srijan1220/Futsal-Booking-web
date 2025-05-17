const { json } = require("express");
const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const createAdmin = async (req, res) => {
  try {
    
    
    // Predefined values for admin
    const userName = "admin";
    const password = "admin123"; // You can change this to whatever is needed
    const email = "admin@gmail.com";
    const phoneNumber = "1234567890"; // You can change this to whatever is needed
    
    // Check if the user already exists
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Admin user already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin user
    const newUser = new Users({
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
      isAdmin: true, // Set isAdmin to true for admin users
    });
    
    // Save the new user
    await newUser.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "markbase99@gmail.com",
      pass: "hwkh esmi mezr sesw",
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: "merojagir0@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};
const createUser = async (req, res) => {
  // // step1 : Check incomming data
  console.log(req.body);

  // // step2 : destructuring the json data
  const { userName, phoneNumber, email, password } = req.body;

  // // step3 : validate the data
  if (!userName || !phoneNumber || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }
  // step4
  try {
    // step5 check existing user
    const existingUser = await Users.findOne({ userName: userName });
    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    // password encryption
    const generateSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, generateSalt);

    // step 6 create new user || modelName: Destrued name
    const newUser = new Users({
      userName: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: encryptedPassword,
    });
    // step7 save the user
    await newUser.save();
    // step8 send the response
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  //     return res.json({
  //     success: true,
  //     message: "User Logged In"
  // })
  console.log(req.body);
  const { userName, password } = req.body;

  // // step3 : validate the data
  if (!userName || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }
  // strp 4: try catch
  try {
    // step5 :find user
    const user = await Users.findOne({ userName: userName }); //user store all the data of User
    if (!user) {
      return res.json({
        success: false,
        message: "User Doesnot Exsits",
      });
    }
    // step6 : check password
    const passwordToCompare = user.password;
    const isPasswordMatch = await bcrypt.compare(password, passwordToCompare);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Password Doesnot Match",
      });
    }
    // step7: create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET
    );
    // step 8: send Response

    res.status(201).json({
      success: true,
      token: token,
      userData: user,
      message: "User Logged In successfully",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updateUser = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.params.id;
  console.log(id);

  if (!currentPassword || !newPassword) {
    return res.json({
      success: false,
      message: "Current and new passwords are required",
    });
  }

  try {
    const user = await Users.findById({ _id: id });
    // Compare the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    // Encrypt the new password and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single User Function
const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await Users.findById(id).select("-password"); // Exclude password
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const generatedPassword = Math.random().toString(36).slice(-6);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(generatedPassword, salt);
    await user.save();

    const emailSubject = "Password Reset";
    const emailText = `Your new password is: ${generatedPassword}`;

    await sendEmail(email, emailSubject, emailText);

    res.json({
      success: true,
      message: "New password sent to your email for password reset",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getSingleUser,
  forgetPassword,
  createAdmin
};
