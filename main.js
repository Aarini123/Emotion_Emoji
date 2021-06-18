 var prediction1="";
 var prediction2="";

Webcam.set({
    width:350,
    height:330,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snap1").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5.version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/cv6dIaZWb/model.json",modelLoaded);

function modelLoaded(){
    console.log("M0del L0aded!");
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data1= "The first prediction " + prediction1;
    speak_data2= "The second prediction " + prediction2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function predict(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if(results[0].label=="happy"){
    document.getElementById("update_emoji").innerHTML='<img src="happy.jpg">';
}
else if(results[0].label=="angry"){
    document.getElementById("update_emoji").innerHTML='<img src="angry.gif">';
}
else if(results[0].label=="sad"){
    document.getElementById("update_emoji").innerHTML='<img id="sud" src="sud.gif">';
}
if(results[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML='<img src="happy.jpg">';
}
else if(results[1].label=="angry"){
    document.getElementById("update_emoji2").innerHTML='<img src="angry.gif">';
}
else if(results[1].label=="sad"){
    document.getElementById("update_emoji2").innerHTML='<img id="sud" src="sud.gif">';
}
}
}

