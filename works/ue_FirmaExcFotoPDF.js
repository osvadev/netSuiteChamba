/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record'], function (record) {

    function beforeLoad(context) {
        if (context.type == "view") {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false });
            var customForm = objRecord.getValue({ fieldId: 'customform' });
            //log.error("customForm: ", customForm);

            if (customForm == "135") // Diagnóstico
            {
                context.form.addButton({ id: "custpage_excfotopdf", label: "Firm. Exc. Fotografía", functionName: "onButtonClick" });
                context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
            }
        }
    }
    return {
        beforeLoad: beforeLoad
    };
});