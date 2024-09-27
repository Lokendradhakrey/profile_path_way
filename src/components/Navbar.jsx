import React, { useContext, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoImage from "../assets/images/logo-profile-path-way.png";
import "../assets/css/navbar.css";
import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { AuthContext } from "../configs/security/AuthContext";
import ApiClient from "../configs/apis/ApiClient";

const navigation = [{ name: "Home", to: `/`,current: "true" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { authenticated, profilename, userId } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // Update postCreated to use FormData for multipart/form-data request
  const postCreated = async (content, file) => {
    try {
      const formData = new FormData(); // Create a new FormData object

      const contentJson = JSON.stringify({
        content: content,
      });

      formData.append("content", contentJson);
      formData.append("file", file); // Append file

      // Making API request with FormData
      const response = await ApiClient.post(
        `/profile-path-way/v1/post/create-post/user/${userId}`,
        formData
      );
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };

  // Handle form submit and call postCreated with content and file
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postCreated(content, file);

      if (response.status === 200 || response.status === 201) {
        console.log("Post created successfully");
        setIsOpen(false); // Close the modal
        setContent(""); // Reset content
        setFile(null); // Reset image
      } else {
        console.error("Failed to create post:", response.data);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 sticky top-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img alt="Logo" src={logoImage} className="h-8 w-auto" />
              </div>
              <div className="ms-auto hidden sm:ml-6 sm:block">
                <div className="flex space-x-3">
                  <div className="flex space-x-3">
                    {authenticated ? (
                      <button
                        onClick={togglePopup}
                        aria-current="true"
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-2 py-2 text-sm font-medium d-flex align-items-center"
                        )}
                      >
                        <i class="bi bi-plus-square  me-1"></i>
                        <span>Create</span>
                      </button>
                    ) : (
                      ""
                    )}
                    <div className="relative">
                      {isOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Create Post
                              </h3>
                              <form
                                className="mt-2 was-validated"
                                onSubmit={handleSubmit}
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="content"
                                    class=""
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    About Post
                                  </label>
                                  <input
                                    className="mt-1 form-control is-valid block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="This is the best resume."
                                    required
                                  ></input>
                                  <div className="invalid-feedback text-red-500 text-xs italic">
                                    Please write something about your post.
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="file"
                                    name="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="form-control"
                                    aria-label="file example"
                                    required
                                  />
                                  <div className="invalid-feedback text-red-500 text-xs italic">
                                    jpg, jpeg, png
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                  >
                                    upload
                                  </button>
                                </div>
                              </form>
                              <button
                                onClick={togglePopup}
                                className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        aria-current={item.current}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-2 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}

                    {!authenticated ? (
                      <>
                        <NavLink
                          to="/login"
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          Log In
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          Sign Up
                        </NavLink>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {authenticated ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full text-white"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="bg-gray-800 rounded-md mb-1 mt-1">
                      <h4 className="text-gray-400 ps-4 pe-4 pt-2 pb-1 text-xs">
                        Logged In as
                      </h4>
                      <p className="text-white font-bold ps-4 pe-4 pb-2 text-sm">
                        {profilename}
                      </p>
                    </div>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Disclosure>
    </>
  );
}

export default Navbar;
