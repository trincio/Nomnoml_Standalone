!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("react-dom"), require("react"), require("jszip")) : "function" == typeof define && define.amd ? define(["exports", "react-dom", "react", "jszip"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).WebApp = {}, e.ReactDOM, e.React, e.JSZip)
}(this, (function(e, t, n, r) {
    "use strict";
    function i(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    function o(e) {
        if (e && e.__esModule)
            return e;
        var t = Object.create(null);
        return e && Object.keys(e).forEach((function(n) {
            if ("default" !== n) {
                var r = Object.getOwnPropertyDescriptor(e, n);
                Object.defineProperty(t, n, r.get ? r : {
                    enumerable: !0,
                    get: function() {
                        return e[n]
                    }
                })
            }
        }
        )),
        t.default = e,
        Object.freeze(t)
    }
    function a(e, t) {
        return t.forEach((function(t) {
            t && "string" != typeof t && !Array.isArray(t) && Object.keys(t).forEach((function(n) {
                if ("default" !== n && !(n in e)) {
                    var r = Object.getOwnPropertyDescriptor(t, n);
                    Object.defineProperty(e, n, r.get ? r : {
                        enumerable: !0,
                        get: function() {
                            return t[n]
                        }
                    })
                }
            }
            ))
        }
        )),
        Object.freeze(e)
    }
    var s = o(t)
      , c = i(r);
    function l(e) {
        return e.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x60;/g, "`")
    }
    function d(e, t, n={}) {
        var r, i, o, a, s = 0, c = function() {
            s = !1 === n.leading ? 0 : Date.now(),
            r = null,
            a = e.apply(i, o),
            r || (i = o = null)
        };
        return function() {
            var l = Date.now();
            s || !1 !== n.leading || (s = l);
            var d = t - (l - s);
            return i = this,
            o = arguments,
            d <= 0 || d > t ? (r && (clearTimeout(r),
            r = null),
            s = l,
            a = e.apply(i, o),
            r || (i = o = null)) : r || !1 === n.trailing || (r = setTimeout(c, d)),
            a
        }
    }
    function h(e, t, n=!1) {
        var r, i;
        function o(t, n) {
            r = null,
            n && (i = e.apply(t, n))
        }
        return function(...a) {
            if (r && clearTimeout(r),
            n) {
                var s = !r;
                r = setTimeout(o, t),
                s && (i = e.apply(this, a))
            } else
                r = function(e, t, ...n) {
                    return setTimeout((()=>e.apply(null, n)), t)
                }(o, t, this, a);
            return i
        }
    }
    function u(e, t) {
        return {
            x: e.x - t.x,
            y: e.y - t.y
        }
    }
    class f {
        constructor(e, t) {
            this.onChange = t,
            this.offset = {
                x: 0,
                y: 0
            },
            this.zoomLevel = 0,
            this.superSampling = window.devicePixelRatio || 1;
            var n = !1;
            var r = ()=>{
                n = !1,
                e.style.width = "33%"
            }
            ;
            e.addEventListener("mousedown", (t=>{
                e.style.width = "100%",
                n = u({
                    x: t.pageX,
                    y: t.pageY
                }, this.offset)
            }
            )),
            e.addEventListener("mouseup", r),
            e.addEventListener("mouseleave", r),
            e.addEventListener("wheel", d((e=>{
                this.zoomLevel = Math.min(10, this.zoomLevel - (e.deltaY < 0 ? -1 : 1)),
                t()
            }
            ), 50), {
                passive: !0
            }),
            e.addEventListener("mousemove", d((e=>{
                0 != n && (this.offset = u({
                    x: e.pageX,
                    y: e.pageY
                }, n),
                t())
            }
            ), 50), {
                passive: !0
            })
        }
        positionCanvas(e) {
            var t = window
              , n = e.width / this.superSampling
              , r = e.height / this.superSampling;
            e.style.top = 300 * (1 - r / t.innerHeight) + this.offset.y + "px",
            e.style.left = 150 + (t.innerWidth - n) / 2 + this.offset.x + "px",
            e.style.width = n + "px",
            e.style.height = r + "px"
        }
        zoom() {
            return this.superSampling * Math.exp(this.zoomLevel / 10)
        }
        magnify(e) {
            this.zoomLevel = Math.min(10, this.zoomLevel + e),
            this.onChange()
        }
        reset() {
            this.zoomLevel = 1,
            this.offset = {
                x: 0,
                y: 0
            },
            this.onChange()
        }
    }
    class p {
        constructor(e, t) {
            this.editor = e,
            this.lineNumbers = t
        }
        clearState() {
            this.mark?.clear(),
            this.lineMark?.clear(),
            this.lineNumbers.classList.remove("error")
        }
        setError(e) {
            this.mark?.clear(),
            this.lineMark?.clear(),
            this.lineNumbers.classList.add("error"),
            console.log({
                line: e.line,
                column: e.column
            }),
            this.lineMark = this.editor.markText({
                line: e.line - 1,
                ch: 0
            }, {
                line: e.line - 1,
                ch: 100
            }, {
                css: "background: #f884"
            }),
            this.mark = this.editor.markText({
                line: e.line - 1,
                ch: e.column - 2
            }, {
                line: e.line - 1,
                ch: e.column + 1
            }, {
                css: "background: #f88a"
            })
        }
    }
    var g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function v(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    function m(e) {
        var t = e.default;
        if ("function" == typeof t) {
            var n = function() {
                return t.apply(this, arguments)
            };
            n.prototype = t.prototype
        } else
            n = {};
        return Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        Object.keys(e).forEach((function(t) {
            var r = Object.getOwnPropertyDescriptor(e, t);
            Object.defineProperty(n, t, r.get ? r : {
                enumerable: !0,
                get: function() {
                    return e[t]
                }
            })
        }
        )),
        n
    }
    var y = {
        exports: {}
    };
    !function(e, t) {
        !function() {
            function t(e, t) {
                return void 0 === t ? t = {
                    autoBom: !1
                } : "object" != typeof t && (console.warn("Deprecated: Expected third argument to be a object"),
                t = {
                    autoBom: !t
                }),
                t.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\ufeff", e],{
                    type: e.type
                }) : e
            }
            function n(e, t, n) {
                var r = new XMLHttpRequest;
                r.open("GET", e),
                r.responseType = "blob",
                r.onload = function() {
                    s(r.response, t, n)
                }
                ,
                r.onerror = function() {
                    console.error("could not download file")
                }
                ,
                r.send()
            }
            function r(e) {
                var t = new XMLHttpRequest;
                t.open("HEAD", e, !1);
                try {
                    t.send()
                } catch (e) {}
                return 200 <= t.status && 299 >= t.status
            }
            function i(e) {
                try {
                    e.dispatchEvent(new MouseEvent("click"))
                } catch (n) {
                    var t = document.createEvent("MouseEvents");
                    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null),
                    e.dispatchEvent(t)
                }
            }
            var o = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof g && g.global === g ? g : void 0
              , a = o.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)
              , s = o.saveAs || ("object" != typeof window || window !== o ? function() {}
            : "download"in HTMLAnchorElement.prototype && !a ? function(e, t, a) {
                var s = o.URL || o.webkitURL
                  , c = document.createElement("a");
                t = t || e.name || "download",
                c.download = t,
                c.rel = "noopener",
                "string" == typeof e ? (c.href = e,
                c.origin === location.origin ? i(c) : r(c.href) ? n(e, t, a) : i(c, c.target = "_blank")) : (c.href = s.createObjectURL(e),
                setTimeout((function() {
                    s.revokeObjectURL(c.href)
                }
                ), 4e4),
                setTimeout((function() {
                    i(c)
                }
                ), 0))
            }
            : "msSaveOrOpenBlob"in navigator ? function(e, o, a) {
                if (o = o || e.name || "download",
                "string" != typeof e)
                    navigator.msSaveOrOpenBlob(t(e, a), o);
                else if (r(e))
                    n(e, o, a);
                else {
                    var s = document.createElement("a");
                    s.href = e,
                    s.target = "_blank",
                    setTimeout((function() {
                        i(s)
                    }
                    ))
                }
            }
            : function(e, t, r, i) {
                if ((i = i || open("", "_blank")) && (i.document.title = i.document.body.innerText = "downloading..."),
                "string" == typeof e)
                    return n(e, t, r);
                var s = "application/octet-stream" === e.type
                  , c = /constructor/i.test(o.HTMLElement) || o.safari
                  , l = /CriOS\/[\d]+/.test(navigator.userAgent);
                if ((l || s && c || a) && "undefined" != typeof FileReader) {
                    var d = new FileReader;
                    d.onloadend = function() {
                        var e = d.result;
                        e = l ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"),
                        i ? i.location.href = e : location = e,
                        i = null
                    }
                    ,
                    d.readAsDataURL(e)
                } else {
                    var h = o.URL || o.webkitURL
                      , u = h.createObjectURL(e);
                    i ? i.location = u : location.href = u,
                    i = null,
                    setTimeout((function() {
                        h.revokeObjectURL(u)
                    }
                    ), 4e4)
                }
            }
            );
            o.saveAs = s.saveAs = s,
            e.exports = s
        }()
    }(y);
    var w = y.exports;
    class x {
        constructor(e) {
            this.canvasElement = e,
            this.filename = "graph",
            this.source = ""
        }
        pngDownload() {
            var e = this.canvasElement;
            e.msToBlob ? w(e.msToBlob(), this.filename + ".png") : this.canvasElement.toBlob((e=>w(e, this.filename + ".png")))
        }
        svgDownload(e) {
            var t = e(this.source, document);
            w(new Blob([t],{
                type: "image/svg+xml"
            }), this.filename + ".svg")
        }
        srcDownload() {
            var e = this.source;
            w(new Blob([e],{
                type: "text/txt"
            }), this.filename + ".nomnoml")
        }
        setFilename(e) {
            e = e || "nomnoml",
            this.filename = e.replace(/[^ a-zA-Z0-9_-]/g, "_")
        }
    }
    class b {
        constructor() {
            this.callbacks = {}
        }
        on(e, t) {
            this.callbacks[e] || (this.callbacks[e] = []),
            this.callbacks[e].push(t)
        }
        off(e, t) {
            var n = this.callbacks[e];
            if (n) {
                var r = n.indexOf(t);
                -1 !== r && n.splice(r, 1),
                0 === n.length && delete this.callbacks[e]
            }
        }
        trigger(e, ...t) {
            var n = this.callbacks[e];
            if (n)
                for (let e of n)
                    e.apply(null, t)
        }
    }
    class k {
        constructor(e, t) {
            this.context = e,
            this.path = t
        }
        static from(e) {
            var t = e.indexOf("/");
            return "#" == e[0] && t > -1 ? {
                context: k.urlDecode(e.substr(1, t - 1)),
                path: k.urlDecode(e.substr(t + 1))
            } : {
                context: "",
                path: ""
            }
        }
        static urlEncode(e) {
            return encodeURIComponent(e).replace(/'/g, "%27").replace(/"/g, "%22")
        }
        static urlDecode(e) {
            return decodeURIComponent(e.replace(/\+/g, " "))
        }
    }
    function _(e, t) {
        for (let n = 0; n < e.length; n++)
            if (t(e[n]))
                return e[n]
    }
    class E {
        constructor() {
            this.signals = new b,
            this.activeFile = {
                name: "",
                date: "1970-01-01",
                backingStore: "url"
            },
            this.storage = new M
        }
        finishedInsertingFiles() {
            this.signals.trigger("updated")
        }
        async moveToFileStorage(e, t) {
            new N(e).insert(t),
            this.signals.trigger("updated")
        }
        async moveToLocalStorage(e) {
            this.storage = new M,
            await this.storage.save(e)
        }
        async discard(e) {
            var t = new N(e.name);
            await t.clear(),
            this.signals.trigger("updated")
        }
        async configureByRoute(e) {
            var t = k.from(e);
            this.storage = this.routedStorage(t);
            var n = await this.storage.files();
            this.activeFile = _(n, (e=>e.name === t.path)) || S(t.path, "local_file"),
            this.signals.trigger("updated")
        }
        routedStorage(e) {
            return "view" === e.context ? new z(decodeURIComponent(e.path)) : "file" === e.context ? new N(e.path) : new M
        }
    }
    function S(e, t) {
        return {
            date: (new Date).toISOString(),
            name: e,
            backingStore: t
        }
    }
    class M {
        constructor() {
            this.kind = "local_default",
            this.storageKey = "nomnoml.lastSource"
        }
        async files() {
            return JSON.parse(localStorage["nomnoml.file_index"] || "[]")
        }
        async read() {
            return localStorage[this.storageKey]
        }
        async insert(e) {}
        async save(e) {
            localStorage[this.storageKey] = e
        }
        async clear() {}
    }
    class z {
        constructor(e) {
            this.source = e,
            this.kind = "url"
        }
        async files() {
            return JSON.parse(localStorage["nomnoml.file_index"] || "[]")
        }
        async read() {
            return this.source
        }
        async insert(e) {}
        async save(e) {}
        async clear() {}
    }
    class N {
        constructor(e) {
            this.name = e,
            this.kind = "local_file",
            this.storageKey = "nomnoml.files/" + e
        }
        async files() {
            return JSON.parse(localStorage["nomnoml.file_index"] || "[]")
        }
        async read() {
            return localStorage[this.storageKey]
        }
        async insert(e) {
            var t = S(this.name, "local_file")
              , n = await this.files();
            _(n, (e=>e.name === this.name)) || (n.push(t),
            n.sort(((e,t)=>e.name.localeCompare(t.name))),
            localStorage["nomnoml.file_index"] = JSON.stringify(n)),
            localStorage[this.storageKey] = e
        }
        async save(e) {
            localStorage[this.storageKey] = e
        }
        async clear() {
            localStorage.removeItem(this.storageKey);
            var e = (await this.files()).filter((e=>e.name != this.name));
            localStorage["nomnoml.file_index"] = JSON.stringify(e)
        }
    }
    class L {
        constructor(e, t, n) {
            function r(n) {
                return function() {
                    n ? t.classList.add(e) : t.classList.remove(e)
                }
            }
            for (var i of n)
                i.addEventListener("mouseenter", r(!0)),
                i.addEventListener("mouseleave", r(!1))
        }
    }
    var T, I, O = {
        exports: {}
    }, C = {
        exports: {}
    }, j = {
        exports: {}
    };
    function P() {
        return T || (T = 1,
        function(e, t) {
            !function(e) {
                class t {
                    constructor() {
                        var e = {};
                        e._next = e._prev = e,
                        this._sentinel = e
                    }
                    dequeue() {
                        var e = this._sentinel
                          , t = e._prev;
                        if (t !== e)
                            return n(t),
                            t
                    }
                    enqueue(e) {
                        var t = this._sentinel
                          , r = e;
                        r._prev && r._next && n(r),
                        r._next = t._next,
                        t._next._prev = r,
                        t._next = r,
                        r._prev = t
                    }
                    toString() {
                        for (var e = [], t = this._sentinel, n = t._prev; n !== t; )
                            e.push(JSON.stringify(n, r)),
                            n = n._prev;
                        return "[" + e.join(", ") + "]"
                    }
                }
                function n(e) {
                    e._prev._next = e._next,
                    e._next._prev = e._prev,
                    delete e._next,
                    delete e._prev
                }
                function r(e, t) {
                    if ("_next" !== e && "_prev" !== e)
                        return t
                }
                var i = Object.freeze({
                    __proto__: null,
                    List: t
                });
                const o = {};
                function a(e) {
                    var t = [];
                    for (var n of e)
                        t.push(...n);
                    return t
                }
                function s(e, t) {
                    return null != e && e.hasOwnProperty(t)
                }
                function c(e) {
                    const t = null == e ? 0 : e.length;
                    return t ? e[t - 1] : void 0
                }
                function l(e, t) {
                    e = Object(e);
                    const n = {};
                    return Object.keys(e).forEach((r=>{
                        n[r] = t(e[r], r)
                    }
                    )),
                    n
                }
                function d(e, t) {
                    var n = Number.POSITIVE_INFINITY
                      , r = void 0;
                    for (var i of e) {
                        var o = t(i);
                        o < n && (n = o,
                        r = i)
                    }
                    return r
                }
                function h(e, t) {
                    var n = e < t ? 1 : -1;
                    let r = -1
                      , i = Math.max(Math.ceil((t - e) / (n || 1)), 0);
                    const o = new Array(i);
                    for (; i--; )
                        o[++r] = e,
                        e += n;
                    return o
                }
                function u(e, t) {
                    return e.slice().sort(((e,n)=>t(e) - t(n)))
                }
                function f(e) {
                    return o[e] || (o[e] = 0),
                    `${e}${++o[e]}`
                }
                function p(e) {
                    return e ? Object.keys(e).map((t=>e[t])) : []
                }
                function g(e, t) {
                    for (var n = [], r = 0; r < e; r++)
                        n.push(t());
                    return n
                }
                function v(e) {
                    return void 0 === e
                }
                function m(e, t) {
                    for (var n of Object.keys(e))
                        t(e[n], n)
                }
                function y(e) {
                    return 0 === Object.keys(e).length
                }
                function w(e) {
                    var t = {}
                      , n = e.nodes().filter((t=>!e.children(t).length))
                      , r = g(Math.max(...n.map((t=>e.node(t).rank))) + 1, (()=>[]));
                    return u(n, (t=>e.node(t).rank)).forEach((function n(i) {
                        if (!s(t, i)) {
                            t[i] = !0;
                            var o = e.node(i);
                            r[o.rank].push(i),
                            e.successors(i).forEach(n)
                        }
                    }
                    )),
                    r
                }
                function x(e, t) {
                    for (var n = 0, r = 1; r < t.length; ++r)
                        n += b(e, t[r - 1], t[r]);
                    return n
                }
                function b(e, t, n) {
                    for (var r = {}, i = 0; i < n.length; i++)
                        r[n[i]] = i;
                    for (var o = a(t.map((function(t) {
                        return u(e.outEdges(t).map((function(t) {
                            return {
                                pos: r[t.w],
                                weight: e.edge(t).weight
                            }
                        }
                        )), (e=>e.pos))
                    }
                    ))), s = 1; s < n.length; )
                        s <<= 1;
                    var c = 2 * s - 1;
                    s -= 1;
                    var l = g(c, (()=>0))
                      , d = 0;
                    return o.forEach((function(e) {
                        var t = e.pos + s;
                        l[t] += e.weight;
                        for (var n = 0; t > 0; )
                            t % 2 && (n += l[t + 1]),
                            l[t = t - 1 >> 1] += e.weight;
                        d += e.weight * n
                    }
                    )),
                    d
                }
                function k(e, t) {
                    return t ? t.map((function(t) {
                        var n = e.inEdges(t);
                        if (n.length) {
                            var r = n.reduce((function(t, n) {
                                var r = e.edge(n)
                                  , i = e.node(n.v);
                                return {
                                    sum: t.sum + r.weight * i.order,
                                    weight: t.weight + r.weight
                                }
                            }
                            ), {
                                sum: 0,
                                weight: 0
                            });
                            return {
                                v: t,
                                barycenter: r.sum / r.weight,
                                weight: r.weight
                            }
                        }
                        return {
                            v: t
                        }
                    }
                    )) : []
                }
                function _(e, t) {
                    for (var n = {}, r = 0; r < e.length; r++) {
                        var i = e[r]
                          , o = n[i.v] = {
                            indegree: 0,
                            in: [],
                            out: [],
                            vs: [i.v],
                            i: r
                        };
                        void 0 !== i.barycenter && (o.barycenter = i.barycenter,
                        o.weight = i.weight)
                    }
                    for (var a of t.edges()) {
                        var s = n[a.v]
                          , c = n[a.w];
                        void 0 !== s && void 0 !== c && (c.indegree++,
                        s.out.push(n[a.w]))
                    }
                    return function(e) {
                        var t = [];
                        function n(e) {
                            return function(t) {
                                t.merged || (void 0 === t.barycenter || void 0 === e.barycenter || t.barycenter >= e.barycenter) && function(e, t) {
                                    var n = 0
                                      , r = 0;
                                    e.weight && (n += e.barycenter * e.weight,
                                    r += e.weight),
                                    t.weight && (n += t.barycenter * t.weight,
                                    r += t.weight),
                                    e.vs = t.vs.concat(e.vs),
                                    e.barycenter = n / r,
                                    e.weight = r,
                                    e.i = Math.min(t.i, e.i),
                                    t.merged = !0
                                }(e, t)
                            }
                        }
                        function r(t) {
                            return function(n) {
                                n.in.push(t),
                                0 == --n.indegree && e.push(n)
                            }
                        }
                        for (; e.length; ) {
                            var i = e.pop();
                            t.push(i),
                            i.in.reverse().forEach(n(i)),
                            i.out.forEach(r(i))
                        }
                        return t.filter((e=>!e.merged)).map((function(e) {
                            var t = {
                                vs: e.vs,
                                i: e.i
                            };
                            return "barycenter"in e && (t.barycenter = e.barycenter),
                            "weight"in e && (t.weight = e.weight),
                            t
                        }
                        ))
                    }(p(n).filter((e=>!e.indegree)))
                }
                var E = "\0";
                class S {
                    constructor(e={}) {
                        this._label = void 0,
                        this._nodeCount = 0,
                        this._edgeCount = 0,
                        this._isDirected = !s(e, "directed") || e.directed,
                        this._isMultigraph = !!s(e, "multigraph") && e.multigraph,
                        this._isCompound = !!s(e, "compound") && e.compound,
                        this._defaultNodeLabelFn = ()=>{}
                        ,
                        this._defaultEdgeLabelFn = ()=>{}
                        ,
                        this._nodes = {},
                        this._isCompound && (this._parent = {},
                        this._children = {},
                        this._children["\0"] = {}),
                        this._in = {},
                        this._preds = {},
                        this._out = {},
                        this._sucs = {},
                        this._edgeObjs = {},
                        this._edgeLabels = {}
                    }
                    isDirected() {
                        return this._isDirected
                    }
                    isMultigraph() {
                        return this._isMultigraph
                    }
                    isCompound() {
                        return this._isCompound
                    }
                    setGraph(e) {
                        return this._label = e,
                        this
                    }
                    graph() {
                        return this._label
                    }
                    setDefaultNodeLabel(e) {
                        var t;
                        return t = e,
                        this._defaultNodeLabelFn = "function" != typeof t ? ()=>e : e,
                        this
                    }
                    nodeCount() {
                        return this._nodeCount
                    }
                    nodes() {
                        return Object.keys(this._nodes)
                    }
                    sources() {
                        var e = this;
                        return this.nodes().filter((function(t) {
                            return y(e._in[t])
                        }
                        ))
                    }
                    sinks() {
                        var e = this;
                        return this.nodes().filter((t=>y(e._out[t])))
                    }
                    setNodes(e, t) {
                        for (var n of e)
                            void 0 !== t ? this.setNode(n, t) : this.setNode(n);
                        return this
                    }
                    setNode(e, t) {
                        return s(this._nodes, e) ? (arguments.length > 1 && (this._nodes[e] = t),
                        this) : (this._nodes[e] = arguments.length > 1 ? t : this._defaultNodeLabelFn(e),
                        this._isCompound && (this._parent[e] = E,
                        this._children[e] = {},
                        this._children["\0"][e] = !0),
                        this._in[e] = {},
                        this._preds[e] = {},
                        this._out[e] = {},
                        this._sucs[e] = {},
                        ++this._nodeCount,
                        this)
                    }
                    node(e) {
                        return this._nodes[e]
                    }
                    hasNode(e) {
                        return s(this._nodes, e)
                    }
                    removeNode(e) {
                        var t = this;
                        if (s(this._nodes, e)) {
                            var n = e=>{
                                t.removeEdge(this._edgeObjs[e])
                            }
                            ;
                            if (delete this._nodes[e],
                            this._isCompound) {
                                for (var r of (this._removeFromParentsChildList(e),
                                delete this._parent[e],
                                this.children(e)))
                                    t.setParent(r);
                                delete this._children[e]
                            }
                            for (var i of Object.keys(this._in[e]))
                                n(i);
                            for (var i of (delete this._in[e],
                            delete this._preds[e],
                            Object.keys(this._out[e])))
                                n(i);
                            delete this._out[e],
                            delete this._sucs[e],
                            --this._nodeCount
                        }
                        return this
                    }
                    setParent(e, t) {
                        if (!this._isCompound)
                            throw new Error("Cannot set parent in a non-compound graph");
                        if (void 0 === t)
                            t = E;
                        else {
                            for (var n = t += ""; !v(n); n = this.parent(n))
                                if (n === e)
                                    throw new Error(`Setting ${t} as parent of ${e} would create a cycle`);
                            this.setNode(t)
                        }
                        return this.setNode(e),
                        this._removeFromParentsChildList(e),
                        this._parent[e] = t,
                        this._children[t][e] = !0,
                        this
                    }
                    _removeFromParentsChildList(e) {
                        delete this._children[this._parent[e]][e]
                    }
                    parent(e) {
                        if (this._isCompound) {
                            var t = this._parent[e];
                            if (t !== E)
                                return t
                        }
                    }
                    children(e) {
                        if (v(e) && (e = E),
                        this._isCompound) {
                            var t = this._children[e];
                            return t ? Object.keys(t) : void 0
                        }
                        return e === E ? this.nodes() : this.hasNode(e) ? [] : void 0
                    }
                    predecessors(e) {
                        var t = this._preds[e];
                        if (t)
                            return Object.keys(t)
                    }
                    successors(e) {
                        var t = this._sucs[e];
                        if (t)
                            return Object.keys(t)
                    }
                    neighbors(e) {
                        var t = this.predecessors(e);
                        if (t)
                            return function(e, t) {
                                var n = [...e];
                                for (var r of t)
                                    -1 === n.indexOf(r) && n.push(r);
                                return n
                            }(t, this.successors(e))
                    }
                    isLeaf(e) {
                        return 0 === (this.isDirected() ? this.successors(e) : this.neighbors(e)).length
                    }
                    filterNodes(e) {
                        var t = new S({
                            directed: this._isDirected,
                            multigraph: this._isMultigraph,
                            compound: this._isCompound
                        });
                        t.setGraph(this.graph());
                        var n = this;
                        m(this._nodes, (function(n, r) {
                            e(r) && t.setNode(r, n)
                        }
                        )),
                        m(this._edgeObjs, (function(e) {
                            t.hasNode(e.v) && t.hasNode(e.w) && t.setEdge(e, n.edge(e))
                        }
                        ));
                        var r = {};
                        function i(e) {
                            var o = n.parent(e);
                            return void 0 === o || t.hasNode(o) ? (r[e] = o,
                            o) : o in r ? r[o] : i(o)
                        }
                        if (this._isCompound)
                            for (var o of t.nodes())
                                t.setParent(o, i(o));
                        return t
                    }
                    setDefaultEdgeLabel(e) {
                        var t;
                        return t = e,
                        this._defaultEdgeLabelFn = "function" != typeof t ? ()=>e : e,
                        this
                    }
                    edgeCount() {
                        return this._edgeCount
                    }
                    edges() {
                        return Object.values(this._edgeObjs)
                    }
                    setPath(e, t) {
                        var n = this
                          , r = arguments;
                        return e.reduce((function(e, i) {
                            return r.length > 1 ? n.setEdge(e, i, t) : n.setEdge(e, i),
                            i
                        }
                        )),
                        this
                    }
                    setEdge(e, t, n, r) {
                        var i = !1
                          , o = e;
                        "object" == typeof o && null !== o && "v"in o ? (e = o.v,
                        t = o.w,
                        r = o.name,
                        2 === arguments.length && (n = arguments[1],
                        i = !0)) : (e = o,
                        t = arguments[1],
                        r = arguments[3],
                        arguments.length > 2 && (n = arguments[2],
                        i = !0)),
                        e = "" + e,
                        t = "" + t,
                        v(r) || (r = "" + r);
                        var a = L(this._isDirected, e, t, r);
                        if (s(this._edgeLabels, a))
                            return i && (this._edgeLabels[a] = n),
                            this;
                        if (!v(r) && !this._isMultigraph)
                            throw new Error("Cannot set a named edge when isMultigraph = false");
                        this.setNode(e),
                        this.setNode(t),
                        this._edgeLabels[a] = i ? n : this._defaultEdgeLabelFn(e, t, r);
                        var c = function(e, t, n, r) {
                            var i = "" + t
                              , o = "" + n;
                            if (!e && i > o) {
                                var a = i;
                                i = o,
                                o = a
                            }
                            var s = {
                                v: i,
                                w: o
                            };
                            return r && (s.name = r),
                            s
                        }(this._isDirected, e, t, r);
                        return e = c.v,
                        t = c.w,
                        Object.freeze(c),
                        this._edgeObjs[a] = c,
                        z(this._preds[t], e),
                        z(this._sucs[e], t),
                        this._in[t][a] = c,
                        this._out[e][a] = c,
                        this._edgeCount++,
                        this
                    }
                    edge(e, t, n) {
                        var r = "object" == typeof e ? T(this._isDirected, e) : L(this._isDirected, e, t, n);
                        return this._edgeLabels[r]
                    }
                    hasEdge(e, t, n) {
                        var r = 1 === arguments.length ? T(this._isDirected, arguments[0]) : L(this._isDirected, e, t, n);
                        return s(this._edgeLabels, r)
                    }
                    removeEdge(e, t, n) {
                        var r = "object" == typeof e ? T(this._isDirected, e) : L(this._isDirected, e, t, n)
                          , i = this._edgeObjs[r];
                        return i && (e = i.v,
                        t = i.w,
                        delete this._edgeLabels[r],
                        delete this._edgeObjs[r],
                        N(this._preds[t], e),
                        N(this._sucs[e], t),
                        delete this._in[t][r],
                        delete this._out[e][r],
                        this._edgeCount--),
                        this
                    }
                    inEdges(e, t) {
                        var n = this._in[e];
                        if (n) {
                            var r = Object.values(n);
                            return t ? r.filter((function(e) {
                                return e.v === t
                            }
                            )) : r
                        }
                    }
                    outEdges(e, t) {
                        var n = this._out[e];
                        if (n) {
                            var r = Object.values(n);
                            return t ? r.filter((function(e) {
                                return e.w === t
                            }
                            )) : r
                        }
                    }
                    nodeEdges(e, t) {
                        var n = this.inEdges(e, t);
                        if (n)
                            return n.concat(this.outEdges(e, t))
                    }
                }
                class M extends S {
                }
                function z(e, t) {
                    e[t] ? e[t]++ : e[t] = 1
                }
                function N(e, t) {
                    --e[t] || delete e[t]
                }
                function L(e, t, n, r) {
                    var i = "" + t
                      , o = "" + n;
                    if (!e && i > o) {
                        var a = i;
                        i = o,
                        o = a
                    }
                    return i + "" + o + "" + (v(r) ? "\0" : r)
                }
                function T(e, t) {
                    return L(e, t.v, t.w, t.name)
                }
                function I(e, t, n, r) {
                    var i;
                    do {
                        i = f(r)
                    } while (e.hasNode(i));
                    return n.dummy = t,
                    e.setNode(i, n),
                    i
                }
                function O(e) {
                    var t = (new S).setGraph(e.graph());
                    for (var n of e.nodes())
                        t.setNode(n, e.node(n));
                    for (var r of e.edges()) {
                        var i = t.edge(r.v, r.w) || {
                            weight: 0,
                            minlen: 1
                        }
                          , o = e.edge(r);
                        t.setEdge(r.v, r.w, {
                            weight: i.weight + o.weight,
                            minlen: Math.max(i.minlen, o.minlen)
                        })
                    }
                    return t
                }
                function C(e) {
                    var t = new S({
                        multigraph: e.isMultigraph()
                    }).setGraph(e.graph());
                    for (var n of e.nodes())
                        e.children(n).length || t.setNode(n, e.node(n));
                    for (var r of e.edges())
                        t.setEdge(r, e.edge(r));
                    return t
                }
                function j(e, t) {
                    var n, r, i = e.x, o = e.y, a = t.x - i, s = t.y - o, c = e.width / 2, l = e.height / 2;
                    if (!a && !s)
                        throw new Error("Not possible to find intersection inside of the rectangle");
                    return Math.abs(s) * c > Math.abs(a) * l ? (s < 0 && (l = -l),
                    n = l * a / s,
                    r = l) : (a < 0 && (c = -c),
                    n = c,
                    r = c * s / a),
                    {
                        x: i + n,
                        y: o + r
                    }
                }
                function P(e) {
                    var t = g(F(e) + 1, (()=>[]));
                    for (var n of e.nodes()) {
                        var r = e.node(n)
                          , i = r.rank;
                        void 0 !== i && (t[i][r.order] = n)
                    }
                    return t
                }
                function A(e) {
                    var t = Math.min(...e.nodes().map((t=>e.node(t).rank)).filter((e=>void 0 !== e)));
                    for (var n of e.nodes()) {
                        var r = e.node(n);
                        s(r, "rank") && (r.rank -= t)
                    }
                }
                function R(e) {
                    var t = Math.min(...e.nodes().map((t=>e.node(t).rank)).filter((e=>void 0 !== e)))
                      , n = [];
                    for (var r of e.nodes()) {
                        var i = e.node(r).rank - t;
                        n[i] || (n[i] = []),
                        n[i].push(r)
                    }
                    for (var o = 0, a = e.graph().nodeRankFactor, s = 0; s < n.length; s++) {
                        var c = n[s];
                        if (void 0 === c && s % a != 0)
                            --o;
                        else if (o && null != c)
                            for (var r of c)
                                e.node(r).rank += o
                    }
                }
                function D(e, t, n, r) {
                    var i = {
                        width: 0,
                        height: 0
                    };
                    return arguments.length >= 4 && (i.rank = n,
                    i.order = r),
                    I(e, "border", i, t)
                }
                function F(e) {
                    var t = e.nodes().map((t=>e.node(t).rank)).filter((e=>void 0 !== e));
                    return Math.max(...t)
                }
                function B(e, t) {
                    var n = []
                      , r = [];
                    for (var i of e)
                        t(i) ? n.push(i) : r.push(i);
                    return {
                        lhs: n,
                        rhs: r
                    }
                }
                function q(e, t) {
                    var n = Date.now();
                    try {
                        return t()
                    } finally {
                        console.log(e + " time: " + (Date.now() - n) + "ms")
                    }
                }
                function $(e, t) {
                    return t()
                }
                var V = Object.freeze({
                    __proto__: null,
                    addDummyNode: I,
                    simplify: O,
                    asNonCompoundGraph: C,
                    successorWeights: function(e) {
                        var t = {};
                        for (var n of e.nodes()) {
                            var r = {};
                            for (var i of e.outEdges(n))
                                r[i.w] = (r[i.w] || 0) + e.edge(i).weight;
                            t[n] = r
                        }
                        return t
                    },
                    predecessorWeights: function(e) {
                        var t = {};
                        for (var n of e.nodes()) {
                            var r = {};
                            for (var i of e.inEdges(n))
                                r[i.v] = (r[i.v] || 0) + e.edge(i).weight;
                            t[n] = r
                        }
                        return t
                    },
                    intersectRect: j,
                    buildLayerMatrix: P,
                    normalizeRanks: A,
                    removeEmptyRanks: R,
                    addBorderNode: D,
                    maxRank: F,
                    partition: B,
                    time: q,
                    notime: $
                });
                function G(e, t) {
                    var n, r = B(e, (function(e) {
                        return s(e, "barycenter")
                    }
                    )), i = r.lhs, o = u(r.rhs, (e=>-e.i)), c = [], l = 0, d = 0, h = 0;
                    for (var f of (i.sort((n = !!t,
                    function(e, t) {
                        return e.barycenter < t.barycenter ? -1 : e.barycenter > t.barycenter ? 1 : n ? t.i - e.i : e.i - t.i
                    }
                    )),
                    h = W(c, o, h),
                    i))
                        h += f.vs.length,
                        c.push(f.vs),
                        l += f.barycenter * f.weight,
                        d += f.weight,
                        h = W(c, o, h);
                    var p = {
                        vs: a(c)
                    };
                    return d && (p.barycenter = l / d,
                    p.weight = d),
                    p
                }
                function W(e, t, n) {
                    for (var r; t.length && (r = c(t)).i <= n; )
                        t.pop(),
                        e.push(r.vs),
                        n++;
                    return n
                }
                function H(e, t, n, r) {
                    var i = e.children(t)
                      , o = e.node(t)
                      , c = o ? o.borderLeft : void 0
                      , l = o ? o.borderRight : void 0
                      , d = {};
                    c && (i = i.filter((e=>e !== c && e !== l)));
                    var h = k(e, i);
                    for (var u of h)
                        if (e.children(u.v).length) {
                            var f = H(e, u.v, n, r);
                            d[u.v] = f,
                            s(f, "barycenter") && Y(u, f)
                        }
                    var p = _(h, n);
                    !function(e, t) {
                        for (var n of e)
                            n.vs = a(n.vs.map((function(e) {
                                return t[e] ? t[e].vs : [e]
                            }
                            )))
                    }(p, d);
                    var g = G(p, r);
                    if (c && (g.vs = [c, ...g.vs, l],
                    e.predecessors(c).length)) {
                        var v = e.node(e.predecessors(c)[0])
                          , m = e.node(e.predecessors(l)[0]);
                        s(g, "barycenter") || (g.barycenter = 0,
                        g.weight = 0),
                        g.barycenter = (g.barycenter * g.weight + v.order + m.order) / (g.weight + 2),
                        g.weight += 2
                    }
                    return g
                }
                function Y(e, t) {
                    void 0 !== e.barycenter ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight),
                    e.weight += t.weight) : (e.barycenter = t.barycenter,
                    e.weight = t.weight)
                }
                function J(e, t, n) {
                    var r = function(e) {
                        for (var t; e.hasNode(t = f("_root")); )
                            ;
                        return t
                    }(e)
                      , i = new S({
                        compound: !0
                    }).setGraph({
                        root: r
                    }).setDefaultNodeLabel((t=>e.node(t)));
                    for (var o of e.nodes()) {
                        var a = e.node(o)
                          , c = e.parent(o);
                        if (a.rank === t || a.minRank <= t && t <= a.maxRank) {
                            for (var l of (i.setNode(o),
                            i.setParent(o, c || r),
                            e[n](o))) {
                                var d = l.v === o ? l.w : l.v
                                  , h = i.edge(d, o)
                                  , u = void 0 !== h ? h.weight : 0;
                                i.setEdge(d, o, {
                                    weight: e.edge(l).weight + u
                                })
                            }
                            s(a, "minRank") && i.setNode(o, {
                                borderLeft: a.borderLeft[t],
                                borderRight: a.borderRight[t]
                            })
                        }
                    }
                    return i
                }
                function U(e, t, n) {
                    var r, i = {};
                    for (var o of n)
                        !function() {
                            for (var n, a = e.parent(o); a; ) {
                                var s = e.parent(a);
                                if (s ? (n = i[s],
                                i[s] = a) : (n = r,
                                r = a),
                                n && n !== a)
                                    return void t.setEdge(n, a);
                                a = s
                            }
                        }()
                }
                function K(e) {
                    var t = F(e)
                      , n = Q(e, h(1, t + 1), "inEdges")
                      , r = Q(e, h(t - 1, -1), "outEdges")
                      , i = w(e);
                    X(e, i);
                    for (var o, a = Number.POSITIVE_INFINITY, s = 0, c = 0; c < 4; ++s,
                    ++c) {
                        Z(s % 2 ? n : r, s % 4 >= 2);
                        var l = x(e, i = P(e));
                        l < a && (c = 0,
                        o = i.map((e=>e.slice(0))),
                        a = l)
                    }
                    X(e, o)
                }
                function Q(e, t, n) {
                    return t.map((t=>J(e, t, n)))
                }
                function Z(e, t) {
                    var n = new S;
                    for (var r of e) {
                        var i = r.graph().root
                          , o = H(r, i, n, t);
                        o.vs.map((function(e, t) {
                            r.node(e).order = t
                        }
                        )),
                        U(r, n, o.vs)
                    }
                }
                function X(e, t) {
                    for (var n of t)
                        n.map((function(t, n) {
                            e.node(t).order = n
                        }
                        ))
                }
                var ee = Object.freeze({
                    __proto__: null,
                    order: K,
                    addSubgraphConstraints: U,
                    barycenter: k,
                    buildLayerGraph: J,
                    crossCount: x,
                    initOrder: w,
                    resolveConflicts: _,
                    sortSubgraph: H,
                    sort: G
                });
                function te(e, t) {
                    var n = {};
                    return t.reduce((function(t, r) {
                        for (var i = 0, o = 0, a = t.length, s = c(r), l = 0; l < r.length; l++) {
                            var d = r[l]
                              , h = re(e, d)
                              , u = h ? e.node(h).order : a;
                            if (h || d === s) {
                                for (var f of r.slice(o, l + 1))
                                    for (var p of e.predecessors(f)) {
                                        var g = e.node(p)
                                          , v = g.order;
                                        !(v < i || u < v) || g.dummy && e.node(f).dummy || ie(n, p, f)
                                    }
                                o = l + 1,
                                i = u
                            }
                        }
                        return r
                    }
                    )),
                    n
                }
                function ne(e, t) {
                    var n = {};
                    function r(t, r, i, o, a) {
                        var s;
                        for (var c of h(r, i))
                            if (s = t[c],
                            e.node(s).dummy)
                                for (var l of e.predecessors(s)) {
                                    var d = e.node(l);
                                    d.dummy && (d.order < o || d.order > a) && ie(n, l, s)
                                }
                    }
                    return t.reduce((function(t, n) {
                        for (var i, o = -1, a = 0, s = 0; s < n.length; s++) {
                            var c = s
                              , l = n[s];
                            if (void 0 !== l) {
                                if ("border" === e.node(l).dummy) {
                                    var d = e.predecessors(l);
                                    d.length && (r(n, a, c, o, i = e.node(d[0]).order),
                                    a = c,
                                    o = i)
                                }
                                r(n, a, n.length, i, t.length)
                            }
                        }
                        return n
                    }
                    )),
                    n
                }
                function re(e, t) {
                    if (e.node(t).dummy)
                        for (var n of e.predecessors(t))
                            if (e.node(n).dummy)
                                return n
                }
                function ie(e, t, n) {
                    if (t > n) {
                        var r = t;
                        t = n,
                        n = r
                    }
                    var i = e[t];
                    i || (e[t] = i = {}),
                    i[n] = !0
                }
                function oe(e, t, n) {
                    if (t > n) {
                        var r = t;
                        t = n,
                        n = r
                    }
                    return s(e[t], n)
                }
                function ae(e, t, n, r) {
                    var i = {}
                      , o = {}
                      , a = {};
                    for (var s of t)
                        for (var c = 0; c < s.length; c++)
                            i[d = s[c]] = d,
                            o[d] = d,
                            a[d] = c;
                    for (var s of t) {
                        var l = -1;
                        for (var d of s) {
                            var h = r(d);
                            if (h.length)
                                for (var f = ((h = u(h, (e=>a[e]))).length - 1) / 2, p = Math.floor(f), g = Math.ceil(f); p <= g; ++p) {
                                    var v = h[p];
                                    o[d] === d && l < a[v] && !oe(n, d, v) && (o[v] = d,
                                    o[d] = i[d] = i[v],
                                    l = a[v])
                                }
                        }
                    }
                    return {
                        root: i,
                        align: o
                    }
                }
                function se(e, t, n, r, i) {
                    var o = {}
                      , a = function(e, t, n, r) {
                        var i = new S
                          , o = e.graph()
                          , a = ue(o.nodesep, o.edgesep, r);
                        for (var s of t) {
                            var c = null;
                            for (var l of s) {
                                var d = n[l];
                                if (i.setNode(d),
                                c) {
                                    var h = n[c]
                                      , u = i.edge(h, d);
                                    i.setEdge(h, d, Math.max(a(e, l, c), u || 0))
                                }
                                c = l
                            }
                        }
                        return i
                    }(e, t, n, i)
                      , s = i ? "borderLeft" : "borderRight";
                    function c(e, t) {
                        for (var n = a.nodes(), r = n.pop(), i = {}; r; )
                            i[r] ? e(r) : (i[r] = !0,
                            n.push(r),
                            n = n.concat(t(r))),
                            r = n.pop()
                    }
                    for (var l of (c((function(e) {
                        o[e] = a.inEdges(e).reduce((function(e, t) {
                            return Math.max(e, o[t.v] + a.edge(t))
                        }
                        ), 0)
                    }
                    ), (e=>a.predecessors(e))),
                    c((function(t) {
                        var n = a.outEdges(t).reduce((function(e, t) {
                            return Math.min(e, o[t.w] - a.edge(t))
                        }
                        ), Number.POSITIVE_INFINITY)
                          , r = e.node(t);
                        n !== Number.POSITIVE_INFINITY && r.borderType !== s && (o[t] = Math.max(o[t], n))
                    }
                    ), (e=>a.successors(e))),
                    Object.keys(r))) {
                        var d = r[l];
                        o[d] = o[n[d]]
                    }
                    return o
                }
                function ce(e, t) {
                    return d(p(t), (function(t) {
                        var n = Number.NEGATIVE_INFINITY
                          , r = Number.POSITIVE_INFINITY;
                        for (var i in t) {
                            var o = t[i]
                              , a = fe(e, i) / 2;
                            n = Math.max(o + a, n),
                            r = Math.min(o - a, r)
                        }
                        return n - r
                    }
                    ))
                }
                function le(e, t) {
                    var n = p(t)
                      , r = Math.min(...n)
                      , i = Math.max(...n);
                    for (var o of ["ul", "ur", "dl", "dr"]) {
                        var a = o[1]
                          , s = e[o];
                        if (s !== t) {
                            var c = p(s)
                              , d = "l" === a ? r - Math.min(...c) : i - Math.max(...c);
                            d && (e[o] = l(s, (e=>e + d)))
                        }
                    }
                }
                function de(e, t) {
                    return l(e.ul, (function(n, r) {
                        if (t)
                            return e[t.toLowerCase()][r];
                        var i = u([e.ul[r], e.ur[r], e.dl[r], e.dr[r]], (e=>e));
                        return (i[1] + i[2]) / 2
                    }
                    ))
                }
                function he(e) {
                    var t, n = P(e), r = Object.assign(Object.assign({}, te(e, n)), ne(e, n)), i = {
                        ul: {},
                        ur: {},
                        dl: {},
                        dr: {}
                    };
                    for (var o of ["u", "d"])
                        for (var a of (t = "u" === o ? n : n.map((e=>e)).reverse(),
                        ["l", "r"])) {
                            "r" === a && (t = t.map((e=>e.map((e=>e)).reverse())));
                            var s = ae(0, t, r, ("u" === o ? e.predecessors : e.successors).bind(e))
                              , c = se(e, t, s.root, s.align, "r" === a);
                            "r" === a && (c = l(c, (e=>-e))),
                            i[o + a] = c
                        }
                    return le(i, ce(e, i)),
                    de(i, e.graph().align)
                }
                function ue(e, t, n) {
                    return function(r, i, o) {
                        var a, c = r.node(i), l = r.node(o), d = 0;
                        if (d += c.width / 2,
                        s(c, "labelpos"))
                            switch (c.labelpos.toLowerCase()) {
                            case "l":
                                a = -c.width / 2;
                                break;
                            case "r":
                                a = c.width / 2
                            }
                        if (a && (d += n ? a : -a),
                        a = 0,
                        d += (c.dummy ? t : e) / 2,
                        d += (l.dummy ? t : e) / 2,
                        d += l.width / 2,
                        s(l, "labelpos"))
                            switch (l.labelpos.toLowerCase()) {
                            case "l":
                                a = l.width / 2;
                                break;
                            case "r":
                                a = -l.width / 2
                            }
                        return a && (d += n ? a : -a),
                        a = 0,
                        d
                    }
                }
                function fe(e, t) {
                    return e.node(t).width
                }
                var pe = Object.freeze({
                    __proto__: null,
                    findType1Conflicts: te,
                    findType2Conflicts: ne,
                    findOtherInnerSegmentNode: re,
                    addConflict: ie,
                    hasConflict: oe,
                    verticalAlignment: ae,
                    horizontalCompaction: se,
                    findSmallestWidthAlignment: ce,
                    alignCoordinates: le,
                    balance: de,
                    positionX: he,
                    sep: ue,
                    width: fe
                });
                function ge(e) {
                    !function(e) {
                        var t = P(e)
                          , n = e.graph().ranksep
                          , r = 0;
                        for (var i of t) {
                            var o = Math.max(...i.map((t=>e.node(t).height)));
                            for (var a of i)
                                e.node(a).y = r + o / 2;
                            r += o + n
                        }
                    }(e = C(e));
                    var t = he(e);
                    for (var n in t)
                        e.node(n).x = t[n]
                }
                var ve = Object.freeze({
                    __proto__: null,
                    bk: pe,
                    position: ge
                });
                function me(e) {
                    var t = {};
                    e.sources().forEach((function n(r) {
                        var i = e.node(r);
                        if (s(t, r))
                            return i.rank;
                        t[r] = !0;
                        var o = Math.min(...e.outEdges(r).map((t=>n(t.w) - e.edge(t).minlen)));
                        return o !== Number.POSITIVE_INFINITY && null != o || (o = 0),
                        i.rank = o
                    }
                    ))
                }
                function ye(e, t) {
                    return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen
                }
                function we(e) {
                    var t, n = new S({
                        directed: !1
                    }), r = e.nodes()[0], i = e.nodeCount();
                    for (n.setNode(r, {}); o(e) < i; )
                        t = a(e),
                        s(e, n.hasNode(t.v) ? ye(e, t) : -ye(e, t));
                    return n;
                    function o(e) {
                        return n.nodes().forEach((function t(r) {
                            for (var i of e.nodeEdges(r)) {
                                var o = i.v
                                  , a = r === o ? i.w : o;
                                n.hasNode(a) || ye(e, i) || (n.setNode(a, {}),
                                n.setEdge(r, a, {}),
                                t(a))
                            }
                        }
                        )),
                        n.nodeCount()
                    }
                    function a(e) {
                        return d(e.edges(), (function(t) {
                            if (n.hasNode(t.v) !== n.hasNode(t.w))
                                return ye(e, t)
                        }
                        ))
                    }
                    function s(e, t) {
                        for (var r of n.nodes())
                            e.node(r).rank += t
                    }
                }
                class xe {
                    constructor() {
                        this._arr = [],
                        this._keyIndices = {}
                    }
                    size() {
                        return this._arr.length
                    }
                    keys() {
                        return this._arr.map((function(e) {
                            return e.key
                        }
                        ))
                    }
                    has(e) {
                        return e in this._keyIndices
                    }
                    priority(e) {
                        var t = this._keyIndices[e];
                        if (void 0 !== t)
                            return this._arr[t].priority
                    }
                    min() {
                        if (0 === this.size())
                            throw new Error("Queue underflow");
                        return this._arr[0].key
                    }
                    add(e, t) {
                        var n = this._keyIndices;
                        if (!((e = String(e))in n)) {
                            var r = this._arr
                              , i = r.length;
                            return n[e] = i,
                            r.push({
                                key: e,
                                priority: t
                            }),
                            this._decrease(i),
                            !0
                        }
                        return !1
                    }
                    removeMin() {
                        this._swap(0, this._arr.length - 1);
                        var e = this._arr.pop();
                        return delete this._keyIndices[e.key],
                        this._heapify(0),
                        e.key
                    }
                    decrease(e, t) {
                        var n = this._keyIndices[e];
                        if (t > this._arr[n].priority)
                            throw new Error("New priority is greater than current priority. Key: " + e + " Old: " + this._arr[n].priority + " New: " + t);
                        this._arr[n].priority = t,
                        this._decrease(n)
                    }
                    _heapify(e) {
                        var t = this._arr
                          , n = 2 * e
                          , r = n + 1
                          , i = e;
                        n < t.length && (i = t[n].priority < t[i].priority ? n : i,
                        r < t.length && (i = t[r].priority < t[i].priority ? r : i),
                        i !== e && (this._swap(e, i),
                        this._heapify(i)))
                    }
                    _decrease(e) {
                        for (var t, n = this._arr, r = n[e].priority; 0 !== e && !(n[t = e >> 1].priority < r); )
                            this._swap(e, t),
                            e = t
                    }
                    _swap(e, t) {
                        var n = this._arr
                          , r = this._keyIndices
                          , i = n[e]
                          , o = n[t];
                        n[e] = o,
                        n[t] = i,
                        r[o.key] = e,
                        r[i.key] = t
                    }
                }
                var be = ()=>1;
                function ke(e, t, n, r) {
                    return function(e, t, n, r) {
                        var i, o, a = {}, s = new xe, c = function(e) {
                            var t = e.v !== i ? e.v : e.w
                              , r = a[t]
                              , c = n(e)
                              , l = o.distance + c;
                            if (c < 0)
                                throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + e + " Weight: " + c);
                            l < r.distance && (r.distance = l,
                            r.predecessor = i,
                            s.decrease(t, l))
                        };
                        for (e.nodes().forEach((function(e) {
                            var n = e === t ? 0 : Number.POSITIVE_INFINITY;
                            a[e] = {
                                distance: n
                            },
                            s.add(e, n)
                        }
                        )); s.size() > 0 && (i = s.removeMin(),
                        (o = a[i]).distance !== Number.POSITIVE_INFINITY); )
                            r(i).forEach(c);
                        return a
                    }(e, String(t), n || be, r || function(t) {
                        return e.outEdges(t)
                    }
                    )
                }
                function _e(e) {
                    var t = 0
                      , n = []
                      , r = {}
                      , i = [];
                    function o(a) {
                        var s = r[a] = {
                            onStack: !0,
                            lowlink: t,
                            index: t++
                        };
                        if (n.push(a),
                        e.successors(a).forEach((function(e) {
                            e in r ? r[e].onStack && (s.lowlink = Math.min(s.lowlink, r[e].index)) : (o(e),
                            s.lowlink = Math.min(s.lowlink, r[e].lowlink))
                        }
                        )),
                        s.lowlink === s.index) {
                            var c, l = [];
                            do {
                                c = n.pop(),
                                r[c].onStack = !1,
                                l.push(c)
                            } while (a !== c);
                            i.push(l)
                        }
                    }
                    return e.nodes().forEach((function(e) {
                        e in r || o(e)
                    }
                    )),
                    i
                }
                var Ee = ()=>1;
                class Se extends Error {
                }
                function Me(e) {
                    var t = {}
                      , n = {}
                      , r = [];
                    function i(o) {
                        if (o in n)
                            throw new Se;
                        if (!(o in t)) {
                            for (var a of (n[o] = !0,
                            t[o] = !0,
                            e.predecessors(o)))
                                i(a);
                            delete n[o],
                            r.push(o)
                        }
                    }
                    for (var o of e.sinks())
                        i(o);
                    if (Object.keys(t).length !== e.nodeCount())
                        throw new Se;
                    return r
                }
                function ze(e, t, n) {
                    var r = Array.isArray(t) ? t : [t]
                      , i = (e.isDirected() ? e.successors : e.neighbors).bind(e)
                      , o = []
                      , a = {};
                    for (var s of r) {
                        if (!e.hasNode(s))
                            throw new Error("Graph does not have node: " + s);
                        Ne(e, s, "post" === n, a, i, o)
                    }
                    return o
                }
                function Ne(e, t, n, r, i, o) {
                    if (!(t in r)) {
                        for (var a of (r[t] = !0,
                        n || o.push(t),
                        i(t)))
                            Ne(e, a, n, r, i, o);
                        n && o.push(t)
                    }
                }
                function Le(e, t) {
                    return ze(e, t, "post")
                }
                function Te(e, t) {
                    return ze(e, t, "pre")
                }
                var Ie = Object.freeze({
                    __proto__: null,
                    components: function(e) {
                        var t, n = {}, r = [];
                        function i(r) {
                            if (!(r in n)) {
                                for (var o of (n[r] = !0,
                                t.push(r),
                                e.successors(r)))
                                    i(o);
                                for (var a of e.predecessors(r))
                                    i(a)
                            }
                        }
                        for (var o of e.nodes())
                            t = [],
                            i(o),
                            t.length && r.push(t);
                        return r
                    },
                    dijkstra: ke,
                    dijkstraAll: function(e, t, n) {
                        var r = {};
                        for (var i of e.nodes())
                            r[i] = ke(e, i, t, n);
                        return r
                    },
                    findCycles: function(e) {
                        return _e(e).filter((function(t) {
                            return t.length > 1 || 1 === t.length && e.hasEdge(t[0], t[0])
                        }
                        ))
                    },
                    floydWarshall: function(e, t, n) {
                        return function(e, t, n) {
                            var r = {}
                              , i = e.nodes();
                            return i.forEach((function(e) {
                                r[e] = {},
                                r[e][e] = {
                                    distance: 0
                                },
                                i.forEach((function(t) {
                                    e !== t && (r[e][t] = {
                                        distance: Number.POSITIVE_INFINITY
                                    })
                                }
                                )),
                                n(e).forEach((function(n) {
                                    var i = n.v === e ? n.w : n.v
                                      , o = t(n);
                                    r[e][i] = {
                                        distance: o,
                                        predecessor: e
                                    }
                                }
                                ))
                            }
                            )),
                            i.forEach((function(e) {
                                var t = r[e];
                                i.forEach((function(n) {
                                    var o = r[n];
                                    i.forEach((function(n) {
                                        var r = o[e]
                                          , i = t[n]
                                          , a = o[n]
                                          , s = r.distance + i.distance;
                                        s < a.distance && (a.distance = s,
                                        a.predecessor = i.predecessor)
                                    }
                                    ))
                                }
                                ))
                            }
                            )),
                            r
                        }(e, t || Ee, n || function(t) {
                            return e.outEdges(t)
                        }
                        )
                    },
                    isAcyclic: function(e) {
                        try {
                            Me(e)
                        } catch (e) {
                            if (e instanceof Se)
                                return !1;
                            throw e
                        }
                        return !0
                    },
                    postorder: Le,
                    preorder: Te,
                    prim: function(e, t) {
                        var n, r = new M({}), i = {}, o = new xe;
                        function a(e) {
                            var r = e.v === n ? e.w : e.v
                              , a = o.priority(r);
                            if (void 0 !== a) {
                                var s = t(e);
                                s < a && (i[r] = n,
                                o.decrease(r, s))
                            }
                        }
                        if (0 === e.nodeCount())
                            return r;
                        for (n of e.nodes())
                            o.add(n, Number.POSITIVE_INFINITY),
                            r.setNode(n);
                        o.decrease(e.nodes()[0], 0);
                        for (var s = !1; o.size() > 0; ) {
                            if ((n = o.removeMin())in i)
                                r.setEdge(n, i[n]);
                            else {
                                if (s)
                                    throw new Error("Input graph is not connected: " + e);
                                s = !0
                            }
                            e.nodeEdges(n).forEach(a)
                        }
                        return r
                    },
                    tarjan: _e,
                    topsort: Me
                });
                function Oe(e) {
                    me(e = O(e));
                    var t, n = we(e);
                    for (Ae(n),
                    Ce(n, e); t = De(n); )
                        Be(n, e, t, Fe(n, e, t))
                }
                function Ce(e, t) {
                    var n = Le(e, e.nodes());
                    for (var r of n = n.slice(0, n.length - 1))
                        je(e, t, r)
                }
                function je(e, t, n) {
                    var r = e.node(n).parent;
                    e.edge(n, r).cutvalue = Pe(e, t, n)
                }
                function Pe(e, t, n) {
                    var r, i, o = e.node(n).parent, a = !0, s = t.edge(n, o), c = 0;
                    for (var l of (s || (a = !1,
                    s = t.edge(o, n)),
                    c = s.weight,
                    t.nodeEdges(n))) {
                        var d = l.v === n
                          , h = d ? l.w : l.v;
                        if (h !== o) {
                            var u = d === a
                              , f = t.edge(l).weight;
                            if (c += u ? f : -f,
                            r = n,
                            i = h,
                            e.hasEdge(r, i)) {
                                var p = e.edge(n, h).cutvalue;
                                c += u ? -p : p
                            }
                        }
                    }
                    return c
                }
                function Ae(e, t) {
                    arguments.length < 2 && (t = e.nodes()[0]),
                    Re(e, {}, 1, t)
                }
                function Re(e, t, n, r, i) {
                    var o = n
                      , a = e.node(r);
                    for (var c of (t[r] = !0,
                    e.neighbors(r)))
                        s(t, c) || (n = Re(e, t, n, c, r));
                    return a.low = o,
                    a.lim = n++,
                    i ? a.parent = i : delete a.parent,
                    n
                }
                function De(e) {
                    for (var t of e.edges())
                        if (e.edge(t).cutvalue < 0)
                            return t
                }
                function Fe(e, t, n) {
                    var r = n.v
                      , i = n.w;
                    t.hasEdge(r, i) || (r = n.w,
                    i = n.v);
                    var o = e.node(r)
                      , a = e.node(i)
                      , s = o
                      , c = !1;
                    return o.lim > a.lim && (s = a,
                    c = !0),
                    d(t.edges().filter((function(t) {
                        return c === qe(e, e.node(t.v), s) && c !== qe(e, e.node(t.w), s)
                    }
                    )), (e=>ye(t, e)))
                }
                function Be(e, t, n, r) {
                    var i = n.v
                      , o = n.w;
                    e.removeEdge(i, o),
                    e.setEdge(r.v, r.w, {}),
                    Ae(e),
                    Ce(e, t),
                    function(e, t) {
                        var n = function(e, t) {
                            for (var n of e.nodes())
                                if (!t.node(n).parent)
                                    return n
                        }(e, t)
                          , r = Te(e, n);
                        for (var i of r = r.slice(1)) {
                            var o = e.node(i).parent
                              , a = t.edge(i, o)
                              , s = !1;
                            a || (a = t.edge(o, i),
                            s = !0),
                            t.node(i).rank = t.node(o).rank + (s ? a.minlen : -a.minlen)
                        }
                    }(e, t)
                }
                function qe(e, t, n) {
                    return n.low <= t.lim && t.lim <= n.lim
                }
                function $e(e) {
                    switch (e.graph().ranker) {
                    case "network-simplex":
                    default:
                        We(e);
                        break;
                    case "tight-tree":
                        Ge(e);
                        break;
                    case "longest-path":
                        Ve(e)
                    }
                }
                Oe.initLowLimValues = Ae,
                Oe.initCutValues = Ce,
                Oe.calcCutValue = Pe,
                Oe.leaveEdge = De,
                Oe.enterEdge = Fe,
                Oe.exchangeEdges = Be;
                var Ve = me;
                function Ge(e) {
                    me(e),
                    we(e)
                }
                function We(e) {
                    Oe(e)
                }
                var He = Object.freeze({
                    __proto__: null,
                    rank: $e,
                    tightTreeRanker: Ge,
                    networkSimplexRanker: We,
                    networkSimplex: Oe,
                    feasibleTree: we,
                    longestPath: me
                })
                  , Ye = e=>1;
                function Je(e, n) {
                    if (e.nodeCount() <= 1)
                        return [];
                    var r = function(e, n) {
                        var r = new S
                          , i = 0
                          , o = 0;
                        for (var a of e.nodes())
                            r.setNode(a, {
                                v: a,
                                in: 0,
                                out: 0
                            });
                        for (var s of e.edges()) {
                            var c = r.edge(s.v, s.w) || 0
                              , l = n(s)
                              , d = c + l;
                            r.setEdge(s.v, s.w, d),
                            o = Math.max(o, r.node(s.v).out += l),
                            i = Math.max(i, r.node(s.w).in += l)
                        }
                        var h = g(o + i + 3, (()=>new t))
                          , u = i + 1;
                        for (var a of r.nodes())
                            Ke(h, u, r.node(a));
                        return {
                            graph: r,
                            buckets: h,
                            zeroIdx: u
                        }
                    }(e, n || Ye);
                    return a(function(e, t, n) {
                        for (var r, i = [], o = t[t.length - 1], a = t[0]; e.nodeCount(); ) {
                            for (; r = a.dequeue(); )
                                Ue(e, t, n, r);
                            for (; r = o.dequeue(); )
                                Ue(e, t, n, r);
                            if (e.nodeCount())
                                for (var s = t.length - 2; s > 0; --s)
                                    if (r = t[s].dequeue()) {
                                        i = i.concat(Ue(e, t, n, r, !0));
                                        break
                                    }
                        }
                        return i
                    }(r.graph, r.buckets, r.zeroIdx).map((t=>e.outEdges(t.v, t.w))))
                }
                function Ue(e, t, n, r, i) {
                    var o = i ? [] : void 0;
                    for (var a of e.inEdges(r.v)) {
                        var s = e.edge(a)
                          , c = e.node(a.v);
                        i && o.push({
                            v: a.v,
                            w: a.w
                        }),
                        c.out -= s,
                        Ke(t, n, c)
                    }
                    for (var a of e.outEdges(r.v)) {
                        s = e.edge(a);
                        var l = a.w
                          , d = e.node(l);
                        d.in -= s,
                        Ke(t, n, d)
                    }
                    return e.removeNode(r.v),
                    o
                }
                function Ke(e, t, n) {
                    n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n)
                }
                var Qe = {
                    run: function(e) {
                        var t = "greedy" === e.graph().acyclicer ? Je(e, function(e) {
                            return function(t) {
                                return e.edge(t).weight
                            }
                        }(e)) : function(e) {
                            var t = []
                              , n = {}
                              , r = {};
                            function i(o) {
                                if (!s(r, o)) {
                                    for (var a of (r[o] = !0,
                                    n[o] = !0,
                                    e.outEdges(o)))
                                        s(n, a.w) ? t.push(a) : i(a.w);
                                    delete n[o]
                                }
                            }
                            return e.nodes().forEach(i),
                            t
                        }(e);
                        for (var n of t) {
                            var r = e.edge(n);
                            e.removeEdge(n),
                            r.forwardName = n.name,
                            r.reversed = !0,
                            e.setEdge(n.w, n.v, r, f("rev"))
                        }
                    },
                    undo: function(e) {
                        for (var t of e.edges()) {
                            var n = e.edge(t);
                            if (n.reversed) {
                                e.removeEdge(t);
                                var r = n.forwardName;
                                delete n.reversed,
                                delete n.forwardName,
                                e.setEdge(t.w, t.v, n, r)
                            }
                        }
                    }
                };
                function Ze(e) {
                    e.children().forEach((function t(n) {
                        var r = e.children(n)
                          , i = e.node(n);
                        if (r.length && r.forEach(t),
                        s(i, "minRank")) {
                            i.borderLeft = [],
                            i.borderRight = [];
                            for (var o = i.minRank, a = i.maxRank + 1; o < a; ++o)
                                Xe(e, "borderLeft", "_bl", n, i, o),
                                Xe(e, "borderRight", "_br", n, i, o)
                        }
                    }
                    ))
                }
                function Xe(e, t, n, r, i, o) {
                    var a = {
                        width: 0,
                        height: 0,
                        rank: o,
                        borderType: t
                    }
                      , s = i[t][o - 1]
                      , c = I(e, "border", a, n);
                    i[t][o] = c,
                    e.setParent(c, r),
                    s && e.setEdge(s, c, {
                        weight: 1
                    })
                }
                var et = {
                    adjust: function(e) {
                        var t = e.graph().rankdir.toLowerCase();
                        "lr" !== t && "rl" !== t || tt(e)
                    },
                    undo: function(e) {
                        var t = e.graph().rankdir.toLowerCase();
                        "bt" !== t && "rl" !== t || function(e) {
                            for (var t of e.nodes())
                                rt(e.node(t));
                            for (var n of e.edges()) {
                                var r = e.edge(n);
                                r.points.forEach(rt),
                                s(r, "y") && rt(r)
                            }
                        }(e),
                        "lr" !== t && "rl" !== t || (function(e) {
                            for (var t of e.nodes())
                                it(e.node(t));
                            for (var n of e.edges()) {
                                var r = e.edge(n);
                                r.points.forEach(it),
                                s(r, "x") && it(r)
                            }
                        }(e),
                        tt(e))
                    }
                };
                function tt(e) {
                    for (var t of e.nodes())
                        nt(e.node(t));
                    for (var n of e.edges())
                        nt(e.edge(n))
                }
                function nt(e) {
                    var t = e.width;
                    e.width = e.height,
                    e.height = t
                }
                function rt(e) {
                    e.y = -e.y
                }
                function it(e) {
                    var t = e.x;
                    e.x = e.y,
                    e.y = t
                }
                var ot = Object.freeze({
                    __proto__: null,
                    debugOrdering: function(e) {
                        var t = P(e)
                          , n = new S({
                            compound: !0,
                            multigraph: !0
                        }).setGraph({});
                        for (var r of e.nodes())
                            n.setNode(r, {
                                label: r
                            }),
                            n.setParent(r, "layer" + e.node(r).rank);
                        for (var i of e.edges())
                            n.setEdge(i.v, i.w, {}, i.name);
                        var o = 0;
                        for (var a of t) {
                            var s = "layer" + o;
                            o++,
                            n.setNode(s, {
                                rank: "same"
                            }),
                            a.reduce((function(e, t) {
                                return n.setEdge(e.toString(), t, {
                                    style: "invis"
                                }),
                                t
                            }
                            ))
                        }
                        return n
                    }
                })
                  , at = {
                    run: function(e) {
                        for (var t of (e.graph().dummyChains = [],
                        e.edges()))
                            st(e, t)
                    },
                    undo: function(e) {
                        for (var t of e.graph().dummyChains) {
                            var n, r = e.node(t), i = r.edgeLabel;
                            for (e.setEdge(r.edgeObj, i); r.dummy; )
                                n = e.successors(t)[0],
                                e.removeNode(t),
                                i.points.push({
                                    x: r.x,
                                    y: r.y
                                }),
                                "edge-label" === r.dummy && (i.x = r.x,
                                i.y = r.y,
                                i.width = r.width,
                                i.height = r.height),
                                t = n,
                                r = e.node(t)
                        }
                    }
                };
                function st(e, t) {
                    var n = t.v
                      , r = e.node(n).rank
                      , i = t.w
                      , o = e.node(i).rank
                      , a = t.name
                      , s = e.edge(t)
                      , c = s.labelRank;
                    if (o !== r + 1) {
                        var l, d, h;
                        for (e.removeEdge(t),
                        h = 0,
                        ++r; r < o; ++h,
                        ++r)
                            s.points = [],
                            l = I(e, "edge", d = {
                                width: 0,
                                height: 0,
                                edgeLabel: s,
                                edgeObj: t,
                                rank: r
                            }, "_d"),
                            r === c && (d.width = s.width,
                            d.height = s.height,
                            d.dummy = "edge-label",
                            d.labelpos = s.labelpos),
                            e.setEdge(n, l, {
                                weight: s.weight
                            }, a),
                            0 === h && e.graph().dummyChains.push(l),
                            n = l;
                        e.setEdge(n, i, {
                            weight: s.weight
                        }, a)
                    }
                }
                function ct(e) {
                    var t = function(e) {
                        var t = {}
                          , n = 0;
                        function r(i) {
                            var o = n;
                            e.children(i).forEach(r),
                            t[i] = {
                                low: o,
                                lim: n++
                            }
                        }
                        return e.children().forEach(r),
                        t
                    }(e);
                    for (var n of e.graph().dummyChains)
                        for (var r = e.node(n), i = r.edgeObj, o = lt(e, t, i.v, i.w), a = o.path, s = o.lca, c = 0, l = a[c], d = !0; n !== i.w; ) {
                            if (r = e.node(n),
                            d) {
                                for (; (l = a[c]) !== s && e.node(l).maxRank < r.rank; )
                                    c++;
                                l === s && (d = !1)
                            }
                            if (!d) {
                                for (; c < a.length - 1 && e.node(l = a[c + 1]).minRank <= r.rank; )
                                    c++;
                                l = a[c]
                            }
                            e.setParent(n, l),
                            n = e.successors(n)[0]
                        }
                }
                function lt(e, t, n, r) {
                    var i, o, a = [], s = [], c = Math.min(t[n].low, t[r].low), l = Math.max(t[n].lim, t[r].lim);
                    i = n;
                    do {
                        i = e.parent(i),
                        a.push(i)
                    } while (i && (t[i].low > c || l > t[i].lim));
                    for (o = i,
                    i = r; (i = e.parent(i)) !== o; )
                        s.push(i);
                    return {
                        path: a.concat(s.reverse()),
                        lca: o
                    }
                }
                var dt = {
                    run: function(e) {
                        var t = I(e, "root", {}, "_root")
                          , n = function(e) {
                            var t = {};
                            function n(r, i) {
                                var o = e.children(r);
                                if (o && o.length)
                                    for (var a of o)
                                        n(a, i + 1);
                                t[r] = i
                            }
                            for (var r of e.children())
                                n(r, 1);
                            return t
                        }(e)
                          , r = Math.max(...p(n)) - 1
                          , i = 2 * r + 1;
                        for (var o of (e.graph().nestingRoot = t,
                        e.edges()))
                            e.edge(o).minlen *= i;
                        var a = function(e) {
                            return e.edges().reduce(((t,n)=>t + e.edge(n).weight), 0)
                        }(e) + 1;
                        for (var s of e.children())
                            ht(e, t, i, a, r, n, s);
                        e.graph().nodeRankFactor = i
                    },
                    cleanup: function(e) {
                        var t = e.graph();
                        for (var n of (e.removeNode(t.nestingRoot),
                        delete t.nestingRoot,
                        e.edges()))
                            e.edge(n).nestingEdge && e.removeEdge(n)
                    }
                };
                function ht(e, t, n, r, i, o, a) {
                    var s = e.children(a);
                    if (s.length) {
                        var c = D(e, "_bt")
                          , l = D(e, "_bb")
                          , d = e.node(a);
                        for (var h of (e.setParent(c, a),
                        d.borderTop = c,
                        e.setParent(l, a),
                        d.borderBottom = l,
                        s)) {
                            ht(e, t, n, r, i, o, h);
                            var u = e.node(h)
                              , f = u.borderTop ? u.borderTop : h
                              , p = u.borderBottom ? u.borderBottom : h
                              , g = u.borderTop ? r : 2 * r
                              , v = f !== p ? 1 : i - o[a] + 1;
                            e.setEdge(c, f, {
                                weight: g,
                                minlen: v,
                                nestingEdge: !0
                            }),
                            e.setEdge(p, l, {
                                weight: g,
                                minlen: v,
                                nestingEdge: !0
                            })
                        }
                        e.parent(a) || e.setEdge(t, c, {
                            weight: 0,
                            minlen: i + o[a]
                        })
                    } else
                        a !== t && e.setEdge(t, a, {
                            weight: 0,
                            minlen: n
                        })
                }
                function ut(e) {
                    return "edge-proxy" == e.dummy
                }
                function ft(e) {
                    return "selfedge" == e.dummy
                }
                var pt = 50
                  , gt = 20
                  , vt = 50
                  , mt = "tb"
                  , yt = 1
                  , wt = 1
                  , xt = 0
                  , bt = 0
                  , kt = 10
                  , _t = "r";
                function Et(e={}) {
                    var t = {};
                    for (var n of Object.keys(e))
                        t[n.toLowerCase()] = e[n];
                    return t
                }
                function St(e) {
                    return e.nodes().map((function(t) {
                        var n = e.node(t)
                          , r = e.parent(t)
                          , i = {
                            v: t
                        };
                        return void 0 !== n && (i.value = n),
                        void 0 !== r && (i.parent = r),
                        i
                    }
                    ))
                }
                function Mt(e) {
                    return e.edges().map((function(t) {
                        var n = e.edge(t)
                          , r = {
                            v: t.v,
                            w: t.w
                        };
                        return void 0 !== t.name && (r.name = t.name),
                        void 0 !== n && (r.value = n),
                        r
                    }
                    ))
                }
                var zt = Object.freeze({
                    __proto__: null,
                    write: function(e) {
                        var t = {
                            options: {
                                directed: e.isDirected(),
                                multigraph: e.isMultigraph(),
                                compound: e.isCompound()
                            },
                            nodes: St(e),
                            edges: Mt(e)
                        };
                        return void 0 !== e.graph() && (t.value = JSON.parse(JSON.stringify(e.graph()))),
                        t
                    },
                    read: function(e) {
                        var t = new S(e.options).setGraph(e.value);
                        for (var n of e.nodes)
                            t.setNode(n.v, n.value),
                            n.parent && t.setParent(n.v, n.parent);
                        for (var n of e.edges)
                            t.setEdge({
                                v: n.v,
                                w: n.w,
                                name: n.name
                            }, n.value);
                        return t
                    }
                })
                  , Nt = {
                    Graph: S,
                    GraphLike: M,
                    alg: Ie,
                    json: zt,
                    PriorityQueue: xe
                };
                e.Graph = S,
                e.GraphLike = M,
                e.PriorityQueue = xe,
                e.acyclic = Qe,
                e.addBorderSegments = Ze,
                e.alg = Ie,
                e.coordinateSystem = et,
                e.data = i,
                e.debug = ot,
                e.graphlib = Nt,
                e.greedyFAS = Je,
                e.json = zt,
                e.layout = function(e, t) {
                    var n = t && t.debugTiming ? q : $;
                    n("layout", (function() {
                        var t = n("  buildLayoutGraph", (function() {
                            return function(e) {
                                var t, n, r, i, o, a, s, c, l, d, h, u, f, p, g, v = new S({
                                    multigraph: !0,
                                    compound: !0
                                }), m = Et(e.graph()), y = {
                                    nodesep: null !== (t = m.nodesep) && void 0 !== t ? t : vt,
                                    edgesep: null !== (n = m.edgesep) && void 0 !== n ? n : gt,
                                    ranksep: null !== (r = m.ranksep) && void 0 !== r ? r : pt,
                                    marginx: +(null !== (i = m.marginx) && void 0 !== i ? i : 0),
                                    marginy: +(null !== (o = m.marginy) && void 0 !== o ? o : 0),
                                    acyclicer: m.acyclicer,
                                    ranker: null !== (a = m.ranker) && void 0 !== a ? a : "network-simplex",
                                    rankdir: null !== (s = m.rankdir) && void 0 !== s ? s : mt,
                                    align: m.align
                                };
                                for (var w of (v.setGraph(y),
                                e.nodes())) {
                                    var x = Et(e.node(w))
                                      , b = {
                                        width: +(null !== (c = x && x.width) && void 0 !== c ? c : 0),
                                        height: +(null !== (l = x && x.height) && void 0 !== l ? l : 0)
                                    };
                                    v.setNode(w, b),
                                    v.setParent(w, e.parent(w))
                                }
                                for (var k of e.edges()) {
                                    var _ = Et(e.edge(k))
                                      , E = {
                                        minlen: null !== (d = _.minlen) && void 0 !== d ? d : yt,
                                        weight: null !== (h = _.weight) && void 0 !== h ? h : wt,
                                        width: null !== (u = _.width) && void 0 !== u ? u : xt,
                                        height: null !== (f = _.height) && void 0 !== f ? f : bt,
                                        labeloffset: null !== (p = _.labeloffset) && void 0 !== p ? p : kt,
                                        labelpos: null !== (g = _.labelpos) && void 0 !== g ? g : _t
                                    };
                                    v.setEdge(k, E)
                                }
                                return v
                            }(e)
                        }
                        ));
                        n("  runLayout", (function() {
                            !function(e, t) {
                                t("    makeSpaceForEdgeLabels", (function() {
                                    !function(e) {
                                        var t = e.graph();
                                        for (var n of (t.ranksep /= 2,
                                        e.edges())) {
                                            var r = e.edge(n);
                                            r.minlen *= 2,
                                            "c" !== r.labelpos.toLowerCase() && ("TB" === t.rankdir || "BT" === t.rankdir ? r.width += r.labeloffset : r.height += r.labeloffset)
                                        }
                                    }(e)
                                }
                                )),
                                t("    removeSelfEdges", (function() {
                                    !function(e) {
                                        for (var t of e.edges())
                                            if (t.v === t.w) {
                                                var n = e.node(t.v);
                                                n.selfEdges || (n.selfEdges = []),
                                                n.selfEdges.push({
                                                    e: t,
                                                    label: e.edge(t)
                                                }),
                                                e.removeEdge(t)
                                            }
                                    }(e)
                                }
                                )),
                                t("    acyclic", (function() {
                                    Qe.run(e)
                                }
                                )),
                                t("    nestingGraph.run", (function() {
                                    dt.run(e)
                                }
                                )),
                                t("    rank", (function() {
                                    $e(C(e))
                                }
                                )),
                                t("    injectEdgeLabelProxies", (function() {
                                    !function(e) {
                                        for (var t of e.edges()) {
                                            var n = e.edge(t);
                                            if (n.width && n.height) {
                                                var r = e.node(t.v)
                                                  , i = e.node(t.w);
                                                I(e, "edge-proxy", {
                                                    rank: (i.rank - r.rank) / 2 + r.rank,
                                                    e: t
                                                }, "_ep")
                                            }
                                        }
                                    }(e)
                                }
                                )),
                                t("    removeEmptyRanks", (function() {
                                    R(e)
                                }
                                )),
                                t("    nestingGraph.cleanup", (function() {
                                    dt.cleanup(e)
                                }
                                )),
                                t("    normalizeRanks", (function() {
                                    A(e)
                                }
                                )),
                                t("    assignRankMinMax", (function() {
                                    !function(e) {
                                        var t = 0;
                                        for (var n of e.nodes()) {
                                            var r = e.node(n);
                                            r.borderTop && (r.minRank = e.node(r.borderTop).rank,
                                            r.maxRank = e.node(r.borderBottom).rank,
                                            t = Math.max(t, r.maxRank))
                                        }
                                        e.graph().maxRank = t
                                    }(e)
                                }
                                )),
                                t("    removeEdgeLabelProxies", (function() {
                                    !function(e) {
                                        for (var t of e.nodes()) {
                                            var n = e.node(t);
                                            ut(n) && (e.edge(n.e).labelRank = n.rank,
                                            e.removeNode(t))
                                        }
                                    }(e)
                                }
                                )),
                                t("    normalize.run", (function() {
                                    at.run(e)
                                }
                                )),
                                t("    parentDummyChains", (function() {
                                    ct(e)
                                }
                                )),
                                t("    addBorderSegments", (function() {
                                    Ze(e)
                                }
                                )),
                                t("    order", (function() {
                                    K(e)
                                }
                                )),
                                t("    insertSelfEdges", (function() {
                                    !function(e) {
                                        var t, n = P(e);
                                        for (var r of n)
                                            for (var i = 0, o = 0; o < r.length; o++) {
                                                var a = r[o]
                                                  , s = e.node(a);
                                                for (var c of (s.order = o + i,
                                                null !== (t = s.selfEdges) && void 0 !== t ? t : []))
                                                    I(e, "selfedge", {
                                                        width: c.label.width,
                                                        height: c.label.height,
                                                        rank: s.rank,
                                                        order: o + ++i,
                                                        e: c.e,
                                                        label: c.label
                                                    }, "_se");
                                                delete s.selfEdges
                                            }
                                    }(e)
                                }
                                )),
                                t("    adjustCoordinateSystem", (function() {
                                    et.adjust(e)
                                }
                                )),
                                t("    position", (function() {
                                    ge(e)
                                }
                                )),
                                t("    positionSelfEdges", (function() {
                                    !function(e) {
                                        for (var t of e.nodes()) {
                                            var n = e.node(t);
                                            if (ft(n)) {
                                                var r = e.node(n.e.v)
                                                  , i = r.x + r.width / 2
                                                  , o = r.y
                                                  , a = n.x - i
                                                  , s = r.height / 2;
                                                e.setEdge(n.e, n.label),
                                                e.removeNode(t),
                                                n.label.points = [{
                                                    x: i + 2 * a / 3,
                                                    y: o - s
                                                }, {
                                                    x: i + 5 * a / 6,
                                                    y: o - s
                                                }, {
                                                    x: i + a,
                                                    y: o
                                                }, {
                                                    x: i + 5 * a / 6,
                                                    y: o + s
                                                }, {
                                                    x: i + 2 * a / 3,
                                                    y: o + s
                                                }],
                                                n.label.x = n.x,
                                                n.label.y = n.y
                                            }
                                        }
                                    }(e)
                                }
                                )),
                                t("    removeBorderNodes", (function() {
                                    !function(e) {
                                        for (var t of e.nodes())
                                            if (e.children(t).length) {
                                                var n = e.node(t)
                                                  , r = e.node(n.borderTop)
                                                  , i = e.node(n.borderBottom)
                                                  , o = e.node(c(n.borderLeft))
                                                  , a = e.node(c(n.borderRight));
                                                n.width = Math.abs(a.x - o.x),
                                                n.height = Math.abs(i.y - r.y),
                                                n.x = o.x + n.width / 2,
                                                n.y = r.y + n.height / 2
                                            }
                                        for (var t of e.nodes())
                                            "border" === e.node(t).dummy && e.removeNode(t)
                                    }(e)
                                }
                                )),
                                t("    normalize.undo", (function() {
                                    at.undo(e)
                                }
                                )),
                                t("    fixupEdgeLabelCoords", (function() {
                                    !function(e) {
                                        for (var t of e.edges()) {
                                            var n = e.edge(t);
                                            if (s(n, "x"))
                                                switch ("l" !== n.labelpos && "r" !== n.labelpos || (n.width -= n.labeloffset),
                                                n.labelpos) {
                                                case "l":
                                                    n.x -= n.width / 2 + n.labeloffset;
                                                    break;
                                                case "r":
                                                    n.x += n.width / 2 + n.labeloffset
                                                }
                                        }
                                    }(e)
                                }
                                )),
                                t("    undoCoordinateSystem", (function() {
                                    et.undo(e)
                                }
                                )),
                                t("    translateGraph", (function() {
                                    !function(e) {
                                        var t, n, r, i = Number.POSITIVE_INFINITY, o = 0, a = Number.POSITIVE_INFINITY, c = 0, l = e.graph(), d = null !== (t = l.marginx) && void 0 !== t ? t : 0, h = null !== (n = l.marginy) && void 0 !== n ? n : 0;
                                        function u(e) {
                                            var t = e.x
                                              , n = e.y
                                              , r = e.width
                                              , s = e.height;
                                            i = Math.min(i, t - r / 2),
                                            o = Math.max(o, t + r / 2),
                                            a = Math.min(a, n - s / 2),
                                            c = Math.max(c, n + s / 2)
                                        }
                                        for (var f of e.nodes())
                                            u(e.node(f));
                                        for (var p of e.edges())
                                            s(v = e.edge(p), "x") && u(v);
                                        for (var f of (i -= d,
                                        a -= h,
                                        e.nodes())) {
                                            var g = e.node(f);
                                            g.x -= i,
                                            g.y -= a
                                        }
                                        for (var p of e.edges()) {
                                            var v = e.edge(p);
                                            for (var m of null !== (r = v.points) && void 0 !== r ? r : [])
                                                m.x -= i,
                                                m.y -= a;
                                            v.hasOwnProperty("x") && (v.x -= i),
                                            v.hasOwnProperty("y") && (v.y -= a)
                                        }
                                        l.width = o - i + d,
                                        l.height = c - a + h
                                    }(e)
                                }
                                )),
                                t("    assignNodeIntersects", (function() {
                                    !function(e) {
                                        for (var t of e.edges()) {
                                            var n, r, i = e.edge(t), o = e.node(t.v), a = e.node(t.w);
                                            i.points ? (n = i.points[0],
                                            r = i.points[i.points.length - 1]) : (i.points = [],
                                            n = a,
                                            r = o),
                                            i.points.unshift(j(o, n)),
                                            i.points.push(j(a, r))
                                        }
                                    }(e)
                                }
                                )),
                                t("    reversePoints", (function() {
                                    !function(e) {
                                        for (var t of e.edges()) {
                                            var n = e.edge(t);
                                            n.reversed && n.points.reverse()
                                        }
                                    }(e)
                                }
                                )),
                                t("    acyclic.undo", (function() {
                                    Qe.undo(e)
                                }
                                ))
                            }(t, n)
                        }
                        )),
                        n("  updateInputGraph", (function() {
                            !function(e, t) {
                                for (var n of e.nodes()) {
                                    var r = e.node(n)
                                      , i = t.node(n);
                                    r && (r.x = i.x,
                                    r.y = i.y,
                                    t.children(n).length && (r.width = i.width,
                                    r.height = i.height))
                                }
                                for (var o of e.edges()) {
                                    var a = e.edge(o)
                                      , c = t.edge(o);
                                    a.points = c.points,
                                    s(c, "x") && (a.x = c.x,
                                    a.y = c.y)
                                }
                                e.graph().width = t.graph().width,
                                e.graph().height = t.graph().height
                            }(e, t)
                        }
                        ))
                    }
                    ))
                }
                ,
                e.nestingGraph = dt,
                e.normalize = at,
                e.order = ee,
                e.parentDummyChains = ct,
                e.position = ve,
                e.rank = He,
                e.util = V,
                e.version = "0.1.3",
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }(t)
        }(0, j.exports)),
        j.exports
    }
    var A = m(Object.freeze({
        __proto__: null,
        default: {}
    }));
    !function(e, t) {
        !function(e, t) {
            function n([e,t], n) {
                const r = [];
                for (let i = 0; i < n; i++)
                    r.push(e + (t - e) * i / (n - 1));
                return r
            }
            function r(e, t) {
                let n = 0;
                for (let r = 0, i = e.length; r < i; r++)
                    n += t(e[r]);
                return n
            }
            function i(e, t) {
                for (let n = 0; n < e.length; n++)
                    if (t(e[n]))
                        return e[n]
            }
            function o(e) {
                return e[e.length - 1]
            }
            function a(e, t) {
                return "" === t || !!e && -1 !== e.indexOf(t)
            }
            function s(e, t) {
                const n = {};
                for (let r = 0; r < e.length; r++)
                    n[e[r][t]] = e[r];
                return n
            }
            function c(e, t) {
                const n = {}
                  , r = [];
                for (let i = 0; i < e.length; i++) {
                    const o = e[i][t];
                    n[o] || (n[o] = !0,
                    r.push(e[i]))
                }
                return r
            }
            var l = Object.freeze({
                __proto__: null,
                range: n,
                sum: r,
                find: i,
                last: o,
                hasSubstring: a,
                indexBy: s,
                uniqueBy: c
            });
            function d(e, t, n={}) {
                return {
                    title: {
                        bold: t.bold || !1,
                        underline: t.underline || !1,
                        italic: t.italic || !1,
                        center: t.center || !1
                    },
                    body: {
                        bold: n.bold || !1,
                        underline: n.underline || !1,
                        italic: n.italic || !1,
                        center: n.center || !1
                    },
                    dashed: e.dashed || !1,
                    fill: e.fill || void 0,
                    stroke: e.stroke || void 0,
                    visual: e.visual || "class",
                    direction: e.direction || void 0
                }
            }
            const h = {
                abstract: d({
                    visual: "class"
                }, {
                    center: !0,
                    italic: !0
                }),
                actor: d({
                    visual: "actor"
                }, {
                    center: !0
                }, {
                    center: !0
                }),
                choice: d({
                    visual: "rhomb"
                }, {
                    center: !0
                }, {
                    center: !0
                }),
                class: d({
                    visual: "class"
                }, {
                    center: !0,
                    bold: !0
                }),
                database: d({
                    visual: "database"
                }, {
                    center: !0,
                    bold: !0
                }, {
                    center: !0
                }),
                end: d({
                    visual: "end"
                }, {}),
                frame: d({
                    visual: "frame"
                }, {}),
                hidden: d({
                    visual: "hidden"
                }, {}),
                input: d({
                    visual: "input"
                }, {
                    center: !0
                }),
                instance: d({
                    visual: "class"
                }, {
                    center: !0,
                    underline: !0
                }),
                label: d({
                    visual: "none"
                }, {
                    center: !0
                }),
                lollipop: d({
                    visual: "lollipop"
                }, {
                    center: !0
                }),
                note: d({
                    visual: "note"
                }, {}),
                pipe: d({
                    visual: "pipe"
                }, {
                    center: !0,
                    bold: !0
                }),
                package: d({
                    visual: "package"
                }, {}),
                receiver: d({
                    visual: "receiver"
                }, {}),
                reference: d({
                    visual: "class",
                    dashed: !0
                }, {
                    center: !0
                }),
                sender: d({
                    visual: "sender"
                }, {}),
                socket: d({
                    visual: "socket"
                }, {}),
                start: d({
                    visual: "start"
                }, {}),
                state: d({
                    visual: "roundrect"
                }, {
                    center: !0
                }),
                sync: d({
                    visual: "sync"
                }, {
                    center: !0
                }),
                table: d({
                    visual: "table"
                }, {
                    center: !0,
                    bold: !0
                }),
                transceiver: d({
                    visual: "transceiver"
                }, {}),
                usecase: d({
                    visual: "ellipse"
                }, {
                    center: !0
                }, {
                    center: !0
                })
            };
            function u(e, t, n) {
                t.width = Math.max(...t.parts.map((e=>e.width ?? 0))),
                t.height = r(t.parts, (e=>e.height ?? 0 ?? 0)),
                t.dividers = [];
                let i = 0;
                for (const e of t.parts)
                    e.x = 0 + n.x,
                    e.y = i + n.y,
                    e.width = t.width,
                    i += e.height ?? 0 ?? 0,
                    e != o(t.parts) && t.dividers.push([{
                        x: 0,
                        y: i
                    }, {
                        x: t.width,
                        y: i
                    }])
            }
            function f(e, t) {
                u(e, t, {
                    x: 0,
                    y: 0
                })
            }
            function p(e, t) {
                t.dividers = [],
                t.parts = [],
                t.width = 2.5 * e.fontSize,
                t.height = 2.5 * e.fontSize
            }
            function g(e, t) {
                t.width = 1.5 * e.fontSize,
                t.height = 1.5 * e.fontSize,
                t.dividers = [];
                let n = "LR" == e.direction ? t.height - e.padding : -t.height / 2;
                for (const r of t.parts)
                    "LR" == e.direction ? (r.x = t.width / 2 - (r.width ?? 0) / 2,
                    r.y = n) : (r.x = t.width / 2 + e.padding / 2,
                    r.y = n),
                    n += r.height ?? 0 ?? 0
            }
            const v = {
                actor: function(e, t) {
                    t.width = Math.max(2 * e.padding, ...t.parts.map((e=>e.width ?? 0))),
                    t.height = 3 * e.padding + r(t.parts, (e=>e.height ?? 0)),
                    t.dividers = [];
                    let n = 3 * e.padding;
                    for (const r of t.parts)
                        r.x = 0,
                        r.y = n,
                        r.width = t.width,
                        n += r.height ?? 0,
                        r != o(t.parts) && t.dividers.push([{
                            x: e.padding,
                            y: n
                        }, {
                            x: t.width - e.padding,
                            y: n
                        }])
                },
                class: f,
                database: function(e, t) {
                    t.width = Math.max(...t.parts.map((e=>e.width ?? 0))),
                    t.height = r(t.parts, (e=>e.height ?? 0)) + 2 * e.padding,
                    t.dividers = [];
                    let i = 1.5 * e.padding;
                    for (const r of t.parts)
                        if (r.x = 0,
                        r.y = i,
                        r.width = t.width,
                        i += r.height ?? 0,
                        r != o(t.parts)) {
                            const r = n([0, Math.PI], 16).map((n=>({
                                x: .5 * t.width * (1 - Math.cos(n)),
                                y: i + e.padding * (.75 * Math.sin(n) - .5)
                            })));
                            t.dividers.push(r)
                        }
                },
                ellipse: function(e, t) {
                    const n = Math.max(...t.parts.map((e=>e.width ?? 0)))
                      , i = r(t.parts, (e=>e.height ?? 0));
                    t.width = 1.25 * n,
                    t.height = 1.25 * i,
                    t.dividers = [];
                    let a = .125 * i;
                    const s = e=>e * e
                      , c = e=>Math.sqrt(s(.5) - s(e / t.height - .5)) * t.width;
                    for (const e of t.parts)
                        e.x = .125 * n,
                        e.y = a,
                        e.width = n,
                        a += e.height ?? 0,
                        e != o(t.parts) && t.dividers.push([{
                            x: t.width / 2 + c(a) - 1,
                            y: a
                        }, {
                            x: t.width / 2 - c(a) + 1,
                            y: a
                        }])
                },
                end: p,
                frame: function(e, t) {
                    const n = t.parts[0].width ?? 0
                      , r = t.parts[0].height ?? 0;
                    t.parts[0].width = r / 2 + (t.parts[0].width ?? 0),
                    f(e, t),
                    t.dividers?.length && t.dividers.shift(),
                    t.dividers?.unshift([{
                        x: 0,
                        y: r
                    }, {
                        x: n - r / 4,
                        y: r
                    }, {
                        x: n + r / 4,
                        y: r / 2
                    }, {
                        x: n + r / 4,
                        y: 0
                    }])
                },
                hidden: function(e, t) {
                    t.dividers = [],
                    t.parts = [],
                    t.width = 1,
                    t.height = 1
                },
                input: f,
                lollipop: g,
                none: f,
                note: f,
                package: f,
                pipe: function(e, t) {
                    u(e, t, {
                        x: -e.padding / 2,
                        y: 0
                    })
                },
                receiver: f,
                rhomb: function(e, t) {
                    const n = Math.max(...t.parts.map((e=>e.width ?? 0)))
                      , i = r(t.parts, (e=>e.height ?? 0));
                    t.width = 1.5 * n,
                    t.height = 1.5 * i,
                    t.dividers = [];
                    let a = .25 * i;
                    for (const e of t.parts) {
                        e.x = .25 * n,
                        e.y = a,
                        e.width = n,
                        a += e.height ?? 0;
                        const r = t.width / t.height;
                        e != o(t.parts) && t.dividers.push([{
                            x: t.width / 2 + (a < t.height / 2 ? a * r : (t.height - a) * r),
                            y: a
                        }, {
                            x: t.width / 2 - (a < t.height / 2 ? a * r : (t.height - a) * r),
                            y: a
                        }])
                    }
                },
                roundrect: f,
                sender: f,
                socket: g,
                start: p,
                sync: function(e, t) {
                    t.dividers = [],
                    t.parts = [],
                    "LR" == e.direction ? (t.width = 3 * e.lineWidth,
                    t.height = 5 * e.fontSize) : (t.width = 5 * e.fontSize,
                    t.height = 3 * e.lineWidth)
                },
                table: function(e, t) {
                    if (1 == t.parts.length)
                        return void f(e, t);
                    const n = t.parts.slice(1)
                      , r = [[]];
                    function i(e) {
                        return !e.lines.length && !e.nodes.length && !e.assocs.length
                    }
                    function a(e) {
                        const t = o(r);
                        return r[0] != t && r[0].length == t.length
                    }
                    function s(e) {
                        return e == o(n)
                    }
                    for (const e of n)
                        !s(e) && i(e) && o(r).length ? r.push([]) : a() ? r.push([e]) : o(r).push(e);
                    const c = t.parts[0]
                      , l = Math.max((c.width ?? 0) / r[0].length, ...n.map((e=>e.width ?? 0)))
                      , d = Math.max(...n.map((e=>e.height ?? 0)));
                    t.width = l * r[0].length,
                    t.height = (c.height ?? 0) + d * r.length;
                    const h = c.height ?? 0;
                    t.dividers = [[{
                        x: 0,
                        y: c.height ?? 0
                    }, {
                        x: 0,
                        y: c.height ?? 0
                    }], ...r.map(((e,n)=>[{
                        x: 0,
                        y: h + n * d
                    }, {
                        x: t.width ?? 0,
                        y: h + n * d
                    }])), ...r[0].map(((e,n)=>[{
                        x: (n + 1) * l,
                        y: h
                    }, {
                        x: (n + 1) * l,
                        y: t.height
                    }]))],
                    c.x = 0,
                    c.y = 0,
                    c.width = t.width;
                    for (let e = 0; e < r.length; e++)
                        for (let t = 0; t < r[e].length; t++) {
                            const n = r[e][t];
                            n.x = t * l,
                            n.y = h + e * d,
                            n.width = l
                        }
                    t.parts = t.parts.filter((e=>!i(e)))
                },
                transceiver: f
            }
              , m = {
                actor: function(e, t, n, r, i) {
                    const o = r.padding / 2
                      , a = n + 4 * o
                      , s = {
                        x: e.x,
                        y: a - o
                    };
                    i.circle(s, o).fillAndStroke(),
                    i.path([{
                        x: e.x,
                        y: a
                    }, {
                        x: e.x,
                        y: a + 2 * o
                    }]).stroke(),
                    i.path([{
                        x: e.x - o,
                        y: a + o
                    }, {
                        x: e.x + o,
                        y: a + o
                    }]).stroke(),
                    i.path([{
                        x: e.x - o,
                        y: a + o + r.padding
                    }, {
                        x: e.x,
                        y: a + r.padding
                    }, {
                        x: e.x + o,
                        y: a + o + r.padding
                    }]).stroke()
                },
                class: function(e, t, n, r, i) {
                    i.rect(t, n, e.width, e.height).fillAndStroke()
                },
                database: function(e, t, n, r, i) {
                    const o = r.padding
                      , a = n - o / 2
                      , s = 3.1416;
                    i.rect(t, n + o, e.width, e.height - 2 * o).fill(),
                    i.path([{
                        x: t,
                        y: a + 1.5 * o
                    }, {
                        x: t,
                        y: a - .5 * o + e.height
                    }]).stroke(),
                    i.path([{
                        x: t + e.width,
                        y: a + 1.5 * o
                    }, {
                        x: t + e.width,
                        y: a - .5 * o + e.height
                    }]).stroke(),
                    i.ellipse({
                        x: e.x,
                        y: a + 1.5 * o
                    }, e.width, 1.5 * o).fillAndStroke(),
                    i.ellipse({
                        x: e.x,
                        y: a - .5 * o + e.height
                    }, e.width, 1.5 * o, 0, s).fillAndStroke()
                },
                ellipse: function(e, t, n, r, i) {
                    i.ellipse({
                        x: e.x,
                        y: e.y
                    }, e.width, e.height).fillAndStroke()
                },
                end: function(e, t, n, r, i) {
                    i.circle({
                        x: e.x,
                        y: n + e.height / 2
                    }, e.height / 3).fillAndStroke(),
                    i.fillStyle(r.stroke),
                    i.circle({
                        x: e.x,
                        y: n + e.height / 2
                    }, e.height / 3 - r.padding / 2).fill()
                },
                frame: function(e, t, n, r, i) {
                    i.rect(t, n, e.width, e.height).fillAndStroke()
                },
                hidden: function(e, t, n, r, i) {},
                input: function(e, t, n, r, i) {
                    i.circuit([{
                        x: t + r.padding,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n
                    }, {
                        x: t + e.width - r.padding,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n + e.height
                    }]).fillAndStroke()
                },
                lollipop: function(e, t, n, r, i) {
                    i.circle({
                        x: e.x,
                        y: n + e.height / 2
                    }, e.height / 2.5).fillAndStroke()
                },
                none: function(e, t, n, r, i) {},
                note: function(e, t, n, r, i) {
                    i.circuit([{
                        x: t,
                        y: n
                    }, {
                        x: t + e.width - r.padding,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n + r.padding
                    }, {
                        x: t + e.width,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n
                    }]).fillAndStroke(),
                    i.path([{
                        x: t + e.width - r.padding,
                        y: n
                    }, {
                        x: t + e.width - r.padding,
                        y: n + r.padding
                    }, {
                        x: t + e.width,
                        y: n + r.padding
                    }]).stroke()
                },
                package: function(e, t, n, r, i) {
                    const o = e.parts[0].height ?? 0;
                    i.rect(t, n + o, e.width, e.height - o).fillAndStroke();
                    const a = i.measureText(e.parts[0].lines[0]).width + 2 * r.padding;
                    i.circuit([{
                        x: t,
                        y: n + o
                    }, {
                        x: t,
                        y: n
                    }, {
                        x: t + a,
                        y: n
                    }, {
                        x: t + a,
                        y: n + o
                    }]).fillAndStroke()
                },
                pipe: function(e, t, n, r, i) {
                    const o = r.padding
                      , a = 3.1416;
                    i.rect(t, n, e.width, e.height).fill(),
                    i.path([{
                        x: t,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n
                    }]).stroke(),
                    i.path([{
                        x: t,
                        y: n + e.height
                    }, {
                        x: t + e.width,
                        y: n + e.height
                    }]).stroke(),
                    i.ellipse({
                        x: t + e.width,
                        y: e.y
                    }, 1.5 * o, e.height).fillAndStroke(),
                    i.ellipse({
                        x: t,
                        y: e.y
                    }, 1.5 * o, e.height, a / 2, 3 * a / 2).fillAndStroke()
                },
                receiver: function(e, t, n, r, i) {
                    i.circuit([{
                        x: t - r.padding,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n + e.height
                    }, {
                        x: t - r.padding,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n + e.height / 2
                    }]).fillAndStroke()
                },
                rhomb: function(e, t, n, r, i) {
                    i.circuit([{
                        x: e.x,
                        y: n
                    }, {
                        x: t + e.width,
                        y: e.y
                    }, {
                        x: e.x,
                        y: n + e.height
                    }, {
                        x: t,
                        y: e.y
                    }]).fillAndStroke()
                },
                roundrect: function(e, t, n, r, i) {
                    const o = Math.min(2 * r.padding * r.leading, e.height / 2);
                    i.roundRect(t, n, e.width, e.height, o).fillAndStroke()
                },
                sender: function(e, t, n, r, i) {
                    i.circuit([{
                        x: t,
                        y: n
                    }, {
                        x: t + e.width - r.padding,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n + e.height / 2
                    }, {
                        x: t + e.width - r.padding,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n + e.height
                    }]).fillAndStroke()
                },
                socket: function(e, t, n, r, i) {
                    const o = "TB" === r.direction ? Math.PI : Math.PI / 2
                      , a = "TB" === r.direction ? 2 * Math.PI : -Math.PI / 2;
                    i.ellipse({
                        x: e.x,
                        y: e.y
                    }, e.width, e.height, o, a).stroke()
                },
                start: function(e, t, n, r, i) {
                    i.fillStyle(r.stroke),
                    i.circle({
                        x: e.x,
                        y: n + e.height / 2
                    }, e.height / 2.5).fill()
                },
                sync: function(e, t, n, r, i) {
                    i.fillStyle(r.stroke),
                    i.rect(t, n, e.width, e.height).fillAndStroke()
                },
                table: function(e, t, n, r, i) {
                    i.rect(t, n, e.width, e.height).fillAndStroke()
                },
                transceiver: function(e, t, n, r, i) {
                    i.circuit([{
                        x: t - r.padding,
                        y: n
                    }, {
                        x: t + e.width - r.padding,
                        y: n
                    }, {
                        x: t + e.width,
                        y: n + e.height / 2
                    }, {
                        x: t + e.width - r.padding,
                        y: n + e.height
                    }, {
                        x: t - r.padding,
                        y: n + e.height
                    }, {
                        x: t,
                        y: n + e.height / 2
                    }]).fillAndStroke()
                }
            };
            function y(e, n, r) {
                function i(t, r) {
                    return t.length ? (e.setFont(n.font, n.fontSize, r, "normal"),
                    {
                        width: Math.round(Math.max(...t.map(e.textWidth)) + 2 * n.padding),
                        height: Math.round(e.textHeight() * t.length + 2 * n.padding)
                    }) : {
                        width: 0,
                        height: n.padding
                    }
                }
                function o(e, r, o) {
                    const h = i(e.lines, r ? "normal" : "bold");
                    if (!e.nodes.length && !e.assocs.length) {
                        const t = e;
                        return t.width = h.width,
                        t.height = h.height,
                        void (t.offset = {
                            x: n.padding,
                            y: n.padding
                        })
                    }
                    const f = {
                        ...n,
                        direction: o.direction ?? n.direction
                    }
                      , p = e.nodes
                      , g = e.assocs;
                    for (let e = 0; e < g.length; e++)
                        g[e].id = `${e}`;
                    for (const e of p)
                        u(e, f);
                    const v = new t.graphlib.Graph({
                        multigraph: !0
                    });
                    v.setGraph({
                        rankdir: o.direction || n.direction,
                        nodesep: n.spacing,
                        edgesep: n.spacing,
                        ranksep: n.spacing,
                        acyclicer: n.acyclicer,
                        ranker: n.ranker
                    });
                    for (const e of p)
                        v.setNode(e.id, {
                            width: e.layoutWidth,
                            height: e.layoutHeight
                        });
                    for (const e of g)
                        e.type.indexOf("_") > -1 ? v.setEdge(e.start, e.end, {
                            minlen: 0
                        }, e.id) : 1 != (n.gravity ?? 1) ? v.setEdge(e.start, e.end, {
                            minlen: n.gravity
                        }, e.id) : v.setEdge(e.start, e.end, {}, e.id);
                    t.layout(v);
                    const m = s(e.assocs, "id")
                      , y = s(e.nodes, "id");
                    for (const e of v.nodes()) {
                        const t = v.node(e);
                        y[e].x = t.x,
                        y[e].y = t.y
                    }
                    let w = 0
                      , x = 0
                      , b = 0
                      , k = 0;
                    for (const e of v.edges()) {
                        const t = v.edge(e)
                          , n = y[e.v]
                          , r = y[e.w]
                          , i = m[e.name];
                        i.path = [n, ...t.points, r].map(a);
                        const o = i.path[1]
                          , s = i.path[i.path.length - 2];
                        c(i.startLabel, o, d(l(o, n) ?? 4, n, r)),
                        c(i.endLabel, s, d(l(s, r) ?? 2, r, n)),
                        w = Math.min(w, i.startLabel.x, i.endLabel.x, ...t.points.map((e=>e.x)), ...t.points.map((e=>e.x))),
                        x = Math.max(x, i.startLabel.x + i.startLabel.width, i.endLabel.x + i.endLabel.width, ...t.points.map((e=>e.x))),
                        b = Math.min(b, i.startLabel.y, i.endLabel.y, ...t.points.map((e=>e.y))),
                        k = Math.max(k, i.startLabel.y + i.startLabel.height, i.endLabel.y + i.endLabel.height, ...t.points.map((e=>e.y)))
                    }
                    const _ = v.graph()
                      , E = Math.max(_.width, x - w)
                      , S = Math.max(_.height, k - b)
                      , M = S ? S + 2 * n.gutter : 0
                      , z = E ? E + 2 * n.gutter : 0
                      , N = e;
                    N.width = Math.max(h.width, z) + 2 * n.padding,
                    N.height = h.height + M + n.padding,
                    N.offset = {
                        x: n.padding - w,
                        y: n.padding - b
                    }
                }
                function a(e) {
                    return {
                        x: e.x,
                        y: e.y
                    }
                }
                function c(t, r, i) {
                    if (t.text) {
                        const o = n.fontSize
                          , a = t.text.split("`");
                        t.width = Math.max(...a.map((t=>e.textWidth(t)))),
                        t.height = o * a.length,
                        t.x = r.x + (1 == i || 4 == i ? n.padding : -t.width - n.padding),
                        t.y = r.y + (3 == i || 4 == i ? n.padding : -t.height - n.padding)
                    } else
                        t.width = 0,
                        t.height = 0,
                        t.x = r.x,
                        t.y = r.y
                }
                function l(e, t) {
                    return e.x < t.x && e.y < t.y ? 1 : e.x > t.x && e.y < t.y ? 2 : e.x > t.x && e.y > t.y ? 3 : e.x < t.x && e.y > t.y ? 4 : void 0
                }
                function d(e, t, r) {
                    if (r.x == t.x || r.y == t.y)
                        return e;
                    const i = [4, 3, 2, 1]
                      , o = [2, 1, 4, 3];
                    if ((r.y < t.y ? r.x < t.x ? 2 : 1 : r.x < t.x ? 3 : 4) === e) {
                        if ("LR" === n.direction)
                            return i[e - 1];
                        if ("TB" === n.direction)
                            return o[e - 1]
                    }
                    return e
                }
                function u(e, t) {
                    const n = t.styles[e.type] || h.class;
                    for (let t = 0; t < e.parts.length; t++)
                        o(e.parts[t], t, n);
                    (v[n.visual] ?? v.class)(t, e),
                    e.layoutWidth = (e.width ?? 0) + 2 * t.edgeMargin,
                    e.layoutHeight = (e.height ?? 0) + 2 * t.edgeMargin
                }
                const f = r;
                return o(f, 0, h.class),
                f
            }
            function w(e) {
                const t = [];
                for (const n of e.split("\n"))
                    if ("#" === n[0]) {
                        const [e,...r] = n.slice(1).split(":");
                        t.push({
                            key: e,
                            value: r.join(":").trim()
                        })
                    }
                return t
            }
            function x(e) {
                let t = 1
                  , n = 0
                  , r = 0;
                const i = w(e);
                if ("" === (e = e.replace(/^[ \t]*\/\/[^\n]*/gm, "").replace(/^#[^\n]*/gm, "")).trim())
                    return {
                        root: {
                            nodes: [],
                            assocs: [],
                            lines: []
                        },
                        directives: i
                    };
                const o = c();
                return r < e.length && E("end of file", e[r]),
                {
                    root: o,
                    directives: i
                };
                function a() {
                    t++,
                    n = r
                }
                function s(e, t) {
                    const n = e.findIndex((e=>e.id === t.id));
                    -1 === n ? e.push(t) : e[n].parts.length < t.parts.length && (e[n] = t)
                }
                function c() {
                    const t = []
                      , n = []
                      , i = [];
                    for (; r < e.length; ) {
                        let o = r;
                        if (m(/ /),
                        "\n" === e[r])
                            v(),
                            a();
                        else if (";" === e[r])
                            v();
                        else {
                            if ("|" == e[r] || "]" == e[r])
                                return {
                                    nodes: t,
                                    assocs: n,
                                    lines: i
                                };
                            if ("[" == e[r]) {
                                const e = l();
                                for (const n of e.nodes)
                                    s(t, n);
                                for (const t of e.assocs)
                                    n.push(t)
                            } else {
                                const e = f().trim();
                                e && i.push(e)
                            }
                        }
                        if (r === o)
                            throw new Error("Infinite loop")
                    }
                    return {
                        nodes: t,
                        assocs: n,
                        lines: i
                    }
                }
                function l() {
                    const t = []
                      , n = [];
                    let i = u();
                    for (s(t, i); r < e.length; ) {
                        let e = r;
                        if (m(/ /),
                        b("\n", "]", "|", ";"))
                            return {
                                nodes: t,
                                assocs: n
                            };
                        {
                            const {association: e, target: r} = h(i);
                            n.push(e),
                            s(t, r),
                            i = r
                        }
                        if (r === e)
                            throw new Error("Infinite loop")
                    }
                    return {
                        nodes: t,
                        assocs: n
                    }
                }
                function d(e) {
                    return "n" === e ? "\n" : e
                }
                function h(t) {
                    let n = "";
                    for (; r < e.length; ) {
                        let t = r;
                        if (b("\\") && (v(),
                        n += d(v())),
                        b("(o-", "(-", "o<-", "o-", "+-", "<:-", "<-", "-"))
                            break;
                        if (b("[", "]", "|", "<", ">", ";") ? E("label", e[r]) : n += v(),
                        r === t)
                            throw new Error("Infinite loop")
                    }
                    const i = _("(o", "(", "o<", "o", "+", "<:", "<", "")
                      , o = _("--", "-/-", "-")
                      , a = _("o)", "o", ">o", ">", ")", "+", ":>", "")
                      , s = x(/[^\[]/)
                      , c = u();
                    return {
                        association: {
                            type: `${i}${o}${a}`,
                            start: t.id,
                            end: c.id,
                            startLabel: {
                                text: n.trim()
                            },
                            endLabel: {
                                text: s.trim()
                            }
                        },
                        target: c
                    }
                }
                function u() {
                    r++;
                    let t = {}
                      , n = "class";
                    if ("<" == e[r]) {
                        const e = p();
                        t = e.attr,
                        n = e.type ?? "class"
                    }
                    const i = [c()];
                    for (; "|" == e[r]; ) {
                        let e = r;
                        if (v(),
                        i.push(c()),
                        e === r)
                            throw new Error("Infinite loop")
                    }
                    if ("]" == e[r])
                        return v(),
                        m(/ /),
                        {
                            parts: i,
                            attr: t,
                            id: t.id ?? i[0].lines[0],
                            type: n
                        };
                    E("]", e[r])
                }
                function f() {
                    const t = [];
                    for (; r < e.length; ) {
                        let n = r;
                        if ("\\" === e[r])
                            v(),
                            t.push(d(v()));
                        else {
                            if (e[r].match(/[\[\]|;\n]/))
                                break;
                            t.push(v())
                        }
                        if (n === r)
                            throw new Error("Infinite loop")
                    }
                    return t.join("")
                }
                function p() {
                    r++;
                    const e = y(/[a-zA-Z0-9_]/)
                      , t = v();
                    return ">" == t ? {
                        type: e,
                        attr: {}
                    } : (" " != t && E([" ", ">"], t),
                    {
                        type: e,
                        attr: g()
                    })
                }
                function g() {
                    const e = y(/[a-zA-Z0-9_]/)
                      , t = v();
                    "=" != t && E("=", t);
                    const n = y(/[^> ]/)
                      , r = v();
                    return ">" == r ? {
                        [e]: n
                    } : " " == r ? {
                        [e]: n,
                        ...g()
                    } : void E([" ", ">"], r)
                }
                function v() {
                    const t = e[r];
                    return r++,
                    t
                }
                function m(t) {
                    for (; e[r]?.match(t); )
                        r++
                }
                function y(t, n) {
                    const i = r;
                    for (; e[r]?.match(t); )
                        r++;
                    const o = r;
                    return n || i != o || E(t, e[r]),
                    e.slice(i, o)
                }
                function x(e) {
                    return y(e, "optional")
                }
                function b(...t) {
                    for (const n of t)
                        if (e.slice(r, r + n.length) == n)
                            return !0;
                    return !1
                }
                function _(...t) {
                    for (const n of t)
                        if (e.slice(r, r + n.length) == n)
                            return r += n.length,
                            n;
                    const n = Math.max(...t.map((e=>e.length)));
                    r + 1 >= e.length ? E(t, void 0) : E(t, e.slice(r + 1, n))
                }
                function E(e, i) {
                    throw new k(e,i,t,r - n)
                }
            }
            function b(e) {
                return null == e ? "end of file" : e instanceof RegExp ? e.toString().slice(1, -1) : Array.isArray(e) ? e.map(b).join(" or ") : JSON.stringify(e)
            }
            class k extends Error {
                constructor(e, t, n, r) {
                    const i = b(e)
                      , o = b(t);
                    super(`Parse error at line ${n} column ${r}, expected ${i} but got ${o}`),
                    this.expected = i,
                    this.actual = o,
                    this.line = n,
                    this.column = r
                }
            }
            function _(e) {
                const {root: t, directives: n} = x(e);
                return {
                    root: t,
                    directives: n,
                    config: c(n)
                };
                function r(e) {
                    return "down" == e ? "TB" : "right" == e ? "LR" : "TB"
                }
                function i(e) {
                    return "network-simplex" == e || "tight-tree" == e || "longest-path" == e ? e : "network-simplex"
                }
                function s(e) {
                    const t = a
                      , n = e.replace(/[a-z]*=[^ ]+/g, "")
                      , i = o(e.match("title=([^ ]*)") || [""])
                      , s = o(e.match("body=([^ ]*)") || [""]);
                    return {
                        title: {
                            bold: t(i, "bold") || t(n, "bold"),
                            underline: t(i, "underline") || t(n, "underline"),
                            italic: t(i, "italic") || t(n, "italic"),
                            center: !(t(i, "left") || t(e, "align=left"))
                        },
                        body: {
                            bold: t(s, "bold"),
                            underline: t(s, "underline"),
                            italic: t(s, "italic"),
                            center: t(s, "center")
                        },
                        dashed: t(e, "dashed"),
                        fill: o(e.match("fill=([^ ]*)") || []),
                        stroke: o(e.match("stroke=([^ ]*)") || []),
                        visual: o(e.match("visual=([^ ]*)") || []) || "class",
                        direction: r(o(e.match("direction=([^ ]*)") || []))
                    }
                }
                function c(e) {
                    const t = Object.fromEntries(e.map((e=>[e.key, e.value])))
                      , n = {};
                    for (const e in t) {
                        if ("." != e[0])
                            continue;
                        const r = t[e];
                        n[e.substring(1)] = s(r)
                    }
                    return {
                        arrowSize: +t.arrowSize || 1,
                        bendSize: +t.bendSize || .3,
                        direction: r(t.direction),
                        gutter: +t.gutter || 20,
                        edgeMargin: +t.edgeMargin || 0,
                        gravity: Math.round(+(t.gravity ?? 1)),
                        edges: "hard" == t.edges ? "hard" : "rounded",
                        fill: (t.fill || "#eee8d5;#fdf6e3;#eee8d5;#fdf6e3").split(";"),
                        background: t.background || "transparent",
                        fillArrows: "true" === t.fillArrows,
                        font: t.font || "Helvetica",
                        fontSize: +t.fontSize || 12,
                        leading: +t.leading || 1.35,
                        lineWidth: +t.lineWidth || 3,
                        padding: +t.padding || 8,
                        spacing: +t.spacing || 40,
                        stroke: t.stroke || "#33322E",
                        title: t.title || "",
                        zoom: +t.zoom || 1,
                        acyclicer: "greedy" === t.acyclicer ? "greedy" : void 0,
                        ranker: i(t.ranker),
                        styles: {
                            ...h,
                            ...n
                        }
                    }
                }
            }
            function E(e, t) {
                return {
                    x: e.x + t.x,
                    y: e.y + t.y
                }
            }
            function S(e, t) {
                return {
                    x: e.x - t.x,
                    y: e.y - t.y
                }
            }
            function M(e, t) {
                return {
                    x: t * e.x,
                    y: t * e.y
                }
            }
            function z(e) {
                return Math.sqrt(e.x * e.x + e.y * e.y)
            }
            function N(e) {
                return M(e, 1 / z(e))
            }
            function L(e) {
                return {
                    x: e.y,
                    y: -e.x
                }
            }
            const T = !1
              , I = !0;
            function O(e, t) {
                const n = t.path.slice(1, -1)
                  , r = N(S(n[n.length - 2], o(n)))
                  , i = N(S(n[1], n[0]))
                  , a = e.spacing * e.arrowSize / 30
                  , s = 0
                  , c = n.length - 1
                  , l = n.map((e=>({
                    x: e.x,
                    y: e.y
                })))
                  , d = t.type.split(/[-_]/);
                return l[s] = E(l[s], M(i, a * C(d[0]))),
                l[c] = E(l[c], M(r, a * C(o(d)))),
                l
            }
            function C(e) {
                return ">" === e || "<" === e ? 5 : ":>" === e || "<:" === e ? 10 : "+" === e || "o" === e ? 14 : "(" === e || ")" === e || "(o" === e || "o)" === e ? 11 : ">o" === e || "o<" === e ? 15 : 0
            }
            function j(e, t, r) {
                const i = r.path[1]
                  , a = r.path[r.path.length - 2]
                  , s = r.path.slice(1, -1)
                  , c = r.type.split(/[-_]/);
                function l(e, n, r) {
                    const i = N(S(n[n.length - 2], o(n)))
                      , a = t.spacing * t.arrowSize / 30;
                    ">" === e || "<" === e ? f(i, a, I, r) : ":>" === e || "<:" === e ? f(i, a, T, r) : "+" === e ? p(i, a, I, r) : "o" === e ? p(i, a, T, r) : "(" === e || ")" === e ? (u(i, a, 11, r),
                    h(i, a, 5, r)) : "(o" === e || "o)" === e ? (u(i, a, 11, r),
                    h(i, a, 5, r),
                    d(i, a, 11, r)) : ">o" !== e && "o<" !== e || (f(i, .75 * a, T, E(r, M(i, 10 * a))),
                    h(i, a, 8, r),
                    d(i, a, 8, r))
                }
                function d(n, r, i, o) {
                    const a = E(o, M(n, r * i));
                    e.fillStyle(t.fill[0]),
                    e.ellipse(a, 6 * r, 6 * r).fillAndStroke()
                }
                function h(t, n, r, i) {
                    const o = E(i, M(t, n * r));
                    e.path([o, i]).stroke()
                }
                function u(t, r, i, o) {
                    const a = E(o, M(t, r * i))
                      , s = L(t)
                      , c = n([-Math.PI / 2, Math.PI / 2], 12).map((e=>E(a, E(M(t, -6 * r * Math.cos(e)), M(s, 6 * r * Math.sin(e))))));
                    e.path(c).stroke()
                }
                function f(n, r, i, o) {
                    const a = e=>E(o, M(n, e * r))
                      , s = e=>M(L(n), e * r)
                      , c = [E(a(10), s(4)), a(i && !t.fillArrows ? 5 : 10), E(a(10), s(-4)), o];
                    e.fillStyle(i ? t.stroke : t.fill[0]),
                    e.circuit(c).fillAndStroke()
                }
                function p(n, r, i, o) {
                    const a = e=>E(o, M(n, e * r))
                      , s = e=>M(L(n), e * r)
                      , c = [E(a(7), s(4)), a(14), E(a(7), s(-4)), o];
                    e.save(),
                    e.fillStyle(i ? t.stroke : t.fill[0]),
                    e.circuit(c).fillAndStroke(),
                    e.restore()
                }
                l(o(c), s, a),
                l(c[0], s.reverse(), i)
            }
            function P(e, t, n) {
                const r = e;
                function i(e, n, i, o) {
                    r.save(),
                    r.translate(e.offset.x, e.offset.y),
                    r.fillStyle(n || t.stroke);
                    for (let n = 0; n < e.lines.length; n++) {
                        const o = e.lines[n];
                        r.textAlign(i.center ? "center" : "left");
                        const a = i.center ? e.width / 2 - t.padding : 0;
                        let s = (.5 + (n + .5) * t.leading) * t.fontSize;
                        if (o && r.fillText(o, a, s),
                        i.underline) {
                            const e = r.measureText(o).width;
                            s += Math.round(.2 * t.fontSize) + .5,
                            i.center ? r.path([{
                                x: a - e / 2,
                                y: s
                            }, {
                                x: a + e / 2,
                                y: s
                            }]).stroke() : r.path([{
                                x: a,
                                y: s
                            }, {
                                x: a + e,
                                y: s
                            }]).stroke(),
                            r.lineWidth(t.lineWidth)
                        }
                    }
                    r.save(),
                    r.translate(t.gutter, t.gutter);
                    for (const t of e.assocs)
                        u(t);
                    for (const t of e.nodes)
                        s(t, o);
                    r.restore(),
                    r.restore()
                }
                function s(e, n) {
                    const a = e.x - e.width / 2
                      , s = e.y - e.height / 2
                      , c = t.styles[e.type] || h.class;
                    if (r.save(),
                    r.setData("name", e.id),
                    r.save(),
                    r.fillStyle(c.fill || t.fill[n] || o(t.fill)),
                    r.strokeStyle(c.stroke || t.stroke),
                    c.dashed) {
                        const e = Math.max(4, 2 * t.lineWidth);
                        r.setLineDash([e, e])
                    }
                    (m[c.visual] || m.class)(e, a, s, t, r);
                    for (const t of e.dividers)
                        r.path(t.map((e=>E(e, {
                            x: a,
                            y: s
                        })))).stroke();
                    r.restore();
                    for (let o of e.parts) {
                        const l = o === e.parts[0] ? c.title : c.body;
                        r.save(),
                        r.translate(a + o.x, s + o.y),
                        r.setFont(t.font, t.fontSize, l.bold ? "bold" : "normal", l.italic ? "italic" : "normal"),
                        i(o, c.stroke, l, n + 1),
                        r.restore()
                    }
                    r.restore()
                }
                function c(e) {
                    if ("rounded" === t.edges) {
                        const n = t.spacing * t.bendSize;
                        r.beginPath(),
                        r.moveTo(e[0].x, e[0].y);
                        for (let t = 1; t < e.length - 1; t++)
                            r.arcTo(e[t].x, e[t].y, e[t + 1].x, e[t + 1].y, n);
                        r.lineTo(o(e).x, o(e).y),
                        r.stroke()
                    } else
                        r.path(e).stroke()
                }
                function l(e) {
                    if (!e || !e.text)
                        return;
                    const n = t.fontSize
                      , i = e.text.split("`");
                    for (let t = 0; t < i.length; t++)
                        r.fillText(i[t], e.x, e.y + n * (t + 1))
                }
                function u(e) {
                    const n = O(t, e);
                    if (r.fillStyle(t.stroke),
                    r.setFont(t.font, t.fontSize, "normal", "normal"),
                    l(e.startLabel),
                    l(e.endLabel),
                    "-/-" !== e.type)
                        if (a(e.type, "--")) {
                            const e = Math.max(4, 2 * t.lineWidth);
                            r.save(),
                            r.setLineDash([e, e]),
                            c(n),
                            r.restore()
                        } else
                            c(n);
                    j(r, t, e)
                }
                function f() {
                    r.clear(),
                    r.save(),
                    r.strokeStyle("transparent"),
                    r.fillStyle(t.background),
                    r.rect(0, 0, n.width, n.height).fill(),
                    r.restore()
                }
                r.save(),
                r.scale(t.zoom, t.zoom),
                f(),
                r.setFont(t.font, t.fontSize, "bold", "normal"),
                r.lineWidth(t.lineWidth),
                r.lineJoin("round"),
                r.lineCap("round"),
                r.strokeStyle(t.stroke),
                i(n, void 0, d({}, {}).title, 0),
                r.restore()
            }
            function R(e, t) {
                const n = e.getContext("2d")
                  , r = 6.2832;
                let i = {
                    x: 0,
                    y: 0
                };
                function o(t) {
                    const n = e;
                    return {
                        x: t.clientX - n.getBoundingClientRect().left - n.clientLeft + n.scrollLeft,
                        y: t.clientY - n.getBoundingClientRect().top - n.clientTop + n.scrollTop
                    }
                }
                t && (e.addEventListener("mousedown", (function(e) {
                    t.mousedown && t.mousedown(o(e))
                }
                )),
                e.addEventListener("mouseup", (function(e) {
                    t.mouseup && t.mouseup(o(e))
                }
                )),
                e.addEventListener("mousemove", (function(e) {
                    i = o(e),
                    t.mousemove && t.mousemove(o(e))
                }
                )));
                const a = {
                    stroke: function() {
                        return n.stroke(),
                        a
                    },
                    fill: function() {
                        return n.fill(),
                        a
                    },
                    fillAndStroke: function() {
                        return n.fill(),
                        n.stroke(),
                        a
                    }
                };
                function s(e, t, r) {
                    r = void 0 === r ? 1 : r,
                    t = t || {
                        x: 0,
                        y: 0
                    },
                    n.beginPath(),
                    n.moveTo(t.x + r * e[0].x, t.y + r * e[0].y);
                    for (let i = 1, o = e.length; i < o; i++)
                        n.lineTo(t.x + r * e[i].x, t.y + r * e[i].y);
                    return a
                }
                return {
                    mousePos: function() {
                        return i
                    },
                    width: function() {
                        return e.width
                    },
                    height: function() {
                        return e.height
                    },
                    clear: function() {
                        n.clearRect(0, 0, e.width, e.height)
                    },
                    circle: function(e, t) {
                        return n.beginPath(),
                        n.arc(e.x, e.y, t, 0, r),
                        a
                    },
                    ellipse: function(e, t, i, o, s) {
                        return void 0 === o && (o = 0),
                        void 0 === s && (s = r),
                        n.beginPath(),
                        n.save(),
                        n.translate(e.x, e.y),
                        n.scale(1, i / t),
                        n.arc(0, 0, t / 2, o, s),
                        n.restore(),
                        a
                    },
                    arc: function(e, t, r, i, o) {
                        return n.beginPath(),
                        n.moveTo(e, t),
                        n.arc(e, t, r, i, o),
                        a
                    },
                    roundRect: function(e, t, r, i, o) {
                        return n.beginPath(),
                        n.moveTo(e + o, t),
                        n.arcTo(e + r, t, e + r, t + o, o),
                        n.lineTo(e + r, t + i - o),
                        n.arcTo(e + r, t + i, e + r - o, t + i, o),
                        n.lineTo(e + o, t + i),
                        n.arcTo(e, t + i, e, t + i - o, o),
                        n.lineTo(e, t + o),
                        n.arcTo(e, t, e + o, t, o),
                        n.closePath(),
                        a
                    },
                    rect: function(e, t, r, i) {
                        return n.beginPath(),
                        n.moveTo(e, t),
                        n.lineTo(e + r, t),
                        n.lineTo(e + r, t + i),
                        n.lineTo(e, t + i),
                        n.closePath(),
                        a
                    },
                    path: s,
                    circuit: function(e, t, r) {
                        return s(e, t, r),
                        n.closePath(),
                        a
                    },
                    setFont: function(e, t, r, i) {
                        n.font = `${r} ${i} ${t}pt ${e}, Helvetica, sans-serif`
                    },
                    fillStyle: function(e) {
                        n.fillStyle = e
                    },
                    strokeStyle: function(e) {
                        n.strokeStyle = e
                    },
                    textAlign: function(e) {
                        n.textAlign = e
                    },
                    lineCap: function(e) {
                        n.lineCap = e
                    },
                    lineJoin: function(e) {
                        n.lineJoin = e
                    },
                    lineWidth: function(e) {
                        n.lineWidth = e
                    },
                    arcTo: function() {
                        return n.arcTo.apply(n, arguments)
                    },
                    beginPath: function() {
                        return n.beginPath.apply(n, arguments)
                    },
                    fillText: function() {
                        return n.fillText.apply(n, arguments)
                    },
                    lineTo: function() {
                        return n.lineTo.apply(n, arguments)
                    },
                    measureText: function() {
                        return n.measureText.apply(n, arguments)
                    },
                    moveTo: function() {
                        return n.moveTo.apply(n, arguments)
                    },
                    restore: function() {
                        return n.restore.apply(n, arguments)
                    },
                    setData: function(e, t) {},
                    save: function() {
                        return n.save.apply(n, arguments)
                    },
                    scale: function() {
                        return n.scale.apply(n, arguments)
                    },
                    setLineDash: function() {
                        return n.setLineDash.apply(n, arguments)
                    },
                    stroke: function() {
                        return n.stroke.apply(n, arguments)
                    },
                    translate: function() {
                        return n.translate.apply(n, arguments)
                    }
                }
            }
            function D(e) {
                return Object.entries(e).filter((([e,t])=>void 0 !== t)).map((([e,t])=>`${e}="${F(t)}"`)).join(" ")
            }
            function F(e) {
                return "number" == typeof e ? e.toFixed(1) : (e ?? "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
            }
            const B = {
                0: 10,
                1: 10,
                2: 10,
                3: 10,
                4: 10,
                5: 10,
                6: 10,
                7: 10,
                8: 10,
                9: 10,
                " ": 5,
                "!": 5,
                '"': 6,
                "#": 10,
                $: 10,
                "%": 15,
                "&": 11,
                "'": 4,
                "(": 6,
                ")": 6,
                "*": 7,
                "+": 10,
                ",": 5,
                "-": 6,
                ".": 5,
                "/": 5,
                ":": 5,
                ";": 5,
                "<": 10,
                "=": 10,
                ">": 10,
                "?": 10,
                "@": 17,
                A: 11,
                B: 11,
                C: 12,
                D: 12,
                E: 11,
                F: 10,
                G: 13,
                H: 12,
                I: 5,
                J: 9,
                K: 11,
                L: 10,
                M: 14,
                N: 12,
                O: 13,
                P: 11,
                Q: 13,
                R: 12,
                S: 11,
                T: 10,
                U: 12,
                V: 11,
                W: 16,
                X: 11,
                Y: 11,
                Z: 10,
                "[": 5,
                "\\": 5,
                "]": 5,
                "^": 8,
                _: 10,
                "`": 6,
                a: 10,
                b: 10,
                c: 9,
                d: 10,
                e: 10,
                f: 5,
                g: 10,
                h: 10,
                i: 4,
                j: 4,
                k: 9,
                l: 4,
                m: 14,
                n: 10,
                o: 10,
                p: 10,
                q: 10,
                r: 6,
                s: 9,
                t: 5,
                u: 10,
                v: 9,
                w: 12,
                x: 9,
                y: 9,
                z: 9,
                "{": 6,
                "|": 5,
                "}": 6,
                "~": 10
            };
            function q(e) {
                const t = {
                    stroke: void 0,
                    "stroke-width": 1,
                    "stroke-dasharray": void 0,
                    "stroke-linecap": void 0,
                    "stroke-linejoin": void 0,
                    "text-align": "left",
                    font: "12pt Helvetica, Arial, sans-serif",
                    "font-size": "12pt"
                }
                  , i = e ? e.createElement("canvas") : null
                  , a = i ? i.getContext("2d") : null;
                class s {
                    constructor(e, t, n, r) {
                        this.elideEmpty = !1,
                        this.name = e,
                        this.attr = t,
                        this.parent = n,
                        this.children = [],
                        this.text = r || void 0
                    }
                    stroke() {
                        return this.attr.fill = "none",
                        this
                    }
                    fill() {
                        return this.attr.stroke = "none",
                        this
                    }
                    fillAndStroke() {
                        return this
                    }
                    group() {
                        return this.parent
                    }
                    serialize() {
                        const e = c(this.group(), (e=>e.data)) ?? {}
                          , t = D({
                            ...this.attr,
                            ...e
                        })
                          , n = this.children.map((e=>e.serialize())).join("\n");
                        return this.text && 0 === this.children.length ? `<${this.name} ${t}>${F(this.text)}</${this.name}>` : 0 === this.children.length ? this.elideEmpty ? "" : `<${this.name} ${t}></${this.name}>` : `<${this.name} ${t}>\n\t\t${n.replace(/\n/g, "\n\t")}\n\t</${this.name}>`
                    }
                }
                function c(e, t) {
                    return e ? t(e) ?? c(e.parent, t) ?? t(d) : t(d)
                }
                class l extends s {
                    constructor(e) {
                        super("g", {}, e),
                        this.elideEmpty = !0
                    }
                    group() {
                        return this
                    }
                }
                const d = new l({});
                d.attr = t;
                const h = new s("svg",{
                    version: "1.1",
                    baseProfile: "full",
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xmlns:ev": "http://www.w3.org/2001/xml-events"
                },void 0);
                let u = new l(h);
                u.attr = t,
                h.children.push(u);
                let f = !1;
                function p(e, t={
                    x: 0,
                    y: 0
                }, n=1) {
                    return g("path", {
                        d: e.map(((e,r)=>(r ? "L" : "M") + (t.x + n * e.x).toFixed(1) + " " + (t.y + n * e.y).toFixed(1))).join(" ")
                    })
                }
                function g(e, t, n) {
                    const r = new s(e,t,u,n);
                    return u.children.push(r),
                    r
                }
                return {
                    width: function() {
                        return 0
                    },
                    height: function() {
                        return 0
                    },
                    clear: function() {},
                    circle: function(e, t) {
                        return g("circle", {
                            r: t,
                            cx: e.x,
                            cy: e.y
                        })
                    },
                    ellipse: function(e, t, r, i=0, o=0) {
                        if (i || o) {
                            const a = n([i, o], 64).map((n=>E(e, {
                                x: Math.cos(n) * t / 2,
                                y: Math.sin(n) * r / 2
                            })));
                            return p(a)
                        }
                        return g("ellipse", {
                            cx: e.x,
                            cy: e.y,
                            rx: t / 2,
                            ry: r / 2
                        })
                    },
                    arc: function(e, t, n) {
                        return g("ellipse", {
                            cx: e,
                            cy: t,
                            rx: n,
                            ry: n
                        })
                    },
                    roundRect: function(e, t, n, r, i) {
                        return g("rect", {
                            x: e,
                            y: t,
                            rx: i,
                            ry: i,
                            height: r,
                            width: n
                        })
                    },
                    rect: function(e, t, n, r) {
                        return g("rect", {
                            x: e,
                            y: t,
                            height: r,
                            width: n
                        })
                    },
                    path: p,
                    circuit: function(e, t, n) {
                        const r = p(e, t, n);
                        return r.attr.d += " Z",
                        r
                    },
                    setFont: function(e, t, n, r) {
                        u.attr["font-family"] = e,
                        u.attr["font-size"] = t + "pt",
                        u.attr["font-weight"] = n,
                        u.attr["font-style"] = r
                    },
                    strokeStyle: function(e) {
                        u.attr.stroke = e
                    },
                    fillStyle: function(e) {
                        u.attr.fill = e
                    },
                    arcTo: function(e, t, n, r) {
                        if (!f)
                            throw new Error("can only be called after .beginPath()");
                        o(u.children).attr.d += "L" + e + " " + t + " L" + n + " " + r + " "
                    },
                    beginPath: function() {
                        return f = !0,
                        g("path", {
                            d: ""
                        })
                    },
                    fillText: function(e, t, n) {
                        return g("text", {
                            x: t,
                            y: n,
                            stroke: "none",
                            font: void 0,
                            style: void 0,
                            "text-anchor": "center" === c(u, (e=>e.attr["text-align"])) ? "middle" : void 0
                        }, e)
                    },
                    lineCap: function(e) {
                        u.attr["stroke-linecap"] = e
                    },
                    lineJoin: function(e) {
                        u.attr["stroke-linejoin"] = e
                    },
                    lineTo: function(e, t) {
                        if (!f)
                            throw new Error("can only be called after .beginPath()");
                        return o(u.children).attr.d += "L" + e.toFixed(1) + " " + t.toFixed(1) + " ",
                        u
                    },
                    lineWidth: function(e) {
                        u.attr["stroke-width"] = e
                    },
                    measureText: function(e) {
                        return a ? (a.font = u ? `${c(u, (e=>e.attr["font-weight"]))} ${c(u, (e=>e.attr["font-style"]))} ${c(u, (e=>e.attr["font-size"]))} ${c(u, (e=>e.attr["font-family"]))}` : `${t["font-weight"]} ${t["font-style"]} ${t["font-size"]} ${t["font-family"]}`,
                        a.measureText(e)) : {
                            width: r(e, (function(e) {
                                const t = c(u, (e=>e.attr["font-size"])) ?? 12
                                  , n = parseInt(t.toString()) / 12;
                                return (B[e] ?? 16) * n
                            }
                            ))
                        }
                    },
                    moveTo: function(e, t) {
                        if (!f)
                            throw new Error("can only be called after .beginPath()");
                        o(u.children).attr.d += "M" + e.toFixed(1) + " " + t.toFixed(1) + " "
                    },
                    restore: function() {
                        u.parent && (u = u.parent)
                    },
                    save: function() {
                        const e = new l(u);
                        u.children.push(e),
                        u = e
                    },
                    setData: function(e, t) {
                        u.data = u.data ?? {},
                        u.data["data-" + e] = t
                    },
                    scale: function() {},
                    setLineDash: function(e) {
                        u.attr["stroke-dasharray"] = 0 === e.length ? "none" : e[0] + " " + e[1]
                    },
                    stroke: function() {
                        f = !1,
                        o(u.children).stroke()
                    },
                    textAlign: function(e) {
                        u.attr["text-align"] = e
                    },
                    translate: function(e, t) {
                        if (Number.isNaN(e) || Number.isNaN(t))
                            throw new Error("dx and dy must be real numbers");
                        u.attr.transform = `translate(${e}, ${t})`
                    },
                    serialize: function(e, t, n) {
                        return t && h.children.unshift(new s("desc",{},void 0,t)),
                        n && h.children.unshift(new s("title",{},void 0,n)),
                        h.attr = {
                            version: "1.1",
                            baseProfile: "full",
                            width: e.width,
                            height: e.height,
                            viewbox: "0 0 " + e.width + " " + e.height,
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                            "xmlns:ev": "http://www.w3.org/2001/xml-events"
                        },
                        h.serialize()
                    }
                }
            }
            function $(e, t, n) {
                e.width = t.width * n,
                e.height = t.height * n
            }
            function V(e, t) {
                return {
                    setFont(e, n, r, i) {
                        t.setFont(e, n, r, i)
                    },
                    textWidth: e=>t.measureText(e).width,
                    textHeight: ()=>e.leading * e.fontSize
                }
            }
            function G(e, t, n, r) {
                const i = _(e)
                  , o = i.config
                  , a = y(V(o, t), o, i.root);
                return n && $(n, a, o.zoom * r),
                o.zoom *= r,
                P(t, o, a),
                {
                    config: o,
                    layout: a
                }
            }
            function W(e, t, n) {
                return G(t, R(e), e, n || 1)
            }
            function H(e, t) {
                const n = q(t)
                  , {config: r, layout: i} = G(e, n, null, 1);
                return n.serialize({
                    width: i.width,
                    height: i.height
                }, e, r.title)
            }
            class Y extends Error {
                constructor() {
                    super("max_import_depth exceeded")
                }
            }
            async function J(e, t, n=10) {
                if (-1 == n)
                    throw new Y;
                async function r(e) {
                    try {
                        return await t(e) || ""
                    } catch (e) {
                        return ""
                    }
                }
                const i = [];
                e.replace(/#import: *(.*)/g, ((e,o)=>{
                    const a = r(o).then((e=>J(e, t, n - 1)));
                    return i.push({
                        file: o,
                        promise: a
                    }),
                    ""
                }
                ));
                const o = {};
                for (const e of i)
                    o[e.file] = await e.promise;
                return e.replace(/#import: *(.*)/g, ((e,t)=>o[t]))
            }
            function U(e, t, n=10) {
                if (-1 == n)
                    throw new Y;
                function r(e) {
                    try {
                        return t(e) || ""
                    } catch (e) {
                        return ""
                    }
                }
                return e.replace(/#import: *(.*)/g, ((e,i)=>U(r(i), t, n - 1)))
            }
            function K(e, t) {
                const n = A
                  , r = A
                  , i = r.dirname(e);
                function o(e) {
                    return n.readFileSync(r.join(i, e), {
                        encoding: "utf8"
                    })
                }
                return U(o(e.substr(i.length)), o, t)
            }
            const Q = "1.6.2";
            e.ImportDepthError = Y,
            e.ParseError = k,
            e.compileFile = K,
            e.draw = W,
            e.layout = y,
            e.parse = _,
            e.processAsyncImports = J,
            e.processImports = U,
            e.renderSvg = H,
            e.skanaar = l,
            e.styles = h,
            e.version = Q,
            e.visualizers = m,
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }(t, (I || (I = 1,
        function(e) {
            e.exports = P()
        }(C)),
        C.exports))
    }(0, O.exports);
    var R = a({
        __proto__: null,
        default: v(O.exports)
    }, [O.exports]);
    class D {
        constructor(e) {
            this.dynamicButton = null,
            this.signals = new b,
            this.on = this.signals.on,
            this.off = this.signals.off,
            this.nomnoml = R;
            var t = document.querySelector("body")
              , n = document.getElementById("linenumbers")
              , r = document.getElementById("textarea")
              , i = document.getElementById("canvas")
              , o = document.getElementById("canvas-panner");
            this.editor = e.fromTextArea(r, {
                lineNumbers: !0,
                mode: "nomnoml",
                matchBrackets: !0,
                theme: "solarized light",
                keyMap: "sublime"
            }),
            this.editor.on("drop", ((e,t)=>{
                var n = t.dataTransfer?.files;
                n && "image/svg+xml" == n[0].type && (t.preventDefault(),
                this.handleOpeningFiles(n))
            }
            )),
            this.filesystem = new E;
            var a = new p(this.editor,n);
            this.panner = new f(o,(()=>this.sourceChanged())),
            this.downloader = new x(i),
            new L("canvas-mode",t,[o]),
            this.defaultSource = (document.getElementById("defaultGraph") || {
                innerHTML: ""
            }).innerHTML;
            var s = null
              , c = async()=>{
                s = null,
                await this.filesystem.configureByRoute(location.hash);
                try {
                    var e = await this.filesystem.storage.read();
                    this.editor.setValue(e || this.defaultSource),
                    this.sourceChanged()
                } catch (e) {
                    console.log(e)
                }
            }
            ;
            async function l(e) {
                var t = new N(e);
                return await t.read() ?? ""
            }
            window.addEventListener("hashchange", (()=>c())),
            window.addEventListener("resize", d((()=>this.sourceChanged()), 750, {
                leading: !0
            })),
            this.editor.on("changes", h((()=>this.sourceChanged()), 300)),
            this.sourceChanged = async()=>{
                try {
                    this.signals.trigger("compile-error", null),
                    a.clearState();
                    var e = this.editor.getValue()
                      , t = await function(e) {
                        try {
                            return O.exports.processAsyncImports(e, l)
                        } catch (e) {
                            if (e instanceof O.exports.ImportDepthError)
                                return "Error: too many imports";
                            throw e
                        }
                    }(e)
                      , n = this.nomnoml.draw(i, t, this.panner.zoom());
                    s = e,
                    this.panner.positionCanvas(i),
                    this.filesystem.storage.save(e),
                    this.downloader.source = e,
                    this.downloader.setFilename(n.config.title || this.filesystem.activeFile.name),
                    this.signals.trigger("source-changed", e)
                } catch (e) {
                    this.signals.trigger("compile-error", e),
                    s && this.nomnoml.draw(i, s, this.panner.zoom()),
                    this.panner.positionCanvas(i),
                    e instanceof O.exports.ParseError && a.setError(e)
                }
            }
            ,
            c()
        }
        loadSvg(e) {
            var t = (new DOMParser).parseFromString(e, "text/xml");
            if (1 === t.getElementsByTagName("desc").length) {
                var n = t.getElementsByTagName("desc")[0].childNodes[0].nodeValue;
                n = l(n || ""),
                this.editor.setValue(n)
            } else
                alert("SVG did not have nomnoml code embedded within it.")
        }
        currentSource() {
            return this.editor.getValue()
        }
        magnifyViewport(e) {
            this.panner.magnify(e)
        }
        resetViewport() {
            this.panner.reset()
        }
        toggleSidebar(e) {
            for (var t of ["about", "reference", "export", "files"])
                e !== t && document.getElementById(t)?.classList.remove("visible");
            document.getElementById(e)?.classList.toggle("visible")
        }
        discardCurrentGraph() {
            confirm("Do you want to discard current diagram and load the default example?") && (this.editor.setValue(this.defaultSource),
            this.sourceChanged())
        }
        async saveAs(e="") {
            var t = prompt("Name your diagram", e) ?? e
              , n = this.currentSource();
            return t ? this.filesystem.storage.files().then((e=>e.some((e=>e.name === t)) ? (alert("A file named " + t + " already exists."),
            "failure") : (this.filesystem.moveToFileStorage(t, n),
            location.href = "#file/" + encodeURIComponent(t),
            "success"))) : "failure"
        }
        exitViewMode() {
            window.location.href = "./"
        }
        handleOpeningFiles(e) {
            if (1 === e.length) {
                var t = new FileReader;
                t.onload = ()=>this.loadSvg(t.result),
                t.readAsText(e[0])
            } else
                alert("You can only upload one file at a time.")
        }
    }
    const F = n.createElement
      , B = (...e)=>F("div", ...e)
      , q = (...e)=>F("span", ...e)
      , $ = (...e)=>F("h2", ...e)
      , V = (...e)=>F("label", ...e)
      , G = (...e)=>F("a", ...e)
      , W = (...e)=>F("input", ...e);
    function H(e) {
        return function(t) {
            t.preventDefault(),
            e(t)
        }
    }
    function Y(e) {
        return F("i", {
            className: "icon"
        }, F("svg", {
            version: "1.2",
            baseProfile: "tiny",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "24",
            height: "24"
        }, F("path", {
            d: e.shape
        })))
    }
    const J = "M12 4.5l-4.7 4.7c-.3.3-.3 1.0 0 1.4s1.0.3 1.4 0l2.2-2.2v7.5c0 .5.4 1 1 1s1-.4 1-1v-7.5l2.2 2.2c.1.1.4.2.7.2s.5-.0.7-.2c.3-.3.3-1.0 0-1.4l-4.7-4.7z M19 18c.55 0 1 .45 1 1s-.45 1-1 1h-14c-.55 0-1-.45-1-1s.45-1 1-1h14m0-2h-14c-1.6 0-3 1.3-3 3s1.3 3 3 3h14c1.6 0 3-1.3 3-3s-1.3-3-3-3z"
      , U = "M18 7h-1v-1c0-1.1-.8-2-2-2h-7c-1.1 0-2 .8-2 2v1h-1c-.5 0-1 .4-1 1s.4 1 1 1v8c0 2.2 1.7 4 4 4h5c2.2 0 4-1.7 4-4v-8c.5 0 1-.4 1-1s-.4-1-1-1zm-10-1h7v1h-7v-1zm8 11c0 1.1-.8 2-2 2h-5c-1.1 0-2-.8-2-2v-8h9v8zM8.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM10.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM12.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5zM14.5 10.5c-.2 0-.5.2-.5.5v6c0 .2.2.5.5.5s.5-.2.5-.5v-6c0-.2-.2-.5-.5-.5z"
      , K = "M8.5 7.9c.8 0 1.5.6 1.5 1.5s-.6 1.5-1.5 1.5-1.5-.6-1.5-1.5.6-1.5 1.5-1.5m0-1c-1.3 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM16 11.9c.45.0 1.27 1.8 1.7 4.0h-11.3c.4-1.0 1.0-2.0 1.6-2.0.8 0 1.1.1 1.53.42.4.2 1.0.58 1.97.58 1.1 0 1.9-.8 2.6-1.6.6-.6 1.2-1.3 1.8-1.3m0-1c-2 0-3 3-4.5 3s-1.4-1-3.5-1c-2 0-3.0 4-3.0 4h14.0s-1-6-3-6zM22 6c0-1.1-.8-2-2-2h-16c-1.1 0-2 .8-2 2v12c0 1.1.8 2 2 2h16c1.1 0 2-.8 2-2v-12zm-2 12h-16v-12h16.0l-.0 12z";
    function Q(e) {
        return B({
            className: "canvas-tools"
        }, B({
            className: "canvas-button"
        }, G({
            title: "Zoom in",
            onClick: H((()=>e.app.magnifyViewport(2)))
        }, F(Y, {
            shape: "M18 10h-4v-4c0-1.1-.8-2-2-2s-2 .8-2 2l.0 4h-4.0c-1.1 0-2 .8-2 2s.8 2 2 2l4.0-.0-.0 4.0c0 1.1.8 2 2 2s2-.8 2-2v-4.0l4 .0c1.1 0 2-.8 2-2s-.8-2-2-2z"
        }))), B({
            className: "canvas-button"
        }, G({
            title: "Reset zoom and panning",
            onClick: H((()=>e.app.resetViewport()))
        }, F(Y, {
            shape: "M18 7h-12c-1.1 0-2 .8-2 2s.8 2 2 2h12c1.1 0 2-.8 2-2s-.8-2-2-2zM18 14h-12c-1.1 0-2 .8-2 2s.8 2 2 2h12c1.1 0 2-.8 2-2s-.8-2-2-2z"
        }))), B({
            className: "canvas-button"
        }, G({
            title: "Zoom out",
            onClick: H((()=>e.app.magnifyViewport(-2)))
        }, F(Y, {
            shape: "M18 11h-12c-1.1 0-2 .8-2 2s.8 2 2 2h12c1.1 0 2-.8 2-2s-.8-2-2-2z"
        }))))
    }
    function Z({app: e}) {
        var t = e.downloader
          , n = e.downloader.source;
        return B({
            className: "file-menu"
        }, $({}, "Share diagram"), G({
            className: "btn",
            href: "#view/" + k.urlEncode(n),
            target: "_blank"
        }, F(Y, {
            shape: "M17.5 6c.3 0 .6.1.8.3.4.5.4 1.1 0 1.6l-1.7 1.7.3.3c.5.6.9 1.4.9 2.2s-.4 1.6-1 2.2l-4.1 4.2c-.6.5-1.4.9-2.2.9s-1.6-.4-2.2-1l-.3-.2-1.7 1.7a1 1 0 0 1-1.6 0c-.4-.5-.4-1.1 0-1.6l1.7-1.7-.3-.3c-.5-.6-.9-1.4-.9-2.2s.4-1.6 1-2.2l4.1-4.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.3 1.7-1.7c.2-.2.5-.3.8-.3m0-2a3 3 0 0 0-2.2 1l-.5.4a5.2 5.2 0 0 0-5.9 1l-4.2 4a5 5 0 0 0-1 6l-.4.5a3 3 0 0 0 0 4.4 3 3 0 0 0 4.4 0l.5-.5a5 5 0 0 0 5.9-1l4.2-4a5 5 0 0 0 1-6l.4-.5a3 3 0 0 0 0-4.4 3 3 0 0 0-2.2-.9zm-6.1 7.2a2 2 0 0 0 2 2L11.6 15a2 2 0 0 0-2-2l1.8-1.8M12.5 9c-.2 0-.5.1-.6.3l-4.2 4.2c-.2.1-.3.4-.3.6 0 .2.1.5.3.6l.3.3.7-.7a1 1 0 0 1 1.6 0c.4.5.4 1.1 0 1.6l-.7.7.3.3c.1.2.4.3.6.3l.6-.3 4.2-4.2c.2-.1.3-.4.3-.6 0-.2-.1-.5-.3-.6l-.3-.3-.7.7a1 1 0 0 1-1.6 0c-.4-.5-.4-1.1 0-1.6l.7-.7-.3-.3a.9.9 0 0 0-.6-.3z"
        }), "Shareable link"), G({
            className: "btn",
            href: "image.svg?source=" + k.urlEncode(n),
            target: "_blank"
        }, F(Y, {
            shape: "M12.1 3.3q2.6 0 4.8 1.3Q19 6 20.3 8.1q1.2 2.1 1.2 4.7t-1.3 4.7Q19 19.7 16.8 21q-2.2 1.3-4.7 1.3-2.6 0-4.8-1.3-2.1-1.3-3.4-3.4-1.2-2.2-1.2-4.7Q2.7 10 4 8q1.2-2.2 3.4-3.4 2.2-1.3 4.7-1.3zm-.7 2.2Q10 6 9.2 8.3q1 .3 2.2.4V5.5zm1.4 3.2q1.1 0 2.2-.4-.7-2.3-2.2-2.8v3.2zm2.6-2.6q.6.9.9 1.8l1-.5q-.8-.7-1.9-1.3zM8 8l.9-1.8q-1 .5-1.8 1.3L8 8zm11.5 4.2q0-2-1.3-3.7-.8.6-1.5.8.3 1.4.4 2.9h2.4zm-11.9-3Q6.9 9 6 8.4 5 10 4.7 12.1h2.5q0-1.5.4-2.9zm3.8.9l-2.6-.5q-.2 1.1-.2 2.5h2.8V10zm4.2 2q0-1.4-.2-2.5l-2.6.5v2h2.8zM4.7 13.4q.3 2 1.4 3.7l1.5-.8q-.3-1.4-.4-2.9H4.7zm3.9 0q0 1.4.2 2.5l2.6-.5v-2H8.6zm4.2 2l2.6.5q.2-1.1.2-2.5h-2.8v2zm3.8.9q.7.2 1.5.8 1.1-1.6 1.3-3.7H17q0 1.5-.4 2.9zM12.8 20q1.5-.5 2.2-2.8l-2.2-.4V20zm-1.4-3.2q-1.1 0-2.2.4.7 2.3 2.2 2.8v-3.2zm-3.5.8L7 18l1.8 1.2-.8-1.7zm8.4 0q-.3 1-.9 1.7 1-.4 1.8-1.2l-1-.5z"
        }), "Server hosted SVG"), $({}, "Downloads"), G({
            className: "btn",
            href: "/",
            onClick: H((()=>t.pngDownload()))
        }, F(Y, {
            shape: "M19 20h-14c-1.6 0-3-1.3-3-3v-8c0-1.6 1.3-3 3-3h1.5l1-1c.5-.5 1.5-1 2.4-1h4c.8 0 1.8.4 2.4 1l1 1h1.5c1.6 0 3 1.3 3 3v8c0 1.6-1.3 3-3 3zm-14-12c-.5 0-1 .4-1 1v8c0 .5.4 1 1 1h14c.5 0 1-.4 1-1v-8c0-.5-.4-1-1-1h-2c-.2 0-.52-.1-.7-.2l-1.2-1.2c-.2-.2-.7-.4-1-.4h-4c-.2 0-.7.2-1 .4l-1.2 1.2c-.1.1-.4.2-.7.2h-2zM12 10c1.3 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5m0-1c-1.9 0-3.5 1.5-3.5 3.5 0 1.9 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.9-1.5-3.5-3.5-3.5zM18 8.6c-.7 0-1.3.5-1.3 1.3s.5 1.2 1.3 1.2 1.3-.58 1.3-1.2-.5-1.3-1.3-1.3z"
        }), "PNG image"), F("p", {}, "Downloaded image files will be given the filename in the ", F("tt", {}, "#title"), " directive"), G({
            className: "btn",
            href: "/",
            onClick: H((()=>t.svgDownload(e.nomnoml.renderSvg)))
        }, F(Y, {
            shape: K
        }), "SVG with source"), F("p", {}, "Downloaded SVG files will have the source code embedded. Open an exported SVG file to load it's nomnoml source."), G({
            className: "btn",
            href: "/",
            onClick: H((()=>t.srcDownload()))
        }, F(Y, {
            shape: "M20.9 17c0-.1-.0-.2-.0-.3l-2-6c-.1-.4-.5-.6-.9-.6h-.5l.6-.6c1.17-1.17 1.17-3.0 0-4.2-.81-.8-2.0-1.0-3.1-.7v-1.3c0-1.6-1.3-3-3-3s-3 1.3-3 3v1.3c-1.0-.3-2.3-.1-3.1.7-1.17 1.17-1.17 3.0.0 4.2l.68.6h-.5c-.4 0-.8.2-.9.6l-2 6c-.0.1-.0.2-.0.3-.0 0-.0 5-.0 5 0 .5.4 1 1 1h16c.5 0 1-.4 1-1 0 0 0-5-.0-5zm-13.6-10.5c.1-.1.4-.2.7-.2s.5.1.7.2l2.2 2.2v-5.7c0-.5.4-1 1-1s1 .4 1 1v5.7l2.2-2.2c.3-.3 1.0-.3 1.4 0 .3.39.3 1.0.0 1.4l-4.7 4.6-4.7-4.6c-.3-.3-.3-1.0 0-1.4zm-.5 5.5h1.8l3.4 3.41 3.4-3.41h1.8l1.6 5h-13.8l1.6-5zm12.2 9h-14v-3h14v3z"
        }), "Source code"))
    }
    function X(e) {
        var t = e.app.filesystem
          , n = "local_file" === t.storage.kind
          , r = "local_default" === t.storage.kind
          , i = []
          , o = null;
        for (var a of e.files) {
            var s = a.name.split("/")
              , l = s.pop()
              , d = s.join("/");
            o != d && "" !== d && (o = d,
            i.push({
                isDir: !0,
                name: d
            })),
            i.push({
                isDir: !1,
                name: l,
                entry: a
            })
        }
        function h(e) {
            return n && t.activeFile.name === e.name
        }
        async function u(e) {
            var n = new c.default
              , r = await t.storage.files();
            for (var i of r)
                if (!e || i.name.startsWith(e + "/")) {
                    var o = new N(i.name);
                    n.file(i.name, await o.read())
                }
            var a = await n.generateAsync({
                type: "blob"
            })
              , s = (new Date).toISOString().substr(0, 10);
            w(a, e ?? `nomnoml-${s}.zip`)
        }
        function f(e, t) {
            for (var n = ""; t.some((t=>t == e + n)); )
                n = "" == n ? 2 : n + 1;
            return e + n.toString()
        }
        function p(n, r) {
            var i, o = h(r) ? "active " : "", a = n === r.name ? "" : "indented";
            return B({
                key: r.name,
                className: "file-entry " + o + a
            }, G({
                href: (i = r,
                "#file/" + encodeURIComponent(i.name).replace(/%20/g, "+").replace(/%2F/g, "/"))
            }, n), h(r) && G({
                onClick: H((()=>async function(n) {
                    "success" == await e.app.saveAs(n.name) && t.discard(n)
                }(r))),
                title: "Rename this diagram"
            }, F(Y, {
                shape: "M21 6.8l-3.8-3.8c-.2-.2-.6-.4-1.0-.4-.3 0-.7.1-1.06.4l-10.9 10.9c-.2.2-.5.7-.75 1.1-.1.4-.3.9-.3 1.3v4.5h4.5c.4 0 .9-.1 1.3-.3.4-.1.8-.4 1.1-.75l10.94-10.9c.2-.2.4-.6.4-1.0 0-.3-.1-.7-.4-1.06zm-15.2 8.1l8.2-8.2 1.2 1.2-8.2 8.2-1.2-1.2zm1.7 3.9h-1.5l-1-1v-1.5c0-.0.0-.3.1-.6.01-.02 2.9 2.9 2.9 2.9-.3.1-.5.1-.6.1zm1.4-.7l-1.2-1.2 8.2-8.2 1.2 1.2-8.2 8.2zm9-9l-3.1-3.1 1.2-1.2 3.17 3.1-1.2 1.2z"
            })), G({
                onClick: H((()=>function(e) {
                    confirm('Permanently delete "' + e.name + '"') && t.discard(e)
                }(r))),
                title: "Discard this diagram"
            }, F(Y, {
                shape: U
            })))
        }
        return B({
            className: "file-menu"
        }, V({
            className: "btn"
        }, F(Y, {
            shape: K
        }), "Open SVG with source...", W({
            type: "file",
            accept: "image/svg+xml",
            onChange: H((function(t) {
                var n = t.target.files;
                e.app.handleOpeningFiles(n)
            }
            ))
        })), G({
            className: "btn",
            href: "/",
            onClick: H((()=>u()))
        }, F(Y, {
            shape: J
        }), "Export .zip archive..."), V({
            className: "btn"
        }, F(Y, {
            shape: "M16.7 10.2c-.3-.3-1.0-.3-1.4 0l-2.2 2.2v-7.5c0-.5-.4-1-1-1s-1 .4-1 1v7.5l-2.2-2.2c-.3-.3-1.0-.3-1.4 0s-.3 1.0 0 1.4l4.7 4.7 4.7-4.7c.3-.3.3-1.0 0-1.4z  M19 18c.55 0 1 .45 1 1s-.45 1-1 1h-14c-.55 0-1-.45-1-1s.45-1 1-1h14m0-2h-14c-1.6 0-3 1.3-3 3s1.3 3 3 3h14c1.6 0 3-1.3 3-3s-1.3-3-3-3z"
        }), "Import .zip archive...", W({
            type: "file",
            accept: "application/zip",
            onChange: H((async function(e) {
                var n = e.target
                  , r = n.files[0]
                  , i = r.name.replace(/\.zip$/, "")
                  , o = prompt("Specify folder name to import files into.\nLeave empty to load into root.", i);
                if (null != o) {
                    o = o.trim() ? o.replace(/\/$/, "") + "/" : "";
                    var a = await t.storage.files()
                      , s = await c.default.loadAsync(r);
                    for (var l in s.files)
                        if (!l.split("/").some((e=>"." == e[0]))) {
                            var d = s.file(l);
                            if (d) {
                                var h = await d.async("text")
                                  , u = f(o + l, a.map((e=>e.name)))
                                  , p = new N(u);
                                await p.insert(h)
                            }
                        }
                    n.value = "",
                    t.finishedInsertingFiles()
                }
            }
            ))
        })), G({
            className: "btn",
            href: "/",
            onClick: H((()=>e.app.saveAs()))
        }, F(Y, {
            shape: "M15 12h-2v-2c0-.5-.4-1-1-1s-1 .4-1 1v2h-2c-.5 0-1 .4-1 1s.4 1 1 1h2v2c0 .5.4 1 1 1s1-.4 1-1v-2h2c.5 0 1-.4 1-1s-.4-1-1-1zM19.7 7.2l-4-4c-.1-.1-.4-.2-.7-.2h-8c-1.6 0-3 1.3-3 3v12c0 1.6 1.3 3 3 3h10c1.6 0 3-1.3 3-3v-10c0-.2-.1-.52-.2-.7zm-2.1.7h-1.0c-.8 0-1.5-.6-1.5-1.5v-1.0l2.5 2.5zm-.5 11h-10c-.5 0-1-.4-1-1v-12c0-.5.4-1 1-1h7v1.5c0 1.3 1.1 2.5 2.5 2.5h1.5v9c0 .5-.4 1-1 1z"
        }), "Save to local file..."), $({}, e.isLoaded ? "Local files" : "loading files..."), B({
            className: "file-entry " + (r ? "active" : "")
        }, G({
            href: "#"
        }, F(Y, {
            shape: "M22.2 10.4c-3.39-2.8-9.5-8.1-9.6-8.2l-.6-.5-.6.5c-.0.0-6.2 5.3-9.66 8.2-.4.3-.6.9-.6 1.5 0 1.1.8 2 2 2h1v6c0 1.1.8 2 2 2h12c1.1 0 2-.8 2-2v-6h1c1.1 0 2-.8 2-2 0-.5-.2-1.1-.7-1.5zm-8.2 9.5h-4v-5h4v5zm4-8l.0 8h-3.0v-6h-6v6h-3v-8h-3.0c2.7-2.3 7.3-6.2 9.0-7.68 1.6 1.4 6.2 5.3 9 7.6l-3-.0z"
        }), "Home")), i.map((e=>e.isDir ? function(e) {
            return B({
                key: "//dir/" + e,
                className: "file-entry directory"
            }, G({
                href: "javascript:void(0)"
            }, F(Y, {
                shape: "M18 6h-6c0-1.1-.8-2-2-2h-4c-1.6 0-3 1.3-3 3v10c0 1.6 1.3 3 3 3h12c1.6 0 3-1.3 3-3v-8c0-1.6-1.3-3-3-3zm-12 0h4c0 1.1.8 2 2 2h6c.5 0 1 .4 1 1h-14v-2c0-.5.4-1 1-1zm12 12h-12c-.5 0-1-.4-1-1v-7h14v7c0 .5-.4 1-1 1z"
            }), e), G({
                onClick: H((()=>u(e))),
                title: "Export folder as archive"
            }, F(Y, {
                shape: J
            })))
        }(e.name) : p(e.name, e.entry))), $({}, " "), F("p", {}, "Import files with ", F("code", {}, "#import: file")), F("p", {}, "Create folders with ", F("code", {}, "/"), " in filename"))
    }
    function ee(e) {
        var t = "url" == e.app.filesystem.storage.kind
          , n = "local_file" == e.app.filesystem.storage.kind
          , r = H((()=>e.app.saveAs()));
        return t ? B({
            className: "system-banners"
        }, q({
            className: "banner card visible"
        }, "View mode, changes are not saved.", G({
            onClick: r,
            href: "/",
            title: "Save this diagram to localStorage"
        }, "save"), G({
            href: "#",
            title: "Discard this diagram"
        }, "close"))) : n ? B({
            className: "system-banners"
        }, q({
            className: "banner card visible"
        }, 'Editing "' + e.app.filesystem.activeFile.name + '"', G({
            href: "#",
            title: "Exit from this file"
        }, "close"))) : B({
            className: "system-banners"
        })
    }
    function te(e) {
        var [t,r] = n.useState(null);
        function i(e) {
            r(e ? {
                title: "Parse error",
                details: e.message
            } : null)
        }
        return n.useEffect((()=>(e.app.signals.on("compile-error", i),
        ()=>e.app.signals.off("compile-error", i)))),
        B({
            className: "terminal-banners"
        }, t && q({
            className: "banner card card-warning visible"
        }, t.title, F("br"), F("tt", {}, t.details)))
    }
    function ne(e) {
        var [t,r] = n.useState("")
          , i = e.app;
        return B({
            className: "tools"
        }, G({
            className: "logo",
            onClick: H((()=>i.toggleSidebar("about"))),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("About nomnoml")
        }, ((...e)=>F("h1", ...e))({}, "nomnoml ")), G({
            onClick: H((()=>i.toggleSidebar("about"))),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("About nomnoml")
        }, F(Y, {
            shape: "M14.2 16.0l.5-1.1c.8-1.61.8-3.2.2-4.5-.1-.2-.2-.4-.4-.6 1.4-.6 2.4-2.0 2.4-3.6 0-2.2-1.7-4-4-4s-4 1.7-4 4c0 .7.2 1.5.6 2.1-1.6.33-2.8 1.2-2.9 1.3-.7.6-.8 1.68-.4 2.5.3.5.8.9 1.4.98l-.5 1.1c-.8 1.61-.8 3.2-.2 4.5.5 1.1 1.6 1.9 2.9 2.2.4.0.8.1 1.2.1 2.3 0 3.9-1.3 4.14-1.5.7-.63.8-1.6.4-2.5-.3-.5-.8-.9-1.4-.98zm-1.2-12.0c1.1 0 2 .8 2 2s-.8 2-2 2c-1.1 0-2-.8-2-2s.8-2 2-2zm-1.8 14.9c-.2 0-.5-.0-.8-.0-1.6-.3-2.3-1.9-1.3-3.9l1-1.9c.5-.9.47-1.63-.1-2.0-.1-.1-.4-.1-.6-.1-.5 0-1.2.2-1.2.2s1.1-1.0 2.8-1.0c.2 0 .56.0.8.0 1.64.3 2.3 1.9 1.3 3.9l-1 1.9c-.5.9-.4 1.6.1 2.0.1.1.4.1.6.1.5 0 1.2-.2 1.2-.2s-1.1 1.0-2.8 1.0z"
        })), G({
            onClick: H((()=>i.toggleSidebar("reference"))),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("Language reference")
        }, F(Y, {
            shape: "M17 21h-10c-1.6 0-3-1.3-3-3v-12c0-1.6 1.3-3 3-3h10c1.6 0 3 1.3 3 3v12c0 1.6-1.3 3-3 3zm-10-16c-.5 0-1 .4-1 1v12c0 .5.4 1 1 1h10c.5 0 1-.4 1-1v-12c0-.5-.4-1-1-1h-10zM16 11h-8c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h8c.2 0 .5.2.5.5s-.2.5-.5.5zM16 8h-8c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h8c.2 0 .5.2.5.5s-.2.5-.5.5zM16 14h-8c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h8c.2 0 .5.2.5.5s-.2.5-.5.5zM16 17h-8c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h8c.2 0 .5.2.5.5s-.2.5-.5.5z"
        })), G({
            onClick: H((()=>i.toggleSidebar("export"))),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("Export this diagram")
        }, F(Y, {
            shape: "M12 21.3l-7.1-7.1c-1.17-1.17-1.17-3.0 0-4.2 1.0-1.0 2.9-1.1 4.1-.1v-4.8c0-1.6 1.3-3 3-3s3 1.3 3 3v4.8c1.1-1.0 3.0-.9 4.1.1 1.17 1.1 1.17 3.0 0 4.2l-7.1 7.1zm-5-10.2c-.2 0-.5.1-.7.2-.3.39-.3 1.0 0 1.4l5.7 5.7 5.7-5.7c.3-.3.3-1.0 0-1.4-.3-.3-1.0-.3-1.4 0l-3.2 3.2v-9.6c0-.5-.4-1-1-1s-1 .4-1 1v9.6l-3.2-3.2c-.1-.1-.4-.2-.7-.2z"
        })), G({
            onClick: H((()=>i.toggleSidebar("files"))),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("Save this or load another diagram")
        }, F(Y, {
            shape: "M22.3 8h-2.4c-.4-1.2-1.5-2-2.8-2h-6c0-1.1-.9-2-2-2h-4.1c-1.7 0-3 1.3-3 3v10c0 1.7 1.3 3 3 3h12c1.7 0 3.4-1.3 3.8-3l2.2-8c.1-.6-.2-1-.7-1zm-18.3 1v-2c0-.6.4-1 1-1h4c0 1.1.9 2 2 2h6c.6 0 1 .4 1 1h-11.1c-.6 0-1.1.4-1.3 1l-1.6 6.3v-7.3zm14.9 7.5c-.2.8-1.1 1.5-1.9 1.5h-12s-.4-.2-.2-.8l1.9-7c0-.1.2-.2.3-.2h13.7l-1.8 6.5z"
        })), i.dynamicButton ? i.dynamicButton(i, r) : G({
            onClick: H((()=>i.discardCurrentGraph())),
            onMouseLeave: ()=>r(""),
            onMouseEnter: ()=>r("Discard current diagram")
        }, F(Y, {
            shape: U
        })), B({
            id: "tooltip"
        }, t), F(ee, {
            app: i
        }), F(te, {
            app: i
        }))
    }
    e.app = void 0,
    e.App = D,
    e.DailyTip = function({id: e, sticky: t, children: r}) {
        var i = "nomnoml.daily-tip:" + e
          , o = t || "hide" != localStorage[i]
          , [,a] = n.useState(!0);
        return B({
            className: "alert card " + (o ? "" : "alert-hidden")
        }, r, t || G({
            className: "alert-close",
            onClick: H((function() {
                localStorage[i] = "hide",
                a(!1)
            }
            ))
        }, "×"))
    }
    ,
    e.NomnomlGraph = function(e) {
        return q({
            dangerouslySetInnerHTML: {
                __html: O.exports.renderSvg(e.source)
            }
        })
    }
    ,
    e.bootstrap = function(t) {
        e.app = new D(t);
        var n = e=>document.querySelector(e);
        function r() {
            s.render(F(Z, {
                app: e.app
            }), n("[export-menu]")),
            s.render(F(ne, {
                app: e.app
            }), n("[menu]")),
            s.render(F(Q, {
                app: e.app
            }), n("[canvas-tools]"))
        }
        function i() {
            s.render(F(X, {
                app: e.app,
                files: [],
                isLoaded: !1
            }), n("[file-menu]")),
            e.app.filesystem.storage.files().then((t=>{
                s.render(F(X, {
                    app: e.app,
                    files: t,
                    isLoaded: !0
                }), n("[file-menu]"))
            }
            ))
        }
        r(),
        i(),
        e.app.signals.on("source-changed", r),
        e.app.signals.on("compile-error", r),
        e.app.filesystem.signals.on("updated", i),
        function() {
            for (var e = {}, t = document.querySelectorAll("[publish-as-file]"), n = 0; n < t.length; n++) {
                var r = t[n].attributes.getNamedItem("publish-as-file")?.value;
                e[r] = l(t[n].innerHTML)
            }
            var i = document.querySelectorAll("[append-nomnoml-preview]");
            for (n = 0; n < i.length; n++)
                try {
                    var o = i[n]
                      , a = O.exports.processImports(l(o.innerHTML), (t=>e[t]))
                      , s = O.exports.renderSvg(a, document)
                      , c = document.createElement("div");
                    c.innerHTML = s,
                    o.append(c)
                } catch (e) {}
        }()
    }
    ,
    e.nomnoml = R,
    e.version = "1.6.2+master.89a1ac44",
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
}
));
