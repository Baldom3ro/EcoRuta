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

## 7. Historias de usuario por rol

### Ciudadano
- Como ciudadano, quiero ver la ubicación del camión y el tiempo estimado de llegada, para saber cuándo pasa por mi zona.
- Como ciudadano, quiero recibir notificaciones push sobre retrasos, cancelaciones o proximidad del camión, para estar informado.
- Como ciudadano, quiero reportar problemas de servicio con foto y detalle, para alertar a la administración.
- Como ciudadano, quiero consultar si el camión ya pasó o si se presenta un retraso, para saber si debo esperar o tomar otra acción.

### Operador
- Como operador, quiero ver la ruta asignada y la ubicación del camión en tiempo real, para cumplir el recorrido correctamente.
- Como operador, quiero iniciar y finalizar la ruta, para registrar el servicio realizado.
- Como operador, quiero recibir alertas por desviación, retraso o paro del camión, para responder rápidamente.
- Como operador, quiero reportar problemas del camión o de la ruta, para informar al administrador.
- Como operador, quiero seguir la ruta definida por la administración y solo cambiarla si hay un problema real, para mantener control operativo.

### Administrador
- Como administrador, quiero gestionar rutas, zonas, camiones y usuarios, para organizar la operación de la ciudad.
- Como administrador, quiero supervisar en tiempo real todos los camiones y rutas, para asegurar cumplimiento.
- Como administrador, quiero revisar reportes ciudadanos y de operador, para tomar decisiones correctivas.
- Como administrador, quiero generar y gestionar notificaciones, para informar a la comunidad y al personal operativo.
- Como administrador, quiero consultar historial por ruta, zona, camión y semana, para evaluar desempeño y tomar decisiones.
- Como administrador, quiero activar alertas automáticas ante desviación, retraso o paro, para atender incidentes de forma inmediata.

## 8. Reglas de negocio principales
- Cada ruta debe estar asociada a una zona y a un camión asignado.
- Cada camión debe tener un operador responsable.
- La ciudadanía solo puede ver información de su zona o de los recorridos asociados a su ubicación.
- Los reportes ciudadanos deben incluir tipo de problema, descripción y evidencia fotográfica cuando sea posible.
- Las notificaciones push deben enviarse para eventos críticos y relevantes.
- El sistema debe registrar todo historial de recorrido, retrasos, paradas y alertas.
- Una ruta solo puede ser modificada por el operador bajo una condición de excepción o por el administrador.
- El sistema debe ser escalable a más ciudades, manteniendo la misma estructura de rutas, zonas, camiones y usuarios.

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

