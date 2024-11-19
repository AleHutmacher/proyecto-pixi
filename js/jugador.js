class Jugador {
    constructor(money) {
        this.money = money;
        this.health = 100;
        this.points = 0;
    }

    hacerDaño(valor){
        this.health -= valor;
    }
}