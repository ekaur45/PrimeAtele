import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../utils";

function Pickup(props) {
    const [e,setE] = useState(props.data);
    const onTickSubmit = async ee=>{
        var token = localStorage.getItem("token");
        var res = await axios.post(config.apiUrl+"admin/edit-pickup",{e},{headers:{ "Authorization": token }});
        props.getPickups();
    }
    return (<div className="col-lg-6 col-md-12 col-sm-12">
        <div className="card_">
            <div className="left">
                <div className="circle">
                </div>
                <div className="line">

                </div>
                <div className="circle">
                </div>
            </div>
            <div className="right">
                <label>Meal Taken </label>
                <div className="d-flex align-items-center">
                    {
                        e.Edit?<>
                                <input type={"number"} value={e.pickup} onChange={c=>{e.pickup=c.target.value;e.Edit=true;setE({...e})}} className={"form-control"} style={{height:"24px",border: "1px solid #f9f9f9"}}/> <button onClick={c=>{onTickSubmit(c);e.Edit = false;setE({...e})}} className="btn btn-sm"><i className="fas fa-check"></i></button>
                        </>:<>
                            <p className="w-140" >{e.pickup}</p> <i onClick={()=>{e.Edit=true;setE({...e})}} className="fas fa-pen"></i>
                        </>
                    }
                    
                    
                </div>
                <label>Time of Pickup </label>
                <div className="d-flex align-items-center">
                    {/* <p>10:00 AM | Monday June 23, 2023</p> */}
                    {
                        e.DateEdit?<>
                            <input type={"date-time"} 
                            className={"form-control"} style={{height:"24px",border: "1px solid #f9f9f9"}}
                            value={new Date(e.enrtydate)} />
                            <button onClick={c=>{
                                onTickSubmit(c);
                                e.DateEdit = false;
                                setE({...e})
                                }
                                } className="btn btn-sm"><i className="fas fa-check"></i></button>
                        </> : <>
                            <p>
                                {/* <time dateTime={new Date(e.enrtydate)}></time> */}
                                {e.enrtydate}
                                </p>
                            <i 
                            onClick={()=>{e.DateEdit=true;setE({...e})}}
                            className="fas fa-pen"></i>    
                        </>
                    }
                    
                </div>
            </div>
        </div>
    </div>)
}
export default Pickup;