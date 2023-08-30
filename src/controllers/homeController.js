const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {
  try {
    const contatos = await Contato.buscaContatos();
    res.render("index", { contatos });
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};
