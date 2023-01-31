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
    const candyId = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    setRows((oldRows) => [...oldRows, {candyId, candyName: '', candyDescription: '', candyPrice: '', candyCategoryId: '', candyImage: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [candyId]: { mode: GridRowModes.Edit, fieldToFocus: 'candyName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="primary" startIcon={<Add />} onClick={handleClick}>
        Add Candy
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const Productadmin = () => {
  const [editCandy, setEditCandy] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/api/Candy").then((res) => {
      setRows(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/Candy/categories").then((res) => {
      const recategorize = res.data.map((cat) => ({value: cat.categoryId, label: cat.categoryName}))
      setCategories(recategorize)
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
    setEditCandy(true);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.candyId !== id));
    //console.log(id);
    api.delete(`/api/Admin/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    setEditCandy(false);

    const editedRow = rows.find((row) => row.candyId === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.candyId !== id));
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    if(editCandy === true) {
      console.log("row has been edited"); 
      api.put(`/api/Admin/${newRow.candyId}`, newRow).then((res) => {
        console.log(res.data);
      });
      setEditCandy(false);
    }
    else {
      console.log("the row is new")
      api.post(`/api/Admin/create`, {candyName: newRow.candyName, candyDescription: newRow.candyDescription, candyPrice: newRow.candyPrice, candyCategoryId: newRow.candyCategoryId, candyImage: newRow.candyImage,}).then((res) => {
        console.log(res.data);
      });
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.candyId === newRow.candyId ? updatedRow : row)));
    return updatedRow;
  };

  //const categoryOptions: { value: Int; label: string }

  const columns = [
    { field: "candyId", type: "number", headerName: "Id", hide: true, },
    {
      field: "candyName",
      headerName: "Name",
      editable: true,
      flex: 1,
    },
    {
      field: "candyDescription",
      headerName: "Description",
      editable: true,
      flex: 2,
    },
    {
      field: "candyPrice",
      headerName: "Price",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Typography color={"#000000"}>${params.row.candyPrice}</Typography>
      ),
    },
    {
      field: "candyCategoryId",
      headerName: "Category",
      type: 'singleSelect',
        //valueOptions: [{label: 'Choklad', value: 1},{label: 'Gummies', value: 2},{label: 'Hard Candy', value: 3},{label: 'Lollipops', value: 4}],
        valueOptions: categories,
        // valueFormatter: ({ id: rowId, value, field, api }) => {
        //   const colDef = api.getColumn(field);
        //   const option = colDef.valueOptions.find(
        //     ({ value: optionValue }) => value === optionValue
        //   );
    
        //   return option.label;
        // },
      flex: 1,
      editable: true,
    },
    {
      field: "candyImage",
      headerName: "Imagename",
      flex: 1,
      editable: true,
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
      <Header title="Products" subtitle="List of Products" />
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
            getRowId={(row) => row.candyId} 
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

export default Productadmin;
