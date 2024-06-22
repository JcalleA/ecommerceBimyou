import api from '../../config/server'


export async function GET(req: Request,
  ) {

try {
    const {data} = await api.get(`products`);
    return Response.json(data)
  } catch (error) {
    return Response.json({error})
  }
}

export async function POST(req: Request,
res:Response) {
  const form=req.body
  try {
    const {data}= await api.post("orders", form);
      return Response.json(data)
    
  } catch (error) {
    return new Response(`${error}`,{status:500})
    
  }
}