import axios from "axios";
import { useRef } from "react";
import { useLoaderData } from "react-router-dom";

const UpdateMyApplications = () => {
  const application = useLoaderData();

  const githubRef = useRef();
  const linkedInRef = useRef();


  const handleUpdate = (e) => {
    e.preventDefault();
    const infoLinks = {
      githubURL: githubRef.current.value,
      linkedInURL: linkedInRef.current.value,
      jobId: application?.jobId,
      applicantEmail: application?.applicantEmail,
      status: application?.status,
      appliedAt: application?.appliedAt,
      applicantName: application?.applicantName,
    };
    axios
      .put(
        `http://localhost:5000/applicationUpdate/${application?._id}`,
        infoLinks
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("Changes Updated");
        }
      });
  };

  return (
    <div>
      <h2 className="text-center underline font-semibold">
        Update Application Here
      </h2>
      <form
        onSubmit={handleUpdate}
        className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              readOnly
              className="input"
              value={application?.applicantEmail}
            />
            <label className="label">Github URL</label>
            <input
              type="url"
              className="input"
              placeholder="Github Url"
              ref={githubRef}
              defaultValue={application?.githubURL}
            />
            <label className="label">LinkedIn URL</label>
            <input
              ref={linkedInRef}
              type="url"
              className="input"
              placeholder="LinkedIn Url"
              defaultValue={application?.linkedInURL}
            />

            <button className="btn btn-neutral mt-4">Update</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyApplications;
