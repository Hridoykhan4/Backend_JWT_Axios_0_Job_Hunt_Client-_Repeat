import axios from "axios";
import { useEffect, useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { user } = useAuthValue();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs?hr_email=${user?.email}`)
      .then((res) => {
        setMyJobs(res.data);
      });
  }, [user?.email]);

  return (
    <div>
      <h3 className="text-center underline">My Posted Jobs: {myJobs.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Total Applicants</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job, i) => (
              <tr key={job?._id}>
                <th>{i + 1}</th>
                <td>{job?.title}</td>
                <td>{job?.applicationDeadline}</td>
                <td>{job?.applicantCount > 0 ? job?.applicantCount : 0}</td>
                <td>
                  <Link to={`/viewApplications/${job?._id}`}>
                    View Applications
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
