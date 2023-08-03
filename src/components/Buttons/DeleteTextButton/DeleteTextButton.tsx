import PrimaryTextButton from "../PrimaryTextButton";

export default function DeleteTextButton({ 
    label,
    width,
    clickAction 
}:{ label:string, width?:string, clickAction:()=> void }) {
    return (
        <PrimaryTextButton
            label={label}
            width={width}
            backgroundColor={"var(--red-accent-faded-100)"}
            labelColor={"var(--red-accent-100)"}
            clickAction={clickAction}
        />
    )
}