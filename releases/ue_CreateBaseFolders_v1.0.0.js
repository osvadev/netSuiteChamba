/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file'],

    /**
     * 
     * @param {*} record 
     * @param {*} search 
     * @param {*} file 
     */

    function (record, search, file) {

        function beforeLoad(context) {

        }

        function beforeSubmit(context) {

        }

        /**
         * 
         * @param {*} context // Contexto actual de trabajo
         */

        function afterSubmit(context) {
            var currentRecord = context.newRecord;
            var prefijo = currentRecord.getValue({ fieldId: 'custevent70' });

            if ((prefijo == "12") && (context.type == 'create')) {
                var companyId = currentRecord.getValue({ fieldId: 'company' });
                var cliente = record.load({ type: 'customer', id: companyId });
                var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                var sucursal = cliente.getValue({ fieldId: 'custentity25' });
                var clienteId = cliente.getValue({ fieldId: 'entityid' });
                var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                //var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
                //log.error('subsidiaryText: ', subsidiaryText); //Muestra la subsidiaria del paciente

                // Validación para proceso de creación automatico de folders por subsidiaria
                // México = 6
                // Brasil = 11
                // Colombia = 10
                // España = 12
                // Eominicana = 16
                // Dallas = 15
                //You can comment for remove all subsidiarys
                //Comment only for Meixco subsidiary
                //if (subsidiary == "6") {

                if (subsidiary == "6" || subsidiary == "11" || subsidiary == "10" || subsidiary == "12" || subsidiary == "16" || subsidiary == "15") {

                    var boolSuc = false;

                    // Busqueda el nombre del folder de la sucursal
                    search.create({
                        type: search.Type.FOLDER,
                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                        columns: ['internalid']
                    }).run().each(function (result) {
                        folderId = result.getValue({ name: 'internalid' });
                    });

                    if (folderId != null) {
                        boolSuc = true;
                    }

                    if (boolSuc == false) {
                        log.debug('El cliente registrado no tiene una Sucursal registrada: ' + cliente);
                        //log.debug('Sucursal Mexico fuera del Try: ', folderid);
                    }

                    try {
                        log.debug('SucursalId: ', folderId);
                        log.debug('ClienteId: ', clienteId);
                        //log.debug('Mi datos de página:', sucursalId_Search);
                        /**
                        * SOBREESCRITURA DE VARIABLES PARA REALIZAR PRUEBAS
                        * folderSucursalId_test => id carpeta de sucursal {int}
                        * clienteId => id de cliente {string} --> ejemplo HG-70494
                        * 
                        */
                        //var folderSucursalId_test = 1569113; //suple folderid
                        //var clienteId_test = "TEST-70494"; // suple clienteIdText

                        /** AUTOMATION: CREATE FOLDER OF CLIENT
                         * Creación de folder de cliente al crear el evento de valoracion
                         * folderid => variable que indica el id del folder de la sucursal
                         * clienteId => variable que para el texto del id del cliente
                         */
                        var createFolderC = record.create({
                            type: record.Type.FOLDER,
                            isDynamic: true
                        });
                        createFolderC.setValue({
                            fieldId: 'parent',
                            value: folderId
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

        return {
            //beforeLoad: beforeLoad, //carga la funcion beforeLoad que se usa antes de que la pagina sea cargada
            //beforeSubmit: beforeSubmit, // carga la funcion beforeSubmit se usa después de que el registro sea enviado
            afterSubmit: afterSubmit // carga la funcion afterSubmit se usa antes de que el registro sea enviado
        };
    });