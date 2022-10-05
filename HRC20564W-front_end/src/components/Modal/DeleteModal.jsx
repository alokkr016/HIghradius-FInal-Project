import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

import "./DeleteModal.css";
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
    },
  },
}));

export default function DeleteModal({
  deleteModalOpen,
  deleteModalHandler,
  selectedItems,
  refreshHandler,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(deleteModalOpen);

  useEffect(() => {
    handleOpen();
  }, [deleteModalOpen]);

  const handleOpen = () => {
    deleteModalHandler(true);
    setOpen(true);
  };

  const handleClose = () => {
    deleteModalHandler(false);
    setOpen(false);
  };

  const url = selectedItems.map((item) => item).join(",");

  const deleteData = () => {
    axios
      .get(`http://localhost:8080/hrc_backend/DeleteFunction?sl_no=${url}`)
      .then((res) => {
        console.log(res);
        handleClose();
        refreshHandler();
      })
      .catch((err) => {
        console.log(err);
      });
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
              color: "white",
            }}
          >
            <form
              style={{
                width: "100%",
                padding: "10px 5px",
              }}
              noValidate
              autoComplete="off"
            >
              <p style={{ padding: "15px 5px 0px", fontSize: "20px" }}>
                Delete Records ?
              </p>
              <p style={{ padding: "15px 5px", fontSize: "18px" }}>
                Are you sure you want to delete these record[s]?
              </p>
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
              <Button
                style={{
                  width: "49%",
                  margin: "1% 0.5% 0",
                  color: "#f0f0f0",
                  border: "1px solid #f0f0f0",
                }}
                onClick={deleteData}
              >
                DELETE
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
