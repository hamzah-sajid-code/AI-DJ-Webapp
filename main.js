var rightWristx = '';
var rightWristy = '';
var leftWristx = '';
var leftWristy = '';
var RightWristscore = '';
var leftWristscore  = '';
var music = '';
function preload(){
    music = loadSound("music.mp3");
}
function setup(){
    canvas =  createCanvas(600, 500);
	canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500)
    video.hide();

    console.log('ML5 Successfully Loaded: '+ml5.version);
   classifire = ml5.poseNet(video, modelLoaded)
   classifire.on('pose', gotResults)  
}
function draw(){
    image(video, 0, 0, 600,500);
    if(leftWristscore > 0.1){
        fill('red')
        stroke('red')
        circle(leftWristx, leftWristy, 20)
        if(leftWristy > 0 && leftWristy <= 100){
            document.getElementById('speedNum').innerHTML = ': 0.5x';
            music.rate(0.5)
        }
        if(leftWristy > 100 && leftWristy <= 200){
            document.getElementById('speedNum').innerHTML = ': 1.0x';
            music.rate(1.0)
        }
        if(leftWristy > 200 && leftWristy <= 300){
            document.getElementById('speedNum').innerHTML = ': 1.5x';
            music.rate(1.5)
        }
        if(leftWristy > 300 && leftWristy <= 400){
            document.getElementById('speedNum').innerHTML = ': 2.0x';
            music.rate(2.0)
        }
        if(leftWristy <= 400){
            document.getElementById('speedNum').innerHTML = ': 2.5x';
            music.rate(2.5)
        }
    }
    if(RightWristscore > 0.1){
        fill('red')
        stroke('red')
        circle(rightWristx, rightWristy, 20);
        rightWristy = Number(rightWristy);
        rightWristy_new = floor(rightWristy / 500);
        music.setVolume(rightWristy_new);
        document.getElementById('volNum').innerHTML = ': '+rightWristy_new;

    }
}
function modelLoaded(){
    console.log('Successfully loaded posnet');
}
function gotResults(results){
    if(results.length > 0){
    console.log(results);

    rightWristx = results[0].pose.rightWrist.x;       
    rightWristy = results[0].pose.rightWrist.y;
    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    RightWristscore = results[0].pose.keypoints[10].score;
    leftWristscore = results[0].pose.keypoints[9].score;
    }
    
}
function play(){
    music.play();
	music.setVolume(1);
	music.rate(1);
}