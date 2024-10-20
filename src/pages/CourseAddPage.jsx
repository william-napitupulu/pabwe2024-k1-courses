import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddCourse, addCourseActionCreator } from "../states/courses/action";
import CourseInput from "../components/CourseInput";
import { useNavigate } from "react-router-dom";

function CourseAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddCourse = false } = useSelector((states) => states);

  useEffect(() => {
    if (isAddCourse) {
      Swal.fire({
        icon: "success",
        title: "Course successfully added!" ,
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addCourseActionCreator(false));
    }
  }, [isAddCourse, navigate, dispatch]);

  const onAddCourse = ({ cover, title, description, instructor, enrollmentStatus, rating }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructor", instructor);
    formData.append("enrollmentStatus", enrollmentStatus);
    formData.append("rating", rating);
    if (cover) {
      formData.append("cover", cover);
    }

    dispatch(asyncAddCourse(formData)); // Dispatch formData with all data
  };

  return (
    <section>
      <div className="container pt-1">
        <CourseInput onAddCourse={onAddCourse} />
      </div>
    </section>
  );
}

export default CourseAddPage;
