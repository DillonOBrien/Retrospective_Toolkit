import React from "react";
import { shallow } from "enzyme";
import AuthLandingPage from "../../pages/AuthLandingPage";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<AuthLandingPage />);
});

describe("Pages/AuthLandingPage Testing", () => {
  // Snapshot for PageNotFound
  test("SNAPSHOT: AuthLandingPage", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
