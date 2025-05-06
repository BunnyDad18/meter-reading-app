import axios from "axios";
import { useState, type ChangeEvent } from "react";
import Alert from "./Alert";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadSuccessResults, setUploadSuccessResults] = useState(0);
  const [uploadFailedResults, setUploadFailedResults] = useState(0);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios
        .post(
          "https://localhost:7260/Readings/meter-reading-uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          setUploadSuccessResults(response.data.successful);
          setUploadFailedResults(response.data.failed);
        });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mb-3">
      <h1 className="form-label">Upload Meter Reading CSV</h1>
      <input
        className="form-control"
        type="file"
        id="formFile"
        onChange={handleFileChange}
      />
      {file && status != "uploading" && (
        <button
          type="button"
          className="btn btn-primary mt-2 mb-4"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      )}

      {status === "success" && (
        <Alert>
          File Uploaded Successfully! {uploadSuccessResults} readings added.{" "}
          {uploadFailedResults} readings failed.
        </Alert>
      )}
      {status === "error" && <Alert>Upload Failed. Please try again.</Alert>}
    </div>
  );
};

export default FileUpload;
