import { BASE_URL } from "./base";

const apiCall = async (query) => {
  const requestBody = {
    query: query,
    variables: null,
  };
  var success = true;
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: query && JSON.stringify(requestBody),
  })
    .then(async (response) => {
      if (response.ok) {
        const responseData = await response.json();
        return {
          success,
          response: responseData?.data,
        };
      }
      throw new Error("Something went wrong");
    })
    .catch((error) => {
      success = false;
      return {
        success,
        error: error,
      };
    });

  return response;
};

export default apiCall;
