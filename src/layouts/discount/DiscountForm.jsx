import {
    Autocomplete,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "../../Axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";

function DiscountForm({ discount }) {
    const [formData, setFormData] = useState({});
    const [products, setProducts] = useState([]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value, "<<-- name and value");
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFormSubmit = async () => {
        console.log("Hello world!");
    };

    const getProducts = async () => {
        const res = await axios.get(`/products`);
        console.log(res.data, "<<-- res.data");
        setProducts(res.data.result);
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log(formData, "<<-- formData`");
    }, [formData]);

    return (
        <div>
            <MDBox pt={2} pb={2} px={2}>
                <MDBox component="form" role="form" onSubmit={handleFormSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Name*
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="name"
                                    value={formData?.name}
                                    // label='Name'
                                    name="name"
                                    placeholder="Name"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Discount*
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="discount"
                                    value={formData?.discount}
                                    // label='Email'
                                    name="discount"
                                    placeholder="Product Code"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Type*
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="type"
                                    value={formData?.type}
                                    placeholder="Type"
                                    // label='Phone Number'
                                    name="type"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Global*
                                    </MDTypography>
                                    <Select
                                        id="global"
                                        defaultValue={"Yes"}
                                        className="user-filter-for-edit"
                                        placeholder="Enter featured"
                                        value={formData?.global}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                global:
                                                    e.target.value === "Yes",
                                            }))
                                        }
                                    >
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Product Name
                                    </MDTypography>
                                    <Autocomplete
                                        // freeSolo
                                        id="free-solo-2-demo"
                                        disableClearable
                                        options={products.map((option) => ({
                                            label: option.name,
                                            id: option._id,
                                        }))}
                                        onChange={(e, value) =>
                                            console.log(
                                                JSON.stringify(
                                                    value,
                                                    null,
                                                    " "
                                                ),
                                                "<<-- value"
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: "search",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </MDBox>
                        </Grid>
                    </Grid>
                    <MDBox mt={4} mb={1}>
                        <MDButton
                            variant="gradient"
                            color="info"
                            fullWidth
                            onClick={handleFormSubmit}
                        >
                            {discount?._id ? "Update Discount" : "Add Discount"}
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
        </div>
    );
}

export default DiscountForm;
