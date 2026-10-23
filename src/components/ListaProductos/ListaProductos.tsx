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

  return (
    <section className="py-5">
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold">Productos del inventario</h2>

            <p className="text-muted mb-0">
              Información obtenida directamente desde la API de NexoStock.
            </p>
          </div>
          

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              onClick={() => setMostrarModalStock(true)}
           >
              Actualizar stock
            </Button>

          <Button onClick={abrirAgregar}>
            Agregar producto
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

        <div className="d-flex flex-wrap gap-2 mb-4">
          <Form.Control
            type="text"
            placeholder="Filtrar por categoría"
            value={categoriaFiltro}
            onChange={(event) =>
              setCategoriaFiltro(event.target.value)
            }
            style={{ maxWidth: "300px" }}
          />

          <Button
            variant="outline-primary"
            onClick={filtrarPorCategoria}
          >
            Filtrar
          </Button>

          <Button
            variant="outline-secondary"
            onClick={mostrarTodos}
          >
           Mostrar todos
          </Button>
        </div>

        {cargando && <p>Cargando productos...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-muted">No hay productos cargados.</p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <Row className="g-4">
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