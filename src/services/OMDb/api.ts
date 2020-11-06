import * as Promise from "bluebird";
import * as request from "request-promise";

const rejectApiKey: () => Promise<any> = () =>
  Promise.reject(new Error("Missing API key"));

const omdbApi = ({ apiKey }: { apiKey: string }) => {
  if (!apiKey) {
    throw new Error("Missing apiKey");
  }

  function _request(args: any) {
    return request
      .defaults({
        uri: `http://www.omdbapi.com/`,
        json: true,
      })(args)
      .promise();
  }

  return {
    get(url: string, qs: any = {}): Promise<any> {
      if (!apiKey) {
        return rejectApiKey();
      }

      qs.apikey = apiKey;
      return _request({ url, method: "GET", qs });
    },
  };
};

export default omdbApi;
