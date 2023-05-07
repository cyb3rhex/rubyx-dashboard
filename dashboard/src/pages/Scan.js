import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getScans,
  deleteScan
} from "../actions/scan";
import PageTitle from "../components/Typography/PageTitle";
import Scan from "../components/ScanModal";
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


function ScanPage() {
  const dispatch = useDispatch();
  const scanState = useSelector((state) => state.scan);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    dispatch(getScans());
  }, []);

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
        <div className="py-3 flex items-center justify-end space-x-4">
          <Button onClick={openModal}>Add</Button>
        </div>

        {scanState.loading && (
          <div className="flex justify-center items-center center">
            <ClipLoader color="#0f172a" loading={true} size={50} />
          </div>
        )}

        {totalResults > 0 ? (
          <TableContainer className={`mb-8 ${scanState.loading && 'hidden'}`}>
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
                  dataTable.map((scan, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{scan.domain}</span>
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
    ) : (
      <div className="flex items-center justify-center">
        <span className="text-sm">No data to display</span>
      </div>
    )}

    <Scan isOpen={isModalOpen} setOpen={setIsModalOpen} defaultDomain={""}/>
  </div>
</>
);
}

export default ScanPage;
