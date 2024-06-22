import WooCommerceRestApi  from '@woocommerce/woocommerce-rest-api'

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_URL!,
    consumerKey: process.env.NEXT_PUBLIC_CONSUMERKEY!,
    consumerSecret: process.env.NEXT_PUBLIC_CONSUMERSECTRET!,
    version: "wc/v3",
  });


  export default api