import styles from "./formheading.module.css"
import Heading1 from "../../Headings/Heading1";
import SubHeading1 from "../../Headings/SubHeading1";

interface formHeadingType {
    heading:string,
    subheading:string,
    align?:"center"|"left"|"right",
}

export default function FormHeading({
    heading, 
    subheading,
    align
}:formHeadingType) {
    return (
        <div className={styles.form_heading}>
            <Heading1 
                text={heading}
                align={align}
            />

            <SubHeading1 
                text={subheading}
                align={align}
            />
        </div>
    )
}