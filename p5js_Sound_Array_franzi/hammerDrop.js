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
  soundCollection[0] = [loadSound('assets/Kopf.mp3'), 'hammer']; // number indicates the right image -> 0 = left, 1 = right
  soundCollection[1] = [loadSound('assets/Topf.wav'),'drop'];
  soundCollection[2] = [loadSound('assets/Tiger.wav'), 'drop'];
  soundCollection[3] = [loadSound('assets/Tanne.wav'), 'drop'];
  soundCollection[4] = [loadSound('assets/Kiste.mp3'), 'hammer'];
  soundCollection[5] = [loadSound('assets/Tisch.wav'), 'drop'];
  soundCollection[6] = [loadSound('assets/Kommode.mp3'), 'hammer'];

  imgDrop = loadImage('assets/Lautsymbol1.png');
  imgHammer = loadImage('assets/Lautsymbol2.png');
  imgEar = loadImage('assets/Ohr.png');

  loadSound
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
      if(mouseX <= width/2 && correctImage == 'drop' || mouseX > width/2 && correctImage == 'hammer') {
        console.log("Richtig!");
        soundCollection.splice(index, 1);
        if(soundCollection.length > 0) {
          index = int(random(soundCollection.length));
          soundCollection[index][0].play();
        }
        else {
          // soundCollection is empty
          showImage = false;
          txt = "Ende"
          loadSound('assets/WinSound.mp3');
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