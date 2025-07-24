import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://job-er-mare-salam-server.vercel.app/jobs?featured=true`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-center underline mb-10">
        Featured Jobs: {jobs.length}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard job={job} key={job?._id}></JobCard>
        ))}
      </div>
      <div className="text-center">
        {jobs.length > 0 && (
          <Link to="/viewAllJob" className="btn btn-wide btn-secondary">
            View All
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
