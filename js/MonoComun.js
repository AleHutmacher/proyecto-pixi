class MonoComun extends MonoBase {
    crearNuevoMono(event) {
        if (this.canClone) juego.clonarMonoComun(1);
        if (this.canDrag) this.canDrag = false;
      }

      async cargarSprite() {
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
          .on("pointerdown", this.crearNuevoMono.bind(this))
          this.app.stage.on("pointermove", this.onDragMove.bind(this));
    
        this.app.stage.addChild(this.sprite);
    
        this.listo = true;
      }

}