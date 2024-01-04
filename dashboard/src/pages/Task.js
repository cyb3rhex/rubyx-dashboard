import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask
} from "../actions/task";
import PageTitle from "../components/Typography/PageTitle";
import Task from "../components/TaskModal";
import { TrashIcon } from "../icons";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";
import ClipLoader from "react-spinners/ClipLoader";


function TaskPage() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = taskState.tasks ? taskState.tasks.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    setDataTable(
      taskState.tasks &&
        taskState.tasks.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, taskState]);

  return (
    <>
      <PageTitle>Tasks</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3 flex flex-col md:flex-row justify-center items-center justify-end space-x-4">
          <Button onClick={openModal}>Add</Button>
        </div>

        {taskState.loading && (
          <div className="flex justify-center items-center center">
            <ClipLoader color="#0f172a" loading={true} size={50} />
          </div>
        )}

        {totalResults > 0 ? (
          <TableContainer className={`mb-8 ${taskState.loading && 'hidden'}`}>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Domain</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((task, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{task.domain}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{task.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{task.start_time}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{task.end_time}</span>
                  </TableCell>
                  <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteTask(task.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChangeTable}
          />
        </TableFooter>
      </TableContainer>
    ) : (
      <div className="flex items-center justify-center">
        <span className="text-sm">No data to display</span>
      </div>
    )}

    <Task isOpen={isModalOpen} setOpen={setIsModalOpen} defaultDomain={""}/>
  </div>
</>
);
}

export default TaskPage;