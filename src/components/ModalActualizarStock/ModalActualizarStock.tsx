import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import type {
  ActualizacionStock,
  Producto,
} from "../../types/Producto";

type Props = {
  mostrar: boolean;
  productos: Producto[];
  onCerrar: () => void;
  onGuardar: (
    actualizaciones: ActualizacionStock[],
  ) => Promise<void>;
};

const ModalActualizarStock = ({
  mostrar,
  productos,
  onCerrar,
  onGuardar,
}: Props) => {
  const [cantidades, setCantidades] =
    useState<Record<string, number>>({});

  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (mostrar) {
      const valores = Object.fromEntries(
        productos.map((producto) => [
          producto._id,
          producto.cantidad,
        ]),
      );

      setCantidades(valores);
      setError(null);
    }
  }, [mostrar, productos]);

  const cambiarCantidad = (
    id: string,
    cantidad: number,
  ) => {
    setCantidades((anteriores) => ({
      ...anteriores,
      [id]: cantidad,
    }));
  };

  const guardar = async () => {
    const actualizaciones = productos
      .filter(
        (producto) =>
          cantidades[producto._id] !== producto.cantidad,
      )
      .map((producto) => ({
        id: producto._id,
        cantidad: cantidades[producto._id],
      }));

    if (actualizaciones.length === 0) {
      setError("No modificaste ninguna cantidad.");
      return;
    }

    const hayCantidadInvalida = actualizaciones.some(
      (actualizacion) =>
        !Number.isInteger(actualizacion.cantidad) ||
        actualizacion.cantidad < 0,
    );

    if (hayCantidadInvalida) {
      setError(
        "Las cantidades deben ser números enteros mayores o iguales a cero.",
      );
      return;
    }

    try {
      setGuardando(true);
      setError(null);

      await onGuardar(actualizaciones);

      onCerrar();
    } catch {
      setError("No se pudo actualizar el stock.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={mostrar} onHide={onCerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar stock</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {productos.map((producto) => (
          <Form.Group
            key={producto._id}
            className="mb-3"
            controlId={`stock-${producto._id}`}
          >
            <Form.Label>{producto.nombre}</Form.Label>

            <Form.Control
              type="number"
              min="0"
              step="1"
              value={cantidades[producto._id] ?? 0}
              onChange={(event) =>
                cambiarCantidad(
                  producto._id,
                  Number(event.target.value),
                )
              }
            />
          </Form.Group>
        ))}

        {error && (
          <p className="text-danger mb-0">
            {error}
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onCerrar}
        >
          Cancelar
        </Button>

        <Button
          onClick={guardar}
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Guardar stock"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActualizarStock;