import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'folder',
    loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
  },
  {
    path: 'solicitar',
    loadComponent: () => import('./solicitar/solicitar.page').then(m => m.SolicitarPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  // {
  //   path: 'segundavista',
  //   loadComponent: () => import('./segundavista/segundavista.page').then( m => m.SegundavistaPage)
  // },
  {
    path: 'terceravista',
    loadComponent: () => import('./terceravista/terceravista.page').then( m => m.TerceravistaPage)
  },
  {
    path: 'soporte',
    loadComponent: () => import('./soporte/soporte.page').then( m => m.SoportePage)
  },
  {
    path: 'tuactividad',
    loadComponent: () => import('./tuactividad/tuactividad.page').then( m => m.TuactividadPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'editar-perfil',
    loadComponent: () => import('./editar-perfil/editar-perfil.page').then(m => m.EditarPerfilPage)
  },
  {
    path: 'crear',
    loadComponent: () => import('./crear/crear.page').then( m => m.CrearPage)
  },
  {
    path: 'test-sheets',
    loadComponent: () => import('./test-sheets/test-sheets.page').then(m => m.TestSheetsPage)
  },
];
