import { promisify } from "util";
import fs from "fs";

import { validateConfig, load, int, url } from "../lib/config";
import { TEST_CONFIG } from "./configs";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import mock from "mock-fs";
import tmp from "tmp";
import { doesNotReject } from "assert";

chai.use(chaiAsPromised);
chai.should();

describe("Everything configy", () => {
  describe("config validation", () => {
    it("validate valid config", () => {
      return validateConfig(TEST_CONFIG).should.be.deep.equal(TEST_CONFIG);
    });

    it("error on empty config", () => {
      return (() => validateConfig({})).should.throw(
        Error,
        /malformed.*missing/
      );
    });

    it("error on null port", () => {
      return (() => validateConfig({ port: null })).should.throw(
        Error,
        /should/
      );
    });
  });

  describe("config validation", () => {
    afterEach(() => {
      mock.restore();
    });

    it("validate valid config", done => {
      tmp.file((_, path, fd) =>
        promisify(fs.write)(fd, JSON.stringify(TEST_CONFIG))
          .then(() => load(path).should.eventually.be.deep.equal(TEST_CONFIG))
          .then(() => done())
          .catch(e => done(e))
      );
    });

    it("error on empty config", done => {
      tmp.file((_, path, fd) =>
        promisify(fs.write)(fd, JSON.stringify({}))
          .then(() => load(path).should.be.rejected)
          .then(() => done())
          .catch(e => done(e))
      );
    });
  });

  describe("validation", () => {
    it("int", () => {
      (() => int("foo")).should.throw();
      (() => int(2)).should.not.throw();
    });

    it("url", () => {
      (() => url("http://foo.bar")).should.not.throw();
      (() => url("foo.com")).should.throw();
      (() => url(2)).should.throw();
    });
  });
});
