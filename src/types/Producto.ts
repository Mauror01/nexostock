export type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidad: number;
  categoria?: string;
  imagen?: string;
  fechaIngreso: string;
};

export type ProductoFormulario = Pick<
  Producto,
  "nombre" | "descripcion" | "precio" | "cantidad" | "categoria" | "imagen"
>;

export type ActualizacionStock = {
  id: string;
  cantidad: number;
};

export type RespuestaActualizacionStock = {
  mensaje: string;
  productos: Producto[];
};