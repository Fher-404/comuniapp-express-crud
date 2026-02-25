import { Routes } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';


//children: Son los hijos que se renderizaran dentro de router-outlet del layout component para ueq el sidebar y el topbar persistan y solo cambie el contenido centrarl
//En caso de no poner ninguna ruta el redirectTo automaticamente lo enviara al dashboard
export const routes: Routes = [
{
    path: '',
    component: LayoutComponent,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        //Esto es LazyLoad angular no cargara la pagina hsata que el usuario no lo navegue
        loadComponent: () => import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
    },
    {
        path: 'habitantes',
        loadComponent: () => import('./pages/habitantes/habitantes.component')
        .then(m => m.HabitantesComponent)
    },
    {
        path: 'ayudas',
        loadComponent: () => import('./pages/ayudas/ayudas.component')
        .then(m => m.AyudasComponent)
    },
    {
        path: 'jornadas',
        loadComponent: () => import('./pages/jornadas/jornadas.component')
        .then(m => m.JornadasComponent)
    },
    {
        path: 'reportes',
        loadComponent: () => import('./pages/reportes/reportes.component')
        .then(m => m.ReportesComponent)
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuarios/usuarios.component')
        .then(m => m.UsuariosComponent)
    }
    ]
}]
