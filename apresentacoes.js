const formatarMoeda = require("./util.js");

module.exports = {
    gerarFaturaStr(fatura, calc) {
        let faturaStr = `Fatura ${fatura.cliente}\n`;
    
        for (let apre of fatura.apresentacoes) {
            faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
        }
    
        faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
        faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
    
        return faturaStr;
    },
    
    gerarFaturaHTML(fatura, calc) {
        let faturaHtml = `
        <html>
          <p> Fatura ${fatura.cliente} </p>
          <ul>`;
    
        for (let apre of fatura.apresentacoes) {
            faturaHtml += `
            <li> ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos) </li>`;
        }
    
        faturaHtml += `
          </ul>
          <p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))} </p>
          <p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} </p>
        </html>
      `;
    
        return faturaHtml;
    }
}