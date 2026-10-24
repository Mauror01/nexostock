# NexoStock

NexoStock es una aplicación web para administrar productos e inventario. Permite consultar productos, crear nuevos registros, editar información, eliminar productos y controlar las cantidades disponibles desde una interfaz responsive.

El proyecto está desarrollado con React y TypeScript y consume una API propia construida con Node.js, Express y MongoDB.

## Funcionalidades

- **Listado de productos:** consulta los productos almacenados en la base de datos.
- **Alta de productos:** permite agregar nuevos productos mediante formularios con validaciones.
- **Edición y eliminación:** modifica o elimina productos existentes, con confirmación antes de borrar.
- **Filtro por categoría:** permite consultar productos de una categoría determinada.
- **Control de stock bajo:** busca productos cuya cantidad está por debajo de un límite elegido.
- **Actualización masiva de stock:** permite actualizar las cantidades de varios productos desde un mismo formulario.
- **Imágenes de productos:** permite asociar una imagen mediante una URL.
- **Navegación:** separa la página de inicio del catálogo mediante React Router.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- React-Bootstrap y Bootstrap
- React Router DOM
- Axios
- Formik
- Yup

### Backend
- Node.js
- Express
- Mongoose
- MongoDB
- CORS

## Repositorios

- **Frontend:** [NexoStock](https://github.com/Mauror01/nexostock)
- **API:** [API REST de inventario](https://github.com/Mauror01/api-rest-inventario)

El frontend y el backend se mantienen en repositorios independientes.

## Requisitos previos

Para ejecutar el proyecto localmente necesitás:

- Node.js y npm.
- MongoDB en funcionamiento.
- Los repositorios del frontend y de la API clonados en tu computadora.

## Instalación y ejecución

### 1. Configurar y ejecutar la API

Cloná el repositorio del backend:

```bash
git clone https://github.com/Mauror01/api-rest-inventario.git
cd api-rest-inventario
npm install
```

Verificá que MongoDB esté disponible y que la configuración de conexión de la API coincida con tu entorno.

Iniciá el servidor:

```bash
npm run dev
```

La API utiliza el puerto `3000`.

Podés comprobar su funcionamiento desde el navegador:

- API: http://localhost:3000/
- Productos: http://localhost:3000/productos

### 2. Configurar y ejecutar NexoStock

En una segunda terminal, cloná el frontend:

```bash
git clone https://github.com/Mauror01/nexostock.git
cd nexostock
npm install
npm run dev
```

Vite mostrará la dirección local del frontend, normalmente:

http://localhost:5173/

Mantené ambas terminales abiertas mientras utilizás la aplicación: una ejecuta la API y la otra el frontend.

## Endpoints utilizados

La interfaz consume los siguientes endpoints de la API:

| Método | Ruta | Función |
|---|---|---|
| GET | `/productos` | Obtener el listado de productos |
| POST | `/productos` | Crear un producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |
| GET | `/productos/categoria/:categoria` | Filtrar por categoría |
| GET | `/productos/bajo-stock/:cantidad` | Consultar productos con stock bajo |
| PUT | `/productos/actualizar-stock` | Actualizar el stock de varios productos |

Las operaciones se centralizan en la capa de servicios del frontend mediante Axios. Los componentes utilizan esos servicios para consultar y modificar los datos.

## Verificación del frontend

Para comprobar que el proyecto compila:

```bash
npm run build
```

Para ejecutar ESLint:

```bash
npm run lint
```

## Estructura general

```text
src/
├── components/
├── pages/
├── services/
├── types/
├── App.tsx
├── index.css
└── main.tsx
```

- `components/`: componentes reutilizables de la interfaz.
- `pages/`: páginas asociadas a las rutas.
- `services/`: comunicación con la API.
- `types/`: tipos e interfaces de TypeScript.
- `App.tsx`: composición de la aplicación y configuración de rutas.
- `main.tsx`: punto de entrada de React.

## Proyecto académico

NexoStock se desarrolla como parte del Entregable Final de React. Su objetivo es integrar los conceptos de componentes, props, estado, efectos, TypeScript, Axios, React Router, formularios con Formik y Yup, operaciones CRUD y endpoints específicos de una API propia.