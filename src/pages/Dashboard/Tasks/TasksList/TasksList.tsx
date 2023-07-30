import { useFetchTasksListSelector } from "src/features/task/selector";
import styles from "./taskslist.module.css";
import { useTaskState } from "src/features/task/state";
import { useEffect } from "react";
import TasksListHeader from "./TasksListHeader";
import TaskCard from "./TaskCard";
// import SizedBox from "src/components/SizedBox";

export default function TasksList() {
  const [taskState, setTaskState] = useTaskState();

  const fetchTasksListResponse = useFetchTasksListSelector(
    taskState.tasks.currentPage
  );

  useEffect(() => {
    setTaskState((state) => ({
      ...state,
      message: fetchTasksListResponse.message,
      error: fetchTasksListResponse.error,
      tasks: fetchTasksListResponse.tasks,
    }));
  }, [fetchTasksListResponse, setTaskState]);

  return (
    <div className={styles.tasks_list_page}>
      {/* <SizedBox height="50px" /> */}
      <TasksListHeader />
      {/* <SizedBox height="50px" /> */}
      <div className={styles.tasks_list}>
        {taskState.tasks.list.map((task) => {
          return (
            <TaskCard
              key={task.id}
              taskId={task.taskId}
              service={task.service.title}
              description={task.desc}
              individual={{
                firstname: task.individual.firstname,
                lastname: task.individual.lastname,
                profileImage: task.individual.profileImage,
              }}
              schedule={{
                startAt: task.schedule.startAt,
                endAt: task.schedule.endAt,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
