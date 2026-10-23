import { Badge, Button, Card } from "react-bootstrap";
import type { Producto } from "../../types/Producto";
import "./TarjetaProducto.css";

type Props = {
  producto: Producto;
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
};

const formatearPrecio = (precio: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);

const TarjetaProducto = ({
  producto,
  onEditar,
  onEliminar,
}: Props) => {
  const stockBajo = producto.cantidad <= 3;

  return (
    <Card className="tarjeta-producto h-100">
      <div className="tarjeta-producto-imagen">
        <span>{producto.nombre.charAt(0).toUpperCase()}</span>
      </div>

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <Badge bg="secondary">
            {producto.categoria || "Sin categoría"}
          </Badge>

          <Badge bg={stockBajo ? "danger" : "success"}>
            Stock: {producto.cantidad}
          </Badge>
        </div>

        <Card.Title className="fw-bold">
          {producto.nombre}
        </Card.Title>

        <Card.Text className="text-secondary">
          {producto.descripcion || "Sin descripción"}
        </Card.Text>

        <p className="tarjeta-producto-precio mb-0">
          {formatearPrecio(producto.precio)}
        </p>
      </Card.Body>

      <Card.Footer className="bg-white border-0 pt-0">
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEditar(producto)}
          >
            Editar
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onEliminar(producto)}
          >
            Eliminar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TarjetaProducto;