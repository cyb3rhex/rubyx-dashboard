import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { createScan } from "../actions/scan";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Select,
} from "@windmill/react-ui";

function ScanComponent({ isOpen, setOpen, defaultDomain }) {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState(defaultDomain);
  const [subdomainCheck, setSubdomainCheck] = useState(false);
  const [screenShotCheck, setScreenShotCheck] = useState(false);
  const [portScanCheck, setPortScanCheck] = useState(false);
  const [directoryScanCheck, setDirectoryScanCheck] = useState(false);
  const [vulnerabilityScanCheck, setVulnerabilityScanCheck] = useState(false);
  const [nucleiSeverity, setNucleiSeverity] = useState("info");

  const handleCreateScan = () => {
    setOpen(false);

    let scan = {
      domain: domain,
      subdomain: subdomainCheck,
      screenshot: screenShotCheck,
      portScan: portScanCheck,
      directoryScan: directoryScanCheck,
      vulnerabilityScan: vulnerabilityScanCheck,
      nucleiSeverity: nucleiSeverity,
    };

    dispatch(createScan(scan));

    setDomain("");
    setSubdomainCheck(false);
    setScreenShotCheck(false);
    setPortScanCheck(false);
    setDirectoryScanCheck(false);
    setVulnerabilityScanCheck(false);
    setNucleiSeverity("info");
  };

  function closeModal() {
    setOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add a Scan</ModalHeader>
      <ModalBody>
        <div className="px-4 py-3">
          <Label>
            <span>Domain</span>
            <Input
              className="mt-1"
              type="text"
              value={domain}
              placeholder="Enter a domain"
              onChange={(e) => setDomain(e.target.value)}
            />
          </Label>
          <div className="py-3">
            <h2>Subdomains</h2>
            <div className="py-3">
              <Label check>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={subdomainCheck}
                  onChange={(e) => setSubdomainCheck(e.target.checked)}
                />
                <span className="ml-2">Scan subdomains</span>
              </Label>
            </div>
          </div>
          <div className="py-3">
            <h2>Enumeration</h2>
            <div className="py-3">
              <Label check>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={screenShotCheck}
                  onChange={(e) => setScreenShotCheck(e.target.checked)}
                />
                <span className="ml-2">Take screenshots</span>
              </Label>

            </div>
            <div className="py-3">
              <Label check>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={portScanCheck}
                  onChange={(e) => setPortScanCheck(e.target.checked)}
                />
                <span className="ml-2">Port scan</span>
              </Label>
            </div>
          
            <div className="py-3">
              <Label check>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={directoryScanCheck}
                  onChange={(e) => setDirectoryScanCheck(e.target.checked)}
                />
                <span className="ml-2">Directory scan</span>
              </Label>
            </div>

            <div className="py-3">
              <Label check>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={vulnerabilityScanCheck}
                  onChange={(e) => setVulnerabilityScanCheck(e.target.checked)}
                />
                <span className="ml-2">Vulnerability Scan</span>
              </Label>
            </div>

            {vulnerabilityScanCheck && (
              <div className="py-3">
                <Label>
                  <span>Nuclei Severity</span>
                  <Select
                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={nucleiSeverity}
                    onChange={(e) => setNucleiSeverity(e.target.value)}
                  >
                    <option value="info">Info</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </Select>
                </Label>
                </div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="w-full sm:w-auto" onClick={handleCreateScan}>
          Add Scan
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ScanComponent;
