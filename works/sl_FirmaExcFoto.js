/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record'],

  function (widget, url, https, file, record) {

    function onRequest(context) {
      var recordCase_Id = context.request.parameters.recordCaseId;
      var inRecord = record.load({ type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true });
      var companyId = inRecord.getValue({ fieldId: 'company' });
      var cliente = record.load({ type: 'customer', id: companyId });
      var nameC = inRecord.getText({ fieldId: 'company' });
      var name = nameC.substring(8, 100);
      var sucursalText = cliente.getText({ fieldId: 'custentity25' });
      var sucReal = sucursalReal(sucursalText);

      var formulario = widget.createForm({ title: 'Firma de Exclusión de Fotografía' });
      //var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      //var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
      //var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
      var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });


      var date = new Date();
      var tdate = date.getDate();
      var month = date.getMonth() + 1; // jan = 0
      var year = date.getFullYear();
      var currentDate = tdate + '/' + month + '/' + year;

      var headPDF = '<body>' +
        '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
        '<div id="scroll"><div id="notices">' +
        '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 600px;margin-top:20px">' +
        '<h1 id="titulo">FORMULARIO DE EXCLUSIÓN DE FOTOGRAFÍA PARA EXPEDIENTE CLÍNICO ELECTRÓNICO</h1>';

      var bodyPDF = '<p id="texto">' +
        '<p id="texto">El expediente clínico electrónico es una fuente de información que amplía el dictamen médico experto, conformándose por una descripción médica aunado a documentos, imágenes, procedimientos, pruebas diversas, análisis e información de estudios practicados al paciente.</p><br/>' +

        '<p id="texto">Comprendo que el expediente clínico electrónico de manera integral, representa una base para conocer las condiciones de salud, los actos médicos, los diferentes procedimientos ejecutados por el equipo médico así como los resultados y progreso de mi tratamiento.</p><br/>' +

        '<p id="texto">(Solo firme si rechaza el permiso)</p><br/>' +

        '<p id="texto">No otorgo autorización para la toma de fotografías y/o videos durante mi proceso de tratamiento en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +

        '<p id="texto">Firmo la presente, en <b>' + sucReal + ' a ' + currentDate + ' </b></p><br/>' +

        '<p id="texto">' +
        'Atentamente,</p>' +
        '<p id="texto"></p>' +
        '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
        '<p style="text-align: center;">' +
        'FIRMA DEL PACIENTE</p>' +
        '</div>' +
        '</div></div>' +
        '</body>';

      var footerPDF = '' + // '<center><img id="myImgFirma" src="#" width="300" height="200"></center><br/>'+
        //'<center><b>_________________________________________________________</b></center><br/>'+
        //'<center><b>FIRMA DEL PACIENTE</b></center><br/>'+
        '</div>' +
        '</div>' +
        '</body>';

      var pdfDoc = formulario.addField({ id: 'custpage_pdfdoc', label: 'PdfDoc', type: 'inlinehtml' });
      //var firma = formulario.addField({id: 'custpage_firmacliente', label: 'FirmaCliente', type: 'inlinehtml'});

      pdfDoc.defaultValue = headPDF + bodyPDF + footerPDF;

      firmasCambas.defaultValue = '<style type="text/css">' +
        '@media only screen and (min-width: 576px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 992px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 700px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 1200px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 700px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +

        'h1 {' +
        '  border-bottom: 1px solid  #5D6975;' +
        '  color: #5D6975;' +
        '  font-size: 2.4em;' +
        '  line-height: 1.4em;' +
        '  font-weight: normal;' +
        '  text-align: center;' +
        '  margin: 0 0 20px 0;' +
        '}' +

        '#notices .notice {' +
        '  color: #5D6975;' +
        '  font-size: 1.2em;' +
        '}' +

        'footer {' +
        '  color: #5D6975;' +
        '  width: 100%;' +
        '  height: 30px;' +
        '  position: absolute;' +
        '  bottom: 0;' +
        '  border-top: 1px solid #C1CED9;' +
        '  padding: 8px 0;' +
        '  text-align: center;' +
        '}' +
        'body {font-family: Arial, Helvetica, sans-serif;}' +
        '.modal {' +
        '  display: none;' +
        '  position: fixed;' +
        '  z-index: 1; ' +
        '  padding-top: 160px; ' +
        '  left: 0;' +
        '  top: 0;' +
        '  width: 100%; ' +
        '  height: 100%;' +
        //'  overflow: auto; '+
        '  background-color: rgb(0,0,0); ' +
        '  background-color: #00000069;' +
        '}' +
        '' +
        '.modal-content {' +
        '  background-color: #fefefe;' +
        '  margin: auto;' +
        '  padding: 20px;' +
        '  border: 1px solid #888;' +
        '  width: 550px;' +
        '}' +
        '' +
        '.close {' +
        '  color: #aaaaaa;' +
        '  float: right;' +
        '  font-size: 28px;' +
        '  font-weight: bold;' +
        '}' +
        '' +
        '.close:hover,' +
        '.close:focus {' +
        '  color: #000;' +
        '  text-decoration: none;' +
        '  cursor: pointer;' +
        '}' +
        '#scroll {' +
        'border: 1px solid black;' +
        /*'  width: 785px;'+
        '  height: 900px;'+*/
        '  overflow-y: auto;' +
        '}' +

        '</style>' +

        '<div id="myModal" class="modal">' +
        '<div class="modal-content overlay">' +
        '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL<br /></center></b>' +
        '</div>' +
        '</div>' +


        '<script type="application/javascript">' +
        'document.addEventListener("touchmove", function(e) {' +
        '  e.preventDefault();' +
        '},' +
        '{ passive: true });' +


        '(function() {' +
        '' +
        '    window.requestAnimFrame = (function (callback) {' +
        '        return window.requestAnimationFrame || ' +
        '                    window.webkitRequestAnimationFrame ||' +
        '                    window.mozRequestAnimationFrame ||' +
        '                    window.oRequestAnimationFrame ||' +
        '                    window.msRequestAnimaitonFrame ||' +
        '                    function (callback) {' +
        '                        window.setTimeout(callback, 1000/60);' +
        '                    };' +

        '    })();' +
        '' +
        '    var canvas2 = document.getElementById("sig-canvas2");' +
        '    var ctx2 = canvas2.getContext("2d");' +
        '    ctx2.strokeStyle = "#222222";' +
        '    ctx2.lineWith = 2;' +
        '' +
        '    var drawing = false;' +
        '    var mousePos = { x:0, y:0 };' +
        '    var lastPos = mousePos;' +
        '' +
        '    var drawing2 = false;' +
        '    var mousePos2 = { x:0, y:0 };' +
        '    var lastPos2 = mousePos2;' +
        '' +
        '    canvas2.addEventListener("mousedown", function (e) {' +
        '        drawing2 = true;' +
        '        lastPos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mouseup", function (e) {' +
        '        drawing2 = false;' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mousemove", function (e) {' +
        '        mousePos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchstart", function (e) {' +
        '        mousePos2 = getTouchPos(canvas2, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchstart", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchend", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchmove", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    function getMousePos(canvasDom, mouseEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: mouseEvent.clientX - rect.left,' +
        '            y: mouseEvent.clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function getTouchPos(canvasDom, touchEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: touchEvent.touches[0].clientX - rect.left,' +
        '            y: touchEvent.touches[0].clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function renderCanvas() {' +
        '        if (drawing) {' +
        '            ctx.moveTo(lastPos.x, lastPos.y);' +
        '            ctx.lineTo(mousePos.x, mousePos.y);' +
        '            ctx.stroke();' +
        '            lastPos = mousePos;' +
        '        }' +
        '        if (drawing2) {' +
        '            ctx2.moveTo(lastPos2.x, lastPos2.y);' +
        '            ctx2.lineTo(mousePos2.x, mousePos2.y);' +
        '            ctx2.stroke();' +
        '            lastPos2 = mousePos2;' +
        '        }' +
        '    }' +
        '' +
        '    (function drawLoop () {' +
        '        requestAnimFrame(drawLoop);' +
        '        renderCanvas();' +
        '    })();' +
        '' +
        '})();' +
        '</script>';

      var fieldrecordCaseId = formulario.addField({
        id: 'custpage_case',
        label: 'recordCase',
        type: 'inlinehtml'
      });

      fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

      formulario.addButton({
        id: 'custpage_01',
        label: 'Enviar Firma',
        functionName: 'enviarFirmas'
      });

      formulario.addButton({
        id: 'custpage_0112',
        label: 'Firmar',
        functionName: 'abrirModal'
      });

      formulario.addButton({
        id: 'custpage_0113',
        label: 'Limpiar Firma',
        functionName: 'limpiarFirmaCli'
      });

      formulario.clientScriptFileId = '2361985';

      context.response.writePage(formulario);
    }

    function sucursalReal(sucursalText) {
      var largoSucrusal = sucursalText.length;
      largoSucrusal = largoSucrusal - 4;
      var sucursalFinal = sucursalText.slice(0, largoSucrusal);
      return sucursalFinal;
    }

    return {
      onRequest: onRequest
    };

  });
