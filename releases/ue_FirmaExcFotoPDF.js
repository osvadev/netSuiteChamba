/**
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  * @NModuleScope Public
  */

 define(['N/record', 'N/file'], function(record, file) {
    var imgURLcliente = null;
   function beforeLoad(context) {
     if (context.type == 'view'){
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true});
        var customForm = objRecord.getValue({fieldId: 'customform'});
       	var casenumber = objRecord.getValue({fieldId: 'casenumber'});
        var diagnosticoFirmaPacienteBase64 = objRecord.getValue({fieldId: 'custevent325'});
       	var diagnosticoFirmaMedicoBase64 = objRecord.getValue({fieldId: 'custevent326'});
        var fotosValoracionFirmaPacienteBase64 = objRecord.getValue({fieldId: 'custevent330'});
        var diagnosticoFirmaPacienteURL = objRecord.getValue({fieldId: 'custevent320'});
        var diagnosticoFirmaMedicoURL = objRecord.getValue({fieldId: 'custevent321'});
        var fotosValoracionFirmaPacienteURL = objRecord.getValue({fieldId: 'custevent329'});

    if(customForm == "135")//Diagnóstico
    {
      if(field_firmaClienteBase64 == "" && field_linkFirmaCliente == ""){
          context.form.addButton({
               id: "custpage_excfotopdf",
                label: "Exc. Fotografía",
                functionName: "onClickButton"
             });
          context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
      }
    }

    if(field_firmaClienteBase64 != "" && field_linkFirmaCliente == "")
    {
       var field_casenumber = context.newRecord.getValue({fieldId: 'casenumber'});
       var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
       log.debug("img_base64:", img_base64);

       var fol = -4;
       var fileObj = file.create({name: field_casenumber + " Firma contrato.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false});
       var fileId = fileObj.save();

       var fileObjImage = file.load({id:fileId});
       imgURLcliente = fileObjImage.url;

       log.debug('imgURLcliente:', imgURLcliente);
       objRecord.setValue({fieldId: 'custevent339', value: imgURLcliente});
       objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
    }

   }
 }

return {
  beforeLoad: beforeLoad
};
});
