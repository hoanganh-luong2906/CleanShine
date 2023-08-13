import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage, { departmentLoader } from "./pages/SignUpPage";
import NewsPage from "./pages/NewsPage";
import GuaranteePage from "./pages/GuaranteePage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage";
import UserPageLayout from "./layouts/UserPageLayout";
import HomeService, {
  serviceLoader as services,
} from "./pages/User/HomeService";
import HourlyHelpPage from "./pages/HourlyHelpPage";
import FabricCleaningPage from "./pages/FabricCleaningPage";
import TotalSanitationPage from "./pages/TotalSanitationPage";
import ElectronicCleaningPage from "./pages/ElectronicCleaningPage";
import EmployeePage, {
  employeePageLoader,
} from "./pages/Employee/EmployeePage";
import AdminHome from "./pages/Admin/AdminHome";
import EditCustomer, { customerLoader } from "./pages/Admin/EditCustomer";
import OrderService, { orderLoader } from "./pages/Admin/OrderService";
import EditEmployee, { employeeLoader } from "./pages/Admin/EditEmployee";
import EditService, { serviceLoader } from "./pages/Admin/EditService";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import AccountInfor, { customerInfoLoader } from "./pages/User/AccountInfor";
import EmployeePageHistory, {
  employeeHistoryLoader,
} from "./pages/Employee/EmployeePageHistory";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderCheckout from "./pages/User/OrderCheckout";
import UserHistory, { historyLoader } from "./pages/User/UserHistory";
import ServiceDetail from "./pages/User/ServiceDetail";
import ActionRecord, { billLoader } from "./pages/User/ActionRecord";
import AcceptedOrderPage, {
  acceptedLoader,
} from "./pages/Employee/AcceptedOrderPage";
import ServiceType, { serviceDetailLoader } from "./pages/Admin/ServiceType";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "hourly-help",
        element: <HourlyHelpPage />,
      },
      {
        path: "total-senitation",
        element: <TotalSanitationPage />,
      },
      {
        path: "fabric-cleaning",
        element: <FabricCleaningPage />,
      },
      {
        path: "electronic-cleaning",
        element: <ElectronicCleaningPage />,
      },
      { path: "contact", element: <ContactPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "guarantee", element: <GuaranteePage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage />, loader: departmentLoader },
    ],
  },
  {
    path: "/user",
    element: <UserPageLayout />,
    children: [
      { index: true, element: <HomeService />, loader: services },
      { path: "history", element: <UserHistory />, loader: historyLoader },
      { path: "action-record", element: <ActionRecord />, loader: billLoader },
      { path: "order", element: <OrderCheckout />, loader: customerInfoLoader },
      {
        path: "account-infor",
        element: <AccountInfor />,
        loader: customerInfoLoader,
      },
      {
        path: "service-detail",
        element: <ServiceDetail />,
        loader: customerInfoLoader,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome />},
      {
        path: "edit-customer",
        element: <EditCustomer />,
        loader: customerLoader,
      },
      {
        path: "edit-employee",
        element: <EditEmployee />,
        loader: employeeLoader,
      },
      {
        path: "edit-service",
        element: <EditService />,
        loader: serviceLoader,
      },
      {
        path: "order-service",
        element: <OrderService />,
        loader: orderLoader,
      },
      {
        path: "service-detail",
        element: <ServiceType />,
        loader: serviceDetailLoader,
      },
    ],
  },
  {
    path: "/employee",
    element: <EmployeeLayout />,
    children: [
      { index: true, element: <EmployeePage />, loader: employeePageLoader },
      {
        path: "accepted-orders",
        element: <AcceptedOrderPage />,
        loader: acceptedLoader,
      },
      {
        path: "history-emp",
        element: <EmployeePageHistory />,
        loader: employeeHistoryLoader,
      },
    ],
  },
]);

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Afefs1EOTDIKKyThtWc_uRZAPmoJ5fW92WwTWcr0Ejk4vOtcRp_ixdZvcuTc-4BT_vwRNHpcS8CFiA5t",
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </PayPalScriptProvider>
  );
}

export default App;
