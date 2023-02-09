import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../utils";
import toastr from "toastr";
function DashboardView() {
    const navigate = useNavigate();
    const [searchText,setSearchText] =useState("");
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const getData = async () => {
        var token = localStorage.getItem("token");
        var result = await axios({ url: config.apiUrl+"admin/all-customers", method: "GET", headers: { "Authorization": token } });
        if (result.data.status == 401) return navigate("/login");
        if (result.data.status == 200) {
            setOldData([...result.data.data]);
            setData(result.data.data);
        } else {
            toastr.error(result.data.message);
            //alert(result.data.message);
        }
    }
    function searchData(data, val){
        function find(data){
          if(data===val||data.toString && val.toString && data.toString().toLowerCase().includes(val.toString().toLowerCase()))return true;//you can modify the matching condition
          return data===Object(data) && Object.values(data).some(find);
        }
        return (Array.isArray(data)?data:Object.values(data)).filter(find);
      }
    useEffect(() => {
        var token = localStorage.getItem("token");
        if (!token) navigate("/login");
        else {
            setToken(token);
            getData();
        }
    }, []);
    const downloadExcel = async () => {
        setIsDownloading(true);
        var token = localStorage.getItem("token");
        var result = await axios({ url: config.apiUrl+"admin/export-customers", method: "GET", headers: { "Authorization": token } });
        setIsDownloading(false);
        if (result.data.status == 401) return navigate("/login");
        if (result.data.status == 200) {
            window.location.href = config.apiBase + result.data.data;
        } else {
            //Swal.fire("Error",result.data.message,"error");
            toastr.error(result.data.message);
        }
    }
    const onSearchChange = e => {
        let searchText = e.target.value;
        setSearchText(searchText);
        console.log("old",oldData);
        console.log("new",data);
        console.log("new",searchText);
        let old =[...oldData];
        
        if(searchText!=null&&searchText!=undefined&&searchText!=""){
            setData(searchData([...old],searchText));
        }
        else{
            setData(old);
        }
    }
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-0">
            <div className="container-fluid">

                <header className="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="logo d-flex align-items-center">
                                        <label className="plus" id="sidebarToggle">+</label>
                                        <h2>Dashboard</h2>
                                    </div>
                                    <div className="">
                                        {isDownloading && <a className="disabled"><i className="fa fa-user mr-2" aria-hidden="true"></i>Exporting Excel ...</a>}
                                        {!isDownloading && <a style={{ cursor: "pointer" }} onClick={downloadExcel}><i className="fa fa-user mr-2" aria-hidden="true"></i>Export Excel</a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </nav>
        <div className="content pl-4 pr-4 pt-1">
            <form>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control mb-3" placeholder="Search Customers" 
                    value={searchText}
                    onChange={onSearchChange}
                    />
                    <div className="custom_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Phone number
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Current Remaining Meals
                                    </th>
                                    <th>
                                        last Pickup
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.length > 0 && data.map((e, i) => {
                                        return <tr>
                                            <td> {e.id}</td>
                                            <td>{e.name}</td>
                                            <td> {e.phone}</td>
                                            <td> {e.email} </td>
                                            <td> {e.todaysPickup}</td>
                                            <td>{e.meals} meals grabbed</td>

                                            <td><NavLink to={`/edit-customer/${e.id}`} className="btn btn-outline-info">View Profile</NavLink>  </td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </>);
}
export default DashboardView;