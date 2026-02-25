import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitantesService } from '../../core/services/habitantes.service';

@Component({
selector: 'app-habitantes',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './habitantes.component.html',
changeDetection: ChangeDetectionStrategy.Default //
})
export class HabitantesComponent implements OnInit {

habitantes: any[]  = [];
filtrados:  any[]  = [];
loading           = true;
busqueda          = '';
modalVisible      = false;
confirmVisible    = false;
modoEdicion       = false;
idEliminar        = '';
toast             = { visible: false, mensaje: '', tipo: 'success' };
editId            = '';

form: any = {
    primer_nombre: '', segundo_nombre: '',
    primer_apellido: '', segundo_apellido: '',
    fecha_nacimiento: '', genero: '',
    telefono_celular: '', telefono_local: '',
    correo: '', estado_civil: '',
    direccion: { sector: '', calle: '', casa: '', punto_referencia: '' },
    discapacidad: { tiene_discapacidad: false, tipo: '', grado: '' },
    enfermedades_cronicas: '',
    nivel_instruccion: '', ocupacion: '',
    ingreso_mensual: '',
    vivienda: { tipo_vivienda: '', condicion_vivienda: '', es_propia: false },
    jefe_familia: false,
    registrado_por: '', actualizado_por: ''
};

constructor(
    private habitantesService: HabitantesService,
    private cdr: ChangeDetectorRef // Verifica automaticamente si algo cambio y actualiza la vista
) {}

ngOnInit(): void { this.cargar(); }

cargar(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.habitantesService.getAll().subscribe({
    next: (data) => {
        this.habitantes = data;
        this.filtrados  = data;
        this.loading    = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.mostrarToast('Error al cargar habitantes', 'error');
    }
    });
}

buscar(): void {
    const term = this.busqueda.toLowerCase();
    this.filtrados = this.habitantes.filter(h =>
    h.primer_nombre?.toLowerCase().includes(term)   ||
    h.primer_apellido?.toLowerCase().includes(term) ||
    h.correo?.toLowerCase().includes(term)          ||
    h.direccion?.sector?.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
}

abrirCrear(): void {
    this.modoEdicion  = false;
    this.resetForm();
    this.modalVisible = true;
    this.cdr.detectChanges();
}

abrirEditar(h: any): void {
    this.modoEdicion = true;
    this.editId      = h._id;
    this.form = {
    primer_nombre:    h.primer_nombre    ?? '',
    segundo_nombre:   h.segundo_nombre   ?? '',
    primer_apellido:  h.primer_apellido  ?? '',
    segundo_apellido: h.segundo_apellido ?? '',
    fecha_nacimiento: h.fecha_nacimiento ? h.fecha_nacimiento.substring(0,10) : '',
    genero:           h.genero           ?? '',
    telefono_celular: h.telefono_celular ?? '',
    telefono_local:   h.telefono_local   ?? '',
    correo:           h.correo           ?? '',
    estado_civil:     h.estado_civil     ?? '',
    direccion: {
        sector:           h.direccion?.sector           ?? '',
        calle:            h.direccion?.calle            ?? '',
        casa:             h.direccion?.casa             ?? '',
        punto_referencia: h.direccion?.punto_referencia ?? ''
    },
    discapacidad: {
        tiene_discapacidad: h.discapacidad?.tiene_discapacidad ?? false,
        tipo:               h.discapacidad?.tipo               ?? '',
        grado:              h.discapacidad?.grado              ?? ''
    },
    enfermedades_cronicas: Array.isArray(h.enfermedades_cronicas)
        ? h.enfermedades_cronicas.join(', ') : '',
    nivel_instruccion: h.nivel_instruccion ?? '',
    ocupacion:         h.ocupacion         ?? '',
    ingreso_mensual:   h.ingreso_mensual   ?? '',
    vivienda: {
        tipo_vivienda:      h.vivienda?.tipo_vivienda      ?? '',
        condicion_vivienda: h.vivienda?.condicion_vivienda ?? '',
        es_propia:          h.vivienda?.es_propia          ?? false
    },
    jefe_familia:    h.jefe_familia    ?? false,
    registrado_por:  h.registrado_por  ?? '',
    actualizado_por: h.actualizado_por ?? ''
    };
    this.modalVisible = true;
    this.cdr.detectChanges();
}

guardar(): void {
    const payload = {
    ...this.form,
    enfermedades_cronicas: this.form.enfermedades_cronicas
        ? this.form.enfermedades_cronicas.split(',').map((e: string) => e.trim())
        : []
    };

    if (this.modoEdicion) {
    this.habitantesService.update(this.editId, payload).subscribe({
        next: () => {
        this.modalVisible = false;
        this.mostrarToast('Habitante actualizado correctamente', 'success');
        this.cargar();
        },
        error: () => this.mostrarToast('Error al actualizar', 'error')
    });
    } else {
    this.habitantesService.create(payload).subscribe({
        next: () => {
        this.modalVisible = false;
        this.mostrarToast('Habitante creado correctamente', 'success');
        this.cargar();
        },
        error: () => this.mostrarToast('Error al crear', 'error')
    });
    }
}

confirmarEliminar(id: string): void {
    this.idEliminar     = id;
    this.confirmVisible = true;
    this.cdr.detectChanges();
}

eliminar(): void {
    this.habitantesService.delete(this.idEliminar).subscribe({
    next: () => {
        this.confirmVisible = false;
        this.mostrarToast('Habitante eliminado correctamente', 'success');
        this.cargar();
    },
    error: () => this.mostrarToast('Error al eliminar', 'error')
    });
}

resetForm(): void {
    this.form = {
    primer_nombre: '', segundo_nombre: '',
    primer_apellido: '', segundo_apellido: '',
    fecha_nacimiento: '', genero: '',
    telefono_celular: '', telefono_local: '',
    correo: '', estado_civil: '',
    direccion: { sector: '', calle: '', casa: '', punto_referencia: '' },
    discapacidad: { tiene_discapacidad: false, tipo: '', grado: '' },
    enfermedades_cronicas: '',
    nivel_instruccion: '', ocupacion: '',
    ingreso_mensual: '',
    vivienda: { tipo_vivienda: '', condicion_vivienda: '', es_propia: false },
    jefe_familia: false,
    registrado_por: '', actualizado_por: ''
    };
}

mostrarToast(mensaje: string, tipo: string): void {
    this.toast = { visible: true, mensaje, tipo };
    this.cdr.detectChanges();
    setTimeout(() => {
    this.toast.visible = false;
    this.cdr.detectChanges();
    }, 3000);
}

getNombreCompleto(h: any): string {
    return `${h.primer_nombre ?? ''} ${h.primer_apellido ?? ''}`.trim();
}
}