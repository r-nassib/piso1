# HITO 3 — Diseño de Microservicios

## Objetivo del hito

El objetivo de este hito es diseñar e implementar un **microservicio REST** que constituya la funcionalidad base del backend del proyecto **Piso1**, aplicando principios de diseño por capas, separación de responsabilidades, pruebas exhaustivas, logging y preparación para despliegue en la nube.

Este hito marca el inicio del **producto mínimo viable (MVP) del backend**, donde la API empieza a tomar forma real y la lógica de negocio deja de ser únicamente funciones aisladas.

---

## Microservicio implementado

### Nombre del microservicio
**search-service**

### Responsabilidad
El microservicio `search-service` es responsable de:

- Obtener inmuebles por identificador.
- Buscar y filtrar inmuebles por ciudad.
- Filtrar inmuebles por rango de precios.
- Validar reglas de negocio asociadas a la búsqueda.

Este microservicio representa el núcleo funcional del backend de Piso1, ya que la búsqueda y filtrado de inmuebles es el principal caso de uso de la aplicación.

---

## Framework elegido para el microservicio

### Elección
Se ha utilizado **Express.js** como framework para implementar la API REST del microservicio.

### Justificación técnica

- Es un framework ligero, estable y ampliamente utilizado.
- Permite un control explícito del diseño por capas sin imponer estructura.
- Se integra fácilmente con TypeScript, Jest y Supertest.
- Es adecuado para microservicios REST sencillos y bien definidos.
- Facilita la separación entre API, lógica de negocio e infraestructura.

Esta elección prioriza claridad, control y alineación con los principios del enunciado frente a frameworks más pesados.

---

## Diseño por capas del microservicio

El microservicio sigue una **arquitectura por capas**, desacoplando completamente la API de la lógica de negocio y del acceso a datos.


### Descripción de cada capa

#### Dominio (`domain`)
- Define las entidades (`Inmueble`).
- Define reglas de negocio y validaciones.
- Contiene errores de dominio (`InvalidFilterError`, `InmuebleNoEncontradoError`).
- No depende de ninguna otra capa.

#### Aplicación (`application`)
- Implementa los **casos de uso**:
  - Obtener inmueble por id.
  - Buscar inmuebles aplicando filtros.
- Orquesta dominio + repositorios.
- No conoce detalles de la API ni de Express.

#### Infraestructura (`infrastructure`)
- Implementa el repositorio de inmuebles **in-memory** como single source of truth.
- Proporciona el sistema de logging.
- Puede sustituirse fácilmente por una base de datos real sin modificar el dominio ni la API.

#### API (`api/search-service`)
- Expone la funcionalidad mediante rutas REST.
- Traduce errores de dominio a códigos HTTP.
- No contiene lógica de negocio.
