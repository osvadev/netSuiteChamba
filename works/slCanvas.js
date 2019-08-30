/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record'],

  function (widget, url, https, file, record) {

    function onRequest(context) {
      var recordCase_Id = context.request.parameters.recordCaseId;
      var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true });
      var IDClient = objRecord.getValue({ fieldId: 'company' });
      var fecha = objRecord.getText({ fieldId: 'startdate' });
      var edad = objRecord.getText({ fieldId: 'custevent283' });

      var sucursalTexto = objRecord.getText({ fieldId: 'custevent2' });
      var sucReal = sucursalReal(sucursalTexto);

      var mergeRecord = record.load({
        type: 'customer',
        id: IDClient,
        isDynamic: true
      });
      var age = mergeRecord.getValue({
        fieldId: "custentity149"
      });
      log.debug("Edad:", age);
      var subsidiary = mergeRecord.getValue({
        fieldId: "subsidiary"
      });
      var name = mergeRecord.getValue({
        fieldId: "altname"
      });
      var cfp = mergeRecord.getValue({
        fieldId: "custentity251"
      });


      //  log.debug("name: ", nombre);
      //  log.debug("fecha: ", fecha);
      //var formulario = widget.createForm({title: 'Firma de Consentimiento'});
      var formulario = widget.createForm({ title: 'Firma de Consentimiento' });
      //var url = 'https://soportekaloni.com/consentimiento/';
      var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
      /*iframeField.defaultValue = '<iframe style="display: block; height: 80vh; width: 100%; border: none;" src="' + url + '"></iframe>';*/
      var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
      var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });

      if (subsidiary == '6')///MX 6
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</h1>' +
          '<p id="texto">' +
          '<b>FECHA:' + fecha + '</b></p><br/>' + cfp +
          '<p id="texto">' +
          'Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + age + '</b> años de edad, declaro libremente que se me informó en forma amplia, clara, precisa y sencilla de los riesgos y' +
          ' beneficios de someterme al <b>procedimiento de injerto</b> de cabello en Kaloni Holding Group,' +
          ' Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br />' +
          '<b>RIESGOS</b><br /><br />' +
          '<p id="texto">Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p><br />' +
          '<p id="texto">' +
          'Sangrado. Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, que pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p><br />' +
          '<p id="texto">' +
          'Infección. A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p><br/>' +
          '<p id="texto">' +
          'Asimetría. La cara humana es normalmente asimétrica. Puede haber variación entre un lado y otro tras un procedimiento de trasplante capilar.</p><br/>' +
          '<p id="texto">' +
          'Anestesia. La anestesia realizada durante el procedimiento es local inyectable, sin embargo implica ciertos riesgos como reacción alérgica, edema y pérdida transitoria de la sensibilidad local.</p><br/>' +
          '<p id="texto">' +
          'Resultados insatisfactorios. El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p><br/>' +
          '<p id="texto">' +
          'Reacciones alérgicas. Aunque es muy poco probable podrían producirse alergias locales al material o líquidos utilizados para asepsia. Pueden ocurrir también reacciones sistémicas de las medicaciones utilizadas durante el procedimiento o prescritas para el post. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p><br/>' +
          '<p id="texto">' +
          'Retraso en la cicatrización. Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p><br/>' +
          '<p id="texto">' +
          'Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo entiendo  que no es posible asegurar o garantizar un resultado exacto, ya que dicho resultado puede variar en razón de factores como cuidados del propio paciente, condiciones externas incluyendo factores fortuitos relacionados con la idiosincrasia propia de cada paciente.</p><br/>' +
          '<b>BENEFICIOS</b><br /><br />' +
          '<p id="texto">Recuperación de densidad capilar en la zona a implantar (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p><br />' +
          '<b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br /><br />' +
          '<p id="texto">1.   Por el presente documento, autorizo al equipo médico y los auxiliares médicos de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</p><br />' +
          '<p id="texto">2.   He sido también informado(a) que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la legislación Mexicana aplicable.</p><br />' +
          '<p id="texto">3.   Autorizo la toma de fotografías de la zona con fines clínicos.</p><br />' +
          '<p id="texto">4.   Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos. </p><br />' +
          '<p id="texto">5.   Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme. </p><br />' +
          '<p id="texto">6.   Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p><br />' +
          '<p id="texto">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p><br /><br />' +
          '<p id="texto"></p>' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'FIRMA DEL PACIENTE</b></p>' +
          '<p id="texto"></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }
      else if (subsidiary == '10')///CO 10
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO </h1>' +
          '<p id="texto">' +
          '<b>FECHA:' + fecha + '</b></p><br/>' +
          '<p id="texto">' +
          'Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + age + '</b> años de edad, declaro libremente que se me informó en forma amplia, clara, precisa y sencilla de los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que he formulado las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.' +
          '</p><br />' +
          '<p id="texto">He sido informado, igualmente, que puede existir cierta predisposición a presentar respuestas alérgicas, reacciones adversas por idiosincrasia propia a medicamentos utilizados durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos.</p><br />' +
          '<p id="texto">' +
          'Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo reconozco que no se me ha asegurado ni garantizado que el resultado del procedimiento de injerto de cabello necesariamente alcance los beneficios esperados, incluyendo factores fortuitos propios de la idiosincrasia propia de cada paciente.</p><br />' +
          '<p id="texto">' +
          'Asimismo, declaro que se me informó y me obligo a cumplir con las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para que los implantes logren el objetivo esperado.</p><br/>' +
          '<p id="texto">' +
          'Se y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</p><br/>' +
          '<p id="texto">' +
          'He sido también informado(a) de que mis datos personales serán protegidos e incluidos en un expediente clínico, que deberá estar sometido a las garantías de la Norma aplicable. Asimismo, autorizo la toma de fotografías de la zona con fines clínicos, garantizándose la confidencialidad de mi expediente.</p><br/>' +
          '<p id="texto">' +
          'Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p><br/>' +
          '<p id="texto">' +
          'Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) de la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad en presencia de mis testigos y/o familiares sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento de implante de cabello.</p><br/>' +
          '<p id="texto"></p>' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'FIRMA DEL PACIENTE</b></p>' +
          '<p id="texto"></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }

      else if (subsidiary == '12')///ES 12
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO </h1>' +
          '<p id="texto">' +
          '<b>FECHA:' + fecha + '</b></p><br/>' +
          '<p id="texto">' +
          'Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + age + '</b> años de edad, declaro libremente que se me informó de manera amplia, clara, precisa y sencilla sobre todos los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que ya he formulado todas las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.' +
          '</p><br />' +
          '<p id="texto">He sido informado, que en atención a la idiosincrasia idiopática de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas por idiosincrasia propia a medicamentos utilizados durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos.</p><br />' +
          '<p id="texto">' +
          'Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere ese consentimiento, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p><br />' +
          '<p id="texto">' +
          'Asimismo, declaro que se me informó detalladamente todos los cuidados post-procedimiento, los cuales por medio del presente, me obligo a cumplir en su totalidad, también me obligo a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo deseado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados posteriores.</p><br/>' +
          '<p id="texto">' +
          'Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p><br/>' +
          '<p id="texto">' +
          'Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) con la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento frente a dos testigos, por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento</p><br/>' +
          '<p id="texto"></p>' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'FIRMA DEL PACIENTE</b></p>' +
          '<p id="texto"></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }
      else if (subsidiary == '11')///BR 11
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">TERMO DE CONSENTIMENTO INFORMADO PARA O PROCEDIMENTO DE\n' +
          'TRANSPLANTE CAPILAR\n </h1>' +
          '<p id="texto">' +
          '<b>INTRODUÇÃO</b></p><br/>' +
          '<p id="texto">' +
          'Este é um documento que foi elaborado para ajudar o seu médico a lhe informar sobre a cirurgia de transplante capilar, seus riscos e alguns cuidados necessários durante todo o tratamento.' +
          '</p><br />' +
          '<b>RISCOS</b></p><br/>' +
          '<p id="texto">' +
          '<b>Sangramento.</b> É possível que você apresente sangramento durante ou após a cirurgia. Medicamentos como aspirina ou anti-inflamatórios, que podem aumentar o risco de hemorragias, não devem ser usados 03 (três) dias antes do procedimento. A hipertensão arterial e outras doenças, como coagulopatias, também podem causar um maior sangramento.</p><br/>' +
          '<p id="texto">' +
          'É preciso seguir todos os cuidados recomendados para evitar excesso de sangue na área manipulada, o que pode atrasar a cicatrização.</p><br />' +
          '<p id="texto">' +
          '<b>Infecção.</b> Apesar de ser um procedimento ambulatorial, realizado com todos os cuidados adequados de assepsia, existe o risco do surgimento de um quadro infeccioso posteriormente. Caso isso aconteça, entre em contato conosco e serão tomadas todas as medidas cabíveis, como a prescrição de antibióticos específicos para o seu caso.</p><br/>' +
          '<p id="texto">' +
          '<b>Foliculite.</b> Durante o período de cicatrização ou de crescimento dos fios implantados, podem surgir pontos de foliculite. É importante seguir as recomendações pós-procedimento para na tentativa de evitar o quadro. Pacientes com tendência à formação de quelóides, podem apresentar uma variante queloidiana de foliculite.</p><br/>' +
          '<p id="texto">' +
          '<b>Assimetria.</b> A face humana é normalmente assimétrica. Pode haver variação entre um lado e outro após um procedimento de transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '<b>Anestesia.</b> A anestesia realizada durante o procedimento é local injetável, no entanto implica certos riscos como reação alérgica, edema e perda transitória da sensibilidade local.</p><br/>' +
          '<p id="texto">' +
          '<b>Resultados insatisfatórios.</b> O número de cabelos enxertados depende, entre outros fatores, da extensão da região receptora, da densidade da zona doadora e da característica estrutural dos fios (loiro, moreno, grosso, fino, liso, crespo...). Em alguns casos, pode ser que a\n' +
          'quantidade de folículos aptos para extração não esteja de acordo com a expectativa do paciente. A decisão de submeter-se ao tratamento é individual.\n</p><br/>' +
          '<p id="texto">' +
          '<b>Reações alérgicas.</b> Mesmo raras, podem ocorrer alergias locais ao material ou líquidos.</p><br/>' +
          '<p id="texto">' +
          'utilizados para assepsia. Podem ocorrer também reações sistêmicas das medicações utilizadas durante o procedimento ou prescritas para o pós. As reações alérgicas podem requerer tratamento adicional.</p><br/>' +
          '<p id="texto">' +
          '<b>Queda de cabelo.</b> Pode ocorrer perda de cabelo tanto ao redor da zona doadora como na área receptora do cabelo após alguns dias de procedimento. Esta perda se recupera em torno de 3 meses e o cabelo segue com seus ciclos normais de crescimento e queda. A ocorrência disso não é esperada e também não é frequente, mas pode causar ansiedade no paciente.</p><br/>' +
          '<p id="texto">' +
          '<b>Atraso na cicatrização.</b> Pacientes fumantes e diabéticos têm um risco maior de complicações quanto à cicatrização. O uso de alguns medicamentos, como a isotretinoína por exemplo, também pode atrasar esse processo.</p><br/>' +
          '<p id="texto">' +
          '<b>Efeitos a longo prazo.</b> O transplante capilar não detém o processo de afinamento e queda do cabelo nativo. Pode ser necessário um outro procedimento futuro ou outros tratamentos adicionais para manter os resultados.</p><br/>' +
          '<p id="texto">' +
          '<b>Número de folículos.</b> Não garantimos uma quantidade máxima de folículos extraídos, isso dependerá única e exclusivamente da sua zona doadora. Quando necessário, trabalhamos com extração máxima, ou seja, serão retirados o maior número de fios possíveis para cada caso. É importante saber que tudo o que é extraído não voltará a nascer, desta forma, devemos ter cautela para preservar esta zona e evitar falhas. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar resultados que não foram possíveis na primeira sessão. Caso seja necessário, será cobrado um novo valor de menor custo.</p><br/>' +
          '<p id="texto">' +
          '<b>NECESSIDADE DE UM PROCEDIMENTO ADICIONAL</b></p><br/>' +
          '<p id="texto">' +
          'Uma única sessão de transplante capilar pode não ser o suficiente para conseguir o resultado desejado. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar os resultados que não foram possíveis na primeira sessão. O paciente também deve ter consciência que o procedimento não detém o afinamento e a queda do cabelo nativo, o que pode requerer tratamentos adicionais. A prática da medicina não é uma ciência exata e não há garantia explícita ou implícita sobre os resultados que poderá obter. Caso seja necessário um outro procedimento, será cobrado um novo valor de menor custo.</p><br/>' +
          '<p id="texto">' +
          '<b>OBSERVAÇÕES FINAIS</b></p><br/>' +
          '<p id="texto">' +
          'Os documentos de consentimento informado são utilizados para informar sobre o tratamento médico proposto para uma condição determinada ou patologia, assim como para mostrar os riscos e possíveis complicações.</p><br/>' +
          '<p id="texto">' +
          'Porém, não se deve considerar que os documentos de consentimento informado incluam todos os aspectos sobre o procedimento. Seu médico pode proporcionar informação adicional, baseado em todos os fatos específicos do seu caso.</p><br/>' +
          '<p id="texto">' +
          'Os documentos de consentimento informado não pretendem definir ou servir como o modelo do cuidado médico. Isso será determinado com base em todos os fatos individualmente, e está sujeito a mudanças, sendo que o conhecimento científico e a tecnologia avançam e os modelos de prática também.</p><br/>' +
          '<p id="texto">' +
          'É importante que leia cuidadosamente as informações anteriores e que tenha respondido todas as suas dúvidas antes de assinar este consentimento.</p><br/>' +
          '<p id="texto">' +
          '<b>CONSENTIMENTO PARA O PROCEDIMENTO</b></p><br/>' +
          '<p id="texto">' +
          '1. Pelo presente documento, autorizo a equipe médica e os ajudantes da KALONI a realizar o seguinte procedimento: auto transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '2. Confirmo o recebimento do informativo: Termo de consentimento informado para transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '3. Dou o consentimento para o protocolo de fotografias que será realizado, com fins médicos, sendo que minha identidade não será revelada nas imagens.</p><br/>' +
          '<p id="texto">' +
          '4. Autorizo que sejam coletadas amostras de meu sangue para o propósito específico de utilização durante o procedimento, estando ciente que todo o material coletado será descartado após utilização.</p><br/>' +
          '<p id="texto">' +
          'Foi explicado de forma detalhada o procedimento que será realizado. Dou o consentimento para tal procedimento e no caso de existir alguma modificação da técnica a ser realizada, assim como alguma modificação na indicação primária durante o procedimento, autorizo a equipe médica a mudar o que foi exposto anteriormente, se assim a urgência for necessária.</p><br/>' +
          '<p id="texto">' +
          'Autorizo o procedimento e estou ciente dos pontos citados acima, estando satisfeito com a informação que me foi dada. São Paulo, Data: <b>' + fecha + '</b></p><br/>' +
          '<p id="texto"></p><br /><br />' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'Assinatura do paciente\n</b></p>' +
          '<p id="texto">' +
          'CPF: ' + cfp + '</p><br/>' +
          '<p id="texto"></p><br /><br />' +
          '<p style="text-align: center;"><img id=\"myImgFirmaMed\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'Assinatura do Médico Responsável</b></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }

      firmasCambas.defaultValue = '<style type="text/css">' +
        '@media only screen and (min-width: 576px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
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
        'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
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
        'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 280px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 1200px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 280px;' +
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
        '  overflow: auto; ' +
        '  background-color: rgb(0,0,0); ' +
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
        '</style>' +

        '<div id="myModal" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL CLIENTE</center></b>' +
        '</div>' +
        '</div>' +

        '<div id="myModalM" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL MEDICO</center></b>' +
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

      if (subsidiary == '11')//BR
      {
        var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
        fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
        formulario.addButton({ id: 'custpage_01', label: 'Enviar Firmas', functionName: 'enviarFirmas' });
        formulario.addButton({ id: 'custpage_0112', label: 'Firmar Cliente', functionName: 'abrirModal' });
        formulario.addButton({ id: 'custpage_0112', label: 'Firmar Medico', functionName: 'abrirModalEd' });
        formulario.addButton({ id: 'custpage_0113', label: 'Limpiar Firma Cliente', functionName: 'limpiarFirmaCli' });
        formulario.addButton({ id: 'custpage_0113', label: 'Limpiar Firma Medico', functionName: 'limpiarFirmaMed' });
        formulario.clientScriptFileId = '2279627';
        context.response.writePage(formulario);
      } else {
        var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
        fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
        formulario.addButton({ id: 'custpage_01', label: 'Enviar Firma', functionName: 'enviarFirmas' });
        formulario.addButton({ id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal' });
        formulario.addButton({ id: 'custpage_0113', label: 'Limpiar Firma', functionName: 'limpiarFirmaCli' });
        formulario.clientScriptFileId = '2078646';
        context.response.writePage(formulario);
      }

      function sucursalReal(sucursalText) {
        var largoSucrusal = sucursalText.length;
        largoSucrusal = largoSucrusal - 4;
        var sucursalFinal = sucursalText.slice(0, largoSucrusal);
        return sucursalFinal;
      }

    }
    return {
      onRequest: onRequest
    };

  });
