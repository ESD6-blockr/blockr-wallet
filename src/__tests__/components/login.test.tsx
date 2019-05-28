import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import { configure, mount, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";

import Login from "../../components/login/login";
import User from "../../models/user";

jest.mock("history");

describe("Login component", () => {
    it("renders correctly", () => {
        // TODO: Fix this test out of the scope of this pull request
        const initialState = {
            authentication: { currentUser: new User("public", "private"), isLoading: false },
        };

        const mockStore = configureStore();

        configure({ adapter: new Adapter() });
        const store = mockStore(initialState);
        const container = shallow(
            <Provider store={store}>
                <Login />
            </Provider>,
        ).dive();
        expect(Object.keys(container.props()).length).toEqual(1);
    });
});
