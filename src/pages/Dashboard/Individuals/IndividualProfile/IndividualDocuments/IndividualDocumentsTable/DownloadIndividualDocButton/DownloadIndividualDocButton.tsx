import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function DownloadIndividualDocButton({fileName, fileLink}:{fileName: string,fileLink:string}) {

    return  <NoBackgroundButton 
                width="max-content"
                height="30px"
                fontSize="16px"
                label={fileName} 
                clickAction={()=> window.open(fileLink,'_blank', 'rel=noopener noreferrer')}  
            />
}