/*
 * SimpleCopy.js 0.3.0
 *
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (w, d) {
    "use strict";

    var tmp, m = w.Element && w.Element.prototype,
        prefix = "data-simplecopy-",
        selection = w.getSelection();

    function copyElement(target, select, text, content, multiple)
    {
        if (typeof target.labels === "object") {
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
        } else if (text) {
            return copyText(target.textContent);
        }

        var range = d.createRange(), forceEdit = !select && !target.isContentEditable;

        selection.removeAllRanges();

        if (target.isContentEditable || content) {
            /* Hack for prevent Firefox bug */
            if (forceEdit) target.contentEditable = true;

            range.selectNodeContents(target);
        } else {
            range.selectNode(target);
        }

        selection.addRange(range);

        if (select) return;

        d.execCommand("copy");

        if (forceEdit) target.contentEditable = false;

        selection.removeAllRanges();
    }

    function copyText(text)
    {
        tmp = tmp || d.createElement("textarea");
        tmp.value = text;

        d.body.appendChild(tmp);

        tmp.focus();
        tmp.select && tmp.select();

        d.execCommand("copy");
        selection.removeAllRanges();

        d.body.removeChild(tmp);
    }

    function attr(el, option, value)
    {
        return value ? el.getAttribute(prefix + option) : el.matches('[' + prefix + option + '="true"]');
    }

    function mainEvents(e)
    {
        if (e.button !== 0) return;

        var target, query, el = e.target, data = attr(el, 'data', true);

        if (data) return copyText( data );

        query = attr(el, 'target', true);

        if (!query) return;

        target = d.querySelector( query );

        if (!target) return false;

        copyElement(target, attr(el, 'select'), attr(el, 'text'), attr(el, 'content'), attr(el, 'multiple', true));
    }

    d.addEventListener("click", mainEvents);

    w.SimpleCopy = {
        "select": function (target, opts) {
            copyElement(target, true);
        },
        "copy": function (target, opts) {
            opts = opts || {};
            copyElement(target, opts.select, opts.text, opts.content, opts.multiple);
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
