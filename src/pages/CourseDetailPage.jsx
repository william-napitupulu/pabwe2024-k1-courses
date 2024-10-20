import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailCourse, asyncUpdateCourse } from "../states/courses/action";
import CourseDetail from "../components/CourseDetail";

function CourseDetailPage() {
  const { id } = useParams();
  const { detailCourse } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailCourse(id));
    }
  }, [id, dispatch]);

  const handleEditCourse = (id, title, description, instructor, enrollmentStatus, rating) => {
    dispatch(asyncUpdateCourse(id, title, description, instructor, enrollmentStatus, rating));

    Swal.fire({
      icon: "success",
      title: "Successfully updated the course! ",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <section>
      <div className="container pt-1">
        {detailCourse != null ? (
          <CourseDetail
            course={detailCourse}
            onEditCourse={handleEditCourse}
          />
        ) : null}
      </div>
    </section>
  );
}

export default CourseDetailPage;
