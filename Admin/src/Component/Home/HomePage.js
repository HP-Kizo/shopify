import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import Banner from "../Layout/Banner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { HIDE_POPUP } from "../../store/context";
function HomePage() {
  const dispatch = useDispatch();
  // Ẩn đi popoup mỗi khi rời khỏi HomePage do thuôc tính fixed
  useEffect(() => {
    return () => {
      dispatch({ type: HIDE_POPUP });
    };
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
