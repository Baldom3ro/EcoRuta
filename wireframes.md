# EcoRuta - Wireframes en texto

## 1. Objetivo
Este documento describe la estructura de baja fidelidad de la aplicación EcoRuta. No es un diseño visual final, sino una guía de composición y flujo de pantallas para web y app móvil.

---

## 2. Web Administrativa

### 2.1 Login
[Encabezado: EcoRuta]
- Logo
- Campo: Correo electrónico
- Campo: Contraseña
- Botón: Iniciar sesión
- Link: ¿Olvidaste tu contraseña?

Flujo:
- El administrador ingresa credenciales.
- Si son válidas, entra al dashboard.

---

### 2.2 Dashboard principal
[Header]
- Logo EcoRuta
- Menú lateral:
  - Dashboard
  - Ciudades
  - Zonas
  - Rutas
  - Camiones
  - Reportes
  - Historial
  - Configuración
- Botón: Cerrar sesión

[Contenido central]
- Tarjetas resumen:
  - Rutas activas
  - Camiones en servicio
  - Alertas activas
  - Reportes pendientes
- Mapa grande con marcadores de camiones
- Sección: Rutas críticas con estado y tiempo
- Sección: Alertas recientes

Flujo:
- El administrador puede abrir cualquier módulo desde el menú lateral.

---

### 2.3 Gestión de ciudades
[Header y menú lateral]
- Botón: Nueva ciudad
- Tabla o lista:
  - Nombre de la ciudad
  - Estado
  - Total de zonas
  - Acciones: Ver, Editar, Desactivar

Flujo:
- El administrador crea una ciudad o entra a su detalle.

---

### 2.4 Gestión de zonas
[Header y menú lateral]
- Botón: Nueva zona
- Filtros: Ciudad, barrio, sector
- Lista de zonas:
  - Nombre
  - Ciudad
  - Cantidad de rutas
  - Estado
- Botón: Ver rutas

Flujo:
- El administrador organiza zonas según la ciudad.

---

### 2.5 Gestión de rutas
[Header y menú lateral]
- Botón: Nueva ruta
- Filtros: Ciudad, zona, estado
- Lista de rutas:
  - Nombre de la ruta
  - Zona
  - Horario
  - Camión asignado
  - Operador
  - Estado
- Botones: Editar, Ver mapa, Activar/Desactivar

Flujo:
- Se gestionan rutas para cada zona.

---

### 2.6 Asignación de camiones y operadores
[Header y menú lateral]
- Título: Asignar recursos
- Selector de ruta
- Lista de camiones disponibles
- Lista de operadores disponibles
- Botón: Guardar asignación
- Mensaje de validación si algún recurso ya está ocupado

Flujo:
- El administrador asigna una ruta al camión y al operador correctos.

---

### 2.7 Mapa en tiempo real
[Header y menú lateral]
- Barra superior:
  - Filtro por ciudad
  - Filtro por zona
  - Filtro por camión
- Mapa grande
- Marcadores de camiones con iconos por estado:
  - En ruta
  - Retrasado
  - Desviado
  - Detenido
- Side panel derecho:
  - Nombre del camión
  - Operador
  - Ruta actual
  - Estado
  - Última actualización

Flujo:
- El administrador supervisa cada camión directamente desde el mapa.

---

### 2.8 Detalle de camión
[Header]
- Nombre del camión
- Estado actual
- Ruta activa
- Operador asignado
- Ubicación actual
- Botones: Ver historial, Ver reportes, Ver ruta

[Secciones]
- Información general
- Historial reciente de recorrido
- Alertas generadas
- Reportes asociados

Flujo:
- El administrador hace seguimiento del estado operativo del camión.

---

### 2.9 Reportes y alertas
[Header y menú lateral]
- Filtros: tipo, zona, ciudad, fecha, prioridad
- Tabs:
  - Alertas
  - Reportes ciudadanos
  - Reportes operativos
- Lista de elementos:
  - Tipo
  - Fecha
  - Zona
  - Estado
  - Prioridad
- Botón: Ver detalle

Flujo:
- El administrador revisa, atiende y resuelve incidencias.

---

### 2.10 Detalle de reporte
[Header]
- Título: Reporte #123
- Información:
  - Tipo de incidencia
  - Fecha y hora
  - Usuario que reportó
  - Zona
  - Ubicación
  - Descripción
  - Foto
- Estado actual
- Selector de estado: recibido, en revisión, atendido, cerrado
- Campo de observación
- Botón: Guardar cambio

Flujo:
- El administrador revisa y marca la resolución del problema.

---

### 2.11 Historial de rutas
[Header]
- Filtros: semana, ruta, zona, camión, ciudad
- Tabla con columnas:
  - Ruta
  - Camión
  - Operador
  - Fecha
  - Inicio
  - Fin
  - Duración
  - Estado
  - Incidencias
- Botón: Ver detalle

Flujo:
- El administrador consulta recorridos anteriores.

---

### 2.12 Reportes analíticos
[Header]
- Tarjetas KPI:
  - Cumplimiento de rutas
  - Retrasos promedio
  - Incidencias por zona
  - Camiones con mayor desempeño
- Gráficas:
  - rendimiento semanal
  - incidencias por tipo
  - comparativo de zonas
- Botón: Exportar PDF/Excel

Flujo:
- Se utilizan los datos para tomar decisiones operativas.

---

### 2.13 Configuración del sistema
[Header]
- Menú de opciones:
  - Notificaciones
  - GPS
  - Alertas
  - Usuarios
  - Roles y permisos
  - Ciudades y zonas
- Panel principal según opción seleccionada

Contenido mínimo por sección:
- Notificaciones: activar/desactivar, texto de mensajes, prioridad
- GPS: frecuencia de actualización, conexión, umbrales
- Alertas: desviación, retraso, paro, radio de proximidad

Flujo:
- Se ajustan parámetros del sistema para diferentes ciudades o zonas.

---

## 3. App Móvil - Ciudadano

### 3.1 Splash / bienvenida
[Pantalla completa]
- Logo EcoRuta
- Texto: "Rastrea tu servicio de recolección"
- Carga inicial en medio segundo a 2 segundos

Flujo:
- Se abre la app y carga configuración básica.

---

### 3.2 Login / Registro
[Pantalla centrada]
- Logo
- Botones:
  - Iniciar sesión
  - Registrarse
- Campos de inicio de sesión:
  - Correo
  - Contraseña
- Link: ¿Olvidaste tu contraseña?

Flujo:
- El ciudadano ingresa a la app.

---

### 3.3 Home ciudadano
[Top bar]
- Logo / nombre de usuario
- Botón notificaciones

[Contenido principal]
- Mapa con marcador del camión más cercano
- Tarjeta:
  - Nombre de la ruta
  - Estado: En camino / Retrasado / Cancelado
  - ETA: 12 min
- Botón: Ver ubicación detallada
- Botón: Reportar problema
- Sección: Notificaciones recientes

Flujo:
- El ciudadano consulta el servicio de su zona.

---

### 3.4 Ubicación del camión
[Header con botón atrás]
- Título: Camión en tránsito
- Mapa grande
- Tarjeta inferior:
  - Estado del camión
  - ETA
  - Distancia faltante
  - Ruta actual
- Botón: Volver al inicio

Flujo:
- El ciudadano observa el recorrido y tiempo estimado.

---

### 3.5 Notificaciones
[Header]
- Título: Notificaciones
- Lista de notificaciones:
  - Camión cerca de tu zona
  - Retraso en la ruta
  - Ruta cancelada por mantenimiento
  - Servicio reprogramado
- Cada ítem: icono, título, resumen y hora

Flujo:
- El ciudadano revisa los avisos del servicio.

---

### 3.6 Reportar incidencia
[Header]
- Título: Reportar problema
- Selector de tipo:
  - Camión no pasó
  - Retraso excesivo
  - Basura acumulada
  - Mala práctica
  - Otro
- Campo de descripción
- Botón: Agregar foto
- Vista previa de la imagen
- Botón: Enviar reporte

Flujo:
- El ciudadano crea un reporte con evidencia.

---

### 3.7 Mis reportes
[Header]
- Título: Mis reportes
- Lista de reportes:
  - Tipo
  - Fecha
  - Estado
  - Última actualización
- Botón: Ver detalle

Flujo:
- El ciudadano puede revisar su actividad y seguimiento.

---

### 3.8 Configuración
[Header]
- Título: Configuración
- Opciones:
  - Notificaciones
  - Zona de interés
  - Privacidad
  - Cambiar contraseña
  - Cerrar sesión

Flujo:
- El ciudadano personaliza la experiencia.

---

## 4. App Móvil - Operador

### 4.1 Splash / inicio
[Pantalla completa]
- Logo, nombre del sistema
- Carga de sesión

Flujo:
- Se valida sesión activa.

---

### 4.2 Login operador
[Pantalla centrada]
- Logo
- Campos: usuario y contraseña
- Botón: Iniciar sesión
- Link: ¿Olvidaste tu contraseña?

Flujo:
- El operador accede a la app.

---

### 4.3 Home operador
[Top bar]
- Nombre del operador
- Estado del servicio

[Contenido principal]
- Tarjeta de ruta:
  - Ruta asignada
  - Camión asignado
  - Zona
  - Horario
- Botón: Iniciar ruta
- Botón: Ver mapa
- Sección: Alertas recientes

Flujo:
- El operador toma el control del servicio.

---

### 4.4 Ruta asignada
[Header]
- Título: Ruta de recolección
- Mapa con ruta programada
- Tarjeta inferior:
  - Distancia total
  - Tiempo estimado
  - Ubicación actual
- Botón: Iniciar recorrido

Flujo:
- El operador valida su ruta antes de comenzar.

---

### 4.5 Recorrido activo
[Header]
- Título: En recorrido
- Mapa grande con ubicación en vivo
- Botones:
  - Reportar problema
  - Finalizar ruta
  - Ver alertas
- Indicador de estado: en ruta / retrasado / detenido

Flujo:
- El operador ejecuta y supervisa el recorrido en vivo.

---

### 4.6 Alertas internas
[Header]
- Título: Alertas
- Lista de notificaciones:
  - Desviación detectada
  - Retraso mayor al esperado
  - Camión detenido prolongadamente
- Botón: Revisar

Flujo:
- El operador atiende alertas del sistema.

---

### 4.7 Reporte de incidente
[Header]
- Título: Reportar problema
- Selector de incidente:
  - Desviación
  - Falla del camión
  - Rechazo de servicio
  - Otro
- Descripción larga
- Foto opcional
- Botón: Enviar

Flujo:
- El operador documenta incidencias para el administrador.

---

### 4.8 Historial del operador
[Header]
- Título: Historial
- Lista de rutas realizadas:
  - Fecha
  - Ruta
  - Duración
  - Estado
  - Incidencias
- Botón: Ver detalle

Flujo:
- El operador utiliza el historial para revisión y seguimiento.

---

### 4.9 Configuración operador
[Header]
- Título: Configuración
- Opciones:
  - Notificaciones
  - Perfil
  - Cambiar contraseña
  - Cerrar sesión

Flujo:
- Ajustes personales del operador.

---

## 5. Flujo general de navegación

### Ciudadano
Splash -> Login/Registro -> Home -> Ubicación del camión -> Notificaciones -> Reportar problema -> Mis reportes

### Operador
Splash -> Login -> Home -> Ruta asignada -> Recorrido activo -> Alertas -> Reportar incidente -> Historial

### Administrador
Login -> Dashboard -> Mapa en tiempo real -> Reportes y alertas -> Detalle de reporte -> Historial de rutas -> Configuración

---

## 6. MVP recomendado
Para la primera versión, se recomienda incluir estas pantallas mínimas:
- Login
- Dashboard administrativo
- Mapa en tiempo real
- Rutas y asignaciones
- Reportes y alertas
- Home ciudadano con ubicación y ETA
- Reporte ciudadano con foto
- Home operador con ruta activa
- Iniciar/finalizar recorrido
- Notificaciones push básicas

---

## 7. Siguiente paso
Con este documento ya definido, el siguiente paso será convertir estos wireframes a un flujo más detallado por pantalla, con:
- elementos visuales,
- jerarquía de contenido,
- prioridad de acciones,
- estados vacíos,
- y especificación de interacciones.
