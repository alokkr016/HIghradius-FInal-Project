import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";

import "./EditModal.css";
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

export default function EditModal({
  editModalOpen,
  editModalHandler,
  selectedItem,
  refreshHandler,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = useState({
    invoice_currency: null,
    cust_payment_terms: null,
  });

  useEffect(() => {
    handleOpen();
  }, [editModalOpen]);

  const handleOpen = () => {
    editModalHandler(true);
    setOpen(true);
  };

  const handleClose = () => {
    editModalHandler(false);
    setOpen(false);
  };

  const editData = () => {
    axios
      .get(
        `http://localhost:8080/hrc_backend/EditFunction?sl_no=${selectedItem}&invoice_currency=${editedData.invoice_currency}&cust_payment_terms=${editedData.cust_payment_terms}`
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
    editData();
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
            style={{
              backgroundColor: "#2a3e4c",
              borderRadius: "8px",
              width: "60%",
            }}
          >
            <h3>Edit</h3>
            <form
              style={{}}
              onSubmit={(e) => formSubmitHandler(e)}
              noValidate={false}
              autoComplete="off"
            >
              <div
                className="input_fields"
                style={{
                  margin: "20px 0px",
                }}
              >
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  id="outlined-required"
                  label="Invoice Currency"
                  variant="filled"
                  value={editedData.invoice_currency}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      invoice_currency: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Customer Payment Terms"
                  variant="filled"
                  value={editedData.cust_payment_terms}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      cust_payment_terms: e.target.value,
                    })
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
                EDIT
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
