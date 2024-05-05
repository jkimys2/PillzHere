import "./Pillz.css";
import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_PILLZ } from "../utils/queries";
import { ADD_PILLZ } from "../utils/mutations";
import AuthService from "../utils/auth.js";
import PillForm from "../components/PillForm";

const Pillz = () => {
  // const { formState, setFormState } = useState({});
  // const [validated] = useState(false)
  // const { loading, data } = useQuery(QUERY_PILLZ, {
  //   variables: { username: userParam },
  // });
  const [newPill, setNewPill] = useState([]);
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.me || {};
  const [ savedPillz, setSavedPillz] = useState(useQuery(QUERY_PILLZ));
  const [addPillz] = useMutation(ADD_PILLZ);

  // const pillz = data?.pillz || [];
  // const [updatePillz] = useMutation(ADD_PILLZ);
  const renderPill = async () => {
    try {
      const response = await savedPillz;

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json;
      const pillData = items.map((pill) => ({
        name: pill.name,
        quantity: pill.quantity,
        dosage: pill.dosage,
      }));

      setSavedPillz(pillData);
    } catch (err) {
      console.error(err);
    }
  };

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
  }

  // if (!userData && !AuthService.loggedIn()) {
  //   return (
  //     <div>
  //       <h2 className="h2">You need to be logged in to see your Pillz!</h2>
  //     </div>
  //   );

  // } else
  {
    return (
      <div>
        <h2>
          {userData.pillz
            ? `These are ${userData.username}'s Pillz:`
            : "You have no saved Pillz!"}
        </h2>
        {userData.pillz.map((pill) => (
          <div key={pill._id} className="pillz col-12 col-md-10 mb-3 p-3">
            <div className="pillz-info">
              <p>{pill.name}</p>
              <p>{pill.quantity}</p>
              <p>{pill.dosage}</p>
            </div>
            <div>
              <button onClick={() => handleTakePill(pill._id)}>
                Take Pill{" "}
                <span role="img" aria-label="pill">
                  💊
                </span>
              </button>
            </div>
          </div>
        ))}

        <div>
          <PillForm />
        </div>
      </div>
    );
  }
};

export default Pillz;
