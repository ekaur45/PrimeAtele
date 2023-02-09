import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import config from "../utils";
function CreateView(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onFormSubmit = e =>{
        e.preventDefault();
        if(password!=passwordR) return toastr.error("Passwords does not match");
        setIsLoading(true);
        axios({url:config.apiUrl+'account/create',method:"POST",data:{email:email,password:password}}).then(x=>{
            setIsLoading(false);
            if(x.data.status == 200){
                localStorage.setItem("token",x.data.data.token);
                navigate("/");
            }else{
                toastr.error(x.data.message)
            }
        })
    }
    return (
        <>
        <div className="App">
            <header className="header_">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="logo">
                                    <img src={require("../assets/img/PRIMEALETE-NOVI1_500x.png")} />
                                </div>
                                <div className="login">
                                    <NavLink to={`/login`}>
                                    <i className="fa fa-user mr-2" aria-hidden="true"></i>Login
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="SingUp">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="wrapper">
                                <h2>Create your account</h2>
                                <p>Welcome</p>
                                <form onSubmit={onFormSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
                                        value={email} onChange={e=>setEmail(e.target.value)}
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                        value={password} onChange={e=>{setPassword(e.target.value)}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password"
                                        value={passwordR} onChange={e=>{setPasswordR(e.target.value)}}
                                        
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Create account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}
export default CreateView;