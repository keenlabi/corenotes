import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton";
import styles from "./gobackbutton.module.css"
import { FaAngleLeft } from "react-icons/fa";

export default function GoBackButton({path}:{path:string}) {
    
    const navigate = useNavigate();

    return <IconButton
        extraStyle={styles.go_back_button}
        prefixIcon={<FaAngleLeft />}
        label={"Go back"}
        onClick={()=> navigate({ pathname: path })}
    />
}