import axios from "axios";
import { useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const { user } = useAuthValue();
  const nav = useNavigate()
  const handleArrayInput = (e, func) => {
    const items = e.target.value.split(",").map((item) => item.trim());
    func(items);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const jobData = {
      title: form.title.value,
      location: form.location.value,
      jobType: form.jobType.value,
      category: form.category.value,
      applicationDeadline: form.applicationDeadline.value,
      salaryRange: {
        min: parseInt(form.minSalary?.value),
        max: parseInt(form.maxSalary?.value),
        currency: form.currency.value,
      },
      requirements,
      responsibilities,
      description: form.description.value,
      company: form.company.value,
      status: "active",
      hr_email: user?.email,
      hr_name: user?.displayName,
      company_logo: form.company_logo.value,
    };

    axios.post(`http://localhost:5000/jobs`, jobData).then((res) => {
      if (res.data.insertedId) {
        alert("Added");
        nav('/my-jobs')
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center mb-2">Add Job for Job Seekers!!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <select
          name="jobType"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Job Type</option>
          <option>Remote</option>
          <option>Onsite</option>
          <option>Hybrid</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Job Category"
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="applicationDeadline"
          className="input input-bordered w-full"
          required
        />

        <div className="flex gap-2">
          <input
            type="number"
            name="minSalary"
            placeholder="Min Salary"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="maxSalary"
            placeholder="Max Salary"
            className="input input-bordered w-full"
            required
          />
          <select
            name="currency"
            className="select select-bordered w-full max-w-xs"
            required
          >
            <option value="bdt">BDT</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>

        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          placeholder="Job Description"
          required
        />

        {/* Requirements */}
        <input
          type="text"
          onChange={(e) => handleArrayInput(e, setRequirements)}
          placeholder="Requirements (comma separated)"
          className="input input-bordered w-full"
          required
        />

        {/* Responsibilities */}
        <input
          type="text"
          onChange={(e) => handleArrayInput(e, setResponsibilities)}
          placeholder="Responsibilities (comma separated)"
          className="input input-bordered w-full"
          required
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="input input-bordered w-full"
          required
        />

        {/* HR Email */}
        <input
          //   type="email"
          value={user?.email}
          readOnly
          placeholder="HR Email"
          className="input input-bordered w-full"
          required
        />

        {/* HR Name */}
        <input
          value={user?.displayName}
          readOnly
          type="text"
          placeholder="HR Name"
          className="input input-bordered w-full"
          required
        />

        {/* Company Logo URL */}
        <input
          type="url"
          name="company_logo"
          placeholder="Company Logo URL"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-neutral w-full">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
