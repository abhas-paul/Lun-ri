import { useState } from "react";

function SignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    console.log(signupData);
  };

  return (
    <section>
      UI HERE
    </section>
  );
}

export default SignUp;