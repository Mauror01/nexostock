import { Col, Container, Row } from "react-bootstrap";
import FuncionCard from "../FuncionCard/FuncionCard";
import TituloSeccion from "../TituloSeccion/TituloSeccion";

const SeccionFunciones = () => {
  return (
    <section id="funciones" className="py-5 bg-light">
      <Container>
        <TituloSeccion
          titulo="Todo lo necesario para organizar tu inventario"
          subtitulo="NexoStock reúne las funciones esenciales para mantener el control de tus productos."
        />

        <Row className="g-4">
          <Col md={4}>
            <FuncionCard
              categoria="Productos"
              titulo="Gestión de productos"
              descripcion="Organizá la información de los productos que forman parte de tu inventario."
            />
          </Col>

          <Col md={4}>
            <FuncionCard
              categoria="Stock"
              titulo="Control de cantidades"
              descripcion="Mantené una visión clara de las existencias disponibles de cada producto."
            />
          </Col>

          <Col md={4}>
            <FuncionCard
              categoria="Organización"
              titulo="Categorías"
              descripcion="Agrupá los productos por categorías para encontrarlos y administrarlos con mayor facilidad."
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionFunciones;