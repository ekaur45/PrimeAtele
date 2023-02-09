import { NavLink } from "react-router-dom";
import toastr from "toastr";
function ForgetView() {
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
                                    <NavLink to={`/login`}>
                                        <i className="fa fa-user mr-2" aria-hidden="true"></i>Login
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="SingUp">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <div class="wrapper">
                                <h2>Forget Password</h2>
                                <p>Please enter the code send to uxwireframes@mail.com</p>
                                <form>
                                    <div class="form-group">
                                        <div class="d-flex justify-content-center">
                                            <input type="email" id="reset_code" class="form-control password_reset_code" max="1" placeholder="" />
                                            <input type="email" id="reset_code" class="form-control password_reset_code" max="1" placeholder="" />
                                            <input type="email" id="reset_code" class="form-control password_reset_code" max="1" placeholder="" />
                                            <input type="email" id="reset_code" class="form-control password_reset_code" max="1" placeholder="" />
                                            <input type="email" id="reset_code" class="form-control password_reset_code" max="1" placeholder="" />
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit Code</button>
                                    <div class="code_resent mt-3 text-center">
                                        <a href="" target="_blank">Resend Code</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgetView;