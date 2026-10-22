import { useEffect, useState } from "react";
import { 
  Button, 
  Card, 
  Col, 
  Container, 
  Row,
  Modal,
 } from "react-bootstrap";
import { 
  actualizarProducto,
  crearProducto,
  obtenerProductos,
  eliminarProducto, 
} from "../../services/productoService";
import type { Producto, ProductoFormulario } from "../../types/Producto";
import ModalProducto from "../ModalProducto/ModalProducto";


const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [productoEditado, setProductoEditado] =
    useState<Producto | null>(null);
  
    const [productoAEliminar, setProductoAEliminar] =
    useState<Producto | null>(null);

  const [errorEliminar, setErrorEliminar] =
    useState<string | null>(null);

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

          <Button onClick={abrirAgregar}>
            Agregar producto
          </Button>
        </div>

        <ModalProducto
          mostrar={mostrarModal}
          producto={productoEditado}
          onCerrar={cerrarModal}
          onGuardar={guardarProducto}
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

        {cargando && <p>Cargando productos...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-muted">No hay productos cargados.</p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <Row className="g-4">
            {productos.map((producto) => (
              <Col md={6} lg={4} key={producto._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      {producto.categoria || "Sin categoría"}
                    </Card.Subtitle>

                    <Card.Title>{producto.nombre}</Card.Title>

                    <Card.Text>
                      {producto.descripcion || "Sin descripción"}
                    </Card.Text>

                    <p className="mb-1">
                      <strong>Precio:</strong> ${producto.precio}
                    </p>

                    <p className="mb-0">
                      <strong>Stock:</strong> {producto.cantidad}
                    </p>
                  </Card.Body>
                <Card.Footer className="bg-white border-0">
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ListaProductos;