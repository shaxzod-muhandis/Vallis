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
export default function History() {
  const [rows, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [select, setSelect] = useState({
    select: "agent",
  });
  const [agentHis, setAgentHis] = useState([]);
  console.log(rows);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(select);
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSelect({ [name]: value });
    if (value !== "agent") return fetchData();
    return fetchAgentProducts();
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await instance.get(
        "/order/sell-order-list/?limit=1000&filter=delivered"
      );
      const { status, data } = res;
      if (status === 200) {
        const { sell_order_list } = data;
        setData(sell_order_list);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchAgentProducts = async () => {
    try {
      const res = await instance.get("/order/to-agent-sell-order/");
      setAgentHis(res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(agentHis);
  const columns = [
    { id: 1, label: "Klient nomi" },
    { id: 2, label: "Agent" },
    { id: 3, label: "Mahsulot" },
    { id: 4, label: "So'ralagan miqdor" },
    { id: 5, label: "Berilgan miqdor" },
    { id: 6, label: "Chiqish vaqti" },
    { id: 7, label: "Donasi narxi" },
    { id: 8, label: "Jami narx" },
  ];
  const columns2 = [
    { id: 2, label: "Agent" },
    { id: 3, label: "Mahsulot" },
    { id: 5, label: "Berilgan miqdor" },
    { id: 6, label: "Chiqish vaqti" },
  ];
  useEffect(() => {
    fetchData();
    fetchAgentProducts();
  }, []);
  return (
    <div>
      <div className="header">
        <h1>Maxsulot chiqishi tarixi</h1>
        <select name="select" onChange={handleSelect}>
          <option value="agent">Agentga</option>
          <option selected value="client">
            Клиент
          </option>
        </select>
      </div>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>T/P</TableCell>
            {select.select === "agent"
              ? columns2.map((item) => {
                  return <TableCell key={item.id}>{item.label}</TableCell>;
                })
              : columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {select.select === "client" ? (
            loading === false ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row);
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell key={row.id}>{row.client.name}</TableCell>
                        <TableCell key={row.id}>
                          {row.client.sale_agent.first_name}
                        </TableCell>
                        <TableCell key={row.id}>{row.product.name}</TableCell>
                        <TableCell key={row.id}>{row.quantity}</TableCell>
                        <TableCell key={row.id}>{row.given_quantity}</TableCell>
                        <TableCell key={row.id}>
                          {row.updated_date
                            .toString()
                            .slice(0, row.updated_date.indexOf("T"))}
                        </TableCell>
                        <TableCell key={row.id}>{row?.price?.price}</TableCell>
                        <TableCell key={row.id}>
                          {row?.given_quantity * row.price?.price}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )
          ) : loading === false ? (
            agentHis
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log(row);
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell key={row.id}>
                        {row.agent.first_name} {row.agent.last_name}
                      </TableCell>
                      <TableCell key={row.id}>{row.product.name}</TableCell>
                      <TableCell key={row.id}>{row.quantity}</TableCell>
                      <TableCell key={row.id}>
                        {row.created_date
                          .toString()
                          .slice(0, row.updated_date.indexOf("T"))}
                      </TableCell>
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
        rowsPerPageOptions={[5, 10, 25, 100]}
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
