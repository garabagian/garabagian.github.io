class prvTree {
  /**
   * Tree Data structures
   * Let's make nodes, a default tree, and a way to add components to the tree
   * Idea is to have a tree class and then be able to choose from a list of search algorithms
   * Or be able to visualize how to organize data in a tree
   */
  constructor(
    public x = 300,
    public y = 300,
    public vx = 1,
    public vy = 20,
    public radius = 40,
    public score = 0,
    public highScore = 0,
    private readonly color = 'blue'
  ) {}

  /**
   * Draws, colors, and fills a ball using the parameters given in the constructor
   * @param ctx the HTML Canvas's 2D rendering context
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    // Draws a ball
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();

    // Colors and fills the ball
    ctx.fillStyle = this.color;
    ctx.fill();

  }

  /**
   * Recalculates the trajectory of the ball when it bounces.
   *
   * @param canvasWidth width of the HTML Canvas
   * @param canvasHeight height of the HTML Canvas
   */
  bounce(canvasWidth: number, canvasHeight: number) {
    // Increments the ball's position using its velocity
    this.x += this.vx;
    this.y += this.vy;

    // Sets the new vertical velocity to (99% + 0.25) of the old vertical velocity
    this.vy *= 0.99;
    this.vy += 0.10;

    // If the ball would fly off the top of the screen in the next step, or if would sink below it...
    if (this.y + this.vy + this.radius> canvasHeight || this.y + this.vy + this.radius < 0) {
      // ...then reverse the direction of the ball's vertical velocity
      this.score = 0;
      this.vy = -this.vy;
    }

    // If the ball would fly off to the left or right of the screen in the next step...
    if (this.x + this.vx + this.radius > canvasWidth || this.x + this.vx - this.radius < 0) {
      // ...then reverse the direction of the ball's horizontal velocity
      this.vx = -this.vx;
    }
  }
}

class Node{
  constructor(
    public data = 0,
    public x = 200,
    public y = 200,
    private readonly radius = 25,
    private readonly color = 'red'
  ){}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    // Draws a ball
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();

    // Colors and fills the ball
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}

export class Tree {
  public ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  public canvasWidth: number; // width of the canvas
  public canvasHeight: number; // height of the canvas
  public ball = new prvTree(document.documentElement.clientWidth/2, document.documentElement.clientHeight/2); // create a new ball with x and y 50 and other properties default
  private readonly clicky = new Node();

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.canvas.addEventListener("mousedown", (ev) => this.handleMouseDown(ev, canvas, this.ball));
    //this.canvas.addEventListener("mousemove", (ev) => this.handleMouseMove(canvas, ev));
    window.requestAnimationFrame(() => this.draw()); // start the animation when the window is ready
  }

  handleMouseDown(ev: MouseEvent, canvas: HTMLCanvasElement, ball: prvTree){
    console.log(this);
    var rect = canvas.getBoundingClientRect();
    var x = ev.clientX-rect.left;
    var y = ev.clientY-rect.top;
    console.log(x + " , " + y);
    this.clicky.x = x;
    this.clicky.y = y;


    if(x>=ball.x-ball.radius && x<=ball.x+ball.radius && y>=ball.y-ball.radius && y<=ball.y+ball.radius){
      ball.vy -= 20;
      ball.score++;
      if(ball.score > ball.highScore){
        ball.highScore = ball.score;
      }
    }
  }

  handleMouseMove(canvas: HTMLCanvasElement, ev: MouseEvent){

  }

  /**
   * Draw step of the animation
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // erase the old ball
    this.ctx.font = "30px Comic Sans MS";
    this.ctx.fillText("Score: " + this.ball.score, 20, 40);
    this.ctx.font = "12px Comic Sans MS";
    this.ctx.fillText("High Score: " + this.ball.highScore, 24, 60);
    this.ball.draw(this.ctx); // draw the ball in the new position
    this.ball.bounce(this.canvasWidth, this.canvasHeight); // calculate the ball's new position



    window.requestAnimationFrame(() => this.draw()); // repeat the draw step when the window requests a frame
  }
}
