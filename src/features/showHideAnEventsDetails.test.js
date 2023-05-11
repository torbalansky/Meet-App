import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mount } from "enzyme";
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature.md');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('the user is viewing a list of events', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('the user sees an event element', () => {
            expect(AppWrapper.find('.event').at(0)).toHaveLength(1);
        });

        then('the event element should be collapsed by default', () => {
            expect(AppWrapper.find('.event__Details').at(0)).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;
        given('the user is viewing a collapsed event element', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event').at(0)).toHaveLength(1);
            expect(AppWrapper.find('.event__Details').at(0)).toHaveLength(0);
        });

        when('the user clicks on the “Show details” button', () => {
            AppWrapper.find(".event button").at(0).simulate("click");
        });

        then('the event element should expand, displaying the event details', () => {
            expect(AppWrapper.find('.event__Details').at(0)).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppWrapper;
        given('the user is viewing an expanded event element', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find(".event button").at(0).simulate("click");
            expect(AppWrapper.find('.event__Details').at(0)).toHaveLength(1);
        });

        when('the user clicks on the “Hide details” button', () => {
            AppWrapper.find(".event button").at(0).simulate("click");
        });

        then('the event element should collapse, hiding the event details', () => {
            expect(AppWrapper.find('.event__Details').at(0)).toHaveLength(0);
        });
    });
});