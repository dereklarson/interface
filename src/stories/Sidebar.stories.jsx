// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureSidebar} from '@sidebar/Sidebar';

const TestComponent = PureSidebar;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(3, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  location: excitedState.context.location,
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 800};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const basic = () => genStory({});
export const scroll = () => genStory({style: {maxHeight: 500}});
