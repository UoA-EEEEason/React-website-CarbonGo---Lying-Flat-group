import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'src/routes/hooks';

import Stack from '@mui/material/Stack';
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

import { fDateTime } from 'src/utils/format-time';
import { truncateText } from 'src/utils/helps';

import { deleteNewsById,deleteMessageById } from 'src/firebase/post';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  title,
  content,
  role,
  date,
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
    router.push('/edit-post', { id: id, Role: role });
  }

  const handleDelete = async () => {
    let deleted;
    if (role==='News') {
      deleted = await deleteNewsById(id);
    } else if (role==='Message') {
      deleted = await deleteMessageById(id);
    } else {
      showAlert('Failed to delete post. Post not found or an error occurred!', 'error');
    }
    
    if (deleted) {
      showAlert('Delete successfully!', 'success');
      handleCloseMenu();
      router.reload();
    } else {
      showAlert('Failed to delete post. Post not found or an error occurred!', 'error');
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
              {title}
            </Typography>
        </TableCell>

        <TableCell>{truncateText(content, 50)}</TableCell>

        <TableCell>
          <Label color={(role === 'News' && 'error') || 'success'}>{role}</Label>
        </TableCell>

        <TableCell>{fDateTime(date)}</TableCell>

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

      <Snackbar open={Boolean(alertMessage)} autoHideDuration={6000} onClose={handleCloseAlert} >
            <Alert severity={alertSeverity} onClose={handleCloseAlert}>
              {alertMessage}
            </Alert>
      </Snackbar>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  content: PropTypes.any,
  handleClick: PropTypes.func,
  title: PropTypes.any,
  role: PropTypes.any,
  date: PropTypes.any,
  selected: PropTypes.any,
};
