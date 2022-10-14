/*-------------------------------------------------------------
PIXI JS
-------------------------------------------------------------*/
(function(){
'use strict';

    const canvasWidth = 600;
    const canvasHeight = 400;
    
    const app = new PIXI.Application({
        width: canvasWidth,
        height: canvasHeight,
        resolution: window.devicePixelRatio || 1
    });
    //
    document.body.appendChild(app.view);
    
    let textFps = 'none'
    const fps = new PIXI.Text(textFps, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    fps.x = 10;
    fps.y = 10;
    app.stage.addChild(fps);
    
    /*-------------------------------------------------------------
    UTILS 
    -------------------------------------------------------------*/
    function random(min, max) {
      if (typeof max !== undefined) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }else{
        return Math.floor(Math.random() * min) + 1;
      }
    }
        
    /*-------------------------------------------------------------
    CLASS 
    -------------------------------------------------------------*/
    class Vector2d{
        constructor(x, y){
            this.x = x || 0;
            this.y = y || 0;
        }
        //
        add(v){            
            this.x += v.x;
            this.y += v.y;
        }
        //
        sub(v){
            this.x -= v.x;
            this.y -= v.y;
        }
        //
        mult(n){
            this.x *= n;
            this.y *= n;
        }
        //
        div(n){
            this.x /= n;
            this.y /= n;
        }
        //
        magSq(){
            let x = this.x;
            let y = this.y;
            return (x * x) + (y * y)
        }
        //
        mag(){
            return Math.sqrt(this.magSq);
        }
        //
        normalize(){
            let n = this.mag();
            if(n != 0){
                this.div(n);
            }
        }
        //
        copy(){
            return new Vector2d(this.x, this.y);
        }
        //
        dist(v){
            let d = v.copy().sub(new Vector2d(this.x, this.y));
            return d.mag();
        }
        //
        limit(scale){
            let mSq = this.magSq();
            if(mSq > (scale * scale)){
                this.div(Math.sqrt(mSq));
                this.mult(scale);
            }
        }
        dot(v){
            return ((this.x * v.x) + (this.y * v.y));
        }
        //
        static random2D(){
            let x = (Math.random() * canvasWidth);
            let y = (Math.random() * canvasHeight);
            return new Vector2d(x, y);
        }


    }

    class Mover{
        constructor(){
            this.id = 'id-' + Math.random().toString(16).slice(2);
            this.radius = 10;
           
            let x = random(this.radius, (canvasWidth - this.radius));
            let y = random(this.radius, (canvasHeight - this.radius));

            this.location = new Vector2d(x, y);
            this.velocity = new Vector2d(0, 0);

            let ax = Math.floor(Math.random() * 2) - 2;
            let ay = Math.floor(Math.random() * 2) - 2;
            
            this.acceleration = new Vector2d(ax, ay);

            this.xv = 1;
            this.yv = 3.3;
            
            //graphics
            this.graphics = new PIXI.Graphics();
            app.stage.addChild(this.graphics);
            
            console.log(`Id ${this.id}`);
                      
        }
        //
        Update() {     
            this.velocity.add(this.acceleration); 
            this.velocity.limit(3);           
            this.location.add(this.velocity);     
            //
            this.Bouncing();
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
        Bouncing(){
            if((this.location.x > canvasWidth - this.radius)||(this.location.x < this.radius)){
                this.velocity.x *= -1;
            }
            //
            if((this.location.y > canvasHeight - this.radius) || (this.location.y < this.radius)){
                this.velocity.y *= -1;
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
    
    const BOIDS = new Array();
    const COUNT_ELEMENT = 10;

    for (let i = 0; i < COUNT_ELEMENT; i++) {
        BOIDS.push(new Mover());        
    }

    
    /*-------------------------------------------------------------
    PIXI JS LOOP
    -------------------------------------------------------------*/
    app.ticker.add((delta)=>{
        textFps = `FPS ${delta.toFixed(2)}`;
        fps.text = textFps;
                      
        //
        BOIDS.forEach((m)=>{
            m.Update();
            m.Draw();
        });

    
    });










})();    

