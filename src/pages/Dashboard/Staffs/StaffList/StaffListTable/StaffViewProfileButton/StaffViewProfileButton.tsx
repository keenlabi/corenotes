import { useNavigate } from "react-router-dom";
import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function StaffViewProfileButton({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <NoBackgroundButton
      width="max-content"
      height="30px"
      fontSize="14px"
      label="View profile"
      clickAction={() => navigate({ pathname: id })}
    />
  );
}
