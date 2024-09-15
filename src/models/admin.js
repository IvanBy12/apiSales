const mongoose = require("mongoose"); // importando el componente mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt
const adminSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: false,
  },
  clave: {
    type: String,
    required: true,
  },
});
adminSchema.methods.encryptClave = async (clave) => {

  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clave, salt);
};
module.exports = mongoose.model("admin", adminSchema);
