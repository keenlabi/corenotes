import styles from "./gridlist.module.css";

export default function GridList({
    columnCount,
    children
}:{columnCount:number, children: JSX.Element | JSX.Element[],}) {
    return (
        <div className={styles.grid_list} style={{gridTemplateColumns: `repeat(${columnCount}, 1fr)`}}>
            { children }
        </div>
    )
}