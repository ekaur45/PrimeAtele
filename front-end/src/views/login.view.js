import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Swal from "sweetalert2";
import toastr from "toastr";
function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [viewPassword,setViewPassword] = useState(false);
    const navigate = useNavigate();
    const onFormSubmit = e =>{
        setIsLoading(true);
        e.preventDefault();
        axios({url:'http://localhost:8000/api/account/login',method:"POST",data:{email:email,password:password}}).then(x=>{
            setIsLoading(false);
            if(x.data.status == 200){
                localStorage.setItem("token",x.data.data.token);
                localStorage.setItem("id",x.data.data.id);
                navigate("/");
            }else{
                //alert(x.data.message);
                toastr.error(x.data.message);
            }
        })
    }
    return (
        <>
            <header className="header_">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="logo">
                                    <img src={require("../assets/img/PRIMEALETE-NOVI1_500x.png")} />
                                </div>
                                <div className="login">
                                    <NavLink to={`/create`}>
                                        <i className="fa fa-user mr-2" aria-hidden="true"></i>Create Account
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
                                <h2>Login to your account</h2>
                                <p>Please enter details to login back to your account</p>
                                <form onSubmit={onFormSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            placeholder="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group" id="show_hide_password">
                                            <div className="input-group" id="show_hide_password">
                                                <input className="form-control" type={viewPassword?"text":"password"} placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }} />
                                                <div className="input-group-addon">
                                                    <a onClick={e=>setViewPassword(!viewPassword)} ><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <div className="check_ d-flex justify-content-between mb-2">
                                            <div className="">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Remember me</label>
                                            </div>
                                            <div>
                                                <NavLink to={`/forgot`}>Forget Password</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    {isLoading && <button type="submit" className="btn btn-primary" disabled>
                                        <span>Login in...</span>
                                    </button>}
                                    {!isLoading && <button type="submit" className="btn btn-primary">
                                        <span>Login</span>
                                    </button>}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginView;
