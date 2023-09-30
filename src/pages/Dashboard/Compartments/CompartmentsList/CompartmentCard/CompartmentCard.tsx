import ImageComponent from "src/components/ImageComponent";
import styles from "./compartmentcard.module.css";
import capitalize from "src/utils/capitalize";
import { Link } from "react-router-dom";

interface CompartmentCardProps {
    id:string;
    title:string;
    image:string,
    subCompartmentsCount:number;
    backgroundColor:string,
    labelColor:string,
    path:string
}

export default function CompartmentCard({ 
    title, 
    image, 
    subCompartmentsCount,
    backgroundColor,
    labelColor,
    path

}:CompartmentCardProps) {
    return (
        <Link 
            className={styles.compartment_card}
            style={{ backgroundColor }}
            to={`${path}`}
        >

            <div className={styles.title} style={{ color: labelColor }} >{ capitalize(title) }</div>
            <div className={styles.count}>{ subCompartmentsCount } sub compartments</div>
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