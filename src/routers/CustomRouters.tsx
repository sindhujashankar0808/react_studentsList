import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "../utils/constant/router.constant";
import HomePage from "../pages/HomePage";
import CreateFormPage from "../pages/CreateFormPage";
import PageNotFound from "../pages/PageNotFound";
import EditPage from "../pages/EditPage";

const CustomRouters = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTERS.landing} element={<HomePage />} />
        <Route path={ROUTERS.home} element={<HomePage />} />
        <Route path={ROUTERS.create} element={<CreateFormPage />} />
        <Route path={ROUTERS.edit} element={<EditPage />} />
        <Route path={ROUTERS.pageNotFound} element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
export default CustomRouters;
