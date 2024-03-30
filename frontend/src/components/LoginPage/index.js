import { Button } from "@mui/material";

import { useUserContext } from "../../hooks/UserContext";

const LoginPage = () => {
  const { login } = useUserContext();

  return (
    <Button variant="contained" onClick={login}>
      Sign in with IITBBS email
    </Button>
  );
};

export default LoginPage;
