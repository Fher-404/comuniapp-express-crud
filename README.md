# 🏘️ Sistema de Gestión Comunitaria GS1

Sistema web full-stack para la gestión integral de comunidades. Permite administrar habitantes, ayudas sociales, jornadas comunitarias, reportes de incidencias y usuarios del sistema.

---

## 📋 Tabla de Contenidos

- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Base de datos](#-base-de-datos-colecciones)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Variables de entorno](#-variables-de-entorno)
- [Endpoints del API](#-endpoints-del-api-rest)
- [Funcionalidades](#-funcionalidades)
- [Capturas del sistema](#-capturas-del-sistema)

---

## 🛠️ Tecnologías utilizadas

### Backend
| Tecnología | Versión | Descripción |
|---|---|---|
| Node.js | 18+ | Entorno de ejecución JavaScript |
| TypeScript | 5.x | Tipado estático para JavaScript |
| Express | 5.x | Framework web para Node.js |
| Mongoose | 9.x | ODM para MongoDB |
| MongoDB Atlas | Cloud | Base de datos NoSQL en la nube |
| dotenv | 17.x | Manejo de variables de entorno |
| cors | 2.x | Habilitación de peticiones cross-origin |
| nodemon | 3.x | Reinicio automático en desarrollo |
| ts-node | 10.x | Ejecución directa de TypeScript |

### Frontend
| Tecnología | Versión | Descripción |
|---|---|---|
| Angular | 17+ | Framework SPA de Google |
| TypeScript | 5.x | Tipado estático |
| Bootstrap | 5.x | Framework CSS responsivo |
| Bootstrap Icons | 1.x | Librería de íconos |
| RxJS | 7.x | Programación reactiva con Observables |
| Angular HttpClient | — | Cliente HTTP para consumir el API |

---

## 📁 Estructura del proyecto

```
gs1-community/
│
├── backend/                          ← Servidor Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts           ← Conexión a MongoDB
│   │   ├── models/
│   │   │   ├── habitantes.ts         ← Esquema de habitantes
│   │   │   ├── ayudas.ts             ← Esquema de ayudas
│   │   │   ├── jornadas_eventos.ts   ← Esquema de jornadas
│   │   │   ├── reportes_comunitarios.ts ← Esquema de reportes
│   │   │   └── usuarios.ts           ← Esquema de usuarios
│   │   ├── controllers/
│   │   │   ├── habitantesController.ts
│   │   │   ├── ayudasController.ts
│   │   │   ├── jornadasEventosController.ts
│   │   │   ├── reportesComunitariosController.ts
│   │   │   └── usuariosController.ts
│   │   ├── routes/
│   │   │   ├── habitantesRoutes.ts
│   │   │   ├── ayudasRoutes.ts
│   │   │   ├── jornadasEventosRoutes.ts
│   │   │   ├── reportesComunitariosRoutes.ts
│   │   │   └── usuariosRoutes.ts
│   │   └── index.ts                  ← Punto de entrada del servidor
│   ├── .env                          ← Variables de entorno (no subir a Git)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                         ← Aplicación Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── services/
    │   │   │   │   ├── habitantes.service.ts
    │   │   │   │   ├── ayudas.service.ts
    │   │   │   │   ├── jornadas.service.ts
    │   │   │   │   ├── reportes.service.ts
    │   │   │   │   └── usuarios.service.ts
    │   │   │   └── pipes/
    │   │   │       └── count-by.pipe.ts
    │   │   ├── shared/
    │   │   │   └── components/
    │   │   │       └── layout/
    │   │   │           ├── layout.component.ts
    │   │   │           └── layout.component.html
    │   │   ├── pages/
    │   │   │   ├── dashboard/
    │   │   │   ├── habitantes/
    │   │   │   ├── ayudas/
    │   │   │   ├── jornadas/
    │   │   │   ├── reportes/
    │   │   │   └── usuarios/
    │   │   ├── app.routes.ts         ← Definición de rutas
    │   │   └── app.config.ts         ← Configuración global
    │   └── styles.css                ← Estilos globales del sistema
    └── package.json
```

---

## 🗄️ Base de datos — Colecciones

El sistema trabaja con **5 colecciones** en MongoDB:

### 1. `habitantes`
Almacena el padrón de ciudadanos del sector.

| Campo | Tipo | Descripción |
|---|---|---|
| primer_nombre | String | Requerido |
| primer_apellido | String | Requerido |
| fecha_nacimiento | Date | Requerido |
| genero | String | Requerido |
| telefono_celular | Number | Opcional |
| correo | String | Opcional |
| estado_civil | String | Opcional |
| direccion | Object | sector, calle, casa, punto_referencia |
| discapacidad | Object | tiene_discapacidad, tipo, grado |
| enfermedades_cronicas | Array | Lista de enfermedades |
| nivel_instruccion | String | Nivel educativo |
| ocupacion | String | Trabajo actual |
| ingreso_mensual | Number | Ingreso en Bs |
| vivienda | Object | tipo, condicion, es_propia |
| jefe_familia | Boolean | Default: false |
| activo | Boolean | Soft delete, default: true |

### 2. `ayudas`
Gestiona los recursos y ayudas disponibles para la comunidad.

| Campo | Tipo | Descripción |
|---|---|---|
| codigo_ayuda | String | Único, requerido (ej: AYU-001) |
| tipo | String | alimentacion, medicamento, ropa, etc. |
| nombre | String | Requerido |
| descripcion | String | Opcional |
| unidad_medida | String | bolsas, cajas, etc. |
| proveedor | String | Organismo proveedor |
| condiciones_entrega | Array | Lista de condiciones |
| disponibilidad | Number | Cantidad disponible |
| prioridad_distribucion | String | alta / media / baja |
| requisitos_especiales | Array | Requisitos adicionales |
| almacenamiento | Object | ubicacion, condiciones, responsable |
| activo | Boolean | Soft delete, default: true |

### 3. `jornadas_eventos`
Registra eventos y jornadas comunitarias planificadas.

| Campo | Tipo | Descripción |
|---|---|---|
| nombre_evento | String | Requerido |
| tipo_jornada | String | Alimentacion, Salud, Educacion, etc. |
| descripcion | String | Opcional |
| fecha_inicio | Date | Requerido |
| sector_lugar | String | Lugar del evento |
| estatus | String | Programada / En curso / Finalizada / Cancelada |
| beneficios | Array | Lista de beneficios ofrecidos |
| beneficiarios_atendidos | Array | Personas atendidas |

### 4. `reportes_comunitarios`
Seguimiento de incidencias y problemas del sector.

| Campo | Tipo | Descripción |
|---|---|---|
| tipo_incidencia | String | Electricidad, Agua, Vialidad, etc. |
| descripcion | String | Requerido |
| sector | String | Requerido |
| estatus | String | Abierto / En proceso / Resuelto / Cerrado |
| prioridad | String | Alta / Media / Baja |
| reportado_por | String | Nombre del reportante |
| fecha_creacion | Date | Automática |
| evidencia | String | URL de imagen o documento |
| observaciones | String | Notas adicionales |

### 5. `usuarios`
Cuentas de acceso al sistema con roles diferenciados.

| Campo | Tipo | Descripción |
|---|---|---|
| nombre | String | Requerido |
| apellido | String | Requerido |
| correo | String | Único, requerido |
| contrasena | String | Requerido |
| rol | String | admin / operador / consulta |
| activo | Boolean | Soft delete, default: true |
| fecha_registro | Date | Automática |

---

## ✅ Requisitos previos

Antes de instalar el proyecto asegúrate de tener instalado:

- **Node.js** v18 o superior → [Descargar aquí](https://nodejs.org)
- **npm** v9 o superior (viene con Node.js)
- **Angular CLI** → `npm install -g @angular/cli`
- **TypeScript** → `npm install -g typescript`
- **Git** → [Descargar aquí](https://git-scm.com)
- Una cuenta en **MongoDB Atlas** → [Registrarse aquí](https://www.mongodb.com/atlas)

Verifica las versiones instaladas:
```bash
node --version
npm --version
ng version
tsc --version
```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Fher-404/comuniapp-express-crud
```

### 2. Configurar y ejecutar el Backend

```bash
# Entrar a la carpeta del backend
cd backend

# Instalar todas las dependencias
npm install

# Crear el archivo de variables de entorno
# (Ver sección Variables de entorno más abajo)
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de MongoDB Atlas (ver sección siguiente).

```bash
# Ejecutar en modo desarrollo (con recarga automática)
npm run dev

# O compilar y ejecutar en producción
npm run build
npm start
```

El servidor quedará corriendo en: **http://localhost:3000**

Deberías ver en la terminal:
```
🚀 Servidor corriendo en http://localhost:3000
✅ Conectado a MongoDB exitosamente
```

---

### 3. Configurar y ejecutar el Frontend

Abre una **nueva terminal** (el backend debe seguir corriendo):

```bash
# Desde la raíz del proyecto
cd frontend

# Instalar todas las dependencias
npm install

# Ejecutar en modo desarrollo
ng serve
```

La aplicación quedará disponible en: **http://localhost:4200**

---

### 4. Resumen rápido de comandos

```bash
# ── BACKEND ──────────────────────────────
cd backend
npm install        # Instalar dependencias
npm run dev        # Desarrollo (puerto 3000)
npm run build      # Compilar TypeScript a JavaScript
npm start          # Producción (desde /dist)

# ── FRONTEND ─────────────────────────────
cd frontend
npm install        # Instalar dependencias
ng serve           # Desarrollo (puerto 4200)
ng build           # Compilar para producción
```

---

## 🔐 Variables de entorno

En la carpeta `backend/` crea un archivo llamado `.env` con el siguiente contenido:

```env
# Puerto donde correrá el servidor
PORT=3000

# Cadena de conexión a MongoDB Atlas
# Reemplaza TU_USUARIO, TU_CONTRASEÑA y TU_CLUSTER con tus datos reales
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_CONTRASEÑA@TU_CLUSTER.mongodb.net/gs1?retryWrites=true&w=majority
```

> ⚠️ **Importante:** El archivo `.env` contiene información sensible.
> Nunca lo subas a GitHub. Está incluido en el `.gitignore` por defecto.

### ¿Cómo obtener la cadena de conexión de MongoDB Atlas?

1. Inicia sesión en [MongoDB Atlas](https://cloud.mongodb.com)
2. Selecciona tu cluster
3. Haz clic en **Connect**
4. Selecciona **Drivers**
5. Elige **Node.js** como driver
6. Copia la cadena de conexión y reemplaza `<password>` con tu contraseña

---

## 🌐 Endpoints del API REST

Base URL: `http://localhost:3000/api`

### 👥 Habitantes — `/api/habitantes`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/getall` | Obtener todos los habitantes activos |
| GET | `/:id` | Obtener un habitante por ID |
| GET | `/sector/:sector` | Buscar habitantes por sector |
| POST | `/` | Crear un nuevo habitante |
| PUT | `/:id` | Actualizar un habitante |
| DELETE | `/:id` | Desactivar un habitante (soft delete) |

### 📦 Ayudas — `/api/ayudas`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/getall` | Obtener todas las ayudas activas |
| GET | `/:id` | Obtener una ayuda por ID |
| GET | `/tipo/:tipo` | Buscar ayudas por tipo |
| POST | `/` | Crear una nueva ayuda |
| PUT | `/:id` | Actualizar una ayuda |
| DELETE | `/:id` | Desactivar una ayuda (soft delete) |

### 📅 Jornadas — `/api/jornadas-eventos`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/getall` | Obtener todas las jornadas |
| GET | `/:id` | Obtener una jornada por ID |
| GET | `/estatus/:estatus` | Buscar jornadas por estatus |
| POST | `/` | Crear una nueva jornada |
| PUT | `/:id` | Actualizar una jornada |
| DELETE | `/:id` | Cancelar una jornada |

### ⚠️ Reportes — `/api/reportes`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/getall` | Obtener todos los reportes |
| GET | `/:id` | Obtener un reporte por ID |
| GET | `/prioridad/:prioridad` | Buscar reportes por prioridad |
| POST | `/` | Crear un nuevo reporte |
| PUT | `/:id` | Actualizar un reporte |
| DELETE | `/:id` | Cerrar un reporte |

### 👤 Usuarios — `/api/usuarios`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/getall` | Obtener todos los usuarios activos |
| GET | `/:id` | Obtener un usuario por ID |
| GET | `/rol/:rol` | Buscar usuarios por rol |
| POST | `/` | Crear un nuevo usuario |
| PUT | `/:id` | Actualizar un usuario |
| DELETE | `/:id` | Desactivar un usuario (soft delete) |

---

## ✨ Funcionalidades

### Dashboard
- Estadísticas en tiempo real de todas las colecciones
- Contadores: habitantes, ayudas, jornadas y reportes activos
- Sub-estadísticas: jefes de familia, ayudas de alta prioridad, jornadas programadas, reportes sin resolver
- Barras de progreso dinámicas por estatus de reportes y jornadas
- Tabla de reportes recientes con prioridad y estatus
- Tabla de próximas jornadas programadas
- Tabla de últimos 5 habitantes registrados

### Módulo de Habitantes
- Listado completo con búsqueda en tiempo real
- Crear habitante con todos sus datos personales, dirección, salud y situación socioeconómica
- Editar habitante existente
- Eliminar (soft delete — marca como inactivo)
- Campos especiales: discapacidad condicional, enfermedades crónicas como array

### Módulo de Ayudas
- Listado con código, tipo, disponibilidad y prioridad
- Crear/editar ayuda con datos de almacenamiento
- Filtrado por nombre, tipo o código
- Prioridad de distribución con colores diferenciados

### Módulo de Jornadas y Eventos
- Listado con estatus visual por colores
- Crear/editar jornada con beneficios como lista
- Cancelación de jornadas (soft delete semántico)
- Filtrado por nombre, tipo o lugar

### Módulo de Reportes Comunitarios
- Listado con prioridad y estatus visual
- Crear/editar reporte con tipo de incidencia, sector y evidencia
- Cierre de reportes (soft delete semántico)
- Filtrado por incidencia, sector o estatus

### Módulo de Usuarios
- Listado con avatar generado desde inicial del nombre
- Crear/editar usuario con gestión de roles
- Roles: Admin (acceso total), Operador (gestión), Consulta (solo lectura)
- Desactivación de usuarios (soft delete)

### Características generales
- Notificaciones toast de éxito/error en todas las operaciones
- Modales de confirmación antes de eliminar
- Búsqueda instantánea en todos los módulos
- Diseño responsivo con Bootstrap
- Navegación lateral con rutas activas destacadas
- Lazy loading de componentes para mejor rendimiento

---

## 🏗️ Arquitectura del sistema

```
┌─────────────────────────────────────────────────────┐
│                 NAVEGADOR (Puerto 4200)             │
│                  Angular Frontend                   │
│  Dashboard │ Habitantes │ Ayudas │ Jornadas │ +más  │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP REST (JSON)
                      │ CORS habilitado
┌─────────────────────▼───────────────────────────────┐
│               BACKEND (Puerto 3000)                 │
│              Node.js + Express + TypeScript         │
│  Routes → Controllers → Models → Mongoose           │
└─────────────────────┬───────────────────────────────┘
                      │ Mongoose ODM
┌─────────────────────▼───────────────────────────────┐
│              MongoDB Compass                        │
│  habitantes │ ayudas │ jornadas │ reportes │ usuarios│
└─────────────────────────────────────────────────────┘
```

---

## 👨‍💻 Autores
- Fernando Marcano - C.I. V.- 29.752.386 - T.S.U. En Informatica
- Yhusleika Molina - C.I. V.- 27.401.354 - T.S.U. En Informatica
- Di mauro Vergara - C.I. V.- 26.498.909 - T.S.U. En Informatica


Proyecto desarrollado como evaluación universitaria para la asignatura de Bases de datos II

**Universidad:** UNETI
**Materia:** Bases de datos II  
**Año:** 2026

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.
