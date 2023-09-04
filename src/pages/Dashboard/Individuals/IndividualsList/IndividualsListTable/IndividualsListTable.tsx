import Table from "src/components/Table";
import styles from "./individualslisttable.module.css";
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import UserImage from "src/components/ImageComponent/UserImage";
import { IndividualListItemType } from "src/features/Individual/types";
import IndividualViewProfileButton from "./IndividualViewProfileButton";

export default function IndividualsListTable({
  currentPage,
  totalPages,
  goToPage,
  individuals,
  errorMessage,
}: {
  individuals: IndividualListItemType[];
  currentPage: number;
  totalPages: number;
  errorMessage: string;
  goToPage: (pageNumber: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [tableBody, setTableBody] = useState<JSX.Element[][] | object[][]>([]);
  const tableHead = [
    "",
    "Name",
    "Age",
    "Gender",
    "Compartment",
    "Medicaid number",
    "",
  ];

  useEffect(() => {
    setIsLoading(true);

    sortByDate(individuals)
      .then((result) => {
        const newTransactions = formatTransactionsTable(result);
        setTableBody(newTransactions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [individuals]);

    function formatTransactionsTable (individuals:IndividualListItemType[]) {
        return individuals.map((individual)=> {
            return  [
                {
                    rowKey: individual.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 7
                },
                <div className={styles.user_image}>
                    <UserImage 
                        imageUrl={individual.profileImage} 
                        fullname={individual?.firstname}
                        size="50px"
                    />
                </div>,
                <div className={styles.fullname}>
                    <div className={styles.first_name}>{individual.firstname + ","}</div> 
                    <div className={styles.last_name}>{individual.lastname}</div> 
                </div>,
                <div className={styles.age}>
                    <span>{individual.age}</span>
                    <span>yrs</span>
                </div>,
                <div className={styles.gender}>{individual.gender}</div>,
                <div className={styles.compartment}>{individual.compartment}</div>,
                <div className={styles.compartment}>{individual.medicaidNumber}</div>,
                <div className={styles.button}>
                    <IndividualViewProfileButton 
                        individualId={individual.individualId} 
                    />
                </div>
            ]
        });
    }

  const paginateAction = (pageNumber: string | number) => {
    setIsLoading(true);
    goToPage(parseInt(pageNumber.toString()));
  };

  return (
    <div className={styles.staff_list_table}>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <Table
          head={tableHead}
          body={tableBody}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={(pageNumber: string | number) => paginateAction(pageNumber)}
          extraStyle={styles}
          emptyListMessage={errorMessage}
        />
      )}
    </div>
  );
}
