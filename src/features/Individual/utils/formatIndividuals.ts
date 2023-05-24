import calcAge from "src/utils/calcAge";
import { IndividualListItemResponseType } from "../action";
import { IndividualListItemType } from "../types";

export default function formatIndividuals(individuals:IndividualListItemResponseType[]):IndividualListItemType[] {

    if(!individuals.length) return([])

    return individuals.map(individual => ({
        id: individual.id,
        profileImage: individual.profileImage,
        firstName: individual.firstName,
        lastName: individual.lastName,
        age: calcAge(individual.dob),
        gender: individual.gender,
        medicaidNumber: individual.medicaidNumber,
        compartment: individual.compartment
    }))
}