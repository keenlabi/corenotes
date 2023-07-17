import { Outlet } from "react-router-dom";

export default function MedicationsOutlet() {
    return (
        <div style={{padding:"0 5%"}}>
            <Outlet />
        </div>
    )
}