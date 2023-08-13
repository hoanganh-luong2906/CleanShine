// import "./SignInPage.css";
import SignInForm from "../components/SignInForm";
const SignInPage = () => {
  return (
    <div className="container-fluid signin-bg">
      <div className="row justify-content-left align-items-left">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
