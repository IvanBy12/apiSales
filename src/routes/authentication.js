const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const adminSchema = require("../models/admin");
const jwt = require("jsonwebtoken");
const verifyToken = require("./validate_token");

router.post("/signup", async (req, res) => {
  const { usuario,  clave } = req.body;
  const admin = new adminSchema({
      usuario: usuario,
      clave: clave,
  });

  admin.clave = await admin.encryptClave(admin.clave); //encripta la clave: (usando bcrypt para hashear la contraseña)
  await admin.save(); //guardar en usuario en la BD

  const token = jwt.sign({ id: admin._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({
    auth: true,
    token,
    admin,
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body.usuario);
  const admin = await adminSchema.findOne({ usuario: req.body.usuario });

  //validando si no se encuentra
  if (!admin)
      return res.status(400).json({ error: "Usuario o clave incorrectos" });

  const validPassword = await bcrypt.compare(req.body.clave , admin.clave );
  let accessToken = null;
  if (!validPassword) {
      return res.status(400).json({ error: "Usuario o clave incorrectos" });
  } else {
      const expiresIn = 24 * 60 * 60;
      accessToken = jwt.sign(
          { id: admin._id },
          process.env.SECRET, {
          expiresIn: expiresIn
      });
      
      res.json({
        accessToken: accessToken,
        _id: admin._id
    });
  }
});

module.exports = router;
