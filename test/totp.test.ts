import { createTOTP, countdown } from "../src/index";

const secret = "abcd1234";
const epoch = 1663172706;

test("createTOTP w/ valid secret", () =>
  expect(createTOTP(secret, epoch)).toBe("511484"));

test("createTOTP w/ invalid secret key", () =>
  expect(createTOTP("asdf")).toBe("invalid secret"));

test("createTOTP w/ invalid secret key and custom err msg", () =>
  expect(createTOTP("asdf", undefined, "bad secret")).toBe("bad secret"));

test("countdown", () => expect(countdown(epoch)).toBe(24));
