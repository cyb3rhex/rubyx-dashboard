import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon } from "../icons";
import SectionTitle from "../components/Typography/SectionTitle";
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

function Files() {
  const [fileTreeData, setFileTreeData] = useState(null);
  const [openFolders, setOpenFolders] = useState([]);

  const toggleFolder = (folderPath) => {
    if (openFolders.includes(folderPath)) {
      setOpenFolders(openFolders.filter((path) => path !== folderPath));
    } else {
      setOpenFolders([...openFolders, folderPath]);
    }
  };

  useEffect(() => {
    setFileTreeData({
      name: "MyFiles",
      type: "folder",
      children: [
        {
          name: "Documents",
          type: "folder",
          children: [
            {
              name: "Resume.pdf",
              type: "file",
            },
            {
              name: "CoverLetter.doc",
              type: "file",
            },
          ],
        },
        {
          name: "Pictures",
          type: "folder",
          children: [
            {
              name: "Vacation",
              type: "folder",
              children: [
                {
                  name: "beach.jpg",
                  type: "file",
                },
                {
                  name: "mountain.jpg",
                  type: "file",
                },
                {
                  name: "Documents",
                  type: "folder",
                  children: [
                    {
                      name: "Resume.pdf",
                      type: "file",
                    },
                    {
                      name: "CoverLetter.doc",
                      type: "file",
                    },
                  ],
                },
              ],
            },
            {
              name: "Family",
              type: "folder",
              children: [
                {
                  name: "group.jpg",
                  type: "file",
                },
                {
                  name: "portrait.jpg",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    });
  }, [0]);

  const renderFileTree = (data, path = "") => {
    const stack = [...data.children];
    const rendered = [];

    while (stack.length > 0) {
      const item = stack.pop();
      const fullPath = `${path}/${item.name}`;
      const isOpen = openFolders.includes(fullPath);

      rendered.push(
        <li key={fullPath}>
          <div className="flex items-center">
            {item.type === "folder" && (
              <button
                className="mr-2 focus:outline-none"
                onClick={() => toggleFolder(fullPath)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-gray-500 hover:text-gray-800"
                  viewBox="0 0 20 20"
                >
                  {isOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 6h-5V1H8v5H3l7 7 7-7zM8 10h4v4H8v-4z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6 10H6.4L6 9.6V9H3v8h14V9h-3v.6l-.4.4zM16 7H4V4h12v3z"
                    />
                  )}
                </svg>
              </button>
            )}

            <span className="truncate">{item.name}</span>
          </div>

          {item.type === "folder" && isOpen && (
            <ul className="pl-4">
              {item.children.map((child) => {
                const childFullPath = `${fullPath}/${child.name}`;
                const isChildOpen = openFolders.includes(childFullPath);

                if (
                  child.type === "folder" &&
                  stack.every(
                    (item) =>
                      `${path}/${item.name}` !== childFullPath &&
                      `${fullPath}/${item.name}` !== childFullPath
                  )
                ) {
                  stack.push(child);
                }

                return (
                  <li key={childFullPath}>
                    <div className="flex items-center">
                      {child.type === "folder" && (
                        <button
                          className="mr-2 focus:outline-none"
                          onClick={() => toggleFolder(childFullPath)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 fill-current text-gray-500 hover:text-gray-800"
                            viewBox="0 0 20 20"
                          >
                            {isChildOpen ? (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17 6h-5V1H8v5H3l7 7 7-7zM8 10h4v4H8v-4z"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.6 10H6.4L6 9.6V9H3v8h14V9h-3v.6l-.4.4zM16 7H4V4h12v3z"
                              />
                            )}
                          </svg>
                        </button>
                      )}

                      <span className="truncate">{child.name}</span>
                    </div>

                    {child.type === "folder" && isChildOpen && (
                      <ul className="pl-4">
                        {child.children.map((subChild) => {
                          const subChildFullPath = `${childFullPath}/${subChild.name}`;

                          if (
                            subChild.type === "folder" &&
                            stack.every(
                              (item) =>
                                `${path}/${item.name}` !== subChildFullPath &&
                                `${childFullPath}/${item.name}` !==
                                  subChildFullPath
                            )
                          ) {
                            stack.push(subChild);
                          }

                          return (
                            <li key={subChildFullPath}>
                              <div className="flex items-center">
                                {subChild.type === "folder" && (
                                  <button
                                    className="mr-2 focus:outline-none"
                                    onClick={() =>
                                      toggleFolder(subChildFullPath)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 fill-current text-gray-500 hover:text-gray-800"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.6 10H6.4L6 9.6V9H3v8h14V9h-3v.6l-.4.4zM16 7H4V4h12v3z"
                                      />
                                    </svg>
                                  </button>
                                )}

                                <span className="truncate">
                                  {subChild.name}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    return rendered;
  };

  return (
    <div className="container mx-auto mt-4">
      {fileTreeData ? (
        <ul className="list-disc">{renderFileTree(fileTreeData)}</ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Files;
