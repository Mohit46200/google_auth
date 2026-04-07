const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    // VERIFY GOOGLE TOKEN
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    // CREATE YOUR JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });

  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Invalid Google token" });
  }
})

module.exports = router