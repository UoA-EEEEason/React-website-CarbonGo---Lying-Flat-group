import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }} ref={ref}>
      <Box
        component="img"
        src="/assets/logo.svg"
        sx={{ width: 40, height: 40, cursor: 'pointer' }}
      />
      <Typography variant="h6" sx={{ ml: 5, color: 'green' }}>Lying Flat</Typography>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
