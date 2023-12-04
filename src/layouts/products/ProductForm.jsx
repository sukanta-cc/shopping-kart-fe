import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDropzone } from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const ProductForm = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ status: "Active" });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setFormData({
      ...product,
      status: product.status ? "Active" : "Inactive",
      featured: product.featured ? "Yes" : "No",
    });
  }, [product]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Concatenate the new files with the existing ones
      const newFiles = [
        ...uploadedFiles,
        ...acceptedFiles.slice(0, 5 - uploadedFiles.length),
      ];
      setUploadedFiles(newFiles);

      // You can also upload the files to a server using axios or any other method
      // Replace 'your_upload_endpoint' with the actual server endpoint
      const formData = new FormData();
      newFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };
  const handleFeaturedChange = (e) => {
    setFormData({ ...formData, featured: e.target.value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value, "<<-- name, value");
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    console.log(formData, uploadedFiles, "<<-- name, uploadedFiles");
  };

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
                  <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop an image here, or click to select one</p>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4>Uploaded Images:</h4>
                      <div style={imagesContainerStyles}>
                        {uploadedFiles.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Uploaded ${index + 1}`}
                            style={imageStyles}
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <MDTypography variant="h6" color="dark">
                    Status*
                  </MDTypography>
                  <Select
                    id="status"
                    defaultValue={"Active"}
                    className="user-filter-for-edit"
                    placeholder="Enter status"
                    value={formData?.status}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>In-active</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <MDTypography variant="h6" color="dark">
                    Featured*
                  </MDTypography>
                  <Select
                    id="featured"
                    defaultValue={"Yes"}
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
              Update
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </div>
  );
};

export default ProductForm;
