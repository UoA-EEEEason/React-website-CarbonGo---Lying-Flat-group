import { Helmet } from 'react-helmet-async';

import { EditPostView } from 'src/sections/post/edit';

// ----------------------------------------------------------------------

export default function EditPostPage() {
  return (
    <>
      <Helmet>
        <title> EditPost | Lying Flat </title>
      </Helmet>

      <EditPostView />
    </>
  );
}
