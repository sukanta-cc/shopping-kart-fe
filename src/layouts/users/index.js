import MDBox from "components/MDBox";
import axios from "../../axios/axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userTableData from "./data/usersTableData";
import DataTable from "examples/Tables/DataTable";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import "./styles/index.css";
import DeleteConfirmationModal from "components/DeleteModal/DeleteModal";

function Users() {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { columns, rows, action, setAction, getUsers } = userTableData({
    search,
    status,
  });

  useEffect(() => {
    if (action.type === "delete") {
      setOpen(true);
      setUserId(action.id);
    }
  }, [action]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUserDelete = async () => {
    try {
      let url = `/users/${userId}`;

      const result = await axios.delete(url);

      if (result.data.success) {
        toast.success(result.data.message);
        setOpen(false);
        setUserId("");
        getUsers();
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error(error, "<<-- error in user delete");
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <MDTypography variant="h5" color="white">
                    Users
                  </MDTypography>
                  <MDBox
                    pr={1}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MDBox pr={1}>
                      <FormControl fullWidth>
                        <Select
                          className="user-filter"
                          placeholder="Enter your age"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          // label='Age'
                          onChange={handleStatusChange}
                        >
                          <MenuItem value={"all"}>Select Status</MenuItem>
                          <MenuItem value={"true"}>Status - Activated</MenuItem>
                          <MenuItem value={"false"}>
                            Status - Deactivated
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    <input
                      className="user-search"
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search users by name/email/phone number"
                      onChange={handleSearch}
                    />
                  </MDBox>
                </div>
              </MDBox>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <DeleteConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setAction("");
        }}
        handleDelete={handleUserDelete}
      />
    </DashboardLayout>
  );
}

export default Users;
