import api from '../../config/server'


export async function GET(req: Request,
  ) {

try {
    const {data} = await api.get("shipping_methods")
    return Response.json(data)
  } catch (error) {
    return Response.json({error})
  }
}

