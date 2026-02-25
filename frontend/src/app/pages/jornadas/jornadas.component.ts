import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JornadasService } from '../../core/services/jornadas.service';

@Component({
selector: 'app-jornadas',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './jornadas.component.html'
})
export class JornadasComponent implements OnInit {

jornadas:  any[] = [];
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
    nombre_evento: '', tipo_jornada: '',
    descripcion: '', fecha_inicio: '',
    sector_lugar: '', estatus: 'Programada',
    beneficios: '', registrado_por: ''
};

constructor(
    private jornadasService: JornadasService,
    private cdr: ChangeDetectorRef
) {}

ngOnInit(): void { this.cargar(); }

cargar(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.jornadasService.getAll().subscribe({
    next: (data) => {
        this.jornadas  = data;
        this.filtradas = data;
        this.loading   = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.mostrarToast('Error al cargar jornadas', 'error');
    }
    });
}

buscar(): void {
    const term = this.busqueda.toLowerCase();
    this.filtradas = this.jornadas.filter(j =>
    j.nombre_evento?.toLowerCase().includes(term) ||
    j.tipo_jornada?.toLowerCase().includes(term)  ||
    j.sector_lugar?.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
}

abrirCrear(): void {
    this.modoEdicion  = false;
    this.resetForm();
    this.modalVisible = true;
    this.cdr.detectChanges();
}

abrirEditar(j: any): void {
    this.modoEdicion = true;
    this.editId      = j._id;
    this.form = {
    nombre_evento:  j.nombre_evento ?? '',
    tipo_jornada:   j.tipo_jornada  ?? '',
    descripcion:    j.descripcion   ?? '',
    fecha_inicio:   j.fecha_inicio ? j.fecha_inicio.substring(0, 10) : '',
    sector_lugar:   j.sector_lugar  ?? '',
    estatus:        j.estatus       ?? 'Programada',
    beneficios:     Array.isArray(j.beneficios) ? j.beneficios.join(', ') : '',
    registrado_por: j.registrado_por ?? ''
    };
    this.modalVisible = true;
    this.cdr.detectChanges();
}

guardar(): void {
    const payload = {
    ...this.form,
    beneficios: this.form.beneficios
        ? this.form.beneficios.split(',').map((b: string) => b.trim())
        : []
    };

    const op = this.modoEdicion
    ? this.jornadasService.update(this.editId, payload)
    : this.jornadasService.create(payload);

    op.subscribe({
    next: () => {
        this.modalVisible = false;
        this.mostrarToast(`Jornada ${this.modoEdicion ? 'actualizada' : 'creada'} correctamente`, 'success');
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
    this.jornadasService.delete(this.idEliminar).subscribe({
    next: () => {
        this.confirmVisible = false;
        this.mostrarToast('Jornada cancelada correctamente', 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al cancelar', 'error')
    });
}

resetForm(): void {
    this.form = {
    nombre_evento: '', tipo_jornada: '', descripcion: '',
    fecha_inicio: '', sector_lugar: '', estatus: 'Programada',
    beneficios: '', registrado_por: ''
    };
}

getEstatusClass(e: string): string {
    const map: Record<string, string> = {
    'Programada': 'badge-info',
    'En curso':   'badge-warning',
    'Finalizada': 'badge-success',
    'Cancelada':  'badge-danger'
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