import ImageComponent from "src/components/ImageComponent";
import styles from "./compartmentcard.module.css";
import capitalize from "src/utils/capitalize";

interface CompartmentCardProps {
    id:string;
    title:string;
    image:string,
    staffRolesCount:number,
    assignedIndividualsCount:number,
    backgroundColor:string,
    labelColor:string
}

export default function CompartmentCard({ 
    title, 
    image, 
    assignedIndividualsCount,
    backgroundColor,
    labelColor

}:CompartmentCardProps) {
    return (
        <div 
            className={styles.compartment_card}
            style={{ backgroundColor }}
        >

            <div className={styles.title} style={{ color: labelColor }} >{ capitalize(title) }</div>
            <div className={styles.count}>{ assignedIndividualsCount } individuals assigned</div>
            <ImageComponent 
                src={image}
                placeholder={image}
                height="100px"
                width="100px"
                extraStyles={styles.compartment_image}
            />
        </div>
    )
}