import { loadCSS, h, template } from "./utils";

const svgThing = (
	<svg style="display:none" xmlns="http://www.w3.org/2000/svg" class="d-none">
		<symbol id="svg-menu" viewBox="0 0 24 24">
			<title>Menu</title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-menu"
			>
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="18" x2="21" y2="18"></line>
			</svg>
		</symbol>
		{/*
		<symbol id="svg-link" viewBox="0 0 24 24">
			<title>Link</title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-link"
			>
				<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
				<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
			</svg>
		</symbol>

		<symbol id="svg-arrow-right" viewBox="0 0 24 24">
			<title>Expand</title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"
			>
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</symbol>
		<symbol
			id="svg-external-link"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-external-link"
		>
			<title id="svg-external-link-title">(external link)</title>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
			<polyline points="15 3 21 3 21 9"></polyline>
			<line x1="10" y1="14" x2="21" y2="3"></line>
		</symbol>
		<symbol id="svg-doc" viewBox="0 0 24 24">
			<title>Document</title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-file"
			>
				<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
				<polyline points="13 2 13 9 20 9"></polyline>
			</svg>
		</symbol>
		<symbol id="svg-search" viewBox="0 0 24 24">
			<title>Search</title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-search"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
		</symbol>
		<symbol id="svg-copy" viewBox="0 0 16 16">
			<title>Copy</title>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
				<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
				<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
			</svg>
		</symbol>
		<symbol id="svg-copied" viewBox="0 0 16 16">
			<title>Copied</title>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
				<path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"></path>
				<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"></path>
			</svg>
		</symbol>
		*/}
	</svg>
);

async function main() {
	if (document.querySelector("not-found")) {
		document.body.innerHTML = `<h1>Not Found</h1><p>this page doesn't exist</p><a href="/">Go Home</a>`;
		return;
	}

	document.body.className = "fix";

	const pageEl = document.querySelector("page");
	if (!pageEl) return;

	function getMetadata(name: string) {
		return pageEl.getAttribute(name);
	}

	function getMetadataBase64(name: string) {
		return JSON.parse(atob(getMetadata(name)));
	}

	const cssLoading = loadCSS("/fix4wiki.css");

	const contentEl = document.querySelector("template").content.cloneNode(true) as HTMLElement;

	// fix blockquote classNames
	// contentEl.querySelectorAll(`blockquote[class^="is-"]`).forEach((a) => {
	// 	let result = a.className.replace("is-", "");
	// 	if (result == "info") result = "note";
	// 	if (result == "danger") result = "warning";
	// 	if (result == "warning") result = "highlight";
	// 	a.className = result;
	// });

	// fix table
	contentEl.querySelectorAll(".table").forEach((a) => {
		a.querySelectorAll("td").forEach((b) => {
			b.setAttribute("style", "");
		});
	});

	/*
	// FIND BETTER SOLUTION
	contentEl.querySelectorAll("pre.prismjs").forEach((b) => {
		
		const a = b.cloneNode(true) as HTMLElement;
		a.className = "highlight";
		(a.firstChild as HTMLElement).className = "";

		b.parentElement.replaceChild(
			<div class="language-plaintext highlighter-rouge">
				<div class="highlight">{a}</div>
			</div>,
			b
		);
});
	*/

	// useless anchors
	contentEl.querySelectorAll("a.toc-anchor").forEach((a) => a.remove());

	const content = [<h1>{getMetadata("title")}</h1>, <p>{getMetadata("description")}</p>].concat(
		Array.from(contentEl.firstElementChild.children)
	);

	const path = getMetadata("path");

	const pathEl =
		path === "home" || !path.includes("/") ? null : (
			<nav class="breadcrumb-nav" aria-label="Breadcrumb">
				<ol class="breadcrumb-list">
					{path.split("/").map((a, i, arr) => {
						const isLast = i === arr.length - 1;
						const href = "/" + arr.slice(0, i + 1).join("/");
						return (
							<li class="breadcrumb-item">{isLast ? <span>{a}</span> : <a href={href}>{a}</a>}</li>
						);
					})}
				</ol>
			</nav>
		);

	const sidebar = getMetadataBase64("sidebar");

	let callbackSidebar = () => {};
	let sidebarOpen = false;

	const sidebarEl = (
		<div class="sidebar">
			<div class="site-header" role="banner">
				<a href="/" class="site-title">
					<div class="site-logo" role="img" aria-label="BananaHackers Wiki"></div>
				</a>
				<button
					id="menu-button"
					class="site-button"
					aria-label="Toggle menu"
					aria-pressed="false"
					ref={(el) => {
						el.onclick = () => {
							el.classList.toggle("nav-open");
							sidebarOpen = el.classList.contains("nav-open");
							callbackSidebar();
						};
					}}
				>
					<svg viewBox="0 0 24 24" class="icon">
						<use xlink:href="#svg-menu"></use>
					</svg>
				</button>
			</div>
			<nav
				aria-label="Main"
				id="site-nav"
				class="site-nav"
				ref={(el) => {
					callbackSidebar = () => {
						el.classList[sidebarOpen ? "add" : "remove"]("nav-open");
					};
				}}
			>
				<ul class="nav-list">
					{sidebar.map((a) => {
						const text = a.l;
						if (a.k == "link") {
							return (
								<li class="nav-list-item">
									<a href={a.t} class="nav-list-link">
										{text}
									</a>
								</li>
							);
						}
						if (a.k == "header") {
							return (
								<li class="nav-list-item">
									<small
										class="nav-list-link"
										style={`display:block;min-height: 2rem;line-height: 2rem;display:block;min-height: 1rem;line-height: 1rem;pointer-events: none;`}
									>
										{text}
									</small>
								</li>
							);
						}
						if (a.k == "divider") {
							return <hr style="margin:8px 0" />;
						}
					})}
				</ul>
			</nav>
		</div>
	);

	document.body.innerHTML = "";

	const mainEl = (
		<div class="main">
			<div class="content0-wrap">
				{pathEl}
				<div class="content0">
					<main>{content}</main>
				</div>
			</div>
		</div>
	);

	await cssLoading;

	document.body.appendChild(svgThing);
	document.body.appendChild(sidebarEl);
	document.body.appendChild(mainEl);

	// this behavior should only be allowed in specific pages
	if (["/w2d", "/en/w2d"].includes(location.pathname))
		document.querySelectorAll("pre.is-script").forEach((a) => {
			// @ts-ignore
			eval(a.innerText);
		});
}

main();
