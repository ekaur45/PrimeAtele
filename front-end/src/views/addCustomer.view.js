import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../utils";
import toastr from "toastr";
function AddCustomer() {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [note,setNote] = useState("");
    const [todaysPickup,setTodaysPickup] = useState("");
    const [meals,setMeals] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onCustomerAdd = async (e)=>{
        e.preventDefault();
        var token = localStorage.getItem("token");
        setIsLoading(true);
        var result = await axios({ url: config.apiUrl+"admin/create-customer", method: "POST",data:{
            
            name,
            email,
            phone,
            note,
            todaysPickup,
            meals,
            id: Number(localStorage.getItem("id"))
        }, headers: { "Authorization": token } });
        setIsLoading(false);
        if (result.data.status == 401) return navigate("/login");
        if (result.data.status == 200) {
            reset();
            toastr.success(result.data.message);
            //Swal.fire("Success",result.data.message,"success");
        } else {
            toastr.error(result.data.message);
            //Swal.fire("Error",result.data.message,"error");
        }
    }
    const reset = e =>{
        setName("");
            setEmail("");
            setPhone("");
            setNote("");
            setTodaysPickup("");
            setMeals("");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-0">
                <div className="container-fluid">

                    <header className="top">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="logo d-flex align-items-center">
                                            <label className="plus" id="sidebarToggle">+</label>
                                            <h2>Add a Customer</h2>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </nav>
            <div className="content pl-4 pr-4 pt-1">
                <section className="SingUp pt-0">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="wrapper">
                                <form onSubmit={onCustomerAdd}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Customer Name"
                                        value={name} onChange={e=>{setName(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
                                          value={email} onChange={e=>{setEmail(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone no" 
                                        value={phone} onChange={e=>{setPhone(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Note"
                                        value={note} onChange={e=>{setNote(e.target.value)}}
                                        
                                        >

                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Todays Pickup" 
                                        value={todaysPickup} onChange={e=>{setTodaysPickup(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="remaining meals" 
                                        value={meals} onChange={e=>{setMeals(e.target.value)}}
                                        
                                        />
                                    </div>
                                    {
                                        isLoading?<>
                                            <button type="button" disabled className="btn btn-primary">
                                                <i className="fa-spinner fas mr-1"></i>
                                                Adding Customer</button>
                                        </>:<>
                                            <button type="submit" className="btn btn-primary">Add a Customer</button>
                                        </>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default AddCustomer;