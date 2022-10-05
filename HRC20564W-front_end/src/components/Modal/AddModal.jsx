import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";

import "./AddModal.css";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalForm: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  inputField: {
    "& label.Mui-focused": {
      margin: "0",
    },
    "& label": {
      margin: "-10px 0 0 0",
    },
  },
}));

export default function AddModal({
  addModalOpen,
  addModalHandler,
  refreshHandler,
  customerList,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    business_code: null,
    cust_number: null,
    clear_date: null,
    buisness_year: null,
    doc_id: null,
    posting_date: null,
    document_create_date: null,
    due_in_date: null,
    invoice_currency: null,
    document_type: null,
    posting_id: null,
    total_open_amount: null,
    baseline_create_date: null,
    cust_payment_terms: null,
    invoice_id: null,
  });

  useEffect(() => {
    handleOpen();
  }, [addModalOpen]);

  const handleOpen = () => {
    addModalHandler(true);
    setOpen(true);
  };

  const handleClose = () => {
    addModalHandler(false);
    setOpen(false);
  };

  const addData = () => {
    axios
      .get(
        `http://localhost:8080/hrc_backend/AddFunction?business_code=${formData.business_code}&cust_number=${formData.cust_number}&clear_date=${formData.clear_date}&buisness_year=${formData.buisness_year}&doc_id=${formData.doc_id}&posting_date=${formData.posting_date}&document_create_date=${formData.document_create_date}&due_in_date=${formData.due_in_date}&invoice_currency=${formData.invoice_currency}&document_type=${formData.document_type}&posting_id=${formData.posting_id}&total_open_amount=${formData.total_open_amount}&baseline_create_date=${formData.baseline_create_date}&cust_payment_terms=${formData.cust_payment_terms}&invoice_id=${formData.invoice_id}`
      )
      .then((res) => {
        console.log(res);
        handleClose();
        refreshHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const businessList = ["CA02", "U001", "U002", "U005", "U007", "U013"];
    if (!businessList.includes(formData.business_code)) {
      alert("Business Code is not in the list");
    } else if (!customerList.includes(formData.cust_number)) {
      alert("Customer Number is not in the list");
    } else {
      addData();
      return;
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={(classes.modal, "add-modal")}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{ backgroundColor: "#2a3e4c", borderRadius: "8px" }}
          >
            <h3>Add</h3>
            <form
              style={{
                width: "90vw",
              }}
              onSubmit={(e) => formSubmitHandler(e)}
              noValidate={false}
              autoComplete="off"
            >
              <div className="input_fields">
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Business Code"
                  variant="filled"
                  value={formData.business_code}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      business_code: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Customer Number"
                  variant="filled"
                  value={formData.cust_number}
                  type="number"
                  inputProps={{ min: 0, max: 2147483647 }}
                  onChange={(e) =>
                    setFormData({ ...formData, cust_number: e.target.value })
                  }
                />
                <TextField
                  required
                  className={classes.inputField}
                  type="date"
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Clear Date"
                  variant="filled"
                  value={formData.clear_date}
                  onChange={(e) =>
                    setFormData({ ...formData, clear_date: e.target.value })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Business Year"
                  variant="filled"
                  value={formData.buisness_year}
                  type="number"
                  inputProps={{ min: 0, max: 9999 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buisness_year: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Document Id"
                  variant="filled"
                  value={formData.doc_id}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) =>
                    setFormData({ ...formData, doc_id: e.target.value })
                  }
                />
                <TextField
                  required
                  className={classes.inputField}
                  type="date"
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Posting Date"
                  variant="filled"
                  value={formData.posting_date}
                  onChange={(e) =>
                    setFormData({ ...formData, posting_date: e.target.value })
                  }
                />
                <TextField
                  required
                  className={classes.inputField}
                  type="date"
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Document Create Date"
                  variant="filled"
                  value={formData.document_create_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      document_create_date: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  className={classes.inputField}
                  type="date"
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Due Date"
                  variant="filled"
                  value={formData.due_in_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_in_date: e.target.value })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Invoice Currency"
                  variant="filled"
                  value={formData.invoice_currency}
                  inputProps={{ maxLength: 5 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invoice_currency: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Document Type"
                  variant="filled"
                  value={formData.document_type}
                  inputProps={{ maxLength: 5 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      document_type: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Posting Id"
                  variant="filled"
                  value={formData.posting_id}
                  type="number"
                  inputProps={{ min: 0, max: 2147483647 }}
                  onChange={(e) =>
                    setFormData({ ...formData, posting_id: e.target.value })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Total Open Amount"
                  variant="filled"
                  value={formData.total_open_amount}
                  type="number"
                  inputProps={{ maxLength: 15 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      total_open_amount: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  className={classes.inputField}
                  type="date"
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Baseline Create Date"
                  variant="filled"
                  value={formData.baseline_create_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      baseline_create_date: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Customer Payment Terms"
                  variant="filled"
                  value={formData.cust_payment_terms}
                  inputProps={{ maxLength: 5 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cust_payment_terms: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 24%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Invoice Id"
                  variant="filled"
                  value={formData.invoice_id}
                  type="number"
                  inputProps={{ min: 0, max: 2147483647 }}
                  onChange={(e) =>
                    setFormData({ ...formData, invoice_id: e.target.value })
                  }
                />
              </div>
              <Button
                style={{
                  width: "49%",
                  margin: "1% 0.5% 0",
                  color: "#f0f0f0",
                  border: "1px solid #f0f0f0",
                }}
                type="submit"
              >
                ADD
              </Button>
              <Button
                style={{
                  width: "49%",
                  margin: "1% 0.5% 0",
                  color: "#f0f0f0",
                  border: "1px solid #f0f0f0",
                }}
                onClick={handleClose}
              >
                CANCEL
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
