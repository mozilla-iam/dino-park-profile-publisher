import winston from "winston";
import convict from "convict";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});

const SCHEMA = {
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port"
  },
  shutdownTimeout: {
    doc: "Grace period after SIGINT/SIGTERM.",
    format: "duration",
    default: 1000,
    env: "SHUTDOWN_TIMEOUT"
  },
  cisUpdateUrl: {
    doc: "Endpoint for publishing profile updates to CIS.",
    format: "url",
    default: null,
    env: "CIS_UPDATE_URL"
  },
  cisStatusUrl: {
    doc: "Endpoint for polling a profile update status from CIS.",
    format: "url",
    default: null,
    env: "CIS_STATUS_URL"
  },
  personApiUrl: {
    doc: "Endpoint for fetching a profile.",
    format: "url",
    default: null,
    env: "PERSON_API_URL"
  },
  cisStatusTimeout: {
    doc: "Timeout for a profile update to traverse the pipe.",
    format: "duration",
    default: 1000,
    env: "CIS_STATUS_TIMEOUT"
  },
  cisStatusRetryDelay: {
    doc: "Delay between retries to get a positive status from CIS.",
    format: "duration",
    default: 100,
    env: "CIS_STATUS_RETRY_COUNT"
  },
  cisStatusRetryCount: {
    doc: "Numer of retries to get a positive status from CIS.",
    format: "nat",
    default: 10,
    env: "CIS_STATUS_RETRY_COUNT"
  },
  orgchartApiUrl: {
    doc: "Endpoint for publishing a profile to the orgchart service.",
    format: "url",
    default: null,
    env: "ORGCHART_API_URL"
  },
  searchApiUrl: {
    doc: "Endpoint for publishing a profile to the search service.",
    format: "url",
    default: null,
    env: "SEARCH_API_URL"
  }
};

const CONFIG = convict(SCHEMA);

function load(configFile) {
  try {
    if (configFile) {
      CONFIG.loadFile(configFile);
    }
    CONFIG.validate();
    return CONFIG.getProperties();
  } catch (e) {
    throw new Error(`error reading config: ${e}`);
  }
}

export { load, logger };
