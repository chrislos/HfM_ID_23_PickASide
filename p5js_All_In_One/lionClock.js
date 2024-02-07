let soundCollection = [];

let index; // globaler index wert, mit dem wir die das memory array ansteuern
let txt = "zum starten klicken"; //text-feld, was oben in der mitte sitzt
let start = true; // wir brauchen in der mousePressed() Funktion eine Logik, die den ersten mouseklick abfragt um das spiel zu starten
let showImage = false;
let imgDrop;
let imgHammer;
let imgEar;
let soundSuccess;


function preload() {
  soundCollection[0] = [loadSound('assets/l/Laterne.wav'), 'Lion']; // number indicates the right image -> 0 = left, 1 = right
  soundCollection[1] = [loadSound('assets/l/Limonade.wav'),'Lion'];
  soundCollection[2] = [loadSound('assets/l/Lolli.wav'), 'Lion'];
  soundCollection[3] = [loadSound('assets/l/Luftballon.wav'), 'Lion'];
  soundCollection[4] = [loadSound('assets/r/Regen2.wav'), 'alarm clock'];
  soundCollection[5] = [loadSound('assets/r/Regenbogen.wav'), 'alarm clock'];
  soundCollection[6] = [loadSound('assets/r/Reifen.wav'), 'alarm clock'];
  soundCollection[7] = [loadSound('assets/r/Rucksack.wav'), 'alarm clock'];

  imgDrop = loadImage('assets/l/Lion.png');
  imgHammer = loadImage('assets/r/alarm clock.png');
  imgEar = loadImage('assets/Ohr.png');

  soundSuccess = loadSound('assets/WinSound.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(30);
}

function draw() {
  background(20, 0, 100);

  // wenn txt nicht false ist soll er gezeigt werden.
  if(txt){
    fill(100);
    textAlign(CENTER,CENTER);
    text(txt, width/2, height/4);
  }
  if(showImage == true) {
    image(imgEar, width/2 - imgEar.width/8, 0, imgEar.width/4, imgEar.height/4)
    image(imgDrop, 0, height/2, width/2, height/2, 0, 0, imgDrop.width, imgDrop.height, CONTAIN);
    image(imgHammer, width/2, height/2, width/2, height/2, 0, 0, imgHammer.width, imgHammer.height, CONTAIN);
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed(){
  for (let i = 0; i < soundCollection.length; i++) {
    soundCollection[i][0].stop();
  }

  if(start){
    txt = false;
    showImage = true;
    index = int(random(soundCollection.length));
    soundCollection[index][0].play(); // the 0 is the sound file location for playing
    start = false;
  } else {
    let correctImage = soundCollection[index][1];
    if(mouseY > height/2) {
      // checkt die correct side
      if(mouseX <= width/2 && correctImage == 'Lion' || mouseX > width/2 && correctImage == 'alarm clock') {
        console.log("Richtig!");
        soundSuccess.play();
        soundCollection.splice(index, 1);
        if(soundCollection.length > 0) {
          index = int(random(soundCollection.length));
          soundCollection[index][0].play();
        }
        else {
          // soundCollection is empty
          showImage = false;
          txt = "Ende"
       
          
        }
      }
      else {
        // wrong selection
        console.log('Leider falsch!');
      }
    }
    else {
      // click on ear
      soundCollection[index][0].play();
    }
  }
}