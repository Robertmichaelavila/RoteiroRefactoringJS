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

function gerarFaturaStr (fatura, pecas) {
    let totalFatura = 0;
    let creditos = 0;
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    const formato = new Intl.NumberFormat("pt-BR",
                          { style: "currency", currency: "BRL",
                            minimumFractionDigits: 2 }).format;

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
            throw new Error(`Peça desconhecia: ${getPeca(apre).tipo}`);
      }
      return total;
    }

    function getPeca(apresentacao) {
      return pecas[apresentacao.id];
    }
  
    for (let apre of fatura.apresentacoes) {
      const peca = getPeca(apre); 
      let total = 0;
  
      total += calcularTotalApresentacao(apre);
  
      // créditos para próximas contratações
      creditos += Math.max(apre.audiencia - 30, 0);
      if (getPeca(apre).tipo === "comedia") 
         creditos += Math.floor(apre.audiencia / 5);
  
      // mais uma linha da fatura
      faturaStr += `  ${getPeca(apre).nome}: ${formato(total/100)} (${apre.audiencia} assentos)\n`;
      totalFatura += total;
    }
    faturaStr += `Valor total: ${formato(totalFatura/100)}\n`;
    faturaStr += `Créditos acumulados: ${creditos} \n`;
    return faturaStr;
  }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
