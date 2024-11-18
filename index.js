const { readFileSync } = require('fs');

const ServicoCalculoFatura = require("./service");
const Repositorio = require("./repositorio.js");
const { gerarFaturaStr, gerarFaturaHTML } = require("./apresentacoes.js");
const calc = new ServicoCalculoFatura(new Repositorio());

const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
const faturaHTML = gerarFaturaHTML(faturas, calc);

console.log(faturaStr);
console.log(faturaHTML);
