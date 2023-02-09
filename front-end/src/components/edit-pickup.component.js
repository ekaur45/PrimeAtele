import { useEffect, useState } from "react";

function EditPickup(props) {
    const [state,setState] = useState([props]);
    useEffect(()=>{
        console.log(props);
    });
    return (<>
    <input type={"number"} value={props.e.pickup} onChange={c => { props.e.pickup = c.target.value;setState({...state}) }}/><button>Submit</button></>
    )
}
export default EditPickup;