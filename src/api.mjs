import axios from "axios";

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
  return response.access_token;
};

const fetchPets = async (type, page) => {
  const apiToken = await getAPIToken();
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
