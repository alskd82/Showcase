! function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(i, r, function(t) {
                return e[t]
            }.bind(null, r));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 10)
}([function(e, t, n) {
    (function(n) {
        var i;

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        /*!
         * howler.js v2.2.0
         * howlerjs.com
         *
         * (c) 2013-2020, James Simpson of GoldFire Studios
         * goldfirestudios.com
         *
         * MIT License
         */
        ! function() {
            "use strict";
            var r = function() {
                this.init()
            };
            r.prototype = {
                init: function() {
                    var e = this || o;
                    return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e
                },
                volume: function(e) {
                    var t = this || o;
                    if (e = parseFloat(e), t.ctx || f(), void 0 !== e && e >= 0 && e <= 1) {
                        if (t._volume = e, t._muted) return t;
                        t.usingWebAudio && t.masterGain.gain.setValueAtTime(e, o.ctx.currentTime);
                        for (var n = 0; n < t._howls.length; n++)
                            if (!t._howls[n]._webAudio)
                                for (var i = t._howls[n]._getSoundIds(), r = 0; r < i.length; r++) {
                                    var a = t._howls[n]._soundById(i[r]);
                                    a && a._node && (a._node.volume = a._volume * e)
                                }
                        return t
                    }
                    return t._volume
                },
                mute: function(e) {
                    var t = this || o;
                    t.ctx || f(), t._muted = e, t.usingWebAudio && t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, o.ctx.currentTime);
                    for (var n = 0; n < t._howls.length; n++)
                        if (!t._howls[n]._webAudio)
                            for (var i = t._howls[n]._getSoundIds(), r = 0; r < i.length; r++) {
                                var a = t._howls[n]._soundById(i[r]);
                                a && a._node && (a._node.muted = !!e || a._muted)
                            }
                    return t
                },
                stop: function() {
                    for (var e = this || o, t = 0; t < e._howls.length; t++) e._howls[t].stop();
                    return e
                },
                unload: function() {
                    for (var e = this || o, t = e._howls.length - 1; t >= 0; t--) e._howls[t].unload();
                    return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), e.ctx = null, f()), e
                },
                codecs: function(e) {
                    return (this || o)._codecs[e.replace(/^x-/, "")]
                },
                _setup: function() {
                    var e = this || o;
                    if (e.state = e.ctx && e.ctx.state || "suspended", e._autoSuspend(), !e.usingWebAudio)
                        if ("undefined" != typeof Audio) try {
                            void 0 === (new Audio).oncanplaythrough && (e._canPlayEvent = "canplay")
                        } catch (t) {
                            e.noAudio = !0
                        } else e.noAudio = !0;
                    try {
                        (new Audio).muted && (e.noAudio = !0)
                    } catch (e) {}
                    return e.noAudio || e._setupCodecs(), e
                },
                _setupCodecs: function() {
                    var e = this || o,
                        t = null;
                    try {
                        t = "undefined" != typeof Audio ? new Audio : null
                    } catch (t) {
                        return e
                    }
                    if (!t || "function" != typeof t.canPlayType) return e;
                    var n = t.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                        i = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
                        r = i && parseInt(i[0].split("/")[1], 10) < 33;
                    return e._codecs = {
                        mp3: !(r || !n && !t.canPlayType("audio/mp3;").replace(/^no$/, "")),
                        mpeg: !!n,
                        opus: !!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!t.canPlayType(' audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!t.canPlayType(' audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!t.canPlayType(' audio/wav; codecs="1"').replace(/^no$/, ""),
                        aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(t.canPlayType("audio/x-m4b;") || t.canPlayType("audio/m4b;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!t.canPlayType(' audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        webm: !!t.canPlayType(' audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        dolby: !!t.canPlayType(' audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")).replace(/^no$/, "")
                    }, e
                },
                _unlockAudio: function() {
                    var e = this || o;
                    if (!e._audioUnlocked && e.ctx) {
                        e._audioUnlocked = !1, e.autoUnlock = !1, e._mobileUnloaded || 44100 === e.ctx.sampleRate || (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
                        var t = function t(n) {
                            for (; e._html5AudioPool.length < e.html5PoolSize;) try {
                                var i = new Audio;
                                i._unlocked = !0, e._releaseHtml5Audio(i)
                            } catch (n) {
                                e.noAudio = !0;
                                break
                            }
                            for (var r = 0; r < e._howls.length; r++)
                                if (!e._howls[r]._webAudio)
                                    for (var o = e._howls[r]._getSoundIds(), a = 0; a < o.length; a++) {
                                        var s = e._howls[r]._soundById(o[a]);
                                        s && s._node && !s._node._unlocked && (s._node._unlocked = !0, s._node.load())
                                    }
                            e._autoResume();
                            var l = e.ctx.createBufferSource();
                            l.buffer = e._scratchBuffer, l.connect(e.ctx.destination), void 0 === l.start ? l.noteOn(0) : l.start(0), "function" == typeof e.ctx.resume && e.ctx.resume(), l.onended = function() {
                                l.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", t, !0), document.removeEventListener("touchend", t, !0), document.removeEventListener("click", t, !0);
                                for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("unlock")
                            }
                        };
                        return document.addEventListener("touchstart", t, !0), document.addEventListener("touchend", t, !0), document.addEventListener("click", t, !0), e
                    }
                },
                _obtainHtml5Audio: function() {
                    var e = this || o;
                    if (e._html5AudioPool.length) return e._html5AudioPool.pop();
                    var t = (new Audio).play();
                    return t && "undefined" != typeof Promise && (t instanceof Promise || "function" == typeof t.then) && t.catch((function() {})), new Audio
                },
                _releaseHtml5Audio: function(e) {
                    var t = this || o;
                    return e._unlocked && t._html5AudioPool.push(e), t
                },
                _autoSuspend: function() {
                    var e = this;
                    if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && o.usingWebAudio) {
                        for (var t = 0; t < e._howls.length; t++)
                            if (e._howls[t]._webAudio)
                                for (var n = 0; n < e._howls[t]._sounds.length; n++)
                                    if (!e._howls[t]._sounds[n]._paused) return e;
                        return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout((function() {
                            if (e.autoSuspend) {
                                e._suspendTimer = null, e.state = "suspending";
                                var t = function() {
                                    e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume())
                                };
                                e.ctx.suspend().then(t, t)
                            }
                        }), 3e4), e
                    }
                },
                _autoResume: function() {
                    var e = this;
                    if (e.ctx && void 0 !== e.ctx.resume && o.usingWebAudio) return "running" === e.state && "interrupted" !== e.ctx.state && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : "suspended" === e.state || "running" === e.state && "interrupted" === e.ctx.state ? (e.ctx.resume().then((function() {
                        e.state = "running";
                        for (var t = 0; t < e._howls.length; t++) e._howls[t]._emit("resume")
                    })), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : "suspending" === e.state && (e._resumeAfterSuspend = !0), e
                }
            };
            var o = new r,
                a = function(e) {
                    e.src && 0 !== e.src.length && this.init(e)
                };
            a.prototype = {
                init: function(e) {
                    var t = this;
                    return o.ctx || f(), t._autoplay = e.autoplay || !1, t._format = "string" != typeof e.format ? e.format : [e.format], t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = "boolean" != typeof e.preload && "metadata" !== e.preload || e.preload, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = "string" != typeof e.src ? e.src : [e.src], t._volume = void 0 !== e.volume ? e.volume : 1, t._xhr = {
                        method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
                        headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
                        withCredentials: !(!e.xhr || !e.xhr.withCredentials) && e.xhr.withCredentials
                    }, t._duration = 0, t._state = "unloaded", t._sounds = [], t._endTimers = {}, t._queue = [], t._playLock = !1, t._onend = e.onend ? [{
                        fn: e.onend
                    }] : [], t._onfade = e.onfade ? [{
                        fn: e.onfade
                    }] : [], t._onload = e.onload ? [{
                        fn: e.onload
                    }] : [], t._onloaderror = e.onloaderror ? [{
                        fn: e.onloaderror
                    }] : [], t._onplayerror = e.onplayerror ? [{
                        fn: e.onplayerror
                    }] : [], t._onpause = e.onpause ? [{
                        fn: e.onpause
                    }] : [], t._onplay = e.onplay ? [{
                        fn: e.onplay
                    }] : [], t._onstop = e.onstop ? [{
                        fn: e.onstop
                    }] : [], t._onmute = e.onmute ? [{
                        fn: e.onmute
                    }] : [], t._onvolume = e.onvolume ? [{
                        fn: e.onvolume
                    }] : [], t._onrate = e.onrate ? [{
                        fn: e.onrate
                    }] : [], t._onseek = e.onseek ? [{
                        fn: e.onseek
                    }] : [], t._onunlock = e.onunlock ? [{
                        fn: e.onunlock
                    }] : [], t._onresume = [], t._webAudio = o.usingWebAudio && !t._html5, void 0 !== o.ctx && o.ctx && o.autoUnlock && o._unlockAudio(), o._howls.push(t), t._autoplay && t._queue.push({
                        event: "play",
                        action: function() {
                            t.play()
                        }
                    }), t._preload && "none" !== t._preload && t.load(), t
                },
                load: function() {
                    var e = null;
                    if (o.noAudio) this._emit("loaderror", null, "No audio support.");
                    else {
                        "string" == typeof this._src && (this._src = [this._src]);
                        for (var t = 0; t < this._src.length; t++) {
                            var n, i;
                            if (this._format && this._format[t]) n = this._format[t];
                            else {
                                if ("string" != typeof(i = this._src[t])) {
                                    this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                    continue
                                }(n = /^data:audio\/([^;,]+);/i.exec(i)) || (n = /\.([^.]+)$/.exec(i.split("?", 1)[0])), n && (n = n[1].toLowerCase())
                            }
                            if (n && o.codecs(n)) {
                                e = this._src[t];
                                break
                            }
                        }
                        if (e) return this._src = e, this._state = "loading", "https:" === window.location.protocol && "http:" === e.slice(0, 5) && (this._html5 = !0, this._webAudio = !1), new s(this), this._webAudio && u(this), this;
                        this._emit("loaderror", null, "No codec support for selected audio sources.")
                    }
                },
                play: function(e, t) {
                    var n = this,
                        i = null;
                    if ("number" == typeof e) i = e, e = null;
                    else {
                        if ("string" == typeof e && "loaded" === n._state && !n._sprite[e]) return null;
                        if (void 0 === e && (e = "__default", !n._playLock)) {
                            for (var r = 0, a = 0; a < n._sounds.length; a++) n._sounds[a]._paused && !n._sounds[a]._ended && (r++, i = n._sounds[a]._id);
                            1 === r ? e = null : i = null
                        }
                    }
                    var s = i ? n._soundById(i) : n._inactiveSound();
                    if (!s) return null;
                    if (i && !e && (e = s._sprite || "__default"), "loaded" !== n._state) {
                        s._sprite = e, s._ended = !1;
                        var l = s._id;
                        return n._queue.push({
                            event: "play",
                            action: function() {
                                n.play(l)
                            }
                        }), l
                    }
                    if (i && !s._paused) return t || n._loadQueue("play"), s._id;
                    n._webAudio && o._autoResume();
                    var u = Math.max(0, s._seek > 0 ? s._seek : n._sprite[e][0] / 1e3),
                        c = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - u),
                        d = 1e3 * c / Math.abs(s._rate),
                        h = n._sprite[e][0] / 1e3,
                        f = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
                    s._sprite = e, s._ended = !1;
                    var p = function() {
                        s._paused = !1, s._seek = u, s._start = h, s._stop = f, s._loop = !(!s._loop && !n._sprite[e][2])
                    };
                    if (!(u >= f)) {
                        var m = s._node;
                        if (n._webAudio) {
                            var g = function() {
                                n._playLock = !1, p(), n._refreshBuffer(s);
                                var e = s._muted || n._muted ? 0 : s._volume;
                                m.gain.setValueAtTime(e, o.ctx.currentTime), s._playStart = o.ctx.currentTime, void 0 === m.bufferSource.start ? s._loop ? m.bufferSource.noteGrainOn(0, u, 86400) : m.bufferSource.noteGrainOn(0, u, c) : s._loop ? m.bufferSource.start(0, u, 86400) : m.bufferSource.start(0, u, c), d !== 1 / 0 && (n._endTimers[s._id] = setTimeout(n._ended.bind(n, s), d)), t || setTimeout((function() {
                                    n._emit("play", s._id), n._loadQueue()
                                }), 0)
                            };
                            "running" === o.state && "interrupted" !== o.ctx.state ? g() : (n._playLock = !0, n.once("resume", g), n._clearTimer(s._id))
                        } else {
                            var v = function() {
                                m.currentTime = u, m.muted = s._muted || n._muted || o._muted || m.muted, m.volume = s._volume * o.volume(), m.playbackRate = s._rate;
                                try {
                                    var i = m.play();
                                    if (i && "undefined" != typeof Promise && (i instanceof Promise || "function" == typeof i.then) ? (n._playLock = !0, p(), i.then((function() {
                                            n._playLock = !1, m._unlocked = !0, t || (n._emit("play", s._id), n._loadQueue())
                                        })).catch((function() {
                                            n._playLock = !1, n._emit("playerror", s._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), s._ended = !0, s._paused = !0
                                        }))) : t || (n._playLock = !1, p(), n._emit("play", s._id), n._loadQueue()), m.playbackRate = s._rate, m.paused) return void n._emit("playerror", s._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                    "__default" !== e || s._loop ? n._endTimers[s._id] = setTimeout(n._ended.bind(n, s), d) : (n._endTimers[s._id] = function() {
                                        n._ended(s), m.removeEventListener("ended", n._endTimers[s._id], !1)
                                    }, m.addEventListener("ended", n._endTimers[s._id], !1))
                                } catch (e) {
                                    n._emit("playerror", s._id, e)
                                }
                            };
                            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === m.src && (m.src = n._src, m.load());
                            var y = window && window.ejecta || !m.readyState && o._navigator.isCocoonJS;
                            if (m.readyState >= 3 || y) v();
                            else {
                                n._playLock = !0;
                                m.addEventListener(o._canPlayEvent, (function e() {
                                    v(), m.removeEventListener(o._canPlayEvent, e, !1)
                                }), !1), n._clearTimer(s._id)
                            }
                        }
                        return s._id
                    }
                    n._ended(s)
                },
                pause: function(e) {
                    var t = this;
                    if ("loaded" !== t._state || t._playLock) return t._queue.push({
                        event: "pause",
                        action: function() {
                            t.pause(e)
                        }
                    }), t;
                    for (var n = t._getSoundIds(e), i = 0; i < n.length; i++) {
                        t._clearTimer(n[i]);
                        var r = t._soundById(n[i]);
                        if (r && !r._paused && (r._seek = t.seek(n[i]), r._rateSeek = 0, r._paused = !0, t._stopFade(n[i]), r._node))
                            if (t._webAudio) {
                                if (!r._node.bufferSource) continue;
                                void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), t._cleanBuffer(r._node)
                            } else isNaN(r._node.duration) && r._node.duration !== 1 / 0 || r._node.pause();
                        arguments[1] || t._emit("pause", r ? r._id : null)
                    }
                    return t
                },
                stop: function(e, t) {
                    var n = this;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "stop",
                        action: function() {
                            n.stop(e)
                        }
                    }), n;
                    for (var i = n._getSoundIds(e), r = 0; r < i.length; r++) {
                        n._clearTimer(i[r]);
                        var o = n._soundById(i[r]);
                        o && (o._seek = o._start || 0, o._rateSeek = 0, o._paused = !0, o._ended = !0, n._stopFade(i[r]), o._node && (n._webAudio ? o._node.bufferSource && (void 0 === o._node.bufferSource.stop ? o._node.bufferSource.noteOff(0) : o._node.bufferSource.stop(0), n._cleanBuffer(o._node)) : isNaN(o._node.duration) && o._node.duration !== 1 / 0 || (o._node.currentTime = o._start || 0, o._node.pause(), o._node.duration === 1 / 0 && n._clearSound(o._node))), t || n._emit("stop", o._id))
                    }
                    return n
                },
                mute: function(e, t) {
                    var n = this;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "mute",
                        action: function() {
                            n.mute(e, t)
                        }
                    }), n;
                    if (void 0 === t) {
                        if ("boolean" != typeof e) return n._muted;
                        n._muted = e
                    }
                    for (var i = n._getSoundIds(t), r = 0; r < i.length; r++) {
                        var a = n._soundById(i[r]);
                        a && (a._muted = e, a._interval && n._stopFade(a._id), n._webAudio && a._node ? a._node.gain.setValueAtTime(e ? 0 : a._volume, o.ctx.currentTime) : a._node && (a._node.muted = !!o._muted || e), n._emit("mute", a._id))
                    }
                    return n
                },
                volume: function() {
                    var e, t, n, i = this,
                        r = arguments;
                    if (0 === r.length) return i._volume;
                    if (1 === r.length || 2 === r.length && void 0 === r[1]) {
                        var a = i._getSoundIds(),
                            s = a.indexOf(r[0]);
                        s >= 0 ? t = parseInt(r[0], 10) : e = parseFloat(r[0])
                    } else r.length >= 2 && (e = parseFloat(r[0]), t = parseInt(r[1], 10));
                    if (!(void 0 !== e && e >= 0 && e <= 1)) return (n = t ? i._soundById(t) : i._sounds[0]) ? n._volume : 0;
                    if ("loaded" !== i._state || i._playLock) return i._queue.push({
                        event: "volume",
                        action: function() {
                            i.volume.apply(i, r)
                        }
                    }), i;
                    void 0 === t && (i._volume = e), t = i._getSoundIds(t);
                    for (var l = 0; l < t.length; l++)(n = i._soundById(t[l])) && (n._volume = e, r[2] || i._stopFade(t[l]), i._webAudio && n._node && !n._muted ? n._node.gain.setValueAtTime(e, o.ctx.currentTime) : n._node && !n._muted && (n._node.volume = e * o.volume()), i._emit("volume", n._id));
                    return i
                },
                fade: function(e, t, n, i) {
                    var r = this;
                    if ("loaded" !== r._state || r._playLock) return r._queue.push({
                        event: "fade",
                        action: function() {
                            r.fade(e, t, n, i)
                        }
                    }), r;
                    e = Math.min(Math.max(0, parseFloat(e)), 1), t = Math.min(Math.max(0, parseFloat(t)), 1), n = parseFloat(n), r.volume(e, i);
                    for (var a = r._getSoundIds(i), s = 0; s < a.length; s++) {
                        var l = r._soundById(a[s]);
                        if (l) {
                            if (i || r._stopFade(a[s]), r._webAudio && !l._muted) {
                                var u = o.ctx.currentTime,
                                    c = u + n / 1e3;
                                l._volume = e, l._node.gain.setValueAtTime(e, u), l._node.gain.linearRampToValueAtTime(t, c)
                            }
                            r._startFadeInterval(l, e, t, n, a[s], void 0 === i)
                        }
                    }
                    return r
                },
                _startFadeInterval: function(e, t, n, i, r, o) {
                    var a = this,
                        s = t,
                        l = n - t,
                        u = Math.abs(l / .01),
                        c = Math.max(4, u > 0 ? i / u : i),
                        d = Date.now();
                    e._fadeTo = n, e._interval = setInterval((function() {
                        var r = (Date.now() - d) / i;
                        d = Date.now(), s += l * r, s = l < 0 ? Math.max(n, s) : Math.min(n, s), s = Math.round(100 * s) / 100, a._webAudio ? e._volume = s : a.volume(s, e._id, !0), o && (a._volume = s), (n < t && s <= n || n > t && s >= n) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, a.volume(n, e._id), a._emit("fade", e._id))
                    }), c)
                },
                _stopFade: function(e) {
                    var t = this._soundById(e);
                    return t && t._interval && (this._webAudio && t._node.gain.cancelScheduledValues(o.ctx.currentTime), clearInterval(t._interval), t._interval = null, this.volume(t._fadeTo, e), t._fadeTo = null, this._emit("fade", e)), this
                },
                loop: function() {
                    var e, t, n, i = this,
                        r = arguments;
                    if (0 === r.length) return i._loop;
                    if (1 === r.length) {
                        if ("boolean" != typeof r[0]) return !!(n = i._soundById(parseInt(r[0], 10))) && n._loop;
                        e = r[0], i._loop = e
                    } else 2 === r.length && (e = r[0], t = parseInt(r[1], 10));
                    for (var o = i._getSoundIds(t), a = 0; a < o.length; a++)(n = i._soundById(o[a])) && (n._loop = e, i._webAudio && n._node && n._node.bufferSource && (n._node.bufferSource.loop = e, e && (n._node.bufferSource.loopStart = n._start || 0, n._node.bufferSource.loopEnd = n._stop)));
                    return i
                },
                rate: function() {
                    var e, t, n, i = this,
                        r = arguments;
                    if (0 === r.length) t = i._sounds[0]._id;
                    else if (1 === r.length) {
                        var a = i._getSoundIds(),
                            s = a.indexOf(r[0]);
                        s >= 0 ? t = parseInt(r[0], 10) : e = parseFloat(r[0])
                    } else 2 === r.length && (e = parseFloat(r[0]), t = parseInt(r[1], 10));
                    if ("number" != typeof e) return (n = i._soundById(t)) ? n._rate : i._rate;
                    if ("loaded" !== i._state || i._playLock) return i._queue.push({
                        event: "rate",
                        action: function() {
                            i.rate.apply(i, r)
                        }
                    }), i;
                    void 0 === t && (i._rate = e), t = i._getSoundIds(t);
                    for (var l = 0; l < t.length; l++)
                        if (n = i._soundById(t[l])) {
                            i.playing(t[l]) && (n._rateSeek = i.seek(t[l]), n._playStart = i._webAudio ? o.ctx.currentTime : n._playStart), n._rate = e, i._webAudio && n._node && n._node.bufferSource ? n._node.bufferSource.playbackRate.setValueAtTime(e, o.ctx.currentTime) : n._node && (n._node.playbackRate = e);
                            var u = i.seek(t[l]),
                                c = (i._sprite[n._sprite][0] + i._sprite[n._sprite][1]) / 1e3 - u,
                                d = 1e3 * c / Math.abs(n._rate);
                            !i._endTimers[t[l]] && n._paused || (i._clearTimer(t[l]), i._endTimers[t[l]] = setTimeout(i._ended.bind(i, n), d)), i._emit("rate", n._id)
                        } return i
                },
                seek: function() {
                    var e, t, n = this,
                        i = arguments;
                    if (0 === i.length) t = n._sounds[0]._id;
                    else if (1 === i.length) {
                        var r = n._getSoundIds(),
                            a = r.indexOf(i[0]);
                        a >= 0 ? t = parseInt(i[0], 10) : n._sounds.length && (t = n._sounds[0]._id, e = parseFloat(i[0]))
                    } else 2 === i.length && (e = parseFloat(i[0]), t = parseInt(i[1], 10));
                    if (void 0 === t) return n;
                    if ("loaded" !== n._state || n._playLock) return n._queue.push({
                        event: "seek",
                        action: function() {
                            n.seek.apply(n, i)
                        }
                    }), n;
                    var s = n._soundById(t);
                    if (s) {
                        if (!("number" == typeof e && e >= 0)) {
                            if (n._webAudio) {
                                var l = n.playing(t) ? o.ctx.currentTime - s._playStart : 0,
                                    u = s._rateSeek ? s._rateSeek - s._seek : 0;
                                return s._seek + (u + l * Math.abs(s._rate))
                            }
                            return s._node.currentTime
                        }
                        var c = n.playing(t);
                        c && n.pause(t, !0), s._seek = e, s._ended = !1, n._clearTimer(t), n._webAudio || !s._node || isNaN(s._node.duration) || (s._node.currentTime = e);
                        var d = function() {
                            n._emit("seek", t), c && n.play(t, !0)
                        };
                        if (c && !n._webAudio) {
                            var h = function e() {
                                n._playLock ? setTimeout(e, 0) : d()
                            };
                            setTimeout(h, 0)
                        } else d()
                    }
                    return n
                },
                playing: function(e) {
                    if ("number" == typeof e) {
                        var t = this._soundById(e);
                        return !!t && !t._paused
                    }
                    for (var n = 0; n < this._sounds.length; n++)
                        if (!this._sounds[n]._paused) return !0;
                    return !1
                },
                duration: function(e) {
                    var t = this._duration,
                        n = this._soundById(e);
                    return n && (t = this._sprite[n._sprite][1] / 1e3), t
                },
                state: function() {
                    return this._state
                },
                unload: function() {
                    for (var e = this, t = e._sounds, n = 0; n < t.length; n++) t[n]._paused || e.stop(t[n]._id), e._webAudio || (e._clearSound(t[n]._node), t[n]._node.removeEventListener("error", t[n]._errorFn, !1), t[n]._node.removeEventListener(o._canPlayEvent, t[n]._loadFn, !1), o._releaseHtml5Audio(t[n]._node)), delete t[n]._node, e._clearTimer(t[n]._id);
                    var i = o._howls.indexOf(e);
                    i >= 0 && o._howls.splice(i, 1);
                    var r = !0;
                    for (n = 0; n < o._howls.length; n++)
                        if (o._howls[n]._src === e._src || e._src.indexOf(o._howls[n]._src) >= 0) {
                            r = !1;
                            break
                        } return l && r && delete l[e._src], o.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null
                },
                on: function(e, t, n, i) {
                    var r = this["_on" + e];
                    return "function" == typeof t && r.push(i ? {
                        id: n,
                        fn: t,
                        once: i
                    } : {
                        id: n,
                        fn: t
                    }), this
                },
                off: function(e, t, n) {
                    var i = this["_on" + e],
                        r = 0;
                    if ("number" == typeof t && (n = t, t = null), t || n)
                        for (r = 0; r < i.length; r++) {
                            var o = n === i[r].id;
                            if (t === i[r].fn && o || !t && o) {
                                i.splice(r, 1);
                                break
                            }
                        } else if (e) this["_on" + e] = [];
                        else {
                            var a = Object.keys(this);
                            for (r = 0; r < a.length; r++) 0 === a[r].indexOf("_on") && Array.isArray(this[a[r]]) && (this[a[r]] = [])
                        } return this
                },
                once: function(e, t, n) {
                    return this.on(e, t, n, 1), this
                },
                _emit: function(e, t, n) {
                    for (var i = this["_on" + e], r = i.length - 1; r >= 0; r--) i[r].id && i[r].id !== t && "load" !== e || (setTimeout(function(e) {
                        e.call(this, t, n)
                    }.bind(this, i[r].fn), 0), i[r].once && this.off(e, i[r].fn, i[r].id));
                    return this._loadQueue(e), this
                },
                _loadQueue: function(e) {
                    if (this._queue.length > 0) {
                        var t = this._queue[0];
                        t.event === e && (this._queue.shift(), this._loadQueue()), e || t.action()
                    }
                    return this
                },
                _ended: function(e) {
                    var t = e._sprite;
                    if (!this._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(this._ended.bind(this, e), 100), this;
                    var n = !(!e._loop && !this._sprite[t][2]);
                    if (this._emit("end", e._id), !this._webAudio && n && this.stop(e._id, !0).play(e._id), this._webAudio && n) {
                        this._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = o.ctx.currentTime;
                        var i = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
                        this._endTimers[e._id] = setTimeout(this._ended.bind(this, e), i)
                    }
                    return this._webAudio && !n && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, this._clearTimer(e._id), this._cleanBuffer(e._node), o._autoSuspend()), this._webAudio || n || this.stop(e._id, !0), this
                },
                _clearTimer: function(e) {
                    if (this._endTimers[e]) {
                        if ("function" != typeof this._endTimers[e]) clearTimeout(this._endTimers[e]);
                        else {
                            var t = this._soundById(e);
                            t && t._node && t._node.removeEventListener("ended", this._endTimers[e], !1)
                        }
                        delete this._endTimers[e]
                    }
                    return this
                },
                _soundById: function(e) {
                    for (var t = 0; t < this._sounds.length; t++)
                        if (e === this._sounds[t]._id) return this._sounds[t];
                    return null
                },
                _inactiveSound: function() {
                    this._drain();
                    for (var e = 0; e < this._sounds.length; e++)
                        if (this._sounds[e]._ended) return this._sounds[e].reset();
                    return new s(this)
                },
                _drain: function() {
                    var e = this._pool,
                        t = 0,
                        n = 0;
                    if (!(this._sounds.length < e)) {
                        for (n = 0; n < this._sounds.length; n++) this._sounds[n]._ended && t++;
                        for (n = this._sounds.length - 1; n >= 0; n--) {
                            if (t <= e) return;
                            this._sounds[n]._ended && (this._webAudio && this._sounds[n]._node && this._sounds[n]._node.disconnect(0), this._sounds.splice(n, 1), t--)
                        }
                    }
                },
                _getSoundIds: function(e) {
                    if (void 0 === e) {
                        for (var t = [], n = 0; n < this._sounds.length; n++) t.push(this._sounds[n]._id);
                        return t
                    }
                    return [e]
                },
                _refreshBuffer: function(e) {
                    return e._node.bufferSource = o.ctx.createBufferSource(), e._node.bufferSource.buffer = l[this._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, o.ctx.currentTime), this
                },
                _cleanBuffer: function(e) {
                    var t = o._navigator && o._navigator.vendor.indexOf("Apple") >= 0;
                    if (o._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), t)) try {
                        e.bufferSource.buffer = o._scratchBuffer
                    } catch (e) {}
                    return e.bufferSource = null, this
                },
                _clearSound: function(e) {
                    /MSIE |Trident\//.test(o._navigator && o._navigator.userAgent) || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
                }
            };
            var s = function(e) {
                this._parent = e, this.init()
            };
            s.prototype = {
                init: function() {
                    var e = this._parent;
                    return this._muted = e._muted, this._loop = e._loop, this._volume = e._volume, this._rate = e._rate, this._seek = 0, this._paused = !0, this._ended = !0, this._sprite = "__default", this._id = ++o._counter, e._sounds.push(this), this.create(), this
                },
                create: function() {
                    var e = this._parent,
                        t = o._muted || this._muted || this._parent._muted ? 0 : this._volume;
                    return e._webAudio ? (this._node = void 0 === o.ctx.createGain ? o.ctx.createGainNode() : o.ctx.createGain(), this._node.gain.setValueAtTime(t, o.ctx.currentTime), this._node.paused = !0, this._node.connect(o.masterGain)) : o.noAudio || (this._node = o._obtainHtml5Audio(), this._errorFn = this._errorListener.bind(this), this._node.addEventListener("error", this._errorFn, !1), this._loadFn = this._loadListener.bind(this), this._node.addEventListener(o._canPlayEvent, this._loadFn, !1), this._node.src = e._src, this._node.preload = !0 === e._preload ? "auto" : e._preload, this._node.volume = t * o.volume(), this._node.load()), this
                },
                reset: function() {
                    var e = this._parent;
                    return this._muted = e._muted, this._loop = e._loop, this._volume = e._volume, this._rate = e._rate, this._seek = 0, this._rateSeek = 0, this._paused = !0, this._ended = !0, this._sprite = "__default", this._id = ++o._counter, this
                },
                _errorListener: function() {
                    this._parent._emit("loaderror", this._id, this._node.error ? this._node.error.code : 0), this._node.removeEventListener("error", this._errorFn, !1)
                },
                _loadListener: function() {
                    var e = this._parent;
                    e._duration = Math.ceil(10 * this._node.duration) / 10, 0 === Object.keys(e._sprite).length && (e._sprite = {
                        __default: [0, 1e3 * e._duration]
                    }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue()), this._node.removeEventListener(o._canPlayEvent, this._loadFn, !1)
                }
            };
            var l = {},
                u = function(e) {
                    var t = e._src;
                    if (l[t]) return e._duration = l[t].duration, void h(e);
                    if (/^data:[^;]+;base64,/.test(t)) {
                        for (var n = atob(t.split(",")[1]), i = new Uint8Array(n.length), r = 0; r < n.length; ++r) i[r] = n.charCodeAt(r);
                        d(i.buffer, e)
                    } else {
                        var o = new XMLHttpRequest;
                        o.open(e._xhr.method, t, !0), o.withCredentials = e._xhr.withCredentials, o.responseType = "arraybuffer", e._xhr.headers && Object.keys(e._xhr.headers).forEach((function(t) {
                            o.setRequestHeader(t, e._xhr.headers[t])
                        })), o.onload = function() {
                            var t = (o.status + "")[0];
                            "0" === t || "2" === t || "3" === t ? d(o.response, e) : e._emit("loaderror", null, "Failed loading audio file with status: " + o.status + ".")
                        }, o.onerror = function() {
                            e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete l[t], e.load())
                        }, c(o)
                    }
                },
                c = function(e) {
                    try {
                        e.send()
                    } catch (t) {
                        e.onerror()
                    }
                },
                d = function(e, t) {
                    var n = function() {
                            t._emit("loaderror", null, "Decoding audio data failed.")
                        },
                        i = function(e) {
                            e && t._sounds.length > 0 ? (l[t._src] = e, h(t, e)) : n()
                        };
                    "undefined" != typeof Promise && 1 === o.ctx.decodeAudioData.length ? o.ctx.decodeAudioData(e).then(i).catch(n) : o.ctx.decodeAudioData(e, i, n)
                },
                h = function(e, t) {
                    t && !e._duration && (e._duration = t.duration), 0 === Object.keys(e._sprite).length && (e._sprite = {
                        __default: [0, 1e3 * e._duration]
                    }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue())
                },
                f = function() {
                    if (o.usingWebAudio) {
                        try {
                            "undefined" != typeof AudioContext ? o.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? o.ctx = new webkitAudioContext : o.usingWebAudio = !1
                        } catch (e) {
                            o.usingWebAudio = !1
                        }
                        o.ctx || (o.usingWebAudio = !1);
                        var e = /iP(hone|od|ad)/.test(o._navigator && o._navigator.platform),
                            t = o._navigator && o._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                            n = t ? parseInt(t[1], 10) : null;
                        if (e && n && n < 9) {
                            var i = /safari/.test(o._navigator && o._navigator.userAgent.toLowerCase());
                            o._navigator && !i && (o.usingWebAudio = !1)
                        }
                        o.usingWebAudio && (o.masterGain = void 0 === o.ctx.createGain ? o.ctx.createGainNode() : o.ctx.createGain(), o.masterGain.gain.setValueAtTime(o._muted ? 0 : o._volume, o.ctx.currentTime), o.masterGain.connect(o.ctx.destination)), o._setup()
                    }
                };
            void 0 === (i = function() {
                return {
                    Howler: o,
                    Howl: a
                }
            }.apply(t, [])) || (e.exports = i), t.Howler = o, t.Howl = a, void 0 !== n ? (n.HowlerGlobal = r, n.Howler = o, n.Howl = a, n.Sound = s) : "undefined" != typeof window && (window.HowlerGlobal = r, window.Howler = o, window.Howl = a, window.Sound = s)
        }(),
        /*!
         *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
         *  
         *  howler.js v2.2.0
         *  howlerjs.com
         *
         *  (c) 2013-2020, James Simpson of GoldFire Studios
         *  goldfirestudios.com
         *
         *  MIT License
         */
        function() {
            "use strict";
            var e;
            HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(e) {
                if (!this.ctx || !this.ctx.listener) return this;
                for (var t = this._howls.length - 1; t >= 0; t--) this._howls[t].stereo(e);
                return this
            }, HowlerGlobal.prototype.pos = function(e, t, n) {
                return this.ctx && this.ctx.listener ? (t = "number" != typeof t ? this._pos[1] : t, n = "number" != typeof n ? this._pos[2] : n, "number" != typeof e ? this._pos : (this._pos = [e, t, n], void 0 !== this.ctx.listener.positionX ? (this.ctx.listener.positionX.setTargetAtTime(this._pos[0], Howler.ctx.currentTime, .1), this.ctx.listener.positionY.setTargetAtTime(this._pos[1], Howler.ctx.currentTime, .1), this.ctx.listener.positionZ.setTargetAtTime(this._pos[2], Howler.ctx.currentTime, .1)) : this.ctx.listener.setPosition(this._pos[0], this._pos[1], this._pos[2]), this)) : this
            }, HowlerGlobal.prototype.orientation = function(e, t, n, i, r, o) {
                if (!this.ctx || !this.ctx.listener) return this;
                var a = this._orientation;
                return t = "number" != typeof t ? a[1] : t, n = "number" != typeof n ? a[2] : n, i = "number" != typeof i ? a[3] : i, r = "number" != typeof r ? a[4] : r, o = "number" != typeof o ? a[5] : o, "number" != typeof e ? a : (this._orientation = [e, t, n, i, r, o], void 0 !== this.ctx.listener.forwardX ? (this.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1), this.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, .1), this.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1), this.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, .1), this.ctx.listener.upY.setTargetAtTime(r, Howler.ctx.currentTime, .1), this.ctx.listener.upZ.setTargetAtTime(o, Howler.ctx.currentTime, .1)) : this.ctx.listener.setOrientation(e, t, n, i, r, o), this)
            }, Howl.prototype.init = (e = Howl.prototype.init, function(t) {
                return this._orientation = t.orientation || [1, 0, 0], this._stereo = t.stereo || null, this._pos = t.pos || null, this._pannerAttr = {
                    coneInnerAngle: void 0 !== t.coneInnerAngle ? t.coneInnerAngle : 360,
                    coneOuterAngle: void 0 !== t.coneOuterAngle ? t.coneOuterAngle : 360,
                    coneOuterGain: void 0 !== t.coneOuterGain ? t.coneOuterGain : 0,
                    distanceModel: void 0 !== t.distanceModel ? t.distanceModel : "inverse",
                    maxDistance: void 0 !== t.maxDistance ? t.maxDistance : 1e4,
                    panningModel: void 0 !== t.panningModel ? t.panningModel : "HRTF",
                    refDistance: void 0 !== t.refDistance ? t.refDistance : 1,
                    rolloffFactor: void 0 !== t.rolloffFactor ? t.rolloffFactor : 1
                }, this._onstereo = t.onstereo ? [{
                    fn: t.onstereo
                }] : [], this._onpos = t.onpos ? [{
                    fn: t.onpos
                }] : [], this._onorientation = t.onorientation ? [{
                    fn: t.onorientation
                }] : [], e.call(this, t)
            }), Howl.prototype.stereo = function(e, n) {
                var i = this;
                if (!i._webAudio) return i;
                if ("loaded" !== i._state) return i._queue.push({
                    event: "stereo",
                    action: function() {
                        i.stereo(e, n)
                    }
                }), i;
                var r = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
                if (void 0 === n) {
                    if ("number" != typeof e) return i._stereo;
                    i._stereo = e, i._pos = [e, 0, 0]
                }
                for (var o = i._getSoundIds(n), a = 0; a < o.length; a++) {
                    var s = i._soundById(o[a]);
                    if (s) {
                        if ("number" != typeof e) return s._stereo;
                        s._stereo = e, s._pos = [e, 0, 0], s._node && (s._pannerAttr.panningModel = "equalpower", s._panner && s._panner.pan || t(s, r), "spatial" === r ? void 0 !== s._panner.positionX ? (s._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), s._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), s._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : s._panner.setPosition(e, 0, 0) : s._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)), i._emit("stereo", s._id)
                    }
                }
                return i
            }, Howl.prototype.pos = function(e, n, i, r) {
                var o = this;
                if (!o._webAudio) return o;
                if ("loaded" !== o._state) return o._queue.push({
                    event: "pos",
                    action: function() {
                        o.pos(e, n, i, r)
                    }
                }), o;
                if (n = "number" != typeof n ? 0 : n, i = "number" != typeof i ? -.5 : i, void 0 === r) {
                    if ("number" != typeof e) return o._pos;
                    o._pos = [e, n, i]
                }
                for (var a = o._getSoundIds(r), s = 0; s < a.length; s++) {
                    var l = o._soundById(a[s]);
                    if (l) {
                        if ("number" != typeof e) return l._pos;
                        l._pos = [e, n, i], l._node && (l._panner && !l._panner.pan || t(l, "spatial"), void 0 !== l._panner.positionX ? (l._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), l._panner.positionY.setValueAtTime(n, Howler.ctx.currentTime), l._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : l._panner.setPosition(e, n, i)), o._emit("pos", l._id)
                    }
                }
                return o
            }, Howl.prototype.orientation = function(e, n, i, r) {
                var o = this;
                if (!o._webAudio) return o;
                if ("loaded" !== o._state) return o._queue.push({
                    event: "orientation",
                    action: function() {
                        o.orientation(e, n, i, r)
                    }
                }), o;
                if (n = "number" != typeof n ? o._orientation[1] : n, i = "number" != typeof i ? o._orientation[2] : i, void 0 === r) {
                    if ("number" != typeof e) return o._orientation;
                    o._orientation = [e, n, i]
                }
                for (var a = o._getSoundIds(r), s = 0; s < a.length; s++) {
                    var l = o._soundById(a[s]);
                    if (l) {
                        if ("number" != typeof e) return l._orientation;
                        l._orientation = [e, n, i], l._node && (l._panner || (l._pos || (l._pos = o._pos || [0, 0, -.5]), t(l, "spatial")), void 0 !== l._panner.orientationX ? (l._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), l._panner.orientationY.setValueAtTime(n, Howler.ctx.currentTime), l._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : l._panner.setOrientation(e, n, i)), o._emit("orientation", l._id)
                    }
                }
                return o
            }, Howl.prototype.pannerAttr = function() {
                var e, n, i, o = this,
                    a = arguments;
                if (!o._webAudio) return o;
                if (0 === a.length) return o._pannerAttr;
                if (1 === a.length) {
                    if ("object" !== r(a[0])) return (i = o._soundById(parseInt(a[0], 10))) ? i._pannerAttr : o._pannerAttr;
                    e = a[0], void 0 === n && (e.pannerAttr || (e.pannerAttr = {
                        coneInnerAngle: e.coneInnerAngle,
                        coneOuterAngle: e.coneOuterAngle,
                        coneOuterGain: e.coneOuterGain,
                        distanceModel: e.distanceModel,
                        maxDistance: e.maxDistance,
                        refDistance: e.refDistance,
                        rolloffFactor: e.rolloffFactor,
                        panningModel: e.panningModel
                    }), o._pannerAttr = {
                        coneInnerAngle: void 0 !== e.pannerAttr.coneInnerAngle ? e.pannerAttr.coneInnerAngle : o._coneInnerAngle,
                        coneOuterAngle: void 0 !== e.pannerAttr.coneOuterAngle ? e.pannerAttr.coneOuterAngle : o._coneOuterAngle,
                        coneOuterGain: void 0 !== e.pannerAttr.coneOuterGain ? e.pannerAttr.coneOuterGain : o._coneOuterGain,
                        distanceModel: void 0 !== e.pannerAttr.distanceModel ? e.pannerAttr.distanceModel : o._distanceModel,
                        maxDistance: void 0 !== e.pannerAttr.maxDistance ? e.pannerAttr.maxDistance : o._maxDistance,
                        refDistance: void 0 !== e.pannerAttr.refDistance ? e.pannerAttr.refDistance : o._refDistance,
                        rolloffFactor: void 0 !== e.pannerAttr.rolloffFactor ? e.pannerAttr.rolloffFactor : o._rolloffFactor,
                        panningModel: void 0 !== e.pannerAttr.panningModel ? e.pannerAttr.panningModel : o._panningModel
                    })
                } else 2 === a.length && (e = a[0], n = parseInt(a[1], 10));
                for (var s = o._getSoundIds(n), l = 0; l < s.length; l++)
                    if (i = o._soundById(s[l])) {
                        var u = i._pannerAttr;
                        u = {
                            coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : u.coneInnerAngle,
                            coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : u.coneOuterAngle,
                            coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : u.coneOuterGain,
                            distanceModel: void 0 !== e.distanceModel ? e.distanceModel : u.distanceModel,
                            maxDistance: void 0 !== e.maxDistance ? e.maxDistance : u.maxDistance,
                            refDistance: void 0 !== e.refDistance ? e.refDistance : u.refDistance,
                            rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : u.rolloffFactor,
                            panningModel: void 0 !== e.panningModel ? e.panningModel : u.panningModel
                        };
                        var c = i._panner;
                        c ? (c.coneInnerAngle = u.coneInnerAngle, c.coneOuterAngle = u.coneOuterAngle, c.coneOuterGain = u.coneOuterGain, c.distanceModel = u.distanceModel, c.maxDistance = u.maxDistance, c.refDistance = u.refDistance, c.rolloffFactor = u.rolloffFactor, c.panningModel = u.panningModel) : (i._pos || (i._pos = o._pos || [0, 0, -.5]), t(i, "spatial"))
                    } return o
            }, Sound.prototype.init = function(e) {
                return function() {
                    var t = this._parent;
                    this._orientation = t._orientation, this._stereo = t._stereo, this._pos = t._pos, this._pannerAttr = t._pannerAttr, e.call(this), this._stereo ? t.stereo(this._stereo) : this._pos && t.pos(this._pos[0], this._pos[1], this._pos[2], this._id)
                }
            }(Sound.prototype.init), Sound.prototype.reset = function(e) {
                return function() {
                    var t = this._parent;
                    return this._orientation = t._orientation, this._stereo = t._stereo, this._pos = t._pos, this._pannerAttr = t._pannerAttr, this._stereo ? t.stereo(this._stereo) : this._pos ? t.pos(this._pos[0], this._pos[1], this._pos[2], this._id) : this._panner && (this._panner.disconnect(0), this._panner = void 0, t._refreshBuffer(this)), e.call(this)
                }
            }(Sound.prototype.reset);
            var t = function(e, t) {
                "spatial" === (t = t || "spatial") ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, void 0 !== e._panner.positionX ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)) : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]), void 0 !== e._panner.orientationX ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime)) : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0)
            }
        }()
    }).call(this, n(11))
}, function(e, t, n) {
    "use strict";
    var i, r = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        o = function(e, t) {
            if (e) {
                "undefined" != typeof window && function() {
                    function e(e, t) {
                        t = t || {
                            bubbles: !1,
                            cancelable: !1,
                            detail: void 0
                        };
                        var n = document.createEvent("CustomEvent");
                        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
                    }
                    "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e)
                }(), t || (t = {}), t = r({}, {
                    minHorizontal: 10,
                    minVertical: 10,
                    deltaHorizontal: 3,
                    deltaVertical: 5,
                    preventScroll: !1,
                    lockAxis: !0,
                    touch: !0,
                    mouse: !0
                }, t);
                var n = [],
                    i = !1,
                    o = function() {
                        i = !0
                    },
                    a = function(e) {
                        i = !1, l(e)
                    },
                    s = function(e) {
                        i && (e.changedTouches = [{
                            clientX: e.clientX,
                            clientY: e.clientY
                        }], u(e))
                    };
                t.mouse && (e.addEventListener("mousedown", o), e.addEventListener("mouseup", a), e.addEventListener("mousemove", s));
                var l = function(i) {
                        var o = Math.abs,
                            a = Math.max,
                            s = Math.min;
                        if (n.length) {
                            for (var l = "function" == typeof TouchEvent && i instanceof TouchEvent, u = [], c = [], d = {
                                    top: !1,
                                    right: !1,
                                    bottom: !1,
                                    left: !1
                                }, h = 0; h < n.length; h++) u.push(n[h].x), c.push(n[h].y);
                            var f = u[0],
                                p = u[u.length - 1],
                                m = c[0],
                                g = c[c.length - 1],
                                v = {
                                    x: [f, p],
                                    y: [m, g]
                                };
                            if (1 < n.length) {
                                var y = {
                                        detail: r({
                                            touch: l,
                                            target: i.target
                                        }, v)
                                    },
                                    b = new CustomEvent("swiperelease", y);
                                e.dispatchEvent(b)
                            }
                            var _ = u[0] - u[u.length - 1],
                                w = "none";
                            w = 0 < _ ? "left" : "right";
                            var T = s.apply(Math, u),
                                k = a.apply(Math, u);
                            if (o(_) >= t.minHorizontal && ("left" == w ? o(T - u[u.length - 1]) <= t.deltaHorizontal && (d.left = !0) : "right" == w && (o(k - u[u.length - 1]) <= t.deltaHorizontal && (d.right = !0))), w = "none", w = 0 < (_ = c[0] - c[c.length - 1]) ? "top" : "bottom", T = s.apply(Math, c), k = a.apply(Math, c), o(_) >= t.minVertical && ("top" == w ? o(T - c[c.length - 1]) <= t.deltaVertical && (d.top = !0) : "bottom" == w && (o(k - c[c.length - 1]) <= t.deltaVertical && (d.bottom = !0))), n = [], d.top || d.right || d.bottom || d.left) {
                                t.lockAxis && ((d.left || d.right) && o(f - p) > o(m - g) ? d.top = d.bottom = !1 : (d.top || d.bottom) && o(f - p) < o(m - g) && (d.left = d.right = !1));
                                var x = {
                                        detail: r({
                                            directions: d,
                                            touch: l,
                                            target: i.target
                                        }, v)
                                    },
                                    A = new CustomEvent("swipe", x);
                                e.dispatchEvent(A)
                            } else {
                                var S = new CustomEvent("swipecancel", {
                                    detail: r({
                                        touch: l,
                                        target: i.target
                                    }, v)
                                });
                                e.dispatchEvent(S)
                            }
                        }
                    },
                    u = function(i) {
                        t.preventScroll && i.preventDefault();
                        var r = i.changedTouches[0];
                        if (n.push({
                                x: r.clientX,
                                y: r.clientY
                            }), 1 < n.length) {
                            var o = n[0].x,
                                a = n[n.length - 1].x,
                                s = n[0].y,
                                l = n[n.length - 1].y,
                                u = {
                                    detail: {
                                        x: [o, a],
                                        y: [s, l],
                                        touch: "function" == typeof TouchEvent && i instanceof TouchEvent,
                                        target: i.target
                                    }
                                },
                                c = new CustomEvent("swiping", u);
                            e.dispatchEvent(c)
                        }
                    },
                    c = !1;
                try {
                    var d = Object.defineProperty({}, "passive", {
                        get: function() {
                            c = {
                                passive: !t.preventScroll
                            }
                        }
                    });
                    window.addEventListener("testPassive", null, d), window.removeEventListener("testPassive", null, d)
                } catch (e) {}
                return t.touch && (e.addEventListener("touchmove", u, c), e.addEventListener("touchend", l)), {
                    off: function() {
                        e.removeEventListener("touchmove", u, c), e.removeEventListener("touchend", l), e.removeEventListener("mousedown", o), e.removeEventListener("mouseup", a), e.removeEventListener("mousemove", s)
                    }
                }
            }
        };
    void 0 !== e.exports ? (e.exports = o, e.exports.default = o) : void 0 === (i = function() {
        return o
    }.apply(t, [])) || (e.exports = i)
}, , , , , , , , , function(e, t, n) {
    e.exports = n(12)
}, function(e, t) {
    function n(e) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || new Function("return this")()
    } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : n(window)) && (i = window)
    }
    e.exports = i
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var i = {};
    n.r(i), n.d(i, "reset", (function() {
        return cr
    })), n.d(i, "stop", (function() {
        return dr
    })), n.d(i, "start", (function() {
        return hr
    })), n.d(i, "first", (function() {
        return pr
    })), n.d(i, "final", (function() {
        return mr
    }));
    var r = {};
    n.r(r), n.d(r, "reset", (function() {
        return Zv
    })), n.d(r, "stop", (function() {
        return Jv
    })), n.d(r, "start", (function() {
        return ey
    })), n.d(r, "first", (function() {
        return ty
    })), n.d(r, "final", (function() {
        return ny
    }));
    var o = {};
    n.r(o), n.d(o, "reset", (function() {
        return ry
    })), n.d(o, "stop", (function() {
        return oy
    })), n.d(o, "start", (function() {
        return ay
    })), n.d(o, "first", (function() {
        return sy
    })), n.d(o, "final", (function() {
        return ly
    }));
    var a = {};
    n.r(a), n.d(a, "reset", (function() {
        return cy
    })), n.d(a, "stop", (function() {
        return dy
    })), n.d(a, "start", (function() {
        return hy
    })), n.d(a, "first", (function() {
        return by
    })), n.d(a, "final", (function() {
        return _y
    }));
    var s = {};
    n.r(s), n.d(s, "reset", (function() {
        return Ty
    })), n.d(s, "stop", (function() {
        return ky
    })), n.d(s, "start", (function() {
        return xy
    })), n.d(s, "first", (function() {
        return Cy
    })), n.d(s, "final", (function() {
        return Py
    }));
    var l = {};
    n.r(l), n.d(l, "reset", (function() {
        return Iy
    })), n.d(l, "stop", (function() {
        return My
    })), n.d(l, "start", (function() {
        return Ly
    })), n.d(l, "first", (function() {
        return Ry
    })), n.d(l, "final", (function() {
        return Ny
    }));
    var u = {};

    function c(e) {
        return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function d(e) {
        if (void 0 === e) throw new ReferenceError("this hasn' t been initialised - super() hasn't been called");
        return e
    }

    function h(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    } /*! * GSAP 3.4.2 * https://greensock.com * * @license Copyright 2008-2020, GreenSock. All rights reserved. * Subject to the terms at https://greensock.com/standard-license or for * Club GreenSock members, the agreement issued with that membership. * @author: Jack Doyle, jack@greensock.com */
    n.r(u), n.d(u, "reset", (function() {
        return $y
    })), n.d(u, "stop", (function() {
        return Dy
    })), n.d(u, "start", (function() {
        return Fy
    })), n.d(u, "first", (function() {
        return By
    })), n.d(u, "final", (function() {
        return zy
    }));
    var f, p, m, g, v, y, b, _, w, T, k, x, A, S, E, O, C, P, I, M, L, R, N, j, D, F = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        H = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        U = 1e8,
        q = 2 * Math.PI,
        B = q / 4,
        z = 0,
        V = Math.sqrt,
        W = Math.cos,
        G = Math.sin,
        X = function(e) {
            return "string" == typeof e
        },
        Y = function(e) {
            return "function" == typeof e
        },
        Q = function(e) {
            return "number" == typeof e
        },
        K = function(e) {
            return void 0 === e
        },
        Z = function(e) {
            return "object" === c(e)
        },
        J = function(e) {
            return !1 !== e
        },
        ee = function() {
            return "undefined" != typeof window
        },
        te = function(e) {
            return Y(e) || X(e)
        },
        ne = Array.isArray,
        ie = /(?:-?\.?\d|\.)+/gi,
        re = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
        oe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        ae = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
        se = /\(([^()]+)\)/i,
        le = /[+-]=-?[\.\d]+/,
        ue = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
        ce = {},
        de = {},
        he = function(e) {
            return (de = $e(e, ce)) && _n
        },
        fe = function(e, t) {
            return !t && void 0
        },
        pe = function(e, t) {
            return e && (ce[e] = t) && de && (de[e] = t) || ce
        },
        me = function() {
            return 0
        },
        ge = {},
        ve = [],
        ye = {},
        be = {},
        _e = {},
        we = 30,
        Te = [],
        ke = "",
        xe = function(e) {
            var t, n, i = e[0];
            if (Z(i) || Y(i) || (e = [e]), !(t = (i._gsap || {}).harness)) {
                for (n = Te.length; n-- && !Te[n].targetTest(i););
                t = Te[n]
            }
            for (n = e.length; n--;) e[n] && (e[n]._gsap || (e[n]._gsap = new zt(e[n], t))) || e.splice(n, 1);
            return e
        },
        Ae = function(e) {
            return e._gsap || xe(ct(e))[0]._gsap
        },
        Se = function(e, t) {
            var n = e[t];
            return Y(n) ? e[t]() : K(n) && e.getAttribute(t) || n
        },
        Ee = function(e, t) {
            return (e = e.split(",")).forEach(t) || e
        },
        Oe = function(e) {
            return Math.round(1e5 * e) / 1e5 || 0
        },
        Ce = function(e, t) {
            for (var n = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < n;);
            return i < n
        },
        Pe = function(e, t, n) {
            var i, r = Q(e[1]),
                o = (r ? 2 : 1) + (t < 2 ? 0 : 1),
                a = e[o];
            if (r && (a.duration = e[1]), a.parent = n, t) {
                for (i = a; n && !("immediateRender" in i);) i = n.vars.defaults || {}, n = J(n.vars.inherit) && n.parent;
                a.immediateRender = J(i.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[o - 1]
            }
            return a
        },
        Ie = function() {
            var e, t, n = ve.length,
                i = ve.slice(0);
            for (ye = {}, ve.length = 0, e = 0; e < n; e++)(t = i[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0)
        },
        Me = function(e, t, n, i) {
            ve.length && Ie(), e.render(t, n, i), ve.length && Ie()
        },
        Le = function(e) {
            var t = parseFloat(e);
            return (t || 0 === t) && (e + "").match(ue).length < 2 ? t : e
        },
        Re = function(e) {
            return e
        },
        Ne = function(e, t) {
            for (var n in t) n in e || (e[n] = t[n]);
            return e
        },
        je = function(e, t) {
            for (var n in t) n in e || "duration" === n || "ease" === n || (e[n] = t[n])
        },
        $e = function(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        },
        De = function e(t, n) {
            for (var i in n) t[i] = Z(n[i]) ? e(t[i] || (t[i] = {}), n[i]) : n[i];
            return t
        },
        Fe = function(e, t) {
            var n, i = {};
            for (n in e) n in t || (i[n] = e[n]);
            return i
        },
        He = function(e) {
            var t = e.parent || f,
                n = e.keyframes ? je : Ne;
            if (J(e.inherit))
                for (; t;) n(e, t.vars.defaults), t = t.parent || t._dp;
            return e
        },
        Ue = function(e, t, n, i) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var r = t._prev,
                o = t._next;
            r ? r._next = o : e[n] === t && (e[n] = o), o ? o._prev = r : e[i] === t && (e[i] = r), t._next = t._prev = t.parent = null
        },
        qe = function(e, t) {
            e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e), e._act = 0
        },
        Be = function(e) {
            for (var t = e; t;) t._dirty = 1, t = t.parent;
            return e
        },
        ze = function(e) {
            for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
            return e
        },
        Ve = function(e) {
            return e._repeat ? We(e._tTime, e = e.duration() + e._rDelay) * e : 0
        },
        We = function(e, t) {
            return (e /= t) && ~~e === e ? ~~e - 1 : ~~e
        },
        Ge = function(e, t) {
            return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
        },
        Xe = function(e) {
            return e._end = Oe(e._start + (e._tDur / Math.abs(e._ts || e._rts || 1e-8) || 0))
        },
        Ye = function(e, t) {
            var n = e._dp;
            return n && n.smoothChildTiming && e._ts && (e._start = Oe(e._dp._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Xe(e), n._dirty || Be(n)), e
        },
        Qe = function(e, t) {
            var n;
            if ((t._time || t._initted && !t._dur) && (n = Ge(e.rawTime(), t), (!t._dur || ot(0, t.totalDuration(), n) - t._tTime > 1e-8) && t.render(n, !0)), Be(e)._dp && e._initted && e._time >= e._dur && e._ts) {
                if (e._dur < e.duration())
                    for (n = e; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
                e._zTime = -1e-8
            }
        },
        Ke = function(e, t, n, i) {
            return t.parent && qe(t), t._start = Oe(n + t._delay), t._end = Oe(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
                function(e, t, n, i, r) {
                    void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
                    var o, a = e[i];
                    if (r)
                        for (o = t[r]; a && a[r] > o;) a = a._prev;
                    a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = a, t.parent = t._dp = e
                }(e, t, "_first", "_last", e._sort ? "_start" : 0), e._recent = t, i || Qe(e, t), e
        },
        Ze = function(e, t) {
            return ce.ScrollTrigger ? ce.ScrollTrigger.create(t, e) : void 0
        },
        Je = function(e, t, n, i) {
            return Kt(e, t), e._initted ? !n && e._pt && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && y !== It.frame ? (ve.push(e), e._lazy = [t, i], 1) : void 0 : 1
        },
        et = function(e, t, n) {
            var i = e._repeat,
                r = Oe(t) || 0;
            return e._dur = r, e._tDur = i ? i < 0 ? 1e10 : Oe(r * (i + 1) + e._rDelay * i) : r, e._time > r && (e._time = r, e._tTime = Math.min(e._tTime, e._tDur)), !n && Be(e.parent), e.parent && Xe(e), e
        },
        tt = function(e) {
            return e instanceof Wt ? Be(e) : et(e, e._dur)
        },
        nt = {
            _start: 0,
            endTime: me
        },
        it = function e(t, n) {
            var i, r, o = t.labels,
                a = t._recent || nt,
                s = t.duration() >= U ? a.endTime(!1) : t._dur;
            return X(n) && (isNaN(n) || n in o) ? "<" === (i = n.charAt(0)) || ">" === i ? ("<" === i ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) : (i = n.indexOf("=")) < 0 ? (n in o || (o[n] = s), o[n]) : (r = +(n.charAt(i - 1) + n.substr(i + 1)), i > 1 ? e(t, n.substr(0, i - 1)) + r : s + r) : null == n ? s : +n
        },
        rt = function(e, t) {
            return e || 0 === e ? t(e) : t
        },
        ot = function(e, t, n) {
            return n < e ? e : n > t ? t : n
        },
        at = function(e) {
            return (e + "").substr((parseFloat(e) + "").length)
        },
        st = [].slice,
        lt = function(e, t) {
            return e && Z(e) && "length" in e && (!t && !e.length || e.length - 1 in e && Z(e[0])) && !e.nodeType && e !== p
        },
        ut = function(e, t, n) {
            return void 0 === n && (n = []), e.forEach((function(e) {
                var i;
                return X(e) && !t || lt(e, 1) ? (i = n).push.apply(i, ct(e)) : n.push(e)
            })) || n
        },
        ct = function(e, t) {
            return !X(e) || t || !m && Mt() ? ne(e) ? ut(e, t) : lt(e) ? st.call(e, 0) : e ? [e] : [] : st.call(g.querySelectorAll(e), 0)
        },
        dt = function(e) {
            return e.sort((function() {
                return .5 - Math.random()
            }))
        },
        ht = function(e) {
            if (Y(e)) return e;
            var t = Z(e) ? e : {
                    each: e
                },
                n = Ft(t.ease),
                i = t.from || 0,
                r = parseFloat(t.base) || 0,
                o = {},
                a = i > 0 && i < 1,
                s = isNaN(i) || a,
                l = t.axis,
                u = i,
                c = i;
            return X(i) ? u = c = {
                    center: .5,
                    edges: .5,
                    end: 1
                } [i] || 0 : !a && s && (u = i[0], c = i[1]),
                function(e, a, d) {
                    var h, f, p, m, g, v, y, b, _, w = (d || t).length,
                        T = o[w];
                    if (!T) {
                        if (!(_ = "auto" === t.grid ? 0 : (t.grid || [1, U])[1])) {
                            for (y = -U; y < (y = d[_++].getBoundingClientRect().left) && _ < w;);
                            _--
                        }
                        for (T = o[w] = [], h = s ? Math.min(_, w) * u - .5 : i % _, f = s ? w * c / _ - .5 : i / _ | 0, y = 0, b = U, v = 0; v < w; v++) p = v % _ - h, m = f - (v / _ | 0), T[v] = g = l ? Math.abs("y" === l ? m : p) : V(p * p + m * m), g > y && (y = g), g < b && (b = g);
                        "random" === i && dt(T), T.max = y - b, T.min = b, T.v = w = (parseFloat(t.amount) || parseFloat(t.each) * (_ > w ? w - 1 : l ? "y" === l ? w / _ : _ : Math.max(_, w / _)) || 0) * ("edges" === i ? -1 : 1), T.b = w < 0 ? r - w : r, T.u = at(t.amount || t.each) || 0, n = n && w < 0 ? $t(n) : n
                    }
                    return w = (T[e] - T.min) / T.max || 0, Oe(T.b + (n ? n(w) : w) * T.v) + T.u
                }
        },
        ft = function(e) {
            var t = e < 1 ? Math.pow(10, (e + "").length - 2) : 1;
            return function(n) {
                return Math.floor(Math.round(parseFloat(n) / e) * e * t) / t + (Q(n) ? 0 : at(n))
            }
        },
        pt = function(e, t) {
            var n, i, r = ne(e);
            return !r && Z(e) && (n = r = e.radius || U, e.values ? (e = ct(e.values), (i = !Q(e[0])) && (n *= n)) : e = ft(e.increment)), rt(t, r ? Y(e) ? function(t) {
                return i = e(t), Math.abs(i - t) <= n ? i : t
            } : function(t) {
                for (var r, o, a = parseFloat(i ? t.x : t), s = parseFloat(i ? t.y : 0), l = U, u = 0, c = e.length; c--;)(r = i ? (r = e[c].x - a) * r + (o = e[c].y - s) * o : Math.abs(e[c] - a)) < l && (l = r, u = c);
                return u = !n || l <= n ? e[u] : t, i || u === t || Q(t) ? u : u + at(t)
            } : ft(e))
        },
        mt = function(e, t, n, i) {
            return rt(ne(e) ? !t : !0 === n ? !!(n = 0) : !i, (function() {
                return ne(e) ? e[~~(Math.random() * e.length)] : (n = n || 1e-5) && (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((e + Math.random() * (t - e)) / n) * n * i) / i
            }))
        },
        gt = function(e, t, n) {
            return rt(n, (function(n) {
                return e[~~t(n)]
            }))
        },
        vt = function(e) {
            for (var t, n, i, r, o = 0, a = ""; ~(t = e.indexOf("random(", o));) i = e.indexOf(")", t), r = "[" === e.charAt(t + 7), n = e.substr(t + 7, i - t - 7).match(r ? ue : ie), a += e.substr(o, t - o) + mt(r ? n : +n[0], +n[1], +n[2] || 1e-5), o = i + 1;
            return a + e.substr(o, e.length - o)
        },
        yt = function(e, t, n, i, r) {
            var o = t - e,
                a = i - n;
            return rt(r, (function(t) {
                return n + ((t - e) / o * a || 0)
            }))
        },
        bt = function(e, t, n) {
            var i, r, o, a = e.labels,
                s = U;
            for (i in a)(r = a[i] - t) < 0 == !!n && r && s > (r = Math.abs(r)) && (o = i, s = r);
            return o
        },
        _t = function(e, t, n) {
            var i, r, o = e.vars,
                a = o[t];
            if (a) return i = o[t + "Params"], r = o.callbackScope || e, n && ve.length && Ie(), i ? a.apply(r, i) : a.call(r)
        },
        wt = function(e) {
            return qe(e), e.progress() < 1 && _t(e, "onInterrupt"), e
        },
        Tt = function(e) {
            var t = (e = !e.name && e.default || e).name,
                n = Y(e),
                i = t && !n && e.init ? function() {
                    this._props = []
                } : e,
                r = {
                    init: me,
                    render: dn,
                    add: Yt,
                    kill: fn,
                    modifier: hn,
                    rawVars: 0
                },
                o = {
                    targetTest: 0,
                    get: 0,
                    getSetter: sn,
                    aliases: {},
                    register: 0
                };
            if (Mt(), e !== i) {
                if (be[t]) return;
                Ne(i, Ne(Fe(e, r), o)), $e(i.prototype, $e(r, Fe(e, o))), be[i.prop = t] = i, e.targetTest && (Te.push(i), ge[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
            }
            pe(t, i), e.register && e.register(_n, i, gn)
        },
        kt = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        },
        xt = function(e, t, n) {
            return 255 * (6 * (e = e < 0 ? e + 1 : e > 1 ? e - 1 : e) < 1 ? t + (n - t) * e * 6 : e < .5 ? n : 3 * e < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) + .5 | 0
        },
        At = function(e, t, n) {
            var i, r, o, a, s, l, u, c, d, h, f = e ? Q(e) ? [e >> 16, e >> 8 & 255, 255 & e] : 0 : kt.black;
            if (!f) {
                if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), kt[e]) f = kt[e];
                else if ("#" === e.charAt(0)) 4 === e.length && (i = e.charAt(1), r = e.charAt(2), o = e.charAt(3), e = "#" + i + i + r + r + o + o), f = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & 255, 255 & e];
                else if ("hsl" === e.substr(0, 3))
                    if (f = h = e.match(ie), t) {
                        if (~e.indexOf("=")) return f = e.match(re), n && f.length < 4 && (f[3] = 1), f
                    } else a = +f[0] % 360 / 360, s = +f[1] / 100, i = 2 * (l = +f[2] / 100) - (r = l <= .5 ? l * (s + 1) : l + s - l * s), f.length > 3 && (f[3] *= 1), f[0] = xt(a + 1 / 3, i, r), f[1] = xt(a, i, r), f[2] = xt(a - 1 / 3, i, r);
                else f = e.match(ie) || kt.transparent;
                f = f.map(Number)
            }
            return t && !h && (i = f[0] / 255, r = f[1] / 255, o = f[2] / 255, l = ((u = Math.max(i, r, o)) + (c = Math.min(i, r, o))) / 2, u === c ? a = s = 0 : (d = u - c, s = l > .5 ? d / (2 - u - c) : d / (u + c), a = u === i ? (r - o) / d + (r < o ? 6 : 0) : u === r ? (o - i) / d + 2 : (i - r) / d + 4, a *= 60), f[0] = ~~(a + .5), f[1] = ~~(100 * s + .5), f[2] = ~~(100 * l + .5)), n && f.length < 4 && (f[3] = 1), f
        },
        St = function(e) {
            var t = [],
                n = [],
                i = -1;
            return e.split(Ot).forEach((function(e) {
                var r = e.match(oe) || [];
                t.push.apply(t, r), n.push(i += r.length + 1)
            })), t.c = n, t
        },
        Et = function(e, t, n) {
            var i, r, o, a, s = "",
                l = (e + s).match(Ot),
                u = t ? "hsla(" : "rgba(",
                c = 0;
            if (!l) return e;
            if (l = l.map((function(e) {
                    return (e = At(e, t, 1)) && u + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")"
                })), n && (o = St(e), (i = n.c).join(s) !== o.c.join(s)))
                for (a = (r = e.replace(Ot, "1").split(oe)).length - 1; c < a; c++) s += r[c] + (~i.indexOf(c) ? l.shift() || u + "0,0,0,0)" : (o.length ? o : l.length ? l : n).shift());
            if (!r)
                for (a = (r = e.split(Ot)).length - 1; c < a; c++) s += r[c] + l[c];
            return s + r[a]
        },
        Ot = function() {
            var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (e in kt) t += "|" + e + "\\b";
            return new RegExp(t + ")", "gi")
        }(),
        Ct = /hsl[a]?\(/,
        Pt = function(e) {
            var t, n = e.join(" ");
            if (Ot.lastIndex = 0, Ot.test(n)) return t = Ct.test(n), e[1] = Et(e[1], t), e[0] = Et(e[0], t, St(e[1])), !0
        },
        It = (A = Date.now, S = 500, E = 33, O = A(), C = O, I = P = 1 / 240, L = function e(t) {
            var n, i, r = A() - C,
                o = !0 === t;
            r > S && (O += r - E), C += r, x.time = (C - O) / 1e3, ((n = x.time - I) > 0 || o) && (x.frame++, I += n + (n >= P ? .004 : P - n), i = 1), o || (w = T(e)), i && M.forEach((function(e) {
                return e(x.time, r, x.frame, t)
            }))
        }, x = {
            time: 0,
            frame: 0,
            tick: function() {
                L(!0)
            },
            wake: function() {
                v && (!m && ee() && (p = m = window, g = p.document || {}, ce.gsap = _n, (p.gsapVersions || (p.gsapVersions = [])).push(_n.version), he(de || p.GreenSockGlobals || !p.gsap && p || {}), k = p.requestAnimationFrame), w && x.sleep(), T = k || function(e) {
                    return setTimeout(e, 1e3 * (I - x.time) + 1 | 0)
                }, _ = 1, L(2))
            },
            sleep: function() {
                (k ? p.cancelAnimationFrame : clearTimeout)(w), _ = 0, T = me
            },
            lagSmoothing: function(e, t) {
                S = e || 1 / 1e-8, E = Math.min(t, S, 0)
            },
            fps: function(e) {
                P = 1 / (e || 240), I = x.time + P
            },
            add: function(e) {
                M.indexOf(e) < 0 && M.push(e), Mt()
            },
            remove: function(e) {
                var t;
                ~(t = M.indexOf(e)) && M.splice(t, 1)
            },
            _listeners: M = []
        }),
        Mt = function() {
            return !_ && It.wake()
        },
        Lt = {},
        Rt = /^[\d.\-M][\d.\-,\s]/,
        Nt = /["']/g,
        jt = function(e) {
            for (var t, n, i, r = {}, o = e.substr(1, e.length - 3).split(":"), a = o[0], s = 1, l = o.length; s < l; s++) n = o[s], t = s !== l - 1 ? n.lastIndexOf(",") : n.length, i = n.substr(0, t), r[a] = isNaN(i) ? i.replace(Nt, "").trim() : +i, a = n.substr(t + 1).trim();
            return r
        },
        $t = function(e) {
            return function(t) {
                return 1 - e(1 - t)
            }
        },
        Dt = function e(t, n) {
            for (var i, r = t._first; r;) r instanceof Wt ? e(r, n) : !r.vars.yoyoEase || r._yoyo && r._repeat || r._yoyo === n || (r.timeline ? e(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next
        },
        Ft = function(e, t) {
            return e && (Y(e) ? e : Lt[e] || function(e) {
                var t = (e + "").split("("),
                    n = Lt[t[0]];
                return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [jt(t[1])] : se.exec(e)[1].split(",").map(Le)) : Lt._CE && Rt.test(e) ? Lt._CE("", e) : n
            }(e)) || t
        },
        Ht = function(e, t, n, i) {
            void 0 === n && (n = function(e) {
                return 1 - t(1 - e)
            }), void 0 === i && (i = function(e) {
                return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2
            });
            var r, o = {
                easeIn: t,
                easeOut: n,
                easeInOut: i
            };
            return Ee(e, (function(e) {
                for (var t in Lt[e] = ce[e] = o, Lt[r = e.toLowerCase()] = n, o) Lt[r + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Lt[e + "." + t] = o[t]
            })), o
        },
        Ut = function(e) {
            return function(t) {
                return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
            }
        },
        qt = function e(t, n, i) {
            var r = n >= 1 ? n : 1,
                o = (i || (t ? .3 : .45)) / (n < 1 ? n : 1),
                a = o / q * (Math.asin(1 / r) || 0),
                s = function(e) {
                    return 1 === e ? 1 : r * Math.pow(2, -10 * e) * G((e - a) * o) + 1
                },
                l = "out" === t ? s : "in" === t ? function(e) {
                    return 1 - s(1 - e)
                } : Ut(s);
            return o = q / o, l.config = function(n, i) {
                return e(t, n, i)
            }, l
        },
        Bt = function e(t, n) {
            void 0 === n && (n = 1.70158);
            var i = function(e) {
                    return e ? --e * e * ((n + 1) * e + n) + 1 : 0
                },
                r = "out" === t ? i : "in" === t ? function(e) {
                    return 1 - i(1 - e)
                } : Ut(i);
            return r.config = function(n) {
                return e(t, n)
            }, r
        };
    Ee("Linear,Quad,Cubic,Quart,Quint,Strong", (function(e, t) {
        var n = t < 5 ? t + 1 : t;
        Ht(e + ",Power" + (n - 1), t ? function(e) {
            return Math.pow(e, n)
        } : function(e) {
            return e
        }, (function(e) {
            return 1 - Math.pow(1 - e, n)
        }), (function(e) {
            return e < .5 ? Math.pow(2 * e, n) / 2 : 1 - Math.pow(2 * (1 - e), n) / 2
        }))
    })), Lt.Linear.easeNone = Lt.none = Lt.Linear.easeIn, Ht("Elastic", qt("in"), qt("out"), qt()), R = 7.5625, j = 1 / (N = 2.75), Ht("Bounce", (function(e) {
        return 1 - D(1 - e)
    }), D = function(e) {
        return e < j ? R * e * e : e < .7272727272727273 ? R * Math.pow(e - 1.5 / N, 2) + .75 : e < .9090909090909092 ? R * (e -= 2.25 / N) * e + .9375 : R * Math.pow(e - 2.625 / N, 2) + .984375
    }), Ht("Expo", (function(e) {
        return e ? Math.pow(2, 10 * (e - 1)) : 0
    })), Ht("Circ", (function(e) {
        return -(V(1 - e * e) - 1)
    })), Ht("Sine", (function(e) {
        return 1 === e ? 1 : 1 - W(e * B)
    })), Ht("Back", Bt("in"), Bt("out"), Bt()), Lt.SteppedEase = Lt.steps = ce.SteppedEase = {
        config: function(e, t) {
            void 0 === e && (e = 1);
            var n = 1 / e,
                i = e + (t ? 0 : 1),
                r = t ? 1 : 0;
            return function(e) {
                return ((i * ot(0, 1 - 1e-8, e) | 0) + r) * n
            }
        }
    }, H.ease = Lt["quad.out"], Ee("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(e) {
        return ke += e + "," + e + "Params,"
    }));
    var zt = function(e, t) {
            this.id = z++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Se, this.set = t ? t.getSetter : sn
        },
        Vt = function() {
            function e(e, t) {
                var n = e.parent || f;
                this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, et(this, +e.duration, 1), this.data = e.data, _ || It.wake(), n && Ke(n, this, t || 0 === t ? t : n._time, 1), e.reversed && this.reverse(), e.paused && this.paused(!0)
            }
            var t = e.prototype;
            return t.delay = function(e) {
                return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay
            }, t.duration = function(e) {
                return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur
            }, t.totalDuration = function(e) {
                if (!arguments.length) return this._tDur;
                this._dirty = 0;
                var t = this._time / this._dur || 0;
                return et(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1)), this._tTime ? Ye(this, t * e + Ve(this)) : this
            }, t.totalTime = function(e, t) {
                if (Mt(), !arguments.length) return this._tTime;
                var n = this._dp;
                if (n && n.smoothChildTiming && this._ts) {
                    for (Ye(this, e); n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                    !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Ke(this._dp, this, this._start - this._delay)
                }
                return (this._tTime !== e || !this._dur && !t || this._initted && 1e-8 === Math.abs(this._zTime) || !e && !this._initted) && (this._ts || (this._pTime = e), Me(this, e, t)), this
            }, t.time = function(e, t) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Ve(this)) % this._dur || (e ? this._dur : 0), t) : this._time
            }, t.totalProgress = function(e, t) {
                return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
            }, t.progress = function(e, t) {
                return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + Ve(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
            }, t.iteration = function(e, t) {
                var n = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? We(this._tTime, n) + 1 : 1
            }, t.timeScale = function(e) {
                if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === e) return this;
                var t = this.parent && this._ts ? Ge(this.parent._time, this) : this._tTime;
                return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, ze(this.totalTime(ot(-this._delay, this._tDur, t), !0))
            }, t.paused = function(e) {
                return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Mt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= 1e-8) && 1e-8 !== Math.abs(this._zTime)))), this) : this._ps
            }, t.startTime = function(e) {
                if (arguments.length) {
                    this._start = e;
                    var t = this.parent || this._dp;
                    return t && (t._sort || !this.parent) && Ke(t, this, e - this._delay), this
                }
                return this._start
            }, t.endTime = function(e) {
                return this._start + (J(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
            }, t.rawTime = function(e) {
                var t = this.parent || this._dp;
                return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ge(t.rawTime(e), this) : this._tTime : this._tTime
            }, t.globalTime = function(e) {
                for (var t = this, n = arguments.length ? e : t.rawTime(); t;) n = t._start + n / (t._ts || 1), t = t._dp;
                return n
            }, t.repeat = function(e) {
                return arguments.length ? (this._repeat = e, tt(this)) : this._repeat
            }, t.repeatDelay = function(e) {
                return arguments.length ? (this._rDelay = e, tt(this)) : this._rDelay
            }, t.yoyo = function(e) {
                return arguments.length ? (this._yoyo = e, this) : this._yoyo
            }, t.seek = function(e, t) {
                return this.totalTime(it(this, e), J(t))
            }, t.restart = function(e, t) {
                return this.play().totalTime(e ? -this._delay : 0, J(t))
            }, t.play = function(e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
            }, t.reverse = function(e, t) {
                return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
            }, t.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0)
            }, t.resume = function() {
                return this.paused(!1)
            }, t.reversed = function(e) {
                return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -1e-8 : 0)), this) : this._rts < 0
            }, t.invalidate = function() {
                return this._initted = 0, this._zTime = -1e-8, this
            }, t.isActive = function() {
                var e, t = this.parent || this._dp,
                    n = this._start;
                return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= n && e < this.endTime(!0) - 1e-8))
            }, t.eventCallback = function(e, t, n) {
                var i = this.vars;
                return arguments.length > 1 ? (t ? (i[e] = t, n && (i[e + "Params"] = n), "onUpdate" === e && (this._onUpdate = t)) : delete i[e], this) : i[e]
            }, t.then = function(e) {
                var t = this;
                return new Promise((function(n) {
                    var i = Y(e) ? e : Re,
                        r = function() {
                            var e = t.then;
                            t.then = null, Y(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), n(i), t.then = e
                        };
                    t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? r() : t._prom = r
                }))
            }, t.kill = function() {
                wt(this)
            }, e
        }();
    Ne(Vt.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Wt = function(e) {
        function t(t, n) {
            var i;
            return void 0 === t && (t = {}), (i = e.call(this, t, n) || this).labels = {}, i.smoothChildTiming = !!t.smoothChildTiming, i.autoRemoveChildren = !!t.autoRemoveChildren, i._sort = J(t.sortChildren), i.parent && Qe(i.parent, d(i)), t.scrollTrigger && Ze(d(i), t.scrollTrigger), i
        }
        h(t, e);
        var n = t.prototype;
        return n.to = function(e, t, n) {
            return new tn(e, Pe(arguments, 0, this), it(this, Q(t) ? arguments[3] : n)), this
        }, n.from = function(e, t, n) {
            return new tn(e, Pe(arguments, 1, this), it(this, Q(t) ? arguments[3] : n)), this
        }, n.fromTo = function(e, t, n, i) {
            return new tn(e, Pe(arguments, 2, this), it(this, Q(t) ? arguments[4] : i)), this
        }, n.set = function(e, t, n) {
            return t.duration = 0, t.parent = this, He(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new tn(e, t, it(this, n), 1), this
        }, n.call = function(e, t, n) {
            return Ke(this, tn.delayedCall(0, e, t), it(this, n))
        }, n.staggerTo = function(e, t, n, i, r, o, a) {
            return n.duration = t, n.stagger = n.stagger || i, n.onComplete = o, n.onCompleteParams = a, n.parent = this, new tn(e, n, it(this, r)), this
        }, n.staggerFrom = function(e, t, n, i, r, o, a) {
            return n.runBackwards = 1, He(n).immediateRender = J(n.immediateRender), this.staggerTo(e, t, n, i, r, o, a)
        }, n.staggerFromTo = function(e, t, n, i, r, o, a, s) {
            return i.startAt = n, He(i).immediateRender = J(i.immediateRender), this.staggerTo(e, t, i, r, o, a, s)
        }, n.render = function(e, t, n) {
            var i, r, o, a, s, l, u, c, d, h, p, m, g = this._time,
                v = this._dirty ? this.totalDuration() : this._tDur,
                y = this._dur,
                b = this !== f && e > v - 1e-8 && e >= 0 ? v : e < 1e-8 ? 0 : e,
                _ = this._zTime < 0 != e < 0 && (this._initted || !y);
            if (b !== this._tTime || n || _) {
                if (g !== this._time && y && (b += this._time - g, e += this._time - g), i = b, d = this._start, l = !(c = this._ts), _ && (y || (g = this._zTime), (e || !t) && (this._zTime = e)), this._repeat && (p = this._yoyo, s = y + this._rDelay, ((i = Oe(b % s)) > y || v === b) && (i = y), (a = ~~(b / s)) && a === b / s && (i = y, a--), h = We(this._tTime, s), !g && this._tTime && h !== a && (h = a), p && 1 & a && (i = y - i, m = 1), a !== h && !this._lock)) {
                    var w = p && 1 & h,
                        T = w === (p && 1 & a);
                    if (a < h && (w = !w), g = w ? 0 : y, this._lock = 1, this.render(g || (m ? 0 : Oe(a * s)), t, !y)._lock = 0, !t && this.parent && _t(this, "onRepeat"), this.vars.repeatRefresh && !m && (this.invalidate()._lock = 1), g !== this._time || l !== !this._ts) return this;
                    if (T && (this._lock = 2, g = w ? y + 1e-4 : -1e-4, this.render(g, !0), this.vars.repeatRefresh && !m && this.invalidate()), this._lock = 0, !this._ts && !l) return this;
                    Dt(this, m)
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (u = function(e, t, n) {
                        var i;
                        if (n > t)
                            for (i = e._first; i && i._start <= n;) {
                                if (!i._dur && "isPause" === i.data && i._start > t) return i;
                                i = i._next
                            } else
                                for (i = e._last; i && i._start >= n;) {
                                    if (!i._dur && "isPause" === i.data && i._start < t) return i;
                                    i = i._prev
                                }
                    }(this, Oe(g), Oe(i))) && (b -= i - (i = u._start)), this._tTime = b, this._time = i, this._act = !c, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e), g || !i || t || _t(this, "onStart"), i >= g && e >= 0)
                    for (r = this._first; r;) {
                        if (o = r._next, (r._act || i >= r._start) && r._ts && u !== r) {
                            if (r.parent !== this) return this.render(e, t, n);
                            if (r.render(r._ts > 0 ? (i - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (i - r._start) * r._ts, t, n), i !== this._time || !this._ts && !l) {
                                u = 0, o && (b += this._zTime = -1e-8);
                                break
                            }
                        }
                        r = o
                    } else {
                        r = this._last;
                        for (var k = e < 0 ? e : i; r;) {
                            if (o = r._prev, (r._act || k <= r._end) && r._ts && u !== r) {
                                if (r.parent !== this) return this.render(e, t, n);
                                if (r.render(r._ts > 0 ? (k - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (k - r._start) * r._ts, t, n), i !== this._time || !this._ts && !l) {
                                    u = 0, o && (b += this._zTime = k ? -1e-8 : 1e-8);
                                    break
                                }
                            }
                            r = o
                        }
                    }
                if (u && !t && (this.pause(), u.render(i >= g ? 0 : -1e-8)._zTime = i >= g ? 1 : -1, this._ts)) return this._start = d, Xe(this), this.render(e, t, n);
                this._onUpdate && !t && _t(this, "onUpdate", !0), (b === v && v >= this.totalDuration() || !b && g) && (d !== this._start && Math.abs(c) === Math.abs(this._ts) || this._lock || ((e || !y) && (b === v && this._ts > 0 || !b && this._ts < 0) && qe(this, 1), t || e < 0 && !g || !b && !g || (_t(this, b === v ? "onComplete" : "onReverseComplete", !0), this._prom && !(b < v && this.timeScale() > 0) && this._prom())))
            }
            return this
        }, n.add = function(e, t) {
            var n = this;
            if (Q(t) || (t = it(this, t)), !(e instanceof Vt)) {
                if (ne(e)) return e.forEach((function(e) {
                    return n.add(e, t)
                })), Be(this);
                if (X(e)) return this.addLabel(e, t);
                if (!Y(e)) return this;
                e = tn.delayedCall(0, e)
            }
            return this !== e ? Ke(this, e, t) : this
        }, n.getChildren = function(e, t, n, i) {
            void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === n && (n = !0), void 0 === i && (i = -U);
            for (var r = [], o = this._first; o;) o._start >= i && (o instanceof tn ? t && r.push(o) : (n && r.push(o), e && r.push.apply(r, o.getChildren(!0, t, n)))), o = o._next;
            return r
        }, n.getById = function(e) {
            for (var t = this.getChildren(1, 1, 1), n = t.length; n--;)
                if (t[n].vars.id === e) return t[n]
        }, n.remove = function(e) {
            return X(e) ? this.removeLabel(e) : Y(e) ? this.killTweensOf(e) : (Ue(this, e), e === this._recent && (this._recent = this._last), Be(this))
        }, n.totalTime = function(t, n) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Oe(It.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime
        }, n.addLabel = function(e, t) {
            return this.labels[e] = it(this, t), this
        }, n.removeLabel = function(e) {
            return delete this.labels[e], this
        }, n.addPause = function(e, t, n) {
            var i = tn.delayedCall(0, t || me, n);
            return i.data = "isPause", this._hasPause = 1, Ke(this, i, it(this, e))
        }, n.removePause = function(e) {
            var t = this._first;
            for (e = it(this, e); t;) t._start === e && "isPause" === t.data && qe(t), t = t._next
        }, n.killTweensOf = function(e, t, n) {
            for (var i = this.getTweensOf(e, n), r = i.length; r--;) Gt !== i[r] && i[r].kill(e, t);
            return this
        }, n.getTweensOf = function(e, t) {
            for (var n, i = [], r = ct(e), o = this._first, a = Q(t); o;) o instanceof tn ? Ce(o._targets, r) && (a ? (!Gt || o._initted && o._ts) && o.globalTime(0) <= t && o.globalTime(o.totalDuration()) > t : !t || o.isActive()) && i.push(o) : (n = o.getTweensOf(r, t)).length && i.push.apply(i, n), o = o._next;
            return i
        }, n.tweenTo = function(e, t) {
            t = t || {};
            var n = this,
                i = it(n, e),
                r = t,
                o = r.startAt,
                a = r.onStart,
                s = r.onStartParams,
                l = tn.to(n, Ne(t, {
                    ease: "none",
                    lazy: !1,
                    time: i,
                    duration: t.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale()) || 1e-8,
                    onStart: function() {
                        n.pause();
                        var e = t.duration || Math.abs((i - n._time) / n.timeScale());
                        l._dur !== e && et(l, e).render(l._time, !0, !0), a && a.apply(l, s || [])
                    }
                }));
            return l
        }, n.tweenFromTo = function(e, t, n) {
            return this.tweenTo(t, Ne({
                startAt: {
                    time: it(this, e)
                }
            }, n))
        }, n.recent = function() {
            return this._recent
        }, n.nextLabel = function(e) {
            return void 0 === e && (e = this._time), bt(this, it(this, e))
        }, n.previousLabel = function(e) {
            return void 0 === e && (e = this._time), bt(this, it(this, e), 1)
        }, n.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + 1e-8)
        }, n.shiftChildren = function(e, t, n) {
            void 0 === n && (n = 0);
            for (var i, r = this._first, o = this.labels; r;) r._start >= n && (r._start += e), r = r._next;
            if (t)
                for (i in o) o[i] >= n && (o[i] += e);
            return Be(this)
        }, n.invalidate = function() {
            var t = this._first;
            for (this._lock = 0; t;) t.invalidate(), t = t._next;
            return e.prototype.invalidate.call(this)
        }, n.clear = function(e) {
            void 0 === e && (e = !0);
            for (var t, n = this._first; n;) t = n._next, this.remove(n), n = t;
            return this._time = this._tTime = this._pTime = 0, e && (this.labels = {}), Be(this)
        }, n.totalDuration = function(e) {
            var t, n, i, r, o = 0,
                a = this,
                s = a._last,
                l = U;
            if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -e : e));
            if (a._dirty) {
                for (r = a.parent; s;) t = s._prev, s._dirty && s.totalDuration(), (i = s._start) > l && a._sort && s._ts && !a._lock ? (a._lock = 1, Ke(a, s, i - s._delay, 1)._lock = 0) : l = i, i < 0 && s._ts && (o -= i, (!r && !a._dp || r && r.smoothChildTiming) && (a._start += i / a._ts, a._time -= i, a._tTime -= i), a.shiftChildren(-i, !1, -Infinity), l = 0), (n = Xe(s)) > o && s._ts && (o = n), s = t;
                et(a, a === f && a._time > o ? a._time : o, 1), a._dirty = 0
            }
            return a._tDur
        }, t.updateRoot = function(e) {
            if (f._ts && (Me(f, Ge(e, f)), y = It.frame), It.frame >= we) {
                we += F.autoSleep || 120;
                var t = f._first;
                if ((!t || !t._ts) && F.autoSleep && It._listeners.length < 2) {
                    for (; t && !t._ts;) t = t._next;
                    t || It.sleep()
                }
            }
        }, t
    }(Vt);
    Ne(Wt.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var Gt, Xt = function(e, t, n, i, r, o, a) {
            var s, l, u, c, d, h, f, p, m = new gn(this._pt, e, t, 0, 1, cn, null, r),
                g = 0,
                v = 0;
            for (m.b = n, m.e = i, n += "", (f = ~(i += "").indexOf("random(")) && (i = vt(i)), o && (o(p = [n, i], e, t), n = p[0], i = p[1]), l = n.match(ae) || []; s = ae.exec(i);) c = s[0], d = i.substring(g, s.index), u ? u = (u + 1) % 5 : "rgba(" === d.substr(-5) && (u = 1), c !== l[v++] && (h = parseFloat(l[v - 1]) || 0, m._pt = {
                _next: m._pt,
                p: d || 1 === v ? d : ",",
                s: h,
                c: "=" === c.charAt(1) ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1) : parseFloat(c) - h,
                m: u && u < 4 ? Math.round : 0
            }, g = ae.lastIndex);
            return m.c = g < i.length ? i.substring(g, i.length) : "", m.fp = a, (le.test(i) || f) && (m.e = 0), this._pt = m, m
        },
        Yt = function(e, t, n, i, r, o, a, s, l) {
            Y(i) && (i = i(r || 0, e, o));
            var u, c = e[t],
                d = "get" !== n ? n : Y(c) ? l ? e[t.indexOf("set") || !Y(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : c,
                h = Y(c) ? l ? on : rn : nn;
            if (X(i) && (~i.indexOf("random(") && (i = vt(i)), "=" === i.charAt(1) && (i = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (at(d) || 0))), d !== i) return isNaN(d * i) ? Xt.call(this, e, t, d, i, h, s || F.stringFilter, l) : (u = new gn(this._pt, e, t, +d || 0, i - (d || 0), "boolean" == typeof c ? un : ln, 0, h), l && (u.fp = l), a && u.modifier(a, this, e), this._pt = u)
        },
        Qt = function(e, t, n, i, r, o) {
            var a, s, l, u;
            if (be[e] && !1 !== (a = new be[e]).init(r, a.rawVars ? t[e] : function(e, t, n, i, r) {
                    if (Y(e) && (e = Zt(e, r, t, n, i)), !Z(e) || e.style && e.nodeType || ne(e)) return X(e) ? Zt(e, r, t, n, i) : e;
                    var o, a = {};
                    for (o in e) a[o] = Zt(e[o], r, t, n, i);
                    return a
                }(t[e], i, r, o, n), n, i, o) && (n._pt = s = new gn(n._pt, r, e, 0, 1, a.render, a, 0, a.priority), n !== b))
                for (l = n._ptLookup[n._targets.indexOf(r)], u = a._props.length; u--;) l[a._props[u]] = s;
            return a
        },
        Kt = function e(t, n) {
            var i, r, o, a, s, l, u, c, d, h, p, m, g, v = t.vars,
                y = v.ease,
                b = v.startAt,
                _ = v.immediateRender,
                w = v.lazy,
                T = v.onUpdate,
                k = v.onUpdateParams,
                x = v.callbackScope,
                A = v.runBackwards,
                S = v.yoyoEase,
                E = v.keyframes,
                O = v.autoRevert,
                C = t._dur,
                P = t._startAt,
                I = t._targets,
                M = t.parent,
                L = M && "nested" === M.data ? M.parent._targets : I,
                R = "auto" === t._overwrite,
                N = t.timeline;
            if (N && (!E || !y) && (y = "none"), t._ease = Ft(y, H.ease), t._yEase = S ? $t(Ft(!0 === S ? y : S, H.ease)) : 0, S && t._yoyo && !t._repeat && (S = t._yEase, t._yEase = t._ease, t._ease = S), !N) {
                if (m = (c = I[0] ? Ae(I[0]).harness : 0) && v[c.prop], i = Fe(v, ge), P && P.render(-1, !0).kill(), b) {
                    if (qe(t._startAt = tn.set(I, Ne({
                            data: "isStart",
                            overwrite: !1,
                            parent: M,
                            immediateRender: !0,
                            lazy: J(w),
                            startAt: null,
                            delay: 0,
                            onUpdate: T,
                            onUpdateParams: k,
                            callbackScope: x,
                            stagger: 0
                        }, b))), _)
                        if (n > 0) !O && (t._startAt = 0);
                        else if (C && !(n < 0 && P)) return void(t._zTime = n)
                } else if (A && C)
                    if (P) !O && (t._startAt = 0);
                    else if (n && (_ = !1), o = Ne({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: _ && J(w),
                        immediateRender: _,
                        stagger: 0,
                        parent: M
                    }, i), m && (o[c.prop] = m), qe(t._startAt = tn.set(I, o)), _) {
                    if (!n) return
                } else e(t._startAt, 1e-8);
                for (t._pt = 0, w = C && J(w) || w && !C, r = 0; r < I.length; r++) {
                    if (u = (s = I[r])._gsap || xe(I)[r]._gsap, t._ptLookup[r] = h = {}, ye[u.id] && Ie(), p = L === I ? r : L.indexOf(s), c && !1 !== (d = new c).init(s, m || i, t, p, L) && (t._pt = a = new gn(t._pt, s, d.name, 0, 1, d.render, d, 0, d.priority), d._props.forEach((function(e) {
                            h[e] = a
                        })), d.priority && (l = 1)), !c || m)
                        for (o in i) be[o] && (d = Qt(o, i, t, p, s, L)) ? d.priority && (l = 1) : h[o] = a = Yt.call(t, s, o, "get", i[o], p, L, 0, v.stringFilter);
                    t._op && t._op[r] && t.kill(s, t._op[r]), R && t._pt && (Gt = t, f.killTweensOf(s, h, t.globalTime(0)), g = !t.parent, Gt = 0), t._pt && w && (ye[u.id] = 1)
                }
                l && mn(t), t._onInit && t._onInit(t)
            }
            t._from = !N && !!v.runBackwards, t._onUpdate = T, t._initted = (!t._op || t._pt) && !g
        },
        Zt = function(e, t, n, i, r) {
            return Y(e) ? e.call(t, n, i, r) : X(e) && ~e.indexOf("random(") ? vt(e) : e
        },
        Jt = ke + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        en = (Jt + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
        tn = function(e) {
            function t(t, n, i, r) {
                var o;
                "number" == typeof n && (i.duration = n, n = i, i = null);
                var a, s, l, u, c, h, p, m, g = (o = e.call(this, r ? n : He(n), i) || this).vars,
                    v = g.duration,
                    y = g.delay,
                    b = g.immediateRender,
                    _ = g.stagger,
                    w = g.overwrite,
                    T = g.keyframes,
                    k = g.defaults,
                    x = g.scrollTrigger,
                    A = g.yoyoEase,
                    S = o.parent,
                    E = (ne(t) ? Q(t[0]) : "length" in n) ? [t] : ct(t);
                if (o._targets = E.length ? xe(E) : fe(0, !F.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = w, T || _ || te(v) || te(y)) {
                    if (n = o.vars, (a = o.timeline = new Wt({
                            data: "nested",
                            defaults: k || {}
                        })).kill(), a.parent = d(o), T) Ne(a.vars.defaults, {
                        ease: "none"
                    }), T.forEach((function(e) {
                        return a.to(E, e, ">")
                    }));
                    else {
                        if (u = E.length, p = _ ? ht(_) : me, Z(_))
                            for (c in _) ~Jt.indexOf(c) && (m || (m = {}), m[c] = _[c]);
                        for (s = 0; s < u; s++) {
                            for (c in l = {}, n) en.indexOf(c) < 0 && (l[c] = n[c]);
                            l.stagger = 0, A && (l.yoyoEase = A), m && $e(l, m), h = E[s], l.duration = +Zt(v, d(o), s, h, E), l.delay = (+Zt(y, d(o), s, h, E) || 0) - o._delay, !_ && 1 === u && l.delay && (o._delay = y = l.delay, o._start += y, l.delay = 0), a.to(h, l, p(s, h, E))
                        }
                        a.duration() ? v = y = 0 : o.timeline = 0
                    }
                    v || o.duration(v = a.duration())
                } else o.timeline = 0;
                return !0 === w && (Gt = d(o), f.killTweensOf(E), Gt = 0), S && Qe(S, d(o)), (b || !v && !T && o._start === Oe(S._time) && J(b) && function e(t) {
                    return !t || t._ts && e(t.parent)
                }(d(o)) && "nested" !== S.data) && (o._tTime = -1e-8, o.render(Math.max(0, -y))), x && Ze(d(o), x), o
            }
            h(t, e);
            var n = t.prototype;
            return n.render = function(e, t, n) {
                var i, r, o, a, s, l, u, c, d, h = this._time,
                    f = this._tDur,
                    p = this._dur,
                    m = e > f - 1e-8 && e >= 0 ? f : e < 1e-8 ? 0 : e;
                if (p) {
                    if (m !== this._tTime || !e || n || this._startAt && this._zTime < 0 != e < 0) {
                        if (i = m, c = this.timeline, this._repeat) {
                            if (a = p + this._rDelay, ((i = Oe(m % a)) > p || f === m) && (i = p), (o = ~~(m / a)) && o === m / a && (i = p, o--), (l = this._yoyo && 1 & o) && (d = this._yEase, i = p - i), s = We(this._tTime, a), i === h && !n && this._initted) return this;
                            o !== s && (c && this._yEase && Dt(c, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = n = 1, this.render(Oe(a * o), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (Je(this, e < 0 ? e : i, n, t)) return this._tTime = 0, this;
                            if (p !== this._dur) return this.render(e, t, n)
                        }
                        for (this._tTime = m, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = u = (d || this._ease)(i / p), this._from && (this.ratio = u = 1 - u), i && !h && !t && _t(this, "onStart"), r = this._pt; r;) r.r(u, r.d), r = r._next;
                        c && c.render(e < 0 ? e : !i && l ? -1e-8 : c._dur * u, t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (e < 0 && this._startAt && this._startAt.render(e, !0, n), _t(this, "onUpdate")), this._repeat && o !== s && this.vars.onRepeat && !t && this.parent && _t(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (e < 0 && this._startAt && !this._onUpdate && this._startAt.render(e, !0, !0), (e || !p) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0) && qe(this, 1), t || e < 0 && !h || !m && !h || (_t(this, m === f ? "onComplete" : "onReverseComplete", !0), this._prom && !(m < f && this.timeScale() > 0) && this._prom()))
                    }
                } else ! function(e, t, n, i) {
                    var r, o, a = e.ratio,
                        s = t < 0 || !t && a && !e._start && e._zTime > 1e-8 && !e._dp._lock || e._ts < 0 || e._dp._ts < 0 ? 0 : 1,
                        l = e._rDelay,
                        u = 0;
                    if (l && e._repeat && (u = ot(0, e._tDur, t), We(u, l) !== (o = We(e._tTime, l)) && (a = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), e._initted || !Je(e, t, i, n))
                        if (s !== a || i || 1e-8 === e._zTime || !t && e._zTime) {
                            for (o = e._zTime, e._zTime = t || (n ? 1e-8 : 0), n || (n = t && !o), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = u, n || _t(e, "onStart"), r = e._pt; r;) r.r(s, r.d), r = r._next;
                            e._startAt && t < 0 && e._startAt.render(t, !0, !0), e._onUpdate && !n && _t(e, "onUpdate"), u && e._repeat && !n && e.parent && _t(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === s && (s && qe(e, 1), n || (_t(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()))
                        } else e._zTime || (e._zTime = t)
                }(this, e, t, n);
                return this
            }, n.targets = function() {
                return this._targets
            }, n.invalidate = function() {
                return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), e.prototype.invalidate.call(this)
            }, n.kill = function(e, t) {
                if (void 0 === t && (t = "all"), !(e || t && "all" !== t) && (this._lazy = 0, this.parent)) return wt(this);
                if (this.timeline) {
                    var n = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(e, t, Gt && !0 !== Gt.vars.overwrite)._first || wt(this), this.parent && n !== this.timeline.totalDuration() && et(this, this._dur * this.timeline._tDur / n), this
                }
                var i, r, o, a, s, l, u, c = this._targets,
                    d = e ? ct(e) : c,
                    h = this._ptLookup,
                    f = this._pt;
                if ((!t || "all" === t) && function(e, t) {
                        for (var n = e.length, i = n === t.length; i && n-- && e[n] === t[n];);
                        return n < 0
                    }(c, d)) return "all" === t && (this._pt = 0), wt(this);
                for (i = this._op = this._op || [], "all" !== t && (X(t) && (s = {}, Ee(t, (function(e) {
                        return s[e] = 1
                    })), t = s), t = function(e, t) {
                        var n, i, r, o, a = e[0] ? Ae(e[0]).harness : 0,
                            s = a && a.aliases;
                        if (!s) return t;
                        for (i in n = $e({}, t), s)
                            if (i in n)
                                for (r = (o = s[i].split(",")).length; r--;) n[o[r]] = n[i];
                        return n
                    }(c, t)), u = c.length; u--;)
                    if (~d.indexOf(c[u]))
                        for (s in r = h[u], "all" === t ? (i[u] = t, a = r, o = {}) : (o = i[u] = i[u] || {}, a = t), a)(l = r && r[s]) && ("kill" in l.d && !0 !== l.d.kill(s) || Ue(this, l, "_pt"), delete r[s]), "all" !== o && (o[s] = 1);
                return this._initted && !this._pt && f && wt(this), this
            }, t.to = function(e, n) {
                return new t(e, n, arguments[2])
            }, t.from = function(e, n) {
                return new t(e, Pe(arguments, 1))
            }, t.delayedCall = function(e, n, i, r) {
                return new t(n, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: e,
                    onComplete: n,
                    onReverseComplete: n,
                    onCompleteParams: i,
                    onReverseCompleteParams: i,
                    callbackScope: r
                })
            }, t.fromTo = function(e, n, i) {
                return new t(e, Pe(arguments, 2))
            }, t.set = function(e, n) {
                return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(e, n)
            }, t.killTweensOf = function(e, t, n) {
                return f.killTweensOf(e, t, n)
            }, t
        }(Vt);
    Ne(tn.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), Ee("staggerTo,staggerFrom,staggerFromTo", (function(e) {
        tn[e] = function() {
            var t = new Wt,
                n = st.call(arguments, 0);
            return n.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, n)
        }
    }));
    var nn = function(e, t, n) {
            return e[t] = n
        },
        rn = function(e, t, n) {
            return e[t](n)
        },
        on = function(e, t, n, i) {
            return e[t](i.fp, n)
        },
        an = function(e, t, n) {
            return e.setAttribute(t, n)
        },
        sn = function(e, t) {
            return Y(e[t]) ? rn : K(e[t]) && e.setAttribute ? an : nn
        },
        ln = function(e, t) {
            return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4, t)
        },
        un = function(e, t) {
            return t.set(t.t, t.p, !!(t.s + t.c * e), t)
        },
        cn = function(e, t) {
            var n = t._pt,
                i = "";
            if (!e && t.b) i = t.b;
            else if (1 === e && t.e) i = t.e;
            else {
                for (; n;) i = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round(1e4 * (n.s + n.c * e)) / 1e4) + i, n = n._next;
                i += t.c
            }
            t.set(t.t, t.p, i, t)
        },
        dn = function(e, t) {
            for (var n = t._pt; n;) n.r(e, n.d), n = n._next
        },
        hn = function(e, t, n, i) {
            for (var r, o = this._pt; o;) r = o._next, o.p === i && o.modifier(e, t, n), o = r
        },
        fn = function(e) {
            for (var t, n, i = this._pt; i;) n = i._next, i.p === e && !i.op || i.op === e ? Ue(this, i, "_pt") : i.dep || (t = 1), i = n;
            return !t
        },
        pn = function(e, t, n, i) {
            i.mSet(e, t, i.m.call(i.tween, n, i.mt), i)
        },
        mn = function(e) {
            for (var t, n, i, r, o = e._pt; o;) {
                for (t = o._next, n = i; n && n.pr > o.pr;) n = n._next;
                (o._prev = n ? n._prev : r) ? o._prev._next = o: i = o, (o._next = n) ? n._prev = o : r = o, o = t
            }
            e._pt = i
        },
        gn = function() {
            function e(e, t, n, i, r, o, a, s, l) {
                this.t = t, this.s = i, this.c = r, this.p = n, this.r = o || ln, this.d = a || this, this.set = s || nn, this.pr = l || 0, this._next = e, e && (e._prev = this)
            }
            return e.prototype.modifier = function(e, t, n) {
                this.mSet = this.mSet || this.set, this.set = pn, this.m = e, this.mt = n, this.tween = t
            }, e
        }();
    Ee(ke + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(e) {
        return ge[e] = 1
    })), ce.TweenMax = ce.TweenLite = tn, ce.TimelineLite = ce.TimelineMax = Wt, f = new Wt({
        sortChildren: !1,
        defaults: H,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), F.stringFilter = Pt;
    var vn = {
        registerPlugin: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            t.forEach((function(e) {
                return Tt(e)
            }))
        },
        timeline: function(e) {
            return new Wt(e)
        },
        getTweensOf: function(e, t) {
            return f.getTweensOf(e, t)
        },
        getProperty: function(e, t, n, i) {
            X(e) && (e = ct(e)[0]);
            var r = Ae(e || {}).get,
                o = n ? Re : Le;
            return "native" === n && (n = ""), e ? t ? o((be[t] && be[t].get || r)(e, t, n, i)) : function(t, n, i) {
                return o((be[t] && be[t].get || r)(e, t, n, i))
            } : e
        },
        quickSetter: function(e, t, n) {
            if ((e = ct(e)).length > 1) {
                var i = e.map((function(e) {
                        return _n.quickSetter(e, t, n)
                    })),
                    r = i.length;
                return function(e) {
                    for (var t = r; t--;) i[t](e)
                }
            }
            e = e[0] || {};
            var o = be[t],
                a = Ae(e),
                s = a.harness && (a.harness.aliases || {})[t] || t,
                l = o ? function(t) {
                    var i = new o;
                    b._pt = 0, i.init(e, n ? t + n : t, b, 0, [e]), i.render(1, i), b._pt && dn(1, b)
                } : a.set(e, s);
            return o ? l : function(t) {
                return l(e, s, n ? t + n : t, a, 1)
            }
        },
        isTweening: function(e) {
            return f.getTweensOf(e, !0).length > 0
        },
        defaults: function(e) {
            return e && e.ease && (e.ease = Ft(e.ease, H.ease)), De(H, e || {})
        },
        config: function(e) {
            return De(F, e || {})
        },
        registerEffect: function(e) {
            var t = e.name,
                n = e.effect,
                i = e.plugins,
                r = e.defaults,
                o = e.extendTimeline;
            (i || "").split(",").forEach((function(e) {
                return e && !be[e] && !ce[e] && fe()
            })), _e[t] = function(e, t, i) {
                return n(ct(e), Ne(t || {}, r), i)
            }, o && (Wt.prototype[t] = function(e, n, i) {
                return this.add(_e[t](e, Z(n) ? n : (i = n) && {}, this), i)
            })
        },
        registerEase: function(e, t) {
            Lt[e] = Ft(t)
        },
        parseEase: function(e, t) {
            return arguments.length ? Ft(e, t) : Lt
        },
        getById: function(e) {
            return f.getById(e)
        },
        exportRoot: function(e, t) {
            void 0 === e && (e = {});
            var n, i, r = new Wt(e);
            for (r.smoothChildTiming = J(e.smoothChildTiming), f.remove(r), r._dp = 0, r._time = r._tTime = f._time, n = f._first; n;) i = n._next, !t && !n._dur && n instanceof tn && n.vars.onComplete === n._targets[0] || Ke(r, n, n._start - n._delay), n = i;
            return Ke(f, r, 0), r
        },
        utils: {
            wrap: function e(t, n, i) {
                var r = n - t;
                return ne(t) ? gt(t, e(0, t.length), n) : rt(i, (function(e) {
                    return (r + (e - t) % r) % r + t
                }))
            },
            wrapYoyo: function e(t, n, i) {
                var r = n - t,
                    o = 2 * r;
                return ne(t) ? gt(t, e(0, t.length - 1), n) : rt(i, (function(e) {
                    return t + ((e = (o + (e - t) % o) % o || 0) > r ? o - e : e)
                }))
            },
            distribute: ht,
            random: mt,
            snap: pt,
            normalize: function(e, t, n) {
                return yt(e, t, 0, 1, n)
            },
            getUnit: at,
            clamp: function(e, t, n) {
                return rt(n, (function(n) {
                    return ot(e, t, n)
                }))
            },
            splitColor: At,
            toArray: ct,
            mapRange: yt,
            pipe: function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return function(e) {
                    return t.reduce((function(e, t) {
                        return t(e)
                    }), e)
                }
            },
            unitize: function(e, t) {
                return function(n) {
                    return e(parseFloat(n)) + (t || at(n))
                }
            },
            interpolate: function e(t, n, i, r) {
                var o = isNaN(t + n) ? 0 : function(e) {
                    return (1 - e) * t + e * n
                };
                if (!o) {
                    var a, s, l, u, c, d = X(t),
                        h = {};
                    if (!0 === i && (r = 1) && (i = null), d) t = {
                        p: t
                    }, n = {
                        p: n
                    };
                    else if (ne(t) && !ne(n)) {
                        for (l = [], u = t.length, c = u - 2, s = 1; s < u; s++) l.push(e(t[s - 1], t[s]));
                        u--, o = function(e) {
                            e *= u;
                            var t = Math.min(c, ~~e);
                            return l[t](e - t)
                        }, i = n
                    } else r || (t = $e(ne(t) ? [] : {}, t));
                    if (!l) {
                        for (a in n) Yt.call(h, t, a, "get", n[a]);
                        o = function(e) {
                            return dn(e, h) || (d ? t.p : t)
                        }
                    }
                }
                return rt(i, o)
            },
            shuffle: dt
        },
        install: he,
        effects: _e,
        ticker: It,
        updateRoot: Wt.updateRoot,
        plugins: be,
        globalTimeline: f,
        core: {
            PropTween: gn,
            globals: pe,
            Tween: tn,
            Timeline: Wt,
            Animation: Vt,
            getCache: Ae,
            _removeLinkedListItem: Ue
        }
    };
    Ee("to,from,fromTo,delayedCall,set,killTweensOf", (function(e) {
        return vn[e] = tn[e]
    })), It.add(Wt.updateRoot), b = vn.to({}, {
        duration: 0
    });
    var yn = function(e, t) {
            for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;) n = n._next;
            return n
        },
        bn = function(e, t) {
            return {
                name: e,
                rawVars: 1,
                init: function(e, n, i) {
                    i._onInit = function(e) {
                        var i, r;
                        if (X(n) && (i = {}, Ee(n, (function(e) {
                                return i[e] = 1
                            })), n = i), t) {
                            for (r in i = {}, n) i[r] = t(n[r]);
                            n = i
                        }! function(e, t) {
                            var n, i, r, o = e._targets;
                            for (n in t)
                                for (i = o.length; i--;)(r = e._ptLookup[i][n]) && (r = r.d) && (r._pt && (r = yn(r, n)), r && r.modifier && r.modifier(t[n], e, o[i], n))
                        }(e, n)
                    }
                }
            }
        },
        _n = vn.registerPlugin({
            name: "attr",
            init: function(e, t, n, i, r) {
                var o, a;
                for (o in t)(a = this.add(e, "setAttribute", (e.getAttribute(o) || 0) + "", t[o], i, r, 0, 0, o)) && (a.op = o), this._props.push(o)
            }
        }, {
            name: "endArray",
            init: function(e, t) {
                for (var n = t.length; n--;) this.add(e, n, e[n] || 0, t[n])
            }
        }, bn("roundProps", ft), bn("modifiers"), bn("snap", pt)) || vn;
    tn.version = Wt.version = _n.version = "3.4.2", v = 1, ee() && Mt();
    Lt.Power0, Lt.Power1, Lt.Power2, Lt.Power3, Lt.Power4;
    var wn = Lt.Linear,
        Tn = Lt.Quad,
        kn = (Lt.Cubic, Lt.Quart),
        xn = Lt.Quint;
    Lt.Strong, Lt.Elastic, Lt.Back, Lt.SteppedEase, Lt.Bounce, Lt.Sine, Lt.Expo, Lt.Circ;

    function An(e) {
        return (An = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    /*!
     * CSSPlugin 3.4.2
     * https://greensock.com
     *
     * Copyright 2008-2020, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var Sn, En, On, Cn, Pn, In, Mn, Ln, Rn = {},
        Nn = 180 / Math.PI,
        jn = Math.PI / 180,
        $n = Math.atan2,
        Dn = /([A-Z])/g,
        Fn = /(?:left|right|width|margin|padding|x)/i,
        Hn = /[\s,\(]\S/,
        Un = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        qn = function(e, t) {
            return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
        },
        Bn = function(e, t) {
            return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
        },
        zn = function(e, t) {
            return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t)
        },
        Vn = function(e, t) {
            var n = t.s + t.c * e;
            t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t)
        },
        Wn = function(e, t) {
            return t.set(t.t, t.p, e ? t.e : t.b, t)
        },
        Gn = function(e, t) {
            return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t)
        },
        Xn = function(e, t, n) {
            return e.style[t] = n
        },
        Yn = function(e, t, n) {
            return e.style.setProperty(t, n)
        },
        Qn = function(e, t, n) {
            return e._gsap[t] = n
        },
        Kn = function(e, t, n) {
            return e._gsap.scaleX = e._gsap.scaleY = n
        },
        Zn = function(e, t, n, i, r) {
            var o = e._gsap;
            o.scaleX = o.scaleY = n, o.renderTransform(r, o)
        },
        Jn = function(e, t, n, i, r) {
            var o = e._gsap;
            o[t] = n, o.renderTransform(r, o)
        },
        ei = "transform",
        ti = ei + "Origin",
        ni = function(e, t) {
            var n = En.createElementNS ? En.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : En.createElement(e);
            return n.style ? n : En.createElement(e)
        },
        ii = function e(t, n, i) {
            var r = getComputedStyle(t);
            return r[n] || r.getPropertyValue(n.replace(Dn, "-$1").toLowerCase()) || r.getPropertyValue(n) || !i && e(t, oi(n) || n, 1) || ""
        },
        ri = "O,Moz,ms,Ms,Webkit".split(","),
        oi = function(e, t, n) {
            var i = (t || Pn).style,
                r = 5;
            if (e in i && !n) return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1); r-- && !(ri[r] + e in i););
            return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? ri[r] : "") + e
        },
        ai = function() {
            "undefined" != typeof window && window.document && (Sn = window, En = Sn.document, On = En.documentElement, Pn = ni("div") || {
                style: {}
            }, In = ni("div"), ei = oi(ei), ti = ei + "Origin", Pn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ln = !!oi("perspective"), Cn = 1)
        },
        si = function e(t) {
            var n, i = ni("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                r = this.parentNode,
                o = this.nextSibling,
                a = this.style.cssText;
            if (On.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                n = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e
            } catch (e) {} else this._gsapBBox && (n = this._gsapBBox());
            return r && (o ? r.insertBefore(this, o) : r.appendChild(this)), On.removeChild(i), this.style.cssText = a, n
        },
        li = function(e, t) {
            for (var n = t.length; n--;)
                if (e.hasAttribute(t[n])) return e.getAttribute(t[n])
        },
        ui = function(e) {
            var t;
            try {
                t = e.getBBox()
            } catch (n) {
                t = si.call(e, !0)
            }
            return t && (t.width || t.height) || e.getBBox === si || (t = si.call(e, !0)), !t || t.width || t.x || t.y ? t : {
                x: +li(e, ["x", "cx", "x1"]) || 0,
                y: +li(e, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            }
        },
        ci = function(e) {
            return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !ui(e))
        },
        di = function(e, t) {
            if (t) {
                var n = e.style;
                t in Rn && t !== ti && (t = ei), n.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), n.removeProperty(t.replace(Dn, "-$1").toLowerCase())) : n.removeAttribute(t)
            }
        },
        hi = function(e, t, n, i, r, o) {
            var a = new gn(e._pt, t, n, 0, 1, o ? Gn : Wn);
            return e._pt = a, a.b = i, a.e = r, e._props.push(n), a
        },
        fi = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        pi = function e(t, n, i, r) {
            var o, a, s, l, u = parseFloat(i) || 0,
                c = (i + "").trim().substr((u + "").length) || "px",
                d = Pn.style,
                h = Fn.test(n),
                f = "svg" === t.tagName.toLowerCase(),
                p = (f ? "client" : "offset") + (h ? "Width" : "Height"),
                m = "px" === r,
                g = "%" === r;
            return r === c || !u || fi[r] || fi[c] ? u : ("px" !== c && !m && (u = e(t, n, i, "px")), l = t.getCTM && ci(t), g && (Rn[n] || ~n.indexOf("adius")) ? Oe(u / (l ? t.getBBox()[h ? "width" : "height"] : t[p]) * 100) : (d[h ? "width" : "height"] = 100 + (m ? c : r), a = ~n.indexOf("adius") || "em" === r && t.appendChild && !f ? t : t.parentNode, l && (a = (t.ownerSVGElement || {}).parentNode), a && a !== En && a.appendChild || (a = En.body), (s = a._gsap) && g && s.width && h && s.time === It.time ? Oe(u / s.width * 100) : ((g || "%" === c) && (d.position = ii(t, "position")), a === t && (d.position = "static"), a.appendChild(Pn), o = Pn[p], a.removeChild(Pn), d.position = "absolute", h && g && ((s = Ae(a)).time = It.time, s.width = a[p]), Oe(m ? o * u / 100 : o && u ? 100 / o * u : 0))))
        },
        mi = function(e, t, n, i) {
            var r;
            return Cn || ai(), t in Un && "transform" !== t && ~(t = Un[t]).indexOf(",") && (t = t.split(",")[0]), Rn[t] && "transform" !== t ? (r = Ei(e, i), r = "transformOrigin" !== t ? r[t] : Oi(ii(e, ti)) + " " + r.zOrigin + "px") : (!(r = e.style[t]) || "auto" === r || i || ~(r + "").indexOf("calc(")) && (r = _i[t] && _i[t](e, t, n) || ii(e, t) || Se(e, t) || ("opacity" === t ? 1 : 0)), n && !~(r + "").indexOf(" ") ? pi(e, t, r, n) + n : r
        },
        gi = function(e, t, n, i) {
            if (!n || "none" === n) {
                var r = oi(t, e, 1),
                    o = r && ii(e, r, 1);
                o && o !== n ? (t = r, n = o) : "borderColor" === t && (n = ii(e, "borderTopColor"))
            }
            var a, s, l, u, c, d, h, f, p, m, g, v, y = new gn(this._pt, e.style, t, 0, 1, cn),
                b = 0,
                _ = 0;
            if (y.b = n, y.e = i, n += "", "auto" === (i += "") && (e.style[t] = i, i = ii(e, t) || i, e.style[t] = n), Pt(a = [n, i]), i = a[1], l = (n = a[0]).match(oe) || [], (i.match(oe) || []).length) {
                for (; s = oe.exec(i);) h = s[0], p = i.substring(b, s.index), c ? c = (c + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (c = 1), h !== (d = l[_++] || "") && (u = parseFloat(d) || 0, g = d.substr((u + "").length), (v = "=" === h.charAt(1) ? +(h.charAt(0) + "1") : 0) && (h = h.substr(2)), f = parseFloat(h), m = h.substr((f + "").length), b = oe.lastIndex - m.length, m || (m = m || F.units[t] || g, b === i.length && (i += m, y.e += m)), g !== m && (u = pi(e, t, d, m) || 0), y._pt = {
                    _next: y._pt,
                    p: p || 1 === _ ? p : ",",
                    s: u,
                    c: v ? v * f : f - u,
                    m: c && c < 4 ? Math.round : 0
                });
                y.c = b < i.length ? i.substring(b, i.length) : ""
            } else y.r = "display" === t && "none" === i ? Gn : Wn;
            return le.test(i) && (y.e = 0), this._pt = y, y
        },
        vi = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        yi = function(e) {
            var t = e.split(" "),
                n = t[0],
                i = t[1] || "50%";
            return "top" !== n && "bottom" !== n && "left" !== i && "right" !== i || (e = n, n = i, i = e), t[0] = vi[n] || n, t[1] = vi[i] || i, t.join(" ")
        },
        bi = function(e, t) {
            if (t.tween && t.tween._time === t.tween._dur) {
                var n, i, r, o = t.t,
                    a = o.style,
                    s = t.u,
                    l = o._gsap;
                if ("all" === s || !0 === s) a.cssText = "", i = 1;
                else
                    for (r = (s = s.split(",")).length; --r > -1;) n = s[r], Rn[n] && (i = 1, n = "transformOrigin" === n ? ti : ei), di(o, n);
                i && (di(o, ei), l && (l.svg && o.removeAttribute("transform"), Ei(o, 1), l.uncache = 1))
            }
        },
        _i = {
            clearProps: function(e, t, n, i, r) {
                if ("isFromStart" !== r.data) {
                    var o = e._pt = new gn(e._pt, t, n, 0, 0, bi);
                    return o.u = i, o.pr = -10, o.tween = r, e._props.push(n), 1
                }
            }
        },
        wi = [1, 0, 0, 1, 0, 0],
        Ti = {},
        ki = function(e) {
            return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e
        },
        xi = function(e) {
            var t = ii(e, ei);
            return ki(t) ? wi : t.substr(7).match(re).map(Oe)
        },
        Ai = function(e, t) {
            var n, i, r, o, a = e._gsap || Ae(e),
                s = e.style,
                l = xi(e);
            return a.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(r = e.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",") ? wi : l : (l !== wi || e.offsetParent || e === On || a.svg || (r = s.display, s.display = "block", (n = e.parentNode) && e.offsetParent || (o = 1, i = e.nextSibling, On.appendChild(e)), l = xi(e), r ? s.display = r : di(e, "display"), o && (i ? n.insertBefore(e, i) : n ? n.appendChild(e) : On.removeChild(e))), t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
        },
        Si = function(e, t, n, i, r, o) {
            var a, s, l, u = e._gsap,
                c = r || Ai(e, !0),
                d = u.xOrigin || 0,
                h = u.yOrigin || 0,
                f = u.xOffset || 0,
                p = u.yOffset || 0,
                m = c[0],
                g = c[1],
                v = c[2],
                y = c[3],
                b = c[4],
                _ = c[5],
                w = t.split(" "),
                T = parseFloat(w[0]) || 0,
                k = parseFloat(w[1]) || 0;
            n ? c !== wi && (s = m * y - g * v) && (l = T * (-g / s) + k * (m / s) - (m * _ - g * b) / s, T = T * (y / s) + k * (-v / s) + (v * _ - y * b) / s, k = l) : (T = (a = ui(e)).x + (~w[0].indexOf("%") ? T / 100 * a.width : T), k = a.y + (~(w[1] || w[0]).indexOf("%") ? k / 100 * a.height : k)), i || !1 !== i && u.smooth ? (b = T - d, _ = k - h, u.xOffset = f + (b * m + _ * v) - b, u.yOffset = p + (b * g + _ * y) - _) : u.xOffset = u.yOffset = 0, u.xOrigin = T, u.yOrigin = k, u.smooth = !!i, u.origin = t, u.originIsAbsolute = !!n, e.style[ti] = "0px 0px", o && (hi(o, u, "xOrigin", d, T), hi(o, u, "yOrigin", h, k), hi(o, u, "xOffset", f, u.xOffset), hi(o, u, "yOffset", p, u.yOffset)), e.setAttribute("data-svg-origin", T + " " + k)
        },
        Ei = function(e, t) {
            var n = e._gsap || new zt(e);
            if ("x" in n && !t && !n.uncache) return n;
            var i, r, o, a, s, l, u, c, d, h, f, p, m, g, v, y, b, _, w, T, k, x, A, S, E, O, C, P, I, M, L, R, N = e.style,
                j = n.scaleX < 0,
                $ = ii(e, ti) || "0";
            return i = r = o = l = u = c = d = h = f = 0, a = s = 1, n.svg = !(!e.getCTM || !ci(e)), g = Ai(e, n.svg), n.svg && (S = !n.uncache && e.getAttribute("data-svg-origin"), Si(e, S || $, !!S || n.originIsAbsolute, !1 !== n.smooth, g)), p = n.xOrigin || 0, m = n.yOrigin || 0, g !== wi && (_ = g[0], w = g[1], T = g[2], k = g[3], i = x = g[4], r = A = g[5], 6 === g.length ? (a = Math.sqrt(_ * _ + w * w), s = Math.sqrt(k * k + T * T), l = _ || w ? $n(w, _) * Nn : 0, (d = T || k ? $n(T, k) * Nn + l : 0) && (s *= Math.cos(d * jn)), n.svg && (i -= p - (p * _ + m * T), r -= m - (p * w + m * k))) : (R = g[6], M = g[7], C = g[8], P = g[9], I = g[10], L = g[11], i = g[12], r = g[13], o = g[14], u = (v = $n(R, I)) * Nn, v && (S = x * (y = Math.cos(-v)) + C * (b = Math.sin(-v)), E = A * y + P * b, O = R * y + I * b, C = x * -b + C * y, P = A * -b + P * y, I = R * -b + I * y, L = M * -b + L * y, x = S, A = E, R = O), c = (v = $n(-T, I)) * Nn, v && (y = Math.cos(-v), L = k * (b = Math.sin(-v)) + L * y, _ = S = _ * y - C * b, w = E = w * y - P * b, T = O = T * y - I * b), l = (v = $n(w, _)) * Nn, v && (S = _ * (y = Math.cos(v)) + w * (b = Math.sin(v)), E = x * y + A * b, w = w * y - _ * b, A = A * y - x * b, _ = S, x = E), u && Math.abs(u) + Math.abs(l) > 359.9 && (u = l = 0, c = 180 - c), a = Oe(Math.sqrt(_ * _ + w * w + T * T)), s = Oe(Math.sqrt(A * A + R * R)), v = $n(x, A), d = Math.abs(v) > 2e-4 ? v * Nn : 0, f = L ? 1 / (L < 0 ? -L : L) : 0), n.svg && (S = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !ki(ii(e, ei)), S && e.setAttribute("transform", S))), Math.abs(d) > 90 && Math.abs(d) < 270 && (j ? (a *= -1, d += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (s *= -1, d += d <= 0 ? 180 : -180)), n.x = ((n.xPercent = i && Math.round(e.offsetWidth / 2) === Math.round(-i) ? -50 : 0) ? 0 : i) + "px", n.y = ((n.yPercent = r && Math.round(e.offsetHeight / 2) === Math.round(-r) ? -50 : 0) ? 0 : r) + "px", n.z = o + "px", n.scaleX = Oe(a), n.scaleY = Oe(s), n.rotation = Oe(l) + "deg", n.rotationX = Oe(u) + "deg", n.rotationY = Oe(c) + "deg", n.skewX = d + "deg", n.skewY = h + "deg", n.transformPerspective = f + "px", (n.zOrigin = parseFloat($.split(" ")[2]) || 0) && (N[ti] = Oi($)), n.xOffset = n.yOffset = 0, n.force3D = F.force3D, n.renderTransform = n.svg ? Mi : Ln ? Ii : Pi, n.uncache = 0, n
        },
        Oi = function(e) {
            return (e = e.split(" "))[0] + " " + e[1]
        },
        Ci = function(e, t, n) {
            var i = at(t);
            return Oe(parseFloat(t) + parseFloat(pi(e, "x", n + "px", i))) + i
        },
        Pi = function(e, t) {
            t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Ii(e, t)
        },
        Ii = function(e, t) {
            var n = t || this,
                i = n.xPercent,
                r = n.yPercent,
                o = n.x,
                a = n.y,
                s = n.z,
                l = n.rotation,
                u = n.rotationY,
                c = n.rotationX,
                d = n.skewX,
                h = n.skewY,
                f = n.scaleX,
                p = n.scaleY,
                m = n.transformPerspective,
                g = n.force3D,
                v = n.target,
                y = n.zOrigin,
                b = "",
                _ = "auto" === g && e && 1 !== e || !0 === g;
            if (y && ("0deg" !== c || "0deg" !== u)) {
                var w, T = parseFloat(u) * jn,
                    k = Math.sin(T),
                    x = Math.cos(T);
                T = parseFloat(c) * jn, w = Math.cos(T), o = Ci(v, o, k * w * -y), a = Ci(v, a, -Math.sin(T) * -y), s = Ci(v, s, x * w * -y + y)
            }
            "0px" !== m && (b += "perspective(" + m + ") "), (i || r) && (b += "translate(" + i + "%, " + r + "%) "), (_ || "0px" !== o || "0px" !== a || "0px" !== s) && (b += "0px" !== s || _ ? "translate3d(" + o + ", " + a + ", " + s + ") " : "translate(" + o + ", " + a + ") "), "0deg" !== l && (b += "rotate(" + l + ") "), "0deg" !== u && (b += "rotateY(" + u + ") "), "0deg" !== c && (b += "rotateX(" + c + ") "), "0deg" === d && "0deg" === h || (b += "skew(" + d + ", " + h + ") "), 1 === f && 1 === p || (b += "scale(" + f + ", " + p + ") "), v.style[ei] = b || "translate(0, 0)"
        },
        Mi = function(e, t) {
            var n, i, r, o, a, s = t || this,
                l = s.xPercent,
                u = s.yPercent,
                c = s.x,
                d = s.y,
                h = s.rotation,
                f = s.skewX,
                p = s.skewY,
                m = s.scaleX,
                g = s.scaleY,
                v = s.target,
                y = s.xOrigin,
                b = s.yOrigin,
                _ = s.xOffset,
                w = s.yOffset,
                T = s.forceCSS,
                k = parseFloat(c),
                x = parseFloat(d);
            h = parseFloat(h), f = parseFloat(f), (p = parseFloat(p)) && (f += p = parseFloat(p), h += p), h || f ? (h *= jn, f *= jn, n = Math.cos(h) * m, i = Math.sin(h) * m, r = Math.sin(h - f) * -g, o = Math.cos(h - f) * g, f && (p *= jn, a = Math.tan(f - p), r *= a = Math.sqrt(1 + a * a), o *= a, p && (a = Math.tan(p), n *= a = Math.sqrt(1 + a * a), i *= a)), n = Oe(n), i = Oe(i), r = Oe(r), o = Oe(o)) : (n = m, o = g, i = r = 0), (k && !~(c + "").indexOf("px") || x && !~(d + "").indexOf("px")) && (k = pi(v, "x", c, "px"), x = pi(v, "y", d, "px")), (y || b || _ || w) && (k = Oe(k + y - (y * n + b * r) + _), x = Oe(x + b - (y * i + b * o) + w)), (l || u) && (a = v.getBBox(), k = Oe(k + l / 100 * a.width), x = Oe(x + u / 100 * a.height)), a = "matrix(" + n + "," + i + "," + r + "," + o + "," + k + "," + x + ")", v.setAttribute("transform", a), T && (v.style[ei] = a)
        },
        Li = function(e, t, n, i, r, o) {
            var a, s, l = X(r),
                u = parseFloat(r) * (l && ~r.indexOf("rad") ? Nn : 1),
                c = o ? u * o : u - i,
                d = i + c + "deg";
            return l && ("short" === (a = r.split("_")[1]) && (c %= 360) !== c % 180 && (c += c < 0 ? 360 : -360), "cw" === a && c < 0 ? c = (c + 36e9) % 360 - 360 * ~~(c / 360) : "ccw" === a && c > 0 && (c = (c - 36e9) % 360 - 360 * ~~(c / 360))), e._pt = s = new gn(e._pt, t, n, i, c, Bn), s.e = d, s.u = "deg", e._props.push(n), s
        },
        Ri = function(e, t, n) {
            var i, r, o, a, s, l, u, c = In.style,
                d = n._gsap;
            for (r in c.cssText = getComputedStyle(n).cssText + ";position:absolute;display:block;", c[ei] = t, En.body.appendChild(In), i = Ei(In, 1), Rn)(o = d[r]) !== (a = i[r]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (s = at(o) !== (u = at(a)) ? pi(n, r, o, u) : parseFloat(o), l = parseFloat(a), e._pt = new gn(e._pt, d, r, s, l - s, qn), e._pt.u = u || 0, e._props.push(r));
            En.body.removeChild(In)
        };
    Ee("padding,margin,Width,Radius", (function(e, t) {
        var n = "Top",
            i = "Right",
            r = "Bottom",
            o = "Left",
            a = (t < 3 ? [n, i, r, o] : [n + o, n + i, r + i, r + o]).map((function(n) {
                return t < 2 ? e + n : "border" + n + e
            }));
        _i[t > 1 ? "border" + e : e] = function(e, t, n, i, r) {
            var o, s;
            if (arguments.length < 4) return o = a.map((function(t) {
                return mi(e, t, n)
            })), 5 === (s = o.join(" ")).split(o[0]).length ? o[0] : s;
            o = (i + "").split(" "), s = {}, a.forEach((function(e, t) {
                return s[e] = o[t] = o[t] || o[(t - 1) / 2 | 0]
            })), e.init(t, s, r)
        }
    }));
    var Ni, ji, $i = {
        name: "css",
        register: ai,
        targetTest: function(e) {
            return e.style && e.nodeType
        },
        init: function(e, t, n, i, r) {
            var o, a, s, l, u, c, d, h, f, p, m, g, v, y, b, _ = this._props,
                w = e.style;
            for (d in Cn || ai(), t)
                if ("autoRound" !== d && (a = t[d], !be[d] || !Qt(d, t, n, i, e, r)))
                    if (u = An(a), c = _i[d], "function" === u && (u = An(a = a.call(n, i, e, r))), "string" === u && ~a.indexOf("random(") && (a = vt(a)), c) c(this, e, d, a, n) && (b = 1);
                    else if ("--" === d.substr(0, 2)) this.add(w, "setProperty", getComputedStyle(e).getPropertyValue(d) + "", a + "", i, r, 0, 0, d);
            else {
                if (o = mi(e, d), l = parseFloat(o), (p = "string" === u && "=" === a.charAt(1) ? +(a.charAt(0) + "1") : 0) && (a = a.substr(2)), s = parseFloat(a), d in Un && ("autoAlpha" === d && (1 === l && "hidden" === mi(e, "visibility") && s && (l = 0), hi(this, w, "visibility", l ? "inherit" : "hidden", s ? "inherit" : "hidden", !s)), "scale" !== d && "transform" !== d && ~(d = Un[d]).indexOf(",") && (d = d.split(",")[0])), m = d in Rn)
                    if (g || ((v = e._gsap).renderTransform || Ei(e), y = !1 !== t.smoothOrigin && v.smooth, (g = this._pt = new gn(this._pt, w, ei, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), "scale" === d) this._pt = new gn(this._pt, v, "scaleY", v.scaleY, p ? p * s : s - v.scaleY), _.push("scaleY", d), d += "X";
                    else {
                        if ("transformOrigin" === d) {
                            a = yi(a), v.svg ? Si(e, a, 0, y, 0, this) : ((f = parseFloat(a.split(" ")[2]) || 0) !== v.zOrigin && hi(this, v, "zOrigin", v.zOrigin, f), hi(this, w, d, Oi(o), Oi(a)));
                            continue
                        }
                        if ("svgOrigin" === d) {
                            Si(e, a, 1, y, 0, this);
                            continue
                        }
                        if (d in Ti) {
                            Li(this, v, d, l, a, p);
                            continue
                        }
                        if ("smoothOrigin" === d) {
                            hi(this, v, "smooth", v.smooth, a);
                            continue
                        }
                        if ("force3D" === d) {
                            v[d] = a;
                            continue
                        }
                        if ("transform" === d) {
                            Ri(this, a, e);
                            continue
                        }
                    }
                else d in w || (d = oi(d) || d);
                if (m || (s || 0 === s) && (l || 0 === l) && !Hn.test(a) && d in w) s || (s = 0), (h = (o + "").substr((l + "").length)) !== (f = (a + "").substr((s + "").length) || (d in F.units ? F.units[d] : h)) && (l = pi(e, d, o, f)), this._pt = new gn(this._pt, m ? v : w, d, l, p ? p * s : s - l, "px" !== f || !1 === t.autoRound || m ? qn : Vn), this._pt.u = f || 0, h !== f && (this._pt.b = o, this._pt.r = zn);
                else if (d in w) gi.call(this, e, d, o, a);
                else {
                    if (!(d in e)) continue;
                    this.add(e, d, e[d], a, i, r)
                }
                _.push(d)
            }
            b && mn(this)
        },
        get: mi,
        aliases: Un,
        getSetter: function(e, t, n) {
            var i = Un[t];
            return i && i.indexOf(",") < 0 && (t = i), t in Rn && t !== ti && (e._gsap.x || mi(e, "x")) ? n && Mn === n ? "scale" === t ? Kn : Qn : (Mn = n || {}) && ("scale" === t ? Zn : Jn) : e.style && !K(e.style[t]) ? Xn : ~t.indexOf("-") ? Yn : sn(e, t)
        },
        core: {
            _removeProperty: di,
            _getMatrix: Ai
        }
    };
    _n.utils.checkPrefix = oi, ji = Ee("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (Ni = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(e) {
        Rn[e] = 1
    })), Ee(Ni, (function(e) {
        F.units[e] = "deg", Ti[e] = 1
    })), Un[ji[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Ni, Ee("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(e) {
        var t = e.split(":");
        Un[t[1]] = ji[t[0]]
    })), Ee("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(e) {
        F.units[e] = "px"
    })), _n.registerPlugin($i);
    var Di, Fi, Hi, Ui, qi = _n.registerPlugin($i) || _n,
        Bi = (qi.core.Tween, function() {
            return "undefined" != typeof window
        }),
        zi = function() {
            return Di || Bi() && (Di = window.gsap) && Di.registerPlugin && Di
        },
        Vi = function() {
            return Fi || Wi(), Fi
        },
        Wi = function(e) {
            Di = e || zi(), Bi() && (window, Hi = document), Di && (Ui = Di.plugins.css) && (Fi = 1)
        },
        Gi = {
            version: "3.4.2",
            name: "cssRule",
            init: function(e, t, n, i, r) {
                if (!Vi() || void 0 === e.cssText) return !1;
                var o = e._gsProxy = e._gsProxy || Hi.createElement("div");
                this.ss = e, this.style = o.style, o.style.cssText = e.cssText, Ui.prototype.init.call(this, o, t, n, i, r)
            },
            render: function(e, t) {
                for (var n, i = t._pt, r = t.style, o = t.ss; i;) i.r(e, i.d), i = i._next;
                for (n = r.length; --n > -1;) o[r[n]] = r[r[n]]
            },
            getRule: function(e) {
                Vi();
                var t, n, i, r, o = Hi.all ? "rules" : "cssRules",
                    a = Hi.styleSheets,
                    s = a.length,
                    l = ":" === e.charAt(0);
                for (e = (l ? "" : ",") + e.split("::").join(":").toLowerCase() + ",", l && (r = []); s--;) {
                    try {
                        if (!(n = a[s][o])) continue;
                        t = n.length
                    } catch (e) {
                        continue
                    }
                    for (; --t > -1;)
                        if ((i = n[t]).selectorText && -1 !== ("," + i.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(e)) {
                            if (!l) return i.style;
                            r.push(i.style)
                        }
                }
                return r
            },
            register: Wi
        };
    /*!
     * CSSRulePlugin 3.4.2
     * https://greensock.com
     *
     * @license Copyright 2008-2020, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    zi() && Di.registerPlugin(Gi);
    var Xi = n(1),
        Yi = n.n(Xi),
        Qi = !0,
        Ki = document.querySelector("#app");

    function Zi() {
        Qi = !0, $("#btnLayerNext").removeClass("blink")
    }

    function Ji() {
        Qi = !1
    }
    $("#showCaseInfo ul li a").on("click", (function(e) {
        e.preventDefault();
        var t = $(this).attr("href");
        $("#showCaseInfo").removeClass("is-active"), $(".visual-block").attr("style", ""), "__#event" == t ? $("#eventLayer").addClass("is-active") : window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PAGE", {
            detail: t
        }))
    }));
    var er = null,
        tr = $("#btnLayerNext");

    function nr(e) {
        "active" == e.attr("data-status") && (clearTimeout(er), er = null, tr.removeClass("blink"), er = setTimeout((function() {
            tr.addClass("blink")
        }), 10))
    }

    function ir(e) {
        qi.set("#app .app-progress-bar", {
            scaleX: e
        })
    }

    function rr() {
        qi.set("#app .app-progress-bar", {
            scaleX: 0
        })
    }
    tr.on("animationend", (function() {
        tr.removeClass("blink")
    })), qi.set("#app .app-progress-bar", {
        scaleX: 0
    }), rr();
    var or, ar, sr = !1;

    function lr(e) {
        sr && function() {
            or && (clearTimeout(or), or = null);
            var e = $(' .page[data-status="active" ]'),
                t = e.attr("data-duration") && e.attr("data-duration") > 0 ? e.attr("data-duration") : 4e3;
            or = setTimeout((function() {
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
            }), t)
        }()
    }
    var ur = 0;

    function cr(e) {
        qi.set("#cover .back", {
            alpha: 0
        }), qi.set("#cover .fog1", {
            backgroundPosition: "0% 0%"
        }), qi.set("#cover .fog2", {
            backgroundPosition: "100% 0%"
        }), qi.set("#cover .showcase span", {
            y: "20%",
            alpha: 0
        }), qi.set("#cover .slogan p", {
            y: "20%",
            alpha: 0
        }), qi.set("#cover .logo img", {
            alpha: 0
        }), ar && (clearInterval(ar), ar = null)
    }

    function dr(e) {
        qi.killTweensOf("#cover .back"), qi.killTweensOf("#cover .showcase span"), qi.killTweensOf("#cover .slogan p"), qi.killTweensOf("#cover .logo img")
    }

    function hr(e) {
        ur = 0;
        var t = new Wt({
            onComplete: gr,
            onUpdate: function() {
                ir(t.totalTime() / t.totalDuration())
            }
        });
        t.to("#cover .back", { alpha: 1, duration: 2, stagger: .2 }, 0)
        t.to("#cover .showcase span", {
            alpha: 1,
            y: "0%",
            duration: 1.4,
            ease: xn.easeOut
        }, .2), t.to("#cover .logo1 img", {
            alpha: 1,
            y: "0%",
            duration: 1.4,
            ease: xn.easeOut
        }, .4), t.to("#cover .slogan p", {
            alpha: 1,
            y: "0%",
            duration: 1.4,
            stagger: .2,
            ease: xn.easeOut
        }, .6), t.to("#cover .logo1 img", {
            alpha: 0,
            y: "0%",
            duration: 1.4,
            ease: xn.easeOut
        }, 2), t.fromTo("#cover .logo2 .top", {
            alpha: 0,
            x: "20%"
        }, {
            alpha: 1,
            x: "0%",
            duration: 1,
            ease: xn.easeInOut
        }, 2.4), t.fromTo("#cover .logo2 .bottom", {
            alpha: 0,
            y: "-5%"
        }, {
            alpha: 1,
            y: "0%",
            duration: 1,
            ease: xn.easeInOut,
            onComplete: fr
        }, 2.8), qi.to("#cover .fog1", {
            backgroundPosition: "100% 0%",
            ease: Tn.easeInOut,
            duration: 20,
            yoyo: !0,
            repeat: -1
        }), qi.to("#cover .fog2", {
            backgroundPosition: "0% 0%",
            ease: Tn.easeInOut,
            duration: 20,
            yoyo: !0,
            repeat: -1
        })
    }

    function fr() {
        ar = setInterval((function() {
            ur % 2 == 0 ? (qi.to("#cover .logo1 img", {
                alpha: 1,
                duration: .5
            }), qi.to("#cover .logo2 img", {
                alpha: 0,
                duration: .5
            })) : (qi.to("#cover .logo2 img", {
                alpha: 1,
                duration: .5
            }), qi.to("#cover .logo1 img", {
                alpha: 0,
                duration: .5
            })), ur++
        }), 2400)
    }

    function pr(e) {
        return !0
    }

    function mr(e) {
        return !0
    }

    function gr() {
        "active" == $(".page#cover").attr("data-status") && (nr($(".page#cover")), lr())
    }
    "object" == typeof navigator && function() {
        if ("undefined" != typeof window) try {
            var e = new window.CustomEvent("test", {
                cancelable: !0
            });
            if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
        } catch (e) {
            var t = function(e, t) {
                var n, i;
                return (t = t || {}).bubbles = !!t.bubbles, t.cancelable = !!t.cancelable, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i = n.preventDefault, n.preventDefault = function() {
                    i.call(this);
                    try {
                        Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        })
                    } catch (e) {
                        this.defaultPrevented = !0
                    }
                }, n
            };
            t.prototype = window.Event.prototype, window.CustomEvent = t
        }
    }();
    var vr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function yr(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var br = function(e) {
            return e && e.Math == Math && e
        },
        _r = br("object" == typeof globalThis && globalThis) || br("object" == typeof window && window) || br("object" == typeof self && self) || br("object" == typeof vr && vr) || Function("return this")(),
        wr = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        },
        Tr = !wr((function() {
            return 7 != Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })),
        kr = {}.propertyIsEnumerable,
        xr = Object.getOwnPropertyDescriptor,
        Ar = {
            f: xr && !kr.call({
                1: 2
            }, 1) ? function(e) {
                var t = xr(this, e);
                return !!t && t.enumerable
            } : kr
        },
        Sr = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        Er = {}.toString,
        Or = function(e) {
            return Er.call(e).slice(8, -1)
        },
        Cr = "".split,
        Pr = wr((function() {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function(e) {
            return "String" == Or(e) ? Cr.call(e, "") : Object(e)
        } : Object,
        Ir = function(e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e
        },
        Mr = function(e) {
            return Pr(Ir(e))
        },
        Lr = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        Rr = function(e, t) {
            if (!Lr(e)) return e;
            var n, i;
            if (t && "function" == typeof(n = e.toString) && !Lr(i = n.call(e))) return i;
            if ("function" == typeof(n = e.valueOf) && !Lr(i = n.call(e))) return i;
            if (!t && "function" == typeof(n = e.toString) && !Lr(i = n.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        },
        Nr = {}.hasOwnProperty,
        jr = function(e, t) {
            return Nr.call(e, t)
        },
        $r = _r.document,
        Dr = Lr($r) && Lr($r.createElement),
        Fr = function(e) {
            return Dr ? $r.createElement(e) : {}
        },
        Hr = !Tr && !wr((function() {
            return 7 != Object.defineProperty(Fr("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })),
        Ur = Object.getOwnPropertyDescriptor,
        qr = {
            f: Tr ? Ur : function(e, t) {
                if (e = Mr(e), t = Rr(t, !0), Hr) try {
                    return Ur(e, t)
                } catch (e) {}
                if (jr(e, t)) return Sr(!Ar.f.call(e, t), e[t])
            }
        },
        Br = function(e) {
            if (!Lr(e)) throw TypeError(String(e) + " is not an object");
            return e
        },
        zr = Object.defineProperty,
        Vr = {
            f: Tr ? zr : function(e, t, n) {
                if (Br(e), t = Rr(t, !0), Br(n), Hr) try {
                    return zr(e, t, n)
                } catch (e) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
                return "value" in n && (e[t] = n.value), e
            }
        },
        Wr = Tr ? function(e, t, n) {
            return Vr.f(e, t, Sr(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        },
        Gr = function(e, t) {
            try {
                Wr(_r, e, t)
            } catch (n) {
                _r[e] = t
            }
            return t
        },
        Xr = _r["__core-js_shared__"] || Gr("__core-js_shared__", {}),
        Yr = Function.toString;
    "function" != typeof Xr.inspectSource && (Xr.inspectSource = function(e) {
        return Yr.call(e)
    });
    var Qr, Kr, Zr, Jr = Xr.inspectSource,
        eo = _r.WeakMap,
        to = "function" == typeof eo && /native code/.test(Jr(eo)),
        no = yr((function(e) {
            (e.exports = function(e, t) {
                return Xr[e] || (Xr[e] = void 0 !== t ? t : {})
            })("versions", []).push({
                version: "3.6.5",
                mode: "global",
                copyright: "Â© 2020 Denis Pushkarev (zloirock.ru)"
            })
        })),
        io = 0,
        ro = Math.random(),
        oo = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++io + ro).toString(36)
        },
        ao = no("keys"),
        so = function(e) {
            return ao[e] || (ao[e] = oo(e))
        },
        lo = {},
        uo = _r.WeakMap;
    if (to) {
        var co = new uo,
            ho = co.get,
            fo = co.has,
            po = co.set;
        Qr = function(e, t) {
            return po.call(co, e, t), t
        }, Kr = function(e) {
            return ho.call(co, e) || {}
        }, Zr = function(e) {
            return fo.call(co, e)
        }
    } else {
        var mo = so("state");
        lo[mo] = !0, Qr = function(e, t) {
            return Wr(e, mo, t), t
        }, Kr = function(e) {
            return jr(e, mo) ? e[mo] : {}
        }, Zr = function(e) {
            return jr(e, mo)
        }
    }
    var go, vo = {
            set: Qr,
            get: Kr,
            has: Zr,
            enforce: function(e) {
                return Zr(e) ? Kr(e) : Qr(e, {})
            },
            getterFor: function(e) {
                return function(t) {
                    var n;
                    if (!Lr(t) || (n = Kr(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        },
        yo = yr((function(e) {
            var t = vo.get,
                n = vo.enforce,
                i = String(String).split("String");
            (e.exports = function(e, t, r, o) {
                var a = !!o && !!o.unsafe,
                    s = !!o && !!o.enumerable,
                    l = !!o && !!o.noTargetGet;
                "function" == typeof r && ("string" != typeof t || jr(r, "name") || Wr(r, "name", t), n(r).source = i.join("string" == typeof t ? t : "")), e !== _r ? (a ? !l && e[t] && (s = !0) : delete e[t], s ? e[t] = r : Wr(e, t, r)) : s ? e[t] = r : Gr(t, r)
            })(Function.prototype, "toString", (function() {
                return "function" == typeof this && t(this).source || Jr(this)
            }))
        })),
        bo = _r,
        _o = function(e) {
            return "function" == typeof e ? e : void 0
        },
        wo = function(e, t) {
            return arguments.length < 2 ? _o(bo[e]) || _o(_r[e]) : bo[e] && bo[e][t] || _r[e] && _r[e][t]
        },
        To = Math.ceil,
        ko = Math.floor,
        xo = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? ko : To)(e)
        },
        Ao = Math.min,
        So = function(e) {
            return e > 0 ? Ao(xo(e), 9007199254740991) : 0
        },
        Eo = Math.max,
        Oo = Math.min,
        Co = function(e, t) {
            var n = xo(e);
            return n < 0 ? Eo(n + t, 0) : Oo(n, t)
        },
        Po = function(e) {
            return function(t, n, i) {
                var r, o = Mr(t),
                    a = So(o.length),
                    s = Co(i, a);
                if (e && n != n) {
                    for (; a > s;)
                        if ((r = o[s++]) != r) return !0
                } else
                    for (; a > s; s++)
                        if ((e || s in o) && o[s] === n) return e || s || 0;
                return !e && -1
            }
        },
        Io = {
            includes: Po(!0),
            indexOf: Po(!1)
        },
        Mo = Io.indexOf,
        Lo = function(e, t) {
            var n, i = Mr(e),
                r = 0,
                o = [];
            for (n in i) !jr(lo, n) && jr(i, n) && o.push(n);
            for (; t.length > r;) jr(i, n = t[r++]) && (~Mo(o, n) || o.push(n));
            return o
        },
        Ro = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        No = Ro.concat("length", "prototype"),
        jo = {
            f: Object.getOwnPropertyNames || function(e) {
                return Lo(e, No)
            }
        },
        $o = {
            f: Object.getOwnPropertySymbols
        },
        Do = wo("Reflect", "ownKeys") || function(e) {
            var t = jo.f(Br(e)),
                n = $o.f;
            return n ? t.concat(n(e)) : t
        },
        Fo = function(e, t) {
            for (var n = Do(t), i = Vr.f, r = qr.f, o = 0; o < n.length; o++) {
                var a = n[o];
                jr(e, a) || i(e, a, r(t, a))
            }
        },
        Ho = /#|\.prototype\./,
        Uo = function(e, t) {
            var n = Bo[qo(e)];
            return n == Vo || n != zo && ("function" == typeof t ? wr(t) : !!t)
        },
        qo = Uo.normalize = function(e) {
            return String(e).replace(Ho, ".").toLowerCase()
        },
        Bo = Uo.data = {},
        zo = Uo.NATIVE = "N",
        Vo = Uo.POLYFILL = "P",
        Wo = Uo,
        Go = qr.f,
        Xo = function(e, t) {
            var n, i, r, o, a, s = e.target,
                l = e.global,
                u = e.stat;
            if (n = l ? _r : u ? _r[s] || Gr(s, {}) : (_r[s] || {}).prototype)
                for (i in t) {
                    if (o = t[i], r = e.noTargetGet ? (a = Go(n, i)) && a.value : n[i], !Wo(l ? i : s + (u ? "." : "#") + i, e.forced) && void 0 !== r) {
                        if (typeof o == typeof r) continue;
                        Fo(o, r)
                    }(e.sham || r && r.sham) && Wr(o, "sham", !0), yo(n, i, o, e)
                }
        },
        Yo = !!Object.getOwnPropertySymbols && !wr((function() {
            return !String(Symbol())
        })),
        Qo = Yo && !Symbol.sham && "symbol" == typeof Symbol.iterator,
        Ko = Array.isArray || function(e) {
            return "Array" == Or(e)
        },
        Zo = function(e) {
            return Object(Ir(e))
        },
        Jo = Object.keys || function(e) {
            return Lo(e, Ro)
        },
        ea = Tr ? Object.defineProperties : function(e, t) {
            Br(e);
            for (var n, i = Jo(t), r = i.length, o = 0; r > o;) Vr.f(e, n = i[o++], t[n]);
            return e
        },
        ta = wo("document", "documentElement"),
        na = so("IE_PROTO"),
        ia = function() {},
        ra = function(e) {
            return "<script>
            "+e+" < \/script>"},oa=function(){try{go=document.domain&&new ActiveXObject("htmlfile")}catch(e){}var e,t;oa=go?function(e){e.write(ra("")),e.close();var t=e.parentWindow.Object;return e=null,t}(go):((t=Fr("iframe")).style.display="none",ta.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(ra("document.F=Object")),e.close(),e.F);for(var n=Ro.length;n--;)delete oa.prototype[Ro[n]];return oa()};lo[na]=!0;var aa=Object.create||function(e,t){var n;return null!==e?(ia.prototype=Br(e),n=new ia,ia.prototype=null,n[na]=e):n=oa(),void 0===t?n:ea(n,t)},sa=jo.f,la={}.toString,ua="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],ca={f:function(e){return ua&&"[object Window]"==la.call(e)?function(e){try{return sa(e)}catch(e){return ua.slice()}}(e):sa(Mr(e))}},da=no("wks"),ha=_r.Symbol,fa=Qo?ha:ha&&ha.withoutSetter||oo,pa=function(e){return jr(da,e)||(Yo&&jr(ha,e)?da[e]=ha[e]:da[e]=fa("Symbol."+e)),da[e]},ma={f:pa},ga=Vr.f,va=function(e){var t=bo.Symbol||(bo.Symbol={});jr(t,e)||ga(t,e,{value:ma.f(e)})},ya=Vr.f,ba=pa("toStringTag"),_a=function(e,t,n){e&&!jr(e=n?e:e.prototype,ba)&&ya(e,ba,{configurable:!0,value:t})},wa=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e},Ta=function(e,t,n){if(wa(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,i){return e.call(t,n,i)};case 3:return function(n,i,r){return e.call(t,n,i,r)}}return function(){return e.apply(t,arguments)}},ka=pa("species"),xa=function(e,t){var n;return Ko(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!Ko(n.prototype)?Lr(n)&&null===(n=n[ka])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)},Aa=[].push,Sa=function(e){var t=1==e,n=2==e,i=3==e,r=4==e,o=6==e,a=5==e||o;return function(s,l,u,c){for(var d,h,f=Zo(s),p=Pr(f),m=Ta(l,u,3),g=So(p.length),v=0,y=c||xa,b=t?y(s,g):n?y(s,0):void 0;g>v;v++)if((a||v in p)&&(h=m(d=p[v],v,f),e))if(t)b[v]=h;else if(h)switch(e){case 3:return!0;case 5:return d;case 6:return v;case 2:Aa.call(b,d)}else if(r)return!1;return o?-1:i||r?r:b}},Ea={forEach:Sa(0),map:Sa(1),filter:Sa(2),some:Sa(3),every:Sa(4),find:Sa(5),findIndex:Sa(6)},Oa=Ea.forEach,Ca=so("hidden"),Pa=pa("toPrimitive"),Ia=vo.set,Ma=vo.getterFor("Symbol"),La=Object.prototype,Ra=_r.Symbol,Na=wo("JSON","stringify"),ja=qr.f,$a=Vr.f,Da=ca.f,Fa=Ar.f,Ha=no("symbols"),Ua=no("op-symbols"),qa=no("string-to-symbol-registry"),Ba=no("symbol-to-string-registry"),za=no("wks"),Va=_r.QObject,Wa=!Va||!Va.prototype||!Va.prototype.findChild,Ga=Tr&&wr((function(){return 7!=aa($a({},"a",{get:function(){return $a(this,"a",{value:7}).a}})).a}))?function(e,t,n){var i=ja(La,t);i&&delete La[t],$a(e,t,n),i&&e!==La&&$a(La,t,i)}:$a,Xa=function(e,t){var n=Ha[e]=aa(Ra.prototype);return Ia(n,{type:"Symbol",tag:e,description:t}),Tr||(n.description=t),n},Ya=Qo?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof Ra},Qa=function(e,t,n){e===La&&Qa(Ua,t,n),Br(e);var i=Rr(t,!0);return Br(n),jr(Ha,i)?(n.enumerable?(jr(e,Ca)&&e[Ca][i]&&(e[Ca][i]=!1),n=aa(n,{enumerable:Sr(0,!1)})):(jr(e,Ca)||$a(e,Ca,Sr(1,{})),e[Ca][i]=!0),Ga(e,i,n)):$a(e,i,n)},Ka=function(e,t){Br(e);var n=Mr(t),i=Jo(n).concat(ts(n));return Oa(i,(function(t){Tr&&!Za.call(n,t)||Qa(e,t,n[t])})),e},Za=function(e){var t=Rr(e,!0),n=Fa.call(this,t);return!(this===La&&jr(Ha,t)&&!jr(Ua,t))&&(!(n||!jr(this,t)||!jr(Ha,t)||jr(this,Ca)&&this[Ca][t])||n)},Ja=function(e,t){var n=Mr(e),i=Rr(t,!0);if(n!==La||!jr(Ha,i)||jr(Ua,i)){var r=ja(n,i);return!r||!jr(Ha,i)||jr(n,Ca)&&n[Ca][i]||(r.enumerable=!0),r}},es=function(e){var t=Da(Mr(e)),n=[];return Oa(t,(function(e){jr(Ha,e)||jr(lo,e)||n.push(e)})),n},ts=function(e){var t=e===La,n=Da(t?Ua:Mr(e)),i=[];return Oa(n,(function(e){!jr(Ha,e)||t&&!jr(La,e)||i.push(Ha[e])})),i};if(Yo||(yo((Ra=function(){if(this instanceof Ra)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=oo(e),n=function(e){this===La&&n.call(Ua,e),jr(this,Ca)&&jr(this[Ca],t)&&(this[Ca][t]=!1),Ga(this,t,Sr(1,e))};return Tr&&Wa&&Ga(La,t,{configurable:!0,set:n}),Xa(t,e)}).prototype,"toString",(function(){return Ma(this).tag})),yo(Ra,"withoutSetter",(function(e){return Xa(oo(e),e)})),Ar.f=Za,Vr.f=Qa,qr.f=Ja,jo.f=ca.f=es,$o.f=ts,ma.f=function(e){return Xa(pa(e),e)},Tr&&($a(Ra.prototype,"description",{configurable:!0,get:function(){return Ma(this).description}}),yo(La,"propertyIsEnumerable",Za,{unsafe:!0}))),Xo({global:!0,wrap:!0,forced:!Yo,sham:!Yo},{Symbol:Ra}),Oa(Jo(za),(function(e){va(e)})),Xo({target:"Symbol",stat:!0,forced:!Yo},{for:function(e){var t=String(e);if(jr(qa,t))return qa[t];var n=Ra(t);return qa[t]=n,Ba[n]=t,n},keyFor:function(e){if(!Ya(e))throw TypeError(e+" is not a symbol");if(jr(Ba,e))return Ba[e]},useSetter:function(){Wa=!0},useSimple:function(){Wa=!1}}),Xo({target:"Object",stat:!0,forced:!Yo,sham:!Tr},{create:function(e,t){return void 0===t?aa(e):Ka(aa(e),t)},defineProperty:Qa,defineProperties:Ka,getOwnPropertyDescriptor:Ja}),Xo({target:"Object",stat:!0,forced:!Yo},{getOwnPropertyNames:es,getOwnPropertySymbols:ts}),Xo({target:"Object",stat:!0,forced:wr((function(){$o.f(1)}))},{getOwnPropertySymbols:function(e){return $o.f(Zo(e))}}),Na){var ns=!Yo||wr((function(){var e=Ra();return"[null]"!=Na([e])||"{}"!=Na({a:e})||"{}"!=Na(Object(e))}));Xo({target:"JSON",stat:!0,forced:ns},{stringify:function(e,t,n){for(var i,r=[e],o=1;arguments.length>o;)r.push(arguments[o++]);if(i=t,(Lr(t)||void 0!==e)&&!Ya(e))return Ko(t)||(t=function(e,t){if("function"==typeof i&&(t=i.call(this,e,t)),!Ya(t))return t}),r[1]=t,Na.apply(null,r)}})}Ra.prototype[Pa]||Wr(Ra.prototype,Pa,Ra.prototype.valueOf),_a(Ra,"Symbol"),lo[Ca]=!0;var is=Vr.f,rs=_r.Symbol;if(Tr&&"function"==typeof rs&&(!("description"in rs.prototype)||void 0!==rs().description)){var os={},as=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof as?new rs(e):void 0===e?rs():rs(e);return""===e&&(os[t]=!0),t};Fo(as,rs);var ss=as.prototype=rs.prototype;ss.constructor=as;var ls=ss.toString,us="Symbol(test)"==String(rs("test")),cs=/ ^ Symbol\((.*)\)[ ^ )] + $ / ;
    is(ss, "description", {
        configurable: !0,
        get: function() {
            var e = Lr(this) ? this.valueOf() : this,
                t = ls.call(e);
            if (jr(os, e)) return "";
            var n = us ? t.slice(7, -1) : t.replace(cs, "$1");
            return "" === n ? void 0 : n
        }
    }), Xo({
        global: !0,
        forced: !0
    }, {
        Symbol: as
    })
}
va("iterator");
var ds = function(e, t) {
        var n = [][e];
        return !!n && wr((function() {
            n.call(null, t || function() {
                throw 1
            }, 1)
        }))
    },
    hs = Object.defineProperty,
    fs = {},
    ps = function(e) {
        throw e
    },
    ms = function(e, t) {
        if (jr(fs, e)) return fs[e];
        t || (t = {});
        var n = [][e],
            i = !!jr(t, "ACCESSORS") && t.ACCESSORS,
            r = jr(t, 0) ? t[0] : ps,
            o = jr(t, 1) ? t[1] : void 0;
        return fs[e] = !!n && !wr((function() {
            if (i && !Tr) return !0;
            var e = {
                length: -1
            };
            i ? hs(e, 1, {
                enumerable: !0,
                get: ps
            }) : e[1] = 1, n.call(e, r, o)
        }))
    },
    gs = Ea.forEach,
    vs = ds("forEach"),
    ys = ms("forEach"),
    bs = vs && ys ? [].forEach : function(e) {
        return gs(this, e, arguments.length > 1 ? arguments[1] : void 0)
    };
Xo({
    target: "Array",
    proto: !0,
    forced: [].forEach != bs
}, {
    forEach: bs
});
var _s = Io.indexOf,
    ws = [].indexOf,
    Ts = !!ws && 1 / [1].indexOf(1, -0) < 0,
    ks = ds("indexOf"),
    xs = ms("indexOf", {
        ACCESSORS: !0,
        1: 0
    });
Xo({
    target: "Array",
    proto: !0,
    forced: Ts || !ks || !xs
}, {
    indexOf: function(e) {
        return Ts ? ws.apply(this, arguments) || 0 : _s(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
});
var As = pa("unscopables"),
    Ss = Array.prototype;
null == Ss[As] && Vr.f(Ss, As, {
    configurable: !0,
    value: aa(null)
});
var Es, Os, Cs, Ps = function(e) {
        Ss[As][e] = !0
    },
    Is = {},
    Ms = !wr((function() {
        function e() {}
        return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
    })),
    Ls = so("IE_PROTO"),
    Rs = Object.prototype,
    Ns = Ms ? Object.getPrototypeOf : function(e) {
        return e = Zo(e), jr(e, Ls) ? e[Ls] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? Rs : null
    },
    js = pa("iterator"),
    $s = !1;
[].keys && ("next" in (Cs = [].keys()) ? (Os = Ns(Ns(Cs))) !== Object.prototype && (Es = Os) : $s = !0), null == Es && (Es = {}), jr(Es, js) || Wr(Es, js, (function() {
    return this
}));
var Ds = {
        IteratorPrototype: Es,
        BUGGY_SAFARI_ITERATORS: $s
    },
    Fs = Ds.IteratorPrototype,
    Hs = function() {
        return this
    },
    Us = function(e, t, n) {
        var i = t + " Iterator";
        return e.prototype = aa(Fs, {
            next: Sr(1, n)
        }), _a(e, i, !1), Is[i] = Hs, e
    },
    qs = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var e, t = !1,
            n = {};
        try {
            (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
        } catch (e) {}
        return function(n, i) {
            return Br(n),
                function(e) {
                    if (!Lr(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype")
                }(i), t ? e.call(n, i) : n.__proto__ = i, n
        }
    }() : void 0),
    Bs = Ds.IteratorPrototype,
    zs = Ds.BUGGY_SAFARI_ITERATORS,
    Vs = pa("iterator"),
    Ws = function() {
        return this
    },
    Gs = function(e, t, n, i, r, o, a) {
        Us(n, t, i);
        var s, l, u, c = function(e) {
                if (e === r && m) return m;
                if (!zs && e in f) return f[e];
                switch (e) {
                    case "keys":
                    case "values":
                    case "entries":
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this)
                }
            },
            d = t + " Iterator",
            h = !1,
            f = e.prototype,
            p = f[Vs] || f["@@iterator"] || r && f[r],
            m = !zs && p || c(r),
            g = "Array" == t && f.entries || p;
        if (g && (s = Ns(g.call(new e)), Bs !== Object.prototype && s.next && (Ns(s) !== Bs && (qs ? qs(s, Bs) : "function" != typeof s[Vs] && Wr(s, Vs, Ws)), _a(s, d, !0))), "values" == r && p && "values" !== p.name && (h = !0, m = function() {
                return p.call(this)
            }), f[Vs] !== m && Wr(f, Vs, m), Is[t] = m, r)
            if (l = {
                    values: c("values"),
                    keys: o ? m : c("keys"),
                    entries: c("entries")
                }, a)
                for (u in l)(zs || h || !(u in f)) && yo(f, u, l[u]);
            else Xo({
                target: t,
                proto: !0,
                forced: zs || h
            }, l);
        return l
    },
    Xs = vo.set,
    Ys = vo.getterFor("Array Iterator"),
    Qs = Gs(Array, "Array", (function(e, t) {
        Xs(this, {
            type: "Array Iterator",
            target: Mr(e),
            index: 0,
            kind: t
        })
    }), (function() {
        var e = Ys(this),
            t = e.target,
            n = e.kind,
            i = e.index++;
        return !t || i >= t.length ? (e.target = void 0, {
            value: void 0,
            done: !0
        }) : "keys" == n ? {
            value: i,
            done: !1
        } : "values" == n ? {
            value: t[i],
            done: !1
        } : {
            value: [i, t[i]],
            done: !1
        }
    }), "values");
Is.Arguments = Is.Array, Ps("keys"), Ps("values"), Ps("entries");
var Ks = [].join,
    Zs = Pr != Object,
    Js = ds("join", ",");
Xo({
    target: "Array",
    proto: !0,
    forced: Zs || !Js
}, {
    join: function(e) {
        return Ks.call(Mr(this), void 0 === e ? "," : e)
    }
});
var el, tl, nl = function(e, t, n) {
        var i = Rr(t);
        i in e ? Vr.f(e, i, Sr(0, n)) : e[i] = n
    },
    il = wo("navigator", "userAgent") || "",
    rl = _r.process,
    ol = rl && rl.versions,
    al = ol && ol.v8;
al ? tl = (el = al.split("."))[0] + el[1] : il && (!(el = il.match(/Edge\/(\d+)/)) || el[1] >= 74) && (el = il.match(/Chrome\/(\d+)/)) && (tl = el[1]);
var sl = tl && +tl,
    ll = pa("species"),
    ul = function(e) {
        return sl >= 51 || !wr((function() {
            var t = [];
            return (t.constructor = {})[ll] = function() {
                return {
                    foo: 1
                }
            }, 1 !== t[e](Boolean).foo
        }))
    },
    cl = ul("slice"),
    dl = ms("slice", {
        ACCESSORS: !0,
        0: 0,
        1: 2
    }),
    hl = pa("species"),
    fl = [].slice,
    pl = Math.max;
Xo({
    target: "Array",
    proto: !0,
    forced: !cl || !dl
}, {
    slice: function(e, t) {
        var n, i, r, o = Mr(this),
            a = So(o.length),
            s = Co(e, a),
            l = Co(void 0 === t ? a : t, a);
        if (Ko(o) && ("function" != typeof(n = o.constructor) || n !== Array && !Ko(n.prototype) ? Lr(n) && null === (n = n[hl]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return fl.call(o, s, l);
        for (i = new(void 0 === n ? Array : n)(pl(l - s, 0)), r = 0; s < l; s++, r++) s in o && nl(i, r, o[s]);
        return i.length = r, i
    }
});
var ml = {};
ml[pa("toStringTag")] = "z";
var gl = "[object z]" === String(ml),
    vl = pa("toStringTag"),
    yl = "Arguments" == Or(function() {
        return arguments
    }()),
    bl = gl ? Or : function(e) {
        var t, n, i;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        }(t = Object(e), vl)) ? n : yl ? Or(t) : "Object" == (i = Or(t)) && "function" == typeof t.callee ? "Arguments" : i
    },
    _l = gl ? {}.toString : function() {
        return "[object " + bl(this) + "]"
    };
gl || yo(Object.prototype, "toString", _l, {
    unsafe: !0
});
var wl = function() {
    var e = Br(this),
        t = "";
    return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
};

function Tl(e, t) {
    return RegExp(e, t)
}
var kl = {
        UNSUPPORTED_Y: wr((function() {
            var e = Tl("a", "y");
            return e.lastIndex = 2, null != e.exec("abcd")
        })),
        BROKEN_CARET: wr((function() {
            var e = Tl("^r", "gy");
            return e.lastIndex = 2, null != e.exec("str")
        }))
    },
    xl = RegExp.prototype.exec,
    Al = String.prototype.replace,
    Sl = xl,
    El = function() {
        var e = /a/,
            t = /b*/g;
        return xl.call(e, "a"), xl.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
    }(),
    Ol = kl.UNSUPPORTED_Y || kl.BROKEN_CARET,
    Cl = void 0 !== /()??/.exec("")[1];
(El || Cl || Ol) && (Sl = function(e) {
    var t, n, i, r, o = this,
        a = Ol && o.sticky,
        s = wl.call(o),
        l = o.source,
        u = 0,
        c = e;
    return a && (-1 === (s = s.replace("y", "")).indexOf("g") && (s += "g"), c = String(e).slice(o.lastIndex), o.lastIndex > 0 && (!o.multiline || o.multiline && "\n" !== e[o.lastIndex - 1]) && (l = "(?: " + l + ")", c = " " + c, u++), n = new RegExp("^(?:" + l + ")", s)), Cl && (n = new RegExp("^" + l + "$(?!\\s)", s)), El && (t = o.lastIndex), i = xl.call(a ? n : o, c), a ? i ? (i.input = i.input.slice(u), i[0] = i[0].slice(u), i.index = o.lastIndex, o.lastIndex += i[0].length) : o.lastIndex = 0 : El && i && (o.lastIndex = o.global ? i.index + i[0].length : t), Cl && i && i.length > 1 && Al.call(i[0], n, (function() {
        for (r = 1; r < arguments.length - 2; r++) void 0 === arguments[r] && (i[r] = void 0)
    })), i
});
var Pl = Sl;
Xo({
    target: "RegExp",
    proto: !0,
    forced: /./.exec !== Pl
}, {
    exec: Pl
});
var Il = RegExp.prototype,
    Ml = Il.toString,
    Ll = wr((function() {
        return "/a/b" != Ml.call({
            source: "a",
            flags: "b"
        })
    })),
    Rl = "toString" != Ml.name;
(Ll || Rl) && yo(RegExp.prototype, "toString", (function() {
    var e = Br(this),
        t = String(e.source),
        n = e.flags;
    return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in Il) ? wl.call(e) : n)
}), {
    unsafe: !0
});
var Nl = function(e) {
        return function(t, n) {
            var i, r, o = String(Ir(t)),
                a = xo(n),
                s = o.length;
            return a < 0 || a >= s ? e ? "" : void 0 : (i = o.charCodeAt(a)) < 55296 || i > 56319 || a + 1 === s || (r = o.charCodeAt(a + 1)) < 56320 || r > 57343 ? e ? o.charAt(a) : i : e ? o.slice(a, a + 2) : r - 56320 + (i - 55296 << 10) + 65536
        }
    },
    jl = {
        codeAt: Nl(!1),
        charAt: Nl(!0)
    },
    $l = jl.charAt,
    Dl = vo.set,
    Fl = vo.getterFor("String Iterator");
Gs(String, "String", (function(e) {
    Dl(this, {
        type: "String Iterator",
        string: String(e),
        index: 0
    })
}), (function() {
    var e, t = Fl(this),
        n = t.string,
        i = t.index;
    return i >= n.length ? {
        value: void 0,
        done: !0
    } : (e = $l(n, i), t.index += e.length, {
        value: e,
        done: !1
    })
}));
var Hl = pa("species"),
    Ul = !wr((function() {
        var e = /./;
        return e.exec = function() {
            var e = [];
            return e.groups = {
                a: "7"
            }, e
        }, "7" !== "".replace(e, "$<a>")
    })),
    ql = "$0" === "a".replace(/./, "$0"),
    Bl = pa("replace"),
    zl = !!/./ [Bl] && "" === /./ [Bl]("a", "$0"),
    Vl = !wr((function() {
        var e = /(?:)/,
            t = e.exec;
        e.exec = function() {
            return t.apply(this, arguments)
        };
        var n = "ab".split(e);
        return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
    })),
    Wl = function(e, t, n, i) {
        var r = pa(e),
            o = !wr((function() {
                var t = {};
                return t[r] = function() {
                    return 7
                }, 7 != "" [e](t)
            })),
            a = o && !wr((function() {
                var t = !1,
                    n = /a/;
                return "split" === e && ((n = {}).constructor = {}, n.constructor[Hl] = function() {
                    return n
                }, n.flags = "", n[r] = /./ [r]), n.exec = function() {
                    return t = !0, null
                }, n[r](""), !t
            }));
        if (!o || !a || "replace" === e && (!Ul || !ql || zl) || "split" === e && !Vl) {
            var s = /./ [r],
                l = n(r, "" [e], (function(e, t, n, i, r) {
                    return t.exec === Pl ? o && !r ? {
                        done: !0,
                        value: s.call(t, n, i)
                    } : {
                        done: !0,
                        value: e.call(n, t, i)
                    } : {
                        done: !1
                    }
                }), {
                    REPLACE_KEEPS_$0: ql,
                    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: zl
                }),
                u = l[0],
                c = l[1];
            yo(String.prototype, e, u), yo(RegExp.prototype, r, 2 == t ? function(e, t) {
                return c.call(e, this, t)
            } : function(e) {
                return c.call(e, this)
            })
        }
        i && Wr(RegExp.prototype[r], "sham", !0)
    },
    Gl = jl.charAt,
    Xl = function(e, t, n) {
        return t + (n ? Gl(e, t).length : 1)
    },
    Yl = function(e, t) {
        var n = e.exec;
        if ("function" == typeof n) {
            var i = n.call(e, t);
            if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
            return i
        }
        if ("RegExp" !== Or(e)) throw TypeError("RegExp#exec called on incompatible receiver");
        return Pl.call(e, t)
    },
    Ql = Math.max,
    Kl = Math.min,
    Zl = Math.floor,
    Jl = /\$([$&'`]|\d\d?|<[^>]*>)/g,
    eu = /\$([$&'`]|\d\d?)/g;
Wl("replace", 2, (function(e, t, n, i) {
    var r = i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
        o = i.REPLACE_KEEPS_$0,
        a = r ? "$" : "$0";
    return [function(n, i) {
        var r = Ir(this),
            o = null == n ? void 0 : n[e];
        return void 0 !== o ? o.call(n, r, i) : t.call(String(r), n, i)
    }, function(e, i) {
        if (!r && o || "string" == typeof i && -1 === i.indexOf(a)) {
            var l = n(t, e, this, i);
            if (l.done) return l.value
        }
        var u = Br(e),
            c = String(this),
            d = "function" == typeof i;
        d || (i = String(i));
        var h = u.global;
        if (h) {
            var f = u.unicode;
            u.lastIndex = 0
        }
        for (var p = [];;) {
            var m = Yl(u, c);
            if (null === m) break;
            if (p.push(m), !h) break;
            "" === String(m[0]) && (u.lastIndex = Xl(c, So(u.lastIndex), f))
        }
        for (var g, v = "", y = 0, b = 0; b < p.length; b++) {
            m = p[b];
            for (var _ = String(m[0]), w = Ql(Kl(xo(m.index), c.length), 0), T = [], k = 1; k < m.length; k++) T.push(void 0 === (g = m[k]) ? g : String(g));
            var x = m.groups;
            if (d) {
                var A = [_].concat(T, w, c);
                void 0 !== x && A.push(x);
                var S = String(i.apply(void 0, A))
            } else S = s(_, c, w, T, x, i);
            w >= y && (v += c.slice(y, w) + S, y = w + _.length)
        }
        return v + c.slice(y)
    }];

    function s(e, n, i, r, o, a) {
        var s = i + e.length,
            l = r.length,
            u = eu;
        return void 0 !== o && (o = Zo(o), u = Jl), t.call(a, u, (function(t, a) {
            var u;
            switch (a.charAt(0)) {
                case "$":
                    return "$";
                case "&":
                    return e;
                case "`":
                    return n.slice(0, i);
                case "'":
                    return n.slice(s);
                case "<":
                    u = o[a.slice(1, -1)];
                    break;
                default:
                    var c = +a;
                    if (0 === c) return t;
                    if (c > l) {
                        var d = Zl(c / 10);
                        return 0 === d ? t : d <= l ? void 0 === r[d - 1] ? a.charAt(1) : r[d - 1] + a.charAt(1) : t
                    }
                    u = r[c - 1]
            }
            return void 0 === u ? "" : u
        }))
    }
}));
var tu = Object.is || function(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
};
Wl("search", 1, (function(e, t, n) {
    return [function(t) {
        var n = Ir(this),
            i = null == t ? void 0 : t[e];
        return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
    }, function(e) {
        var i = n(t, e, this);
        if (i.done) return i.value;
        var r = Br(e),
            o = String(this),
            a = r.lastIndex;
        tu(a, 0) || (r.lastIndex = 0);
        var s = Yl(r, o);
        return tu(r.lastIndex, a) || (r.lastIndex = a), null === s ? -1 : s.index
    }]
}));
var nu = pa("match"),
    iu = function(e) {
        var t;
        return Lr(e) && (void 0 !== (t = e[nu]) ? !!t : "RegExp" == Or(e))
    },
    ru = pa("species"),
    ou = function(e, t) {
        var n, i = Br(e).constructor;
        return void 0 === i || null == (n = Br(i)[ru]) ? t : wa(n)
    },
    au = [].push,
    su = Math.min,
    lu = !wr((function() {
        return !RegExp(4294967295, "y")
    }));
Wl("split", 2, (function(e, t, n) {
    var i;
    return i = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e, n) {
        var i = String(Ir(this)),
            r = void 0 === n ? 4294967295 : n >>> 0;
        if (0 === r) return [];
        if (void 0 === e) return [i];
        if (!iu(e)) return t.call(i, e, r);
        for (var o, a, s, l = [], u = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), c = 0, d = new RegExp(e.source, u + "g");
            (o = Pl.call(d, i)) && !((a = d.lastIndex) > c && (l.push(i.slice(c, o.index)), o.length > 1 && o.index < i.length && au.apply(l, o.slice(1)), s = o[0].length, c = a, l.length >= r));) d.lastIndex === o.index && d.lastIndex++;
        return c === i.length ? !s && d.test("") || l.push("") : l.push(i.slice(c)), l.length > r ? l.slice(0, r) : l
    } : "0".split(void 0, 0).length ? function(e, n) {
        return void 0 === e && 0 === n ? [] : t.call(this, e, n)
    } : t, [function(t, n) {
        var r = Ir(this),
            o = null == t ? void 0 : t[e];
        return void 0 !== o ? o.call(t, r, n) : i.call(String(r), t, n)
    }, function(e, r) {
        var o = n(i, e, this, r, i !== t);
        if (o.done) return o.value;
        var a = Br(e),
            s = String(this),
            l = ou(a, RegExp),
            u = a.unicode,
            c = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (lu ? "y" : "g"),
            d = new l(lu ? a : "^(?:" + a.source + ")", c),
            h = void 0 === r ? 4294967295 : r >>> 0;
        if (0 === h) return [];
        if (0 === s.length) return null === Yl(d, s) ? [s] : [];
        for (var f = 0, p = 0, m = []; p < s.length;) {
            d.lastIndex = lu ? p : 0;
            var g, v = Yl(d, lu ? s : s.slice(p));
            if (null === v || (g = su(So(d.lastIndex + (lu ? 0 : p)), s.length)) === f) p = Xl(s, p, u);
            else {
                if (m.push(s.slice(f, p)), m.length === h) return m;
                for (var y = 1; y <= v.length - 1; y++)
                    if (m.push(v[y]), m.length === h) return m;
                p = f = g
            }
        }
        return m.push(s.slice(f)), m
    }]
}), !lu);
var uu = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
};
for (var cu in uu) {
    var du = _r[cu],
        hu = du && du.prototype;
    if (hu && hu.forEach !== bs) try {
        Wr(hu, "forEach", bs)
    } catch (e) {
        hu.forEach = bs
    }
}
var fu = pa("iterator"),
    pu = pa("toStringTag"),
    mu = Qs.values;
for (var gu in uu) {
    var vu = _r[gu],
        yu = vu && vu.prototype;
    if (yu) {
        if (yu[fu] !== mu) try {
            Wr(yu, fu, mu)
        } catch (e) {
            yu[fu] = mu
        }
        if (yu[pu] || Wr(yu, pu, gu), uu[gu])
            for (var bu in Qs)
                if (yu[bu] !== Qs[bu]) try {
                    Wr(yu, bu, Qs[bu])
                } catch (e) {
                    yu[bu] = Qs[bu]
                }
    }
}
var _u = pa("iterator"),
    wu = !wr((function() {
        var e = new URL("b?a=1&b=2&c=3", "http://a"),
            t = e.searchParams,
            n = "";
        return e.pathname = "c%20d", t.forEach((function(e, i) {
            t.delete("b"), n += i + e
        })), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[_u] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://Ñ‚ÐµÑÑ‚").host || "#%D0%B1" !== new URL("http://a#Ð±").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host
    })),
    Tu = function(e, t, n) {
        if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
        return e
    },
    ku = Object.assign,
    xu = Object.defineProperty,
    Au = !ku || wr((function() {
        if (Tr && 1 !== ku({
                b: 1
            }, ku(xu({}, "a", {
                enumerable: !0,
                get: function() {
                    xu(this, "b", {
                        value: 3,
                        enumerable: !1
                    })
                }
            }), {
                b: 2
            })).b) return !0;
        var e = {},
            t = {},
            n = Symbol();
        return e[n] = 7, "abcdefghijklmnopqrst".split("").forEach((function(e) {
            t[e] = e
        })), 7 != ku({}, e)[n] || "abcdefghijklmnopqrst" != Jo(ku({}, t)).join("")
    })) ? function(e, t) {
        for (var n = Zo(e), i = arguments.length, r = 1, o = $o.f, a = Ar.f; i > r;)
            for (var s, l = Pr(arguments[r++]), u = o ? Jo(l).concat(o(l)) : Jo(l), c = u.length, d = 0; c > d;) s = u[d++], Tr && !a.call(l, s) || (n[s] = l[s]);
        return n
    } : ku,
    Su = function(e, t, n, i) {
        try {
            return i ? t(Br(n)[0], n[1]) : t(n)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && Br(r.call(e)), t
        }
    },
    Eu = pa("iterator"),
    Ou = Array.prototype,
    Cu = function(e) {
        return void 0 !== e && (Is.Array === e || Ou[Eu] === e)
    },
    Pu = pa("iterator"),
    Iu = function(e) {
        if (null != e) return e[Pu] || e["@@iterator"] || Is[bl(e)]
    },
    Mu = function(e) {
        var t, n, i, r, o, a, s = Zo(e),
            l = "function" == typeof this ? this : Array,
            u = arguments.length,
            c = u > 1 ? arguments[1] : void 0,
            d = void 0 !== c,
            h = Iu(s),
            f = 0;
        if (d && (c = Ta(c, u > 2 ? arguments[2] : void 0, 2)), null == h || l == Array && Cu(h))
            for (n = new l(t = So(s.length)); t > f; f++) a = d ? c(s[f], f) : s[f], nl(n, f, a);
        else
            for (o = (r = h.call(s)).next, n = new l; !(i = o.call(r)).done; f++) a = d ? Su(r, c, [i.value, f], !0) : i.value, nl(n, f, a);
        return n.length = f, n
    },
    Lu = /[^\0-\u007E]/,
    Ru = /[.\u3002\uFF0E\uFF61]/g,
    Nu = "Overflow: input needs wider integers to process",
    ju = Math.floor,
    $u = String.fromCharCode,
    Du = function(e) {
        return e + 22 + 75 * (e < 26)
    },
    Fu = function(e, t, n) {
        var i = 0;
        for (e = n ? ju(e / 700) : e >> 1, e += ju(e / t); e > 455; i += 36) e = ju(e / 35);
        return ju(i + 36 * e / (e + 38))
    },
    Hu = function(e) {
        var t, n, i = [],
            r = (e = function(e) {
                for (var t = [], n = 0, i = e.length; n < i;) {
                    var r = e.charCodeAt(n++);
                    if (r >= 55296 && r <= 56319 && n < i) {
                        var o = e.charCodeAt(n++);
                        56320 == (64512 & o) ? t.push(((1023 & r) << 10) + (1023 & o) + 65536) : (t.push(r), n--)
                    } else t.push(r)
                }
                return t
            }(e)).length,
            o = 128,
            a = 0,
            s = 72;
        for (t = 0; t < e.length; t++)(n = e[t]) < 128 && i.push($u(n));
        var l = i.length,
            u = l;
        for (l && i.push("-"); u < r;) {
            var c = 2147483647;
            for (t = 0; t < e.length; t++)(n = e[t]) >= o && n < c && (c = n);
            var d = u + 1;
            if (c - o > ju((2147483647 - a) / d)) throw RangeError(Nu);
            for (a += (c - o) * d, o = c, t = 0; t < e.length; t++) {
                if ((n = e[t]) < o && ++a > 2147483647) throw RangeError(Nu);
                if (n == o) {
                    for (var h = a, f = 36;; f += 36) {
                        var p = f <= s ? 1 : f >= s + 26 ? 26 : f - s;
                        if (h < p) break;
                        var m = h - p,
                            g = 36 - p;
                        i.push($u(Du(p + m % g))), h = ju(m / g)
                    }
                    i.push($u(Du(h))), s = Fu(a, d, u == l), a = 0, ++u
                }
            }++a, ++o
        }
        return i.join("")
    },
    Uu = function(e, t, n) {
        for (var i in t) yo(e, i, t[i], n);
        return e
    },
    qu = function(e) {
        var t = Iu(e);
        if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");
        return Br(t.call(e))
    },
    Bu = wo("fetch"),
    zu = wo("Headers"),
    Vu = pa("iterator"),
    Wu = vo.set,
    Gu = vo.getterFor("URLSearchParams"),
    Xu = vo.getterFor("URLSearchParamsIterator"),
    Yu = /\+/g,
    Qu = Array(4),
    Ku = function(e) {
        return Qu[e - 1] || (Qu[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"))
    },
    Zu = function(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {
            return e
        }
    },
    Ju = function(e) {
        var t = e.replace(Yu, " "),
            n = 4;
        try {
            return decodeURIComponent(t)
        } catch (e) {
            for (; n;) t = t.replace(Ku(n--), Zu);
            return t
        }
    },
    ec = /[!'()~]|%20/g,
    tc = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+"
    },
    nc = function(e) {
        return tc[e]
    },
    ic = function(e) {
        return encodeURIComponent(e).replace(ec, nc)
    },
    rc = function(e, t) {
        if (t)
            for (var n, i, r = t.split("&"), o = 0; o < r.length;)(n = r[o++]).length && (i = n.split("="), e.push({
                key: Ju(i.shift()),
                value: Ju(i.join("="))
            }))
    },
    oc = function(e) {
        this.entries.length = 0, rc(this.entries, e)
    },
    ac = function(e, t) {
        if (e < t) throw TypeError("Not enough arguments")
    },
    sc = Us((function(e, t) {
        Wu(this, {
            type: "URLSearchParamsIterator",
            iterator: qu(Gu(e).entries),
            kind: t
        })
    }), "Iterator", (function() {
        var e = Xu(this),
            t = e.kind,
            n = e.iterator.next(),
            i = n.value;
        return n.done || (n.value = "keys" === t ? i.key : "values" === t ? i.value : [i.key, i.value]), n
    })),
    lc = function() {
        Tu(this, lc, "URLSearchParams");
        var e, t, n, i, r, o, a, s, l, u = arguments.length > 0 ? arguments[0] : void 0,
            c = this,
            d = [];
        if (Wu(c, {
                type: "URLSearchParams",
                entries: d,
                updateURL: function() {},
                updateSearchParams: oc
            }), void 0 !== u)
            if (Lr(u))
                if ("function" == typeof(e = Iu(u)))
                    for (n = (t = e.call(u)).next; !(i = n.call(t)).done;) {
                        if ((a = (o = (r = qu(Br(i.value))).next).call(r)).done || (s = o.call(r)).done || !o.call(r).done) throw TypeError("Expected sequence with length 2");
                        d.push({
                            key: a.value + "",
                            value: s.value + ""
                        })
                    } else
                        for (l in u) jr(u, l) && d.push({
                            key: l,
                            value: u[l] + ""
                        });
                else rc(d, "string" == typeof u ? "?" === u.charAt(0) ? u.slice(1) : u : u + "")
    },
    uc = lc.prototype;
Uu(uc, {
    append: function(e, t) {
        ac(arguments.length, 2);
        var n = Gu(this);
        n.entries.push({
            key: e + "",
            value: t + ""
        }), n.updateURL()
    },
    delete: function(e) {
        ac(arguments.length, 1);
        for (var t = Gu(this), n = t.entries, i = e + "", r = 0; r < n.length;) n[r].key === i ? n.splice(r, 1) : r++;
        t.updateURL()
    },
    get: function(e) {
        ac(arguments.length, 1);
        for (var t = Gu(this).entries, n = e + "", i = 0; i < t.length; i++)
            if (t[i].key === n) return t[i].value;
        return null
    },
    getAll: function(e) {
        ac(arguments.length, 1);
        for (var t = Gu(this).entries, n = e + "", i = [], r = 0; r < t.length; r++) t[r].key === n && i.push(t[r].value);
        return i
    },
    has: function(e) {
        ac(arguments.length, 1);
        for (var t = Gu(this).entries, n = e + "", i = 0; i < t.length;)
            if (t[i++].key === n) return !0;
        return !1
    },
    set: function(e, t) {
        ac(arguments.length, 1);
        for (var n, i = Gu(this), r = i.entries, o = !1, a = e + "", s = t + "", l = 0; l < r.length; l++)(n = r[l]).key === a && (o ? r.splice(l--, 1) : (o = !0, n.value = s));
        o || r.push({
            key: a,
            value: s
        }), i.updateURL()
    },
    sort: function() {
        var e, t, n, i = Gu(this),
            r = i.entries,
            o = r.slice();
        for (r.length = 0, n = 0; n < o.length; n++) {
            for (e = o[n], t = 0; t < n; t++)
                if (r[t].key > e.key) {
                    r.splice(t, 0, e);
                    break
                } t === n && r.push(e)
        }
        i.updateURL()
    },
    forEach: function(e) {
        for (var t, n = Gu(this).entries, i = Ta(e, arguments.length > 1 ? arguments[1] : void 0, 3), r = 0; r < n.length;) i((t = n[r++]).value, t.key, this)
    },
    keys: function() {
        return new sc(this, "keys")
    },
    values: function() {
        return new sc(this, "values")
    },
    entries: function() {
        return new sc(this, "entries")
    }
}, {
    enumerable: !0
}), yo(uc, Vu, uc.entries), yo(uc, "toString", (function() {
    for (var e, t = Gu(this).entries, n = [], i = 0; i < t.length;) e = t[i++], n.push(ic(e.key) + "=" + ic(e.value));
    return n.join("&")
}), {
    enumerable: !0
}), _a(lc, "URLSearchParams"), Xo({
    global: !0,
    forced: !wu
}, {
    URLSearchParams: lc
}), wu || "function" != typeof Bu || "function" != typeof zu || Xo({
    global: !0,
    enumerable: !0,
    forced: !0
}, {
    fetch: function(e) {
        var t, n, i, r = [e];
        return arguments.length > 1 && (Lr(t = arguments[1]) && (n = t.body, "URLSearchParams" === bl(n) && ((i = t.headers ? new zu(t.headers) : new zu).has("content-type") || i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = aa(t, {
            body: Sr(0, String(n)),
            headers: Sr(0, i)
        }))), r.push(t)), Bu.apply(this, r)
    }
});
var cc, dc = {
        URLSearchParams: lc,
        getState: Gu
    },
    hc = jl.codeAt,
    fc = _r.URL,
    pc = dc.URLSearchParams,
    mc = dc.getState,
    gc = vo.set,
    vc = vo.getterFor("URL"),
    yc = Math.floor,
    bc = Math.pow,
    _c = /[A-Za-z]/,
    wc = /[\d+-.A-Za-z]/,
    Tc = /\d/,
    kc = /^(0x|0X)/,
    xc = /^[0-7]+$/,
    Ac = /^\d+$/,
    Sc = /^[\dA-Fa-f]+$/,
    Ec = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,
    Oc = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/,
    Cc = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,
    Pc = /[\u0009\u000A\u000D]/g,
    Ic = function(e, t) {
        var n, i, r;
        if ("[" == t.charAt(0)) {
            if ("]" != t.charAt(t.length - 1)) return "Invalid host";
            if (!(n = Lc(t.slice(1, -1)))) return "Invalid host";
            e.host = n
        } else if (Uc(e)) {
            if (t = function(e) {
                    var t, n, i = [],
                        r = e.toLowerCase().replace(Ru, ".").split(".");
                    for (t = 0; t < r.length; t++) n = r[t], i.push(Lu.test(n) ? "xn--" + Hu(n) : n);
                    return i.join(".")
                }(t), Ec.test(t)) return "Invalid host";
            if (null === (n = Mc(t))) return "Invalid host";
            e.host = n
        } else {
            if (Oc.test(t)) return "Invalid host";
            for (n = "", i = Mu(t), r = 0; r < i.length; r++) n += Fc(i[r], Nc);
            e.host = n
        }
    },
    Mc = function(e) {
        var t, n, i, r, o, a, s, l = e.split(".");
        if (l.length && "" == l[l.length - 1] && l.pop(), (t = l.length) > 4) return e;
        for (n = [], i = 0; i < t; i++) {
            if ("" == (r = l[i])) return e;
            if (o = 10, r.length > 1 && "0" == r.charAt(0) && (o = kc.test(r) ? 16 : 8, r = r.slice(8 == o ? 1 : 2)), "" === r) a = 0;
            else {
                if (!(10 == o ? Ac : 8 == o ? xc : Sc).test(r)) return e;
                a = parseInt(r, o)
            }
            n.push(a)
        }
        for (i = 0; i < t; i++)
            if (a = n[i], i == t - 1) {
                if (a >= bc(256, 5 - t)) return null
            } else if (a > 255) return null;
        for (s = n.pop(), i = 0; i < n.length; i++) s += n[i] * bc(256, 3 - i);
        return s
    },
    Lc = function(e) {
        var t, n, i, r, o, a, s, l = [0, 0, 0, 0, 0, 0, 0, 0],
            u = 0,
            c = null,
            d = 0,
            h = function() {
                return e.charAt(d)
            };
        if (":" == h()) {
            if (":" != e.charAt(1)) return;
            d += 2, c = ++u
        }
        for (; h();) {
            if (8 == u) return;
            if (":" != h()) {
                for (t = n = 0; n < 4 && Sc.test(h());) t = 16 * t + parseInt(h(), 16), d++, n++;
                if ("." == h()) {
                    if (0 == n) return;
                    if (d -= n, u > 6) return;
                    for (i = 0; h();) {
                        if (r = null, i > 0) {
                            if (!("." == h() && i < 4)) return;
                            d++
                        }
                        if (!Tc.test(h())) return;
                        for (; Tc.test(h());) {
                            if (o = parseInt(h(), 10), null === r) r = o;
                            else {
                                if (0 == r) return;
                                r = 10 * r + o
                            }
                            if (r > 255) return;
                            d++
                        }
                        l[u] = 256 * l[u] + r, 2 != ++i && 4 != i || u++
                    }
                    if (4 != i) return;
                    break
                }
                if (":" == h()) {
                    if (d++, !h()) return
                } else if (h()) return;
                l[u++] = t
            } else {
                if (null !== c) return;
                d++, c = ++u
            }
        }
        if (null !== c)
            for (a = u - c, u = 7; 0 != u && a > 0;) s = l[u], l[u--] = l[c + a - 1], l[c + --a] = s;
        else if (8 != u) return;
        return l
    },
    Rc = function(e) {
        var t, n, i, r;
        if ("number" == typeof e) {
            for (t = [], n = 0; n < 4; n++) t.unshift(e % 256), e = yc(e / 256);
            return t.join(".")
        }
        if ("object" == typeof e) {
            for (t = "", i = function(e) {
                    for (var t = null, n = 1, i = null, r = 0, o = 0; o < 8; o++) 0 !== e[o] ? (r > n && (t = i, n = r), i = null, r = 0) : (null === i && (i = o), ++r);
                    return r > n && (t = i, n = r), t
                }(e), n = 0; n < 8; n++) r && 0 === e[n] || (r && (r = !1), i === n ? (t += n ? ":" : "::", r = !0) : (t += e[n].toString(16), n < 7 && (t += ":")));
            return "[" + t + "]"
        }
        return e
    },
    Nc = {},
    jc = Au({}, Nc, {
        " ": 1,
        '"': 1,
        "<": 1,
        ">": 1,
        "`": 1
    }),
    $c = Au({}, jc, {
        "#": 1,
        "?": 1,
        "{": 1,
        "}": 1
    }),
    Dc = Au({}, $c, {
        "/": 1,
        ":": 1,
        ";": 1,
        "=": 1,
        "@": 1,
        "[": 1,
        "\\": 1,
        "]": 1,
        "^": 1,
        "|": 1
    }),
    Fc = function(e, t) {
        var n = hc(e, 0);
        return n > 32 && n < 127 && !jr(t, e) ? e : encodeURIComponent(e)
    },
    Hc = {
        ftp: 21,
        file: null,
        http: 80,
        https: 443,
        ws: 80,
        wss: 443
    },
    Uc = function(e) {
        return jr(Hc, e.scheme)
    },
    qc = function(e) {
        return "" != e.username || "" != e.password
    },
    Bc = function(e) {
        return !e.host || e.cannotBeABaseURL || "file" == e.scheme
    },
    zc = function(e, t) {
        var n;
        return 2 == e.length && _c.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n)
    },
    Vc = function(e) {
        var t;
        return e.length > 1 && zc(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t)
    },
    Wc = function(e) {
        var t = e.path,
            n = t.length;
        !n || "file" == e.scheme && 1 == n && zc(t[0], !0) || t.pop()
    },
    Gc = function(e) {
        return "." === e || "%2e" === e.toLowerCase()
    },
    Xc = {},
    Yc = {},
    Qc = {},
    Kc = {},
    Zc = {},
    Jc = {},
    ed = {},
    td = {},
    nd = {},
    id = {},
    rd = {},
    od = {},
    ad = {},
    sd = {},
    ld = {},
    ud = {},
    cd = {},
    dd = {},
    hd = {},
    fd = {},
    pd = {},
    md = function(e, t, n, i) {
        var r, o, a, s, l, u = n || Xc,
            c = 0,
            d = "",
            h = !1,
            f = !1,
            p = !1;
        for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(Cc, "")), t = t.replace(Pc, ""), r = Mu(t); c <= r.length;) {
            switch (o = r[c], u) {
                case Xc:
                    if (!o || !_c.test(o)) {
                        if (n) return "Invalid scheme";
                        u = Qc;
                        continue
                    }
                    d += o.toLowerCase(), u = Yc;
                    break;
                case Yc:
                    if (o && (wc.test(o) || "+" == o || "-" == o || "." == o)) d += o.toLowerCase();
                    else {
                        if (":" != o) {
                            if (n) return "Invalid scheme";
                            d = "", u = Qc, c = 0;
                            continue
                        }
                        if (n && (Uc(e) != jr(Hc, d) || "file" == d && (qc(e) || null !== e.port) || "file" == e.scheme && !e.host)) return;
                        if (e.scheme = d, n) return void(Uc(e) && Hc[e.scheme] == e.port && (e.port = null));
                        d = "", "file" == e.scheme ? u = sd : Uc(e) && i && i.scheme == e.scheme ? u = Kc : Uc(e) ? u = td : "/" == r[c + 1] ? (u = Zc, c++) : (e.cannotBeABaseURL = !0, e.path.push(""), u = hd)
                    }
                    break;
                case Qc:
                    if (!i || i.cannotBeABaseURL && "#" != o) return "Invalid scheme";
                    if (i.cannotBeABaseURL && "#" == o) {
                        e.scheme = i.scheme, e.path = i.path.slice(), e.query = i.query, e.fragment = "", e.cannotBeABaseURL = !0, u = pd;
                        break
                    }
                    u = "file" == i.scheme ? sd : Jc;
                    continue;
                case Kc:
                    if ("/" != o || "/" != r[c + 1]) {
                        u = Jc;
                        continue
                    }
                    u = nd, c++;
                    break;
                case Zc:
                    if ("/" == o) {
                        u = id;
                        break
                    }
                    u = dd;
                    continue;
                case Jc:
                    if (e.scheme = i.scheme, o == cc) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query;
                    else if ("/" == o || "\\" == o && Uc(e)) u = ed;
                    else if ("?" == o) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = "", u = fd;
                    else {
                        if ("#" != o) {
                            e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.path.pop(), u = dd;
                            continue
                        }
                        e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query, e.fragment = "", u = pd
                    }
                    break;
                case ed:
                    if (!Uc(e) || "/" != o && "\\" != o) {
                        if ("/" != o) {
                            e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, u = dd;
                            continue
                        }
                        u = id
                    } else u = nd;
                    break;
                case td:
                    if (u = nd, "/" != o || "/" != d.charAt(c + 1)) continue;
                    c++;
                    break;
                case nd:
                    if ("/" != o && "\\" != o) {
                        u = id;
                        continue
                    }
                    break;
                case id:
                    if ("@" == o) {
                        h && (d = "%40" + d), h = !0, a = Mu(d);
                        for (var m = 0; m < a.length; m++) {
                            var g = a[m];
                            if (":" != g || p) {
                                var v = Fc(g, Dc);
                                p ? e.password += v : e.username += v
                            } else p = !0
                        }
                        d = ""
                    } else if (o == cc || "/" == o || "?" == o || "#" == o || "\\" == o && Uc(e)) {
                        if (h && "" == d) return "Invalid authority";
                        c -= Mu(d).length + 1, d = "", u = rd
                    } else d += o;
                    break;
                case rd:
                case od:
                    if (n && "file" == e.scheme) {
                        u = ud;
                        continue
                    }
                    if (":" != o || f) {
                        if (o == cc || "/" == o || "?" == o || "#" == o || "\\" == o && Uc(e)) {
                            if (Uc(e) && "" == d) return "Invalid host";
                            if (n && "" == d && (qc(e) || null !== e.port)) return;
                            if (s = Ic(e, d)) return s;
                            if (d = "", u = cd, n) return;
                            continue
                        }
                        "[" == o ? f = !0 : "]" == o && (f = !1), d += o
                    } else {
                        if ("" == d) return "Invalid host";
                        if (s = Ic(e, d)) return s;
                        if (d = "", u = ad, n == od) return
                    }
                    break;
                case ad:
                    if (!Tc.test(o)) {
                        if (o == cc || "/" == o || "?" == o || "#" == o || "\\" == o && Uc(e) || n) {
                            if ("" != d) {
                                var y = parseInt(d, 10);
                                if (y > 65535) return "Invalid port";
                                e.port = Uc(e) && y === Hc[e.scheme] ? null : y, d = ""
                            }
                            if (n) return;
                            u = cd;
                            continue
                        }
                        return "Invalid port"
                    }
                    d += o;
                    break;
                case sd:
                    if (e.scheme = "file", "/" == o || "\\" == o) u = ld;
                    else {
                        if (!i || "file" != i.scheme) {
                            u = dd;
                            continue
                        }
                        if (o == cc) e.host = i.host, e.path = i.path.slice(), e.query = i.query;
                        else if ("?" == o) e.host = i.host, e.path = i.path.slice(), e.query = "", u = fd;
                        else {
                            if ("#" != o) {
                                Vc(r.slice(c).join("")) || (e.host = i.host, e.path = i.path.slice(), Wc(e)), u = dd;
                                continue
                            }
                            e.host = i.host, e.path = i.path.slice(), e.query = i.query, e.fragment = "", u = pd
                        }
                    }
                    break;
                case ld:
                    if ("/" == o || "\\" == o) {
                        u = ud;
                        break
                    }
                    i && "file" == i.scheme && !Vc(r.slice(c).join("")) && (zc(i.path[0], !0) ? e.path.push(i.path[0]) : e.host = i.host), u = dd;
                    continue;
                case ud:
                    if (o == cc || "/" == o || "\\" == o || "?" == o || "#" == o) {
                        if (!n && zc(d)) u = dd;
                        else if ("" == d) {
                            if (e.host = "", n) return;
                            u = cd
                        } else {
                            if (s = Ic(e, d)) return s;
                            if ("localhost" == e.host && (e.host = ""), n) return;
                            d = "", u = cd
                        }
                        continue
                    }
                    d += o;
                    break;
                case cd:
                    if (Uc(e)) {
                        if (u = dd, "/" != o && "\\" != o) continue
                    } else if (n || "?" != o)
                        if (n || "#" != o) {
                            if (o != cc && (u = dd, "/" != o)) continue
                        } else e.fragment = "", u = pd;
                    else e.query = "", u = fd;
                    break;
                case dd:
                    if (o == cc || "/" == o || "\\" == o && Uc(e) || !n && ("?" == o || "#" == o)) {
                        if (".." === (l = (l = d).toLowerCase()) || "%2e." === l || ".%2e" === l || "%2e%2e" === l ? (Wc(e), "/" == o || "\\" == o && Uc(e) || e.path.push("")) : Gc(d) ? "/" == o || "\\" == o && Uc(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && zc(d) && (e.host && (e.host = ""), d = d.charAt(0) + ":"), e.path.push(d)), d = "", "file" == e.scheme && (o == cc || "?" == o || "#" == o))
                            for (; e.path.length > 1 && "" === e.path[0];) e.path.shift();
                        "?" == o ? (e.query = "", u = fd) : "#" == o && (e.fragment = "", u = pd)
                    } else d += Fc(o, $c);
                    break;
                case hd:
                    "?" == o ? (e.query = "", u = fd) : "#" == o ? (e.fragment = "", u = pd) : o != cc && (e.path[0] += Fc(o, Nc));
                    break;
                case fd:
                    n || "#" != o ? o != cc && ("'" == o && Uc(e) ? e.query += "%27" : e.query += "#" == o ? "%23" : Fc(o, Nc)) : (e.fragment = "", u = pd);
                    break;
                case pd:
                    o != cc && (e.fragment += Fc(o, jc))
            }
            c++
        }
    },
    gd = function(e) {
        var t, n, i = Tu(this, gd, "URL"),
            r = arguments.length > 1 ? arguments[1] : void 0,
            o = String(e),
            a = gc(i, {
                type: "URL"
            });
        if (void 0 !== r)
            if (r instanceof gd) t = vc(r);
            else if (n = md(t = {}, String(r))) throw TypeError(n);
        if (n = md(a, o, null, t)) throw TypeError(n);
        var s = a.searchParams = new pc,
            l = mc(s);
        l.updateSearchParams(a.query), l.updateURL = function() {
            a.query = String(s) || null
        }, Tr || (i.href = yd.call(i), i.origin = bd.call(i), i.protocol = _d.call(i), i.username = wd.call(i), i.password = Td.call(i), i.host = kd.call(i), i.hostname = xd.call(i), i.port = Ad.call(i), i.pathname = Sd.call(i), i.search = Ed.call(i), i.searchParams = Od.call(i), i.hash = Cd.call(i))
    },
    vd = gd.prototype,
    yd = function() {
        var e = vc(this),
            t = e.scheme,
            n = e.username,
            i = e.password,
            r = e.host,
            o = e.port,
            a = e.path,
            s = e.query,
            l = e.fragment,
            u = t + ":";
        return null !== r ? (u += "//", qc(e) && (u += n + (i ? ":" + i : "") + "@"), u += Rc(r), null !== o && (u += ":" + o)) : "file" == t && (u += "//"), u += e.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "", null !== s && (u += "?" + s), null !== l && (u += "#" + l), u
    },
    bd = function() {
        var e = vc(this),
            t = e.scheme,
            n = e.port;
        if ("blob" == t) try {
            return new URL(t.path[0]).origin
        } catch (e) {
            return "null"
        }
        return "file" != t && Uc(e) ? t + "://" + Rc(e.host) + (null !== n ? ":" + n : "") : "null"
    },
    _d = function() {
        return vc(this).scheme + ":"
    },
    wd = function() {
        return vc(this).username
    },
    Td = function() {
        return vc(this).password
    },
    kd = function() {
        var e = vc(this),
            t = e.host,
            n = e.port;
        return null === t ? "" : null === n ? Rc(t) : Rc(t) + ":" + n
    },
    xd = function() {
        var e = vc(this).host;
        return null === e ? "" : Rc(e)
    },
    Ad = function() {
        var e = vc(this).port;
        return null === e ? "" : String(e)
    },
    Sd = function() {
        var e = vc(this),
            t = e.path;
        return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : ""
    },
    Ed = function() {
        var e = vc(this).query;
        return e ? "?" + e : ""
    },
    Od = function() {
        return vc(this).searchParams
    },
    Cd = function() {
        var e = vc(this).fragment;
        return e ? "#" + e : ""
    },
    Pd = function(e, t) {
        return {
            get: e,
            set: t,
            configurable: !0,
            enumerable: !0
        }
    };
if (Tr && ea(vd, {
        href: Pd(yd, (function(e) {
            var t = vc(this),
                n = String(e),
                i = md(t, n);
            if (i) throw TypeError(i);
            mc(t.searchParams).updateSearchParams(t.query)
        })),
        origin: Pd(bd),
        protocol: Pd(_d, (function(e) {
            var t = vc(this);
            md(t, String(e) + ":", Xc)
        })),
        username: Pd(wd, (function(e) {
            var t = vc(this),
                n = Mu(String(e));
            if (!Bc(t)) {
                t.username = "";
                for (var i = 0; i < n.length; i++) t.username += Fc(n[i], Dc)
            }
        })),
        password: Pd(Td, (function(e) {
            var t = vc(this),
                n = Mu(String(e));
            if (!Bc(t)) {
                t.password = "";
                for (var i = 0; i < n.length; i++) t.password += Fc(n[i], Dc)
            }
        })),
        host: Pd(kd, (function(e) {
            var t = vc(this);
            t.cannotBeABaseURL || md(t, String(e), rd)
        })),
        hostname: Pd(xd, (function(e) {
            var t = vc(this);
            t.cannotBeABaseURL || md(t, String(e), od)
        })),
        port: Pd(Ad, (function(e) {
            var t = vc(this);
            Bc(t) || ("" == (e = String(e)) ? t.port = null : md(t, e, ad))
        })),
        pathname: Pd(Sd, (function(e) {
            var t = vc(this);
            t.cannotBeABaseURL || (t.path = [], md(t, e + "", cd))
        })),
        search: Pd(Ed, (function(e) {
            var t = vc(this);
            "" == (e = String(e)) ? t.query = null: ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", md(t, e, fd)), mc(t.searchParams).updateSearchParams(t.query)
        })),
        searchParams: Pd(Od),
        hash: Pd(Cd, (function(e) {
            var t = vc(this);
            "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", md(t, e, pd)) : t.fragment = null
        }))
    }), yo(vd, "toJSON", (function() {
        return yd.call(this)
    }), {
        enumerable: !0
    }), yo(vd, "toString", (function() {
        return yd.call(this)
    }), {
        enumerable: !0
    }), fc) {
    var Id = fc.createObjectURL,
        Md = fc.revokeObjectURL;
    Id && yo(gd, "createObjectURL", (function(e) {
        return Id.apply(fc, arguments)
    })), Md && yo(gd, "revokeObjectURL", (function(e) {
        return Md.apply(fc, arguments)
    }))
}

function Ld(e) {
    return (Ld = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function Rd(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Nd(e, t) {
    for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
}

function jd(e, t, n) {
    return t && Nd(e.prototype, t), n && Nd(e, n), e
}

function $d(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Dd(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        t && (i = i.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, i)
    }
    return n
}

function Fd(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Dd(Object(n), !0).forEach((function(t) {
            $d(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dd(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
    }
    return e
}

function Hd(e, t) {
    if (null == e) return {};
    var n, i, r = function(e, t) {
        if (null == e) return {};
        var n, i, r = {},
            o = Object.keys(e);
        for (i = 0; i < o.length; i++) n = o[i], t.indexOf(n) >= 0 || (r[n] = e[n]);
        return r
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (i = 0; i < o.length; i++) n = o[i], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
    }
    return r
}

function Ud(e, t) {
    return function(e) {
        if (Array.isArray(e)) return e
    }(e) || function(e, t) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
        var n = [],
            i = !0,
            r = !1,
            o = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
        } catch (e) {
            r = !0, o = e
        } finally {
            try {
                i || null == s.return || s.return()
            } finally {
                if (r) throw o
            }
        }
        return n
    }(e, t) || Bd(e, t) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
}

function qd(e) {
    return function(e) {
        if (Array.isArray(e)) return zd(e)
    }(e) || function(e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
    }(e) || Bd(e) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
}

function Bd(e, t) {
    if (e) {
        if ("string" == typeof e) return zd(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zd(e, t) : void 0
    }
}

function zd(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
    return i
}
_a(gd, "URL"), Xo({
    global: !0,
    forced: !wu,
    sham: !Tr
}, {
    URL: gd
}),
function(e) {
    var t = function() {
            try {
                return !!Symbol.iterator
            } catch (e) {
                return !1
            }
        }(),
        n = function(e) {
            var n = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return t && (n[Symbol.iterator] = function() {
                return n
            }), n
        },
        i = function(e) {
            return encodeURIComponent(e).replace(/%20/g, "+")
        },
        r = function(e) {
            return decodeURIComponent(String(e).replace(/\+/g, " "))
        };
    (function() {
        try {
            var t = e.URLSearchParams;
            return "a=1" === new t("?a=1").toString() && "function" == typeof t.prototype.set
        } catch (e) {
            return !1
        }
    })() || function() {
        var r = function e(t) {
                Object.defineProperty(this, "_entries", {
                    writable: !0,
                    value: {}
                });
                var n = Ld(t);
                if ("undefined" === n);
                else if ("string" === n) "" !== t && this._fromString(t);
                else if (t instanceof e) {
                    var i = this;
                    t.forEach((function(e, t) {
                        i.append(t, e)
                    }))
                } else {
                    if (null === t || "object" !== n) throw new TypeError("Unsupported input's type for URLSearchParams");
                    if ("[object Array]" === Object.prototype.toString.call(t))
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            if ("[object Array]" !== Object.prototype.toString.call(o) && 2 === o.length) throw new TypeError("Expected [string, any] as entry at index " + r + " of URLSearchParams's input");
                            this.append(o[0], o[1])
                        } else
                            for (var a in t) t.hasOwnProperty(a) && this.append(a, t[a])
                }
            },
            o = r.prototype;
        o.append = function(e, t) {
            e in this._entries ? this._entries[e].push(String(t)) : this._entries[e] = [String(t)]
        }, o.delete = function(e) {
            delete this._entries[e]
        }, o.get = function(e) {
            return e in this._entries ? this._entries[e][0] : null
        }, o.getAll = function(e) {
            return e in this._entries ? this._entries[e].slice(0) : []
        }, o.has = function(e) {
            return e in this._entries
        }, o.set = function(e, t) {
            this._entries[e] = [String(t)]
        }, o.forEach = function(e, t) {
            var n;
            for (var i in this._entries)
                if (this._entries.hasOwnProperty(i)) {
                    n = this._entries[i];
                    for (var r = 0; r < n.length; r++) e.call(t, n[r], i, this)
                }
        }, o.keys = function() {
            var e = [];
            return this.forEach((function(t, n) {
                e.push(n)
            })), n(e)
        }, o.values = function() {
            var e = [];
            return this.forEach((function(t) {
                e.push(t)
            })), n(e)
        }, o.entries = function() {
            var e = [];
            return this.forEach((function(t, n) {
                e.push([n, t])
            })), n(e)
        }, t && (o[Symbol.iterator] = o.entries), o.toString = function() {
            var e = [];
            return this.forEach((function(t, n) {
                e.push(i(n) + "=" + i(t))
            })), e.join("&")
        }, e.URLSearchParams = r
    }();
    var o = e.URLSearchParams.prototype;
    "function" != typeof o.sort && (o.sort = function() {
        var e = this,
            t = [];
        this.forEach((function(n, i) {
            t.push([i, n]), e._entries || e.delete(i)
        })), t.sort((function(e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
        })), e._entries && (e._entries = {});
        for (var n = 0; n < t.length; n++) this.append(t[n][0], t[n][1])
    }), "function" != typeof o._fromString && Object.defineProperty(o, "_fromString", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: function(e) {
            if (this._entries) this._entries = {};
            else {
                var t = [];
                this.forEach((function(e, n) {
                    t.push(n)
                }));
                for (var n = 0; n < t.length; n++) this.delete(t[n])
            }
            var i, o = (e = e.replace(/^\?/, "")).split("&");
            for (n = 0; n < o.length; n++) i = o[n].split("="), this.append(r(i[0]), i.length > 1 ? r(i[1]) : "")
        }
    })
}(void 0 !== vr ? vr : "undefined" != typeof window ? window : "undefined" != typeof self ? self : vr),
function(e) {
    if (function() {
            try {
                var t = new e.URL("b", "http://a");
                return t.pathname = "c d", "http://a/c%20d" === t.href && t.searchParams
            } catch (e) {
                return !1
            }
        }() || function() {
            var t = e.URL,
                n = function(t, n) {
                    "string" != typeof t && (t = String(t));
                    var i, r = document;
                    if (n && (void 0 === e.location || n !== e.location.href)) {
                        (i = (r = document.implementation.createHTMLDocument("")).createElement("base")).href = n, r.head.appendChild(i);
                        try {
                            if (0 !== i.href.indexOf(n)) throw new Error(i.href)
                        } catch (e) {
                            throw new Error("URL unable to set base " + n + " due to " + e)
                        }
                    }
                    var o = r.createElement("a");
                    if (o.href = t, i && (r.body.appendChild(o), o.href = o.href), ":" === o.protocol || !/:/.test(o.href)) throw new TypeError("Invalid URL");
                    Object.defineProperty(this, "_anchorElement", {
                        value: o
                    });
                    var a = new e.URLSearchParams(this.search),
                        s = !0,
                        l = !0,
                        u = this;
                    ["append", "delete", "set"].forEach((function(e) {
                        var t = a[e];
                        a[e] = function() {
                            t.apply(a, arguments), s && (l = !1, u.search = a.toString(), l = !0)
                        }
                    })), Object.defineProperty(this, "searchParams", {
                        value: a,
                        enumerable: !0
                    });
                    var c = void 0;
                    Object.defineProperty(this, "_updateSearchParams", {
                        enumerable: !1,
                        configurable: !1,
                        writable: !1,
                        value: function() {
                            this.search !== c && (c = this.search, l && (s = !1, this.searchParams._fromString(this.search), s = !0))
                        }
                    })
                },
                i = n.prototype;
            ["hash", "host", "hostname", "port", "protocol"].forEach((function(e) {
                ! function(e) {
                    Object.defineProperty(i, e, {
                        get: function() {
                            return this._anchorElement[e]
                        },
                        set: function(t) {
                            this._anchorElement[e] = t
                        },
                        enumerable: !0
                    })
                }(e)
            })), Object.defineProperty(i, "search", {
                get: function() {
                    return this._anchorElement.search
                },
                set: function(e) {
                    this._anchorElement.search = e, this._updateSearchParams()
                },
                enumerable: !0
            }), Object.defineProperties(i, {
                toString: {
                    get: function() {
                        var e = this;
                        return function() {
                            return e.href
                        }
                    }
                },
                href: {
                    get: function() {
                        return this._anchorElement.href.replace(/\?$/, "")
                    },
                    set: function(e) {
                        this._anchorElement.href = e, this._updateSearchParams()
                    },
                    enumerable: !0
                },
                pathname: {
                    get: function() {
                        return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                    },
                    set: function(e) {
                        this._anchorElement.pathname = e
                    },
                    enumerable: !0
                },
                origin: {
                    get: function() {
                        var e = {
                                "http:": 80,
                                "https:": 443,
                                "ftp:": 21
                            } [this._anchorElement.protocol],
                            t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                        return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "")
                    },
                    enumerable: !0
                },
                password: {
                    get: function() {
                        return ""
                    },
                    set: function(e) {},
                    enumerable: !0
                },
                username: {
                    get: function() {
                        return ""
                    },
                    set: function(e) {},
                    enumerable: !0
                }
            }), n.createObjectURL = function(e) {
                return t.createObjectURL.apply(t, arguments)
            }, n.revokeObjectURL = function(e) {
                return t.revokeObjectURL.apply(t, arguments)
            }, e.URL = n
        }(), void 0 !== e.location && !("origin" in e.location)) {
        var t = function() {
            return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "")
        };
        try {
            Object.defineProperty(e.location, "origin", {
                get: t,
                enumerable: !0
            })
        } catch (n) {
            setInterval((function() {
                e.location.origin = t()
            }), 100)
        }
    }
}(void 0 !== vr ? vr : "undefined" != typeof window ? window : "undefined" != typeof self ? self : vr);
var Vd = pa("isConcatSpreadable"),
    Wd = sl >= 51 || !wr((function() {
        var e = [];
        return e[Vd] = !1, e.concat()[0] !== e
    })),
    Gd = ul("concat"),
    Xd = function(e) {
        if (!Lr(e)) return !1;
        var t = e[Vd];
        return void 0 !== t ? !!t : Ko(e)
    };
Xo({
    target: "Array",
    proto: !0,
    forced: !Wd || !Gd
}, {
    concat: function(e) {
        var t, n, i, r, o, a = Zo(this),
            s = xa(a, 0),
            l = 0;
        for (t = -1, i = arguments.length; t < i; t++)
            if (Xd(o = -1 === t ? a : arguments[t])) {
                if (l + (r = So(o.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                for (n = 0; n < r; n++, l++) n in o && nl(s, l, o[n])
            } else {
                if (l >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                nl(s, l++, o)
            } return s.length = l, s
    }
});
var Yd = Ea.filter,
    Qd = ul("filter"),
    Kd = ms("filter");
Xo({
    target: "Array",
    proto: !0,
    forced: !Qd || !Kd
}, {
    filter: function(e) {
        return Yd(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
});
var Zd = Ea.find,
    Jd = !0,
    eh = ms("find");
"find" in [] && Array(1).find((function() {
    Jd = !1
})), Xo({
    target: "Array",
    proto: !0,
    forced: Jd || !eh
}, {
    find: function(e) {
        return Zd(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}), Ps("find");
var th = pa("iterator"),
    nh = !1;
try {
    var ih = 0,
        rh = {
            next: function() {
                return {
                    done: !!ih++
                }
            },
            return: function() {
                nh = !0
            }
        };
    rh[th] = function() {
        return this
    }, Array.from(rh, (function() {
        throw 2
    }))
} catch (e) {}
var oh = function(e, t) {
        if (!t && !nh) return !1;
        var n = !1;
        try {
            var i = {};
            i[th] = function() {
                return {
                    next: function() {
                        return {
                            done: n = !0
                        }
                    }
                }
            }, e(i)
        } catch (e) {}
        return n
    },
    ah = !oh((function(e) {
        Array.from(e)
    }));
Xo({
    target: "Array",
    stat: !0,
    forced: ah
}, {
    from: Mu
});
var sh = Io.includes,
    lh = ms("indexOf", {
        ACCESSORS: !0,
        1: 0
    });
Xo({
    target: "Array",
    proto: !0,
    forced: !lh
}, {
    includes: function(e) {
        return sh(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}), Ps("includes");
var uh = Ea.map,
    ch = ul("map"),
    dh = ms("map");
Xo({
    target: "Array",
    proto: !0,
    forced: !ch || !dh
}, {
    map: function(e) {
        return uh(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
});
var hh = function(e, t, n) {
        var i, r;
        return qs && "function" == typeof(i = t.constructor) && i !== n && Lr(r = i.prototype) && r !== n.prototype && qs(e, r), e
    },
    fh = "\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff",
    ph = "[" + fh + "]",
    mh = RegExp("^" + ph + ph + "*"),
    gh = RegExp(ph + ph + "*$"),
    vh = function(e) {
        return function(t) {
            var n = String(Ir(t));
            return 1 & e && (n = n.replace(mh, "")), 2 & e && (n = n.replace(gh, "")), n
        }
    },
    yh = {
        start: vh(1),
        end: vh(2),
        trim: vh(3)
    },
    bh = jo.f,
    _h = qr.f,
    wh = Vr.f,
    Th = yh.trim,
    kh = _r.Number,
    xh = kh.prototype,
    Ah = "Number" == Or(aa(xh)),
    Sh = function(e) {
        var t, n, i, r, o, a, s, l, u = Rr(e, !1);
        if ("string" == typeof u && u.length > 2)
            if (43 === (t = (u = Th(u)).charCodeAt(0)) || 45 === t) {
                if (88 === (n = u.charCodeAt(2)) || 120 === n) return NaN
            } else if (48 === t) {
            switch (u.charCodeAt(1)) {
                case 66:
                case 98:
                    i = 2, r = 49;
                    break;
                case 79:
                case 111:
                    i = 8, r = 55;
                    break;
                default:
                    return +u
            }
            for (a = (o = u.slice(2)).length, s = 0; s < a; s++)
                if ((l = o.charCodeAt(s)) < 48 || l > r) return NaN;
            return parseInt(o, i)
        }
        return +u
    };
if (Wo("Number", !kh(" 0o1") || !kh("0b1") || kh("+0x1"))) {
    for (var Eh, Oh = function(e) {
            var t = arguments.length < 1 ? 0 : e,
                n = this;
            return n instanceof Oh && (Ah ? wr((function() {
                xh.valueOf.call(n)
            })) : "Number" != Or(n)) ? hh(new kh(Sh(t)), n, Oh) : Sh(t)
        }, Ch = Tr ? bh(kh) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), Ph = 0; Ch.length > Ph; Ph++) jr(kh, Eh = Ch[Ph]) && !jr(Oh, Eh) && wh(Oh, Eh, _h(kh, Eh));
    Oh.prototype = xh, xh.constructor = Oh, yo(_r, "Number", Oh)
}
var Ih = wr((function() {
    Jo(1)
}));
Xo({
    target: "Object",
    stat: !0,
    forced: Ih
}, {
    keys: function(e) {
        return Jo(Zo(e))
    }
});
var Mh = function(e) {
        if (iu(e)) throw TypeError("The method doesn't accept regular expressions");
        return e
    },
    Lh = pa("match"),
    Rh = function(e) {
        var t = /./;
        try {
            "/./" [e](t)
        } catch (n) {
            try {
                return t[Lh] = !1, "/./" [e](t)
            } catch (e) {}
        }
        return !1
    };
Xo({
    target: "String",
    proto: !0,
    forced: !Rh("includes")
}, {
    includes: function(e) {
        return !!~String(Ir(this)).indexOf(Mh(e), arguments.length > 1 ? arguments[1] : void 0)
    }
});
var Nh = !wr((function() {
        return Object.isExtensible(Object.preventExtensions({}))
    })),
    jh = yr((function(e) {
        var t = Vr.f,
            n = oo("meta"),
            i = 0,
            r = Object.isExtensible || function() {
                return !0
            },
            o = function(e) {
                t(e, n, {
                    value: {
                        objectID: "O" + ++i,
                        weakData: {}
                    }
                })
            },
            a = e.exports = {
                REQUIRED: !1,
                fastKey: function(e, t) {
                    if (!Lr(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!jr(e, n)) {
                        if (!r(e)) return "F";
                        if (!t) return "E";
                        o(e)
                    }
                    return e[n].objectID
                },
                getWeakData: function(e, t) {
                    if (!jr(e, n)) {
                        if (!r(e)) return !0;
                        if (!t) return !1;
                        o(e)
                    }
                    return e[n].weakData
                },
                onFreeze: function(e) {
                    return Nh && a.REQUIRED && r(e) && !jr(e, n) && o(e), e
                }
            };
        lo[n] = !0
    })),
    $h = (jh.REQUIRED, jh.fastKey, jh.getWeakData, jh.onFreeze, yr((function(e) {
        var t = function(e, t) {
            this.stopped = e, this.result = t
        };
        (e.exports = function(e, n, i, r, o) {
            var a, s, l, u, c, d, h, f = Ta(n, i, r ? 2 : 1);
            if (o) a = e;
            else {
                if ("function" != typeof(s = Iu(e))) throw TypeError("Target is not iterable");
                if (Cu(s)) {
                    for (l = 0, u = So(e.length); u > l; l++)
                        if ((c = r ? f(Br(h = e[l])[0], h[1]) : f(e[l])) && c instanceof t) return c;
                    return new t(!1)
                }
                a = s.call(e)
            }
            for (d = a.next; !(h = d.call(a)).done;)
                if ("object" == typeof(c = Su(a, f, h.value, r)) && c && c instanceof t) return c;
            return new t(!1)
        }).stop = function(e) {
            return new t(!0, e)
        }
    }))),
    Dh = jh.getWeakData,
    Fh = vo.set,
    Hh = vo.getterFor,
    Uh = Ea.find,
    qh = Ea.findIndex,
    Bh = 0,
    zh = function(e) {
        return e.frozen || (e.frozen = new Vh)
    },
    Vh = function() {
        this.entries = []
    },
    Wh = function(e, t) {
        return Uh(e.entries, (function(e) {
            return e[0] === t
        }))
    };
Vh.prototype = {
    get: function(e) {
        var t = Wh(this, e);
        if (t) return t[1]
    },
    has: function(e) {
        return !!Wh(this, e)
    },
    set: function(e, t) {
        var n = Wh(this, e);
        n ? n[1] = t : this.entries.push([e, t])
    },
    delete: function(e) {
        var t = qh(this.entries, (function(t) {
            return t[0] === e
        }));
        return ~t && this.entries.splice(t, 1), !!~t
    }
};
var Gh = {
        getConstructor: function(e, t, n, i) {
            var r = e((function(e, o) {
                    Tu(e, r, t), Fh(e, {
                        type: t,
                        id: Bh++,
                        frozen: void 0
                    }), null != o && $h(o, e[i], e, n)
                })),
                o = Hh(t),
                a = function(e, t, n) {
                    var i = o(e),
                        r = Dh(Br(t), !0);
                    return !0 === r ? zh(i).set(t, n) : r[i.id] = n, e
                };
            return Uu(r.prototype, {
                delete: function(e) {
                    var t = o(this);
                    if (!Lr(e)) return !1;
                    var n = Dh(e);
                    return !0 === n ? zh(t).delete(e) : n && jr(n, t.id) && delete n[t.id]
                },
                has: function(e) {
                    var t = o(this);
                    if (!Lr(e)) return !1;
                    var n = Dh(e);
                    return !0 === n ? zh(t).has(e) : n && jr(n, t.id)
                }
            }), Uu(r.prototype, n ? {
                get: function(e) {
                    var t = o(this);
                    if (Lr(e)) {
                        var n = Dh(e);
                        return !0 === n ? zh(t).get(e) : n ? n[t.id] : void 0
                    }
                },
                set: function(e, t) {
                    return a(this, e, t)
                }
            } : {
                add: function(e) {
                    return a(this, e, !0)
                }
            }), r
        }
    },
    Xh = (yr((function(e) {
        var t, n = vo.enforce,
            i = !_r.ActiveXObject && "ActiveXObject" in _r,
            r = Object.isExtensible,
            o = function(e) {
                return function() {
                    return e(this, arguments.length ? arguments[0] : void 0)
                }
            },
            a = e.exports = function(e, t, n) {
                var i = -1 !== e.indexOf("Map"),
                    r = -1 !== e.indexOf("Weak"),
                    o = i ? "set" : "add",
                    a = _r[e],
                    s = a && a.prototype,
                    l = a,
                    u = {},
                    c = function(e) {
                        var t = s[e];
                        yo(s, e, "add" == e ? function(e) {
                            return t.call(this, 0 === e ? 0 : e), this
                        } : "delete" == e ? function(e) {
                            return !(r && !Lr(e)) && t.call(this, 0 === e ? 0 : e)
                        } : "get" == e ? function(e) {
                            return r && !Lr(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                        } : "has" == e ? function(e) {
                            return !(r && !Lr(e)) && t.call(this, 0 === e ? 0 : e)
                        } : function(e, n) {
                            return t.call(this, 0 === e ? 0 : e, n), this
                        })
                    };
                if (Wo(e, "function" != typeof a || !(r || s.forEach && !wr((function() {
                        (new a).entries().next()
                    }))))) l = n.getConstructor(t, e, i, o), jh.REQUIRED = !0;
                else if (Wo(e, !0)) {
                    var d = new l,
                        h = d[o](r ? {} : -0, 1) != d,
                        f = wr((function() {
                            d.has(1)
                        })),
                        p = oh((function(e) {
                            new a(e)
                        })),
                        m = !r && wr((function() {
                            for (var e = new a, t = 5; t--;) e[o](t, t);
                            return !e.has(-0)
                        }));
                    p || ((l = t((function(t, n) {
                        Tu(t, l, e);
                        var r = hh(new a, t, l);
                        return null != n && $h(n, r[o], r, i), r
                    }))).prototype = s, s.constructor = l), (f || m) && (c("delete"), c("has"), i && c("get")), (m || h) && c(o), r && s.clear && delete s.clear
                }
                return u[e] = l, Xo({
                    global: !0,
                    forced: l != a
                }, u), _a(l, e), r || n.setStrong(l, e, i), l
            }("WeakMap", o, Gh);
        if (to && i) {
            t = Gh.getConstructor(o, "WeakMap", !0), jh.REQUIRED = !0;
            var s = a.prototype,
                l = s.delete,
                u = s.has,
                c = s.get,
                d = s.set;
            Uu(s, {
                delete: function(e) {
                    if (Lr(e) && !r(e)) {
                        var i = n(this);
                        return i.frozen || (i.frozen = new t), l.call(this, e) || i.frozen.delete(e)
                    }
                    return l.call(this, e)
                },
                has: function(e) {
                    if (Lr(e) && !r(e)) {
                        var i = n(this);
                        return i.frozen || (i.frozen = new t), u.call(this, e) || i.frozen.has(e)
                    }
                    return u.call(this, e)
                },
                get: function(e) {
                    if (Lr(e) && !r(e)) {
                        var i = n(this);
                        return i.frozen || (i.frozen = new t), u.call(this, e) ? c.call(this, e) : i.frozen.get(e)
                    }
                    return c.call(this, e)
                },
                set: function(e, i) {
                    if (Lr(e) && !r(e)) {
                        var o = n(this);
                        o.frozen || (o.frozen = new t), u.call(this, e) ? d.call(this, e, i) : o.frozen.set(e, i)
                    } else d.call(this, e, i);
                    return this
                }
            })
        }
    })), Ea.every),
    Yh = ds("every"),
    Qh = ms("every");
Xo({
    target: "Array",
    proto: !0,
    forced: !Yh || !Qh
}, {
    every: function(e) {
        return Xh(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}), Xo({
    target: "Object",
    stat: !0,
    forced: Object.assign !== Au
}, {
    assign: Au
});
var Kh = yh.trim;
Xo({
    target: "String",
    proto: !0,
    forced: function(e) {
        return wr((function() {
            return !!fh[e]() || "â€‹Â…á Ž" != "â€‹Â…á Ž" [e]() || fh[e].name !== e
        }))
    }("trim")
}, {
    trim: function() {
        return Kh(this)
    }
});
var Zh = Ea.some,
    Jh = ds("some"),
    ef = ms("some");
Xo({
    target: "Array",
    proto: !0,
    forced: !Jh || !ef
}, {
    some: function(e) {
        return Zh(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
});
var tf = "".repeat || function(e) {
        var t = String(Ir(this)),
            n = "",
            i = xo(e);
        if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions");
        for (; i > 0;
            (i >>>= 1) && (t += t)) 1 & i && (n += t);
        return n
    },
    nf = 1..toFixed,
    rf = Math.floor,
    of = function(e, t, n) {
        return 0 === t ? n : t % 2 == 1 ? of (e, t - 1, n * e) : of (e * e, t / 2, n)
    },
    af = nf && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !wr((function() {
        nf.call({})
    }));
Xo({
    target: "Number",
    proto: !0,
    forced: af
}, {
    toFixed: function(e) {
        var t, n, i, r, o = function(e) {
                if ("number" != typeof e && "Number" != Or(e)) throw TypeError("Incorrect invocation");
                return +e
            }(this),
            a = xo(e),
            s = [0, 0, 0, 0, 0, 0],
            l = "",
            u = "0",
            c = function(e, t) {
                for (var n = -1, i = t; ++n < 6;) i += e * s[n], s[n] = i % 1e7, i = rf(i / 1e7)
            },
            d = function(e) {
                for (var t = 6, n = 0; --t >= 0;) n += s[t], s[t] = rf(n / e), n = n % e * 1e7
            },
            h = function() {
                for (var e = 6, t = ""; --e >= 0;)
                    if ("" !== t || 0 === e || 0 !== s[e]) {
                        var n = String(s[e]);
                        t = "" === t ? n : t + tf.call("0", 7 - n.length) + n
                    } return t
            };
        if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");
        if (o != o) return "NaN";
        if (o <= -1e21 || o >= 1e21) return String(o);
        if (o < 0 && (l = "-", o = -o), o > 1e-21)
            if (n = (t = function(e) {
                    for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
                    for (; n >= 2;) t += 1, n /= 2;
                    return t
                }(o * of (2, 69, 1)) - 69) < 0 ? o * of (2, -t, 1) : o / of (2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
                for (c(0, n), i = a; i >= 7;) c(1e7, 0), i -= 7;
                for (c( of (10, i, 1), 0), i = t - 1; i >= 23;) d(1 << 23), i -= 23;
                d(1 << i), c(1, 1), d(2), u = h()
            } else c(0, n), c(1 << -t, 0), u = h() + tf.call("0", a);
        return u = a > 0 ? l + ((r = u.length) <= a ? "0." + tf.call("0", a - r) + u : u.slice(0, r - a) + "." + u.slice(r - a)) : l + u
    }
});
var sf = Ar.f,
    lf = function(e) {
        return function(t) {
            for (var n, i = Mr(t), r = Jo(i), o = r.length, a = 0, s = []; o > a;) n = r[a++], Tr && !sf.call(i, n) || s.push(e ? [n, i[n]] : i[n]);
            return s
        }
    },
    uf = {
        entries: lf(!0),
        values: lf(!1)
    },
    cf = uf.entries;
Xo({
    target: "Object",
    stat: !0
}, {
    entries: function(e) {
        return cf(e)
    }
});
var df = uf.values;
Xo({
    target: "Object",
    stat: !0
}, {
    values: function(e) {
        return df(e)
    }
}), Xo({
    target: "Number",
    stat: !0
}, {
    isNaN: function(e) {
        return e != e
    }
});
var hf = qr.f,
    ff = wr((function() {
        hf(1)
    }));

function pf(e, t) {
    for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
}

function mf(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function gf(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        t && (i = i.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, i)
    }
    return n
}

function vf(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? gf(Object(n), !0).forEach((function(t) {
            mf(e, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gf(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }))
    }
    return e
}
Xo({
    target: "Object",
    stat: !0,
    forced: !Tr || ff,
    sham: !Tr
}, {
    getOwnPropertyDescriptor: function(e, t) {
        return hf(Mr(e), t)
    }
}), Xo({
    target: "Object",
    stat: !0,
    sham: !Tr
}, {
    getOwnPropertyDescriptors: function(e) {
        for (var t, n, i = Mr(e), r = qr.f, o = Do(i), a = {}, s = 0; o.length > s;) void 0 !== (n = r(i, t = o[s++])) && nl(a, t, n);
        return a
    }
}), Wl("match", 1, (function(e, t, n) {
    return [function(t) {
        var n = Ir(this),
            i = null == t ? void 0 : t[e];
        return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
    }, function(e) {
        var i = n(t, e, this);
        if (i.done) return i.value;
        var r = Br(e),
            o = String(this);
        if (!r.global) return Yl(r, o);
        var a = r.unicode;
        r.lastIndex = 0;
        for (var s, l = [], u = 0; null !== (s = Yl(r, o));) {
            var c = String(s[0]);
            l[u] = c, "" === c && (r.lastIndex = Xl(o, So(r.lastIndex), a)), u++
        }
        return 0 === u ? null : l
    }]
}));
var yf = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
};

function bf(e, t) {
    return function() {
        return Array.from(document.querySelectorAll(t)).includes(this)
    }.call(e, t)
}
var _f = function(e) {
        return null != e ? e.constructor : null
    },
    wf = function(e, t) {
        return !!(e && t && e instanceof t)
    },
    Tf = function(e) {
        return null == e
    },
    kf = function(e) {
        return _f(e) === Object
    },
    xf = function(e) {
        return _f(e) === String
    },
    Af = function(e) {
        return Array.isArray(e)
    },
    Sf = function(e) {
        return wf(e, NodeList)
    },
    Ef = xf,
    Of = Af,
    Cf = Sf,
    Pf = function(e) {
        return wf(e, Element)
    },
    If = function(e) {
        return wf(e, Event)
    },
    Mf = function(e) {
        return Tf(e) || (xf(e) || Af(e) || Sf(e)) && !e.length || kf(e) && !Object.keys(e).length
    };

function Lf(e, t) {
    if (1 > t) {
        var n = function(e) {
            var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
        }(t);
        return parseFloat(e.toFixed(n))
    }
    return Math.round(e / t) * t
}
var Rf, Nf, jf, $f = function() {
        function e(t, n) {
            (function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            })(this, e), Pf(t) ? this.element = t : Ef(t) && (this.element = document.querySelector(t)), Pf(this.element) && Mf(this.element.rangeTouch) && (this.config = vf({}, yf, {}, n), this.init())
        }
        return function(e, t, n) {
            t && pf(e.prototype, t), n && pf(e, n)
        }(e, [{
            key: "init",
            value: function() {
                e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
            }
        }, {
            key: "destroy",
            value: function() {
                e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null)
            }
        }, {
            key: "listeners",
            value: function(e) {
                var t = this,
                    n = e ? "addEventListener" : "removeEventListener";
                ["touchstart", "touchmove", "touchend"].forEach((function(e) {
                    t.element[n](e, (function(e) {
                        return t.set(e)
                    }), !1)
                }))
            }
        }, {
            key: "get",
            value: function(t) {
                if (!e.enabled || !If(t)) return null;
                var n, i = t.target,
                    r = t.changedTouches[0],
                    o = parseFloat(i.getAttribute("min")) || 0,
                    a = parseFloat(i.getAttribute("max")) || 100,
                    s = parseFloat(i.getAttribute("step")) || 1,
                    l = i.getBoundingClientRect(),
                    u = 100 / l.width * (this.config.thumbWidth / 2) / 100;
                return 0 > (n = 100 / l.width * (r.clientX - l.left)) ? n = 0 : 100 < n && (n = 100), 50 > n ? n -= (100 - 2 * n) * u : 50 < n && (n += 2 * (n - 50) * u), o + Lf(n / 100 * (a - o), s)
            }
        }, {
            key: "set",
            value: function(t) {
                e.enabled && If(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function(e, t) {
                    if (e && t) {
                        var n = new Event(t, {
                            bubbles: !0
                        });
                        e.dispatchEvent(n)
                    }
                }(t.target, "touchend" === t.type ? "change" : "input"))
            }
        }], [{
            key: "setup",
            value: function(t) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                    i = null;
                if (Mf(t) || Ef(t) ? i = Array.from(document.querySelectorAll(Ef(t) ? t : 'input[type="range"]')) : Pf(t) ? i = [t] : Cf(t) ? i = Array.from(t) : Of(t) && (i = t.filter(Pf)), Mf(i)) return null;
                var r = vf({}, yf, {}, n);
                if (Ef(t) && r.watch) {
                    var o = new MutationObserver((function(n) {
                        Array.from(n).forEach((function(n) {
                            Array.from(n.addedNodes).forEach((function(n) {
                                Pf(n) && bf(n, t) && new e(n, r)
                            }))
                        }))
                    }));
                    o.observe(document.body, {
                        childList: !0,
                        subtree: !0
                    })
                }
                return i.map((function(t) {
                    return new e(t, n)
                }))
            }
        }, {
            key: "enabled",
            get: function() {
                return "ontouchstart" in document.documentElement
            }
        }]), e
    }(),
    Df = _r.Promise,
    Ff = pa("species"),
    Hf = function(e) {
        var t = wo(e),
            n = Vr.f;
        Tr && t && !t[Ff] && n(t, Ff, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    },
    Uf = /(iphone|ipod|ipad).*applewebkit/i.test(il),
    qf = _r.location,
    Bf = _r.setImmediate,
    zf = _r.clearImmediate,
    Vf = _r.process,
    Wf = _r.MessageChannel,
    Gf = _r.Dispatch,
    Xf = 0,
    Yf = {},
    Qf = function(e) {
        if (Yf.hasOwnProperty(e)) {
            var t = Yf[e];
            delete Yf[e], t()
        }
    },
    Kf = function(e) {
        return function() {
            Qf(e)
        }
    },
    Zf = function(e) {
        Qf(e.data)
    },
    Jf = function(e) {
        _r.postMessage(e + "", qf.protocol + "//" + qf.host)
    };
Bf && zf || (Bf = function(e) {
    for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
    return Yf[++Xf] = function() {
        ("function" == typeof e ? e : Function(e)).apply(void 0, t)
    }, Rf(Xf), Xf
}, zf = function(e) {
    delete Yf[e]
}, "process" == Or(Vf) ? Rf = function(e) {
    Vf.nextTick(Kf(e))
} : Gf && Gf.now ? Rf = function(e) {
    Gf.now(Kf(e))
} : Wf && !Uf ? (jf = (Nf = new Wf).port2, Nf.port1.onmessage = Zf, Rf = Ta(jf.postMessage, jf, 1)) : !_r.addEventListener || "function" != typeof postMessage || _r.importScripts || wr(Jf) || "file:" === qf.protocol ? Rf = "onreadystatechange" in Fr("script") ? function(e) {
    ta.appendChild(Fr("script")).onreadystatechange = function() {
        ta.removeChild(this), Qf(e)
    }
} : function(e) {
    setTimeout(Kf(e), 0)
} : (Rf = Jf, _r.addEventListener("message", Zf, !1)));
var ep, tp, np, ip, rp, op, ap, sp, lp = {
        set: Bf,
        clear: zf
    },
    up = qr.f,
    cp = lp.set,
    dp = _r.MutationObserver || _r.WebKitMutationObserver,
    hp = _r.process,
    fp = _r.Promise,
    pp = "process" == Or(hp),
    mp = up(_r, "queueMicrotask"),
    gp = mp && mp.value;
gp || (ep = function() {
    var e, t;
    for (pp && (e = hp.domain) && e.exit(); tp;) {
        t = tp.fn, tp = tp.next;
        try {
            t()
        } catch (e) {
            throw tp ? ip() : np = void 0, e
        }
    }
    np = void 0, e && e.enter()
}, pp ? ip = function() {
    hp.nextTick(ep)
} : dp && !Uf ? (rp = !0, op = document.createTextNode(""), new dp(ep).observe(op, {
    characterData: !0
}), ip = function() {
    op.data = rp = !rp
}) : fp && fp.resolve ? (ap = fp.resolve(void 0), sp = ap.then, ip = function() {
    sp.call(ap, ep)
}) : ip = function() {
    cp.call(_r, ep)
});
var vp, yp, bp, _p, wp = gp || function(e) {
        var t = {
            fn: e,
            next: void 0
        };
        np && (np.next = t), tp || (tp = t, ip()), np = t
    },
    Tp = function(e) {
        var t, n;
        this.promise = new e((function(e, i) {
            if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
            t = e, n = i
        })), this.resolve = wa(t), this.reject = wa(n)
    },
    kp = {
        f: function(e) {
            return new Tp(e)
        }
    },
    xp = function(e, t) {
        if (Br(e), Lr(t) && t.constructor === e) return t;
        var n = kp.f(e);
        return (0, n.resolve)(t), n.promise
    },
    Ap = function(e) {
        try {
            return {
                error: !1,
                value: e()
            }
        } catch (e) {
            return {
                error: !0,
                value: e
            }
        }
    },
    Sp = lp.set,
    Ep = pa("species"),
    Op = "Promise",
    Cp = vo.get,
    Pp = vo.set,
    Ip = vo.getterFor(Op),
    Mp = Df,
    Lp = _r.TypeError,
    Rp = _r.document,
    Np = _r.process,
    jp = wo("fetch"),
    $p = kp.f,
    Dp = $p,
    Fp = "process" == Or(Np),
    Hp = !!(Rp && Rp.createEvent && _r.dispatchEvent),
    Up = Wo(Op, (function() {
        if (!(Jr(Mp) !== String(Mp))) {
            if (66 === sl) return !0;
            if (!Fp && "function" != typeof PromiseRejectionEvent) return !0
        }
        if (sl >= 51 && /native code/.test(Mp)) return !1;
        var e = Mp.resolve(1),
            t = function(e) {
                e((function() {}), (function() {}))
            };
        return (e.constructor = {})[Ep] = t, !(e.then((function() {})) instanceof t)
    })),
    qp = Up || !oh((function(e) {
        Mp.all(e).catch((function() {}))
    })),
    Bp = function(e) {
        var t;
        return !(!Lr(e) || "function" != typeof(t = e.then)) && t
    },
    zp = function(e, t, n) {
        if (!t.notified) {
            t.notified = !0;
            var i = t.reactions;
            wp((function() {
                for (var r = t.value, o = 1 == t.state, a = 0; i.length > a;) {
                    var s, l, u, c = i[a++],
                        d = o ? c.ok : c.fail,
                        h = c.resolve,
                        f = c.reject,
                        p = c.domain;
                    try {
                        d ? (o || (2 === t.rejection && Xp(e, t), t.rejection = 1), !0 === d ? s = r : (p && p.enter(), s = d(r), p && (p.exit(), u = !0)), s === c.promise ? f(Lp("Promise-chain cycle")) : (l = Bp(s)) ? l.call(s, h, f) : h(s)) : f(r)
                    } catch (e) {
                        p && !u && p.exit(), f(e)
                    }
                }
                t.reactions = [], t.notified = !1, n && !t.rejection && Wp(e, t)
            }))
        }
    },
    Vp = function(e, t, n) {
        var i, r;
        Hp ? ((i = Rp.createEvent("Event")).promise = t, i.reason = n, i.initEvent(e, !1, !0), _r.dispatchEvent(i)) : i = {
            promise: t,
            reason: n
        }, (r = _r["on" + e]) ? r(i) : "unhandledrejection" === e && function(e, t) {
            var n = _r.console;
            n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
        }("Unhandled promise rejection", n)
    },
    Wp = function(e, t) {
        Sp.call(_r, (function() {
            var n, i = t.value;
            if (Gp(t) && (n = Ap((function() {
                    Fp ? Np.emit("unhandledRejection", i, e) : Vp("unhandledrejection", e, i)
                })), t.rejection = Fp || Gp(t) ? 2 : 1, n.error)) throw n.value
        }))
    },
    Gp = function(e) {
        return 1 !== e.rejection && !e.parent
    },
    Xp = function(e, t) {
        Sp.call(_r, (function() {
            Fp ? Np.emit("rejectionHandled", e) : Vp("rejectionhandled", e, t.value)
        }))
    },
    Yp = function(e, t, n, i) {
        return function(r) {
            e(t, n, r, i)
        }
    },
    Qp = function(e, t, n, i) {
        t.done || (t.done = !0, i && (t = i), t.value = n, t.state = 2, zp(e, t, !0))
    },
    Kp = function(e, t, n, i) {
        if (!t.done) {
            t.done = !0, i && (t = i);
            try {
                if (e === n) throw Lp("Promise can't be resolved itself");
                var r = Bp(n);
                r ? wp((function() {
                    var i = {
                        done: !1
                    };
                    try {
                        r.call(n, Yp(Kp, e, i, t), Yp(Qp, e, i, t))
                    } catch (n) {
                        Qp(e, i, n, t)
                    }
                })) : (t.value = n, t.state = 1, zp(e, t, !1))
            } catch (n) {
                Qp(e, {
                    done: !1
                }, n, t)
            }
        }
    };
Up && (Mp = function(e) {
    Tu(this, Mp, Op), wa(e), vp.call(this);
    var t = Cp(this);
    try {
        e(Yp(Kp, this, t), Yp(Qp, this, t))
    } catch (e) {
        Qp(this, t, e)
    }
}, (vp = function(e) {
    Pp(this, {
        type: Op,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: [],
        rejection: !1,
        state: 0,
        value: void 0
    })
}).prototype = Uu(Mp.prototype, {
    then: function(e, t) {
        var n = Ip(this),
            i = $p(ou(this, Mp));
        return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = Fp ? Np.domain : void 0, n.parent = !0, n.reactions.push(i), 0 != n.state && zp(this, n, !1), i.promise
    },
    catch: function(e) {
        return this.then(void 0, e)
    }
}), yp = function() {
    var e = new vp,
        t = Cp(e);
    this.promise = e, this.resolve = Yp(Kp, e, t), this.reject = Yp(Qp, e, t)
}, kp.f = $p = function(e) {
    return e === Mp || e === bp ? new yp(e) : Dp(e)
}, "function" == typeof Df && (_p = Df.prototype.then, yo(Df.prototype, "then", (function(e, t) {
    var n = this;
    return new Mp((function(e, t) {
        _p.call(n, e, t)
    })).then(e, t)
}), {
    unsafe: !0
}), "function" == typeof jp && Xo({
    global: !0,
    enumerable: !0,
    forced: !0
}, {
    fetch: function(e) {
        return xp(Mp, jp.apply(_r, arguments))
    }
}))), Xo({
    global: !0,
    wrap: !0,
    forced: Up
}, {
    Promise: Mp
}), _a(Mp, Op, !1), Hf(Op), bp = wo(Op), Xo({
    target: Op,
    stat: !0,
    forced: Up
}, {
    reject: function(e) {
        var t = $p(this);
        return t.reject.call(void 0, e), t.promise
    }
}), Xo({
    target: Op,
    stat: !0,
    forced: Up
}, {
    resolve: function(e) {
        return xp(this, e)
    }
}), Xo({
    target: Op,
    stat: !0,
    forced: qp
}, {
    all: function(e) {
        var t = this,
            n = $p(t),
            i = n.resolve,
            r = n.reject,
            o = Ap((function() {
                var n = wa(t.resolve),
                    o = [],
                    a = 0,
                    s = 1;
                $h(e, (function(e) {
                    var l = a++,
                        u = !1;
                    o.push(void 0), s++, n.call(t, e).then((function(e) {
                        u || (u = !0, o[l] = e, --s || i(o))
                    }), r)
                })), --s || i(o)
            }));
        return o.error && r(o.value), n.promise
    },
    race: function(e) {
        var t = this,
            n = $p(t),
            i = n.reject,
            r = Ap((function() {
                var r = wa(t.resolve);
                $h(e, (function(e) {
                    r.call(t, e).then(n.resolve, i)
                }))
            }));
        return r.error && i(r.value), n.promise
    }
});
var Zp, Jp = qr.f,
    em = "".startsWith,
    tm = Math.min,
    nm = Rh("startsWith"),
    im = !(nm || (Zp = Jp(String.prototype, "startsWith"), !Zp || Zp.writable));
Xo({
    target: "String",
    proto: !0,
    forced: !im && !nm
}, {
    startsWith: function(e) {
        var t = String(Ir(this));
        Mh(e);
        var n = So(tm(arguments.length > 1 ? arguments[1] : void 0, t.length)),
            i = String(e);
        return em ? em.call(t, i, n) : t.slice(n, n + i.length) === i
    }
});
var rm, om, am, sm = function(e) {
        return null != e ? e.constructor : null
    },
    lm = function(e, t) {
        return Boolean(e && t && e instanceof t)
    },
    um = function(e) {
        return null == e
    },
    cm = function(e) {
        return sm(e) === Object
    },
    dm = function(e) {
        return sm(e) === String
    },
    hm = function(e) {
        return sm(e) === Function
    },
    fm = function(e) {
        return Array.isArray(e)
    },
    pm = function(e) {
        return lm(e, NodeList)
    },
    mm = function(e) {
        return um(e) || (dm(e) || fm(e) || pm(e)) && !e.length || cm(e) && !Object.keys(e).length
    },
    gm = um,
    vm = cm,
    ym = function(e) {
        return sm(e) === Number && !Number.isNaN(e)
    },
    bm = dm,
    _m = function(e) {
        return sm(e) === Boolean
    },
    wm = hm,
    Tm = fm,
    km = pm,
    xm = function(e) {
        return lm(e, Element)
    },
    Am = function(e) {
        return lm(e, Event)
    },
    Sm = function(e) {
        return lm(e, KeyboardEvent)
    },
    Em = function(e) {
        return lm(e, TextTrack) || !um(e) && dm(e.kind)
    },
    Om = function(e) {
        return lm(e, Promise) && hm(e.then)
    },
    Cm = function(e) {
        if (lm(e, window.URL)) return !0;
        if (!dm(e)) return !1;
        var t = e;
        e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
        try {
            return !mm(new URL(t).hostname)
        } catch (e) {
            return !1
        }
    },
    Pm = mm,
    Im = (rm = document.createElement("span"), om = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
    }, am = Object.keys(om).find((function(e) {
        return void 0 !== rm.style[e]
    })), !!bm(am) && om[am]);

function Mm(e, t) {
    setTimeout((function() {
        try {
            e.hidden = !0, e.offsetHeight, e.hidden = !1
        } catch (e) {}
    }), t)
}
var Lm = {
        isIE:
            /* @cc_on!@ */
            !!document.documentMode,
        isEdge: window.navigator.userAgent.includes("Edge"),
        isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
        isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
        isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
    },
    Rm = function(e) {
        return function(t, n, i, r) {
            wa(n);
            var o = Zo(t),
                a = Pr(o),
                s = So(o.length),
                l = e ? s - 1 : 0,
                u = e ? -1 : 1;
            if (i < 2)
                for (;;) {
                    if (l in a) {
                        r = a[l], l += u;
                        break
                    }
                    if (l += u, e ? l < 0 : s <= l) throw TypeError("Reduce of empty array with no initial value")
                }
            for (; e ? l >= 0 : s > l; l += u) l in a && (r = n(r, a[l], l, o));
            return r
        }
    },
    Nm = {
        left: Rm(!1),
        right: Rm(!0)
    }.left,
    jm = ds("reduce"),
    $m = ms("reduce", {
        1: 0
    });

function Dm(e, t) {
    return t.split(".").reduce((function(e, t) {
        return e && e[t]
    }), e)
}

function Fm() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
    if (!n.length) return e;
    var r = n.shift();
    return vm(r) ? (Object.keys(r).forEach((function(t) {
        vm(r[t]) ? (Object.keys(e).includes(t) || Object.assign(e, $d({}, t, {})), Fm(e[t], r[t])) : Object.assign(e, $d({}, t, r[t]))
    })), Fm.apply(void 0, [e].concat(n))) : e
}

function Hm(e, t) {
    var n = e.length ? e : [e];
    Array.from(n).reverse().forEach((function(e, n) {
        var i = n > 0 ? t.cloneNode(!0) : t,
            r = e.parentNode,
            o = e.nextSibling;
        i.appendChild(e), o ? r.insertBefore(i, o) : r.appendChild(i)
    }))
}

function Um(e, t) {
    xm(e) && !Pm(t) && Object.entries(t).filter((function(e) {
        var t = Ud(e, 2)[1];
        return !gm(t)
    })).forEach((function(t) {
        var n = Ud(t, 2),
            i = n[0],
            r = n[1];
        return e.setAttribute(i, r)
    }))
}

function qm(e, t, n) {
    var i = document.createElement(e);
    return vm(t) && Um(i, t), bm(n) && (i.innerText = n), i
}

function Bm(e, t, n, i) {
    xm(t) && t.appendChild(qm(e, n, i))
}

function zm(e) {
    km(e) || Tm(e) ? Array.from(e).forEach(zm) : xm(e) && xm(e.parentNode) && e.parentNode.removeChild(e)
}

function Vm(e) {
    if (xm(e))
        for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
}

function Wm(e, t) {
    return xm(t) && xm(t.parentNode) && xm(e) ? (t.parentNode.replaceChild(e, t), e) : null
}

function Gm(e, t) {
    if (!bm(e) || Pm(e)) return {};
    var n = {},
        i = Fm({}, t);
    return e.split(",").forEach((function(e) {
        var t = e.trim(),
            r = t.replace(".", ""),
            o = t.replace(/[[\]]/g, "").split("="),
            a = Ud(o, 1)[0],
            s = o.length > 1 ? o[1].replace(/["']/g, "") : "";
        switch (t.charAt(0)) {
            case ".":
                bm(i.class) ? n.class = "".concat(i.class, " ").concat(r) : n.class = r;
                break;
            case "#":
                n.id = t.replace("#", "");
                break;
            case "[":
                n[a] = s
        }
    })), Fm(i, n)
}

function Xm(e, t) {
    if (xm(e)) {
        var n = t;
        _m(n) || (n = !e.hidden), e.hidden = n
    }
}

function Ym(e, t, n) {
    if (km(e)) return Array.from(e).map((function(e) {
        return Ym(e, t, n)
    }));
    if (xm(e)) {
        var i = "toggle";
        return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t)
    }
    return !1
}

function Qm(e, t) {
    return xm(e) && e.classList.contains(t)
}

function Km(e, t) {
    var n = Element.prototype;
    return (n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function() {
        return Array.from(document.querySelectorAll(t)).includes(this)
    }).call(e, t)
}

function Zm(e) {
    return this.elements.container.querySelectorAll(e)
}

function Jm(e) {
    return this.elements.container.querySelector(e)
}

function eg() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    xm(e) && (e.focus({
        preventScroll: !0
    }), t && Ym(e, this.config.classNames.tabFocus))
}
Xo({
    target: "Array",
    proto: !0,
    forced: !jm || !$m
}, {
    reduce: function(e) {
        return Nm(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
    }
});
var tg, ng = {
        "audio/ogg": "vorbis",
        "audio/wav": "1",
        "video/webm": "vp8, vorbis",
        "video/mp4": "avc1.42E01E, mp4a.40.2",
        "video/ogg": "theora"
    },
    ig = {
        audio: "canPlayType" in document.createElement("audio"),
        video: "canPlayType" in document.createElement("video"),
        check: function(e, t, n) {
            var i = Lm.isIPhone && n && ig.playsinline,
                r = ig[e] || "html5" !== t;
            return {
                api: r,
                ui: r && ig.rangeInput && ("video" !== e || !Lm.isIPhone || i)
            }
        },
        pip: !(Lm.isIPhone || !wm(qm("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || qm("video").disablePictureInPicture)),
        airplay: wm(window.WebKitPlaybackTargetAvailabilityEvent),
        playsinline: "playsInline" in document.createElement("video"),
        mime: function(e) {
            if (Pm(e)) return !1;
            var t = Ud(e.split("/"), 1)[0],
                n = e;
            if (!this.isHTML5 || t !== this.type) return !1;
            Object.keys(ng).includes(n) && (n += '; codecs="'.concat(ng[e], '"'));
            try {
                return Boolean(n && this.media.canPlayType(n).replace(/no/, ""))
            } catch (e) {
                return !1
            }
        },
        textTracks: "textTracks" in document.createElement("video"),
        rangeInput: (tg = document.createElement("input"), tg.type = "range", "range" === tg.type),
        touch: "ontouchstart" in document.documentElement,
        transitions: !1 !== Im,
        reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
    },
    rg = function() {
        var e = !1;
        try {
            var t = Object.defineProperty({}, "passive", {
                get: function() {
                    return e = !0, null
                }
            });
            window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
        } catch (e) {}
        return e
    }();

function og(e, t, n) {
    var i = this,
        r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
        a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
    if (e && "addEventListener" in e && !Pm(t) && wm(n)) {
        var s = t.split(" "),
            l = a;
        rg && (l = {
            passive: o,
            capture: a
        }), s.forEach((function(t) {
            i && i.eventListeners && r && i.eventListeners.push({
                element: e,
                type: t,
                callback: n,
                options: l
            }), e[r ? "addEventListener" : "removeEventListener"](t, n, l)
        }))
    }
}

function ag(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
    og.call(this, e, t, n, !0, i, r)
}

function sg(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
    og.call(this, e, t, n, !1, i, r)
}

function lg(e) {
    var t = this,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        i = arguments.length > 2 ? arguments[2] : void 0,
        r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        a = function a() {
            sg(e, n, a, r, o);
            for (var s = arguments.length, l = new Array(s), u = 0; u < s; u++) l[u] = arguments[u];
            i.apply(t, l)
        };
    og.call(this, e, n, a, !0, r, o)
}

function ug(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    if (xm(e) && !Pm(t)) {
        var r = new CustomEvent(t, {
            bubbles: n,
            detail: Fd(Fd({}, i), {}, {
                plyr: this
            })
        });
        e.dispatchEvent(r)
    }
}

function cg() {
    this && this.eventListeners && (this.eventListeners.forEach((function(e) {
        var t = e.element,
            n = e.type,
            i = e.callback,
            r = e.options;
        t.removeEventListener(n, i, r)
    })), this.eventListeners = [])
}

function dg() {
    var e = this;
    return new Promise((function(t) {
        return e.ready ? setTimeout(t, 0) : ag.call(e, e.elements.container, "ready", t)
    })).then((function() {}))
}

function hg(e) {
    Om(e) && e.then(null, (function() {}))
}

function fg(e) {
    return !!(Tm(e) || bm(e) && e.includes(":")) && (Tm(e) ? e : e.split(":")).map(Number).every(ym)
}

function pg(e) {
    if (!Tm(e) || !e.every(ym)) return null;
    var t = Ud(e, 2),
        n = t[0],
        i = t[1],
        r = function e(t, n) {
            return 0 === n ? t : e(n, t % n)
        }(n, i);
    return [n / r, i / r]
}

function mg(e) {
    var t = function(e) {
            return fg(e) ? e.split(":").map(Number) : null
        },
        n = t(e);
    if (null === n && (n = t(this.config.ratio)), null === n && !Pm(this.embed) && Tm(this.embed.ratio) && (n = this.embed.ratio), null === n && this.isHTML5) {
        var i = this.media;
        n = pg([i.videoWidth, i.videoHeight])
    }
    return n
}

function gg(e) {
    if (!this.isVideo) return {};
    var t = this.elements.wrapper,
        n = mg.call(this, e),
        i = Ud(Tm(n) ? n : [0, 0], 2),
        r = 100 / i[0] * i[1];
    if (t.style.paddingBottom = "".concat(r, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
        var o = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
            a = (o - r) / (o / 50);
        this.media.style.transform = "translateY(-".concat(a, "%)")
    } else this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== n);
    return {
        padding: r,
        ratio: n
    }
}
var vg = {
    getSources: function() {
        var e = this;
        return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter((function(t) {
            var n = t.getAttribute("type");
            return !!Pm(n) || ig.mime.call(e, n)
        })) : []
    },
    getQualityOptions: function() {
        return this.config.quality.forced ? this.config.quality.options : vg.getSources.call(this).map((function(e) {
            return Number(e.getAttribute("size"))
        })).filter(Boolean)
    },
    setup: function() {
        if (this.isHTML5) {
            var e = this;
            e.options.speed = e.config.speed.options, Pm(this.config.ratio) || gg.call(e), Object.defineProperty(e.media, "quality", {
                get: function() {
                    var t = vg.getSources.call(e).find((function(t) {
                        return t.getAttribute("src") === e.source
                    }));
                    return t && Number(t.getAttribute("size"))
                },
                set: function(t) {
                    if (e.quality !== t) {
                        if (e.config.quality.forced && wm(e.config.quality.onChange)) e.config.quality.onChange(t);
                        else {
                            var n = vg.getSources.call(e).find((function(e) {
                                return Number(e.getAttribute("size")) === t
                            }));
                            if (!n) return;
                            var i = e.media,
                                r = i.currentTime,
                                o = i.paused,
                                a = i.preload,
                                s = i.readyState,
                                l = i.playbackRate;
                            e.media.src = n.getAttribute("src"), ("none" !== a || s) && (e.once("loadedmetadata", (function() {
                                e.speed = l, e.currentTime = r, o || hg(e.play())
                            })), e.media.load())
                        }
                        ug.call(e, e.media, "qualitychange", !1, {
                            quality: t
                        })
                    }
                }
            })
        }
    },
    cancelRequests: function() {
        this.isHTML5 && (zm(vg.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
    }
};

function yg(e) {
    return Tm(e) ? e.filter((function(t, n) {
        return e.indexOf(t) === n
    })) : e
}
var bg = Vr.f,
    _g = jo.f,
    wg = vo.set,
    Tg = pa("match"),
    kg = _r.RegExp,
    xg = kg.prototype,
    Ag = /a/g,
    Sg = /a/g,
    Eg = new kg(Ag) !== Ag,
    Og = kl.UNSUPPORTED_Y;
if (Tr && Wo("RegExp", !Eg || Og || wr((function() {
        return Sg[Tg] = !1, kg(Ag) != Ag || kg(Sg) == Sg || "/a/i" != kg(Ag, "i")
    })))) {
    for (var Cg = function(e, t) {
            var n, i = this instanceof Cg,
                r = iu(e),
                o = void 0 === t;
            if (!i && r && e.constructor === Cg && o) return e;
            Eg ? r && !o && (e = e.source) : e instanceof Cg && (o && (t = wl.call(e)), e = e.source), Og && (n = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, ""));
            var a = hh(Eg ? new kg(e, t) : kg(e, t), i ? this : xg, Cg);
            return Og && n && wg(a, {
                sticky: n
            }), a
        }, Pg = function(e) {
            e in Cg || bg(Cg, e, {
                configurable: !0,
                get: function() {
                    return kg[e]
                },
                set: function(t) {
                    kg[e] = t
                }
            })
        }, Ig = _g(kg), Mg = 0; Ig.length > Mg;) Pg(Ig[Mg++]);
    xg.constructor = Cg, Cg.prototype = xg, yo(_r, "RegExp", Cg)
}

function Lg(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
    return Pm(e) ? e : e.toString().replace(/{(\d+)}/g, (function(e, t) {
        return n[t].toString()
    }))
}
Hf("RegExp");
var Rg = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), n.toString())
    },
    Ng = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return e.toString().replace(/\w\S*/g, (function(e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
        }))
    };

function jg() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = e.toString();
    return t = Rg(t, "-", " "), t = Rg(t, "_", " "), t = Ng(t), Rg(t, " ", "")
}

function $g(e) {
    var t = document.createElement("div");
    return t.appendChild(e), t.innerHTML
}
var Dg = {
        pip: "PIP",
        airplay: "AirPlay",
        html5: "HTML5",
        vimeo: "Vimeo",
        youtube: "YouTube"
    },
    Fg = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (Pm(e) || Pm(t)) return "";
        var n = Dm(t.i18n, e);
        if (Pm(n)) return Object.keys(Dg).includes(e) ? Dg[e] : "";
        var i = {
            "{seektime}": t.seekTime,
            "{title}": t.title
        };
        return Object.entries(i).forEach((function(e) {
            var t = Ud(e, 2),
                i = t[0],
                r = t[1];
            n = Rg(n, i, r)
        })), n
    },
    Hg = function() {
        function e(t) {
            Rd(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
        }
        return jd(e, [{
            key: "get",
            value: function(t) {
                if (!e.supported || !this.enabled) return null;
                var n = window.localStorage.getItem(this.key);
                if (Pm(n)) return null;
                var i = JSON.parse(n);
                return bm(t) && t.length ? i[t] : i
            }
        }, {
            key: "set",
            value: function(t) {
                if (e.supported && this.enabled && vm(t)) {
                    var n = this.get();
                    Pm(n) && (n = {}), Fm(n, t), window.localStorage.setItem(this.key, JSON.stringify(n))
                }
            }
        }], [{
            key: "supported",
            get: function() {
                try {
                    if (!("localStorage" in window)) return !1;
                    return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0
                } catch (e) {
                    return !1
                }
            }
        }]), e
    }();

function Ug(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
    return new Promise((function(n, i) {
        try {
            var r = new XMLHttpRequest;
            if (!("withCredentials" in r)) return;
            r.addEventListener("load", (function() {
                if ("text" === t) try {
                    n(JSON.parse(r.responseText))
                } catch (e) {
                    n(r.responseText)
                } else n(r.response)
            })), r.addEventListener("error", (function() {
                throw new Error(r.status)
            })), r.open("GET", e, !0), r.responseType = t, r.send()
        } catch (e) {
            i(e)
        }
    }))
}

function qg(e, t) {
    if (bm(e)) {
        var n = bm(t),
            i = function() {
                return null !== document.getElementById(t)
            },
            r = function(e, t) {
                e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e)
            };
        if (!n || !i()) {
            var o = Hg.supported,
                a = document.createElement("div");
            if (a.setAttribute("hidden", ""), n && a.setAttribute("id", t), o) {
                var s = window.localStorage.getItem("".concat("cache", "-").concat(t));
                if (null !== s) {
                    var l = JSON.parse(s);
                    r(a, l.content)
                }
            }
            Ug(e).then((function(e) {
                Pm(e) || (o && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({
                    content: e
                })), r(a, e))
            })).catch((function() {}))
        }
    }
}
var Bg = Math.ceil,
    zg = Math.floor;
Xo({
    target: "Math",
    stat: !0
}, {
    trunc: function(e) {
        return (e > 0 ? zg : Bg)(e)
    }
});
var Vg = function(e) {
        return Math.trunc(e / 60 / 60 % 60, 10)
    },
    Wg = function(e) {
        return Math.trunc(e / 60 % 60, 10)
    },
    Gg = function(e) {
        return Math.trunc(e % 60, 10)
    };

function Xg() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!ym(e)) return Xg(void 0, t, n);
    var i = function(e) {
            return "0".concat(e).slice(-2)
        },
        r = Vg(e),
        o = Wg(e),
        a = Gg(e);
    return r = t || r > 0 ? "".concat(r, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(r).concat(i(o), ":").concat(i(a))
}
var Yg = {
    getIconUrl: function() {
        var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || Lm.isIE && !window.svg4everybody;
        return {
            url: this.config.iconUrl,
            cors: e
        }
    },
    findElements: function() {
        try {
            return this.elements.controls = Jm.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                play: Zm.call(this, this.config.selectors.buttons.play),
                pause: Jm.call(this, this.config.selectors.buttons.pause),
                restart: Jm.call(this, this.config.selectors.buttons.restart),
                rewind: Jm.call(this, this.config.selectors.buttons.rewind),
                fastForward: Jm.call(this, this.config.selectors.buttons.fastForward),
                mute: Jm.call(this, this.config.selectors.buttons.mute),
                pip: Jm.call(this, this.config.selectors.buttons.pip),
                airplay: Jm.call(this, this.config.selectors.buttons.airplay),
                settings: Jm.call(this, this.config.selectors.buttons.settings),
                captions: Jm.call(this, this.config.selectors.buttons.captions),
                fullscreen: Jm.call(this, this.config.selectors.buttons.fullscreen)
            }, this.elements.progress = Jm.call(this, this.config.selectors.progress), this.elements.inputs = {
                seek: Jm.call(this, this.config.selectors.inputs.seek),
                volume: Jm.call(this, this.config.selectors.inputs.volume)
            }, this.elements.display = {
                buffer: Jm.call(this, this.config.selectors.display.buffer),
                currentTime: Jm.call(this, this.config.selectors.display.currentTime),
                duration: Jm.call(this, this.config.selectors.display.duration)
            }, xm(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0
        } catch (e) {
            return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
        }
    },
    createIcon: function(e, t) {
        var n = Yg.getIconUrl.call(this),
            i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
            r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        Um(r, Fm(t, {
            "aria-hidden": "true",
            focusable: "false"
        }));
        var o = document.createElementNS("http://www.w3.org/2000/svg", "use"),
            a = "".concat(i, "-").concat(e);
        return "href" in o && o.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), o.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), r.appendChild(o), r
    },
    createLabel: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = Fg(e, this.config),
            i = Fd(Fd({}, t), {}, {
                class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
            });
        return qm("span", i, n)
    },
    createBadge: function(e) {
        if (Pm(e)) return null;
        var t = qm("span", {
            class: this.config.classNames.menu.value
        });
        return t.appendChild(qm("span", {
            class: this.config.classNames.menu.badge
        }, e)), t
    },
    createButton: function(e, t) {
        var n = this,
            i = Fm({}, t),
            r = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = e.toString();
                return (t = jg(t)).charAt(0).toLowerCase() + t.slice(1)
            }(e),
            o = {
                element: "button",
                toggle: !1,
                label: null,
                icon: null,
                labelPressed: null,
                iconPressed: null
            };
        switch (["element", "icon", "label"].forEach((function(e) {
                Object.keys(i).includes(e) && (o[e] = i[e], delete i[e])
            })), "button" !== o.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((function(e) {
                return e === n.config.classNames.control
            })) || Fm(i, {
                class: "".concat(i.class, " ").concat(this.config.classNames.control)
            }) : i.class = this.config.classNames.control, e) {
            case "play":
                o.toggle = !0, o.label = "play", o.labelPressed = "pause", o.icon = "play", o.iconPressed = "pause";
                break;
            case "mute":
                o.toggle = !0, o.label = "mute", o.labelPressed = "unmute", o.icon = "volume", o.iconPressed = "muted";
                break;
            case "captions":
                o.toggle = !0, o.label = "enableCaptions", o.labelPressed = "disableCaptions", o.icon = "captions-off", o.iconPressed = "captions-on";
                break;
            case "fullscreen":
                o.toggle = !0, o.label = "enterFullscreen", o.labelPressed = "exitFullscreen", o.icon = "enter-fullscreen", o.iconPressed = "exit-fullscreen";
                break;
            case "play-large":
                i.class += " ".concat(this.config.classNames.control, "--overlaid"), r = "play", o.label = "play", o.icon = "play";
                break;
            default:
                Pm(o.label) && (o.label = r), Pm(o.icon) && (o.icon = e)
        }
        var a = qm(o.element);
        return o.toggle ? (a.appendChild(Yg.createIcon.call(this, o.iconPressed, {
            class: "icon--pressed"
        })), a.appendChild(Yg.createIcon.call(this, o.icon, {
            class: "icon--not-pressed"
        })), a.appendChild(Yg.createLabel.call(this, o.labelPressed, {
            class: "label--pressed"
        })), a.appendChild(Yg.createLabel.call(this, o.label, {
            class: "label--not-pressed"
        }))) : (a.appendChild(Yg.createIcon.call(this, o.icon)), a.appendChild(Yg.createLabel.call(this, o.label))), Fm(i, Gm(this.config.selectors.buttons[r], i)), Um(a, i), "play" === r ? (Tm(this.elements.buttons[r]) || (this.elements.buttons[r] = []), this.elements.buttons[r].push(a)) : this.elements.buttons[r] = a, a
    },
    createRange: function(e, t) {
        var n = qm("input", Fm(Gm(this.config.selectors.inputs[e]), {
            type: "range",
            min: 0,
            max: 100,
            step: .01,
            value: 0,
            autocomplete: "off",
            role: "slider",
            "aria-label": Fg(e, this.config),
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": 0
        }, t));
        return this.elements.inputs[e] = n, Yg.updateRangeFill.call(this, n), $f.setup(n), n
    },
    createProgress: function(e, t) {
        var n = qm("progress", Fm(Gm(this.config.selectors.display[e]), {
            min: 0,
            max: 100,
            value: 0,
            role: "progressbar",
            "aria-hidden": !0
        }, t));
        if ("volume" !== e) {
            n.appendChild(qm("span", null, "0"));
            var i = {
                    played: "played",
                    buffer: "buffered"
                } [e],
                r = i ? Fg(i, this.config) : "";
            n.innerText = "% ".concat(r.toLowerCase())
        }
        return this.elements.display[e] = n, n
    },
    createTime: function(e, t) {
        var n = Gm(this.config.selectors.display[e], t),
            i = qm("div", Fm(n, {
                class: "".concat(n.class ? n.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
                "aria-label": Fg(e, this.config)
            }), "00:00");
        return this.elements.display[e] = i, i
    },
    bindMenuItemShortcuts: function(e, t) {
        var n = this;
        ag.call(this, e, "keydown keyup", (function(i) {
            if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) {
                var r, o = Km(e, '[role="menuitemradio"]');
                if (!o && [32, 39].includes(i.which)) Yg.showMenuPanel.call(n, t, !0);
                else 32 !== i.which && (40 === i.which || o && 39 === i.which ? (r = e.nextElementSibling, xm(r) || (r = e.parentNode.firstElementChild)) : (r = e.previousElementSibling, xm(r) || (r = e.parentNode.lastElementChild)), eg.call(n, r, !0))
            }
        }), !1), ag.call(this, e, "keyup", (function(e) {
            13 === e.which && Yg.focusFirstMenuItem.call(n, null, !0)
        }))
    },
    createMenuItem: function(e) {
        var t = this,
            n = e.value,
            i = e.list,
            r = e.type,
            o = e.title,
            a = e.badge,
            s = void 0 === a ? null : a,
            l = e.checked,
            u = void 0 !== l && l,
            c = Gm(this.config.selectors.inputs[r]),
            d = qm("button", Fm(c, {
                type: "button",
                role: "menuitemradio",
                class: "".concat(this.config.classNames.control, " ").concat(c.class ? c.class : "").trim(),
                "aria-checked": u,
                value: n
            })),
            h = qm("span");
        h.innerHTML = o, xm(s) && h.appendChild(s), d.appendChild(h), Object.defineProperty(d, "checked", {
            enumerable: !0,
            get: function() {
                return "true" === d.getAttribute("aria-checked")
            },
            set: function(e) {
                e && Array.from(d.parentNode.children).filter((function(e) {
                    return Km(e, '[role="menuitemradio"]')
                })).forEach((function(e) {
                    return e.setAttribute("aria-checked", "false")
                })), d.setAttribute("aria-checked", e ? "true" : "false")
            }
        }), this.listeners.bind(d, "click keyup", (function(e) {
            if (!Sm(e) || 32 === e.which) {
                switch (e.preventDefault(), e.stopPropagation(), d.checked = !0, r) {
                    case "language":
                        t.currentTrack = Number(n);
                        break;
                    case "quality":
                        t.quality = n;
                        break;
                    case "speed":
                        t.speed = parseFloat(n)
                }
                Yg.showMenuPanel.call(t, "home", Sm(e))
            }
        }), r, !1), Yg.bindMenuItemShortcuts.call(this, d, r), i.appendChild(d)
    },
    formatTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!ym(e)) return e;
        var n = Vg(this.duration) > 0;
        return Xg(e, n, t)
    },
    updateTimeDisplay: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        xm(e) && ym(t) && (e.innerText = Yg.formatTime(t, n))
    },
    updateVolume: function() {
        this.supported.ui && (xm(this.elements.inputs.volume) && Yg.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), xm(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
    },
    setRange: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        xm(e) && (e.value = t, Yg.updateRangeFill.call(this, e))
    },
    updateProgress: function(e) {
        var t = this;
        if (this.supported.ui && Am(e)) {
            var n = 0;
            if (e) switch (e.type) {
                case "timeupdate":
                case "seeking":
                case "seeked":
                    n = function(e, t) {
                        return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2)
                    }(this.currentTime, this.duration), "timeupdate" === e.type && Yg.setRange.call(this, this.elements.inputs.seek, n);
                    break;
                case "playing":
                case "progress":
                    ! function(e, n) {
                        var i = ym(n) ? n : 0,
                            r = xm(e) ? e : t.elements.display.buffer;
                        if (xm(r)) {
                            r.value = i;
                            var o = r.getElementsByTagName("span")[0];
                            xm(o) && (o.childNodes[0].nodeValue = i)
                        }
                    }(this.elements.display.buffer, 100 * this.buffered)
            }
        }
    },
    updateRangeFill: function(e) {
        var t = Am(e) ? e.target : e;
        if (xm(t) && "range" === t.getAttribute("type")) {
            if (Km(t, this.config.selectors.inputs.seek)) {
                t.setAttribute("aria-valuenow", this.currentTime);
                var n = Yg.formatTime(this.currentTime),
                    i = Yg.formatTime(this.duration),
                    r = Fg("seekLabel", this.config);
                t.setAttribute("aria-valuetext", r.replace("{currentTime}", n).replace("{duration}", i))
            } else if (Km(t, this.config.selectors.inputs.volume)) {
                var o = 100 * t.value;
                t.setAttribute("aria-valuenow", o), t.setAttribute("aria-valuetext", "".concat(o.toFixed(1), "%"))
            } else t.setAttribute("aria-valuenow", t.value);
            Lm.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"))
        }
    },
    updateSeekTooltip: function(e) {
        var t = this;
        if (this.config.tooltips.seek && xm(this.elements.inputs.seek) && xm(this.elements.display.seekTooltip) && 0 !== this.duration) {
            var n = "".concat(this.config.classNames.tooltip, "--visible"),
                i = function(e) {
                    return Ym(t.elements.display.seekTooltip, n, e)
                };
            if (this.touch) i(!1);
            else {
                var r = 0,
                    o = this.elements.progress.getBoundingClientRect();
                if (Am(e)) r = 100 / o.width * (e.pageX - o.left);
                else {
                    if (!Qm(this.elements.display.seekTooltip, n)) return;
                    r = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                }
                r < 0 ? r = 0 : r > 100 && (r = 100), Yg.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * r), this.elements.display.seekTooltip.style.left = "".concat(r, "%"), Am(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type)
            }
        }
    },
    timeUpdate: function(e) {
        var t = !xm(this.elements.display.duration) && this.config.invertTime;
        Yg.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || Yg.updateProgress.call(this, e)
    },
    durationUpdate: function() {
        if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
            if (this.duration >= Math.pow(2, 32)) return Xm(this.elements.display.currentTime, !0), void Xm(this.elements.progress, !0);
            xm(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
            var e = xm(this.elements.display.duration);
            !e && this.config.displayDuration && this.paused && Yg.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && Yg.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), Yg.updateSeekTooltip.call(this)
        }
    },
    toggleMenuButton: function(e, t) {
        Xm(this.elements.settings.buttons[e], !t)
    },
    updateSetting: function(e, t, n) {
        var i = this.elements.settings.panels[e],
            r = null,
            o = t;
        if ("captions" === e) r = this.currentTrack;
        else {
            if (r = Pm(n) ? this[e] : n, Pm(r) && (r = this.config[e].default), !Pm(this.options[e]) && !this.options[e].includes(r)) return void this.debug.warn("Unsupported value of '".concat(r, "' for ").concat(e));
            if (!this.config[e].options.includes(r)) return void this.debug.warn("Disabled value of '".concat(r, "' for ").concat(e))
        }
        if (xm(o) || (o = i && i.querySelector('[role="menu"]')), xm(o)) {
            this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = Yg.getLabel.call(this, e, r);
            var a = o && o.querySelector('[value="'.concat(r, '"]'));
            xm(a) && (a.checked = !0)
        }
    },
    getLabel: function(e, t) {
        switch (e) {
            case "speed":
                return 1 === t ? Fg("normal", this.config) : "".concat(t, "&times;");
            case "quality":
                if (ym(t)) {
                    var n = Fg("qualityLabel.".concat(t), this.config);
                    return n.length ? n : "".concat(t, "p")
                }
                return Ng(t);
            case "captions":
                return Zg.getLabel.call(this);
            default:
                return null
        }
    },
    setQualityMenu: function(e) {
        var t = this;
        if (xm(this.elements.settings.panels.quality)) {
            var n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
            Tm(e) && (this.options.quality = yg(e).filter((function(e) {
                return t.config.quality.options.includes(e)
            })));
            var i = !Pm(this.options.quality) && this.options.quality.length > 1;
            if (Yg.toggleMenuButton.call(this, "quality", i), Vm(n), Yg.checkMenu.call(this), i) {
                var r = function(e) {
                    var n = Fg("qualityBadge.".concat(e), t.config);
                    return n.length ? Yg.createBadge.call(t, n) : null
                };
                this.options.quality.sort((function(e, n) {
                    var i = t.config.quality.options;
                    return i.indexOf(e) > i.indexOf(n) ? 1 : -1
                })).forEach((function(e) {
                    Yg.createMenuItem.call(t, {
                        value: e,
                        list: n,
                        type: "quality",
                        title: Yg.getLabel.call(t, "quality", e),
                        badge: r(e)
                    })
                })), Yg.updateSetting.call(this, "quality", n)
            }
        }
    },
    setCaptionsMenu: function() {
        var e = this;
        if (xm(this.elements.settings.panels.captions)) {
            var t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                n = Zg.getTracks.call(this),
                i = Boolean(n.length);
            if (Yg.toggleMenuButton.call(this, "captions", i), Vm(t), Yg.checkMenu.call(this), i) {
                var r = n.map((function(n, i) {
                    return {
                        value: i,
                        checked: e.captions.toggled && e.currentTrack === i,
                        title: Zg.getLabel.call(e, n),
                        badge: n.language && Yg.createBadge.call(e, n.language.toUpperCase()),
                        list: t,
                        type: "language"
                    }
                }));
                r.unshift({
                    value: -1,
                    checked: !this.captions.toggled,
                    title: Fg("disabled", this.config),
                    list: t,
                    type: "language"
                }), r.forEach(Yg.createMenuItem.bind(this)), Yg.updateSetting.call(this, "captions", t)
            }
        }
    },
    setSpeedMenu: function() {
        var e = this;
        if (xm(this.elements.settings.panels.speed)) {
            var t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
            this.options.speed = this.options.speed.filter((function(t) {
                return t >= e.minimumSpeed && t <= e.maximumSpeed
            }));
            var n = !Pm(this.options.speed) && this.options.speed.length > 1;
            Yg.toggleMenuButton.call(this, "speed", n), Vm(t), Yg.checkMenu.call(this), n && (this.options.speed.forEach((function(n) {
                Yg.createMenuItem.call(e, {
                    value: n,
                    list: t,
                    type: "speed",
                    title: Yg.getLabel.call(e, "speed", n)
                })
            })), Yg.updateSetting.call(this, "speed", t))
        }
    },
    checkMenu: function() {
        var e = this.elements.settings.buttons,
            t = !Pm(e) && Object.values(e).some((function(e) {
                return !e.hidden
            }));
        Xm(this.elements.settings.menu, !t)
    },
    focusFirstMenuItem: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!this.elements.settings.popup.hidden) {
            var n = e;
            xm(n) || (n = Object.values(this.elements.settings.panels).find((function(e) {
                return !e.hidden
            })));
            var i = n.querySelector('[role^="menuitem"]');
            eg.call(this, i, t)
        }
    },
    toggleMenu: function(e) {
        var t = this.elements.settings.popup,
            n = this.elements.buttons.settings;
        if (xm(t) && xm(n)) {
            var i = t.hidden,
                r = i;
            if (_m(e)) r = e;
            else if (Sm(e) && 27 === e.which) r = !1;
            else if (Am(e)) {
                var o = wm(e.composedPath) ? e.composedPath()[0] : e.target,
                    a = t.contains(o);
                if (a || !a && e.target !== n && r) return
            }
            n.setAttribute("aria-expanded", r), Xm(t, !r), Ym(this.elements.container, this.config.classNames.menu.open, r), r && Sm(e) ? Yg.focusFirstMenuItem.call(this, null, !0) : r || i || eg.call(this, n, Sm(e))
        }
    },
    getMenuSize: function(e) {
        var t = e.cloneNode(!0);
        t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
        var n = t.scrollWidth,
            i = t.scrollHeight;
        return zm(t), {
            width: n,
            height: i
        }
    },
    showMenuPanel: function() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));
        if (xm(i)) {
            var r = i.parentNode,
                o = Array.from(r.children).find((function(e) {
                    return !e.hidden
                }));
            if (ig.transitions && !ig.reducedMotion) {
                r.style.width = "".concat(o.scrollWidth, "px"), r.style.height = "".concat(o.scrollHeight, "px");
                var a = Yg.getMenuSize.call(this, i),
                    s = function t(n) {
                        n.target === r && ["width", "height"].includes(n.propertyName) && (r.style.width = "", r.style.height = "", sg.call(e, r, Im, t))
                    };
                ag.call(this, r, Im, s), r.style.width = "".concat(a.width, "px"), r.style.height = "".concat(a.height, "px")
            }
            Xm(o, !0), Xm(i, !1), Yg.focusFirstMenuItem.call(this, i, n)
        }
    },
    setDownloadUrl: function() {
        var e = this.elements.buttons.download;
        xm(e) && e.setAttribute("href", this.download)
    },
    create: function(e) {
        var t = this,
            n = Yg.bindMenuItemShortcuts,
            i = Yg.createButton,
            r = Yg.createProgress,
            o = Yg.createRange,
            a = Yg.createTime,
            s = Yg.setQualityMenu,
            l = Yg.setSpeedMenu,
            u = Yg.showMenuPanel;
        this.elements.controls = null, Tm(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
        var c = qm("div", Gm(this.config.selectors.controls.wrapper));
        this.elements.controls = c;
        var d = {
            class: "plyr__controls__item"
        };
        return yg(Tm(this.config.controls) ? this.config.controls : []).forEach((function(s) {
            if ("restart" === s && c.appendChild(i.call(t, "restart", d)), "rewind" === s && c.appendChild(i.call(t, "rewind", d)), "play" === s && c.appendChild(i.call(t, "play", d)), "fast-forward" === s && c.appendChild(i.call(t, "fast-forward", d)), "progress" === s) {
                var l = qm("div", {
                        class: "".concat(d.class, " plyr__progress__container")
                    }),
                    h = qm("div", Gm(t.config.selectors.progress));
                if (h.appendChild(o.call(t, "seek", {
                        id: "plyr-seek-".concat(e.id)
                    })), h.appendChild(r.call(t, "buffer")), t.config.tooltips.seek) {
                    var f = qm("span", {
                        class: t.config.classNames.tooltip
                    }, "00:00");
                    h.appendChild(f), t.elements.display.seekTooltip = f
                }
                t.elements.progress = h, l.appendChild(t.elements.progress), c.appendChild(l)
            }
            if ("current-time" === s && c.appendChild(a.call(t, "currentTime", d)), "duration" === s && c.appendChild(a.call(t, "duration", d)), "mute" === s || "volume" === s) {
                var p = t.elements.volume;
                if (xm(p) && c.contains(p) || (p = qm("div", Fm({}, d, {
                        class: "".concat(d.class, " plyr__volume").trim()
                    })), t.elements.volume = p, c.appendChild(p)), "mute" === s && p.appendChild(i.call(t, "mute")), "volume" === s && !Lm.isIos) {
                    var m = {
                        max: 1,
                        step: .05,
                        value: t.config.volume
                    };
                    p.appendChild(o.call(t, "volume", Fm(m, {
                        id: "plyr-volume-".concat(e.id)
                    })))
                }
            }
            if ("captions" === s && c.appendChild(i.call(t, "captions", d)), "settings" === s && !Pm(t.config.settings)) {
                var g = qm("div", Fm({}, d, {
                    class: "".concat(d.class, " plyr__menu").trim(),
                    hidden: ""
                }));
                g.appendChild(i.call(t, "settings", {
                    "aria-haspopup": !0,
                    "aria-controls": "plyr-settings-".concat(e.id),
                    "aria-expanded": !1
                }));
                var v = qm("div", {
                        class: "plyr__menu__container",
                        id: "plyr-settings-".concat(e.id),
                        hidden: ""
                    }),
                    y = qm("div"),
                    b = qm("div", {
                        id: "plyr-settings-".concat(e.id, "-home")
                    }),
                    _ = qm("div", {
                        role: "menu"
                    });
                b.appendChild(_), y.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach((function(i) {
                    var r = qm("button", Fm(Gm(t.config.selectors.buttons.settings), {
                        type: "button",
                        class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"),
                        role: "menuitem",
                        "aria-haspopup": !0,
                        hidden: ""
                    }));
                    n.call(t, r, i), ag.call(t, r, "click", (function() {
                        u.call(t, i, !1)
                    }));
                    var o = qm("span", null, Fg(i, t.config)),
                        a = qm("span", {
                            class: t.config.classNames.menu.value
                        });
                    a.innerHTML = e[i], o.appendChild(a), r.appendChild(o), _.appendChild(r);
                    var s = qm("div", {
                            id: "plyr-settings-".concat(e.id, "-").concat(i),
                            hidden: ""
                        }),
                        l = qm("button", {
                            type: "button",
                            class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back")
                        });
                    l.appendChild(qm("span", {
                        "aria-hidden": !0
                    }, Fg(i, t.config))), l.appendChild(qm("span", {
                        class: t.config.classNames.hidden
                    }, Fg("menuBack", t.config))), ag.call(t, s, "keydown", (function(e) {
                        37 === e.which && (e.preventDefault(), e.stopPropagation(), u.call(t, "home", !0))
                    }), !1), ag.call(t, l, "click", (function() {
                        u.call(t, "home", !1)
                    })), s.appendChild(l), s.appendChild(qm("div", {
                        role: "menu"
                    })), y.appendChild(s), t.elements.settings.buttons[i] = r, t.elements.settings.panels[i] = s
                })), v.appendChild(y), g.appendChild(v), c.appendChild(g), t.elements.settings.popup = v, t.elements.settings.menu = g
            }
            if ("pip" === s && ig.pip && c.appendChild(i.call(t, "pip", d)), "airplay" === s && ig.airplay && c.appendChild(i.call(t, "airplay", d)), "download" === s) {
                var w = Fm({}, d, {
                    element: "a",
                    href: t.download,
                    target: "_blank"
                });
                t.isHTML5 && (w.download = "");
                var T = t.config.urls.download;
                !Cm(T) && t.isEmbed && Fm(w, {
                    icon: "logo-".concat(t.provider),
                    label: t.provider
                }), c.appendChild(i.call(t, "download", w))
            }
            "fullscreen" === s && c.appendChild(i.call(t, "fullscreen", d))
        })), this.isHTML5 && s.call(this, vg.getQualityOptions.call(this)), l.call(this), c
    },
    inject: function() {
        var e = this;
        if (this.config.loadSprite) {
            var t = Yg.getIconUrl.call(this);
            t.cors && qg(t.url, "sprite-plyr")
        }
        this.id = Math.floor(1e4 * Math.random());
        var n = null;
        this.elements.controls = null;
        var i = {
                id: this.id,
                seektime: this.config.seekTime,
                title: this.config.title
            },
            r = !0;
        wm(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), xm(this.config.controls) || bm(this.config.controls) ? n = this.config.controls : (n = Yg.create.call(this, {
            id: this.id,
            seektime: this.config.seekTime,
            speed: this.speed,
            quality: this.quality,
            captions: Zg.getLabel.call(this)
        }), r = !1);
        var o, a;
        if (r && bm(this.config.controls) && (o = n, Object.entries(i).forEach((function(e) {
                var t = Ud(e, 2),
                    n = t[0],
                    i = t[1];
                o = Rg(o, "{".concat(n, "}"), i)
            })), n = o), bm(this.config.selectors.controls.container) && (a = document.querySelector(this.config.selectors.controls.container)), xm(a) || (a = this.elements.container), a[xm(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), xm(this.elements.controls) || Yg.findElements.call(this), !Pm(this.elements.buttons)) {
            var s = function(t) {
                var n = e.config.classNames.controlPressed;
                Object.defineProperty(t, "pressed", {
                    enumerable: !0,
                    get: function() {
                        return Qm(t, n)
                    },
                    set: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        Ym(t, n, e)
                    }
                })
            };
            Object.values(this.elements.buttons).filter(Boolean).forEach((function(e) {
                Tm(e) || km(e) ? Array.from(e).filter(Boolean).forEach(s) : s(e)
            }))
        }
        if (Lm.isEdge && Mm(a), this.config.tooltips.controls) {
            var l = this.config,
                u = l.classNames,
                c = l.selectors,
                d = "".concat(c.controls.wrapper, " ").concat(c.labels, " .").concat(u.hidden),
                h = Zm.call(this, d);
            Array.from(h).forEach((function(t) {
                Ym(t, e.config.classNames.hidden, !1), Ym(t, e.config.classNames.tooltip, !0)
            }))
        }
    }
};

function Qg(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        n = e;
    if (t) {
        var i = document.createElement("a");
        i.href = n, n = i.href
    }
    try {
        return new URL(n)
    } catch (e) {
        return null
    }
}

function Kg(e) {
    var t = new URLSearchParams;
    return vm(e) && Object.entries(e).forEach((function(e) {
        var n = Ud(e, 2),
            i = n[0],
            r = n[1];
        t.set(i, r)
    })), t
}
var Zg = {
        setup: function() {
            if (this.supported.ui)
                if (!this.isVideo || this.isYouTube || this.isHTML5 && !ig.textTracks) Tm(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Yg.setCaptionsMenu.call(this);
                else {
                    if (xm(this.elements.captions) || (this.elements.captions = qm("div", Gm(this.config.selectors.captions)), function(e, t) {
                            xm(e) && xm(t) && t.parentNode.insertBefore(e, t.nextSibling)
                        }(this.elements.captions, this.elements.wrapper)), Lm.isIE && window.URL) {
                        var e = this.media.querySelectorAll("track");
                        Array.from(e).forEach((function(e) {
                            var t = e.getAttribute("src"),
                                n = Qg(t);
                            null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && Ug(t, "blob").then((function(t) {
                                e.setAttribute("src", window.URL.createObjectURL(t))
                            })).catch((function() {
                                zm(e)
                            }))
                        }))
                    }
                    var t = yg((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((function(e) {
                            return e.split("-")[0]
                        }))),
                        n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                    if ("auto" === n) n = Ud(t, 1)[0];
                    var i = this.storage.get("captions");
                    if (_m(i) || (i = this.config.captions.active), Object.assign(this.captions, {
                            toggled: !1,
                            active: i,
                            language: n,
                            languages: t
                        }), this.isHTML5) {
                        var r = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                        ag.call(this, this.media.textTracks, r, Zg.update.bind(this))
                    }
                    setTimeout(Zg.update.bind(this), 0)
                }
        },
        update: function() {
            var e = this,
                t = Zg.getTracks.call(this, !0),
                n = this.captions,
                i = n.active,
                r = n.language,
                o = n.meta,
                a = n.currentTrackNode,
                s = Boolean(t.find((function(e) {
                    return e.language === r
                })));
            this.isHTML5 && this.isVideo && t.filter((function(e) {
                return !o.get(e)
            })).forEach((function(t) {
                e.debug.log("Track added", t), o.set(t, {
                    default: "showing" === t.mode
                }), "showing" === t.mode && (t.mode = "hidden"), ag.call(e, t, "cuechange", (function() {
                    return Zg.updateCues.call(e)
                }))
            })), (s && this.language !== r || !t.includes(a)) && (Zg.setLanguage.call(this, r), Zg.toggle.call(this, i && s)), Ym(this.elements.container, this.config.classNames.captions.enabled, !Pm(t)), Tm(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Yg.setCaptionsMenu.call(this)
        },
        toggle: function(e) {
            var t = this,
                n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (this.supported.ui) {
                var i = this.captions.toggled,
                    r = this.config.classNames.captions.active,
                    o = gm(e) ? !i : e;
                if (o !== i) {
                    if (n || (this.captions.active = o, this.storage.set({
                            captions: o
                        })), !this.language && o && !n) {
                        var a = Zg.getTracks.call(this),
                            s = Zg.findTrack.call(this, [this.captions.language].concat(qd(this.captions.languages)), !0);
                        return this.captions.language = s.language, void Zg.set.call(this, a.indexOf(s))
                    }
                    this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), Ym(this.elements.container, r, o), this.captions.toggled = o, Yg.updateSetting.call(this, "captions"), ug.call(this, this.media, o ? "captionsenabled" : "captionsdisabled")
                }
                setTimeout((function() {
                    o && t.captions.toggled && (t.captions.currentTrackNode.mode = "hidden")
                }))
            }
        },
        set: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                n = Zg.getTracks.call(this);
            if (-1 !== e)
                if (ym(e))
                    if (e in n) {
                        if (this.captions.currentTrack !== e) {
                            this.captions.currentTrack = e;
                            var i = n[e],
                                r = i || {},
                                o = r.language;
                            this.captions.currentTrackNode = i, Yg.updateSetting.call(this, "captions"), t || (this.captions.language = o, this.storage.set({
                                language: o
                            })), this.isVimeo && this.embed.enableTextTrack(o), ug.call(this, this.media, "languagechange")
                        }
                        Zg.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Zg.updateCues.call(this)
                    } else this.debug.warn("Track not found", e);
            else this.debug.warn("Invalid caption argument", e);
            else Zg.toggle.call(this, !1, t)
        },
        setLanguage: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (bm(e)) {
                var n = e.toLowerCase();
                this.captions.language = n;
                var i = Zg.getTracks.call(this),
                    r = Zg.findTrack.call(this, [n]);
                Zg.set.call(this, i.indexOf(r), t)
            } else this.debug.warn("Invalid language argument", e)
        },
        getTracks: function() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                n = Array.from((this.media || {}).textTracks || []);
            return n.filter((function(n) {
                return !e.isHTML5 || t || e.captions.meta.has(n)
            })).filter((function(e) {
                return ["captions", "subtitles"].includes(e.kind)
            }))
        },
        findTrack: function(e) {
            var t, n = this,
                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                r = Zg.getTracks.call(this),
                o = function(e) {
                    return Number((n.captions.meta.get(e) || {}).default)
                },
                a = Array.from(r).sort((function(e, t) {
                    return o(t) - o(e)
                }));
            return e.every((function(e) {
                return !(t = a.find((function(t) {
                    return t.language === e
                })))
            })), t || (i ? a[0] : void 0)
        },
        getCurrentTrack: function() {
            return Zg.getTracks.call(this)[this.currentTrack]
        },
        getLabel: function(e) {
            var t = e;
            return !Em(t) && ig.textTracks && this.captions.toggled && (t = Zg.getCurrentTrack.call(this)), Em(t) ? Pm(t.label) ? Pm(t.language) ? Fg("enabled", this.config) : e.language.toUpperCase() : t.label : Fg("disabled", this.config)
        },
        updateCues: function(e) {
            if (this.supported.ui)
                if (xm(this.elements.captions))
                    if (gm(e) || Array.isArray(e)) {
                        var t = e;
                        if (!t) {
                            var n = Zg.getCurrentTrack.call(this);
                            t = Array.from((n || {}).activeCues || []).map((function(e) {
                                return e.getCueAsHTML()
                            })).map($g)
                        }
                        var i = t.map((function(e) {
                            return e.trim()
                        })).join("\n");
                        if (i !== this.elements.captions.innerHTML) {
                            Vm(this.elements.captions);
                            var r = qm("span", Gm(this.config.selectors.caption));
                            r.innerHTML = i, this.elements.captions.appendChild(r), ug.call(this, this.media, "cuechange")
                        }
                    } else this.debug.warn("updateCues: Invalid input", e);
            else this.debug.warn("No captions element to render to")
        }
    },
    Jg = {
        enabled: !0,
        title: "",
        debug: !1,
        autoplay: !1,
        autopause: !0,
        playsinline: !0,
        seekTime: 10,
        volume: 1,
        muted: !1,
        duration: null,
        displayDuration: !0,
        invertTime: !0,
        toggleInvert: !0,
        ratio: null,
        clickToPlay: !0,
        hideControls: !0,
        resetOnEnd: !1,
        disableContextMenu: !0,
        loadSprite: !0,
        iconPrefix: "plyr",
        iconUrl: "https://cdn.plyr.io/3.6.2/plyr.svg",
        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
        quality: {
            default: 576,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
            forced: !1,
            onChange: null
        },
        loop: {
            active: !1
        },
        speed: {
            selected: 1,
            options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
        },
        keyboard: {
            focused: !0,
            global: !1
        },
        tooltips: {
            controls: !1,
            seek: !0
        },
        captions: {
            active: !1,
            language: "auto",
            update: !1
        },
        fullscreen: {
            enabled: !0,
            fallback: !0,
            iosNative: !1
        },
        storage: {
            enabled: !0,
            key: "plyr"
        },
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
        settings: ["captions", "quality", "speed"],
        i18n: {
            restart: "Restart",
            rewind: "Rewind {seektime}s",
            play: "Play",
            pause: "Pause",
            fastForward: "Forward {seektime}s",
            seek: "Seek",
            seekLabel: "{currentTime} of {duration}",
            played: "Played",
            buffered: "Buffered",
            currentTime: "Current time",
            duration: "Duration",
            volume: "Volume",
            mute: "Mute",
            unmute: "Unmute",
            enableCaptions: "Enable captions",
            disableCaptions: "Disable captions",
            download: "Download",
            enterFullscreen: "Enter fullscreen",
            exitFullscreen: "Exit fullscreen",
            frameTitle: "Player for {title}",
            captions: "Captions",
            settings: "Settings",
            pip: "PIP",
            menuBack: "Go back to previous menu",
            speed: "Speed",
            normal: "Normal",
            quality: "Quality",
            loop: "Loop",
            start: "Start",
            end: "End",
            all: "All",
            reset: "Reset",
            disabled: "Disabled",
            enabled: "Enabled",
            advertisement: "Ad",
            qualityBadge: {
                2160: "4K",
                1440: "HD",
                1080: "HD",
                720: "HD",
                576: "SD",
                480: "SD"
            }
        },
        urls: {
            download: null,
            vimeo: {
                sdk: "https://player.vimeo.com/api/player.js",
                iframe: "https://player.vimeo.com/video/{0}?{1}",
                api: "https://vimeo.com/api/v2/video/{0}.json"
            },
            youtube: {
                sdk: "https://www.youtube.com/iframe_api",
                api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
            },
            googleIMA: {
                sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
            }
        },
        listeners: {
            seek: null,
            play: null,
            pause: null,
            restart: null,
            rewind: null,
            fastForward: null,
            mute: null,
            volume: null,
            captions: null,
            download: null,
            fullscreen: null,
            pip: null,
            airplay: null,
            speed: null,
            quality: null,
            loop: null,
            language: null
        },
        events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
        selectors: {
            editable: "input, textarea, select, [contenteditable]",
            container: ".plyr",
            controls: {
                container: null,
                wrapper: ".plyr__controls"
            },
            labels: "[data-plyr]",
            buttons: {
                play: '[data-plyr="play"]',
                pause: '[data-plyr="pause"]',
                restart: '[data-plyr="restart"]',
                rewind: '[data-plyr="rewind"]',
                fastForward: '[data-plyr="fast-forward"]',
                mute: '[data-plyr="mute"]',
                captions: '[data-plyr="captions"]',
                download: '[data-plyr="download"]',
                fullscreen: '[data-plyr="fullscreen"]',
                pip: '[data-plyr="pip"]',
                airplay: '[data-plyr="airplay"]',
                settings: '[data-plyr="settings"]',
                loop: '[data-plyr="loop"]'
            },
            inputs: {
                seek: '[data-plyr="seek"]',
                volume: '[data-plyr="volume"]',
                speed: '[data-plyr="speed"]',
                language: '[data-plyr="language"]',
                quality: '[data-plyr="quality"]'
            },
            display: {
                currentTime: ".plyr__time--current",
                duration: ".plyr__time--duration",
                buffer: ".plyr__progress__buffer",
                loop: ".plyr__progress__loop",
                volume: ".plyr__volume--display"
            },
            progress: ".plyr__progress",
            captions: ".plyr__captions",
            caption: ".plyr__caption"
        },
        classNames: {
            type: "plyr--{0}",
            provider: "plyr--{0}",
            video: "plyr__video-wrapper",
            embed: "plyr__video-embed",
            videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
            embedContainer: "plyr__video-embed__container",
            poster: "plyr__poster",
            posterEnabled: "plyr__poster-enabled",
            ads: "plyr__ads",
            control: "plyr__control",
            controlPressed: "plyr__control--pressed",
            playing: "plyr--playing",
            paused: "plyr--paused",
            stopped: "plyr--stopped",
            loading: "plyr--loading",
            hover: "plyr--hover",
            tooltip: "plyr__tooltip",
            cues: "plyr__cues",
            hidden: "plyr__sr-only",
            hideControls: "plyr--hide-controls",
            isIos: "plyr--is-ios",
            isTouch: "plyr--is-touch",
            uiSupported: "plyr--full-ui",
            noTransition: "plyr--no-transition",
            display: {
                time: "plyr__time"
            },
            menu: {
                value: "plyr__menu__value",
                badge: "plyr__badge",
                open: "plyr--menu-open"
            },
            captions: {
                enabled: "plyr--captions-enabled",
                active: "plyr--captions-active"
            },
            fullscreen: {
                enabled: "plyr--fullscreen-enabled",
                fallback: "plyr--fullscreen-fallback"
            },
            pip: {
                supported: "plyr--pip-supported",
                active: "plyr--pip-active"
            },
            airplay: {
                supported: "plyr--airplay-supported",
                active: "plyr--airplay-active"
            },
            tabFocus: "plyr__tab-focus",
            previewThumbnails: {
                thumbContainer: "plyr__preview-thumb",
                thumbContainerShown: "plyr__preview-thumb--is-shown",
                imageContainer: "plyr__preview-thumb__image-container",
                timeContainer: "plyr__preview-thumb__time-container",
                scrubbingContainer: "plyr__preview-scrubbing",
                scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
            }
        },
        attributes: {
            embed: {
                provider: "data-plyr-provider",
                id: "data-plyr-embed-id"
            }
        },
        ads: {
            enabled: !1,
            publisherId: "",
            tagUrl: ""
        },
        previewThumbnails: {
            enabled: !1,
            src: ""
        },
        vimeo: {
            byline: !1,
            portrait: !1,
            title: !1,
            speed: !0,
            transparent: !1,
            premium: !1,
            referrerPolicy: null
        },
        youtube: {
            noCookie: !0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1
        }
    },
    ev = "picture-in-picture",
    tv = "inline",
    nv = {
        html5: "html5",
        youtube: "youtube",
        vimeo: "vimeo"
    },
    iv = "audio",
    rv = "video";
var ov = function() {},
    av = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            Rd(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
        }
        return jd(e, [{
            key: "log",
            get: function() {
                return this.enabled ? Function.prototype.bind.call(console.log, console) : ov
            }
        }, {
            key: "warn",
            get: function() {
                return this.enabled ? Function.prototype.bind.call(console.warn, console) : ov
            }
        }, {
            key: "error",
            get: function() {
                return this.enabled ? Function.prototype.bind.call(console.error, console) : ov
            }
        }]), e
    }(),
    sv = function() {
        function e(t) {
            var n = this;
            Rd(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = {
                x: 0,
                y: 0
            }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function(e, t) {
                return (Element.prototype.closest || function() {
                    var e = this;
                    do {
                        if (Km.matches(e, t)) return e;
                        e = e.parentElement || e.parentNode
                    } while (null !== e && 1 === e.nodeType);
                    return null
                }).call(e, t)
            }(this.player.elements.container, t.config.fullscreen.container), ag.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), (function() {
                n.onChange()
            })), ag.call(this.player, this.player.elements.container, "dblclick", (function(e) {
                xm(n.player.elements.controls) && n.player.elements.controls.contains(e.target) || n.toggle()
            })), ag.call(this, this.player.elements.container, "keydown", (function(e) {
                return n.trapFocus(e)
            })), this.update()
        }
        return jd(e, [{
            key: "onChange",
            value: function() {
                if (this.enabled) {
                    var e = this.player.elements.buttons.fullscreen;
                    xm(e) && (e.pressed = this.active), ug.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0)
                }
            }
        }, {
            key: "toggleFallback",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e ? this.scrollPosition = {
                        x: window.scrollX || 0,
                        y: window.scrollY || 0
                    } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", Ym(this.target, this.player.config.classNames.fullscreen.fallback, e), Lm.isIos) {
                    var t = document.head.querySelector('meta[name="viewport"]'),
                        n = "viewport-fit=cover";
                    t || (t = document.createElement("meta")).setAttribute("name", "viewport");
                    var i = bm(t.content) && t.content.includes(n);
                    e ? (this.cleanupViewport = !i, i || (t.content += ",".concat(n))) : this.cleanupViewport && (t.content = t.content.split(",").filter((function(e) {
                        return e.trim() !== n
                    })).join(","))
                }
                this.onChange()
            }
        }, {
            key: "trapFocus",
            value: function(e) {
                if (!Lm.isIos && this.active && "Tab" === e.key && 9 === e.keyCode) {
                    var t = document.activeElement,
                        n = Zm.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
                        i = Ud(n, 1)[0],
                        r = n[n.length - 1];
                    t !== r || e.shiftKey ? t === i && e.shiftKey && (r.focus(), e.preventDefault()) : (i.focus(), e.preventDefault())
                }
            }
        }, {
            key: "update",
            value: function() {
                var t;
                this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");
                Ym(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
            }
        }, {
            key: "enter",
            value: function() {
                this.enabled && (Lm.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? Pm(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({
                    navigationUI: "hide"
                }))
            }
        }, {
            key: "exit",
            value: function() {
                if (this.enabled)
                    if (Lm.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), hg(this.player.play());
                    else if (!e.native || this.forceFallback) this.toggleFallback(!1);
                else if (this.prefix) {
                    if (!Pm(this.prefix)) {
                        var t = "moz" === this.prefix ? "Cancel" : "Exit";
                        document["".concat(this.prefix).concat(t).concat(this.property)]()
                    }
                } else(document.cancelFullScreen || document.exitFullscreen).call(document)
            }
        }, {
            key: "toggle",
            value: function() {
                this.active ? this.exit() : this.enter()
            }
        }, {
            key: "usingNative",
            get: function() {
                return e.native && !this.forceFallback
            }
        }, {
            key: "enabled",
            get: function() {
                return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
            }
        }, {
            key: "active",
            get: function() {
                if (!this.enabled) return !1;
                if (!e.native || this.forceFallback) return Qm(this.target, this.player.config.classNames.fullscreen.fallback);
                var t = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
                return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target
            }
        }, {
            key: "target",
            get: function() {
                return Lm.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
            }
        }], [{
            key: "native",
            get: function() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
            }
        }, {
            key: "prefix",
            get: function() {
                if (wm(document.exitFullscreen)) return "";
                var e = "";
                return ["webkit", "moz", "ms"].some((function(t) {
                    return !(!wm(document["".concat(t, "ExitFullscreen")]) && !wm(document["".concat(t, "CancelFullScreen")])) && (e = t, !0)
                })), e
            }
        }, {
            key: "property",
            get: function() {
                return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
            }
        }]), e
    }(),
    lv = Math.sign || function(e) {
        return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
    };

function uv(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return new Promise((function(n, i) {
        var r = new Image,
            o = function() {
                delete r.onload, delete r.onerror, (r.naturalWidth >= t ? n : i)(r)
            };
        Object.assign(r, {
            onload: o,
            onerror: o,
            src: e
        })
    }))
}
Xo({
    target: "Math",
    stat: !0
}, {
    sign: lv
});
var cv = {
        addStyleHook: function() {
            Ym(this.elements.container, this.config.selectors.container.replace(".", ""), !0), Ym(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
        },
        toggleNativeControls: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
        },
        build: function() {
            var e = this;
            if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void cv.toggleNativeControls.call(this, !0);
            xm(this.elements.controls) || (Yg.inject.call(this), this.listeners.controls()), cv.toggleNativeControls.call(this), this.isHTML5 && Zg.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Yg.updateVolume.call(this), Yg.timeUpdate.call(this), cv.checkPlaying.call(this), Ym(this.elements.container, this.config.classNames.pip.supported, ig.pip && this.isHTML5 && this.isVideo), Ym(this.elements.container, this.config.classNames.airplay.supported, ig.airplay && this.isHTML5), Ym(this.elements.container, this.config.classNames.isIos, Lm.isIos), Ym(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout((function() {
                ug.call(e, e.media, "ready")
            }), 0), cv.setTitle.call(this), this.poster && cv.setPoster.call(this, this.poster, !1).catch((function() {})), this.config.duration && Yg.durationUpdate.call(this)
        },
        setTitle: function() {
            var e = Fg("play", this.config);
            if (bm(this.config.title) && !Pm(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach((function(t) {
                    t.setAttribute("aria-label", e)
                })), this.isEmbed) {
                var t = Jm.call(this, "iframe");
                if (!xm(t)) return;
                var n = Pm(this.config.title) ? "video" : this.config.title,
                    i = Fg("frameTitle", this.config);
                t.setAttribute("title", i.replace("{title}", n))
            }
        },
        togglePoster: function(e) {
            Ym(this.elements.container, this.config.classNames.posterEnabled, e)
        },
        setPoster: function(e) {
            var t = this,
                n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return n && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), dg.call(this).then((function() {
                return uv(e)
            })).catch((function(n) {
                throw e === t.poster && cv.togglePoster.call(t, !1), n
            })).then((function() {
                if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster")
            })).then((function() {
                return Object.assign(t.elements.poster.style, {
                    backgroundImage: "url('".concat(e, "')"),
                    backgroundSize: ""
                }), cv.togglePoster.call(t, !0), e
            })))
        },
        checkPlaying: function(e) {
            var t = this;
            Ym(this.elements.container, this.config.classNames.playing, this.playing), Ym(this.elements.container, this.config.classNames.paused, this.paused), Ym(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((function(e) {
                Object.assign(e, {
                    pressed: t.playing
                }), e.setAttribute("aria-label", Fg(t.playing ? "pause" : "play", t.config))
            })), Am(e) && "timeupdate" === e.type || cv.toggleControls.call(this)
        },
        checkLoading: function(e) {
            var t = this;
            this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout((function() {
                Ym(t.elements.container, t.config.classNames.loading, t.loading), cv.toggleControls.call(t)
            }), this.loading ? 250 : 0)
        },
        toggleControls: function(e) {
            var t = this.elements.controls;
            if (t && this.config.hideControls) {
                var n = this.touch && this.lastSeekTime + 2e3 > Date.now();
                this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n))
            }
        },
        migrateStyles: function() {
            var e = this;
            Object.values(Fd({}, this.media.style)).filter((function(e) {
                return !Pm(e) && e.startsWith("--plyr")
            })).forEach((function(t) {
                e.elements.container.style.setProperty(t, e.media.style.getPropertyValue(t)), e.media.style.removeProperty(t)
            })), Pm(this.media.style) && this.media.removeAttribute("style")
        }
    },
    dv = function() {
        function e(t) {
            Rd(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
        }
        return jd(e, [{
            key: "handleKey",
            value: function(e) {
                var t = this.player,
                    n = t.elements,
                    i = e.keyCode ? e.keyCode : e.which,
                    r = "keydown" === e.type,
                    o = r && i === this.lastKey;
                if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && ym(i)) {
                    if (r) {
                        var a = document.activeElement;
                        if (xm(a)) {
                            var s = t.config.selectors.editable;
                            if (a !== n.inputs.seek && Km(a, s)) return;
                            if (32 === e.which && Km(a, 'button, [role^="menuitem"]')) return
                        }
                        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                o || (t.currentTime = t.duration / 10 * (i - 48));
                                break;
                            case 32:
                            case 75:
                                o || hg(t.togglePlay());
                                break;
                            case 38:
                                t.increaseVolume(.1);
                                break;
                            case 40:
                                t.decreaseVolume(.1);
                                break;
                            case 77:
                                o || (t.muted = !t.muted);
                                break;
                            case 39:
                                t.forward();
                                break;
                            case 37:
                                t.rewind();
                                break;
                            case 70:
                                t.fullscreen.toggle();
                                break;
                            case 67:
                                o || t.toggleCaptions();
                                break;
                            case 76:
                                t.loop = !t.loop
                        }
                        27 === i && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = i
                    } else this.lastKey = null
                }
            }
        }, {
            key: "toggleMenu",
            value: function(e) {
                Yg.toggleMenu.call(this.player, e)
            }
        }, {
            key: "firstTouch",
            value: function() {
                var e = this.player,
                    t = e.elements;
                e.touch = !0, Ym(t.container, e.config.classNames.isTouch, !0)
            }
        }, {
            key: "setTabFocus",
            value: function(e) {
                var t = this.player,
                    n = t.elements;
                if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
                    "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
                    var i, r = e.timeStamp - this.lastKeyDown <= 20;
                    if ("focus" !== e.type || r) i = t.config.classNames.tabFocus, Ym(Zm.call(t, ".".concat(i)), i, !1), "focusout" !== e.type && (this.focusTimer = setTimeout((function() {
                        var e = document.activeElement;
                        n.container.contains(e) && Ym(document.activeElement, t.config.classNames.tabFocus, !0)
                    }), 10))
                }
            }
        }, {
            key: "global",
            value: function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                    t = this.player;
                t.config.keyboard.global && og.call(t, window, "keydown keyup", this.handleKey, e, !1), og.call(t, document.body, "click", this.toggleMenu, e), lg.call(t, document.body, "touchstart", this.firstTouch), og.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0)
            }
        }, {
            key: "container",
            value: function() {
                var e = this.player,
                    t = e.config,
                    n = e.elements,
                    i = e.timers;
                !t.keyboard.global && t.keyboard.focused && ag.call(e, n.container, "keydown keyup", this.handleKey, !1), ag.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (function(t) {
                    var r = n.controls;
                    r && "enterfullscreen" === t.type && (r.pressed = !1, r.hover = !1);
                    var o = 0;
                    ["touchstart", "touchmove", "mousemove"].includes(t.type) && (cv.toggleControls.call(e, !0), o = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout((function() {
                        return cv.toggleControls.call(e, !1)
                    }), o)
                }));
                var r = function(t) {
                        if (!t) return gg.call(e);
                        var i = n.container.getBoundingClientRect(),
                            r = i.width,
                            o = i.height;
                        return gg.call(e, "".concat(r, ":").concat(o))
                    },
                    o = function() {
                        clearTimeout(i.resized), i.resized = setTimeout(r, 50)
                    };
                ag.call(e, n.container, "enterfullscreen exitfullscreen", (function(t) {
                    var i = e.fullscreen,
                        a = i.target,
                        s = i.usingNative;
                    if (a === n.container && (e.isEmbed || !Pm(e.config.ratio))) {
                        var l = "enterfullscreen" === t.type,
                            u = r(l);
                        u.padding;
                        ! function(t, n, i) {
                            if (e.isVimeo && !e.config.vimeo.premium) {
                                var r = e.elements.wrapper.firstChild,
                                    o = Ud(t, 2)[1],
                                    a = Ud(mg.call(e), 2),
                                    s = a[0],
                                    l = a[1];
                                r.style.maxWidth = i ? "".concat(o / l * s, "px") : null, r.style.margin = i ? "0 auto" : null
                            }
                        }(u.ratio, 0, l), s || (l ? ag.call(e, window, "resize", o) : sg.call(e, window, "resize", o))
                    }
                }))
            }
        }, {
            key: "media",
            value: function() {
                var e = this,
                    t = this.player,
                    n = t.elements;
                if (ag.call(t, t.media, "timeupdate seeking seeked", (function(e) {
                        return Yg.timeUpdate.call(t, e)
                    })), ag.call(t, t.media, "durationchange loadeddata loadedmetadata", (function(e) {
                        return Yg.durationUpdate.call(t, e)
                    })), ag.call(t, t.media, "ended", (function() {
                        t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause())
                    })), ag.call(t, t.media, "progress playing seeking seeked", (function(e) {
                        return Yg.updateProgress.call(t, e)
                    })), ag.call(t, t.media, "volumechange", (function(e) {
                        return Yg.updateVolume.call(t, e)
                    })), ag.call(t, t.media, "playing play pause ended emptied timeupdate", (function(e) {
                        return cv.checkPlaying.call(t, e)
                    })), ag.call(t, t.media, "waiting canplay seeked playing", (function(e) {
                        return cv.checkLoading.call(t, e)
                    })), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
                    var i = Jm.call(t, ".".concat(t.config.classNames.video));
                    if (!xm(i)) return;
                    ag.call(t, n.container, "click", (function(r) {
                        ([n.container, i].includes(r.target) || i.contains(r.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(r, t.restart, "restart"), e.proxy(r, (function() {
                            hg(t.play())
                        }), "play")) : e.proxy(r, (function() {
                            hg(t.togglePlay())
                        }), "play")))
                    }))
                }
                t.supported.ui && t.config.disableContextMenu && ag.call(t, n.wrapper, "contextmenu", (function(e) {
                    e.preventDefault()
                }), !1), ag.call(t, t.media, "volumechange", (function() {
                    t.storage.set({
                        volume: t.volume,
                        muted: t.muted
                    })
                })), ag.call(t, t.media, "ratechange", (function() {
                    Yg.updateSetting.call(t, "speed"), t.storage.set({
                        speed: t.speed
                    })
                })), ag.call(t, t.media, "qualitychange", (function(e) {
                    Yg.updateSetting.call(t, "quality", null, e.detail.quality)
                })), ag.call(t, t.media, "ready qualitychange", (function() {
                    Yg.setDownloadUrl.call(t)
                }));
                var r = t.config.events.concat(["keyup", "keydown"]).join(" ");
                ag.call(t, t.media, r, (function(e) {
                    var i = e.detail,
                        r = void 0 === i ? {} : i;
                    "error" === e.type && (r = t.media.error), ug.call(t, n.container, e.type, !0, r)
                }))
            }
        }, {
            key: "proxy",
            value: function(e, t, n) {
                var i = this.player,
                    r = i.config.listeners[n],
                    o = !0;
                wm(r) && (o = r.call(i, e)), !1 !== o && wm(t) && t.call(i, e)
            }
        }, {
            key: "bind",
            value: function(e, t, n, i) {
                var r = this,
                    o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                    a = this.player,
                    s = a.config.listeners[i],
                    l = wm(s);
                ag.call(a, e, t, (function(e) {
                    return r.proxy(e, n, i)
                }), o && !l)
            }
        }, {
            key: "controls",
            value: function() {
                var e = this,
                    t = this.player,
                    n = t.elements,
                    i = Lm.isIE ? "change" : "input";
                if (n.buttons.play && Array.from(n.buttons.play).forEach((function(n) {
                        e.bind(n, "click", (function() {
                            hg(t.togglePlay())
                        }), "play")
                    })), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", t.rewind, "rewind"), this.bind(n.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(n.buttons.mute, "click", (function() {
                        t.muted = !t.muted
                    }), "mute"), this.bind(n.buttons.captions, "click", (function() {
                        return t.toggleCaptions()
                    })), this.bind(n.buttons.download, "click", (function() {
                        ug.call(t, t.media, "download")
                    }), "download"), this.bind(n.buttons.fullscreen, "click", (function() {
                        t.fullscreen.toggle()
                    }), "fullscreen"), this.bind(n.buttons.pip, "click", (function() {
                        t.pip = "toggle"
                    }), "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", (function(e) {
                        e.stopPropagation(), e.preventDefault(), Yg.toggleMenu.call(t, e)
                    }), null, !1), this.bind(n.buttons.settings, "keyup", (function(e) {
                        var n = e.which;
                        [13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), Yg.toggleMenu.call(t, e)) : Yg.focusFirstMenuItem.call(t, null, !0))
                    }), null, !1), this.bind(n.settings.menu, "keydown", (function(e) {
                        27 === e.which && Yg.toggleMenu.call(t, e)
                    })), this.bind(n.inputs.seek, "mousedown mousemove", (function(e) {
                        var t = n.progress.getBoundingClientRect(),
                            i = 100 / t.width * (e.pageX - t.left);
                        e.currentTarget.setAttribute("seek-value", i)
                    })), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (function(e) {
                        var n = e.currentTarget,
                            i = e.keyCode ? e.keyCode : e.which;
                        if (!Sm(e) || 39 === i || 37 === i) {
                            t.lastSeekTime = Date.now();
                            var r = n.hasAttribute("play-on-seeked"),
                                o = ["mouseup", "touchend", "keyup"].includes(e.type);
                            r && o ? (n.removeAttribute("play-on-seeked"), hg(t.play())) : !o && t.playing && (n.setAttribute("play-on-seeked", ""), t.pause())
                        }
                    })), Lm.isIos) {
                    var r = Zm.call(t, 'input[type="range"]');
                    Array.from(r).forEach((function(t) {
                        return e.bind(t, i, (function(e) {
                            return Mm(e.target)
                        }))
                    }))
                }
                this.bind(n.inputs.seek, i, (function(e) {
                    var n = e.currentTarget,
                        i = n.getAttribute("seek-value");
                    Pm(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration
                }), "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", (function(e) {
                    return Yg.updateSeekTooltip.call(t, e)
                })), this.bind(n.progress, "mousemove touchmove", (function(e) {
                    var n = t.previewThumbnails;
                    n && n.loaded && n.startMove(e)
                })), this.bind(n.progress, "mouseleave touchend click", (function() {
                    var e = t.previewThumbnails;
                    e && e.loaded && e.endMove(!1, !0)
                })), this.bind(n.progress, "mousedown touchstart", (function(e) {
                    var n = t.previewThumbnails;
                    n && n.loaded && n.startScrubbing(e)
                })), this.bind(n.progress, "mouseup touchend", (function(e) {
                    var n = t.previewThumbnails;
                    n && n.loaded && n.endScrubbing(e)
                })), Lm.isWebkit && Array.from(Zm.call(t, 'input[type="range"]')).forEach((function(n) {
                    e.bind(n, "input", (function(e) {
                        return Yg.updateRangeFill.call(t, e.target)
                    }))
                })), t.config.toggleInvert && !xm(n.display.duration) && this.bind(n.display.currentTime, "click", (function() {
                    0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, Yg.timeUpdate.call(t))
                })), this.bind(n.inputs.volume, i, (function(e) {
                    t.volume = e.target.value
                }), "volume"), this.bind(n.controls, "mouseenter mouseleave", (function(e) {
                    n.controls.hover = !t.touch && "mouseenter" === e.type
                })), n.fullscreen && Array.from(n.fullscreen.children).filter((function(e) {
                    return !e.contains(n.container)
                })).forEach((function(i) {
                    e.bind(i, "mouseenter mouseleave", (function(e) {
                        n.controls.hover = !t.touch && "mouseenter" === e.type
                    }))
                })), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", (function(e) {
                    n.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
                })), this.bind(n.controls, "focusin", (function() {
                    var i = t.config,
                        r = t.timers;
                    Ym(n.controls, i.classNames.noTransition, !0), cv.toggleControls.call(t, !0), setTimeout((function() {
                        Ym(n.controls, i.classNames.noTransition, !1)
                    }), 0);
                    var o = e.touch ? 3e3 : 4e3;
                    clearTimeout(r.controls), r.controls = setTimeout((function() {
                        return cv.toggleControls.call(t, !1)
                    }), o)
                })), this.bind(n.inputs.volume, "wheel", (function(e) {
                    var n = e.webkitDirectionInvertedFromDevice,
                        i = Ud([e.deltaX, -e.deltaY].map((function(e) {
                            return n ? -e : e
                        })), 2),
                        r = i[0],
                        o = i[1],
                        a = Math.sign(Math.abs(r) > Math.abs(o) ? r : o);
                    t.increaseVolume(a / 50);
                    var s = t.media.volume;
                    (1 === a && s < 1 || -1 === a && s > 0) && e.preventDefault()
                }), "volume", !1)
            }
        }]), e
    }(),
    hv = ul("splice"),
    fv = ms("splice", {
        ACCESSORS: !0,
        0: 0,
        1: 2
    }),
    pv = Math.max,
    mv = Math.min;
Xo({
    target: "Array",
    proto: !0,
    forced: !hv || !fv
}, {
    splice: function(e, t) {
        var n, i, r, o, a, s, l = Zo(this),
            u = So(l.length),
            c = Co(e, u),
            d = arguments.length;
        if (0 === d ? n = i = 0 : 1 === d ? (n = 0, i = u - c) : (n = d - 2, i = mv(pv(xo(t), 0), u - c)), u + n - i > 9007199254740991) throw TypeError("Maximum allowed length exceeded");
        for (r = xa(l, i), o = 0; o < i; o++)(a = c + o) in l && nl(r, o, l[a]);
        if (r.length = i, n < i) {
            for (o = c; o < u - i; o++) s = o + n, (a = o + i) in l ? l[s] = l[a] : delete l[s];
            for (o = u; o > u - i + n; o--) delete l[o - 1]
        } else if (n > i)
            for (o = u - i; o > c; o--) s = o + n - 1, (a = o + i - 1) in l ? l[s] = l[a] : delete l[s];
        for (o = 0; o < n; o++) l[o + c] = arguments[o + 2];
        return l.length = u - i + n, r
    }
});
var gv = yr((function(e, t) {
    e.exports = function() {
        var e = function() {},
            t = {},
            n = {},
            i = {};

        function r(e, t) {
            if (e) {
                var r = i[e];
                if (n[e] = t, r)
                    for (; r.length;) r[0](e, t), r.splice(0, 1)
            }
        }

        function o(t, n) {
            t.call && (t = {
                success: t
            }), n.length ? (t.error || e)(n) : (t.success || e)(t)
        }

        function a(t, n, i, r) {
            var o, s, l = document,
                u = i.async,
                c = (i.numRetries || 0) + 1,
                d = i.before || e,
                h = t.replace(/[\?|#].*$/, ""),
                f = t.replace(/^(css|img)!/, "");
            r = r || 0, /(^css!|\.css$)/.test(h) ? ((s = l.createElement("link")).rel = "stylesheet", s.href = f, (o = "hideFocus" in s) && s.relList && (o = 0, s.rel = "preload", s.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (s = l.createElement("img")).src = f : ((s = l.createElement("script")).src = t, s.async = void 0 === u || u), s.onload = s.onerror = s.onbeforeload = function(e) {
                var l = e.type[0];
                if (o) try {
                    s.sheet.cssText.length || (l = "e")
                } catch (e) {
                    18 != e.code && (l = "e")
                }
                if ("e" == l) {
                    if ((r += 1) < c) return a(t, n, i, r)
                } else if ("preload" == s.rel && "style" == s.as) return s.rel = "stylesheet";
                n(t, l, e.defaultPrevented)
            }, !1 !== d(t, s) && l.head.appendChild(s)
        }

        function s(e, n, i) {
            var s, l;
            if (n && n.trim && (s = n), l = (s ? i : n) || {}, s) {
                if (s in t) throw "LoadJS";
                t[s] = !0
            }

            function u(t, n) {
                ! function(e, t, n) {
                    var i, r, o = (e = e.push ? e : [e]).length,
                        s = o,
                        l = [];
                    for (i = function(e, n, i) {
                            if ("e" == n && l.push(e), "b" == n) {
                                if (!i) return;
                                l.push(e)
                            }--o || t(l)
                        }, r = 0; r < s; r++) a(e[r], i, n)
                }(e, (function(e) {
                    o(l, e), t && o({
                        success: t,
                        error: n
                    }, e), r(s, e)
                }), l)
            }
            if (l.returnPromise) return new Promise(u);
            u()
        }
        return s.ready = function(e, t) {
            return function(e, t) {
                e = e.push ? e : [e];
                var r, o, a, s = [],
                    l = e.length,
                    u = l;
                for (r = function(e, n) {
                        n.length && s.push(e), --u || t(s)
                    }; l--;) o = e[l], (a = n[o]) ? r(o, a) : (i[o] = i[o] || []).push(r)
            }(e, (function(e) {
                o(t, e)
            })), s
        }, s.done = function(e) {
            r(e, [])
        }, s.reset = function() {
            t = {}, n = {}, i = {}
        }, s.isDefined = function(e) {
            return e in t
        }, s
    }()
}));

function vv(e) {
    return new Promise((function(t, n) {
        gv(e, {
            success: t,
            error: n
        })
    }))
}

function yv(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ug.call(this, this.media, e ? "play" : "pause"))
}
var bv = {
    setup: function() {
        var e = this;
        Ym(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, gg.call(e), vm(window.Vimeo) ? bv.ready.call(e) : vv(e.config.urls.vimeo.sdk).then((function() {
            bv.ready.call(e)
        })).catch((function(t) {
            e.debug.warn("Vimeo SDK (player.js) failed to load", t)
        }))
    },
    ready: function() {
        var e = this,
            t = this,
            n = t.config.vimeo,
            i = n.premium,
            r = n.referrerPolicy,
            o = Hd(n, ["premium", "referrerPolicy"]);
        i && Object.assign(o, {
            controls: !1,
            sidedock: !1
        });
        var a = Kg(Fd({
                loop: t.config.loop.active,
                autoplay: t.autoplay,
                muted: t.muted,
                gesture: "media",
                playsinline: !this.config.fullscreen.iosNative
            }, o)),
            s = t.media.getAttribute("src");
        Pm(s) && (s = t.media.getAttribute(t.config.attributes.embed.id));
        var l, u = Pm(l = s) ? null : ym(Number(l)) ? l : l.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : l,
            c = qm("iframe"),
            d = Lg(t.config.urls.vimeo.iframe, u, a);
        c.setAttribute("src", d), c.setAttribute("allowfullscreen", ""), c.setAttribute("allow", "autoplay,fullscreen,picture-in-picture"), Pm(r) || c.setAttribute("referrerPolicy", r);
        var h = t.poster;
        if (i) c.setAttribute("data-poster", h), t.media = Wm(c, t.media);
        else {
            var f = qm("div", {
                class: t.config.classNames.embedContainer,
                "data-poster": h
            });
            f.appendChild(c), t.media = Wm(f, t.media)
        }
        Ug(Lg(t.config.urls.vimeo.api, u), "json").then((function(e) {
            if (!Pm(e)) {
                var n = new URL(e[0].thumbnail_large);
                n.pathname = "".concat(n.pathname.split("_")[0], ".jpg"), cv.setPoster.call(t, n.href).catch((function() {}))
            }
        })), t.embed = new window.Vimeo.Player(c, {
            autopause: t.config.autopause,
            muted: t.muted
        }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function() {
            return yv.call(t, !0), t.embed.play()
        }, t.media.pause = function() {
            return yv.call(t, !1), t.embed.pause()
        }, t.media.stop = function() {
            t.pause(), t.currentTime = 0
        };
        var p = t.media.currentTime;
        Object.defineProperty(t.media, "currentTime", {
            get: function() {
                return p
            },
            set: function(e) {
                var n = t.embed,
                    i = t.media,
                    r = t.paused,
                    o = t.volume,
                    a = r && !n.hasPlayed;
                i.seeking = !0, ug.call(t, i, "seeking"), Promise.resolve(a && n.setVolume(0)).then((function() {
                    return n.setCurrentTime(e)
                })).then((function() {
                    return a && n.pause()
                })).then((function() {
                    return a && n.setVolume(o)
                })).catch((function() {}))
            }
        });
        var m = t.config.speed.selected;
        Object.defineProperty(t.media, "playbackRate", {
            get: function() {
                return m
            },
            set: function(e) {
                t.embed.setPlaybackRate(e).then((function() {
                    m = e, ug.call(t, t.media, "ratechange")
                })).catch((function() {
                    t.options.speed = [1]
                }))
            }
        });
        var g = t.config.volume;
        Object.defineProperty(t.media, "volume", {
            get: function() {
                return g
            },
            set: function(e) {
                t.embed.setVolume(e).then((function() {
                    g = e, ug.call(t, t.media, "volumechange")
                }))
            }
        });
        var v = t.config.muted;
        Object.defineProperty(t.media, "muted", {
            get: function() {
                return v
            },
            set: function(e) {
                var n = !!_m(e) && e;
                t.embed.setVolume(n ? 0 : t.config.volume).then((function() {
                    v = n, ug.call(t, t.media, "volumechange")
                }))
            }
        });
        var y, b = t.config.loop;
        Object.defineProperty(t.media, "loop", {
            get: function() {
                return b
            },
            set: function(e) {
                var n = _m(e) ? e : t.config.loop.active;
                t.embed.setLoop(n).then((function() {
                    b = n
                }))
            }
        }), t.embed.getVideoUrl().then((function(e) {
            y = e, Yg.setDownloadUrl.call(t)
        })).catch((function(t) {
            e.debug.warn(t)
        })), Object.defineProperty(t.media, "currentSrc", {
            get: function() {
                return y
            }
        }), Object.defineProperty(t.media, "ended", {
            get: function() {
                return t.currentTime === t.duration
            }
        }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then((function(n) {
            var i = Ud(n, 2),
                r = i[0],
                o = i[1];
            t.embed.ratio = [r, o], gg.call(e)
        })), t.embed.setAutopause(t.config.autopause).then((function(e) {
            t.config.autopause = e
        })), t.embed.getVideoTitle().then((function(n) {
            t.config.title = n, cv.setTitle.call(e)
        })), t.embed.getCurrentTime().then((function(e) {
            p = e, ug.call(t, t.media, "timeupdate")
        })), t.embed.getDuration().then((function(e) {
            t.media.duration = e, ug.call(t, t.media, "durationchange")
        })), t.embed.getTextTracks().then((function(e) {
            t.media.textTracks = e, Zg.setup.call(t)
        })), t.embed.on("cuechange", (function(e) {
            var n = e.cues,
                i = (void 0 === n ? [] : n).map((function(e) {
                    return function(e) {
                        var t = document.createDocumentFragment(),
                            n = document.createElement("div");
                        return t.appendChild(n), n.innerHTML = e, t.firstChild.innerText
                    }(e.text)
                }));
            Zg.updateCues.call(t, i)
        })), t.embed.on("loaded", (function() {
            (t.embed.getPaused().then((function(e) {
                yv.call(t, !e), e || ug.call(t, t.media, "playing")
            })), xm(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1)
        })), t.embed.on("bufferstart", (function() {
            ug.call(t, t.media, "waiting")
        })), t.embed.on("bufferend", (function() {
            ug.call(t, t.media, "playing")
        })), t.embed.on("play", (function() {
            yv.call(t, !0), ug.call(t, t.media, "playing")
        })), t.embed.on("pause", (function() {
            yv.call(t, !1)
        })), t.embed.on("timeupdate", (function(e) {
            t.media.seeking = !1, p = e.seconds, ug.call(t, t.media, "timeupdate")
        })), t.embed.on("progress", (function(e) {
            t.media.buffered = e.percent, ug.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && ug.call(t, t.media, "canplaythrough"), t.embed.getDuration().then((function(e) {
                e !== t.media.duration && (t.media.duration = e, ug.call(t, t.media, "durationchange"))
            }))
        })), t.embed.on("seeked", (function() {
            t.media.seeking = !1, ug.call(t, t.media, "seeked")
        })), t.embed.on("ended", (function() {
            t.media.paused = !0, ug.call(t, t.media, "ended")
        })), t.embed.on("error", (function(e) {
            t.media.error = e, ug.call(t, t.media, "error")
        })), setTimeout((function() {
            return cv.build.call(t)
        }), 0)
    }
};

function _v(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ug.call(this, this.media, e ? "play" : "pause"))
}

function wv(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
}
var Tv = {
        setup: function() {
            var e = this;
            if (Ym(this.elements.wrapper, this.config.classNames.embed, !0), vm(window.YT) && wm(window.YT.Player)) Tv.ready.call(this);
            else {
                var t = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function() {
                    wm(t) && t(), Tv.ready.call(e)
                }, vv(this.config.urls.youtube.sdk).catch((function(t) {
                    e.debug.warn("YouTube API failed to load", t)
                }))
            }
        },
        getTitle: function(e) {
            var t = this;
            Ug(Lg(this.config.urls.youtube.api, e)).then((function(e) {
                if (vm(e)) {
                    var n = e.title,
                        i = e.height,
                        r = e.width;
                    t.config.title = n, cv.setTitle.call(t), t.embed.ratio = [r, i]
                }
                gg.call(t)
            })).catch((function() {
                gg.call(t)
            }))
        },
        ready: function() {
            var e = this,
                t = e.media && e.media.getAttribute("id");
            if (Pm(t) || !t.startsWith("youtube-")) {
                var n = e.media.getAttribute("src");
                Pm(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
                var i, r, o = Pm(i = n) ? null : i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : i,
                    a = (r = e.provider, "".concat(r, "-").concat(Math.floor(1e4 * Math.random()))),
                    s = qm("div", {
                        id: a,
                        "data-poster": e.poster
                    });
                e.media = Wm(s, e.media);
                var l = function(e) {
                    return "https://i.ytimg.com/vi/".concat(o, "/").concat(e, "default.jpg")
                };
                uv(l("maxres"), 121).catch((function() {
                    return uv(l("sd"), 121)
                })).catch((function() {
                    return uv(l("hq"))
                })).then((function(t) {
                    return cv.setPoster.call(e, t.src)
                })).then((function(t) {
                    t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
                })).catch((function() {}));
                var u = e.config.youtube;
                e.embed = new window.YT.Player(a, {
                    videoId: o,
                    host: wv(u),
                    playerVars: Fm({}, {
                        autoplay: e.config.autoplay ? 1 : 0,
                        hl: e.config.hl,
                        controls: e.supported.ui ? 0 : 1,
                        disablekb: 1,
                        playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                        cc_load_policy: e.captions.active ? 1 : 0,
                        cc_lang_pref: e.config.captions.language,
                        widget_referrer: window ? window.location.href : null
                    }, u),
                    events: {
                        onError: function(t) {
                            if (!e.media.error) {
                                var n = t.data,
                                    i = {
                                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                                        150: "The owner of the requested video does not allow it to be played in embedded players."
                                    } [n] || "An unknown error occured";
                                e.media.error = {
                                    code: n,
                                    message: i
                                }, ug.call(e, e.media, "error")
                            }
                        },
                        onPlaybackRateChange: function(t) {
                            var n = t.target;
                            e.media.playbackRate = n.getPlaybackRate(), ug.call(e, e.media, "ratechange")
                        },
                        onReady: function(t) {
                            if (!wm(e.media.play)) {
                                var n = t.target;
                                Tv.getTitle.call(e, o), e.media.play = function() {
                                    _v.call(e, !0), n.playVideo()
                                }, e.media.pause = function() {
                                    _v.call(e, !1), n.pauseVideo()
                                }, e.media.stop = function() {
                                    n.stopVideo()
                                }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                                    get: function() {
                                        return Number(n.getCurrentTime())
                                    },
                                    set: function(t) {
                                        e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ug.call(e, e.media, "seeking"), n.seekTo(t)
                                    }
                                }), Object.defineProperty(e.media, "playbackRate", {
                                    get: function() {
                                        return n.getPlaybackRate()
                                    },
                                    set: function(e) {
                                        n.setPlaybackRate(e)
                                    }
                                });
                                var i = e.config.volume;
                                Object.defineProperty(e.media, "volume", {
                                    get: function() {
                                        return i
                                    },
                                    set: function(t) {
                                        i = t, n.setVolume(100 * i), ug.call(e, e.media, "volumechange")
                                    }
                                });
                                var r = e.config.muted;
                                Object.defineProperty(e.media, "muted", {
                                    get: function() {
                                        return r
                                    },
                                    set: function(t) {
                                        var i = _m(t) ? t : r;
                                        r = i, n[i ? "mute" : "unMute"](), ug.call(e, e.media, "volumechange")
                                    }
                                }), Object.defineProperty(e.media, "currentSrc", {
                                    get: function() {
                                        return n.getVideoUrl()
                                    }
                                }), Object.defineProperty(e.media, "ended", {
                                    get: function() {
                                        return e.currentTime === e.duration
                                    }
                                });
                                var a = n.getAvailablePlaybackRates();
                                e.options.speed = a.filter((function(t) {
                                    return e.config.speed.options.includes(t)
                                })), e.supported.ui && e.media.setAttribute("tabindex", -1), ug.call(e, e.media, "timeupdate"), ug.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval((function() {
                                    e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ug.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ug.call(e, e.media, "canplaythrough"))
                                }), 200), setTimeout((function() {
                                    return cv.build.call(e)
                                }), 50)
                            }
                        },
                        onStateChange: function(t) {
                            var n = t.target;
                            switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, ug.call(e, e.media, "seeked")), t.data) {
                                case -1:
                                    ug.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), ug.call(e, e.media, "progress");
                                    break;
                                case 0:
                                    _v.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : ug.call(e, e.media, "ended");
                                    break;
                                case 1:
                                    e.config.autoplay || !e.media.paused || e.embed.hasPlayed ? (_v.call(e, !0), ug.call(e, e.media, "playing"), e.timers.playing = setInterval((function() {
                                        ug.call(e, e.media, "timeupdate")
                                    }), 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), ug.call(e, e.media, "durationchange"))) : e.media.pause();
                                    break;
                                case 2:
                                    e.muted || e.embed.unMute(), _v.call(e, !1);
                                    break;
                                case 3:
                                    ug.call(e, e.media, "waiting")
                            }
                            ug.call(e, e.elements.container, "statechange", !1, {
                                code: t.data
                            })
                        }
                    }
                })
            }
        }
    },
    kv = {
        setup: function() {
            this.media ? (Ym(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), Ym(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && Ym(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = qm("div", {
                class: this.config.classNames.video
            }), Hm(this.media, this.elements.wrapper), this.elements.poster = qm("div", {
                class: this.config.classNames.poster
            }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? vg.setup.call(this) : this.isYouTube ? Tv.setup.call(this) : this.isVimeo && bv.setup.call(this)) : this.debug.warn("No media element found!")
        }
    },
    xv = function() {
        function e(t) {
            var n = this;
            Rd(this, e), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                container: null,
                displayContainer: null
            }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((function(e, t) {
                n.on("loaded", e), n.on("error", t)
            })), this.load()
        }
        return jd(e, [{
            key: "load",
            value: function() {
                var e = this;
                this.enabled && (vm(window.google) && vm(window.google.ima) ? this.ready() : vv(this.player.config.urls.googleIMA.sdk).then((function() {
                    e.ready()
                })).catch((function() {
                    e.trigger("error", new Error("Google IMA SDK failed to load"))
                })))
            }
        }, {
            key: "ready",
            value: function() {
                var e, t = this;
                this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then((function() {
                    t.clearSafetyTimer("onAdsManagerLoaded()")
                })), this.listeners(), this.setupIMA()
            }
        }, {
            key: "setupIMA",
            value: function() {
                var e = this;
                this.elements.container = qm("div", {
                    class: this.player.config.classNames.ads
                }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (function(t) {
                    return e.onAdsManagerLoaded(t)
                }), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function(t) {
                    return e.onAdError(t)
                }), !1), this.requestAds()
            }
        }, {
            key: "requestAds",
            value: function() {
                var e = this.player.elements.container;
                try {
                    var t = new google.ima.AdsRequest;
                    t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t)
                } catch (e) {
                    this.onAdError(e)
                }
            }
        }, {
            key: "pollCountdown",
            value: function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!t) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
                var n = function() {
                    var t = Xg(Math.max(e.manager.getRemainingTime(), 0)),
                        n = "".concat(Fg("advertisement", e.player.config), " - ").concat(t);
                    e.elements.container.setAttribute("data-badge-text", n)
                };
                this.countdownTimer = setInterval(n, 100)
            }
        }, {
            key: "onAdsManagerLoaded",
            value: function(e) {
                var t = this;
                if (this.enabled) {
                    var n = new google.ima.AdsRenderingSettings;
                    n.restoreCustomPlaybackStateOnAdBreakComplete = !0, n.enablePreloading = !0, this.manager = e.getAdsManager(this.player, n), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function(e) {
                        return t.onAdError(e)
                    })), Object.keys(google.ima.AdEvent.Type).forEach((function(e) {
                        t.manager.addEventListener(google.ima.AdEvent.Type[e], (function(e) {
                            return t.onAdEvent(e)
                        }))
                    })), this.trigger("loaded")
                }
            }
        }, {
            key: "addCuePoints",
            value: function() {
                var e = this;
                Pm(this.cuePoints) || this.cuePoints.forEach((function(t) {
                    if (0 !== t && -1 !== t && t < e.player.duration) {
                        var n = e.player.elements.progress;
                        if (xm(n)) {
                            var i = 100 / e.player.duration * t,
                                r = qm("span", {
                                    class: e.player.config.classNames.cues
                                });
                            r.style.left = "".concat(i.toString(), "%"), n.appendChild(r)
                        }
                    }
                }))
            }
        }, {
            key: "onAdEvent",
            value: function(e) {
                var t = this,
                    n = this.player.elements.container,
                    i = e.getAd(),
                    r = e.getAdData();
                switch (function(e) {
                        ug.call(t.player, t.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()))
                    }(e.type), e.type) {
                    case google.ima.AdEvent.Type.LOADED:
                        this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = n.offsetWidth, i.height = n.offsetHeight);
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        this.manager.setVolume(this.player.volume);
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                        this.player.ended ? this.loadAds() : this.loader.contentComplete();
                        break;
                    case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                        this.pauseContent();
                        break;
                    case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                        this.pollCountdown(), this.resumeContent();
                        break;
                    case google.ima.AdEvent.Type.LOG:
                        r.adError && this.player.debug.warn("Non-fatal ad error: ".concat(r.adError.getMessage()))
                }
            }
        }, {
            key: "onAdError",
            value: function(e) {
                this.cancel(), this.player.debug.warn("Ads error", e)
            }
        }, {
            key: "listeners",
            value: function() {
                var e, t = this,
                    n = this.player.elements.container;
                this.player.on("canplay", (function() {
                    t.addCuePoints()
                })), this.player.on("ended", (function() {
                    t.loader.contentComplete()
                })), this.player.on("timeupdate", (function() {
                    e = t.player.currentTime
                })), this.player.on("seeked", (function() {
                    var n = t.player.currentTime;
                    Pm(t.cuePoints) || t.cuePoints.forEach((function(i, r) {
                        e < i && i < n && (t.manager.discardAdBreak(), t.cuePoints.splice(r, 1))
                    }))
                })), window.addEventListener("resize", (function() {
                    t.manager && t.manager.resize(n.offsetWidth, n.offsetHeight, google.ima.ViewMode.NORMAL)
                }))
            }
        }, {
            key: "play",
            value: function() {
                var e = this,
                    t = this.player.elements.container;
                this.managerPromise || this.resumeContent(), this.managerPromise.then((function() {
                    e.manager.setVolume(e.player.volume), e.elements.displayContainer.initialize();
                    try {
                        e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0
                    } catch (t) {
                        e.onAdError(t)
                    }
                })).catch((function() {}))
            }
        }, {
            key: "resumeContent",
            value: function() {
                this.elements.container.style.zIndex = "", this.playing = !1, hg(this.player.media.play())
            }
        }, {
            key: "pauseContent",
            value: function() {
                this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
            }
        }, {
            key: "cancel",
            value: function() {
                this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
            }
        }, {
            key: "loadAds",
            value: function() {
                var e = this;
                this.managerPromise.then((function() {
                    e.manager && e.manager.destroy(), e.managerPromise = new Promise((function(t) {
                        e.on("loaded", t), e.player.debug.log(e.manager)
                    })), e.initialized = !1, e.requestAds()
                })).catch((function() {}))
            }
        }, {
            key: "trigger",
            value: function(e) {
                for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
                var o = this.events[e];
                Tm(o) && o.forEach((function(e) {
                    wm(e) && e.apply(t, i)
                }))
            }
        }, {
            key: "on",
            value: function(e, t) {
                return Tm(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
            }
        }, {
            key: "startSafetyTimer",
            value: function(e, t) {
                var n = this;
                this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout((function() {
                    n.cancel(), n.clearSafetyTimer("startSafetyTimer()")
                }), e)
            }
        }, {
            key: "clearSafetyTimer",
            value: function(e) {
                gm(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null)
            }
        }, {
            key: "enabled",
            get: function() {
                var e = this.config;
                return this.player.isHTML5 && this.player.isVideo && e.enabled && (!Pm(e.publisherId) || Cm(e.tagUrl))
            }
        }, {
            key: "tagUrl",
            get: function() {
                var e = this.config;
                if (Cm(e.tagUrl)) return e.tagUrl;
                var t = {
                    AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                    AV_CHANNELID: "5a0458dc28a06145e4519d21",
                    AV_URL: window.location.hostname,
                    cb: Date.now(),
                    AV_WIDTH: 640,
                    AV_HEIGHT: 480,
                    AV_CDIM2: e.publisherId
                };
                return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(Kg(t))
            }
        }]), e
    }(),
    Av = Ea.findIndex,
    Sv = !0,
    Ev = ms("findIndex");
"findIndex" in [] && Array(1).findIndex((function() {
    Sv = !1
})), Xo({
    target: "Array",
    proto: !0,
    forced: Sv || !Ev
}, {
    findIndex: function(e) {
        return Av(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}), Ps("findIndex");
var Ov = Math.min,
    Cv = [].lastIndexOf,
    Pv = !!Cv && 1 / [1].lastIndexOf(1, -0) < 0,
    Iv = ds("lastIndexOf"),
    Mv = ms("indexOf", {
        ACCESSORS: !0,
        1: 0
    }),
    Lv = Pv || !Iv || !Mv ? function(e) {
        if (Pv) return Cv.apply(this, arguments) || 0;
        var t = Mr(this),
            n = So(t.length),
            i = n - 1;
        for (arguments.length > 1 && (i = Ov(i, xo(arguments[1]))), i < 0 && (i = n + i); i >= 0; i--)
            if (i in t && t[i] === e) return i || 0;
        return -1
    } : Cv;
Xo({
    target: "Array",
    proto: !0,
    forced: Lv !== [].lastIndexOf
}, {
    lastIndexOf: Lv
});
var Rv = function(e, t) {
        var n = {};
        return e > t.width / t.height ? (n.width = t.width, n.height = 1 / e * t.width) : (n.height = t.height, n.width = e * t.height), n
    },
    Nv = function() {
        function e(t) {
            Rd(this, e), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                thumb: {},
                scrubbing: {}
            }, this.load()
        }
        return jd(e, [{
            key: "load",
            value: function() {
                var e = this;
                this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then((function() {
                    e.enabled && (e.render(), e.determineContainerAutoSizing(), e.loaded = !0)
                }))
            }
        }, {
            key: "getThumbnails",
            value: function() {
                var e = this;
                return new Promise((function(t) {
                    var n = e.player.config.previewThumbnails.src;
                    if (Pm(n)) throw new Error("Missing previewThumbnails.src config attribute");
                    var i = function() {
                        e.thumbnails.sort((function(e, t) {
                            return e.height - t.height
                        })), e.player.debug.log("Preview thumbnails", e.thumbnails), t()
                    };
                    if (wm(n)) n((function(t) {
                        e.thumbnails = t, i()
                    }));
                    else {
                        var r = (bm(n) ? [n] : n).map((function(t) {
                            return e.getThumbnail(t)
                        }));
                        Promise.all(r).then(i)
                    }
                }))
            }
        }, {
            key: "getThumbnail",
            value: function(e) {
                var t = this;
                return new Promise((function(n) {
                    Ug(e).then((function(i) {
                        var r, o, a = {
                            frames: (r = i, o = [], r.split(/\r\n\r\n|\n\n|\r\r/).forEach((function(e) {
                                var t = {};
                                e.split(/\r\n|\n|\r/).forEach((function(e) {
                                    if (ym(t.startTime)) {
                                        if (!Pm(e.trim()) && Pm(t.text)) {
                                            var n = e.trim().split("#xywh="),
                                                i = Ud(n, 1);
                                            if (t.text = i[0], n[1]) {
                                                var r = Ud(n[1].split(","), 4);
                                                t.x = r[0], t.y = r[1], t.w = r[2], t.h = r[3]
                                            }
                                        }
                                    } else {
                                        var o = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                                        o && (t.startTime = 60 * Number(o[1] || 0) * 60 + 60 * Number(o[2]) + Number(o[3]) + Number("0.".concat(o[4])), t.endTime = 60 * Number(o[6] || 0) * 60 + 60 * Number(o[7]) + Number(o[8]) + Number("0.".concat(o[9])))
                                    }
                                })), t.text && o.push(t)
                            })), o),
                            height: null,
                            urlPrefix: ""
                        };
                        a.frames[0].text.startsWith("/") || a.frames[0].text.startsWith("http://") || a.frames[0].text.startsWith("https://") || (a.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
                        var s = new Image;
                        s.onload = function() {
                            a.height = s.naturalHeight, a.width = s.naturalWidth, t.thumbnails.push(a), n()
                        }, s.src = a.urlPrefix + a.frames[0].text
                    }))
                }))
            }
        }, {
            key: "startMove",
            value: function(e) {
                if (this.loaded && Am(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
                    if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
                    else {
                        var t = this.player.elements.progress.getBoundingClientRect(),
                            n = 100 / t.width * (e.pageX - t.left);
                        this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Xg(this.seekTime)
                    }
                    this.showImageAtCurrentTime()
                }
            }
        }, {
            key: "endMove",
            value: function() {
                this.toggleThumbContainer(!1, !0)
            }
        }, {
            key: "startScrubbing",
            value: function(e) {
                (gm(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
            }
        }, {
            key: "endScrubbing",
            value: function() {
                var e = this;
                this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : lg.call(this.player, this.player.media, "timeupdate", (function() {
                    e.mouseDown || e.toggleScrubbingContainer(!1)
                }))
            }
        }, {
            key: "listeners",
            value: function() {
                var e = this;
                this.player.on("play", (function() {
                    e.toggleThumbContainer(!1, !0)
                })), this.player.on("seeked", (function() {
                    e.toggleThumbContainer(!1)
                })), this.player.on("timeupdate", (function() {
                    e.lastTime = e.player.media.currentTime
                }))
            }
        }, {
            key: "render",
            value: function() {
                this.elements.thumb.container = qm("div", {
                    class: this.player.config.classNames.previewThumbnails.thumbContainer
                }), this.elements.thumb.imageContainer = qm("div", {
                    class: this.player.config.classNames.previewThumbnails.imageContainer
                }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                var e = qm("div", {
                    class: this.player.config.classNames.previewThumbnails.timeContainer
                });
                this.elements.thumb.time = qm("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), xm(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = qm("div", {
                    class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
            }
        }, {
            key: "destroy",
            value: function() {
                this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
            }
        }, {
            key: "showImageAtCurrentTime",
            value: function() {
                var e = this;
                this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                var t = this.thumbnails[0].frames.findIndex((function(t) {
                        return e.seekTime >= t.startTime && e.seekTime <= t.endTime
                    })),
                    n = t >= 0,
                    i = 0;
                this.mouseDown || this.toggleThumbContainer(n), n && (this.thumbnails.forEach((function(n, r) {
                    e.loadedImages.includes(n.frames[t].text) && (i = r)
                })), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(i)))
            }
        }, {
            key: "loadImage",
            value: function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    n = this.showingThumb,
                    i = this.thumbnails[t],
                    r = i.urlPrefix,
                    o = i.frames[n],
                    a = i.frames[n].text,
                    s = r + a;
                if (this.currentImageElement && this.currentImageElement.dataset.filename === a) this.showImage(this.currentImageElement, o, t, n, a, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement);
                else {
                    this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
                    var l = new Image;
                    l.src = s, l.dataset.index = n, l.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log("Loading image: ".concat(s)), l.onload = function() {
                        return e.showImage(l, o, t, n, a, !0)
                    }, this.loadingImage = l, this.removeOldImages(l)
                }
            }
        }, {
            key: "showImage",
            value: function(e, t, n, i, r) {
                var o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
                this.player.debug.log("Showing thumb: ".concat(r, ". num: ").concat(i, ". qual: ").concat(n, ". newimg: ").concat(o)), this.setImageSizeAndOffset(e, t), o && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(r) || this.loadedImages.push(r)), this.preloadNearby(i, !0).then(this.preloadNearby(i, !1)).then(this.getHigherQuality(n, e, t, r))
            }
        }, {
            key: "removeOldImages",
            value: function(e) {
                var t = this;
                Array.from(this.currentImageContainer.children).forEach((function(n) {
                    if ("img" === n.tagName.toLowerCase()) {
                        var i = t.usingSprites ? 500 : 1e3;
                        if (n.dataset.index !== e.dataset.index && !n.dataset.deleting) {
                            n.dataset.deleting = !0;
                            var r = t.currentImageContainer;
                            setTimeout((function() {
                                r.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename))
                            }), i)
                        }
                    }
                }))
            }
        }, {
            key: "preloadNearby",
            value: function(e) {
                var t = this,
                    n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return new Promise((function(i) {
                    setTimeout((function() {
                        var r = t.thumbnails[0].frames[e].text;
                        if (t.showingThumbFilename === r) {
                            var o;
                            o = n ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse();
                            var a = !1;
                            o.forEach((function(e) {
                                var n = e.text;
                                if (n !== r && !t.loadedImages.includes(n)) {
                                    a = !0, t.player.debug.log("Preloading thumb filename: ".concat(n));
                                    var o = t.thumbnails[0].urlPrefix + n,
                                        s = new Image;
                                    s.src = o, s.onload = function() {
                                        t.player.debug.log("Preloaded thumb filename: ".concat(n)), t.loadedImages.includes(n) || t.loadedImages.push(n), i()
                                    }
                                }
                            })), a || i()
                        }
                    }), 300)
                }))
            }
        }, {
            key: "getHigherQuality",
            value: function(e, t, n, i) {
                var r = this;
                if (e < this.thumbnails.length - 1) {
                    var o = t.naturalHeight;
                    this.usingSprites && (o = n.h), o < this.thumbContainerHeight && setTimeout((function() {
                        r.showingThumbFilename === i && (r.player.debug.log("Showing higher quality thumb for: ".concat(i)), r.loadImage(e + 1))
                    }), 300)
                }
            }
        }, {
            key: "toggleThumbContainer",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
            }
        }, {
            key: "toggleScrubbingContainer",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
            }
        }, {
            key: "determineContainerAutoSizing",
            value: function() {
                (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0)
            }
        }, {
            key: "setThumbContainerSizeAndPos",
            value: function() {
                if (this.sizeSpecifiedInCSS) {
                    if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
                        var e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
                        this.elements.thumb.imageContainer.style.width = "".concat(e, "px")
                    } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
                        var t = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
                        this.elements.thumb.imageContainer.style.height = "".concat(t, "px")
                    }
                } else {
                    var n = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                    this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(n, "px")
                }
                this.setThumbContainerPos()
            }
        }, {
            key: "setThumbContainerPos",
            value: function() {
                var e = this.player.elements.progress.getBoundingClientRect(),
                    t = this.player.elements.container.getBoundingClientRect(),
                    n = this.elements.thumb.container,
                    i = t.left - e.left + 10,
                    r = t.right - e.left - n.clientWidth - 10,
                    o = this.mousePosX - e.left - n.clientWidth / 2;
                o < i && (o = i), o > r && (o = r), n.style.left = "".concat(o, "px")
            }
        }, {
            key: "setScrubbingContainerSize",
            value: function() {
                var e = Rv(this.thumbAspectRatio, {
                        width: this.player.media.clientWidth,
                        height: this.player.media.clientHeight
                    }),
                    t = e.width,
                    n = e.height;
                this.elements.scrubbing.container.style.width = "".concat(t, "px"), this.elements.scrubbing.container.style.height = "".concat(n, "px")
            }
        }, {
            key: "setImageSizeAndOffset",
            value: function(e, t) {
                if (this.usingSprites) {
                    var n = this.thumbContainerHeight / t.h;
                    e.style.height = "".concat(e.naturalHeight * n, "px"), e.style.width = "".concat(e.naturalWidth * n, "px"), e.style.left = "-".concat(t.x * n, "px"), e.style.top = "-".concat(t.y * n, "px")
                }
            }
        }, {
            key: "enabled",
            get: function() {
                return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
            }
        }, {
            key: "currentImageContainer",
            get: function() {
                return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
            }
        }, {
            key: "usingSprites",
            get: function() {
                return Object.keys(this.thumbnails[0].frames[0]).includes("w")
            }
        }, {
            key: "thumbAspectRatio",
            get: function() {
                return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
            }
        }, {
            key: "thumbContainerHeight",
            get: function() {
                return this.mouseDown ? Rv(this.thumbAspectRatio, {
                    width: this.player.media.clientWidth,
                    height: this.player.media.clientHeight
                }).height : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
            }
        }, {
            key: "currentImageElement",
            get: function() {
                return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
            },
            set: function(e) {
                this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
            }
        }]), e
    }(),
    jv = {
        insertElements: function(e, t) {
            var n = this;
            bm(t) ? Bm(e, this.media, {
                src: t
            }) : Tm(t) && t.forEach((function(t) {
                Bm(e, n.media, t)
            }))
        },
        change: function(e) {
            var t = this;
            Dm(e, "sources.length") ? (vg.cancelRequests.call(this), this.destroy.call(this, (function() {
                t.options.quality = [], zm(t.media), t.media = null, xm(t.elements.container) && t.elements.container.removeAttribute("class");
                var n = e.sources,
                    i = e.type,
                    r = Ud(n, 1)[0],
                    o = r.provider,
                    a = void 0 === o ? nv.html5 : o,
                    s = r.src,
                    l = "html5" === a ? i : "div",
                    u = "html5" === a ? {} : {
                        src: s
                    };
                Object.assign(t, {
                    provider: a,
                    type: i,
                    supported: ig.check(i, a, t.config.playsinline),
                    media: qm(l, u)
                }), t.elements.container.appendChild(t.media), _m(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), Pm(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), cv.addStyleHook.call(t), t.isHTML5 && jv.insertElements.call(t, "source", n), t.config.title = e.title, kv.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && jv.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && cv.build.call(t), t.isHTML5 && t.media.load(), Pm(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new Nv(t))), t.fullscreen.update()
            }), !0)) : this.debug.warn("Invalid source format")
        }
    };
var $v, Dv = function() {
    function e(t, n) {
        var i = this;
        if (Rd(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = ig.touch, this.media = t, bm(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || km(this.media) || Tm(this.media)) && (this.media = this.media[0]), this.config = Fm({}, Jg, e.defaults, n || {}, function() {
                try {
                    return JSON.parse(i.media.getAttribute("data-plyr-config"))
                } catch (e) {
                    return {}
                }
            }()), this.elements = {
                container: null,
                fullscreen: null,
                captions: null,
                buttons: {},
                display: {},
                progress: {},
                inputs: {},
                settings: {
                    popup: null,
                    menu: null,
                    panels: {},
                    buttons: {}
                }
            }, this.captions = {
                active: null,
                currentTrack: -1,
                meta: new WeakMap
            }, this.fullscreen = {
                active: !1
            }, this.options = {
                speed: [],
                quality: []
            }, this.debug = new av(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", ig), !gm(this.media) && xm(this.media))
            if (this.media.plyr) this.debug.warn("Target already setup");
            else if (this.config.enabled)
            if (ig.check().api) {
                var r = this.media.cloneNode(!0);
                r.autoplay = !1, this.elements.original = r;
                var o = this.media.tagName.toLowerCase(),
                    a = null,
                    s = null;
                switch (o) {
                    case "div":
                        if (a = this.media.querySelector("iframe"), xm(a)) {
                            if (s = Qg(a.getAttribute("src")), this.provider = function(e) {
                                    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? nv.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? nv.vimeo : null
                                }(s.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", s.search.length) {
                                var l = ["1", "true"];
                                l.includes(s.searchParams.get("autoplay")) && (this.config.autoplay = !0), l.includes(s.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = l.includes(s.searchParams.get("playsinline")), this.config.youtube.hl = s.searchParams.get("hl")) : this.config.playsinline = !0
                            }
                        } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                        if (Pm(this.provider) || !Object.keys(nv).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                        this.type = rv;
                        break;
                    case "video":
                    case "audio":
                        this.type = o, this.provider = nv.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                        break;
                    default:
                        return void this.debug.error("Setup failed: unsupported type")
                }
                this.supported = ig.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new dv(this), this.storage = new Hg(this), this.media.plyr = this, xm(this.elements.container) || (this.elements.container = qm("div", {
                    tabindex: 0
                }), Hm(this.media, this.elements.container)), cv.migrateStyles.call(this), cv.addStyleHook.call(this), kv.setup.call(this), this.config.debug && ag.call(this, this.elements.container, this.config.events.join(" "), (function(e) {
                    i.debug.log("event: ".concat(e.type))
                })), this.fullscreen = new sv(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && cv.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new xv(this)), this.isHTML5 && this.config.autoplay && setTimeout((function() {
                    return hg(i.play())
                }), 10), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Nv(this))) : this.debug.error("Setup failed: no support")
            } else this.debug.error("Setup failed: no support");
        else this.debug.error("Setup failed: disabled by config");
        else this.debug.error("Setup failed: no suitable element passed")
    }
    return jd(e, [{
        key: "play",
        value: function() {
            var e = this;
            return wm(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then((function() {
                return e.ads.play()
            })).catch((function() {
                return hg(e.media.play())
            })), this.media.play()) : null
        }
    }, {
        key: "pause",
        value: function() {
            return this.playing && wm(this.media.pause) ? this.media.pause() : null
        }
    }, {
        key: "togglePlay",
        value: function(e) {
            return (_m(e) ? e : !this.playing) ? this.play() : this.pause()
        }
    }, {
        key: "stop",
        value: function() {
            this.isHTML5 ? (this.pause(), this.restart()) : wm(this.media.stop) && this.media.stop()
        }
    }, {
        key: "restart",
        value: function() {
            this.currentTime = 0
        }
    }, {
        key: "rewind",
        value: function(e) {
            this.currentTime -= ym(e) ? e : this.config.seekTime
        }
    }, {
        key: "forward",
        value: function(e) {
            this.currentTime += ym(e) ? e : this.config.seekTime
        }
    }, {
        key: "increaseVolume",
        value: function(e) {
            var t = this.media.muted ? 0 : this.volume;
            this.volume = t + (ym(e) ? e : 0)
        }
    }, {
        key: "decreaseVolume",
        value: function(e) {
            this.increaseVolume(-e)
        }
    }, {
        key: "toggleCaptions",
        value: function(e) {
            Zg.toggle.call(this, e, !1)
        }
    }, {
        key: "airplay",
        value: function() {
            ig.airplay && this.media.webkitShowPlaybackTargetPicker()
        }
    }, {
        key: "toggleControls",
        value: function(e) {
            if (this.supported.ui && !this.isAudio) {
                var t = Qm(this.elements.container, this.config.classNames.hideControls),
                    n = void 0 === e ? void 0 : !e,
                    i = Ym(this.elements.container, this.config.classNames.hideControls, n);
                if (i && Tm(this.config.controls) && this.config.controls.includes("settings") && !Pm(this.config.settings) && Yg.toggleMenu.call(this, !1), i !== t) {
                    var r = i ? "controlshidden" : "controlsshown";
                    ug.call(this, this.media, r)
                }
                return !i
            }
            return !1
        }
    }, {
        key: "on",
        value: function(e, t) {
            ag.call(this, this.elements.container, e, t)
        }
    }, {
        key: "once",
        value: function(e, t) {
            lg.call(this, this.elements.container, e, t)
        }
    }, {
        key: "off",
        value: function(e, t) {
            sg(this.elements.container, e, t)
        }
    }, {
        key: "destroy",
        value: function(e) {
            var t = this,
                n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (this.ready) {
                var i = function() {
                    document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (zm(t.elements.buttons.play), zm(t.elements.captions), zm(t.elements.controls), zm(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), wm(e) && e()) : (cg.call(t), Wm(t.elements.original, t.elements.container), ug.call(t, t.elements.original, "destroyed", !0), wm(e) && e.call(t.elements.original), t.ready = !1, setTimeout((function() {
                        t.elements = null, t.media = null
                    }), 200))
                };
                this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (cv.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && wm(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
            }
        }
    }, {
        key: "supports",
        value: function(e) {
            return ig.mime.call(this, e)
        }
    }, {
        key: "isHTML5",
        get: function() {
            return this.provider === nv.html5
        }
    }, {
        key: "isEmbed",
        get: function() {
            return this.isYouTube || this.isVimeo
        }
    }, {
        key: "isYouTube",
        get: function() {
            return this.provider === nv.youtube
        }
    }, {
        key: "isVimeo",
        get: function() {
            return this.provider === nv.vimeo
        }
    }, {
        key: "isVideo",
        get: function() {
            return this.type === rv
        }
    }, {
        key: "isAudio",
        get: function() {
            return this.type === iv
        }
    }, {
        key: "playing",
        get: function() {
            return Boolean(this.ready && !this.paused && !this.ended)
        }
    }, {
        key: "paused",
        get: function() {
            return Boolean(this.media.paused)
        }
    }, {
        key: "stopped",
        get: function() {
            return Boolean(this.paused && 0 === this.currentTime)
        }
    }, {
        key: "ended",
        get: function() {
            return Boolean(this.media.ended)
        }
    }, {
        key: "currentTime",
        set: function(e) {
            if (this.duration) {
                var t = ym(e) && e > 0;
                this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"))
            }
        },
        get: function() {
            return Number(this.media.currentTime)
        }
    }, {
        key: "buffered",
        get: function() {
            var e = this.media.buffered;
            return ym(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
        }
    }, {
        key: "seeking",
        get: function() {
            return Boolean(this.media.seeking)
        }
    }, {
        key: "duration",
        get: function() {
            var e = parseFloat(this.config.duration),
                t = (this.media || {}).duration,
                n = ym(t) && t !== 1 / 0 ? t : 0;
            return e || n
        }
    }, {
        key: "volume",
        set: function(e) {
            var t = e;
            bm(t) && (t = Number(t)), ym(t) || (t = this.storage.get("volume")), ym(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !Pm(e) && this.muted && t > 0 && (this.muted = !1)
        },
        get: function() {
            return Number(this.media.volume)
        }
    }, {
        key: "muted",
        set: function(e) {
            var t = e;
            _m(t) || (t = this.storage.get("muted")), _m(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
        },
        get: function() {
            return Boolean(this.media.muted)
        }
    }, {
        key: "hasAudio",
        get: function() {
            return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)))
        }
    }, {
        key: "speed",
        set: function(e) {
            var t = this,
                n = null;
            ym(e) && (n = e), ym(n) || (n = this.storage.get("speed")), ym(n) || (n = this.config.speed.selected);
            var i = this.minimumSpeed,
                r = this.maximumSpeed;
            n = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
                return Math.min(Math.max(e, t), n)
            }(n, i, r), this.config.speed.selected = n, setTimeout((function() {
                t.media.playbackRate = n
            }), 0)
        },
        get: function() {
            return Number(this.media.playbackRate)
        }
    }, {
        key: "minimumSpeed",
        get: function() {
            return this.isYouTube ? Math.min.apply(Math, qd(this.options.speed)) : this.isVimeo ? .5 : .0625
        }
    }, {
        key: "maximumSpeed",
        get: function() {
            return this.isYouTube ? Math.max.apply(Math, qd(this.options.speed)) : this.isVimeo ? 2 : 16
        }
    }, {
        key: "quality",
        set: function(e) {
            var t = this.config.quality,
                n = this.options.quality;
            if (n.length) {
                var i = [!Pm(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(ym),
                    r = !0;
                if (!n.includes(i)) {
                    var o = function(e, t) {
                        return Tm(e) && e.length ? e.reduce((function(e, n) {
                            return Math.abs(n - t) < Math.abs(e - t) ? n : e
                        })) : null
                    }(n, i);
                    this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(o, " instead")), i = o, r = !1
                }
                t.selected = i, this.media.quality = i, r && this.storage.set({
                    quality: i
                })
            }
        },
        get: function() {
            return this.media.quality
        }
    }, {
        key: "loop",
        set: function(e) {
            var t = _m(e) ? e : this.config.loop.active;
            this.config.loop.active = t, this.media.loop = t
        },
        get: function() {
            return Boolean(this.media.loop)
        }
    }, {
        key: "source",
        set: function(e) {
            jv.change.call(this, e)
        },
        get: function() {
            return this.media.currentSrc
        }
    }, {
        key: "download",
        get: function() {
            var e = this.config.urls.download;
            return Cm(e) ? e : this.source
        },
        set: function(e) {
            Cm(e) && (this.config.urls.download = e, Yg.setDownloadUrl.call(this))
        }
    }, {
        key: "poster",
        set: function(e) {
            this.isVideo ? cv.setPoster.call(this, e, !1).catch((function() {})) : this.debug.warn("Poster can only be set for video")
        },
        get: function() {
            return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
        }
    }, {
        key: "ratio",
        get: function() {
            if (!this.isVideo) return null;
            var e = pg(mg.call(this));
            return Tm(e) ? e.join(":") : e
        },
        set: function(e) {
            this.isVideo ? bm(e) && fg(e) ? (this.config.ratio = e, gg.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video")
        }
    }, {
        key: "autoplay",
        set: function(e) {
            var t = _m(e) ? e : this.config.autoplay;
            this.config.autoplay = t
        },
        get: function() {
            return Boolean(this.config.autoplay)
        }
    }, {
        key: "currentTrack",
        set: function(e) {
            Zg.set.call(this, e, !1)
        },
        get: function() {
            var e = this.captions,
                t = e.toggled,
                n = e.currentTrack;
            return t ? n : -1
        }
    }, {
        key: "language",
        set: function(e) {
            Zg.setLanguage.call(this, e, !1)
        },
        get: function() {
            return (Zg.getCurrentTrack.call(this) || {}).language
        }
    }, {
        key: "pip",
        set: function(e) {
            if (ig.pip) {
                var t = _m(e) ? e : !this.pip;
                wm(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? ev : tv), wm(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
            }
        },
        get: function() {
            return ig.pip ? Pm(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === ev : null
        }
    }], [{
        key: "supported",
        value: function(e, t, n) {
            return ig.check(e, t, n)
        }
    }, {
        key: "loadSprite",
        value: function(e, t) {
            return qg(e, t)
        }
    }, {
        key: "setup",
        value: function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = null;
            return bm(t) ? i = Array.from(document.querySelectorAll(t)) : km(t) ? i = Array.from(t) : Tm(t) && (i = t.filter(xm)), Pm(i) ? null : i.map((function(t) {
                return new e(t, n)
            }))
        }
    }]), e
}();
Dv.defaults = ($v = Jg, JSON.parse(JSON.stringify($v)));
var Fv, Hv, Uv, qv, Bv, zv, Vv, Wv, Gv = Dv,
    Xv = n(0),
    Yv = document.getElementById("bgm"),
    Qv = new Xv.Howl({
        src: [Yv.src],
        autoplay: !0,
        loop: !0,
        volume: 1,
        onplay: function() {
            $(".btn-audio").addClass("is-active"), !1
        }
    });

function Kv(e) {
    Qv.fade(Qv.volume(), e, 200)
}

function Zv(e) {
    qi.set($(".video-dimmed", e), {
        y: "100%"
    }), qi.set($(".video", e), {
        alpha: 0
    }), qi.set($(".video .progress .bar", e), {
        width: "0%"
    }), qv = $("video", e)[0];
    var t = $("video", e).hasClass("plyr");
    if (!qv.inited)
        if (t) {
            var n = new Gv(qv, {
                fullscreen: {
                    enabled: !1
                },
                controls: ["play-large", "current-time", "mute", "volume", "progress"]
            });
            qv.player = n, qv.muted = !1, n.on("playing", (function() {
                Kv(0)
            })), n.on("pause", (function() {
                Kv(1)
            })), n.on("playing", (function() {})), n.on("ended", (function() {
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
            }))
        } else qv.addEventListener("ended", (function() {
            window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
        })), qv.addEventListener("playing", (function() {})), qv.addEventListener("pause", (function() {})), qv.currentTime = 0;
    qv.inited = !0, Uv = !1, 0 == t && (qv.muted = !0, $(".btn-mute", e).addClass("muted"));
    var i = qv.src;
    qv.src = "", requestAnimationFrame((function() {
        qv.src = i
    })), qi.set($(".overlay", e), {
        alpha: 0
    })
}

function Jv(e) {
    qi.killTweensOf($(".video-dimmed", e)), qi.killTweensOf($(".video", e)), qi.killTweensOf($(".overlay", e)), qv = $("video", e)[0];
    var t = $("video", e).hasClass("plyr");
    t ? qv.player && (qv.player.pause(), qv.player.rewind(0)) : (qi.killTweensOf(qv), qv.pause()), Uv = !1, 0 == t && (qv.muted = !0, Kv(1), $(".btn-mute", e).addClass("muted"))
}

function ey(e) {
    Bv = e, qv = $("video", e)[0];
    var t = $("video", e).hasClass("plyr"),
        n = new Wt({
            onUpdate: function() {
                ir(n.totalTime() / n.totalDuration())
            }
        });
    n.to($(".video-dimmed", e), {
        alpha: 1,
        y: "0%",
        easing: xn.easeInOut,
        duration: .6
    }, .2), n.to($(".video", e), {
        alpha: 1,
        easing: xn.easeOut,
        duration: 1,
        onStart: function() {
            Uv = !0, t ? (qv.player.rewind(0), qv.player.play()) : qv.play(), requestAnimationFrame(iy)
        }
    }, .2)
}

function ty(e) {
    return !0
}

function ny(e) {
    return !0
}

function iy() {
    var e = qv.currentTime / qv.duration;
    ir(0), Uv && requestAnimationFrame(iy), qi.set($(".video .progress .bar", Bv), {
        width: 100 * e + "%"
    })
}

function ry(e) {
    qi.set($(".static .back", e), { scale: 1 })
    qi.set($(".descriptions p", e), { alpha: 0, y: "20%" })
    qi.set($(".img img", e), { alpha: 0, scale: .5 })
    qi.set($(".rolling-bg .rolling-back", e), { alpha: 0 })
    qi.set($(".rolling-bg .rolling-back.b1", e), { alpha: 1 })
    Vv && (Vv.pause(), Vv.clear(), Vv = null), 
    $(".indices .index:eq(0)", e).addClass("active").siblings().removeClass("active")
    $(".glitch", e).removeClass("active")
}

function oy(e) {
    qi.killTweensOf($(".back", e))
    qi.killTweensOf($(".img img", e))
    qi.killTweensOf($(".descriptions p", e))
}

function ay(e) {
    zv = e;
    var t = new Wt({
        onComplete: uy,
        onUpdate: function() {
            ir(t.totalTime() / t.totalDuration())
        }
    });
    t.to($(".descriptions p", zv), { y: "0%", alpha: 1, duration: 1.4, ease: xn.easeOut, stagger: .2 }, .2)
    t.to($(".img img", zv), { alpha: 1, duration: 1 }, 0)
    qi.to($(".static .back", zv), { scale: 1.3, duration: 20, ease: wn.easeNone })
    qi.to($(".img img", zv), { scale: 1, duration: 2, ease: xn.easeOut })
    $(".rolling-bg .back", zv)[0] && function() {
        var e = $(".rolling-bg .rolling-back", zv).length;
        if (qi.set($(".rolling-bg .rolling-back.b1", zv), { alpha: 1 }), 
            $(".indices .index:eq(0)", zv).addClass("active").siblings().removeClass("active"), 
            Vv = new Wt({
                repeat: e > 1 ? -1 : 0,
                onStart: function() {
                    $(".indices .index:eq(0)", zv).addClass("active").siblings().removeClass("active"), 
                    qi.set($(".rolling-bg .rolling-back.b1", zv), { alpha: 1 })
                },
                onUpdate: function() {
                    switch (Vv.currentLabel()) {
                        case "bgLoop_1":
                            $(".indices .index:eq(0)", zv).addClass("active").siblings().removeClass("active");
                            break;
                        case "bgLoop_2":
                            $(".indices .index:eq(1)", zv).addClass("active").siblings().removeClass("active");
                            break;
                        case "bgLoop_3":
                            $(".indices .index:eq(2)", zv).addClass("active").siblings().removeClass("active")
                    }
                }
            })
            , e > 1)
            for (var t = 1; t <= e; ++t) {
                var n = t,
                    i = t < e ? t + 1 : 1;
                Vv.set($(".rolling-bg .rolling-back.b" + n, zv), { 
                    zIndex: 1,
                    onStart: function() {
                        $(".glitch", zv).addClass("active")
                    }
                }, 2.2 * t - .3 - .3), 

                Vv.set($(".rolling-bg .rolling-back.b" + n, zv), {
                    alpha: 0,
                    duration: .3
                }, 2.2 * t - .3), 

                Vv.addLabel("bgLoop_" + i, 2.2 * t - .3), 
                
                Vv.set($(".rolling-bg .rolling-back.b" + i, zv), { zIndex: 2 }, 2.2 * t - .3), 
                Vv.set($(".rolling-bg .rolling-back.b" + i, zv), { alpha: 1, duration: .3 }, 2.2 * t - .3), 
                Vv.set($(".rolling-bg .rolling-back.b" + i, zv), {
                    alpha: 1,
                    duration: .3,
                    onComplete: function() {
                        $(".glitch", zv).removeClass("active")
                    }
                }, 2.2 * t - .3 + .3)
            }
    }()
}

function sy(e) {
    return !0
}

function ly(e) {
    return !0
}

function uy() {
    zv && "active" == zv.attr("data-status") && (Xy(!1), Ji(), nr(zv), lr())
}

function cy(e) {
    qi.set($(".delorean img", e), { alpha: 0, scale: 0 })
    qi.set($(".overlay", e), { alpha: 0 })
    $("#intro4 .time").each((function(e, t) {
        $(".digit", t).each((function(e, t) {
            t.tick = 0, vy(t)
        }))
    }))
}

function dy(e) {
    qi.killTweensOf($(".delorean img", e))
    qi.killTweensOf($(".overlay", e))
}

function hy(e) { //#intro4 start
    Wv = e;
    var t = new Wt({
        onComplete: wy,
        onUpdate: function() {
            ir(t.totalTime() / t.totalDuration())
        }
    });
    $("#intro4 .time").each((function(e, n) {
        $(".digit", n).each((function(n, i) {
            i.tick = 0
            t.to(i, {
                alpha: 1,
                duration: 1.6 + .8 * e,
                onUpdate: vy,
                onUpdateParams: [i],
                onComplete: yy,
                onCompleteParams: [i]
            }, 0)
        }))
    }))
    t.to("#intro4 .times", { alpha: 1, duration: .3 })
}
void 0 !== document.hidden ? (Fv = "hidden", Hv = "visibilitychange") : void 0 !== document.msHidden ? (Fv = "msHidden", Hv = "msvisibilitychange") : void 0 !== document.webkitHidden && (Fv = "webkitHidden", Hv = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document[Fv] || document.addEventListener(Hv, (function(e) {
    document[Fv] ? Xv.Howler.mute(!0) : Xv.Howler.mute(!1)
}), !1)
$("#intro4 .digit").each((function(e, t) {
    var n = t.innerHTML.toString();
    t.setAttribute("data-val", n)
}));
var fy, py, my, gy = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function vy(e) {
    if (e.tick % 2 == 0) {
        for (var t = e.getAttribute("data-val"), n = e.getAttribute("data-type"), i = t.length, r = "", o = 0; o < i; ++o) r += "num" == n ? Math.floor(10 * Math.random()) + "" : gy.charAt(Math.floor(gy.length * Math.random())) + "";
        e.innerHTML = r
    }
    e.tick++
}

function yy(e) {
    var t = e.getAttribute("data-val");
    e.innerHTML = t
}

function by(e) {
    return !0
}

function _y(e) {
    return !0
}

function wy() {
    Wv && "active" == Wv.attr("data-status") && (Xy(!1), Ji(), nr(Wv), lr(), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")))
}

function Ty(e) {
    qi.set($(".product-detail", e), { autoAlpha: 0 })
    qi.set($(".zooming-bg", e), { scale: 1 })
    qi.set($(".fadein-bg", e), { alpha: 0 })
    qi.set($(".title path", e), { fill: "#dd0004" })
    qi.set($(".desc > *", e), { alpha: 0, y: "20%" })
    qi.set($(".rolling-bg .rolling-back", e), { autoAlpha: 0 })
    qi.set($(".rolling-bg .rolling-back.b1", e), { autoAlpha: 1 })
    qi.set($(".zooming-img img", e), { alpha: 0, scale: .25 })
    qi.set($(".moving-img img", e), { alpha: 0, x: "20%" })
    my && (my.pause(), my.clear(), my = null)
    $(".indices .index:eq(0)", e).addClass("active").siblings().removeClass("active")
    $(".glitch", e).removeClass("active")
}

function ky(e) {
    qi.killTweensOf($(".back", e))
    qi.killTweensOf($(".product-detail", e))
    qi.killTweensOf($(".title", e))
    qi.killTweensOf($(".title path", e))
    qi.killTweensOf($(".desc > *", e))
    qi.killTweensOf($(".zooming-img img", e))
    qi.killTweensOf($(".moving-img img", e))
}

function xy(e) {
    fy = e
    py = 1
    Xy(!0)
    Zi()
    Sy(!0)
    qi.to($(".zooming-bg", fy), { scale: 1.3, duration: 24, ease: wn.easeNone })
    qi.fromTo($(".zooming-img img", fy), { alpha: 0, scale: .25 }, { alpha: 1, scale: 1, duration: 1.4, ease: xn.easeOut })
}

function Ay() {
    switch (py) {
        case 1:
            Sy();
            break;
        case 2:
            ! function() {
                var e = new Wt({
                        onComplete: Oy,
                        onUpdate: function() {
                            ir(e.totalTime() / e.totalDuration())
                        },
                        onCompleteParams: [2]
                    }),
                    t = $(".detail2", fy);
                $(".title path", t)[0] && (
                    e.to($(".title path", t), { fill: "#eb6c06", duration: .3 }, .6)
                    e.to($(".title path", t), { fill: "#ffeb0a", duration: .5 }, .9)
                    e.to($(".title path", t), { fill: "#fff", duration: .7 }, 1.1)
                );
                e.to($(".detail1", fy), { autoAlpha: 0, duration: .5 }, 0)
                e.to($(".detail2", fy), { autoAlpha: 1, duration: .5,
                    onComplete: function() {
                        $(".rolling-bg", t)[0] && Ey(t), Xy(!1), Ji()
                    }
                }, 0)
                $(".fadein-bg", t)[0] && e.to($(".fadein-bg", t), {
                    alpha: 1, duration: .8,
                    onComplete: function() {
                        $(".fadein-bg .glitch", t).addClass("active"), setTimeout((function() {
                            $(".fadein-bg .glitch", t).removeClass("active")
                        }), 400)
                    }
                }, 0);

                $(".desc", t)[0] && e.to($(".desc > *", t), { alpha: 1, y: "0%", duration: 1, ease: xn.easeOut, stagger: .2 }, .6);
                $(".moving-img", t)[0] && e.to($(".moving-img img", t), { x: "0%", y: "0%", alpha: 1, duration: 1, ease: xn.easeOut }, .4)
            }()
    }
}

function Sy(e) {
    var t = new Wt({
            onComplete: Oy,
            onUpdate: function() {
                ir(t.totalTime() / t.totalDuration())
            },
            onCompleteParams: [1]
        }),
        n = $(".detail1", fy);
    $(".title path", n)[0] && (t.to($(".title path", n), {
        fill: "#eb6c06",
        duration: .3
    }, .2), t.to($(".title path", n), {
        fill: "#ffeb0a",
        duration: .5
    }, .7), t.to($(".title path", n), {
        fill: "#fff",
        duration: .7
    }, .9)), t.to($(".detail1", fy), {
        autoAlpha: 1,
        duration: .5,
        onComplete: function() {
            Xy(!1), Ji(), $(".rolling-bg", n)[0] && Ey(n)
        }
    }, 0), $(".fadein-bg", n)[0] && t.to($(".fadein-bg", n), {
        alpha: 1,
        duration: .8,
        onComplete: function() {
            $(".fadein-bg .glitch", n).addClass("active"), setTimeout((function() {
                $(".fadein-bg .glitch", n).removeClass("active")
            }), 400)
        }
    }, .25), $(".desc", n)[0] && t.to($(".desc > *", n), {
        alpha: 1,
        y: "0%",
        duration: 1,
        ease: xn.easeOut,
        stagger: .2
    }, .6)
}

function Ey(e) {
    my && (my.pause(), my.clear(), my = null);
    var t = $(".rolling-bg .rolling-back", e).length;
    if (qi.set($(".rolling-bg .rolling-back.b1", e), {
            alpha: 1
        }), 
        
        $(".indices .index:eq(0)", e).addClass("active").siblings().removeClass("active"), 
        
        my = new Wt({
            repeat: t > 1 ? -1 : 0,
            onStart: function() {
                $(".indices .index:eq(0)", e).addClass("active").siblings().removeClass("active") 
                qi.set($(".rolling-bg .rolling-back.b1", e), { alpha: 1 })
            },
            onUpdate: function() {
                switch (my.currentLabel()) {
                    case "bgLoop_1":
                        $(".indices .index:eq(0)", e).addClass("active").siblings().removeClass("active");
                        break;
                    case "bgLoop_2":
                        $(".indices .index:eq(1)", e).addClass("active").siblings().removeClass("active");
                        break;
                    case "bgLoop_3":
                        $(".indices .index:eq(2)", e).addClass("active").siblings().removeClass("active")
                }
            }
        }), t > 1)
        for (var n = 1; n <= t; ++n) {
            var i = n,
                r = n < t ? n + 1 : 1;
            my.set($(".rolling-bg .rolling-back.b" + i, e), {
                zIndex: 1,
                onStart: function() {
                    $(".glitch", e).addClass("active")
                } 
            }, 2.2 * n - .3 - .3)
            my.set($(".rolling-bg .rolling-back.b" + i, e), { autoAlpha: 0, duration: .3 }, 2.2 * n - .3) 
            
            my.addLabel("bgLoop_" + r, 2.2 * n - .3)
            
            my.set($(".rolling-bg .rolling-back.b" + r, e), { zIndex: 2 }, 2.2 * n - .3), 
            my.set($(".rolling-bg .rolling-back.b" + r, e), { autoAlpha: 1, duration: .3 }, 2.2 * n - .3) 
            my.set($(".rolling-bg .rolling-back.b" + r, e), { autoAlpha: 1, duration: .3,
                onComplete: function() {
                    $(".glitch", e).removeClass("active")
                }
            }, 2.2 * n - .3 + .3)
        }
}

function Oy(e) {
    fy && "active" == fy.attr("data-status") && e == py && (Xy(!1), Ji(), fy && "active" == fy.attr("data-status") && (nr(fy), lr()))
}

function Cy(e) {
    return !0
}

function Py(e) {
    return 2 == py
}

function Iy(e) {  // #ending
    qi.set("#ending .dimmed", {
        alpha: 0
    }), qi.set("#ending .bg-logo", {
        alpha: 0,
        scale: 1.1
    })
}

function My(e) { // #ending
    qi.killTweensOf("#ending .back")
}

function Ly(e) {
    var t = new Wt({  // #ending
        onUpdate: function() {
            ir(t.totalTime() / t.totalDuration())
        }
    });
    t.to("#ending .dimmed", {
        alpha: 1,
        duration: .75
    }, .4), t.to("#ending .bg-logo", {
        alpha: 1,
        scale: 1,
        duration: .75
    }, .8)
}

function Ry(e) {
    return !0
}

function Ny(e) {
    return !0
}
window.addEventListener("SHOWCASE_GO_NEXT", (function() {
    fy && "active" == fy.attr("data-status") && py < 2 && (Xy(!0), Zi(), py++, Ay())
}));
var jy = 1;

function $y(e) {  // #event 
    qi.set("#event .event1", {
        alpha: 0,
        left: "50%"
    }), qi.set("#event .event2", {
        alpha: 0,
        left: "200%"
    }), qi.set("#event .indices", {
        alpha: 0
    }), qi.set("#event .btn", {
        alpha: 0
    }), $("#event .indices .index:first-child").addClass("active").siblings().removeClass("active")
}

function Dy(e) {  // #event 
    qi.killTweensOf("#event .event"), qi.killTweensOf("#event .btn")
}

function Fy(e) {  // #event 
    jy = 1, Xy(!0), Zi(), Uy(!0), qi.fromTo("#event .btn", {
        alpha: 0
    }, {
        alpha: 1,
        yoyo: !0,
        duration: .5,
        repeatDelay: .5,
        repeat: -1
    })
}

function Hy() {  // #event 
    switch (jy) {
        case 1:
            Uy();
            break;
        case 2:
            (e = new Wt({
                onComplete: qy,
                onUpdate: function() {
                    ir(e.totalTime() / e.totalDuration())
                },
                onCompleteParams: [2]
            })).to("#event .event1", {
                left: "-200%",
                alpha: 1,
                duration: 1.2,
                ease: xn.easeInOut
            }, 0), e.to("#event .event2", {
                left: "50%",
                alpha: 1,
                duration: 1.2,
                ease: xn.easeInOut
            }, 0), e.to("#event .indices", {
                alpha: 1,
                duration: .8
            }, .4), $("#event .indices .index:eq(1)").addClass("active").siblings().removeClass("active")
    }
    var e
}

function Uy(e) {   // #event 
    var t = new Wt({
        onComplete: qy,
        onUpdate: function() {
            ir(t.totalTime() / t.totalDuration())
        },
        onCompleteParams: [1]
    });
    t.to("#event .event1", {
        left: "50%",
        alpha: 1,
        duration: 1.2,
        ease: xn.easeInOut
    }, 0), t.to("#event .event2", {
        left: "200%",
        alpha: 1,
        duration: 1.2,
        ease: xn.easeInOut
    }, 0), t.to("#event .indices", {
        alpha: 1,
        duration: .8
    }, .4), $("#event .indices .index:eq(0)").addClass("active").siblings().removeClass("active")
}

function qy(e) {
    "active" == $("#app #event").attr("data-status") && e == jy && (Xy(!1), Ji(), nr($(".page#event")))
}

function By(e) {
    return 1 == jy
}

function zy(e) {
    return 2 == jy
}
window.addEventListener("SHOWCASE_GO_NEXT", (function() {
    "active" == $("#app #event").attr("data-status") && jy < 2 && (Xy(!0), Zi(), jy++, Hy())
})), window.addEventListener("SHOWCASE_GO_PREV", (function() {
    "active" == $("#app #event").attr("data-status") && jy > 1 && (Xy(!0), Zi(), jy--, Hy())
})), qi.registerPlugin($i), qi.registerPlugin(Gi);
var Vy = $(".app .pages"),
    Wy = !0,
    Gy = .8;

function Xy(e) {
    Wy = e
}

function Yy() {
    var e = $("#app .page#cover");
    qi.set(e, {
        y: 0
    }), e.attr("data-status", "active"), requestAnimationFrame((function() {
        Qy(e).reset(e), Ky(e)
    }))
}

function Qy(e) {
    switch (e.attr("id")) {
        case "cover":
            return i;
        case "intro1":
        case "intro2":
        case "intro3":
            return o;
        case "intro4":
            return a;
        case "film":
            return r;
        case "product1":
        case "product2":
        case "product3":
        case "product4":
        case "product5":
        case "product6":
        case "product7":
        case "product8":
        case "product9":
        case "product10":
        case "product11":
        case "product12":
            return s;
        case "event":
            return u;
        case "ending":
            return l
    }
}

function Ky(e, t) {
    Ji(), Wy = !1, tb(e), e.attr("data-status", "active"), e.prev().attr("data-status", "sibling").prevAll().attr("data-status", "prev"), e.next().attr("data-status", "sibling").nextAll().attr("data-status", "next"), Qy(e).start(e, t), $(window).trigger("resize")
}

function Zy() {
    if (!Wy) {
        var e = $('#app .page[data-status="active"]');
        if (Qy(e).first()) {
            var t = e.prev();
            t[0] && eb(t, "prev")
        }
    }
}

function Jy() {
    if (!Wy) {
        var e = $('#app .page[data-status="active"]');
        if (Qy(e).final()) {
            var t = e.next();
            t[0] && eb(t, "next")
        }
    }
}

function eb(e, t, n) {
    if (!Wy) {
        var i = $('.page[data-status="active"]');
        i[0] != e[0] && (Zi(), Wy = !0, Gy = .8, i[0] && Qy(i).stop(i), e.attr("data-status", "active"), t || (t = i.index() < e.index() ? "next" : "prev"), $("#app").attr("data-dir", t), Qy(e).stop(e, n), Qy(e).reset(e, n), tb(e), qi.globalTimeline.clear(), requestAnimationFrame((function() {
            var r = "next" == t ? e.attr("data-move-dir") : i.attr("data-move-dir");
            i.removeAttr("style"), e.removeAttr("style"), qi.set(i, {
                zIndex: 4
            }), qi.set(e, {
                zIndex: 5
            });
            var o = new Wt({
                onComplete: function() {
                    e.prev().attr("data-status", "sibling").prev().attr("data-status", "sibling-sibling").prevAll().attr("data-status", "prev"), e.next().attr("data-status", "sibling").next().attr("data-status", "sibling-sibling").nextAll().attr("data-status", "next"), Wy = !1, Ky(e, n), qi.set(".page", {
                        zIndex: 1
                    }), qi.set(e, {
                        zIndex: 2
                    })
                }
            });
            r = r || "vertical", "intro4" == i.attr("id") && "film" == e.attr("id") ? function(e, t, n, i) {
                qi.set(i, {
                    zIndex: 4
                }), qi.set(n, {
                    zIndex: 5
                }), e.fromTo("#intro4 .delorean img", {
                    alpha: 0
                }, {
                    alpha: 1,
                    duration: .5,
                    ease: kn.easeIn
                }, 0), e.fromTo("#intro4 .delorean img", {
                    scale: .5
                }, {
                    scale: 7,
                    duration: 1,
                    ease: kn.easeIn
                }, 0), e.fromTo("#intro4 .delorean img", {
                    webkitFilter: "blur(0em)"
                }, {
                    webkitFilter: "blur(1em)",
                    duration: .25
                }, .8), e.to("#intro4 .overlay", {
                    alpha: 1,
                    duration: .1
                }, .9), e.fromTo("#film .overlay", {
                    alpha: 1
                }, {
                    alpha: 0,
                    duration: 1,
                    onStart: function() {
                        qi.set(i, {
                            zIndex: 5,
                            y: "0%"
                        }), qi.set(n, {
                            zIndex: 4,
                            y: "-100%"
                        }), qi.set($(".page-inner", n), {
                            x: 0,
                            y: "100%"
                        }), qi.set($(".page-inner", i), {
                            x: 0,
                            y: 0
                        })
                    }
                }, 1.3)
            }(o, 0, i, e) : "horizontal" == r ? function(e, t, n, i) {
                "next" == t ? (e.fromTo(n, {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: "-100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(i, {
                    y: 0,
                    x: "100%"
                }, {
                    y: 0,
                    x: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: "30%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    y: 0,
                    x: "0%"
                }, {
                    y: 0,
                    x: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0)) : (e.fromTo(i, {
                    y: 0,
                    x: "-100%"
                }, {
                    y: 0,
                    x: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(n, {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: "100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    y: 0,
                    x: "30%"
                }, {
                    y: 0,
                    x: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: "0%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0))
            }(o, t, i, e) : "fade" == r ? function(e, t, n, i) {
                "next" == t ? (e.fromTo(n, {
                    y: 0,
                    x: 0,
                    alpha: 1
                }, {
                    y: 0,
                    x: 0,
                    alpha: 1,
                    zIndex: 2,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(i, {
                    y: 0,
                    x: 0,
                    alpha: 0
                }, {
                    y: 0,
                    x: 0,
                    alpha: 1,
                    zIndex: 3,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: 0,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    y: 0,
                    x: "0%"
                }, {
                    y: 0,
                    x: 0,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0)) : (e.fromTo(i, {
                    y: 0,
                    x: 0,
                    alpha: 0
                }, {
                    y: 0,
                    x: 0,
                    alpha: 1,
                    zIndex: 3,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(n, {
                    y: 0,
                    x: 0,
                    alpha: 1
                }, {
                    y: 0,
                    x: 0,
                    alpha: 1,
                    zIndex: 2,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: 0,
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    y: 0,
                    x: 0
                }, {
                    y: 0,
                    x: "0%",
                    duration: .6 * Gy,
                    ease: kn.easeInOut
                }, 0))
            }(o, t, i, e) : function(e, t, n, i) {
                var r = "next" == t ? i.attr("data-move-type") : n.attr("data-move-type");
                "next" == t ? (e.fromTo(n, {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "-100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(i, {
                    x: 0,
                    y: "100%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), "linear" == r ? (e.set($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, 0), e.set($(".page-inner", i), {
                    x: 0,
                    y: 0
                }, 0)) : "collapse" == r ? (e.fromTo($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    x: 0,
                    y: "-100%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0)) : (e.fromTo($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "75%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", i), {
                    x: 0,
                    y: "-75%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0))) : (e.fromTo(i, {
                    x: 0,
                    y: "-100%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo(n, {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), "linear" == r ? (e.set($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, 0), e.set($(".page-inner", i), {
                    x: 0,
                    y: 0
                }, 0)) : "collapse" == r ? (e.fromTo($(".page-inner", i), {
                    x: 0,
                    y: "100%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "-100%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0)) : (e.fromTo($(".page-inner", i), {
                    x: 0,
                    y: "75%"
                }, {
                    x: 0,
                    y: 0,
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0), e.fromTo($(".page-inner", n), {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: "-75%",
                    duration: Gy,
                    ease: kn.easeInOut
                }, 0)))
            }(o, t, i, e), rr()
        })))
    }
}

function tb(e) {
    $(".back", e).each((function() {
        var e = $(this).attr("data-bg");
        e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
    })), $(".back", e.prev()).each((function() {
        var e = $(this).attr("data-bg");
        e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
    })), $(".back", e.next()).each((function() {
        var e = $(this).attr("data-bg");
        e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
    })), $("img", e).each((function() {
        var e = $(this).attr("data-src");
        e && "" != e && $(this).attr("src", e)
    })), $("img", e.prev()).each((function() {
        var e = $(this).attr("data-src");
        e && "" != e && $(this).attr("src", e)
    })), $("img", e.next()).each((function() {
        var e = $(this).attr("data-src");
        e && "" != e && $(this).attr("src", e)
    }))
}

function nb(e) {
    var t = e.detail,
        n = $(".page" + t);
    n[0] && requestAnimationFrame((function() {
        eb(n, "next", !0)
    }))
}
cr($(".page#cover"));
var ib = null;

function rb(e) {
    clearTimeout(ib), ib = null, $(".msg-next").removeClass("active"), ib = setTimeout((function() {
        $(".msg-next").addClass("active")
    }), 100)
}
var ob = false;
$(window).on("click touchstart", (function(e) {
    ob || ($("video").each((function(e, t) {
        t.play()
        t.pause()
    })), ob = true)
}));
var ab = $("#appLoading"),
    sb = "#debug" == window.location.hash ? .1 : 2,
    lb = "#debug" == window.location.hash ? 10 : 400,
    ub = "#debug" == window.location.hash ? 10 : 2500;

function cb() { // 코치 애니
    setTimeout((function() {
        $("#appLoading .coach-guide").addClass("active") 
        qi.set("#appLoading .logo", { alpha: 0 }) 
        qi.set("#appLoading .lines .line", { scaleX: 0 })
        setTimeout((function() {
            $(window).trigger("resize")
            qi.to("#appLoading .guide", { autoAlpha: 0, duration: .5 })
            qi.to("#appLoading .loading-area", { autoAlpha: 1, duration: .5, onComplete: db })
        }), ub)
        $(window).trigger("resize")
    }), lb)
}

function db() { // 로고 애니
    qi.to("#appLoading .line", {
        scaleX: 1,
        duration: sb,
        ease: xn.easeInOut,
        stagger: .1
    }), qi.to("#appLoading .logo", {
        alpha: 1,
        duration: .2,
        delay: sb
    }), qi.to("#appLoading .line", {
        scaleX: 0,
        duration: sb,
        ease: xn.easeInOut,
        stagger: -.1,
        delay: sb + .2,
        onComplete: hb
    })
}

function hb() {
    $("#app").addClass("loading-ended"), 
    window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE")), 
    $("#app").hasClass("loading-ended") && qi.to($("#appLoading"), {
        autoAlpha: 0,
        duration: .5,
        delay: 0
    })
}
window.addEventListener("load", (function() {
    $("#app").addClass("loaded")
})), window.addEventListener("DOMContentLoaded", (function() {
    cb(), $(window).trigger("resize")
})), Zi(),
function() {
    function e() {
        var e = window.innerHeight,
            t = $(".container .visual-block").height(),
            n = .01 * (window.innerWidth, t);
        document.documentElement.style.setProperty("--vh", "".concat(n, "px"));
        var i = .01 * e;
        document.documentElement.style.setProperty("--fullvh", "".concat(i, "px"));
        var r = $(".container .visual-block .pages").width();
        document.documentElement.style.setProperty("--fullwidth", "".concat(r, "px"))
    }
    Ki.addEventListener("mousewheel", (function(e) {
        if (Qi || "autoplaying" == $("#app").attr("data-status")) return !1;
        e.preventDefault();
        var t = e.deltaY,
            n = e.deltaX;
        return Math.abs(n) > 4 && n > 0 || Math.abs(t) > 4 && t > 0 ? window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")) : (Math.abs(n) > 4 && n < 0 || Math.abs(t) > 4 && t < 0) && window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV")), !1
    })), Yi()(Ki), Ki.addEventListener("swipe", (function(e) {
        if (Qi || "autoplaying" == $("#app").attr("data-status")) return !1;
        var t = e.detail.directions;
        t.left || t.top ? window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")) : (t.right || t.bottom) && window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })), document.getElementById("btnLayerNext").addEventListener("click", (function(e) {
        if (Qi || "autoplaying" == $("#app").attr("data-status")) return !1;
        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
    })), document.getElementById("btnLayerPrev").addEventListener("click", (function(e) {
        if (Qi || "autoplaying" == $("#app").attr("data-status")) return !1;
        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })), $(window).on("resize", (function() {
        requestAnimationFrame(e), setTimeout((function() {
            e()
        }), 100)
    })), $(window).on("orientationchange", (function() {
        requestAnimationFrame(e);
        var t = window.orientation;
        90 == t || -90 == t ? requestAnimationFrame((function() {
            $(".only-portrait").addClass("active")
        })) : requestAnimationFrame((function() {
            $(".only-portrait").removeClass("active")
        }))
    })), $(window).on("keydown", (function(e) {
        if (Qi) return !1;
        37 != e.keyCode && 38 != e.keyCode || (Qi = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))), 39 != e.keyCode && 40 != e.keyCode || (Qi = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")))
    })), requestAnimationFrame(e)
}(), qi.set("#app .page", {
    y: "100%"
}), $(".page", Vy).attr("data-status", "next"), window.addEventListener("SHOWCASE_LOADING_COMPLETE", Yy), window.addEventListener("SHOWCASE_GO_PREV", Zy), window.addEventListener("SHOWCASE_GO_NEXT", Jy), window.addEventListener("SHOWCASE_GO_PAGE", nb), window.addEventListener("SHOW_MSG_NEXT", rb), $(".btn-audio").on("click", (function(e) {
    $(this).hasClass("is-active") ? (Qv.mute(!1), !1) : (Qv.mute(!0), !0)
})), $(".btn-visual-autoplay").on("click", (function(e) {
    $(this).hasClass("is-active") ? (sr = !0, $("#app").attr("data-status", "autoplaying"), $("#btnLayerNext, #btnLayerPrev").addClass("disabled"), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))) : (sr = !1, $("#app").attr("data-status", ""), $("#btnLayerNext, #btnLayerPrev").removeClass("disabled"), or && (clearTimeout(or), or = null))
}))
}]);