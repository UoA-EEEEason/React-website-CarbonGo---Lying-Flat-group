import { useState } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'src/routes/hooks';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { truncateText } from 'src/utils/helps';

import { deleteTreeById } from 'src/firebase/products';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  avatarUrl,
  price,
  description,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('error');

  const showAlert = (message, severity = 'error') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const router = useRouter();
  const handleEdit = () => {
    router.push('/edit-product', { id: id });
  }

  const handleDelete = async () => {
    let deleted;
    deleted = await deleteTreeById(id);
    
    if (deleted) {
      showAlert('Delete successfully!', 'success');
      handleCloseMenu();
      router.reload();
    } else {
      showAlert('Failed to delete tree. Tree not found or an error occurred!', 'error');
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
        </TableCell>

        <TableCell>{price}</TableCell>

        <TableCell>{truncateText(description, 50)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  price: PropTypes.any,
  description: PropTypes.any,
  selected: PropTypes.any,
};
