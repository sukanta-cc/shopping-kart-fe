import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDropzone } from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    FormControl,
    Grid,
    Icon,
    IconButton,
    MenuItem,
    Select,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../Axios";
import { toast } from "react-toastify";

const dropzoneStyles = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
};

const imagesContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
};

const imageStyles = {
    maxWidth: "100%",
    maxHeight: "200px",
    marginTop: "20px",
};

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
};

const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
    justifyContent: "center",
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
};

const img = {
    display: "block",
    width: "auto",
    height: "100%",
};

const ProductForm = ({ product, getProducts, setOpen }) => {
    const [formData, setFormData] = useState({
        status: "Active",
        featured: "No",
    });
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        if (product._id) {
            product.images.map((item) =>
                setFiles((prev) => [
                    ...prev,
                    {
                        preview: `${process.env.REACT_APP_API_URL}/images?imageUrl=${item}`,
                    },
                ])
            );

            setFormData({
                ...product,
                status: product.status ? "Active" : "Inactive",
                featured: product.featured ? "Yes" : "No",
            });
        }
    }, [product]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles, "<<-- accepted files");
            let newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            const arr = [...files, ...newFiles];
            setUploadedFiles(newFiles);
            setFiles(arr);
        },
    });

    const handleStatusChange = (e) => {
        setFormData({ ...formData, status: e.target.value });
    };
    const handleFeaturedChange = (e) => {
        setFormData({ ...formData, featured: e.target.value });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        console.log(formData, "<<-- form data");
    });

    const handleFormSubmit = async () => {
        const data = new FormData();

        uploadedFiles.map((file) => {
            data.append("images", file);
        });

        data.append("imageUrls", formData.images);
        data.append("name", formData.name);
        data.append("productCode", formData.productCode);
        data.append("description", formData.description);
        data.append("amount", formData.amount);
        data.append("status", formData.status === "Active");
        data.append("featured", formData.featured === "Yes");

        let url = `/products`;

        if (product._id) {
            url = `/products/${product._id}`;
        }
        try {
            const result = await axios.post(url, data);

            if (result.data.success) {
                getProducts();
                setOpen(false);
                toast.success(result.data.message);
            }
        } catch (error) {
            console.error(error, "<<-- ERROR in Product add");
            toast.error(error.response.data.message);
        }
    };

    const handleRemoveImage = (idx) => {
        let arr = [...files];
        let arr2 = [...formData.images];
        arr.splice(idx, 1);
        if (!!arr2[idx]) {
            arr2.splice(idx, 1);
        }
        setFiles(arr);
        setFormData({ ...formData, images: arr2 });
    };

    const thumbs = files.map((file, idx) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
            <IconButton
                className="absolute top-0 right-0 h-1 w-1 bg-white rounded-none text-black"
                onClick={() => handleRemoveImage(idx)}
            >
                <Icon>close</Icon>
            </IconButton>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div>
            <MDBox pt={2} pb={2} px={2}>
                <MDBox component="form" role="form" onSubmit={handleFormSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Images*
                                </MDTypography>
                                <div>
                                    <div
                                        {...getRootProps()}
                                        style={dropzoneStyles}
                                    >
                                        <input
                                            {...getInputProps()}
                                            accept="images/*"
                                        />
                                        <p>
                                            Drag 'n' drop an image here, or
                                            click to select one
                                        </p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </div>
                            </MDBox>
                        </Grid>
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
                                    Product Code*
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="productCode"
                                    value={formData?.productCode}
                                    // label='Email'
                                    name="productCode"
                                    placeholder="Product Code"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Amount*
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="discount"
                                    value={formData?.amount}
                                    placeholder="Amount"
                                    // label='Phone Number'
                                    name="amount"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Discount <small>(optional)</small>
                                </MDTypography>
                                <MDInput
                                    type="text"
                                    id="discount"
                                    value={formData?.discount?.discount}
                                    placeholder="Discount"
                                    // label='Phone Number'
                                    name="discount"
                                    fullWidth
                                    onChange={handleFormChange}
                                />
                            </MDBox>
                        </Grid> */}
                        {/* <Grid item xs={6}>
                            <MDBox mb={2}>
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Status*
                                    </MDTypography>
                                    <Select
                                        id="status"
                                        // defaultValue={"Active"}
                                        className="user-filter-for-edit"
                                        placeholder="Enter status"
                                        value={formData?.status}
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value={"Active"}>
                                            Active
                                        </MenuItem>
                                        <MenuItem value={"Inactive"}>
                                            In-active
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </Grid> */}
                        <Grid item xs={6}>
                            <MDBox mb={2}>
                                <FormControl fullWidth>
                                    <MDTypography variant="h6" color="dark">
                                        Featured*
                                    </MDTypography>
                                    <Select
                                        id="featured"
                                        // defaultValue={"Yes"}
                                        className="user-filter-for-edit"
                                        placeholder="Enter featured"
                                        value={formData?.featured}
                                        onChange={handleFeaturedChange}
                                    >
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </Grid>
                        <Grid item xs={12}>
                            <MDBox mb={2}>
                                <MDTypography variant="h6" color="dark">
                                    Description*
                                </MDTypography>
                                <CKEditor
                                    data={formData?.description}
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        // console.log({ event, editor, data });
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                description: data,
                                            };
                                        });
                                    }}
                                />
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
                            {product?._id ? "Update" : "Add Product"}
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
        </div>
    );
};

export default ProductForm;
