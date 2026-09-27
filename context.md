# EcoRuta - Versión Móvil

## Descripción del proyecto

EcoRuta es una aplicación móvil que permite a los ciudadanos rastrear en tiempo real la ubicación del camión de basura en su zona. La app móvil conecta dos roles: **ciudadanos** y **conductores** de camiones recolectores. Los **administradores** gestionan el servicio desde el **sistema web de EcoRuta** (fuera del alcance de esta app móvil).

---

## Roles de usuario

### En la app móvil

| Rol | Descripción |
|-----|-------------|
| **Ciudadano** | Habitante que necesita saber cuándo pasa el camión de basura por su zona |
| **Conductor** | Operador del camión recolector que sigue una ruta asignada |

### Fuera de la app móvil (sistema web)

| Rol | Descripción |
|-----|-------------|
| **Administrador** | Supervisor que gestiona rutas, reportes y alertas desde el panel web de EcoRuta |

---

## Stack técnico

- **Framework:** React Native
- **Plataformas:** Android (10+) e iOS (15+)
- **Mapas:** OpenStreetMap
- **Backend:** API EcoRuta (aún no existe, ver sección "Estrategia de datos")
- **Autenticación:** Google / Facebook (social login)
- **Sincronización:** Tiempo real
- **Notificaciones:** Push notifications
- **Tema visual:** Claro/Oscuro automático + branding nuevo
- **Pruebas:** Integration tests
- **CI/CD:** GitHub Actions
- **Distribución:** Google Play Store y Apple App Store
- **Equipo:** 3+ desarrolladores
- **Cronograma MVP:** 1 mes

---

## Estrategia de datos (Mock → API real)

> **El sistema web de EcoRuta aún no está funcionando**, por lo que no hay API de la cual extraer datos reales. Todo se desarrollará con **datos simulados (mock)**, pero el código debe estar **arquitectónicamente preparado** para migrar a la API real con cambios mínimos.

### Principios de arquitectura

1. **Capa de servicios centralizada:** Toda llamada a datos pasa por un archivo de servicios (`services/`). Nunca se accede a datos directamente desde los componentes.
2. **Mock providers intercambiables:** Cada servicio tiene una implementación mock que simula respuestas realistas (coordenadas GPS, reportes, rutas, etc.).
3. **Configuración por entorno:** Un flag o variable de entorno (`USE_MOCK_DATA=true`) controla si se usan datos mock o la API real.
4. **Contratos de datos definidos:** Interfaces/tipos claros para cada entidad (Camión, Ruta, Reporte, Usuario) que servirán como contrato cuando la API exista.
5. **Cuando la API esté lista:** Solo se reemplaza la implementación interna de cada servicio. Los componentes no se tocan.

### Ejemplo de estructura

```
services/
  truckService.js        ← interfaz pública (lo que importan los componentes)
  mock/
    truckService.mock.js ← datos simulados de camiones
  api/
    truckService.api.js  ← implementación real (vacía por ahora)
```

---

## Funcionalidades principales

### Vista Ciudadano

#### 1. Dashboard / Mapa en tiempo real
- Mapa principal mostrando ubicación actual del camión de basura en tiempo real
- Estimación de tiempo de llegada del camión a la zona del ciudadano
- Consejos informativos visibles en el mapa, por ejemplo:
  - "Coloca la basura en un lugar accesible"
  - "Los trabajadores no están autorizados para entrar a casas a recoger basura"
  - "Separa residuos orgánicos e inorgánicos"

#### 2. Notificaciones push
- Alerta por proximidad: el camión está cerca de la zona del usuario
- Alerta por estimación de tiempo: "El camión pasará en ~15 minutos"
- Alerta de suspensión: la ruta fue cancelada o suspendida por el conductor

#### 3. Reportes ciudadanos
- El ciudadano puede crear reportes de incidencias, por ejemplo: "Hoy no pasó la basura"
- Foto opcional adjunta al reporte (el usuario decide si incluye imagen o no)
- Ubicación del reporte vinculada al mapa

### Vista Conductor

#### 1. Ruta asignada
- Visualización de la ruta que debe seguir durante su jornada
- Mapa con puntos de recolección

#### 2. Reportes recibidos
- Ver reportes enviados por ciudadanos de su zona/ruta
- Información del reporte: descripción, foto (si existe), ubicación

#### 3. Notificación de percances
- En caso de percance (avería, bloqueo vial, etc.), el conductor puede:
  - Notificar a su supervisor/administrador
  - Enviar alerta masiva a los usuarios de esa zona indicando que la ruta fue suspendida

> **Nota:** La vista de administrador NO está en la app móvil. El administrador gestiona todo desde el sistema web de EcoRuta.

---

## Historias de usuario

### Ciudadano

| ID | Historia | Criterio de aceptación |
|----|----------|----------------------|
| HU-C01 | Como ciudadano, quiero ver en tiempo real la ubicación del camión de basura en un mapa, para saber cuándo pasará por mi zona | El mapa muestra un ícono del camión moviéndose en tiempo real. Se actualiza cada pocos segundos |
| HU-C02 | Como ciudadano, quiero recibir una notificación push cuando el camión esté cerca de mi zona, para preparar mi basura a tiempo | La notificación se dispara por proximidad GPS o por estimación de tiempo |
| HU-C03 | Como ciudadano, quiero crear un reporte cuando el camión no pase, para que el servicio tome acción | El reporte incluye: descripción del problema, ubicación automática, foto opcional |
| HU-C04 | Como ciudadano, quiero adjuntar una foto a mi reporte de forma opcional, para dar evidencia visual del problema | El formulario permite tomar foto o seleccionar de galería. El campo es opcional |
| HU-C05 | Como ciudadano, quiero ver consejos en el dashboard sobre buenas prácticas de recolección, para colaborar con el servicio | Los consejos aparecen como tarjetas o tooltips sobre el mapa |
| HU-C06 | Como ciudadano, quiero recibir alerta cuando la ruta sea suspendida, para no esperar innecesariamente | Notificación push indicando suspensión y motivo |
| HU-C07 | Como ciudadano, quiero iniciar sesión con Google o Facebook, para acceder rápido sin crear cuenta nueva | Botones de login social funcionales en pantalla de inicio |

### Conductor

| ID | Historia | Criterio de aceptación |
|----|----------|----------------------|
| HU-D01 | Como conductor, quiero ver la ruta asignada para mi jornada en un mapa, para saber qué camino seguir | El mapa muestra la ruta completa con puntos de recolección |
| HU-D02 | Como conductor, quiero ver los reportes de ciudadanos en mi zona, para estar informado de incidencias | Lista de reportes con descripción, foto (si existe) y ubicación |
| HU-D03 | Como conductor, quiero notificar a mi supervisor ante un percance, para que tome acciones | Botón de alerta que envía notificación directa al administrador con motivo |
| HU-D04 | Como conductor, quiero enviar alerta masiva a usuarios de mi zona cuando la ruta se suspenda, para que estén informados | La alerta se envía como notificación push a todos los ciudadanos registrados en esa zona |

> **Nota:** Las historias de administrador corresponden al sistema web, no a la app móvil.

---

## Diseño y UX

- Tema automático: claro de día, oscuro de noche
- Branding completamente nuevo (pendiente definir paleta de colores e identidad visual)
- Interfaz centrada en el mapa como elemento principal
- Navegación sencilla entre vistas según rol del usuario

---

## Entorno de desarrollo

### Prerrequisitos confirmados

| Herramienta | Estado |
|-------------|--------|
| Node.js v24.20.0 | ✅ Instalado |
| npm 12.0.2 | ✅ Instalado |
| Android Studio | ✅ Instalado |
| Android SDK | ✅ `C:\Users\baldo\AppData\Local\Android\Sdk` |
| ANDROID_HOME | ✅ Configurado |
| Java 21.0.2 LTS | ✅ Instalado |
| Xcode (Mac universidad) | ⏳ Disponible cuando haya acceso a Mac |

### Herramientas que se usarán

- **React Native CLI** (sin Expo, más control nativo)
- **TypeScript** para tipado estricto y contratos de datos claros
- **React Navigation** para navegación entre pantallas
- **react-native-maps** con OpenStreetMap para mapas
- **Firebase Cloud Messaging** para notificaciones push
- **react-native-image-picker** para fotos en reportes
- **AsyncStorage** para persistencia local
- **Geolocation API** para GPS

### Instalación de Android Studio ✅ Completada

---

## Plan de desarrollo (4 semanas / 1 mes MVP)

### Semana 1 — Fundación y estructura

| Día | Tarea | Entregable |
|-----|-------|------------|
| 1-2 | Instalar Android Studio, JDK, configurar entorno React Native CLI | Entorno funcional, app "Hello World" corriendo en emulador |
| 3 | Inicializar proyecto con TypeScript, configurar estructura de carpetas | Proyecto base con carpetas definidas |
| 4 | Configurar navegación (React Navigation): stack ciudadano y stack conductor | Navegación funcional entre pantallas vacías |
| 5 | Crear design system base: colores, tipografía, componentes reutilizables (botones, inputs, cards) | Librería de componentes base |

### Semana 2 — Vistas del ciudadano

| Día | Tarea | Entregable |
|-----|-------|------------|
| 1 | Pantalla Splash + Login con Google/Facebook (UI + mock auth) | HU-C07 |
| 2 | Home ciudadano: mapa con ubicación del camión (datos mock) + consejos | HU-C01, HU-C05 |
| 3 | Sistema de notificaciones (UI de listado + simulación push) | HU-C02, HU-C06 |
| 4 | Formulario de reportes: descripción, ubicación automática, foto opcional | HU-C03, HU-C04 |
| 5 | Pantalla "Mis reportes" + Configuración del ciudadano | Flujo ciudadano completo |

### Semana 3 — Vistas del conductor

| Día | Tarea | Entregable |
|-----|-------|------------|
| 1 | Login operador + Home operador | Acceso al flujo conductor |
| 2 | Vista ruta asignada: mapa con recorrido y puntos de recolección (mock) | HU-D01 |
| 3 | Recorrido activo: tracking GPS en tiempo real del conductor | Tracking funcional |
| 4 | Vista reportes recibidos de ciudadanos | HU-D02 |
| 5 | Alertas internas + Reportar percance + Alerta masiva a zona | HU-D03, HU-D04 |

### Semana 4 — Integración, pulido y testing

| Día | Tarea | Entregable |
|-----|-------|------------|
| 1 | Historial operador + Configuración operador | Flujo conductor completo |
| 2 | Capa de servicios mock completa y documentada | Arquitectura lista para API |
| 3 | Tema claro/oscuro automático, animaciones, micro-interacciones | UX pulida |
| 4 | Integration tests de flujos principales | Pruebas pasando |
| 5 | Build Android (APK), configurar CI/CD en GitHub Actions | MVP listo para demo |

---

## Estructura de carpetas del proyecto

```
EcoRuta/
├── android/                    ← código nativo Android
├── ios/                        ← código nativo iOS
├── src/
│   ├── assets/                 ← imágenes, íconos, fuentes
│   ├── components/             ← componentes reutilizables (Button, Card, Input, etc.)
│   ├── screens/
│   │   ├── auth/               ← Splash, Login
│   │   ├── citizen/            ← Home, Map, Reports, Notifications, Settings
│   │   └── driver/             ← Home, Route, ActiveRoute, Alerts, Incident, History, Settings
│   ├── navigation/
│   │   ├── AppNavigator.tsx    ← navegación principal según rol
│   │   ├── CitizenStack.tsx    ← stack de pantallas ciudadano
│   │   └── DriverStack.tsx     ← stack de pantallas conductor
│   ├── services/
│   │   ├── index.ts            ← exporta el servicio activo (mock o API)
│   │   ├── types.ts            ← interfaces/tipos (Camión, Ruta, Reporte, Usuario)
│   │   ├── mock/               ← implementaciones mock
│   │   │   ├── authService.mock.ts
│   │   │   ├── truckService.mock.ts
│   │   │   ├── reportService.mock.ts
│   │   │   └── notificationService.mock.ts
│   │   └── api/                ← implementaciones API real (vacías por ahora)
│   │       ├── authService.api.ts
│   │       ├── truckService.api.ts
│   │       ├── reportService.api.ts
│   │       └── notificationService.api.ts
│   ├── hooks/                  ← custom hooks (useLocation, useAuth, etc.)
│   ├── context/                ← React Context (AuthContext, ThemeContext)
│   ├── theme/                  ← colores, tipografía, estilos globales
│   ├── utils/                  ← funciones auxiliares
│   └── config/                 ← constantes, variables de entorno
├── __tests__/                  ← integration tests
├── .env                        ← USE_MOCK_DATA=true
├── App.tsx                     ← punto de entrada
├── package.json
└── tsconfig.json
```

---

## Notas importantes para el equipo

1. **Nunca importar datos directamente en componentes.** Siempre usar `services/`.
2. **Cada pantalla = un archivo.** Componentes compartidos van en `components/`.
3. **TypeScript obligatorio.** Tipos definidos en `services/types.ts`.
4. **Git Flow:** rama `main` (estable), `develop` (trabajo diario), `feature/*` por funcionalidad.
5. **iOS se compilará después** cuando haya acceso a Mac de la universidad.
6. **Primero Android.** El desarrollo y testing inicial será en emulador Android.

---

## Vistas de la app (resumen rápido)

### Ciudadano
1. Splash / Bienvenida
2. Login / Registro (Google, Facebook)
3. Home ciudadano (mapa + consejos)
4. Ubicación del camión (tracking real-time)
5. Notificaciones
6. Reportar incidencia (foto opcional)
7. Mis reportes
8. Configuración

### Conductor
1. Splash / Inicio
2. Login operador
3. Home operador
4. Ruta asignada
5. Recorrido activo
6. Alertas internas
7. Reporte de incidente
8. Historial del operador
9. Configuración operador

---

## Log de desarrollo

### Commit 1 — Inicialización proyecto + arquitectura base
- Proyecto React Native 0.87.1 inicializado en `mobile/`
- Estructura `src/` creada: config, context, services, theme, screens, navigation
- Tipos/interfaces definidos: User, TruckLocation, Route, Report, Notification, Incident, Tip
- Servicios mock implementados: auth, truck, report, notification
- Contextos: AuthContext (login/logout), ThemeContext (claro/oscuro auto)
- Config centralizada con `USE_MOCK_DATA=true`
- Design system: colores eco, tipografía, spacing, border radius
- Navegación: AppNavigator → Splash → Login → CitizenTabs / DriverTabs
- Pantallas: Splash, Login, CitizenHome, DriverHome (con placeholders para tabs)
- GitHub Actions CI: TypeScript check, tests, lint
- Dependencias: @react-navigation/native, bottom-tabs, native-stack, react-native-screens, safe-area-context

### Commit 2 — Pantallas ciudadano completas
- NotificationsScreen: lista con iconos por tipo, marcado como leído, indicador de no leído
- CreateReportScreen: selector tipo (no pasó basura, contenedor lleno, acceso bloqueado, otro), descripción, foto opcional
- MyReportsScreen: lista de reportes con badges de estado (pendiente/revisión/resuelto)
- SettingsScreen: perfil, zona, toggle tema oscuro, cerrar sesión
- CitizenTabs actualizado: placeholders reemplazados con pantallas reales
- Stack de reportes: MyReports → CreateReport (navegación anidada)

### Commit 3 — Pantallas conductor completas
- DriverHomeScreen: mapa de ruta asignada (HU-D01), estado de recorrido (pausar/iniciar), lista de puntos de recolección
- AlertsScreen: lista de reportes ciudadanos en la zona (HU-D02) y alertas internas del conductor
- ReportIncidentScreen: formulario de reporte de percance (HU-D03) con opción de enviar alerta masiva a ciudadanos para suspender ruta (HU-D04)
- HistoryScreen: historial de rutas realizadas por el operador con duraciones e incidentes
- DriverSettingsScreen: datos del conductor, camión asignado (ECO-TRUCK-001), estado de turno, modo oscuro y logout
- DriverTabs actualizado: navegación completa por tabs y stack anidado de alertas e incidentes

### Commit 4 — Soporte Web con React Native Web + Vite (estilo Ionic serve)
- Integrado React Native Web y Vite para visualizar la app instantáneamente en el navegador web
- Configurado index.html, index.web.tsx y vite.config.ts con shims web
- Añadido script `npm run web` en package.json para probar sin emulador Android super ligero

### Commit 5 — Mapa interactivo OpenStreetMap + Alineación con design-system.md y views.md
- Creado componente `MapView` con Leaflet JS y tiles de OpenStreetMap (sin llaves de Google)
- Integrados marcadores en tiempo real para camión recolector (🚛), puntos de recolección (📍) y línea de ruta
- Actualizado `theme/index.ts` con la paleta de colores exacta de `design-system.md` (#2E7D32, #1F4D3A, #1F5F8C, #F7F3E8)
- Actualizado `CitizenHomeScreen` y `DriverHomeScreen` reemplazando placeholders por mapas interactivos reales de OpenStreetMap
- Pruebas unitarias pasando correctamente

### Commit 6 — Solución de advertencias y errores de ESLint en GitHub Actions CI
- Corregidos errores de variables no utilizadas en `CitizenHomeScreen.tsx` y `notificationService.mock.ts`
- Corregida regla de componentes anidados en `CitizenTabs.tsx` y `DriverTabs.tsx` moviendo renderers de iconos fuera de las funciones de tab
- Eliminados inline styles en `MapView.tsx`, `CreateReportScreen.tsx`, `SettingsScreen.tsx`, `AlertsScreen.tsx` y `ReportIncidentScreen.tsx`
- Verificado `npm run lint` localmente con 0 errores y 0 advertencias para garantizar paso verde del workflow de GitHub Actions

### Commit 7 — Alineación visual de vistas con `vistas generadas/ciudadano` y `wireframes.md`
- Rediseñada la pantalla `CitizenHomeScreen` incorporando tarjeta ETA verde con distancia/tiempo restante, mapa OpenStreetMap interactivo, accesos rápidos de reporte, notificaciones y tips interactivos
- Verificadas las pantallas de Reportar (`CreateReportScreen`), Mis Reportes (`MyReportsScreen`), Notificaciones (`NotificationsScreen`) y Configuración (`SettingsScreen`)
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 8 — Sustitución de emojis por íconos vectoriales SVG profesionales
- Creado componente universal de íconos vectoriales SVG `src/components/Icon.tsx` integrando `react-native-svg`
- Reemplazados todos los emojis por íconos SVG estilizados en las pantallas y tabs de ciudadano (`CitizenHomeScreen`, `CreateReportScreen`, `NotificationsScreen`, `MyReportsScreen`, `SettingsScreen`, `CitizenTabs`)
- Reemplazados emojis por íconos SVG estilizados en las pantallas y tabs de conductor (`DriverHomeScreen`, `AlertsScreen`, `ReportIncidentScreen`, `HistoryScreen`, `DriverSettingsScreen`, `DriverTabs`)
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 9 — Shim de react-native-svg para soporte web impecable en Vite
- Creado shim `src/shims/react-native-svg.web.tsx` mapeado en `vite.config.ts` para resolver incompatibilidades de `react-native-svg` con `react-native-web`
- Resuelto error `[MISSING_EXPORT] "default" is not exported by "node_modules/react-native-web/dist/index.js"` al ejecutar `npm run web`
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 10 — Preservación de zoom del mapa y actualización a Gutiérrez Zamora, Veracruz
- Modificado `MapView.tsx` utilizando `useRef` e interconexión `postMessage` para actualizar únicamente la posición del marcador del camión en tiempo real sin recargar la plantilla de Leaflet, preservando el zoom y la vista ajustada por el usuario
- Actualizadas las coordenadas de la ruta y mapas por defecto a Gutiérrez Zamora, Veracruz (`20.4536`, `-97.0876`) en `MapView.tsx`, `truckService.mock.ts`, `reportService.mock.ts`, `CitizenHomeScreen.tsx` y `DriverHomeScreen.tsx`
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 11 — Rediseño GIS con Mapa Fullscreen e Islas Flotantes en Home Ciudadano
- Rediseñada la pantalla `CitizenHomeScreen.tsx` haciendo que el mapa ocupe el 100% de la pantalla como fondo principal (`StyleSheet.absoluteFill`)
- Eliminado el saludo excesivo ("Hola, María García") para enfocar la interfaz en el rastreo del camión
- Añadida barra flotante superior con badge de zona y botón flotante circular de notificaciones con badge rojo contador de no leídas (redirecciona a `NotificationsScreen`)
- Organizadas las tarjetas de ETA, consejos y botón de reporte como islas flotantes con sombras y bordes redondeados sobre el mapa
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 12 — Visualización completa multilínea de sugerencias sin truncado
- Eliminada restricción `numberOfLines={1}` de `floatingTipText` en `CitizenHomeScreen.tsx`
- Ajustado padding y flexibilidad de `floatingTipCard` para permitir lectura completa de tips y recomendaciones ecológicas en múltiples líneas sin truncarse con "..."
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 13 — Rediseño GIS en Home Conductor con Mapa Fullscreen y Desplegable de Puntos
- Rediseñada la pantalla `DriverHomeScreen.tsx` con mapa a pantalla completa como fondo principal (`StyleSheet.absoluteFill`) e islas flotantes
- Reemplazada la lista fija por una tarjeta flotante interactiva que muestra únicamente el siguiente punto pendiente de recolección
- Añadido modal desplegable con animación slide que muestra la lista completa de puntos de recolección (tanto los visitados como los pendientes)
- Añadido icono SVG `x` en `src/components/Icon.tsx` para cierre de modales
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 14 — Ubicación de Puntos sobre Botones con Desplegable Inline sobre el Mapa
- Movida la tarjeta flotante de puntos de recolección a la parte inferior de la pantalla, ubicada directamente sobre los botones de "Pausar Recorrido" y "Reportar Percance"
- Eliminado el Modal emergente; el desplegable ahora se extiende inline sobre la misma tarjeta flotante del mapa
- Añadidos íconos SVG `chevron-down` y `chevron-up` a `src/components/Icon.tsx` para indicar la expansión y colapso de la lista de puntos
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 15 — Cierre Automático de Lista al Tocar Fuera del Desplegable
- Añadida capa backdrop invisible `backdropOverlay` detrás del contenedor de puntos para colapsar la lista inline al presionar cualquier parte del mapa fuera de la tarjeta
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 16 — Sincronización Automática de Reportes y Modal de Detalle Completo
- Añadido `useFocusEffect` en `AlertsScreen.tsx` y `MyReportsScreen.tsx` para recargar reportes automáticamente al crear una incidencia
- Añadido modal desplegable de detalle de reporte para conductor y ciudadano mostrando tipo, usuario, dirección, coordenadas GPS, fecha/hora, descripción completa y foto adjunta
- Implementada función `updateReportStatus` en `reportService.mock.ts` permitiendo al conductor cambiar el estado del reporte ("En Revisión", "Resolver")
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 17 — Solución de Botón de Retroceso en Reporte de Incidente
- Configurado `headerLeft` explícito en `DriverTabs.tsx` con ícono `arrow-left` para garantizar presencia del botón de regreso a "Mi Ruta" / "Alertas" independientemente del origen de navegación
- Añadidos íconos SVG `chevron-left` y `arrow-left` en `src/components/Icon.tsx`
- Actualizada la lógica de retorno en `ReportIncidentScreen.tsx` para usar fallback seguro `navigation.navigate('DriverHome')` si no hay stack previo
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)

### Commit 18 — Corrección de Flujo de Navegación entre Mapa, Reporte y Alertas
- Añadido `initial: false` al navegar a `ReportIncident` desde `DriverHomeScreen` para conservar `AlertsList` en la base de la pila de navegación
- Añadido listener `tabPress` en `DriverTabs.tsx` para forzar la navegación directa a `AlertsList` cada vez que el conductor presiona la pestaña de "Alertas"
- Actualizada la ruta por defecto de regreso a `AlertsList` en lugar del mapa cuando finaliza o retrocede un reporte de incidente
- Validado paso limpio de `npx tsc --noEmit` y `npm run lint` (0 errores, 0 advertencias)