import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../axios/axios";
import {
	Avatar,
	Card,
	Checkbox,
	Grid,
	Icon,
	IconButton,
	Tooltip,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import "./style.css";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { productHeader } from "utils/constants";

function Products() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");

	const Product = ({ image, name }) => (
		<MDBox display='flex' alignItems='center' lineHeight={1}>
			<Avatar variant={"rounded"} src={image} name={name} size='sm' />
			<MDBox ml={2} lineHeight={1}>
				{name}
			</MDBox>
		</MDBox>
	);

	const handleStatusChange = async (item) => {
		const result = await axios
			.patch(`/products/${item._id}`, {
				status: !item.status,
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});

		if (result.data.success) {
			toast.success(result.data.message);
			getProducts();
		}
	};

	const handleFeatured = async (item) => {
		const result = await axios
			.patch(`/products/feature-product/${item._id}`, {
				featured: !item.featured,
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});

		if (result.data.success) {
			toast.success(result.data.message);
			getProducts();
		}
	};

	const getProducts = async () => {
		try {
			const result = await axios.get("/products");
			console.log(result);
			if (result.data.result) {
				const arr = [];
				result.data.result.map((item) => {
					arr.push({
						id: item._id,
						name: (
							<Product
								image={
									!item.images[0]
										? item.name[0]
										: `${process.env.REACT_APP_API_URL}/images?imageUrl=${item.images[0]}`
								}
								name={item.name}
							/>
						),
						description: item.description,
						price: (
							<>
								<p className='strikethrough'>
									${item.amount.toFixed(2)}
								</p>
								<strong style={{ color: "green" }}>
									$
									{item.discount.type === "percentage"
										? (
												item.amount -
												(item.amount *
													item.discount.discount) /
													100
										  ).toFixed(2)
										: (
												item.amount -
												item.discount.discount
										  ).toFixed(2)}
								</strong>
							</>
						),
						code: item.productCode,
						discount: (
							<>
								<span>
									{item.discount.type === "amount" && "$"}
								</span>
								<span>{item.discount.discount}</span>
								<span>
									{item.discount.type === "percentage" && "%"}
								</span>
							</>
						),
						image: `${process.env.REACT_APP_API_URL}/images?imageUrl=${item.images[0]}`,
						featured: (
							<Checkbox
								checked={item.featured}
								onChange={() => handleFeatured(item)}
							/>
						),
						status: (
							<Checkbox
								checked={item.status}
								onChange={() => handleStatusChange(item)}
							/>
						),
						actions: (
							<>
								<IconButton>
									<Tooltip title='Edit'>
										<Icon
											fontSize='medium'
											style={{
												// marginRight: "10px",
												cursor: "pointer",
												fontSize: "16px",
											}}>
											edit
										</Icon>
									</Tooltip>
								</IconButton>

								<IconButton>
									<Tooltip title='Delete'>
										<Icon
											fontSize='medium'
											style={{
												// cursor: "pointer",
												fontSize: "16px",
											}}>
											delete
										</Icon>
									</Tooltip>
								</IconButton>
							</>
						),
					});

					setProducts(arr);
				});
			}
		} catch (error) {
			console.error(error, "<<-- ERROR in get products");
			const { message } = error.response.data;
			toast.error(message);
		}
	};

	const handleSearch = (e) => {
		const { value } = e.target;
		setSearch(value);
	};

	useEffect(() => {
		getProducts();
	}, []);

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
									<MDTypography variant='h5' color='white'>
										Products
									</MDTypography>
									<MDBox
										pr={1}
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<input
											className='user-search'
											type='search'
											name='search'
											id='search'
											placeholder='Search products...'
											onChange={handleSearch}
										/>
									</MDBox>
								</div>
							</MDBox>

							<MDBox pt={3}>
								<DataTable
									table={{
										columns: productHeader,
										rows: products,
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
	);
}

export default Products;
