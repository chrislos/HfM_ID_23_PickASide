// Globale Variablen für Sounds, Bilderset und Spielzustand
let sounds = [];       // Hier werden alle Soundsets gespeichert.
let soundset = [];     // Aktuelles Soundset, das verwendet wird.
let images = [];       // Hier werden alle Bildersets gespeichert.

let kt, rl, schs;     // Lautpaare

let wp_index;          // Globaler Index zur Auswahl eines bestimmten Lautpaares.
let memory_index;      // Globaler Index für das aktuelle Element im Soundset.


let start = true;      // Flag, um den Start des Spiels zu steuern.
let showImage = false; // Flag, um zu steuern, ob Bilder angezeigt werden sollen.
let imgLeft;           // Bild für die linke Seite.
let imgRight;          // Bild für die rechte Seite.
let imgEar;            // Bild des Ohrs.
let soundCorrect;      // Sound, der bei Erfolg abgespielt wird.
let soundWrong;        // Sound, der bei Erfolg abgespielt wird.
let soundWinning;        // Sound, der bei erfolgreichem Levelabschluss abgespielt wird.


function preload() {

  // das erste soundset (K/T) hinterlegen wir an der stelle 0 im array. 
  // das zweiten (B / P?) würde dann unter sounds[1] liegen.
  // analog wird dann hinter images[1] das entsprechene BP paar sitzen.
  // angesteuert werden die indices beider Arrays (Sound + Image) durch die wp_index variable
  // dann gibt es nochmal explizit eine memory_index variable, die zufällig ein soundset innerhalb des Lautpaares raussucht.
 
 sounds[0] = [
    [loadSound('assets/Kopf.mp3'),1], 
    [loadSound('assets/Kiste.mp3'),1], 
    [loadSound('assets/Topf.wav'),0],
    [loadSound('assets/Tiger.wav'),0],
    [loadSound('assets/Tanne.wav'),0]
  ];
  sounds[1] = [
    [loadSound('assets/Regen2.wav'),0],  
    [loadSound('assets/Regenbogen.wav'),0],
    [loadSound('assets/Reifen.wav'),0],
    [loadSound('assets/Rucksack.wav'),0],
    [loadSound('assets/Laterne.wav'),1],
    [loadSound('assets/Limonade.wav'),1],  
    [loadSound('assets/Lolli.wav'),1],
    [loadSound('assets/Luftballon.wav'),1]
  ];
  sounds[2] = [
    [loadSound('assets/Sand.wav'),0],
    [loadSound('assets/Seil.wav'),0],
    [loadSound('assets/Sofa.wav'),0],
    [loadSound('assets/Sonne.wav'),0],
    [loadSound('assets/Schal.wav'),1],  
    [loadSound('assets/Schirm.wav'),1],
    [loadSound('assets/Schokolade.wav'),1],
    [loadSound('assets/Schrank.wav'),1]
  ]
  images[0] = [loadImage('assets/Lautsymbol1.png'),loadImage('assets/Lautsymbol2.png')]
  images[1] = [loadImage('assets/alarmclock.png'),loadImage('assets/Lion.png')]
  images[2] = [loadImage('assets/Snake.png'),loadImage('assets/Zug.png')]
  
  imgEar = loadImage('assets/Ohr.png');

  soundCorrect = loadSound('assets/WinSound.mp3');
  soundWrong = loadSound('assets/WrongAnswer.mp3');
  soundWinning = loadSound('assets/WinningLevel.mp3');

  //lautpaare für den Startscreen
  kt = loadImage('assets/kt.png');
  rl = loadImage('assets/rl.png');
  schs = loadImage('assets/schs.png');

}

function setup() {
 createCanvas(windowWidth, windowHeight);
 textSize(30);
}

function draw() {
 background(200, 200, 220);

 if(showImage == true) {
   image(imgEar, width/2 - imgEar.width/8, 0, imgEar.width/4, imgEar.height/4)
   image(imgLeft, 0, height/2, width/2, height/2, 0, 0, imgLeft.width, imgLeft.height, CONTAIN);
   image(imgRight, width/2, height/2, width/2, height/2, 0, 0, imgRight.width, imgRight.height, CONTAIN);
 }


 if(start == true) {
  //let yOffset = height * 0.01;
  // hier definieren wir unseren startscreen, der aus einem grid dreier paare besteht.
  

  // funky bewegung der bilder und schatten in abhängigkeit mit dem frameCount
  // eine zahl die die draw loops hochzäht, sobald das programm startet.... 
  // geht also immer weiter hoch, je länger das programm läuft
  // das ist unser t... wenn wir daraus den sin() nehmen bekommen wir eine oscillation
  // siehe einheitskreis ... schwiungung
  let t = frameCount;
  let t2 = frameCount+50;
  let t3 = frameCount+100;

  let x = 6 * sin(t * 0.026);
  let x2 = 6 * sin(t2 * 0.02);
  let x3 = 6 * sin(t3 * 0.023);
  
  noStroke();
  fill(0,100);

  let sOffset = 15; // shadowoffset
  //shadow
  rect(width/2 - kt.width/10+x2+sOffset, height*0.1+sOffset, kt.width/5, kt.height/5);
  // image
  image(kt, width/2 - kt.width/10+x, height*0.1, kt.width/5, kt.height/5);

  //shadow
  rect(width/2 - rl.width/10+x3+sOffset, height*0.4+sOffset, rl.width/5, rl.height/5);
  image(rl, width/2 - rl.width/10+x2, height*0.4, rl.width/5, rl.height/5);
  
  //shadow
  rect(width/2 - schs.width/10+x2+sOffset, height*0.7+sOffset, schs.width/5, schs.height/5); 
  image(schs, width/2 - schs.width/10+x3, height*0.7, schs.width/5, schs.height/5);
 }

}

function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
}


// smartphone-click
function touchStarted() {
  // Handle touch event
  klick();
  return false; // This prevents default behavior for touch events
}


// pc-click
function mousePressed() {
  // Handle mouse click event
  klick();
  return false; // This prevents default behavior for mouse events
}

function klick() {
// Stoppt alle Sounds im aktuellen Soundset.
  // Dies verhindert, dass mehrere Sounds gleichzeitig abgespielt werden.
  for (let i = 0; i < soundset.length; i++) {
    soundset[i][0].stop();
  }

  // console.log("mousePressed called, start is", start);
  // Wenn das Spiel gerade gestartet wurde (start == true),
  // dann wird dieser Block ausgeführt.


  if (start) {
    showImage = false;
    // console.log("here start should be initally true. so first click should be here", start);
  

    // schritt 1: wir checken welches der drei höhenareale geklickt wurde und definieren damit unser Lautpaar:
    // ist mouseY im ersten drittel (also kleienr als 0.33*height) dann ist das level 0;
    // umgekehrt ist mouseY beim klicken größer als 66% der Screenhöhe dann ist das Level 2;
    // bei allen anderen sind wir in der Mitte, also Level 1 im Array.

    if (mouseY <= height*0.33) {
      wp_index = 0; 
    } else if (mouseY >= height * 0.66){
      wp_index = 2;
    } else {
      wp_index = 1;
    }

    // console.log("sounds_should always have the same length ", sounds[0].length);
    // ich muss das Array auf soundset kopieren und nicht einfach zuweisen daher die ... (suche nach spread operator)

    soundset = [...sounds[wp_index]];
    //  console.log("sset_start: ", soundset.length);  
    

    showImage = true; // Aktiviert die Anzeige der Bilder.

    // Wählt ein zufälliges Element aus dem Soundset aus und spielt es ab.
    memory_index = int(random(soundset.length));
    if (soundset.length > 0){
    soundset[memory_index][0].play();
    }

    // Lädt die Bilder für die linke und rechte Seite.
    imgLeft = images[wp_index][0];
    imgRight = images[wp_index][1];

  
    start = false; // Setzt das Start-Flag auf false, da das Spiel nun läuft.
  } else if (start == false){
    // console.log("here start should be false. This shouldn't be excecutet on first click", start);
    // console.log("sset_game: ", soundset.length);
    // Wenn das Spiel läuft und der Nutzer auf den unteren Bereich des Bildschirms klickt.
    if (mouseY > height / 2) {
      // Überprüft, ob der Klick auf der korrekten Seite erfolgte.
      // Ist der Klick auf der linken Seite und das korrekte Lautsymbol ist links (0) oder
      // ist der Klick auf der rechten Seite und das korrekte Lautsymbol ist rechts (1).
      if ((mouseX <= width / 2 && soundset[memory_index][1] == 0) || (mouseX > width / 2 && soundset[memory_index][1] == 1)) {
        console.log("Richtig!"); // Gibt eine Meldung aus, dass die Auswahl korrekt war.
        soundset.splice(memory_index, 1); // Entfernt das korrekte Element aus dem Soundset.
        soundCorrect.play();
        // Überprüft, ob noch Elemente im Soundset vorhanden sind.
        if (soundset.length > 0) {
          // Wenn ja, wählt es ein neues Element aus und spielt es ab.
          // Wir nutzen setTimeout um den folgenden Sound aus Soundset um 1 Sekunde zu delayen.

          // Define the delay duration in milliseconds (e.g., 1000 for 1 second)
          const delayDuration = 1000;

          // Use setTimeout to schedule the next sound after the delay
          setTimeout(function() {
            memory_index = int(random(soundset.length));
            soundset[memory_index][0].play();
            }, delayDuration);
        } else {
          // Wenn nicht, beendet es das Spiel und zeigt das Ende-Textfeld an.
          showImage = false;
          start = true;
          soundWinning.play();
          return
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