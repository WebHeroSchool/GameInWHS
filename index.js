const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const root = document.getElementById('root');
root.appendChild(canvas);


class Background {
  draw() {
    ctx.fillStyle = '#92ADD0';
    ctx.fillRect(
        0,
        0,
        canvas.width,
        275,
    )
    ctx.fillStyle = '#24913C';
    ctx.fillRect(
        0,
        275,
        canvas.width,
       100,
    )

  }

}

class Hero {
  constructor () {
    this.jumping = false;
    this.jumpingHeight = 0;
    this.jumpingDown = 0;
    document.addEventListener(
        'touchstart',
        this.handleTouch,
  );
  }

  handleTouch = event => {
          this.jumping = true
    };

  draw() {
    ctx.fillStyle = 'white';

    if (this.jumping) {
      this.jumpingHeight +=10;
      if (this.jumpingHeight == 200) {
        this.jumpingDown -=10;
        this.jumping = false;
      }
    }

    ctx.fillRect(
        50,
        225-this.jumpingHeight+this.jumpingDown,
        50,
        50,
    );

  }
}
  class Barrier {
  draw(timer) {
    ctx.fillStyle = '#A61000';
    ctx.fillRect(
        500 - timer,
        195,
        30,
        80,
    )
  }
}

class App {
  constructor() {
    this.background = new Background();
    this.hero = new Hero();
    this.barrier = new Barrier();
    this.timer = 0;
  }

  draw() {
    this.background.draw();
    this.hero.draw();
    this.barrier.draw(this.timer);
  }

  step() {
    this.timer += 1;
    this.draw();

    requestAnimationFrame(() => this.step());
  }


}

const app = new App();
app.draw();
requestAnimationFrame(() => app.step());