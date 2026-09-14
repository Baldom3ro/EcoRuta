# EcoRuta - Descripción de pantallas

## 1. Objetivo del documento
Este documento define la estructura de pantallas de la aplicación EcoRuta, separando la experiencia web para administración y la experiencia móvil para ciudadanos y operadores. Sirve como guía antes del diseño visual para aclarar exactamente qué contenido y funcionalidad tendrá cada vista.

---

## 2. Módulo: Web Administrativa

### 2.1 Login
Descripcion:
- Pantalla de acceso al sistema web.
- Permite iniciar sesión con correo y contraseña.
- Puede incluir recuperación de contraseña y acceso por rol.

Contenido principal:
- Campo de correo.
- Campo de contraseña.
- Botón iniciar sesión.
- Opción de recuperar contraseña.

Objetivo:
- Validar la identidad del administrador.

---

### 2.2 Dashboard principal
Descripcion:
- Pantalla inicial del panel administrativo.
- Muestra un resumen general del estado del sistema.

Contenido principal:
- Total de rutas activas.
- Total de camiones en servicio.
- Camiones en retraso.
- Reportes pendientes.
- Alertas activas.
- Mapa con ubicaciones actuales de camiones.
- Tabla de rutas más críticas o recientes.

Objetivo:
- Tener una vista operativa general de la ciudad y sus rutas.

---

### 2.3 Gestión de ciudades
Descripcion:
- Pantalla para administrar ciudades soportadas por la plataforma.

Contenido principal:
- Lista de ciudades.
- Botón para crear nueva ciudad.
- Filtros por nombre o estado.
- Acciones: editar, activar/desactivar, ver zonas.

Objetivo:
- Asegurar que la plataforma pueda escalar a más localidades.

---

### 2.4 Gestión de zonas
Descripcion:
- Pantalla para manejar zonas dentro de una ciudad.

Contenido principal:
- Lista de zonas por ciudad.
- Botón de nueva zona.
- Detalle de cada zona con nombre, ubicación y rutas asociadas.
- Filtros por barrio, sector o colonia.

Objetivo:
- Organizar operativamente la ciudad por sectores.

---

### 2.5 Gestión de rutas
Descripcion:
- Pantalla para crear y editar rutas de recolección.

Contenido principal:
- Lista de rutas.
- Crear nueva ruta.
- Datos: nombre, zona, horario, días de operación, camión asignado, operador asignado.
- Estado: activa/inactiva.
- Botón para ver recorrido en mapa.

Objetivo:
- Definir y mantener la operación de cada recorrido.

---

### 2.6 Asignación de camiones y operadores
Descripcion:
- Pantalla para asignar recursos a una ruta.

Contenido principal:
- Selector de camión disponible.
- Selector de operador disponible.
- Verificación de continuidad de servicio.
- Confirmación de asignación.
- Historial de asignaciones.

Objetivo:
- Garantizar que cada ruta tiene el recurso correcto para operar.

---

### 2.7 Mapa en tiempo real
Descripcion:
- Pantalla con vista geográfica de todos los camiones activos.

Contenido principal:
- Mapa interactivo.
- Marcadores de camiones con estado.
- Ruta programada trazada.
- Ubicación actual del camión.
- Indicadores de retraso o desviación.
- Filtros por ciudad, zona o camión.

Objetivo:
- Permitir seguimiento operativo en vivo.

---

### 2.8 Detalle de camión
Descripcion:
- Pantalla de información detallada de un camión específico.

Contenido principal:
- Datos del camión.
- Estado actual.
- Operador asignado.
- Ruta activa.
- Historial de recorrido.
- Alertas generadas.
- Ubicación actual.

Objetivo:
- Analizar el rendimiento y el estado de cada unidad.

---

### 2.9 Reportes y alertas
Descripcion:
- Pantalla para revisar todas las incidencias y alertas del sistema.

Contenido principal:
- Lista de alertas por tipo: desviación, retraso, paro, cancelación.
- Lista de reportes ciudadanos.
- Lista de reportes del operador.
- Filtros por fecha, zona, tipo, prioridad.
- Botón para cambiar estado.

Objetivo:
- Resolver incidencias de forma operativa y documentada.

---

### 2.10 Detalle de reporte
Descripcion:
- Pantalla con la información completa de una incidencia reportada.

Contenido principal:
- Tipo de reporte.
- Fecha y hora.
- Usuario que reportó.
- Ubicación.
- Descripción.
- Foto adjunta.
- Estado actual.
- Comentarios del administrador.
- Acciones: aceptar, atender, cerrar.

Objetivo:
- Centralizar la gestión de incidentes y su resolución.

---

### 2.11 Historial de rutas
Descripcion:
- Pantalla para consultar recorridos pasados.

Contenido principal:
- Tabla con rutas realizadas.
- Filtros por semana, zona, camión, ruta o ciudad.
- Fecha y hora de inicio y fin.
- Distancia recorrida.
- Tiempo total.
- Incidencias detectadas.

Objetivo:
- Analizar rendimiento, retrasos y cumplimiento operativo.

---

### 2.12 Reportes analíticos
Descripcion:
- Pantalla para generar información resumida del servicio.

Contenido principal:
- Indicadores por semana.
- Cumplimiento de rutas.
- Promedio de retrasos.
- Incidencias por zona.
- Desempeño por camión.
- Gráficas y exportación.

Objetivo:
- Tomar decisiones basadas en datos operativos.

---

### 2.13 Configuración del sistema
Descripcion:
- Pantalla general para ajustar parámetros del sistema.

Contenido principal:
- Configuración de notificaciones.
- Umbrales de retraso.
- Radio de proximidad para avisos ciudadanos.
- Frecuencia de actualización del GPS.
- Alertas automáticas.
- Roles y permisos.

Objetivo:
- Ajustar el comportamiento del sistema según la operación real.

---

## 3. Módulo: App móvil - Ciudadano

### 3.1 Splash / bienvenida
Descripcion:
- Pantalla inicial que se muestra al abrir la app.

Contenido principal:
- Logo de EcoRuta.
- Mensaje de bienvenida.
- Carga inicial de configuración.

Objetivo:
- Dar la primera impresión y preparar la app para uso.

---

### 3.2 Login / registro
Descripcion:
- Pantalla para ingresar a la app como ciudadano.

Contenido principal:
- Registro con nombre, correo, contraseña y ubicación base.
- Inicio de sesión.
- Recuperación de contraseña.

Objetivo:
- Identificar al usuario antes de consultar información.

---

### 3.3 Home ciudadano
Descripcion:
- Pantalla principal para la comunidad.

Contenido principal:
- Mapa con camión más cercano o ruta activa.
- Estado del servicio: en camino, retrasado, cancelado.
- Tiempo estimado de llegada.
- Botón para reportar problema.
- Notificaciones recientes.

Objetivo:
- Dar al ciudadano información útil de forma inmediata.

---

### 3.4 Ubicación del camión
Descripcion:
- Pantalla con el mapa donde se ve el camión en tiempo real.

Contenido principal:
- Mapa centrado en la zona.
- Marcador del camión.
- Ruta programada.
- Distancia y ETA.
- Horario de servicio.

Objetivo:
- Mostrar el estado real del recorrido y la estimación de llegada.

---

### 3.5 Notificaciones
Descripcion:
- Pantalla para revisar todas las notificaciones recibidas.

Contenido principal:
- Lista de mensajes.
- Tipo de notificación: proximidad, retraso, cancelación, falla.
- Estado leído/no leído.
- Fecha y hora.

Objetivo:
- Mantener informado al ciudadano sobre cualquier cambio del servicio.

---

### 3.6 Reportar incidencia
Descripcion:
- Pantalla para registrar una nueva falla o problema.

Contenido principal:
- Selección de tipo de incidencia.
- Descripción del problema.
- Adición de foto.
- Ubicación actual o seleccionada.
- Botón enviar reporte.

Objetivo:
- Permitir que la comunidad reporte condiciones no atendidas.

---

### 3.7 Mis reportes
Descripcion:
- Pantalla para ver reportes enviados por el ciudadano.

Contenido principal:
- Lista de reportes.
- Estado de cada caso.
- Fecha y foto.
- Comentario final del administrador.

Objetivo:
- Dar seguimiento a incidencias reportadas por el usuario.

---

### 3.8 Configuración de usuario
Descripcion:
- Pantalla para ajustar preferencias del usuario.

Contenido principal:
- Activar/desactivar notificaciones.
- Configurar zona de interés.
- Preferencias de privacidad y contacto.
- Cerrar sesión.

Objetivo:
- Personalizar la experiencia del ciudadano.

---

## 4. Módulo: App móvil - Operador

### 4.1 Splash / inicio
Descripcion:
- Pantalla de bienvenida inicial para el operador.

Contenido principal:
- Logo.
- Carga de sesión.
- Validación de permisos.

Objetivo:
- Preparar la sesión del operador.

---

### 4.2 Login operador
Descripcion:
- Pantalla para iniciar sesión del operador.

Contenido principal:
- Usuario y contraseña.
- Recuperación de contraseña.
- Botón de acceso.

Objetivo:
- Validar identidad del operador.

---

### 4.3 Home operador
Descripcion:
- Pantalla principal del operador durante la jornada.

Contenido principal:
- Ruta asignada.
- Camión asignado.
- Zona y horario.
- Botón iniciar recorrido.
- Indicadores de estado.
- Alertas pendientes.

Objetivo:
- Centralizar la operación del día.

---

### 4.4 Ruta asignada
Descripcion:
- Pantalla con el mapa y la ruta programada.

Contenido principal:
- Mapa con puntos de ruta.
- Ubicación actual del camión.
- Distancia recorrida.
- Tiempos estimados.
- Acciones: iniciar, pausar, finalizar.

Objetivo:
- Guiar al operador durante el recorrido.

---

### 4.5 Recorrido activo
Descripcion:
- Pantalla principal mientras el camión está en recorrido.

Contenido principal:
- Mapa con seguimiento en vivo.
- Estado del servicio.
- Notificación de incidencias.
- Botón reportar problema.
- Botón finalizar ruta.

Objetivo:
- Dar control operativo durante la ejecución del servicio.

---

### 4.6 Alertas y notificaciones internas
Descripcion:
- Pantalla donde se muestran alertas del sistema.

Contenido principal:
- Lista de alertas por desviación, retraso, paro o cancelación.
- Descripción y recomendación.
- Acción: aceptar, resolver o reportar.

Objetivo:
- Aumentar la atención inmediata a problemas en la ruta.

---

### 4.7 Reportar incidente del operador
Descripcion:
- Pantalla para reportar problemas de ruta o camión.

Contenido principal:
- Tipo de problema.
- Descripción.
- Evidencia fotográfica.
- Ubicación actual.
- Botón enviar.

Objetivo:
- Documentar incidencias para su revisión administrativa.

---

### 4.8 Historial del operador
Descripcion:
- Pantalla para ver recorridos anteriores.

Contenido principal:
- Lista de rutas realizadas.
- Fecha y hora.
- Duración del recorrido.
- Incidencias detectadas.
- Estado final.

Objetivo:
- Dar seguimiento a la operación personal y al desempeño.

---

### 4.9 Configuración del operador
Descripcion:
- Pantalla con ajustes personales.

Contenido principal:
- Notificaciones.
- Perfil.
- Cambiar contraseña.
- Cerrar sesión.

Objetivo:
- Ajustar la experiencia del operador según su uso.

---

## 5. Relación entre pantallas

### Flujo principal ciudadano
Splash -> Login/Registro -> Home -> Camión en ruta -> Notificaciones -> Reporte -> Mis reportes

### Flujo principal operador
Login -> Home -> Ruta asignada -> Recorrido activo -> Alertas -> Reporte incidente -> Finalizar ruta

### Flujo principal administrador
Login -> Dashboard -> Mapa en tiempo real -> Reportes y alertas -> Detalle de reporte -> Historial de rutas -> Configuración

---

## 6. MVP recomendado
Para el primer lanzamiento, el conjunto mínimo funcional podría incluir:
- Login y roles.
- Dashboard administrativo.
- Mapa de camiones.
- Creación de rutas y asignaciones.
- Seguimiento en tiempo real.
- Alertas por retraso, desviación y paro.
- Ciudadano: ver camión y ETA.
- Ciudadano: reportar incidencia con foto.
- Operador: iniciar y finalizar recorrido.
- Notificaciones push básicas.

---

## 7. Siguiente paso
Con esta estructura ya definida, el siguiente paso será convertir cada pantalla en una especificación de contenido, con:
- nombre de la pantalla,
- objetivo,
- componentes,
- flujo de navegación,
- y elementos de interacción.
