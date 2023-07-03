import { Outlet } from "react-router-dom";
import styles from "./administrationoutlet.module.css"

export default function AdministrationOutlet() {
    return  <div className={styles.administration_outlet}>
                <Outlet />
            </div>
}