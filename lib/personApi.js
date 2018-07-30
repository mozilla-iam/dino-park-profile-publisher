import axios from "axios";

import url from "url";

function personApi(cfg) {
  return async function getProfileByUserID(userId) {
    const profileUrl = url.resolve(cfg.personApiUrl, userId);
    return axios.get(profileUrl).then(res => {
      if (res.data) {
        return Promise.resolve(res.data);
      } else {
        return Promise.reject("Unable to fetch profile: empty response");
      }
    });
  };
}

export { personApi as default };
