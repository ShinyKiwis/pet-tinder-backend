import axios from "axios";

let apiToken = "";
let expires = 0;

const getAPIToken = async () => {
  const { data: response } = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      method: "POST",
      grant_type: "client_credentials",
      client_id: process.env.API_KEY,
      client_secret: process.env.SECRET_KEY,
    }
  );
  expires = new Date().getTime() + response.expires_in * 1000;
  return response.access_token;
};

const fetchPets = async (type, page) => {
  if (apiToken === "") {
    apiToken = await getAPIToken();
  } else if (!expires || expires - new Date().getTime() < 1) {
    apiToken = await getAPIToken();
  }
  console.log(apiToken);
  const { data: response } = await axios.get(
    `https://api.petfinder.com/v2/animals?
    ${type ? "type=" + type : ""}
    ${page ? "&page=" + page : ""}`,
    {
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    }
  );
  return response.animals;
};

export default fetchPets;
