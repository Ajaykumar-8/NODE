let express = require('express');
let authRouter = require("./routers/authRouter.js");
let dotenv = require('dotenv');

dotenv.config();

let app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.get("/", (req, res) => {
    res.send("Server is running Developer1 ✅✅✅");
})
app.use((err, req, res, next) => {
    
    res.status(500).json({
        status: "failed",
        error: err.message,
    });
}    
)

module.exports = app;