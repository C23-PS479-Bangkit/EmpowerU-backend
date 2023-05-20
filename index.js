const express = require('express');
const mongoose  = require('mongoose');
const authRoutes = require('./routes/auth')
const path = require('path');
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware")


const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const dbUrl = ""
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("MongoDB Connection Success!"))
.catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
app.get("*", checkUser);
app.get('/', requireAuth, (req,res) => {
    res.render('home');
});
app.get('/testhalaman', requireAuth, (req,res) => {
    res.render('smoothies');
});
app.use(authRoutes);
