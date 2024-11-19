class Globo extends PIXI.Sprite {
  constructor(x, y, app, checkpoints) {
    super();

    // Ahora puedes acceder a 'this'
    this.x = x;
    this.y = y;
    this.app = app;
    this.checkpoints = checkpoints; // Array de posiciones de checkpoints
    this.currentCheckpoint = 0; // Índice del checkpoint actual
    this.life = 100; // Vida inicial del globo
    this.speed = 2; // Velocidad de movimiento

    app.stage.addChild(this); // Añadir el globo al escenario
    this.cargarSpriteAnimado(); // Cargar el sprite animado
  }

  async cargarSpriteAnimado() {
    const globoTexture = await PIXI.Assets.load("./img/SpriteGlobo.webp");
    this.sprite = new PIXI.Sprite(globoTexture);

    // Configurar posición inicial
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.anchor.set(0.5, 0.5);

    // Añadir el sprite animado al escenario
    this.app.stage.addChild(this.sprite);
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
    }
    else{
        if(this.currentCheckpoint + 1 < this.checkpoints.length){
            this.currentCheckpoint++;
        }
        else{
            return("Mov finalizado");
        }
    }
}

  update(time) {
    this.moveToCheckpoint();
  }

  takeDamage(amount) {
    // Reducir la vida del globo
    this.life -= amount;
    if (this.life <= 0) {
      // El globo muere, se elimina del escenario
      this.app.stage.removeChild(this);
    }
  }
}
