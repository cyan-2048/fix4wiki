// this is needed because esbuild es6 transpiled code requires it
Object.getOwnPropertyDescriptors ||= function getOwnPropertyDescriptors(obj) {
	if (obj === null || obj === undefined) {
		throw new TypeError("Cannot convert undefined or null to object");
	}

	const protoPropDescriptor = Object.getOwnPropertyDescriptor(obj, "__proto__");
	const descriptors = protoPropDescriptor ? { ["__proto__"]: protoPropDescriptor } : {};

	for (let name of Object.getOwnPropertyNames(obj)) {
		descriptors[name] = Object.getOwnPropertyDescriptor(obj, name);
	}

	return descriptors;
};

NodeList.prototype.forEach ||= Array.prototype.forEach;

if (navigator.mozApps) {
	// run only when on KaiOS
	const script = document.createElement("script");
	script.src = "/fix4wiki.js";
	document.head.appendChild(script);
}
