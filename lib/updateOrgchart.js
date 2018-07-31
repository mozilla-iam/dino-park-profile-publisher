import axios from "axios";

import { logger } from "./config";

function updateOrgchart(cfg) {
  return async function orgchartService(profileUpdate) {
    return axios.post(cfg.orgchartApiUrl, profileUpdate).then(res => {
      if (res.data) {
        logger.info(
          `successfull update for ${profileUpdate.userId} to orgchart service`
        );
        return Promise.resolve(profileUpdate);
      } else {
        logger.error(`failed to publish update for ${profileUpdate.userId}`);
        return Promise.reject(
          "Unable to send profile to orgchart service: empty response"
        );
      }
    });
  };
}

export { updateOrgchart as default };
