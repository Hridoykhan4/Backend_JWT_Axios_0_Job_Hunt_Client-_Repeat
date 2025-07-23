import { Link } from "react-router-dom";
import { motion } from "motion/react";
const JobCard = ({ job }) => {
  return (
    <motion.div
    initial={{opacity: 0, y: 100}}
    whileInView={{opacity: 1, y: 0}}
    className="bg-base-100 border-white/20 rounded-md border shadow-sm">
      <figure className="px-6 items-center flex gap-2">
        <img className="w-16 h-16 " src={job?.company_logo} alt="Shoes" />
        <div>
          <h2>{job?.company}</h2>
          <h2>{job?.location}</h2>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{job?.title}</h2>
        <p>{job?.jobType}</p>
        <p>
          Salary: {job?.salaryRange?.min} - {job.salaryRange?.max}{" "}
          {job?.salaryRange?.currency}
        </p>
        <p>Deadline: {job?.applicationDeadline}</p>
        <div className="flex flex-wrap gap-3 flex-col sm:flex-row">
          {job?.requirements.map((skill, i) => (
            <p className="badge badge-dash" key={i}>
              {skill}
            </p>
          ))}
        </div>
        <div className="card-actions justify-end">
          <Link to={`/jobs/${job?._id}`} className="btn btn-primary">
            Apply
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
