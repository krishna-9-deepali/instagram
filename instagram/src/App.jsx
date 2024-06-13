import { Outlet } from "react-router-dom";
import { Sidebar, Container } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import { Login, Navbar } from "./components/index";
import { login } from "./store/authslice";
import authservice from "./appwrite/auth";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken"));
    console.log("local", userData);
    if (userData) {
      console.log("local storage", userData);
      dispatch(login({ userData }));
    } else {
      dispatch(logout());
    }
  }, []);

  // useEffect(() => {
  //   console.log("inside app");
  //   authservice
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally();
  // }, []);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Container>
          <Sidebar />
          <div className="  w-full mx-10 marginleft  outlet min-h-full">
            <Outlet />
          </div>
        </Container>

        {/* if status false */}
        {/* only want login page at starting and footer on login land to home */}
        {/* if satus true */}
      </main>
      {/* <Footer />   */}
    </>
  );
}

export default App;
