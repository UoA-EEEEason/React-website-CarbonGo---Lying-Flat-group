import { Helmet } from 'react-helmet-async';

import { NewProductView } from 'src/sections/products/new';

// ----------------------------------------------------------------------

export default function NewProductPage() {
  return (
    <>
      <Helmet>
        <title> NewProduct | Lying Flat </title>
      </Helmet>

      <NewProductView />
    </>
  );
}
