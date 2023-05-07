import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePlatform,
  getPlatforms,
} from "../actions/platform";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon, EditIcon } from "../icons";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
} from "@windmill/react-ui";

import Add from "../components/Platform/Add";

function Platform() {
  const dispatch = useDispatch();
  const platformState = useSelector((state) => state.platform);

  const [currentPlatform, setCurrentPlatform] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  const handleAddPlatform = () => {
    setEditMode(false);
    setCurrentPlatform({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePlatform = (id) => {
    dispatch(deletePlatform(id));
  };

  const handleEditPlatform = (platform) => {
    setCurrentPlatform(platform);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageTitle>Bug Bounty Platforms</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3 flex items-center justify-end space-x-4">
          <Button onClick={handleAddPlatform}>Add</Button>
        </div>

        {platformState.loading && (
          <div className="flex items-center justify-center">
            <ClipLoader
              color={"#355dad"}
              loading={true}
              size={30}
              aria-label="Loading"
              data-testid="loader"
            />
          </div>
        )}

        {platformState.platforms && platformState.platforms.length > 0 ? (
          <TableContainer className={`mb-8 ${platformState.loading && 'hidden'}`}>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {platformState.platforms &&
                  platformState.platforms.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{key.name && key.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {key.hunter_username && key.hunter_username}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {key.type === "public" ? "Public" : "Private"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Delete">
                            <TrashIcon
                              onClick={() => handleDeletePlatform(key.id)}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Delete">
                            <EditIcon
                              onClick={() => handleEditPlatform(key)}
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
          </TableContainer>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm">No data to display</span>
          </div>
        )}
      </div>

      <Add
        seeModal={isModalOpen}
        setSeeModal={setIsModalOpen}
        closeModal={closeModal}
        editMode={editMode}
        setEditMode={setEditMode}
        currentPlatform={currentPlatform}
      />
    </>
  );
}

export default Platform;
