import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        var token = localStorage.getItem("token");
        if (!token) navigate("/login");
    },[location])
    return (
        <>
            <div className="d-flex side_bar" id="wrapper">
                <div className="border-end bg-white" id="sidebar-wrapper">

                    <div className="sidebar-heading d-flex justify-content-center pt-4 pb-4">
                        <img src={require("../../assets/img/PRIMEALETE-NOVI1_500x.png")} />
                    </div>
                    <div className="list-group list-group-flush">
                        <NavLink to={`/`} className={({ isActive, isPending }) =>
                            isActive
                                ? "active list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                : isPending
                                    ? "pending list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                    : "list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                        }>
                            <div className="side_menu_icon_wrapper">
                                <i className="fas fa-th-large "></i>
                            </div>Dashboard
                        </NavLink>
                        <NavLink to={`/add-customer`} className={({ isActive, isPending }) =>
                            isActive
                                ? "active list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                : isPending
                                    ? "pending list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                    : "list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                        }>
                            <div className="side_menu_icon_wrapper">
                                <i className="fas fa-th-large "></i>
                            </div>Add Customers
                        </NavLink>
                        <NavLink to={`/logout`} className={({ isActive, isPending }) =>
                            isActive
                                ? "active list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                : isPending
                                    ? "pending list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                                    : "list-group-item list-group-item-action list-group-item-light pl-4 mt-2 mb-2 d-flex"
                        }>
                            <div className="side_menu_icon_wrapper">
                                <i className="fas fa-th-large "></i>
                            </div>Logout
                        </NavLink>
                       
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <Outlet />
                </div>
            </div>

        </>
    )
}
export default DashboardLayout;