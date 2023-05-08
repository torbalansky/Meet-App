import React from "react";
import Event from "../Event";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
    let EventWrapper;
    let event;

    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test("render event div", () => {
        expect(EventWrapper.find(".event")).toHaveLength(1);
    });

    test("render event information elements", () => {
        expect(EventWrapper.find(".event h2")).toHaveLength(1);
        expect(EventWrapper.find(".event p")).toHaveLength(2);
        expect(EventWrapper.find(".event button")).toHaveLength(1);
    });

    test("render correct event title", () => {
        expect(EventWrapper.find(".event h2").at(0).text()).toBe(event.summary);
    });

    test("render correct event time", () => {
        expect(EventWrapper.find(".event p").at(0).text()).toBe(new Date(event.start.dateTime).toString());
    });

    test("render correct event location", () => {
        expect(EventWrapper.find(".event p").at(1).text()).toBe(event.location);
    });

    test("render correct button text", () => {
        expect(EventWrapper.find(".event button").at(0).text()).toBe("show details");
    });

    test("change show details button text on click", () => {
        EventWrapper.find(".event button").at(0).simulate("click");
        expect(EventWrapper.find(".event button").at(0).text()).toBe("hide details");
        EventWrapper.find(".event button").at(0).simulate("click");
        expect(EventWrapper.find(".event button").at(0).text()).toBe("show details");
    });

    test("show details on click show details button", () => {
        EventWrapper.find(".event button").at(0).simulate("click");
        expect(EventWrapper.find(".event h3")).toHaveLength(1);
        expect(EventWrapper.find(".event a")).toHaveLength(1);
        expect(EventWrapper.find(".event p")).toHaveLength(3);
        expect(EventWrapper.find(".event h3").at(0).text()).toBe("About Event:");
        expect(EventWrapper.find(".event a").at(0).text()).toBe("See details on Google Calendar");
        expect(EventWrapper.find(".event a").at(0).prop("href")).toBe(event.htmlLink);
        expect(EventWrapper.find(".event p").at(2).text()).toBe(event.description);
        EventWrapper.find(".event button").at(0).simulate("click");
    });

    test("hide details", () => {
        EventWrapper.find(".event button").at(0).simulate("click");
        EventWrapper.find(".event button").at(0).simulate("click");
        expect(EventWrapper.find(".event h3").exists()).toBeFalsy();
        expect(EventWrapper.find(".event a").exists()).toBeFalsy();
        expect(EventWrapper.find(".event p").at(2).exists()).toBeFalsy();
    })
});