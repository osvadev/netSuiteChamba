/**
 * Suitelet that changes the PO Form Type
 */
// *********************************************************************************************************

function crearPDFCaso(valid){
    try
    {

        var logo = "https://system.na2.netsuite.com/core/media/media.nl?id=1586838&c=3559763&h=c9885abe8bc213e27887";
        //Receta
        var inRecord = nlapiLoadRecord('supportcase', valid);
        var type_alop = inRecord.getFieldValue('custevent294');
        var company = inRecord.getFieldValue('company');
        var client = nlapiLoadRecord("customer", company);
        var cliente = client.getFieldValue("subsidiary");
        var cie = inRecord.getFieldText('custevent290');
        var DCDOA1 = inRecord.getFieldValue('custevent303');
        var casenumberText = inRecord.getFieldValue('casenumber');
        var imageURLpredefinida = "https://system.na2.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4";
        var imageURL = null;
        var imageDiagram = null;
        var idImg = null;
      
        var imagePinturaCabeza_Base64 = inRecord.getFieldValue('custevent511');
        if(imagePinturaCabeza_Base64 != null && imagePinturaCabeza_Base64 != "")
        {
          try{
             var tryLoadFile = nlapiLoadFile('Images/Imagenes Zonas Cabeza/' + valid + '_' + casenumberText + '_ImagenZonasCabezaFull.png');
             if(tryLoadFile)
             {
               idImg = tryLoadFile.getId();
               nlapiLogExecution('debug', 'tryLoadFile.getId() _ tryLoadFile.getName(): ', tryLoadFile.getId() + ' _ ' + tryLoadFile.getName());
             }
		   }catch(err){
            nlapiLogExecution('debug', 'Exception err: ', err);
            //imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + nlapiEscapeXML(imageURLpredefinida) + "\"/>";
           }

          if(idImg != null)
          {
             imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + nlapiEscapeXML(imagePinturaCabeza_Base64) + "\"/>";
          }
          else
          {
              var pngCabeza_base64 = imagePinturaCabeza_Base64.replace("data:image/png;base64,", "");
              var newImageFile = nlapiCreateFile(valid + '_' + casenumberText + '_ImagenZonasCabezaFull.png', 'PNGIMAGE', pngCabeza_base64);
              newImageFile.setFolder('1572868');
              //newFile.setEncoding('UTF-8');
              var imagePinturaId = nlapiSubmitFile(newImageFile);
              if(imagePinturaId)
              {
                var imgFile = nlapiLoadFile(imagePinturaId);
                imageURL = imgFile.getURL();
                if(imageURL != null)
                  imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + nlapiEscapeXML(imagePinturaCabeza_Base64) + "\"/>";
                else
                  imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + nlapiEscapeXML(imageURLpredefinida) + "\"/>";
              }
           }
        }
        else
        {
          imageDiagram = "<img width=\"180px\" height=\"300px\" src=\"" + nlapiEscapeXML(imageURLpredefinida) + "\"/>";
        }

        var DCDOB1 = inRecord.getFieldValue('custevent302');
        var DCDOC1 = inRecord.getFieldValue('custevent301');
        var DCDOpro = inRecord.getFieldValue('custevent300');
        var DCZRA1 = inRecord.getFieldValue('custevent299');
        var DCZRB1 = inRecord.getFieldValue('custevent298');
        var DCZRC1 = inRecord.getFieldValue('custevent297');
        var DCZRpro = inRecord.getFieldValue('custevent296');
        var AreaZD = inRecord.getFieldValue('custevent304');
        var AreaZDA = inRecord.getFieldValue('custevent305');
        var AreaZDB = inRecord.getFieldValue('custevent306');
        var AreaZDC = inRecord.getFieldValue('custevent307');
        var AreaZD2 = inRecord.getFieldValue('custevent308');
        var type_alop_text = inRecord.getFieldText('custevent309');
        var type_razurado = inRecord.getFieldText('custevent311');
        var type_razurado = inRecord.getFieldText('custevent311');
        var patologi = inRecord.getFieldValue('custevent310');
        var fecha = inRecord.getFieldValue('custevent276');
        var procedimientos = inRecord.getFieldValue('custevent277');
        var tiras = inRecord.getFieldValue('custevent278');
        var tipoDiag = inRecord.getFieldText('custevent284');

        var image_valoration1 = inRecord.getFieldValue('custevent313');
        if(image_valoration1 != null && image_valoration1 != "") {
            var file_image1 = nlapiLoadFile(image_valoration1);
            var image_url1 = file_image1.getValue();
            var img_val_1 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url1) + "\"/>";
        }else{
            //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image1 = nlapiLoadFile("1592235");
            var image_url1 = file_image1.getValue();
            var img_val_1 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url1) + "\"/>";
        }

        var image2_microcamara = inRecord.getFieldValue('custevent314');
        if(image2_microcamara != null && image2_microcamara != ""){
            var file_image2 = nlapiLoadFile(image2_microcamara);
            var image_url2 = file_image2.getValue();
            var img_val_2 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url2) + "\"/>";
        }else{
            //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image2 = nlapiLoadFile("1592235");
            var image_url2 = file_image2.getValue();
            img_val_2 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url2) + "\"/>";
        }

        var image_valoration3 = inRecord.getFieldValue('custevent315');
        if(image_valoration3 != null && image_valoration3 != "") {
            var file_image3 = nlapiLoadFile(image_valoration3);
            var image_url3 = file_image3.getValue();
            var img_val_3 = "<img height=\"200px\" width=\"200px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url3) + "\"/>";
        }else{
            //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image3 = nlapiLoadFile("1592235");
            var image_url3 = file_image3.getValue();
            var img_val_3 = "<img height=\"200px\" width=\"200px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url3) + "\"/>";
        }

        var image_valoration4 = inRecord.getFieldValue('custevent316');
        if(image_valoration4 != null && image_valoration4 != "") {
            var file_image4 = nlapiLoadFile(image_valoration4);
            var image_url4 = file_image4.getValue();
            var img_val_4 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url4) + "\"/>";
        }else{
            //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            var file_image4 = nlapiLoadFile("1592235");
            var image_url4 = file_image4.getValue();
            var img_val_4 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url4) + "\"/>";
        }

        //IMAGEN DE VALORACIÓN NUMERO 4 EN FORMATO AMPLIO PARA SECCIÓN ZONA A TRABAJAR
        var image_zonaTrabajar4 = inRecord.getFieldValue('custevent316');
        if(image_zonaTrabajar4 != null && image_zonaTrabajar4 != "") {
            var file_image_zona4 = nlapiLoadFile(image_zonaTrabajar4);
            var image_zonaTrabajar_url4 = file_image_zona4.getValue();
            var img_zona_4 = "<img height=\"600px\" width=\"600px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_zonaTrabajar_url4) + "\"/>";
        }else{
            var file_image_zona4 = nlapiLoadFile("1592235");
            var image_zonaTrabajar_url4 = file_image_zona4.getValue();
            var img_zona_4 = "<img height=\"600px\" width=\"600px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_zonaTrabajar_url4) + "\"/>";
        }

        var observaciones = inRecord.getFieldValue('custevent279');
        var idx = inRecord.getFieldValue('custevent281');
        var tx = inRecord.getFieldValue('custevent280');
        var companyVal = inRecord.getFieldValue('company');
        var cliRecord = nlapiLoadRecord('customer', companyVal);
        var name = cliRecord.getFieldValue('altname');
        //var med1 = inRecord.getFieldValue('custevent177');
        var medS = inRecord.getFieldValue('custevent2');
        var nameMedico = inRecord.getFieldText('custevent322');

        var pngEmpty = "data:image/png;base64,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";
        
      var image1_microcamara = inRecord.getFieldValue('custevent333');
      if(image1_microcamara != null && image1_microcamara != "") {
          var file_image1_microcamara = nlapiLoadFile(image1_microcamara);
          var image1_microcamara_url = file_image1_microcamara.getValue();
          var img_micro_val_1 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image1_microcamara_url) + "\"/>";
       }else{
          //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
          var file_image1_microcamara = nlapiLoadFile("1592235");
          var image1_microcamara_url = file_image1_microcamara.getValue();
          var img_micro_val_1 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image1_microcamara_url) + "\"/>";
       }

       var image2_microcamara = inRecord.getFieldValue('custevent334');
       if(image2_microcamara != null && image2_microcamara != ""){
          var file_image2_microcamara = nlapiLoadFile(image2_microcamara);
          var image2_microcamara_url = file_image2_microcamara.getValue();
          var img_micro_val_2 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image2_microcamara_url) + "\"/>";
       }else{
          //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
          var file_image2_microcamara = nlapiLoadFile("1592235");
          var image2_microcamara_url = file_image2_microcamara.getValue();
          img_micro_val_2 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image2_microcamara_url) + "\"/>";
       }

       var image3_microcamara = inRecord.getFieldValue('custevent335');
       if(image3_microcamara != null && image3_microcamara != "") {
          var file_image3_microcamara = nlapiLoadFile(image3_microcamara);
          var image3_microcamara_url = file_image3_microcamara.getValue();
          var img_micro_val_3 = "<img height=\"275px\" width=\"275px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image3_microcamara_url) + "\"/>";
        }else{
          //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
          var file_image3_microcamara = nlapiLoadFile("1592235");
          var image3_microcamara_url = file_image3.getValue();
          var img_micro_val_3 = "<img height=\"275px\" width=\"275px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image3_microcamara_url) + "\"/>";
        }

        var image4_microcamara = inRecord.getFieldValue('custevent336');
        if(image4_microcamara != null && image4_microcamara != "") {
          var file_image4_microcamara = nlapiLoadFile(image4_microcamara);
          var image4_microcamara_url = file_image4_microcamara.getValue();
          var img_micro_val_4 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image4_microcamara_url) + "\"/>";
        }else{
          //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
          var file_image4_microcamara = nlapiLoadFile("1592235");
          var image4_microcamara_url = file_image4_microcamara.getValue();
          var img_micro_val_4 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image4_microcamara_url) + "\"/>";
        }


        var diagnosticoFirmaPacienteBase64 = inRecord.getFieldValue('custevent325');
        if(diagnosticoFirmaPacienteBase64 == null || diagnosticoFirmaPacienteBase64 == ""){
            diagnosticoFirmaPacienteBase64 = pngEmpty;
        }else{
            if(diagnosticoFirmaPacienteBase64.substring(0,3) == "ok_")
                diagnosticoFirmaPacienteBase64 = diagnosticoFirmaPacienteBase64.substring(3, diagnosticoFirmaPacienteBase64.length);
        }

        var diagnosticoFirmaMedicoBase64 = inRecord.getFieldValue('custevent326');
        if(diagnosticoFirmaMedicoBase64 == null || diagnosticoFirmaMedicoBase64 == ""){
            diagnosticoFirmaMedicoBase64 = pngEmpty;
        }else{
            if(diagnosticoFirmaMedicoBase64.substring(0,3) == "ok_")
                diagnosticoFirmaMedicoBase64 = diagnosticoFirmaMedicoBase64.substring(3, diagnosticoFirmaMedicoBase64.length);
        }

        var fotosValoracionFirmaPacienteBase64 = inRecord.getFieldValue('custevent330');
        if(fotosValoracionFirmaPacienteBase64 == null || fotosValoracionFirmaPacienteBase64 == ""){
            fotosValoracionFirmaPacienteBase64 = pngEmpty;
        }else{
            if(fotosValoracionFirmaPacienteBase64.substring(0,3) == "ok_")
                fotosValoracionFirmaPacienteBase64 = fotosValoracionFirmaPacienteBase64.substring(3, fotosValoracionFirmaPacienteBase64.length);
        }


        //21: Santa Fe, 22: Altavista, 23: Guadalajara, 24: Monterrey, 25: Polanco, 26: Satéllite, 27: Tijuana, 28: Veracruz, 36: Chihuahua, 37: Puebla, 35: Cancún

        if(medS=='21'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
            var Sucur='SN';
        }else if(medS=='22'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
            var Sucur='AL';
        }
        else if(medS=='23'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
            var Sucur='GU';
        }
        else if(medS=='24'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
            var Sucur='MO';
        }
        else if(medS=='25'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
            var Sucur='PO';
        }
        else if(medS=='26'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
            var Sucur='ST';
        }
        else if(medS=='27'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
            var Sucur='TI';
        }
        else if(medS=='28'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            var Sucur='VE';
        }
        else if(medS=='36'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
            var Sucur='CH';
        }
        else if(medS=='37'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
            var Sucur='PU';
        }
        else if(medS=='35'){
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            var Sucur='CA';
        }else{
            var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        }

        var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >';
        xml += "<p></p><p></p><p></p><p></p><p></p>";

        xml += "<p width=\"28%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">DIAGNOSTICO CAPILAR</p>";

        xml += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
        xml += "<tr>";
        xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'11px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\"><b>Tipo, Clasificación AA, Densidad</b>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
        xml += "<tr>";
        xml += "<td width=\"30%\" align=\"center\">TIPO: <b>" + tipoDiag + "</b></td>";
        xml += "</tr>";
        xml += "</table >";

        xml += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
        xml += "<tr>";
        xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'11px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\"><b>Tipos de alopecia</b>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
        xml += "<tr>";
        xml += "<td width=\"35%\" align=\"left\">TIPO:&nbsp;<b>" + checado(type_alop_text) + "</b></td>";
        xml += "<td width=\"25%\" align=\"left\">RASURADO:&nbsp;<b>" + checado(type_razurado) + "</b></td>";
        xml += "<td width=\"40%\" align=\"left\">PATOLOGÍA:&nbsp;<b>" + checado(patologi) + "</b></td>";
        xml += "</tr>";
        xml += "</table >";

        xml += "<table><tr><td width=\"550\" style=\"align:center\"></td></tr></table>";

        xml += "<table style=\"font-family:'Aria', sans-serif\">";
        xml += "<tr>";
        xml += "<td style=\"align:lefth\">";
        xml += "<ul><li>DIAGRAMA DE CLASIFICACIÓN TIPO AA</li></ul>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";

        xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
        xml += "<tr>";
        xml += "<td width=\"78\">" + funt1(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt2(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt3(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt4(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt5(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt6(type_alop) + "</td>";
        xml += "<td width=\"78\">" + funt7(type_alop) + "</td>";
        xml += "</tr>";
        xml += "<tr >";
        xml += "<td align=\"center\"  width=\"78\">1</td>";
        xml += "<td align=\"center\"  width=\"78\">2</td>";
        xml += "<td align=\"center\"  width=\"78\">3</td>";
        xml += "<td align=\"center\"  width=\"78\">4</td>";
        xml += "<td align=\"center\"  width=\"78\">5</td>";
        xml += "<td align=\"center\"  width=\"78\">6</td>";
        xml += "<td align=\"center\"  width=\"78\">7</td>";
        xml += "</tr>";
        xml += "<tr>";
        //xml += "<td colspan=\"3\" style=\"align:lefth\">Grado:&nbsp;<b>" + checado(type_alop) + "</b></td>";
        if(cliente == '10'){
            xml += "<td colspan=\"4\" style=\"align:lefth\">CIE10:&nbsp;<b>" + checado(cie) + "</b></td>";
        }

        xml += "</tr>";
        xml += "</table>";

        xml += "<table style=\"font-family:'Aria', sans-serif\">";
        xml += "<tr>";
        xml += "<td style=\"align:lefth\">";
        xml += "<ul>";
        xml += "<li>REGISTRO DE EVALUACIÓN DE DENSIDAD";
        xml += "</li>";
        xml += "</ul>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table  border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";//
        xml += "<tr>";
        xml += "<td valign=\"middle\"  width=\"250\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante A1 </td>";
        xml += "<td valign=\"middle\" align=\"center\" width=\"95\"  border=\"1px\"><b>" + checado(DCDOA1) + "</b></td>";
        xml += "<td width=\"180\" height=\"300px\" align=\"center\" border=\"1px\" rowspan=\"8\">" + imageDiagram + " </td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante B1 </td>";
        xml += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>" + checado(DCDOB1) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante C1 </td>";
        xml += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>" + checado(DCDOC1) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante (PROMEDIO) </td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(DCDOpro) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora A </td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(DCZRA1) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora B </td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(DCZRB1) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora C </td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(DCZRC1) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora (PROMEDIO) </td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(DCZRpro) + "</b></td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table style=\"font-family:'Aria', sans-serif\" >";
        xml += "<tr>";
        xml += "<td style=\"align:lefth\" >";
        xml += "<ul>";
        xml += "<li>ÁREA DE MEDICIÓN";
        xml += "</li>";
        xml += "</ul>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona donante</td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(AreaZD) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora A</td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(AreaZDA) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora B</td>";
        xml += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>" + checado(AreaZDB) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora C</td>";
        xml += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>" + checado(AreaZDC) + "</b></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora</td>";
        xml += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>" + checado(AreaZD2) + "</b></td>";
        xml += "</tr>";
        xml += "</table>";
        xml += '<div style=\"page-break-after: always;\"></div>';
        xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';

        //IMAGENES VALORACION
        xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">IMAGENES VALORACION</p>";
        xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
        xml += "<tr>";
        xml += "<td width=\"50%\" align=\"center\">Zona donadora" + img_val_1 + "</td>";
        //xml += "<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
        xml += "<td width=\"50%\" align=\"center\">Frontal" + img_val_2 + "</td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td width=\"50%\" align=\"center\">Coronilla" + img_val_3 + "</td>";
        //xml += "<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
        xml += "<td width=\"50%\"  align=\"center\">Area a tratar" + img_val_4 + "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += '<br></br>';
        xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";
        xml += "<tr>";
        xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "<td width=\"300px\" align=\"center\" valign=\"middle\"><img src=\""+fotosValoracionFirmaPacienteBase64+"\" width=\"100\" height=\"100\" /></td>";
        xml += "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "<td width=\"300px\" align=\"center\" valign=\"middle\"><u> " + checado(name) + "</u></td>";
        xml += "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "<td width=\"300px\" align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>";
        xml += "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
        xml += "</tr>";
        xml += "</table>";
        xml += '<div style=\"page-break-after: always;\"></div>';
        xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';

        //IMAGENES MICROCAMARA
        xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FOTOS DE MICROCAMARA</p>";
        xml += '<br></br>';
        xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
        xml += "<tr>";
        xml += "<td width=\"50%\" align=\"center\">Imagen 1" + img_micro_val_1 + "</td>";
        xml += "<td width=\"50%\" align=\"center\">Imagen 2" + img_micro_val_2 + "</td>";
        xml += "</tr>";
        xml += "<tr>";
        xml += "<td width=\"50%\" align=\"center\">Imagen 3" + img_micro_val_3 + "</td>";
        xml += "<td width=\"50%\"  align=\"center\">Imagen 4" + img_micro_val_4 + "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += '<br></br>';
        xml += '<div style=\"page-break-after: always;\"></div>';
        xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';


        //ZONA A TRABAJAR
        xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">AREA A TRATAR</p>";
        xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
        xml += "<tr><td width=\"100%\" align=\"center\">"+img_zona_4+"</td></tr>";
        xml += "</table>";
        xml += '<div style=\"page-break-after: always;\"></div>';
        xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';


        //DIAGNOSTIVO TRATAMIENTO
        xml += "<p width=\"28%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">DIAGNOSTICO CAPILAR</p>";
        xml += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
        xml += "<tr>";
        xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'11px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\"><b>Exploración, diagnóstico y tratamiento</b>";
        xml += "</td>";
        xml += "</tr>";
        xml += "</table>";
        xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
        xml += "<tr>";
        xml += "<td width=\"30%\" align=\"center\">FECHA:&nbsp;<b>" + fecha + "</b></td>";
        xml += "<td width=\"40%\" align=\"center\">PROCEDIMIENTOS:&nbsp;<b>" + procedimientos + "</b></td>";
        xml += "<td width=\"30%\" align=\"center\">TIRAS:&nbsp;<b>" + tiras + "</b></td>";
        xml += "</tr>";
        xml += "</table >";
        xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
        xml += '<tr><td>Exploración y Hallazgos:</td></tr>';
        xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black"><b>'+observaciones+'</b></td></tr>';
        xml += '</table>';
        xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
        xml += '<tr><td>IDX:</td></tr>';
        xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black"><b>'+idx+'</b></td></tr>';
        xml += '</table>';
        xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
        xml += '<tr><td>TX:</td></tr>';
        xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black"><b>'+tx+'</b></td></tr>';
        xml += '</table>';
        //xml += '<br></br>';
        //xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
        //xml += "<tr>";
        //xml += "<td style=\"font-family:'Aria', sans-serif\" align=\"center\"><img src=\""+diagnosticoFirmaPacienteBase64+"\" width=\"100\" height=\"100\" />";
        //xml += "</td>";
        //xml += "<td style=\"font-family:'Aria', sans-serif\" align=\"center\"><img src=\""+diagnosticoFirmaMedicoBase64+"\" width=\"100\" height=\"100\" />";
        //xml += "</td>";
        //xml += "</tr>";
        //xml += "<tr>";
        //xml += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> " + checado(name) + "</u></td>";
        //xml += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> " + checado(nameMedico) + "</u></td>"; // checado(consultor_val)
        //xml += "</tr>";
        //xml += "<tr>";
        //xml += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma del Paciente</b></td>";
        //xml += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma</b></td>";
        //xml += "</tr>";
        //xml += "</table>";

        xml += '</body>\n</pdf>';

        fileXMLtoPDF = nlapiXMLToPDF(xml);
        return fileXMLtoPDF;
    }
    catch(error)
    {
        var msgError = error;
        //nlapiLogExecution('debug', 'title', JSON.stringify(med1));
        nlapiLogExecution('ERROR', 'title', msgError);
        return false;
    }
}


// *********************************************************************************************************
function gererarPDF(request, response)
{
    try
    {
        var id = request.getParameter('poid');
        nlapiLogExecution('DEBUG', 'PDF Recetas: ', 'Value request id parameter: ' + id);

        var result = crearPDFCaso(id);
        if(result !== false && result !== null)
        {
            nlapiLogExecution('AUDIT', 'function crearPDFCaso(): ', 'Receta creada correctamente!! Case id record: ' + id);
            response.setContentType('PDF','preview.pdf', 'inline');
            response.write(result.getValue());
        }else{
            nlapiLogExecution('ERROR', ' function crearPDFCaso(): ', 'Receta no creada!! Case id record: ' + id);
        }
    }
    catch(err2)
    {
        var msgError = err2;
        nlapiLogExecution('ERROR', 'Error gererarPDF function', msgError);
    }
}

// *********************************************************************************************************
function checado(checks) {
    var check = "";
    if (checks == "T") {
        var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
        check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path) + "\">probando</img>";
    }
    else {
        if (checks == "F") {
            var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
            check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path2) + "\"/>";
        } else {
            if (checks == null) {
                check = "";
            } else {
                check = checks;
            }
        }
    }
    return check;
}

function getFecha(){
    var valFecha = '';
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    return valFecha;
}

function funt1(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743291&c=3559763&h=1e56212e1db2d20cecd8";
    if (entero == 1) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt2(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743292&c=3559763&h=76fba8deb7014f71c1f7";
    if (entero == 2) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt3(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743293&c=3559763&h=7dec6caa816e21b8bc6e";
    if (entero == 3) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}

function funt4(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743294&c=3559763&h=1185d5785a0770214839";
    if (entero == 4) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt5(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743295&c=3559763&h=7a635732f3364dfd193f";
    if (entero == 5) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt6(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743296&c=3559763&h=2d035ee0a3af4a40b135";
    if (entero == 6) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt7(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743297&c=3559763&h=d1987980bf9f6bb72443";
    if (entero == 7) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
