import {
  useEffect, 
  useState,
 } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
} from "react-bootstrap";
import { 
  actualizarStock,
  actualizarProducto,
  crearProducto,
  obtenerProductos,
  eliminarProducto, 
  obtenerProductosPorCategoria,
} from "../../services/productoService";
import type { 
  ActualizacionStock, 
  Producto, 
  ProductoFormulario 
} from "../../types/Producto";

import ModalProducto from "../ModalProducto/ModalProducto";

import ModalActualizarStock from "../ModalActualizarStock/ModalActualizarStock";

import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [versionModalStock, setVersionModalStock] = useState(0);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const [productoEditado, setProductoEditado] =
    useState<Producto | null>(null);
  
    const [productoAEliminar, setProductoAEliminar] =
    useState<Producto | null>(null);

    const [errorEliminar, setErrorEliminar] =
      useState<string | null>(null);

    const [mostrarModalStock, setMostrarModalStock] =
      useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch {
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const abrirAgregar = () => {
    setProductoEditado(null);
    setMostrarModal(true);
  };

  const abrirEditar = (producto: Producto) => {
    setProductoEditado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoEditado(null);
  };

  const guardarProducto = async (
    datos: ProductoFormulario,
  ) => {
    if (productoEditado) {
      const actualizado = await actualizarProducto(
        productoEditado._id,
        datos,
      );

      setProductos((anteriores) =>
        anteriores.map((producto) =>
          producto._id === actualizado._id
            ? actualizado
            : producto,
        ),
      );
    } else {
      const nuevoProducto = await crearProducto(datos);

      setProductos((anteriores) => [
        ...anteriores,
        nuevoProducto,
      ]);
    }

    cerrarModal();
  };
  
  const cerrarEliminar = () => {
    setProductoAEliminar(null);
    setErrorEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;

    try {
      await eliminarProducto(productoAEliminar._id);

      setProductos((anteriores) =>
        anteriores.filter(
          (producto) =>
            producto._id !== productoAEliminar._id,
        ),
      );

      cerrarEliminar();
    } catch {
      setErrorEliminar(
        "No se pudo eliminar el producto.",
      );
    }
  };

  const filtrarPorCategoria = async () => {
    if (!categoriaFiltro.trim()) {
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const productosFiltrados =
        await obtenerProductosPorCategoria(categoriaFiltro.trim());

      setProductos(productosFiltrados);
    } catch {
      setError("No se pudieron filtrar los productos por categoría.");
    } finally {
      setCargando(false);
    }
  };

  const mostrarTodos = async () => {
    setCargando(true);
    setError(null);
    setCategoriaFiltro("");

    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  const guardarStock = async (
    actualizaciones: ActualizacionStock[],
  ) => {
    const respuesta = await actualizarStock(actualizaciones);

    setProductos((anteriores) =>
      anteriores.map((producto) => {
        const actualizado = respuesta.productos.find(
          (item) => item._id === producto._id,
        );

        return actualizado ?? producto;
      }),
    );
  };

  const abrirModalStock = () => {
    setVersionModalStock((version) => version + 1);
    setMostrarModalStock(true);
  };

  return (
    <section className="py-5">
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <p className="text-primary fw-semibold text-uppercase mb-2">
              Inventario
            </p>

            <h1 className="fw-bold mb-2">
              Productos
            </h1>

            <p className="text-secondary mb-0">
              Gestioná los productos, cantidades y categorías de tu inventario.
            </p>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="outline-primary"
              onClick={abrirModalStock}
            >
              Actualizar stock
            </Button>

            <Button onClick={abrirAgregar}>
              + Agregar producto
            </Button>
          </div>
        </div>

        <ModalProducto
          mostrar={mostrarModal}
          producto={productoEditado}
          onCerrar={cerrarModal}
          onGuardar={guardarProducto}
        />

        <ModalActualizarStock
          key={versionModalStock}
          mostrar={mostrarModalStock}
          productos={productos}
          onCerrar={() => setMostrarModalStock(false)}
          onGuardar={guardarStock}
        />

        <Modal
          show={!!productoAEliminar}
          onHide={cerrarEliminar}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar producto</Modal.Title>
          </Modal.Header>

          <Modal.Body>
           ¿Seguro que querés eliminar{" "}
            <strong>{productoAEliminar?.nombre}</strong>?

            {errorEliminar && (
              <p className="text-danger mt-3 mb-0">
                {errorEliminar}
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={cerrarEliminar}
            >
              Cancelar
            </Button>

            <Button
              variant="danger"
              onClick={confirmarEliminar}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Form.Control
              type="text"
              placeholder="Buscar por categoría..."
              value={categoriaFiltro}
              onChange={(event) =>
                setCategoriaFiltro(event.target.value)
              }
              style={{ maxWidth: "320px" }}
            />

            <Button
              variant="primary"
              onClick={filtrarPorCategoria}
            >
              Filtrar
            </Button>

            <Button
              variant="light"
              className="border"
              onClick={mostrarTodos}
            >
              Mostrar todos
            </Button>
          </div>
        </div>

        {cargando && <p>Cargando productos...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-muted">No hay productos cargados.</p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <Row className="g-4 align-items-stretch">
            {productos.map((producto) => (
              <Col md={6} lg={4} key={producto._id}>
                <TarjetaProducto
                  producto={producto}
                  onEditar={abrirEditar}
                  onEliminar={setProductoAEliminar}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ListaProductos;