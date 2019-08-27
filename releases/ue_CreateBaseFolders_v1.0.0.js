/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file'],

    function (record, search, file) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */

        function beforeLoad(context) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         */
        function beforeSubmit(context) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         */
        function afterSubmit(context) {
            var currentRecord = context.newRecord;
            var prefijo = currentRecord.getValue({ fieldId: 'custevent70' });
            //var companyId = currentRecord.getValue({ fieldId: 'company' });

            if ((prefijo == "12") && (context.type == 'create')) {
                //var currentRecord = context.newRecord;
                //var prefijo = currentRecord.getValue({ fieldId: 'custevent70' });
                var companyId = currentRecord.getValue({ fieldId: 'company' });
                var cliente = record.load({ type: 'customer', id: companyId });
                var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
                var sucursal = cliente.getValue({ fieldId: 'custentity25' });
                var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                var clienteId = cliente.getValue({ fieldId: 'entityid' });
                var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                //log.error('subsidiaryText: ', subsidiaryText);

                // Validación para proceso de creación automatico de folders por subsidiaria
                // México = 6
                // Brasil = 11
                // Colombia = 10
                // España = 12
                // Eominicana = 16
                // Dallas = 15
                if (subsidiary == "6") {

                    var boolSuc = false;

                    var mySearch = search.load({ id: "-2030" });
                    var myPagedData = mySearch.runPaged({ "pageSize": 30 });
                    myPagedData.pageRanges.forEach(function (pageRange) {
                        var myPage = myPagedData.fetch({ index: pageRange.index });
                        myPage.data.forEach(function (result) {
                            var jsonString = JSON.stringify(result);
                            var obj = JSON.parse(jsonString);
                            if (obj.hasOwnProperty("id")) {
                                var sucursalId_Search = obj.id;
                                if (sucursal === sucursalId_Search) {
                                    boolSuc = true;
                                    var name_Search = result.getValue({ name: 'name' });

                                    // Busqueda el nombre del folder de la sucursal
                                    search.create({
                                        type: search.Type.FOLDER,
                                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [name_Search + "_HAIR"] })],
                                        columns: ['internalid']
                                    }).run().each(function (result) {
                                        customerid = result.getValue({ name: 'internalid' });
                                    });
                                }
                            }
                        });
                    });

                    if (boolSuc == false)
                        log.debug('Sucursal no encontrada!!: ', 'Sucursal No. ' + sucursal + 'no esta registrada en la lista "Locations"');
                        log.debug('Sucursal Mexico fuera del Try: ', customerid);

                    try {
                        log.debug('SucursalId: ', customerid);
                        log.debug('ClienteId: ', clienteId);
                        /**
                        * SOBREESCRITURA DE VARIABLES PARA REALIZAR PRUEBAS
                        * folderSucursalId_test => id carpeta de sucursal {int}
                        * clienteId => id de cliente {string} --> ejemplo HG-70494
                        * 
                        */
                        //var folderSucursalId_test = 1569113; //suple customerid
                        //var clienteId_test = "TEST-70494"; // suple clienteIdText

                        /** AUTOMATION: CREATE FOLDER OF CLIENT
                         * Creación de folder de cliente al crear el evento de valoracion
                         * customerid => variable que indica el id del folder de la sucursal
                         * clienteId => variable que para el texto del id del cliente
                         */
                        var createFolderC = record.create({
                            type: record.Type.FOLDER,
                            isDynamic: true
                        });
                        createFolderC.setValue({
                            fieldId: 'parent',
                            value: customerid
                        });
                        createFolderC.setValue({
                            fieldId: 'name',
                            value: clienteIdText + "_FOLDER"
                        });
                        var folderClienteId = createFolderC.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });
                        //Creación del archivo por defecto NetSuiteInf.txt
                        createDefaultFile(folderClienteId);




                        /** AUTOMATION: CREATE FOLDERS OF REVISIONS
                         * Creación de folders automaticamente al crear el evento de valoracion
                         * Array: Folders => nombre de los folders base
                         * folderClienteId => variable que indica el id del folder del cliente
                         */
                        var fotosEnfermeria = clienteIdText + "_FOTOS_ENFERMERIA";
                        var fotosMicrocamara = clienteIdText + "_MICROCAMARA";
                        var folders = ['R24HORAS', 'R10DIAS', 'R1MES', 'R3MESES', 'R6MESES', 'R9MESES', 'R12MESES', 'R14MESES', 'Aparatología', 'TRATAMIENTOS', fotosEnfermeria, fotosMicrocamara];

                        for (numFolder in folders) {
                            var createFoldersR = record.create({
                                type: record.Type.FOLDER,
                                isDynamic: true
                            });
                            createFoldersR.setValue({
                                fieldId: 'parent',
                                value: folderClienteId
                            });
                            createFoldersR.setValue({
                                fieldId: 'name',
                                value: folders[numFolder]
                            });
                            var folderRevisionId = createFoldersR.save({
                                enableSourcing: true,
                                ignoreMandatoryFields: true
                            });
                            //Creación del archivo por defecto NetSuiteInf.txt
                            createDefaultFile(folderRevisionId);

                            //Creación del folder Microcamara para las carpetas de revisión
                            if (numFolder <= 7) {
                                var createFoldersM = record.create({
                                    type: record.Type.FOLDER,
                                    isDynamic: true
                                });
                                createFoldersM.setValue({
                                    fieldId: 'parent',
                                    value: folderRevisionId
                                });
                                createFoldersM.setValue({
                                    fieldId: 'name',
                                    value: "MC" + (parseInt(numFolder) + 1)
                                });
                                var folderMicroId = createFoldersM.save({
                                    enableSourcing: true,
                                    ignoreMandatoryFields: true
                                });
                                //Creación del archivo por defecto NetSuiteInf.txt
                                createDefaultFile(folderMicroId);
                            }
                        };
                    } catch (error) {
                        log.error("Exception: ", error);
                    }




                }
            }
            //Función para la creación del archivo por defecto NetSuiteInf.txt
            function createDefaultFile(folderParent) {
                var createDefaultFile = file.create({
                    name: 'NetSuiteInf.txt',
                    fileType: file.Type.PLAINTEXT,
                    contents: 'Archivo creado por script',
                    encoding: file.Encoding.UTF8,
                    folder: folderParent
                });
                var NetSuiteInfId = createDefaultFile.save();

                return NetSuiteInfId;
            }
        };

        return {
            //beforeLoad: beforeLoad,
            //beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };
    });