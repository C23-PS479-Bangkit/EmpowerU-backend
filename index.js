const express = require('express');
const mongoose  = require('mongoose');
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const path = require('path');
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require('dotenv').config();
const fs = require('fs')


const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const dbUrl = `${process.env.DB_URL}`;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("MongoDB Connection Success!"))
.catch((err) => console.log(err));

app.listen(PORT, () => {
    const serviceAccount = {
        "type": "service_account",
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain": "googleapis.com"
    }
    let jsonString = JSON.stringify(serviceAccount,null, ' ')
    jsonString = jsonString.replaceAll('\\n', 'n');
    fs.writeFile('./capstone-project-387306-60ec83c14618.json', jsonString, err => {
        if (err) {
            console.log('Error writing file!', err)
        } else {
            console.log('Successfully wrote service account file!')
        }
    })
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
app.use(postRoutes);