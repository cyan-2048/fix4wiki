import autoprefixer from "autoprefixer";
import esbuild from "esbuild";
import postcss from "postcss";
import scssSyntax from "postcss-scss";
import postcssImports from "postcss-import";
import postcssSass from "@csstools/postcss-sass";

const text = await Bun.file("src/index.js").text();

const result = await esbuild.transform(text, {
	loader: "ts",
	minify: true,
	target: "es6",
});

Bun.write("dist/fix4wiki.min.js", result.code);

esbuild.build({
	entryPoints: ["src/main.tsx"],
	bundle: true,
	minify: true,
	target: "es6",
	outfile: "dist/fix4wiki.js",
});

const CSS_FILE = "src/style/index.scss";

const css_result = await postcss([autoprefixer, postcssImports, postcssSass]).process(await Bun.file(CSS_FILE).text(), {
	syntax: scssSyntax,
	from: CSS_FILE,
});

const minified_css = await esbuild.transform(css_result.css, {
	minify: true,
	loader: "css",
});

Bun.write("dist/fix4wiki.css", minified_css.code);
