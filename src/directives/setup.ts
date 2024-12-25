import { type App, type Directive } from 'vue';

import * as directivesList from './modules';

export const setupDirectives = (app: App) => {
	Object.keys(directivesList).forEach((key) => {
		app.directive(key, (directivesList as { [key: string]: Directive })[key]);
	});
};
