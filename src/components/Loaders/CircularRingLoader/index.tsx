import genStyles from "../loader.module.css";
import styles from "./circularringloader.module.css";

export default function CircularRingLoader(props:{ color:string }) {
    return (
        <div className={`${styles.lds_ring} ${genStyles.lds_wrapper}`}>
            <div style={{color: props.color}}></div>
            <div style={{color: props.color}}></div>
            <div style={{color: props.color}}></div>
            <div style={{color: props.color}}></div>
        </div>
    );
}