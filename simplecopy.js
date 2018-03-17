/*
 * SimpleCopy.js 0.0.1
 *
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (w, d, u) {
    "use strict";

    var m = w.Element && w.Element.prototype,
        isField = /^(input|textarea)$/i,
        prefix = "data-simplecopy-",
        tmp;

    function selectDOM(target, copy)
    {
        var range = d.createRange(),
            selection = w.getSelection();

        range.selectNode(target);

        selection.removeAllRanges();
        selection.addRange(range);

        if (!copy) return;

        d.execCommand("copy");
        selection.removeAllRanges();
    }

    function selectField(target, copy)
    {
        target.focus();
        target.select();

        if (!copy) return;

        d.execCommand("copy");
        w.getSelection().removeAllRanges();
    }

    function choose(target, copy)
    {
        if (typeof target === "string") target = d.querySelector(target);

        if (!target) return;

        if (isField.test(target.nodeName)) {
            selectField(target, copy);
        } else {
            selectDOM(target, copy);
        }
    }

    function simpleCopyEvents(e)
    {
        if (e.button !== 0) return;

        var targetQuery, target, select, el = e.target;

        if (el.matches('[' + prefix + 'text]')) {
            return copyText(el.getAttribute(prefix + 'text'));
        }

        if (!el.matches('[' + prefix + 'target]')) return;

        targetQuery = el.getAttribute(prefix + 'target');
        select = el.getAttribute(prefix + 'select');
        target = d.querySelector(targetQuery);

        if (!target) return false;

        choose(target, select === "true" ? false : true);
    }

    function copyText(text)
    {
        tmp = tmp || d.createElement("textarea");
        tmp.value = text;

        d.body.appendChild(tmp);

        selectField(tmp, true);

        d.body.removeChild(tmp);
    }

    d.addEventListener("click", simpleCopyEvents);

    w.SimpleCopy = {
        "select": function (target) {
            choose(target, false);
        },
        "copy": function (target) {
            choose(target, true);
        },
        "text": copyText
    };

    if (!m || m.matches) return;

    m.matches = m.matchesSelector || m.mozMatchesSelector || m.msMatchesSelector ||
    m.oMatchesSelector || m.webkitMatchesSelector || function(s) {
        var m = (this.document || this.ownerDocument).querySelectorAll(s), i = m.length;

        while (--i >= 0 && m[i] !== this);
        return i > -1;
    };
})(window, document);
