import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockData } from '../mock-data';
import App from '../App';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature.md');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user has not specified the number of events they want to see', () => {

        });
        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the app should display a list of 32 upcoming events by default', () => {
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(mockData.slice(0, 32).length);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;
        given('the user is viewing a list of events', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('the user specifies the number of events they want to see', () => {
            AppWrapper.find(".nrOfEvents").simulate("change", { target: { value: 1 } });
        });

        then('the app should display that number of upcoming events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });
});