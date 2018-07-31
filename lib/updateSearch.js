import axios from "axios";

import { logger } from "./config";

function updateSearch(cfg) {
  return async function searchService(profileUpdate) {
    return axios.post(cfg.searchApiUrl, profileUpdate).then(res => {
      if (res.data) {
        logger.info(
          `successfull update for ${profileUpdate.userId} to search service`
        );
        return Promise.resolve(profileUpdate);
      } else {
        logger.error(`failed to publish update for ${profileUpdate.userId}`);
        return Promise.reject(
          "Unable to send profile to search service: empty response"
        );
      }
    });
  };
}

export { updateSearch as default };
