import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import UserTableToolbar from '../user-table-toolbar';
import TableContainer from '@mui/material/TableContainer';
import UserTableHead from '../user-table-head';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';

import { useState } from 'react';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import UserTableRow from '../user-table-row';
import Scrollbar from 'src/components/scrollbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserView() {
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">User</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  // { id: 'password', label: 'Password' },
                  { id: 'tree_location', label: 'Tree location' },
                  { id: 'numOfCertificates', label: 'Number of certificates'},
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      email={row.email}
                      // password={row.password}
                      tree_location={row.tree_location}
                      numOfCertificates={row.numOfCertificates}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}
              </TableBody>
</Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
