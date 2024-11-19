class Juego {
  constructor() {
    this.monos = [];
    this.obstaculos = []; //
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

      this.ponerMonosIniciales();
    });

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

    image.src = "../assets/img/Fondo.png";
  }

  gameLoop(time) {
    this.time = time;

    this.contadorDeFrame++;

    for (let i = 0; i < this.monos.length; i++) {
      this.monos[i].update(time);
    }
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
      );}
  }
  ponerMonoSniper(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.monos.push(
        new MonoSniper(935, 315, this.app, i, this, false, true, false)
      );}
  }

  ponerMonoBarco(cantidad) {
    for (let i = 0; i < cantidad; i++) {
    this.monos.push(
      new MonoBarco(935, 450, this.app, i, this, false, true, false)
    );}
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
          true,
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
          true,
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
          true,
        )
      );
    }
  }
}
