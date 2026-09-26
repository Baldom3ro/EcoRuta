// Capa de servicios centralizada
// Importa automáticamente mock o API según configuración

import {Config} from '../config';

// Mock services
import * as AuthMock from './mock/authService.mock';
import * as TruckMock from './mock/truckService.mock';
import * as ReportMock from './mock/reportService.mock';
import * as NotificationMock from './mock/notificationService.mock';

// API services (vacíos por ahora)
// import * as AuthApi from './api/authService.api';
// import * as TruckApi from './api/truckService.api';
// import * as ReportApi from './api/reportService.api';
// import * as NotificationApi from './api/notificationService.api';

// Cuando la API esté lista, descomentar los imports de API
// y cambiar Config.USE_MOCK_DATA a false

export const AuthService = Config.USE_MOCK_DATA
  ? AuthMock
  : AuthMock; // ← reemplazar con AuthApi

export const TruckService = Config.USE_MOCK_DATA
  ? TruckMock
  : TruckMock; // ← reemplazar con TruckApi

export const ReportService = Config.USE_MOCK_DATA
  ? ReportMock
  : ReportMock; // ← reemplazar con ReportApi

export const NotificationService = Config.USE_MOCK_DATA
  ? NotificationMock
  : NotificationMock; // ← reemplazar con NotificationApi
