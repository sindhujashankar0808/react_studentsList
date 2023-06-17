import Layouts from "../component/Layouts";
import { StudentList } from "../component/Students/StudentList";
import "../style/style.css";

const HomePage = () => {
  return (
    <div className="background-color">
      <Layouts>
        <StudentList />
      </Layouts>
    </div>
  );
};
export default HomePage;
