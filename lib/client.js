window.__ModuleLoader__.load({
	id: "dsh-matrix-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region src/client/matrix-tokens.ts
		/** Theme id: the `setTheme` argument and the toggle's selection key. */
		const THEME_ID = "matrix";
		/** Primary phosphor green (brand accent, interactive fills, success). */
		const GREEN$1 = "rgb(0, 255, 65)";
		/** Pressed/secondary green (hovering one step below the primary). */
		const GREEN_DIM = "rgb(0, 209, 66)";
		/** Bright green (primary-fill hover, trailing highlights). */
		const GREEN_BRIGHT = "rgb(77, 255, 132)";
		/** Primary text: near-white phosphor green. */
		const TEXT = "rgb(198, 255, 213)";
		/** Secondary text. */
		const TEXT_SECONDARY = "rgb(102, 197, 132)";
		/** Tertiary text. */
		const TEXT_TERTIARY = "rgb(73, 153, 99)";
		/** Caption text. */
		const TEXT_CAPTION = "rgb(56, 120, 78)";
		/** Pure black (inverted text on brand fills). */
		const BLACK = "rgb(0, 0, 0)";
		/** Green-black surface ramp, darkest first. */
		const BG_0 = "rgb(0, 8, 3)";
		const BG_1 = "rgb(0, 13, 4)";
		const BG_2 = "rgb(0, 20, 7)";
		const BG_3 = "rgb(0, 27, 9)";
		const BG_4 = "rgb(0, 33, 12)";
		/** The registered matrix theme definition. */
		const MATRIX_THEME = {
			id: THEME_ID,
			colorScheme: "dark",
			tokens: {
				"--dsw-alias-bg-base": "transparent",
				"--dsw-alias-bg-layer-1": BG_1,
				"--dsw-alias-bg-layer-2": BG_2,
				"--dsw-alias-bg-layer-3": BG_3,
				"--dsw-alias-bg-module-platform": BG_3,
				"--dsw-alias-bg-multi-select": BG_2,
				"--dsw-alias-bg-overlay": BG_4,
				"--dsw-alias-bg-skeleton": "rgba(0, 255, 65, 0.08)",
				"--dsw-alias-bg-mask-1": "rgba(0, 0, 0, 0.5)",
				"--dsw-alias-bg-mask-2": "rgba(0, 0, 0, 0.2)",
				"--dsw-alias-bg-mask-3": "rgba(0, 0, 0, 0.48)",
				"--dsw-alias-bg-mask-photo": "rgba(0, 0, 0, 0.88)",
				"--dsw-alias-bg-mask-drop": "rgba(0, 13, 4, 0.7)",
				"--dsw-alias-border-l1": "rgba(0, 255, 65, 0.1)",
				"--dsw-alias-border-l2": "rgba(0, 255, 65, 0.22)",
				"--dsw-alias-border-l2-darkmode-thin": "rgba(0, 255, 65, 0.1)",
				"--dsw-alias-border-l3": "rgba(0, 255, 65, 0.32)",
				"--dsw-alias-border-l4": "rgba(0, 255, 65, 0.42)",
				"--dsw-alias-border-inverted": "rgba(0, 255, 65, 0.1)",
				"--dsw-alias-border-inverted2": "rgba(0, 255, 65, 0.14)",
				"--dsw-alias-brand-primary": GREEN$1,
				"--dsw-alias-brand-primary-invert": BLACK,
				"--dsw-alias-brand-text": GREEN$1,
				"--dsw-alias-brand-primary-new-colorprimary-new-color": GREEN$1,
				"--dsw-alias-button-primary-fill": GREEN$1,
				"--dsw-alias-button-primary-hover": GREEN_BRIGHT,
				"--dsw-alias-button-primary-dimmed": BG_1,
				"--dsw-alias-button-contrast-fill": GREEN$1,
				"--dsw-alias-button-elevated-fill": BG_2,
				"--dsw-alias-button-floating-fill": BG_1,
				"--dsw-alias-button-floating-hover": BG_3,
				"--dsw-alias-button-ghost-active-fill": BG_3,
				"--dsw-alias-button-ghost-active-hover": BG_2,
				"--dsw-alias-button-ghost-active-border": GREEN_DIM,
				"--dsw-alias-button-info-fill": GREEN_DIM,
				"--dsw-alias-button-info-hover": GREEN$1,
				"--dsw-alias-button-tool-bar-fill-invisible": "rgba(0, 255, 65, 0.1)",
				"--dsw-alias-button-tool-bar-fill": "rgba(0, 255, 65, 0.14)",
				"--dsw-alias-button-tool-bar-hover": "rgba(0, 255, 65, 0.2)",
				"--dsw-alias-interactive-bg-hover": "rgba(0, 255, 65, 0.06)",
				"--dsw-alias-interactive-bg-hover-solid": BG_3,
				"--dsw-alias-interactive-bg-hover-accent": "rgba(0, 255, 65, 0.12)",
				"--dsw-alias-interactive-bg-hover-danger": "rgba(255, 82, 82, 0.15)",
				"--dsw-alias-interactive-bg-active": "rgba(0, 255, 65, 0.1)",
				"--dsw-alias-label-primary": TEXT,
				"--dsw-alias-label-primary-bluish": TEXT,
				"--dsw-alias-label-primary-dimmed": GREEN_BRIGHT,
				"--dsw-alias-label-primary-foreground": BLACK,
				"--dsw-alias-label-primary-inverted": BG_3,
				"--dsw-alias-label-secondary": TEXT_SECONDARY,
				"--dsw-alias-label-tertiary": TEXT_TERTIARY,
				"--dsw-alias-label-caption": TEXT_CAPTION,
				"--dsw-alias-label-dimmed": BG_4,
				"--dsw-alias-markdown-code-block": BG_0,
				"--dsw-alias-markdown-code-block-banner": BG_1,
				"--dsw-alias-markdown-code-segment-selected": BG_3,
				"--dsw-alias-markdown-code-segment-unselected": BG_0,
				"--dsw-alias-markdown-inline-code": BG_1,
				"--dsw-alias-markdown-placeholder": BG_1,
				"--dsw-alias-markdown-tag": BG_1,
				"--dsw-alias-markdown-citation": BG_3,
				"--dsw-alias-scrollbar-bg-l1": "rgb(0, 60, 20)",
				"--dsw-alias-scrollbar-bg-l2": "rgb(0, 90, 30)",
				"--dsw-alias-scrollbar-hover-l1": "rgb(0, 100, 34)",
				"--dsw-alias-scrollbar-hover-l2": "rgb(0, 120, 40)",
				"--dsw-alias-state-business-primary": GREEN$1,
				"--dsw-alias-state-business-tertiary": BG_2,
				"--dsw-alias-state-error-primary": "rgb(255, 82, 82)",
				"--dsw-alias-state-error-secondary": "rgb(255, 130, 130)",
				"--dsw-alias-state-success-primary": GREEN$1,
				"--dsw-alias-state-success-secondary": GREEN_BRIGHT,
				"--dsw-alias-state-success-tertiary": BG_2,
				"--dsw-alias-state-warn-primary": "rgb(255, 190, 60)",
				"--dsw-alias-state-warn-secondary": "rgb(255, 220, 120)",
				"--dsw-alias-state-warn-tertiary": BG_2,
				"--dsw-alias-state-warn-label": "rgb(255, 200, 80)",
				"--dsw-alias-toast-bg": BG_2,
				"--dsw-alias-tooltip-bg": BG_3,
				"--dsw-specific-bubble": BG_1,
				"--dsw-specific-bubble-highlight": BG_3,
				"--dsw-specific-input-major": BG_1,
				"--dsw-specific-login-input": BG_0,
				"--dsw-specific-menu": BG_3,
				"--dsw-specific-selector": BG_2,
				"--dsw-specific-sidebar-fill": BG_0,
				"--dsw-specific-sidebar-nav-item-active": BG_3,
				"--dsw-specific-sidebar-nav-item-active-accent": BG_4,
				"--dsw-specific-sidebar-nav-item-hover": BG_1,
				"--dsw-specific-tip": BG_3
			}
		};
		//#endregion
		//#region src/client/store.ts
		/**
		* Matrix theme mirror store: a projection of the theme service snapshot that
		* the toggle row and the rain overlay share. The plugin's apply-world
		* `theme/change` listener is the only writer; components read through
		* props.useStore. One handle serves both slot entries (the renderer binds
		* each entry's actions to the same underlying store).
		*/
		/**
		* Declares the matrix mirror state and write surface.
		* @returns the store handle.
		*/
		function createMatrixThemeStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					preference: false,
					active: false,
					revision: -1
				}),
				actions: { sync: (d, preference, active, revision) => {
					if (revision <= d.revision) return;
					d.preference = preference;
					d.active = active;
					d.revision = revision;
				} }
			});
		}
		//#endregion
		//#region ../deepseek-harness/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region \0dsh-css:/home/rey/github/dsh-matrix-theme/src/client/MatrixRow.module.css.mjs
		const css$1 = ".Gk7Z5q_group{border-bottom:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:8px;padding:16px 0;display:flex}.Gk7Z5q_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}.Gk7Z5q_toggle{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:12px;align-items:center;gap:8px;padding:4px;font-size:14px;line-height:22px;display:flex}.Gk7Z5q_knob{box-sizing:border-box;background:var(--dsw-alias-label-secondary);width:16px;height:16px;transition:background var(--ds-transition-duration-slow) var(--ds-ease-in-out);border-radius:8px}.Gk7Z5q_toggle.Gk7Z5q_on .Gk7Z5q_knob{background:var(--dsw-alias-state-success-primary)}.Gk7Z5q_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}";
		const tagId$1 = "dsh-matrix-theme/MatrixRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-matrix-theme";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var MatrixRow_module_css_default = {
			"knob": "Gk7Z5q_knob",
			"on": "Gk7Z5q_on",
			"group": "Gk7Z5q_group",
			"title": "Gk7Z5q_title",
			"toggle": "Gk7Z5q_toggle"
		};
		//#endregion
		//#region src/client/MatrixRow.tsx
		/**
		* Matrix theme preference row registered into the General section item slot
		* directly under the Appearance row: title + one switch toggle. Selection
		* follows the persisted preference (never the resolved active theme) and
		* mirrors the Appearance row's structure; switching on remembers the
		* previous preference in the apply closure and restores it when switched
		* off. Copy rides the standard locale seat.
		*/
		/**
		* Render the Matrix theme row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function MatrixRow({ t, setMatrix, useStore }) {
			const on = useStore((s) => s.preference);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: MatrixRow_module_css_default.group,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: MatrixRow_module_css_default.title,
					children: t("matrix.title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "switch",
					"aria-checked": on,
					className: clsx(MatrixRow_module_css_default.toggle, on && MatrixRow_module_css_default.on),
					onClick: () => {
						setMatrix(!on);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: MatrixRow_module_css_default.knob,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: MatrixRow_module_css_default.state,
						children: t(on ? "matrix.on" : "matrix.off")
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/rain-engine.ts
		/**
		* The digital-rain background engine: a requestAnimationFrame loop painting
		* the glyph wall from https://github.com/zengrz/zengrz.github.io
		* (js/matrix3d.js + js/util.js) as the matrix theme's backdrop. This is a
		* faithful port of that page's live effect, so the backdrop IS that rain:
		*
		* - every frame fills the canvas with opaque black, then draws a full-height
		*   grid of glyph columns (hiragana/katakana/hangul) at the canvas default
		*   font — the reference never assigns a font to the wall glyphs;
		* - each glyph has a small per-frame chance of being replaced (churn), and
		*   glyphs inside the cursor spotlight radius — or on the column's marching
		*   "selected" cell — draw white at a smaller serif size;
		* - every column carries a depth z in [-DELTA_Z, DELTA_Z]; its glyphs draw
		*   with alpha (z + DELTA_Z) / (2 * DELTA_Z), so nearer columns read brighter;
		* - the cursor's per-event deltas tilt every column around the canvas center
		*   (the reference's 3D rotation; z-axis rotation is a no-op there and is
		*   omitted here), deltas reset after each frame.
		*
		* The upstream falling `DropText` characters are commented out in the
		* reference's own loop and are not part of its live effect, so this port
		* draws only the column wall. The engine owns the rAF lifetime, the cursor
		* listener, and the per-resize rebuild; the component owns construction,
		* activation, resize forwarding, and disposal.
		*/
		const FONT_SIZE = 20;
		/** Marked (spotlighted/selected) glyphs draw white at this smaller size. */
		const MARKED_FONT_SIZE = 15;
		/**
		* Plain glyphs draw at this font — the canvas default. The reference never
		* assigns a font to its wall glyphs, so they render at the default; the port
		* names it so the wall font is pinned instead of implicit.
		*/
		const DEFAULT_FONT = "10px sans-serif";
		/** Glyph alphabet: hiragana, katakana, and hangul (the reference's exact sets). */
		const GLYPHS = "あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをんアイウエオカキクケコガギグゲゴサシスセソザジズゼゾタチツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲンㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘ";
		/** Column depth range: z in [-DELTA_Z, DELTA_Z] maps to alpha 0..1. */
		const DELTA_Z = 90;
		/** Per-frame cursor-delta rotation amplitude (the reference's constant). */
		const AMPLITUDE = 1e-5;
		/** Cursor spotlight radius in px. */
		const SPOTLIGHT_RADIUS = 50;
		/** Per-frame probability that one glyph is replaced with a fresh one. */
		const CHURN_PROBABILITY = .99;
		/** Green glyph color template (the reference's rgba(0, 255, 0, alpha)). */
		const GREEN = "rgba(0, 255, 0, ";
		/** White glyph color template (the reference's rgba(255, 255, 255, alpha)). */
		const WHITE = "rgba(255, 255, 255, ";
		/** Background fill: the reference's opaque black page. */
		const BACKGROUND = "#000";
		/** Pick one glyph from the alphabet. */
		function randomGlyph() {
			return GLYPHS.charAt(Math.floor(Math.random() * 162));
		}
		/**
		* Depth-based opacity for a column z in [-DELTA_Z, DELTA_Z] (the reference's
		* `getAlpha`): nearer columns draw brighter, the farthest fade to zero.
		* @param z - column depth.
		* @returns the column opacity in [0, 1].
		*/
		function depthAlpha(z) {
			return (z + DELTA_Z) / (2 * DELTA_Z);
		}
		/**
		* Rotate a point around the X axis through the canvas center (the reference's
		* rotateXAxis).
		* @param x - point x.
		* @param y - point y.
		* @param z - point z.
		* @param cy - center y.
		* @param angle - rotation angle in radians.
		* @returns the rotated [x, y, z].
		*/
		function rotateXAxis(x, y, z, cy, angle) {
			const dy = y - cy;
			const dz = z;
			const y1 = dy * Math.cos(angle) - dz * Math.sin(angle);
			const z1 = dy * Math.sin(angle) + dz * Math.cos(angle);
			return [
				x,
				y1 + cy,
				z1
			];
		}
		/**
		* Rotate a point around the Y axis through the canvas center (the reference's
		* rotateYAxis).
		* @param x - point x.
		* @param y - point y.
		* @param z - point z.
		* @param cx - center x.
		* @param angle - rotation angle in radians.
		* @returns the rotated [x, y, z].
		*/
		function rotateYAxis(x, y, z, cx, angle) {
			const dx = x - cx;
			const dz = z;
			const x1 = dz * Math.sin(angle) + dx * Math.cos(angle);
			const z1 = dz * Math.cos(angle) - dx * Math.sin(angle);
			return [
				x1 + cx,
				y,
				z1
			];
		}
		/** The digital-rain background engine; one instance per mounted backdrop canvas. */
		var RainEngine = class {
			canvas;
			ctx;
			/** Per-column state, rebuilt on every resize (the reference's semantics). */
			columns = [];
			frame = null;
			/** Cursor position and per-event deltas for the tilt and the spotlight. */
			cursorX = 0;
			cursorY = 0;
			cursorDx = 0;
			cursorDy = 0;
			cursorSet = false;
			/**
			* @param canvas - the backdrop canvas; a null 2D context (jsdom without the
			* canvas backend) leaves the engine inert rather than throwing.
			*/
			constructor(canvas) {
				this.canvas = canvas;
				this.ctx = canvas.getContext("2d");
			}
			/** Start the animation loop and the cursor listener; a second start while running is a no-op. */
			start() {
				if (this.ctx === null || this.frame !== null) return;
				this.layout();
				window.addEventListener("mousemove", this.onMouseMove);
				this.frame = requestAnimationFrame(this.step);
			}
			/** Rebuild the columns after the canvas box changed size. */
			resize() {
				if (this.ctx === null) return;
				this.layout();
			}
			/** Stop the animation loop and the cursor listener (the component's teardown path). */
			dispose() {
				if (this.frame !== null) {
					cancelAnimationFrame(this.frame);
					this.frame = null;
				}
				window.removeEventListener("mousemove", this.onMouseMove);
			}
			/** Track the cursor: store the per-event delta for the frame's tilt and the position for the spotlight. */
			onMouseMove = (event) => {
				this.cursorDx += event.clientX - this.cursorX;
				this.cursorDy += event.clientY - this.cursorY;
				this.cursorX = event.clientX;
				this.cursorY = event.clientY;
			};
			/** Recompute the canvas backing size and rebuild the full column grid. */
			layout() {
				const width = this.canvas.clientWidth;
				const height = this.canvas.clientHeight;
				this.canvas.width = width;
				this.canvas.height = height;
				if (!this.cursorSet) {
					this.cursorX = width / 2;
					this.cursorY = height / 2;
					this.cursorSet = true;
				}
				const columns = new Array(Math.floor(width / FONT_SIZE));
				const rows = Math.floor(height / FONT_SIZE);
				for (let i = 0; i < columns.length; i += 1) columns[i] = {
					x: i * FONT_SIZE,
					y: height / 2,
					z: -90 + 2 * DELTA_Z * Math.random(),
					glyphs: Array.from({ length: rows }, randomGlyph).join(""),
					selected: 0,
					moveDelay: Math.floor(Math.random() * 10) + 1,
					delay: 0
				};
				this.columns = columns;
			}
			/** One animation frame: draw, then schedule the next. */
			step = () => {
				this.draw();
				this.frame = requestAnimationFrame(this.step);
			};
			/** Paint the opaque background, tilt and redraw every column, then settle the cursor deltas. */
			draw() {
				const ctx = this.ctx;
				/* v8 ignore next -- start() gates the loop on a non-null context, so draw can only run with one */
				if (ctx === null) return;
				const { width, height } = this.canvas;
				ctx.fillStyle = BACKGROUND;
				ctx.fillRect(0, 0, width, height);
				ctx.textBaseline = "top";
				const cx = width / 2;
				const cy = height / 2;
				const thetaX = AMPLITUDE * this.cursorDy * Math.PI * 2;
				const thetaY = AMPLITUDE * this.cursorDx * Math.PI * 2;
				for (const column of this.columns) {
					[column.x, column.y, column.z] = rotateXAxis(column.x, column.y, column.z, cy, thetaX);
					[column.x, column.y, column.z] = rotateYAxis(column.x, column.y, column.z, cx, thetaY);
					const alpha = depthAlpha(column.z);
					for (let step = 0; step < column.glyphs.length; step += 1) {
						if (Math.random() > CHURN_PROBABILITY) column.glyphs = column.glyphs.slice(0, step) + randomGlyph() + column.glyphs.slice(step + 1);
						const x = column.x;
						const y = column.y + step * FONT_SIZE - cy;
						const marked = Math.hypot(this.cursorX - x, this.cursorY - y) < SPOTLIGHT_RADIUS || column.selected === step;
						ctx.fillStyle = marked ? `${WHITE}${alpha})` : `${GREEN}${alpha})`;
						ctx.font = marked ? `${MARKED_FONT_SIZE}px serif` : DEFAULT_FONT;
						ctx.fillText(column.glyphs.charAt(step), x, y);
					}
					if (column.delay === column.moveDelay) {
						column.selected = (column.selected + 1) % column.glyphs.length;
						column.delay = 0;
					}
					column.delay += 1;
				}
				this.cursorDx = 0;
				this.cursorDy = 0;
			}
		};
		//#endregion
		//#region \0dsh-css:/home/rey/github/dsh-matrix-theme/src/client/MatrixRain.module.css.mjs
		const css = ".APYvqq_layer{pointer-events:none;position:absolute;inset:0;overflow:hidden}.APYvqq_canvas{width:100%;height:100%;display:block}.APYvqq_veil{background:#00000080;position:absolute;inset:0}";
		const tagId = "dsh-matrix-theme/MatrixRain.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-matrix-theme";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var MatrixRain_module_css_default = {
			"layer": "APYvqq_layer",
			"veil": "APYvqq_veil",
			"canvas": "APYvqq_canvas"
		};
		//#endregion
		//#region src/client/MatrixRain.tsx
		/**
		* The ambient digital-rain backdrop: a frame-wide, click-through entry in
		* the `shell.backdrop` list slot that renders only while the resolved active
		* theme is matrix. The backdrop layer sits BELOW every column, so the rain
		* never paints over content; a translucent veil stacked above the canvas
		* inside this entry is the layer between the app content and the glyphs,
		* dimming the rain wherever the theme's surfaces are translucent or
		* transparent. The entry owns nothing but the canvas and the RainEngine
		* lifetime — activation, resize forwarding, and disposal ride the component
		* effects; the active fact arrives through the shared mirror store.
		*
		* Under `prefers-reduced-motion: reduce` the entry renders nothing at all
		* (decorative motion is skipped entirely rather than frozen).
		*/
		/** Whether the environment asks for reduced motion (missing matchMedia = no). */
		function prefersReducedMotion() {
			return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		/**
		* Render the rain canvas under its translucent veil, or nothing while matrix
		* is inactive or motion is reduced.
		* @param props - composed slot props.
		* @returns the backdrop element tree.
		*/
		function MatrixRain({ useStore }) {
			const active = useStore((s) => s.active);
			const [reduced] = (0, react.useState)(prefersReducedMotion);
			const canvasRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (!active || reduced) return;
				const canvas = canvasRef.current;
				/* v8 ignore next -- active renders the canvas in the same commit, so the ref is attached by effect time */
				if (canvas === null) return;
				const engine = new RainEngine(canvas);
				engine.start();
				const onResize = () => {
					engine.resize();
				};
				window.addEventListener("resize", onResize);
				return () => {
					window.removeEventListener("resize", onResize);
					engine.dispose();
				};
			}, [active, reduced]);
			if (!active || reduced) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: MatrixRain_module_css_default.layer,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: MatrixRain_module_css_default.canvas,
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: MatrixRain_module_css_default.veil,
					"aria-hidden": "true"
				})]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `matrix` namespace dictionaries (the Matrix toggle row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"matrix.title": "矩阵主题",
			"matrix.on": "已开启",
			"matrix.off": "已关闭"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"matrix.title": "Matrix theme",
			"matrix.on": "On",
			"matrix.off": "Off"
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "matrix";
		/**
		* Whether the persisted preference is the matrix theme id. The preference
		* union declares only the built-in ids, but the theme service stores any
		* registered id verbatim (its own `setTheme` widens the union the same way),
		* so the read is a string comparison.
		* @param preference - the persisted preference from a theme snapshot.
		*/
		const isMatrixPreference = (preference) => preference === THEME_ID;
		/** Required services: theme (register + snapshots), slots, and copy. */
		const inject = [
			"slots",
			"theme",
			"locale"
		];
		/**
		* Client plugin body: theme registration, dictionary, mirror store, and the
		* two slot entries.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-matrix-theme: dictionaries");
			const store = createMatrixThemeStore();
			let bound;
			let restoreTo;
			const sync = (snapshot) => {
				bound?.sync(isMatrixPreference(snapshot.preference), snapshot.active.id === THEME_ID, snapshot.revision);
			};
			ctx.effect(() => ctx.on("theme/change", sync), "ui-matrix-theme: theme sync");
			ctx.effect(() => ctx.theme.register(MATRIX_THEME), "ui-matrix-theme: theme registration");
			const rowInject = (actions) => {
				bound = actions;
				sync(ctx.theme.getTheme());
				return { setMatrix: (on) => {
					const preference = ctx.theme.getTheme().preference;
					if (on) {
						if (!isMatrixPreference(preference)) restoreTo = preference;
						ctx.theme.setTheme(THEME_ID);
					} else ctx.theme.setTheme(restoreTo ?? "system");
				} };
			};
			const rainInject = (actions) => {
				bound = actions;
				sync(ctx.theme.getTheme());
				return {};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "matrix",
				order: 11,
				store,
				locale: NS,
				inject: rowInject
			}, MatrixRow));
			ctx.slots.inject("shell.backdrop", () => ctx.slots.register({
				name: "shell.backdrop",
				id: "matrix-rain",
				order: 0,
				store,
				inject: rainInject
			}, MatrixRain));
			//#endregion
			//#region src/client/dom-backdrop.ts
			/**
			* Direct-DOM fallback backdrop for harnesses that predate the `shell.backdrop`
			* slot: mounts a fixed, click-through canvas behind the app root, driving
			* the same RainEngine, and tears itself down if the slot is later declared.
			*/
			function mountDomBackdrop(ctx) {
				if (prefersReducedMotion()) return () => {};
				const layer = document.createElement("div");
				layer.setAttribute("aria-hidden", "true");
				layer.style.cssText = "position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden";
				const canvas = document.createElement("canvas");
				canvas.style.cssText = "width:100%;height:100%;display:block";
				const veil = document.createElement("div");
				veil.setAttribute("aria-hidden", "true");
				veil.style.cssText = "position:absolute;inset:0;background:#00000080";
				layer.append(canvas, veil);
				document.body.prepend(layer);
				const promoted = document.createElement("style");
				promoted.textContent = "body > #root{position:relative;z-index:1}";
				document.head.append(promoted);
				let engine = null;
				const sync = () => {
					const active = ctx.theme.getTheme().active.id === THEME_ID;
					if (active && engine === null) { engine = new RainEngine(canvas); engine.start(); }
					else if (!active && engine !== null) { engine.dispose(); engine = null; }
				};
				sync();
				const offTheme = ctx.on("theme/change", sync);
				const onResize = () => { engine?.resize(); };
				window.addEventListener("resize", onResize);
				return () => {
					window.removeEventListener("resize", onResize);
					offTheme();
					engine?.dispose();
					layer.remove();
					promoted.remove();
				};
			}
			//#endregion
			// Fallback for harnesses that predate the `shell.backdrop` slot: the inject
			// above is a deferred wait that never fires when the slot is undeclared, so
			// the rain is silently dropped. After synchronous boot settles (setTimeout
			// 0), check whether the slot was declared; if not, mount a fixed canvas
			// behind the app root driving the same RainEngine.
			ctx.effect(() => {
				let disposed = false;
				let fallbackDispose;
				const timer = setTimeout(() => {
					if (disposed || ctx.slots.spec("shell.backdrop") !== undefined) return;
					fallbackDispose = mountDomBackdrop(ctx);
				}, 0);
				return () => {
					disposed = true;
					clearTimeout(timer);
					fallbackDispose?.();
				};
			}, "ui-matrix-theme: dom fallback backdrop");
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map