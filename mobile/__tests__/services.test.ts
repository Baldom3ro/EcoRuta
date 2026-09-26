import {AuthService, TruckService, ReportService, NotificationService} from '../src/services';

describe('Capa de Servicios EcoRuta', () => {
  test('AuthService retorna usuario en login mock', async () => {
    const user = await AuthService.loginWithGoogle();
    expect(user).toBeDefined();
    expect(user.role).toBe('citizen');
  });

  test('TruckService retorna ubicación y ruta asignada', async () => {
    const location = await TruckService.getTruckLocation();
    expect(location).toBeDefined();
    expect(location.status).toBe('active');

    const route = await TruckService.getAssignedRoute('driver-001');
    expect(route.points.length).toBeGreaterThan(0);
  });

  test('TruckService permite reportar incidentes', async () => {
    const incident = await TruckService.reportIncident({
      driverId: 'driver-001',
      routeId: 'route-001',
      type: 'breakdown',
      description: 'Falla mecánica de prueba',
      latitude: 20.6610,
      longitude: -103.3490,
      notifiedSupervisor: true,
      alertSentToUsers: true,
    });

    expect(incident.id).toBeDefined();
    expect(incident.type).toBe('breakdown');
  });

  test('ReportService retorna reportes de ciudadano', async () => {
    const reports = await ReportService.getReportsByZone('Zona Centro');
    expect(reports.length).toBeGreaterThan(0);
  });

  test('NotificationService retorna notificaciones', async () => {
    const notifs = await NotificationService.getNotifications('citizen-001');
    expect(notifs.length).toBeGreaterThan(0);
  });
});
