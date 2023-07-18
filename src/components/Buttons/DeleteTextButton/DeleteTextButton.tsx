import PrimaryTextButton from "../PrimaryTextButton";

export default function DeleteTextButton({ 
    label,
    clickAction 
}:{ label:string, clickAction:()=> void }) {
    return (
        <PrimaryTextButton
            label={label}
            backgroundColor={"var(--red-accent-faded-100)"}
            labelColor={"var(--red-accent-100)"}
            clickAction={clickAction}
        />
    )
}