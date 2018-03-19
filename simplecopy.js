/*
 * SimpleCopy.js 0.2.0
 *
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (w, d) {
    "use strict";

    var m = w.Element && w.Element.prototype,
        prefix = "data-simplecopy-",
        isInput = /^(input|textarea)$/i,
        tmp;

    function copyDOMText(target, multiple)
    {
        var result = '';

        if (typeof target.labels === "object") {
            if (target.nodeName === "SELECT" && target.multiple && multiple) {
                for (var i = 0, values = [], els = target.options, j = els.length; i < j; i++) {
                    if (els[i].selected) values.push(els[i].value);
                }

                result = values.join(multiple);
            } else {
                result = target.value;
            }
        } else {
            result = target.textContent;
        }

        result && copyText(result);
    }

    function selectDOM(target, copy)
    {
        var selection = w.getSelection(),
            range = d.createRange();

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
        target.select && target.select();

        if (!copy) return;

        d.execCommand("copy");
        w.getSelection().removeAllRanges();
    }

    function choose(target, copy)
    {
        if (typeof target === "string") target = d.querySelector(target);

        if (!target) return;

        if (copy && isInput.test(target.nodeName)) {
            copyText(target.value);
        } else {
            selectDOM(target, copy);
        }
    }

    function simpleCopyEvents(e)
    {
        if (e.button !== 0) return;

        var targetQuery, target, el = e.target;

        if (el.matches('[' + prefix + 'data]')) {
            return copyText(el.getAttribute(prefix + 'data'));
        }

        if (!el.matches('[' + prefix + 'target]')) return;

        targetQuery = el.getAttribute(prefix + 'target');
        target = d.querySelector(targetQuery);

        if (!target) return false;

        if (el.matches('[' + prefix + 'text="true"]')) {
            copyDOMText(target, el.getAttribute(prefix + 'multiple'));
            return;
        }

        choose(target, el.matches('[' + prefix + 'select="true"]') ? false : true);
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
        "copy": function (target, opts) {
            if (opts && opts.text === true) return copyDOMText(target, opts.multiple);

            choose(target, true);
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
