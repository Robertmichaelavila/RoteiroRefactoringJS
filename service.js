module.exports = class ServicoCalculoFatura {
    constructor(pecas) {
        this.pecas = pecas;
    }

    getPeca(apresentacao) {
        return this.pecas[apresentacao.id];
    }

    calcularTotalApresentacao(apre) {
        let total = 0;
        switch (this.getPeca(apre).tipo) {
          case "tragedia":
            total = 40000;
            if (apre.audiencia > 30) {
            total += 1000 * (apre.audiencia - 30);
            }

            break;
          case "comedia":
            total = 30000;
            if (apre.audiencia > 20) {
            total += 10000 + 500 * (apre.audiencia - 20);
            }
            total += 300 * apre.audiencia;

            break;
          default:
              throw new Error(`Peça desconhecida: ${this.getPeca(apre).tipo}`);
        }

        return total;
    }

    calcularCredito(apre) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (this.getPeca(apre).tipo === "comedia") 
           creditos += Math.floor(apre.audiencia / 5);

        return creditos;   
    }

    calcularTotalCreditos(apresentacoes) {
        let total = 0;
        for (let apre of apresentacoes) {
            let creditos = this.calcularCredito(apre);
            total += creditos;
        }

        return total;
    }
    
    calcularTotalFatura(apresentacoes) {
        let total = 0;
        for (let apre of apresentacoes) {
            let fatura = this.calcularTotalApresentacao(apre);
            total += fatura;
        }

        return total;
    }
}