import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { courseItemShape } from "./CourseItem";
import { postedAt } from "../utils/tools";
import { FaClock, FaPenToSquare, FaUpload } from "react-icons/fa6";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { asyncDetailCourse } from "../states/courses/action";
import { useParams } from "react-router-dom";

function CourseDetail({ course, onEditCourse }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(course?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    course?.description || ""
  );
  const [editedInstructor, setEditedInstructor] = useState(course?.instructor || "");     // Instructor Name
  const [previewCover, setPreviewCover] = useState(course?.cover || null); // Default to existing cover
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailCourse(id)); // Fetch the current course details
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (course) {
      setEditedTitle(course.title);
      setEditedDescription(course.description);
      setEditedInstructor(course.instructor); 
      setPreviewCover(course.cover); // Set the existing cover if available
    }
  }, [course]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewCover(previewURL); // Show the preview immediately
      handleCoverUpload(file); // Upload the cover
    }
  };

  const handleCoverUpload = async (file) => {
    setIsUploading(true);
    try {
      const message = await api.postChangeCoverCourse({
        id: course.id,
        cover: file,
      });
      console.log("Cover updated:", message);
      dispatch(asyncDetailCourse(course.id)); // Refresh the course after upload
    } catch (error) {
      console.error("Failed to upload cover:", error.message);
    }
    setIsUploading(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveChanges = () => {
    onEditCourse(course.id, editedTitle, editedDescription, editedInstructor);
    setIsEditing(false);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* Cover Image */}
        <div
          style={{
            width: "300px",
            height: "300px",
            position: "relative",
            backgroundColor: "#f0f0f1",
            marginBottom: "5px",
            overflow: "hidden",
          }}
        >
          {previewCover ? (
            <img
              src={previewCover}
              alt="Cover"
              style={{
                borderRadius: "5px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          ) : (
            <p>No cover image</p>
          )}
        </div>

        {/* Course Details */}
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0">{course.title}</h5>
                

              </div>

              <div>
                {/* Update Cover Button */}
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={handleUploadClick}
                >
                  <FaUpload /> {isUploading ? "Uploading..." : "Update Cover"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {/* "Edit" Button */}
                <button
                  type="button"
                  onClick={() => setIsEditing((prevState) => !prevState)}
                  className="btn btn-sm btn-outline-warning"
                >
                  <FaPenToSquare /> {isEditing ? "Cancel Edit" : "Edit"}
                </button>
              </div>
            </div>

            <div className="col-12">
              <div className="text-sm op-5">
                <FaClock />
                <span className="ps-2">{postedAt(course.created_at)}</span>
              </div>
            </div>

            <hr />

            <div className="col-12 mt-3">
              {isEditing ? (
                <div>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">
                      Edit Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editInstructor" className="form-label">
                      Edit Instructor
                    </label>
                    <input
                    
                      className="form-control"
                      id="editInstructor"
                      value={editedInstructor}
                      onChange={(e) => setEditedInstructor(e.target.value)}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Edit Description
                    </label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      rows="3"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveChanges}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>{course.description}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseDetail.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired,
  onEditCourse: PropTypes.func.isRequired,
};

export default CourseDetail;
