/**
 * Documento predeterminado del componente NewAgreement.
 *
 * Contiene el acuerdo base (hoja oficio) con los valores del contrato
 * envueltos en <span data-campo="..."> para que el panel izquierdo de
 * campos editables pueda reescribirlos sin perder el formato del texto.
 *
 * Los campos editables desde el panel son:
 *   codigo, titulo, proyecto, area, gerente, cedula, cedulaFirma,
 *   vigencia, honorario, quincena, ciudad, fechaFirma, representante
 */

/**
 * Campos editables del panel izquierdo (valor por defecto).
 *
 * Un acuerdo nuevo se abre EN BLANCO: el usuario llena cada dato desde el
 * panel. El código no se define aquí porque lo calcula la numeración
 * automática (`generarCodigoAutomatico`) al abrir la pantalla.
 */
export const CAMPOS_DEFAULT: Record<string, string> = {
  codigo: '',
  titulo: '',
  proyecto: '',
  area: '',
  gerente: '',
  cedula: '',
  cedulaFirma: '',
  vigencia: '',
  honorario: '',
  quincena: '',
  ciudad: '',
  fechaFirma: '',
  representante: '',
};

/** Acuerdo predeterminado cargado en el editor (HTML del contrato) */
export const DOCUMENTO_DEFAULT = `
<p class="doc-codigo"><strong><span data-campo="codigo"></span></strong></p>
<p class="doc-titulo"><strong><span data-campo="titulo"></span></strong></p>

<p class="doc-clausula"><strong>CLÁUSULA PRIMERA: DATOS DEL PROYECTO Y CONTEXTO OPERATIVO</strong></p>
<p>Mediante el presente instrumento, las Partes suscribientes formalizan la iniciación de las actividades operativas de supervisión, auditoría y detección proactiva de incidencias sobre la infraestructura tecnológica destinada al Ecosistema de Gestión Documental y Administración de Archivos "Sandra Ecosystem™", con especial atención en su nodo central de procesamiento y almacenamiento "Sandra Server".</p>
<p>El presente instrumento marca el inicio del cómputo de plazos de ejecución, la activación de los niveles de servicio (SLA) fijados y la habilitación de los mecanismos de trazabilidad, control de acceso e integridad documental conforme a las políticas de seguridad de la información aplicables.</p>
<p><strong>Denominación del Proyecto</strong></p>
<p><span data-campo="proyecto"></span></p>
<p><strong>Área / Componente Tecnológico</strong></p>
<p><span data-campo="area"></span></p>
<p><strong>Líder / Gerente de Proyecto:</strong></p>
<p><span data-campo="gerente"></span></p>
<p><strong>Vigencia del Acuerdo</strong></p>
<p><span data-campo="vigencia"></span></p>

<p class="doc-clausula"><strong>CLÁUSULA SEGUNDA: OBLIGACIÓN DE REPORTE</strong></p>
<p>El ciudadano <span data-campo="gerente"></span>, titular de la cédula de identidad <span data-campo="cedula"></span> en su condición de Gerente de Proyecto, se obliga formalmente a elaborar, validar y presentar ante el departamento de administración con copia a la asesoría jurídica dentro de los primeros cinco (5) días continuos de cada mes calendario, un Informe Técnico Consolidado de Supervisión y Custodia Documental. Dicho instrumento de control deberá contemplar, con carácter obligatorio y no limitativo:</p>
<ol class="doc-literal">
  <li>La relación detallada y cronológica de las incidencias, anomalías o interrupciones que afecten los procesos de ingreso, digitalización, indización, captura de metadatos, firmas electrónicas y clasificación archivística dentro del repositorio central de la plataforma de Gestión Documental.</li>
  <li>La valoración cualitativa y cuantitativa sobre el estado de preservación digital, los controles de acceso y permisos de usuarios, la verificación de integridad criptográfica de las imágenes y documentos alojados, así como el cumplimiento de las políticas de almacenamiento y respaldo del servidor central.</li>
  <li>La evaluación basada en métricas e indicadores de calidad sobre los tiempos de consulta, disponibilidad de los expedientes electrónicos, tiempos de procesamiento de solicitudes de búsqueda y el nivel general de respuesta operativa fijado en los Acuerdos de Nivel de Servicio.</li>
</ol>

<p class="doc-clausula"><strong>CLÁUSULA TERCERA: MODALIDAD Y HORARIO DE ATENCIÓN OPERATIVA</strong></p>
<p><strong>Esquema y Distribución de la Jornada:</strong></p>
<p>Para la efectiva ejecución de las labores de monitoreo, auditoría y control del fondo documental asignadas al Gerente de Proyecto, se establece una dedicación operativa de cuatro (04) días a la semana.</p>
<p><strong>Modalidad de Ejecución:</strong></p>
<p>La distribución de los días de atención, así como la modalidad de cumplimiento presencial en las instalaciones o mediante acceso remoto seguro a la infraestructura tecnológica, será coordinada y acordada formalmente entre el Gerente de Proyecto y el representante de SANDRA SERVER, garantizando en todo momento la continuidad operativa y la cobertura de los momentos críticos de procesamiento de información.</p>

<p class="doc-clausula"><strong>CLÁUSULA CUARTA: FUNCIONES Y ÁMBITOS DE COMPETENCIA</strong></p>
<ul class="doc-vineta">
  <li>Monitorear en tiempo real el uptime y rendimiento de los componentes Server, Sentinel, Console y Desktop del ecosistema Odin™.</li>
  <li>Clasificar alertas por criticidad (Crítica, Alta, Media, Baja) y enrutar notificaciones de forma inmediata a través de los canales autorizados.</li>
  <li>Identificar comportamientos sospechosos de usuarios y degradación de servicios mediante el uso de modelos predictivos e Inteligencia Artificial.</li>
  <li>Atender consultas técnicas iniciales de los usuarios y proporcionar soluciones temporales (workarounds) verificadas para asegurar la operatividad.</li>
  <li>Elaborar y consignar reportes diarios de estado y bitácoras de incidentes para el control de la plataforma.</li>
  <li>Analizar la disponibilidad de los servicios y proponer ajustes preventivos para evitar la interrupción del gestor de documentos.</li>
  <li>Asegurar que el monitoreo de la data técnica cumpla estrictamente con los protocolos de seguridad institucional.</li>
  <li>Ejecutar el análisis profundo de archivos de registro (logs) del sistema para identificar patrones de fallo, cuellos de botella y errores de ejecución no evidentes.</li>
  <li>Utilizar modelos de Inteligencia Artificial y razonamiento lógico para determinar el origen exacto de incidentes técnicos en el ecosistema Sandra Server.</li>
  <li>Interpretar trazas de errores complejas y traducirlas a informes técnicos accionables para el equipo de desarrollo.</li>
  <li>Revisar minuciosamente los archivos de configuración (formatos .ini, .yaml, .json, .toml) para asegurar que se ajusten a la línea base operativa del Despacho.</li>
  <li>Identificar cambios no autorizados o configuraciones erróneas que puedan comprometer la estabilidad de la plataforma Odin™.</li>
  <li>Validar que los componentes del servidor mantengan los estándares de seguridad y rendimiento establecidos.</li>
  <li>Analizar la estructura de permisos y roles de usuario para garantizar el cumplimiento del principio de "mínimo privilegio".</li>
  <li>Monitorear logs de autenticación (2FA, OAuth) para identificar intentos de acceso sospechosos o vulnerabilidades en la capa de seguridad.</li>
  <li>Asegurar que el manejo de la data técnica cumpla con los protocolos de seguridad</li>
  <li>Elaborar documentos técnicos detallados tras la resolución de fallos de alta prioridad.</li>
  <li>Consignar un análisis consolidado de la estabilidad, rendimiento y riesgos detectados durante el mes de servicio.</li>
  <li>Crear una base de conocimientos con las soluciones y diagnósticos realizados para prevenir la recurrencia de errores.</li>
</ul>

<p class="doc-clausula"><strong>CLÁUSULA QUINTA: SEGURIDAD DE LA INFORMACIÓN, PROTECCIÓN DEL REPOSITORIO DOCUMENTAL Y RESPONSABILIDAD PERSONAL</strong></p>
<p><strong>Prohibición Categórica de filtración a Herramientas de Inteligencia Artificial Externas:</strong> Queda estrictamente prohibido al Gerente de Proyecto cargar, procesar, ingresar, transmitir o alojar fragmentos de documentos, imágenes digitalizadas, expedientes electrónicos, metadatos, tablas de retención documental, registros de auditoría o credenciales de acceso en herramientas, plataformas, asistentes de lenguaje o modelos de Inteligencia Artificial externos o de acceso público que no formen parte de la infraestructura privada y bajo control directo del proyecto.</p>
<p><strong>Preservación e Inalterabilidad de los Registros de Eventos:</strong> En su condición de Gerente de Proyecto, el profesional designado no cuenta con autorización para modificar, alterar, suprimir, ocultar o eliminar, por sí mismo o por interpuesta persona, los registros de eventos (logs de trazabilidad), historiales de acceso, firmas electrónicas o marcas de tiempo generados automáticamente por la plataforma de Gestión Documental y el servidor central, debiendo garantizar en todo momento la inalterabilidad de la memoria técnica e institucional.</p>
<p><strong>Responsabilidad Personal, Directa e Individual por Omisión o Incumplimiento:</strong> La inobservancia, omisión o vulneración de lo establecido en los apartados anteriores constituirá una falta grave a los deberes de custodia y confidencialidad. El Gerente de Proyecto asumirá la responsabilidad personal, directa e individual tanto en el ámbito administrativo, contractual y laboral, como en las eventuales acciones civiles o penales a que haya lugar por los daños, perjuicios, fugas de información o compromisos a la seguridad del fondo documental que se deriven del incumplimiento u omisión de esta cláusula.</p>

<p class="doc-clausula"><strong>CLÁUSULA SEXTA: CONTRAPRESTACIÓN FINANCIERA, CONDICIONALIDAD DE PAGO Y MODALIDAD DE CANCELACIÓN</strong></p>
<p>La remuneración correspondiente a los servicios técnicos y de supervisión prestados por el Gerente de Proyecto se fija en un honorario mensual único por la cantidad de <span data-campo="honorario"></span> o su equivalente en moneda nacional. La efectividad de la liquidación estará sujeta a la consignación oportuna, verificación y aprobación técnica del Informe Técnico Consolidado de Supervisión y Custodia Documental por parte del departamento de administración.</p>
<p><strong>Cronograma y Distribución del Pago:</strong> Una vez recibido, validado y aprobado formalmente el referido informe mensual, se procederá a gestionar el pago de la contraprestación de forma fraccionada en dos quincenas de la siguiente manera: <strong>a) Primera Quincena:</strong> Los días quince (15) de cada mes calendario se cancelará el cincuenta por ciento (50%) de la contraprestación, por la cantidad de <span data-campo="quincena"></span> o su equivalente en Bolívares, calculados a la tasa de cambio oficial emitida por el Banco Central de Venezuela correspondiente a la fecha de liquidación. <strong>b) Segunda Quincena:</strong> Los días treinta (30) de cada mes calendario (o último día hábil del mes) se cancelará la cantidad restante de <span data-campo="quincena"></span> o su equivalente en Bolívares, calculados igualmente a la tasa oficial del Banco Central de Venezuela.</p>
<p><strong>Inexistencia de Obligaciones Suplementarias:</strong></p>
<p>El monto estipulado en el presente artículo constituye la totalidad de los honorarios pactados entre las Partes por concepto de la supervisión, auditoría y control del proyecto de Gestión de Documento, no generando la obligación de pagos adicionales salvo modificación expresa y por escrito mediante la suscripción de un acuerdo entre las partes.</p>

<p class="doc-clausula"><strong>CLÁUSULA SÉPTIMA: DE LA NATURALEZA DE LA RELACIÓN Y AUTONOMÍA TÉCNICA</strong></p>
<p>Las Partes declaran expresamente que el presente instrumento constituye una asignación de servicios técnicos y de supervisión de naturaleza estrictamente mercantil y profesional. En consecuencia, el Gerente de Proyecto actuará con absoluta autonomía técnica, operativa y de criterio profesional en la ejecución de las actividades de monitoreo, auditoría de archivos y control del fondo documental. Para el desarrollo de sus funciones, el Gerente de Proyecto utilizará sus propios conocimientos especializados y, en caso de estimarlo conveniente bajo los parámetros permitidos de seguridad de la información.</p>
<p>Queda expresamente entendido y convenido que no existe relación de dependencia jerárquica, subordinación ni vínculo de carácter laboral entre el Gerente de Proyecto y SANDRA SERVER. El Gerente de Proyecto será el único responsable del cumplimiento de sus obligaciones tributarias, fiscales, parafiscales y de seguridad social aplicables. SANDRA SERVER no estará obligada a la liquidación ni al pago de conceptos derivados de la legislación laboral, tales como prestaciones sociales, vacaciones, utilidades o indemnizaciones por finalización de relación de trabajo.</p>
<p>Se firma en la ciudad de <span data-campo="ciudad"></span>, en fecha al <span data-campo="fechaFirma"></span>.</p>

<p>&nbsp;</p>
<p>&nbsp;</p>
<table class="doc-firmas">
  <tbody>
    <tr>
      <td class="doc-firma-linea">__________________________</td>
      <td class="doc-firma-linea">__________________________</td>
    </tr>
    <tr>
      <td class="doc-firma-nombre"><span data-campo="gerente"></span></td>
      <td class="doc-firma-nombre"><span data-campo="representante"></span></td>
    </tr>
    <tr>
      <td class="doc-firma-cedula"><span data-campo="cedulaFirma"></span></td>
      <td class="doc-firma-cedula">&nbsp;</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
`;
