import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createIp,
  deleteIp,
  getIps,
  updateIp,
} from "../actions/ip";
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
} from "@windmill/react-ui";
import Input from "../components/Input";
import { getPrograms } from "../actions/program";

function Ip() {
  const dispatch = useDispatch();
  const ipState = useSelector((state) => state.ip);
  const programState = useSelector((state) => state.program);
  const [ip, setIp] = useState("");
  const [program, setProgram] = useState();
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
    dispatch(getIps());
  }, []);

  const handleCreateIp = () => {
    setIsModalOpen(false);

    dispatch(
      createIp(parseInt(program), ip)
    );

    setIp("");
    setProgram(0);
  };

  const handleUpdateIp = () => {
    setIsModalOpen(false);
    setEditMode(false);

    dispatch(
      updateIp(
        parseInt(editId),
        parseInt(program),
        ip
      )
    );

    setIp("");
    setProgram(0);
    setEditId(0);
  };

  const handleDeleteIp = (id) => {
    dispatch(deleteIp(id));
  };

  const handleEditIp = (item) => {
    setIp(item.ip);
    setProgram(item.program_id);
    setEditId(item.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = ipState.ips ? ipState.ips.length : 0;

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
      ipState.ips &&
        ipState.ips.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, ipState]);

  return (
    <>
      <PageTitle>Ips</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add an Ip</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Ip</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{key.ip}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {getProgramName(key.program_id)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteIp(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditIp(key)}
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
          <ModalHeader>Add a Ip</ModalHeader>
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
              <span>Ip</span>
              <Input
                className="mt-1"
                placeholder=""
                value={ip}
                onChange={(e) => setIp(e.target.value)}
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
                <Button onClick={() => handleUpdateIp()}>Update</Button>
              ) : (
                <Button onClick={() => handleCreateIp()}>Add</Button>
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
                  onClick={() => handleUpdateIp()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  onClick={() => handleCreateIp()}
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

export default Ip;
