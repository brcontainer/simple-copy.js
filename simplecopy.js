/*
 * SimpleCopy.js 0.4.1
 *
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (w, d) {
    "use strict";

    var tmp, m = w.Element && w.Element.prototype,
        prefix = "data-simplecopy-",
        selection = w.getSelection(),
        docEl = d.documentElement;

    function copyElement(target, select, text, node, multiple)
    {
        var isForm = typeof target.form === "object";

        if (text && !isForm) {
            return copyText(target.textContent);
        }

        var range = d.createRange(),
            isEditable = target.isContentEditable,
            hack = !select && !isForm;

        selection.removeAllRanges();

        if (hack) target.contentEditable = node ? "inherit" : true;

        if (isForm && !node) {
            if (select) {
                target.select && target.select();
                return target.focus();
            }

            if (target.nodeName === "SELECT" && multiple) {
                var result, i = 0, values = [], els = target.options, j = els.length;

                for (; i < j; i++) {
                    if (els[i].selected) values.push(els[i].value);
                }

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

    function copyText(text)
    {
        var x = docEl.scrollLeft,
            y = docEl.scrollTop;

        tmp = tmp || d.createElement("textarea");
        tmp.value = text;

        d.documentElement.scrollLeft;

        d.body.appendChild(tmp);

        tmp.focus();
        tmp.select && tmp.select();

        d.execCommand("copy");
        d.body.removeChild(tmp);

        docEl.scrollLeft = x;
        docEl.scrollTop = y;
    }

    function attr(el, option, value)
    {
        return value ? el.getAttribute(prefix + option) : el.matches('[' + prefix + option + '="true"]');
    }

    function mainEvents(e)
    {
        if (e.button !== 0) return;

        var target, query, el = e.target, data = attr(el, "data", true);

        if (data) return copyText( data );

        query = attr(el, "target", true);

        if (!query) return;

        target = d.querySelector( query );

        if (!target) return false;

        copyElement(target, attr(el, "select"), attr(el, "text"), attr(el, "node"), attr(el, "multiple", true));
    }

    d.addEventListener("click", mainEvents);

    w.SimpleCopy = {
        "select": function (target, opts) {
            copyElement(target, true, false, opts.node);
        },
        "copy": function (target, opts) {
            opts = opts || {};
            copyElement(target, false, opts.text, opts.node, opts.multiple);
        },
        "data": copyText
    };

    if (!m || m.matches) return;

    m.matches = m.matchesSelector || m.mozMatchesSelector || m.msMatchesSelector ||
    m.oMatchesSelector || m.webkitMatchesSelector || function(s) {
        var m = (this.document || this.ownerDocument).querySelectorAll(s), i = m.length;

        while (--i >= 0 && m[i] !== this);
        return i > -1;
    };
})(window, document);
