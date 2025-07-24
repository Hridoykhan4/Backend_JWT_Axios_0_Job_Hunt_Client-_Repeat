import { useLoaderData } from "react-router-dom";
import JobCard from "../Home/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AllJob = () => {
  const loadedJobs = useLoaderData();
  const [jobs, setJobs] = useState(loadedJobs);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    axios
      .get(`https://job-er-mare-salam-server.vercel.app/jobs?searchQuery=${searchField.trim()}`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, [searchField]);

  const handleByType = (e) => {
    if (e.target.value === "All") {
      return setJobs(loadedJobs);
    }
    const matched = loadedJobs?.filter((job) => job.jobType === e.target.value);
    setJobs(matched);
  };

  return (
    <div>
      <h2 className="text-center underline mb-3">All Jobs: {jobs.length}</h2>
      <div className="text-center mb-4 flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          onChange={(e) => setSearchField(e.target.value)}
          className="input"
        />

        <select onChange={handleByType} defaultValue={`,`} className="select">
          <option disabled={true}>Pick By Type</option>
          <option>All</option>
          <option>Hybrid</option>
          <option>Remote</option>
          <option>Part-Time</option>
          <option>Contractual</option>
          <option>Intern</option>
          <option>Full-Time</option>
        </select>
      </div>
      <div className={`${jobs.length && "grid"}  grid-cols-3 gap-4`}>
        {jobs.length ? (
          jobs.map((job) => <JobCard job={job} key={job?._id}></JobCard>)
        ) : (
          <h2 className="text-center">No Job Found</h2>
        )}
      </div>
    </div>
  );
};

export default AllJob;
