/*-------------------------------------------------------------
PIXI JS
-------------------------------------------------------------*/
(function(){
'use strict';

    const canvasWidth = 800;
    const canvasHeight = 600;
    
    const app = new PIXI.Application({
        width: canvasWidth,
        height: canvasHeight,
        resolution: window.devicePixelRatio || 1
    });
    //
    document.getElementById('canvas').appendChild(app.view);
    
    let textFps = 'none'
    const fps = new PIXI.Text(textFps, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    fps.x = 10;
    fps.y = 10;
    app.stage.addChild(fps);

    
    /*-------------------------------------------------------------
    CLASS 
    -------------------------------------------------------------*/
    class Vector2d{
        constructor(x, y){
            this.x = x || 0;
            this.y = y || 0;
        }
        //
    }

    class Mover{
        constructor(){
            this.location = new Vector2d(canvasWidth/2, 25);
            
            this.radius = 15;
            
            //graphics
            this.graphics = new PIXI.Graphics();
            this.graphics.x = this.location.x;
            this.graphics.y = this.location.y;
            app.stage.addChild(this.graphics);
 
           
            console.log(`Id ${+Date.now()}`);
            console.log(`Position (x, y) = [${this.graphics.x},${this.graphics.y}]`);
        }
        //
        Update() {
            this.Edges();

           
           
        }
        //
        Edges(){
            if(this.location.x > canvasWidth){
                this.location.x = 0;
            }
            //
            if(this.location.x < 0){
                this.location.x = canvasWidth;
            }
            //
            if(this.location.y > canvasHeight){
                this.location.y = 0;
            }
            //
            if(this.location.y < 0){
                this.location.y = canvasHeight;
            }
        }
        //
        Draw(){
            // Circle + line style 1
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xFEEB77, 1);
            this.graphics.beginFill(0x650A5A, 1);
            this.graphics.drawCircle(this.location.x, this.location.y, this.radius);
            this.graphics.endFill();
        }

    }

    /*-------------------------------------------------------------
    OBJECT 
    -------------------------------------------------------------*/
    const boids = new Mover();

    
    /*-------------------------------------------------------------
    PIXI JS LOOP
    -------------------------------------------------------------*/
    app.ticker.add((delta)=>{
        textFps = `FPS ${delta.toFixed(2)}`;
        fps.text = textFps;
        //

        boids.Update();
        boids.Draw();

    
    });










})();    

