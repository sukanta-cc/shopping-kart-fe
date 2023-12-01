import { Card, FormControl, Grid, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import axios from "axios";
import axios from "../../axios/axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const UserEdit = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [formData, setFormData] = useState({ status: "Active" });

	useEffect(() => {
		axios.get(`/users/${searchParams.get("userId")}`).then((res) => {
			setFormData({
				...formData,
				...res.data.result,
				status: res.data.result.status ? "Active" : "Inactive",
			});
		});
	}, []);

	const handleStatusChange = (e) => {
		setFormData({ ...formData, status: e.target.value });
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value, "<<-- name, value");
		setFormData({ ...formData, [name]: value });
	};

	const handleUpdateUser = async () => {
		try {
			console.log(formData, "<<-- formData");
			const result = await axios.put(
				`/users/${searchParams.get("userId")}`,
				formData
			);

			console.log(result, "<<-- result");
			if (result.data.success) {
				navigate("/users");
			}
		} catch (error) {
			console.error(error, "<<-- Error in user login");
		}
	};

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant='gradient'
								bgColor='info'
								borderRadius='lg'
								coloredShadow='info'>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<MDTypography variant='h6' color='white'>
										Edit User
									</MDTypography>
								</div>
							</MDBox>
							<MDBox pt={4} pb={3} px={3}>
								<MDBox
									component='form'
									role='form'
									onSubmit={handleUpdateUser}>
									<Grid container spacing={2}>
										<Grid item xs={6}>
											<MDBox mb={2}>
												<MDTypography
													variant='h6'
													color='dark'>
													Name*
												</MDTypography>
												<MDInput
													type='text'
													id='name'
													value={formData.name}
													// label='Name'
													name='name'
													placeholder='Name'
													fullWidth
													onChange={handleFormChange}
												/>
											</MDBox>
										</Grid>
										<Grid item xs={6}>
											<MDBox mb={2}>
												<MDTypography
													variant='h6'
													color='dark'>
													Email*
												</MDTypography>
												<MDInput
													type='email'
													id='email'
													value={formData.email}
													// label='Email'
													name='email'
													placeholder='Email'
													fullWidth
													onChange={handleFormChange}
												/>
											</MDBox>
										</Grid>
										<Grid item xs={6}>
											<MDBox mb={2}>
												<MDTypography
													variant='h6'
													color='dark'>
													Phone No*
												</MDTypography>
												<MDInput
													type='text'
													id='phone'
													value={formData.phone}
													placeholder='Phone Number'
													// label='Phone Number'
													name='phone'
													fullWidth
													onChange={handleFormChange}
												/>
											</MDBox>
										</Grid>
										<Grid item xs={6}>
											<MDBox mb={2}>
												<FormControl fullWidth>
													<MDTypography
														variant='h6'
														color='dark'>
														Status*
													</MDTypography>
													<Select
														id='status'
														defaultValue={"Active"}
														className='user-filter-for-edit'
														placeholder='Enter status'
														value={formData.status}
														onChange={
															handleStatusChange
														}>
														<MenuItem
															value={"Active"}>
															Active
														</MenuItem>
														<MenuItem
															value={"Inactive"}>
															In-active
														</MenuItem>
													</Select>
												</FormControl>
											</MDBox>
										</Grid>
										<Grid item xs={12}>
											<MDBox mb={2}>
												<MDTypography
													variant='h6'
													color='dark'>
													Address*
												</MDTypography>
												<MDInput
													id='address'
													name='address'
													onChange={handleFormChange}
													value={formData.address}
													placeholder='Address'
													style={{
														width: "100%",
													}}
													multiline
													rows={2}
												/>
											</MDBox>
										</Grid>
									</Grid>
									<MDBox mt={4} mb={1}>
										<MDButton
											variant='gradient'
											color='info'
											fullWidth
											onClick={handleUpdateUser}>
											Update
										</MDButton>
									</MDBox>
								</MDBox>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
		</DashboardLayout>
	);
};

export default UserEdit;
