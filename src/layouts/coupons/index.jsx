import {
    Card,
    Checkbox,
    FormControl,
    Grid,
    Icon,
    IconButton,
    Select,
    Tooltip,
} from "@mui/material";
import axios from "../../Axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { couponHeader, discountHeader } from "utils/constants";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import DialogModel from "components/Dialog/Dialog";
import CouponForm from "./CouponForm";
import moment from "moment";

function CouponTable() {
    const [coupons, setCoupons] = useState([]);
    const [coupon, setCoupon] = useState({});
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);

    const getCoupon = async () => {
        try {
            const discounts = await axios.get("/coupons");

            if (discounts.data.success) {
                const arr = [];
                discounts.data.result.map((item) => {
                    arr.push({
                        id: item._id,
                        code: item.code,
                        value: item.value.toFixed(2),
                        type: item.type,
                        validFrom: item.validFrom
                            ? moment(item.validFrom).format("l")
                            : "--",
                        validUntil: item.validUntil
                            ? moment(item.validUntil).format("l")
                            : "--",
                        maxUse: item.maxUses ?? "No limit",
                        usedCount: item.usedCount ?? 0,
                        actions: (
                            <>
                                <IconButton
                                    onClick={() => {
                                        setCoupon(item);
                                        setOpen(true);
                                        setView(true);
                                    }}
                                >
                                    <Tooltip title="Edit" followCursor>
                                        <Icon
                                            fontSize="medium"
                                            style={{
                                                // marginRight: "10px",
                                                cursor: "pointer",
                                                fontSize: "16px",
                                            }}
                                        >
                                            visibility
                                        </Icon>
                                    </Tooltip>
                                </IconButton>

                                <IconButton
                                    onClick={() => {
                                        setCoupon(item);
                                        setOpen(true);
                                        setView(false);
                                    }}
                                >
                                    <Tooltip title="Edit" followCursor>
                                        <Icon
                                            fontSize="medium"
                                            style={{
                                                // marginRight: "10px",
                                                cursor: "pointer",
                                                fontSize: "16px",
                                            }}
                                        >
                                            edit
                                        </Icon>
                                    </Tooltip>
                                </IconButton>

                                <IconButton>
                                    <Tooltip title="Delete" followCursor>
                                        <Icon
                                            fontSize="medium"
                                            style={{
                                                // cursor: "pointer",
                                                fontSize: "16px",
                                            }}
                                        >
                                            delete
                                        </Icon>
                                    </Tooltip>
                                </IconButton>
                            </>
                        ),
                    });

                    setCoupons(arr);
                });
            }
        } catch (error) {
            console.error(error, "<<-- Error in getting discount");
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getCoupon();
    }, []);

    return (
        <div>
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
                                        <MDTypography
                                            variant="h5"
                                            color="white"
                                        >
                                            Discounts
                                        </MDTypography>

                                        <MDBox
                                            pr={1}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MDButton
                                                variant="gradient"
                                                color="light"
                                                fullWidth
                                                onClick={() => setOpen(true)}
                                            >
                                                <Icon>add</Icon>
                                                Add Coupon
                                            </MDButton>
                                        </MDBox>
                                    </div>
                                </MDBox>

                                <MDBox pt={3}>
                                    <DataTable
                                        table={{
                                            columns: couponHeader,
                                            rows: coupons,
                                        }}
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
                <DialogModel
                    title="Coupon"
                    open={open}
                    handleDialogClose={() => {
                        setCoupon({});
                        setOpen(false);
                    }}
                    description={
                        <CouponForm
                            coupon={coupon}
                            setOpen={setOpen}
                            view={view}
                            getCoupon={getCoupon}
                        />
                    }
                />
            </DashboardLayout>
        </div>
    );
}

export default CouponTable;
