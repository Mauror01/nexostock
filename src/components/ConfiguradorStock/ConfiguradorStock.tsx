import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ConfiguradorStock = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [limiteStock, setLimiteStock] = useState(5);

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => setMostrarModal(true)}
      >
        Configurar alerta de stock
      </Button>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta de stock bajo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="limiteStock">
        <Form.Label>
            Cantidad mínima de productos
        </Form.Label>

        <Form.Control
            type="number"
            name="limiteStock"
            min="0"
            value={limiteStock}
            onChange={(event) =>
                setLimiteStock(Number(event.target.value))
            }
        />
        </Form.Group>

          <p className="mt-3 mb-0">
            Se considerará stock bajo cuando haya menos de{" "}
            <strong>{limiteStock}</strong> unidades.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMostrarModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfiguradorStock;