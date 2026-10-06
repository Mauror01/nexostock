import { Button, Col, Container, Row } from "react-bootstrap";

const HeroPrincipal = () => {
  return (
    <section id="inicio" className="py-5">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={7}>
            <p className="text-uppercase fw-semibold mb-2">
              NexoStock
            </p>

            <h1 className="display-4 fw-bold">
              Tu inventario, organizado en un solo lugar.
            </h1>

            <p className="lead">
              Una forma simple de gestionar productos, controlar el stock
              y mantener organizada la información de tu inventario.
            </p>

            <Button href="#funciones">
              Explorar funciones
            </Button>
          </Col>

          <Col md={5}>
            <div className="border rounded-4 p-4 shadow-sm">
              <h2 className="h4">
                Control simple de tu inventario
              </h2>

              <p className="mb-0">
                Productos, cantidades y categorías organizados para tener
                siempre una visión clara de tu stock.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroPrincipal;