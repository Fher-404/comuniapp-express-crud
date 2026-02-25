import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
selector: 'app-layout',
standalone: true,
imports: [RouterOutlet, RouterLink, RouterLinkActive],
templateUrl: './layout.component.html'
})
export class LayoutComponent {
currentUser = { nombre: 'Admin', inicial: 'A' };
}


//Routerlink: Convierte un HTML en un enlace de navegacion sin recargar la pagina
//RouterLinkActive: /////
//RouterOulet: Es el donde angular renderizara el componente de la ruta activa.
//Standalone: 
