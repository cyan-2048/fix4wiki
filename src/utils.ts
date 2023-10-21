type Attributes = Record<string, string | Function | boolean> & { ref?: (el: HTMLElement) => void } & Partial<GlobalEventHandlers>;

type AllowedChildren = string | Node | AllowedChildren[];

export function h(tagName: string, attributes?: Attributes, ...childrens: AllowedChildren[]): Element {
	const el = document.createElement(tagName);

	if (attributes) {
		for (let [key, value] of Object.entries(attributes)) {
			if (key === "ref") {
				(value as Function)(el);
				continue;
			}
			// onclick etc.
			if (key.startsWith("on")) {
				el[key] = value;
			} else if (typeof value == "string") el.setAttribute(key, value as string);
			else if (value) el[key] = value;
		}
	}

	function append(children: any) {
		if (children instanceof Node) {
			el.appendChild(children);
		} else if (typeof children === "string") {
			el.appendChild(document.createTextNode(children));
		} else if (Array.isArray(children)) {
			children.forEach(append);
		}
	}

	childrens.forEach(append);

	if (tagName === "svg") {
		// i don't think there's a better way to do it... quite slow but it seems like it's the only option
		return template(el.outerHTML);
	}

	return el;
}

export async function loadCSS(url: string) {
	const style = h("link", { rel: "stylesheet", href: url }) as any as HTMLStyleElement;
	document.head.appendChild(style);
	return new Promise((resolve, reject) => {
		style.onload = resolve;
		style.onerror = reject;
	});
}

export function template(string: string) {
	const el = h("div");
	el.innerHTML = string;
	return el.firstElementChild;
}
