import * as React from "react";
import * as renderer from "react-test-renderer";

import Login from "../../components/login/login";

jest.mock("history");

describe("Login component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Login />);
        const treeJson = tree.toJSON();
        expect(tree).not.toBeNull();
    });
});
