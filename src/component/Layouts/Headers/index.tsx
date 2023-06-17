import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/constant/router.constant";
import "../../../style/style.css";
export const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname.includes("/create");
  return (
    <div>
      <article className="article-header">
        <Link to={ROUTERS.home}>
          <button onClick={() => navigate(ROUTERS.home)}>
            <h1>Home</h1>
          </button>
        </Link>
      </article>
      <br></br>
      <article className="article-header-create">
        {isCreatePage ? (
          <p>student form</p>
        ) : (
          <Link to={ROUTERS.create}>
            <button onClick={() => navigate(ROUTERS.create)}>
              <h3>Create</h3>
            </button>
          </Link>
        )}
      </article>
    </div>
  );
};
