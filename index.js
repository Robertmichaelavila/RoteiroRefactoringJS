const { readFileSync } = require('fs');

function tragedia(audiencia) {
  let total = 40000;
  if (audiencia > 30) {
    total += 1000 * (audiencia - 30);
  }
  return total;
}

function comedia(audiencia) {
  let total = 30000;
  if (audiencia > 20) {
    total += 10000 + 500 * (audiencia - 20);
  }
  total += 300 * audiencia;
  return total;
} 

function gerarFaturaStr(fatura) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  function calcularTotalApresentacao(apre) {
    let total = 0;
    switch (getPeca(apre).tipo) {
      case "tragedia":
          total = tragedia(apre.audiencia);
          break;
      case "comedia":
        total = comedia(apre.audiencia);
        break;
      default:
          throw new Error(`Peça desconhecida: ${getPeca(apre).tipo}`);
    }
    return total;
  }
  
  function getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }
  
  function calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia") 
       creditos += Math.floor(apre.audiencia / 5);
    return creditos;   
  }
  
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR",
      { style: "currency", currency: "BRL",
        minimumFractionDigits: 2 }).format(valor/100);
  }
  
  function calcularTotalCreditos(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      let creditos = calcularCredito(apre);
      total += creditos;
    }
    return total;
  }
  
  function calcularTotalFatura(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      let fatura = calcularTotalApresentacao(apre);
      total += fatura;
    }
    return total;
  }
  
  for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calcularTotalCreditos(fatura.apresentacoes)} \n`;

  return faturaStr;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas);
console.log(faturaStr);
