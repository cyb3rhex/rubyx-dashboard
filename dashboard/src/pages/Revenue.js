import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRevenue,
  deleteRevenue,
  getRevenues,
  updateRevenue,
} from "../actions/revenue";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon, EditIcon } from "../icons";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Label,
  Select,
  Input,
} from "@windmill/react-ui";
import { getPrograms } from "../actions/program";

function Revenue() {
  const dispatch = useDispatch();
  const revenueState = useSelector((state) => state.revenue);
  const programState = useSelector((state) => state.program);
  const [money, setMoney] = useState(0);
  const [program, setProgram] = useState();
  const [vulnerability, setVulnerability] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setEditMode(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getRevenues());
  }, []);

  const handleCreateRevenue = () => {
    setIsModalOpen(false);

    dispatch(
      createRevenue(parseInt(program), parseInt(vulnerability), parseInt(money))
    );

    setMoney(0);
    setProgram(0);
    setVulnerability(0);
  };

  const handleUpdateRevenue = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(
      updateRevenue(
        parseInt(editId),
        parseInt(program),
        parseInt(vulnerability),
        parseInt(money)
      )
    );

    setMoney(0);
    setProgram(0);
    setVulnerability(0);
    setEditId(0);
  };

  const handleDeleteRevenue = (id) => {
    dispatch(deleteRevenue(id));
  };

  const handleEditRevenue = (revenue) => {
    setMoney(revenue.money);
    setProgram(revenue.program_id);
    setVulnerability(revenue.vulnerability_id);
    setEditId(revenue.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = revenueState.revenues ? revenueState.revenues.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const getProgramName = (id) => {
    if (programState && programState.programs) {
      var potential = programState.programs.find(
        (item) => item.id == parseInt(id)
      );
      if (potential) {
        return potential.name;
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    setDataTable(
      revenueState.revenues &&
        revenueState.revenues.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, revenueState]);

  return (
    <>
      <PageTitle>Revenue</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Revenue</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Money</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Vulnerability</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{key.money}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {getProgramName(key.program_id)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.vulnerability_id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteRevenue(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditRevenue(key)}
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
                onChange={onPageChangeTable}
                label="Navigation"
              />
            </TableFooter>
          </TableContainer>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add a Revenue</ModalHeader>
          <ModalBody>
            {programState && programState.programs && (
              <Label className="pt-5">
                <span>Program</span>
                <Select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="mt-1"
                >
                  <option value="">Select a Program</option>
                  {programState.programs.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </Label>
            )}
            <Label className="pt-5">
              <span>Money</span>
              <Input
                className="mt-1"
                placeholder=""
                value={money}
                onChange={(e) => setMoney(e.target.value)}
              />
            </Label>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              {editMode ? (
                <Button onClick={() => handleUpdateRevenue()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateRevenue()}>Add</Button>
              )}
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              {editMode ? (
                <Button
                  block
                  size="large"
                  onClick={() => handleUpdateRevenue()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreateRevenue()}
                >
                  Add
                </Button>
              )}
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Revenue;
