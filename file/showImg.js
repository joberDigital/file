sheetIndex = 0;
sheetsFileID = '1Xs2wIIM8DLBZMNkiG3LPdg4M6o2iuRArnSN2X8aitog';

var SHEETSRESPONSE = `https://docs.google.com/spreadsheets/d/${sheetsFileID}/gviz/tq?tqx=out:json&tq&gid=${sheetIndex}`
//This waits until the baseline page is loaded and then gets the JSON feed, and as long as it doesn't error, calls the readdata function to start taking that feed and drawing the HVAC parts. The way it does this is through 'AJAX', which stands for 'Asynchronous JavaScript And XML'. This allows you to go and get data from a server/service (like Google Sheets) after the page has loaded. 

/*This is probably your first time seeing options/settings supplied to a JS function with key:value pairs. 	
 */

fetch(SHEETSRESPONSE)
  .then(response => response.text())
  .then(textResponse => prepData(textResponse))
  .then(partFeed => loadParts(partFeed));

function prepData(data) {
  //response has a junk line at top (/*O_o*/), so we split it on the newline character and get the second row, [1]
  data = data.split("\n");
  //this is a kind of hacky solution to extracting the JSON body from the sheets response, using a regular expression to remove the stuff we don't want- OK for a proof of concept; and the HinH team is going to use Firebase for the 'production' version anyway
  data = data[1].replace(/google.visualization.Query.setResponse\((.*)\);/, "$1");
  if (isJson(data)) {
    partfeed = JSON.parse(data);
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
      val = partfeed.table.rows[i].c[j].v;
      row[j - 1] = val;
    }
    drawDiv(row);
  }
}

function drawDiv(divData) {
  if (divData == null) return null;
tema=divData[0].trim();
imgURL = divData[1].trim();

var newPartsDiv = document.createElement('div');
var indice = document.createElement('ul');
var puntos = document.createElement('li');
var partImg = document.createElement('img');

var subtitulo = document.createElement('div');
var titulo = document.createElement('h2');


newPartsDiv.classList.add("container1")
indice.classList.add("contenidoPrincipal1")
puntos.classList.add("contenidoPrincipalMain1")

subtitulo.classList.add("headerPrincipal1")
titulo.classList.add("subtitulo1")
partImg.classList.add("img1")


subtitulo.innerText=("ESPERANTO \n" +tema);
newPartsDiv.className = 'catalog-part';

partImg.setAttribute("src", ("https://" + imgURL+"?authuser=0"));


var parts = document.getElementsByClassName("catalog-part");

for (var i = 0; i < parts.length; i++) {
    parts.item(i).style.display = "block";
  for (var i = 0; i < parts.length; i++) {
    parts.item(i).style.display = "block";
  }
}
newPartsDiv.appendChild(titulo);
titulo.appendChild(subtitulo)

subtitulo.className="subtitulo1"
puntos.appendChild(partImg)
indice.appendChild(puntos)
newPartsDiv.appendChild(indice);

var theParent = document.getElementById("parts-content2");
theParent.appendChild(newPartsDiv);


let nIntervId3;
nIntervId3 = setInterval(flashText3, 1800);
function flashText3() {
  
subtitulo.className === "subtitulo1" ? subtitulo.className = "color" :subtitulo.className = "subtitulo1";
}
}
