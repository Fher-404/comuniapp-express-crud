import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AyudasService } from '../../core/services/ayudas.service';

@Component({
selector: 'app-ayudas',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './ayudas.component.html'
})
export class AyudasComponent implements OnInit {

ayudas:    any[] = [];
filtradas: any[] = [];
loading         = true;
busqueda        = '';
modalVisible    = false;
confirmVisible  = false;
modoEdicion     = false;
idEliminar      = '';
editId          = '';
toast           = { visible: false, mensaje: '', tipo: 'success' };

form: any = {
    codigo_ayuda: '', tipo: '', nombre: '',
    descripcion: '', unidad_medida: '', proveedor: '',
    condiciones_entrega: '', disponibilidad: 0,
    prioridad_distribucion: 'media', requisitos_especiales: '',
    almacenamiento: { ubicacion: '', condiciones: '', responsable: '' },
    registrado_por: '', actualizado_por: ''
};

constructor(
    private ayudasService: AyudasService,
    private cdr: ChangeDetectorRef
) {}

ngOnInit(): void { this.cargar(); }

cargar(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.ayudasService.getAll().subscribe({
    next: (data) => {
        this.ayudas    = data;
        this.filtradas = data;
        this.loading   = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.mostrarToast('Error al cargar ayudas', 'error');
    }
    });
}

buscar(): void {
    const term = this.busqueda.toLowerCase();
    this.filtradas = this.ayudas.filter(a =>
    a.nombre?.toLowerCase().includes(term) ||
    a.tipo?.toLowerCase().includes(term)   ||
    a.codigo_ayuda?.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
}

abrirCrear(): void {
    this.modoEdicion  = false;
    this.resetForm();
    this.modalVisible = true;
    this.cdr.detectChanges();
}

abrirEditar(a: any): void {
    this.modoEdicion = true;
    this.editId      = a._id;
    this.form = {
    codigo_ayuda:           a.codigo_ayuda           ?? '',
    tipo:                   a.tipo                   ?? '',
    nombre:                 a.nombre                 ?? '',
    descripcion:            a.descripcion            ?? '',
    unidad_medida:          a.unidad_medida          ?? '',
    proveedor:              a.proveedor              ?? '',
    condiciones_entrega:    Array.isArray(a.condiciones_entrega)
        ? a.condiciones_entrega.join(', ') : '',
    disponibilidad:         a.disponibilidad         ?? 0,
    prioridad_distribucion: a.prioridad_distribucion ?? 'media',
    requisitos_especiales:  Array.isArray(a.requisitos_especiales)
        ? a.requisitos_especiales.join(', ') : '',
    almacenamiento: {
        ubicacion:   a.almacenamiento?.ubicacion   ?? '',
        condiciones: a.almacenamiento?.condiciones ?? '',
        responsable: a.almacenamiento?.responsable ?? ''
    },
    registrado_por:  a.registrado_por  ?? '',
    actualizado_por: a.actualizado_por ?? ''
    };
    this.modalVisible = true;
    this.cdr.detectChanges();
}

guardar(): void {
    const payload = {
    ...this.form,
    condiciones_entrega: this.form.condiciones_entrega
        ? this.form.condiciones_entrega.split(',').map((e: string) => e.trim())
        : [],
    requisitos_especiales: this.form.requisitos_especiales
        ? this.form.requisitos_especiales.split(',').map((e: string) => e.trim())
        : []
    };

    const op = this.modoEdicion
    ? this.ayudasService.update(this.editId, payload)
    : this.ayudasService.create(payload);

    op.subscribe({
    next: () => {
        this.modalVisible = false;
        this.mostrarToast(`Ayuda ${this.modoEdicion ? 'actualizada' : 'creada'} correctamente`, 'success');
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
    this.ayudasService.delete(this.idEliminar).subscribe({
    next: () => {
        this.confirmVisible = false;
        this.mostrarToast('Ayuda eliminada correctamente', 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al eliminar', 'error')
    });
}

resetForm(): void {
    this.form = {
    codigo_ayuda: '', tipo: '', nombre: '',
    descripcion: '', unidad_medida: '', proveedor: '',
    condiciones_entrega: '', disponibilidad: 0,
    prioridad_distribucion: 'media', requisitos_especiales: '',
    almacenamiento: { ubicacion: '', condiciones: '', responsable: '' },
    registrado_por: '', actualizado_por: ''
    };
}

getPrioridadClass(p: string): string {
    const map: Record<string, string> = {
    'alta': 'badge-danger', 'media': 'badge-warning', 'baja': 'badge-info'
    };
    return map[p] ?? 'badge-gray';
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