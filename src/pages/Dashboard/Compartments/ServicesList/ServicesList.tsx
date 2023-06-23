import { ServicesListItemType } from "src/features/service/types"
import ServicesListTable from "./ServicesListTable"
import styles from "./serviceslist.module.css"

export default function ServicesList() {

    const servicesList:ServicesListItemType[] = [
        {
            id:'1',
            title:'Shower / bath',
            individualsCount:10,
            dateCreated:'04/04/2023 01:00pm'
        }
    ]

    return (
        <div className={styles.services_list}>
            All Services

            <div className={styles.services_table}>
                <ServicesListTable 
                    services={servicesList}
                    currentPage={0} 
                    totalPages={0} 
                    errorMessage={""} 
                    goToPage={()=> null}                    
                />
            </div>
        </div>
    )
}