import { useEffect, useState } from "react";
import styles from "./toggleswitch.module.css";

export default function ToggleSwitch({ 
    initState,
    onToggle 
}:{ initState:boolean, onToggle:(switchState:boolean)=> void }) {

    const [isSwitchOn, setIsSwitchOn] = useState(initState ?? false);

    useEffect(()=> {
        setIsSwitchOn(initState);
    }, [initState])

    function handleClick() {
        setIsSwitchOn(!isSwitchOn)
        onToggle(!isSwitchOn)
    }

    return (
        <div className={styles.toggle_switch} onClick={handleClick}>
            <div className={`${styles.knob} ${isSwitchOn ?styles.active :null}`} />
        </div>
    )
}