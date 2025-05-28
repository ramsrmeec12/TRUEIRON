import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ProfessionalsHandler() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      signOut(auth).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login'); // or your custom login page
    }
  }, [auth, navigate]);

  return <p>Redirecting...</p>;
}

export default ProfessionalsHandler;
