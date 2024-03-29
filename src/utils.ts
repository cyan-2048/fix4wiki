type Attributes = Record<string, string | Function | boolean> & {
	ref?: (el: HTMLElement) => void;
	svg?: boolean;
} & Partial<GlobalEventHandlers>;

type AllowedChildren = string | Node | AllowedChildren[];

const FragmentElement = Symbol("h.Fragment");

export function h(
	tagName: string,
	attributes?: Attributes,
	...childrens: AllowedChildren[]
): HTMLElement;
export function h(
	tagName: typeof FragmentElement,
	attributes?: Attributes,
	...childrens: AllowedChildren[]
): DocumentFragment;
export function h(
	tagName: string | typeof FragmentElement,
	attributes?: Attributes,
	...childrens: AllowedChildren[]
): DocumentFragment | HTMLElement | Element {
	const el =
		tagName === FragmentElement
			? document.createDocumentFragment()
			: document.createElement(tagName);
	const isFrag = el instanceof DocumentFragment;

	if (!isFrag && attributes) {
		for (let [key, value] of Object.entries(attributes)) {
			if (key === "ref") {
				(value as Function)(el);
				continue;
			}

			if (key === "svg") continue;

			if (key in el) {
				el[key] = value;
			} else if (typeof value == "string") el.setAttribute(key, value);
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

	if (!isFrag && tagName === "svg") {
		// i don't think there's a better way to do it... quite slow but it seems like it's the only option
		return template(el.outerHTML);
	}

	return el;
}

h.Fragment = FragmentElement;

export async function loadCSS(url: string) {
	const style = h("link", { rel: "stylesheet", href: url }) as any as HTMLStyleElement;
	document.head.appendChild(style);
	return new Promise((resolve, reject) => {
		style.onload = resolve;
		style.onerror = reject;
	});
}

export function template<T extends Element = Element>(string: string) {
	const el = h("div");
	el.innerHTML = string;
	return el.firstElementChild as T;
}

const array_slice = [].slice;

export function $<K extends Element = Element>(
	selector: string,
	el: Element | Document | DocumentFragment = document
) {
	return array_slice.call(el.querySelectorAll<K>(selector)) as Array<K>;
}

export function $$<K extends Element = Element>(
	selector: string,
	el: Element | Document | DocumentFragment = document
) {
	return el.querySelector<K>(selector);
}
