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


    const onCustomerAdd = async (e)=>{
        e.preventDefault();
        var token = localStorage.getItem("token");
        var result = await axios({ url: config.apiUrl+"admin/create-customer", method: "POST",data:{
            name,
            email,
            phone,
            note,
            todaysPickup,
            meals,
            id: Number(localStorage.getItem("id"))
        }, headers: { "Authorization": token } });
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
            <nav class="navbar navbar-expand-lg navbar-light bg-white p-0">
                <div class="container-fluid">

                    <header class="top">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="logo d-flex align-items-center">
                                            <label class="plus" id="sidebarToggle">+</label>
                                            <h2>Add a Customer</h2>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </nav>
            <div class="content pl-4 pr-4 pt-1">
                <section class="SingUp pt-0">
                    <div class="row justify-content-center">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="wrapper">
                                <form onSubmit={onCustomerAdd}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Customer Name"
                                        value={name} onChange={e=>{setName(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
                                          value={email} onChange={e=>{setEmail(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone no" 
                                        value={phone} onChange={e=>{setPhone(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Note"
                                        value={note} onChange={e=>{setNote(e.target.value)}}
                                        
                                        >

                                        </textarea>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Todays Pickup" 
                                        value={todaysPickup} onChange={e=>{setTodaysPickup(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="remaining meals" 
                                        value={meals} onChange={e=>{setMeals(e.target.value)}}
                                        
                                        />
                                    </div>

                                    <button type="submit" class="btn btn-primary">Add a Customer</button>
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