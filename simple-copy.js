/*
 * simple-copy.js 0.4.5
 *
 * Copyright (c) 2019 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (w, d, u) {
    "use strict";

    var selection = w.getSelection(),
        prefix = "data-simplecopy-",
        ignore = "script,noscript,object,link,img";

    function copyWithoutFormat(target)
    {
        var tmpDoc = d.implementation.createHTMLDocument("");
        tmpDoc.body.innerHTML = target.innerHTML;

        for (var j = tmpDoc.querySelectorAll(ignore), i = j.length - 1; i >= 0; i--) {
            var el = j[i];

            if (el && el.parentNode) el.parentNode.removeChild(el);
        }

        copyText(tmpDoc.body.textContent);

        tmpDoc = null;
    }

    function copyElement(target, select, text, node, multiple)
    {
        if (typeof target === "string") {
            try {
                target = d.querySelector(target);
            } catch (ee) {}
        }

        if (!target || target.nodeType !== 1) return;

        var isForm = typeof target.form === "object";

        if (text && !isForm) return copyWithoutFormat(target);

        var range = d.createRange(),
            isEditable = target.isContentEditable,
            hack = !select && !isForm;

        selection.removeAllRanges();

        if (hack) target.contentEditable = node ? "inherit" : true;

        if (isForm && !node) {
            if (select) return selectField(target);

            if (target.nodeName === "SELECT" && multiple) {
                var result, i = 0, values = [], els = target.options, j = els.length;

                for (; i < j; i++) els[i].selected && values.push(els[i].value);

                result = values.join(multiple);
            } else {
                result = target.value;
            }

            return copyText(result);
        } else if (node) {
            range.selectNode(target);
        } else {
            range.selectNodeContents(target);
        }

        selection.addRange(range);

        if (select) return;

        d.execCommand("copy");

        if (hack) target.contentEditable = isEditable ? true : "inherit";

        selection.removeAllRanges();
    }

    function selectField(target)
    {
        target.focus();
        target.select && target.select();
    }

    function copyText(text)
    {
        var docEl = d.scrollingElement ? d.scrollingElement : d.body,
            txt = d.createElement("textarea"),
            x = docEl.scrollLeft,
            y = docEl.scrollTop;

        txt.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;opacity:0";
        txt.value = text;

        d.body.appendChild(txt);

        selectField(txt);

        d.execCommand("copy");

        d.body.removeChild(txt);

        docEl.scrollLeft = x;
        docEl.scrollTop = y;

        docEl = txt = u;
    }

    function attr(el, option, value)
    {
        var data = el.getAttribute(prefix + option);

        return value ? data : data === "true";
    }

    function mainEvents(e)
    {
        if (e.button !== 0) return;

        var target, query, el = e.target, data = attr(el, "data", true);

        if (data) return copyText(data);

        query = attr(el, "target", true);

        if (!query) return;

        target = d.querySelector(query);

        if (!target) return false;

        copyElement(target, attr(el, "select"), attr(el, "text"), attr(el, "node"), attr(el, "multiple", true));
    }

    d.addEventListener("click", mainEvents);

    w.SimpleCopy = {
        "select": function (target, opts) {
            opts = opts || {};

            copyElement(target, true, false, opts.node);
        },
        "copy": function (target, opts) {
            opts = opts || {};

            copyElement(target, false, opts.text, opts.node, opts.multiple);
        },
        "data": copyText
    };
})(window, document);
