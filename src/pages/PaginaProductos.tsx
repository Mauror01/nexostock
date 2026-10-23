import ListaProductos from "../components/ListaProductos/ListaProductos";
import "./PaginaProductos.css";

const PaginaProductos = () => {
  return (
    <main className="pagina-productos">
      <div className="pagina-productos-contenido">
        <ListaProductos />
      </div>
    </main>
  );
};

export default PaginaProductos;