import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa6";

function CourseInput({ onAddCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  const fileInputRef = useRef(null);

  function handleOnAddCourse(e) {
    e.preventDefault();
    onAddCourse({ title, description, cover });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      setCover(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewCover(previewURL);
    } else {
      alert("Please select a valid image (jpeg, png, jpg).");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">New Course</h3>
        <hr />
        <form onSubmit={handleOnAddCourse}>
          <div className="mb-3">
            <label htmlFor="cover" className="form-label">
              Cover Image
            </label>
            <div
              style={{
                width: "250px",
                height: "150px",
                backgroundColor: "#f0f0f1",
                position: "relative",
                marginBottom: "10px",
                overflow: "hidden",
              }}
            >
              {previewCover ? (
                <img
                  src={previewCover}
                  alt="Cover Preview"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <p>No cover image</p>
              )}
            </div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleUploadClick}
            >
              <FaUpload /> Upload Cover
            </button>

            <input
              ref={fileInputRef}
              type="file"
              className="d-none"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="inputTitle"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              rows="3"
              required
            />
          </div>

          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CourseInput.propTypes = {
  onAddCourse: PropTypes.func.isRequired,
};

export default CourseInput;
