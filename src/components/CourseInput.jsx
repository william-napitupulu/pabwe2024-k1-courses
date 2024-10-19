import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa6";

function CourseInput({ onAddCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null); // To store selected cover image
  const [previewCover, setPreviewCover] = useState(null); // To preview selected cover image

  const fileInputRef = useRef(null);

  function handleOnAddCourse(e) {
    e.preventDefault();

    // Pass the title, description, and cover directly to onAddCourse
    onAddCourse({
      title,
      description,
      cover,
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      setCover(file); // Set the selected image file
      const previewURL = URL.createObjectURL(file); // Set preview URL for the image
      setPreviewCover(previewURL);
    } else {
      alert("Please select a valid image (jpeg, png, jpg).");
    }
  };

  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">New Course</h3>
        <hr />
        <form onSubmit={handleOnAddCourse}>
          {/* Cover Image Preview & Upload */}
          <div className="mb-3">
            <label htmlFor="cover" className="form-label">
              Cover Image
            </label>
            <div
              style={{
                width: "300px",
                height: "300px",
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
                    objectPosition: "center",
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

            {/* Hidden Input for Cover Image */}
            <input
              ref={fileInputRef}
              type="file"
              className="d-none"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
            />
          </div>

          {/* Input Title */}
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Title
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>

          {/* Input Description */}
          <div>
            <label htmlFor="inputBody" className="form-label">
              Description
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleDescription}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>

          {/* Submit Button */}
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
