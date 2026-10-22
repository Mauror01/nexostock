import axios from "axios";
import type {
  ActualizacionStock,
  Producto,
  ProductoFormulario,
  RespuestaActualizacionStock,
} from "../types/Producto";

const BASE_URL = "http://localhost:3000/productos";

export const obtenerProductos = async (): Promise<Producto[]> => {
  const respuesta = await axios.get(BASE_URL);

  return respuesta.data;
};

export const crearProducto = async (
  datos: ProductoFormulario,
): Promise<Producto> => {
  const respuesta = await axios.post(BASE_URL, datos);

  return respuesta.data;
};

export const actualizarProducto = async (
  id: string,
  datos: ProductoFormulario,
): Promise<Producto> => {
  const respuesta = await axios.put(`${BASE_URL}/${id}`, datos);

  return respuesta.data;
};

export const eliminarProducto = async (
  id: string,
): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const obtenerProductosPorCategoria = async (
  categoria: string,
): Promise<Producto[]> => {
  const respuesta = await axios.get(
    `${BASE_URL}/categoria/${encodeURIComponent(categoria)}`,
  );

  return respuesta.data;
};

export const obtenerProductosBajoStock = async (
  cantidad: number,
): Promise<Producto[]> => {
  const respuesta = await axios.get(
    `${BASE_URL}/bajo-stock/${cantidad}`,
  );

  return respuesta.data;
};

export const actualizarStock = async (
  actualizaciones: ActualizacionStock[],
): Promise<RespuestaActualizacionStock> => {
  const respuesta = await axios.put(
    `${BASE_URL}/actualizar-stock`,
    actualizaciones,
  );

  return respuesta.data;
};