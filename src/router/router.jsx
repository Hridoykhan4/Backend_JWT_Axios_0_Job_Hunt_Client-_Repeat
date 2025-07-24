import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../page/Home/Home";
import Register from "../page/Register/Register";
import SignIn from "../page/SignIn/SignIn";
import AllJob from "../page/AllJob/AllJob";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";
import JobDetail from "../page/JobDetail/JobDetail";
import JobApply from "../page/JobApply/JobApply";
import MyApplications from "../page/MyApplications/MyApplications";
import AddJob from "../page/AddJob/AddJob";
import MyPostedJobs from "../page/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../page/ViewApplications/ViewApplications";
import UpdateMyApplications from "../page/UpdateMyApplications/UpdateMyApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <h2>Route Not Found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetail></JobDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-er-mare-salam-server.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/application-me",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },

      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewApplications/:jobId",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-er-mare-salam-server.vercel.app/applications/jobs/${params.jobId}`),
      },
      {
        path: "/updateMyApplication/:id",
        element: (
          <PrivateRoute>
            <UpdateMyApplications></UpdateMyApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-er-mare-salam-server.vercel.app/applications/${params.id}`),
      },
      {
        path: "/application/apply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewAllJob",
        element: (
          <PrivateRoute>
            <AllJob></AllJob>
          </PrivateRoute>
        ),
        loader: async () => {
          const res = await axios.get(`https://job-er-mare-salam-server.vercel.app/jobs?allJob=true`);
          return res.data;
        },
      },
    ],
  },
]);

export default router;
