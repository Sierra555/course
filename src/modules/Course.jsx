import Content from "../components/Content";
import Header from "../components/Header";
import Total from "../components/Total";

const Course = ({ nextCourse }) => {
    return (
      <div>
          <Header {...nextCourse} />
          <Content {...nextCourse} />
          <Total {...nextCourse} />
       </div>
    )
};

export default Course;