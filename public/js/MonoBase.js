class MonoBase {
    constructor(x, y, app, i, juego, canDrag, canClone, canAttack, cannAttack) {
        this.juego = juego;
        this.i = i;
        this.app = app;
        this.x = x;
        this.y = y;
        this.listo = false;
        this.canDrag = canDrag;
        this.canClone = canClone;
        this.canAttack = canAttack;
    
        this.offset = { x: 0, y: 0 };
    
        this.cargarSprite();
        this.eventosGlobales();
      }
    
      eventosGlobales() {
        this.app.stage.interactive = true;
      }
    
      onDragMove(event) {
        if (this.canDrag) {
          // Mover el sprite según la posición global del mouse
          const { x, y } = event.data.global;
          this.x = x - this.offset.x;
          this.y = y - this.offset.y;
    
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