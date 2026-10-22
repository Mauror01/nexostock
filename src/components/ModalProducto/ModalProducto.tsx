import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import type {
  Producto,
  ProductoFormulario,
} from "../../types/Producto";

type Props = {
  mostrar: boolean;
  producto?: Producto | null;
  onCerrar: () => void;
  onGuardar: (datos: ProductoFormulario) => Promise<void>;
};

const esquema = Yup.object({
  nombre: Yup.string()
    .trim()
    .required("El nombre es obligatorio"),

  descripcion: Yup.string()
    .trim(),

  precio: Yup.number()
    .typeError("El precio debe ser un número")
    .min(0, "El precio no puede ser negativo")
    .required("El precio es obligatorio"),

  cantidad: Yup.number()
    .typeError("La cantidad debe ser un número")
    .integer("La cantidad debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa")
    .required("La cantidad es obligatoria"),

  categoria: Yup.string()
    .trim(),
});

const valoresIniciales: ProductoFormulario = {
  nombre: "",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  categoria: "",
};

const ModalProducto = ({
  mostrar,
  producto,
  onCerrar,
  onGuardar,
}: Props) => {
  const formik = useFormik<ProductoFormulario>({
    initialValues: producto
      ? {
          nombre: producto.nombre,
          descripcion: producto.descripcion ?? "",
          precio: producto.precio,
          cantidad: producto.cantidad,
          categoria: producto.categoria ?? "",
        }
      : valoresIniciales,

    enableReinitialize: true,

    validationSchema: esquema,

    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        await onGuardar(valores);
        resetForm();
      } catch {
        setStatus("No se pudo guardar el producto.");
      }
    },
  });

  const cerrar = () => {
    formik.resetForm();
    onCerrar();
  };

  return (
    <Modal show={mostrar} onHide={cerrar} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>
            {producto ? "Editar producto" : "Agregar producto"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.nombre && !!formik.errors.nombre
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formik.values.descripcion ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              min="0"
              value={formik.values.precio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.precio && !!formik.errors.precio
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.precio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="cantidad">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              min="0"
              value={formik.values.cantidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.cantidad && !!formik.errors.cantidad
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.cantidad}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              name="categoria"
              value={formik.values.categoria ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>

          {formik.status && (
            <p className="text-danger mt-3 mb-0">
              {formik.status}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalProducto;