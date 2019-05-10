import * as React from "react";
import * as renderer from "react-test-renderer";

import Login from "../../src/components/login/Login";

describe("Login component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
