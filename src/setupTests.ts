// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createSerializer } from "enzyme-to-json";
import { Plugin } from "pretty-format";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(
  createSerializer({ mode: "deep" }) as unknown as Plugin
);

const noScroll = () => {};

if (typeof window !== "undefined") {
  Object.defineProperty(window, "scrollTo", {
    value: noScroll,
    writable: true,
  });
}
