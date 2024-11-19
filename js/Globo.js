class Globo extends PIXI.Sprite {
  constructor(x, y, app, checkpoints) {
    super();

    // Ahora puedes acceder a 'this'
    this.x = x;
    this.y = y;
    this.app = app;
    this.checkpoints = checkpoints; // Array de posiciones de checkpoints
    this.currentCheckpoint = 0; // Índice del checkpoint actual
    this.life = 5; // Vida inicial del globo
    this.speed = 2; // Velocidad de movimiento
    this.listo = false;

    app.stage.addChild(this); // Añadir el globo al escenario
    this.cargarSprite(); // Cargar el sprite animado
  }

  async cargarSprite() {
    const globo1 = await PIXI.Assets.load("./img/globos/Globo1.png");
    const globo2 = await PIXI.Assets.load("./img/globos/Globo2.png");
    const globo3 = await PIXI.Assets.load("./img/globos/Globo3.png");
    const globo4 = await PIXI.Assets.load("./img/globos/Globo4.png");
    const globo5 = await PIXI.Assets.load("./img/globos/Globo5.png");
    if (this.life > 4) {this.sprite = new PIXI.Sprite(globo5);}
    else if (this.life > 3) {this.sprite = new PIXI.Sprite(globo4);}
    else if (this.life > 2) {this.sprite = new PIXI.Sprite(globo3);}
    else if (this.life > 1) {this.sprite = new PIXI.Sprite(globo2);}
    else {this.sprite = new PIXI.Sprite(globo1);}

    // Configurar posición inicial
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.anchor.set(0.5, 0.5);

    // Añadir el sprite animado al escenario
    this.app.stage.addChild(this.sprite);
    this.listo = true;
  }

  moveToCheckpoint() {
    const checkpoint = this.checkpoints[this.currentCheckpoint];
    const dx = checkpoint.x - this.x; // Diferencia en X
    const dy = checkpoint.y - this.y; // Diferencia en Y
    

    // Si el sprite no está en el checkpoint, sigue moviéndose
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Normalizar la distancia para mover el sprite de manera uniforme
        const angle = Math.atan2(dy, dx); // Calcula el ángulo hacia el checkpoint

        // Actualiza la posición del sprite para acercarse al checkpoint
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    else{
        if(this.currentCheckpoint + 1 < this.checkpoints.length){
            this.currentCheckpoint++;
        }
        else{
            juego.jugador.hacerDaño(this.life);
            console.log("haciendo " + this.life + " de daño");
            this.eliminarGlobo();
        }
    }
}

eliminarGlobo(){
  if(this.sprite){
    this.app.stage.removeChild(this.sprite);
    this.sprite.destroy();
  }
  const index = juego.globos.indexOf(this);
  if (index > -1) {
    juego.globos.splice(index, 1);
  }
  console.log("Globo eliminado");
}


  update(time) {
    if (!this.listo) return;
    
    this.time = time;
    this.moveToCheckpoint();
  }

  takeDamage(amount) {
    // Reducir la vida del globo
    this.life -= amount;
    if (this.life <= 0) {
      // El globo muere, se elimina del escenario
      this.eliminarGlobo();
    }
  }
}
