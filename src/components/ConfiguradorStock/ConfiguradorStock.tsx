import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { obtenerProductosBajoStock } from "../../services/productoService";
import type { Producto } from "../../types/Producto";

const ConfiguradorStock = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [limiteStock, setLimiteStock] = useState(5);

  const [productosBajoStock, setProductosBajoStock] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consultado, setConsultado] = useState(false);

  const consultarStock = async () => {
    if (!Number.isInteger(limiteStock) || limiteStock < 0) {
      setError("El límite debe ser un número entero mayor o igual a cero.");
      return;
    }

    setCargando(true);
    setError(null);
    setConsultado(false);

    try {
      const productos = await obtenerProductosBajoStock(limiteStock);

      setProductosBajoStock(productos);
      setConsultado(true);
    } catch {
      setError("No se pudieron consultar los productos con stock bajo.");
    } finally {
      setCargando(false);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setError(null);
    setConsultado(false);
    setProductosBajoStock([]);
  };

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => setMostrarModal(true)}
      >
        Consultar stock bajo
      </Button>

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Productos con stock bajo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="limiteStock">
            <Form.Label>Límite de stock</Form.Label>

            <Form.Control
              type="number"
              name="limiteStock"
              min="0"
              step="1"
              value={limiteStock}
              onChange={(event) =>
                setLimiteStock(Number(event.target.value))
              }
            />
          </Form.Group>

          <p className="mt-3">
            Se mostrarán los productos que tengan menos de{" "}
            <strong>{limiteStock}</strong> unidades.
          </p>

          <Button
            onClick={consultarStock}
            disabled={cargando}
          >
            {cargando ? "Consultando..." : "Consultar"}
          </Button>

          {error && (
            <p className="text-danger mt-3 mb-0">
              {error}
            </p>
          )}

          {consultado && productosBajoStock.length === 0 && (
            <p className="text-muted mt-3 mb-0">
              No hay productos con stock por debajo de ese límite.
            </p>
          )}

          {consultado && productosBajoStock.length > 0 && (
            <div className="mt-3">
              <p className="fw-semibold mb-2">
                Productos encontrados:
              </p>

              {productosBajoStock.map((producto) => (
                <div
                  key={producto._id}
                  className="border rounded p-2 mb-2"
                >
                  <strong>{producto.nombre}</strong>

                  <div className="text-muted">
                    Stock actual: {producto.cantidad}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cerrarModal}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfiguradorStock;