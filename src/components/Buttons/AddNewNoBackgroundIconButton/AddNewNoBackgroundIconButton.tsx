import styles from "./addnewnobackgroundiconbutton.module.css"
import IconButton from "../IconButton";
import { ReactComponent as IconPlusCircle } from "src/assets/icons/icon-plus-circle.svg";

export default function AddNewNoBackgroundIconButton({
    label, 
    action
}:{label:string, action:()=> void}) {
    return (
        <IconButton
            extraStyle={styles.add_new_staff_button}
            prefixIcon={<IconPlusCircle />}
            label={label}
            onClick={()=> action()}
        />
    )
}