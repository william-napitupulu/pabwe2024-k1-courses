import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash } from "react-icons/fa6";

function CourseItem({ course, onDeleteCourse }) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8 d-flex">
            <h5>
              <Link to={`/courses/${course.id}`} className="text-primary">
                {course.title}
              </Link>
            </h5>

          </div>

          <div className="col-4 text-end">
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                  title: "Hapus Course",
                  text: `Apakah kamu yakin ingin mehapus course: ${course.title}?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Ya, Tetap Hapus",
                  customClass: {
                    confirmButton: "btn btn-danger me-3 mb-4",
                    cancelButton: "btn btn-secondary mb-4",
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDeleteCourse(course.id);
                  }
                });
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus
            </button>
            <div className="mt-2">
              <div className="instructor">
                <h6>{course.instructor}</h6>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(course.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const courseItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  cover: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
};

CourseItem.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { courseItemShape };

export default CourseItem;
