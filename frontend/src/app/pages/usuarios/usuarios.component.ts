import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';

@Component({
selector: 'app-usuarios',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

usuarios:  any[] = [];
filtrados: any[] = [];
loading         = true;
busqueda        = '';
modalVisible    = false;
confirmVisible  = false;
modoEdicion     = false;
idEliminar      = '';
editId          = '';
toast           = { visible: false, mensaje: '', tipo: 'success' };

form: any = {
    nombre: '', apellido: '',
    correo: '', contrasena: '',
    rol: 'consulta'
};

constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
) {}

ngOnInit(): void { this.cargar(); }

cargar(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.usuariosService.getAll().subscribe({
    next: (data) => {
        this.usuarios  = data;
        this.filtrados = data;
        this.loading   = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.mostrarToast('Error al cargar usuarios', 'error');
    }
    });
}

buscar(): void {
    const term = this.busqueda.toLowerCase();
    this.filtrados = this.usuarios.filter(u =>
    u.nombre?.toLowerCase().includes(term)   ||
    u.apellido?.toLowerCase().includes(term) ||
    u.correo?.toLowerCase().includes(term)   ||
    u.rol?.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
}

abrirCrear(): void {
    this.modoEdicion  = false;
    this.resetForm();
    this.modalVisible = true;
    this.cdr.detectChanges();
}

abrirEditar(u: any): void {
    this.modoEdicion = true;
    this.editId      = u._id;
    this.form = {
    nombre:     u.nombre   ?? '',
    apellido:   u.apellido ?? '',
    correo:     u.correo   ?? '',
    contrasena: '',
    rol:        u.rol      ?? 'consulta'
    };
    this.modalVisible = true;
    this.cdr.detectChanges();
}

guardar(): void {
    const op = this.modoEdicion
    ? this.usuariosService.update(this.editId, this.form)
    : this.usuariosService.create(this.form);

    op.subscribe({
    next: () => {
        this.modalVisible = false;
        this.mostrarToast(`Usuario ${this.modoEdicion ? 'actualizado' : 'creado'} correctamente`, 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al guardar', 'error')
    });
}

confirmarEliminar(id: string): void {
    this.idEliminar     = id;
    this.confirmVisible = true;
    this.cdr.detectChanges();
}

eliminar(): void {
    this.usuariosService.delete(this.idEliminar).subscribe({
    next: () => {
        this.confirmVisible = false;
        this.mostrarToast('Usuario desactivado correctamente', 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al desactivar', 'error')
    });
}

resetForm(): void {
    this.form = {
    nombre: '', apellido: '',
    correo: '', contrasena: '',
    rol: 'consulta'
    };
}

getRolClass(rol: string): string {
    const map: Record<string, string> = {
    'admin':    'badge-danger',
    'operador': 'badge-warning',
    'consulta': 'badge-info'
    };
    return map[rol] ?? 'badge-gray';
}

getInicial(nombre: string): string {
    return nombre ? nombre.charAt(0).toUpperCase() : '?';
}

mostrarToast(mensaje: string, tipo: string): void {
    this.toast = { visible: true, mensaje, tipo };
    this.cdr.detectChanges();
    setTimeout(() => {
    this.toast.visible = false;
    this.cdr.detectChanges();
    }, 3000);
}
}