import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Add from "@mui/icons-material/Add";
import Upload from "rc-upload";
import http from "../../http-common";

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  //const [fileName, setFileName] = useState();
  const [candy, setCandy] = useState({
    CandyName: "",
    CandyDescription: "",
    CandyPrice: 1,
    CandyCategoryId: 1,
    CandyImage: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDescChange = (event) => {
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      CandyDescription: event.target.value,
    }));
  };

  const handleNameChange = (event) => {
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      CandyName: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      CandyPrice: event.target.value,
    }));
  };

  const handleCatChange = (event) => {
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      CandyCategoryId: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      //CandyImage: selectedFile,
      //CandyImage: event.target.value,
      //CandyImage: event.target.files[0].name,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = React.useState(null);

  const hanteraSubmit = async () => {
    fetch("https://localhost:7127//api/Candy/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candy),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0].name);
    setCandy((prevFormValues) => ({
      ...prevFormValues,
      CandyImage: selectedFile,
    }));
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    await http
      .post(`/api/Candy/create`, candy)
      .then((response) => {
        console.log("Funkade! " + response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        handleClose();
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Data: " + error.response.data);
          console.log("Status: " + error.response.status);
          console.log("Headers: " + error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("Request: ", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Message: " + error.message);
        }
        console.log("Config: ", error.config);
      });
  };

  // const props = {
  //   accept: ".png, .jpg",
  //   beforeUpload(file) {
  //     // Set file details
  //     setFileName(file.name);
  //   },
  //   onError(err) {
  //     console.log("onError", err);
  //   }
  // };

  return (
    <div>
      <Button variant="primary" startIcon={<Add />} onClick={handleClickOpen}>
        Add Candy
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Candy</DialogTitle>
        <DialogContent>
          <form onSubmit={hanteraSubmit} id="candyform" autoComplete="off">
            <DialogContentText>
              Add candy to the product list.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              name="CandyName"
              label="Candy Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleNameChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="CandyDescription"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleDescChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="CandyPrice"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handlePriceChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="CandyCategoryId"
              label="Category"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleCatChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="CandyImage"
              label="Image"
              type="file"
              fullWidth
              variant="standard"
              onChange={handleFileSelect}
            />
            {/* <Upload {...props}>
        <button id="upload-button" type="button" onClick={handleImageChange}>Upload File</button>
      </Upload> */}
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
