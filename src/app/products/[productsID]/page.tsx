import React from "react"; // Importa React para usar JSX y tipos de React.
import { getProductById } from "@/helpers/products.helpers"; // Importa la función para obtener un producto por ID.
import ProductDetail from "@/components/ProductDetail/ProductDetail"; // Importa el componente para mostrar los detalles del producto.
import ItemDetailProps from "@/interfaces/ItemDetail"; // Importa la interfaz de propiedades para el componente ItemDetail.

// Define el componente ItemDetail como una función asincrónica que recibe las propiedades de tipo ItemDetailProps.
const ItemDetail: React.FC<ItemDetailProps> = async ({ params }) => {
  const { productsID } = params; // Desestructura el ID del producto desde los parámetros.
  const product = await getProductById(productsID); // Obtiene los detalles del producto usando el ID.

  return (
      <ProductDetail {...product} /> // Renderiza el componente ProductDetail pasando los detalles del producto como props.
  );
};

export default ItemDetail; // Exporta el componente ItemDetail para su uso en otras partes de la aplicación.

