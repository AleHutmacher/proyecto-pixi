class Chaboncito {
  constructor(x, y, app, i, juego, dragging, clonable) {
    this.juego = juego;
    this.i = i;
    this.app = app;
    this.x = x;
    this.y = y;
    this.listo = false;
    this.dragging = dragging;
    this.clonable = clonable;

    this.offset = { x: 0, y: 0 };

    this.cargarSpriteAnimado();
  }

  async cargarSpriteAnimado() {
    const monoTexture = await PIXI.Assets.load("../assets/img/SpriteMono.png");
    this.sprite = new PIXI.Sprite(monoTexture);

    // Configurar posición inicial
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.sprite.anchor.set(0.5, 0.5);

    // Hacer interactivo el sprite
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    // Agregar eventos de interacción
    this.sprite
      .on("pointerdown", this.crearNuevoChavonsito.bind(this))
      .on("pointermove", this.onDragMove.bind(this));

    this.app.stage.addChild(this.sprite);

    this.listo = true;
  }

  crearNuevoChavonsito(event) {
    if (this.clonable) juego.clonarChaboncitos(1);
    if (this.dragging) this.dragging = false;
  }

  onDragMove(event) {
    if (this.dragging) {
      // Mover el sprite según la posición global del mouse
      const { x, y } = event.data.global;
      this.x = x - this.offset.x;
      this.y = y - this.offset.y + 15;

      // Actualizar la posición del sprite
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }

  update(time) {
    if (!this.listo) return;

    this.time = time;
  }
}
