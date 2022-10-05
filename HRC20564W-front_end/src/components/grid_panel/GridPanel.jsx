import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import "./GridPanel.css";
import AddModal from "../Modal/AddModal";
import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import AdvancedSearchModal from "../Modal/AdvancedSearchModal";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button, ButtonGroup, TextField } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sl_no",
    numeric: true,
    disablePadding: true,
    label: "sl_no",
  },
  {
    id: "business_code",
    numeric: true,
    disablePadding: false,
    label: "Business Code",
  },
  {
    id: "cust_number",
    numeric: true,
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "clear_date",
    numeric: true,
    disablePadding: false,
    label: "Clear Date",
  },
  {
    id: "buisness_year",
    numeric: true,
    disablePadding: false,
    label: "Business Year",
  },
  { id: "doc_id", numeric: true, disablePadding: false, label: "Document Id" },
  {
    id: "posting_date",
    numeric: true,
    disablePadding: false,
    label: "Posting Date",
  },
  {
    id: "document_create_date",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "due_in_date",
    numeric: true,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "invoice_currency",
    numeric: true,
    disablePadding: false,
    label: "Invoice Currency",
  },
  {
    id: "document_type",
    numeric: true,
    disablePadding: false,
    label: "Document Type",
  },
  {
    id: "posting_id",
    numeric: true,
    disablePadding: false,
    label: "Posting Id",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "baseline_create_date",
    numeric: true,
    disablePadding: false,
    label: "Baseline Create Date",
  },
  {
    id: "cust_payment_terms",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms",
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice Id",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(e) =>
              onSelectAllClick(e, numSelected > 0 && numSelected < rowCount)
            }
            inputProps={{ "aria-label": "select all desserts" }}
            style={{ color: "#f0f0f0" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "#f0f0f0" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#f0f0f0" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  className={classes.visuallyHidden}
                  style={{ color: "#f0f0f0" }}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Grid_Panel() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [maxPage, setMaxPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);
  const [customerList, setCustomerList] = React.useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [advancedSearchModalOpen, setAdvancedSearchModalOpen] = useState(false);

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [customerIdSearch, setCustomerIdSearch] = useState("");

  const addModalHandler = (newState) => {
    setAddModalOpen(newState);
  };

  const editModalHandler = (newState) => {
    setEditModalOpen(newState);
  };

  const deleteModalHandler = (newState) => {
    setDeleteModalOpen(newState);
  };

  const advancedSearchModalHandler = (newState) => {
    setAdvancedSearchModalOpen(newState);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event, indeterminate) => {
    if (indeterminate === true) {
      setSelected([]);
      return;
    }
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > maxPage) {
      setMaxPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setMaxPage(0);
  };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const SearchCustomerIdHandler = (e) => {
    e.preventDefault();
    SearchCustomerId();
  };

  const SearchCustomerId = () => {
    axios
      .get(
        `http://localhost:8080/hrc_backend/SearchFunction?cust_number=${customerIdSearch}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsAdvancedSearch(true);
        setTotalData(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = (maxPage, rowsPerPage, reset) => {
    axios
      .get(
        `http://localhost:8080/hrc_backend/FetchDataServlet?page=${
          maxPage + 1
        }&size=${rowsPerPage}`
      )
      .then((response) => {
        setTotalData(response.data.count);
        setCustomerList(response.data.cust_list);
        if (reset) {
          setData(response.data.data);
        } else {
          setData([...data, ...response.data.data]);
        }
      });
  };

  useEffect(() => {
    if (isAdvancedSearch) {
      return;
    }
    getData(maxPage, rowsPerPage, false);
  }, [maxPage]);

  useEffect(() => {
    if (isAdvancedSearch) {
      return;
    }
    getData(maxPage, rowsPerPage, true);
  }, [rowsPerPage]);

  const refreshHandler = () => {
    setData([]);
    setPage(0);
    setMaxPage(0);
    setRowsPerPage(5);
    setSelected([]);
    getData(maxPage, rowsPerPage, true);
  };

  return (
    <div
      style={{ backgroundColor: "#253b4a", height: "80vh" }}
      className={classes.root}
    >
      <div className="header-bottom">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          style={{ flex: "35%" }}
        >
          <ToggleButton
            value="left"
            aria-label="left aligned"
            style={{
              flex: "0 0 33.33%",
              backgroundColor: `${
                alignment === "left" ? "#14aff1" : "#253b4a"
              }`,
              height: "36.5px",
              border: "1px solid #14afe1",
              color: "#fff",
            }}
          >
            PREDICT
          </ToggleButton>
          <ToggleButton
            value="center"
            aria-label="centered"
            style={{
              flex: "0 0 33.33%",
              backgroundColor: `${
                alignment === "center" ? "#14aff1" : "#253b4a"
              }`,
              height: "36.5px",
              border: "1px solid #14afe1",
              color: "#fff",
            }}
          >
            ANALYTICS VIEW
          </ToggleButton>
          <ToggleButton
            value="right"
            aria-label="right aligned"
            style={{
              flex: "0 0 33.33%",
              backgroundColor: `${
                alignment === "right" ? "#14aff1" : "#253b4a"
              }`,
              height: "36.5px",
              border: "1px solid #14afe1",
              color: "#fff",
            }}
            onClick={() => {
              advancedSearchModalHandler(true);
            }}
          >
            ADVANCE SEARCH
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          style={{
            color: "#f0f0f0",
            border: "1px solid #14afe1",
            margin: "0 2rem",
          }}
          onClick={refreshHandler}
        >
          <RefreshIcon />
        </Button>
        <form onSubmit={SearchCustomerIdHandler}>
          <TextField
            id="outlined-basic"
            label="Search Customer Id"
            variant="filled"
            style={{
              backgroundColor: "#fff",
              borderRadius: "3px",
              flex: "15%",
            }}
            value={customerIdSearch}
            onChange={(e) => setCustomerIdSearch(e.target.value)}
          />
        </form>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          style={{
            flex: "40%",
            justifyContent: "flex-end",
            cursor: "no-drop",
          }}
        >
          <Button
            style={{
              flex: "0 0 30%",
              color: "#f0f0f0",
              border: "1px solid #14afe1",
            }}
            onClick={() => addModalHandler(true)}
          >
            ADD
          </Button>
          <Button
            style={{
              flex: "0 0 30%",
              color: "#f0f0f0",
              border: "1px solid #14afe1",
            }}
            onClick={() => editModalHandler(true)}
            disabled={selected.length !== 1}
          >
            EDIT
          </Button>
          <Button
            style={{
              flex: "0 0 30%",
              color: "#f0f0f0",
              border: "1px solid #14afe1",
            }}
            classes={{ disabled: classes.disabledButton }}
            onClick={() => deleteModalHandler(true)}
            disabled={selected.length === 0}
          >
            DELETE
          </Button>
        </ButtonGroup>
      </div>
      {addModalOpen ? (
        <AddModal
          addModalOpen={addModalOpen}
          addModalHandler={addModalHandler}
          refreshHandler={refreshHandler}
          customerList={customerList}
        />
      ) : null}

      {editModalOpen ? (
        <EditModal
          editModalOpen={editModalOpen}
          editModalHandler={editModalHandler}
          selectedItem={selected[0]}
          refreshHandler={refreshHandler}
        />
      ) : null}

      {deleteModalOpen ? (
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          deleteModalHandler={deleteModalHandler}
          selectedItems={selected}
          refreshHandler={refreshHandler}
        />
      ) : null}

      {advancedSearchModalOpen ? (
        <AdvancedSearchModal
          advancedSearchModalOpen={advancedSearchModalOpen}
          advancedSearchModalHandler={advancedSearchModalHandler}
          refreshHandler={refreshHandler}
          setData={setData}
          setIsAdvancedSearch={setIsAdvancedSearch}
          setTotalData={setTotalData}
        />
      ) : null}

      <Paper
        style={{ backgroundColor: "#253b4a", color: "#f0f0f0" }}
        className={classes.paper}
      >
        <TableContainer style={{ height: "64vh" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                      style={{ color: "#f0f0f0" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          style={{ color: "#f0f0f0" }}
                        />
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.sl_no}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.business_code}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.cust_number}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.clear_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.buisness_year}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.doc_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.posting_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.document_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.due_in_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.invoice_currency}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.document_type}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.posting_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.baseline_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#f0f0f0" }}>
                        {row.invoice_id}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalData}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ color: "#F0F0F0" }}
        />
      </Paper>
    </div>
  );
}
