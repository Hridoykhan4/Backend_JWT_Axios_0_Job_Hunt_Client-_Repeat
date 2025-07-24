import axios from "axios";
import { useEffect, useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyApplications = () => {
  const [applications, setMyApplications] = useState([]);
  const { user } = useAuthValue();
  const axiosSecure = useAxiosSecure();



  const handleDeleteApplications = (id, jobId) => {
    axios
      .delete(`https://job-er-mare-salam-server.vercel.app/job-applications/${id}`, {
        data: { jobId },
      })
      .then((res) => {
        if (res?.data.deletedCount > 0) {
          alert("Successfully Deleted");
          setMyApplications(applications.filter((app) => app?._id !== id));
        }
      });
  };

  useEffect(() => {
   /*  axios
      .get(`https://job-er-mare-salam-server.vercel.app/job-applications/${user.email}`, {
        withCredentials: true,
      }) */
     axiosSecure.get(`/job-applications/${user.email}`)
      .then((res) => {
        setMyApplications(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.email, axiosSecure]);

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold underline">
        My Applications: {applications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Job Info</th>
              <th>Deadline</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, i) => (
              <tr key={application?._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={application?.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{application?.title}</div>
                      <div className="text-sm opacity-50">
                        {application?.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{application?.applicationDeadline}</td>
                <td>{new Date(application?.appliedAt).toLocaleString()}</td>
                <th className="flex justify-center align-bottom items-center gap-2">
                  <Link
                    to={`/updateMyApplication/${application?._id}`}
                    className="btn btn-success btn-xs"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteApplications(
                        application?._id,
                        application?.jobId
                      )
                    }
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
