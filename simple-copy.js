/*
 * simple-copy.js 0.5.1
 *
 * Copyright (c) 2020 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (u) {
    "use strict";

    var w = typeof window !== "undefined" ? window : {},
        d = w.document || {},
        $ = w.jQuery,
        selection = w.getSelection(),
        tmpBody = d.implementation.createHTMLDocument("").body,
        prefix = "data-simplecopy-",
        ignore = "script,noscript,object,link,img,[simple-copy-ignore=true]";

    function isInvisible(el)
    {
        return (
            el.hasAttribute("simple-copy-ignore") !== "true" &&
            !el.offsetWidth &&
            !el.offsetHeight &&
            !el.getClientRects().length
        );
    }

    function copyWithoutFormat(target)
    {
        var els = target.getElementsByTagName("*"),
            restore = [];

        for (var i = els.length - 1; i >= 0; i--) {
            var el = els[i];

            if (isInvisible(el)) {
                el.setAttribute("simple-copy-ignore", "true");
                restore.push(el);
            }
        }

        tmpBody.innerHTML = target.innerHTML;

        for (var i = restore.length - 1; i >= 0; i--) {
            restore[i].removeAttribute("simple-copy-ignore");
        }

        restore = u;

        for (var j = tmpDoc.querySelectorAll(ignore), i = j.length - 1; i >= 0; i--) {
            var el = j[i];

            if (el && el.parentNode) el.parentNode.removeChild(el);
        }

        return copyText(tmpBody.textContent);
    }

    function copyElement(target, select, text, node, multiple)
    {
        if (typeof target === "string") {
            try {
                target = d.querySelector(target);
            } catch (ee) {
                return false;
            }
        }

        if (!target || target.nodeType !== 1) return false;

        var isForm = typeof target.form === "object";

        if (text && !isForm) return copyWithoutFormat(target);

        var range = d.createRange(),
            hack = !select && !isForm,
            isEditable = target.isContentEditable;

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

        var response = d.execCommand("copy");

        if (hack) target.contentEditable = isEditable ? true : "inherit";

        selection.removeAllRanges();

        target.blur();

        return response;
    }

    function selectField(target)
    {
        target.focus();
        target.select && target.select();
    }

    function copyText(text)
    {
        var docEl = d.scrollingElement || d.body,
            txt = d.createElement("textarea"),
            x = docEl.scrollLeft,
            y = docEl.scrollTop;

        txt.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;opacity:0";
        txt.value = text;

        d.body.appendChild(txt);

        selectField(txt);

        var response = d.execCommand("copy");

        d.body.removeChild(txt);

        docEl.scrollLeft = x;
        docEl.scrollTop = y;

        docEl = txt = u;

        return response;
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

        if (data) {
            tmpBody.innerHTML = data;

            copyElement(tmpBody, false, true);
        } else {
            query = attr(el, "target", true);

            if (!query) return;

            target = d.querySelector(query);

            if (!target) return false;

            copyElement(target, attr(el, "select"), attr(el, "text"), attr(el, "node"), attr(el, "multiple", true));
        }
    }

    d.addEventListener("click", mainEvents);

    var main = {
        "select": function (target, opts) {
            opts = opts || {};

            return copyElement(target, true, false, opts.node);
        },
        "copy": function (target, opts) {
            opts = opts || {};

            return copyElement(target, false, opts.text, opts.node, opts.multiple);
        },
        "data": copyText
    };

    if ($ && $.extend) {
        $.fn.simpleCopy = function (opts) {
            var target = this[0];

            if (!target) return;

            if (!opts) opts = {};

            if (opts.type === u) action = "copy";

            if (action === "copy" || action === "select") main[action](target, opts);
        };
    }

    w.SimpleCopy = main;

    // CommonJS
    if (typeof module !== "undefined" && module.exports) module.exports = main;

    // RequireJS
    if (typeof define !== "undefined") define(function () { return main; });
})();
