import React, { useState } from "react";
import toast from "react-hot-toast";
import KachaSystem from "./../assets/KachaSystem.png";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import "./registerUser.scss";
import Footer from "../pages/Home/Footer";
import Axios from "./../api/Axios";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { style } from "@mui/system";
import { DialogContent, Divider } from "@mui/material";
import Navbar from "../components/navBar/Navbar";
const GET_STARTED_URL = "/api/register";
const RegisterUser = () => {
  const navigate = useNavigate();
  const [phone, setPhoneNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [referral_code, setReferralCode] = useState("");
  const [id_type, setIdType] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [id_scan, setIDScan] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [zone, setZone] = useState("");
  const [city, setCity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [house_no, setHouseNumber] = useState("");
  const [specification_location, setSpecificLocation] = useState("");
  const [is_business, setIsBusiness] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isTouched, setTouched] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setTouched(true);
    const enteredCustomerInformation = {
      phone: phone,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      gender: gender,
      dob: dob,
      referral_code: referral_code,
      id_type: id_type,
      id_number: id_number,
      id_scan: id_scan,
      photo: photo,
      address: {
        zone: zone,
        city: city,
        woreda: woreda,
        kebele: kebele,
        house_no: house_no,
        specific_location: specification_location,
        is_business: is_business || false,
      },
    };
    try {
      const response = await Axios.post(
        GET_STARTED_URL,
        enteredCustomerInformation,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setIsPhoneValid(true);
      toast.success("You have successfully register!");
      navigate("/");
    } catch (error) {
      if (error.response.data.phone[0]) {
        setIsPhoneValid(false);
      }
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <button
          className="goBackButton"
          onClick={() => {
            navigate("/");
          }}
        >
          <SettingsBackupRestoreIcon />
        </button>
      </div>
      <div className="registerUserContianer">
        {/* <img src={KachaSystem} style={{ width: "1345px", height: "600px" }} /> */}
        <div className="bottom">
          <div className="right">
            <form onSubmit={submitHandler}>
              <div className="formInput">
                <div>
                  <label>Phone Number</label>
                  <input
                    type="phone"
                    placeholder="Enter phone"
                    required
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {isTouched && !isPhoneValid && (
                    <p style={{ color: "red" }}>
                      User with this phone already exists..
                    </p>
                  )}
                </div>
              </div>

              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first Name"
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Middle Name</label>
                <input
                  type="text"
                  placeholder="Enter Middle Name"
                  required
                  value={middle_name}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Gender</label>
                <select
                  className="formInput"
                  name="active"
                  id="active"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </div>
              <div className="formInput">
                <label>Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Referral Code</label>
                <input
                  type="text"
                  placeholder="Enter Referral Code "
                  required
                  value={referral_code}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>ID Type</label>
                <select
                  className="formInput"
                  name="active"
                  id="active"
                  value={id_type}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option>Select ID Type</option>
                  <option value="NA">National</option>
                  <option value="DR">Driver License</option>
                  <option value="PA">Passport</option>
                </select>
              </div>
              <div className="formInput">
                <label>ID Number</label>
                <input
                  type="text"
                  placeholder="Enter id number "
                  required
                  value={id_number}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label htmlFor="file">ID Scan:</label>

                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setIDScan(event.target.files[0]);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="file">Photo:</label>
                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setPhoto(event.target.files[0]);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Zone</label>
                <input
                  type="text"
                  placeholder="Enter Zone "
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Enter City "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Woreda</label>
                <input
                  type="text"
                  placeholder="Enter Woreda "
                  value={woreda}
                  onChange={(e) => setWoreda(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Kebele</label>
                <input
                  type="text"
                  placeholder="Enter Kebele "
                  value={kebele}
                  onChange={(e) => setKebele(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>House Number</label>
                <input
                  type="text"
                  placeholder="Enter House Number "
                  value={house_no}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Specific Location</label>
                <input
                  type="text"
                  placeholder="Enter Specific Location "
                  value={specification_location}
                  onChange={(e) => setSpecificLocation(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>
                  Is Business{" "}
                  <Checkbox
                    onChange={(e) => setIsBusiness(true)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </label>
              </div>

              <div className="formInput">
                <button> Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default RegisterUser;
