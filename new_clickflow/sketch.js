// Globale Variablen für Sounds, Bilderset und Spielzustand
let sounds = [];       // Hier werden alle Soundsets gespeichert.
let soundset = [];     // Aktuelles Soundset, das verwendet wird.
let images = [];       // Hier werden alle Bildersets gespeichert.

let level_index;       // Globaler Index zur Auswahl eines bestimmten Lautpaares.
let memory_index;      // Globaler Index für das aktuelle Element im Soundset.
let txt = "zum starten klicken"; // Starttext, der angezeigt wird.
let start = true;      // Flag, um den Start des Spiels zu steuern.
let showImage = false; // Flag, um zu steuern, ob Bilder angezeigt werden sollen.
let imgLeft;           // Bild für die linke Seite.
let imgRight;          // Bild für die rechte Seite.
let imgEar;            // Bild des Ohrs.
let soundCorrect;      // Sound, der bei Erfolg abgespielt wird.
let soundWrong;      // Sound, der bei Erfolg abgespielt wird.


function preload() {

  // das erste soundset (K/T) hinterlegen wir an der stelle 0 im array. 
  // das zweiten (B / P?) würde dann unter sounds[1] liegen.
  // analog wird dann hinter images[1] das entsprechene BP paar sitzen.
  // angesteuert werden die indices beider Arrays (Sound + Image) durch die level_index variable
  // dann gibt es nochmal explizit eine memory_index variable, die zufällig ein soundset innerhalb des Lautpaares raussucht.
 
 sounds[0] = [
    [loadSound('assets/Kopf.mp3'),1],  
    [loadSound('assets/Topf.wav'),0],
    [loadSound('assets/Tiger.wav'),0],
    [loadSound('assets/Tanne.wav'),0],
    [loadSound('assets/Kiste.mp3'),1]
  ];
  images[0] = [loadImage('assets/Lautsymbol1.png'),loadImage('assets/Lautsymbol2.png')]
  imgEar = loadImage('assets/Ohr.png');

  soundCorrect = loadSound('assets/correct.mp3');
  soundWrong = loadSound('assets/wrong.mp3');


}

function setup() {
 createCanvas(windowWidth, windowHeight);
 textSize(30);

 // welches Level wählen wir an? Aktuell gibt es nur level 0 (K & T)
 level_index = 0;

  // die zweite array stelle innerhalb eines soundsets 0 oder 1 gibt an, ob das lautpaar links oder rechts sitzt 
 soundset = sounds[level_index];
 

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
   image(imgLeft, 0, height/2, width/2, height/2, 0, 0, imgLeft.width, imgLeft.height, CONTAIN);
   image(imgRight, width/2, height/2, width/2, height/2, 0, 0, imgRight.width, imgRight.height, CONTAIN);
 }

}

function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  // Stoppt alle Sounds im aktuellen Soundset.
  // Dies verhindert, dass mehrere Sounds gleichzeitig abgespielt werden.
  for (let i = 0; i < soundset.length; i++) {
    soundset[i][0].stop();
  }

  // Wenn das Spiel gerade gestartet wurde (start == true),
  // dann wird dieser Block ausgeführt.
  if (start) {
    txt = false; // Entfernt den Starttext.
    showImage = true; // Aktiviert die Anzeige der Bilder.

    // Wählt ein zufälliges Element aus dem Soundset aus und spielt es ab.
    memory_index = int(random(soundset.length));
    soundset[memory_index][0].play();

    // Lädt die Bilder für die linke und rechte Seite.
    imgLeft = images[level_index][0];
    imgRight = images[level_index][1];

    // Protokolliert, welche Seite das korrekte Lautpaar hat (links oder rechts).
    console.log(soundset[memory_index][1]);

    start = false; // Setzt das Start-Flag auf false, da das Spiel nun läuft.
  } else {
    // Wenn das Spiel läuft und der Nutzer auf den unteren Bereich des Bildschirms klickt.
    if (mouseY > height / 2) {
      // Überprüft, ob der Klick auf der korrekten Seite erfolgte.
      // Ist der Klick auf der linken Seite und das Lautpaar ist links (0) oder
      // ist der Klick auf der rechten Seite und das Lautpaar ist rechts (1).
      if ((mouseX <= width / 2 && soundset[memory_index][1] == 0) || (mouseX > width / 2 && soundset[memory_index][1] == 1)) {
        console.log("Richtig!"); // Gibt eine Meldung aus, dass die Auswahl korrekt war.
        soundset.splice(memory_index, 1); // Entfernt das korrekte Element aus dem Soundset.
        soundCorrect.play();
        // Überprüft, ob noch Elemente im Soundset vorhanden sind.
        if (soundset.length > 0) {
          // Wenn ja, wählt es ein neues Element aus und spielt es ab.
          memory_index = int(random(soundset.length));
          soundset[memory_index][0].play();
        } else {
          // Wenn nicht, beendet es das Spiel und zeigt das Ende-Textfeld an.
          showImage = false;
          txt = "fertig";
        }
      } else {
        // Wenn die Auswahl falsch war, gibt es eine Meldung aus.
        console.log('Leider falsch!');
        soundWrong.play();
      }
    } else {
      // Wenn auf das Ohrbild geklickt wird, spielt es den aktuellen Sound nochmal ab.
      // Dies geschieht nur, wenn noch Elemente im Soundset vorhanden sind.
      if (soundset.length > 0) {
        soundset[memory_index][0].play();
      }
    }
  }
}
