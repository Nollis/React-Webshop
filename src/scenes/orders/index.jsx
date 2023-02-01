import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Add from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import api from "../../http-common"
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const ItemOrders = () => {
  const [editCategory, setEditCategory] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    api.get("/api/Admin/itemorders").then((res) => {
      setRows(res.data);
    });
  }, []);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setEditCategory(true);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.itemOrderId !== id));
    //console.log(id);
    api.delete(`/api/Admin/deleteorders/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    setEditCategory(false);

    const editedRow = rows.find((row) => row.itemOrderId === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.itemOrderId !== id));
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    if(editCategory === true) {
      console.log("row has been edited"); 
      api.put(`/api/Admin/updateorders/${newRow.itemOrderId}`, newRow).then((res) => {
        console.log(res.data);
      });
      setEditCategory(false);
    }
    else {
      console.log("the row is new")
      api.post(`/api/Candy/createCategory/`, {categoryName: newRow.categoryName, categoryImage: 'temp',}).then((res) => {
        console.log(res.data);
      });
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.itemOrderId === newRow.itemOrderId ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "itemOrderId", type: "number", headerName: "Id", },
    {
      field: "candyName",
      headerName: "Candy",
      editable: true,
      flex: 1,
    },
    {
      field: "candyPrice",
      headerName: "Price",
      editable: true,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "cartId",
      headerName: "Cart Id",
      type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Item Orders" subtitle="Administration of item orders" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#FFFFFF",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--white)",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "var(--white2)",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "var(--white)",
          },
          "& .MuiCheckbox-root": {
            color: `${"#FFFFFF"} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} 
            getRowId={(row) => row.itemOrderId} 
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default ItemOrders;