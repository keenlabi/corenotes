import GridList from "src/components/GridList/GridList"
import styles from "./compartmentslist.module.css"
import CompartmentCard from "./CompartmentCard/CompartmentCard";
import ServicesList from "../../Services/ServicesList/ServicesList";
import SizedBox from "src/components/SizedBox";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useEffect, useState } from "react";
import AddCompartmentModal from "../AddCompartmentModal";
import { useCompartmentState } from "src/features/compartment/state";
import { useFetchCompartmentList } from "src/features/compartment/selector";

export interface ICompartment {
    id:string;
    title:string;
    image:string,
    staffRolesCount:number,
    assignedIndividualsCount:number,
    bgColor:string,
    labelColor:string
}

export default function CompartmentsList() {

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const fetchCompartmentListReponse = useFetchCompartmentList(compartmentState.currentListPage);

    useEffect(()=> {
        setCompartmentState(state => ({
            ...state,
            compartmentsList: fetchCompartmentListReponse.list.compartments,
            currentListPage: fetchCompartmentListReponse.list.currentListPage,
            totalListPages: fetchCompartmentListReponse.list.totalListPages,
        }))
    }, [fetchCompartmentListReponse, setCompartmentState])
    

    const [createCompartmentModalVisibility, toggleCreateCompartmentModalVisibility] = useState(false)

    return (
        <div className={styles.compartments_list}>
            <div className={styles.heading}>
                <div className={styles.title}>All Compartments</div>

                <AddNewNoBackgroundIconButton 
                    label="Create compartment"   
                    action={()=> toggleCreateCompartmentModalVisibility(true)}
                />
            </div>

            <div className={styles.list}>
                {
                    compartmentState.compartmentsList.length
                    ?   <GridList columnCount={3}>
                            {
                                compartmentState.compartmentsList.map(compartment => {
                                    return  <CompartmentCard
                                                key={compartment.id}
                                                id={compartment.id}
                                                path={`${compartment.compartmentId}`}
                                                title={compartment.title}
                                                image={compartment.image}
                                                servicesCount={compartment.servicesCount}
                                                staffRolesCount={compartment.staffRolesCount}
                                                assignedIndividualsCount={compartment.assignedIndividualsCount}
                                                backgroundColor={compartment.meta.bgColor}
                                                labelColor={compartment.meta.labelColor}
                                            />
                                })
                            }
                        </GridList>
                    :   <div className={styles.empty_list_message}>There are no compartments to show</div>
                }
            </div>

            <SizedBox height="100px" />

            <ServicesList />

            {
                createCompartmentModalVisibility
                ?   <AddCompartmentModal 
                        close={()=> toggleCreateCompartmentModalVisibility(false)} 
                    />
                :   null
            }
        </div>
    )
}