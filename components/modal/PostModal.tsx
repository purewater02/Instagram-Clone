import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LoopIcon from "@mui/icons-material/Loop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { createPost } from "../../pages/api/postApi";

import useSelectFile from "../../hooks/useSelectFile";
import {useRecoilValue} from "recoil";
import {backendUserState, userState} from "../../utils/atoms";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

type PostModalProps = {
  open: boolean;
  setOpen: any;
};

const PostModal: React.FC<PostModalProps> = ({ open, setOpen }) => {
  const user = useRecoilValue(backendUserState);
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const base64ToBlob = (base64String: string) => {
    const parts = base64String.split(",");
    const mimeType = parts[0].match(/:(.*?);/)?.[1] || ""; // MIME 타입 추출
    const binary = Buffer.from(parts[1], "base64"); // Base64 부분을 Buffer로 변환

    return new Blob([binary], { type: mimeType });
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
        if (selectedFile) {
          if (selectedFile.startsWith("data:")) {
            const fileBlob = base64ToBlob(selectedFile);
            formData.append("file", fileBlob);
          } else {
            if (selectedFileRef.current?.files && selectedFileRef.current.files[0]) {
              formData.append("file", selectedFileRef.current.files[0]);
            } else {
              console.log("No valid file selected");
            }
          }
        } else {
            console.log("No Image");
        }

        formData.append("uid", user?.uid || "");
        formData.append("username", user?.username || "");
        formData.append("caption", caption);

        const response = await createPost(formData);
        console.log("Post created successfully", response);
    } catch (error) {
      console.log(error);
    }

    setSelectedFile("");
    setCaption("");
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md">
          <div>
            <div
              className="inline-block 
            rounded-lg px-0 pt-5 pb-0
            text-left overflow-hidden 
            shadow-xl transform transition-all sm:my-0 
            sm:align-middle sm:w-full sm:p-8"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile("")}
                    alt=""
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12
                w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    <CameraAltIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    {!selectedFile && (
                      <Typography className="text-lg leading-6 font-medium text-green-900">
                        Upload a Photo
                      </Typography>
                    )}
                    <div>
                      <input
                        ref={selectedFileRef}
                        type="file"
                        hidden
                        onChange={onSelectedFile}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0  w-full 
                      text-center"
                        type="text"
                        value={caption}
                        placeholder="Please Enter a Caption..."
                        onChange={(e) => setCaption(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {loading ? (
                    <button
                      type="button"
                      disabled={loading}
                      className="inline-flex justify-center w-full rounded-md 
                border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-blue-400
                disabled:cursor-not-allowed hover:disabled:bg-blue-500"
                    >
                      <LoopIcon className="animate-spin" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex justify-center w-full rounded-md 
                border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={handleCreatePost}
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default PostModal;
