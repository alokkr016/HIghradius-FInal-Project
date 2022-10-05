import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";

import "./AdvancedSearchModal.css";
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

export default function AdvancedSearchModal({
  advancedSearchModalOpen,
  advancedSearchModalHandler,
  refreshHandler,
  setData,
  setIsAdvancedSearch,
  setTotalData,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [searchData, setSearchData] = useState({
    doc_id: null,
    invoice_id: null,
    cust_number: null,
    buisness_year: null,
  });

  useEffect(() => {
    handleOpen();
  }, [advancedSearchModalOpen]);

  const handleOpen = () => {
    advancedSearchModalHandler(true);
    setOpen(true);
  };

  const handleClose = () => {
    advancedSearchModalHandler(false);
    setOpen(false);
  };

  const fetchSearchData = () => {
    axios
      .get(
        `http://localhost:8080/hrc_backend/AdvancedSearch?doc_id=${searchData.doc_id}&invoice_id=${searchData.invoice_id}&cust_number=${searchData.cust_number}&buisness_year=${searchData.buisness_year}`
      )
      .then((res) => {
        console.log(res.data);
        handleClose();
        // refreshHandler();
        setData(res.data);
        setIsAdvancedSearch(true);
        setTotalData(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetchSearchData();
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
            <h3>Advance Search</h3>
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
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  id="outlined-required"
                  label="Document ID"
                  variant="filled"
                  value={searchData.doc_id}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      doc_id: e.target.value,
                    })
                  }
                />
                <TextField
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Invoice ID"
                  variant="filled"
                  value={searchData.invoice_id}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      invoice_id: e.target.value,
                    })
                  }
                />
                <TextField
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Customer Number"
                  variant="filled"
                  value={searchData.cust_number}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      cust_number: e.target.value,
                    })
                  }
                />
                <TextField
                  style={{
                    margin: "0.5%",
                    flex: "0 0 49%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }}
                  label="Business Year"
                  variant="filled"
                  value={searchData.buisness_year}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      buisness_year: e.target.value,
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
                SEARCH
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
