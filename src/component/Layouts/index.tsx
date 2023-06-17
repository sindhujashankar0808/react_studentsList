import { Footer } from "./Footers";
import { Headers } from "./Headers";
const Layouts = (props: any) => {
  const { children } = props;
  return (
    <>
      <Headers />
      <div>{children}</div>
      <Footer />
    </>
  );
};
export default Layouts;
