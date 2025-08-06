let capture;
let posenet;
let singlePose;
let skeleton;

function setup() {
  let canvas = createCanvas(700, 530);
  canvas.parent('canvas-container');

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', receivedPoses);
}

function modelLoaded() {
  console.log("✅ PoseNet loaded successfully");
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  image(capture, 0, 0, width, height);

  if (singlePose) {
    // 🔴 Glowing Keypoints
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let { x, y } = singlePose.keypoints[i].position;
      noStroke();
      fill(255, 0, 0, 200);
      ellipse(x, y, 12);

      // Glow ring
      stroke(255, 0, 0, 100);
      strokeWeight(6);
      noFill();
      ellipse(x, y, 20);
    }

    // 🟢 Smooth Skeleton
    for (let i = 0; i < skeleton.length; i++) {
      let partA = skeleton[i][0];
      let partB = skeleton[i][1];
      stroke(0, 255, 0, 150); // Slight transparency
      strokeWeight(3);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
