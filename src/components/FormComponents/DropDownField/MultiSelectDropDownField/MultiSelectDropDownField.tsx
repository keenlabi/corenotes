import styles from "./multiselectdropdownfield.module.css"
import { useEffect, useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";
import { FaAngleDown } from "react-icons/fa";
import FormLabel from "../../FormLabel";
import FormInputError from "../../FormInputError";
import { MultiSelectDropDownOption, MultiSelectDropDownProps } from "./types";
import filterObjectList from "src/utils/filterObjectList";
import RadioButton from "../../RadioButtonField/RadioButton";

export default function MultiSelectDropDownField({
    label,
    options,
    width,
    height,
    relative,
    error,
    placeholder,
    onSelect
}: MultiSelectDropDownProps) {

    const [localOptions, setLocalOptions] = useState(options.map((option, index:number) => ({ 
        id:index.toString(), 
        label: option, 
        value:option.toLowerCase().split(' ').join('-'),
        selected: false
    })))

    const [selectedOptions, setSelectedOptions] = useState<{label:Array<string>, value:Array<string>}>({
        label:[],
        value:[]
    })
    
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(()=> {
        if(selectedOptions.label.length) setSelected(true);
        else setSelected(false);
    }, [selectedOptions])

    const domNode = useClickOutside(()=> {
        setIsOpen(false);
    });

    const [isOpen, setIsOpen] = useState(false);

    function dropOptions() {
        if(options.length) {
            setIsOpen(true)
            setFilteredOptions(localOptions)
        }
    }

    const [searchKeyword, setSearchKeyword] = useState<string>('')
    
    const [filteredOptions, setFilteredOptions] = useState<MultiSelectDropDownOption[]>(localOptions);

    function filterOptions (filterTxt:string) {
        setSearchKeyword(filterTxt)
        const searchResults = filterObjectList(filterTxt, localOptions);
        setFilteredOptions(searchResults)
    }

    function selectOption(localOptionId:string) {
        const selectedOption:MultiSelectDropDownOption = localOptions.filter(localOption => localOption.id === localOptionId)[0];

        if(!localOptions[parseInt(localOptionId)].selected) {
            setSelectedOptions(state => ({
                label: [selectedOption.label, ...state.label],
                value: [selectedOption.value, ...state.value],
            }))
    
            localOptions[parseInt(localOptionId)].selected = true;
            setLocalOptions([...localOptions])

            onSelect([selectedOption.label, ...selectedOptions.label])

        } else {
            const newSelectedOptionLabels = selectedOptions.label.filter(label => label !== localOptions[parseInt(localOptionId)].label)
            const newSelectedOptionValues = selectedOptions.value.filter(value => value !== localOptions[parseInt(localOptionId)].value)

            setSelectedOptions({
                label: [...newSelectedOptionLabels],
                value: [...newSelectedOptionValues]
            })

            localOptions[parseInt(localOptionId)].selected = false;
            setLocalOptions([...localOptions])

            const labelIndexToRemove = selectedOptions.label.findIndex( label => label ===  localOptions[parseInt(localOptionId)].label)
            selectedOptions.label.splice(labelIndexToRemove, 1)
            onSelect(selectedOptions.label)
        }
    }

    return (
        <div style={{width}} className={`${styles.container}`} ref={domNode}>
            <FormLabel text={label ?? ""} />
            <div style={{height}} className={`
                    ${styles.display}
                    ${isOpen ?styles.is_open :null}
                    ${isOpen ?relative ?styles.bottom_offset :null :null}
                    ${error ?styles.field_error :null}
                    ${!options.length ?styles.disable_dropdown :null}
                `}
            >
                {
                    (isOpen)
                    ?   <div className={styles.search_bar_wrapper}>
                            <input
                                type={'text'}
                                placeholder={"Search by keyword"}
                                className={styles.search_bar}
                                onInput={(e:React.ChangeEvent<HTMLInputElement>)=> filterOptions(e.target.value)}
                            />
                        </div>
                    :   (selected)
                        ?   <div className={styles.selected_option} onClick={()=> dropOptions()}>
                                { selectedOptions.label.join(', ') }
                                <FaAngleDown />
                            </div>
                        :   <div className={styles.unselected} onClick={()=> dropOptions()}>
                                <div className={styles.placeholder}>{placeholder}</div>
                                <FaAngleDown />
                            </div>
                }

                {
                    (isOpen)
                    ?   
                        <div className={styles.options_container}>
                            {
                                (filteredOptions.length)
                                ?   <div className={styles.radio_options}>
                                        {
                                            filteredOptions.map((localOption, index:number)=> {
                                                return  <RadioButton
                                                            key={localOption.id}
                                                            selected={localOption.selected} 
                                                            label={localOption.label} 
                                                            onSelect={()=> selectOption(localOption.id)}
                                                        />
                                                
                                            })
                                        }
                                    </div>
                                :   
                                    <div
                                        className={styles.option}
                                        style={{color:"var(--grey-accent-600)"}}
                                        children={`No result matches the keyword '${searchKeyword}'`}
                                    />
                            }
                        </div>
                    :   null
                }
            </div>
            <FormInputError message={error} />
        </div>
    );
}