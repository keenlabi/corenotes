import styles from "./roundediconbutton.module.css"

export default function RoundedIconButton({
    backgroundColor,
    color,
    size,
    icon,
    action
}:{backgroundColor?:string, color?:string, size?:{width:string, height:string}, icon:JSX.Element, action:()=>void}) {
    return(
        <button
            style={{
                backgroundColor:backgroundColor,
                color:color,
                width:size?.width,
                height:size?.height,
            }}
            className={styles.rounded_icon_button}
            onClick={()=> action()}
        >
            {icon}
        </button>
    )
}