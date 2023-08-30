const mongoose = require("mongoose");
const validator = require("validator");

const contatoSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", contatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.buscaPorId = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.buscaContatos = async function () {
  const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
  return contatos;
};

Contato.delete = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findOneAndDelete({ _id: id });
  return contato;
};

Contato.prototype.register = async function () {
  this.valida();

  if (this.errors.length > 0) {
    return;
  }

  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function () {
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("Email invalido");
  if (!this.body.name) this.errors.push("Nome é um campo obrigatório");
  if (!this.body.email && !this.body.tel)
    this.errors.push("Pelo menos email ou telefone deveem ser preenchidos");
  this.cleanUp();
};

Contato.prototype.edit = async function (id) {
  if (typeof id !== "string") return;

  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    tel: this.body.tel,
  };
};

module.exports = Contato;
