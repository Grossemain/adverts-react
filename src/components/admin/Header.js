import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { accountService } from "../../_services/account.service";

const Header = () => {
  let navigate = useNavigate();

  // Gestion du bouton de déconnexion
  const logout = () => {
    accountService.logout();
    navigate("/");
  };

  return (
    <div className="">
      Header Admin
      <Button variant="dark" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
