
import ServicesListTable from "./ServicesListTable"
import styles from "./serviceslist.module.css"
import { useServicesState } from "src/features/service/state";
import { useEffect, useState } from "react";
import { useFetchServicesList } from "src/features/service/selector";
import AddServiceModal from "../AddServiceModal/AddServiceModal";

export default function ServicesList() {

    const [servicesState, setServicesState] = useServicesState();

    const fetchServicesListReponse = useFetchServicesList(servicesState.currentListPage);

    useEffect(()=> {
        setServicesState(state => ({
            ...state,
            status: fetchServicesListReponse.error ? 'FAILED' :'SUCCESS', 
            error: fetchServicesListReponse.error,
            message: fetchServicesListReponse.message,
            servicesList: fetchServicesListReponse.list.services,
            currentListPage: fetchServicesListReponse.list.currentListPage,
            totalListPages: fetchServicesListReponse.list.totalListPages,
        }))
    }, [fetchServicesListReponse, setServicesState])
    

    const [createServicesModalVisibility, toggleCreateServicesModalVisibility] = useState(false)

    return (
        <div className={styles.services_list}>
            All Services

            <div className={styles.services_table}>
                <ServicesListTable 
                    services={servicesState.servicesList}
                    currentPage={0} 
                    totalPages={0} 
                    errorMessage={""} 
                    goToPage={()=> null}                    
                />
            </div>

            {
                createServicesModalVisibility
                ?   <AddServiceModal 
                        close={()=> toggleCreateServicesModalVisibility(false)} 
                    />
                :   null
            }
        </div>
    )
}