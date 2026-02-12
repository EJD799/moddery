const textComponentColors = {
    "black": "#000000",
    "dark_blue": "#0000AA",
    "dark_green": "#00AA00",
    "dark_aqua": "#00AAAA",
    "dark_red": "#AA0000",
    "dark_purple": "#AA00AA",
    "gold": "#FFAA00",
    "gray": "#AAAAAA",
    "dark_gray": "#555555",
    "blue": "#5555FF",
    "green": "#55FF55",
    "aqua": "#55FFFF",
    "red": "#FF5555",
    "light_purple": "#FF55FF",
    "yellow": "#FFFF55",
    "white": "#FFFFFF"
};

let currentColorPicker = null;
let currentEditorInstance = null;
let savedRange = null;


function bindTextComponentEditor(editorDiv, textarea) {
    if (!editorDiv || !textarea) return;

    /* -----------------------------
       Toolbar creation
    ------------------------------ */
    const toolbar = document.createElement("div");
    toolbar.className = "textComponentToolbar";

    const buttons = [
        { icon: "fa-bold", cmd: "bold" },
        { icon: "fa-italic", cmd: "italic" },
        { icon: "fa-underline", cmd: "underline" },
        { icon: "fa-strikethrough", cmd: "strikeThrough" },
        { icon: "fa-hashtag", cmd: "obfuscate" },
        { icon: "fa-palette", cmd: "color" } // placeholder
    ];

    const buttonMap = new Map();

    buttons.forEach(({ icon, cmd }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "button is-white toolbarBtn";
        btn.innerHTML = `<i class="fas ${icon}"></i>`;

        if (cmd == "color") {
            btn.classList.add("defaultBorder");
        }

        btn.addEventListener("mousedown", e => e.preventDefault());

        btn.addEventListener("click", () => {
            editorDiv.focus();

            if (cmd === "obfuscate") {
                toggleObfuscation();
                syncToTextarea();
                updateToolbarState();
                return;
            }

            if (cmd === "color") {
                editorDiv.focus();

                currentColorPicker = btn;
                currentEditorInstance = editorDiv;
                textColorPickerCard.classList.remove("toolbarHidden");
                positionToolbar(textColorPickerCard, btn);

                const currentColor = getCurrentTextColor() || "#FFFFFF";

                textColorPicker.value = currentColor;
                textColorHex.value = currentColor.toUpperCase();
                btn.style.borderColor = currentColor;

                const selection = window.getSelection();
                if (selection.rangeCount) {
                    savedRange = selection.getRangeAt(0).cloneRange();
                }

                return;
            }

            document.execCommand(cmd, false, null);
            syncToTextarea();
            updateToolbarState();
        });

        toolbar.appendChild(btn);
        buttonMap.set(cmd, btn);
    });

    editorDiv.parentNode.insertBefore(toolbar, editorDiv);

    /* -----------------------------
       Obfuscation logic
    ------------------------------ */
    function toggleObfuscation() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return;

        let container = range.commonAncestorContainer;
        if (container.nodeType === Node.TEXT_NODE) {
            container = container.parentNode;
        }

        const existing = container.closest?.('[data-obfuscated="true"]');

        if (existing) {
            // unwrap
            const parent = existing.parentNode;
            while (existing.firstChild) {
                parent.insertBefore(existing.firstChild, existing);
            }

            const newRange = document.createRange();
            newRange.setStartBefore(parent.childNodes[0]);
            newRange.setEndAfter(parent.childNodes[parent.childNodes.length - 1]);

            existing.remove();

            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            // wrap (safe)
            const span = document.createElement("span");
            span.setAttribute("data-obfuscated", "true");

            try {
                const contents = range.extractContents();
                span.appendChild(contents);
                range.insertNode(span);
            } catch (err) {
                console.warn("Obfuscation wrap failed:", err);
                return;
            }

            const newRange = document.createRange();
            newRange.selectNodeContents(span);

            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }

    /* -----------------------------
       Sync logic
    ------------------------------ */
    const syncFromTextarea = () => {
        editorDiv.innerHTML = textarea.value ?? "";
    };

    const syncToTextarea = () => {
        textarea.value = editorDiv.innerHTML;
    };

    /* -----------------------------
       Toolbar state sync
    ------------------------------ */
    function setButtonState(btn, active) {
        btn.classList.toggle("is-primary", active);
        btn.classList.toggle("is-white", !active);
    }

    function updateToolbarState() {
        setButtonState(buttonMap.get("bold"), document.queryCommandState("bold"));
        setButtonState(buttonMap.get("italic"), document.queryCommandState("italic"));
        setButtonState(buttonMap.get("underline"), document.queryCommandState("underline"));
        setButtonState(buttonMap.get("strikeThrough"), document.queryCommandState("strikeThrough"));

        // obfuscation state
        const selection = window.getSelection();
        let obfActive = false;
        if (selection.rangeCount) {
            let node = selection.getRangeAt(0).commonAncestorContainer;
            if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
            obfActive = !!node.closest?.('[data-obfuscated="true"]');
        }
        setButtonState(buttonMap.get("obfuscate"), obfActive);
    }

    /* -----------------------------
       Editor setup
    ------------------------------ */
    editorDiv.setAttribute("contenteditable", "true");
    editorDiv.setAttribute("data-gramm", "false");
    editorDiv.setAttribute("data-gramm_editor", "false");
    editorDiv.setAttribute("spellcheck", "false");

    editorDiv.addEventListener("input", () => {
        syncToTextarea();
        updateToolbarState();
    });

    editorDiv.addEventListener("keyup", updateToolbarState);
    editorDiv.addEventListener("mouseup", updateToolbarState);
    editorDiv.addEventListener("blur", syncToTextarea);

    syncFromTextarea();
    updateToolbarState();

    /* -----------------------------
       Expose helpers
    ------------------------------ */
    editorDiv._syncFromTextarea = syncFromTextarea;
    editorDiv._syncToTextarea = syncToTextarea;
    editorDiv._updateToolbarState = updateToolbarState;

    function getCurrentTextColor() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;

        let node = selection.getRangeAt(0).commonAncestorContainer;
        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }

        // Look for styled span first
        const colored = node.closest?.("span[style*='color']");
        if (colored) {
            return rgbToHex(getComputedStyle(colored).color);
        }

        return rgbToHex(getComputedStyle(node).color);
    }
}

document.addEventListener("selectionchange", () => {
    if (!currentEditorInstance) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // Ignore selections outside editor
    if (!currentEditorInstance.contains(range.commonAncestorContainer)) return;

    // ✅ FIX: Always keep savedRange fresh
    savedRange = range.cloneRange();

    // If color picker isn't open, stop here
    if (!currentColorPicker) return;

    const color = getCurrentTextColorSafe(currentEditorInstance) || "#FFFFFF";

    currentColorPicker.style.borderColor = color;
    textColorPicker.value = color;
    textColorHex.value = color;
});

function getCurrentTextColorSafe(editorDiv) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    let node = selection.getRangeAt(0).commonAncestorContainer;

    if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode;
    }

    if (!editorDiv.contains(node)) return null;

    const colored = node.closest?.("span[style*='color']");
    if (colored) {
        return rgbToHex(getComputedStyle(colored).color);
    }

    return rgbToHex(getComputedStyle(node).color);
}


function applyTextColor(color) {
    if (!currentEditorInstance) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);

    // Restore saved range only if selection is outside editor
    if (savedRange && !currentEditorInstance.contains(range.commonAncestorContainer)) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
        range = selection.getRangeAt(0);
    }

    currentEditorInstance.focus();

    if (range.collapsed) {
        // Insert colored span at caret
        const span = document.createElement("span");
        span.style.color = color;
        span.textContent = "\u200B"; // zero-width space

        range.insertNode(span);

        // Move caret inside span
        range = document.createRange();
        range.setStart(span.firstChild, 1);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        document.execCommand("foreColor", false, color);
    }

    currentEditorInstance._syncToTextarea?.();
    currentEditorInstance._updateToolbarState?.();
}



textColorPicker.addEventListener("change", function () {
    const color = textColorPicker.value.toUpperCase();
    textColorHex.value = color;
    currentColorPicker.style.borderColor = color;

    applyTextColor(color);
});

textColorHex.addEventListener("change", function () {
    const color = textColorHex.value.toUpperCase();
    textColorPicker.value = color;
    currentColorPicker.style.borderColor = color;

    applyTextColor(color);
});

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return null;

    return "#" + result
        .map(x => parseInt(x).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
}

textColorPicker.addEventListener("mousedown", e => e.preventDefault());

document.addEventListener("DOMContentLoaded", function() {
    let colors = Object.keys(textComponentColors);
    for (let i = 0; i < colors.length; i++) {
        let swatch = document.createElement("button");
        swatch.classList.add("button");
        swatch.classList.add("textColorPickerSwatch");
        swatch.style.background = textComponentColors[colors[i]];
        swatch.addEventListener("mousedown", e => e.preventDefault());
        swatch.addEventListener("click", () => selectSwatch(colors[i]));
        textColorPickerCard.appendChild(swatch);

        if (((i + 1) % 4 === 0) && (i + 1) != colors.length) {
            textColorPickerCard.appendChild(document.createElement("br"));
        }
    }
});

function selectSwatch(color) {
    textColorPicker.value = textComponentColors[color];

    const hexCode = textColorPicker.value.toUpperCase();
    textColorHex.value = hexCode;
    currentColorPicker.style.borderColor = hexCode;

    applyTextColor(textComponentColors[color]);
}