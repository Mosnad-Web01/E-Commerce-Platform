import { CONFIG } from 'src/config-global';
import { getProducts } from 'src/actions/product-ssr';

import { ProductShopView } from 'src/sections/product/view';
import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default async function Page() {
  const { products } = await getProducts();

  return (
    <MainLayout>
      <ProductShopView products={products} />;
    </MainLayout>
  );
}
