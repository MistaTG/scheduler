import reducer from "reducers/application";

import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Reducer", () => {
  it("throws an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
