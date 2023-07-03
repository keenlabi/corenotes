import IndividualProfileHeader from "../IndividualProfileHeader";
import IndividualServicesList from "./IndividualServicesList";
import styles from "./individualservices.module.css";

export default function IndividualServices() {
    return  <div className={styles.individual_services}> 
                <IndividualProfileHeader />

                <div className={styles.services_list}>
                    <IndividualServicesList />
                </div>
            </div>
}