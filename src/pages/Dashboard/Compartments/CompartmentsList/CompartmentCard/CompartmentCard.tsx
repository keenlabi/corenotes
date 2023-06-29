import ImageComponent from "src/components/ImageComponent";
import styles from "./compartmentcard.module.css";
import capitalize from "src/utils/capitalize";
import { Link } from "react-router-dom";

interface CompartmentCardProps {
    id:string;
    title:string;
    image:string,
    staffRolesCount:number,
    assignedIndividualsCount:number,
    backgroundColor:string,
    labelColor:string,
    path:string
}

export default function CompartmentCard({ 
    title, 
    image, 
    assignedIndividualsCount,
    backgroundColor,
    labelColor,
    path

}:CompartmentCardProps) {
    return (
        <Link 
            className={styles.compartment_card}
            style={{ backgroundColor }}
            to={`${path}/services/`}
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
        </Link>
    )
}