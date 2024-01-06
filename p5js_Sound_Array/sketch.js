let memory = [];

// 
    /* 
       Die erste Stelle des Arrays entspricht dem Soundfile.
       Grundsätzlich ist es so, dass an der zweiten Stelle jedes Memory-Array-Eintrags das korrekte Bild sitzt 
       und an der 3. das falsche. 
       An der vierten Stelle hinterlegen wir "versteckt" wo wir unseren korrektes Bild später hinterlegen werden.
       0 wäre links, 1 wäre rechts.

       memory[sound, image_01, image_02, winner]
       stelle   1        2         3        4
       index    0        1         2        3

    */


let left, right; //das sind unsere Platzhalter für die Bilder, die wir links und rechts unten platzieren
let index; // globaler index wert, mit dem wir die das memory array ansteuern
let txt = "zum starten klicken"; //text-feld, was oben in der mitte sitzt
let start = true; // wir brauchen in der mousePressed() Funktion eine Logik, die den ersten mouseklick abfragt um das spiel zu starten


function preload() {
  soundFormats('mp3');
  memory[0] = [loadSound('assets/a'), loadImage('assets/a_01.png'), loadImage('assets/a_02.png'),0];
  memory[1] = [loadSound('assets/b'), loadImage('assets/b_01.png'), loadImage('assets/b_02.png'),0];
  memory[2] = [loadSound('assets/c'), loadImage('assets/c_01.png'), loadImage('assets/c_02.png'),0];
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(30);
}

function draw() {
  background(220);

  // wenn txt nicht false ist soll er gezeigt werden.
  if(txt){
    fill(100);
    textAlign(CENTER,CENTER);
    text(txt, width/2, height/4);
  }
  
  // Wenn die variable left & right nicht false sind, sollen sie gezeichnet werden
  if(left && right){
    image(left, 0, height/2, width/2, height/2, 0, 0, left.width, left.height, CONTAIN);
    image(right, width/2, height/2, width/2, height/2, 0, 0, right.width, right.height, CONTAIN);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed(){

  // first thing we want to do: stop sound for all instances
  for (let i = 0; i < memory.length; i++) {
    memory[i][0].stop();
  }

  if(start){ // first mousePressed
    txt = false; //remove textOutput by declaring variable to false


    /*
    Alles was innerhalb  if (start) passiert ist unsere erste "Spielrunde",
    wir werden uns gleich zufällig ienen Eintrag aus memory auswählen und diese dann zufällig links und rechts
    platzieren. Gleichzeitig wissen wir aber natürlich ob das match links oder rechts sitzt
    */
   

    // 01. Wähle zufällig aus unserer Array Länge ( in diesem fall 3 Einträge) einen index aus (0 , 1 oder 2)
    index = int(random(memory.length));  

    /* 
       Grundsätzlich ist es so, dass an der 2. Stelle jedes 
       Memory-Array eintrags das korrekte Bild sitzt und an der 3. das falsche. 
       An der vierten Stelle hinterlegen wir "versteckt" wo wir unseren korrektes Bild später hinterlegen werden.
       0 wäre links, 1 wäre rechts.
    */

    // hier wuerfeln wir eine Zahl (0 oder 1) und hinterlegen die in unserem "winner" feld im Array an der vierten Stelle.
    memory[index][3] = wuerfeln(); //shuffle chosen Pairing
 
    // wenn das winner feld = 0 ist, bedeutet das, dass wir links das match links platziert wird. ansonsten wird es rechts platzuert
    if (memory[index][3] == 0) {
      left = memory[index][1]; 
      right = memory[index][2]; 
    } else {
      left = memory[index][2]; 
      right = memory[index][1];  
    }
 
    // in jedem fall wird das im Feld 1 hinterlegte soundfile abgespielt
    memory[index][0].play(); //play current drawn soundfile

    //hiermit sage ich, dass die (start) condition damit beendet ist und nicht mehr aufgerufen werden kann
    start = false;
  } else {

    // die else|{ } wird dann ab dem zweiten klick aktiv.

    // hier fragen wir unmittelbar ob entweder ein linkes oder rechtes match getroffen wurde.
    // dies ist in abhängigkeit davone, ob unser  winnerfeld links oder rechts liegt (0 oder 1)
    // und ob entsprechen die richtige width/2 seite geklickt wurde.
    if(mouseX <= width/2 && memory[index][3] == 0 || mouseX >= width/2 && memory[index][3] == 1){
      // wenn ein match getroffen wurde soll dieser array eintrag aus memory gelöscht werden.
      // damit wird er wie bei einem vokabeltrainer bei den folgenden zufällig gewählten pairs nicht mehr gewählt-
      memory.splice(index, 1);
    } 

    // wir fragen hier zunächst ob memory mindestens einen 1 trag hat. Ansonsten würde es bedeuten dass wir bereits
    // alle einträge aus dem Array durch matches rausgenommen haben.

    if(memory.length > 0) {

      // wenn wir sichergestellt haben, dass Einträge vorhanden sind
      // wuerfeln wir uns wieder eine neue Stelle, an die die korrekten und nicht-korrekten Bilder platziert werden sollen
      index = int(random(memory.length));
      memory[index][3] = wuerfeln();


      // wenn das winner feld = 0 ist, bedeutet das, dass wir links das match links platziert wird. ansonsten wird es rechts platzuert
      if (memory[index][3] == 0) {
        left = memory[index][1]; 
        right = memory[index][2]; 
      } else {
        left = memory[index][2]; 
        right =memory[index][1];  
      }
      
      // jetzt soll noch das audiofile gespielt werden
      memory[index][0].play();
      } else {
        // wenn das memory array keine Stellen mehr hat (memory.length > 0) dann bedeutet das, das wir 
        // alle Array-Items richtig geklickt haben und damit fertg sind mit dem Spiel.

        // wir setzen left & right auf false, dann werden sie in draw() nicht mehr berücksichtigt
        left = false;
        right = false;
        txt = "FINITO!";
      }
  }
}

function wuerfeln(){
  let rndm = random(0,1);
  if (rndm <= 0.5) rndm = 0;
  else rndm = 1;
  return rndm;
}