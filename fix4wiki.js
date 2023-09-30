(function () {
	if (!navigator.mozApps) {
		// don't run when not on KaiOS
		return;
	}

	/**
	 * this is literally just a copy of React.createElement
	 * @param tagName {string}
	 * @param attributes {object} Record<string, string>
	 * @param childrens {HTMLElement[]}
	 * @returns
	 */
	function h(tagName, attributes, ...childrens) {
		const el = tagName.startsWith("svg") || (attributes && attributes.svg) ? document.createElementNS("http://www.w3.org/2000/svg", tagName) : document.createElement(tagName);

		if (attributes) {
			for (let [key, value] of Object.entries(attributes)) {
				if (key === "svg") continue;
				if (key === "ref") {
					value(el);
					continue;
				}
				// onclick etc.
				if (key.startsWith("on")) {
					el[key] = value;
				} else el.setAttribute(key, value);
			}
		}

		function append(children) {
			if (children instanceof Node) {
				el.appendChild(children);
			} else if (typeof children === "string") {
				el.appendChild(document.createTextNode(children));
			} else if (Array.isArray(children)) {
				children.forEach(append);
			}
		}

		childrens.forEach(append);

		return el;
	}

	function template(string) {
		const el = h("div");
		el.innerHTML = string;
		return el.firstElementChild;
	}

	let wikiCSS;

	// STYLING
	document.head.appendChild((wikiCSS = h("link", { rel: "stylesheet", href: "/fix4wiki.css" })));

	if (document.querySelector("not-found")) {
		document.body.innerHTML = `<h1>Not Found</h1><p>this page doesn't exist</p><a href="/">Go Home</a>`;
		return;
	}

	const pageEl = document.querySelector("page");

	if (!pageEl) {
		// the page has probably loaded successfully
		return;
	}

	function getMetadata(name) {
		return pageEl.getAttribute(name);
	}

	function getMetadataBase64(name) {
		return JSON.parse(atob(getMetadata(name)));
	}

	// prettier-ignore
	const svgThing=template(`<svg xmlns="http://www.w3.org/2000/svg" class="d-none"><symbol id="svg-link" viewBox="0 0 24 24"><title>Link</title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></symbol><symbol id="svg-menu" viewBox="0 0 24 24"><title>Menu</title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></symbol><symbol id="svg-arrow-right" viewBox="0 0 24 24"><title>Expand</title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></symbol><symbol id="svg-external-link" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><title id="svg-external-link-title">(external link)</title><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></symbol><symbol id="svg-doc" viewBox="0 0 24 24"><title>Document</title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></symbol><symbol id="svg-search" viewBox="0 0 24 24"><title>Search</title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></symbol><symbol id="svg-copy" viewBox="0 0 16 16"><title>Copy</title><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path></svg></symbol><symbol id="svg-copied" viewBox="0 0 16 16"><title>Copied</title><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16"><path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"></path><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"></path></svg></symbol></svg>`)

	// Object.assign(window, { getMetadata, getMetadataBase64 });

	NodeList.prototype.forEach = Array.prototype.forEach;

	wikiCSS.onload = () => {
		const contentEl = document.querySelector("template").content.cloneNode(true);

		// fix table
		contentEl.querySelectorAll(".table").forEach((a) => {
			a.classList.add("table-wrapper");
		});

		// fix blockquote classNames
		contentEl.querySelectorAll(`blockquote[class^="is-"]`).forEach((a) => {
			let result = a.className.replace("is-", "");
			if (result == "info") result = "note";
			if (result == "danger") result = "warning";
			if (result == "warning") result = "highlight";
			a.className = result;
		});

		contentEl.querySelectorAll("pre.prismjs").forEach((b) => {
			/**
			 * @type {HTMLElement}
			 */
			const a = b.cloneNode(true);
			a.className = "highlight";
			a.firstChild.className = "";

			b.parentElement.replaceChild(h("div", { class: "language-plaintext highlighter-rouge" }, h("div", { class: "highlight" }, a)), b);
		});

		// useless anchors
		contentEl.querySelectorAll("a.toc-anchor").forEach((a) => a.remove());

		const content = [
			h("h1", {}, getMetadata("title")), // description
			h("p", {}, getMetadata("description")),
		].concat(...contentEl.firstChild.children);

		const path = getMetadata("path");

		const pathEl =
			path === "home" || !path.includes("/")
				? null
				: h(
						"nav",
						{ class: "breadcrumb-nav", "aria-label": "Breadcrumb" },
						h(
							"ol",
							{ class: "breadcrumb-nav-list" },
							path.split("/").map((a, i, arr) => {
								const isLast = i === arr.length - 1;
								const href = "/" + arr.slice(0, i + 1).join("/");
								return h("li", { class: "breadcrumb-nav-list-item" }, isLast ? h("span", {}, a) : h("a", { href }, a));
							})
						)
				  );

		const sidebar = getMetadataBase64("sidebar");

		let callbackSidebar = () => {};
		let sidebarOpen = false;

		const sidebarEl = h(
			"div",
			{ class: "side-bar" },
			h(
				"div",
				{ class: "site-header", role: "banner" },
				h("a", { href: "/", class: "site-title lh-tight" }, h("div", { class: "site-logo", role: "img", "aria-label": "BananaHackers Wiki" })),
				h(
					"button",
					{
						id: "menu-button",
						ref: (el) => {
							el.onclick = () => {
								el.classList.toggle("nav-open");
								sidebarOpen = el.classList.contains("nav-open");
								callbackSidebar();
							};
						},
						class: "site-button btn-reset",
						"aria-label": "Toggle menu",
						"aria-pressed": "false",
					},
					template(`<svg viewBox="0 0 24 24" class="icon"><use xlink:href="#svg-menu"></use></svg>`)
				)
			),
			h(
				"nav",
				{
					"aria-label": "Main",
					id: "site-nav",
					class: "site-nav",
					ref: (el) => {
						callbackSidebar = () => {
							el.classList[sidebarOpen ? "add" : "remove"]("nav-open");
						};
					},
				},
				h(
					"ul",
					{ class: "nav-list" },
					sidebar.map((a) => {
						const text = a.l;
						if (a.k == "link") {
							return h("li", { class: "nav-list-item" }, h("a", { href: a.t, class: "nav-list-link" }, text));
						}
						if (a.k == "header") {
							return h(
								"li",
								{ class: "nav-list-item" },
								h(
									"small",
									{ class: "nav-list-link", style: `display:block;min-height: 2rem;line-height: 2rem;display:block;min-height: 1rem;line-height: 1rem;pointer-events: none;` },
									text
								)
							);
						}
						if (a.k == "divider") {
							return h("hr", { style: "margin:8px 0" });
						}
					})
				)
			)
		);

		document.body.innerHTML = "";

		document.body.appendChild(svgThing);
		document.body.appendChild(sidebarEl);
		document.body.appendChild(
			h(
				"div",
				{ class: "main" },
				h(
					"div",
					{ class: "main-content-wrap" },
					pathEl, // .
					h(
						"div",
						{ class: "main-content" },
						// .
						h("main", null, content)
					)
				)
			)
		);
	};
})();
