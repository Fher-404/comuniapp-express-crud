import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HabitantesService } from '../../core/services/habitantes.service';
import { AyudasService } from '../../core/services/ayudas.service';
import { JornadasService } from '../../core/services/jornadas.service';
import { ReportesService } from '../../core/services/reportes.service';
import { CountByPipe } from '../../core/pipes/count-by.pipe';

@Component({
selector: 'app-dashboard',
standalone: true,
imports: [CommonModule, RouterLink, CountByPipe],
templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

// ── Stats ────────────────────────────────────────────
stats = {
    habitantes:        0,
    ayudas:            0,
    jornadas:          0,
    reportes:          0,
    reportesAbiertos:  0,
    jornadasProgramadas: 0,
    habitantesJefes:   0,
    ayudasAlta:        0
};

// ── Datos para tablas ─────────────────────────────────
reportesRecientes:  any[] = [];
jornadasProximas:   any[] = [];
ultimosHabitantes:  any[] = [];

// ── Estado de carga ───────────────────────────────────
loadingHabitantes = true;
loadingAyudas     = true;
loadingJornadas   = true;
loadingReportes   = true;

// ── Fecha actual ──────────────────────────────────────
fechaHoy = new Date();

constructor(
    private habitantesService: HabitantesService,
    private ayudasService:     AyudasService,
    private jornadasService:   JornadasService,
    private reportesService:   ReportesService,
    private cdr:               ChangeDetectorRef
) {}

ngOnInit(): void {
    this.cargarHabitantes();
    this.cargarAyudas();
    this.cargarJornadas();
    this.cargarReportes();
}

// ── Carga de datos ────────────────────────────────────

cargarHabitantes(): void {
    this.habitantesService.getAll().subscribe({
    next: (data) => {
        this.stats.habitantes      = data.length;
        this.stats.habitantesJefes = data.filter((h: any) => h.jefe_familia).length;
        this.ultimosHabitantes     = data.slice(-5).reverse();
        this.loadingHabitantes     = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loadingHabitantes = false;
        this.cdr.detectChanges();
    }
    });
}

cargarAyudas(): void {
    this.ayudasService.getAll().subscribe({
    next: (data) => {
        this.stats.ayudas     = data.length;
        this.stats.ayudasAlta = data.filter((a: any) => a.prioridad_distribucion === 'alta').length;
        this.loadingAyudas    = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loadingAyudas = false;
        this.cdr.detectChanges();
    }
    });
}

cargarJornadas(): void {
    this.jornadasService.getAll().subscribe({
    next: (data) => {
        this.stats.jornadas           = data.length;
        this.stats.jornadasProgramadas = data.filter((j: any) => j.estatus === 'Programada').length;
        this.jornadasProximas          = data
        .filter((j: any) => j.estatus === 'Programada' || j.estatus === 'En curso')
        .slice(0, 4);
        this.loadingJornadas = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loadingJornadas = false;
        this.cdr.detectChanges();
    }
    });
}

cargarReportes(): void {
    this.reportesService.getAll().subscribe({
    next: (data) => {
        this.stats.reportes        = data.length;
        this.stats.reportesAbiertos = data.filter((r: any) =>
        r.estatus === 'Abierto' || r.estatus === 'En proceso'
        ).length;
        this.reportesRecientes = data.slice(-6).reverse();
        this.loadingReportes   = false;
        this.cdr.detectChanges();
    },
    error: () => {
        this.loadingReportes = false;
        this.cdr.detectChanges();
    }
    });
}

// ── Helpers de UI ─────────────────────────────────────

get todosCargados(): boolean {
    return !this.loadingHabitantes &&
        !this.loadingAyudas     &&
        !this.loadingJornadas   &&
        !this.loadingReportes;
}

getPrioridadClass(prioridad: string): string {
    const map: Record<string, string> = {
    'Alta': 'badge-danger', 'Media': 'badge-warning', 'Baja': 'badge-info'
    };
    return map[prioridad] ?? 'badge-gray';
}

getEstatusReporteClass(estatus: string): string {
    const map: Record<string, string> = {
    'Abierto':    'badge-danger',
    'En proceso': 'badge-warning',
    'Resuelto':   'badge-success',
    'Cerrado':    'badge-gray'
    };
    return map[estatus] ?? 'badge-gray';
}

getEstatusJornadaClass(estatus: string): string {
    const map: Record<string, string> = {
    'Programada': 'badge-info',
    'En curso':   'badge-warning',
    'Finalizada': 'badge-success',
    'Cancelada':  'badge-danger'
    };
    return map[estatus] ?? 'badge-gray';
}

getNombreCompleto(h: any): string {
    return `${h.primer_nombre ?? ''} ${h.primer_apellido ?? ''}`.trim();
}

getInicial(h: any): string {
    return h.primer_nombre ? h.primer_nombre.charAt(0).toUpperCase() : '?';
}

// Calcula el porcentaje para la barra de progreso
getPorcentaje(valor: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((valor / total) * 100);
}
}