import "./Pillz.css";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_PILLZ } from "../utils/queries";
import { ADD_PILLZ } from "../utils/mutations";
import AuthService from "../utils/auth.js";
import PillForm from "../components/PillForm";

const Pillz = () => {

  const [newPill, setNewPill] = useState([]);
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.me || {};
  console.log(userData)
  const [savedPillz, setSavedPillz] = useState(useQuery(QUERY_PILLZ));
  const [addPillz] = useMutation(ADD_PILLZ);

  const handleTakePill = async (pillId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const pillToSave = newPill.find((pill) => pill.pillId === pillId);
      await addPillz({ variables: { pillInput: { ...pillToSave } } });

      setNewPill([...savedPillz, pillToSave.pillId]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className= "pill-container">
        <h2>
          {userData.pillz.length > 0
            ? `These are ${userData.username}'s Pillz:`
            : "You have no saved Pillz!"}
        </h2>
        {userData.pillz.map((pill) => (
          <div key={pill._id} className="pillz col-12 col-md-10 mb-3 p-3">
            <div className="pillz-info">
              <h3> {pill.name}</h3>
              <p>Quantity left:  {pill.quantity}</p>
              <p>Dose:  {pill.dosage}</p>
            </div>
            <div>
              <button id="takebtn" onClick={() => handleTakePill(pill._id)}>
                Take Pill{" "}
                <span role="img" aria-label="pill">
                  💊
                </span>
              </button>
            </div>
          </div>
        ))}

        <div id="pillform">
          <PillForm />
        </div>
      </div>
    );
  }
};

export default Pillz;
