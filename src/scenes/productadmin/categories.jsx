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

  const handleClick = () => {
    const categoryId = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    setRows((oldRows) => [...oldRows, {categoryId, categoryName: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [categoryId]: { mode: GridRowModes.Edit, fieldToFocus: 'categoryName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="primary" startIcon={<Add />} onClick={handleClick}>
        Add Category
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const Categoryadmin = () => {
  const [editCategory, setEditCategory] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    api.get("/api/Candy/categories").then((res) => {
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
    setRows(rows.filter((row) => row.categoryId !== id));
    //console.log(id);
    api.delete(`/api/Candy/categories/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    setEditCategory(false);

    const editedRow = rows.find((row) => row.categoryId === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.categoryId !== id));
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    if(editCategory === true) {
      console.log("row has been edited"); 
      api.put(`/api/Candy/categories/${newRow.categoryId}`, newRow).then((res) => {
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
    setRows(rows.map((row) => (row.categoryId === newRow.categoryId ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "categoryId", type: "number", headerName: "Id", },
    {
      field: "categoryName",
      headerName: "Category",
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
      <Header title="Categories" subtitle="Administration of categories" />
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
            getRowId={(row) => row.categoryId} 
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

export default Categoryadmin;
