import {components} from '../view/index.js';

const changeView = (container,navegador) => {
	container.innerHTML= ''
	navegador.innerHTML= ''
	let { hash } = location;
	switch (hash) {
		case '':
		case '#':
		case '#/': {
			container.append(components.welcome());
			break;
		}
		case '#/signIn': {
			container.append(components.signIn());
			break;
		}
		case '#/signUp': {
			container.append(components.signUp());
			break;
		}
		case '#/home': {
			navegador.append(components.nav());
			container.append(components.timeline());
			break;
		}
		case '#/profile': {
			navegador.append(components.nav());
			container.append(components.profile());
			break;
		}
		case '#/update-profile': {
			container.append(components.updateUser());
			break;
		}
		default:
		return container.append(components.different());
	}
};

export {changeView};
