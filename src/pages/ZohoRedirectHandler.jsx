import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ZohoRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      if (!code) return;

      try {
        const res = await axios.post("https://accounts.zoho.com/oauth/v2/token", null, {
          params: {
            grant_type: "authorization_code",
            client_id: "1000.3HWFFJJ5J9CW2OZX3ZAPP6S1V6QCCV",
            client_secret: "366b92d91e2507d18c100bd5ef551068dc0d121141",
            redirect_uri: "https://trueiron.shop/billing",
            code: code
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        const { access_token, refresh_token } = res.data;

        console.log("✅ Access Token:", access_token);
        console.log("🔁 Refresh Token:", refresh_token);

        // Store tokens in secure place (env, Firebase, etc.)
        // Then redirect or show confirmation
        navigate("/"); // Or show a success page
      } catch (err) {
        console.error("Token exchange failed:", err);
      }
    };

    exchangeCodeForToken();
  }, [code, navigate]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Processing Payment Confirmation...</h1>
      <p>Please wait...</p>
    </div>
  );
};

export default ZohoRedirectHandler;
