import { useNavigate } from "react-router-dom";
import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function IndividualViewProfileButton({individualId}:{individualId:number}) {
    const navigate = useNavigate();

    return  <NoBackgroundButton 
                width="max-content"
                height="30px"
                fontSize="16px"
                label="View profile" 
                clickAction={()=> navigate({ pathname: `${individualId}` })}  
            />
}