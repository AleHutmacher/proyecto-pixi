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
        this.rango = 20;
    
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

      

      
      dispararAlGloboMasCercano(){
        const globosCercanos = []
        for(let i = 0; i < this.juego.globos.length; i++){
          const globo = this.juego.globos[i];
          const distancia = Math.sqrt(Math.pow(globo.x - this.x, 2) + Math.pow(globo.y - this.y, 2));
          if(distancia < this.rango) globosCercanos.push(globo);
        }
      }

    
      update(time) {
        if (!this.listo) return;
    
        this.time = time;
      }
}