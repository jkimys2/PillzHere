import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PILLZ} from '../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_PILLZ} from '../utils/mutations';
import Auth from '../utils/auth';

const Pillz = () => {
   const { username: userParam } = useParams();
    const { loading, data } = useQuery(GET_PILLZ, {
        variables: { username: userParam },
    });
    const pillz = data?.pillz || [];
    const [updatePillz] = useMutation(UPDATE_PILLZ);
    const handleTakePill = async (pillId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
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
    if (!userParam && !Auth.loggedIn()) {
        return (
            <div>
                <h2>You need to be logged in to see your Pillz!</h2>
            </div>
        );
    }
    else {
        return (
            <div>
                <h2>
                    {userParam ? `These are ${userParam}'s Pillz:` : 'These are your Pillz:'}   

                </h2>
                {pillz.map((pill) => (
                    <div key={pill._id} className="pillz col-12 col-md-10 mb-3 p-3">
                        <div className="pillz-info">
                            <p>{pill.name}</p>
                            <p>{pill.dosage}</p>
                            <p>{pill.frequency}</p>
                        </div>
                        <div>
                            <button onClick={() => handleTakePill(pill._id)}>
                                Take Pill <span role="img" aria-label="pill">💊</span>
                            </button>
                        </div>
                        <div>
                           <PillForm/>
                            <button> 
                                <Link to={`/delete/${pill._id}`}>Delete Pill</Link>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        );
    }
}


export default Pillz;
