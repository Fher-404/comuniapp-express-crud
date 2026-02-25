import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../core/services/reportes.service';

@Component({
selector: 'app-reportes',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {

reportes:  any[] = [];
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
    tipo_incidencia: '', descripcion: '',
    sector: '', estatus: 'Abierto',
    prioridad: 'Media', reportado_por: '',
    evidencia: '', observaciones: ''
};

constructor(
    private reportesService: ReportesService,
    private cdr: ChangeDetectorRef
) {}

ngOnInit(): void { this.cargar(); }

cargar(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.reportesService.getAll().subscribe({
    next: (data) => {
        this.reportes  = data;
        this.filtrados = data;
        this.loading   = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.mostrarToast('Error al cargar reportes', 'error');
    }
    });
}

buscar(): void {
    const term = this.busqueda.toLowerCase();
    this.filtrados = this.reportes.filter(r =>
    r.tipo_incidencia?.toLowerCase().includes(term) ||
    r.sector?.toLowerCase().includes(term)          ||
    r.estatus?.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
}

abrirCrear(): void {
    this.modoEdicion  = false;
    this.resetForm();
    this.modalVisible = true;
    this.cdr.detectChanges();
}

abrirEditar(r: any): void {
    this.modoEdicion = true;
    this.editId      = r._id;
    this.form = {
    tipo_incidencia: r.tipo_incidencia ?? '',
    descripcion:     r.descripcion     ?? '',
    sector:          r.sector          ?? '',
    estatus:         r.estatus         ?? 'Abierto',
    prioridad:       r.prioridad       ?? 'Media',
    reportado_por:   r.reportado_por   ?? '',
    evidencia:       r.evidencia       ?? '',
    observaciones:   r.observaciones   ?? ''
    };
    this.modalVisible = true;
    this.cdr.detectChanges();
}

guardar(): void {
    const op = this.modoEdicion
    ? this.reportesService.update(this.editId, this.form)
    : this.reportesService.create(this.form);

    op.subscribe({
    next: () => {
        this.modalVisible = false;
        this.mostrarToast(`Reporte ${this.modoEdicion ? 'actualizado' : 'creado'} correctamente`, 'success');
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
    this.reportesService.delete(this.idEliminar).subscribe({
    next: () => {
        this.confirmVisible = false;
        this.mostrarToast('Reporte cerrado correctamente', 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al cerrar', 'error')
    });
}

resetForm(): void {
    this.form = {
    tipo_incidencia: '', descripcion: '', sector: '',
    estatus: 'Abierto', prioridad: 'Media',
    reportado_por: '', evidencia: '', observaciones: ''
    };
}

getPrioridadClass(p: string): string {
    const map: Record<string, string> = {
    'Alta': 'badge-danger', 'Media': 'badge-warning', 'Baja': 'badge-info'
    };
    return map[p] ?? 'badge-gray';
}

getEstatusClass(e: string): string {
    const map: Record<string, string> = {
    'Abierto':    'badge-danger',
    'En proceso': 'badge-warning',
    'Resuelto':   'badge-success',
    'Cerrado':    'badge-gray'
    };
    return map[e] ?? 'badge-gray';
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