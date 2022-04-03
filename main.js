songHappier = "";
songHappierStatus = "";
songBeKind = "";
songBeKindStatus = "";
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;

function preload() {
    songHappier = loadSound("Happier.mp3");
    songBeKind = loadSound("BeKind.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded Successfully");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("%cLeft Wrist X: " + leftWristX + "; Left Wrist Y: " + leftWristY, "color: hsl(197, 90%, 50%); font-weight: bold;");

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("%cLeft Wrist Score: " + leftWristScore, "color: red; font-weight: bold;");

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("%cRight Wrist X: " + rightWristX + "; Right Wrist Y: " + rightWristY, "color: lime; font-weight: bold;");

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("%cRight Wrist Score: " + rightWristScore, "color: orange; font-weight: bold;");
    }
}

function draw() {
    image(video, 0, 0, 600, 450);

    stroke("darkred");
    fill("red");
    songHappierStatus = songHappier.isPlaying();
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 30);
        songBeKind.stop(); // I wrote this code so if the user places their same arm in front of the webcam the song won't restart
        if (songHappierStatus == false) {
            songHappier.play();
            songHappier.setVolume(.1); // if there is full volume, the song is way too loud
            document.getElementById("songLabel").innerHTML = "Song Name: Happier";
            console.log("%cPlaying: Happier", "color: gold; font-weight: bold;")
            // the song has a bit of delay at the beginning so wait for a few seconds :)
        }
    }

    stroke("darkblue");
    fill("blue");
    songBeKindStatus = songBeKind.isPlaying();
    if (rightWristScore > 0.2) {
        console.log()
        circle(rightWristX, rightWristY, 30);
        songHappier.stop(); // Same thing as above but vice-versa
        if (songBeKindStatus == false) {
            songBeKind.play();
            songBeKind.setVolume(.1); // same as above :)
            document.getElementById("songLabel").innerHTML = "Song Name: Be Kind";
            console.log("%cPlaying: Be Kind", "color: gold; font-weight: bold;")
            // same as above :)
        }
    }
}