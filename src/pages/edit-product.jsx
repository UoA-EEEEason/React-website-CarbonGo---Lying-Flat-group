import { Helmet } from 'react-helmet-async';

import { EditProductView } from 'src/sections/products/edit';

// ----------------------------------------------------------------------

export default function EditProductPage() {
  return (
    <>
      <Helmet>
        <title> EditPost | Lying Flat </title>
      </Helmet>

      <EditProductView />
    </>
  );
}
