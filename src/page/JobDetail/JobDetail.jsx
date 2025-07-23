import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

const JobDetail = () => {
  const {
    title,
    company_logo,
    company,
    applicationDeadline,
    location,
    jobType,
    salaryRange,
    description,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    _id,
  } = useLoaderData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-11/12 mx-auto max-w-4xl my-10 p-6 rounded-xl bg-base-100 shadow-lg space-y-8"
    >
      {/* Header: Logo and Company */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-5 items-center"
      >
        <img
          className="w-20 h-20 rounded-lg border"
          src={company_logo}
          alt={company}
        />
        <div>
          <h2 className="text-xl font-bold">{company}</h2>
          <p className="text-sm text-gray-400">📍 {location}</p>
          <p className="text-sm text-red-400">
            🗓 Deadline: {applicationDeadline}
          </p>
        </div>
        <div className="ms-auto">
          <Link to={`/application/apply/${_id}`} className="btn btn-primary">
            Apply Now
          </Link>
        </div>
      </motion.div>

      {/* Job Title */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-semibold text-primary">
          🚀 Job Title: {title}
        </h1>
        <p className="text-sm mt-1 text-slate-500">
          {jobType} — Salary: {salaryRange.min}-{salaryRange.max}{" "}
          {salaryRange.currency.toUpperCase()}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-justify"
      >
        <h3 className="text-lg font-medium mb-2">📝 Description</h3>
        <p>{description}</p>
      </motion.div>

      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-medium mb-2">✅ Requirements</h3>
        <ul className="list-disc list-inside space-y-1">
          {requirements.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.05 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Responsibilities */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-medium mb-2">📌 Responsibilities</h3>
        <ul className="list-disc list-inside space-y-1">
          {responsibilities.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + i * 0.05 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* HR Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-base-200 p-4 rounded-lg"
      >
        <h3 className="font-semibold text-lg mb-1">📞 HR Contact</h3>
        <p>
          <span className="font-medium">Name:</span> {hr_name}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href={`mailto:${hr_email}`} className="text-blue-500 underline">
            {hr_email}
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default JobDetail;
