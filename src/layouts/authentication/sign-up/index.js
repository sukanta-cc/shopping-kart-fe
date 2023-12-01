/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import axios from "../../../axios/axios";

function Cover() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSignUp = async () => {
		try {
			const result = await axios.post("/auth/signup", formData);

			if (result.data.success) {
				navigate("/authentication/sign-in");
			}
		} catch (error) {
			console.error(error, "<<-- Error in user signup");
		}
	};

	return (
		<CoverLayout image={bgImage}>
			<Card>
				<MDBox
					variant='gradient'
					bgColor='info'
					borderRadius='lg'
					coloredShadow='success'
					mx={2}
					mt={-3}
					p={3}
					mb={1}
					textAlign='center'>
					<MDTypography
						variant='h4'
						fontWeight='medium'
						color='white'
						mt={1}>
						Join us today
					</MDTypography>
					<MDTypography
						display='block'
						variant='button'
						color='white'
						my={1}>
						Enter your email and password to register
					</MDTypography>
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component='form' role='form'>
						<MDBox mb={2}>
							<MDInput
								type='text'
								label='Name'
								name='name'
								variant='standard'
								fullWidth
								onChange={handleChange}
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type='email'
								label='Email'
								name='email'
								variant='standard'
								fullWidth
								onChange={handleChange}
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type='number'
								label='Phone Number'
								name='phone'
								variant='standard'
								fullWidth
								onChange={handleChange}
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								id='address'
								name='address'
								label='Address'
								variant='standard'
								onChange={handleChange}
								value={formData.address}
								style={{
									width: "100%",
								}}
								multiline
								rows={2}
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type='password'
								label='Password'
								name='password'
								variant='standard'
								fullWidth
								onChange={handleChange}
							/>
						</MDBox>
						<MDBox display='flex' alignItems='center' ml={-1}>
							<Checkbox />
							<MDTypography
								variant='button'
								fontWeight='regular'
								color='text'
								sx={{
									cursor: "pointer",
									userSelect: "none",
									ml: -1,
								}}>
								&nbsp;&nbsp;I agree the&nbsp;
							</MDTypography>
							<MDTypography
								component='a'
								href='#'
								variant='button'
								fontWeight='bold'
								color='info'
								textGradient>
								Terms and Conditions
							</MDTypography>
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant='gradient'
								color='info'
								fullWidth
								onClick={handleSignUp}>
								sign up
							</MDButton>
						</MDBox>
						<MDBox mt={3} mb={1} textAlign='center'>
							<MDTypography variant='button' color='text'>
								Already have an account?{" "}
								<MDTypography
									component={Link}
									to='/authentication/sign-in'
									variant='button'
									color='info'
									fontWeight='medium'
									textGradient>
									Sign In
								</MDTypography>
							</MDTypography>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
		</CoverLayout>
	);
}

export default Cover;
