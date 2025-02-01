# Docker Node.js y MySQL Setup

Este proyecto configura un entorno de desarrollo utilizando Docker con Node.js y MySQL. La configuración incluye contenedores separados para la aplicación Node.js y la base de datos MySQL, conectados a través de una red Docker personalizada.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Docker
- Docker Compose
- Git (opcional, para clonar el repositorio)

## Estructura del Proyecto

```
.
├── Dockerfile
├── docker compose.yml
├── package.json
└── [archivos de tu aplicación]
```

## Configuración

### Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

**MySQL:**

- MYSQL_ROOT_PASSWORD: AB12cd34ef56
- MYSQL_DATABASE: testdb
- Puerto: 3306

**Node.js App:**

- Puerto: 3000
- Conexión a la base de datos configurada automáticamente

## Instalación y Ejecución

1. Clona el repositorio (si aplica):

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Construye y ejecuta los contenedores:

   ```bash
   docker compose up --build
   ```

   Para ejecutar en modo detached (background):

   ```bash
   docker compose up -d --build
   ```

## Servicios

### Aplicación Node.js (app)

- Construida desde el Dockerfile local
- Puerto expuesto: 3000
- Montaje de volumen para desarrollo en tiempo real
- Depende del servicio de base de datos

### Base de Datos MySQL (db)

- Imagen: mysql:8.0
- Puerto expuesto: 3306
- Datos persistentes mediante volumen Docker
- Incluye healthcheck para garantizar disponibilidad

## Volúmenes

- `mysql-data`: Almacena los datos de MySQL de forma persistente

## Redes

- `app_network`: Red bridge para la comunicación entre contenedores

## Comandos Útiles

```bash
# Ver logs de los contenedores
docker compose logs

# Ver logs de un servicio específico
docker compose logs node_app
docker compose logs mysql_db

# Detener los contenedores
docker compose down

# Detener los contenedores y eliminar volúmenes
docker compose down -v

# Ver contenedores en ejecución
docker compose ps
```

## Desarrollo

El proyecto está configurado para desarrollo con hot-reload. Los cambios en el código fuente se reflejarán automáticamente gracias al montaje de volumen:

```yaml
volumes:
  - .:/usr/src/app
```

## Conexión a la Base de Datos

Para conectarte a la base de datos desde tu aplicación Node.js, usa las siguientes credenciales:

```javascript
{
  host: 'db',
  user: 'root',
  password: 'AB12cd34ef56',
  database: 'testdb'
}
```

## Solución de Problemas

1. Si la aplicación no puede conectar con la base de datos:

   - Verifica que el servicio de MySQL esté saludable: `docker compose ps`
   - Revisa los logs de MySQL: `docker compose logs db`

2. Si los cambios no se reflejan en la aplicación:
   - Verifica que el volumen esté montado correctamente
   - Reinicia los contenedores: `docker compose restart`
