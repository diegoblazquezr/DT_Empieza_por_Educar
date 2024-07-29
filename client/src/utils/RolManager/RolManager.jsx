import React from "react";

const RolManager = ({ role, allowedRoles, component }) => {

  console.log('Rolmanager', role)

  if (allowedRoles.includes(role)) {
    return component;
  }
  else {
    return <div><span>Acción no autorizada</span></div>
  }
};

export default RolManager;
