import PropTypes from "prop-types"; 
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

function CourseItem({ course, onDeleteCourse }) {
  return (
    <div className="course-card">
      {/* Course Cover */}
      <div className="course-cover">
        <img src={course.cover} alt={course.title} />
      </div>

      {/* Course Title */}
      <div className="course-body">
        <h5 className="course-title">{course.title}</h5>

        {/* Buttons */}
        <div className="course-buttons">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeleteCourse(course.id)}
          >
            <FaTrash /> Hapus
          </button>

          <Link to={`/courses/${course.id}`} className="btn btn-primary">
            Buka
          </Link>
        </div>
      </div>
    </div>
  );
}

const courseItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
};

CourseItem.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export { courseItemShape };
export default CourseItem;
