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
import { toast } from "react-toastify";
import { ExpandMore } from "@mui/icons-material";

function DiscountForm({ discount, setOpen, view, getDiscounts }) {
    const [formData, setFormData] = useState({
        name: "",
        discount: "",
        type: "amount",
        global: "Yes",
        status: false,
        product: "",
    });
    const [products, setProducts] = useState([]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async () => {
        try {
            const bodyData = {
                name: formData.name,
                discount: formData.discount,
                type: formData.type,
                global: formData.global,
                status: formData.status,
            };

            if (formData.product) {
                bodyData.product = formData.product;
            }

            let url = "/discounts";

            if (discount._id) {
                url = `/discounts/${discount._id}`;
            }

            const data = await axios.post(url, bodyData);

            if (data.data.success) {
                toast.success(data.data.message);
                getDiscounts();
            }
        } catch (error) {
            console.error(error, "<<-- Error in add discount");
            toast.error("Failed to add discount");
        }

        setOpen(false);
    };

    const getProducts = async () => {
        const res = await axios.get(`/products`);
        setProducts(res.data.result);
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (discount) {
            setFormData({
                name: discount.name,
                discount: discount.discount,
                type: discount.type,
                global: discount.global ? "Yes" : "No",
                status: discount.status,
                product: discount.product?.name,
            });
        }
    }, [discount]);

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
                                    disabled={view}
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
                                    disabled={view}
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
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Type*
                                    </MDTypography>
                                    <Select
                                        disabled={view}
                                        id="type"
                                        IconComponent={() => (
                                            <ExpandMore className="dropdown-arrow" />
                                        )}
                                        defaultValue={"amount"}
                                        className="user-filter-for-edit"
                                        placeholder="Enter type"
                                        value={formData?.type}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                type: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value={"amount"}>
                                            Amount
                                        </MenuItem>
                                        <MenuItem value={"percentage"}>
                                            Percentage
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Global*
                                    </MDTypography>
                                    <Select
                                        disabled={view}
                                        id="global"
                                        IconComponent={() => (
                                            <ExpandMore className="dropdown-arrow" />
                                        )}
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
                                        disabled={view}
                                        // freeSolo
                                        id="product"
                                        // disableClearable
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === value.id
                                        }
                                        inputValue={formData.product}
                                        options={products.map((option) => ({
                                            label: option.name,
                                            id: option._id,
                                        }))}
                                        onChange={(e, value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                product: value.id,
                                            }))
                                        }
                                        autoSelect
                                        renderOption={(props, option) => {
                                            return (
                                                <li {...props} key={option.id}>
                                                    {option.label}
                                                </li>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                // value={"Test"}
                                                placeholder="Select a product"
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
                    {!view && (
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={handleFormSubmit}
                            >
                                {discount?._id
                                    ? "Update Discount"
                                    : "Add Discount"}
                            </MDButton>
                        </MDBox>
                    )}
                </MDBox>
            </MDBox>
        </div>
    );
}

export default DiscountForm;
