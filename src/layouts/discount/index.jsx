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
import { discountHeader } from "utils/constants";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function DiscountTable() {
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState([]);
    const [open, setOpen] = useState(false);

    const getDiscounts = async () => {
        try {
            const discounts = await axios.get("/discounts");
            console.log(discounts, "<<-- discounts");

            if (discounts.data.success) {
                const arr = [];
                discounts.data.result.map((item) => {
                    arr.push({
                        id: item._id,
                        name: item.name,
                        discount: item.discount,
                        type: item.type,
                        global: (
                            <Checkbox
                                readOnly
                                checked={item.global}
                                // onChange={() => handleStatusChange(item)}
                            />
                        ),
                        product: item.product?.name ? (
                            <Link to={`/product-details/${item.product._id}`}>
                                {item.product?.name}
                            </Link>
                        ) : (
                            "--"
                        ),
                        status: (
                            <Checkbox
                                checked={item.status}
                                // onChange={() => handleStatusChange(item)}
                            />
                        ),
                        actions: (
                            <>
                                <IconButton
                                    onClick={() => {
                                        setOpen(true);
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
                                        setOpen(true);
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

                    setDiscounts(arr);
                });
            }
        } catch (error) {
            console.error(error, "<<-- Error in getting discount");
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getDiscounts();
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
                                            Products
                                        </MDTypography>
                                    </div>
                                </MDBox>

                                <MDBox pt={3}>
                                    <DataTable
                                        table={{
                                            columns: discountHeader,
                                            rows: discounts,
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
            </DashboardLayout>
        </div>
    );
}

export default DiscountTable;
