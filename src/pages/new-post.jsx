import { Helmet } from 'react-helmet-async';

import { NewPostView } from 'src/sections/post/new';

// ----------------------------------------------------------------------

export default function NewPostPage() {
  return (
    <>
      <Helmet>
        <title> NewPost | Lying Flat </title>
      </Helmet>

      <NewPostView />
    </>
  );
}
