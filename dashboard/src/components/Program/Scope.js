import React from "react";
import PageTitle from "../Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
} from "@windmill/react-ui";
import ClipLoader from "react-spinners/ClipLoader";
import { TbArrowBack } from "react-icons/tb";

function Scope({ setSeeScope, programState }) {

  return (
    <>
      <PageTitle>Scope</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-between">
          <div className="py-3 justify-start space-x-4">
            <Button className="bg-blue-900" onClick={() => setSeeScope(false)}>
              <TbArrowBack className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {programState.loadingScope ? (
          <div className="flex items-center justify-center">
            <ClipLoader
              color={"#355dad"}
              loading={true}
              size={30}
              aria-label="Loading"
              data-testid="loader"
            />
          </div>
        ) : (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Scope</TableCell>
                  <TableCell>Type</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {programState.scope &&
                  programState.scope.map((key, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{key.scope}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{key.scope_type}</span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default Scope;
