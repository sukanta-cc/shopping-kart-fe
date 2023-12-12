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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function CouponForm({ coupon, setOpen, view }) {
    const [formData, setFormData] = useState({
        code: "",
        value: "",
        type: "amount",
        validFrom: null,
        validUntil: null,
        maxUses: "",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async () => {
        try {
            const bodyData = {
                code: formData.code,
                value: formData.value,
                type: formData.type,
                validFrom: formData.validFrom,
                validUntil: formData.validUntil,
                maxUses: formData.maxUses,
            };

            let url = "/coupons";

            if (coupon._id) {
                url = `/coupons/${coupon._id}`;
            }

            const data = await axios.post(url, bodyData);

            if (data.data.success) {
                toast.success(data.data.message);
            }
        } catch (error) {
            console.error(error, "<<-- Error in add discount");
            toast.error("Failed to add discount");
        }

        setOpen(false);
    };

    useEffect(() => {
        if (coupon) {
            setFormData({
                code: coupon.code,
                value: coupon.value,
                type: coupon.type,
                validFrom: dayjs(coupon.validFrom),
                validUntil: dayjs(coupon.validUntil),
                maxUses: coupon.maxUses,
            });
        }
    }, [coupon]);

    return (
        <div>
            <MDBox pt={2} pb={2} px={2}>
                <MDBox component="form" role="form" onSubmit={handleFormSubmit}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6" color="dark">
                                        Code*
                                    </MDTypography>
                                    <MDInput
                                        disabled={view}
                                        type="text"
                                        id="code"
                                        value={formData?.code}
                                        // label='Name'
                                        name="code"
                                        placeholder="Code"
                                        fullWidth
                                        onChange={handleFormChange}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={4}>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6" color="dark">
                                        Value*
                                    </MDTypography>
                                    <MDInput
                                        disabled={view}
                                        type="text"
                                        id="value"
                                        value={formData?.value}
                                        // label='Email'
                                        name="value"
                                        placeholder="Value"
                                        fullWidth
                                        onChange={handleFormChange}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <MDBox mb={2}>
                                    <FormControl fullWidth>
                                        <MDTypography variant="h6" color="dark">
                                            Valid from*
                                        </MDTypography>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker
                                                value={formData.validFrom}
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData,
                                                        validFrom:
                                                            newValue.$d?.toISOString(),
                                                    });
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </MDBox>
                            </Grid>
                            <Grid item xs={4}>
                                <MDBox mb={2}>
                                    <FormControl fullWidth>
                                        <MDTypography variant="h6" color="dark">
                                            Valid until*
                                        </MDTypography>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker
                                                value={formData.validUntil}
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData,
                                                        validUntil:
                                                            newValue.$d?.toISOString(),
                                                    });
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </MDBox>
                            </Grid>
                            <Grid item xs={4}>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6" color="dark">
                                        Max uses
                                    </MDTypography>
                                    <MDInput
                                        disabled={view}
                                        type="text"
                                        id="maxUses"
                                        value={formData?.maxUses}
                                        name="maxUses"
                                        placeholder="Max Uses"
                                        fullWidth
                                        onChange={handleFormChange}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid>
                    </form>
                    {!view && (
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={handleFormSubmit}
                            >
                                {coupon?._id ? "Update Coupon" : "Add coupon"}
                            </MDButton>
                        </MDBox>
                    )}
                </MDBox>
            </MDBox>
        </div>
    );
}

export default CouponForm;
