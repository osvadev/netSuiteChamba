/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record','N/log','N/render','N/xml', 'N/file'],

    function(record,log,render,xmlMod,file) {

        function onRequest(context)
        {
            //log.debug('method: ', context.request.method);
            var recId = context.request.parameters.recId;
            var caso = record.load({type: 'supportcase', id: recId});
            var sucursal = caso.getValue({fieldId: 'custevent2'});
            var imageBack = getImageBackGround(sucursal);
            var companyId = caso.getValue({fieldId: 'company'});

            var cliente = record.load({type: 'customer', id: companyId});
            var Num_pros = cliente.getValue('custentity158');
            var Num_tiras = cliente.getValue('custentity159');
            var edad = cliente.getValue('custentity149');
            var numExpediente = cliente.getValue({fieldId: 'entityid'});
            var cliente = cliente.getValue({fieldId: 'altname'});

            var fechaP = caso.getText({fieldId: 'startdate'});
            var unidadesF = caso.getText({fieldId: 'custevent_ns_cf_total_tt'});
            var terminoE = caso.getText({fieldId: 'custevent_termino_extraccion'});
            var terminoI = caso.getText({fieldId: 'custevent_termino_implantacion'});
            var inicioE = caso.getText({fieldId: 'custevent_inicio_extraccion'});
            var inicioI = caso.getText({fieldId: 'custevent_inicio_implantacion'});
            var incidentes = caso.getText({fieldId: 'custevent14'});
            var equipoM = caso.getText({fieldId: 'custevent29'});
            var ta = caso.getText({fieldId: 'custevent11'});
            var fc = caso.getText({fieldId: 'custevent12'});
            var fr = caso.getText({fieldId: 'custevent13'});
            var FOLI_V_NV = caso.getText('custevent_ns_cf_total_tt');
            var proyectados = caso.getText('custevent74');
            var DATEPOST = caso.getText('custevent16');
            // var horas24 = checado(caso.getValue({fieldId: 'custevent254'}));

            // ESTADO DE CONCIENCIA Y FÍSICO
            //var familiarConPerdida = checado(caso.getValue({fieldId: 'custevent209'}));
            var alerta = caso.getText({fieldId: 'custevent94'});
            var orientado = caso.getText({fieldId: 'custevent95'});
            var consciente = caso.getText({fieldId: 'custevent89'});
            var tranquilo = caso.getText({fieldId: 'custevent90'});
            var ansioso = caso.getText({fieldId: 'custevent91'});
            var letargico = caso.getText({fieldId: 'custevent92'});
            var nervioso = caso.getText({fieldId: 'custevent93'});
            var otro = caso.getValue({fieldId: 'custevent96'});
            // SIGNOS VITALES
            var fcPre = caso.getValue({fieldId: 'custevent7'});
            var fcTrans = caso.getValue({fieldId: 'custevent8'});
            var fcPost = caso.getValue({fieldId: 'custevent9'});
            var taPre = caso.getValue({fieldId: 'custevent4'});
            var taTrans = caso.getValue({fieldId: 'custevent5'});
            var taPost = caso.getValue({fieldId: 'custevent6'});
            // TOMA DE FOTOGRAFÍAS
            var pf_Inicio = caso.getText({fieldId: 'custevent97'});
            var pf_Final = caso.getText({fieldId: 'custevent98'});
            // ANESTESIA
            var zd_Anestesico = caso.getValue({fieldId: 'custevent101'});
            var zd_Infiltro = caso.getValue({fieldId: 'custevent102'});
            var zd_Hinicio = caso.getText({fieldId: 'custevent99'});
            var zd_Hfinal= caso.getText({fieldId: 'custevent100'});
            var zi_Anestesico = caso.getValue({fieldId: 'custevent103'});
            var zi_Infiltro = caso.getValue({fieldId: 'custevent104'});
            var zi_Hinicio = caso.getText({fieldId: 'custevent105'});
            var zi_Hfinal= caso.getText({fieldId: 'custevent106'});
            // ANTISEPSIA
            var zd_Realizo = caso.getValue({fieldId: 'custevent107'});
            var zd_Region = caso.getText({fieldId: 'custevent108'});
            var zd_Antiseptico = caso.getValue({fieldId: 'custevent109'});
            var zi_Realizo = caso.getValue({fieldId: 'custevent112'});
            var zi_Region = caso.getText({fieldId: 'custevent111'});
            var zi_Antiseptico = caso.getValue({fieldId: 'custevent110'});
            // PRP
            var prp_Responsable = caso.getValue({fieldId: 'custevent113'});
            var prp_EquipoUtilizado = caso.getValue({fieldId: 'custevent122'});
            var prp_SitioDePuncion = caso.getValue({fieldId: 'custevent121'});
            var prp_NumeroDeIntentos = caso.getValue({fieldId: 'custevent123'});
            var prp_TubosObtenidos = caso.getValue({fieldId: 'custevent120'});
            var prp_CentrifugadosArpm = caso.getValue({fieldId: 'custevent119'});
            var prp_Tiempo = caso.getValue({fieldId: 'custevent118'});
            var prp_ResponsableDePRP = caso.getValue({fieldId: 'custevent117'});
            var prp_RegionPRP = caso.getValue({fieldId: 'custevent116'});
            var prp_ResponsableDePRP2 = caso.getValue({fieldId: 'custevent115'});
            var prp_RegionPRP2 = caso.getValue({fieldId: 'custevent114'});
            // PROCEDIMIENTO
            var pro_MedicoResponsable = caso.getText({fieldId: 'custevent28'});
            var pro_EnfermeroResponsable = caso.getText({fieldId: 'custevent29'});
            var pro_ResponsableTricotomia = caso.getValue({fieldId: 'custevent75'});
            var pro_Tipo = caso.getText({fieldId: 'custevent27'});
            var pro_ResponsableExtraccion = caso.getText({fieldId: 'custevent71'});
            var pro_HoraInicio = caso.getText({fieldId: 'custevent_inicio_extraccion'});
            var pro_HoraTermino = caso.getText({fieldId: 'custevent_termino_extraccion'});
            var pro_HoraInicio2 = caso.getText({fieldId: 'custevent_inicio_corte'});
            var pro_HoraTermino2 = caso.getText({fieldId: 'custevent_termino_corte'});
            var pro_ResponsableImplantacion = caso.getText({fieldId: 'custevent72'});
            var pro_HoraInicio3 = caso.getText({fieldId: 'custevent_inicio_implantacion'});
            var pro_HoraTermino3 = caso.getText({fieldId: 'custevent_termino_implantacion'});
            // CONTROL DE CORTE
            var controlDeCorte = null;
            var totUnidadesFoliculares = caso.getValue({fieldId: 'custevent_ns_cuf_total'});
            var recmachcustrecord_control_corte_Lines = caso.getLineCount({sublistId : 'recmachcustrecord_control_corte'});
            if(recmachcustrecord_control_corte_Lines > 0)
            {
                for (var i = 0; i < recmachcustrecord_control_corte_Lines; i++)
                {
                    var sublist_enfermera = caso.getSublistValue({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_enfermera_display', line:i});
                    var sublist_hora1 = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_hora1_cc', line:i});
                    var sublist_hora2 = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_hora2_cc', line:i});
                    var sublist_hora3 = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_hora3_cc', line:i});
                    var sublist_hora4 = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_hora4_cc', line:i});
                    var sublist_hora5 = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_hora5_cc', line:i});
                    var sublist_subtotal = caso.getSublistText({sublistId:'recmachcustrecord_control_corte', fieldId:'custrecord_subtotal_cc', line:i});
                    controlDeCorte += '<tr>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_enfermera+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora1+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora2+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora3+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora4+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora5+'</td>';
                    controlDeCorte += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_subtotal+'</td>';
                    controlDeCorte += '</tr>';
                }
            }
            // CONTEO FOLICULAR
            var conteoFol_1hDoctor = "";
            var conteoFol_1hVisibles = null;
            var conteoFol_1hNoVisibles = null;
            var conteoFol_1hTotal = 0;
            var conteoFol_1hPorcentaje = "0%";
            var conteoFol_2hDoctor = "";
            var conteoFol_2hVisibles = null;
            var conteoFol_2hNoVisibles = null;
            var conteoFol_2hTotal = 0;
            var conteoFol_2hPorcentaje = "0%";
            var conteoFol_3hDoctor = "";
            var conteoFol_3hVisibles = null;
            var conteoFol_3hNoVisibles = null;
            var conteoFol_3hTotal = 0;
            var conteoFol_3hPorcentaje = "0%";
            var conteoFol_4hDoctor = "";
            var conteoFol_4hVisibles = null;
            var conteoFol_4hNoVisibles = null;
            var conteoFol_4hTotal = 0;
            var conteoFol_4hPorcentaje = "0%";
            var conteoFol_5hDoctor = "";
            var conteoFol_5hVisibles = null;
            var conteoFol_5hNoVisibles = null;
            var conteoFol_5hTotal = 0;
            var conteoFol_5hPorcentaje = "0%";
            var recmachcustrecord_nro_cfs_Lines = caso.getLineCount({sublistId : 'recmachcustrecord_nro_cfs'});
            if(recmachcustrecord_nro_cfs_Lines > 0)
            {
                for (var i = 0; i < 1; i++)
                {
                    conteoFol_1hVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs', fieldId:'custrecord_una_hora_cf', line:i});
                    conteoFol_2hVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs', fieldId:'custrecord_dos_horas_cf', line:i});
                    conteoFol_3hVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs', fieldId:'custrecord_tres_horas_cf', line:i});
                    conteoFol_4hVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs', fieldId:'custrecord_cuatro_horas_cf', line:i});
                    conteoFol_5hVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs', fieldId:'custrecord_cinco_horas_cf', line:i});
                }
            }
            var recmachcustrecord_nro_cfs_nv_Lines = caso.getLineCount({sublistId : 'recmachcustrecord_nro_cfs_nv'});
            if(recmachcustrecord_nro_cfs_nv_Lines > 0)
            {
                for (var i = 0; i < 1; i++)
                {
                    conteoFol_1hNoVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs_nv', fieldId:'custrecord_una_hora_cf_nv', line:i});
                    conteoFol_2hNoVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs_nv', fieldId:'custrecord_dos_horas_cf_nv', line:i});
                    conteoFol_3hNoVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs_nv', fieldId:'custrecord_tres_horas_cf_nv', line:i});
                    conteoFol_4hNoVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs_nv', fieldId:'custrecord_cuatro_horas_cf_nv', line:i});
                    conteoFol_5hNoVisibles = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cfs_nv', fieldId:'custrecord_cinco_horas_cf_nv', line:i});
                }
            }
            conteoFol_1hTotal = conteoFol_1hVisibles + conteoFol_1hNoVisibles;
            conteoFol_2hTotal = conteoFol_2hVisibles + conteoFol_2hNoVisibles;
            conteoFol_3hTotal = conteoFol_3hVisibles + conteoFol_3hNoVisibles;
            conteoFol_4hTotal = conteoFol_4hVisibles + conteoFol_4hNoVisibles;
            conteoFol_5hTotal = conteoFol_5hVisibles + conteoFol_5hNoVisibles;
            // CONTEO UNIDADES FOLICULARES
            var conteoUnidadesFoliculares = null;
            var sumHora1 = 0;
            var sumHora2 = 0;
            var sumHora3 = 0;
            var sumHora4 = 0;
            var sumHora5 = 0;
            var totalHr = 0;
            var contHr = 0;
            var hoyos = caso.getValue({fieldId: 'custevent_ns_cf_total_tt'});
            var recmachcustrecord_nro_cf_Lines = caso.getLineCount({sublistId : 'recmachcustrecord_nro_cf'});
            if(recmachcustrecord_nro_cf_Lines > 0)
            {
                for (var i = 0; i < recmachcustrecord_nro_cf_Lines; i++)
                {
                    var sublist_hora1 = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_una_hora', line:i});
                    var sublist_hora2 = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_dos_horas', line:i});
                    var sublist_hora3 = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_tres_horas', line:i});
                    var sublist_hora4 = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_cuatro_horas', line:i});
                    var sublist_hora5 = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_cinco_horas', line:i});
                    sumHora1 += sublist_hora1;
                    sumHora2 += sublist_hora2;
                    sumHora3 += sublist_hora3;
                    sumHora4 += sublist_hora4;
                    sumHora5 += sublist_hora5;
                    contHr++;
                }
                totalHr = sumHora1 + sumHora2 + sumHora3 + sumHora4 + sumHora5;
                contHr = contHr + 1;
                for (var i = 0; i < recmachcustrecord_nro_cf_Lines; i++)
                {
                    var sublist_foliculosPorUnidad = caso.getSublistValue({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_nro_cuf', line:i});
                    var sublist_hora1 = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_una_hora', line:i});
                    var sublist_hora2 = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_dos_horas', line:i});
                    var sublist_hora3 = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_tres_horas', line:i});
                    var sublist_hora4 = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_cuatro_horas', line:i});
                    var sublist_hora5 = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_cinco_horas', line:i});
                    var sublist_subtotal = caso.getSublistText({sublistId:'recmachcustrecord_nro_cf', fieldId:'custrecord_cf_sub_total', line:i});
                    conteoUnidadesFoliculares += '<tr>';
                    conteoUnidadesFoliculares += '<td border="1" style="width:5%;background-color:#FFFFFF;align:center;">'+sublist_foliculosPorUnidad+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora1+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora2+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora3+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora4+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_hora5+'</td>';
                    conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sublist_subtotal+'</td>';
                    if(i == 0){
                        conteoUnidadesFoliculares += '<td rowspan="'+contHr+'" valign="middle" border="1" style="background-color:#FFFFFF;align:center;">'+totalHr+'</td>';
                    }
                    conteoUnidadesFoliculares += '</tr>';
                }
                conteoUnidadesFoliculares += '<tr>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;"></td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sumHora1+'</td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sumHora2+'</td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sumHora3+'</td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sumHora4+'</td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;">'+sumHora5+'</td>';
                conteoUnidadesFoliculares += '<td border="1" style="background-color:#FFFFFF;align:center;"></td>';
                conteoUnidadesFoliculares += '</tr>';
            }
            // DISEÑO EN SALA DE PROCEDIMIENTO
            var diseno_Img1_Val = caso.getValue({fieldId: 'custevent82'});
            if(diseno_Img1_Val == "" || diseno_Img1_Val == null)
                diseno_Img1_Val = "1592235";

            var diseno_Img1 = file.load({id: diseno_Img1_Val});
            var diseno_Img1_url = "data:image/png;base64," + diseno_Img1.getContents();

            var diseno_Img2_Val = caso.getValue({fieldId: 'custevent83'});
            if(diseno_Img2_Val == "" || diseno_Img2_Val == null)
                diseno_Img2_Val = "1592235";

            var diseno_Img2 = file.load({id: diseno_Img2_Val});
            var diseno_Img2_url = "data:image/png;base64," + diseno_Img2.getContents();

            var diseno_Img3_Val = caso.getValue({fieldId: 'custevent84'});
            if(diseno_Img3_Val == "" || diseno_Img3_Val == null)
                diseno_Img3_Val = "1592235";

            var diseno_Img3 = file.load({id: diseno_Img3_Val});
            var diseno_Img3_url = "data:image/png;base64," + diseno_Img3.getContents();

            var diseno_Img4_Val = caso.getValue({fieldId: 'custevent85'});
            if(diseno_Img4_Val == "" || diseno_Img4_Val == null)
                diseno_Img4_Val = "1592235";

            var diseno_Img4 = file.load({id: diseno_Img4_Val});
            var diseno_Img4_url = "data:image/png;base64," + diseno_Img4.getContents();

            ////FIRMAS

            var avisoPrivacidadbase64 = caso.getValue({fieldId: 'custevent325'});
            if(avisoPrivacidadbase64 != "" && avisoPrivacidadbase64 != null)
            {
                if(avisoPrivacidadbase64.substring(0,3) == "ok_")
                    avisoPrivacidadbase64 = avisoPrivacidadbase64.substring(3,avisoPrivacidadbase64.length);
            }
            else
            {
                avisoPrivacidadbase64 = "#";
            }

            var avisoPrivacidadbase64MED = caso.getValue({fieldId: 'custevent326'});
            if(avisoPrivacidadbase64MED != "" && avisoPrivacidadbase64MED != null)
            {
                if(avisoPrivacidadbase64MED.substring(0,3) == "ok_")
                    avisoPrivacidadbase64MED = avisoPrivacidadbase64MED.substring(3,avisoPrivacidadbase64MED.length);
            }
            else
            {
                avisoPrivacidadbase64MED = "#";
            }

            // IMG CASO DE PROCEDIMIENTOS
            var diseno_Img1_ValIMG = caso.getValue({fieldId: 'custevent76'});
            if(diseno_Img1_ValIMG == "" || diseno_Img1_ValIMG == null)
                diseno_Img1_ValIMG = "1592235";

            var diseno_Img1IMG = file.load({id: diseno_Img1_ValIMG});
            var diseno_Img1_urlIMG = "data:image/png;base64," + diseno_Img1IMG.getContents();

            var diseno_Img2_ValIMG = caso.getValue({fieldId: 'custevent77'});
            if(diseno_Img2_ValIMG == "" || diseno_Img2_ValIMG == null)
                diseno_Img2_ValIMG = "1592235";

            var diseno_Img2IMG = file.load({id: diseno_Img2_ValIMG});
            var diseno_Img2_urlIMG = "data:image/png;base64," + diseno_Img2IMG.getContents();

            var diseno_Img3_ValIMG = caso.getValue({fieldId: 'custevent78'});
            if(diseno_Img3_ValIMG == "" || diseno_Img3_ValIMG == null)
                diseno_Img3_ValIMG = "1592235";

            var diseno_Img3IMG = file.load({id: diseno_Img3_ValIMG});
            var diseno_Img3_urlIMG = "data:image/png;base64," + diseno_Img3IMG.getContents();

            var diseno_Img4_ValIMG = caso.getValue({fieldId: 'custevent81'});
            if(diseno_Img4_ValIMG == "" || diseno_Img4_ValIMG == null)
                diseno_Img4_ValIMG = "1592235";

            var diseno_Img4IMG = file.load({id: diseno_Img4_ValIMG});
            var diseno_Img4_urlIMG = "data:image/png;base64," + diseno_Img4IMG.getContents();

            var LAVADO_DE_24_HORAS_bto = caso.getValue('custevent138');
            var LAVADO_24HR_NOTA_MEDICA_bto = caso.getValue('custevent139');
            var TX0_bto = caso.getValue('custevent140');
            var RESPONSABLE0_bto = caso.getValue('custevent141');

            var REVISION_10_DIAS_bto = caso.getValue('custevent142');
            var PRIMERA_NOTA_MEDICA_bto = caso.getValue('custevent143');
            var TX1_bto = caso.getValue('custevent144');
            var RESPONSABLE1_bto = caso.getValue('custevent145');
            // Revisión de 1 Mes
            var REVISION_3_MESES_bto = caso.getValue('custevent146');
            var SEGUNDA_NOTA_MEDICA_bto = caso.getValue('custevent147');
            var TX2_bto = caso.getValue('custevent148');
            var RESPONSABLE2_bto = caso.getValue('custevent149');
            // Revisión de 3 Meses
            var REVISION_5_MESES_bto = caso.getValue('custevent150');
            var CUARTA_NOTA_MEDICA_bto = caso.getValue('custevent151');
            var TX4_bto = caso.getValue('custevent152');
            var RESPONSABLE4_bto = caso.getValue('custevent153');
            // Revisión de 5 Meses
            var REVISION_7_MESES_bto = caso.getValue('custevent154');
            var QUINTA_NOTA_MEDICA_bto = caso.getValue('custevent155');
            var TX5_bto = caso.getValue('custevent156');
            var RESPONSABLE5_bto = caso.getValue('custevent157');
            // Revisión de 7 Meses
            var REVISION_9_MESES_bto = caso.getValue('custevent158');
            var SEXTA_NOTA_MEDICA_bto = caso.getValue('custevent159');
            var TX6_bto = caso.getValue('custevent160');
            var RESPONSABLE55_bto = caso.getValue('custevent163');
            // Revisión de 9 Meses
            var REVISION_99_MESES_bto = caso.getValue('custevent164');
            var SEXTA9_NOTA_MEDICA_bto = caso.getValue('custevent165');
            var TX66_bto = caso.getValue('custevent166');
            var RESPONSABLE6_bto = caso.getValue('custevent167');
            // Revisión de 12 Meses
            var REVISION_12_MESES_bto = caso.getValue('custevent168');
            var SEPTIMA_NOTA_MEDICA_bto = caso.getValue('custevent169');
            var TX7_bto = caso.getValue('custevent170');
            var RESPONSABLE7_bto = caso.getValue('custevent171');
            // Revisión de 14 Meses
            var REVISION_14_MESES_bto = caso.getValue('custevent172');
            var OCTAVA_NOTA_MEDICA_bto = caso.getValue('custevent173');
            var TX8_bto = caso.getValue('custevent174');
            var RESPONSABLE8_bto = caso.getValue('custevent175');




            //caso.save();
            var fecha = new Date();
            fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();

            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
            xml += '<pdf>\n';
            xml += '<body background-image="'+xmlMod.escape({xmlText : imageBack})+'" >';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">HOJA DE ENFERMERÍA KHG</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr><td colspan="2"><b>1.IDENTIFICACIÓN</b></td></tr>';
            xml += '<tr><td>No. Expediente: <b>'+numExpediente+'</b></td> <td align="left">Fecha de incidente: <b>'+fecha+'</b></td></tr>';
            xml += '<tr><td style="width:100%;"> <b>2.ESTADO DE CONCIENCIA Y FÍSICO</b>';
            xml += '<table border="1" style="width:50%;">';
            xml += '<tr><td style="background-color:#FFFFFF">Alerta: <b>'+alerta+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0">Orientado: <b>'+orientado+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF"> Consciente: <b>'+consciente+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0"> Tranquilo: <b>'+tranquilo+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF"> Ansioso: <b>'+ansioso+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0"> Letárgico: <b>'+letargico+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF"> Nervioso: <b>'+nervioso+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0"> Otro: <b>'+otro+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '<td style="width:100%"> <b>3.SIGNOS VITALES</b>';
            xml += '<table style="width:100%;">';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;">Operario</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>PRE</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>TRANS</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>POST</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;">F.C.</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcPre+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcTrans+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcPost+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;">T/A mmHg</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+taPre+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+taTrans+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+taPost+'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '<b>4.TOMA DE FOTOGRAFÍAS</b>';
            xml += '<table width="100%">';
            xml += '<tr>';
            xml += '<td colspan="2" border="1" style="background-color:#5499C7;color:#FFFFFF;"><b>PROTOCOLO DE FOTOGRAFÍAS</b></td>';
            xml += '</tr>';
            xml += '<tr style="background-color:#FFFFFF;">';
            xml += '<td border="1">Inicio</td><td border="1">'+pf_Inicio+'</td>';
            xml += '</tr>';
            xml += '<tr style="background-color:#FDEBD0;">';
            xml += '<td border="1">Final</td><td border="1">'+pf_Final+'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td></tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td style="width:100%;"> <b>5.ANESTESIA</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr><td style="background-color:#5499C7;color:#FFFFFF;">Zona Donadora:</td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Anestésico: <b>'+zd_Anestesico+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Infiltró: <b>'+zd_Infiltro+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Hora de Inicio: <b>'+zd_Hinicio+'</b> Hora de término: <b>'+zd_Hfinal+'</b></td></tr>';
            xml += '<tr><td style="background-color:#5499C7;color:#FFFFFF;">Zona a Implantar:</td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Anestésico: <b>'+zi_Anestesico+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Infiltró: <b>'+zi_Infiltro+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Hora de Inicio: <b>'+zi_Hinicio+'</b> Hora de término: <b>'+zi_Hfinal+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '<td style="width:100%;"> <b>6.ANTISEPSIA</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr><td style="background-color:#5499C7;color:#FFFFFF;">Zona Donadora:</td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Realizó: <b>'+zd_Realizo+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Región: <b>'+zd_Region+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Antiséptico: <b>'+zd_Antiseptico+'</b></td></tr>';
            xml += '<tr><td style="background-color:#5499C7;color:#FFFFFF;">Zona a Implantar:</td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Realizó: <b>'+zi_Realizo+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Región: <b>'+zi_Region+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Antiséptico: <b>'+zi_Antiseptico+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td style="width:100%;"> <b>7.PROCEDIMIENTO</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr><td style="background-color:#FDEBD0;">Médico Responsable: <b>'+pro_MedicoResponsable+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Enfermero responsable: <b>'+pro_EnfermeroResponsable+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Responsable de tricotomía: <b>'+pro_ResponsableTricotomia+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Tipo: <b>'+pro_Tipo+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Responsable de extracción: <b>'+pro_ResponsableExtraccion+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Hora de inicio: <b>'+pro_HoraInicio+'</b> Hora de término: <b>'+pro_HoraTermino+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Hora de inicio: <b>'+pro_HoraInicio2+'</b> Hora de término: <b>'+pro_HoraTermino2+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Responsable de implantación: <b>'+pro_ResponsableImplantacion+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Hora de inicio: <b>'+pro_HoraInicio3+'</b> Hora de término: <b>'+pro_HoraTermino3+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '<td style="width:100%;"> <b>8.MUESTRA DE SANGRE Y PRP</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr><td style="background-color:#FDEBD0;">Responsable: <b>'+prp_Responsable+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Equipo Utilizado: <b>'+prp_EquipoUtilizado+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Sitio de punción: <b>'+prp_SitioDePuncion+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Número de intentos: <b>'+prp_NumeroDeIntentos+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Tubos obtenidos: <b>'+prp_TubosObtenidos+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Centrifugados a <b>'+prp_CentrifugadosArpm+'</b> Tiempo: <b>'+prp_Tiempo+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Responsable de PRP: <b>'+prp_ResponsableDePRP+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Región: <b>'+prp_RegionPRP+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FDEBD0;">Responsable de PRP: <b>'+prp_ResponsableDePRP2+'</b></td></tr>';
            xml += '<tr><td style="background-color:#FFFFFF;">Región: <b>'+prp_RegionPRP2+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">HOJA DE CONTROL KHG</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td style="width:100%;"> No. Expediente: <b>'+numExpediente+'</b>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td style="width:100%;">';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Doctor</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Viables</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>No Viables</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Total</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Porcentaje</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>1H</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_1hDoctor+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_1hVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_1hNoVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_1hTotal+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_1hPorcentaje+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"><b>2H</b></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_2hDoctor+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_2hVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_2hNoVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_2hTotal+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_2hPorcentaje+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>3H</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_3hDoctor+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_3hVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_3hNoVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_3hTotal+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_3hPorcentaje+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"><b>4H</b></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_4hDoctor+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_4hVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_4hNoVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_4hTotal+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+conteoFol_4hPorcentaje+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>5H</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_5hDoctor+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_5hVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_5hNoVisibles+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_5hTotal+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+conteoFol_5hPorcentaje+'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td style="width:100%;"> <b>CONTROL DE CORTE</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Nombre</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora 1</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora 2</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora 3</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora 4</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Hora 5</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>Total</b></td>';
            xml += '</tr>';
            xml += controlDeCorte;
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td style="width:100%;">TOTAL DE UNIDADES FOLICULARES: <b>'+totUnidadesFoliculares+'</b>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">HOJA DE CONTROL KHG</p>';

            xml += '<p style="font-size:12px;font-family:Aria,sans-serif;align:right;">FECHA: <b>'+fecha+'</b></p>';
            xml += '<p style="font-size:12px;font-family:Aria,sans-serif;"><b>SIGNOS VITALES</b></p>';
            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>PRE</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>TRANS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>POST</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="width:5%;background-color:#FFFFFF;color;align:center;">T/A</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+taPre+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+taTrans+'</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">'+taPost+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="width:5%;background-color:#FDEBD0;align:center;">F.C.</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcPre+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcTrans+'</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">'+fcPost+'</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td style="width:100%;">';
            xml += '<table border="1" style="width:90%;margin-top:10px;">';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;">INFILTRACIÓN</td><td border="1" style="background-color:#FFFFFF;"> <b></b></td></tr>';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;">INICIO EXTRACCIÓN</td><td border="1" style="background-color:#FDEBD0;"><b>'+pro_HoraInicio+'</b></td></tr>';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;">TÉRMINO EXTRACCIÓN</td><td border="1" style="background-color:#FDEBD0;"><b>'+pro_HoraTermino+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '<td style="width:100%;align:right;">';
            xml += '<table border="1" style="width:60%;margin-top:10px;">';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;">INICIO CORTE</td><td border="1" style="background-color:#FFFFFF;"><b>'+pro_HoraInicio2+'</b></td></tr>';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;">TÉRMINO CORTE</td><td border="1" style="background-color:#FDEBD0;"><b>'+pro_HoraTermino2+'</b></td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p style="font-size:12px;font-family:Aria,sans-serif;align:center"><b>CONTEO UNIDADES FOLICULARES</b></p>';
            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>1HR</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>2HR</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>3HR</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>4HR</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>5HR</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>SUBTOTAL</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>TOTAL</b></td>';
            xml += '</tr>';
            xml += conteoUnidadesFoliculares;
            xml += '</table>';

            xml += '<table style="width:30%;margin-top:10px;align:right;">';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;">HOYOS</td><td border="1" style="background-color:#FFFFFF;align:center;"><b>'+hoyos+'</b></td></tr>';
            xml += '<tr><td></td><td border="1" style="background-color:#FDEBD0;align:right;">3%</td></tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td style="width:70%;align:center;"> <b>CONTEO FOLÍCULOS</b>';
            xml += '<table border="1" style="width:100%;">';
            xml += '<tr>';
            xml += '<td style="width:15;background-color:#5499C7;color:#FFFFFF;"></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>1 HRS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>2 HRS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>3 HRS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>4 HRS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>5 HRS</b></td>';
            xml += '<td style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>TOTAL</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="width:15;background-color:#FFFFFF;align:center;"><b>1</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '<td style="width:30%;">';
            xml += '<table border="1" style="width:100%;margin-top:30px;">';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;align:center;">INFILTRACIÓN</td></tr>';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;align:center;">---</td></tr>';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;align:center;">INICIO IMPLANTACIÓN</td></tr>';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;align:center;">'+pro_HoraInicio3+'</td></tr>';
            xml += '<tr><td border="1" style="background-color:#FDEBD0;align:center;">TÉRMINO IMPLANTACIÓN</td></tr>';
            xml += '<tr><td border="1" style="background-color:#FFFFFF;align:center;">'+pro_HoraTermino3+'</td></tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p style="font-size:12px;font-family:Aria,sans-serif;align:center"><b>TEMPERATURA °C</b></p>';
            xml += '<table border="1" style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>-4</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>-3</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>-2</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>-1</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>0</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>1</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>2</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>3</b></td>';
            xml += '<td border="1" style="background-color:#5499C7;color:#FFFFFF;align:center;"><b>4</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">PRE</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;">TRANS</td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '<td border="1" style="background-color:#FFFFFF;align:center;"><b></b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;">POST</td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '<td border="1" style="background-color:#FDEBD0;align:center;"></td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td>Equipo Médico:</td>';
            xml += '<td>Extrajo: <b>'+pro_ResponsableExtraccion+'</b></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><b></b></td>';
            xml += '<td>Implantó: <b>'+pro_ResponsableImplantacion+'</b></td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">DISEÑO EN SALA DE PROCEDIMIENTO</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2"><b>NOMBRE DEL PACIENTE:</b> '+cliente+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><img src="'+diseno_Img1_url+'" width="250" height="200" /></td>';
            xml += '<td><img src="'+diseno_Img2_url+'" width="250" height="200" /></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><img src="'+diseno_Img3_url+'" width="250" height="200" /></td>';
            xml += '<td><img src="'+diseno_Img4_url+'" width="250" height="200" /></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><p style="align:center"><img src="'+avisoPrivacidadbase64+'" width="100" height="100" /></p></td>';
            xml += '<td><p style="align:center"><img src="'+avisoPrivacidadbase64MED+'" width="100" height="100" /></p></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p></td>';
            xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL MÉDICO</b></p></td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">CASO DE PROCEDIMIENTO</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td><center><b>FOTOS ANTES DEL INJERTO</b></center><img src="'+diseno_Img1_urlIMG+'" width="250" height="200" /></td>';
            xml += '<td><center><b>FOTOS DESPÚES DEL INJERTO</b></center><img src="'+diseno_Img2_urlIMG+'" width="250" height="200" /></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td><center><b>FOTOS ANTES DE FRENTE</b></center><img src="'+diseno_Img3_urlIMG+'" width="250" height="200" /></td>';
            xml += '<td><center><b>FOTOS ANTES DE FRENTE 2</b></center><img src="'+diseno_Img4_urlIMG+'" width="250" height="200" /></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center"><img src="'+avisoPrivacidadbase64+'" width="100" height="100" /></p></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>'+cliente+'</b></p></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p></td>';
            xml += '</tr>';
            xml += '</table>';


            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">NOTA POST PROCEDIMIENTO</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2"><b>PACIENTE:</b> '+cliente+'</td><td><b>EDAD:</b> '+edad+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>FECHA DE PROCEDIMIENTO:</b> '+fechaP+'</td><td><b>UNIDADES FOLÍCULARES:</b> '+unidadesF+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>FOLÍCULOS:</b> '+FOLI_V_NV+'</td><td><b>TÉRMINO DE EXTRACCIÓN:</b> '+terminoE+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>CABELLOS PROYECTADOS:</b> '+proyectados+'</td><td><b>TÉRMINO DE IMPLANTACIÓN:</b> '+terminoI+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>ÁREA IMPLANTADA:</b> '+DATEPOST+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>INICIO DE EXTRACCIÓN:</b> '+inicioE+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>INICIO DE IMPLANTACIÓN:</b> '+inicioI+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>T/A:</b> '+ta+'</td><td><b>F/C:</b>'+fc+'</td><td><b>F/R:</b>'+fr+'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '<p></p><p>Inicia protocolo de microinjerto capilar con técnica KHR. \n' +
                'Se realiza diseño de zona a implantar, mismo que es autorizado, fotografiado y firmado de conformidad por el paciente: se continúa con la tricotomía acordada. \n' +
                'Personal de enfermería toma muestra de sangre para extracción de plasma. Previa ministración de medicamentos, asepsia, antisepsia e infiltración de lidocaína al 1% con epinefrina y se realiza marcaje con plantilla en zona donadora, se realiza extracción de unidades foliculares. Terminada la extracción se aplica PRP en zona donadora. Tras ofrecerle un ligero refrigerio al paciente, se procede a efectuar asepsia y antisepsia de zona a implantar y se continúa con la implantación de las unidades foliculares. \n' +
                'Da por terminado el procedimiento mediante la instrucción de los cuidados posteriores, escritos y verbales, así como la toma de fotografías de acuerdo a protocolo. \n' +
                'Se cita para las próximas 24 hrs. Egresa paciente en perfectas condiciones.</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2"><b>INCIDENTES DE IMPORTANCIA:</b> '+incidentes+'</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><b>EQUIPO MÉDICO ENVERMERIA:</b> '+equipoM+'</td>';
            xml += '</tr>';
            xml += '</table>';

            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>' +
                '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>' +
                '<p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">CONSENTIMIENTO INFORMADO</p>';

            xml += '<p style="font-size: medium;color:#000000;font-family:Aria, sans-serif;"><b>FECHA</b> <b> '+ fecha +' </b></p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>'+ cliente +'</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>'+ edad +'</b> años de edad, declaro libremente que se me informó en forma amplia, clara, precisa y sencilla de los riesgos y beneficios de someterme al <b>procedimiento de injerto</b> de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>';
            xml += '<p style="font-size: medium;color:#000000;font-family:Aria, sans-serif;"><b>RIESGOS</b></p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Sangrado. Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, que pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Infección. A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Asimetría. La cara humana es normalmente asimétrica. Puede haber variación entre un lado y otro tras un procedimiento de trasplante capilar.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Anestesia. La anestesia realizada durante el procedimiento es local inyectable, sin embargo implica ciertos riesgos como reacción alérgica, edema y pérdida transitoria de la sensibilidad local.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Resultados insatisfactorios. El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Reacciones alérgicas. Aunque es muy poco probable podrían producirse alergias locales al material o líquidos utilizados para asepsia. Pueden ocurrir también reacciones sistémicas de las medicaciones utilizadas durante el procedimiento o prescritas para el post. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Retraso en la cicatrización. Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p>';
            xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo entiendo que no es posible asegurar o garantizar un resultado exacto, ya que dicho resultado puede variar en razón de factores como cuidados del propio paciente, condiciones externas incluyendo factores fortuitos relacionados con la idiosincrasia propia de cada paciente.</p>';
            xml += '<p style="font-size: medium;color:#000000;font-family:Aria, sans-serif;"><b>BENEFICIOS</b></p>';
            xml += '<p style="font-size: medium;">Recuperación de densidad capilar en la zona a implantar (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p>';
            xml += ' <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            xml += '<p style="font-size: medium;color:#000000;font-family:Aria, sans-serif;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>';
            xml += '<p style="font-size: medium;">1.	Por el presente documento, autorizo al equipo médico y los auxiliares médicos de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</p>';
            xml += '<p style="font-size: medium;">2.	He sido también informado(a) que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la legislación Mexicana aplicable.</p>';
            xml += '<p style="font-size: medium;">3.	Autorizo la toma de fotografías de la zona con fines clínicos.</p>';
            xml += '<p style="font-size: medium;">4.	Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</p>';
            xml += '<p style="font-size: medium;">5.	Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</p>';
            xml += '<p style="font-size: medium;">6.	Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p>';
            xml += '<p style="font-size: medium;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>';
            xml += '<p></p><p></p><p></p><p></p>';
            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center"><img src="'+avisoPrivacidadbase64+'" width="100" height="100" /></p></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>'+cliente+'</b></p></td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p></td>';
            xml += '</tr>';
            xml += '</table>';


            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">HOJA FRONTAL HAIR</p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">';
            xml += '<tr>';
            xml += '<td colspan="2"><b>FECHA DE PROCIDIMIENTO:</b> '+fechaP+' </td><td><b>PROCEDIMIENTO KHR:</b>'+ Num_pros +' </td><td><b>TIRAS:</b>'+ Num_tiras +'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '<p></p>';
            xml += "<table  style=\"font-family:'Aria', sans-serif\" text-align=\"left\" font-size=\"10pt\">";
            xml += "<tr>";
            xml += "<td colspan=\"6\" >";
            xml += "<b>REVISIONES EFECTUADAS</b>";
            xml += "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td>";
            xml += "<br />";
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";

            xml += "<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\" font-size=\"10pt\">";

            xml += "<tr>";
            xml += "<td width=\"15px\"  background-color=\"#346094\" >";
            xml += "</td>";

            xml += "<td width=\"60px\" background-color=\"#346094\" >";
            xml += "</td>";

            xml += "<td width=\"80px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Fecha</b>";
            xml += "</td>";

            xml += "<td width=\"360px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Notas Médicas</b>";
            xml += "</td>";

            xml += "<td width=\"140px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Tratamiento</b>";
            xml += "</td>";
            xml += "</tr>";


            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(LAVADO_DE_24_HORAS_bto) + ""; // Days24
            xml += "</td>";

            xml += "<td>24 Horas";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(LAVADO_DE_24_HORAS_bto) + ""; // Days24
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + LAVADO_24HR_NOTA_MEDICA_bto + "</u></p>"; // nota24horas
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX0_bto + ""; // medicam1
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE0_bto + ""; // Responsable1
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" +  dates(REVISION_10_DIAS_bto) + ""; // Day10
            xml += "</td>";

            xml += "<td>10 Días";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_10_DIAS_bto) + ""; // Day10
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + PRIMERA_NOTA_MEDICA_bto + "</u></p>"; // nota
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX1_bto + ""; // medicam2
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE1_bto + ""; // Responsable2
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_3_MESES_bto)+ ""; // Mes1
            xml += "</td>";

            xml += "<td >1 Mes";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_3_MESES_bto) + ""; // Mes1
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + SEGUNDA_NOTA_MEDICA_bto + "</u></p>"; // nota2
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX2_bto + ""; // medicam3
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE2_bto + ""; // Responsable3
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_5_MESES_bto) + ""; // Mes3
            xml += "</td>";

            xml += "<td>3 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_5_MESES_bto) + ""; // Mes3
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + CUARTA_NOTA_MEDICA_bto + "</u></p>"; // nota3
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX4_bto + ""; // medicam4
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE4_bto + ""; // Responsable4
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";


            xml += "</table>";
            xml += "<pbr />";
            xml += "<br />";
            xml += "<p></p><p></p><p></p><p></p><p></p>";

            xml += "<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\" font-size=\"10pt\">";

            xml += "<tr>";
            xml += "<td width=\"15px\"  background-color=\"#346094\" >";
            xml += "</td>";

            xml += "<td width=\"60px\" background-color=\"#346094\" >";
            xml += "</td>";

            xml += "<td width=\"80px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Fecha</b>";
            xml += "</td>";

            xml += "<td width=\"360px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Notas Médicas</b>";
            xml += "</td>";

            xml += "<td width=\"140px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
            xml += "<b>Tratamiento</b>";
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_7_MESES_bto) + ""; // Mes5
            xml += "</td>";

            xml += "<td >5 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_7_MESES_bto) + ""; // Mes5
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + QUINTA_NOTA_MEDICA_bto + "</u></p>"; // nota4
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX5_bto + ""; // medicam5
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE5_bto + ""; // Responsable5
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_9_MESES_bto) + ""; // Mes7
            xml += "</td>";

            xml += "<td>7 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_9_MESES_bto) + ""; // Mes7
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + SEXTA_NOTA_MEDICA_bto  + "</u></p>"; // nota10
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX6_bto + ""; // medicam10
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE55_bto + ""; // Responsable10
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_99_MESES_bto) + ""; // Mes9
            xml += "</td>";

            xml += "<td >9 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_99_MESES_bto) + ""; // Mes9
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + SEXTA9_NOTA_MEDICA_bto + "</u></p>"; // nota5
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX66_bto + ""; // medicam6
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE6_bto + ""; // Responsable6
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td valign=\"top\">" + dates(REVISION_12_MESES_bto) + ""; // Mes12
            xml += "</td>";

            xml += "<td>12 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_12_MESES_bto) + ""; // Mes12
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + SEPTIMA_NOTA_MEDICA_bto + "</u></p>"; // nota6
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX7_bto + ""; // medicam7
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE7_bto + ""; // Responsable7
            xml += "<hr border=\"1px\"/></td>";
            xml += "</tr>";

            xml += "<tr>";

            xml += "<td valign=\"top\">" + dates(REVISION_14_MESES_bto) + ""; // Mes14
            xml += "</td>";

            xml += "<td>14 Meses";
            xml += "</td>";

            xml += "<td>";
            xml += "" + checado(REVISION_14_MESES_bto) + ""; // Mes14
            xml += "</td>";

            xml += "<td>";
            xml += "<p><u>" + OCTAVA_NOTA_MEDICA_bto + "</u></p>"; // nota7
            xml += "</td>";

            xml += "<td>";
            xml += "" + TX8_bto + ""; // medicam8
            xml += "</td>";
            xml += "</tr>";

            xml += "<tr>";
            xml += "<td colspan=\"5\">Nombre del Responsable: " + RESPONSABLE8_bto + ""; // Responsable8
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";





            xml += '</body></pdf>';
            context.response.renderPdf({xmlString: xml});
        }

        function getImageBackGround(sucursal){
            var imageBack = "";
            if(sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28")
            {
                imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            }
            else
            {
                if(sucursal == "22") // Altavista KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                if(sucursal == "35") // Can-Cun KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                if(sucursal == "36") // Chihuahua KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                if(sucursal == "23") // Guadalajara KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                if(sucursal == "24") // Monterrey KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                if(sucursal == "25") // Polanco KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                if(sucursal == "37") // Puebla KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                if(sucursal == "21") // Santa FE KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                if(sucursal == "26") // Satelite KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                if(sucursal == "27") // Tijuana KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                if(sucursal == "28") // Veracruz KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            }
            return imageBack;
        }

        function checado(checks) {
            var check ="";
            if (checks == true){
                var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                check ="<img height=\"15px\" width=\"15px\" src=\""+xmlMod.escape({xmlText : path})+"\" />";
            }else if(checks == false){
                var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                check ="<img height=\"15px\" width=\"15px\" src=\""+xmlMod.escape({xmlText : path2})+"\"/>";
            }
            return check;
        }
        function dates(varDate) {
            var dates = "";
            if (varDate != null && varDate != "") {
                var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                dates ="<img height=\"15px\" width=\"15px\" src=\""+xmlMod.escape({xmlText : path})+"\" />";
            } else {
                var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                dates ="<img height=\"15px\" width=\"15px\" src=\""+xmlMod.escape({xmlText : path2})+"\"/>";
            }
            return dates;
        }

        return {
            onRequest: onRequest
        };

    });
