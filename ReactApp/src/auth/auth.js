import api from "../api/axios";
import jwt_decode from "jwt-decode";
// Set all future requests to use the token.
const setToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          useCredentials: true,
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }
};

// Get new Token by API CALL.
const tokenAPICALL = async (user, pass) => {
  const { data } = await api.post(
    `/login`,
    {
      username: user,
      password: pass,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  const jwt_Token_decoded = jwt_decode(data.data.access_token);

  const expiryDate = jwt_Token_decoded.exp;
  if (jwt_Token_decoded.exp * 1000 > Date.now()) {
    localStorage.setItem("token", data.data.access_token);
    localStorage.setItem("token_exp", expiryDate);
  } else {
    console.log("failed token");
  }
  return data.data.access_token;
};

// Check the Token stored in Cookies.
const getToken = async (user, pass) => {
  const storedJwt = localStorage.getItem("token");
  const expiration = localStorage.getItem("token_exp");
  if (expiration && storedJwt) {
    if (expiration * 1000 > Date.now()) {
      console.log("Keep Token");
      setToken();
    } else {
      console.log("Expired Token");
      return await tokenAPICALL(user, pass);
    }
  } else {
    // No token recorder in session, Get new token
    console.log("No Token");
    return await tokenAPICALL(user, pass);
  }
};

export default getToken;

