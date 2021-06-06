! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t = t || self).Attention = {})
}(this, function(t) {
    "use strict";

    function i(t, n) {
        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, n) {
        for (var e = 0; e < n.length; e++) {
            var i = n[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, n, e) {
        return n && o(t.prototype, n), e && o(t, e), t
    }

    function n(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), n && e(t, n)
    }

    function r(t) {
        return (r = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function e(t, n) {
        return (e = Object.setPrototypeOf || function(t, n) {
            return t.__proto__ = n, t
        })(t, n)
    }

    function a(t, n) {
        return !n || "object" != typeof n && "function" != typeof n ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : n
    }
    var c = function(t) {
            return "string" == typeof t
        },
        l = function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "div",
                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [],
                i = document.createElement(t);
            if (null !== e) {
                var o = function(n) {
                    var t;
                    ((t = n).startsWith("on") ? t.toLowerCase() : "on".concat(t)) in window ? i.addEventListener(n, function(t) {
                        e[n](t, i)
                    }) : i.setAttribute(n, e[n])
                };
                for (var s in e) o(s)
            }
            return 0 < n.length && n.forEach(function(t) {
                "string" == typeof t ? i.appendChild(document.createTextNode(t)) : i.appendChild(t)
            }), i
        },
        u = function() {
            function n(t) {
                i(this, n), (this.options = t).title && t.content && (c(t.title) && (this.title = t.title), c(t.content) && (this.content = t.content), t.animation && ("boolean" == typeof t.animation || c(t.animation)) ? this.animation = t.animation : this.animation = "fade", this.port = null, this.template = this.createBase())
            }
            return s(n, [{
                key: "createBase",
                value: function() {
                    var t, n = this,
                        e = l("div", {
                            class: "close",
                            click: function() {
                                n.close()
                            }
                        });
                    return e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>', this.port = l("div", {
                        class: "port"
                    }), t = "fade" === this.animation ? "opacity:0;" : "", this.container = l("div", {
                        class: "attention-component",
                        style: t
                    }, [l("div", {
                        class: "inner"
                    }, [l("div", {
                        class: "content"
                    }, [e, this.port])])]), this.container
                }
            }, {
                key: "render",
                value: function() {
                    var n, e, i, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : document.body;
                    this.options.beforeRender && this.options.beforeRender(this), t.appendChild(this.template), this.options.afterRender && this.options.afterRender(this), "fade" === this.animation && (n = this.template, i = 0, window.requestAnimationFrame(function t() {
                        100 <= i ? (window.cancelAnimationFrame(t), e && e(n)) : (i += 4, n.style.opacity = (i / 100).toString(), window.requestAnimationFrame(t))
                    }))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.container.parentElement.removeChild(this.container), this.options.afterClose && this.options.afterClose(this)
                }
            }, {
                key: "close",
                value: function() {
                    var n, e, i, t = this;
                    this.options.beforeClose && this.options.beforeClose(this), this.animation ? "fade" === this.animation && (n = this.container, e = function() {
                        t.destroy()
                    }, i = 100, window.requestAnimationFrame(function t() {
                        i <= 0 ? (window.cancelAnimationFrame(t), e && e(n)) : (i -= 4, n.style.opacity = (i / 100).toString(), window.requestAnimationFrame(t))
                    })) : this.destroy()
                }
            }]), n
        }(),
        p = function(t) {
            function e(t) {
                var n;
                return i(this, e), (n = a(this, r(e).call(this, t))).injectTemplate(), n.render(), n
            }
            return n(e, u), s(e, [{
                key: "injectTemplate",
                value: function() {
                    var t = l("div", {
                        class: "head"
                    }, [l("p", {
                        class: "title"
                    }, [this.title])]);
                    this.port.appendChild(t);
                    var n = l("div", {
                        class: "inner-container"
                    }, [l("p", {
                        class: "content"
                    }, [this.content])]);
                    this.port.appendChild(t), this.port.appendChild(n)
                }
            }]), e
        }(),
        h = function(t) {
            function e(t) {
                var n;
                return i(this, e), (n = a(this, r(e).call(this, t))).submitText = c(t.submitText) ? t.submitText : "Submit", n.placeholderText = c(t.placeholderText) ? t.placeholderText : "Type", n.injectTemplate(), n.render(), n
            }
            return n(e, u), s(e, [{
                key: "handleInput",
                value: function(t, n) {
                    "Enter" !== t.key && 13 !== t.keyCode || this.submit()
                }
            }, {
                key: "submit",
                value: function() {
                    var t = this.input.value;
                    "" !== t && (this.close(), this.options.onSubmit && this.options.onSubmit(this, t))
                }
            }, {
                key: "injectTemplate",
                value: function() {
                    var e = this,
                        t = l("div", {
                            class: "head"
                        }, [l("p", {
                            class: "title"
                        }, [this.title])]);
                    this.port.appendChild(t), this.input = l("input", {
                        type: "text",
                        class: "input",
                        placeholder: this.placeholderText,
                        keyup: function(t, n) {
                            e.handleInput(t, n)
                        }
                    });
                    var n = l("div", {
                            class: "prompt-elements"
                        }, [this.input, l("button", {
                            class: "button",
                            click: function() {
                                e.submit()
                            }
                        }, [this.submitText])]),
                        i = l("div", {
                            class: "inner-container"
                        }, [l("p", {
                            class: "content"
                        }, [this.content]), n]);
                    this.port.appendChild(t), this.port.appendChild(i)
                }
            }]), e
        }(),
        d = function(t) {
            function e(t) {
                var n;
                return i(this, e), (n = a(this, r(e).call(this, t))).buttonCancel = c(t.buttonCancel) ? t.buttonCancel : "No", n.buttonConfirm = c(t.buttonConfirm) ? t.buttonConfirm : "Agree", n.injectTemplate(), n.render(), n
            }
            return n(e, u), s(e, [{
                key: "injectTemplate",
                value: function() {
                    var t = this,
                        n = l("div", {
                            class: "head"
                        }, [l("p", {
                            class: "title"
                        }, [this.title])]);
                    this.port.appendChild(n);
                    var e = l("div", {
                        class: "inner-container"
                    }, [l("p", {
                        class: "content"
                    }, [this.content])]);
                    e.appendChild(l("div", {
                        class: "buttons"
                    }, [l("button", {
                        class: "cancel",
                        click: function() {
                            t.close(), t.options.onCancel && t.options.onCancel(t)
                        }
                    }, [this.buttonCancel]), l("button", {
                        class: "confirm",
                        click: function() {
                            t.close(), t.options.onConfirm && t.options.onConfirm(t)
                        }
                    }, [this.buttonConfirm])])), this.port.appendChild(n), this.port.appendChild(e)
                }
            }]), e
        }();
    t.Alert = p, t.Prompt = h, t.Confirm = d, t.version = "0.1.0", Object.defineProperty(t, "__esModule", {
        value: !0
    })
});