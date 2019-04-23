import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';
import Application from './components/Application';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
    module.hot.accept('./components/Application', () => {
        import('./components/Application').then(Application => {
            render(Application.default);
            render(Application.default);
        });
    });
}
