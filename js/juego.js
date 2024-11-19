class Juego {
  constructor() {
    this.monos = [];
    this.checkpoints = [
      { x: 407, y: 425 },
      { x: 407, y: 514 },
      { x: 784, y: 514 },
      { x: 784, y: 290 },
      { x: 659, y: 290 },
      { x: 659, y: 428 },
      { x: 536, y: 428 },
      { x: 536, y: 212 },
      { x: 429, y: 212 },
      { x: 429, y: 312 },
      { x: 335, y: 312 },
      { x: 335, y: 212 },
      { x: 233, y: 212 },
      { x: 233, y: 312 },
      { x: 110, y: 312 },
      { x: 110, y: 90 },
      { x: 647, y: 90 },
      { x: 647, y: 170 },
      { x: 784, y: 170 },
      { x: 784, y: 0 },
    ];
    this.globos = []; //
    this.app = new PIXI.Application();
    this.contadorDeFrame = 0;
    this.ancho = 1000;
    this.alto = 637;
    this.mouse = { x: 0, y: 0 };
    this.teclado = {};
    this.jugador = new Jugador(this.app, this);

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

      this.ponerMonosIniciales();
    });
    this.ponerGlobo();
    this.ponerFondo();
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
      // this.backgroundSprite.tileScale.set(0.5);

      // Añadir el sprite al stage
      this.app.stage.addChild(this.backgroundSprite);
    };

    image.src = "./img/Fondo.png";
  }

  gameLoop(time) {
    this.time = time;

    this.contadorDeFrame++;

    for (let i = 0; i < this.monos.length; i++) {
      this.monos[i].update(time);
    }
    for (let i = 0; i < this.globos.length; i++) {
      this.globos[i].update(time);
    }
  }

  generarJugador(){
    // Crear un jugador con una posición inicial aleatoria
    this.jugador = new Jugador(this.app, this);
  }

  ponerMonosIniciales() {
    this.ponerMonoComun(1);
    this.ponerMonoSniper(1);
    this.ponerMonoBarco(1);
  }

  ponerMonoComun(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoComun(935, 198, this.app, i, this, false, true, false)
      );
    }
  }
  ponerMonoSniper(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoSniper(935, 315, this.app, i, this, false, true, false)
      );
    }
  }

  ponerMonoBarco(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoBarco(935, 450, this.app, i, this, false, true, false)
      );
    }
  }
  clonarMonoComun(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoComun(
          this.mouse.x,
          this.mouse.y,
          this.app,
          i,
          this,
          true,
          false,
          true
        )
      );
    }
  }
  clonarMonoBarco(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoBarco(
          this.mouse.x,
          this.mouse.y,
          this.app,
          i,
          this,
          true,
          false,
          true
        )
      );
    }
  }
  clonarMonoSniper(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoSniper(
          this.mouse.x,
          this.mouse.y,
          this.app,
          i,
          this,
          true,
          false,
          true
        )
      );
    }
  }

  ponerGlobo() {
    // Asegurarse de que la aplicación esté inicializada antes de crear el globo
    this.globos.push(new Globo(0, 425, this.app, this.checkpoints));
  }

  eliminarGlobo() {
    this.globos.shift();
  }
}

