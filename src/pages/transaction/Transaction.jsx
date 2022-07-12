import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import Axios from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import "./transaction.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { AuthContext } from "../../context/AuthContext";
import MenuLList from "../MenuLList";
import Footer from "../Home/Footer";

const TRANSFER_URL = "api/transfers?page_size=1000";

// const TRANSFER_URL = "api/transfers";

const Transaction = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [pageSize, setPageSize] = useState(10);
  const token = currentUser.token;
  let idNumber = 0;
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  useEffect(() => {
    (async () => {
      const response = await Axios.get(TRANSFER_URL, auth);
      setUserData(response.data.results);
      //   console.log(response.data.results);
      //   console.log(response.data.results[0].amount);
    })();
  }, []);

  //Detail handler
  const detailHandler = (transactions) => {
    console.log(transactions);
    navigate("/transactionDetail", {
      state: { transaction: transactions },
    });
  };

  //give all data
  const userList = userData.map((tranData) => {
    const transactionType = tranData.type === "CREDIT" ? "+" : "-";

    return {
      idBrowser: Number(++idNumber),
      description: tranData.description,
      fee: tranData.fee,
      //current display
      id: tranData.id,
      payer: tranData.payer,
      payer_name: tranData.payer_name,
      payee: tranData.payee,
      payee_name: tranData.payee_name,
      amount: tranData.amount,
      type: transactionType,
      status: tranData.status,
      //next display
      payee_account: tranData.payee_account,
      payee_phone: tranData.payee_phone,
      payer_account: tranData.payer_account,
      payer_phone: tranData.payer_phone,
      process: tranData.process,
      updated_at: tranData.updated_at,
    };
  });

  const userColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "payer",
      headerName: "Payer",
      width: 160,
    },
    {
      field: "payer_name",
      headerName: "Payer Name",
      width: 190,
    },

    {
      field: "payee",
      headerName: "Payee",
      width: 170,
    },
    {
      field: "payee_name",
      headerName: "Payee Name",
      width: 200,
    },
    // { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="tyepStyle">
              {params.row.type} {params.row.amount}
            </div>
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="statusStyle">{params.row.status}</div>
          </div>
        );
      },
    },
    // {
    //   field: "status",
    //   headerName: "status",
    //   width: 170,
    // },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Details",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => detailHandler(params.row)}
            >
              <VisibilityIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <MenuLList />
      </div>

      <div className="datatable">
        <div className="datatableTitle">Transaction Details:-</div>

        <DataGrid
          className="datagrid"
          rows={userList}
          columns={userColumns.concat(actionColumn)}
          // columns={userColumns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          checkboxSelection
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Transaction;
