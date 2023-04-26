import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createScan,
  getScans,
  deleteScan
} from "../actions/scan";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon } from "../icons";
import Input from "../components/Input";
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
} from "@windmill/react-ui";


function ScanPage() {
  const dispatch = useDispatch();
  const scanState = useSelector((state) => state.scan);
  const [command, setCommand] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    dispatch(getScans());
  }, []);

  const handleCreateScan = () => {
    setIsModalOpen(false);

    dispatch(createScan(command));

    setCommand("");
  };

  const handleDeleteScan = (id) => {
    dispatch(deleteScan(id));
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = scanState.scans ? scanState.scans.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    setDataTable(
      scanState.scans &&
        scanState.scans.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable, scanState]);

  return (
    <>
      <PageTitle>Scans</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={openModal}>Add a Scan</Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Command</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable &&
                  dataTable.map((scan, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{scan.command}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{scan.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{scan.start_time}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{scan.end_time}</span>
                  </TableCell>
                  <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeleteScan(scan.id)}
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
    )}

    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Add a Scan</ModalHeader>
      <ModalBody>
        <div className="px-4 py-3">
          <Label>
            <span>Command</span>
            <Input
              className="mt-1"
              type="text"
              value={command}
              placeholder="Enter a command"
              onChange={(e) => setCommand(e.target.value)}
            />
          </Label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          onClick={handleCreateScan}
        >
          Add Scan
        </Button>
      </ModalFooter>
    </Modal>
  </div>
</>
);
}

export default ScanPage;
