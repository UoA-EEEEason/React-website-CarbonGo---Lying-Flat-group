import { Helmet } from 'react-helmet-async';

import { EditUserView } from 'src/sections/user/edit';

// ----------------------------------------------------------------------

export default function EditUserPage() {
  return (
    <>
      <Helmet>
        <title> EditUser | Lying Flat </title>
      </Helmet>

      <EditUserView />
    </>
  );
}
