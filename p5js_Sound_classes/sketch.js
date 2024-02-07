let memory = [];
let left, right;
let index;
let txt = "zum starten klicken";
let sound_a, sound_b, sound_c;

function preload() {
  soundFormats('mp3', 'ogg');
  memory[0] = new SoundPair(loadSound('assets/a'), loadImage('assets/a_01.png'), loadImage('assets/a_02.png'));
  memory[1] = new SoundPair(loadSound('assets/b'), loadImage('assets/b_01.png'), loadImage('assets/b_02.png'));
  memory[2] = new SoundPair(loadSound('assets/c'), loadImage('assets/c_01.png'), loadImage('assets/c_02.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(30);
}

function draw() {
  background(220);


  // draw status text
  if(txt){
    fill(100);
    textAlign(CENTER,CENTER);
    text(txt, width/2, height/4);
  }
  
  // draw current pair
  if(left && right){
    image(left, 0, height/2, width/2, height/2, 0, 0, left.width, left.height, CONTAIN);
    image(right, width/2, height/2, width/2, height/2, 0, 0, right.width, right.height, CONTAIN);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let start = true; // ne need to make sure our inital mousePressed is in the right order..

function mousePressed(){

  // first thing we want to do: stop sound for all instances
  for (let i = 0; i < memory.length; i++) {
    memory[i].soundFile.stop();
  }

  if(start){ // first mousePressed
    txt = false; //remove textOutput by declaring variable to false
    index = int(random(memory.length)); //choose random index depending on array length 
    memory[index].shuffle(); //shuffle chosen Pairing
    left = memory[index].showLeftImage();  //overwrite left image to draw()
    right = memory[index].showRightImage(); //overwrite right image to draw()
    memory[index].soundFile.play(); //play current drawn soundfile

    start = false;
  } else {

    if(memory[index].checkMouse()){
      memory.splice(index, 1);
      console.log(memory);
    }

    if(memory.length > 0) {
      index = int(random(memory.length));
      memory[index].shuffle();
      left = memory[index].showLeftImage(); 
      right = memory[index].showRightImage(); 
      memory[index].soundFile.play();
      } else {
        left = 0;
        right = 0;
        txt = "YAY!";
      }
  }
}


class SoundPair {
  constructor(_soundFile, _image_01, _image_02){
    this.soundFile = _soundFile;
    this.image_01 = _image_01;
    this.image_02 = _image_02;
    this.winner = 0; //winner 0 = left, winner 1 = right;
  }

  playMe(){
    this.soundFile.play();
  }

  shuffle(){
    let rndm = random(0,1);
    if (rndm <= 0.5) rndm = 0;
    else rndm = 1;
    this.winner = rndm;
  }

  showLeftImage(){
    if (this.winner == 0) {
      return this.image_01;
    } else {
      return this.image_02;
    }
  }

  showRightImage(){
    if (this.winner == 0) {
      return this.image_02;
    } else {
      return this.image_01;
    }
  }

  checkMouse(){
    if(mouseX <= width/2 && this.winner == 0) {
      return true
    } else if (mouseX >= width/2 && this.winner == 1) {
      return true
    } else return false
  }
}
