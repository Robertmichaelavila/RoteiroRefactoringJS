const { readFileSync } = require('fs');
const ServicoCalculoFatura = require("./service");

const pecas = JSON.parse(readFileSync('./pecas.json'));
const calc = new ServicoCalculoFatura(pecas);

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    }).format(valor / 100);
}

function gerarFaturaStr(fatura) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;

    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${calc.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }

    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;

    return faturaStr;
}

function gerarFaturaHTML(fatura) {
    let faturaHtml = `
    <html>
      <p> Fatura ${fatura.cliente} </p>
      <ul>`;

    for (let apre of fatura.apresentacoes) {
        faturaHtml += `
        <li> ${calc.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos) </li>`;
    }

    faturaHtml += `
      </ul>
      <p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))} </p>
      <p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} </p>
    </html>
  `;

    return faturaHtml;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas);
const faturaHTML = gerarFaturaHTML(faturas);

console.log(faturaStr);
console.log(faturaHTML);
