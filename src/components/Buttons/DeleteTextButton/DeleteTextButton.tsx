import PrimaryTextButton from "../PrimaryTextButton";

export default function DeleteTextButton({ 
    label,
    width,
    isLoading,
    clickAction,
}:{ label:string, width?:string, isLoading?:boolean, clickAction:()=> void }) {
    return (
        <PrimaryTextButton
            label={label}
            width={width}
            isLoading={isLoading}
            backgroundColor={"var(--red-accent-faded-100)"}
            labelColor={"var(--red-accent-100)"}
            clickAction={clickAction}
        />
    )
}