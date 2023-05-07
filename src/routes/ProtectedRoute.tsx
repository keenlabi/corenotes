import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import PageLoader from "src/components/Loaders/PageLoader";
import { useSetUserState } from "src/features/user/state";
import { useAuthStateValue } from "src/features/auth/state";
import { fetchUserProfile, fetchUserSuccessResponseType } from "src/features/user/actions";

export default function ProtectedRoute({children}:{children:JSX.Element}) {

    const authState = useAuthStateValue();
    
    const setUserState = useSetUserState();

    const navigate = useNavigate();

    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        fetchUserProfile()
        .then((data:fetchUserSuccessResponseType)=> {
            setUserState(state => {
                const user = data.data.user;
                
                return {
                    ...state,
                    details: {
                        id: user.id,
                        active: user.active,
                        role: user.role,
                        lastSeen: user.lastSeen,
                        personal: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            nickname: user.nickname,
                            initials: user.initials,
                            dob: user.dob,
                            gender: user.gender,
                            address: user.address,
                            city: user.city,
                            state: user.state,
                            zipCode: user.zipCode,
                            phoneNumber: {
                                work: user.phoneNumber.work,
                                cell: user.phoneNumber.cell,
                                other: user.phoneNumber.other
                            },
                            emergencyContact: {
                                name: user.emergencyContact.name,
                                relationship: user.emergencyContact.relationship,
                                phoneNumber: user.emergencyContact.phoneNumber
                            },
                            email: user.email,
                            profileImage: user.profileImage,
                        },
                        work: {
                            compartment: user.compartment,
                            title: user.title,
                            providerRole: user.providerRole,
                            hiredAt: user.hiredAt,
                            username: user.username,
                            employeeId: user.employeeId,
                            jobSchedule: user.jobSchedule,
                        }
                    }
                }
            })
        })
        .catch(()=> {
            navigate({ pathname:'/' })
        })
        .finally(()=> setIsLoading(false))

    }, [authState.isSignedIn, location.pathname, navigate, setUserState])


    if(isLoading) return <PageLoader />
    else return children
}