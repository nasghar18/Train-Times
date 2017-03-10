var config = {
    apiKey: "AIzaSyBIMT2-5CDOrspt5TL_Sp_pT07oMVej9_k",
    authDomain: "train-base-f50fc.firebaseapp.com",
    databaseURL: "https://train-base-f50fc.firebaseio.com",
    storageBucket: "train-base-f50fc.appspot.com",
    messagingSenderId: "273455778933"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var traName = $("#train-name-input").val().trim();
  var traDest = $("#dest-input").val().trim();
  var traFirst = moment($("#firsttime-input").val().trim(), "HH:mm").format("HH:mm");
  var traFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTra = {
    name: traName,
    dest: traDest,
    first: traFirst,
    freq: traFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTra);

  // Logs everything to console
  console.log(newTra.name);
  console.log(newTra.dest);
  console.log(newTra.first);
  console.log(newTra.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#firsttime-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var traName = childSnapshot.val().name;
  var traDest = childSnapshot.val().dest;
  var traFirst = childSnapshot.val().first;
  var traFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(traName);
  console.log(traDest);
  console.log(traFirst);
  console.log(traFreq);

  // Assumptions
    var tFrequency = parseInt(traFreq);

    // Time is 3:30 AM
    var firstTime = traFirst;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainDis = moment(nextTrain).format("HH:mm")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  // Prettify the employee start
  //var empStartPretty = moment.unix(traFirst).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment.unix(traFirst, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * traFreq;
  //console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + traName + "</td><td>" + traDest + "</td><td>" +
  traFreq + "</td><td>" + nextTrainDis /*empMonths*/ + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
