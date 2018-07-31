const TEST_CONFIG = {
  port: 8080,
  shutdownTimeout: 10,
  cisUpdateUrl: "http://localhost/",
  cisStatusUrl: "http://localhost/",
  cisStatusTimeout: 10,
  cisStatusRetryDelay: 2,
  cisStatusRetryCount: 3,
  personApiUrl: "http://localhost/",
  orgchartApiUrl: "http://localhost/",
  searchApiUrl: "http://localhost/"
};

Object.freeze(TEST_CONFIG);

export { TEST_CONFIG };
