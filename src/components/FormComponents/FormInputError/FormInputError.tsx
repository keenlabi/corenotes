import styles from "./forminputerror.module.css"
import { FaInfoCircle } from "react-icons/fa";

export default function FormInputError({message}:{message:string}) {

    return message
    ?   
        <div className={styles.error_container}>
            <FaInfoCircle />
            <div>{ message }</div>
        </div>
    :   null
    
}