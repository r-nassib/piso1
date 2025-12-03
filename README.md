# 🏠 Piso1 — Buscador de pisos y viviendas en España

## Descripción del proyecto

**Piso1** es una aplicación web que permitirá buscar, filtrar y gestionar inmuebles (pisos, casas y habitaciones) en el contexto inmobiliario de España.

El objetivo es crear una plataforma moderna que facilite la búsqueda de vivienda desde una perspectiva realista del mercado español, incorporando filtros avanzados por provincias, municipios, tipo de inmueble, régimen de alquiler/venta y características relevantes como ascensor, certificación energética, amueblamiento, etc.

El sistema estará diseñado para desplegarse en la nube, con una arquitectura basada en microservicios, autenticación OAuth y una base tecnológica moderna y escalable.

---

## Problema que resuelve

Actualmente, la búsqueda de vivienda en España presenta varias problemáticas:

- Información desactualizada o inconsistente.
- Filtros poco adaptados a la realidad local (barrios, transporte, tipo de contrato).
- Diferente tipo de usuarios obligados a usar la misma interfaz.
- Sistemas monolíticos que no escalan bien.
- Pocas opciones de personalización.


**Piso1** busca ofrecer una solución profesional, eficiente y orientada a datos reales con una arquitectura basada en la nube.

---

## Tipos de usuario

| Rol         | Descripción |
|-------------|-------------|
| Usuario     | Busca inmuebles, guarda favoritos y crea alertas |
| Propietario | Publica y gestiona sus inmuebles |
| Agencia     | Gestiona múltiples inmuebles |
| Admin       | Administra usuarios y datos del sistema |

---

## Arquitectura General

Arquitectura basada en microservicios:

- API Gateway
- Servicio de Usuarios
- Servicio de Autenticación (Keycloak)
- Servicio de Inmuebles
- Servicio de Búsqueda (OpenSearch)
- Servicio de Favoritos y Alertas
- Servicio de Analítica
- Frontend Web (Next.js)

El sistema se desplegará en contenedores Docker y se orquestará mediante Kubernetes.

---

## Tecnologías previstas

### Frontend
- React + TypeScript
- Next.js
- Tailwind CSS
- React Query
- Leaflet + OpenStreetMap

### Backend
- Node.js + TypeScript
- NestJS
- Arquitectura de microservicios
- API Gateway

### Autenticación
- Keycloak
- OAuth2 / OpenID Connect
- JWT

### Bases de datos
- MongoDB
- OpenSearch

### Infraestructura
- Docker
- Kubernetes
- GitHub Actions (CI/CD)

---

## Metodología de trabajo

- Desarrollo incremental por hitos.
- Uso de GitHub Issues y Milestones.
- Commits semánticos y descriptivos.
- Rama principal protegida.
- Integración continua.
- Pruebas unitarias desde los primeros hitos.

---

## Documentación del proyecto

Cada hito tendrá su propia documentación:

- [Hito 1 – Definición y entorno](docs/hito1.md)
- Hito 2 – Integración continua (próximamente)
- Hito 3 – Diseño de microservicios (próximamente)
- Hito 4 – Contenedores (próximamente)
- Hito 5 – 
Despliegue (próximamente)
---

## Licencia MIT

Este proyecto se distribuye bajo la Licencia de Código Abierto del MIT, a menudo denominada "Licencia MIT"(Massachusetts Institute of Technology), una licencia de código abierto permisiva que permite usar, modificar y distribuir el software con mínimas restricciones.
Más información sobre la licencia MIT puede encontrarse [aquí](LICENSE).

---

## Autor

Proyecto desarrollado por:

**Raúl Nassib Hidalgo Veliz**  
📍 Granada, España

💻 Cloud Computing

🎓 Máster Universitario en Ingeniería Informática
  
GitHub: [r-nassib](https://github.com/r-nassib)

---
