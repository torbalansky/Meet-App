import React from "react";
import NumberOfEvents from "../NumberOfEvents";
import { shallow } from "enzyme";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test("render text input", () => {
        expect(NumberOfEventsWrapper.find(".nrOfEvents")).toHaveLength(1);
    });

    test("renders text input correctly", () => {
        const query = NumberOfEventsWrapper.state("query");
        expect(NumberOfEventsWrapper.find(".nrOfEvents").prop("value")).toBe(query);
    });

    test("default value is 32", () => {
        expect(NumberOfEventsWrapper.state("query")).toBe(32);
    });

    test("change state when text input changes", () => {
        NumberOfEventsWrapper.setState({ query: 10 });
        NumberOfEventsWrapper.find(".nrOfEvents").simulate("change", { target: { value: 5 } });
        expect(NumberOfEventsWrapper.state("query")).toBe(5);
    })
});