import "./Pillz.css";
import { Form, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PILLZ } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_PILLZ } from "../utils/mutations";
import AuthService from "../utils/auth.js";
import PillForm from "../components/PillForm";

const Pillz = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_PILLZ, {
    variables: { username: userParam },
  });
  const pillz = data?.pillz || [];
  const [updatePillz] = useMutation(ADD_PILLZ);
  const handleTakePill = async (pillId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await updatePillz({
        variables: { pillId },
      });
    } catch (e) {
      console.error(e);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userParam && !AuthService.loggedIn()) {
    return (
      <div>
        <h2 className="h2">You need to be logged in to see your Pillz!</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          {userParam
            ? `These are ${userParam}'s Pillz:`
            : "These are your Pillz:"}
        </h2>
        {pillz.map((pill) => (
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
