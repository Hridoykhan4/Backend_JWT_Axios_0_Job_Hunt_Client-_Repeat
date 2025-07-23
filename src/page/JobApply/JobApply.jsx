import { useNavigate, useParams } from "react-router-dom";
import useAuthValue from "../../hooks/useAuthValue";
import axios from "axios";

const JobApply = () => {
  const { id: jobId } = useParams();
  const { user } = useAuthValue();
    const nav = useNavigate()
  const handleApply = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const allValues = Object.fromEntries(formData.entries());
    const applyInfo = {
      ...allValues,
      jobId,
      applicantEmail: user?.email,
      applicantName: user?.displayName,
      appliedAt: new Date().toISOString()
    };

    axios
      .get(
        `http://localhost:5000/checkJobs?email=${user?.email}&jobId=${jobId}`
      )
      .then((res) => {
        if (res.data.exists) {
          alert(`Already applied for the job`);
        } else {
          axios
            .post("http://localhost:5000/job-applications", applyInfo)
            .then((res) => {
              if (res.data.insertedId) {
                alert(`Successfully applied for the job`);
                nav('/application-me')
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };

  return (
    <div className=" bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h2>Apply For The Job</h2>
         
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleApply} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Github URL</label>
              <input
                name="githubURL"
                required
                type="url"
                className="input"
                placeholder="Github"
              />
              <label className="label">LinkedIn URL</label>
              <input
                name="linkedInURL"
                required
                type="url"
                className="input"
                placeholder="LinkedIn"
              />
              <button className="btn btn-neutral mt-4">Apply</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
