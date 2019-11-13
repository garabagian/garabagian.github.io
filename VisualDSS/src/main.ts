import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Tree } from './structures/tree'
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  function main() {
    var treeCanvas = <HTMLCanvasElement>document.getElementById('tree');
    treeCanvas.width = document.documentElement.clientWidth;
    treeCanvas.height = document.documentElement.clientHeight;
    var check = new Tree(treeCanvas);
    window.addEventListener("resize", (e: Event) => {
      treeCanvas.width = document.documentElement.clientWidth;
      treeCanvas.height = document.documentElement.clientHeight;
      console.log(treeCanvas.width + " , " + treeCanvas.height);
      if(check.ball.y+check.ball.radius>=treeCanvas.height){
        check.ball.y=treeCanvas.height-check.ball.radius;
      }
      if(check.ball.x+check.ball.radius>=treeCanvas.width){
        check.ball.x=treeCanvas.width-check.ball.radius;
      }
    }, false);



  }
  main();
