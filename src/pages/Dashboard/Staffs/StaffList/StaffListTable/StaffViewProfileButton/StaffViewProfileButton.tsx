import { useNavigate } from "react-router-dom";
import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function StaffViewProfileButton({id}:{id:string}) {
    const navigate = useNavigate();

    return  <NoBackgroundButton 
                width="100px"
                height="30px"
                fontSize="16px"
                label="View profile" 
                clickAction={()=> navigate({ pathname: id })}  
            />
}