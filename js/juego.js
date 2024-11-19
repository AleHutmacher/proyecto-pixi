class Juego {
  constructor() {
    this.checkpoints = [
      { x: 1000, y: 100 },
      { x: 200, y: 2000 },
    ];
    this.chaboncitos = [];
    this.globos = []; //
    this.app = new PIXI.Application();
    this.contadorDeFrame = 0;
    this.ancho = 1000;
    this.alto = 637;
    this.mouse = { x: 0, y: 0 };
    this.teclado = {};

    let promesa = this.app.init({
      width: this.ancho,
      height: this.alto,
      backgroundColor: 0xffffff,
      backgroundOpacity: 0,
    });

    promesa.then((e) => {
      document.body.appendChild(this.app.canvas);
      window.__PIXI_APP__ = this.app;
      this.app.ticker.add(() => {
        this.gameLoop();
      });

      this.app.canvas.onmousemove = (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      };

      window.onkeydown = (e) => {
        this.teclado[e.key] = true;
      };

      window.onkeyup = (e) => {
        delete this.teclado[e.key];
      };

      // Llamar a ponerGlobo solo después de que PIXI haya sido inicializado
      this.ponerGlobo();

      this.ponerFondo();
      this.ponerChaboncitos(1); // Este ya está dentro del 'then', así que se ejecutará después de la inicialización
    });
  }

  ponerFondo() {
    // Crear un patrón a partir de una imagen
    const image = new Image();

    image.onload = () => {
      // create a texture source
      const source = new PIXI.ImageSource({
        resource: image,
      });

      // create a texture
      const texture = new PIXI.Texture({
        source,
      });

      // Crear un sprite con la textura del patrón
      this.backgroundSprite = new PIXI.TilingSprite(texture, 5000, 5000);

      // Añadir el sprite al stage
      this.app.stage.addChild(this.backgroundSprite);
    };

    image.src = "./img/Fondo.png";
  }

  gameLoop(time) {
    this.time = time;
    this.contadorDeFrame++;

    for (let i = 0; i < this.chaboncitos.length; i++) {
      this.chaboncitos[i].update(time);
    }
    for (let i = 0; i < this.globos.length; i++) {
      this.globos[i].update(time);
    }
  }

  ponerChaboncitos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.chaboncitos.push(
        new Chaboncito(935, 198, this.app, i, this, false, true)
      );
    }
  }

  clonarChaboncitos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.chaboncitos.push(
        new Chaboncito(
          this.mouse.x,
          this.mouse.y,
          this.app,
          i,
          this,
          true,
          false
        )
      );
    }
  }

  ponerGlobo() {
    // Asegurarse de que la aplicación esté inicializada antes de crear el globo
    this.globos.push(new Globo(400, 200, this.app, this.checkpoints));
  }
}
