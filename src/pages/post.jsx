import { Helmet } from 'react-helmet-async';

import { PostView } from 'src/sections/post/view';

// ----------------------------------------------------------------------

export default function PostPage() {
  return (
    <>
      <Helmet>
        <title> Post | Lying Flat </title>
      </Helmet>

      <PostView />
    </>
  );
}
