(( )=>{
    sheetIndex = 0;
    sheetsFileID = '1yXNRX0BtrHRQYIixeNNs6_O0mfThT1Yn_vJhQ8LiY6Q';
    var SHEETSRESPONSE = `https://docs.google.com/spreadsheets/d/${sheetsFileID}/gviz/tq?tqx=out:json&tq&gid=${sheetIndex}`
    fetch(SHEETSRESPONSE)
      .then(response => response.text())
      .then(textResponse => prepData(textResponse))
      .then(partFeed => loadParts(partFeed));
    
    function prepData(data) {
      data = data.split("\n");
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
    
      imgURL = divData[1].trim();
      mfr = divData[2].trim();
    
      categorias = divData[3].trim();
    
      link = divData[4].trim();
      urlFacebook = divData[6].trim();
      descargaURL = divData[7].trim();
    
      var newPartsDiv = document.createElement('div');
      newPartsDiv.className = 'catalog-part';
    
      newPartsDiv.setAttribute("mfr", mfr);
      newPartsDiv.setAttribute("model", mfr);
      newPartsDiv.setAttribute("latitud", mfr);
    
    //  <a href="https://web.facebook.com/reel/574597978423222/">xxx</a>
    
      var partImg = document.createElement('img');
      var i = document.createElement('i');
      var descarga= document.createElement('a');
      var descargaFacebook= document.createElement('a');
      const svgElement = document.createElement('svg');
      var descargaFacebook= document.createElement('a');
    // Crear el elemento svg
      i.classList.add('fa', 'fa-download','i1');
      partImg.setAttribute("src", ("https://" + imgURL));
     descarga.setAttribute("href",("https://"+descargaURL+"&amp&export=download"))
     descargaFacebook.setAttribute("href",("https://"+urlFacebook))
    
     var newOverlayDiv2 = document.createElement('div');
     var botonToogle = document.createElement('div');
      var newOverlayDiv = document.createElement('div');
    var  newOverlayDivP = document.createElement('p');
    
    var  svgFacebook = document.createElement('svg');
    
    partImg.classList.add('imagen')
    newOverlayDivP.className='overlay'
    newOverlayDiv2.className='overlay2'
    botonToogle.className='overlay'
    const svgElements=`<svg width="34px" height="20px" fill="red" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M715.637 960h171.897C920.348 960 960 932.759 960 898.909V125.091C960 91.243 920.348 64 887.534 64H113.716C77.004 64 64 96.892 64 125.091v773.818C64 927.109 77.004 960 113.716 960h439.012V634.182H410.181c-11.257 0-20.363-9.106-20.363-20.363V491.637c0-11.257 9.106-20.365 20.363-20.365h142.546V328.728c0-99.354 88.056-183.272 192.261-183.272h113.193c11.257 0 20.365 9.106 20.365 20.363V288c0 11.258-9.108 20.365-20.365 20.365h-72.465c-34.444 0-70.079 19.052-70.079 50.908v112h131.17a20.27 20.27 0 0 1 16.507 8.472c3.856 5.291 4.891 12.133 2.823 18.337l-40.728 122.181a20.403 20.403 0 0 1-19.33 13.919h-90.442V960z" fill="#2577FF"></path><path d="M807.708 451.723h-92.071v19.549h112.288c-0.161-3.938-1.326-7.809-3.711-11.078a20.263 20.263 0 0 0-16.506-8.471zM513.629 940.451H75.445C83.3 951.952 95.599 960 113.716 960h439.012V634.183H513.63v306.268zM839.283 145.456c-0.451-10.855-9.231-19.549-20.198-19.549H705.89c-104.205 0-192.261 83.919-192.261 183.272v142.544H371.083c-11.257 0-20.363 9.108-20.363 20.365v122.181c0 11.258 9.107 20.364 20.363 20.364h18.899c-0.012-0.286-0.164-0.527-0.164-0.815V491.637c0-11.257 9.106-20.365 20.363-20.365h142.546V328.728c0-99.353 88.056-183.272 192.261-183.272h94.295z" fill=""></path><path d="M900.123 65.251c12.221 10.76 20.778 24.748 20.778 40.29V879.36c0 33.85-39.651 61.091-72.467 61.091H715.637V960h171.896C920.348 960 960 932.759 960 898.909V125.091c0-29.6-30.322-54.141-59.877-59.84z" fill=""></path></g></svg>`
    svgFacebook.innerHTML = svgElements;
      newOverlayDivP.innerHTML = (mfr );
      newOverlayDiv2.innerHTML = (link);
    //query
     botonToogle.innerHTML=categorias
    var a5=checkCardPalabras(categorias,newOverlayDivP,newOverlayDiv2,descarga,descargaFacebook,newPartsDiv)
      newOverlayDiv.appendChild(newOverlayDivP);
      newOverlayDivP.appendChild(a5)
      newOverlayDivP.appendChild(partImg);
      newOverlayDivP.appendChild(descargaFacebook);
      newOverlayDivP.appendChild(descarga);
     newPartsDiv.appendChild(newOverlayDiv);
      descarga.appendChild(i);
      svgFacebook.appendChild(svgElement)
    
    newPartsDiv.appendChild(newOverlayDiv2);
    descargaFacebook.appendChild(svgFacebook)
     var theParent = document.getElementById("parts-content");
     theParent.appendChild(newPartsDiv);
    }
    const checkCardPalabras = (categorias,newOverlayDivP,newOverlayDiv2,descarga,newPartsDiv) => {
    const button1 = document.createElement("div");
    const svgCode = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width:15px">
        <g id="Layer_43" data-name="Layer 43"><path d="m17.53 16.5-7 10.06a1.73 1.73 0 0 1 -1.43.75h-5.23a.87.87 0 0 1 -.71-1.31l6.54-9.5a.87.87 0 0 0 0-1l-6.54-9.45a.87.87 0 0 1 .71-1.36h5.26a1.73 1.73 0 0 1 1.43.75l7 10.06a.87.87 0 0 1 -.03 1zm11.32-1-7-10.06a1.75 1.75 0 0 0 -1.44-.75h-5.23a.87.87 0 0 0 -.71 1.36l6.53 9.45a.87.87 0 0 1 0 1l-6.53 9.5a.87.87 0 0 0 .71 1.36h5.26a1.75 1.75 0 0 0 1.44-.75l7-10.06a.91.91 0 0 0 -.03-1.05z"/></g>
        </svg>`;
      button1.classList.add("overlay")
        button1.innerHTML=svgCode
        
        $(button1).on('click', () => {
          $(newOverlayDivP).hide(2000)
              setTimeout(() => {
            newOverlayDiv2.style.display="block"
            descarga.style.display="none"
    
          }, 2000);
        });
        $(newOverlayDiv2).on('click', () => {
          $(newOverlayDivP).show()
            newOverlayDiv2.style.display="none"
            descarga.style.display="block"
    
        });
    return button1;
    };
    let nIntervId3;
    nIntervId3 = setInterval(flashText3, 1800);
    
    function flashText3() {
    
      const pasos= document.getElementById('pasos');
    pasos.className === "color" ? pasos.className = "subtitulo" :pasos.className = "color";
    }
    })()