/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record', 'N/file'], function (record, file) {

    function beforeLoad(context) {
        if (context.type == "view") {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
            var customForm = objRecord.getValue({ fieldId: 'customform' });
            var casenumber = objRecord.getValue({ fieldId: 'casenumber' });
            var exclusionFotoPacienteBase64 = objRecord.getValue({ fieldId: 'custevent516' });
            var exclusionFotoPacienteURL = objRecord.getValue({ fieldId: 'custevent515' });



            if (customForm == "135") // Diagnóstico
            {                                               
                if ((exclusionFotoPacienteURL == "") || (exclusionFotoPacienteURL == null)) {
                    if (exclusionFotoPacienteBase64 == "" || exclusionFotoPacienteBase64 == null) {

/*                         context.form.addButton({
                            id: "custpage_excfotopdf",
                            label: "Exc. Fotografía",
                            functionName: "onButtonClick"
                        });
                        context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
                         var okVal = exclusionFotoPacienteBase64.substring(0, 7);
                        
                        if (okVal != "ok_data") {
                            var pngFirmaPaciente_base64 = exclusionFotoPacienteBase64.replace("data:image/png;base64,", "");
                            var fol = -4;
                            var fileObj = file.create({ name: casenumber + "_Exclusion_Firma Paciente.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaPaciente_base64, isOnline: false });
                            var pngFirmaPaciente_fileId = fileObj.save();
                            var pngFirmaPaciente_fileObjImage = file.load({ id: pngFirmaPaciente_fileId });
                            var pngFirmaPacienteURL = pngFirmaPaciente_fileObjImage.url;

                            objRecord.setValue({ fieldId: "custevent515", value: pngFirmaPacienteURL });
                            var exclusionFotoPacienteBase64_newValBase64 = "ok_" + exclusionFotoPacienteBase64;
                            objRecord.setValue({ fieldId: "custevent516", value: exclusionFotoPacienteBase64_newValBase64 });

                            objRecord.save({ enableSourcing: true, ignoreMandatoryFields: false }); */
                        }
                    } else {

                        context.form.addButton({
                            id: "custpage_excfotopdf",
                            label: "Firm. Exc. Fotografía",
                            functionName: "onButtonClick"
                        });
                        context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
                    }

                }
            }
        }

    return {
        beforeLoad: beforeLoad
    };

});