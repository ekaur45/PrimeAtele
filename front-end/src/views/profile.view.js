import axios from "axios";
import Swal from "sweetalert2";
import config from "../utils";
import toastr from "toastr";
import Pickup from "../components/pickup/pickup.component";
const { useEffect, useState } = require("react");
const { useParams, useNavigate } = require("react-router-dom")

function ProfileView() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [pickups,setPickups] = useState([]);    
    const [num,setNum] = useState(0);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [note,setNote] = useState("");
    const [todaysPickup,setTodaysPickup] = useState("");
    const [meals,setMeals] = useState("");
    const getProfile = async ()=>{
        var token = localStorage.getItem("token");
        var res = await axios.get(config.apiUrl+"admin/get-customer?id="+id,{headers:{ "Authorization": token }})
        if(res.data.status == 200){
            var d = res.data.data;
            setName(d.name);
            setEmail(d.email);
            setPhone(d.phone);
            setNote(d.note);
            setTodaysPickup(d.todaysPickup);
            setMeals(d.meals);

        }

    }
    const getPickups = async e=>{
        var token = localStorage.getItem("token");
        var res = await axios.get(config.apiUrl+"admin/get-pickups?cid="+id,{headers:{ "Authorization": token }})
        if(res.data.status == 200){
            setPickups(res.data.data);
        }
    }
    const onMakeEntry = async e =>{
        var token = localStorage.getItem("token");
        var res = await axios.get(config.apiUrl+"admin/create-pickup?cid="+id+"&num="+num,{headers:{ "Authorization": token }});
        getPickups();
    }
    const onEditFormSubmit = async e =>{
        e.preventDefault();
        var token = localStorage.getItem("token");
        var result = await axios({ url: config.apiUrl+"admin/edit-customer", method: "POST",data:{
            id,
            name,
            email,
            phone,
            note,
            todaysPickup,
            meals
        }, headers: { "Authorization": token } });
        if (result.data.status == 401) return navigate("/login");
        if (result.data.status == 200) {
            getProfile();
            toastr.success(result.data.message);
            //Swal.fire("Success",result.data.message,"success");
        } else {
            toastr.error(result.data.message);
            //Swal.fire("Error",result.data.message,"error");
        }
    }
    useEffect(()=>{
        getProfile();
        getPickups();
    },[]);
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
                                            <h2>Edit Customer</h2>
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
                                <form onSubmit={onEditFormSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Customer Name" 
                                        value={name}
                                        onChange={e=>setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone no" 
                                        value={phone}
                                        onChange={e=>setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Notes"
                                        value={note}
                                        onChange={e=>setNote(e.target.value)}
                                        >

                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Todays Pickup" 
                                        value={todaysPickup}
                                        onChange={e=>setTodaysPickup(e.target.value)}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="remaining meals"
                                        value={meals}
                                        onChange={e=>setMeals(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Save Changes</button>

                                </form>
                                <div className="make_Entry">
                                    <input type={"text"} className={"form-control"} placeholder={"Todays Pickup"}
                                    value={num}
                                    onChange={e=>setNum(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary" onClick={onMakeEntry}>Make Entry</button>
                                </div>
                                <div className="previous_pickups">
                                    <label>
                                        Previous Pickups
                                    </label>
                                    <div className="row">
                                       {
                                        pickups&&pickups.length>0&&pickups.map((e,i)=>{
                                            return(
                                               <Pickup getPickups={getPickups} key={i} data={e}/>
                                            )
                                        })
                                       }
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ProfileView;