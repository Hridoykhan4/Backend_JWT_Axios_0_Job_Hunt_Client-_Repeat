import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ViewApplications = () => {
  const loadedApps = useLoaderData();
  const [appliedJobs, setAppliedJobs] = useState(loadedApps);

  const handleStatusUpdate = (e, id) => {
    const status = e.target.value;
    axios
      .patch(`http://localhost:5000/job-applications/${id}`, {
        status,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          alert(`Updated`);
          setAppliedJobs((prev) =>
            prev.map((app) => (app._id === id ? { ...app, status } : app))
          );
        }
      });
  };
git
  return (
    <div>
      <h3 className="text-center text-3xl text-red-600">
        Applications: {appliedJobs.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Name</th>
              <th>Applied At</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs?.map((apps, i) => (
              <tr key={apps?._id}>
                <th>{i + 1}</th>
                <td>{apps?.applicantEmail}</td>
                <td>{apps?.applicantName}</td>
                <td>{new Date(apps?.appliedAt).toLocaleString()}</td>
                <td>{apps?.status ? apps.status : "Not Updated"}</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, apps?._id)}
                    defaultValue={apps?.status || "Change Status"}
                    className="select select-sm"
                  >
                    <option disabled={true}>Change Status</option>
                    <option>Under Review</option>
                    <option>Set Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
