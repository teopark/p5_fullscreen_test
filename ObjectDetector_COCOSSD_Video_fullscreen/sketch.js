let video;
let detector;
let detections;

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  detector = ml5.objectDetector('cocossd', modelReady);
  textSize(28);
}


function modelReady() {
  console.log('model loaded')
  detect();
}

function detect() {
  detector.detect(video, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.log(err);
    return
  }
  detections = results;
  detect();
}

function draw() {
  // image(video, 0, 0, width, height);
  background(255);
  if (detections) {
    detections.forEach(detection => {

      noFill();
      strokeWeight(5);
      if (detection.label === 'person') {
        stroke(0, 255, 0);
        // fill(100, 255, 100);

      } else {
        stroke(0, 0, 255);
        // fill(100, 100, 205);
      }
      // rect(detection.x, detection.y, detection.width, detection.height);
      rect(windowWidth * detection.normalized.x, windowHeight * detection.normalized.y, windowWidth * detection.normalized.width, windowHeight * detection.normalized.height);
      noStroke();
      fill(0);
      strokeWeight(2);
      text(detection.label, windowWidth * detection.normalized.x + 4, windowHeight * detection.normalized.y + 20)

      // console.log(detection.normalized.x);
    })
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("changed");
}
  
function mouseReleased(){
  
}