import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "../../../Axios";
import { toast } from "react-toastify";
import "../styles/index.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function data(props) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [action, setAction] = useState({
        type: "",
        id: "",
    });
    const getUsers = async () => {
        try {
            let url = "/users";

            if (props.search && props.status !== "all") {
                url += `?search=${props.search}&status=${props.status}`;
            } else if (props.search) {
                url += `?search=${props.search}`;
            } else if (props.status !== "all") {
                url += `?status=${props.status}`;
            }

            const result = await axios.get(url);

            if (result.data.success) {
                setUsers(result.data.users);
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            console.error(error, "<<-- error in user list fetch");
            toast.error(error?.response?.data.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, [props.search, props.status]);

    const Author = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                >
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );

    const handleClick = (action, user) => {
        if (action === "edit") {
            navigate(`/edit-user?userId=${user._id}`);
        } else {
            setAction({
                type: action,
                id: user._id,
            });
        }
    };

    const userData = users?.map((user) => {
        return {
            author: user.name,
            email: user.email,
            phone: user.phone ?? "--",
            createdAt: moment(user.createdAt).format("L"),
            status: user.status ? (
                <MDBox ml={-1}>
                    <MDBadge
                        badgeContent="Activated"
                        color="success"
                        variant="gradient"
                        size="sm"
                    />
                </MDBox>
            ) : (
                <MDBox ml={-1}>
                    <MDBadge
                        badgeContent="Deactivated"
                        color="dark"
                        variant="gradient"
                        size="sm"
                    />
                </MDBox>
            ),
            action: (
                <div className="actions">
                    <MDTypography
                        className="actions-text"
                        component="a"
                        href="#"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                        onClick={() => handleClick("edit", user)}
                    >
                        Edit
                    </MDTypography>

                    <MDTypography
                        className="actions-text"
                        component="a"
                        href="#"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                        onClick={() => handleClick("delete", user)}
                    >
                        Delete
                    </MDTypography>
                </div>
            ),
        };
    });

    return {
        columns: [
            { Header: "name", accessor: "author", align: "left" },
            { Header: "email", accessor: "email", align: "left" },
            { Header: "phone", accessor: "phone", align: "left" },
            { Header: "createdAt", accessor: "createdAt", align: "center" },
            { Header: "status", accessor: "status", align: "center" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: userData,
        action: action,
        setAction: setAction,
        getUsers,
    };
}
