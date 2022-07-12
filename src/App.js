import "./App.css";
import Home from "./pages/Home/Home";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ModalCom from "./components/ModalCom";
import Dashbord from "./pages/Dashbord";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import Transaction from "./pages/transaction/Transaction";
import TransactionDetail from "./pages/transaction/TransactionDetail";
import ChangePassword from "./components/settings/changePassword/ChangePassword";
import ActivateUser from "./components/settings/activateUser/ActivateUser";
import ChangePin from "./components/settings/changePin/ChangePin";
// import CreateAccount from "./pages/CreateAccount";
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route
            path="/modal"
            element={
              <RequireAuth>
                <ModalCom />
              </RequireAuth>
            }
          />
          <Route
            path="/dashbord"
            element={
              <RequireAuth>
                <Dashbord />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/transaction"
            element={
              <RequireAuth>
                <Transaction />
              </RequireAuth>
            }
          />
          <Route
            path="/transactionDetail"
            element={
              <RequireAuth>
                <TransactionDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/changePassword"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />

          <Route
            path="/changePin"
            element={
              <RequireAuth>
                <ChangePin />
              </RequireAuth>
            }
          />
          <Route
            path="/activateUser"
            element={
              <RequireAuth>
                <ActivateUser />
              </RequireAuth>
            }
          />
          <Route path="/registerUser" element={<RegisterUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
