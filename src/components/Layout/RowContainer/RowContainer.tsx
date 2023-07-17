import styles from "./rowcontainer.module.css"

export default function RowContainer({
    children, alignment
}:{children:JSX.Element[], alignment?:"top"|"center"|"bottom"}) {
    return  <div 
                className={`
                    ${styles.row_container}
                    ${  alignment === "top" 
                        ?   styles.align_top 
                        :   alignment === "center"
                            ?   styles.align_center
                            :   styles.align_bottom 
                    }
                `}
            > 
                { children } 
            </div>
}