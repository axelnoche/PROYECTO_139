img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('dog_cat.jpg');

}

function setup () {
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide()
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function draw() {
  image(video, 0, 0, 640, 420);

  if(status != "")
  {
    r = random(255)
    g = random(255)
    b = random(255)
    objectDetector.detec(video, gotResult);
    for(i = 0;i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Estado: objeto detectado";
        document.getElementById("number_of_objects").innerHTML = "Número de Objetos Detectado"+object.length;
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(object[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[1].width, objects[i].height);
    }
  }
}

function modelLoaded() {
    console.log("Modelo cargado");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult (error, results) {
if (error) {
    console.log(error);
}
console.log(results);
object = results;
}