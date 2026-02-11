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
                textColorPickerCard.classList.remove("toolbarHidden");
                positionToolbar(textColorPickerCard, btn);
                console.log("Color picker clicked");
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
            // wrap
            const span = document.createElement("span");
            span.setAttribute("data-obfuscated", "true");

            range.surroundContents(span);

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
}
