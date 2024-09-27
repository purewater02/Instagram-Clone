import React, { useState } from "react";

const useSelectFile = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const onSelectedFile = (event: React.ChangeEvent<HTMLInputElement>, allowMultiple: boolean = false) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files);

      const promises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
              resolve(readerEvent.target.result as string);
            }
          }

          reader.onerror = (error) => {
            reject(error);
          }
        });
      })

      Promise.all(promises).then((fileResults) => {
        if (allowMultiple) {
          setSelectedFiles((prev) => [...prev, ...fileResults]); // 여러개 추가
        } else {
          setSelectedFiles(fileResults); // 하나만 추가
        }
      })
    }
  }

  return { selectedFiles, setSelectedFiles, onSelectedFile };
};
export default useSelectFile;
