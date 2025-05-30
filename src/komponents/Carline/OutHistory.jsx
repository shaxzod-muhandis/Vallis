import React, { useEffect, useState } from "react";
import instance from "../../baseUrl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import "./carline.css";

export default function OutHistory() {
  const [rows, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/report/warehouse-order-history/");
      const { status, data } = res;
      if (status === 200) {
        setData(data.warehouse_objects);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const columns = [
    { id: 1, label: "T/R"},
    { id: 2, label: "Mahsulot"},
    { id: 3, label: "Kategoriyasi",align: 'right' },
    { id: 4, label: "Miqdori",align: 'right' },
    { id: 5, label: "Taminotchi",align: 'right' },
    { id: 6, label: "Sana",align: 'right' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="header">Maxsulot kirishi tarixi</h1>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
              key={column.id}
              align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading === false ? (
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.product?.name}</TableCell>
                      <TableCell>{row?.product?.category?.name}</TableCell>
                      <TableCell>{row?.quantity}</TableCell>
                      <TableCell>{row?.product.provider?.name}</TableCell>
                      <TableCell>{row?.created_date.toString().slice(0, row.updated_date.indexOf("T"))}</TableCell>
                    </TableRow>
                  </>
                );
              })
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10,20, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
