import { useEffect, useState } from "react";
import VerifiedProvider from "../../services/VerifiedProvider";

const VerifiedProviderlist = () => {
  const [verifiedProviders, setVerifiedProviders] = useState([]);

  const fetchUsers = () => {
    VerifiedProvider.fetchVerifiedProviders()
      .then((response) => {
        setVerifiedProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {verifiedProviders.map((verifiedProvider) => (
        <h3>{verifiedProvider.name.fName}</h3>
      ))}
    </div>
  );
};

export default VerifiedProviderlist;
