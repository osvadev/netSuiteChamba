/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/record', 'N/xml', 'N/file'],

   function (widget, record, xml, file) {

      function onRequest(context) {
         var recordCase_Id = context.request.parameters.recordCaseId;
         var compaId = context.request.parameters.compaId;

         var inRecord = record.load({ type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true });
         var type_alop = inRecord.getValue({ fieldId: 'custevent294' });
         var cie = inRecord.getText({ fieldId: 'custevent290' });
         var DCDOA1 = inRecord.getValue({ fieldId: 'custevent303' });
         var imageURL = "https://system.na2.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4";
         var imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + xml.escape(imageURL) + "\"/>";

         var DCDOB1 = inRecord.getValue({ fieldId: 'custevent302' });
         var DCDOC1 = inRecord.getValue({ fieldId: 'custevent301' });
         var DCDOpro = inRecord.getValue({ fieldId: 'custevent300' });
         var DCZRA1 = inRecord.getValue({ fieldId: 'custevent299' });
         var DCZRB1 = inRecord.getValue({ fieldId: 'custevent298' });
         var DCZRC1 = inRecord.getValue({ fieldId: 'custevent297' });
         var DCZRpro = inRecord.getValue({ fieldId: 'custevent296' });
         var AreaZD = inRecord.getValue({ fieldId: 'custevent304' });
         var AreaZDA = inRecord.getValue({ fieldId: 'custevent305' });
         var AreaZDB = inRecord.getValue({ fieldId: 'custevent306' });
         var AreaZDC = inRecord.getValue({ fieldId: 'custevent307' });
         var AreaZD2 = inRecord.getValue({ fieldId: 'custevent308' });
         var type_alop_text = inRecord.getText({ fieldId: 'custevent309' });
         var type_razurado = inRecord.getText({ fieldId: 'custevent311' });
         var type_razurado = inRecord.getText({ fieldId: 'custevent311' });
         var patologi = inRecord.getValue({ fieldId: 'custevent310' });

         var image_valoration1 = inRecord.getValue({ fieldId: 'custevent313' });
         if (image_valoration1 != null && image_valoration1 != "") {
            var file_image1 = file.load(image_valoration1);
            var image_url1 = file_image1.url;
            var img_val_1 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url1) + "\"/>";
         } else {
            //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image1 = file.load("1592235");
            var image_url1 = file_image1.url;
            var img_val_1 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url1) + "\"/>";
         }

         var image_valoration2 = inRecord.getValue({ fieldId: 'custevent314' });
         if (image_valoration2 != null && image_valoration2 != "") {
            var file_image2 = file.load(image_valoration2);
            var image_url2 = file_image2.url;
            var img_val_2 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url2) + "\"/>";
         } else {
            //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image2 = file.load("1592235");
            var image_url2 = file_image2.url;
            img_val_2 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url2) + "\"/>";
         }

         var image_valoration3 = inRecord.getValue({ fieldId: 'custevent315' });
         if (image_valoration3 != null && image_valoration3 != "") {
            var file_image3 = file.load(image_valoration3);
            var image_url3 = file_image3.url;
            var img_val_3 = "<img height=\"300px\" width=\"300px\"  src=\"" + xml.escape(image_url3) + "\"/>";
         } else {
            //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image3 = file.load("1592235");
            var image_url3 = file_image3.url;
            var img_val_3 = "<img height=\"300px\" width=\"300px\"  src=\"" + xml.escape(image_url3) + "\"/>";
         }

         var image_valoration4 = inRecord.getValue({ fieldId: 'custevent316' });
         if (image_valoration4 != null && image_valoration4 != "") {
            var file_image4 = file.load(image_valoration4);
            var image_url4 = file_image4.url;
            var img_val_4 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url4) + "\"/>";
         } else {
            //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image4 = file.load("1592235");
            var image_url4 = file_image4.url;
            var img_val_4 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url4) + "\"/>";
         }
         var observaciones = inRecord.getValue({ fieldId: 'custevent279' });
         var idx = inRecord.getValue({ fieldId: 'custevent281' });
         var tx = inRecord.getValue({ fieldId: 'custevent280' });

         var cliRecord = record.load({ type: 'customer', id: compaId, isDynamic: true });
         var name = cliRecord.getValue({ fieldId: 'altname' });
         var medS = inRecord.getValue({ fieldId: 'custevent2' });
         var nameMedico = inRecord.getText({ fieldId: 'custevent322' });

         var fecha = new Date();
         fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

         var headPDF = '<body>' +
            '<div align="center" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
            '<div style="padding-top: 115px!important;padding: 35px;text-align: justify;">' +
            '<center><p style="font-size: x-large;"><b>DIAGNOSTICO</b></p></center>';

         var bodyPDF = "<table><tr><td></td></tr></table>";
         bodyPDF += "<table style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"align:lefth\">";
         bodyPDF += "<ul><li>DIAGRAMA DE CLASIFICACIÓN TIPO AA</li></ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\">" + funt1(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt2(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt3(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt4(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt5(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt6(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt7(type_alop) + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\">1</td>";
         bodyPDF += "<td align=\"center\">2</td>";
         bodyPDF += "<td align=\"center\">3</td>";
         bodyPDF += "<td align=\"center\">4</td>";
         bodyPDF += "<td align=\"center\">5</td>";
         bodyPDF += "<td align=\"center\">6</td>";
         bodyPDF += "<td align=\"center\">7</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td colspan=\"3\" style=\"align:lefth\">Grado:&nbsp;<b>" + checado(type_alop) + "</b></td>";
         bodyPDF += "<td colspan=\"4\" style=\"align:lefth\">CIE10:&nbsp;<b>" + checado(cie) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"align:lefth\">";
         bodyPDF += "<ul>";
         bodyPDF += "<li>REGISTRO DE EVALUACIÓN DE DENSIDAD";
         bodyPDF += "</li>";
         bodyPDF += "</ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" border=\"1px\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante A1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOA1) + "</b></td>";
         bodyPDF += "<td align=\"center\" border=\"1px\" rowspan=\"8\">" + imageDiagram + " </td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante B1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOB1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante C1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOC1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante (PROMEDIO) </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOpro) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora A </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRA1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora B </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRB1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora C </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRC1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora (PROMEDIO) </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRpro) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\" >";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"align:lefth\" >";
         bodyPDF += "<ul>";
         bodyPDF += "<li>ÁREA DE MEDICIÓN";
         bodyPDF += "</li>";
         bodyPDF += "</ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" border=\"1px\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona donante</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora A</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDA) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora B</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDB) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora C</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDC) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD2) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><table style=\"font-family:'Aria', sans-serif; font-size: 15px\" width=\"100%\" >";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" ><b>TIPOS DE ALOPECIA</b>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td border=\"1px\" width=\"30%\" align=\"center\">TIPO:&nbsp;<b>" + checado(type_alop_text) + "</b></td>";
         bodyPDF += "<td border=\"1px\" width=\"40%\" align=\"center\">RASURADO:&nbsp;<b>" + checado(type_razurado) + "</b></td>";
         bodyPDF += "<td border=\"1px\" width=\"30%\" align=\"center\">PATOLOGÍA:&nbsp;<b>" + checado(patologi) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table >";

         bodyPDF += "<br/><br/><br/><br/><br/><table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Zona donadora<br/>" + img_val_1 + "</td>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Frontal<br/>" + img_val_2 + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Coronilla<br/>" + img_val_3 + "</td>";
         bodyPDF += "<td width=\"50%\"  align=\"center\">Area a tratar<br/>" + img_val_4 + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\" >";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"><u> " + checado(name) + "</u></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><br/><br/><table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td >Algún otro dato que desee referirnos:</td></tr>';
         bodyPDF += '<tr><td height="120px" valign=\"top\" style="border: 1px solid black"><b>' + observaciones + '</b></td></tr>';
         bodyPDF += '</table>';

         bodyPDF += "<table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td>IDX:</td></tr>';
         bodyPDF += '<tr><td height="120px" valign=\"top\" style="border: 1px solid black"><b>' + idx + '</b></td></tr>';
         bodyPDF += '</table>';

         bodyPDF += "<table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td>TX:</td></tr>';
         bodyPDF += '<tr><td height="120" valign=\"top\" style="border: 1px solid black"><b>' + tx + '</b></td></tr>';
         bodyPDF += '</table>';

         //bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\" >";
         //bodyPDF += "<tr>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><img id=\"myImgFirmaCli2\" src=\"#\" width=\"200\" height=\"200\">";
         //bodyPDF += "</td>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><img id=\"myImgFirmaMed\" src=\"#\" width=\"200\" height=\"200\">";
         //bodyPDF += "</td>";
         //bodyPDF += "</tr>";
         //bodyPDF += "<tr>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> " + checado(name) + "</u></td>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> " + checado(nameMedico) + "</u></td>"; // checado(consultor_val)
         //bodyPDF += "</tr>";
         //bodyPDF += "<tr>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma del Paciente</b></td>";
         //bodyPDF += "<td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma</b></td>";
         //bodyPDF += "</tr>";
         //bodyPDF += "</table>";


         var footerPDF = '' + // '<center><img id="myImgFirma" src="#" width="300" height="200"></center><br/>'+
            //'<center><b>_________________________________________________________</b></center><br/>'+
            //'<center><b>FIRMA DEL PACIENTE</b></center><br/>'+
            '</div>' +
            '</div>' +
            '</body>';

         var formulario = widget.createForm({ title: 'Firmas Diagnostico' });
         var pdfDoc = formulario.addField({ id: 'custpage_pdfdoc', label: 'PdfDoc', type: 'inlinehtml' });
         //var firma = formulario.addField({id: 'custpage_firmacliente', label: 'FirmaCliente', type: 'inlinehtml'});

         pdfDoc.defaultValue = headPDF + bodyPDF + footerPDF;

         var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });
         firmasCambas.defaultValue = '<style type="text/css">' +
            'body {font-family: Arial, Helvetica, sans-serif;}' +
            '.modal {' +
            '  display: none;' +
            '  position: fixed;' +
            '  z-index: 1; ' +
            '  padding-top: 100px; ' +
            '  left: 0;' +
            '  top: 0;' +
            '  width: 100%; ' +
            '  height: 100%;' +
            '  overflow: auto; ' +
            '  background-color: rgba(0,0,0,0.4);' +
            '}' +
            '' +
            '.modal-content {' +
            '  background-color: #fefefe;' +
            '  margin: auto;' +
            '  padding: 20px;' +
            '  border: 1px solid #888;' +
            '  width: 550px;' +
            '}' +
            '</style>' +

            '<div id="myModal" class="modal">' +
            '<div class="modal-content">' +
            '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
            '<br /> <b>FIRMA DEL PACIENTE</b>' +
            '</div>' +
            '</div>' +

            '<div id="myModal2" class="modal">' +
            '<div class="modal-content">' +
            '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
            '<br /> <b>FIRMA DEL MÉDICO</b>' +
            '</div>' +
            '</div>' +

            '<script type="application/javascript">' +
            'document.addEventListener("mousemove", function(e) {' +
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
            '    var canvas = document.getElementById("sig-canvas");' +
            '    var ctx = canvas.getContext("2d");' +
            '    ctx.strokeStyle = "#222222";' +
            '    ctx.lineWith = 2;' +
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
            '    canvas.addEventListener("mousedown", function (e) {' +
            '        drawing = true;' +
            '        lastPos = getMousePos(canvas, e);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mousedown", function (e) {' +
            '        drawing2 = true;' +
            '        lastPos2 = getMousePos(canvas2, e);' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("mouseup", function (e) {' +
            '        drawing = false;' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mouseup", function (e) {' +
            '        drawing2 = false;' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("mousemove", function (e) {' +
            '        mousePos = getMousePos(canvas, e);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mousemove", function (e) {' +
            '        mousePos2 = getMousePos(canvas2, e);' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("touchstart", function (e) {' +
            '        mousePos = getTouchPos(canvas, e);' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousedown", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas.dispatchEvent(mouseEvent);' +
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
            '    canvas.addEventListener("touchend", function (e) {' +
            '        var mouseEvent = new MouseEvent("mouseup", {});' +
            '        canvas.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("touchend", function (e) {' +
            '        var mouseEvent = new MouseEvent("mouseup", {});' +
            '        canvas2.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '' +
            '    canvas.addEventListener("touchmove", function (e) {' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousemove", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas.dispatchEvent(mouseEvent);' +
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
            '        if (e.target == canvas || e.target == canvas2) {' +
            '            e.preventDefault();' +
            '        }' +
            '    }, false);' +
            '' +
            '    document.body.addEventListener("touchend", function (e) {' +
            '        if (e.target == canvas || e.target == canvas2) {' +
            '            e.preventDefault();' +
            '        }' +
            '    }, false);' +
            '' +
            '    document.body.addEventListener("touchmove", function (e) {' +
            '        if (e.target == canvas || e.target == canvas2) {' +
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

         var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
         fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

         formulario.addButton({ id: 'custpage_01', label: 'Enviar firmas', functionName: 'enviarFirmas' });
         formulario.addButton({ id: 'custpage_0111', label: 'Limpiar firma Paciente', functionName: 'limpiarFirmaCli' });
         //formulario.addButton({id: 'custpage_0114', label: 'Limpiar firma Médico', functionName: 'limpiarFirmaMed'});
         formulario.addButton({ id: 'custpage_0113', label: 'Mostrar firmas', functionName: 'mostrarFirmas' });
         formulario.addButton({ id: 'custpage_0112', label: 'Firma Paciente', functionName: 'abrirModal' });
         //formulario.addButton({id: 'custpage_0115', label: 'Firma Médico', functionName: 'abrirModal2'});
         formulario.clientScriptFileId = '2122875';

         context.response.writePage(formulario);
      }

      function funt1(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743291&c=3559763&h=1e56212e1db2d20cecd8";
         if (entero == 1)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt2(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743292&c=3559763&h=76fba8deb7014f71c1f7";
         if (entero == 2)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt3(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743293&c=3559763&h=7dec6caa816e21b8bc6e";
         if (entero == 3)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt4(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743294&c=3559763&h=1185d5785a0770214839";
         if (entero == 4)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt5(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743295&c=3559763&h=7a635732f3364dfd193f";
         if (entero == 5)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt6(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743296&c=3559763&h=2d035ee0a3af4a40b135";
         if (entero == 6)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt7(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743297&c=3559763&h=d1987980bf9f6bb72443";
         if (entero == 7)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function checado(checks) {
         var check = "";
         if (checks == "T") {
            var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
            check = "<img height=\"15px\" width=\"15px\" src=\"" + xml.escape(path) + "\">probando</img>";
         }
         else {
            if (checks == "F") {
               var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
               check = "<img height=\"15px\" width=\"15px\" src=\"" + xml.escape(path2) + "\"/>";
            }
            else {
               if (checks == null)
                  check = "";
               else
                  check = checks;
            }
         }
         return check;
      }

      return {
         onRequest: onRequest
      };

   });