import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfiguradorStock from "../ConfiguradorStock/ConfiguradorStock";
import "./HeroPrincipal.css";

const HeroPrincipal = () => {
  return (
    <section id="inicio" className="hero-principal py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={8}>
            <span className="hero-etiqueta">
              NEXOSTOCK
            </span>

            <h1 className="hero-titulo">
              Controlá tu inventario de forma simple.
            </h1>

            <p className="hero-descripcion">
              Gestioná productos, cantidades y categorías desde un solo lugar
              y mantené siempre una visión clara de tu stock.
            </p>

            <div className="hero-acciones d-flex flex-wrap gap-2">
              <Link
                to="/productos"
                className="btn btn-primary btn-lg"
              >
                Ver productos
              </Link>

              <ConfiguradorStock />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroPrincipal;