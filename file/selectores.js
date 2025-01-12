const config = {
  apiKey: "AIzaSyAsZpspITi1Wo8-zU2g-QhaITfys4jbjt4",
  authDomain: "esperantolernanto-e4475.firebaseapp.com",
  projectId: "esperantolernanto-e4475",
  storageBucket: "esperantolernanto-e4475.firebasestorage.app",
  messagingSenderId: "901631364216",
  appId: "1:901631364216:web:52f33d5ebe5d2f1f69318d",
  measurementId: "G-E8CY9L4688"
};

// Initialize Firebase
firebase.initializeApp(config);
//////////
var startes=document.getElementById('headerPrincipal1')
startes.style.display="none";

var iframes=document.getElementById('parts-content')
iframes.style.display="none"
var sheetIndex = 0;
var sheetsFileID = '1Tr5CUZ4WCAdOE_chv7lOcwTd-ic8ZNIDVpNVwaSRTjM';

var SHEETSRESPONSE = `https://docs.google.com/spreadsheets/d/${sheetsFileID}/gviz/tq?tqx=out:json&tq&gid=${sheetIndex}`
fetch(SHEETSRESPONSE)
.then(response => response.text())
.then(textResponse => prepData(textResponse))
.then(partFeed => loadParts(partFeed));

function prepData(data) {
data = data.split("\n");
data = data[1].replace(/google.visualization.Query.setResponse\((.*)\);/, "$1");
if (isJson(data)) {
var    partfeed = JSON.parse(data);
  return (partfeed);
} else {
  console.log('it is not JSON- yarf');
}
}
function isJson(str) {
try {
  JSON.parse(str);
} catch (e) {
  return false;
}
return true;
}
function loadParts(partfeed) {
const firstCol = 1;
for (var i = 0; i < partfeed.table.rows.length; i++) {
  var row = [];
  for (var j = firstCol; j < partfeed.table.rows[i].c.length; j++) {
   var val = partfeed.table.rows[i].c[j].v;
    row[j - 1] = val;
//  console.log(row)
  }
  drawDiv(row);
}
}
$('#register-link').click(function() {
$('#login-form').toggle();
$('#register-form').toggle();
});

$('#forgotten-link').click(function() {
$('#forgotten-form').show();
$('#before-reset').show();
$('#login-form').hide();
});

$('#login-link-modal').click(function() {
$("#after-reset").hide();
$('#login-form').show();
});


$('#login-trigger').click(function() {
handle_auth();
});

//Code that deals with initial display for modal pane that deals with authentication and, for a user that's logged in, logging them out.
function handle_auth() {
//The function below lets us know if/who is logged in- you can read more about it here: https://firebase.google.com/docs/auth/web/manage-users. 
var user = firebase.auth().currentUser;
console.log("dealing with " + user);

if (!user) {
  //If there's no user (user var is null)  
  $('#login-content').toggle();
  //Reset/hide other forms and div's so the login page displays right.
  $('#register-form').hide();
  $('#before-reset').hide();
  $("#after-reset").hide();
  $("#if-error").hide();
  $('#login-form').show();
} else {
  // Sign out the current user
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Signed out " + user.email)
  }).catch(function(error) {
    // An error happened.
    alert("Something went wrong.");
  });
  window.location.reload()
}
}
$('#login-form').submit(function() {
login_user($('#login_email').val(), $('#login_pwd').val());
});
function login_user(email, pwd) {
console.log("attempting to login user " + email);
firebase.auth().signInWithEmailAndPassword(email, pwd).then(function() {
  $("#login-form input[type=text], input[type=password]").val('');
}, function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Reminder: This is a stand-alone system you need to register for separately (sorry for the nuisance!). " + errorMessage);
});
}
$('#register-form').submit(function() {
register_user($('#register_email').val(), $('#register_pwd').val(), $('#register_re_pwd').val());
});
function register_user(email, pwd, re_pwd) {
console.log("I'll try to register user " + email);
if (pwd != re_pwd) {
  $('#reg-error-response').text("Error: passwords do not match.");
  $("#if-reg-error").show();
} else {
  firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function(user) {
    if (user) {
      $("#register-form input[type=text], input[type=password]").val('');
    }
  }, function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("oh my: " + errorMessage);
    $('#reg-error-response').text(errorMessage);
    $("#if-reg-error").show();
  });
}
}
$('#forgotten-form').submit(function() {
recover_password($('#recovery_email').val());
});
function recover_password(email) {
console.log("sending recovery to " + email);
firebase.auth().sendPasswordResetEmail(email).then(function() {
  console.log("sending recovery to " + email);
  $("#before-reset").hide();
  $("#after-reset").show();
  $('#submitted-email').text(email);
  $("#forgotten-form input[type=text], input[type=password]").val('');
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("oh my: " + errorMessage);
  $('#error-response').text(errorMessage);
  $("#before-reset").hide();
  $("#after-reset").hide();
  $("#if-error").show();
});
}
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  console.log("welcoming now..." + user.email);
  $("#auth-text").text("Log Out");
  $('#login-content').show();
  startes.style.display="block"
  } else {
  $("#headerPrincipal1").hide()
  $("#parts-content").hide()
  console.log('onAuthStateChanged running with no user')
}
console.log('end of onAuthState...')
var nowuser = firebase.auth().currentUser;
$("#login-content").hide();
});
function drawDiv(divData) {
if (divData == null) return null;
var mfr = divData[0].trim();
var imgURL = divData[1].trim();
var newPartsDiv = document.createElement('div');
var partImg = document.createElement('iframe');
var video1 = document.createElement('span');

newPartsDiv.className = 'catalog-part';
partImg.classList.add("imagen")
video1.classList.add("subtituloVideo")
video1.innerText=  mfr
newPartsDiv.setAttribute("mfr", mfr);
newPartsDiv.setAttribute("mfr2", mfr);

partImg.setAttribute("src", ("https://" + imgURL+"/preview"));
partImg.setAttribute('allowfullscreen','');
partImg.setAttribute('allow','autoplay;encrypted-media');
newPartsDiv.appendChild(video1)

newPartsDiv.appendChild(partImg)
console.log(video1)
var theParent = document.getElementById("parts-content");
theParent.appendChild(newPartsDiv);

}
document.addEventListener("DOMContentLoaded", function() {
$("#parts-content").hide()
const goButton = document.getElementById('search-btn');
goButton.addEventListener('click', filterParts);


function filterParts() {
$("#parts-content").show()

//Is the function working?
console.log('go!');
var selMfr1 = document.getElementById('dd-mfr').value
var selMfr2 = document.getElementById('dd-mfr2').value

console.log("the selected mfr is " + selMfr1 );
var parts = document.getElementsByClassName("catalog-part");
//alert("no machine")
for (var i = 0; i < parts.length; i++) {
  parts.item(i).style.display = "block";
 
    
  if ((selMfr1 != parts.item(i).getAttribute('mfr')) && (selMfr1 != "All")) {
    console.log("mfr diff1");
    parts.item(i).style.display = "none";
    }
  if ((selMfr2 != parts.item(i).getAttribute('mfr2')) && (selMfr2 != "All")) {
    console.log("mfr diff2");
    parts.item(i).style.display = "none";
  }
  }
 var config= document.getElementById('dd-mfr').value= "All"
 var config= document.getElementById('dd-mfr2').value= "All"
 }
});
