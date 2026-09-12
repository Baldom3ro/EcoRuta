# EcoRuta

## 1. Objetivo del proyecto
EcoRuta es un sistema de gestión y rastreo de rutas de recolección de basura, enfocado en la operación de camiones con GPS físico y en la transparencia para la ciudadanía. La plataforma combina una parte web para administración y una experiencia móvil para ciudadanos y operadores, con el objetivo de mejorar la visibilidad, la puntualidad y la atención de incidencias.

## 2. Decisiones definidas
A partir del análisis de negocio, se definieron estas decisiones:

- La solución tendrá una parte web independiente para administración.
- La app móvil estará enfocada a ciudadanos y operadores como complemento del sistema.
- La ciudadanía verá la ubicación en tiempo real del camión y una estimación del tiempo de llegada.
- El GPS aún necesita definirse en detalle: modelo, conectividad, frecuencia de actualización y modo de transmisión.
- El administrador gestionará todas las rutas y cada zona operativa.
- Los ciudadanos podrán reportar incidencias con foto y descripción, como camiones que no pasan, retrasos prolongados, mala práctica, falta de servicio y basura acumulada.
- Las notificaciones serán push dentro de la app para avisar sobre llegada próxima, fallas, retrasos o cancelaciones.
- El operador deberá seguir la ruta asignada y solo podrá cambiarla si hay un problema real.
- El sistema debe mantener un historial de recorrido por semana, ruta, zona y camión.
- Se deben generar alertas automáticas cuando el camión se desvíe, se retrase demasiado o se detenga definitivamente.
- El sistema está pensado para Gutierrez Zamora, pero diseñado para escalar a más ciudades.

## 3. Usuarios del sistema
- Ciudadano
- Operador de camión
- Administrador

## 4. Entidades principales
- Usuario
- Camión
- Ruta
- Zona
- Reporte
- Notificación
- Historial de recorrido
- Alerta

## 5. Alcance funcional general
### 5.1 Parte web (administración)
El administrador será la pieza central del sistema y tendrá acceso a:
- gestión de usuarios y perfiles,
- registro y edición de rutas,
- asignación de camiones a rutas,
- administración por zonas y ciudades,
- visualización en tiempo real de recorrido de los camiones,
- revisión de reportes ciudadanos y de operador,
- configuración de alertas y notificaciones,
- historial de rutas, tiempos, desviaciones y fallas,
- reportes operativos por semana, ruta, zona o camión.

### 5.2 App móvil (ciudadanos y operadores)
- Ciudadanos: consultar ubicación del camión, estimación de llegada, recibir notificaciones y reportar incidencias.
- Operadores: recibir ruta asignada, iniciar y finalizar recorrido, visualizar el mapa, reportar incidencias del camión y del servicio.

## 6. Flujo de negocio completo

### 6.1 Flujo del administrador
1. El administrador crea o edita una ciudad y sus zonas.
2. Define las rutas de recolección por zona.
3. Asigna un camión, horario y operador a cada ruta.
4. Configura la frecuencia de actualización del GPS y las alertas automáticas.
5. Monitorea en tiempo real el movimiento de los camiones desde el panel web.
6. Observa si hubo desviaciones, retrasos o paradas prolongadas.
7. Revisa reportes generados por ciudadanos y por operadores.
8. Emite una respuesta operativa: reasignar ruta, enviar notificación, reportar un problema o activar seguimiento manual.
9. Consulta el historial por semana, ruta, zona o camión para análisis.
10. Escala el sistema a nuevas ciudades con la misma estructura de administración.

### 6.2 Flujo del operador
1. El operador inicia sesión en la app móvil.
2. Recibe la ruta asignada con su zona y horarios.
3. Verifica la ruta y el camión asignado.
4. Inicia el recorrido desde la app.
5. El GPS del camión envía la geolocalización en tiempo real.
6. El sistema actualiza la ruta y el estatus del camión.
7. El operador recibe alertas si hay retrasos, desviaciones, paradas o fallas.
8. Si ocurre un problema real, puede cambiar la ruta manualmente con justificación.
9. Finaliza la ruta al concluir el recorrido.
10. El sistema registra el historial del recorrido para análisis y reportes.

### 6.3 Flujo del ciudadano
1. El ciudadano accede a la app para ver el estado general de la recolección en su zona.
2. Consulta la ubicación del camión y la estimación de tiempo de llegada a su domicilio o zona cercana.
3. Recibe notificaciones cuando el camión está por llegar, hay retraso, cancelación o falla en la ruta.
4. Si el servicio no se cumple, puede reportar una incidencia con:
   - descripción del problema,
   - foto de la situación,
   - ubicación aproximada,
   - tipo de incidente.
5. El sistema registra el reporte y lo envía al administrador o al operador correspondiente.
6. El ciudadano puede ver la actualización del estado del caso si se atiende el problema.

## 7. Historias de usuario detalladas

### 7.1 Historias del ciudadano

#### HU-01: Ver ubicación del camión en tiempo real
- Como ciudadano, quiero ver la ubicación del camión de basura en tiempo real, para saber si ya va en camino o si se está acercando a mi zona.
- Criterios de aceptación:
  - La app muestra un mapa con la ubicación actual del camión.
  - El usuario puede ver el estado del servicio: en ruta, retrasado, cancelado o finalizado.
  - La ubicación se actualiza con el último dato recibido del GPS.

#### HU-02: Ver estimación de llegada
- Como ciudadano, quiero ver el tiempo estimado de llegada del camión a mi zona, para planificar mi actividad.
- Criterios de aceptación:
  - La app calcula la ETA basada en la ubicación del camión y la ruta asignada.
  - El tiempo estimado cambia si el camión se retrasa o se desvía.
  - El ciudadano puede ver la ETA sin necesidad de abrir más pantallas.

#### HU-03: Recibir notificaciones de proximidad
- Como ciudadano, quiero recibir una notificación cuando el camión esté por llegar, para saber cuándo debo sacar la basura.
- Criterios de aceptación:
  - El sistema envía una notificación push cuando el camión entra en un radio de proximidad definido.
  - La notificación incluye distancia o tiempo estimado restante.
  - El ciudadano puede desactivar o activar las notificaciones desde la configuración.

#### HU-04: Recibir alertas por retraso o cancelación
- Como ciudadano, quiero recibir notificaciones por retrasos o cancelaciones, para estar informado sobre cambios en el servicio.
- Criterios de aceptación:
  - El sistema notifica cuando la ruta se retrasa más del tiempo estimado.
  - Se envía aviso por cancelación de ruta o por falla operativa.
  - El ciudadano puede ver el motivo del cambio.

#### HU-05: Reportar incidencia del servicio
- Como ciudadano, quiero reportar una incidencia como falta de servicio, retraso excesivo o basura acumulada, para alertar al sistema.
- Criterios de aceptación:
  - El ciudadano puede seleccionar un tipo de incidencia.
  - Puede adjuntar una foto y una descripción.
  - El reporte se guarda con fecha, hora, ubicación y tipo de problema.
  - El reporte queda visible para el administrador y el operador correspondiente.

#### HU-06: Consultar estados de reportes
- Como ciudadano, quiero consultar el estado de mi reporte, para saber si ya fue revisado o atendido.
- Criterios de aceptación:
  - El ciudadano puede ver una lista de sus reportes.
  - Cada reporte muestra estado: recibido, en revisión, atendido o cerrado.
  - El usuario puede ver comentarios o actualización del administrador.

### 7.2 Historias del operador

#### HU-07: Iniciar sesión y ver ruta asignada
- Como operador, quiero iniciar sesión y ver la ruta que me fue asignada, para conocer mi recorrido del día.
- Criterios de aceptación:
  - El operador puede autenticarse con credenciales válidas.
  - La app muestra la ruta activa, el horario y el camión asignado.
  - El operador puede visualizar la ruta en un mapa.

#### HU-08: Iniciar recorrido
- Como operador, quiero iniciar el recorrido desde la app, para registrar el inicio del servicio.
- Criterios de aceptación:
  - La app permite iniciar ruta cuando el camión está disponible.
  - El sistema registra hora de inicio y ubicación inicial.
  - El estado del camión cambia a “en recorrido”.

#### HU-09: Ver ubicación y seguimiento en tiempo real
- Como operador, quiero ver mi ubicación en tiempo real y la ruta asignada, para cumplir la recolección sin desviarme.
- Criterios de aceptación:
  - La app muestra la ubicación del camión en tiempo real.
  - La ruta activa se dibuja sobre el mapa.
  - El operador puede distinguir entre ruta programada y recorrido real.

#### HU-10: Recibir alertas del sistema
- Como operador, quiero recibir alertas por retraso, desviación o paro prolongado, para responder a tiempo.
- Criterios de aceptación:
  - La app muestra alertas cuando ocurre una condición crítica.
  - La alerta indica la causa probable y el tiempo de activación.
  - El operador puede aceptar o cerrar la alerta.

#### HU-11: Reportar problema del camión o de la ruta
- Como operador, quiero reportar problemas del camión o de la ruta, para informar al administrador y evitar fallas operativas.
- Criterios de aceptación:
  - El operador puede seleccionar el tipo de problema.
  - Puede agregar descripción y foto si aplica.
  - El sistema guarda el reporte con fecha, zona y camión.

#### HU-12: Finalizar recorrido
- Como operador, quiero finalizar la ruta una vez concluido el servicio, para cerrar la operación de manera correcta.
- Criterios de aceptación:
  - La app permite cerrar la ruta solo si el recorrido se completó o se canceló con causa.
  - El sistema registra la hora final y el recorrido realizado.
  - El estado cambia a “ruta finalizada”.

#### HU-13: Cambiar ruta manualmente ante un problema
- Como operador, quiero modificar la ruta asignada solo si hay un problema real, para continuar atendiendo el servicio sin perder control.
- Criterios de aceptación:
  - El operador puede cambiar la ruta únicamente con justificación.
  - El administrador recibe la notificación del cambio.
  - El sistema guarda el histórico del cambio.

### 7.3 Historias del administrador

#### HU-14: Gestionar ciudades y zonas
- Como administrador, quiero crear y gestionar ciudades y zonas, para estructurar la operación por localidades.
- Criterios de aceptación:
  - El administrador puede añadir, editar o eliminar zonas.
  - Cada zona se asocia a una ciudad y a rutas específicas.
  - Se puede visualizar el mapa de cada zona.

#### HU-15: Crear y mantener rutas
- Como administrador, quiero crear rutas de recolección, para definir los recorridos por zona y horario.
- Criterios de aceptación:
  - El administrador puede definir nombre, zona, días de operación y horario.
  - La ruta puede ser activa o inactiva.
  - Se puede asignar un camión y un operador a la ruta.

#### HU-16: Asignar camiones y operadores
- Como administrador, quiero asignar camiones y operadores a cada ruta, para asegurar que la operación se ejecute correctamente.
- Criterios de aceptación:
  - El sistema valida que el camión esté disponible.
  - El operador puede estar asociado a una sola ruta activa en un momento dado.
  - La asignación queda registrada en el historial.

#### HU-17: Supervisar rutas en tiempo real
- Como administrador, quiero ver todas las rutas y camiones activos en el mapa, para monitorear la operación en tiempo real.
- Criterios de aceptación:
  - El panel web muestra todos los camiones activos y sus rutas.
  - Se visualiza el estado de cada recorrido.
  - Se diferencian rutas normales, retrasadas, desviadas o detenidas.

#### HU-18: Gestionar alertas automáticas
- Como administrador, quiero configurar alertas automáticas por desviación, retraso o paro, para reaccionar antes de que el servicio se deteriore.
- Criterios de aceptación:
  - El sistema puede activar una alerta ante reglas predefinidas.
  - La alerta se muestra en el panel del administrador.
  - El administrador puede enviar seguimiento o resolver la incidencia desde la misma vista.

#### HU-19: Revisar reportes ciudadanos y operativos
- Como administrador, quiero revisar los reportes de los ciudadanos y operadores, para responder de forma oportuna.
- Criterios de aceptación:
  - El administrador puede filtrar reportes por zona, tipo y fecha.
  - Los reportes muestran descripción, foto, ubicación y estado.
  - El administrador puede cambiar el estado y dejar observación.

#### HU-20: Gestionar notificaciones push
- Como administrador, quiero enviar notificaciones push según eventos relevantes, para informar a la comunidad o al personal operativo.
- Criterios de aceptación:
  - El sistema permite crear una notificación masiva o puntual.
  - Se puede definir zona, tipo de usuario y prioridad.
  - La notificación incluye título, descripción y fecha de envío.

#### HU-21: Consultar historial de recorrido
- Como administrador, quiero revisar el historial por semana, ruta, zona o camión, para evaluar el desempeño del servicio.
- Criterios de aceptación:
  - El administrador puede consultar registros por fecha, zona, una ruta específica o un camión.
  - El sistema muestra tiempos de recorrido, incidencias y alertas.
  - El historial es exportable o consultable desde reportes.

#### HU-22: Escalar a nuevas ciudades
- Como administrador, quiero replicar el sistema para más ciudades, para expandir el servicio sin reestructurar completamente la plataforma.
- Criterios de aceptación:
  - El sistema soporta múltiples ciudades con configuración independiente.
  - Cada ciudad tiene zonas, rutas, camiones y usuarios separados.
  - El administrador puede cambiar el contexto de operación por ciudad.

### 7.4 Historias transversales del sistema

#### HU-23: Detección automática de retrasos y desviaciones
- Como sistema, quiero detectar automáticamente desviaciones, retrasos o paradas prolongadas, para alertar al operador y al administrador.
- Criterios de aceptación:
  - El sistema compara la ubicación del camión con la ruta esperada.
  - Se activa una alerta si el vehículo se sale de la ruta o supera el tiempo permitido.
  - La alerta queda registrada en el historial.

#### HU-24: Registrar historial de operación
- Como sistema, quiero guardar el historial de cada recorrido, para permitir análisis y auditoría posterior.
- Criterios de aceptación:
  - Se registran coordenadas, tiempos, estado del camión y alertas.
  - El historial queda asociado a ruta, camión, operador y zona.
  - El dato puede consultarse en reportes posteriores.

## 8. Reglas de negocio principales
- Cada ruta debe estar asociada a una zona y a un camión asignado.
- Cada camión debe tener un operador responsable.
- La ciudadanía solo puede ver información de su zona o de los recorridos asociados a su ubicación.
- Los reportes ciudadanos deben incluir tipo de problema, descripción y evidencia fotográfica cuando sea posible.
- Las notificaciones push deben enviarse para eventos críticos y relevantes.
- El sistema debe registrar todo historial de recorrido, retrasos, paradas y alertas.
- Una ruta solo puede ser modificada por el operador bajo una condición de excepción o por el administrador.
- El sistema debe ser escalable a más ciudades, manteniendo la misma estructura de rutas, zonas, camiones y usuarios.
- Cada ciudad debe mantener su propia configuración de zonas, rutas y usuarios.

## 9. Alertas y eventos críticos
El sistema debe detectar y alertar automáticamente cuando:
- el camión se desvía de la ruta,
- el camión tarda más de lo normal,
- el camión se detiene por un tiempo prolongado,
- el camión no reporta ubicación,
- la ruta se cancela o se retrasa por una incidencia,
- la operación presenta un problema de servicio en una zona.

## 10. Recomendación de arquitectura de solución
Para este tipo de proyecto, lo más sólido es pensar en una solución con dos capas:
- web administrativa robusta para gestión operativa,
- app móvil para ciudadanos y operadores con seguimiento geográfico y notificaciones push.

En términos de tecnología, Flutter es una excelente opción para la parte móvil por su rendimiento, geolocalización y facilidad para compilar Android e iOS. La web administrativa puede estar desarrollada en un stack separado, más centrado en dashboards, reportes y gestión operativa.

## 11. Resultado esperado
La plataforma debe permitir:
- controlar rutas de recolección en tiempo real,
- mejorar los tiempos de respuesta de los servicios,
- evitar fallas operativas y retrasos,
- informar mejor a la ciudadanía,
- reducir la incertidumbre del servicio,
- escalar de forma ordenada a más ciudades.

## 12. Siguientes pasos
A partir de este punto, el siguiente paso es convertir este documento en:
- mapa de historias de usuario detalladas,
- requisitos funcionales por rol,
- reglas de negocio más específicas,
- flujos de pantalla para web y app móvil,
- backlog inicial para desarrollo.

