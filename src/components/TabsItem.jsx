import React from "react";
import CourseItem from "./CourseItem";
import PropTypes from "prop-types";
import { courseItemShape } from "./CourseItem";

function TabsItem({ tabId, title, isActive, courses, onDeleteCourse }) {
  let itemDisplay;

  if (courses.length > 0) {
    itemDisplay = (
      <div className="list-item" id="courses">
        {courses.map((course) => (
          <CourseItem
            course={course}
            key={course.id}
            onDeleteCourse={onDeleteCourse}
          />
        ))}
      </div>
    );
  } else {
    itemDisplay = <p>No courses available.</p>;
  }

  return (
    <div
      className={`tab-pane fade ${isActive ? "show active" : ""}`}
      id={tabId}
      role="tabpanel"
    >
      <div className="mt-2">
        <h4>{title}</h4>
        {itemDisplay}
      </div>
    </div>
  );
}

TabsItem.propTypes = {
  tabId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape(courseItemShape)).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export default TabsItem;
