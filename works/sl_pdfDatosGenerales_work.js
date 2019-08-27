/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/runtime'],

    function (record, log, render, xmlMod, runtime) {

        function onRequest(context) {
            var userObj = runtime.getCurrentUser();
            log.debug('userObj: ', userObj);
            var recId = context.request.parameters.recId;
            var caso = record.load({ type: 'supportcase', id: recId });

            // FORMATO DE VALORACIÓN
            var companyId = caso.getValue({ fieldId: 'company' });
            var edad = caso.getValue({ fieldId: 'custevent332' });
            var cliente = record.load({ type: 'customer', id: companyId }); // , isDynamic: true

            /*var numLines = cliente.getLineCount({sublistId: 'addressbook'});
            log.debug('numLines: ', numLines);
        
            var label = cliente.getSublistValue({sublistId: "addressbook", fieldId: "label", line: 1});
            log.debug('label: ', label);
            var id = cliente.getSublistValue({sublistId: "addressbook", fieldId: "id", line: 1});
            log.debug('id: ', id);
            var isresidential = cliente.getSublistValue({sublistId: "addressbook", fieldId: "isresidential", line: 1});
            log.debug('isresidential: ', isresidential);
            var addrtext = cliente.getSublistValue({sublistId: "addressbook", fieldId: "addrtext", line: 1});
            log.debug('addrtext: ', addrtext);*/

            var numExpediente = cliente.getValue({ fieldId: 'entityid' });
            var altname = cliente.getValue({ fieldId: 'altname' });
            var phone = cliente.getValue({ fieldId: 'phone' });
            var sucursal = cliente.getValue({ fieldId: 'custentity25' });
            var sucursalText = cliente.getText({ fieldId: 'custentity25' });
            var comments = cliente.getValue({ fieldId: 'comments' });
            var medios = cliente.getText({ fieldId: 'custentity38' });
            var leadSource = cliente.getText({ fieldId: 'leadsource' });
            var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
            var sucReal = sucursalReal(sucursalText);

            var imageBack = getImageBackGround(sucursal);

            var fechaDeNacimiento = caso.getText({ fieldId: 'custevent205' });

            // Datos Generales
            // Cambia titulo a Antecedentes (si aplica)
            var familiarConPerdida = checado(caso.getValue({ fieldId: 'custevent209' }));
            var tratoLaPerdida = caso.getText({ fieldId: 'custevent212' });
            var cuandoEmpezoUsted = caso.getText({ fieldId: 'custevent210' });
            var observoResultados = caso.getText({ fieldId: 'custevent213' });
            var tratoLaPerdida2 = checado(caso.getValue({ fieldId: 'custevent211' }));
            var conQueFrecuencia = caso.getText({ fieldId: 'custevent214' });
            var alteracionEnElCuero = checado(caso.getValue({ fieldId: 'custevent215' }));
            var comezonEnElCuero = checado(caso.getValue({ fieldId: 'custevent216' }));
            var desprendimientoDePlaca = checado(caso.getValue({ fieldId: 'custevent217' }));
            var expedienteFisico = checado(false);
            var numExpedienteDataGeneral = caso.getText({ fieldId: 'custevent218' });

            // Historial Clínico
            var enfermedadDeImportancia = checado(caso.getValue({ fieldId: 'custevent220' })); //Enfermedad de importancia en abuelos
            var sufreDeAlgunProblema = checado(caso.getValue({ fieldId: 'custevent232' })); //Sufre de algun problema renal
            var enfermedadDeImportancia2 = checado(caso.getValue({ fieldId: 'custevent221' })); //Enfermedad de importancia en padres
            var tratamiento1 = caso.getValue({ fieldId: 'custevent233' }); //Tratamiento problema renal
            var cual = caso.getValue({ fieldId: 'custevent222' }); //Cual enfermedad de importancia padres
            var sufreDeAlgunProblema2 = checado(caso.getValue({ fieldId: 'custevent234' })); //Sufre de algun problema neurologico
            var algunaCirugiaPrevia = checado(caso.getValue({ fieldId: 'custevent223' })); //Alguna cirugia previa
            var tratamiento2 = caso.getValue({ fieldId: 'custevent235' }); //Tratamiento problema neurologico
            var cual2 = caso.getValue({ fieldId: 'custevent224' }); //Cual cirugia Previa
            var seHaHechoPruebas = checado(caso.getValue({ fieldId: 'custevent236' })); // Pruebas de VIH o Hepatitis
            var anestesiaPrevia = caso.getText({ fieldId: 'custevent225' });//Anestecia previa
            var respuesta = caso.getValue({ fieldId: 'custevent237' }); //Resultado VIH o Hepatitis
            var sufreDeAlgunTipo = checado(caso.getValue({ fieldId: 'custevent226' })); //Sufre de algun tipo de alergia
            var haPresentadoSangrado = checado(caso.getValue({ fieldId: 'custevent228' })); //Ha presentado sangrado gin o nasal
            var cual3 = caso.getValue({ fieldId: 'custevent227' }); //Cual alergia
            var sufreUstedDeHipertension = checado(caso.getValue({ fieldId: 'custevent252' })); //Sufre de hipertension
            var sufreUstedDiabetes = caso.getText({ fieldId: 'custevent230' }); //Tiene usted diabetes
            var tratamiento3 = caso.getValue({ fieldId: 'custevent253' }); //Tratamiento hipertension
            var tratamiento = caso.getValue({ fieldId: 'custevent231' }); //Tratamiento diabetes
            var tomaActualmenteUn = checado(caso.getValue({ fieldId: 'custevent239' })); //Toma actualmente medicamento
            var queTipoDeCicatrizacion = caso.getText({ fieldId: 'custevent229' }); //Que tipo de cicatrizacion tiene
            var cual4 = caso.getValue({ fieldId: 'custevent240' }); //Cual medicamento
            var ingiereConFrecuencia = checado(caso.getValue({ fieldId: 'custevent238' })); //Ingiere alcohol
            var fuma = checado(caso.getValue({ fieldId: 'custevent479' })); //Fuma
            var enfermedadDeImportancia3 = caso.getText({ fieldId: 'custevent341' });//No se usa
            var antPatPreviosConvencionales = caso.getText({ fieldId: 'custevent489' }); //Antecedentes previos convencionales
            var antPatPreviosAlternativos = caso.getText({ fieldId: 'custevent490' }); //Antecedentes previos alternativos
            var antPatPreviosTradicionelas = caso.getText({ fieldId: 'custevent491' }); //Antecedentes previos tradicionales
            var cual5 = caso.getText({ fieldId: 'custevent509' }); //Cual enfermedad de importancia abuelos

            // Marque la casilla si padece alguna de estas enfermedades
            var artritis = checado(caso.getValue({ fieldId: 'custevent241' }));
            var claustrofobia = checado(caso.getValue({ fieldId: 'custevent244' }));
            var epilepsia = checado(caso.getValue({ fieldId: 'custevent247' }));
            var hipertiroidismo = checado(caso.getValue({ fieldId: 'custevent250' }));
            var asma = checado(caso.getValue({ fieldId: 'custevent242' }));
            var colitis = checado(caso.getValue({ fieldId: 'custevent245' }));
            var hipotiroidismo = checado(caso.getValue({ fieldId: 'custevent248' }));
            var psoriasis = checado(caso.getValue({ fieldId: 'custevent251' }));
            var cancer = checado(caso.getValue({ fieldId: 'custevent243' }));
            var eczema = checado(caso.getValue({ fieldId: 'custevent246' }));
            var gastritis = checado(caso.getValue({ fieldId: 'custevent249' }));
            var síndromeMetabolico = checado(caso.getValue({ fieldId: 'custevent254' }));
            var avisoPrivacidadbase64 = caso.getValue({ fieldId: 'custevent319' });
            var ninguno = checado(caso.getValue({ fieldId: 'custevent487' }));
            var otros = caso.getText({ fieldId: 'custevent488' });

            // Antecedentes Heredofamiliares
            var diabetes1 = caso.getText({ fieldId: 'custevent255' });
            var especifiqueDiabetes1 = caso.getText({ fieldId: 'custevent257' });
            var hipertensionArterial = caso.getText({ fieldId: 'custevent256' });
            var especifiqueHipertensionArterial = caso.getText({ fieldId: 'custevent259' });
            var cancer2 = caso.getText({ fieldId: 'custevent258' });
            var especifiqueCancer2 = caso.getText({ fieldId: 'custevent260' });

            // Antecedentes ginecoobstetricos
            var menarca = caso.getText({ fieldId: 'custevent261' });
            var menstruacion = caso.getText({ fieldId: 'custevent262' });
            var g = checado(caso.getValue({ fieldId: 'custevent264' }));
            var p = checado(caso.getValue({ fieldId: 'custevent265' }));
            var c = checado(caso.getValue({ fieldId: 'custevent266' }));
            var a = checado(caso.getValue({ fieldId: 'custevent267' }));

            // Exploración física
            var aspectoFisico = caso.getText({ fieldId: 'custevent492' });
            var expresionCara = caso.getText({ fieldId: 'custevent498' });
            var frecuenciaCardiaca = caso.getText({ fieldId: 'custevent504' });
            var sexoAparente = caso.getText({ fieldId: 'custevent493' });
            var movimientosAnormales = caso.getText({ fieldId: 'custevent499' });
            var frecuenciaRespiratoria = caso.getText({ fieldId: 'custevent505' });
            var edadAparente = caso.getText({ fieldId: 'custevent494' });
            var manchaAnormal = caso.getText({ fieldId: 'custevent500' });
            var peso = caso.getText({ fieldId: 'custevent506' });
            var constitucionPaciente = caso.getText({ fieldId: 'custevent495' });
            var estadoConciencia = caso.getText({ fieldId: 'custevent501' });
            var talla = caso.getText({ fieldId: 'custevent507' });
            var conformacionPaciente = caso.getText({ fieldId: 'custevent496' });
            var temperatura = caso.getText({ fieldId: 'custevent502' });
            var especialidad = caso.getText({ fieldId: 'custevent508' });
            var actitudPaciente = caso.getText({ fieldId: 'custevent497' });
            var presionArterial = caso.getText({ fieldId: 'custevent503' });

            if (avisoPrivacidadbase64 != "" && avisoPrivacidadbase64 != null) {
                if (avisoPrivacidadbase64.substring(0, 3) == "ok_")
                    avisoPrivacidadbase64 = avisoPrivacidadbase64.substring(3, avisoPrivacidadbase64.length);
            }
            else {
                avisoPrivacidadbase64 = "#";
            }
            //caso.save();
            var fecha = new Date();
            fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();


            //Anexo aviso de privacidad
            /**
             * AVISO DE PRIVACIDAD MEXICO
             * se cambia a solo una variablec y se incluyen saltos de pagina dentro del html
             * salto de pagina => '<div style="page-break-after: always;"></div>'+
             * espacio para membretado => '<br/><br/><br/><br/><br/><br/>'+
             */
            var avisoMexico = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>' +
                '<br/><p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Holding Group S.C., (“Kaloni”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos suyos tenemos?</b>' +
                '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
                '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">A) Para brindarle servicio de atención al cliente y dar contestación a sus consultas;<br/>' +
                'B) Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;<br/>' +
                'C) Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">D) Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;<br/>' +
                'E) Realizar encuestas de mercado y análisis de estrategias de marketing<br/>' +
                'F) Ofrecer promociones a nuestros clientes;<br/>' +
                'G) Mantener la relación con usted.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
                '<br/>Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Kaloni Holding Group, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@kaloni.com.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal.</b>' +
                '<br/>Kaloni otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
                '<br/>Para conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://kaloni.mx/legal.html.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencia de datos</b>' +
                '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p>' +
                '<div style="page-break-after: always;"></div>'+
                '<br/><br/><br/><br/><br/><br/>'+

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al aviso de privacidad</b>' +
                '<br/>Kaloni podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://kaloni.mx/legal.html. Fecha de última actualización [22/08/2019]</p>' +

                '<p style="font-family:Aria, sans-serif; font-size: 12px;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/><br/>';

            var avisoColombia = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con la Ley 1581 de 2012, artículo 10 del decreto reglamentario 1377 de 2013 y al artículo 20 del Decreto 0722 de 2013, <b>KALONI COLOMBIA S.A.S.</b>, en adelante Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, ponemos a su disposición nuestro Aviso de Privacidad y Política de Tratamiento de Datos Personales, la cual tiene como propósito informar las prácticas en relación con la búsqueda, tratamiento y comunicación de la información que nos sea proporcionada a través de este sitio web.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al momento de utilizar el sitio, acepta los Términos de Uso de este sitio web y del presente aviso de privacidad. Parte de la información que usted envíe puede ser información de identificación o de carácter personal (es decir, información que únicamente puede estar relacionada con usted, como su nombre completo, domicilio, dirección de e-mail, número de teléfono). Al enviar sus datos a través de este sitio web, sean personales o no, está aceptando y, por consiguiente dando su consentimiento expreso de manera libre e inequívoca, para que dichos datos puedan ser objeto de búsqueda, tratamiento y comunicación de acuerdo con la presente Política de Tratamiento de Datos Personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se informará sobre qué datos son obligatorios y cuales optativos.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni utilizará los datos depositados en este sitio para transmitirle información (si la ha solicitado), realizar operaciones de marketing, realizar estudios y otras actividades con fines de comercialización y ofrecimiento de servicios y para cualquier otro fin especificado en el presente aviso.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Tenemos implementados en este sitio web estándares comerciales de tecnología y seguridad operacional para proteger a nuestros visitantes de accesos no autorizados, revelación, alteración o destrucción toda la información proporcionada.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo almacenamos sus datos?</b></p>';
            avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que le invitamos a considerar detenidamente: </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Conocer, actualizar, rectificar, suprimir y revocar los datos personales. Este derecho se podrá ejercer, entre otros, frente a </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;prohibido o no haya sido autorizado.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Solicitar prueba de la autorización de Tratamiento otorgada.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Ser informado respecto del uso que el responsable le ha dado a los datos personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Presentar ante los organismos de control correspondientes, quejas por infracciones a lo dispuesto en la normativa vigente</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;y las demás normas que la modifiquen, adicionen o complementen.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Acceder en forma gratuita a los datos personales que hayan sido objeto de Tratamiento.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, será el Responsable y/o Encargado del tratamiento de los datos personales de sus clientes, y clientes prospectivos obtenidos durante el uso este sitio web y sus actividades de negocio.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por escrito a KALONI COLOMBIA S.A.S., ubicada en Bogotá D.C., en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, o por correo electrónico a legal@kaloni.com .</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni validará la identificación, analizará, clasificará y emitirá la respuesta a la solicitud en los tiempos establecidos en la ley, y será enviada a través del medio por el cual se recibe la solicitud o por el medio que el titular especifique en su comunicación. La supresión de datos personales y/o revocación de autorización para tratamiento de la información no procederá cuando el titular tenga un deber legal o contractual de permanecer en las bases de datos de Kaloni.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dichos requerimientos serán tramitados siempre y cuando cumplan con los siguientes requisitos:</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. La solicitud deberá ser dirigida a Kaloni;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Deberá contar con la identificación del titular, su causahabiente, representante o mandatario;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;3. Habrá de contener la descripción de los hechos que dan lugar a su petición;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;4. Datos de contacto para notificación de la respuesta;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;5. Documentos y hechos soporte de su petición;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En caso de que el requerimiento resulte incompleto en cuanto a sus requisitos, el solicitante será requerido para que dentro de los cinco (5) días siguientes a la recepción del requerimiento subsane sus omisiones. Transcurridos dos (2) meses desde la fecha en que el solicitante fue requerido para subsanar su petición sin obtener la información requerida, se entenderá que ha desistido del reclamo.</p>';
            avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país, adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al suministrar la información personal en este sitio web, estará autorizando de forma expresa, libre e inequívoca que la información recogida pueda ser integrada por Kaloni con otros datos obtenidos activamente, a no ser que especifiquemos otra finalidad al recogerlos. Finalmente, nos estará autorizando a ceder y/o suministrar la información personal suministrada en este sitio, a terceras partes que no son filiales ni agentes, pero únicamente en los siguientes casos:</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;I. A los contratistas que realizan labores de apoyo en nuestra empresa (como, por ejemplo: servicios logísticos, asistencia</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;técnica, servicios de entrega e instituciones financieras); en este caso, pediremos a estos terceros que traten la información</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;de acuerdo con esta Política de Privacidad y la usen con los mismos fines.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;II. Si lo solicitan las fuerzas de seguridad o lo requieren leyes, órdenes judiciales o normas gubernamentales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La búsqueda, tratamiento y comunicación de información contemplada en esta Política de Privacidad puede conllevar la comunicación de los datos a jurisdicciones fuera de su país de residencia donde es posible que no existan leyes y normas equivalentes sobre la información personal, circunstancia que acepta prestando su consentimiento de forma expresa, libre e inequívoca a esta política de privacidad.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante la autoridad local correspondiente, le invitamos a conocer más información aquí.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

            var avisoEspana = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Para Kaloni Hair, S.L.U., en adelante Kaloni Hair Madrid, el secreto profesional, la confidencialidad, y la seguridad son valores imprescindibles, y en todo momento garantizamos nuestro compromiso con la privacidad del usuario o visitante en todas sus interacciones. En Kaloni Hair Madrid nos comprometemos a no recabar información innecesaria sobre el usuario, como también a tratar con extrema diligencia la información personal que el usuario pueda facilitar a través de nuestra página web.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos), y la normativa relativa a la Protección de Datos de Carácter Personal, usted debe saber que la utilización de algunos servicios en nuestra página web, requiere que nos faciliten algunos de sus datos personales a través de formularios de registro o mediante el envío de mensajes de correo electrónico, y que estos datos podrán ser objeto de tratamientos e incorporación a los ficheros de Kaloni Hair Madrid, titular y responsable del mismo.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El envío de los datos implica su autorización para incorporarlos a nuestros ficheros, siempre que Kaloni Hair Madrid lo considere conveniente, quedando regulados en todo caso por el presente Aviso de Privacidad. Kaloni Hair Madrid, se reserva el derecho de decidir la incorporación o no, de sus datos personales en nuestros ficheros.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Procesamos sus datos personales para los fines siguientes: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Mantener la relación con usted;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Dar contestación a sus consultas;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios; </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Brindar servicio de atención al cliente;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar encuestas de mercado y análisis de estrategias de marketing;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Ofrecer promociones a nuestros clientes;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
            avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que te invitamos a considerar detenidamente. Así dispones de los derechos de acceso, rectificación, supresión, limitación del tratamiento, recibir notificación en caso de rectificación o supresión de datos personales o limitación de tratamiento, portabilidad de los datos, oposición y a no ser objeto de una decisión automatizada, incluida la elaboración de perfiles, basada únicamente en el tratamiento automatizado. Kaloni Hair Madrid quiere asegurarse de que usted esté enterado de sus derechos: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de acceso:</b> Usted tiene derecho a solicitar los datos personales relacionados con usted y que nos haya proporcionado.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de rectificación:</b> Usted tiene el derecho a solicitar la corrección de los datos personales si usted cree que la información no es exacta. También tiene el derecho a solicitar que la empresa complemente aquellos datos que considere están incompletos.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de supresión:</b> Usted tiene el derecho a solicitar la eliminación de los datos personales (una vez que ya no sean necesarios para una finalidad empresarial legítima, como completar una transacción comercial)</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a restringir el tratamiento:</b> Usted tiene el derecho a solicitar la restricción de los datos personales siempre y cuando ya no sean necesarios para una finalidad empresarial legítima.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a objetar el tratamiento:</b> Usted tiene el derecho a objetar el tratamiento de sus datos personal.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a la portabilidad de los datos:</b> Usted tiene el derecho a solicitar la transferencia de sus datos a otra parte, siempre que esto sea viable técnicamente.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por carta a: Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637 o por correo electrónico a legal@kaloni.com .</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país (esto incluye el área exterior al Espacio Económico Europeo), adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
            avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair Madrid puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante una autoridad de supervisión de protección de datos de la UE. Puede encontrar los detalles de su autoridad de supervisión aplicable aquí.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

            //Anexo de contrato de prestacion de servicios
            var contratoMexico = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONTRATO DE PRESTACIÓN DE SERVICIOS DE KALONI HOLDING GROUP S.C.</b></p>';
            contratoMexico += '<br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">El presente documento especifica los términos y condiciones, en adelante “Términos y Condiciones” que serán aplicados a la disposición de servicios “Servicios” prestados por Kaloni Holding Group S.C., en lo sucesivo “Kaloni”, a favor de la persona que firma este documento, en lo siguiente conocido como “El Cliente”. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Para los efectos de los presentes Términos y Condiciones se entenderá por:</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Servicio o Servicios:</u> Servicios médicos y estéticos ofrecidos por Kaloni, entre éstos se incluye el microinjerto capilar, la cirugía plástica y reconstructiva, tratamientos estéticos corporales, faciales y la venta de distintos productos para el cuidado estético. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Aviso y Política de Privacidad:</u> Documento físico y/o electrónico que establece las normas bajo las que se trata su Información por Kaloni. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Formato de Valoración:</u> Formato de entrevista realizada por el personal de Kaloni al Cliente en el cual se detalla información relevante para el correcto diagnóstico del Cliente.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Anticipo:</u> A la cantidad monetaria que el Cliente entrega al proveedor como adelanto para reservar la Fecha de Procedimiento en la que se llevará a cabo la prestación de los Servicios.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Fecha de Procedimiento:</u> Fecha seleccionada por el Cliente en la cual Kaloni prestará los Servicios conforme a los Términos y Condiciones suscritas entre las partes. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Consentimiento Informado:</u> Documento que comunica al Cliente de forma explícita y clara toda la información relativa al procedimiento al que va a someterse, los beneficios, riesgos, y otros aspectos relevantes relacionados con los Servicios contratados. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Receta Médica:</u> Documento que expide el médico en el cual se le indicará al Cliente las prescripciones médicas que deberá cumplir.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">A la Hoja de Presupuesto, a los Términos y Condiciones y al Consentimiento Informado se les denominará conjuntamente el “Contrato”.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Valoración Previa Requerida.</b> El Cliente podrá programar su cita de valoración en cualquiera de nuestras clínicas, directorio disponible en https://kaloni.mx, en la cita de valoración se le explicarán detalladamente las opciones de tratamiento y los costos derivados. Kaloni prestará los servicios al Cliente de acuerdo con lo establecido en el Contrato. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cooperación.</b> El Cliente deberá proporcionar a Kaloni información verdadera en todo momento. El Cliente reconoce que deberá seguir cabalmente todos los cuidados indicados y asistir a todas las citas de seguimiento.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>De la Prestación del Servicio.</b> El Cliente reconoce tener conocimiento que los Servicios objeto de este Contrato serán prestados por personal médico y/o estético altamente capacitado, habiendo aceptado y autorizado expresamente en el Consentimiento Informado con la realización de los procedimientos por dicho profesional. Una vez que los Servicios sean prestados no se realizarán devoluciones. En el caso de compra de producto, una vez acreditado el pago correspondiente, Kaloni procederá a la entrega de la mercancía.</p>';
            contratoMexico += '<div style="page-break-after: always;"></div>';
            contratoMexico += '<br/><br/><br/><br/><br/><br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Pago.</b> Con la finalidad de reservar la Fecha de Procedimiento, el Cliente podrá realizar el pago total del Servicio contratado o podrá realizar un pago parcial en concepto de Anticipo, el cual no podrá ser menor a la cantidad equivalente al 10% del monto total de su procedimiento, en este último caso, el Cliente se obliga a  pagar el monto restante a más tardar en la Fecha de Procedimiento. El pago podrá ser realizado en efectivo en las cajas de Kaloni, a través de tarjeta de crédito o débito en nuestras terminales bancarias o mediante transferencia bancaria conforme a los siguientes datos:</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Banco: BBVA Bancomer</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Beneficiario: KALONI HOLDING GROUP, S.C. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Cuenta: 0100361658</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">CLABE Interbancaria: 0121 8000 1003 6165 86</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Facturación.</b> Al momento de hacer su pago, la Ejecutiva de Atención a Clientes proporcionará al Cliente un Formato de Facturación mismo que deberá llenar con su información correcta y firmar. En caso de requerir factura con datos fiscales, deberá indicar sus datos fiscales correctos y completos, en caso de no requerirla deberá señalarlo en el mismo formato ya que Kaloni facturará a público en general como parte de las ventas del día, por lo tanto no se expedirán facturas posteriores al día de pago.   </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultado.</b> El Cliente comprende que la práctica de la medicina no es una ciencia exacta, y que por tal motivo no es posible garantizar un resultado, dado que dicho resultado puede variar en razón a factores tales como cuidados y precauciones que son responsabilidad del Cliente y algunos otros aleatorios relacionados con la naturaleza de cada Cliente. El Cliente manifiesta, además, haber recibido información detallada sobre el diagnóstico, los posibles pronósticos, habiendo sido todo perfectamente entendido y aceptado por él, obligándose a cumplir todas las prescripciones médicas anteriores y posteriores al procedimiento médico, a fin de minimizar la ocurrencia de cualquiera de los riesgos señalados en el Consentimiento Informado.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Devolución.</b> El Cliente podrá cancelar o modificar la programación del Servicio contratado siempre y cuando notifique a Kaloni con una antelación de siete días hábiles previos a la Fecha de Procedimiento. El Cliente acepta y reconoce que si decide cancelar el Servicio fuera de este término, Kaloni retendrá el monto equivalente al 10% del costo total del procedimiento por concepto de Gastos Administrativos. La solicitud de devolución será procedente únicamente dentro de los siguientes treinta días naturales contados a partir de la fecha de su pago parcial o total; una vez concluido este término, Kaloni no realizará devolución monetaria, únicamente podrá ofrecer al Cliente cambio por otros servicios y/o producto. El Cliente deberá contactar <u>servicioalcliente@kaloni.com</u> para iniciar el trámite, no se atenderán solicitudes de devolución por otro medio. Kaloni dará respuesta a su solicitud mediante el envío de un Formato de Devolución, mismo que el Cliente deberá llenar con la información relativa a su pago y enviar adjuntando la factura, recibo o comprobante bancario al correo electrónico anteriormente mencionado. Una vez recibido el formato con la información completa, Kaloni notificará a El Cliente la correcta recepción de su trámite y a partir de esta fecha Kaloni tendrá 30 días hábiles para concluir el trámite de su devolución. El Cliente comprende y acepta que en el supuesto de cancelación del Servicio y solicitud de devolución, Kaloni retendrá las comisiones bancarias conforme a la cláusula siguiente.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Comisiones Bancarias.</b> La comisión bancaria aplicable por uso de terminal será del 3.7% en tarjetas American Express y del 2% en el resto de tarjetas bancarias. Si el pago se realizó a meses sin intereses, adicional a la comisión por uso de la terminal se retendrá la cantidad correspondiente al 12% en compras a 12 meses sin intereses y 6% en compras a 6 meses sin intereses.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Producto.</b> El Cliente contará con 30 días naturales a partir de la fecha de compra para solicitar el cambio o la devolución de un producto. Una vez abierto el producto no se aceptarán devoluciones.</p>';
            contratoMexico += '<div style="page-break-after: always;"></div>';
            contratoMexico += '<br/><br/><br/><br/><br/><br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Tratamiento De Datos Personales.</b> El Aviso de Privacidad y las políticas de uso y recopilación de información de Kaloni se encuentran disponibles para su consulta en nuestro sitio web http://kaloni.mx.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Leyes Aplicables y Jurisdicción.</b> Para la interpretación, cumplimiento y ejecución del presente Contrato, las partes se someten a la jurisdicción y competencia de las autoridades competentes de la Ciudad de México, renunciando expresamente y desde este momento a cualquier otro fuero que por razón de su domicilio presente o futuro pudiera corresponderles.</p>';
            contratoMexico += '<p></p><p></p><p></p><p></p>';

            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
            xml += '<pdf>\n';
            xml += '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">FORMATO DE HISTORIA CLÍNICA</p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td colspan="2"><b>No. de Expediente: </b> ' + numExpediente + '</td></tr>';
            xml += '<tr><td><b>NOMBRE: </b> ' + altname + '</td><td><b>CURP: </b> ' + '' + '</td></tr>';
            if (userObj.role == '3' || userObj.role == '1098') {
                xml += '<tr><td><b>EDAD: </b> ' + edad + '</td><td><b>TELÉFONO: </b> ' + phone + '</td></tr>';
            } else {
                xml += '<tr><td><b>EDAD: </b> ' + edad + '</td><td><b>TELÉFONO: </b> XXXXX</td></tr>';
            }
            xml += '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechaDeNacimiento + '</td><td><b>SUCURSAL: </b> ' + sucursalText + '</td></tr>';
            xml += '<tr><td colspan="2"><b>DIRECCIÓN: </b> ' + '' + '</td></tr>';
            xml += '</table>';
            xml += '<p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="2" color="#FFFFFF" background-color="#346094"><b> Cómo se enteró de Nosotros</b></td></tr>';
            xml += '<tr><td><b>MEDIOS: </b> ' + medios + '</td><td><b>CAMPAÑA: </b> ' + leadSource + '</td></tr>';
            xml += '</table>';
            xml += '<p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4" color="#FFFFFF" background-color="#346094"><b> Antecedentes (si aplica)</b></td></tr>';
            xml += '<tr><td align="center">' + familiarConPerdida + '</td><td>Familiar con pérdida de cabello</td>';
            xml += '<td colspan="2">¿Con qué frecuencia lava su cabello? <b>' + conQueFrecuencia + '</b></td></tr>';
            xml += '<tr><td colspan="2">Comienzo de pérdida de cabello: <b>' + cuandoEmpezoUsted + '</b></td>';
            xml += '<td align="center">' + alteracionEnElCuero + '</td><td>Alteraciones recientes en el cuero cabelludo</td></tr>';
            xml += '<tr><td align="center">' + tratoLaPerdida2 + '</td><td>¿Trató la pérdida de cabello?</td>';
            xml += '<td align="center">' + comezonEnElCuero + '</td><td>¿Comezón en el cuero cabelludo?</td></tr>';
            xml += '<tr><td colspan="2">¿Hace cuanto tiempo? <b>' + tratoLaPerdida + '</b></td>';
            xml += '<td align="center">' + desprendimientoDePlaca + '</td><td>¿Desprendido de placa blanquesina?</td></tr>';
            xml += '<tr><td colspan="2">¿Observó resultados? <b>' + observoResultados + '</b></td>';
            xml += '</tr>';
            // xml += '<tr><td align="center">'+expedienteFisico+'</td><td>Expediente físico</td></tr>';
            // xml += '<td colspan="2">No. de expediente: <b>'+numExpedienteDataGeneral+'</b></td></tr>';
            xml += '</table>';
            xml += '<p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4" color="#FFFFFF" background-color="#346094"><b> Interrogatorio</b></td></tr>';
            xml += '<tr><td align="center">' + enfermedadDeImportancia + '</td><td align="left">Enfermedad de importancia en abuelos</td>';
            xml += '<td align="center">' + sufreDeAlgunProblema + '</td><td align="left">¿Sufre de algún problema renal?</td></tr>';
            xml += '<tr><td></td><td align="left">¿Cuál?: <b>' + cual5 + '</b></td>';
            xml += '<td></td><td align="left">Tratamiento: <b>' + tratamiento1 + '</b></td></tr>';
            xml += '<tr><td align="center">' + enfermedadDeImportancia2 + '</td><td align="left">Enfermedad de importancia en padres</td>';
            xml += '<td align="center">' + sufreDeAlgunProblema2 + '</td><td align="left">¿Sufre algún problema neurológico?</td></tr>';
            xml += '<tr><td></td><td align="left">¿Cuál?: <b>' + cual + '</b></td>';
            xml += '<td></td><td align="left">Tratamiento: <b>' + tratamiento2 + '</b></td></tr>';
            xml += '<tr><td align="center">' + algunaCirugiaPrevia + '</td><td align="left">¿Alguna cirugía previa?</td>';
            xml += '<td align="center">' + seHaHechoPruebas + '</td><td align="left">¿Se ha hecho pruebas de VIH o hepatitis?</td></tr>';
            xml += '<tr><td></td><td align="left">¿Cuál?: <b>' + cual2 + '</b></td>';
            xml += '<td></td><td align="left">Respuesta: <b>' + respuesta + '</b></td></tr>';
            xml += '<tr><td></td><td align="left">¿Le han administrado anestecia?: <b>' + anestesiaPrevia + '</b></td>';
            xml += '<td align="center">' + haPresentadoSangrado + '</td><td align="left">¿Ha presentado sangrado GIN o nasal?</td></tr>';
            xml += '<tr><td align="center">' + sufreDeAlgunTipo + '</td><td align="left">¿Sufre algún tipo de alergía?</td>';
            xml += '<td align="center">' + sufreUstedDeHipertension + '</td><td align="left">¿Sufre de hipertensión?</td></tr>';
            xml += '<tr><td></td><td align="left">¿Cuál?: <b>' + cual3 + '</b></td>';
            xml += '<td></td><td align="left">Tratamiento: <b>' + tratamiento3 + '</b></td></tr>';
            xml += '<tr><td></td><td align="left">¿Tiene ustes diabetes?: <b>' + sufreUstedDiabetes + '</b></td>';
            xml += '<td align="center">' + tomaActualmenteUn + '</td><td align="left">¿Toma actualmente un medicamento?</td></tr>';
            xml += '<tr><td></td><td align="left">Tratamiento: <b>' + tratamiento + '</b></td>';
            xml += '<td></td><td align="left">¿Cuál?: <b>' + cual4 + '</b></td></tr>';
            xml += '<tr><td></td><td align="left">¿Que tipo de cicatrización tiene?: <b>' + queTipoDeCicatrizacion + '</b></td>';
            xml += '<td align="center">' + ingiereConFrecuencia + '</td><td align="left">¿Ingiere con frecuencia alcohol?</td></tr>';
            xml += '<tr><td align="center">' + fuma + '</td><td align="left">¿Fuma?</td>';
            xml += '<td align="center"></td><td></td></tr>';
            xml += '</table>';
            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4"> Antecedentes patológicos, tratamientos previos</td></tr>';
            xml += '<tr><td>Convencionales: <b>' + antPatPreviosConvencionales + '</b></td></tr>';
            xml += '<tr><td>Alternativos: <b>' + antPatPreviosAlternativos + '</b></td></tr>';
            xml += '<tr><td>Tradicionales: <b>' + antPatPreviosTradicionelas + '</b></td></tr>';
            xml += '</table>';
            xml += '<div style=\"page-break-after: always;\"></div>';
            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">FORMATO DE HISTORIA CLÍNICA</p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="8" color="#FFFFFF" background-color="#346094"><b> Marque la casilla si padece alguna de estas enfermedades:</b></td></tr>';
            xml += '<tr><td align="center">' + artritis + '</td><td>Artritis</td>';
            xml += '<td align="center">' + claustrofobia + '</td><td>ClaustrofobiaAquiCambia</td>';
            xml += '<td align="center">' + epilepsia + '</td><td>Epilepsia</td>';
            xml += '<td align="center">' + hipertiroidismo + '</td><td>Hipertiroidismo</td></tr>';
            xml += '<tr><td align="center">' + asma + '</td><td>Asma</td>';
            xml += '<td align="center">' + colitis + '</td><td>Colitis</td>';
            xml += '<td align="center">' + hipotiroidismo + '</td><td>Hipotiroidismo</td>';
            xml += '<td align="center">' + psoriasis + '</td><td>Psoriasis</td></tr>';
            xml += '<tr><td align="center">' + cancer + '</td><td>Cáncer</td>';
            xml += '<td align="center">' + eczema + '</td><td>Eczema</td>';
            xml += '<td align="center">' + gastritis + '</td><td>Gastritis</td>';
            xml += '<td align="center">' + síndromeMetabolico + '</td><td>Síndrome Metabólico</td></tr>';
            xml += '<tr><td align="center" colspan="8">   </td></tr>'
            xml += '<tr><td></td><td>Otros: </td><td align="left" colspan="6" style=\"border-bottom: thin solid\">' + otros + '</td></tr>';
            xml += '</table><p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="9" color="#FFFFFF" background-color="#346094"><b> Antecedentes Heredofamiliares</b></td></tr>';
            xml += '<tr><td align="left" colspan="3">Diabetes: <b>' + diabetes1 + '</b></td>';
            xml += '<td align="left" colspan="3">Cancer: <b>' + cancer2 + '</b></td>';
            xml += '<td align="left" colspan="3">Hipertensión Arterial: <b>' + hipertensionArterial + '</b></td></tr>';
            xml += '<tr><td align="left" colspan="3">Especifíque: <b>' + especifiqueDiabetes1 + '</b></td>';
            xml += '<td align="left" colspan="3">Especifíque: <b>' + especifiqueCancer2 + '</b></td>';
            xml += '<td align="left" colspan="3">Especifíque: <b>' + especifiqueHipertensionArterial + '</b></td></tr>';
            xml += '</table><p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="10" color="#FFFFFF" background-color="#346094"><b> Antecedentes Ginecoobstretas (si aplica)</b></td></tr>';
            xml += '<tr><td align="left" colspan="3">Menarca: <b>' + menarca + '</b></td>';
            xml += '<td align="left" colspan="3">Fecha de última mensatruación: <b>' + menstruacion + '</b></td>';
            xml += '<td align="center" colspan="3">Embarazos</td> ';
            xml += '<td align="left" colspan="0"></td></tr>';
            xml += '<tr><td colspan="3"></td><td colspan="3"></td><td align="right" colspan="1">' + g + '</td><td align="left" colspan="2">G</td></tr>';
            xml += '<tr><td colspan="3"></td><td colspan="3"></td><td align="right" colspan="1">' + p + '</td><td align="left" colspan="2">P</td></tr>';
            xml += '<tr><td colspan="3"></td><td colspan="3"></td><td align="right" colspan="1">' + c + '</td><td align="left" colspan="2">C</td></tr>';
            xml += '<tr><td colspan="3"></td><td colspan="3"></td><td align="right" colspan="1">' + a + '</td><td align="left" colspan="2">A</td></tr>';
            xml += '</table><p></p>';

            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="9" color="#FFFFFF" background-color="#346094"><b> Exploración física</b></td></tr>';
            xml += '<tr><td align="left"> Aspecto externo del paciente (condición)</td>';
            xml += '<td align="left"> Fascies (expresión de cara) del paciente</td>';
            xml += '<td align="left"> Frecuencia cardiaca</td></tr>';
            xml += '<tr><td><b>' + aspectoFisico + '</b></td>';
            xml += '<td><b>' + expresionCara + '</b></td>';
            xml += '<td><b>' + frecuenciaCardiaca + '</b></td></tr>';
            xml += '<tr><td> Sexo del paciente (aparente)</td>';
            xml += '<td> Movimientos anormales</td>';
            xml += '<td> Frecuencia respiratoria</td></tr>';
            xml += '<tr><td><b>' + sexoAparente + '</b></td>';
            xml += '<td><b>' + movimientosAnormales + '</b></td>';
            xml += '<td><b>' + frecuenciaRespiratoria + '</b></td></tr>';
            xml += '<tr><td> Edad (aparente)</td>';
            xml += '<td> Mancha anormal</td>';
            xml += '<td> Peso</td></tr>';
            xml += '<tr><td><b>' + edadAparente + '</b></td>';
            xml += '<td><b>' + manchaAnormal + '</b></td>';
            xml += '<td><b>' + peso + '</b></td></tr>';
            xml += '<tr><td> Constitución del paciente</td>';
            xml += '<td> Estado de conciencia</td>';
            xml += '<td> Talla</td></tr>';
            xml += '<tr><td><b>' + constitucionPaciente + '</b></td>';
            xml += '<td><b>' + estadoConciencia + '</b></td>';
            xml += '<td><b>' + talla + '</b></td></tr>';
            xml += '<tr><td> Conformación del paciente</td>';
            xml += '<td> Temperatura</td>';
            xml += '<td> Datos de la especialidad</td></tr>';
            xml += '<tr><td><b>' + conformacionPaciente + '</b></td>';
            xml += '<td><b>' + temperatura + '</b></td>';
            xml += '<td><b>' + especialidad + '</b></td></tr>';
            xml += '<tr><td> Actitud del paciente</td>';
            xml += '<td> Presión arterial</td>';
            xml += '<td></td></tr>';
            xml += '<tr><td><b>' + actitudPaciente + '</b></td>';
            xml += '<td><b>' + presionArterial + '</b></td>';
            xml += '<td></td></tr>';
            xml += '</table><p></p>';
            xml += '<div style=\"page-break-after: always;\"></div>';
            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
            if (subsidiaryText == "Mexico") {
                xml += avisoMexico;
            } else if (subsidiaryText == "Colombia") {
                xml += avisoColombia;
            } else if (subsidiaryText == "España") {
                xml += avisoEspana;
            } else {
                xml += avisoMexico;
            }
            xml += '<p></p><p></p>';
            xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
            xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';
            xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>' + altname + '</b></p>';
            xml += '<div style=\"page-break-after: always;\"></div>';
            xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            if (subsidiaryText == "Mexico") {
                xml += contratoMexico;
            } else if (subsidiaryText == "Colombia") {
                xml += contratoColombia;
            } else if (subsidiaryText == "España") {
                xml += contratoEspana;
            } else {
                xml += contratoMexico;
            }

            xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
            xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />' + altname + '</b></p>';

            xml += '</body></pdf>';
            context.response.renderPdf({ xmlString: xml });
        }

        function getImageBackGround(sucursal) {
            var imageBack = "";
            if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
                imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            }
            else {
                if (sucursal == "22") // Altavista KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                if (sucursal == "35") // Can-Cun KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                if (sucursal == "36") // Chihuahua KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                if (sucursal == "23") // Guadalajara KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                if (sucursal == "24") // Monterrey KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                if (sucursal == "25") // Polanco KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                if (sucursal == "37") // Puebla KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                if (sucursal == "21") // Santa FE KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                if (sucursal == "26") // Satelite KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                if (sucursal == "27") // Tijuana KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                if (sucursal == "28") // Veracruz KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            }
            return imageBack;
        }

        function sucursalReal(sucursalText){
            var largoSucrusal = sucursalText.length;
            largoSucrusal = largoSucrusal - 4;
            var sucursalFinal = sucursalText.slice(0, largoSucrusal);
            return sucursalFinal;
          }

        function checado(checks) {
            var check = "";
            if (checks == true) {
                var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                check = "<img height=\"15px\" width=\"15px\" src=\"" + xmlMod.escape({ xmlText: path }) + "\" />";
            } else if (checks == false) {
                var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                check = "<img height=\"15px\" width=\"15px\" src=\"" + xmlMod.escape({ xmlText: path2 }) + "\"/>";
            }
            return check;
        }

        return {
            onRequest: onRequest
        };

    });
