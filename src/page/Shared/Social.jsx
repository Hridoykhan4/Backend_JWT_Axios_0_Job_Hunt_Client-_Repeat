import useAuthValue from "../../hooks/useAuthValue";

const Social = () => {
  const { googleSignIn } = useAuthValue();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        // console.log(res.user);
        alert("Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="divider">Or</div>

      <button onClick={handleGoogleSignIn} className="btn w-full">
        Google
      </button>
    </div>
  );
};

export default Social;
