import api from "../../config/server";

export async function GET(req: Request) {
  try {
    const { data } = await api.get(`products`);
    const listaProducts = data;
    const listaVariantes = [];

    for (const producto of listaProducts) {
      const variantesData = await api.get(`products/${producto.id}/variations`);
      listaVariantes.push(variantesData.data);
    }
    return Response.json(listaVariantes);
  } catch (error) {
    return Response.json({ error });
  }
}


