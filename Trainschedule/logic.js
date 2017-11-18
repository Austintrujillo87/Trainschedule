
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDR6_vEON5Sb7GGguDJ--1CjajMSuvAIOc",
    authDomain: "train-a7e7c.firebaseapp.com",
    databaseURL: "https://train-a7e7c.firebaseio.com",
    storageBucket: "train-a7e7c.appspot.com",
    messagingSenderId: "675029701725"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
  event.preventDefault();

  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var nextTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    next: nextTrain
  };

  database.ref().push(newTrain);
 
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.next);

  alert("Train successfully added");

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().next;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(nextTrain);

  var trainTime = moment(nextTrain, "HH:mm").format("hh:mm a");

  var minutesAway = moment().diff(moment(nextTrain, "HH:mm"), "minutes");

 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainTime + "</td><td>" + Math.abs(minutesAway) +  "</td></tr>");
 console.log("table add");


});