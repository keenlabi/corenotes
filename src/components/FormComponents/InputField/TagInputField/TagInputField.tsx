import { useState } from "react";
import InputField from "..";
import { formFieldType, setFormFieldType } from "../../FormWrapper/types";
import styles from "./taginputfield.module.css"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel.svg";

export default function TagInputField({
    label, placeholder, value, error, onTagAdded
}:{label:string, placeholder:string, value:Array<string>, error:string, onTagAdded:(tags:Array<string>)=> void}) {

    const [tags, setTags] = useState<Array<string>>(value ?? [])

    const [tagInputModel, setTagInputModel] = useState<formFieldType>({
        type: "text",
        value: "",
        label: label,
        placeholder: placeholder,
        error: error,
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model);
        setModel({...model})
    }

    function validateModel(updatedModel:formFieldType) {
        if(!updatedModel.value) {
            updatedModel.error = ``
            updatedModel.validated = false
            return
        }

        if(tags.includes(updatedModel.value)) {
            updatedModel.error = `${updatedModel.value} has previously been added`
            updatedModel.validated = false
            return
        }

        updatedModel.error = ''
        updatedModel.validated = true
        return
    }

    function addToTag() {
        validateModel(tagInputModel)
        setTagInputModel({...tagInputModel})
        if(tagInputModel.validated) {
            setTags(tags => ([tagInputModel.value, ...tags]))
        }
        onTagAdded([tagInputModel.value, ...tags])
    
    }

    function deleteTag(tagToRemove:string) {
        setTags([...tags.filter(tag => tag !== tagToRemove)])
    }

    return (
        <div>
            <InputField 
                type={tagInputModel.type}
                label={tagInputModel.label}
                value={tagInputModel.value}
                placeholder={tagInputModel.placeholder}
                error={tagInputModel.error}
                onEnterKeyPressed={()=> addToTag()}
                onInput={(value:string)=> setInput(value, tagInputModel, setTagInputModel)}
            />

            <div className={styles.tags}>
                {
                    tags.map(tag => (
                        <div key={tag} className={styles.tag} onClick={()=> deleteTag(tag)}>
                            <div className={styles.text}>{tag}</div>
                            <IconCancel />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}