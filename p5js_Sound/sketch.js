let memory = [];

let sound_a, sound_b, sound_c;

let img_01, img_02;

function preload() {
  soundFormats('mp3', 'ogg');

  memory[0] = [loadSound('assets/a'),loadImage('assets/a_01.png'),loadImage('assets/a_02.png'),1,0];
  memory[1] = [loadSound('assets/b'),loadImage('assets/b_01.png'),loadImage('assets/b_02.png'),0,0];
  memory[2] = [loadSound('assets/c'),loadImage('assets/c_01.png'),loadImage('assets/c_02.png'),1,0];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(200);

  img_01 = memory[1][1];
  img_02 = memory[1][2];
}
let zufall = 0;


function draw() {
  background(220);
  fill(100);

  textAlign(CENTER,CENTER);
  text(zufall, width/2, height/4);


  //console.log("x " + mouseX  +" / y " +mouseY);

  if (mouseX >= width/2 && mouseX <= width*0.33+width/2 ){
    if (mouseY >= height/2 && mouseY <= height*0.1+height/2 ){
      fill(0,0,255);
      if(mouseIsPressed){

        fill(220,20,30);
        console.log("rot!")

      }
    }
  }
  
  
  image(img_01, 0, 0, width, height, 0, 0, img_01.width, img_01.height, CONTAIN);
    

  rect(width /2, height/2, width*0.33, height*0.1);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed(){
  

  if (mouseX >= width/2 && mouseX <= width*0.33+width/2 ){
    if (mouseY >= height/2 && mouseY <= height*0.1+height/2 ){
 
        zufall = int(random(0,9));
        for (let i = 0; i< memory.length; i++){
          memory[i][0].stop();

       
          console.log(zufall)
        }
        memory[0][0].play();
        img_01 = memory[0][1];
        img_02 = memory[0][2];
    
    }
  }


}


function mouseReleased(){


}
