let pool = require("./../db.js");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.login = async (req, res, next) => {
  try {
    // Your login logic here
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    let dbUser = await pool.query(
      "SELECT email, password FROM user WHERE email=?",
      [email]
    );
    dbUser = dbUser[0];
    // check if user exists
    if (dbUser.length == 0) throw new Error("no user exists");
    
    let exUser = dbUser[0];
    
    // compare the password
    const same = await bcrypt.compare(password, exUser.password);
    // check if password is correct
    if (!email || !password) {
    throw new Error("Email and password are required");
}
    const token = jwt.sign({ email: exUser.email }, 
        process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    // send success response with token
    return res
      .status(500)
      .json({ msg: "Successfully Logged In", token: token });
  } catch (error) {
    next(error);
  }
};

module.exports.signup = async (req, res, next) => {
    let user = req.body;

    try {
        // Your signup logic here
        
        // check if email already exists
        const [dbuser] = await pool.query(
            "SELECT 1 FROM user WHERE email = ?",
            [user.email]
        );
        console.log("dbuser:", dbuser);
        if (dbuser.length > 0) {
            return res.status(500).json({
                status: "failed",
                error: "Email already exists",
            });
        }
        console.log("hashing password...");
        // hash the password
        let hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("password hashed");

        console.log("inserting user...");
        // save the user to the database
        let result = await pool.query(
            "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
            [user.name, user.email, hashedPassword]
        );
        console.log("user inserted:", result);
        // send success response
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
        });
    } catch (error) {
        console.log("Full Error:");
        console.log(error);
        next(error);
    }
}
