// We need to add polyfills, so import them here
import "regenerator-runtime/runtime";

import ReteEditor from './ReteEditor';
import components from './components'; // FIXME: How do we do lazy loading?

// Create a Rete Editor for this session
const rete_editor = new ReteEditor();
rete_editor.start();

// Add all of the components to the dropdown menu and register them with the engine / editor
components.forEach(component => {
	let instance = new component();
	rete_editor.register(instance);

	let button_id = component.name;
	let button_group = component.get_group();

	document.getElementById(button_id).onclick = async () => {
		let node = await instance.createNode();
		rete_editor.addNode(node);
	}
});

// Add handlers to + button
const btn = document.getElementById('tool_btn');
btn.onclick = () => {
	let state = btn.dataset.toggle;
	let menu = document.getElementsByClassName('tool_menu');

	if (state == 'open') {
		btn.dataset.toggle = 'closed';

		for (let i = 0; i != menu.length; ++i) {
			let as_element = <HTMLElement>menu[i];

			as_element.style.display = "none";
		}

		btn.innerHTML = "<i class=\"material-icons\">add</i>";
	} else {
		btn.dataset.toggle = 'open';

		for(let i = 0; i != menu.length; ++i) {
			let as_element = <HTMLElement>menu[i];

			as_element.style.display = "block";

			// FIXME: All of this can be done with CSS
			if (i == 0) {
				as_element.style.left = '100px';
			} else {
				// console.log(menu[i-1].style.left + menu[i].offsetWidth);
				let last_as_element = <HTMLElement>menu[i - 1];

				as_element.style.left = (parseInt(last_as_element.style.left, 10) + last_as_element.offsetWidth + 15) + 'px';
			}
		}

		btn.innerHTML= "<i class=\"material-icons\">keyboard_arrow_left</i>";
	}
}

// Add handler to clear button
const clear_button = document.getElementById("clr_btn");
clear_button.onclick = () => {
	rete_editor.clear();
}