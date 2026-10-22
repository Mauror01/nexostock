import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { obtenerProductos } from "../../services/productoService";
import type { Producto } from "../../types/Producto";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="py-5">
      <Container>
        <div className="mb-4">
          <h2 className="fw-bold">Productos del inventario</h2>
          <p className="text-muted mb-0">
            Información obtenida directamente desde la API de NexoStock.
          </p>
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