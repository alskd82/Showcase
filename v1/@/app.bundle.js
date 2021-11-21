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
         *  howler.js v2.2.0
         *  howlerjs.com
         *
         *  (c) 2013-2020, James Simpson of GoldFire Studios
         *  goldfirestudios.com
         *
         *  MIT License
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
                        ogg: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                        aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(t.canPlayType("audio/x-m4b;") || t.canPlayType("audio/m4b;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        webm: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                        dolby: !!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
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
                            var u = e.ctx.createBufferSource();
                            u.buffer = e._scratchBuffer, u.connect(e.ctx.destination), void 0 === u.start ? u.noteOn(0) : u.start(0), "function" == typeof e.ctx.resume && e.ctx.resume(), u.onended = function() {
                                u.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", t, !0), document.removeEventListener("touchend", t, !0), document.removeEventListener("click", t, !0);
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
                        if (e) return this._src = e, this._state = "loading", "https:" === window.location.protocol && "http:" === e.slice(0, 5) && (this._html5 = !0, this._webAudio = !1), new s(this), this._webAudio && l(this), this;
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
                        var u = s._id;
                        return n._queue.push({
                            event: "play",
                            action: function() {
                                n.play(u)
                            }
                        }), u
                    }
                    if (i && !s._paused) return t || n._loadQueue("play"), s._id;
                    n._webAudio && o._autoResume();
                    var l = Math.max(0, s._seek > 0 ? s._seek : n._sprite[e][0] / 1e3),
                        c = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - l),
                        d = 1e3 * c / Math.abs(s._rate),
                        h = n._sprite[e][0] / 1e3,
                        f = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
                    s._sprite = e, s._ended = !1;
                    var p = function() {
                        s._paused = !1, s._seek = l, s._start = h, s._stop = f, s._loop = !(!s._loop && !n._sprite[e][2])
                    };
                    if (!(l >= f)) {
                        var m = s._node;
                        if (n._webAudio) {
                            var g = function() {
                                n._playLock = !1, p(), n._refreshBuffer(s);
                                var e = s._muted || n._muted ? 0 : s._volume;
                                m.gain.setValueAtTime(e, o.ctx.currentTime), s._playStart = o.ctx.currentTime, void 0 === m.bufferSource.start ? s._loop ? m.bufferSource.noteGrainOn(0, l, 86400) : m.bufferSource.noteGrainOn(0, l, c) : s._loop ? m.bufferSource.start(0, l, 86400) : m.bufferSource.start(0, l, c), d !== 1 / 0 && (n._endTimers[s._id] = setTimeout(n._ended.bind(n, s), d)), t || setTimeout((function() {
                                    n._emit("play", s._id), n._loadQueue()
                                }), 0)
                            };
                            "running" === o.state && "interrupted" !== o.ctx.state ? g() : (n._playLock = !0, n.once("resume", g), n._clearTimer(s._id))
                        } else {
                            var v = function() {
                                m.currentTime = l, m.muted = s._muted || n._muted || o._muted || m.muted, m.volume = s._volume * o.volume(), m.playbackRate = s._rate;
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
                    for (var u = 0; u < t.length; u++)(n = i._soundById(t[u])) && (n._volume = e, r[2] || i._stopFade(t[u]), i._webAudio && n._node && !n._muted ? n._node.gain.setValueAtTime(e, o.ctx.currentTime) : n._node && !n._muted && (n._node.volume = e * o.volume()), i._emit("volume", n._id));
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
                        var u = r._soundById(a[s]);
                        if (u) {
                            if (i || r._stopFade(a[s]), r._webAudio && !u._muted) {
                                var l = o.ctx.currentTime,
                                    c = l + n / 1e3;
                                u._volume = e, u._node.gain.setValueAtTime(e, l), u._node.gain.linearRampToValueAtTime(t, c)
                            }
                            r._startFadeInterval(u, e, t, n, a[s], void 0 === i)
                        }
                    }
                    return r
                },
                _startFadeInterval: function(e, t, n, i, r, o) {
                    var a = this,
                        s = t,
                        u = n - t,
                        l = Math.abs(u / .01),
                        c = Math.max(4, l > 0 ? i / l : i),
                        d = Date.now();
                    e._fadeTo = n, e._interval = setInterval((function() {
                        var r = (Date.now() - d) / i;
                        d = Date.now(), s += u * r, s = u < 0 ? Math.max(n, s) : Math.min(n, s), s = Math.round(100 * s) / 100, a._webAudio ? e._volume = s : a.volume(s, e._id, !0), o && (a._volume = s), (n < t && s <= n || n > t && s >= n) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, a.volume(n, e._id), a._emit("fade", e._id))
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
                    for (var u = 0; u < t.length; u++)
                        if (n = i._soundById(t[u])) {
                            i.playing(t[u]) && (n._rateSeek = i.seek(t[u]), n._playStart = i._webAudio ? o.ctx.currentTime : n._playStart), n._rate = e, i._webAudio && n._node && n._node.bufferSource ? n._node.bufferSource.playbackRate.setValueAtTime(e, o.ctx.currentTime) : n._node && (n._node.playbackRate = e);
                            var l = i.seek(t[u]),
                                c = (i._sprite[n._sprite][0] + i._sprite[n._sprite][1]) / 1e3 - l,
                                d = 1e3 * c / Math.abs(n._rate);
                            !i._endTimers[t[u]] && n._paused || (i._clearTimer(t[u]), i._endTimers[t[u]] = setTimeout(i._ended.bind(i, n), d)), i._emit("rate", n._id)
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
                                var u = n.playing(t) ? o.ctx.currentTime - s._playStart : 0,
                                    l = s._rateSeek ? s._rateSeek - s._seek : 0;
                                return s._seek + (l + u * Math.abs(s._rate))
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
                        } return u && r && delete u[e._src], o.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null
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
                    return e._node.bufferSource = o.ctx.createBufferSource(), e._node.bufferSource.buffer = u[this._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, o.ctx.currentTime), this
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
            var u = {},
                l = function(e) {
                    var t = e._src;
                    if (u[t]) return e._duration = u[t].duration, void h(e);
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
                            e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete u[t], e.load())
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
                            e && t._sounds.length > 0 ? (u[t._src] = e, h(t, e)) : n()
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
                    var u = o._soundById(a[s]);
                    if (u) {
                        if ("number" != typeof e) return u._pos;
                        u._pos = [e, n, i], u._node && (u._panner && !u._panner.pan || t(u, "spatial"), void 0 !== u._panner.positionX ? (u._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(n, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : u._panner.setPosition(e, n, i)), o._emit("pos", u._id)
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
                    var u = o._soundById(a[s]);
                    if (u) {
                        if ("number" != typeof e) return u._orientation;
                        u._orientation = [e, n, i], u._node && (u._panner || (u._pos || (u._pos = o._pos || [0, 0, -.5]), t(u, "spatial")), void 0 !== u._panner.orientationX ? (u._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), u._panner.orientationY.setValueAtTime(n, Howler.ctx.currentTime), u._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : u._panner.setOrientation(e, n, i)), o._emit("orientation", u._id)
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
                for (var s = o._getSoundIds(n), u = 0; u < s.length; u++)
                    if (i = o._soundById(s[u])) {
                        var l = i._pannerAttr;
                        l = {
                            coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : l.coneInnerAngle,
                            coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : l.coneOuterAngle,
                            coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : l.coneOuterGain,
                            distanceModel: void 0 !== e.distanceModel ? e.distanceModel : l.distanceModel,
                            maxDistance: void 0 !== e.maxDistance ? e.maxDistance : l.maxDistance,
                            refDistance: void 0 !== e.refDistance ? e.refDistance : l.refDistance,
                            rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : l.rolloffFactor,
                            panningModel: void 0 !== e.panningModel ? e.panningModel : l.panningModel
                        };
                        var c = i._panner;
                        c ? (c.coneInnerAngle = l.coneInnerAngle, c.coneOuterAngle = l.coneOuterAngle, c.coneOuterGain = l.coneOuterGain, c.distanceModel = l.distanceModel, c.maxDistance = l.maxDistance, c.refDistance = l.refDistance, c.rolloffFactor = l.rolloffFactor, c.panningModel = l.panningModel) : (i._pos || (i._pos = o._pos || [0, 0, -.5]), t(i, "spatial"))
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
                        i = !1, u(e)
                    },
                    s = function(e) {
                        i && (e.changedTouches = [{
                            clientX: e.clientX,
                            clientY: e.clientY
                        }], l(e))
                    };
                t.mouse && (e.addEventListener("mousedown", o), e.addEventListener("mouseup", a), e.addEventListener("mousemove", s));
                var u = function(i) {
                        var o = Math.abs,
                            a = Math.max,
                            s = Math.min;
                        if (n.length) {
                            for (var u = "function" == typeof TouchEvent && i instanceof TouchEvent, l = [], c = [], d = {
                                    top: !1,
                                    right: !1,
                                    bottom: !1,
                                    left: !1
                                }, h = 0; h < n.length; h++) l.push(n[h].x), c.push(n[h].y);
                            var f = l[0],
                                p = l[l.length - 1],
                                m = c[0],
                                g = c[c.length - 1],
                                v = {
                                    x: [f, p],
                                    y: [m, g]
                                };
                            if (1 < n.length) {
                                var y = {
                                        detail: r({
                                            touch: u,
                                            target: i.target
                                        }, v)
                                    },
                                    _ = new CustomEvent("swiperelease", y);
                                e.dispatchEvent(_)
                            }
                            var b = l[0] - l[l.length - 1],
                                w = "none";
                            w = 0 < b ? "left" : "right";
                            var T = s.apply(Math, l),
                                k = a.apply(Math, l);
                            if (o(b) >= t.minHorizontal && ("left" == w ? o(T - l[l.length - 1]) <= t.deltaHorizontal && (d.left = !0) : "right" == w && (o(k - l[l.length - 1]) <= t.deltaHorizontal && (d.right = !0))), w = "none", w = 0 < (b = c[0] - c[c.length - 1]) ? "top" : "bottom", T = s.apply(Math, c), k = a.apply(Math, c), o(b) >= t.minVertical && ("top" == w ? o(T - c[c.length - 1]) <= t.deltaVertical && (d.top = !0) : "bottom" == w && (o(k - c[c.length - 1]) <= t.deltaVertical && (d.bottom = !0))), n = [], d.top || d.right || d.bottom || d.left) {
                                t.lockAxis && ((d.left || d.right) && o(f - p) > o(m - g) ? d.top = d.bottom = !1 : (d.top || d.bottom) && o(f - p) < o(m - g) && (d.left = d.right = !1));
                                var x = {
                                        detail: r({
                                            directions: d,
                                            touch: u,
                                            target: i.target
                                        }, v)
                                    },
                                    A = new CustomEvent("swipe", x);
                                e.dispatchEvent(A)
                            } else {
                                var S = new CustomEvent("swipecancel", {
                                    detail: r({
                                        touch: u,
                                        target: i.target
                                    }, v)
                                });
                                e.dispatchEvent(S)
                            }
                        }
                    },
                    l = function(i) {
                        t.preventScroll && i.preventDefault();
                        var r = i.changedTouches[0];
                        if (n.push({
                                x: r.clientX,
                                y: r.clientY
                            }), 1 < n.length) {
                            var o = n[0].x,
                                a = n[n.length - 1].x,
                                s = n[0].y,
                                u = n[n.length - 1].y,
                                l = {
                                    detail: {
                                        x: [o, a],
                                        y: [s, u],
                                        touch: "function" == typeof TouchEvent && i instanceof TouchEvent,
                                        target: i.target
                                    }
                                },
                                c = new CustomEvent("swiping", l);
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
                return t.touch && (e.addEventListener("touchmove", l, c), e.addEventListener("touchend", u)), {
                    off: function() {
                        e.removeEventListener("touchmove", l, c), e.removeEventListener("touchend", u), e.removeEventListener("mousedown", o), e.removeEventListener("mouseup", a), e.removeEventListener("mousemove", s)
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
        return hr
    })), n.d(i, "stop", (function() {
        return fr
    })), n.d(i, "start", (function() {
        return pr
    })), n.d(i, "first", (function() {
        return gr
    })), n.d(i, "final", (function() {
        return vr
    }));
    var r = {};
    n.r(r), n.d(r, "reset", (function() {
        return Kv
    })), n.d(r, "stop", (function() {
        return Zv
    })), n.d(r, "start", (function() {
        return Jv
    })), n.d(r, "first", (function() {
        return ey
    })), n.d(r, "final", (function() {
        return ty
    }));
    var o = {};
    n.r(o), n.d(o, "reset", (function() {
        return dy
    })), n.d(o, "stop", (function() {
        return hy
    })), n.d(o, "start", (function() {
        return fy
    })), n.d(o, "first", (function() {
        return vy
    })), n.d(o, "final", (function() {
        return yy
    }));
    var a = {};
    n.r(a), n.d(a, "reset", (function() {
        return _y
    })), n.d(a, "stop", (function() {
        return by
    })), n.d(a, "start", (function() {
        return wy
    })), n.d(a, "first", (function() {
        return Ty
    })), n.d(a, "final", (function() {
        return ky
    }));
    var s = {};
    n.r(s), n.d(s, "reset", (function() {
        return Ay
    })), n.d(s, "stop", (function() {
        return Sy
    })), n.d(s, "start", (function() {
        return Ey
    })), n.d(s, "first", (function() {
        return Oy
    })), n.d(s, "final", (function() {
        return Cy
    }));
    var u = {};
    n.r(u), n.d(u, "reset", (function() {
        return Iy
    })), n.d(u, "stop", (function() {
        return My
    })), n.d(u, "start", (function() {
        return Ly
    })), n.d(u, "first", (function() {
        return jy
    })), n.d(u, "final", (function() {
        return Dy
    }));
    var l = {};
    n.r(l), n.d(l, "reset", (function() {
        return $y
    })), n.d(l, "stop", (function() {
        return Hy
    })), n.d(l, "start", (function() {
        return Uy
    })), n.d(l, "first", (function() {
        return qy
    })), n.d(l, "final", (function() {
        return zy
    }));
    var c = {};
    n.r(c), 
    n.d(c, "reset", (function() {
        return Wy
    })), 
    n.d(c, "stop", (function() {
        return Gy
    })), 
    n.d(c, "start", (function() {
        return Xy
    })), 
    n.d(c, "first", (function() {
        return Yy
    })), 
    n.d(c, "final", (function() {
        return Qy
    }));
    var d = {};

    function h(e) {
        return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function f(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function p(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    /*!
     * GSAP 3.4.2
     * https://greensock.com
     *
     * @license Copyright 2008-2020, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    n.r(d), n.d(d, "reset", (function() {
        return Zy
    })), n.d(d, "stop", (function() {
        return Jy
    })), n.d(d, "start", (function() {
        return e_
    })), n.d(d, "first", (function() {
        return r_
    })), n.d(d, "final", (function() {
        return o_
    }));
    var m, g, v, y, _, b, w, T, k, x, A, S, E, O, C, P, I, M, L, R, N, j, D, F, H, U = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        B = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        q = 1e8,
        z = 2 * Math.PI,
        V = z / 4,
        W = 0,
        G = Math.sqrt,
        X = Math.cos,
        Y = Math.sin,
        Q = function(e) {
            return "string" == typeof e
        },
        K = function(e) {
            return "function" == typeof e
        },
        Z = function(e) {
            return "number" == typeof e
        },
        J = function(e) {
            return void 0 === e
        },
        ee = function(e) {
            return "object" === h(e)
        },
        te = function(e) {
            return !1 !== e
        },
        ne = function() {
            return "undefined" != typeof window
        },
        ie = function(e) {
            return K(e) || Q(e)
        },
        re = Array.isArray,
        oe = /(?:-?\.?\d|\.)+/gi,
        ae = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
        se = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        ue = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
        le = /\(([^()]+)\)/i,
        ce = /[+-]=-?[\.\d]+/,
        de = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
        he = {},
        fe = {},
        pe = function(e) {
            return (fe = $e(e, he)) && Tn
        },
        me = function(e, t) {
            return !t && void 0
        },
        ge = function(e, t) {
            return e && (he[e] = t) && fe && (fe[e] = t) || he
        },
        ve = function() {
            return 0
        },
        ye = {},
        _e = [],
        be = {},
        we = {},
        Te = {},
        ke = 30,
        xe = [],
        Ae = "",
        Se = function(e) {
            var t, n, i = e[0];
            if (ee(i) || K(i) || (e = [e]), !(t = (i._gsap || {}).harness)) {
                for (n = xe.length; n-- && !xe[n].targetTest(i););
                t = xe[n]
            }
            for (n = e.length; n--;) e[n] && (e[n]._gsap || (e[n]._gsap = new Wt(e[n], t))) || e.splice(n, 1);
            return e
        },
        Ee = function(e) {
            return e._gsap || Se(ht(e))[0]._gsap
        },
        Oe = function(e, t) {
            var n = e[t];
            return K(n) ? e[t]() : J(n) && e.getAttribute(t) || n
        },
        Ce = function(e, t) {
            return (e = e.split(",")).forEach(t) || e
        },
        Pe = function(e) {
            return Math.round(1e5 * e) / 1e5 || 0
        },
        Ie = function(e, t) {
            for (var n = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < n;);
            return i < n
        },
        Me = function(e, t, n) {
            var i, r = Z(e[1]),
                o = (r ? 2 : 1) + (t < 2 ? 0 : 1),
                a = e[o];
            if (r && (a.duration = e[1]), a.parent = n, t) {
                for (i = a; n && !("immediateRender" in i);) i = n.vars.defaults || {}, n = te(n.vars.inherit) && n.parent;
                a.immediateRender = te(i.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[o - 1]
            }
            return a
        },
        Le = function() {
            var e, t, n = _e.length,
                i = _e.slice(0);
            for (be = {}, _e.length = 0, e = 0; e < n; e++)(t = i[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0)
        },
        Re = function(e, t, n, i) {
            _e.length && Le(), e.render(t, n, i), _e.length && Le()
        },
        Ne = function(e) {
            var t = parseFloat(e);
            return (t || 0 === t) && (e + "").match(de).length < 2 ? t : e
        },
        je = function(e) {
            return e
        },
        De = function(e, t) {
            for (var n in t) n in e || (e[n] = t[n]);
            return e
        },
        Fe = function(e, t) {
            for (var n in t) n in e || "duration" === n || "ease" === n || (e[n] = t[n])
        },
        $e = function(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        },
        He = function e(t, n) {
            for (var i in n) t[i] = ee(n[i]) ? e(t[i] || (t[i] = {}), n[i]) : n[i];
            return t
        },
        Ue = function(e, t) {
            var n, i = {};
            for (n in e) n in t || (i[n] = e[n]);
            return i
        },
        Be = function(e) {
            var t = e.parent || m,
                n = e.keyframes ? Fe : De;
            if (te(e.inherit))
                for (; t;) n(e, t.vars.defaults), t = t.parent || t._dp;
            return e
        },
        qe = function(e, t, n, i) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var r = t._prev,
                o = t._next;
            r ? r._next = o : e[n] === t && (e[n] = o), o ? o._prev = r : e[i] === t && (e[i] = r), t._next = t._prev = t.parent = null
        },
        ze = function(e, t) {
            e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e), e._act = 0
        },
        Ve = function(e) {
            for (var t = e; t;) t._dirty = 1, t = t.parent;
            return e
        },
        We = function(e) {
            for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
            return e
        },
        Ge = function(e) {
            return e._repeat ? Xe(e._tTime, e = e.duration() + e._rDelay) * e : 0
        },
        Xe = function(e, t) {
            return (e /= t) && ~~e === e ? ~~e - 1 : ~~e
        },
        Ye = function(e, t) {
            return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
        },
        Qe = function(e) {
            return e._end = Pe(e._start + (e._tDur / Math.abs(e._ts || e._rts || 1e-8) || 0))
        },
        Ke = function(e, t) {
            var n = e._dp;
            return n && n.smoothChildTiming && e._ts && (e._start = Pe(e._dp._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Qe(e), n._dirty || Ve(n)), e
        },
        Ze = function(e, t) {
            var n;
            if ((t._time || t._initted && !t._dur) && (n = Ye(e.rawTime(), t), (!t._dur || st(0, t.totalDuration(), n) - t._tTime > 1e-8) && t.render(n, !0)), Ve(e)._dp && e._initted && e._time >= e._dur && e._ts) {
                if (e._dur < e.duration())
                    for (n = e; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
                e._zTime = -1e-8
            }
        },
        Je = function(e, t, n, i) {
            return t.parent && ze(t), t._start = Pe(n + t._delay), t._end = Pe(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
                function(e, t, n, i, r) {
                    void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
                    var o, a = e[i];
                    if (r)
                        for (o = t[r]; a && a[r] > o;) a = a._prev;
                    a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = a, t.parent = t._dp = e
                }(e, t, "_first", "_last", e._sort ? "_start" : 0), e._recent = t, i || Ze(e, t), e
        },
        et = function(e, t) {
            return he.ScrollTrigger ? he.ScrollTrigger.create(t, e) : void 0
        },
        tt = function(e, t, n, i) {
            return Jt(e, t), e._initted ? !n && e._pt && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && b !== Lt.frame ? (_e.push(e), e._lazy = [t, i], 1) : void 0 : 1
        },
        nt = function(e, t, n) {
            var i = e._repeat,
                r = Pe(t) || 0;
            return e._dur = r, e._tDur = i ? i < 0 ? 1e10 : Pe(r * (i + 1) + e._rDelay * i) : r, e._time > r && (e._time = r, e._tTime = Math.min(e._tTime, e._tDur)), !n && Ve(e.parent), e.parent && Qe(e), e
        },
        it = function(e) {
            return e instanceof Xt ? Ve(e) : nt(e, e._dur)
        },
        rt = {
            _start: 0,
            endTime: ve
        },
        ot = function e(t, n) {
            var i, r, o = t.labels,
                a = t._recent || rt,
                s = t.duration() >= q ? a.endTime(!1) : t._dur;
            return Q(n) && (isNaN(n) || n in o) ? "<" === (i = n.charAt(0)) || ">" === i ? ("<" === i ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) : (i = n.indexOf("=")) < 0 ? (n in o || (o[n] = s), o[n]) : (r = +(n.charAt(i - 1) + n.substr(i + 1)), i > 1 ? e(t, n.substr(0, i - 1)) + r : s + r) : null == n ? s : +n
        },
        at = function(e, t) {
            return e || 0 === e ? t(e) : t
        },
        st = function(e, t, n) {
            return n < e ? e : n > t ? t : n
        },
        ut = function(e) {
            return (e + "").substr((parseFloat(e) + "").length)
        },
        lt = [].slice,
        ct = function(e, t) {
            return e && ee(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ee(e[0])) && !e.nodeType && e !== g
        },
        dt = function(e, t, n) {
            return void 0 === n && (n = []), e.forEach((function(e) {
                var i;
                return Q(e) && !t || ct(e, 1) ? (i = n).push.apply(i, ht(e)) : n.push(e)
            })) || n
        },
        ht = function(e, t) {
            return !Q(e) || t || !v && Rt() ? re(e) ? dt(e, t) : ct(e) ? lt.call(e, 0) : e ? [e] : [] : lt.call(y.querySelectorAll(e), 0)
        },
        ft = function(e) {
            return e.sort((function() {
                return .5 - Math.random()
            }))
        },
        pt = function(e) {
            if (K(e)) return e;
            var t = ee(e) ? e : {
                    each: e
                },
                n = Ut(t.ease),
                i = t.from || 0,
                r = parseFloat(t.base) || 0,
                o = {},
                a = i > 0 && i < 1,
                s = isNaN(i) || a,
                u = t.axis,
                l = i,
                c = i;
            return Q(i) ? l = c = {
                    center: .5,
                    edges: .5,
                    end: 1
                } [i] || 0 : !a && s && (l = i[0], c = i[1]),
                function(e, a, d) {
                    var h, f, p, m, g, v, y, _, b, w = (d || t).length,
                        T = o[w];
                    if (!T) {
                        if (!(b = "auto" === t.grid ? 0 : (t.grid || [1, q])[1])) {
                            for (y = -q; y < (y = d[b++].getBoundingClientRect().left) && b < w;);
                            b--
                        }
                        for (T = o[w] = [], h = s ? Math.min(b, w) * l - .5 : i % b, f = s ? w * c / b - .5 : i / b | 0, y = 0, _ = q, v = 0; v < w; v++) p = v % b - h, m = f - (v / b | 0), T[v] = g = u ? Math.abs("y" === u ? m : p) : G(p * p + m * m), g > y && (y = g), g < _ && (_ = g);
                        "random" === i && ft(T), T.max = y - _, T.min = _, T.v = w = (parseFloat(t.amount) || parseFloat(t.each) * (b > w ? w - 1 : u ? "y" === u ? w / b : b : Math.max(b, w / b)) || 0) * ("edges" === i ? -1 : 1), T.b = w < 0 ? r - w : r, T.u = ut(t.amount || t.each) || 0, n = n && w < 0 ? $t(n) : n
                    }
                    return w = (T[e] - T.min) / T.max || 0, Pe(T.b + (n ? n(w) : w) * T.v) + T.u
                }
        },
        mt = function(e) {
            var t = e < 1 ? Math.pow(10, (e + "").length - 2) : 1;
            return function(n) {
                return Math.floor(Math.round(parseFloat(n) / e) * e * t) / t + (Z(n) ? 0 : ut(n))
            }
        },
        gt = function(e, t) {
            var n, i, r = re(e);
            return !r && ee(e) && (n = r = e.radius || q, e.values ? (e = ht(e.values), (i = !Z(e[0])) && (n *= n)) : e = mt(e.increment)), at(t, r ? K(e) ? function(t) {
                return i = e(t), Math.abs(i - t) <= n ? i : t
            } : function(t) {
                for (var r, o, a = parseFloat(i ? t.x : t), s = parseFloat(i ? t.y : 0), u = q, l = 0, c = e.length; c--;)(r = i ? (r = e[c].x - a) * r + (o = e[c].y - s) * o : Math.abs(e[c] - a)) < u && (u = r, l = c);
                return l = !n || u <= n ? e[l] : t, i || l === t || Z(t) ? l : l + ut(t)
            } : mt(e))
        },
        vt = function(e, t, n, i) {
            return at(re(e) ? !t : !0 === n ? !!(n = 0) : !i, (function() {
                return re(e) ? e[~~(Math.random() * e.length)] : (n = n || 1e-5) && (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((e + Math.random() * (t - e)) / n) * n * i) / i
            }))
        },
        yt = function(e, t, n) {
            return at(n, (function(n) {
                return e[~~t(n)]
            }))
        },
        _t = function(e) {
            for (var t, n, i, r, o = 0, a = ""; ~(t = e.indexOf("random(", o));) i = e.indexOf(")", t), r = "[" === e.charAt(t + 7), n = e.substr(t + 7, i - t - 7).match(r ? de : oe), a += e.substr(o, t - o) + vt(r ? n : +n[0], +n[1], +n[2] || 1e-5), o = i + 1;
            return a + e.substr(o, e.length - o)
        },
        bt = function(e, t, n, i, r) {
            var o = t - e,
                a = i - n;
            return at(r, (function(t) {
                return n + ((t - e) / o * a || 0)
            }))
        },
        wt = function(e, t, n) {
            var i, r, o, a = e.labels,
                s = q;
            for (i in a)(r = a[i] - t) < 0 == !!n && r && s > (r = Math.abs(r)) && (o = i, s = r);
            return o
        },
        Tt = function(e, t, n) {
            var i, r, o = e.vars,
                a = o[t];
            if (a) return i = o[t + "Params"], r = o.callbackScope || e, n && _e.length && Le(), i ? a.apply(r, i) : a.call(r)
        },
        kt = function(e) {
            return ze(e), e.progress() < 1 && Tt(e, "onInterrupt"), e
        },
        xt = function(e) {
            var t = (e = !e.name && e.default || e).name,
                n = K(e),
                i = t && !n && e.init ? function() {
                    this._props = []
                } : e,
                r = {
                    init: ve,
                    render: fn,
                    add: Kt,
                    kill: mn,
                    modifier: pn,
                    rawVars: 0
                },
                o = {
                    targetTest: 0,
                    get: 0,
                    getSetter: ln,
                    aliases: {},
                    register: 0
                };
            if (Rt(), e !== i) {
                if (we[t]) return;
                De(i, De(Ue(e, r), o)), $e(i.prototype, $e(r, Ue(e, o))), we[i.prop = t] = i, e.targetTest && (xe.push(i), ye[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
            }
            ge(t, i), e.register && e.register(Tn, i, yn)
        },
        At = {
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
        St = function(e, t, n) {
            return 255 * (6 * (e = e < 0 ? e + 1 : e > 1 ? e - 1 : e) < 1 ? t + (n - t) * e * 6 : e < .5 ? n : 3 * e < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) + .5 | 0
        },
        Et = function(e, t, n) {
            var i, r, o, a, s, u, l, c, d, h, f = e ? Z(e) ? [e >> 16, e >> 8 & 255, 255 & e] : 0 : At.black;
            if (!f) {
                if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), At[e]) f = At[e];
                else if ("#" === e.charAt(0)) 4 === e.length && (i = e.charAt(1), r = e.charAt(2), o = e.charAt(3), e = "#" + i + i + r + r + o + o), f = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & 255, 255 & e];
                else if ("hsl" === e.substr(0, 3))
                    if (f = h = e.match(oe), t) {
                        if (~e.indexOf("=")) return f = e.match(ae), n && f.length < 4 && (f[3] = 1), f
                    } else a = +f[0] % 360 / 360, s = +f[1] / 100, i = 2 * (u = +f[2] / 100) - (r = u <= .5 ? u * (s + 1) : u + s - u * s), f.length > 3 && (f[3] *= 1), f[0] = St(a + 1 / 3, i, r), f[1] = St(a, i, r), f[2] = St(a - 1 / 3, i, r);
                else f = e.match(oe) || At.transparent;
                f = f.map(Number)
            }
            return t && !h && (i = f[0] / 255, r = f[1] / 255, o = f[2] / 255, u = ((l = Math.max(i, r, o)) + (c = Math.min(i, r, o))) / 2, l === c ? a = s = 0 : (d = l - c, s = u > .5 ? d / (2 - l - c) : d / (l + c), a = l === i ? (r - o) / d + (r < o ? 6 : 0) : l === r ? (o - i) / d + 2 : (i - r) / d + 4, a *= 60), f[0] = ~~(a + .5), f[1] = ~~(100 * s + .5), f[2] = ~~(100 * u + .5)), n && f.length < 4 && (f[3] = 1), f
        },
        Ot = function(e) {
            var t = [],
                n = [],
                i = -1;
            return e.split(Pt).forEach((function(e) {
                var r = e.match(se) || [];
                t.push.apply(t, r), n.push(i += r.length + 1)
            })), t.c = n, t
        },
        Ct = function(e, t, n) {
            var i, r, o, a, s = "",
                u = (e + s).match(Pt),
                l = t ? "hsla(" : "rgba(",
                c = 0;
            if (!u) return e;
            if (u = u.map((function(e) {
                    return (e = Et(e, t, 1)) && l + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")"
                })), n && (o = Ot(e), (i = n.c).join(s) !== o.c.join(s)))
                for (a = (r = e.replace(Pt, "1").split(se)).length - 1; c < a; c++) s += r[c] + (~i.indexOf(c) ? u.shift() || l + "0,0,0,0)" : (o.length ? o : u.length ? u : n).shift());
            if (!r)
                for (a = (r = e.split(Pt)).length - 1; c < a; c++) s += r[c] + u[c];
            return s + r[a]
        },
        Pt = function() {
            var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (e in At) t += "|" + e + "\\b";
            return new RegExp(t + ")", "gi")
        }(),
        It = /hsl[a]?\(/,
        Mt = function(e) {
            var t, n = e.join(" ");
            if (Pt.lastIndex = 0, Pt.test(n)) return t = It.test(n), e[1] = Ct(e[1], t), e[0] = Ct(e[0], t, Ot(e[1])), !0
        },
        Lt = (E = Date.now, O = 500, C = 33, P = E(), I = P, L = M = 1 / 240, N = function e(t) {
            var n, i, r = E() - I,
                o = !0 === t;
            r > O && (P += r - C), I += r, S.time = (I - P) / 1e3, ((n = S.time - L) > 0 || o) && (S.frame++, L += n + (n >= M ? .004 : M - n), i = 1), o || (k = x(e)), i && R.forEach((function(e) {
                return e(S.time, r, S.frame, t)
            }))
        }, S = {
            time: 0,
            frame: 0,
            tick: function() {
                N(!0)
            },
            wake: function() {
                _ && (!v && ne() && (g = v = window, y = g.document || {}, he.gsap = Tn, (g.gsapVersions || (g.gsapVersions = [])).push(Tn.version), pe(fe || g.GreenSockGlobals || !g.gsap && g || {}), A = g.requestAnimationFrame), k && S.sleep(), x = A || function(e) {
                    return setTimeout(e, 1e3 * (L - S.time) + 1 | 0)
                }, T = 1, N(2))
            },
            sleep: function() {
                (A ? g.cancelAnimationFrame : clearTimeout)(k), T = 0, x = ve
            },
            lagSmoothing: function(e, t) {
                O = e || 1 / 1e-8, C = Math.min(t, O, 0)
            },
            fps: function(e) {
                M = 1 / (e || 240), L = S.time + M
            },
            add: function(e) {
                R.indexOf(e) < 0 && R.push(e), Rt()
            },
            remove: function(e) {
                var t;
                ~(t = R.indexOf(e)) && R.splice(t, 1)
            },
            _listeners: R = []
        }),
        Rt = function() {
            return !T && Lt.wake()
        },
        Nt = {},
        jt = /^[\d.\-M][\d.\-,\s]/,
        Dt = /["']/g,
        Ft = function(e) {
            for (var t, n, i, r = {}, o = e.substr(1, e.length - 3).split(":"), a = o[0], s = 1, u = o.length; s < u; s++) n = o[s], t = s !== u - 1 ? n.lastIndexOf(",") : n.length, i = n.substr(0, t), r[a] = isNaN(i) ? i.replace(Dt, "").trim() : +i, a = n.substr(t + 1).trim();
            return r
        },
        $t = function(e) {
            return function(t) {
                return 1 - e(1 - t)
            }
        },
        Ht = function e(t, n) {
            for (var i, r = t._first; r;) r instanceof Xt ? e(r, n) : !r.vars.yoyoEase || r._yoyo && r._repeat || r._yoyo === n || (r.timeline ? e(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next
        },
        Ut = function(e, t) {
            return e && (K(e) ? e : Nt[e] || function(e) {
                var t = (e + "").split("("),
                    n = Nt[t[0]];
                return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [Ft(t[1])] : le.exec(e)[1].split(",").map(Ne)) : Nt._CE && jt.test(e) ? Nt._CE("", e) : n
            }(e)) || t
        },
        Bt = function(e, t, n, i) {
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
            return Ce(e, (function(e) {
                for (var t in Nt[e] = he[e] = o, Nt[r = e.toLowerCase()] = n, o) Nt[r + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Nt[e + "." + t] = o[t]
            })), o
        },
        qt = function(e) {
            return function(t) {
                return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
            }
        },
        zt = function e(t, n, i) {
            var r = n >= 1 ? n : 1,
                o = (i || (t ? .3 : .45)) / (n < 1 ? n : 1),
                a = o / z * (Math.asin(1 / r) || 0),
                s = function(e) {
                    return 1 === e ? 1 : r * Math.pow(2, -10 * e) * Y((e - a) * o) + 1
                },
                u = "out" === t ? s : "in" === t ? function(e) {
                    return 1 - s(1 - e)
                } : qt(s);
            return o = z / o, u.config = function(n, i) {
                return e(t, n, i)
            }, u
        },
        Vt = function e(t, n) {
            void 0 === n && (n = 1.70158);
            var i = function(e) {
                    return e ? --e * e * ((n + 1) * e + n) + 1 : 0
                },
                r = "out" === t ? i : "in" === t ? function(e) {
                    return 1 - i(1 - e)
                } : qt(i);
            return r.config = function(n) {
                return e(t, n)
            }, r
        };
    Ce("Linear,Quad,Cubic,Quart,Quint,Strong", (function(e, t) {
        var n = t < 5 ? t + 1 : t;
        Bt(e + ",Power" + (n - 1), t ? function(e) {
            return Math.pow(e, n)
        } : function(e) {
            return e
        }, (function(e) {
            return 1 - Math.pow(1 - e, n)
        }), (function(e) {
            return e < .5 ? Math.pow(2 * e, n) / 2 : 1 - Math.pow(2 * (1 - e), n) / 2
        }))
    })), Nt.Linear.easeNone = Nt.none = Nt.Linear.easeIn, Bt("Elastic", zt("in"), zt("out"), zt()), j = 7.5625, F = 1 / (D = 2.75), Bt("Bounce", (function(e) {
        return 1 - H(1 - e)
    }), H = function(e) {
        return e < F ? j * e * e : e < .7272727272727273 ? j * Math.pow(e - 1.5 / D, 2) + .75 : e < .9090909090909092 ? j * (e -= 2.25 / D) * e + .9375 : j * Math.pow(e - 2.625 / D, 2) + .984375
    }), Bt("Expo", (function(e) {
        return e ? Math.pow(2, 10 * (e - 1)) : 0
    })), Bt("Circ", (function(e) {
        return -(G(1 - e * e) - 1)
    })), Bt("Sine", (function(e) {
        return 1 === e ? 1 : 1 - X(e * V)
    })), Bt("Back", Vt("in"), Vt("out"), Vt()), Nt.SteppedEase = Nt.steps = he.SteppedEase = {
        config: function(e, t) {
            void 0 === e && (e = 1);
            var n = 1 / e,
                i = e + (t ? 0 : 1),
                r = t ? 1 : 0;
            return function(e) {
                return ((i * st(0, 1 - 1e-8, e) | 0) + r) * n
            }
        }
    }, B.ease = Nt["quad.out"], Ce("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(e) {
        return Ae += e + "," + e + "Params,"
    }));
    var Wt = function(e, t) {
            this.id = W++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Oe, this.set = t ? t.getSetter : ln
        },
        Gt = function() {
            function e(e, t) {
                var n = e.parent || m;
                this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, nt(this, +e.duration, 1), this.data = e.data, T || Lt.wake(), n && Je(n, this, t || 0 === t ? t : n._time, 1), e.reversed && this.reverse(), e.paused && this.paused(!0)
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
                return nt(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1)), this._tTime ? Ke(this, t * e + Ge(this)) : this
            }, t.totalTime = function(e, t) {
                if (Rt(), !arguments.length) return this._tTime;
                var n = this._dp;
                if (n && n.smoothChildTiming && this._ts) {
                    for (Ke(this, e); n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                    !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Je(this._dp, this, this._start - this._delay)
                }
                return (this._tTime !== e || !this._dur && !t || this._initted && 1e-8 === Math.abs(this._zTime) || !e && !this._initted) && (this._ts || (this._pTime = e), Re(this, e, t)), this
            }, t.time = function(e, t) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Ge(this)) % this._dur || (e ? this._dur : 0), t) : this._time
            }, t.totalProgress = function(e, t) {
                return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
            }, t.progress = function(e, t) {
                return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + Ge(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
            }, t.iteration = function(e, t) {
                var n = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? Xe(this._tTime, n) + 1 : 1
            }, t.timeScale = function(e) {
                if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === e) return this;
                var t = this.parent && this._ts ? Ye(this.parent._time, this) : this._tTime;
                return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, We(this.totalTime(st(-this._delay, this._tDur, t), !0))
            }, t.paused = function(e) {
                return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Rt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= 1e-8) && 1e-8 !== Math.abs(this._zTime)))), this) : this._ps
            }, t.startTime = function(e) {
                if (arguments.length) {
                    this._start = e;
                    var t = this.parent || this._dp;
                    return t && (t._sort || !this.parent) && Je(t, this, e - this._delay), this
                }
                return this._start
            }, t.endTime = function(e) {
                return this._start + (te(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
            }, t.rawTime = function(e) {
                var t = this.parent || this._dp;
                return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ye(t.rawTime(e), this) : this._tTime : this._tTime
            }, t.globalTime = function(e) {
                for (var t = this, n = arguments.length ? e : t.rawTime(); t;) n = t._start + n / (t._ts || 1), t = t._dp;
                return n
            }, t.repeat = function(e) {
                return arguments.length ? (this._repeat = e, it(this)) : this._repeat
            }, t.repeatDelay = function(e) {
                return arguments.length ? (this._rDelay = e, it(this)) : this._rDelay
            }, t.yoyo = function(e) {
                return arguments.length ? (this._yoyo = e, this) : this._yoyo
            }, t.seek = function(e, t) {
                return this.totalTime(ot(this, e), te(t))
            }, t.restart = function(e, t) {
                return this.play().totalTime(e ? -this._delay : 0, te(t))
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
                    var i = K(e) ? e : je,
                        r = function() {
                            var e = t.then;
                            t.then = null, K(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), n(i), t.then = e
                        };
                    t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? r() : t._prom = r
                }))
            }, t.kill = function() {
                kt(this)
            }, e
        }();
    De(Gt.prototype, {
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
    var Xt = function(e) {
        function t(t, n) {
            var i;
            return void 0 === t && (t = {}), (i = e.call(this, t, n) || this).labels = {}, i.smoothChildTiming = !!t.smoothChildTiming, i.autoRemoveChildren = !!t.autoRemoveChildren, i._sort = te(t.sortChildren), i.parent && Ze(i.parent, f(i)), t.scrollTrigger && et(f(i), t.scrollTrigger), i
        }
        p(t, e);
        var n = t.prototype;
        return n.to = function(e, t, n) {
            return new rn(e, Me(arguments, 0, this), ot(this, Z(t) ? arguments[3] : n)), this
        }, n.from = function(e, t, n) {
            return new rn(e, Me(arguments, 1, this), ot(this, Z(t) ? arguments[3] : n)), this
        }, n.fromTo = function(e, t, n, i) {
            return new rn(e, Me(arguments, 2, this), ot(this, Z(t) ? arguments[4] : i)), this
        }, n.set = function(e, t, n) {
            return t.duration = 0, t.parent = this, Be(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new rn(e, t, ot(this, n), 1), this
        }, n.call = function(e, t, n) {
            return Je(this, rn.delayedCall(0, e, t), ot(this, n))
        }, n.staggerTo = function(e, t, n, i, r, o, a) {
            return n.duration = t, n.stagger = n.stagger || i, n.onComplete = o, n.onCompleteParams = a, n.parent = this, new rn(e, n, ot(this, r)), this
        }, n.staggerFrom = function(e, t, n, i, r, o, a) {
            return n.runBackwards = 1, Be(n).immediateRender = te(n.immediateRender), this.staggerTo(e, t, n, i, r, o, a)
        }, n.staggerFromTo = function(e, t, n, i, r, o, a, s) {
            return i.startAt = n, Be(i).immediateRender = te(i.immediateRender), this.staggerTo(e, t, i, r, o, a, s)
        }, n.render = function(e, t, n) {
            var i, r, o, a, s, u, l, c, d, h, f, p, g = this._time,
                v = this._dirty ? this.totalDuration() : this._tDur,
                y = this._dur,
                _ = this !== m && e > v - 1e-8 && e >= 0 ? v : e < 1e-8 ? 0 : e,
                b = this._zTime < 0 != e < 0 && (this._initted || !y);
            if (_ !== this._tTime || n || b) {
                if (g !== this._time && y && (_ += this._time - g, e += this._time - g), i = _, d = this._start, u = !(c = this._ts), b && (y || (g = this._zTime), (e || !t) && (this._zTime = e)), this._repeat && (f = this._yoyo, s = y + this._rDelay, ((i = Pe(_ % s)) > y || v === _) && (i = y), (a = ~~(_ / s)) && a === _ / s && (i = y, a--), h = Xe(this._tTime, s), !g && this._tTime && h !== a && (h = a), f && 1 & a && (i = y - i, p = 1), a !== h && !this._lock)) {
                    var w = f && 1 & h,
                        T = w === (f && 1 & a);
                    if (a < h && (w = !w), g = w ? 0 : y, this._lock = 1, this.render(g || (p ? 0 : Pe(a * s)), t, !y)._lock = 0, !t && this.parent && Tt(this, "onRepeat"), this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1), g !== this._time || u !== !this._ts) return this;
                    if (T && (this._lock = 2, g = w ? y + 1e-4 : -1e-4, this.render(g, !0), this.vars.repeatRefresh && !p && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
                    Ht(this, p)
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (l = function(e, t, n) {
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
                    }(this, Pe(g), Pe(i))) && (_ -= i - (i = l._start)), this._tTime = _, this._time = i, this._act = !c, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e), g || !i || t || Tt(this, "onStart"), i >= g && e >= 0)
                    for (r = this._first; r;) {
                        if (o = r._next, (r._act || i >= r._start) && r._ts && l !== r) {
                            if (r.parent !== this) return this.render(e, t, n);
                            if (r.render(r._ts > 0 ? (i - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (i - r._start) * r._ts, t, n), i !== this._time || !this._ts && !u) {
                                l = 0, o && (_ += this._zTime = -1e-8);
                                break
                            }
                        }
                        r = o
                    } else {
                        r = this._last;
                        for (var k = e < 0 ? e : i; r;) {
                            if (o = r._prev, (r._act || k <= r._end) && r._ts && l !== r) {
                                if (r.parent !== this) return this.render(e, t, n);
                                if (r.render(r._ts > 0 ? (k - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (k - r._start) * r._ts, t, n), i !== this._time || !this._ts && !u) {
                                    l = 0, o && (_ += this._zTime = k ? -1e-8 : 1e-8);
                                    break
                                }
                            }
                            r = o
                        }
                    }
                if (l && !t && (this.pause(), l.render(i >= g ? 0 : -1e-8)._zTime = i >= g ? 1 : -1, this._ts)) return this._start = d, Qe(this), this.render(e, t, n);
                this._onUpdate && !t && Tt(this, "onUpdate", !0), (_ === v && v >= this.totalDuration() || !_ && g) && (d !== this._start && Math.abs(c) === Math.abs(this._ts) || this._lock || ((e || !y) && (_ === v && this._ts > 0 || !_ && this._ts < 0) && ze(this, 1), t || e < 0 && !g || !_ && !g || (Tt(this, _ === v ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < v && this.timeScale() > 0) && this._prom())))
            }
            return this
        }, n.add = function(e, t) {
            var n = this;
            if (Z(t) || (t = ot(this, t)), !(e instanceof Gt)) {
                if (re(e)) return e.forEach((function(e) {
                    return n.add(e, t)
                })), Ve(this);
                if (Q(e)) return this.addLabel(e, t);
                if (!K(e)) return this;
                e = rn.delayedCall(0, e)
            }
            return this !== e ? Je(this, e, t) : this
        }, n.getChildren = function(e, t, n, i) {
            void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === n && (n = !0), void 0 === i && (i = -q);
            for (var r = [], o = this._first; o;) o._start >= i && (o instanceof rn ? t && r.push(o) : (n && r.push(o), e && r.push.apply(r, o.getChildren(!0, t, n)))), o = o._next;
            return r
        }, n.getById = function(e) {
            for (var t = this.getChildren(1, 1, 1), n = t.length; n--;)
                if (t[n].vars.id === e) return t[n]
        }, n.remove = function(e) {
            return Q(e) ? this.removeLabel(e) : K(e) ? this.killTweensOf(e) : (qe(this, e), e === this._recent && (this._recent = this._last), Ve(this))
        }, n.totalTime = function(t, n) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Pe(Lt.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime
        }, n.addLabel = function(e, t) {
            return this.labels[e] = ot(this, t), this
        }, n.removeLabel = function(e) {
            return delete this.labels[e], this
        }, n.addPause = function(e, t, n) {
            var i = rn.delayedCall(0, t || ve, n);
            return i.data = "isPause", this._hasPause = 1, Je(this, i, ot(this, e))
        }, n.removePause = function(e) {
            var t = this._first;
            for (e = ot(this, e); t;) t._start === e && "isPause" === t.data && ze(t), t = t._next
        }, n.killTweensOf = function(e, t, n) {
            for (var i = this.getTweensOf(e, n), r = i.length; r--;) Yt !== i[r] && i[r].kill(e, t);
            return this
        }, n.getTweensOf = function(e, t) {
            for (var n, i = [], r = ht(e), o = this._first, a = Z(t); o;) o instanceof rn ? Ie(o._targets, r) && (a ? (!Yt || o._initted && o._ts) && o.globalTime(0) <= t && o.globalTime(o.totalDuration()) > t : !t || o.isActive()) && i.push(o) : (n = o.getTweensOf(r, t)).length && i.push.apply(i, n), o = o._next;
            return i
        }, n.tweenTo = function(e, t) {
            t = t || {};
            var n = this,
                i = ot(n, e),
                r = t,
                o = r.startAt,
                a = r.onStart,
                s = r.onStartParams,
                u = rn.to(n, De(t, {
                    ease: "none",
                    lazy: !1,
                    time: i,
                    duration: t.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale()) || 1e-8,
                    onStart: function() {
                        n.pause();
                        var e = t.duration || Math.abs((i - n._time) / n.timeScale());
                        u._dur !== e && nt(u, e).render(u._time, !0, !0), a && a.apply(u, s || [])
                    }
                }));
            return u
        }, n.tweenFromTo = function(e, t, n) {
            return this.tweenTo(t, De({
                startAt: {
                    time: ot(this, e)
                }
            }, n))
        }, n.recent = function() {
            return this._recent
        }, n.nextLabel = function(e) {
            return void 0 === e && (e = this._time), wt(this, ot(this, e))
        }, n.previousLabel = function(e) {
            return void 0 === e && (e = this._time), wt(this, ot(this, e), 1)
        }, n.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + 1e-8)
        }, n.shiftChildren = function(e, t, n) {
            void 0 === n && (n = 0);
            for (var i, r = this._first, o = this.labels; r;) r._start >= n && (r._start += e), r = r._next;
            if (t)
                for (i in o) o[i] >= n && (o[i] += e);
            return Ve(this)
        }, n.invalidate = function() {
            var t = this._first;
            for (this._lock = 0; t;) t.invalidate(), t = t._next;
            return e.prototype.invalidate.call(this)
        }, n.clear = function(e) {
            void 0 === e && (e = !0);
            for (var t, n = this._first; n;) t = n._next, this.remove(n), n = t;
            return this._time = this._tTime = this._pTime = 0, e && (this.labels = {}), Ve(this)
        }, n.totalDuration = function(e) {
            var t, n, i, r, o = 0,
                a = this,
                s = a._last,
                u = q;
            if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -e : e));
            if (a._dirty) {
                for (r = a.parent; s;) t = s._prev, s._dirty && s.totalDuration(), (i = s._start) > u && a._sort && s._ts && !a._lock ? (a._lock = 1, Je(a, s, i - s._delay, 1)._lock = 0) : u = i, i < 0 && s._ts && (o -= i, (!r && !a._dp || r && r.smoothChildTiming) && (a._start += i / a._ts, a._time -= i, a._tTime -= i), a.shiftChildren(-i, !1, -Infinity), u = 0), (n = Qe(s)) > o && s._ts && (o = n), s = t;
                nt(a, a === m && a._time > o ? a._time : o, 1), a._dirty = 0
            }
            return a._tDur
        }, t.updateRoot = function(e) {
            if (m._ts && (Re(m, Ye(e, m)), b = Lt.frame), Lt.frame >= ke) {
                ke += U.autoSleep || 120;
                var t = m._first;
                if ((!t || !t._ts) && U.autoSleep && Lt._listeners.length < 2) {
                    for (; t && !t._ts;) t = t._next;
                    t || Lt.sleep()
                }
            }
        }, t
    }(Gt);
    De(Xt.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var Yt, Qt = function(e, t, n, i, r, o, a) {
            var s, u, l, c, d, h, f, p, m = new yn(this._pt, e, t, 0, 1, hn, null, r),
                g = 0,
                v = 0;
            for (m.b = n, m.e = i, n += "", (f = ~(i += "").indexOf("random(")) && (i = _t(i)), o && (o(p = [n, i], e, t), n = p[0], i = p[1]), u = n.match(ue) || []; s = ue.exec(i);) c = s[0], d = i.substring(g, s.index), l ? l = (l + 1) % 5 : "rgba(" === d.substr(-5) && (l = 1), c !== u[v++] && (h = parseFloat(u[v - 1]) || 0, m._pt = {
                _next: m._pt,
                p: d || 1 === v ? d : ",",
                s: h,
                c: "=" === c.charAt(1) ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1) : parseFloat(c) - h,
                m: l && l < 4 ? Math.round : 0
            }, g = ue.lastIndex);
            return m.c = g < i.length ? i.substring(g, i.length) : "", m.fp = a, (ce.test(i) || f) && (m.e = 0), this._pt = m, m
        },
        Kt = function(e, t, n, i, r, o, a, s, u) {
            K(i) && (i = i(r || 0, e, o));
            var l, c = e[t],
                d = "get" !== n ? n : K(c) ? u ? e[t.indexOf("set") || !K(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](u) : e[t]() : c,
                h = K(c) ? u ? sn : an : on;
            if (Q(i) && (~i.indexOf("random(") && (i = _t(i)), "=" === i.charAt(1) && (i = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (ut(d) || 0))), d !== i) return isNaN(d * i) ? Qt.call(this, e, t, d, i, h, s || U.stringFilter, u) : (l = new yn(this._pt, e, t, +d || 0, i - (d || 0), "boolean" == typeof c ? dn : cn, 0, h), u && (l.fp = u), a && l.modifier(a, this, e), this._pt = l)
        },
        Zt = function(e, t, n, i, r, o) {
            var a, s, u, l;
            if (we[e] && !1 !== (a = new we[e]).init(r, a.rawVars ? t[e] : function(e, t, n, i, r) {
                    if (K(e) && (e = en(e, r, t, n, i)), !ee(e) || e.style && e.nodeType || re(e)) return Q(e) ? en(e, r, t, n, i) : e;
                    var o, a = {};
                    for (o in e) a[o] = en(e[o], r, t, n, i);
                    return a
                }(t[e], i, r, o, n), n, i, o) && (n._pt = s = new yn(n._pt, r, e, 0, 1, a.render, a, 0, a.priority), n !== w))
                for (u = n._ptLookup[n._targets.indexOf(r)], l = a._props.length; l--;) u[a._props[l]] = s;
            return a
        },
        Jt = function e(t, n) {
            var i, r, o, a, s, u, l, c, d, h, f, p, g, v = t.vars,
                y = v.ease,
                _ = v.startAt,
                b = v.immediateRender,
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
            if (N && (!E || !y) && (y = "none"), t._ease = Ut(y, B.ease), t._yEase = S ? $t(Ut(!0 === S ? y : S, B.ease)) : 0, S && t._yoyo && !t._repeat && (S = t._yEase, t._yEase = t._ease, t._ease = S), !N) {
                if (p = (c = I[0] ? Ee(I[0]).harness : 0) && v[c.prop], i = Ue(v, ye), P && P.render(-1, !0).kill(), _) {
                    if (ze(t._startAt = rn.set(I, De({
                            data: "isStart",
                            overwrite: !1,
                            parent: M,
                            immediateRender: !0,
                            lazy: te(w),
                            startAt: null,
                            delay: 0,
                            onUpdate: T,
                            onUpdateParams: k,
                            callbackScope: x,
                            stagger: 0
                        }, _))), b)
                        if (n > 0) !O && (t._startAt = 0);
                        else if (C && !(n < 0 && P)) return void(t._zTime = n)
                } else if (A && C)
                    if (P) !O && (t._startAt = 0);
                    else if (n && (b = !1), o = De({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: b && te(w),
                        immediateRender: b,
                        stagger: 0,
                        parent: M
                    }, i), p && (o[c.prop] = p), ze(t._startAt = rn.set(I, o)), b) {
                    if (!n) return
                } else e(t._startAt, 1e-8);
                for (t._pt = 0, w = C && te(w) || w && !C, r = 0; r < I.length; r++) {
                    if (l = (s = I[r])._gsap || Se(I)[r]._gsap, t._ptLookup[r] = h = {}, be[l.id] && Le(), f = L === I ? r : L.indexOf(s), c && !1 !== (d = new c).init(s, p || i, t, f, L) && (t._pt = a = new yn(t._pt, s, d.name, 0, 1, d.render, d, 0, d.priority), d._props.forEach((function(e) {
                            h[e] = a
                        })), d.priority && (u = 1)), !c || p)
                        for (o in i) we[o] && (d = Zt(o, i, t, f, s, L)) ? d.priority && (u = 1) : h[o] = a = Kt.call(t, s, o, "get", i[o], f, L, 0, v.stringFilter);
                    t._op && t._op[r] && t.kill(s, t._op[r]), R && t._pt && (Yt = t, m.killTweensOf(s, h, t.globalTime(0)), g = !t.parent, Yt = 0), t._pt && w && (be[l.id] = 1)
                }
                u && vn(t), t._onInit && t._onInit(t)
            }
            t._from = !N && !!v.runBackwards, t._onUpdate = T, t._initted = (!t._op || t._pt) && !g
        },
        en = function(e, t, n, i, r) {
            return K(e) ? e.call(t, n, i, r) : Q(e) && ~e.indexOf("random(") ? _t(e) : e
        },
        tn = Ae + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        nn = (tn + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
        rn = function(e) {
            function t(t, n, i, r) {
                var o;
                "number" == typeof n && (i.duration = n, n = i, i = null);
                var a, s, u, l, c, d, h, p, g = (o = e.call(this, r ? n : Be(n), i) || this).vars,
                    v = g.duration,
                    y = g.delay,
                    _ = g.immediateRender,
                    b = g.stagger,
                    w = g.overwrite,
                    T = g.keyframes,
                    k = g.defaults,
                    x = g.scrollTrigger,
                    A = g.yoyoEase,
                    S = o.parent,
                    E = (re(t) ? Z(t[0]) : "length" in n) ? [t] : ht(t);
                if (o._targets = E.length ? Se(E) : me(0, !U.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = w, T || b || ie(v) || ie(y)) {
                    if (n = o.vars, (a = o.timeline = new Xt({
                            data: "nested",
                            defaults: k || {}
                        })).kill(), a.parent = f(o), T) De(a.vars.defaults, {
                        ease: "none"
                    }), T.forEach((function(e) {
                        return a.to(E, e, ">")
                    }));
                    else {
                        if (l = E.length, h = b ? pt(b) : ve, ee(b))
                            for (c in b) ~tn.indexOf(c) && (p || (p = {}), p[c] = b[c]);
                        for (s = 0; s < l; s++) {
                            for (c in u = {}, n) nn.indexOf(c) < 0 && (u[c] = n[c]);
                            u.stagger = 0, A && (u.yoyoEase = A), p && $e(u, p), d = E[s], u.duration = +en(v, f(o), s, d, E), u.delay = (+en(y, f(o), s, d, E) || 0) - o._delay, !b && 1 === l && u.delay && (o._delay = y = u.delay, o._start += y, u.delay = 0), a.to(d, u, h(s, d, E))
                        }
                        a.duration() ? v = y = 0 : o.timeline = 0
                    }
                    v || o.duration(v = a.duration())
                } else o.timeline = 0;
                return !0 === w && (Yt = f(o), m.killTweensOf(E), Yt = 0), S && Ze(S, f(o)), (_ || !v && !T && o._start === Pe(S._time) && te(_) && function e(t) {
                    return !t || t._ts && e(t.parent)
                }(f(o)) && "nested" !== S.data) && (o._tTime = -1e-8, o.render(Math.max(0, -y))), x && et(f(o), x), o
            }
            p(t, e);
            var n = t.prototype;
            return n.render = function(e, t, n) {
                var i, r, o, a, s, u, l, c, d, h = this._time,
                    f = this._tDur,
                    p = this._dur,
                    m = e > f - 1e-8 && e >= 0 ? f : e < 1e-8 ? 0 : e;
                if (p) {
                    if (m !== this._tTime || !e || n || this._startAt && this._zTime < 0 != e < 0) {
                        if (i = m, c = this.timeline, this._repeat) {
                            if (a = p + this._rDelay, ((i = Pe(m % a)) > p || f === m) && (i = p), (o = ~~(m / a)) && o === m / a && (i = p, o--), (u = this._yoyo && 1 & o) && (d = this._yEase, i = p - i), s = Xe(this._tTime, a), i === h && !n && this._initted) return this;
                            o !== s && (c && this._yEase && Ht(c, u), !this.vars.repeatRefresh || u || this._lock || (this._lock = n = 1, this.render(Pe(a * o), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (tt(this, e < 0 ? e : i, n, t)) return this._tTime = 0, this;
                            if (p !== this._dur) return this.render(e, t, n)
                        }
                        for (this._tTime = m, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = l = (d || this._ease)(i / p), this._from && (this.ratio = l = 1 - l), i && !h && !t && Tt(this, "onStart"), r = this._pt; r;) r.r(l, r.d), r = r._next;
                        c && c.render(e < 0 ? e : !i && u ? -1e-8 : c._dur * l, t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (e < 0 && this._startAt && this._startAt.render(e, !0, n), Tt(this, "onUpdate")), this._repeat && o !== s && this.vars.onRepeat && !t && this.parent && Tt(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (e < 0 && this._startAt && !this._onUpdate && this._startAt.render(e, !0, !0), (e || !p) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0) && ze(this, 1), t || e < 0 && !h || !m && !h || (Tt(this, m === f ? "onComplete" : "onReverseComplete", !0), this._prom && !(m < f && this.timeScale() > 0) && this._prom()))
                    }
                } else ! function(e, t, n, i) {
                    var r, o, a = e.ratio,
                        s = t < 0 || !t && a && !e._start && e._zTime > 1e-8 && !e._dp._lock || e._ts < 0 || e._dp._ts < 0 ? 0 : 1,
                        u = e._rDelay,
                        l = 0;
                    if (u && e._repeat && (l = st(0, e._tDur, t), Xe(l, u) !== (o = Xe(e._tTime, u)) && (a = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), e._initted || !tt(e, t, i, n))
                        if (s !== a || i || 1e-8 === e._zTime || !t && e._zTime) {
                            for (o = e._zTime, e._zTime = t || (n ? 1e-8 : 0), n || (n = t && !o), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = l, n || Tt(e, "onStart"), r = e._pt; r;) r.r(s, r.d), r = r._next;
                            e._startAt && t < 0 && e._startAt.render(t, !0, !0), e._onUpdate && !n && Tt(e, "onUpdate"), l && e._repeat && !n && e.parent && Tt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === s && (s && ze(e, 1), n || (Tt(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()))
                        } else e._zTime || (e._zTime = t)
                }(this, e, t, n);
                return this
            }, n.targets = function() {
                return this._targets
            }, n.invalidate = function() {
                return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), e.prototype.invalidate.call(this)
            }, n.kill = function(e, t) {
                if (void 0 === t && (t = "all"), !(e || t && "all" !== t) && (this._lazy = 0, this.parent)) return kt(this);
                if (this.timeline) {
                    var n = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(e, t, Yt && !0 !== Yt.vars.overwrite)._first || kt(this), this.parent && n !== this.timeline.totalDuration() && nt(this, this._dur * this.timeline._tDur / n), this
                }
                var i, r, o, a, s, u, l, c = this._targets,
                    d = e ? ht(e) : c,
                    h = this._ptLookup,
                    f = this._pt;
                if ((!t || "all" === t) && function(e, t) {
                        for (var n = e.length, i = n === t.length; i && n-- && e[n] === t[n];);
                        return n < 0
                    }(c, d)) return "all" === t && (this._pt = 0), kt(this);
                for (i = this._op = this._op || [], "all" !== t && (Q(t) && (s = {}, Ce(t, (function(e) {
                        return s[e] = 1
                    })), t = s), t = function(e, t) {
                        var n, i, r, o, a = e[0] ? Ee(e[0]).harness : 0,
                            s = a && a.aliases;
                        if (!s) return t;
                        for (i in n = $e({}, t), s)
                            if (i in n)
                                for (r = (o = s[i].split(",")).length; r--;) n[o[r]] = n[i];
                        return n
                    }(c, t)), l = c.length; l--;)
                    if (~d.indexOf(c[l]))
                        for (s in r = h[l], "all" === t ? (i[l] = t, a = r, o = {}) : (o = i[l] = i[l] || {}, a = t), a)(u = r && r[s]) && ("kill" in u.d && !0 !== u.d.kill(s) || qe(this, u, "_pt"), delete r[s]), "all" !== o && (o[s] = 1);
                return this._initted && !this._pt && f && kt(this), this
            }, t.to = function(e, n) {
                return new t(e, n, arguments[2])
            }, t.from = function(e, n) {
                return new t(e, Me(arguments, 1))
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
                return new t(e, Me(arguments, 2))
            }, t.set = function(e, n) {
                return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(e, n)
            }, t.killTweensOf = function(e, t, n) {
                return m.killTweensOf(e, t, n)
            }, t
        }(Gt);
    De(rn.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), Ce("staggerTo,staggerFrom,staggerFromTo", (function(e) {
        rn[e] = function() {
            var t = new Xt,
                n = lt.call(arguments, 0);
            return n.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, n)
        }
    }));
    var on = function(e, t, n) {
            return e[t] = n
        },
        an = function(e, t, n) {
            return e[t](n)
        },
        sn = function(e, t, n, i) {
            return e[t](i.fp, n)
        },
        un = function(e, t, n) {
            return e.setAttribute(t, n)
        },
        ln = function(e, t) {
            return K(e[t]) ? an : J(e[t]) && e.setAttribute ? un : on
        },
        cn = function(e, t) {
            return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4, t)
        },
        dn = function(e, t) {
            return t.set(t.t, t.p, !!(t.s + t.c * e), t)
        },
        hn = function(e, t) {
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
        fn = function(e, t) {
            for (var n = t._pt; n;) n.r(e, n.d), n = n._next
        },
        pn = function(e, t, n, i) {
            for (var r, o = this._pt; o;) r = o._next, o.p === i && o.modifier(e, t, n), o = r
        },
        mn = function(e) {
            for (var t, n, i = this._pt; i;) n = i._next, i.p === e && !i.op || i.op === e ? qe(this, i, "_pt") : i.dep || (t = 1), i = n;
            return !t
        },
        gn = function(e, t, n, i) {
            i.mSet(e, t, i.m.call(i.tween, n, i.mt), i)
        },
        vn = function(e) {
            for (var t, n, i, r, o = e._pt; o;) {
                for (t = o._next, n = i; n && n.pr > o.pr;) n = n._next;
                (o._prev = n ? n._prev : r) ? o._prev._next = o: i = o, (o._next = n) ? n._prev = o : r = o, o = t
            }
            e._pt = i
        },
        yn = function() {
            function e(e, t, n, i, r, o, a, s, u) {
                this.t = t, this.s = i, this.c = r, this.p = n, this.r = o || cn, this.d = a || this, this.set = s || on, this.pr = u || 0, this._next = e, e && (e._prev = this)
            }
            return e.prototype.modifier = function(e, t, n) {
                this.mSet = this.mSet || this.set, this.set = gn, this.m = e, this.mt = n, this.tween = t
            }, e
        }();
    Ce(Ae + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(e) {
        return ye[e] = 1
    })), he.TweenMax = he.TweenLite = rn, he.TimelineLite = he.TimelineMax = Xt, m = new Xt({
        sortChildren: !1,
        defaults: B,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), U.stringFilter = Mt;
    var _n = {
        registerPlugin: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            t.forEach((function(e) {
                return xt(e)
            }))
        },
        timeline: function(e) {
            return new Xt(e)
        },
        getTweensOf: function(e, t) {
            return m.getTweensOf(e, t)
        },
        getProperty: function(e, t, n, i) {
            Q(e) && (e = ht(e)[0]);
            var r = Ee(e || {}).get,
                o = n ? je : Ne;
            return "native" === n && (n = ""), e ? t ? o((we[t] && we[t].get || r)(e, t, n, i)) : function(t, n, i) {
                return o((we[t] && we[t].get || r)(e, t, n, i))
            } : e
        },
        quickSetter: function(e, t, n) {
            if ((e = ht(e)).length > 1) {
                var i = e.map((function(e) {
                        return Tn.quickSetter(e, t, n)
                    })),
                    r = i.length;
                return function(e) {
                    for (var t = r; t--;) i[t](e)
                }
            }
            e = e[0] || {};
            var o = we[t],
                a = Ee(e),
                s = a.harness && (a.harness.aliases || {})[t] || t,
                u = o ? function(t) {
                    var i = new o;
                    w._pt = 0, i.init(e, n ? t + n : t, w, 0, [e]), i.render(1, i), w._pt && fn(1, w)
                } : a.set(e, s);
            return o ? u : function(t) {
                return u(e, s, n ? t + n : t, a, 1)
            }
        },
        isTweening: function(e) {
            return m.getTweensOf(e, !0).length > 0
        },
        defaults: function(e) {
            return e && e.ease && (e.ease = Ut(e.ease, B.ease)), He(B, e || {})
        },
        config: function(e) {
            return He(U, e || {})
        },
        registerEffect: function(e) {
            var t = e.name,
                n = e.effect,
                i = e.plugins,
                r = e.defaults,
                o = e.extendTimeline;
            (i || "").split(",").forEach((function(e) {
                return e && !we[e] && !he[e] && me()
            })), Te[t] = function(e, t, i) {
                return n(ht(e), De(t || {}, r), i)
            }, o && (Xt.prototype[t] = function(e, n, i) {
                return this.add(Te[t](e, ee(n) ? n : (i = n) && {}, this), i)
            })
        },
        registerEase: function(e, t) {
            Nt[e] = Ut(t)
        },
        parseEase: function(e, t) {
            return arguments.length ? Ut(e, t) : Nt
        },
        getById: function(e) {
            return m.getById(e)
        },
        exportRoot: function(e, t) {
            void 0 === e && (e = {});
            var n, i, r = new Xt(e);
            for (r.smoothChildTiming = te(e.smoothChildTiming), m.remove(r), r._dp = 0, r._time = r._tTime = m._time, n = m._first; n;) i = n._next, !t && !n._dur && n instanceof rn && n.vars.onComplete === n._targets[0] || Je(r, n, n._start - n._delay), n = i;
            return Je(m, r, 0), r
        },
        utils: {
            wrap: function e(t, n, i) {
                var r = n - t;
                return re(t) ? yt(t, e(0, t.length), n) : at(i, (function(e) {
                    return (r + (e - t) % r) % r + t
                }))
            },
            wrapYoyo: function e(t, n, i) {
                var r = n - t,
                    o = 2 * r;
                return re(t) ? yt(t, e(0, t.length - 1), n) : at(i, (function(e) {
                    return t + ((e = (o + (e - t) % o) % o || 0) > r ? o - e : e)
                }))
            },
            distribute: pt,
            random: vt,
            snap: gt,
            normalize: function(e, t, n) {
                return bt(e, t, 0, 1, n)
            },
            getUnit: ut,
            clamp: function(e, t, n) {
                return at(n, (function(n) {
                    return st(e, t, n)
                }))
            },
            splitColor: Et,
            toArray: ht,
            mapRange: bt,
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
                    return e(parseFloat(n)) + (t || ut(n))
                }
            },
            interpolate: function e(t, n, i, r) {
                var o = isNaN(t + n) ? 0 : function(e) {
                    return (1 - e) * t + e * n
                };
                if (!o) {
                    var a, s, u, l, c, d = Q(t),
                        h = {};
                    if (!0 === i && (r = 1) && (i = null), d) t = {
                        p: t
                    }, n = {
                        p: n
                    };
                    else if (re(t) && !re(n)) {
                        for (u = [], l = t.length, c = l - 2, s = 1; s < l; s++) u.push(e(t[s - 1], t[s]));
                        l--, o = function(e) {
                            e *= l;
                            var t = Math.min(c, ~~e);
                            return u[t](e - t)
                        }, i = n
                    } else r || (t = $e(re(t) ? [] : {}, t));
                    if (!u) {
                        for (a in n) Kt.call(h, t, a, "get", n[a]);
                        o = function(e) {
                            return fn(e, h) || (d ? t.p : t)
                        }
                    }
                }
                return at(i, o)
            },
            shuffle: ft
        },
        install: pe,
        effects: Te,
        ticker: Lt,
        updateRoot: Xt.updateRoot,
        plugins: we,
        globalTimeline: m,
        core: {
            PropTween: yn,
            globals: ge,
            Tween: rn,
            Timeline: Xt,
            Animation: Gt,
            getCache: Ee,
            _removeLinkedListItem: qe
        }
    };
    Ce("to,from,fromTo,delayedCall,set,killTweensOf", (function(e) {
        return _n[e] = rn[e]
    })), Lt.add(Xt.updateRoot), w = _n.to({}, {
        duration: 0
    });
    var bn = function(e, t) {
            for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;) n = n._next;
            return n
        },
        wn = function(e, t) {
            return {
                name: e,
                rawVars: 1,
                init: function(e, n, i) {
                    i._onInit = function(e) {
                        var i, r;
                        if (Q(n) && (i = {}, Ce(n, (function(e) {
                                return i[e] = 1
                            })), n = i), t) {
                            for (r in i = {}, n) i[r] = t(n[r]);
                            n = i
                        }! function(e, t) {
                            var n, i, r, o = e._targets;
                            for (n in t)
                                for (i = o.length; i--;)(r = e._ptLookup[i][n]) && (r = r.d) && (r._pt && (r = bn(r, n)), r && r.modifier && r.modifier(t[n], e, o[i], n))
                        }(e, n)
                    }
                }
            }
        },
        Tn = _n.registerPlugin({
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
        }, wn("roundProps", mt), wn("modifiers"), wn("snap", gt)) || _n;
    rn.version = Xt.version = Tn.version = "3.4.2", _ = 1, ne() && Rt();
    Nt.Power0, Nt.Power1, Nt.Power2, Nt.Power3, Nt.Power4;
    var kn = Nt.Linear,
        xn = (Nt.Quad, Nt.Cubic, Nt.Quart),
        An = Nt.Quint;
    Nt.Strong, Nt.Elastic, Nt.Back, Nt.SteppedEase, Nt.Bounce, Nt.Sine, Nt.Expo, Nt.Circ;

    function Sn(e) {
        return (Sn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
    var En, On, Cn, Pn, In, Mn, Ln, Rn, Nn = {},
        jn = 180 / Math.PI,
        Dn = Math.PI / 180,
        Fn = Math.atan2,
        $n = /([A-Z])/g,
        Hn = /(?:left|right|width|margin|padding|x)/i,
        Un = /[\s,\(]\S/,
        Bn = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        qn = function(e, t) {
            return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
        },
        zn = function(e, t) {
            return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
        },
        Vn = function(e, t) {
            return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t)
        },
        Wn = function(e, t) {
            var n = t.s + t.c * e;
            t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t)
        },
        Gn = function(e, t) {
            return t.set(t.t, t.p, e ? t.e : t.b, t)
        },
        Xn = function(e, t) {
            return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t)
        },
        Yn = function(e, t, n) {
            return e.style[t] = n
        },
        Qn = function(e, t, n) {
            return e.style.setProperty(t, n)
        },
        Kn = function(e, t, n) {
            return e._gsap[t] = n
        },
        Zn = function(e, t, n) {
            return e._gsap.scaleX = e._gsap.scaleY = n
        },
        Jn = function(e, t, n, i, r) {
            var o = e._gsap;
            o.scaleX = o.scaleY = n, o.renderTransform(r, o)
        },
        ei = function(e, t, n, i, r) {
            var o = e._gsap;
            o[t] = n, o.renderTransform(r, o)
        },
        ti = "transform",
        ni = ti + "Origin",
        ii = function(e, t) {
            var n = On.createElementNS ? On.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : On.createElement(e);
            return n.style ? n : On.createElement(e)
        },
        ri = function e(t, n, i) {
            var r = getComputedStyle(t);
            return r[n] || r.getPropertyValue(n.replace($n, "-$1").toLowerCase()) || r.getPropertyValue(n) || !i && e(t, ai(n) || n, 1) || ""
        },
        oi = "O,Moz,ms,Ms,Webkit".split(","),
        ai = function(e, t, n) {
            var i = (t || In).style,
                r = 5;
            if (e in i && !n) return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1); r-- && !(oi[r] + e in i););
            return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? oi[r] : "") + e
        },
        si = function() {
            "undefined" != typeof window && window.document && (En = window, On = En.document, Cn = On.documentElement, In = ii("div") || {
                style: {}
            }, Mn = ii("div"), ti = ai(ti), ni = ti + "Origin", In.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Rn = !!ai("perspective"), Pn = 1)
        },
        ui = function e(t) {
            var n, i = ii("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                r = this.parentNode,
                o = this.nextSibling,
                a = this.style.cssText;
            if (Cn.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                n = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e
            } catch (e) {} else this._gsapBBox && (n = this._gsapBBox());
            return r && (o ? r.insertBefore(this, o) : r.appendChild(this)), Cn.removeChild(i), this.style.cssText = a, n
        },
        li = function(e, t) {
            for (var n = t.length; n--;)
                if (e.hasAttribute(t[n])) return e.getAttribute(t[n])
        },
        ci = function(e) {
            var t;
            try {
                t = e.getBBox()
            } catch (n) {
                t = ui.call(e, !0)
            }
            return t && (t.width || t.height) || e.getBBox === ui || (t = ui.call(e, !0)), !t || t.width || t.x || t.y ? t : {
                x: +li(e, ["x", "cx", "x1"]) || 0,
                y: +li(e, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            }
        },
        di = function(e) {
            return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !ci(e))
        },
        hi = function(e, t) {
            if (t) {
                var n = e.style;
                t in Nn && t !== ni && (t = ti), n.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), n.removeProperty(t.replace($n, "-$1").toLowerCase())) : n.removeAttribute(t)
            }
        },
        fi = function(e, t, n, i, r, o) {
            var a = new yn(e._pt, t, n, 0, 1, o ? Xn : Gn);
            return e._pt = a, a.b = i, a.e = r, e._props.push(n), a
        },
        pi = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        mi = function e(t, n, i, r) {
            var o, a, s, u, l = parseFloat(i) || 0,
                c = (i + "").trim().substr((l + "").length) || "px",
                d = In.style,
                h = Hn.test(n),
                f = "svg" === t.tagName.toLowerCase(),
                p = (f ? "client" : "offset") + (h ? "Width" : "Height"),
                m = "px" === r,
                g = "%" === r;
            return r === c || !l || pi[r] || pi[c] ? l : ("px" !== c && !m && (l = e(t, n, i, "px")), u = t.getCTM && di(t), g && (Nn[n] || ~n.indexOf("adius")) ? Pe(l / (u ? t.getBBox()[h ? "width" : "height"] : t[p]) * 100) : (d[h ? "width" : "height"] = 100 + (m ? c : r), a = ~n.indexOf("adius") || "em" === r && t.appendChild && !f ? t : t.parentNode, u && (a = (t.ownerSVGElement || {}).parentNode), a && a !== On && a.appendChild || (a = On.body), (s = a._gsap) && g && s.width && h && s.time === Lt.time ? Pe(l / s.width * 100) : ((g || "%" === c) && (d.position = ri(t, "position")), a === t && (d.position = "static"), a.appendChild(In), o = In[p], a.removeChild(In), d.position = "absolute", h && g && ((s = Ee(a)).time = Lt.time, s.width = a[p]), Pe(m ? o * l / 100 : o && l ? 100 / o * l : 0))))
        },
        gi = function(e, t, n, i) {
            var r;
            return Pn || si(), t in Bn && "transform" !== t && ~(t = Bn[t]).indexOf(",") && (t = t.split(",")[0]), Nn[t] && "transform" !== t ? (r = Oi(e, i), r = "transformOrigin" !== t ? r[t] : Ci(ri(e, ni)) + " " + r.zOrigin + "px") : (!(r = e.style[t]) || "auto" === r || i || ~(r + "").indexOf("calc(")) && (r = wi[t] && wi[t](e, t, n) || ri(e, t) || Oe(e, t) || ("opacity" === t ? 1 : 0)), n && !~(r + "").indexOf(" ") ? mi(e, t, r, n) + n : r
        },
        vi = function(e, t, n, i) {
            if (!n || "none" === n) {
                var r = ai(t, e, 1),
                    o = r && ri(e, r, 1);
                o && o !== n ? (t = r, n = o) : "borderColor" === t && (n = ri(e, "borderTopColor"))
            }
            var a, s, u, l, c, d, h, f, p, m, g, v, y = new yn(this._pt, e.style, t, 0, 1, hn),
                _ = 0,
                b = 0;
            if (y.b = n, y.e = i, n += "", "auto" === (i += "") && (e.style[t] = i, i = ri(e, t) || i, e.style[t] = n), Mt(a = [n, i]), i = a[1], u = (n = a[0]).match(se) || [], (i.match(se) || []).length) {
                for (; s = se.exec(i);) h = s[0], p = i.substring(_, s.index), c ? c = (c + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (c = 1), h !== (d = u[b++] || "") && (l = parseFloat(d) || 0, g = d.substr((l + "").length), (v = "=" === h.charAt(1) ? +(h.charAt(0) + "1") : 0) && (h = h.substr(2)), f = parseFloat(h), m = h.substr((f + "").length), _ = se.lastIndex - m.length, m || (m = m || U.units[t] || g, _ === i.length && (i += m, y.e += m)), g !== m && (l = mi(e, t, d, m) || 0), y._pt = {
                    _next: y._pt,
                    p: p || 1 === b ? p : ",",
                    s: l,
                    c: v ? v * f : f - l,
                    m: c && c < 4 ? Math.round : 0
                });
                y.c = _ < i.length ? i.substring(_, i.length) : ""
            } else y.r = "display" === t && "none" === i ? Xn : Gn;
            return ce.test(i) && (y.e = 0), this._pt = y, y
        },
        yi = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        _i = function(e) {
            var t = e.split(" "),
                n = t[0],
                i = t[1] || "50%";
            return "top" !== n && "bottom" !== n && "left" !== i && "right" !== i || (e = n, n = i, i = e), t[0] = yi[n] || n, t[1] = yi[i] || i, t.join(" ")
        },
        bi = function(e, t) {
            if (t.tween && t.tween._time === t.tween._dur) {
                var n, i, r, o = t.t,
                    a = o.style,
                    s = t.u,
                    u = o._gsap;
                if ("all" === s || !0 === s) a.cssText = "", i = 1;
                else
                    for (r = (s = s.split(",")).length; --r > -1;) n = s[r], Nn[n] && (i = 1, n = "transformOrigin" === n ? ni : ti), hi(o, n);
                i && (hi(o, ti), u && (u.svg && o.removeAttribute("transform"), Oi(o, 1), u.uncache = 1))
            }
        },
        wi = {
            clearProps: function(e, t, n, i, r) {
                if ("isFromStart" !== r.data) {
                    var o = e._pt = new yn(e._pt, t, n, 0, 0, bi);
                    return o.u = i, o.pr = -10, o.tween = r, e._props.push(n), 1
                }
            }
        },
        Ti = [1, 0, 0, 1, 0, 0],
        ki = {},
        xi = function(e) {
            return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e
        },
        Ai = function(e) {
            var t = ri(e, ti);
            return xi(t) ? Ti : t.substr(7).match(ae).map(Pe)
        },
        Si = function(e, t) {
            var n, i, r, o, a = e._gsap || Ee(e),
                s = e.style,
                u = Ai(e);
            return a.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(r = e.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",") ? Ti : u : (u !== Ti || e.offsetParent || e === Cn || a.svg || (r = s.display, s.display = "block", (n = e.parentNode) && e.offsetParent || (o = 1, i = e.nextSibling, Cn.appendChild(e)), u = Ai(e), r ? s.display = r : hi(e, "display"), o && (i ? n.insertBefore(e, i) : n ? n.appendChild(e) : Cn.removeChild(e))), t && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
        },
        Ei = function(e, t, n, i, r, o) {
            var a, s, u, l = e._gsap,
                c = r || Si(e, !0),
                d = l.xOrigin || 0,
                h = l.yOrigin || 0,
                f = l.xOffset || 0,
                p = l.yOffset || 0,
                m = c[0],
                g = c[1],
                v = c[2],
                y = c[3],
                _ = c[4],
                b = c[5],
                w = t.split(" "),
                T = parseFloat(w[0]) || 0,
                k = parseFloat(w[1]) || 0;
            n ? c !== Ti && (s = m * y - g * v) && (u = T * (-g / s) + k * (m / s) - (m * b - g * _) / s, T = T * (y / s) + k * (-v / s) + (v * b - y * _) / s, k = u) : (T = (a = ci(e)).x + (~w[0].indexOf("%") ? T / 100 * a.width : T), k = a.y + (~(w[1] || w[0]).indexOf("%") ? k / 100 * a.height : k)), i || !1 !== i && l.smooth ? (_ = T - d, b = k - h, l.xOffset = f + (_ * m + b * v) - _, l.yOffset = p + (_ * g + b * y) - b) : l.xOffset = l.yOffset = 0, l.xOrigin = T, l.yOrigin = k, l.smooth = !!i, l.origin = t, l.originIsAbsolute = !!n, e.style[ni] = "0px 0px", o && (fi(o, l, "xOrigin", d, T), fi(o, l, "yOrigin", h, k), fi(o, l, "xOffset", f, l.xOffset), fi(o, l, "yOffset", p, l.yOffset)), e.setAttribute("data-svg-origin", T + " " + k)
        },
        Oi = function(e, t) {
            var n = e._gsap || new Wt(e);
            if ("x" in n && !t && !n.uncache) return n;
            var i, r, o, a, s, u, l, c, d, h, f, p, m, g, v, y, _, b, w, T, k, x, A, S, E, O, C, P, I, M, L, R, N = e.style,
                j = n.scaleX < 0,
                D = ri(e, ni) || "0";
            return i = r = o = u = l = c = d = h = f = 0, a = s = 1, n.svg = !(!e.getCTM || !di(e)), g = Si(e, n.svg), n.svg && (S = !n.uncache && e.getAttribute("data-svg-origin"), Ei(e, S || D, !!S || n.originIsAbsolute, !1 !== n.smooth, g)), p = n.xOrigin || 0, m = n.yOrigin || 0, g !== Ti && (b = g[0], w = g[1], T = g[2], k = g[3], i = x = g[4], r = A = g[5], 6 === g.length ? (a = Math.sqrt(b * b + w * w), s = Math.sqrt(k * k + T * T), u = b || w ? Fn(w, b) * jn : 0, (d = T || k ? Fn(T, k) * jn + u : 0) && (s *= Math.cos(d * Dn)), n.svg && (i -= p - (p * b + m * T), r -= m - (p * w + m * k))) : (R = g[6], M = g[7], C = g[8], P = g[9], I = g[10], L = g[11], i = g[12], r = g[13], o = g[14], l = (v = Fn(R, I)) * jn, v && (S = x * (y = Math.cos(-v)) + C * (_ = Math.sin(-v)), E = A * y + P * _, O = R * y + I * _, C = x * -_ + C * y, P = A * -_ + P * y, I = R * -_ + I * y, L = M * -_ + L * y, x = S, A = E, R = O), c = (v = Fn(-T, I)) * jn, v && (y = Math.cos(-v), L = k * (_ = Math.sin(-v)) + L * y, b = S = b * y - C * _, w = E = w * y - P * _, T = O = T * y - I * _), u = (v = Fn(w, b)) * jn, v && (S = b * (y = Math.cos(v)) + w * (_ = Math.sin(v)), E = x * y + A * _, w = w * y - b * _, A = A * y - x * _, b = S, x = E), l && Math.abs(l) + Math.abs(u) > 359.9 && (l = u = 0, c = 180 - c), a = Pe(Math.sqrt(b * b + w * w + T * T)), s = Pe(Math.sqrt(A * A + R * R)), v = Fn(x, A), d = Math.abs(v) > 2e-4 ? v * jn : 0, f = L ? 1 / (L < 0 ? -L : L) : 0), n.svg && (S = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !xi(ri(e, ti)), S && e.setAttribute("transform", S))), Math.abs(d) > 90 && Math.abs(d) < 270 && (j ? (a *= -1, d += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (s *= -1, d += d <= 0 ? 180 : -180)), n.x = ((n.xPercent = i && Math.round(e.offsetWidth / 2) === Math.round(-i) ? -50 : 0) ? 0 : i) + "px", n.y = ((n.yPercent = r && Math.round(e.offsetHeight / 2) === Math.round(-r) ? -50 : 0) ? 0 : r) + "px", n.z = o + "px", n.scaleX = Pe(a), n.scaleY = Pe(s), n.rotation = Pe(u) + "deg", n.rotationX = Pe(l) + "deg", n.rotationY = Pe(c) + "deg", n.skewX = d + "deg", n.skewY = h + "deg", n.transformPerspective = f + "px", (n.zOrigin = parseFloat(D.split(" ")[2]) || 0) && (N[ni] = Ci(D)), n.xOffset = n.yOffset = 0, n.force3D = U.force3D, n.renderTransform = n.svg ? Li : Rn ? Mi : Ii, n.uncache = 0, n
        },
        Ci = function(e) {
            return (e = e.split(" "))[0] + " " + e[1]
        },
        Pi = function(e, t, n) {
            var i = ut(t);
            return Pe(parseFloat(t) + parseFloat(mi(e, "x", n + "px", i))) + i
        },
        Ii = function(e, t) {
            t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Mi(e, t)
        },
        Mi = function(e, t) {
            var n = t || this,
                i = n.xPercent,
                r = n.yPercent,
                o = n.x,
                a = n.y,
                s = n.z,
                u = n.rotation,
                l = n.rotationY,
                c = n.rotationX,
                d = n.skewX,
                h = n.skewY,
                f = n.scaleX,
                p = n.scaleY,
                m = n.transformPerspective,
                g = n.force3D,
                v = n.target,
                y = n.zOrigin,
                _ = "",
                b = "auto" === g && e && 1 !== e || !0 === g;
            if (y && ("0deg" !== c || "0deg" !== l)) {
                var w, T = parseFloat(l) * Dn,
                    k = Math.sin(T),
                    x = Math.cos(T);
                T = parseFloat(c) * Dn, w = Math.cos(T), o = Pi(v, o, k * w * -y), a = Pi(v, a, -Math.sin(T) * -y), s = Pi(v, s, x * w * -y + y)
            }
            "0px" !== m && (_ += "perspective(" + m + ") "), (i || r) && (_ += "translate(" + i + "%, " + r + "%) "), (b || "0px" !== o || "0px" !== a || "0px" !== s) && (_ += "0px" !== s || b ? "translate3d(" + o + ", " + a + ", " + s + ") " : "translate(" + o + ", " + a + ") "), "0deg" !== u && (_ += "rotate(" + u + ") "), "0deg" !== l && (_ += "rotateY(" + l + ") "), "0deg" !== c && (_ += "rotateX(" + c + ") "), "0deg" === d && "0deg" === h || (_ += "skew(" + d + ", " + h + ") "), 1 === f && 1 === p || (_ += "scale(" + f + ", " + p + ") "), v.style[ti] = _ || "translate(0, 0)"
        },
        Li = function(e, t) {
            var n, i, r, o, a, s = t || this,
                u = s.xPercent,
                l = s.yPercent,
                c = s.x,
                d = s.y,
                h = s.rotation,
                f = s.skewX,
                p = s.skewY,
                m = s.scaleX,
                g = s.scaleY,
                v = s.target,
                y = s.xOrigin,
                _ = s.yOrigin,
                b = s.xOffset,
                w = s.yOffset,
                T = s.forceCSS,
                k = parseFloat(c),
                x = parseFloat(d);
            h = parseFloat(h), f = parseFloat(f), (p = parseFloat(p)) && (f += p = parseFloat(p), h += p), h || f ? (h *= Dn, f *= Dn, n = Math.cos(h) * m, i = Math.sin(h) * m, r = Math.sin(h - f) * -g, o = Math.cos(h - f) * g, f && (p *= Dn, a = Math.tan(f - p), r *= a = Math.sqrt(1 + a * a), o *= a, p && (a = Math.tan(p), n *= a = Math.sqrt(1 + a * a), i *= a)), n = Pe(n), i = Pe(i), r = Pe(r), o = Pe(o)) : (n = m, o = g, i = r = 0), (k && !~(c + "").indexOf("px") || x && !~(d + "").indexOf("px")) && (k = mi(v, "x", c, "px"), x = mi(v, "y", d, "px")), (y || _ || b || w) && (k = Pe(k + y - (y * n + _ * r) + b), x = Pe(x + _ - (y * i + _ * o) + w)), (u || l) && (a = v.getBBox(), k = Pe(k + u / 100 * a.width), x = Pe(x + l / 100 * a.height)), a = "matrix(" + n + "," + i + "," + r + "," + o + "," + k + "," + x + ")", v.setAttribute("transform", a), T && (v.style[ti] = a)
        },
        Ri = function(e, t, n, i, r, o) {
            var a, s, u = Q(r),
                l = parseFloat(r) * (u && ~r.indexOf("rad") ? jn : 1),
                c = o ? l * o : l - i,
                d = i + c + "deg";
            return u && ("short" === (a = r.split("_")[1]) && (c %= 360) !== c % 180 && (c += c < 0 ? 360 : -360), "cw" === a && c < 0 ? c = (c + 36e9) % 360 - 360 * ~~(c / 360) : "ccw" === a && c > 0 && (c = (c - 36e9) % 360 - 360 * ~~(c / 360))), e._pt = s = new yn(e._pt, t, n, i, c, zn), s.e = d, s.u = "deg", e._props.push(n), s
        },
        Ni = function(e, t, n) {
            var i, r, o, a, s, u, l, c = Mn.style,
                d = n._gsap;
            for (r in c.cssText = getComputedStyle(n).cssText + ";position:absolute;display:block;", c[ti] = t, On.body.appendChild(Mn), i = Oi(Mn, 1), Nn)(o = d[r]) !== (a = i[r]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (s = ut(o) !== (l = ut(a)) ? mi(n, r, o, l) : parseFloat(o), u = parseFloat(a), e._pt = new yn(e._pt, d, r, s, u - s, qn), e._pt.u = l || 0, e._props.push(r));
            On.body.removeChild(Mn)
        };
    Ce("padding,margin,Width,Radius", (function(e, t) {
        var n = "Top",
            i = "Right",
            r = "Bottom",
            o = "Left",
            a = (t < 3 ? [n, i, r, o] : [n + o, n + i, r + i, r + o]).map((function(n) {
                return t < 2 ? e + n : "border" + n + e
            }));
        wi[t > 1 ? "border" + e : e] = function(e, t, n, i, r) {
            var o, s;
            if (arguments.length < 4) return o = a.map((function(t) {
                return gi(e, t, n)
            })), 5 === (s = o.join(" ")).split(o[0]).length ? o[0] : s;
            o = (i + "").split(" "), s = {}, a.forEach((function(e, t) {
                return s[e] = o[t] = o[t] || o[(t - 1) / 2 | 0]
            })), e.init(t, s, r)
        }
    }));
    var ji, Di, Fi = {
        name: "css",
        register: si,
        targetTest: function(e) {
            return e.style && e.nodeType
        },
        init: function(e, t, n, i, r) {
            var o, a, s, u, l, c, d, h, f, p, m, g, v, y, _, b = this._props,
                w = e.style;
            for (d in Pn || si(), t)
                if ("autoRound" !== d && (a = t[d], !we[d] || !Zt(d, t, n, i, e, r)))
                    if (l = Sn(a), c = wi[d], "function" === l && (l = Sn(a = a.call(n, i, e, r))), "string" === l && ~a.indexOf("random(") && (a = _t(a)), c) c(this, e, d, a, n) && (_ = 1);
                    else if ("--" === d.substr(0, 2)) this.add(w, "setProperty", getComputedStyle(e).getPropertyValue(d) + "", a + "", i, r, 0, 0, d);
            else {
                if (o = gi(e, d), u = parseFloat(o), (p = "string" === l && "=" === a.charAt(1) ? +(a.charAt(0) + "1") : 0) && (a = a.substr(2)), s = parseFloat(a), d in Bn && ("autoAlpha" === d && (1 === u && "hidden" === gi(e, "visibility") && s && (u = 0), fi(this, w, "visibility", u ? "inherit" : "hidden", s ? "inherit" : "hidden", !s)), "scale" !== d && "transform" !== d && ~(d = Bn[d]).indexOf(",") && (d = d.split(",")[0])), m = d in Nn)
                    if (g || ((v = e._gsap).renderTransform || Oi(e), y = !1 !== t.smoothOrigin && v.smooth, (g = this._pt = new yn(this._pt, w, ti, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), "scale" === d) this._pt = new yn(this._pt, v, "scaleY", v.scaleY, p ? p * s : s - v.scaleY), b.push("scaleY", d), d += "X";
                    else {
                        if ("transformOrigin" === d) {
                            a = _i(a), v.svg ? Ei(e, a, 0, y, 0, this) : ((f = parseFloat(a.split(" ")[2]) || 0) !== v.zOrigin && fi(this, v, "zOrigin", v.zOrigin, f), fi(this, w, d, Ci(o), Ci(a)));
                            continue
                        }
                        if ("svgOrigin" === d) {
                            Ei(e, a, 1, y, 0, this);
                            continue
                        }
                        if (d in ki) {
                            Ri(this, v, d, u, a, p);
                            continue
                        }
                        if ("smoothOrigin" === d) {
                            fi(this, v, "smooth", v.smooth, a);
                            continue
                        }
                        if ("force3D" === d) {
                            v[d] = a;
                            continue
                        }
                        if ("transform" === d) {
                            Ni(this, a, e);
                            continue
                        }
                    }
                else d in w || (d = ai(d) || d);
                if (m || (s || 0 === s) && (u || 0 === u) && !Un.test(a) && d in w) s || (s = 0), (h = (o + "").substr((u + "").length)) !== (f = (a + "").substr((s + "").length) || (d in U.units ? U.units[d] : h)) && (u = mi(e, d, o, f)), this._pt = new yn(this._pt, m ? v : w, d, u, p ? p * s : s - u, "px" !== f || !1 === t.autoRound || m ? qn : Wn), this._pt.u = f || 0, h !== f && (this._pt.b = o, this._pt.r = Vn);
                else if (d in w) vi.call(this, e, d, o, a);
                else {
                    if (!(d in e)) continue;
                    this.add(e, d, e[d], a, i, r)
                }
                b.push(d)
            }
            _ && vn(this)
        },
        get: gi,
        aliases: Bn,
        getSetter: function(e, t, n) {
            var i = Bn[t];
            return i && i.indexOf(",") < 0 && (t = i), t in Nn && t !== ni && (e._gsap.x || gi(e, "x")) ? n && Ln === n ? "scale" === t ? Zn : Kn : (Ln = n || {}) && ("scale" === t ? Jn : ei) : e.style && !J(e.style[t]) ? Yn : ~t.indexOf("-") ? Qn : ln(e, t)
        },
        core: {
            _removeProperty: hi,
            _getMatrix: Si
        }
    };
    Tn.utils.checkPrefix = ai, Di = Ce("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (ji = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(e) {
        Nn[e] = 1
    })), Ce(ji, (function(e) {
        U.units[e] = "deg", ki[e] = 1
    })), Bn[Di[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + ji, Ce("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(e) {
        var t = e.split(":");
        Bn[t[1]] = Di[t[0]]
    })), Ce("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(e) {
        U.units[e] = "px"
    })), Tn.registerPlugin(Fi);
    var $i, Hi, Ui, Bi, qi = Tn.registerPlugin(Fi) || Tn,
        zi = (qi.core.Tween, function() {
            return "undefined" != typeof window
        }),
        Vi = function() {
            return $i || zi() && ($i = window.gsap) && $i.registerPlugin && $i
        },
        Wi = function() {
            return Hi || Gi(), Hi
        },
        Gi = function(e) {
            $i = e || Vi(), zi() && (window, Ui = document), $i && (Bi = $i.plugins.css) && (Hi = 1)
        },
        Xi = {
            version: "3.4.2",
            name: "cssRule",
            init: function(e, t, n, i, r) {
                if (!Wi() || void 0 === e.cssText) return !1;
                var o = e._gsProxy = e._gsProxy || Ui.createElement("div");
                this.ss = e, this.style = o.style, o.style.cssText = e.cssText, Bi.prototype.init.call(this, o, t, n, i, r)
            },
            render: function(e, t) {
                for (var n, i = t._pt, r = t.style, o = t.ss; i;) i.r(e, i.d), i = i._next;
                for (n = r.length; --n > -1;) o[r[n]] = r[r[n]]
            },
            getRule: function(e) {
                Wi();
                var t, n, i, r, o = Ui.all ? "rules" : "cssRules",
                    a = Ui.styleSheets,
                    s = a.length,
                    u = ":" === e.charAt(0);
                for (e = (u ? "" : ",") + e.split("::").join(":").toLowerCase() + ",", u && (r = []); s--;) {
                    try {
                        if (!(n = a[s][o])) continue;
                        t = n.length
                    } catch (e) {
                        continue
                    }
                    for (; --t > -1;)
                        if ((i = n[t]).selectorText && -1 !== ("," + i.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(e)) {
                            if (!u) return i.style;
                            r.push(i.style)
                        }
                }
                return r
            },
            register: Gi
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
    Vi() && $i.registerPlugin(Xi);
    var Yi = n(1),
        Qi = n.n(Yi),
        Ki = true,
        Zi = document.querySelector("#app"),
        Ji = false;

    function er() {
        Ki = true, 
        $("#btnLayerNext").removeClass("blink")
    }

    function tr() {
        Ki = false
    }
    $("#showCaseInfo ul li a").on("click", (function(e) {
        e.preventDefault();
        var t = $(this).attr("href");
        $("#showCaseInfo").removeClass("is-active"), $(".visual-block").attr("style", ""), "__#event" == t ? $("#eventLayer").addClass("is-active") : (l_(!1), tr(), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PAGE", {
            detail: t
        })))
    }));
    var nr = null,
        ir = $("#btnLayerNext");

    function rr(e) {
        "active" == e.attr("data-status") && (clearTimeout(nr), 
        nr = null, 
        $("#btnLayerNext").removeClass("blink"), 
        nr = setTimeout((function() { $("#btnLayerNext").addClass("blink") }), 10))
    }

    function appProgressBar_play(e) { qi.set("#app .app-progress-bar", { scaleX: e }) }
    function appProgressBar_reset() { qi.set("#app .app-progress-bar", { scaleX: 0 }) }

    ir.on("animationend", (function() { ir.removeClass("blink") })), 
    qi.set("#app .app-progress-bar", { scaleX: 0 }), 

    appProgressBar_reset();
    var sr, ur, lr = !1;

    function cr(e) {
        lr && function() {
            sr && (clearTimeout(sr), sr = null);
            var e = $('.page[data-status="active"]'),
                t = e.attr("data-duration") && e.attr("data-duration") > 0 ? e.attr("data-duration") : 4e3;
            sr = setTimeout((function() {
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
            }), t)
        }()
    }
    var dr = 0;

    function hr(e) {
        qi.set("#cover .back", {
            height: 0
        }), 
        qi.set("#cover .back.b1", {
            height: "100%"
        }), qi.set("#cover .slogan span", {
            alpha: 0,
            y: "-1vh"
        }), qi.set("#cover .showcase span", {
            alpha: 0,
            y: "-1vh"
        }), qi.set("#cover .title span", {
            alpha: 0,
            y: "-1vh"
        }), ur && (clearInterval(ur), ur = null)
    }

    function fr(e) {
        qi.killTweensOf("#cover .back"), qi.killTweensOf("#cover .showcase span"), qi.killTweensOf("#cover .slogan span"), qi.killTweensOf("#cover .title span")
    }

    function pr(e) {
        var t = new Xt({
            onComplete: yr,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to("#cover .showcase span", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, .2), 
        t.to("#cover .title span", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, .6), 
        t.to("#cover .slogan span", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, 1), 
        dr = 0, 
        ur = setInterval(mr, 2200)
    }

    function mr() {
        ++dr == $("#cover .rolling-bg .back").length && (dr = 0);
        var e = dr + 1;
        qi.fromTo("#cover .rolling-bg .b" + e, { height: "0%", zIndex: 2 }, { height: "100%", duration: 1, ease: An.easeInOut }), 
        qi.set("#cover .rolling-bg .back:not(.b" + e + ")", { height: "100%", zIndex: 1 })
    }

    function gr(e) { return !0 }
    function vr(e) { return !0 }

    function yr() {
        "active" == $(".page#cover").attr("data-status") && (rr($(".page#cover")), cr())
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
    var _r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function br(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var wr = function(e) {
            return e && e.Math == Math && e
        },
        Tr = wr("object" == typeof globalThis && globalThis) || wr("object" == typeof window && window) || wr("object" == typeof self && self) || wr("object" == typeof _r && _r) || Function("return this")(),
        kr = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        },
        xr = !kr((function() {
            return 7 != Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })),
        Ar = {}.propertyIsEnumerable,
        Sr = Object.getOwnPropertyDescriptor,
        Er = {
            f: Sr && !Ar.call({
                1: 2
            }, 1) ? function(e) {
                var t = Sr(this, e);
                return !!t && t.enumerable
            } : Ar
        },
        Or = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        Cr = {}.toString,
        Pr = function(e) {
            return Cr.call(e).slice(8, -1)
        },
        Ir = "".split,
        Mr = kr((function() {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function(e) {
            return "String" == Pr(e) ? Ir.call(e, "") : Object(e)
        } : Object,
        Lr = function(e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e
        },
        Rr = function(e) {
            return Mr(Lr(e))
        },
        Nr = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        jr = function(e, t) {
            if (!Nr(e)) return e;
            var n, i;
            if (t && "function" == typeof(n = e.toString) && !Nr(i = n.call(e))) return i;
            if ("function" == typeof(n = e.valueOf) && !Nr(i = n.call(e))) return i;
            if (!t && "function" == typeof(n = e.toString) && !Nr(i = n.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        },
        Dr = {}.hasOwnProperty,
        Fr = function(e, t) {
            return Dr.call(e, t)
        },
        $r = Tr.document,
        Hr = Nr($r) && Nr($r.createElement),
        Ur = function(e) {
            return Hr ? $r.createElement(e) : {}
        },
        Br = !xr && !kr((function() {
            return 7 != Object.defineProperty(Ur("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })),
        qr = Object.getOwnPropertyDescriptor,
        zr = {
            f: xr ? qr : function(e, t) {
                if (e = Rr(e), t = jr(t, !0), Br) try {
                    return qr(e, t)
                } catch (e) {}
                if (Fr(e, t)) return Or(!Er.f.call(e, t), e[t])
            }
        },
        Vr = function(e) {
            if (!Nr(e)) throw TypeError(String(e) + " is not an object");
            return e
        },
        Wr = Object.defineProperty,
        Gr = {
            f: xr ? Wr : function(e, t, n) {
                if (Vr(e), t = jr(t, !0), Vr(n), Br) try {
                    return Wr(e, t, n)
                } catch (e) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
                return "value" in n && (e[t] = n.value), e
            }
        },
        Xr = xr ? function(e, t, n) {
            return Gr.f(e, t, Or(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        },
        Yr = function(e, t) {
            try {
                Xr(Tr, e, t)
            } catch (n) {
                Tr[e] = t
            }
            return t
        },
        Qr = Tr["__core-js_shared__"] || Yr("__core-js_shared__", {}),
        Kr = Function.toString;
    "function" != typeof Qr.inspectSource && (Qr.inspectSource = function(e) {
        return Kr.call(e)
    });
    var Zr, Jr, eo, to = Qr.inspectSource,
        no = Tr.WeakMap,
        io = "function" == typeof no && /native code/.test(to(no)),
        ro = br((function(e) {
            (e.exports = function(e, t) {
                return Qr[e] || (Qr[e] = void 0 !== t ? t : {})
            })("versions", []).push({
                version: "3.6.5",
                mode: "global",
                copyright: "Â© 2020 Denis Pushkarev (zloirock.ru)"
            })
        })),
        oo = 0,
        ao = Math.random(),
        so = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++oo + ao).toString(36)
        },
        uo = ro("keys"),
        lo = function(e) {
            return uo[e] || (uo[e] = so(e))
        },
        co = {},
        ho = Tr.WeakMap;
    if (io) {
        var fo = new ho,
            po = fo.get,
            mo = fo.has,
            go = fo.set;
        Zr = function(e, t) {
            return go.call(fo, e, t), t
        }, Jr = function(e) {
            return po.call(fo, e) || {}
        }, eo = function(e) {
            return mo.call(fo, e)
        }
    } else {
        var vo = lo("state");
        co[vo] = !0, Zr = function(e, t) {
            return Xr(e, vo, t), t
        }, Jr = function(e) {
            return Fr(e, vo) ? e[vo] : {}
        }, eo = function(e) {
            return Fr(e, vo)
        }
    }
    var yo, _o = {
            set: Zr,
            get: Jr,
            has: eo,
            enforce: function(e) {
                return eo(e) ? Jr(e) : Zr(e, {})
            },
            getterFor: function(e) {
                return function(t) {
                    var n;
                    if (!Nr(t) || (n = Jr(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        },
        bo = br((function(e) {
            var t = _o.get,
                n = _o.enforce,
                i = String(String).split("String");
            (e.exports = function(e, t, r, o) {
                var a = !!o && !!o.unsafe,
                    s = !!o && !!o.enumerable,
                    u = !!o && !!o.noTargetGet;
                "function" == typeof r && ("string" != typeof t || Fr(r, "name") || Xr(r, "name", t), n(r).source = i.join("string" == typeof t ? t : "")), e !== Tr ? (a ? !u && e[t] && (s = !0) : delete e[t], s ? e[t] = r : Xr(e, t, r)) : s ? e[t] = r : Yr(t, r)
            })(Function.prototype, "toString", (function() {
                return "function" == typeof this && t(this).source || to(this)
            }))
        })),
        wo = Tr,
        To = function(e) {
            return "function" == typeof e ? e : void 0
        },
        ko = function(e, t) {
            return arguments.length < 2 ? To(wo[e]) || To(Tr[e]) : wo[e] && wo[e][t] || Tr[e] && Tr[e][t]
        },
        xo = Math.ceil,
        Ao = Math.floor,
        So = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? Ao : xo)(e)
        },
        Eo = Math.min,
        Oo = function(e) {
            return e > 0 ? Eo(So(e), 9007199254740991) : 0
        },
        Co = Math.max,
        Po = Math.min,
        Io = function(e, t) {
            var n = So(e);
            return n < 0 ? Co(n + t, 0) : Po(n, t)
        },
        Mo = function(e) {
            return function(t, n, i) {
                var r, o = Rr(t),
                    a = Oo(o.length),
                    s = Io(i, a);
                if (e && n != n) {
                    for (; a > s;)
                        if ((r = o[s++]) != r) return !0
                } else
                    for (; a > s; s++)
                        if ((e || s in o) && o[s] === n) return e || s || 0;
                return !e && -1
            }
        },
        Lo = {
            includes: Mo(!0),
            indexOf: Mo(!1)
        },
        Ro = Lo.indexOf,
        No = function(e, t) {
            var n, i = Rr(e),
                r = 0,
                o = [];
            for (n in i) !Fr(co, n) && Fr(i, n) && o.push(n);
            for (; t.length > r;) Fr(i, n = t[r++]) && (~Ro(o, n) || o.push(n));
            return o
        },
        jo = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        Do = jo.concat("length", "prototype"),
        Fo = {
            f: Object.getOwnPropertyNames || function(e) {
                return No(e, Do)
            }
        },
        $o = {
            f: Object.getOwnPropertySymbols
        },
        Ho = ko("Reflect", "ownKeys") || function(e) {
            var t = Fo.f(Vr(e)),
                n = $o.f;
            return n ? t.concat(n(e)) : t
        },
        Uo = function(e, t) {
            for (var n = Ho(t), i = Gr.f, r = zr.f, o = 0; o < n.length; o++) {
                var a = n[o];
                Fr(e, a) || i(e, a, r(t, a))
            }
        },
        Bo = /#|\.prototype\./,
        qo = function(e, t) {
            var n = Vo[zo(e)];
            return n == Go || n != Wo && ("function" == typeof t ? kr(t) : !!t)
        },
        zo = qo.normalize = function(e) {
            return String(e).replace(Bo, ".").toLowerCase()
        },
        Vo = qo.data = {},
        Wo = qo.NATIVE = "N",
        Go = qo.POLYFILL = "P",
        Xo = qo,
        Yo = zr.f,
        Qo = function(e, t) {
            var n, i, r, o, a, s = e.target,
                u = e.global,
                l = e.stat;
            if (n = u ? Tr : l ? Tr[s] || Yr(s, {}) : (Tr[s] || {}).prototype)
                for (i in t) {
                    if (o = t[i], r = e.noTargetGet ? (a = Yo(n, i)) && a.value : n[i], !Xo(u ? i : s + (l ? "." : "#") + i, e.forced) && void 0 !== r) {
                        if (typeof o == typeof r) continue;
                        Uo(o, r)
                    }(e.sham || r && r.sham) && Xr(o, "sham", !0), bo(n, i, o, e)
                }
        },
        Ko = !!Object.getOwnPropertySymbols && !kr((function() {
            return !String(Symbol())
        })),
        Zo = Ko && !Symbol.sham && "symbol" == typeof Symbol.iterator,
        Jo = Array.isArray || function(e) {
            return "Array" == Pr(e)
        },
        ea = function(e) {
            return Object(Lr(e))
        },
        ta = Object.keys || function(e) {
            return No(e, jo)
        },
        na = xr ? Object.defineProperties : function(e, t) {
            Vr(e);
            for (var n, i = ta(t), r = i.length, o = 0; r > o;) Gr.f(e, n = i[o++], t[n]);
            return e
        },
        ia = ko("document", "documentElement"),
        ra = lo("IE_PROTO"),
        oa = function() {},
        aa = function(e) {
            return "<script>" + e + "<\/script>"
        },
        sa = function() {
            try {
                yo = document.domain && new ActiveXObject("htmlfile")
            } catch (e) {}
            var e, t;
            sa = yo ? function(e) {
                e.write(aa("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }(yo) : ((t = Ur("iframe")).style.display = "none", ia.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(aa("document.F=Object")), e.close(), e.F);
            for (var n = jo.length; n--;) delete sa.prototype[jo[n]];
            return sa()
        };
    co[ra] = !0;
    var ua = Object.create || function(e, t) {
            var n;
            return null !== e ? (oa.prototype = Vr(e), n = new oa, oa.prototype = null, n[ra] = e) : n = sa(), void 0 === t ? n : na(n, t)
        },
        la = Fo.f,
        ca = {}.toString,
        da = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        ha = {
            f: function(e) {
                return da && "[object Window]" == ca.call(e) ? function(e) {
                    try {
                        return la(e)
                    } catch (e) {
                        return da.slice()
                    }
                }(e) : la(Rr(e))
            }
        },
        fa = ro("wks"),
        pa = Tr.Symbol,
        ma = Zo ? pa : pa && pa.withoutSetter || so,
        ga = function(e) {
            return Fr(fa, e) || (Ko && Fr(pa, e) ? fa[e] = pa[e] : fa[e] = ma("Symbol." + e)), fa[e]
        },
        va = {
            f: ga
        },
        ya = Gr.f,
        _a = function(e) {
            var t = wo.Symbol || (wo.Symbol = {});
            Fr(t, e) || ya(t, e, {
                value: va.f(e)
            })
        },
        ba = Gr.f,
        wa = ga("toStringTag"),
        Ta = function(e, t, n) {
            e && !Fr(e = n ? e : e.prototype, wa) && ba(e, wa, {
                configurable: !0,
                value: t
            })
        },
        ka = function(e) {
            if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
            return e
        },
        xa = function(e, t, n) {
            if (ka(e), void 0 === t) return e;
            switch (n) {
                case 0:
                    return function() {
                        return e.call(t)
                    };
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, i) {
                        return e.call(t, n, i)
                    };
                case 3:
                    return function(n, i, r) {
                        return e.call(t, n, i, r)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        },
        Aa = ga("species"),
        Sa = function(e, t) {
            var n;
            return Jo(e) && ("function" != typeof(n = e.constructor) || n !== Array && !Jo(n.prototype) ? Nr(n) && null === (n = n[Aa]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
        },
        Ea = [].push,
        Oa = function(e) {
            var t = 1 == e,
                n = 2 == e,
                i = 3 == e,
                r = 4 == e,
                o = 6 == e,
                a = 5 == e || o;
            return function(s, u, l, c) {
                for (var d, h, f = ea(s), p = Mr(f), m = xa(u, l, 3), g = Oo(p.length), v = 0, y = c || Sa, _ = t ? y(s, g) : n ? y(s, 0) : void 0; g > v; v++)
                    if ((a || v in p) && (h = m(d = p[v], v, f), e))
                        if (t) _[v] = h;
                        else if (h) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return d;
                    case 6:
                        return v;
                    case 2:
                        Ea.call(_, d)
                } else if (r) return !1;
                return o ? -1 : i || r ? r : _
            }
        },
        Ca = {
            forEach: Oa(0),
            map: Oa(1),
            filter: Oa(2),
            some: Oa(3),
            every: Oa(4),
            find: Oa(5),
            findIndex: Oa(6)
        },
        Pa = Ca.forEach,
        Ia = lo("hidden"),
        Ma = ga("toPrimitive"),
        La = _o.set,
        Ra = _o.getterFor("Symbol"),
        Na = Object.prototype,
        ja = Tr.Symbol,
        Da = ko("JSON", "stringify"),
        Fa = zr.f,
        $a = Gr.f,
        Ha = ha.f,
        Ua = Er.f,
        Ba = ro("symbols"),
        qa = ro("op-symbols"),
        za = ro("string-to-symbol-registry"),
        Va = ro("symbol-to-string-registry"),
        Wa = ro("wks"),
        Ga = Tr.QObject,
        Xa = !Ga || !Ga.prototype || !Ga.prototype.findChild,
        Ya = xr && kr((function() {
            return 7 != ua($a({}, "a", {
                get: function() {
                    return $a(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        })) ? function(e, t, n) {
            var i = Fa(Na, t);
            i && delete Na[t], $a(e, t, n), i && e !== Na && $a(Na, t, i)
        } : $a,
        Qa = function(e, t) {
            var n = Ba[e] = ua(ja.prototype);
            return La(n, {
                type: "Symbol",
                tag: e,
                description: t
            }), xr || (n.description = t), n
        },
        Ka = Zo ? function(e) {
            return "symbol" == typeof e
        } : function(e) {
            return Object(e) instanceof ja
        },
        Za = function(e, t, n) {
            e === Na && Za(qa, t, n), Vr(e);
            var i = jr(t, !0);
            return Vr(n), Fr(Ba, i) ? (n.enumerable ? (Fr(e, Ia) && e[Ia][i] && (e[Ia][i] = !1), n = ua(n, {
                enumerable: Or(0, !1)
            })) : (Fr(e, Ia) || $a(e, Ia, Or(1, {})), e[Ia][i] = !0), Ya(e, i, n)) : $a(e, i, n)
        },
        Ja = function(e, t) {
            Vr(e);
            var n = Rr(t),
                i = ta(n).concat(is(n));
            return Pa(i, (function(t) {
                xr && !es.call(n, t) || Za(e, t, n[t])
            })), e
        },
        es = function(e) {
            var t = jr(e, !0),
                n = Ua.call(this, t);
            return !(this === Na && Fr(Ba, t) && !Fr(qa, t)) && (!(n || !Fr(this, t) || !Fr(Ba, t) || Fr(this, Ia) && this[Ia][t]) || n)
        },
        ts = function(e, t) {
            var n = Rr(e),
                i = jr(t, !0);
            if (n !== Na || !Fr(Ba, i) || Fr(qa, i)) {
                var r = Fa(n, i);
                return !r || !Fr(Ba, i) || Fr(n, Ia) && n[Ia][i] || (r.enumerable = !0), r
            }
        },
        ns = function(e) {
            var t = Ha(Rr(e)),
                n = [];
            return Pa(t, (function(e) {
                Fr(Ba, e) || Fr(co, e) || n.push(e)
            })), n
        },
        is = function(e) {
            var t = e === Na,
                n = Ha(t ? qa : Rr(e)),
                i = [];
            return Pa(n, (function(e) {
                !Fr(Ba, e) || t && !Fr(Na, e) || i.push(Ba[e])
            })), i
        };
    if (Ko || (bo((ja = function() {
            if (this instanceof ja) throw TypeError("Symbol is not a constructor");
            var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
                t = so(e),
                n = function(e) {
                    this === Na && n.call(qa, e), Fr(this, Ia) && Fr(this[Ia], t) && (this[Ia][t] = !1), Ya(this, t, Or(1, e))
                };
            return xr && Xa && Ya(Na, t, {
                configurable: !0,
                set: n
            }), Qa(t, e)
        }).prototype, "toString", (function() {
            return Ra(this).tag
        })), bo(ja, "withoutSetter", (function(e) {
            return Qa(so(e), e)
        })), Er.f = es, Gr.f = Za, zr.f = ts, Fo.f = ha.f = ns, $o.f = is, va.f = function(e) {
            return Qa(ga(e), e)
        }, xr && ($a(ja.prototype, "description", {
            configurable: !0,
            get: function() {
                return Ra(this).description
            }
        }), bo(Na, "propertyIsEnumerable", es, {
            unsafe: !0
        }))), Qo({
            global: !0,
            wrap: !0,
            forced: !Ko,
            sham: !Ko
        }, {
            Symbol: ja
        }), Pa(ta(Wa), (function(e) {
            _a(e)
        })), Qo({
            target: "Symbol",
            stat: !0,
            forced: !Ko
        }, {
            for: function(e) {
                var t = String(e);
                if (Fr(za, t)) return za[t];
                var n = ja(t);
                return za[t] = n, Va[n] = t, n
            },
            keyFor: function(e) {
                if (!Ka(e)) throw TypeError(e + " is not a symbol");
                if (Fr(Va, e)) return Va[e]
            },
            useSetter: function() {
                Xa = !0
            },
            useSimple: function() {
                Xa = !1
            }
        }), Qo({
            target: "Object",
            stat: !0,
            forced: !Ko,
            sham: !xr
        }, {
            create: function(e, t) {
                return void 0 === t ? ua(e) : Ja(ua(e), t)
            },
            defineProperty: Za,
            defineProperties: Ja,
            getOwnPropertyDescriptor: ts
        }), Qo({
            target: "Object",
            stat: !0,
            forced: !Ko
        }, {
            getOwnPropertyNames: ns,
            getOwnPropertySymbols: is
        }), Qo({
            target: "Object",
            stat: !0,
            forced: kr((function() {
                $o.f(1)
            }))
        }, {
            getOwnPropertySymbols: function(e) {
                return $o.f(ea(e))
            }
        }), Da) {
        var rs = !Ko || kr((function() {
            var e = ja();
            return "[null]" != Da([e]) || "{}" != Da({
                a: e
            }) || "{}" != Da(Object(e))
        }));
        Qo({
            target: "JSON",
            stat: !0,
            forced: rs
        }, {
            stringify: function(e, t, n) {
                for (var i, r = [e], o = 1; arguments.length > o;) r.push(arguments[o++]);
                if (i = t, (Nr(t) || void 0 !== e) && !Ka(e)) return Jo(t) || (t = function(e, t) {
                    if ("function" == typeof i && (t = i.call(this, e, t)), !Ka(t)) return t
                }), r[1] = t, Da.apply(null, r)
            }
        })
    }
    ja.prototype[Ma] || Xr(ja.prototype, Ma, ja.prototype.valueOf), Ta(ja, "Symbol"), co[Ia] = !0;
    var os = Gr.f,
        as = Tr.Symbol;
    if (xr && "function" == typeof as && (!("description" in as.prototype) || void 0 !== as().description)) {
        var ss = {},
            us = function() {
                var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
                    t = this instanceof us ? new as(e) : void 0 === e ? as() : as(e);
                return "" === e && (ss[t] = !0), t
            };
        Uo(us, as);
        var ls = us.prototype = as.prototype;
        ls.constructor = us;
        var cs = ls.toString,
            ds = "Symbol(test)" == String(as("test")),
            hs = /^Symbol\((.*)\)[^)]+$/;
        os(ls, "description", {
            configurable: !0,
            get: function() {
                var e = Nr(this) ? this.valueOf() : this,
                    t = cs.call(e);
                if (Fr(ss, e)) return "";
                var n = ds ? t.slice(7, -1) : t.replace(hs, "$1");
                return "" === n ? void 0 : n
            }
        }), Qo({
            global: !0,
            forced: !0
        }, {
            Symbol: us
        })
    }
    _a("iterator");
    var fs = function(e, t) {
            var n = [][e];
            return !!n && kr((function() {
                n.call(null, t || function() {
                    throw 1
                }, 1)
            }))
        },
        ps = Object.defineProperty,
        ms = {},
        gs = function(e) {
            throw e
        },
        vs = function(e, t) {
            if (Fr(ms, e)) return ms[e];
            t || (t = {});
            var n = [][e],
                i = !!Fr(t, "ACCESSORS") && t.ACCESSORS,
                r = Fr(t, 0) ? t[0] : gs,
                o = Fr(t, 1) ? t[1] : void 0;
            return ms[e] = !!n && !kr((function() {
                if (i && !xr) return !0;
                var e = {
                    length: -1
                };
                i ? ps(e, 1, {
                    enumerable: !0,
                    get: gs
                }) : e[1] = 1, n.call(e, r, o)
            }))
        },
        ys = Ca.forEach,
        _s = fs("forEach"),
        bs = vs("forEach"),
        ws = _s && bs ? [].forEach : function(e) {
            return ys(this, e, arguments.length > 1 ? arguments[1] : void 0)
        };
    Qo({
        target: "Array",
        proto: !0,
        forced: [].forEach != ws
    }, {
        forEach: ws
    });
    var Ts = Lo.indexOf,
        ks = [].indexOf,
        xs = !!ks && 1 / [1].indexOf(1, -0) < 0,
        As = fs("indexOf"),
        Ss = vs("indexOf", {
            ACCESSORS: !0,
            1: 0
        });
    Qo({
        target: "Array",
        proto: !0,
        forced: xs || !As || !Ss
    }, {
        indexOf: function(e) {
            return xs ? ks.apply(this, arguments) || 0 : Ts(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var Es = ga("unscopables"),
        Os = Array.prototype;
    null == Os[Es] && Gr.f(Os, Es, {
        configurable: !0,
        value: ua(null)
    });
    var Cs, Ps, Is, Ms = function(e) {
            Os[Es][e] = !0
        },
        Ls = {},
        Rs = !kr((function() {
            function e() {}
            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        })),
        Ns = lo("IE_PROTO"),
        js = Object.prototype,
        Ds = Rs ? Object.getPrototypeOf : function(e) {
            return e = ea(e), Fr(e, Ns) ? e[Ns] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? js : null
        },
        Fs = ga("iterator"),
        $s = !1;
    [].keys && ("next" in (Is = [].keys()) ? (Ps = Ds(Ds(Is))) !== Object.prototype && (Cs = Ps) : $s = !0), null == Cs && (Cs = {}), Fr(Cs, Fs) || Xr(Cs, Fs, (function() {
        return this
    }));
    var Hs = {
            IteratorPrototype: Cs,
            BUGGY_SAFARI_ITERATORS: $s
        },
        Us = Hs.IteratorPrototype,
        Bs = function() {
            return this
        },
        qs = function(e, t, n) {
            var i = t + " Iterator";
            return e.prototype = ua(Us, {
                next: Or(1, n)
            }), Ta(e, i, !1), Ls[i] = Bs, e
        },
        zs = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var e, t = !1,
                n = {};
            try {
                (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
            } catch (e) {}
            return function(n, i) {
                return Vr(n),
                    function(e) {
                        if (!Nr(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype")
                    }(i), t ? e.call(n, i) : n.__proto__ = i, n
            }
        }() : void 0),
        Vs = Hs.IteratorPrototype,
        Ws = Hs.BUGGY_SAFARI_ITERATORS,
        Gs = ga("iterator"),
        Xs = function() {
            return this
        },
        Ys = function(e, t, n, i, r, o, a) {
            qs(n, t, i);
            var s, u, l, c = function(e) {
                    if (e === r && m) return m;
                    if (!Ws && e in f) return f[e];
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
                p = f[Gs] || f["@@iterator"] || r && f[r],
                m = !Ws && p || c(r),
                g = "Array" == t && f.entries || p;
            if (g && (s = Ds(g.call(new e)), Vs !== Object.prototype && s.next && (Ds(s) !== Vs && (zs ? zs(s, Vs) : "function" != typeof s[Gs] && Xr(s, Gs, Xs)), Ta(s, d, !0))), "values" == r && p && "values" !== p.name && (h = !0, m = function() {
                    return p.call(this)
                }), f[Gs] !== m && Xr(f, Gs, m), Ls[t] = m, r)
                if (u = {
                        values: c("values"),
                        keys: o ? m : c("keys"),
                        entries: c("entries")
                    }, a)
                    for (l in u)(Ws || h || !(l in f)) && bo(f, l, u[l]);
                else Qo({
                    target: t,
                    proto: !0,
                    forced: Ws || h
                }, u);
            return u
        },
        Qs = _o.set,
        Ks = _o.getterFor("Array Iterator"),
        Zs = Ys(Array, "Array", (function(e, t) {
            Qs(this, {
                type: "Array Iterator",
                target: Rr(e),
                index: 0,
                kind: t
            })
        }), (function() {
            var e = Ks(this),
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
    Ls.Arguments = Ls.Array, Ms("keys"), Ms("values"), Ms("entries");
    var Js = [].join,
        eu = Mr != Object,
        tu = fs("join", ",");
    Qo({
        target: "Array",
        proto: !0,
        forced: eu || !tu
    }, {
        join: function(e) {
            return Js.call(Rr(this), void 0 === e ? "," : e)
        }
    });
    var nu, iu, ru = function(e, t, n) {
            var i = jr(t);
            i in e ? Gr.f(e, i, Or(0, n)) : e[i] = n
        },
        ou = ko("navigator", "userAgent") || "",
        au = Tr.process,
        su = au && au.versions,
        uu = su && su.v8;
    uu ? iu = (nu = uu.split("."))[0] + nu[1] : ou && (!(nu = ou.match(/Edge\/(\d+)/)) || nu[1] >= 74) && (nu = ou.match(/Chrome\/(\d+)/)) && (iu = nu[1]);
    var lu = iu && +iu,
        cu = ga("species"),
        du = function(e) {
            return lu >= 51 || !kr((function() {
                var t = [];
                return (t.constructor = {})[cu] = function() {
                    return {
                        foo: 1
                    }
                }, 1 !== t[e](Boolean).foo
            }))
        },
        hu = du("slice"),
        fu = vs("slice", {
            ACCESSORS: !0,
            0: 0,
            1: 2
        }),
        pu = ga("species"),
        mu = [].slice,
        gu = Math.max;
    Qo({
        target: "Array",
        proto: !0,
        forced: !hu || !fu
    }, {
        slice: function(e, t) {
            var n, i, r, o = Rr(this),
                a = Oo(o.length),
                s = Io(e, a),
                u = Io(void 0 === t ? a : t, a);
            if (Jo(o) && ("function" != typeof(n = o.constructor) || n !== Array && !Jo(n.prototype) ? Nr(n) && null === (n = n[pu]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return mu.call(o, s, u);
            for (i = new(void 0 === n ? Array : n)(gu(u - s, 0)), r = 0; s < u; s++, r++) s in o && ru(i, r, o[s]);
            return i.length = r, i
        }
    });
    var vu = {};
    vu[ga("toStringTag")] = "z";
    var yu = "[object z]" === String(vu),
        _u = ga("toStringTag"),
        bu = "Arguments" == Pr(function() {
            return arguments
        }()),
        wu = yu ? Pr : function(e) {
            var t, n, i;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
                try {
                    return e[t]
                } catch (e) {}
            }(t = Object(e), _u)) ? n : bu ? Pr(t) : "Object" == (i = Pr(t)) && "function" == typeof t.callee ? "Arguments" : i
        },
        Tu = yu ? {}.toString : function() {
            return "[object " + wu(this) + "]"
        };
    yu || bo(Object.prototype, "toString", Tu, {
        unsafe: !0
    });
    var ku = function() {
        var e = Vr(this),
            t = "";
        return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
    };

    function xu(e, t) {
        return RegExp(e, t)
    }
    var Au = {
            UNSUPPORTED_Y: kr((function() {
                var e = xu("a", "y");
                return e.lastIndex = 2, null != e.exec("abcd")
            })),
            BROKEN_CARET: kr((function() {
                var e = xu("^r", "gy");
                return e.lastIndex = 2, null != e.exec("str")
            }))
        },
        Su = RegExp.prototype.exec,
        Eu = String.prototype.replace,
        Ou = Su,
        Cu = function() {
            var e = /a/,
                t = /b*/g;
            return Su.call(e, "a"), Su.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
        }(),
        Pu = Au.UNSUPPORTED_Y || Au.BROKEN_CARET,
        Iu = void 0 !== /()??/.exec("")[1];
    (Cu || Iu || Pu) && (Ou = function(e) {
        var t, n, i, r, o = this,
            a = Pu && o.sticky,
            s = ku.call(o),
            u = o.source,
            l = 0,
            c = e;
        return a && (-1 === (s = s.replace("y", "")).indexOf("g") && (s += "g"), c = String(e).slice(o.lastIndex), o.lastIndex > 0 && (!o.multiline || o.multiline && "\n" !== e[o.lastIndex - 1]) && (u = "(?: " + u + ")", c = " " + c, l++), n = new RegExp("^(?:" + u + ")", s)), Iu && (n = new RegExp("^" + u + "$(?!\\s)", s)), Cu && (t = o.lastIndex), i = Su.call(a ? n : o, c), a ? i ? (i.input = i.input.slice(l), i[0] = i[0].slice(l), i.index = o.lastIndex, o.lastIndex += i[0].length) : o.lastIndex = 0 : Cu && i && (o.lastIndex = o.global ? i.index + i[0].length : t), Iu && i && i.length > 1 && Eu.call(i[0], n, (function() {
            for (r = 1; r < arguments.length - 2; r++) void 0 === arguments[r] && (i[r] = void 0)
        })), i
    });
    var Mu = Ou;
    Qo({
        target: "RegExp",
        proto: !0,
        forced: /./.exec !== Mu
    }, {
        exec: Mu
    });
    var Lu = RegExp.prototype,
        Ru = Lu.toString,
        Nu = kr((function() {
            return "/a/b" != Ru.call({
                source: "a",
                flags: "b"
            })
        })),
        ju = "toString" != Ru.name;
    (Nu || ju) && bo(RegExp.prototype, "toString", (function() {
        var e = Vr(this),
            t = String(e.source),
            n = e.flags;
        return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in Lu) ? ku.call(e) : n)
    }), {
        unsafe: !0
    });
    var Du = function(e) {
            return function(t, n) {
                var i, r, o = String(Lr(t)),
                    a = So(n),
                    s = o.length;
                return a < 0 || a >= s ? e ? "" : void 0 : (i = o.charCodeAt(a)) < 55296 || i > 56319 || a + 1 === s || (r = o.charCodeAt(a + 1)) < 56320 || r > 57343 ? e ? o.charAt(a) : i : e ? o.slice(a, a + 2) : r - 56320 + (i - 55296 << 10) + 65536
            }
        },
        Fu = {
            codeAt: Du(!1),
            charAt: Du(!0)
        },
        $u = Fu.charAt,
        Hu = _o.set,
        Uu = _o.getterFor("String Iterator");
    Ys(String, "String", (function(e) {
        Hu(this, {
            type: "String Iterator",
            string: String(e),
            index: 0
        })
    }), (function() {
        var e, t = Uu(this),
            n = t.string,
            i = t.index;
        return i >= n.length ? {
            value: void 0,
            done: !0
        } : (e = $u(n, i), t.index += e.length, {
            value: e,
            done: !1
        })
    }));
    var Bu = ga("species"),
        qu = !kr((function() {
            var e = /./;
            return e.exec = function() {
                var e = [];
                return e.groups = {
                    a: "7"
                }, e
            }, "7" !== "".replace(e, "$<a>")
        })),
        zu = "$0" === "a".replace(/./, "$0"),
        Vu = ga("replace"),
        Wu = !!/./ [Vu] && "" === /./ [Vu]("a", "$0"),
        Gu = !kr((function() {
            var e = /(?:)/,
                t = e.exec;
            e.exec = function() {
                return t.apply(this, arguments)
            };
            var n = "ab".split(e);
            return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
        })),
        Xu = function(e, t, n, i) {
            var r = ga(e),
                o = !kr((function() {
                    var t = {};
                    return t[r] = function() {
                        return 7
                    }, 7 != "" [e](t)
                })),
                a = o && !kr((function() {
                    var t = !1,
                        n = /a/;
                    return "split" === e && ((n = {}).constructor = {}, n.constructor[Bu] = function() {
                        return n
                    }, n.flags = "", n[r] = /./ [r]), n.exec = function() {
                        return t = !0, null
                    }, n[r](""), !t
                }));
            if (!o || !a || "replace" === e && (!qu || !zu || Wu) || "split" === e && !Gu) {
                var s = /./ [r],
                    u = n(r, "" [e], (function(e, t, n, i, r) {
                        return t.exec === Mu ? o && !r ? {
                            done: !0,
                            value: s.call(t, n, i)
                        } : {
                            done: !0,
                            value: e.call(n, t, i)
                        } : {
                            done: !1
                        }
                    }), {
                        REPLACE_KEEPS_$0: zu,
                        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: Wu
                    }),
                    l = u[0],
                    c = u[1];
                bo(String.prototype, e, l), bo(RegExp.prototype, r, 2 == t ? function(e, t) {
                    return c.call(e, this, t)
                } : function(e) {
                    return c.call(e, this)
                })
            }
            i && Xr(RegExp.prototype[r], "sham", !0)
        },
        Yu = Fu.charAt,
        Qu = function(e, t, n) {
            return t + (n ? Yu(e, t).length : 1)
        },
        Ku = function(e, t) {
            var n = e.exec;
            if ("function" == typeof n) {
                var i = n.call(e, t);
                if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
                return i
            }
            if ("RegExp" !== Pr(e)) throw TypeError("RegExp#exec called on incompatible receiver");
            return Mu.call(e, t)
        },
        Zu = Math.max,
        Ju = Math.min,
        el = Math.floor,
        tl = /\$([$&'`]|\d\d?|<[^>]*>)/g,
        nl = /\$([$&'`]|\d\d?)/g;
    Xu("replace", 2, (function(e, t, n, i) {
        var r = i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
            o = i.REPLACE_KEEPS_$0,
            a = r ? "$" : "$0";
        return [function(n, i) {
            var r = Lr(this),
                o = null == n ? void 0 : n[e];
            return void 0 !== o ? o.call(n, r, i) : t.call(String(r), n, i)
        }, function(e, i) {
            if (!r && o || "string" == typeof i && -1 === i.indexOf(a)) {
                var u = n(t, e, this, i);
                if (u.done) return u.value
            }
            var l = Vr(e),
                c = String(this),
                d = "function" == typeof i;
            d || (i = String(i));
            var h = l.global;
            if (h) {
                var f = l.unicode;
                l.lastIndex = 0
            }
            for (var p = [];;) {
                var m = Ku(l, c);
                if (null === m) break;
                if (p.push(m), !h) break;
                "" === String(m[0]) && (l.lastIndex = Qu(c, Oo(l.lastIndex), f))
            }
            for (var g, v = "", y = 0, _ = 0; _ < p.length; _++) {
                m = p[_];
                for (var b = String(m[0]), w = Zu(Ju(So(m.index), c.length), 0), T = [], k = 1; k < m.length; k++) T.push(void 0 === (g = m[k]) ? g : String(g));
                var x = m.groups;
                if (d) {
                    var A = [b].concat(T, w, c);
                    void 0 !== x && A.push(x);
                    var S = String(i.apply(void 0, A))
                } else S = s(b, c, w, T, x, i);
                w >= y && (v += c.slice(y, w) + S, y = w + b.length)
            }
            return v + c.slice(y)
        }];

        function s(e, n, i, r, o, a) {
            var s = i + e.length,
                u = r.length,
                l = nl;
            return void 0 !== o && (o = ea(o), l = tl), t.call(a, l, (function(t, a) {
                var l;
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
                        l = o[a.slice(1, -1)];
                        break;
                    default:
                        var c = +a;
                        if (0 === c) return t;
                        if (c > u) {
                            var d = el(c / 10);
                            return 0 === d ? t : d <= u ? void 0 === r[d - 1] ? a.charAt(1) : r[d - 1] + a.charAt(1) : t
                        }
                        l = r[c - 1]
                }
                return void 0 === l ? "" : l
            }))
        }
    }));
    var il = Object.is || function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    };
    Xu("search", 1, (function(e, t, n) {
        return [function(t) {
            var n = Lr(this),
                i = null == t ? void 0 : t[e];
            return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
        }, function(e) {
            var i = n(t, e, this);
            if (i.done) return i.value;
            var r = Vr(e),
                o = String(this),
                a = r.lastIndex;
            il(a, 0) || (r.lastIndex = 0);
            var s = Ku(r, o);
            return il(r.lastIndex, a) || (r.lastIndex = a), null === s ? -1 : s.index
        }]
    }));
    var rl = ga("match"),
        ol = function(e) {
            var t;
            return Nr(e) && (void 0 !== (t = e[rl]) ? !!t : "RegExp" == Pr(e))
        },
        al = ga("species"),
        sl = function(e, t) {
            var n, i = Vr(e).constructor;
            return void 0 === i || null == (n = Vr(i)[al]) ? t : ka(n)
        },
        ul = [].push,
        ll = Math.min,
        cl = !kr((function() {
            return !RegExp(4294967295, "y")
        }));
    Xu("split", 2, (function(e, t, n) {
        var i;
        return i = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e, n) {
            var i = String(Lr(this)),
                r = void 0 === n ? 4294967295 : n >>> 0;
            if (0 === r) return [];
            if (void 0 === e) return [i];
            if (!ol(e)) return t.call(i, e, r);
            for (var o, a, s, u = [], l = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), c = 0, d = new RegExp(e.source, l + "g");
                (o = Mu.call(d, i)) && !((a = d.lastIndex) > c && (u.push(i.slice(c, o.index)), o.length > 1 && o.index < i.length && ul.apply(u, o.slice(1)), s = o[0].length, c = a, u.length >= r));) d.lastIndex === o.index && d.lastIndex++;
            return c === i.length ? !s && d.test("") || u.push("") : u.push(i.slice(c)), u.length > r ? u.slice(0, r) : u
        } : "0".split(void 0, 0).length ? function(e, n) {
            return void 0 === e && 0 === n ? [] : t.call(this, e, n)
        } : t, [function(t, n) {
            var r = Lr(this),
                o = null == t ? void 0 : t[e];
            return void 0 !== o ? o.call(t, r, n) : i.call(String(r), t, n)
        }, function(e, r) {
            var o = n(i, e, this, r, i !== t);
            if (o.done) return o.value;
            var a = Vr(e),
                s = String(this),
                u = sl(a, RegExp),
                l = a.unicode,
                c = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (cl ? "y" : "g"),
                d = new u(cl ? a : "^(?:" + a.source + ")", c),
                h = void 0 === r ? 4294967295 : r >>> 0;
            if (0 === h) return [];
            if (0 === s.length) return null === Ku(d, s) ? [s] : [];
            for (var f = 0, p = 0, m = []; p < s.length;) {
                d.lastIndex = cl ? p : 0;
                var g, v = Ku(d, cl ? s : s.slice(p));
                if (null === v || (g = ll(Oo(d.lastIndex + (cl ? 0 : p)), s.length)) === f) p = Qu(s, p, l);
                else {
                    if (m.push(s.slice(f, p)), m.length === h) return m;
                    for (var y = 1; y <= v.length - 1; y++)
                        if (m.push(v[y]), m.length === h) return m;
                    p = f = g
                }
            }
            return m.push(s.slice(f)), m
        }]
    }), !cl);
    var dl = {
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
    for (var hl in dl) {
        var fl = Tr[hl],
            pl = fl && fl.prototype;
        if (pl && pl.forEach !== ws) try {
            Xr(pl, "forEach", ws)
        } catch (e) {
            pl.forEach = ws
        }
    }
    var ml = ga("iterator"),
        gl = ga("toStringTag"),
        vl = Zs.values;
    for (var yl in dl) {
        var _l = Tr[yl],
            bl = _l && _l.prototype;
        if (bl) {
            if (bl[ml] !== vl) try {
                Xr(bl, ml, vl)
            } catch (e) {
                bl[ml] = vl
            }
            if (bl[gl] || Xr(bl, gl, yl), dl[yl])
                for (var wl in Zs)
                    if (bl[wl] !== Zs[wl]) try {
                        Xr(bl, wl, Zs[wl])
                    } catch (e) {
                        bl[wl] = Zs[wl]
                    }
        }
    }
    var Tl = ga("iterator"),
        kl = !kr((function() {
            var e = new URL("b?a=1&b=2&c=3", "http://a"),
                t = e.searchParams,
                n = "";
            return e.pathname = "c%20d", t.forEach((function(e, i) {
                t.delete("b"), n += i + e
            })), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[Tl] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://Ñ‚ÐµÑÑ‚").host || "#%D0%B1" !== new URL("http://a#Ð±").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host
        })),
        xl = function(e, t, n) {
            if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
            return e
        },
        Al = Object.assign,
        Sl = Object.defineProperty,
        El = !Al || kr((function() {
            if (xr && 1 !== Al({
                    b: 1
                }, Al(Sl({}, "a", {
                    enumerable: !0,
                    get: function() {
                        Sl(this, "b", {
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
            })), 7 != Al({}, e)[n] || "abcdefghijklmnopqrst" != ta(Al({}, t)).join("")
        })) ? function(e, t) {
            for (var n = ea(e), i = arguments.length, r = 1, o = $o.f, a = Er.f; i > r;)
                for (var s, u = Mr(arguments[r++]), l = o ? ta(u).concat(o(u)) : ta(u), c = l.length, d = 0; c > d;) s = l[d++], xr && !a.call(u, s) || (n[s] = u[s]);
            return n
        } : Al,
        Ol = function(e, t, n, i) {
            try {
                return i ? t(Vr(n)[0], n[1]) : t(n)
            } catch (t) {
                var r = e.return;
                throw void 0 !== r && Vr(r.call(e)), t
            }
        },
        Cl = ga("iterator"),
        Pl = Array.prototype,
        Il = function(e) {
            return void 0 !== e && (Ls.Array === e || Pl[Cl] === e)
        },
        Ml = ga("iterator"),
        Ll = function(e) {
            if (null != e) return e[Ml] || e["@@iterator"] || Ls[wu(e)]
        },
        Rl = function(e) {
            var t, n, i, r, o, a, s = ea(e),
                u = "function" == typeof this ? this : Array,
                l = arguments.length,
                c = l > 1 ? arguments[1] : void 0,
                d = void 0 !== c,
                h = Ll(s),
                f = 0;
            if (d && (c = xa(c, l > 2 ? arguments[2] : void 0, 2)), null == h || u == Array && Il(h))
                for (n = new u(t = Oo(s.length)); t > f; f++) a = d ? c(s[f], f) : s[f], ru(n, f, a);
            else
                for (o = (r = h.call(s)).next, n = new u; !(i = o.call(r)).done; f++) a = d ? Ol(r, c, [i.value, f], !0) : i.value, ru(n, f, a);
            return n.length = f, n
        },
        Nl = /[^\0-\u007E]/,
        jl = /[.\u3002\uFF0E\uFF61]/g,
        Dl = "Overflow: input needs wider integers to process",
        Fl = Math.floor,
        $l = String.fromCharCode,
        Hl = function(e) {
            return e + 22 + 75 * (e < 26)
        },
        Ul = function(e, t, n) {
            var i = 0;
            for (e = n ? Fl(e / 700) : e >> 1, e += Fl(e / t); e > 455; i += 36) e = Fl(e / 35);
            return Fl(i + 36 * e / (e + 38))
        },
        Bl = function(e) {
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
            for (t = 0; t < e.length; t++)(n = e[t]) < 128 && i.push($l(n));
            var u = i.length,
                l = u;
            for (u && i.push("-"); l < r;) {
                var c = 2147483647;
                for (t = 0; t < e.length; t++)(n = e[t]) >= o && n < c && (c = n);
                var d = l + 1;
                if (c - o > Fl((2147483647 - a) / d)) throw RangeError(Dl);
                for (a += (c - o) * d, o = c, t = 0; t < e.length; t++) {
                    if ((n = e[t]) < o && ++a > 2147483647) throw RangeError(Dl);
                    if (n == o) {
                        for (var h = a, f = 36;; f += 36) {
                            var p = f <= s ? 1 : f >= s + 26 ? 26 : f - s;
                            if (h < p) break;
                            var m = h - p,
                                g = 36 - p;
                            i.push($l(Hl(p + m % g))), h = Fl(m / g)
                        }
                        i.push($l(Hl(h))), s = Ul(a, d, l == u), a = 0, ++l
                    }
                }++a, ++o
            }
            return i.join("")
        },
        ql = function(e, t, n) {
            for (var i in t) bo(e, i, t[i], n);
            return e
        },
        zl = function(e) {
            var t = Ll(e);
            if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");
            return Vr(t.call(e))
        },
        Vl = ko("fetch"),
        Wl = ko("Headers"),
        Gl = ga("iterator"),
        Xl = _o.set,
        Yl = _o.getterFor("URLSearchParams"),
        Ql = _o.getterFor("URLSearchParamsIterator"),
        Kl = /\+/g,
        Zl = Array(4),
        Jl = function(e) {
            return Zl[e - 1] || (Zl[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"))
        },
        ec = function(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return e
            }
        },
        tc = function(e) {
            var t = e.replace(Kl, " "),
                n = 4;
            try {
                return decodeURIComponent(t)
            } catch (e) {
                for (; n;) t = t.replace(Jl(n--), ec);
                return t
            }
        },
        nc = /[!'()~]|%20/g,
        ic = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+"
        },
        rc = function(e) {
            return ic[e]
        },
        oc = function(e) {
            return encodeURIComponent(e).replace(nc, rc)
        },
        ac = function(e, t) {
            if (t)
                for (var n, i, r = t.split("&"), o = 0; o < r.length;)(n = r[o++]).length && (i = n.split("="), e.push({
                    key: tc(i.shift()),
                    value: tc(i.join("="))
                }))
        },
        sc = function(e) {
            this.entries.length = 0, ac(this.entries, e)
        },
        uc = function(e, t) {
            if (e < t) throw TypeError("Not enough arguments")
        },
        lc = qs((function(e, t) {
            Xl(this, {
                type: "URLSearchParamsIterator",
                iterator: zl(Yl(e).entries),
                kind: t
            })
        }), "Iterator", (function() {
            var e = Ql(this),
                t = e.kind,
                n = e.iterator.next(),
                i = n.value;
            return n.done || (n.value = "keys" === t ? i.key : "values" === t ? i.value : [i.key, i.value]), n
        })),
        cc = function() {
            xl(this, cc, "URLSearchParams");
            var e, t, n, i, r, o, a, s, u, l = arguments.length > 0 ? arguments[0] : void 0,
                c = this,
                d = [];
            if (Xl(c, {
                    type: "URLSearchParams",
                    entries: d,
                    updateURL: function() {},
                    updateSearchParams: sc
                }), void 0 !== l)
                if (Nr(l))
                    if ("function" == typeof(e = Ll(l)))
                        for (n = (t = e.call(l)).next; !(i = n.call(t)).done;) {
                            if ((a = (o = (r = zl(Vr(i.value))).next).call(r)).done || (s = o.call(r)).done || !o.call(r).done) throw TypeError("Expected sequence with length 2");
                            d.push({
                                key: a.value + "",
                                value: s.value + ""
                            })
                        } else
                            for (u in l) Fr(l, u) && d.push({
                                key: u,
                                value: l[u] + ""
                            });
                    else ac(d, "string" == typeof l ? "?" === l.charAt(0) ? l.slice(1) : l : l + "")
        },
        dc = cc.prototype;
    ql(dc, {
        append: function(e, t) {
            uc(arguments.length, 2);
            var n = Yl(this);
            n.entries.push({
                key: e + "",
                value: t + ""
            }), n.updateURL()
        },
        delete: function(e) {
            uc(arguments.length, 1);
            for (var t = Yl(this), n = t.entries, i = e + "", r = 0; r < n.length;) n[r].key === i ? n.splice(r, 1) : r++;
            t.updateURL()
        },
        get: function(e) {
            uc(arguments.length, 1);
            for (var t = Yl(this).entries, n = e + "", i = 0; i < t.length; i++)
                if (t[i].key === n) return t[i].value;
            return null
        },
        getAll: function(e) {
            uc(arguments.length, 1);
            for (var t = Yl(this).entries, n = e + "", i = [], r = 0; r < t.length; r++) t[r].key === n && i.push(t[r].value);
            return i
        },
        has: function(e) {
            uc(arguments.length, 1);
            for (var t = Yl(this).entries, n = e + "", i = 0; i < t.length;)
                if (t[i++].key === n) return !0;
            return !1
        },
        set: function(e, t) {
            uc(arguments.length, 1);
            for (var n, i = Yl(this), r = i.entries, o = !1, a = e + "", s = t + "", u = 0; u < r.length; u++)(n = r[u]).key === a && (o ? r.splice(u--, 1) : (o = !0, n.value = s));
            o || r.push({
                key: a,
                value: s
            }), i.updateURL()
        },
        sort: function() {
            var e, t, n, i = Yl(this),
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
            for (var t, n = Yl(this).entries, i = xa(e, arguments.length > 1 ? arguments[1] : void 0, 3), r = 0; r < n.length;) i((t = n[r++]).value, t.key, this)
        },
        keys: function() {
            return new lc(this, "keys")
        },
        values: function() {
            return new lc(this, "values")
        },
        entries: function() {
            return new lc(this, "entries")
        }
    }, {
        enumerable: !0
    }), bo(dc, Gl, dc.entries), bo(dc, "toString", (function() {
        for (var e, t = Yl(this).entries, n = [], i = 0; i < t.length;) e = t[i++], n.push(oc(e.key) + "=" + oc(e.value));
        return n.join("&")
    }), {
        enumerable: !0
    }), Ta(cc, "URLSearchParams"), Qo({
        global: !0,
        forced: !kl
    }, {
        URLSearchParams: cc
    }), kl || "function" != typeof Vl || "function" != typeof Wl || Qo({
        global: !0,
        enumerable: !0,
        forced: !0
    }, {
        fetch: function(e) {
            var t, n, i, r = [e];
            return arguments.length > 1 && (Nr(t = arguments[1]) && (n = t.body, "URLSearchParams" === wu(n) && ((i = t.headers ? new Wl(t.headers) : new Wl).has("content-type") || i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = ua(t, {
                body: Or(0, String(n)),
                headers: Or(0, i)
            }))), r.push(t)), Vl.apply(this, r)
        }
    });
    var hc, fc = {
            URLSearchParams: cc,
            getState: Yl
        },
        pc = Fu.codeAt,
        mc = Tr.URL,
        gc = fc.URLSearchParams,
        vc = fc.getState,
        yc = _o.set,
        _c = _o.getterFor("URL"),
        bc = Math.floor,
        wc = Math.pow,
        Tc = /[A-Za-z]/,
        kc = /[\d+-.A-Za-z]/,
        xc = /\d/,
        Ac = /^(0x|0X)/,
        Sc = /^[0-7]+$/,
        Ec = /^\d+$/,
        Oc = /^[\dA-Fa-f]+$/,
        Cc = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,
        Pc = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/,
        Ic = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,
        Mc = /[\u0009\u000A\u000D]/g,
        Lc = function(e, t) {
            var n, i, r;
            if ("[" == t.charAt(0)) {
                if ("]" != t.charAt(t.length - 1)) return "Invalid host";
                if (!(n = Nc(t.slice(1, -1)))) return "Invalid host";
                e.host = n
            } else if (qc(e)) {
                if (t = function(e) {
                        var t, n, i = [],
                            r = e.toLowerCase().replace(jl, ".").split(".");
                        for (t = 0; t < r.length; t++) n = r[t], i.push(Nl.test(n) ? "xn--" + Bl(n) : n);
                        return i.join(".")
                    }(t), Cc.test(t)) return "Invalid host";
                if (null === (n = Rc(t))) return "Invalid host";
                e.host = n
            } else {
                if (Pc.test(t)) return "Invalid host";
                for (n = "", i = Rl(t), r = 0; r < i.length; r++) n += Uc(i[r], Dc);
                e.host = n
            }
        },
        Rc = function(e) {
            var t, n, i, r, o, a, s, u = e.split(".");
            if (u.length && "" == u[u.length - 1] && u.pop(), (t = u.length) > 4) return e;
            for (n = [], i = 0; i < t; i++) {
                if ("" == (r = u[i])) return e;
                if (o = 10, r.length > 1 && "0" == r.charAt(0) && (o = Ac.test(r) ? 16 : 8, r = r.slice(8 == o ? 1 : 2)), "" === r) a = 0;
                else {
                    if (!(10 == o ? Ec : 8 == o ? Sc : Oc).test(r)) return e;
                    a = parseInt(r, o)
                }
                n.push(a)
            }
            for (i = 0; i < t; i++)
                if (a = n[i], i == t - 1) {
                    if (a >= wc(256, 5 - t)) return null
                } else if (a > 255) return null;
            for (s = n.pop(), i = 0; i < n.length; i++) s += n[i] * wc(256, 3 - i);
            return s
        },
        Nc = function(e) {
            var t, n, i, r, o, a, s, u = [0, 0, 0, 0, 0, 0, 0, 0],
                l = 0,
                c = null,
                d = 0,
                h = function() {
                    return e.charAt(d)
                };
            if (":" == h()) {
                if (":" != e.charAt(1)) return;
                d += 2, c = ++l
            }
            for (; h();) {
                if (8 == l) return;
                if (":" != h()) {
                    for (t = n = 0; n < 4 && Oc.test(h());) t = 16 * t + parseInt(h(), 16), d++, n++;
                    if ("." == h()) {
                        if (0 == n) return;
                        if (d -= n, l > 6) return;
                        for (i = 0; h();) {
                            if (r = null, i > 0) {
                                if (!("." == h() && i < 4)) return;
                                d++
                            }
                            if (!xc.test(h())) return;
                            for (; xc.test(h());) {
                                if (o = parseInt(h(), 10), null === r) r = o;
                                else {
                                    if (0 == r) return;
                                    r = 10 * r + o
                                }
                                if (r > 255) return;
                                d++
                            }
                            u[l] = 256 * u[l] + r, 2 != ++i && 4 != i || l++
                        }
                        if (4 != i) return;
                        break
                    }
                    if (":" == h()) {
                        if (d++, !h()) return
                    } else if (h()) return;
                    u[l++] = t
                } else {
                    if (null !== c) return;
                    d++, c = ++l
                }
            }
            if (null !== c)
                for (a = l - c, l = 7; 0 != l && a > 0;) s = u[l], u[l--] = u[c + a - 1], u[c + --a] = s;
            else if (8 != l) return;
            return u
        },
        jc = function(e) {
            var t, n, i, r;
            if ("number" == typeof e) {
                for (t = [], n = 0; n < 4; n++) t.unshift(e % 256), e = bc(e / 256);
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
        Dc = {},
        Fc = El({}, Dc, {
            " ": 1,
            '"': 1,
            "<": 1,
            ">": 1,
            "`": 1
        }),
        $c = El({}, Fc, {
            "#": 1,
            "?": 1,
            "{": 1,
            "}": 1
        }),
        Hc = El({}, $c, {
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
        Uc = function(e, t) {
            var n = pc(e, 0);
            return n > 32 && n < 127 && !Fr(t, e) ? e : encodeURIComponent(e)
        },
        Bc = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
        },
        qc = function(e) {
            return Fr(Bc, e.scheme)
        },
        zc = function(e) {
            return "" != e.username || "" != e.password
        },
        Vc = function(e) {
            return !e.host || e.cannotBeABaseURL || "file" == e.scheme
        },
        Wc = function(e, t) {
            var n;
            return 2 == e.length && Tc.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n)
        },
        Gc = function(e) {
            var t;
            return e.length > 1 && Wc(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t)
        },
        Xc = function(e) {
            var t = e.path,
                n = t.length;
            !n || "file" == e.scheme && 1 == n && Wc(t[0], !0) || t.pop()
        },
        Yc = function(e) {
            return "." === e || "%2e" === e.toLowerCase()
        },
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
        ud = {},
        ld = {},
        cd = {},
        dd = {},
        hd = {},
        fd = {},
        pd = {},
        md = {},
        gd = {},
        vd = function(e, t, n, i) {
            var r, o, a, s, u, l = n || Qc,
                c = 0,
                d = "",
                h = !1,
                f = !1,
                p = !1;
            for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(Ic, "")), t = t.replace(Mc, ""), r = Rl(t); c <= r.length;) {
                switch (o = r[c], l) {
                    case Qc:
                        if (!o || !Tc.test(o)) {
                            if (n) return "Invalid scheme";
                            l = Zc;
                            continue
                        }
                        d += o.toLowerCase(), l = Kc;
                        break;
                    case Kc:
                        if (o && (kc.test(o) || "+" == o || "-" == o || "." == o)) d += o.toLowerCase();
                        else {
                            if (":" != o) {
                                if (n) return "Invalid scheme";
                                d = "", l = Zc, c = 0;
                                continue
                            }
                            if (n && (qc(e) != Fr(Bc, d) || "file" == d && (zc(e) || null !== e.port) || "file" == e.scheme && !e.host)) return;
                            if (e.scheme = d, n) return void(qc(e) && Bc[e.scheme] == e.port && (e.port = null));
                            d = "", "file" == e.scheme ? l = ld : qc(e) && i && i.scheme == e.scheme ? l = Jc : qc(e) ? l = id : "/" == r[c + 1] ? (l = ed, c++) : (e.cannotBeABaseURL = !0, e.path.push(""), l = pd)
                        }
                        break;
                    case Zc:
                        if (!i || i.cannotBeABaseURL && "#" != o) return "Invalid scheme";
                        if (i.cannotBeABaseURL && "#" == o) {
                            e.scheme = i.scheme, e.path = i.path.slice(), e.query = i.query, e.fragment = "", e.cannotBeABaseURL = !0, l = gd;
                            break
                        }
                        l = "file" == i.scheme ? ld : td;
                        continue;
                    case Jc:
                        if ("/" != o || "/" != r[c + 1]) {
                            l = td;
                            continue
                        }
                        l = rd, c++;
                        break;
                    case ed:
                        if ("/" == o) {
                            l = od;
                            break
                        }
                        l = fd;
                        continue;
                    case td:
                        if (e.scheme = i.scheme, o == hc) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query;
                        else if ("/" == o || "\\" == o && qc(e)) l = nd;
                        else if ("?" == o) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = "", l = md;
                        else {
                            if ("#" != o) {
                                e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.path.pop(), l = fd;
                                continue
                            }
                            e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query, e.fragment = "", l = gd
                        }
                        break;
                    case nd:
                        if (!qc(e) || "/" != o && "\\" != o) {
                            if ("/" != o) {
                                e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, l = fd;
                                continue
                            }
                            l = od
                        } else l = rd;
                        break;
                    case id:
                        if (l = rd, "/" != o || "/" != d.charAt(c + 1)) continue;
                        c++;
                        break;
                    case rd:
                        if ("/" != o && "\\" != o) {
                            l = od;
                            continue
                        }
                        break;
                    case od:
                        if ("@" == o) {
                            h && (d = "%40" + d), h = !0, a = Rl(d);
                            for (var m = 0; m < a.length; m++) {
                                var g = a[m];
                                if (":" != g || p) {
                                    var v = Uc(g, Hc);
                                    p ? e.password += v : e.username += v
                                } else p = !0
                            }
                            d = ""
                        } else if (o == hc || "/" == o || "?" == o || "#" == o || "\\" == o && qc(e)) {
                            if (h && "" == d) return "Invalid authority";
                            c -= Rl(d).length + 1, d = "", l = ad
                        } else d += o;
                        break;
                    case ad:
                    case sd:
                        if (n && "file" == e.scheme) {
                            l = dd;
                            continue
                        }
                        if (":" != o || f) {
                            if (o == hc || "/" == o || "?" == o || "#" == o || "\\" == o && qc(e)) {
                                if (qc(e) && "" == d) return "Invalid host";
                                if (n && "" == d && (zc(e) || null !== e.port)) return;
                                if (s = Lc(e, d)) return s;
                                if (d = "", l = hd, n) return;
                                continue
                            }
                            "[" == o ? f = !0 : "]" == o && (f = !1), d += o
                        } else {
                            if ("" == d) return "Invalid host";
                            if (s = Lc(e, d)) return s;
                            if (d = "", l = ud, n == sd) return
                        }
                        break;
                    case ud:
                        if (!xc.test(o)) {
                            if (o == hc || "/" == o || "?" == o || "#" == o || "\\" == o && qc(e) || n) {
                                if ("" != d) {
                                    var y = parseInt(d, 10);
                                    if (y > 65535) return "Invalid port";
                                    e.port = qc(e) && y === Bc[e.scheme] ? null : y, d = ""
                                }
                                if (n) return;
                                l = hd;
                                continue
                            }
                            return "Invalid port"
                        }
                        d += o;
                        break;
                    case ld:
                        if (e.scheme = "file", "/" == o || "\\" == o) l = cd;
                        else {
                            if (!i || "file" != i.scheme) {
                                l = fd;
                                continue
                            }
                            if (o == hc) e.host = i.host, e.path = i.path.slice(), e.query = i.query;
                            else if ("?" == o) e.host = i.host, e.path = i.path.slice(), e.query = "", l = md;
                            else {
                                if ("#" != o) {
                                    Gc(r.slice(c).join("")) || (e.host = i.host, e.path = i.path.slice(), Xc(e)), l = fd;
                                    continue
                                }
                                e.host = i.host, e.path = i.path.slice(), e.query = i.query, e.fragment = "", l = gd
                            }
                        }
                        break;
                    case cd:
                        if ("/" == o || "\\" == o) {
                            l = dd;
                            break
                        }
                        i && "file" == i.scheme && !Gc(r.slice(c).join("")) && (Wc(i.path[0], !0) ? e.path.push(i.path[0]) : e.host = i.host), l = fd;
                        continue;
                    case dd:
                        if (o == hc || "/" == o || "\\" == o || "?" == o || "#" == o) {
                            if (!n && Wc(d)) l = fd;
                            else if ("" == d) {
                                if (e.host = "", n) return;
                                l = hd
                            } else {
                                if (s = Lc(e, d)) return s;
                                if ("localhost" == e.host && (e.host = ""), n) return;
                                d = "", l = hd
                            }
                            continue
                        }
                        d += o;
                        break;
                    case hd:
                        if (qc(e)) {
                            if (l = fd, "/" != o && "\\" != o) continue
                        } else if (n || "?" != o)
                            if (n || "#" != o) {
                                if (o != hc && (l = fd, "/" != o)) continue
                            } else e.fragment = "", l = gd;
                        else e.query = "", l = md;
                        break;
                    case fd:
                        if (o == hc || "/" == o || "\\" == o && qc(e) || !n && ("?" == o || "#" == o)) {
                            if (".." === (u = (u = d).toLowerCase()) || "%2e." === u || ".%2e" === u || "%2e%2e" === u ? (Xc(e), "/" == o || "\\" == o && qc(e) || e.path.push("")) : Yc(d) ? "/" == o || "\\" == o && qc(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && Wc(d) && (e.host && (e.host = ""), d = d.charAt(0) + ":"), e.path.push(d)), d = "", "file" == e.scheme && (o == hc || "?" == o || "#" == o))
                                for (; e.path.length > 1 && "" === e.path[0];) e.path.shift();
                            "?" == o ? (e.query = "", l = md) : "#" == o && (e.fragment = "", l = gd)
                        } else d += Uc(o, $c);
                        break;
                    case pd:
                        "?" == o ? (e.query = "", l = md) : "#" == o ? (e.fragment = "", l = gd) : o != hc && (e.path[0] += Uc(o, Dc));
                        break;
                    case md:
                        n || "#" != o ? o != hc && ("'" == o && qc(e) ? e.query += "%27" : e.query += "#" == o ? "%23" : Uc(o, Dc)) : (e.fragment = "", l = gd);
                        break;
                    case gd:
                        o != hc && (e.fragment += Uc(o, Fc))
                }
                c++
            }
        },
        yd = function(e) {
            var t, n, i = xl(this, yd, "URL"),
                r = arguments.length > 1 ? arguments[1] : void 0,
                o = String(e),
                a = yc(i, {
                    type: "URL"
                });
            if (void 0 !== r)
                if (r instanceof yd) t = _c(r);
                else if (n = vd(t = {}, String(r))) throw TypeError(n);
            if (n = vd(a, o, null, t)) throw TypeError(n);
            var s = a.searchParams = new gc,
                u = vc(s);
            u.updateSearchParams(a.query), u.updateURL = function() {
                a.query = String(s) || null
            }, xr || (i.href = bd.call(i), i.origin = wd.call(i), i.protocol = Td.call(i), i.username = kd.call(i), i.password = xd.call(i), i.host = Ad.call(i), i.hostname = Sd.call(i), i.port = Ed.call(i), i.pathname = Od.call(i), i.search = Cd.call(i), i.searchParams = Pd.call(i), i.hash = Id.call(i))
        },
        _d = yd.prototype,
        bd = function() {
            var e = _c(this),
                t = e.scheme,
                n = e.username,
                i = e.password,
                r = e.host,
                o = e.port,
                a = e.path,
                s = e.query,
                u = e.fragment,
                l = t + ":";
            return null !== r ? (l += "//", zc(e) && (l += n + (i ? ":" + i : "") + "@"), l += jc(r), null !== o && (l += ":" + o)) : "file" == t && (l += "//"), l += e.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "", null !== s && (l += "?" + s), null !== u && (l += "#" + u), l
        },
        wd = function() {
            var e = _c(this),
                t = e.scheme,
                n = e.port;
            if ("blob" == t) try {
                return new URL(t.path[0]).origin
            } catch (e) {
                return "null"
            }
            return "file" != t && qc(e) ? t + "://" + jc(e.host) + (null !== n ? ":" + n : "") : "null"
        },
        Td = function() {
            return _c(this).scheme + ":"
        },
        kd = function() {
            return _c(this).username
        },
        xd = function() {
            return _c(this).password
        },
        Ad = function() {
            var e = _c(this),
                t = e.host,
                n = e.port;
            return null === t ? "" : null === n ? jc(t) : jc(t) + ":" + n
        },
        Sd = function() {
            var e = _c(this).host;
            return null === e ? "" : jc(e)
        },
        Ed = function() {
            var e = _c(this).port;
            return null === e ? "" : String(e)
        },
        Od = function() {
            var e = _c(this),
                t = e.path;
            return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : ""
        },
        Cd = function() {
            var e = _c(this).query;
            return e ? "?" + e : ""
        },
        Pd = function() {
            return _c(this).searchParams
        },
        Id = function() {
            var e = _c(this).fragment;
            return e ? "#" + e : ""
        },
        Md = function(e, t) {
            return {
                get: e,
                set: t,
                configurable: !0,
                enumerable: !0
            }
        };
    if (xr && na(_d, {
            href: Md(bd, (function(e) {
                var t = _c(this),
                    n = String(e),
                    i = vd(t, n);
                if (i) throw TypeError(i);
                vc(t.searchParams).updateSearchParams(t.query)
            })),
            origin: Md(wd),
            protocol: Md(Td, (function(e) {
                var t = _c(this);
                vd(t, String(e) + ":", Qc)
            })),
            username: Md(kd, (function(e) {
                var t = _c(this),
                    n = Rl(String(e));
                if (!Vc(t)) {
                    t.username = "";
                    for (var i = 0; i < n.length; i++) t.username += Uc(n[i], Hc)
                }
            })),
            password: Md(xd, (function(e) {
                var t = _c(this),
                    n = Rl(String(e));
                if (!Vc(t)) {
                    t.password = "";
                    for (var i = 0; i < n.length; i++) t.password += Uc(n[i], Hc)
                }
            })),
            host: Md(Ad, (function(e) {
                var t = _c(this);
                t.cannotBeABaseURL || vd(t, String(e), ad)
            })),
            hostname: Md(Sd, (function(e) {
                var t = _c(this);
                t.cannotBeABaseURL || vd(t, String(e), sd)
            })),
            port: Md(Ed, (function(e) {
                var t = _c(this);
                Vc(t) || ("" == (e = String(e)) ? t.port = null : vd(t, e, ud))
            })),
            pathname: Md(Od, (function(e) {
                var t = _c(this);
                t.cannotBeABaseURL || (t.path = [], vd(t, e + "", hd))
            })),
            search: Md(Cd, (function(e) {
                var t = _c(this);
                "" == (e = String(e)) ? t.query = null: ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", vd(t, e, md)), vc(t.searchParams).updateSearchParams(t.query)
            })),
            searchParams: Md(Pd),
            hash: Md(Id, (function(e) {
                var t = _c(this);
                "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", vd(t, e, gd)) : t.fragment = null
            }))
        }), bo(_d, "toJSON", (function() {
            return bd.call(this)
        }), {
            enumerable: !0
        }), bo(_d, "toString", (function() {
            return bd.call(this)
        }), {
            enumerable: !0
        }), mc) {
        var Ld = mc.createObjectURL,
            Rd = mc.revokeObjectURL;
        Ld && bo(yd, "createObjectURL", (function(e) {
            return Ld.apply(mc, arguments)
        })), Rd && bo(yd, "revokeObjectURL", (function(e) {
            return Rd.apply(mc, arguments)
        }))
    }

    function Nd(e) {
        return (Nd = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function jd(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Dd(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function Fd(e, t, n) {
        return t && Dd(e.prototype, t), n && Dd(e, n), e
    }

    function $d(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function Hd(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function Ud(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Hd(Object(n), !0).forEach((function(t) {
                $d(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hd(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function Bd(e, t) {
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

    function qd(e, t) {
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
        }(e, t) || Vd(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function zd(e) {
        return function(e) {
            if (Array.isArray(e)) return Wd(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }(e) || Vd(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Vd(e, t) {
        if (e) {
            if ("string" == typeof e) return Wd(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Wd(e, t) : void 0
        }
    }

    function Wd(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
        return i
    }
    Ta(yd, "URL"), Qo({
            global: !0,
            forced: !kl,
            sham: !xr
        }, {
            URL: yd
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
                        var n = Nd(t);
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
        }(void 0 !== _r ? _r : "undefined" != typeof window ? window : "undefined" != typeof self ? self : _r),
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
                                u = !0,
                                l = this;
                            ["append", "delete", "set"].forEach((function(e) {
                                var t = a[e];
                                a[e] = function() {
                                    t.apply(a, arguments), s && (u = !1, l.search = a.toString(), u = !0)
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
                                    this.search !== c && (c = this.search, u && (s = !1, this.searchParams._fromString(this.search), s = !0))
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
        }(void 0 !== _r ? _r : "undefined" != typeof window ? window : "undefined" != typeof self ? self : _r);
    var Gd = ga("isConcatSpreadable"),
        Xd = lu >= 51 || !kr((function() {
            var e = [];
            return e[Gd] = !1, e.concat()[0] !== e
        })),
        Yd = du("concat"),
        Qd = function(e) {
            if (!Nr(e)) return !1;
            var t = e[Gd];
            return void 0 !== t ? !!t : Jo(e)
        };
    Qo({
        target: "Array",
        proto: !0,
        forced: !Xd || !Yd
    }, {
        concat: function(e) {
            var t, n, i, r, o, a = ea(this),
                s = Sa(a, 0),
                u = 0;
            for (t = -1, i = arguments.length; t < i; t++)
                if (Qd(o = -1 === t ? a : arguments[t])) {
                    if (u + (r = Oo(o.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                    for (n = 0; n < r; n++, u++) n in o && ru(s, u, o[n])
                } else {
                    if (u >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                    ru(s, u++, o)
                } return s.length = u, s
        }
    });
    var Kd = Ca.filter,
        Zd = du("filter"),
        Jd = vs("filter");
    Qo({
        target: "Array",
        proto: !0,
        forced: !Zd || !Jd
    }, {
        filter: function(e) {
            return Kd(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var eh = Ca.find,
        th = !0,
        nh = vs("find");
    "find" in [] && Array(1).find((function() {
        th = !1
    })), Qo({
        target: "Array",
        proto: !0,
        forced: th || !nh
    }, {
        find: function(e) {
            return eh(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Ms("find");
    var ih = ga("iterator"),
        rh = !1;
    try {
        var oh = 0,
            ah = {
                next: function() {
                    return {
                        done: !!oh++
                    }
                },
                return: function() {
                    rh = !0
                }
            };
        ah[ih] = function() {
            return this
        }, Array.from(ah, (function() {
            throw 2
        }))
    } catch (e) {}
    var sh = function(e, t) {
            if (!t && !rh) return !1;
            var n = !1;
            try {
                var i = {};
                i[ih] = function() {
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
        uh = !sh((function(e) {
            Array.from(e)
        }));
    Qo({
        target: "Array",
        stat: !0,
        forced: uh
    }, {
        from: Rl
    });
    var lh = Lo.includes,
        ch = vs("indexOf", {
            ACCESSORS: !0,
            1: 0
        });
    Qo({
        target: "Array",
        proto: !0,
        forced: !ch
    }, {
        includes: function(e) {
            return lh(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Ms("includes");
    var dh = Ca.map,
        hh = du("map"),
        fh = vs("map");
    Qo({
        target: "Array",
        proto: !0,
        forced: !hh || !fh
    }, {
        map: function(e) {
            return dh(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var ph = function(e, t, n) {
            var i, r;
            return zs && "function" == typeof(i = t.constructor) && i !== n && Nr(r = i.prototype) && r !== n.prototype && zs(e, r), e
        },
        mh = "\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff",
        gh = "[" + mh + "]",
        vh = RegExp("^" + gh + gh + "*"),
        yh = RegExp(gh + gh + "*$"),
        _h = function(e) {
            return function(t) {
                var n = String(Lr(t));
                return 1 & e && (n = n.replace(vh, "")), 2 & e && (n = n.replace(yh, "")), n
            }
        },
        bh = {
            start: _h(1),
            end: _h(2),
            trim: _h(3)
        },
        wh = Fo.f,
        Th = zr.f,
        kh = Gr.f,
        xh = bh.trim,
        Ah = Tr.Number,
        Sh = Ah.prototype,
        Eh = "Number" == Pr(ua(Sh)),
        Oh = function(e) {
            var t, n, i, r, o, a, s, u, l = jr(e, !1);
            if ("string" == typeof l && l.length > 2)
                if (43 === (t = (l = xh(l)).charCodeAt(0)) || 45 === t) {
                    if (88 === (n = l.charCodeAt(2)) || 120 === n) return NaN
                } else if (48 === t) {
                switch (l.charCodeAt(1)) {
                    case 66:
                    case 98:
                        i = 2, r = 49;
                        break;
                    case 79:
                    case 111:
                        i = 8, r = 55;
                        break;
                    default:
                        return +l
                }
                for (a = (o = l.slice(2)).length, s = 0; s < a; s++)
                    if ((u = o.charCodeAt(s)) < 48 || u > r) return NaN;
                return parseInt(o, i)
            }
            return +l
        };
    if (Xo("Number", !Ah(" 0o1") || !Ah("0b1") || Ah("+0x1"))) {
        for (var Ch, Ph = function(e) {
                var t = arguments.length < 1 ? 0 : e,
                    n = this;
                return n instanceof Ph && (Eh ? kr((function() {
                    Sh.valueOf.call(n)
                })) : "Number" != Pr(n)) ? ph(new Ah(Oh(t)), n, Ph) : Oh(t)
            }, Ih = xr ? wh(Ah) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), Mh = 0; Ih.length > Mh; Mh++) Fr(Ah, Ch = Ih[Mh]) && !Fr(Ph, Ch) && kh(Ph, Ch, Th(Ah, Ch));
        Ph.prototype = Sh, Sh.constructor = Ph, bo(Tr, "Number", Ph)
    }
    var Lh = kr((function() {
        ta(1)
    }));
    Qo({
        target: "Object",
        stat: !0,
        forced: Lh
    }, {
        keys: function(e) {
            return ta(ea(e))
        }
    });
    var Rh = function(e) {
            if (ol(e)) throw TypeError("The method doesn't accept regular expressions");
            return e
        },
        Nh = ga("match"),
        jh = function(e) {
            var t = /./;
            try {
                "/./" [e](t)
            } catch (n) {
                try {
                    return t[Nh] = !1, "/./" [e](t)
                } catch (e) {}
            }
            return !1
        };
    Qo({
        target: "String",
        proto: !0,
        forced: !jh("includes")
    }, {
        includes: function(e) {
            return !!~String(Lr(this)).indexOf(Rh(e), arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var Dh = !kr((function() {
            return Object.isExtensible(Object.preventExtensions({}))
        })),
        Fh = br((function(e) {
            var t = Gr.f,
                n = so("meta"),
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
                        if (!Nr(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                        if (!Fr(e, n)) {
                            if (!r(e)) return "F";
                            if (!t) return "E";
                            o(e)
                        }
                        return e[n].objectID
                    },
                    getWeakData: function(e, t) {
                        if (!Fr(e, n)) {
                            if (!r(e)) return !0;
                            if (!t) return !1;
                            o(e)
                        }
                        return e[n].weakData
                    },
                    onFreeze: function(e) {
                        return Dh && a.REQUIRED && r(e) && !Fr(e, n) && o(e), e
                    }
                };
            co[n] = !0
        })),
        $h = (Fh.REQUIRED, Fh.fastKey, Fh.getWeakData, Fh.onFreeze, br((function(e) {
            var t = function(e, t) {
                this.stopped = e, this.result = t
            };
            (e.exports = function(e, n, i, r, o) {
                var a, s, u, l, c, d, h, f = xa(n, i, r ? 2 : 1);
                if (o) a = e;
                else {
                    if ("function" != typeof(s = Ll(e))) throw TypeError("Target is not iterable");
                    if (Il(s)) {
                        for (u = 0, l = Oo(e.length); l > u; u++)
                            if ((c = r ? f(Vr(h = e[u])[0], h[1]) : f(e[u])) && c instanceof t) return c;
                        return new t(!1)
                    }
                    a = s.call(e)
                }
                for (d = a.next; !(h = d.call(a)).done;)
                    if ("object" == typeof(c = Ol(a, f, h.value, r)) && c && c instanceof t) return c;
                return new t(!1)
            }).stop = function(e) {
                return new t(!0, e)
            }
        }))),
        Hh = Fh.getWeakData,
        Uh = _o.set,
        Bh = _o.getterFor,
        qh = Ca.find,
        zh = Ca.findIndex,
        Vh = 0,
        Wh = function(e) {
            return e.frozen || (e.frozen = new Gh)
        },
        Gh = function() {
            this.entries = []
        },
        Xh = function(e, t) {
            return qh(e.entries, (function(e) {
                return e[0] === t
            }))
        };
    Gh.prototype = {
        get: function(e) {
            var t = Xh(this, e);
            if (t) return t[1]
        },
        has: function(e) {
            return !!Xh(this, e)
        },
        set: function(e, t) {
            var n = Xh(this, e);
            n ? n[1] = t : this.entries.push([e, t])
        },
        delete: function(e) {
            var t = zh(this.entries, (function(t) {
                return t[0] === e
            }));
            return ~t && this.entries.splice(t, 1), !!~t
        }
    };
    var Yh = {
            getConstructor: function(e, t, n, i) {
                var r = e((function(e, o) {
                        xl(e, r, t), Uh(e, {
                            type: t,
                            id: Vh++,
                            frozen: void 0
                        }), null != o && $h(o, e[i], e, n)
                    })),
                    o = Bh(t),
                    a = function(e, t, n) {
                        var i = o(e),
                            r = Hh(Vr(t), !0);
                        return !0 === r ? Wh(i).set(t, n) : r[i.id] = n, e
                    };
                return ql(r.prototype, {
                    delete: function(e) {
                        var t = o(this);
                        if (!Nr(e)) return !1;
                        var n = Hh(e);
                        return !0 === n ? Wh(t).delete(e) : n && Fr(n, t.id) && delete n[t.id]
                    },
                    has: function(e) {
                        var t = o(this);
                        if (!Nr(e)) return !1;
                        var n = Hh(e);
                        return !0 === n ? Wh(t).has(e) : n && Fr(n, t.id)
                    }
                }), ql(r.prototype, n ? {
                    get: function(e) {
                        var t = o(this);
                        if (Nr(e)) {
                            var n = Hh(e);
                            return !0 === n ? Wh(t).get(e) : n ? n[t.id] : void 0
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
        Qh = (br((function(e) {
            var t, n = _o.enforce,
                i = !Tr.ActiveXObject && "ActiveXObject" in Tr,
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
                        a = Tr[e],
                        s = a && a.prototype,
                        u = a,
                        l = {},
                        c = function(e) {
                            var t = s[e];
                            bo(s, e, "add" == e ? function(e) {
                                return t.call(this, 0 === e ? 0 : e), this
                            } : "delete" == e ? function(e) {
                                return !(r && !Nr(e)) && t.call(this, 0 === e ? 0 : e)
                            } : "get" == e ? function(e) {
                                return r && !Nr(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                            } : "has" == e ? function(e) {
                                return !(r && !Nr(e)) && t.call(this, 0 === e ? 0 : e)
                            } : function(e, n) {
                                return t.call(this, 0 === e ? 0 : e, n), this
                            })
                        };
                    if (Xo(e, "function" != typeof a || !(r || s.forEach && !kr((function() {
                            (new a).entries().next()
                        }))))) u = n.getConstructor(t, e, i, o), Fh.REQUIRED = !0;
                    else if (Xo(e, !0)) {
                        var d = new u,
                            h = d[o](r ? {} : -0, 1) != d,
                            f = kr((function() {
                                d.has(1)
                            })),
                            p = sh((function(e) {
                                new a(e)
                            })),
                            m = !r && kr((function() {
                                for (var e = new a, t = 5; t--;) e[o](t, t);
                                return !e.has(-0)
                            }));
                        p || ((u = t((function(t, n) {
                            xl(t, u, e);
                            var r = ph(new a, t, u);
                            return null != n && $h(n, r[o], r, i), r
                        }))).prototype = s, s.constructor = u), (f || m) && (c("delete"), c("has"), i && c("get")), (m || h) && c(o), r && s.clear && delete s.clear
                    }
                    return l[e] = u, Qo({
                        global: !0,
                        forced: u != a
                    }, l), Ta(u, e), r || n.setStrong(u, e, i), u
                }("WeakMap", o, Yh);
            if (io && i) {
                t = Yh.getConstructor(o, "WeakMap", !0), Fh.REQUIRED = !0;
                var s = a.prototype,
                    u = s.delete,
                    l = s.has,
                    c = s.get,
                    d = s.set;
                ql(s, {
                    delete: function(e) {
                        if (Nr(e) && !r(e)) {
                            var i = n(this);
                            return i.frozen || (i.frozen = new t), u.call(this, e) || i.frozen.delete(e)
                        }
                        return u.call(this, e)
                    },
                    has: function(e) {
                        if (Nr(e) && !r(e)) {
                            var i = n(this);
                            return i.frozen || (i.frozen = new t), l.call(this, e) || i.frozen.has(e)
                        }
                        return l.call(this, e)
                    },
                    get: function(e) {
                        if (Nr(e) && !r(e)) {
                            var i = n(this);
                            return i.frozen || (i.frozen = new t), l.call(this, e) ? c.call(this, e) : i.frozen.get(e)
                        }
                        return c.call(this, e)
                    },
                    set: function(e, i) {
                        if (Nr(e) && !r(e)) {
                            var o = n(this);
                            o.frozen || (o.frozen = new t), l.call(this, e) ? d.call(this, e, i) : o.frozen.set(e, i)
                        } else d.call(this, e, i);
                        return this
                    }
                })
            }
        })), Ca.every),
        Kh = fs("every"),
        Zh = vs("every");
    Qo({
        target: "Array",
        proto: !0,
        forced: !Kh || !Zh
    }, {
        every: function(e) {
            return Qh(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Qo({
        target: "Object",
        stat: !0,
        forced: Object.assign !== El
    }, {
        assign: El
    });
    var Jh = bh.trim;
    Qo({
        target: "String",
        proto: !0,
        forced: function(e) {
            return kr((function() {
                return !!mh[e]() || "â€‹Â…á Ž" != "â€‹Â…á Ž" [e]() || mh[e].name !== e
            }))
        }("trim")
    }, {
        trim: function() {
            return Jh(this)
        }
    });
    var ef = Ca.some,
        tf = fs("some"),
        nf = vs("some");
    Qo({
        target: "Array",
        proto: !0,
        forced: !tf || !nf
    }, {
        some: function(e) {
            return ef(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var rf = "".repeat || function(e) {
            var t = String(Lr(this)),
                n = "",
                i = So(e);
            if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions");
            for (; i > 0;
                (i >>>= 1) && (t += t)) 1 & i && (n += t);
            return n
        },
        of = 1..toFixed,
        af = Math.floor,
        sf = function(e, t, n) {
            return 0 === t ? n : t % 2 == 1 ? sf(e, t - 1, n * e) : sf(e * e, t / 2, n)
        },
        uf = of && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !kr((function() {
            of .call({})
        }));
    Qo({
        target: "Number",
        proto: !0,
        forced: uf
    }, {
        toFixed: function(e) {
            var t, n, i, r, o = function(e) {
                    if ("number" != typeof e && "Number" != Pr(e)) throw TypeError("Incorrect invocation");
                    return +e
                }(this),
                a = So(e),
                s = [0, 0, 0, 0, 0, 0],
                u = "",
                l = "0",
                c = function(e, t) {
                    for (var n = -1, i = t; ++n < 6;) i += e * s[n], s[n] = i % 1e7, i = af(i / 1e7)
                },
                d = function(e) {
                    for (var t = 6, n = 0; --t >= 0;) n += s[t], s[t] = af(n / e), n = n % e * 1e7
                },
                h = function() {
                    for (var e = 6, t = ""; --e >= 0;)
                        if ("" !== t || 0 === e || 0 !== s[e]) {
                            var n = String(s[e]);
                            t = "" === t ? n : t + rf.call("0", 7 - n.length) + n
                        } return t
                };
            if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");
            if (o != o) return "NaN";
            if (o <= -1e21 || o >= 1e21) return String(o);
            if (o < 0 && (u = "-", o = -o), o > 1e-21)
                if (n = (t = function(e) {
                        for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
                        for (; n >= 2;) t += 1, n /= 2;
                        return t
                    }(o * sf(2, 69, 1)) - 69) < 0 ? o * sf(2, -t, 1) : o / sf(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
                    for (c(0, n), i = a; i >= 7;) c(1e7, 0), i -= 7;
                    for (c(sf(10, i, 1), 0), i = t - 1; i >= 23;) d(1 << 23), i -= 23;
                    d(1 << i), c(1, 1), d(2), l = h()
                } else c(0, n), c(1 << -t, 0), l = h() + rf.call("0", a);
            return l = a > 0 ? u + ((r = l.length) <= a ? "0." + rf.call("0", a - r) + l : l.slice(0, r - a) + "." + l.slice(r - a)) : u + l
        }
    });
    var lf = Er.f,
        cf = function(e) {
            return function(t) {
                for (var n, i = Rr(t), r = ta(i), o = r.length, a = 0, s = []; o > a;) n = r[a++], xr && !lf.call(i, n) || s.push(e ? [n, i[n]] : i[n]);
                return s
            }
        },
        df = {
            entries: cf(!0),
            values: cf(!1)
        },
        hf = df.entries;
    Qo({
        target: "Object",
        stat: !0
    }, {
        entries: function(e) {
            return hf(e)
        }
    });
    var ff = df.values;
    Qo({
        target: "Object",
        stat: !0
    }, {
        values: function(e) {
            return ff(e)
        }
    }), Qo({
        target: "Number",
        stat: !0
    }, {
        isNaN: function(e) {
            return e != e
        }
    });
    var pf = zr.f,
        mf = kr((function() {
            pf(1)
        }));

    function gf(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function vf(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function yf(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function _f(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? yf(Object(n), !0).forEach((function(t) {
                vf(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yf(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }
    Qo({
        target: "Object",
        stat: !0,
        forced: !xr || mf,
        sham: !xr
    }, {
        getOwnPropertyDescriptor: function(e, t) {
            return pf(Rr(e), t)
        }
    }), Qo({
        target: "Object",
        stat: !0,
        sham: !xr
    }, {
        getOwnPropertyDescriptors: function(e) {
            for (var t, n, i = Rr(e), r = zr.f, o = Ho(i), a = {}, s = 0; o.length > s;) void 0 !== (n = r(i, t = o[s++])) && ru(a, t, n);
            return a
        }
    }), Xu("match", 1, (function(e, t, n) {
        return [function(t) {
            var n = Lr(this),
                i = null == t ? void 0 : t[e];
            return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
        }, function(e) {
            var i = n(t, e, this);
            if (i.done) return i.value;
            var r = Vr(e),
                o = String(this);
            if (!r.global) return Ku(r, o);
            var a = r.unicode;
            r.lastIndex = 0;
            for (var s, u = [], l = 0; null !== (s = Ku(r, o));) {
                var c = String(s[0]);
                u[l] = c, "" === c && (r.lastIndex = Qu(o, Oo(r.lastIndex), a)), l++
            }
            return 0 === l ? null : u
        }]
    }));
    var bf = {
        addCSS: !0,
        thumbWidth: 15,
        watch: !0
    };

    function wf(e, t) {
        return function() {
            return Array.from(document.querySelectorAll(t)).includes(this)
        }.call(e, t)
    }
    var Tf = function(e) {
            return null != e ? e.constructor : null
        },
        kf = function(e, t) {
            return !!(e && t && e instanceof t)
        },
        xf = function(e) {
            return null == e
        },
        Af = function(e) {
            return Tf(e) === Object
        },
        Sf = function(e) {
            return Tf(e) === String
        },
        Ef = function(e) {
            return Array.isArray(e)
        },
        Of = function(e) {
            return kf(e, NodeList)
        },
        Cf = Sf,
        Pf = Ef,
        If = Of,
        Mf = function(e) {
            return kf(e, Element)
        },
        Lf = function(e) {
            return kf(e, Event)
        },
        Rf = function(e) {
            return xf(e) || (Sf(e) || Ef(e) || Of(e)) && !e.length || Af(e) && !Object.keys(e).length
        };

    function Nf(e, t) {
        if (1 > t) {
            var n = function(e) {
                var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
            }(t);
            return parseFloat(e.toFixed(n))
        }
        return Math.round(e / t) * t
    }
    var jf, Df, Ff, $f = function() {
            function e(t, n) {
                (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                })(this, e), Mf(t) ? this.element = t : Cf(t) && (this.element = document.querySelector(t)), Mf(this.element) && Rf(this.element.rangeTouch) && (this.config = _f({}, bf, {}, n), this.init())
            }
            return function(e, t, n) {
                t && gf(e.prototype, t), n && gf(e, n)
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
                    if (!e.enabled || !Lf(t)) return null;
                    var n, i = t.target,
                        r = t.changedTouches[0],
                        o = parseFloat(i.getAttribute("min")) || 0,
                        a = parseFloat(i.getAttribute("max")) || 100,
                        s = parseFloat(i.getAttribute("step")) || 1,
                        u = i.getBoundingClientRect(),
                        l = 100 / u.width * (this.config.thumbWidth / 2) / 100;
                    return 0 > (n = 100 / u.width * (r.clientX - u.left)) ? n = 0 : 100 < n && (n = 100), 50 > n ? n -= (100 - 2 * n) * l : 50 < n && (n += 2 * (n - 50) * l), o + Nf(n / 100 * (a - o), s)
                }
            }, {
                key: "set",
                value: function(t) {
                    e.enabled && Lf(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function(e, t) {
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
                    if (Rf(t) || Cf(t) ? i = Array.from(document.querySelectorAll(Cf(t) ? t : 'input[type="range"]')) : Mf(t) ? i = [t] : If(t) ? i = Array.from(t) : Pf(t) && (i = t.filter(Mf)), Rf(i)) return null;
                    var r = _f({}, bf, {}, n);
                    if (Cf(t) && r.watch) {
                        var o = new MutationObserver((function(n) {
                            Array.from(n).forEach((function(n) {
                                Array.from(n.addedNodes).forEach((function(n) {
                                    Mf(n) && wf(n, t) && new e(n, r)
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
        Hf = Tr.Promise,
        Uf = ga("species"),
        Bf = function(e) {
            var t = ko(e),
                n = Gr.f;
            xr && t && !t[Uf] && n(t, Uf, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        },
        qf = /(iphone|ipod|ipad).*applewebkit/i.test(ou),
        zf = Tr.location,
        Vf = Tr.setImmediate,
        Wf = Tr.clearImmediate,
        Gf = Tr.process,
        Xf = Tr.MessageChannel,
        Yf = Tr.Dispatch,
        Qf = 0,
        Kf = {},
        Zf = function(e) {
            if (Kf.hasOwnProperty(e)) {
                var t = Kf[e];
                delete Kf[e], t()
            }
        },
        Jf = function(e) {
            return function() {
                Zf(e)
            }
        },
        ep = function(e) {
            Zf(e.data)
        },
        tp = function(e) {
            Tr.postMessage(e + "", zf.protocol + "//" + zf.host)
        };
    Vf && Wf || (Vf = function(e) {
        for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
        return Kf[++Qf] = function() {
            ("function" == typeof e ? e : Function(e)).apply(void 0, t)
        }, jf(Qf), Qf
    }, Wf = function(e) {
        delete Kf[e]
    }, "process" == Pr(Gf) ? jf = function(e) {
        Gf.nextTick(Jf(e))
    } : Yf && Yf.now ? jf = function(e) {
        Yf.now(Jf(e))
    } : Xf && !qf ? (Ff = (Df = new Xf).port2, Df.port1.onmessage = ep, jf = xa(Ff.postMessage, Ff, 1)) : !Tr.addEventListener || "function" != typeof postMessage || Tr.importScripts || kr(tp) || "file:" === zf.protocol ? jf = "onreadystatechange" in Ur("script") ? function(e) {
        ia.appendChild(Ur("script")).onreadystatechange = function() {
            ia.removeChild(this), Zf(e)
        }
    } : function(e) {
        setTimeout(Jf(e), 0)
    } : (jf = tp, Tr.addEventListener("message", ep, !1)));
    var np, ip, rp, op, ap, sp, up, lp, cp = {
            set: Vf,
            clear: Wf
        },
        dp = zr.f,
        hp = cp.set,
        fp = Tr.MutationObserver || Tr.WebKitMutationObserver,
        pp = Tr.process,
        mp = Tr.Promise,
        gp = "process" == Pr(pp),
        vp = dp(Tr, "queueMicrotask"),
        yp = vp && vp.value;
    yp || (np = function() {
        var e, t;
        for (gp && (e = pp.domain) && e.exit(); ip;) {
            t = ip.fn, ip = ip.next;
            try {
                t()
            } catch (e) {
                throw ip ? op() : rp = void 0, e
            }
        }
        rp = void 0, e && e.enter()
    }, gp ? op = function() {
        pp.nextTick(np)
    } : fp && !qf ? (ap = !0, sp = document.createTextNode(""), new fp(np).observe(sp, {
        characterData: !0
    }), op = function() {
        sp.data = ap = !ap
    }) : mp && mp.resolve ? (up = mp.resolve(void 0), lp = up.then, op = function() {
        lp.call(up, np)
    }) : op = function() {
        hp.call(Tr, np)
    });
    var _p, bp, wp, Tp, kp = yp || function(e) {
            var t = {
                fn: e,
                next: void 0
            };
            rp && (rp.next = t), ip || (ip = t, op()), rp = t
        },
        xp = function(e) {
            var t, n;
            this.promise = new e((function(e, i) {
                if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
                t = e, n = i
            })), this.resolve = ka(t), this.reject = ka(n)
        },
        Ap = {
            f: function(e) {
                return new xp(e)
            }
        },
        Sp = function(e, t) {
            if (Vr(e), Nr(t) && t.constructor === e) return t;
            var n = Ap.f(e);
            return (0, n.resolve)(t), n.promise
        },
        Ep = function(e) {
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
        Op = cp.set,
        Cp = ga("species"),
        Pp = "Promise",
        Ip = _o.get,
        Mp = _o.set,
        Lp = _o.getterFor(Pp),
        Rp = Hf,
        Np = Tr.TypeError,
        jp = Tr.document,
        Dp = Tr.process,
        Fp = ko("fetch"),
        $p = Ap.f,
        Hp = $p,
        Up = "process" == Pr(Dp),
        Bp = !!(jp && jp.createEvent && Tr.dispatchEvent),
        qp = Xo(Pp, (function() {
            if (!(to(Rp) !== String(Rp))) {
                if (66 === lu) return !0;
                if (!Up && "function" != typeof PromiseRejectionEvent) return !0
            }
            if (lu >= 51 && /native code/.test(Rp)) return !1;
            var e = Rp.resolve(1),
                t = function(e) {
                    e((function() {}), (function() {}))
                };
            return (e.constructor = {})[Cp] = t, !(e.then((function() {})) instanceof t)
        })),
        zp = qp || !sh((function(e) {
            Rp.all(e).catch((function() {}))
        })),
        Vp = function(e) {
            var t;
            return !(!Nr(e) || "function" != typeof(t = e.then)) && t
        },
        Wp = function(e, t, n) {
            if (!t.notified) {
                t.notified = !0;
                var i = t.reactions;
                kp((function() {
                    for (var r = t.value, o = 1 == t.state, a = 0; i.length > a;) {
                        var s, u, l, c = i[a++],
                            d = o ? c.ok : c.fail,
                            h = c.resolve,
                            f = c.reject,
                            p = c.domain;
                        try {
                            d ? (o || (2 === t.rejection && Qp(e, t), t.rejection = 1), !0 === d ? s = r : (p && p.enter(), s = d(r), p && (p.exit(), l = !0)), s === c.promise ? f(Np("Promise-chain cycle")) : (u = Vp(s)) ? u.call(s, h, f) : h(s)) : f(r)
                        } catch (e) {
                            p && !l && p.exit(), f(e)
                        }
                    }
                    t.reactions = [], t.notified = !1, n && !t.rejection && Xp(e, t)
                }))
            }
        },
        Gp = function(e, t, n) {
            var i, r;
            Bp ? ((i = jp.createEvent("Event")).promise = t, i.reason = n, i.initEvent(e, !1, !0), Tr.dispatchEvent(i)) : i = {
                promise: t,
                reason: n
            }, (r = Tr["on" + e]) ? r(i) : "unhandledrejection" === e && function(e, t) {
                var n = Tr.console;
                n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
            }("Unhandled promise rejection", n)
        },
        Xp = function(e, t) {
            Op.call(Tr, (function() {
                var n, i = t.value;
                if (Yp(t) && (n = Ep((function() {
                        Up ? Dp.emit("unhandledRejection", i, e) : Gp("unhandledrejection", e, i)
                    })), t.rejection = Up || Yp(t) ? 2 : 1, n.error)) throw n.value
            }))
        },
        Yp = function(e) {
            return 1 !== e.rejection && !e.parent
        },
        Qp = function(e, t) {
            Op.call(Tr, (function() {
                Up ? Dp.emit("rejectionHandled", e) : Gp("rejectionhandled", e, t.value)
            }))
        },
        Kp = function(e, t, n, i) {
            return function(r) {
                e(t, n, r, i)
            }
        },
        Zp = function(e, t, n, i) {
            t.done || (t.done = !0, i && (t = i), t.value = n, t.state = 2, Wp(e, t, !0))
        },
        Jp = function(e, t, n, i) {
            if (!t.done) {
                t.done = !0, i && (t = i);
                try {
                    if (e === n) throw Np("Promise can't be resolved itself");
                    var r = Vp(n);
                    r ? kp((function() {
                        var i = {
                            done: !1
                        };
                        try {
                            r.call(n, Kp(Jp, e, i, t), Kp(Zp, e, i, t))
                        } catch (n) {
                            Zp(e, i, n, t)
                        }
                    })) : (t.value = n, t.state = 1, Wp(e, t, !1))
                } catch (n) {
                    Zp(e, {
                        done: !1
                    }, n, t)
                }
            }
        };
    qp && (Rp = function(e) {
        xl(this, Rp, Pp), ka(e), _p.call(this);
        var t = Ip(this);
        try {
            e(Kp(Jp, this, t), Kp(Zp, this, t))
        } catch (e) {
            Zp(this, t, e)
        }
    }, (_p = function(e) {
        Mp(this, {
            type: Pp,
            done: !1,
            notified: !1,
            parent: !1,
            reactions: [],
            rejection: !1,
            state: 0,
            value: void 0
        })
    }).prototype = ql(Rp.prototype, {
        then: function(e, t) {
            var n = Lp(this),
                i = $p(sl(this, Rp));
            return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = Up ? Dp.domain : void 0, n.parent = !0, n.reactions.push(i), 0 != n.state && Wp(this, n, !1), i.promise
        },
        catch: function(e) {
            return this.then(void 0, e)
        }
    }), bp = function() {
        var e = new _p,
            t = Ip(e);
        this.promise = e, this.resolve = Kp(Jp, e, t), this.reject = Kp(Zp, e, t)
    }, Ap.f = $p = function(e) {
        return e === Rp || e === wp ? new bp(e) : Hp(e)
    }, "function" == typeof Hf && (Tp = Hf.prototype.then, bo(Hf.prototype, "then", (function(e, t) {
        var n = this;
        return new Rp((function(e, t) {
            Tp.call(n, e, t)
        })).then(e, t)
    }), {
        unsafe: !0
    }), "function" == typeof Fp && Qo({
        global: !0,
        enumerable: !0,
        forced: !0
    }, {
        fetch: function(e) {
            return Sp(Rp, Fp.apply(Tr, arguments))
        }
    }))), Qo({
        global: !0,
        wrap: !0,
        forced: qp
    }, {
        Promise: Rp
    }), Ta(Rp, Pp, !1), Bf(Pp), wp = ko(Pp), Qo({
        target: Pp,
        stat: !0,
        forced: qp
    }, {
        reject: function(e) {
            var t = $p(this);
            return t.reject.call(void 0, e), t.promise
        }
    }), Qo({
        target: Pp,
        stat: !0,
        forced: qp
    }, {
        resolve: function(e) {
            return Sp(this, e)
        }
    }), Qo({
        target: Pp,
        stat: !0,
        forced: zp
    }, {
        all: function(e) {
            var t = this,
                n = $p(t),
                i = n.resolve,
                r = n.reject,
                o = Ep((function() {
                    var n = ka(t.resolve),
                        o = [],
                        a = 0,
                        s = 1;
                    $h(e, (function(e) {
                        var u = a++,
                            l = !1;
                        o.push(void 0), s++, n.call(t, e).then((function(e) {
                            l || (l = !0, o[u] = e, --s || i(o))
                        }), r)
                    })), --s || i(o)
                }));
            return o.error && r(o.value), n.promise
        },
        race: function(e) {
            var t = this,
                n = $p(t),
                i = n.reject,
                r = Ep((function() {
                    var r = ka(t.resolve);
                    $h(e, (function(e) {
                        r.call(t, e).then(n.resolve, i)
                    }))
                }));
            return r.error && i(r.value), n.promise
        }
    });
    var em, tm = zr.f,
        nm = "".startsWith,
        im = Math.min,
        rm = jh("startsWith"),
        om = !(rm || (em = tm(String.prototype, "startsWith"), !em || em.writable));
    Qo({
        target: "String",
        proto: !0,
        forced: !om && !rm
    }, {
        startsWith: function(e) {
            var t = String(Lr(this));
            Rh(e);
            var n = Oo(im(arguments.length > 1 ? arguments[1] : void 0, t.length)),
                i = String(e);
            return nm ? nm.call(t, i, n) : t.slice(n, n + i.length) === i
        }
    });
    var am, sm, um, lm = function(e) {
            return null != e ? e.constructor : null
        },
        cm = function(e, t) {
            return Boolean(e && t && e instanceof t)
        },
        dm = function(e) {
            return null == e
        },
        hm = function(e) {
            return lm(e) === Object
        },
        fm = function(e) {
            return lm(e) === String
        },
        pm = function(e) {
            return lm(e) === Function
        },
        mm = function(e) {
            return Array.isArray(e)
        },
        gm = function(e) {
            return cm(e, NodeList)
        },
        vm = function(e) {
            return dm(e) || (fm(e) || mm(e) || gm(e)) && !e.length || hm(e) && !Object.keys(e).length
        },
        ym = dm,
        _m = hm,
        bm = function(e) {
            return lm(e) === Number && !Number.isNaN(e)
        },
        wm = fm,
        Tm = function(e) {
            return lm(e) === Boolean
        },
        km = pm,
        xm = mm,
        Am = gm,
        Sm = function(e) {
            return cm(e, Element)
        },
        Em = function(e) {
            return cm(e, Event)
        },
        Om = function(e) {
            return cm(e, KeyboardEvent)
        },
        Cm = function(e) {
            return cm(e, TextTrack) || !dm(e) && fm(e.kind)
        },
        Pm = function(e) {
            return cm(e, Promise) && pm(e.then)
        },
        Im = function(e) {
            if (cm(e, window.URL)) return !0;
            if (!fm(e)) return !1;
            var t = e;
            e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
            try {
                return !vm(new URL(t).hostname)
            } catch (e) {
                return !1
            }
        },
        Mm = vm,
        Lm = (am = document.createElement("span"), sm = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, um = Object.keys(sm).find((function(e) {
            return void 0 !== am.style[e]
        })), !!wm(um) && sm[um]);

    function Rm(e, t) {
        setTimeout((function() {
            try {
                e.hidden = !0, e.offsetHeight, e.hidden = !1
            } catch (e) {}
        }), t)
    }
    var Nm = {
            isIE:
                /* @cc_on!@ */
                !!document.documentMode,
            isEdge: window.navigator.userAgent.includes("Edge"),
            isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
            isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
            isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
        },
        jm = function(e) {
            return function(t, n, i, r) {
                ka(n);
                var o = ea(t),
                    a = Mr(o),
                    s = Oo(o.length),
                    u = e ? s - 1 : 0,
                    l = e ? -1 : 1;
                if (i < 2)
                    for (;;) {
                        if (u in a) {
                            r = a[u], u += l;
                            break
                        }
                        if (u += l, e ? u < 0 : s <= u) throw TypeError("Reduce of empty array with no initial value")
                    }
                for (; e ? u >= 0 : s > u; u += l) u in a && (r = n(r, a[u], u, o));
                return r
            }
        },
        Dm = {
            left: jm(!1),
            right: jm(!0)
        }.left,
        Fm = fs("reduce"),
        $m = vs("reduce", {
            1: 0
        });

    function Hm(e, t) {
        return t.split(".").reduce((function(e, t) {
            return e && e[t]
        }), e)
    }

    function Um() {
        for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
        if (!n.length) return e;
        var r = n.shift();
        return _m(r) ? (Object.keys(r).forEach((function(t) {
            _m(r[t]) ? (Object.keys(e).includes(t) || Object.assign(e, $d({}, t, {})), Um(e[t], r[t])) : Object.assign(e, $d({}, t, r[t]))
        })), Um.apply(void 0, [e].concat(n))) : e
    }

    function Bm(e, t) {
        var n = e.length ? e : [e];
        Array.from(n).reverse().forEach((function(e, n) {
            var i = n > 0 ? t.cloneNode(!0) : t,
                r = e.parentNode,
                o = e.nextSibling;
            i.appendChild(e), o ? r.insertBefore(i, o) : r.appendChild(i)
        }))
    }

    function qm(e, t) {
        Sm(e) && !Mm(t) && Object.entries(t).filter((function(e) {
            var t = qd(e, 2)[1];
            return !ym(t)
        })).forEach((function(t) {
            var n = qd(t, 2),
                i = n[0],
                r = n[1];
            return e.setAttribute(i, r)
        }))
    }

    function zm(e, t, n) {
        var i = document.createElement(e);
        return _m(t) && qm(i, t), wm(n) && (i.innerText = n), i
    }

    function Vm(e, t, n, i) {
        Sm(t) && t.appendChild(zm(e, n, i))
    }

    function Wm(e) {
        Am(e) || xm(e) ? Array.from(e).forEach(Wm) : Sm(e) && Sm(e.parentNode) && e.parentNode.removeChild(e)
    }

    function Gm(e) {
        if (Sm(e))
            for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
    }

    function Xm(e, t) {
        return Sm(t) && Sm(t.parentNode) && Sm(e) ? (t.parentNode.replaceChild(e, t), e) : null
    }

    function Ym(e, t) {
        if (!wm(e) || Mm(e)) return {};
        var n = {},
            i = Um({}, t);
        return e.split(",").forEach((function(e) {
            var t = e.trim(),
                r = t.replace(".", ""),
                o = t.replace(/[[\]]/g, "").split("="),
                a = qd(o, 1)[0],
                s = o.length > 1 ? o[1].replace(/["']/g, "") : "";
            switch (t.charAt(0)) {
                case ".":
                    wm(i.class) ? n.class = "".concat(i.class, " ").concat(r) : n.class = r;
                    break;
                case "#":
                    n.id = t.replace("#", "");
                    break;
                case "[":
                    n[a] = s
            }
        })), Um(i, n)
    }

    function Qm(e, t) {
        if (Sm(e)) {
            var n = t;
            Tm(n) || (n = !e.hidden), e.hidden = n
        }
    }

    function Km(e, t, n) {
        if (Am(e)) return Array.from(e).map((function(e) {
            return Km(e, t, n)
        }));
        if (Sm(e)) {
            var i = "toggle";
            return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t)
        }
        return !1
    }

    function Zm(e, t) {
        return Sm(e) && e.classList.contains(t)
    }

    function Jm(e, t) {
        var n = Element.prototype;
        return (n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function() {
            return Array.from(document.querySelectorAll(t)).includes(this)
        }).call(e, t)
    }

    function eg(e) {
        return this.elements.container.querySelectorAll(e)
    }

    function tg(e) {
        return this.elements.container.querySelector(e)
    }

    function ng() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        Sm(e) && (e.focus({
            preventScroll: !0
        }), t && Km(e, this.config.classNames.tabFocus))
    }
    Qo({
        target: "Array",
        proto: !0,
        forced: !Fm || !$m
    }, {
        reduce: function(e) {
            return Dm(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var ig, rg = {
            "audio/ogg": "vorbis",
            "audio/wav": "1",
            "video/webm": "vp8, vorbis",
            "video/mp4": "avc1.42E01E, mp4a.40.2",
            "video/ogg": "theora"
        },
        og = {
            audio: "canPlayType" in document.createElement("audio"),
            video: "canPlayType" in document.createElement("video"),
            check: function(e, t, n) {
                var i = Nm.isIPhone && n && og.playsinline,
                    r = og[e] || "html5" !== t;
                return {
                    api: r,
                    ui: r && og.rangeInput && ("video" !== e || !Nm.isIPhone || i)
                }
            },
            pip: !(Nm.isIPhone || !km(zm("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || zm("video").disablePictureInPicture)),
            airplay: km(window.WebKitPlaybackTargetAvailabilityEvent),
            playsinline: "playsInline" in document.createElement("video"),
            mime: function(e) {
                if (Mm(e)) return !1;
                var t = qd(e.split("/"), 1)[0],
                    n = e;
                if (!this.isHTML5 || t !== this.type) return !1;
                Object.keys(rg).includes(n) && (n += '; codecs="'.concat(rg[e], '"'));
                try {
                    return Boolean(n && this.media.canPlayType(n).replace(/no/, ""))
                } catch (e) {
                    return !1
                }
            },
            textTracks: "textTracks" in document.createElement("video"),
            rangeInput: (ig = document.createElement("input"), ig.type = "range", "range" === ig.type),
            touch: "ontouchstart" in document.documentElement,
            transitions: !1 !== Lm,
            reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
        },
        ag = function() {
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

    function sg(e, t, n) {
        var i = this,
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
            a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        if (e && "addEventListener" in e && !Mm(t) && km(n)) {
            var s = t.split(" "),
                u = a;
            ag && (u = {
                passive: o,
                capture: a
            }), s.forEach((function(t) {
                i && i.eventListeners && r && i.eventListeners.push({
                    element: e,
                    type: t,
                    callback: n,
                    options: u
                }), e[r ? "addEventListener" : "removeEventListener"](t, n, u)
            }))
        }
    }

    function ug(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 ? arguments[2] : void 0,
            i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        sg.call(this, e, t, n, !0, i, r)
    }

    function lg(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 ? arguments[2] : void 0,
            i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        sg.call(this, e, t, n, !1, i, r)
    }

    function cg(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 ? arguments[2] : void 0,
            r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            a = function a() {
                lg(e, n, a, r, o);
                for (var s = arguments.length, u = new Array(s), l = 0; l < s; l++) u[l] = arguments[l];
                i.apply(t, u)
            };
        sg.call(this, e, n, a, !0, r, o)
    }

    function dg(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (Sm(e) && !Mm(t)) {
            var r = new CustomEvent(t, {
                bubbles: n,
                detail: Ud(Ud({}, i), {}, {
                    plyr: this
                })
            });
            e.dispatchEvent(r)
        }
    }

    function hg() {
        this && this.eventListeners && (this.eventListeners.forEach((function(e) {
            var t = e.element,
                n = e.type,
                i = e.callback,
                r = e.options;
            t.removeEventListener(n, i, r)
        })), this.eventListeners = [])
    }

    function fg() {
        var e = this;
        return new Promise((function(t) {
            return e.ready ? setTimeout(t, 0) : ug.call(e, e.elements.container, "ready", t)
        })).then((function() {}))
    }

    function pg(e) {
        Pm(e) && e.then(null, (function() {}))
    }

    function mg(e) {
        return !!(xm(e) || wm(e) && e.includes(":")) && (xm(e) ? e : e.split(":")).map(Number).every(bm)
    }

    function gg(e) {
        if (!xm(e) || !e.every(bm)) return null;
        var t = qd(e, 2),
            n = t[0],
            i = t[1],
            r = function e(t, n) {
                return 0 === n ? t : e(n, t % n)
            }(n, i);
        return [n / r, i / r]
    }

    function vg(e) {
        var t = function(e) {
                return mg(e) ? e.split(":").map(Number) : null
            },
            n = t(e);
        if (null === n && (n = t(this.config.ratio)), null === n && !Mm(this.embed) && xm(this.embed.ratio) && (n = this.embed.ratio), null === n && this.isHTML5) {
            var i = this.media;
            n = gg([i.videoWidth, i.videoHeight])
        }
        return n
    }

    function yg(e) {
        if (!this.isVideo) return {};
        var t = this.elements.wrapper,
            n = vg.call(this, e),
            i = qd(xm(n) ? n : [0, 0], 2),
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
    var _g = {
        getSources: function() {
            var e = this;
            return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter((function(t) {
                var n = t.getAttribute("type");
                return !!Mm(n) || og.mime.call(e, n)
            })) : []
        },
        getQualityOptions: function() {
            return this.config.quality.forced ? this.config.quality.options : _g.getSources.call(this).map((function(e) {
                return Number(e.getAttribute("size"))
            })).filter(Boolean)
        },
        setup: function() {
            if (this.isHTML5) {
                var e = this;
                e.options.speed = e.config.speed.options, Mm(this.config.ratio) || yg.call(e), Object.defineProperty(e.media, "quality", {
                    get: function() {
                        var t = _g.getSources.call(e).find((function(t) {
                            return t.getAttribute("src") === e.source
                        }));
                        return t && Number(t.getAttribute("size"))
                    },
                    set: function(t) {
                        if (e.quality !== t) {
                            if (e.config.quality.forced && km(e.config.quality.onChange)) e.config.quality.onChange(t);
                            else {
                                var n = _g.getSources.call(e).find((function(e) {
                                    return Number(e.getAttribute("size")) === t
                                }));
                                if (!n) return;
                                var i = e.media,
                                    r = i.currentTime,
                                    o = i.paused,
                                    a = i.preload,
                                    s = i.readyState,
                                    u = i.playbackRate;
                                e.media.src = n.getAttribute("src"), ("none" !== a || s) && (e.once("loadedmetadata", (function() {
                                    e.speed = u, e.currentTime = r, o || pg(e.play())
                                })), e.media.load())
                            }
                            dg.call(e, e.media, "qualitychange", !1, {
                                quality: t
                            })
                        }
                    }
                })
            }
        },
        cancelRequests: function() {
            this.isHTML5 && (Wm(_g.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
        }
    };

    function bg(e) {
        return xm(e) ? e.filter((function(t, n) {
            return e.indexOf(t) === n
        })) : e
    }
    var wg = Gr.f,
        Tg = Fo.f,
        kg = _o.set,
        xg = ga("match"),
        Ag = Tr.RegExp,
        Sg = Ag.prototype,
        Eg = /a/g,
        Og = /a/g,
        Cg = new Ag(Eg) !== Eg,
        Pg = Au.UNSUPPORTED_Y;
    if (xr && Xo("RegExp", !Cg || Pg || kr((function() {
            return Og[xg] = !1, Ag(Eg) != Eg || Ag(Og) == Og || "/a/i" != Ag(Eg, "i")
        })))) {
        for (var Ig = function(e, t) {
                var n, i = this instanceof Ig,
                    r = ol(e),
                    o = void 0 === t;
                if (!i && r && e.constructor === Ig && o) return e;
                Cg ? r && !o && (e = e.source) : e instanceof Ig && (o && (t = ku.call(e)), e = e.source), Pg && (n = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, ""));
                var a = ph(Cg ? new Ag(e, t) : Ag(e, t), i ? this : Sg, Ig);
                return Pg && n && kg(a, {
                    sticky: n
                }), a
            }, Mg = function(e) {
                e in Ig || wg(Ig, e, {
                    configurable: !0,
                    get: function() {
                        return Ag[e]
                    },
                    set: function(t) {
                        Ag[e] = t
                    }
                })
            }, Lg = Tg(Ag), Rg = 0; Lg.length > Rg;) Mg(Lg[Rg++]);
        Sg.constructor = Ig, Ig.prototype = Sg, bo(Tr, "RegExp", Ig)
    }

    function Ng(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
        return Mm(e) ? e : e.toString().replace(/{(\d+)}/g, (function(e, t) {
            return n[t].toString()
        }))
    }
    Bf("RegExp");
    var jg = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), n.toString())
        },
        Dg = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return e.toString().replace(/\w\S*/g, (function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            }))
        };

    function Fg() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = e.toString();
        return t = jg(t, "-", " "), t = jg(t, "_", " "), t = Dg(t), jg(t, " ", "")
    }

    function $g(e) {
        var t = document.createElement("div");
        return t.appendChild(e), t.innerHTML
    }
    var Hg = {
            pip: "PIP",
            airplay: "AirPlay",
            html5: "HTML5",
            vimeo: "Vimeo",
            youtube: "YouTube"
        },
        Ug = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (Mm(e) || Mm(t)) return "";
            var n = Hm(t.i18n, e);
            if (Mm(n)) return Object.keys(Hg).includes(e) ? Hg[e] : "";
            var i = {
                "{seektime}": t.seekTime,
                "{title}": t.title
            };
            return Object.entries(i).forEach((function(e) {
                var t = qd(e, 2),
                    i = t[0],
                    r = t[1];
                n = jg(n, i, r)
            })), n
        },
        Bg = function() {
            function e(t) {
                jd(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
            }
            return Fd(e, [{
                key: "get",
                value: function(t) {
                    if (!e.supported || !this.enabled) return null;
                    var n = window.localStorage.getItem(this.key);
                    if (Mm(n)) return null;
                    var i = JSON.parse(n);
                    return wm(t) && t.length ? i[t] : i
                }
            }, {
                key: "set",
                value: function(t) {
                    if (e.supported && this.enabled && _m(t)) {
                        var n = this.get();
                        Mm(n) && (n = {}), Um(n, t), window.localStorage.setItem(this.key, JSON.stringify(n))
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

    function qg(e) {
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

    function zg(e, t) {
        if (wm(e)) {
            var n = wm(t),
                i = function() {
                    return null !== document.getElementById(t)
                },
                r = function(e, t) {
                    e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e)
                };
            if (!n || !i()) {
                var o = Bg.supported,
                    a = document.createElement("div");
                if (a.setAttribute("hidden", ""), n && a.setAttribute("id", t), o) {
                    var s = window.localStorage.getItem("".concat("cache", "-").concat(t));
                    if (null !== s) {
                        var u = JSON.parse(s);
                        r(a, u.content)
                    }
                }
                qg(e).then((function(e) {
                    Mm(e) || (o && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({
                        content: e
                    })), r(a, e))
                })).catch((function() {}))
            }
        }
    }
    var Vg = Math.ceil,
        Wg = Math.floor;
    Qo({
        target: "Math",
        stat: !0
    }, {
        trunc: function(e) {
            return (e > 0 ? Wg : Vg)(e)
        }
    });
    var Gg = function(e) {
            return Math.trunc(e / 60 / 60 % 60, 10)
        },
        Xg = function(e) {
            return Math.trunc(e / 60 % 60, 10)
        },
        Yg = function(e) {
            return Math.trunc(e % 60, 10)
        };

    function Qg() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!bm(e)) return Qg(void 0, t, n);
        var i = function(e) {
                return "0".concat(e).slice(-2)
            },
            r = Gg(e),
            o = Xg(e),
            a = Yg(e);
        return r = t || r > 0 ? "".concat(r, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(r).concat(i(o), ":").concat(i(a))
    }
    var Kg = {
        getIconUrl: function() {
            var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || Nm.isIE && !window.svg4everybody;
            return {
                url: this.config.iconUrl,
                cors: e
            }
        },
        findElements: function() {
            try {
                return this.elements.controls = tg.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                    play: eg.call(this, this.config.selectors.buttons.play),
                    pause: tg.call(this, this.config.selectors.buttons.pause),
                    restart: tg.call(this, this.config.selectors.buttons.restart),
                    rewind: tg.call(this, this.config.selectors.buttons.rewind),
                    fastForward: tg.call(this, this.config.selectors.buttons.fastForward),
                    mute: tg.call(this, this.config.selectors.buttons.mute),
                    pip: tg.call(this, this.config.selectors.buttons.pip),
                    airplay: tg.call(this, this.config.selectors.buttons.airplay),
                    settings: tg.call(this, this.config.selectors.buttons.settings),
                    captions: tg.call(this, this.config.selectors.buttons.captions),
                    fullscreen: tg.call(this, this.config.selectors.buttons.fullscreen)
                }, this.elements.progress = tg.call(this, this.config.selectors.progress), this.elements.inputs = {
                    seek: tg.call(this, this.config.selectors.inputs.seek),
                    volume: tg.call(this, this.config.selectors.inputs.volume)
                }, this.elements.display = {
                    buffer: tg.call(this, this.config.selectors.display.buffer),
                    currentTime: tg.call(this, this.config.selectors.display.currentTime),
                    duration: tg.call(this, this.config.selectors.display.duration)
                }, Sm(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0
            } catch (e) {
                return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
            }
        },
        createIcon: function(e, t) {
            var n = Kg.getIconUrl.call(this),
                i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
                r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            qm(r, Um(t, {
                "aria-hidden": "true",
                focusable: "false"
            }));
            var o = document.createElementNS("http://www.w3.org/2000/svg", "use"),
                a = "".concat(i, "-").concat(e);
            return "href" in o && o.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), o.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), r.appendChild(o), r
        },
        createLabel: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = Ug(e, this.config),
                i = Ud(Ud({}, t), {}, {
                    class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
                });
            return zm("span", i, n)
        },
        createBadge: function(e) {
            if (Mm(e)) return null;
            var t = zm("span", {
                class: this.config.classNames.menu.value
            });
            return t.appendChild(zm("span", {
                class: this.config.classNames.menu.badge
            }, e)), t
        },
        createButton: function(e, t) {
            var n = this,
                i = Um({}, t),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = e.toString();
                    return (t = Fg(t)).charAt(0).toLowerCase() + t.slice(1)
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
                })) || Um(i, {
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
                    Mm(o.label) && (o.label = r), Mm(o.icon) && (o.icon = e)
            }
            var a = zm(o.element);
            return o.toggle ? (a.appendChild(Kg.createIcon.call(this, o.iconPressed, {
                class: "icon--pressed"
            })), a.appendChild(Kg.createIcon.call(this, o.icon, {
                class: "icon--not-pressed"
            })), a.appendChild(Kg.createLabel.call(this, o.labelPressed, {
                class: "label--pressed"
            })), a.appendChild(Kg.createLabel.call(this, o.label, {
                class: "label--not-pressed"
            }))) : (a.appendChild(Kg.createIcon.call(this, o.icon)), a.appendChild(Kg.createLabel.call(this, o.label))), Um(i, Ym(this.config.selectors.buttons[r], i)), qm(a, i), "play" === r ? (xm(this.elements.buttons[r]) || (this.elements.buttons[r] = []), this.elements.buttons[r].push(a)) : this.elements.buttons[r] = a, a
        },
        createRange: function(e, t) {
            var n = zm("input", Um(Ym(this.config.selectors.inputs[e]), {
                type: "range",
                min: 0,
                max: 100,
                step: .01,
                value: 0,
                autocomplete: "off",
                role: "slider",
                "aria-label": Ug(e, this.config),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": 0
            }, t));
            return this.elements.inputs[e] = n, Kg.updateRangeFill.call(this, n), $f.setup(n), n
        },
        createProgress: function(e, t) {
            var n = zm("progress", Um(Ym(this.config.selectors.display[e]), {
                min: 0,
                max: 100,
                value: 0,
                role: "progressbar",
                "aria-hidden": !0
            }, t));
            if ("volume" !== e) {
                n.appendChild(zm("span", null, "0"));
                var i = {
                        played: "played",
                        buffer: "buffered"
                    } [e],
                    r = i ? Ug(i, this.config) : "";
                n.innerText = "% ".concat(r.toLowerCase())
            }
            return this.elements.display[e] = n, n
        },
        createTime: function(e, t) {
            var n = Ym(this.config.selectors.display[e], t),
                i = zm("div", Um(n, {
                    class: "".concat(n.class ? n.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
                    "aria-label": Ug(e, this.config)
                }), "00:00");
            return this.elements.display[e] = i, i
        },
        bindMenuItemShortcuts: function(e, t) {
            var n = this;
            ug.call(this, e, "keydown keyup", (function(i) {
                if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) {
                    var r, o = Jm(e, '[role="menuitemradio"]');
                    if (!o && [32, 39].includes(i.which)) Kg.showMenuPanel.call(n, t, !0);
                    else 32 !== i.which && (40 === i.which || o && 39 === i.which ? (r = e.nextElementSibling, Sm(r) || (r = e.parentNode.firstElementChild)) : (r = e.previousElementSibling, Sm(r) || (r = e.parentNode.lastElementChild)), ng.call(n, r, !0))
                }
            }), !1), ug.call(this, e, "keyup", (function(e) {
                13 === e.which && Kg.focusFirstMenuItem.call(n, null, !0)
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
                u = e.checked,
                l = void 0 !== u && u,
                c = Ym(this.config.selectors.inputs[r]),
                d = zm("button", Um(c, {
                    type: "button",
                    role: "menuitemradio",
                    class: "".concat(this.config.classNames.control, " ").concat(c.class ? c.class : "").trim(),
                    "aria-checked": l,
                    value: n
                })),
                h = zm("span");
            h.innerHTML = o, Sm(s) && h.appendChild(s), d.appendChild(h), Object.defineProperty(d, "checked", {
                enumerable: !0,
                get: function() {
                    return "true" === d.getAttribute("aria-checked")
                },
                set: function(e) {
                    e && Array.from(d.parentNode.children).filter((function(e) {
                        return Jm(e, '[role="menuitemradio"]')
                    })).forEach((function(e) {
                        return e.setAttribute("aria-checked", "false")
                    })), d.setAttribute("aria-checked", e ? "true" : "false")
                }
            }), this.listeners.bind(d, "click keyup", (function(e) {
                if (!Om(e) || 32 === e.which) {
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
                    Kg.showMenuPanel.call(t, "home", Om(e))
                }
            }), r, !1), Kg.bindMenuItemShortcuts.call(this, d, r), i.appendChild(d)
        },
        formatTime: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (!bm(e)) return e;
            var n = Gg(this.duration) > 0;
            return Qg(e, n, t)
        },
        updateTimeDisplay: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            Sm(e) && bm(t) && (e.innerText = Kg.formatTime(t, n))
        },
        updateVolume: function() {
            this.supported.ui && (Sm(this.elements.inputs.volume) && Kg.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), Sm(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
        },
        setRange: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            Sm(e) && (e.value = t, Kg.updateRangeFill.call(this, e))
        },
        updateProgress: function(e) {
            var t = this;
            if (this.supported.ui && Em(e)) {
                var n = 0;
                if (e) switch (e.type) {
                    case "timeupdate":
                    case "seeking":
                    case "seeked":
                        n = function(e, t) {
                            return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2)
                        }(this.currentTime, this.duration), "timeupdate" === e.type && Kg.setRange.call(this, this.elements.inputs.seek, n);
                        break;
                    case "playing":
                    case "progress":
                        ! function(e, n) {
                            var i = bm(n) ? n : 0,
                                r = Sm(e) ? e : t.elements.display.buffer;
                            if (Sm(r)) {
                                r.value = i;
                                var o = r.getElementsByTagName("span")[0];
                                Sm(o) && (o.childNodes[0].nodeValue = i)
                            }
                        }(this.elements.display.buffer, 100 * this.buffered)
                }
            }
        },
        updateRangeFill: function(e) {
            var t = Em(e) ? e.target : e;
            if (Sm(t) && "range" === t.getAttribute("type")) {
                if (Jm(t, this.config.selectors.inputs.seek)) {
                    t.setAttribute("aria-valuenow", this.currentTime);
                    var n = Kg.formatTime(this.currentTime),
                        i = Kg.formatTime(this.duration),
                        r = Ug("seekLabel", this.config);
                    t.setAttribute("aria-valuetext", r.replace("{currentTime}", n).replace("{duration}", i))
                } else if (Jm(t, this.config.selectors.inputs.volume)) {
                    var o = 100 * t.value;
                    t.setAttribute("aria-valuenow", o), t.setAttribute("aria-valuetext", "".concat(o.toFixed(1), "%"))
                } else t.setAttribute("aria-valuenow", t.value);
                Nm.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"))
            }
        },
        updateSeekTooltip: function(e) {
            var t = this;
            if (this.config.tooltips.seek && Sm(this.elements.inputs.seek) && Sm(this.elements.display.seekTooltip) && 0 !== this.duration) {
                var n = "".concat(this.config.classNames.tooltip, "--visible"),
                    i = function(e) {
                        return Km(t.elements.display.seekTooltip, n, e)
                    };
                if (this.touch) i(!1);
                else {
                    var r = 0,
                        o = this.elements.progress.getBoundingClientRect();
                    if (Em(e)) r = 100 / o.width * (e.pageX - o.left);
                    else {
                        if (!Zm(this.elements.display.seekTooltip, n)) return;
                        r = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                    }
                    r < 0 ? r = 0 : r > 100 && (r = 100), Kg.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * r), this.elements.display.seekTooltip.style.left = "".concat(r, "%"), Em(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type)
                }
            }
        },
        timeUpdate: function(e) {
            var t = !Sm(this.elements.display.duration) && this.config.invertTime;
            Kg.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || Kg.updateProgress.call(this, e)
        },
        durationUpdate: function() {
            if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
                if (this.duration >= Math.pow(2, 32)) return Qm(this.elements.display.currentTime, !0), void Qm(this.elements.progress, !0);
                Sm(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
                var e = Sm(this.elements.display.duration);
                !e && this.config.displayDuration && this.paused && Kg.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && Kg.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), Kg.updateSeekTooltip.call(this)
            }
        },
        toggleMenuButton: function(e, t) {
            Qm(this.elements.settings.buttons[e], !t)
        },
        updateSetting: function(e, t, n) {
            var i = this.elements.settings.panels[e],
                r = null,
                o = t;
            if ("captions" === e) r = this.currentTrack;
            else {
                if (r = Mm(n) ? this[e] : n, Mm(r) && (r = this.config[e].default), !Mm(this.options[e]) && !this.options[e].includes(r)) return void this.debug.warn("Unsupported value of '".concat(r, "' for ").concat(e));
                if (!this.config[e].options.includes(r)) return void this.debug.warn("Disabled value of '".concat(r, "' for ").concat(e))
            }
            if (Sm(o) || (o = i && i.querySelector('[role="menu"]')), Sm(o)) {
                this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = Kg.getLabel.call(this, e, r);
                var a = o && o.querySelector('[value="'.concat(r, '"]'));
                Sm(a) && (a.checked = !0)
            }
        },
        getLabel: function(e, t) {
            switch (e) {
                case "speed":
                    return 1 === t ? Ug("normal", this.config) : "".concat(t, "&times;");
                case "quality":
                    if (bm(t)) {
                        var n = Ug("qualityLabel.".concat(t), this.config);
                        return n.length ? n : "".concat(t, "p")
                    }
                    return Dg(t);
                case "captions":
                    return ev.getLabel.call(this);
                default:
                    return null
            }
        },
        setQualityMenu: function(e) {
            var t = this;
            if (Sm(this.elements.settings.panels.quality)) {
                var n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
                xm(e) && (this.options.quality = bg(e).filter((function(e) {
                    return t.config.quality.options.includes(e)
                })));
                var i = !Mm(this.options.quality) && this.options.quality.length > 1;
                if (Kg.toggleMenuButton.call(this, "quality", i), Gm(n), Kg.checkMenu.call(this), i) {
                    var r = function(e) {
                        var n = Ug("qualityBadge.".concat(e), t.config);
                        return n.length ? Kg.createBadge.call(t, n) : null
                    };
                    this.options.quality.sort((function(e, n) {
                        var i = t.config.quality.options;
                        return i.indexOf(e) > i.indexOf(n) ? 1 : -1
                    })).forEach((function(e) {
                        Kg.createMenuItem.call(t, {
                            value: e,
                            list: n,
                            type: "quality",
                            title: Kg.getLabel.call(t, "quality", e),
                            badge: r(e)
                        })
                    })), Kg.updateSetting.call(this, "quality", n)
                }
            }
        },
        setCaptionsMenu: function() {
            var e = this;
            if (Sm(this.elements.settings.panels.captions)) {
                var t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                    n = ev.getTracks.call(this),
                    i = Boolean(n.length);
                if (Kg.toggleMenuButton.call(this, "captions", i), Gm(t), Kg.checkMenu.call(this), i) {
                    var r = n.map((function(n, i) {
                        return {
                            value: i,
                            checked: e.captions.toggled && e.currentTrack === i,
                            title: ev.getLabel.call(e, n),
                            badge: n.language && Kg.createBadge.call(e, n.language.toUpperCase()),
                            list: t,
                            type: "language"
                        }
                    }));
                    r.unshift({
                        value: -1,
                        checked: !this.captions.toggled,
                        title: Ug("disabled", this.config),
                        list: t,
                        type: "language"
                    }), r.forEach(Kg.createMenuItem.bind(this)), Kg.updateSetting.call(this, "captions", t)
                }
            }
        },
        setSpeedMenu: function() {
            var e = this;
            if (Sm(this.elements.settings.panels.speed)) {
                var t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
                this.options.speed = this.options.speed.filter((function(t) {
                    return t >= e.minimumSpeed && t <= e.maximumSpeed
                }));
                var n = !Mm(this.options.speed) && this.options.speed.length > 1;
                Kg.toggleMenuButton.call(this, "speed", n), Gm(t), Kg.checkMenu.call(this), n && (this.options.speed.forEach((function(n) {
                    Kg.createMenuItem.call(e, {
                        value: n,
                        list: t,
                        type: "speed",
                        title: Kg.getLabel.call(e, "speed", n)
                    })
                })), Kg.updateSetting.call(this, "speed", t))
            }
        },
        checkMenu: function() {
            var e = this.elements.settings.buttons,
                t = !Mm(e) && Object.values(e).some((function(e) {
                    return !e.hidden
                }));
            Qm(this.elements.settings.menu, !t)
        },
        focusFirstMenuItem: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (!this.elements.settings.popup.hidden) {
                var n = e;
                Sm(n) || (n = Object.values(this.elements.settings.panels).find((function(e) {
                    return !e.hidden
                })));
                var i = n.querySelector('[role^="menuitem"]');
                ng.call(this, i, t)
            }
        },
        toggleMenu: function(e) {
            var t = this.elements.settings.popup,
                n = this.elements.buttons.settings;
            if (Sm(t) && Sm(n)) {
                var i = t.hidden,
                    r = i;
                if (Tm(e)) r = e;
                else if (Om(e) && 27 === e.which) r = !1;
                else if (Em(e)) {
                    var o = km(e.composedPath) ? e.composedPath()[0] : e.target,
                        a = t.contains(o);
                    if (a || !a && e.target !== n && r) return
                }
                n.setAttribute("aria-expanded", r), Qm(t, !r), Km(this.elements.container, this.config.classNames.menu.open, r), r && Om(e) ? Kg.focusFirstMenuItem.call(this, null, !0) : r || i || ng.call(this, n, Om(e))
            }
        },
        getMenuSize: function(e) {
            var t = e.cloneNode(!0);
            t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
            var n = t.scrollWidth,
                i = t.scrollHeight;
            return Wm(t), {
                width: n,
                height: i
            }
        },
        showMenuPanel: function() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));
            if (Sm(i)) {
                var r = i.parentNode,
                    o = Array.from(r.children).find((function(e) {
                        return !e.hidden
                    }));
                if (og.transitions && !og.reducedMotion) {
                    r.style.width = "".concat(o.scrollWidth, "px"), r.style.height = "".concat(o.scrollHeight, "px");
                    var a = Kg.getMenuSize.call(this, i),
                        s = function t(n) {
                            n.target === r && ["width", "height"].includes(n.propertyName) && (r.style.width = "", r.style.height = "", lg.call(e, r, Lm, t))
                        };
                    ug.call(this, r, Lm, s), r.style.width = "".concat(a.width, "px"), r.style.height = "".concat(a.height, "px")
                }
                Qm(o, !0), Qm(i, !1), Kg.focusFirstMenuItem.call(this, i, n)
            }
        },
        setDownloadUrl: function() {
            var e = this.elements.buttons.download;
            Sm(e) && e.setAttribute("href", this.download)
        },
        create: function(e) {
            var t = this,
                n = Kg.bindMenuItemShortcuts,
                i = Kg.createButton,
                r = Kg.createProgress,
                o = Kg.createRange,
                a = Kg.createTime,
                s = Kg.setQualityMenu,
                u = Kg.setSpeedMenu,
                l = Kg.showMenuPanel;
            this.elements.controls = null, xm(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
            var c = zm("div", Ym(this.config.selectors.controls.wrapper));
            this.elements.controls = c;
            var d = {
                class: "plyr__controls__item"
            };
            return bg(xm(this.config.controls) ? this.config.controls : []).forEach((function(s) {
                if ("restart" === s && c.appendChild(i.call(t, "restart", d)), "rewind" === s && c.appendChild(i.call(t, "rewind", d)), "play" === s && c.appendChild(i.call(t, "play", d)), "fast-forward" === s && c.appendChild(i.call(t, "fast-forward", d)), "progress" === s) {
                    var u = zm("div", {
                            class: "".concat(d.class, " plyr__progress__container")
                        }),
                        h = zm("div", Ym(t.config.selectors.progress));
                    if (h.appendChild(o.call(t, "seek", {
                            id: "plyr-seek-".concat(e.id)
                        })), h.appendChild(r.call(t, "buffer")), t.config.tooltips.seek) {
                        var f = zm("span", {
                            class: t.config.classNames.tooltip
                        }, "00:00");
                        h.appendChild(f), t.elements.display.seekTooltip = f
                    }
                    t.elements.progress = h, u.appendChild(t.elements.progress), c.appendChild(u)
                }
                if ("current-time" === s && c.appendChild(a.call(t, "currentTime", d)), "duration" === s && c.appendChild(a.call(t, "duration", d)), "mute" === s || "volume" === s) {
                    var p = t.elements.volume;
                    if (Sm(p) && c.contains(p) || (p = zm("div", Um({}, d, {
                            class: "".concat(d.class, " plyr__volume").trim()
                        })), t.elements.volume = p, c.appendChild(p)), "mute" === s && p.appendChild(i.call(t, "mute")), "volume" === s && !Nm.isIos) {
                        var m = {
                            max: 1,
                            step: .05,
                            value: t.config.volume
                        };
                        p.appendChild(o.call(t, "volume", Um(m, {
                            id: "plyr-volume-".concat(e.id)
                        })))
                    }
                }
                if ("captions" === s && c.appendChild(i.call(t, "captions", d)), "settings" === s && !Mm(t.config.settings)) {
                    var g = zm("div", Um({}, d, {
                        class: "".concat(d.class, " plyr__menu").trim(),
                        hidden: ""
                    }));
                    g.appendChild(i.call(t, "settings", {
                        "aria-haspopup": !0,
                        "aria-controls": "plyr-settings-".concat(e.id),
                        "aria-expanded": !1
                    }));
                    var v = zm("div", {
                            class: "plyr__menu__container",
                            id: "plyr-settings-".concat(e.id),
                            hidden: ""
                        }),
                        y = zm("div"),
                        _ = zm("div", {
                            id: "plyr-settings-".concat(e.id, "-home")
                        }),
                        b = zm("div", {
                            role: "menu"
                        });
                    _.appendChild(b), y.appendChild(_), t.elements.settings.panels.home = _, t.config.settings.forEach((function(i) {
                        var r = zm("button", Um(Ym(t.config.selectors.buttons.settings), {
                            type: "button",
                            class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"),
                            role: "menuitem",
                            "aria-haspopup": !0,
                            hidden: ""
                        }));
                        n.call(t, r, i), ug.call(t, r, "click", (function() {
                            l.call(t, i, !1)
                        }));
                        var o = zm("span", null, Ug(i, t.config)),
                            a = zm("span", {
                                class: t.config.classNames.menu.value
                            });
                        a.innerHTML = e[i], o.appendChild(a), r.appendChild(o), b.appendChild(r);
                        var s = zm("div", {
                                id: "plyr-settings-".concat(e.id, "-").concat(i),
                                hidden: ""
                            }),
                            u = zm("button", {
                                type: "button",
                                class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back")
                            });
                        u.appendChild(zm("span", {
                            "aria-hidden": !0
                        }, Ug(i, t.config))), u.appendChild(zm("span", {
                            class: t.config.classNames.hidden
                        }, Ug("menuBack", t.config))), ug.call(t, s, "keydown", (function(e) {
                            37 === e.which && (e.preventDefault(), e.stopPropagation(), l.call(t, "home", !0))
                        }), !1), ug.call(t, u, "click", (function() {
                            l.call(t, "home", !1)
                        })), s.appendChild(u), s.appendChild(zm("div", {
                            role: "menu"
                        })), y.appendChild(s), t.elements.settings.buttons[i] = r, t.elements.settings.panels[i] = s
                    })), v.appendChild(y), g.appendChild(v), c.appendChild(g), t.elements.settings.popup = v, t.elements.settings.menu = g
                }
                if ("pip" === s && og.pip && c.appendChild(i.call(t, "pip", d)), "airplay" === s && og.airplay && c.appendChild(i.call(t, "airplay", d)), "download" === s) {
                    var w = Um({}, d, {
                        element: "a",
                        href: t.download,
                        target: "_blank"
                    });
                    t.isHTML5 && (w.download = "");
                    var T = t.config.urls.download;
                    !Im(T) && t.isEmbed && Um(w, {
                        icon: "logo-".concat(t.provider),
                        label: t.provider
                    }), c.appendChild(i.call(t, "download", w))
                }
                "fullscreen" === s && c.appendChild(i.call(t, "fullscreen", d))
            })), this.isHTML5 && s.call(this, _g.getQualityOptions.call(this)), u.call(this), c
        },
        inject: function() {
            var e = this;
            if (this.config.loadSprite) {
                var t = Kg.getIconUrl.call(this);
                t.cors && zg(t.url, "sprite-plyr")
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
            km(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), Sm(this.config.controls) || wm(this.config.controls) ? n = this.config.controls : (n = Kg.create.call(this, {
                id: this.id,
                seektime: this.config.seekTime,
                speed: this.speed,
                quality: this.quality,
                captions: ev.getLabel.call(this)
            }), r = !1);
            var o, a;
            if (r && wm(this.config.controls) && (o = n, Object.entries(i).forEach((function(e) {
                    var t = qd(e, 2),
                        n = t[0],
                        i = t[1];
                    o = jg(o, "{".concat(n, "}"), i)
                })), n = o), wm(this.config.selectors.controls.container) && (a = document.querySelector(this.config.selectors.controls.container)), Sm(a) || (a = this.elements.container), a[Sm(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), Sm(this.elements.controls) || Kg.findElements.call(this), !Mm(this.elements.buttons)) {
                var s = function(t) {
                    var n = e.config.classNames.controlPressed;
                    Object.defineProperty(t, "pressed", {
                        enumerable: !0,
                        get: function() {
                            return Zm(t, n)
                        },
                        set: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                            Km(t, n, e)
                        }
                    })
                };
                Object.values(this.elements.buttons).filter(Boolean).forEach((function(e) {
                    xm(e) || Am(e) ? Array.from(e).filter(Boolean).forEach(s) : s(e)
                }))
            }
            if (Nm.isEdge && Rm(a), this.config.tooltips.controls) {
                var u = this.config,
                    l = u.classNames,
                    c = u.selectors,
                    d = "".concat(c.controls.wrapper, " ").concat(c.labels, " .").concat(l.hidden),
                    h = eg.call(this, d);
                Array.from(h).forEach((function(t) {
                    Km(t, e.config.classNames.hidden, !1), Km(t, e.config.classNames.tooltip, !0)
                }))
            }
        }
    };

    function Zg(e) {
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

    function Jg(e) {
        var t = new URLSearchParams;
        return _m(e) && Object.entries(e).forEach((function(e) {
            var n = qd(e, 2),
                i = n[0],
                r = n[1];
            t.set(i, r)
        })), t
    }
    var ev = {
            setup: function() {
                if (this.supported.ui)
                    if (!this.isVideo || this.isYouTube || this.isHTML5 && !og.textTracks) xm(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Kg.setCaptionsMenu.call(this);
                    else {
                        if (Sm(this.elements.captions) || (this.elements.captions = zm("div", Ym(this.config.selectors.captions)), function(e, t) {
                                Sm(e) && Sm(t) && t.parentNode.insertBefore(e, t.nextSibling)
                            }(this.elements.captions, this.elements.wrapper)), Nm.isIE && window.URL) {
                            var e = this.media.querySelectorAll("track");
                            Array.from(e).forEach((function(e) {
                                var t = e.getAttribute("src"),
                                    n = Zg(t);
                                null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && qg(t, "blob").then((function(t) {
                                    e.setAttribute("src", window.URL.createObjectURL(t))
                                })).catch((function() {
                                    Wm(e)
                                }))
                            }))
                        }
                        var t = bg((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((function(e) {
                                return e.split("-")[0]
                            }))),
                            n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                        if ("auto" === n) n = qd(t, 1)[0];
                        var i = this.storage.get("captions");
                        if (Tm(i) || (i = this.config.captions.active), Object.assign(this.captions, {
                                toggled: !1,
                                active: i,
                                language: n,
                                languages: t
                            }), this.isHTML5) {
                            var r = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                            ug.call(this, this.media.textTracks, r, ev.update.bind(this))
                        }
                        setTimeout(ev.update.bind(this), 0)
                    }
            },
            update: function() {
                var e = this,
                    t = ev.getTracks.call(this, !0),
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
                    }), "showing" === t.mode && (t.mode = "hidden"), ug.call(e, t, "cuechange", (function() {
                        return ev.updateCues.call(e)
                    }))
                })), (s && this.language !== r || !t.includes(a)) && (ev.setLanguage.call(this, r), ev.toggle.call(this, i && s)), Km(this.elements.container, this.config.classNames.captions.enabled, !Mm(t)), xm(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Kg.setCaptionsMenu.call(this)
            },
            toggle: function(e) {
                var t = this,
                    n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (this.supported.ui) {
                    var i = this.captions.toggled,
                        r = this.config.classNames.captions.active,
                        o = ym(e) ? !i : e;
                    if (o !== i) {
                        if (n || (this.captions.active = o, this.storage.set({
                                captions: o
                            })), !this.language && o && !n) {
                            var a = ev.getTracks.call(this),
                                s = ev.findTrack.call(this, [this.captions.language].concat(zd(this.captions.languages)), !0);
                            return this.captions.language = s.language, void ev.set.call(this, a.indexOf(s))
                        }
                        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), Km(this.elements.container, r, o), this.captions.toggled = o, Kg.updateSetting.call(this, "captions"), dg.call(this, this.media, o ? "captionsenabled" : "captionsdisabled")
                    }
                    setTimeout((function() {
                        o && t.captions.toggled && (t.captions.currentTrackNode.mode = "hidden")
                    }))
                }
            },
            set: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    n = ev.getTracks.call(this);
                if (-1 !== e)
                    if (bm(e))
                        if (e in n) {
                            if (this.captions.currentTrack !== e) {
                                this.captions.currentTrack = e;
                                var i = n[e],
                                    r = i || {},
                                    o = r.language;
                                this.captions.currentTrackNode = i, Kg.updateSetting.call(this, "captions"), t || (this.captions.language = o, this.storage.set({
                                    language: o
                                })), this.isVimeo && this.embed.enableTextTrack(o), dg.call(this, this.media, "languagechange")
                            }
                            ev.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && ev.updateCues.call(this)
                        } else this.debug.warn("Track not found", e);
                else this.debug.warn("Invalid caption argument", e);
                else ev.toggle.call(this, !1, t)
            },
            setLanguage: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (wm(e)) {
                    var n = e.toLowerCase();
                    this.captions.language = n;
                    var i = ev.getTracks.call(this),
                        r = ev.findTrack.call(this, [n]);
                    ev.set.call(this, i.indexOf(r), t)
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
                    r = ev.getTracks.call(this),
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
                return ev.getTracks.call(this)[this.currentTrack]
            },
            getLabel: function(e) {
                var t = e;
                return !Cm(t) && og.textTracks && this.captions.toggled && (t = ev.getCurrentTrack.call(this)), Cm(t) ? Mm(t.label) ? Mm(t.language) ? Ug("enabled", this.config) : e.language.toUpperCase() : t.label : Ug("disabled", this.config)
            },
            updateCues: function(e) {
                if (this.supported.ui)
                    if (Sm(this.elements.captions))
                        if (ym(e) || Array.isArray(e)) {
                            var t = e;
                            if (!t) {
                                var n = ev.getCurrentTrack.call(this);
                                t = Array.from((n || {}).activeCues || []).map((function(e) {
                                    return e.getCueAsHTML()
                                })).map($g)
                            }
                            var i = t.map((function(e) {
                                return e.trim()
                            })).join("\n");
                            if (i !== this.elements.captions.innerHTML) {
                                Gm(this.elements.captions);
                                var r = zm("span", Ym(this.config.selectors.caption));
                                r.innerHTML = i, this.elements.captions.appendChild(r), dg.call(this, this.media, "cuechange")
                            }
                        } else this.debug.warn("updateCues: Invalid input", e);
                else this.debug.warn("No captions element to render to")
            }
        },
        tv = {
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
        nv = "picture-in-picture",
        iv = "inline",
        rv = {
            html5: "html5",
            youtube: "youtube",
            vimeo: "vimeo"
        },
        ov = "audio",
        av = "video";
    var sv = function() {},
        uv = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                jd(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
            }
            return Fd(e, [{
                key: "log",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.log, console) : sv
                }
            }, {
                key: "warn",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.warn, console) : sv
                }
            }, {
                key: "error",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.error, console) : sv
                }
            }]), e
        }(),
        lv = function() {
            function e(t) {
                var n = this;
                jd(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = {
                    x: 0,
                    y: 0
                }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function(e, t) {
                    return (Element.prototype.closest || function() {
                        var e = this;
                        do {
                            if (Jm.matches(e, t)) return e;
                            e = e.parentElement || e.parentNode
                        } while (null !== e && 1 === e.nodeType);
                        return null
                    }).call(e, t)
                }(this.player.elements.container, t.config.fullscreen.container), ug.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), (function() {
                    n.onChange()
                })), ug.call(this.player, this.player.elements.container, "dblclick", (function(e) {
                    Sm(n.player.elements.controls) && n.player.elements.controls.contains(e.target) || n.toggle()
                })), ug.call(this, this.player.elements.container, "keydown", (function(e) {
                    return n.trapFocus(e)
                })), this.update()
            }
            return Fd(e, [{
                key: "onChange",
                value: function() {
                    if (this.enabled) {
                        var e = this.player.elements.buttons.fullscreen;
                        Sm(e) && (e.pressed = this.active), dg.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0)
                    }
                }
            }, {
                key: "toggleFallback",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (e ? this.scrollPosition = {
                            x: window.scrollX || 0,
                            y: window.scrollY || 0
                        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", Km(this.target, this.player.config.classNames.fullscreen.fallback, e), Nm.isIos) {
                        var t = document.head.querySelector('meta[name="viewport"]'),
                            n = "viewport-fit=cover";
                        t || (t = document.createElement("meta")).setAttribute("name", "viewport");
                        var i = wm(t.content) && t.content.includes(n);
                        e ? (this.cleanupViewport = !i, i || (t.content += ",".concat(n))) : this.cleanupViewport && (t.content = t.content.split(",").filter((function(e) {
                            return e.trim() !== n
                        })).join(","))
                    }
                    this.onChange()
                }
            }, {
                key: "trapFocus",
                value: function(e) {
                    if (!Nm.isIos && this.active && "Tab" === e.key && 9 === e.keyCode) {
                        var t = document.activeElement,
                            n = eg.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
                            i = qd(n, 1)[0],
                            r = n[n.length - 1];
                        t !== r || e.shiftKey ? t === i && e.shiftKey && (r.focus(), e.preventDefault()) : (i.focus(), e.preventDefault())
                    }
                }
            }, {
                key: "update",
                value: function() {
                    var t;
                    this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");
                    Km(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
                }
            }, {
                key: "enter",
                value: function() {
                    this.enabled && (Nm.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? Mm(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({
                        navigationUI: "hide"
                    }))
                }
            }, {
                key: "exit",
                value: function() {
                    if (this.enabled)
                        if (Nm.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), pg(this.player.play());
                        else if (!e.native || this.forceFallback) this.toggleFallback(!1);
                    else if (this.prefix) {
                        if (!Mm(this.prefix)) {
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
                    if (!e.native || this.forceFallback) return Zm(this.target, this.player.config.classNames.fullscreen.fallback);
                    var t = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
                    return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target
                }
            }, {
                key: "target",
                get: function() {
                    return Nm.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
                }
            }], [{
                key: "native",
                get: function() {
                    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
                }
            }, {
                key: "prefix",
                get: function() {
                    if (km(document.exitFullscreen)) return "";
                    var e = "";
                    return ["webkit", "moz", "ms"].some((function(t) {
                        return !(!km(document["".concat(t, "ExitFullscreen")]) && !km(document["".concat(t, "CancelFullScreen")])) && (e = t, !0)
                    })), e
                }
            }, {
                key: "property",
                get: function() {
                    return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
                }
            }]), e
        }(),
        cv = Math.sign || function(e) {
            return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
        };

    function dv(e) {
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
    Qo({
        target: "Math",
        stat: !0
    }, {
        sign: cv
    });
    var hv = {
            addStyleHook: function() {
                Km(this.elements.container, this.config.selectors.container.replace(".", ""), !0), Km(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
            },
            toggleNativeControls: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
            },
            build: function() {
                var e = this;
                if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void hv.toggleNativeControls.call(this, !0);
                Sm(this.elements.controls) || (Kg.inject.call(this), this.listeners.controls()), hv.toggleNativeControls.call(this), this.isHTML5 && ev.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Kg.updateVolume.call(this), Kg.timeUpdate.call(this), hv.checkPlaying.call(this), Km(this.elements.container, this.config.classNames.pip.supported, og.pip && this.isHTML5 && this.isVideo), Km(this.elements.container, this.config.classNames.airplay.supported, og.airplay && this.isHTML5), Km(this.elements.container, this.config.classNames.isIos, Nm.isIos), Km(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout((function() {
                    dg.call(e, e.media, "ready")
                }), 0), hv.setTitle.call(this), this.poster && hv.setPoster.call(this, this.poster, !1).catch((function() {})), this.config.duration && Kg.durationUpdate.call(this)
            },
            setTitle: function() {
                var e = Ug("play", this.config);
                if (wm(this.config.title) && !Mm(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach((function(t) {
                        t.setAttribute("aria-label", e)
                    })), this.isEmbed) {
                    var t = tg.call(this, "iframe");
                    if (!Sm(t)) return;
                    var n = Mm(this.config.title) ? "video" : this.config.title,
                        i = Ug("frameTitle", this.config);
                    t.setAttribute("title", i.replace("{title}", n))
                }
            },
            togglePoster: function(e) {
                Km(this.elements.container, this.config.classNames.posterEnabled, e)
            },
            setPoster: function(e) {
                var t = this,
                    n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return n && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), fg.call(this).then((function() {
                    return dv(e)
                })).catch((function(n) {
                    throw e === t.poster && hv.togglePoster.call(t, !1), n
                })).then((function() {
                    if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster")
                })).then((function() {
                    return Object.assign(t.elements.poster.style, {
                        backgroundImage: "url('".concat(e, "')"),
                        backgroundSize: ""
                    }), hv.togglePoster.call(t, !0), e
                })))
            },
            checkPlaying: function(e) {
                var t = this;
                Km(this.elements.container, this.config.classNames.playing, this.playing), Km(this.elements.container, this.config.classNames.paused, this.paused), Km(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((function(e) {
                    Object.assign(e, {
                        pressed: t.playing
                    }), e.setAttribute("aria-label", Ug(t.playing ? "pause" : "play", t.config))
                })), Em(e) && "timeupdate" === e.type || hv.toggleControls.call(this)
            },
            checkLoading: function(e) {
                var t = this;
                this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout((function() {
                    Km(t.elements.container, t.config.classNames.loading, t.loading), hv.toggleControls.call(t)
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
                Object.values(Ud({}, this.media.style)).filter((function(e) {
                    return !Mm(e) && e.startsWith("--plyr")
                })).forEach((function(t) {
                    e.elements.container.style.setProperty(t, e.media.style.getPropertyValue(t)), e.media.style.removeProperty(t)
                })), Mm(this.media.style) && this.media.removeAttribute("style")
            }
        },
        fv = function() {
            function e(t) {
                jd(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
            }
            return Fd(e, [{
                key: "handleKey",
                value: function(e) {
                    var t = this.player,
                        n = t.elements,
                        i = e.keyCode ? e.keyCode : e.which,
                        r = "keydown" === e.type,
                        o = r && i === this.lastKey;
                    if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && bm(i)) {
                        if (r) {
                            var a = document.activeElement;
                            if (Sm(a)) {
                                var s = t.config.selectors.editable;
                                if (a !== n.inputs.seek && Jm(a, s)) return;
                                if (32 === e.which && Jm(a, 'button, [role^="menuitem"]')) return
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
                                    o || pg(t.togglePlay());
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
                    Kg.toggleMenu.call(this.player, e)
                }
            }, {
                key: "firstTouch",
                value: function() {
                    var e = this.player,
                        t = e.elements;
                    e.touch = !0, Km(t.container, e.config.classNames.isTouch, !0)
                }
            }, {
                key: "setTabFocus",
                value: function(e) {
                    var t = this.player,
                        n = t.elements;
                    if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
                        "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
                        var i, r = e.timeStamp - this.lastKeyDown <= 20;
                        if ("focus" !== e.type || r) i = t.config.classNames.tabFocus, Km(eg.call(t, ".".concat(i)), i, !1), "focusout" !== e.type && (this.focusTimer = setTimeout((function() {
                            var e = document.activeElement;
                            n.container.contains(e) && Km(document.activeElement, t.config.classNames.tabFocus, !0)
                        }), 10))
                    }
                }
            }, {
                key: "global",
                value: function() {
                    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                        t = this.player;
                    t.config.keyboard.global && sg.call(t, window, "keydown keyup", this.handleKey, e, !1), sg.call(t, document.body, "click", this.toggleMenu, e), cg.call(t, document.body, "touchstart", this.firstTouch), sg.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0)
                }
            }, {
                key: "container",
                value: function() {
                    var e = this.player,
                        t = e.config,
                        n = e.elements,
                        i = e.timers;
                    !t.keyboard.global && t.keyboard.focused && ug.call(e, n.container, "keydown keyup", this.handleKey, !1), ug.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (function(t) {
                        var r = n.controls;
                        r && "enterfullscreen" === t.type && (r.pressed = !1, r.hover = !1);
                        var o = 0;
                        ["touchstart", "touchmove", "mousemove"].includes(t.type) && (hv.toggleControls.call(e, !0), o = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout((function() {
                            return hv.toggleControls.call(e, !1)
                        }), o)
                    }));
                    var r = function(t) {
                            if (!t) return yg.call(e);
                            var i = n.container.getBoundingClientRect(),
                                r = i.width,
                                o = i.height;
                            return yg.call(e, "".concat(r, ":").concat(o))
                        },
                        o = function() {
                            clearTimeout(i.resized), i.resized = setTimeout(r, 50)
                        };
                    ug.call(e, n.container, "enterfullscreen exitfullscreen", (function(t) {
                        var i = e.fullscreen,
                            a = i.target,
                            s = i.usingNative;
                        if (a === n.container && (e.isEmbed || !Mm(e.config.ratio))) {
                            var u = "enterfullscreen" === t.type,
                                l = r(u);
                            l.padding;
                            ! function(t, n, i) {
                                if (e.isVimeo && !e.config.vimeo.premium) {
                                    var r = e.elements.wrapper.firstChild,
                                        o = qd(t, 2)[1],
                                        a = qd(vg.call(e), 2),
                                        s = a[0],
                                        u = a[1];
                                    r.style.maxWidth = i ? "".concat(o / u * s, "px") : null, r.style.margin = i ? "0 auto" : null
                                }
                            }(l.ratio, 0, u), s || (u ? ug.call(e, window, "resize", o) : lg.call(e, window, "resize", o))
                        }
                    }))
                }
            }, {
                key: "media",
                value: function() {
                    var e = this,
                        t = this.player,
                        n = t.elements;
                    if (ug.call(t, t.media, "timeupdate seeking seeked", (function(e) {
                            return Kg.timeUpdate.call(t, e)
                        })), ug.call(t, t.media, "durationchange loadeddata loadedmetadata", (function(e) {
                            return Kg.durationUpdate.call(t, e)
                        })), ug.call(t, t.media, "ended", (function() {
                            t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause())
                        })), ug.call(t, t.media, "progress playing seeking seeked", (function(e) {
                            return Kg.updateProgress.call(t, e)
                        })), ug.call(t, t.media, "volumechange", (function(e) {
                            return Kg.updateVolume.call(t, e)
                        })), ug.call(t, t.media, "playing play pause ended emptied timeupdate", (function(e) {
                            return hv.checkPlaying.call(t, e)
                        })), ug.call(t, t.media, "waiting canplay seeked playing", (function(e) {
                            return hv.checkLoading.call(t, e)
                        })), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
                        var i = tg.call(t, ".".concat(t.config.classNames.video));
                        if (!Sm(i)) return;
                        ug.call(t, n.container, "click", (function(r) {
                            ([n.container, i].includes(r.target) || i.contains(r.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(r, t.restart, "restart"), e.proxy(r, (function() {
                                pg(t.play())
                            }), "play")) : e.proxy(r, (function() {
                                pg(t.togglePlay())
                            }), "play")))
                        }))
                    }
                    t.supported.ui && t.config.disableContextMenu && ug.call(t, n.wrapper, "contextmenu", (function(e) {
                        e.preventDefault()
                    }), !1), ug.call(t, t.media, "volumechange", (function() {
                        t.storage.set({
                            volume: t.volume,
                            muted: t.muted
                        })
                    })), ug.call(t, t.media, "ratechange", (function() {
                        Kg.updateSetting.call(t, "speed"), t.storage.set({
                            speed: t.speed
                        })
                    })), ug.call(t, t.media, "qualitychange", (function(e) {
                        Kg.updateSetting.call(t, "quality", null, e.detail.quality)
                    })), ug.call(t, t.media, "ready qualitychange", (function() {
                        Kg.setDownloadUrl.call(t)
                    }));
                    var r = t.config.events.concat(["keyup", "keydown"]).join(" ");
                    ug.call(t, t.media, r, (function(e) {
                        var i = e.detail,
                            r = void 0 === i ? {} : i;
                        "error" === e.type && (r = t.media.error), dg.call(t, n.container, e.type, !0, r)
                    }))
                }
            }, {
                key: "proxy",
                value: function(e, t, n) {
                    var i = this.player,
                        r = i.config.listeners[n],
                        o = !0;
                    km(r) && (o = r.call(i, e)), !1 !== o && km(t) && t.call(i, e)
                }
            }, {
                key: "bind",
                value: function(e, t, n, i) {
                    var r = this,
                        o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                        a = this.player,
                        s = a.config.listeners[i],
                        u = km(s);
                    ug.call(a, e, t, (function(e) {
                        return r.proxy(e, n, i)
                    }), o && !u)
                }
            }, {
                key: "controls",
                value: function() {
                    var e = this,
                        t = this.player,
                        n = t.elements,
                        i = Nm.isIE ? "change" : "input";
                    if (n.buttons.play && Array.from(n.buttons.play).forEach((function(n) {
                            e.bind(n, "click", (function() {
                                pg(t.togglePlay())
                            }), "play")
                        })), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", t.rewind, "rewind"), this.bind(n.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(n.buttons.mute, "click", (function() {
                            t.muted = !t.muted
                        }), "mute"), this.bind(n.buttons.captions, "click", (function() {
                            return t.toggleCaptions()
                        })), this.bind(n.buttons.download, "click", (function() {
                            dg.call(t, t.media, "download")
                        }), "download"), this.bind(n.buttons.fullscreen, "click", (function() {
                            t.fullscreen.toggle()
                        }), "fullscreen"), this.bind(n.buttons.pip, "click", (function() {
                            t.pip = "toggle"
                        }), "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", (function(e) {
                            e.stopPropagation(), e.preventDefault(), Kg.toggleMenu.call(t, e)
                        }), null, !1), this.bind(n.buttons.settings, "keyup", (function(e) {
                            var n = e.which;
                            [13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), Kg.toggleMenu.call(t, e)) : Kg.focusFirstMenuItem.call(t, null, !0))
                        }), null, !1), this.bind(n.settings.menu, "keydown", (function(e) {
                            27 === e.which && Kg.toggleMenu.call(t, e)
                        })), this.bind(n.inputs.seek, "mousedown mousemove", (function(e) {
                            var t = n.progress.getBoundingClientRect(),
                                i = 100 / t.width * (e.pageX - t.left);
                            e.currentTarget.setAttribute("seek-value", i)
                        })), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (function(e) {
                            var n = e.currentTarget,
                                i = e.keyCode ? e.keyCode : e.which;
                            if (!Om(e) || 39 === i || 37 === i) {
                                t.lastSeekTime = Date.now();
                                var r = n.hasAttribute("play-on-seeked"),
                                    o = ["mouseup", "touchend", "keyup"].includes(e.type);
                                r && o ? (n.removeAttribute("play-on-seeked"), pg(t.play())) : !o && t.playing && (n.setAttribute("play-on-seeked", ""), t.pause())
                            }
                        })), Nm.isIos) {
                        var r = eg.call(t, 'input[type="range"]');
                        Array.from(r).forEach((function(t) {
                            return e.bind(t, i, (function(e) {
                                return Rm(e.target)
                            }))
                        }))
                    }
                    this.bind(n.inputs.seek, i, (function(e) {
                        var n = e.currentTarget,
                            i = n.getAttribute("seek-value");
                        Mm(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration
                    }), "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", (function(e) {
                        return Kg.updateSeekTooltip.call(t, e)
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
                    })), Nm.isWebkit && Array.from(eg.call(t, 'input[type="range"]')).forEach((function(n) {
                        e.bind(n, "input", (function(e) {
                            return Kg.updateRangeFill.call(t, e.target)
                        }))
                    })), t.config.toggleInvert && !Sm(n.display.duration) && this.bind(n.display.currentTime, "click", (function() {
                        0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, Kg.timeUpdate.call(t))
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
                        Km(n.controls, i.classNames.noTransition, !0), hv.toggleControls.call(t, !0), setTimeout((function() {
                            Km(n.controls, i.classNames.noTransition, !1)
                        }), 0);
                        var o = e.touch ? 3e3 : 4e3;
                        clearTimeout(r.controls), r.controls = setTimeout((function() {
                            return hv.toggleControls.call(t, !1)
                        }), o)
                    })), this.bind(n.inputs.volume, "wheel", (function(e) {
                        var n = e.webkitDirectionInvertedFromDevice,
                            i = qd([e.deltaX, -e.deltaY].map((function(e) {
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
        pv = du("splice"),
        mv = vs("splice", {
            ACCESSORS: !0,
            0: 0,
            1: 2
        }),
        gv = Math.max,
        vv = Math.min;
    Qo({
        target: "Array",
        proto: !0,
        forced: !pv || !mv
    }, {
        splice: function(e, t) {
            var n, i, r, o, a, s, u = ea(this),
                l = Oo(u.length),
                c = Io(e, l),
                d = arguments.length;
            if (0 === d ? n = i = 0 : 1 === d ? (n = 0, i = l - c) : (n = d - 2, i = vv(gv(So(t), 0), l - c)), l + n - i > 9007199254740991) throw TypeError("Maximum allowed length exceeded");
            for (r = Sa(u, i), o = 0; o < i; o++)(a = c + o) in u && ru(r, o, u[a]);
            if (r.length = i, n < i) {
                for (o = c; o < l - i; o++) s = o + n, (a = o + i) in u ? u[s] = u[a] : delete u[s];
                for (o = l; o > l - i + n; o--) delete u[o - 1]
            } else if (n > i)
                for (o = l - i; o > c; o--) s = o + n - 1, (a = o + i - 1) in u ? u[s] = u[a] : delete u[s];
            for (o = 0; o < n; o++) u[o + c] = arguments[o + 2];
            return u.length = l - i + n, r
        }
    });
    var yv = br((function(e, t) {
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
                var o, s, u = document,
                    l = i.async,
                    c = (i.numRetries || 0) + 1,
                    d = i.before || e,
                    h = t.replace(/[\?|#].*$/, ""),
                    f = t.replace(/^(css|img)!/, "");
                r = r || 0, /(^css!|\.css$)/.test(h) ? ((s = u.createElement("link")).rel = "stylesheet", s.href = f, (o = "hideFocus" in s) && s.relList && (o = 0, s.rel = "preload", s.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (s = u.createElement("img")).src = f : ((s = u.createElement("script")).src = t, s.async = void 0 === l || l), s.onload = s.onerror = s.onbeforeload = function(e) {
                    var u = e.type[0];
                    if (o) try {
                        s.sheet.cssText.length || (u = "e")
                    } catch (e) {
                        18 != e.code && (u = "e")
                    }
                    if ("e" == u) {
                        if ((r += 1) < c) return a(t, n, i, r)
                    } else if ("preload" == s.rel && "style" == s.as) return s.rel = "stylesheet";
                    n(t, u, e.defaultPrevented)
                }, !1 !== d(t, s) && u.head.appendChild(s)
            }

            function s(e, n, i) {
                var s, u;
                if (n && n.trim && (s = n), u = (s ? i : n) || {}, s) {
                    if (s in t) throw "LoadJS";
                    t[s] = !0
                }

                function l(t, n) {
                    ! function(e, t, n) {
                        var i, r, o = (e = e.push ? e : [e]).length,
                            s = o,
                            u = [];
                        for (i = function(e, n, i) {
                                if ("e" == n && u.push(e), "b" == n) {
                                    if (!i) return;
                                    u.push(e)
                                }--o || t(u)
                            }, r = 0; r < s; r++) a(e[r], i, n)
                    }(e, (function(e) {
                        o(u, e), t && o({
                            success: t,
                            error: n
                        }, e), r(s, e)
                    }), u)
                }
                if (u.returnPromise) return new Promise(l);
                l()
            }
            return s.ready = function(e, t) {
                return function(e, t) {
                    e = e.push ? e : [e];
                    var r, o, a, s = [],
                        u = e.length,
                        l = u;
                    for (r = function(e, n) {
                            n.length && s.push(e), --l || t(s)
                        }; u--;) o = e[u], (a = n[o]) ? r(o, a) : (i[o] = i[o] || []).push(r)
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

    function _v(e) {
        return new Promise((function(t, n) {
            yv(e, {
                success: t,
                error: n
            })
        }))
    }

    function bv(e) {
        e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, dg.call(this, this.media, e ? "play" : "pause"))
    }
    var wv = {
        setup: function() {
            var e = this;
            Km(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, yg.call(e), _m(window.Vimeo) ? wv.ready.call(e) : _v(e.config.urls.vimeo.sdk).then((function() {
                wv.ready.call(e)
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
                o = Bd(n, ["premium", "referrerPolicy"]);
            i && Object.assign(o, {
                controls: !1,
                sidedock: !1
            });
            var a = Jg(Ud({
                    loop: t.config.loop.active,
                    autoplay: t.autoplay,
                    muted: t.muted,
                    gesture: "media",
                    playsinline: !this.config.fullscreen.iosNative
                }, o)),
                s = t.media.getAttribute("src");
            Mm(s) && (s = t.media.getAttribute(t.config.attributes.embed.id));
            var u, l = Mm(u = s) ? null : bm(Number(u)) ? u : u.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : u,
                c = zm("iframe"),
                d = Ng(t.config.urls.vimeo.iframe, l, a);
            c.setAttribute("src", d), c.setAttribute("allowfullscreen", ""), c.setAttribute("allow", "autoplay,fullscreen,picture-in-picture"), Mm(r) || c.setAttribute("referrerPolicy", r);
            var h = t.poster;
            if (i) c.setAttribute("data-poster", h), t.media = Xm(c, t.media);
            else {
                var f = zm("div", {
                    class: t.config.classNames.embedContainer,
                    "data-poster": h
                });
                f.appendChild(c), t.media = Xm(f, t.media)
            }
            qg(Ng(t.config.urls.vimeo.api, l), "json").then((function(e) {
                if (!Mm(e)) {
                    var n = new URL(e[0].thumbnail_large);
                    n.pathname = "".concat(n.pathname.split("_")[0], ".jpg"), hv.setPoster.call(t, n.href).catch((function() {}))
                }
            })), t.embed = new window.Vimeo.Player(c, {
                autopause: t.config.autopause,
                muted: t.muted
            }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function() {
                return bv.call(t, !0), t.embed.play()
            }, t.media.pause = function() {
                return bv.call(t, !1), t.embed.pause()
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
                    i.seeking = !0, dg.call(t, i, "seeking"), Promise.resolve(a && n.setVolume(0)).then((function() {
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
                        m = e, dg.call(t, t.media, "ratechange")
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
                        g = e, dg.call(t, t.media, "volumechange")
                    }))
                }
            });
            var v = t.config.muted;
            Object.defineProperty(t.media, "muted", {
                get: function() {
                    return v
                },
                set: function(e) {
                    var n = !!Tm(e) && e;
                    t.embed.setVolume(n ? 0 : t.config.volume).then((function() {
                        v = n, dg.call(t, t.media, "volumechange")
                    }))
                }
            });
            var y, _ = t.config.loop;
            Object.defineProperty(t.media, "loop", {
                get: function() {
                    return _
                },
                set: function(e) {
                    var n = Tm(e) ? e : t.config.loop.active;
                    t.embed.setLoop(n).then((function() {
                        _ = n
                    }))
                }
            }), t.embed.getVideoUrl().then((function(e) {
                y = e, Kg.setDownloadUrl.call(t)
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
                var i = qd(n, 2),
                    r = i[0],
                    o = i[1];
                t.embed.ratio = [r, o], yg.call(e)
            })), t.embed.setAutopause(t.config.autopause).then((function(e) {
                t.config.autopause = e
            })), t.embed.getVideoTitle().then((function(n) {
                t.config.title = n, hv.setTitle.call(e)
            })), t.embed.getCurrentTime().then((function(e) {
                p = e, dg.call(t, t.media, "timeupdate")
            })), t.embed.getDuration().then((function(e) {
                t.media.duration = e, dg.call(t, t.media, "durationchange")
            })), t.embed.getTextTracks().then((function(e) {
                t.media.textTracks = e, ev.setup.call(t)
            })), t.embed.on("cuechange", (function(e) {
                var n = e.cues,
                    i = (void 0 === n ? [] : n).map((function(e) {
                        return function(e) {
                            var t = document.createDocumentFragment(),
                                n = document.createElement("div");
                            return t.appendChild(n), n.innerHTML = e, t.firstChild.innerText
                        }(e.text)
                    }));
                ev.updateCues.call(t, i)
            })), t.embed.on("loaded", (function() {
                (t.embed.getPaused().then((function(e) {
                    bv.call(t, !e), e || dg.call(t, t.media, "playing")
                })), Sm(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1)
            })), t.embed.on("bufferstart", (function() {
                dg.call(t, t.media, "waiting")
            })), t.embed.on("bufferend", (function() {
                dg.call(t, t.media, "playing")
            })), t.embed.on("play", (function() {
                bv.call(t, !0), dg.call(t, t.media, "playing")
            })), t.embed.on("pause", (function() {
                bv.call(t, !1)
            })), t.embed.on("timeupdate", (function(e) {
                t.media.seeking = !1, p = e.seconds, dg.call(t, t.media, "timeupdate")
            })), t.embed.on("progress", (function(e) {
                t.media.buffered = e.percent, dg.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && dg.call(t, t.media, "canplaythrough"), t.embed.getDuration().then((function(e) {
                    e !== t.media.duration && (t.media.duration = e, dg.call(t, t.media, "durationchange"))
                }))
            })), t.embed.on("seeked", (function() {
                t.media.seeking = !1, dg.call(t, t.media, "seeked")
            })), t.embed.on("ended", (function() {
                t.media.paused = !0, dg.call(t, t.media, "ended")
            })), t.embed.on("error", (function(e) {
                t.media.error = e, dg.call(t, t.media, "error")
            })), setTimeout((function() {
                return hv.build.call(t)
            }), 0)
        }
    };

    function Tv(e) {
        e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, dg.call(this, this.media, e ? "play" : "pause"))
    }

    function kv(e) {
        return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
    }
    var xv = {
            setup: function() {
                var e = this;
                if (Km(this.elements.wrapper, this.config.classNames.embed, !0), _m(window.YT) && km(window.YT.Player)) xv.ready.call(this);
                else {
                    var t = window.onYouTubeIframeAPIReady;
                    window.onYouTubeIframeAPIReady = function() {
                        km(t) && t(), xv.ready.call(e)
                    }, _v(this.config.urls.youtube.sdk).catch((function(t) {
                        e.debug.warn("YouTube API failed to load", t)
                    }))
                }
            },
            getTitle: function(e) {
                var t = this;
                qg(Ng(this.config.urls.youtube.api, e)).then((function(e) {
                    if (_m(e)) {
                        var n = e.title,
                            i = e.height,
                            r = e.width;
                        t.config.title = n, hv.setTitle.call(t), t.embed.ratio = [r, i]
                    }
                    yg.call(t)
                })).catch((function() {
                    yg.call(t)
                }))
            },
            ready: function() {
                var e = this,
                    t = e.media && e.media.getAttribute("id");
                if (Mm(t) || !t.startsWith("youtube-")) {
                    var n = e.media.getAttribute("src");
                    Mm(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
                    var i, r, o = Mm(i = n) ? null : i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : i,
                        a = (r = e.provider, "".concat(r, "-").concat(Math.floor(1e4 * Math.random()))),
                        s = zm("div", {
                            id: a,
                            "data-poster": e.poster
                        });
                    e.media = Xm(s, e.media);
                    var u = function(e) {
                        return "https://i.ytimg.com/vi/".concat(o, "/").concat(e, "default.jpg")
                    };
                    dv(u("maxres"), 121).catch((function() {
                        return dv(u("sd"), 121)
                    })).catch((function() {
                        return dv(u("hq"))
                    })).then((function(t) {
                        return hv.setPoster.call(e, t.src)
                    })).then((function(t) {
                        t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
                    })).catch((function() {}));
                    var l = e.config.youtube;
                    e.embed = new window.YT.Player(a, {
                        videoId: o,
                        host: kv(l),
                        playerVars: Um({}, {
                            autoplay: e.config.autoplay ? 1 : 0,
                            hl: e.config.hl,
                            controls: e.supported.ui ? 0 : 1,
                            disablekb: 1,
                            playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                            cc_load_policy: e.captions.active ? 1 : 0,
                            cc_lang_pref: e.config.captions.language,
                            widget_referrer: window ? window.location.href : null
                        }, l),
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
                                    }, dg.call(e, e.media, "error")
                                }
                            },
                            onPlaybackRateChange: function(t) {
                                var n = t.target;
                                e.media.playbackRate = n.getPlaybackRate(), dg.call(e, e.media, "ratechange")
                            },
                            onReady: function(t) {
                                if (!km(e.media.play)) {
                                    var n = t.target;
                                    xv.getTitle.call(e, o), e.media.play = function() {
                                        Tv.call(e, !0), n.playVideo()
                                    }, e.media.pause = function() {
                                        Tv.call(e, !1), n.pauseVideo()
                                    }, e.media.stop = function() {
                                        n.stopVideo()
                                    }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                                        get: function() {
                                            return Number(n.getCurrentTime())
                                        },
                                        set: function(t) {
                                            e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, dg.call(e, e.media, "seeking"), n.seekTo(t)
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
                                            i = t, n.setVolume(100 * i), dg.call(e, e.media, "volumechange")
                                        }
                                    });
                                    var r = e.config.muted;
                                    Object.defineProperty(e.media, "muted", {
                                        get: function() {
                                            return r
                                        },
                                        set: function(t) {
                                            var i = Tm(t) ? t : r;
                                            r = i, n[i ? "mute" : "unMute"](), dg.call(e, e.media, "volumechange")
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
                                    })), e.supported.ui && e.media.setAttribute("tabindex", -1), dg.call(e, e.media, "timeupdate"), dg.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval((function() {
                                        e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && dg.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), dg.call(e, e.media, "canplaythrough"))
                                    }), 200), setTimeout((function() {
                                        return hv.build.call(e)
                                    }), 50)
                                }
                            },
                            onStateChange: function(t) {
                                var n = t.target;
                                switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, dg.call(e, e.media, "seeked")), t.data) {
                                    case -1:
                                        dg.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), dg.call(e, e.media, "progress");
                                        break;
                                    case 0:
                                        Tv.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : dg.call(e, e.media, "ended");
                                        break;
                                    case 1:
                                        e.config.autoplay || !e.media.paused || e.embed.hasPlayed ? (Tv.call(e, !0), dg.call(e, e.media, "playing"), e.timers.playing = setInterval((function() {
                                            dg.call(e, e.media, "timeupdate")
                                        }), 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), dg.call(e, e.media, "durationchange"))) : e.media.pause();
                                        break;
                                    case 2:
                                        e.muted || e.embed.unMute(), Tv.call(e, !1);
                                        break;
                                    case 3:
                                        dg.call(e, e.media, "waiting")
                                }
                                dg.call(e, e.elements.container, "statechange", !1, {
                                    code: t.data
                                })
                            }
                        }
                    })
                }
            }
        },
        Av = {
            setup: function() {
                this.media ? (Km(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), Km(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && Km(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = zm("div", {
                    class: this.config.classNames.video
                }), Bm(this.media, this.elements.wrapper), this.elements.poster = zm("div", {
                    class: this.config.classNames.poster
                }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? _g.setup.call(this) : this.isYouTube ? xv.setup.call(this) : this.isVimeo && wv.setup.call(this)) : this.debug.warn("No media element found!")
            }
        },
        Sv = function() {
            function e(t) {
                var n = this;
                jd(this, e), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                    container: null,
                    displayContainer: null
                }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((function(e, t) {
                    n.on("loaded", e), n.on("error", t)
                })), this.load()
            }
            return Fd(e, [{
                key: "load",
                value: function() {
                    var e = this;
                    this.enabled && (_m(window.google) && _m(window.google.ima) ? this.ready() : _v(this.player.config.urls.googleIMA.sdk).then((function() {
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
                    this.elements.container = zm("div", {
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
                        var t = Qg(Math.max(e.manager.getRemainingTime(), 0)),
                            n = "".concat(Ug("advertisement", e.player.config), " - ").concat(t);
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
                    Mm(this.cuePoints) || this.cuePoints.forEach((function(t) {
                        if (0 !== t && -1 !== t && t < e.player.duration) {
                            var n = e.player.elements.progress;
                            if (Sm(n)) {
                                var i = 100 / e.player.duration * t,
                                    r = zm("span", {
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
                            dg.call(t.player, t.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()))
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
                        Mm(t.cuePoints) || t.cuePoints.forEach((function(i, r) {
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
                    this.elements.container.style.zIndex = "", this.playing = !1, pg(this.player.media.play())
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
                    xm(o) && o.forEach((function(e) {
                        km(e) && e.apply(t, i)
                    }))
                }
            }, {
                key: "on",
                value: function(e, t) {
                    return xm(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
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
                    ym(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null)
                }
            }, {
                key: "enabled",
                get: function() {
                    var e = this.config;
                    return this.player.isHTML5 && this.player.isVideo && e.enabled && (!Mm(e.publisherId) || Im(e.tagUrl))
                }
            }, {
                key: "tagUrl",
                get: function() {
                    var e = this.config;
                    if (Im(e.tagUrl)) return e.tagUrl;
                    var t = {
                        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                        AV_CHANNELID: "5a0458dc28a06145e4519d21",
                        AV_URL: window.location.hostname,
                        cb: Date.now(),
                        AV_WIDTH: 640,
                        AV_HEIGHT: 480,
                        AV_CDIM2: e.publisherId
                    };
                    return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(Jg(t))
                }
            }]), e
        }(),
        Ev = Ca.findIndex,
        Ov = !0,
        Cv = vs("findIndex");
    "findIndex" in [] && Array(1).findIndex((function() {
        Ov = !1
    })), Qo({
        target: "Array",
        proto: !0,
        forced: Ov || !Cv
    }, {
        findIndex: function(e) {
            return Ev(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Ms("findIndex");
    var Pv = Math.min,
        Iv = [].lastIndexOf,
        Mv = !!Iv && 1 / [1].lastIndexOf(1, -0) < 0,
        Lv = fs("lastIndexOf"),
        Rv = vs("indexOf", {
            ACCESSORS: !0,
            1: 0
        }),
        Nv = Mv || !Lv || !Rv ? function(e) {
            if (Mv) return Iv.apply(this, arguments) || 0;
            var t = Rr(this),
                n = Oo(t.length),
                i = n - 1;
            for (arguments.length > 1 && (i = Pv(i, So(arguments[1]))), i < 0 && (i = n + i); i >= 0; i--)
                if (i in t && t[i] === e) return i || 0;
            return -1
        } : Iv;
    Qo({
        target: "Array",
        proto: !0,
        forced: Nv !== [].lastIndexOf
    }, {
        lastIndexOf: Nv
    });
    var jv = function(e, t) {
            var n = {};
            return e > t.width / t.height ? (n.width = t.width, n.height = 1 / e * t.width) : (n.height = t.height, n.width = e * t.height), n
        },
        Dv = function() {
            function e(t) {
                jd(this, e), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                    thumb: {},
                    scrubbing: {}
                }, this.load()
            }
            return Fd(e, [{
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
                        if (Mm(n)) throw new Error("Missing previewThumbnails.src config attribute");
                        var i = function() {
                            e.thumbnails.sort((function(e, t) {
                                return e.height - t.height
                            })), e.player.debug.log("Preview thumbnails", e.thumbnails), t()
                        };
                        if (km(n)) n((function(t) {
                            e.thumbnails = t, i()
                        }));
                        else {
                            var r = (wm(n) ? [n] : n).map((function(t) {
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
                        qg(e).then((function(i) {
                            var r, o, a = {
                                frames: (r = i, o = [], r.split(/\r\n\r\n|\n\n|\r\r/).forEach((function(e) {
                                    var t = {};
                                    e.split(/\r\n|\n|\r/).forEach((function(e) {
                                        if (bm(t.startTime)) {
                                            if (!Mm(e.trim()) && Mm(t.text)) {
                                                var n = e.trim().split("#xywh="),
                                                    i = qd(n, 1);
                                                if (t.text = i[0], n[1]) {
                                                    var r = qd(n[1].split(","), 4);
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
                    if (this.loaded && Em(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
                        if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
                        else {
                            var t = this.player.elements.progress.getBoundingClientRect(),
                                n = 100 / t.width * (e.pageX - t.left);
                            this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Qg(this.seekTime)
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
                    (ym(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
                }
            }, {
                key: "endScrubbing",
                value: function() {
                    var e = this;
                    this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : cg.call(this.player, this.player.media, "timeupdate", (function() {
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
                    this.elements.thumb.container = zm("div", {
                        class: this.player.config.classNames.previewThumbnails.thumbContainer
                    }), this.elements.thumb.imageContainer = zm("div", {
                        class: this.player.config.classNames.previewThumbnails.imageContainer
                    }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                    var e = zm("div", {
                        class: this.player.config.classNames.previewThumbnails.timeContainer
                    });
                    this.elements.thumb.time = zm("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), Sm(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = zm("div", {
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
                        var u = new Image;
                        u.src = s, u.dataset.index = n, u.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log("Loading image: ".concat(s)), u.onload = function() {
                            return e.showImage(u, o, t, n, a, !0)
                        }, this.loadingImage = u, this.removeOldImages(u)
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
                    var e = jv(this.thumbAspectRatio, {
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
                    return this.mouseDown ? jv(this.thumbAspectRatio, {
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
        Fv = {
            insertElements: function(e, t) {
                var n = this;
                wm(t) ? Vm(e, this.media, {
                    src: t
                }) : xm(t) && t.forEach((function(t) {
                    Vm(e, n.media, t)
                }))
            },
            change: function(e) {
                var t = this;
                Hm(e, "sources.length") ? (_g.cancelRequests.call(this), this.destroy.call(this, (function() {
                    t.options.quality = [], Wm(t.media), t.media = null, Sm(t.elements.container) && t.elements.container.removeAttribute("class");
                    var n = e.sources,
                        i = e.type,
                        r = qd(n, 1)[0],
                        o = r.provider,
                        a = void 0 === o ? rv.html5 : o,
                        s = r.src,
                        u = "html5" === a ? i : "div",
                        l = "html5" === a ? {} : {
                            src: s
                        };
                    Object.assign(t, {
                        provider: a,
                        type: i,
                        supported: og.check(i, a, t.config.playsinline),
                        media: zm(u, l)
                    }), t.elements.container.appendChild(t.media), Tm(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), Mm(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), hv.addStyleHook.call(t), t.isHTML5 && Fv.insertElements.call(t, "source", n), t.config.title = e.title, Av.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && Fv.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && hv.build.call(t), t.isHTML5 && t.media.load(), Mm(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new Dv(t))), t.fullscreen.update()
                }), !0)) : this.debug.warn("Invalid source format")
            }
        };
    var $v, Hv = function() {
        function e(t, n) {
            var i = this;
            if (jd(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = og.touch, this.media = t, wm(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || Am(this.media) || xm(this.media)) && (this.media = this.media[0]), this.config = Um({}, tv, e.defaults, n || {}, function() {
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
                }, this.debug = new uv(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", og), !ym(this.media) && Sm(this.media))
                if (this.media.plyr) this.debug.warn("Target already setup");
                else if (this.config.enabled)
                if (og.check().api) {
                    var r = this.media.cloneNode(!0);
                    r.autoplay = !1, this.elements.original = r;
                    var o = this.media.tagName.toLowerCase(),
                        a = null,
                        s = null;
                    switch (o) {
                        case "div":
                            if (a = this.media.querySelector("iframe"), Sm(a)) {
                                if (s = Zg(a.getAttribute("src")), this.provider = function(e) {
                                        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? rv.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? rv.vimeo : null
                                    }(s.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", s.search.length) {
                                    var u = ["1", "true"];
                                    u.includes(s.searchParams.get("autoplay")) && (this.config.autoplay = !0), u.includes(s.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = u.includes(s.searchParams.get("playsinline")), this.config.youtube.hl = s.searchParams.get("hl")) : this.config.playsinline = !0
                                }
                            } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                            if (Mm(this.provider) || !Object.keys(rv).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                            this.type = av;
                            break;
                        case "video":
                        case "audio":
                            this.type = o, this.provider = rv.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                            break;
                        default:
                            return void this.debug.error("Setup failed: unsupported type")
                    }
                    this.supported = og.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new fv(this), this.storage = new Bg(this), this.media.plyr = this, Sm(this.elements.container) || (this.elements.container = zm("div", {
                        tabindex: 0
                    }), Bm(this.media, this.elements.container)), hv.migrateStyles.call(this), hv.addStyleHook.call(this), Av.setup.call(this), this.config.debug && ug.call(this, this.elements.container, this.config.events.join(" "), (function(e) {
                        i.debug.log("event: ".concat(e.type))
                    })), this.fullscreen = new lv(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && hv.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Sv(this)), this.isHTML5 && this.config.autoplay && setTimeout((function() {
                        return pg(i.play())
                    }), 10), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Dv(this))) : this.debug.error("Setup failed: no support")
                } else this.debug.error("Setup failed: no support");
            else this.debug.error("Setup failed: disabled by config");
            else this.debug.error("Setup failed: no suitable element passed")
        }
        return Fd(e, [{
            key: "play",
            value: function() {
                var e = this;
                return km(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then((function() {
                    return e.ads.play()
                })).catch((function() {
                    return pg(e.media.play())
                })), this.media.play()) : null
            }
        }, {
            key: "pause",
            value: function() {
                return this.playing && km(this.media.pause) ? this.media.pause() : null
            }
        }, {
            key: "togglePlay",
            value: function(e) {
                return (Tm(e) ? e : !this.playing) ? this.play() : this.pause()
            }
        }, {
            key: "stop",
            value: function() {
                this.isHTML5 ? (this.pause(), this.restart()) : km(this.media.stop) && this.media.stop()
            }
        }, {
            key: "restart",
            value: function() {
                this.currentTime = 0
            }
        }, {
            key: "rewind",
            value: function(e) {
                this.currentTime -= bm(e) ? e : this.config.seekTime
            }
        }, {
            key: "forward",
            value: function(e) {
                this.currentTime += bm(e) ? e : this.config.seekTime
            }
        }, {
            key: "increaseVolume",
            value: function(e) {
                var t = this.media.muted ? 0 : this.volume;
                this.volume = t + (bm(e) ? e : 0)
            }
        }, {
            key: "decreaseVolume",
            value: function(e) {
                this.increaseVolume(-e)
            }
        }, {
            key: "toggleCaptions",
            value: function(e) {
                ev.toggle.call(this, e, !1)
            }
        }, {
            key: "airplay",
            value: function() {
                og.airplay && this.media.webkitShowPlaybackTargetPicker()
            }
        }, {
            key: "toggleControls",
            value: function(e) {
                if (this.supported.ui && !this.isAudio) {
                    var t = Zm(this.elements.container, this.config.classNames.hideControls),
                        n = void 0 === e ? void 0 : !e,
                        i = Km(this.elements.container, this.config.classNames.hideControls, n);
                    if (i && xm(this.config.controls) && this.config.controls.includes("settings") && !Mm(this.config.settings) && Kg.toggleMenu.call(this, !1), i !== t) {
                        var r = i ? "controlshidden" : "controlsshown";
                        dg.call(this, this.media, r)
                    }
                    return !i
                }
                return !1
            }
        }, {
            key: "on",
            value: function(e, t) {
                ug.call(this, this.elements.container, e, t)
            }
        }, {
            key: "once",
            value: function(e, t) {
                cg.call(this, this.elements.container, e, t)
            }
        }, {
            key: "off",
            value: function(e, t) {
                lg(this.elements.container, e, t)
            }
        }, {
            key: "destroy",
            value: function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (this.ready) {
                    var i = function() {
                        document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (Wm(t.elements.buttons.play), Wm(t.elements.captions), Wm(t.elements.controls), Wm(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), km(e) && e()) : (hg.call(t), Xm(t.elements.original, t.elements.container), dg.call(t, t.elements.original, "destroyed", !0), km(e) && e.call(t.elements.original), t.ready = !1, setTimeout((function() {
                            t.elements = null, t.media = null
                        }), 200))
                    };
                    this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (hv.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && km(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
                }
            }
        }, {
            key: "supports",
            value: function(e) {
                return og.mime.call(this, e)
            }
        }, {
            key: "isHTML5",
            get: function() {
                return this.provider === rv.html5
            }
        }, {
            key: "isEmbed",
            get: function() {
                return this.isYouTube || this.isVimeo
            }
        }, {
            key: "isYouTube",
            get: function() {
                return this.provider === rv.youtube
            }
        }, {
            key: "isVimeo",
            get: function() {
                return this.provider === rv.vimeo
            }
        }, {
            key: "isVideo",
            get: function() {
                return this.type === av
            }
        }, {
            key: "isAudio",
            get: function() {
                return this.type === ov
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
                    var t = bm(e) && e > 0;
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
                return bm(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
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
                    n = bm(t) && t !== 1 / 0 ? t : 0;
                return e || n
            }
        }, {
            key: "volume",
            set: function(e) {
                var t = e;
                wm(t) && (t = Number(t)), bm(t) || (t = this.storage.get("volume")), bm(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !Mm(e) && this.muted && t > 0 && (this.muted = !1)
            },
            get: function() {
                return Number(this.media.volume)
            }
        }, {
            key: "muted",
            set: function(e) {
                var t = e;
                Tm(t) || (t = this.storage.get("muted")), Tm(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
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
                bm(e) && (n = e), bm(n) || (n = this.storage.get("speed")), bm(n) || (n = this.config.speed.selected);
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
                return this.isYouTube ? Math.min.apply(Math, zd(this.options.speed)) : this.isVimeo ? .5 : .0625
            }
        }, {
            key: "maximumSpeed",
            get: function() {
                return this.isYouTube ? Math.max.apply(Math, zd(this.options.speed)) : this.isVimeo ? 2 : 16
            }
        }, {
            key: "quality",
            set: function(e) {
                var t = this.config.quality,
                    n = this.options.quality;
                if (n.length) {
                    var i = [!Mm(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(bm),
                        r = !0;
                    if (!n.includes(i)) {
                        var o = function(e, t) {
                            return xm(e) && e.length ? e.reduce((function(e, n) {
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
                var t = Tm(e) ? e : this.config.loop.active;
                this.config.loop.active = t, this.media.loop = t
            },
            get: function() {
                return Boolean(this.media.loop)
            }
        }, {
            key: "source",
            set: function(e) {
                Fv.change.call(this, e)
            },
            get: function() {
                return this.media.currentSrc
            }
        }, {
            key: "download",
            get: function() {
                var e = this.config.urls.download;
                return Im(e) ? e : this.source
            },
            set: function(e) {
                Im(e) && (this.config.urls.download = e, Kg.setDownloadUrl.call(this))
            }
        }, {
            key: "poster",
            set: function(e) {
                this.isVideo ? hv.setPoster.call(this, e, !1).catch((function() {})) : this.debug.warn("Poster can only be set for video")
            },
            get: function() {
                return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
            }
        }, {
            key: "ratio",
            get: function() {
                if (!this.isVideo) return null;
                var e = gg(vg.call(this));
                return xm(e) ? e.join(":") : e
            },
            set: function(e) {
                this.isVideo ? wm(e) && mg(e) ? (this.config.ratio = e, yg.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video")
            }
        }, {
            key: "autoplay",
            set: function(e) {
                var t = Tm(e) ? e : this.config.autoplay;
                this.config.autoplay = t
            },
            get: function() {
                return Boolean(this.config.autoplay)
            }
        }, {
            key: "currentTrack",
            set: function(e) {
                ev.set.call(this, e, !1)
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
                ev.setLanguage.call(this, e, !1)
            },
            get: function() {
                return (ev.getCurrentTrack.call(this) || {}).language
            }
        }, {
            key: "pip",
            set: function(e) {
                if (og.pip) {
                    var t = Tm(e) ? e : !this.pip;
                    km(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? nv : iv), km(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
                }
            },
            get: function() {
                return og.pip ? Mm(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === nv : null
            }
        }], [{
            key: "supported",
            value: function(e, t, n) {
                return og.check(e, t, n)
            }
        }, {
            key: "loadSprite",
            value: function(e, t) {
                return zg(e, t)
            }
        }, {
            key: "setup",
            value: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = null;
                return wm(t) ? i = Array.from(document.querySelectorAll(t)) : Am(t) ? i = Array.from(t) : xm(t) && (i = t.filter(Sm)), Mm(i) ? null : i.map((function(t) {
                    return new e(t, n)
                }))
            }
        }]), e
    }();

    /* ------- 사운드 ----------------- */
    Hv.defaults = ($v = tv, JSON.parse(JSON.stringify($v)));
    var Uv, Bv, qv, zv, Vv, Wv = Hv,
        Gv = n(0),
        Xv = document.getElementById("bgm"),
        Yv = new Gv.Howl({
            src: [Xv.src],
            autoplay: true,
            loop: true,
            volume: 1,
            onplay: function() {
                $(".btn-audio").addClass("is-active"), false
            }
        });

    function Qv(e) {
        Yv.fade(Yv.volume(), e, 200)
    }
    /* ---------------------------------- */

    function Kv(e) {
        qi.set($(".video-dimmed", e), { y: "100%" ), 
        qi.set($(".video", e), { alpha: 0 }), 
        qi.set($(".video .progress .bar", e), { width: "0%" }), 
        zv = $("video", e)[0];
        var t = $("video", e).hasClass("plyr");
        if (!zv.inited)
            if (t) {
                var n = new Wv(zv, {
                    fullscreen: { enabled: !1 },
                    controls: ["play-large", "current-time", "mute", "volume", "progress"]
                });
                zv.player = n, zv.muted = !1, 
                n.on("playing", (function() { Qv(0) })), 
                n.on("pause", (function() { Qv(1) })), 
                n.on("playing", (function() {})), 
                n.on("ended", (function() { window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")) }))
            } else 
                zv.addEventListener("ended", (function() {
                    window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
                })), 
                zv.addEventListener("playing", (function() {})), 
                zv.addEventListener("pause", (function() {})), 
                zv.currentTime = 0;
        zv.inited = !0, 
        qv = !1, 
        0 == t && (zv.muted = !0, 
        $(".btn-mute", e).addClass("muted"));
        var i = zv.src;
        zv.src = "", 
        requestAnimationFrame((function() { zv.src = i })), 
        qi.set($(".overlay", e), { alpha: 0 })
    }

    function Zv(e) {
        qi.killTweensOf($(".video-dimmed", e)), qi.killTweensOf($(".video", e)), qi.killTweensOf($(".overlay", e)), zv = $("video", e)[0];
        var t = $("video", e).hasClass("plyr");
        t ? zv.player && (zv.player.pause(), zv.player.rewind(0)) : (qi.killTweensOf(zv), zv.pause()), qv = !1, 0 == t && (zv.muted = !0, Qv(1), $(".btn-mute", e).addClass("muted"))
    }

    function Jv(e) {
        Vv = e, 
        zv = $("video", e)[0];
        var t = $("video", e).hasClass("plyr"),
            n = new Xt({
                onUpdate: function() {
                    appProgressBar_play(n.totalTime() / n.totalDuration())
                }
            });
        n.to($(".video-dimmed", e), { alpha: 1, y: "0%", easing: An.easeInOut, duration: .6 }, .2), 
        n.to($(".video", e), { alpha: 1, easing: An.easeOut, duration: 1, 
            onStart: function() {
                qv = true, 
                t ? (zv.player.rewind(0), zv.player.play()) : zv.play(), 
                requestAnimationFrame(ny)
                }
        }, .2)
    }

    function ey(e) { return !0 } 
    function ty(e) { return !0 }

    function ny() {
        var e = zv.currentTime / zv.duration;
        appProgressBar_play(0), 
        qv && requestAnimationFrame(ny), 
        qi.set($(".video .progress .bar", Vv), { width: 100 * e + "%" )}
    void 0 !== document.hidden ? (Uv = "hidden", Bv = "visibilitychange") : void 0 !== document.msHidden ? (Uv = "msHidden", Bv = "msvisibilitychange") : void 0 !== document.webkitHidden && (Uv = "webkitHidden", Bv = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document[Uv] || document.addEventListener(Bv, (function(e) {
        document[Uv] ? Gv.Howler.mute(!0) : Gv.Howler.mute(!1)
    }), !1);
    var iy, ry, oy, ay, sy, uy, ly, cy = 1;
    
    function dy(e) {
        qi.set("#intro1 .b2", { height: "0%" }), 
        qi.set("#intro1 .photo", { alpha: 0, y: "-2vh" }), 
        qi.set("#intro1 .photo .back", { height: "100%" }), 
        qi.set("#intro1 .title", { alpha: 1, y: "0" }), 
        qi.set("#intro1 .title span", { alpha: 0, y: "-1vh" }), 
        qi.set("#intro1 .descriptions", { alpha: 0, y: 0 }), 
        qi.set("#intro1 .descriptions1", { alpha: 1 }), 
        qi.set("#intro1 .descriptions p", { alpha: 0, y: "-1vh" })
    }

    function hy(e) {
        qi.killTweensOf("#intro1 .back"), 
        qi.killTweensOf("#intro1 .photo"), 
        qi.killTweensOf("#intro1 .title"), 
        qi.killTweensOf("#intro1 .title span"), 
        qi.killTweensOf("#intro1 .descriptions"), 
        qi.killTweensOf("#intro1 .descriptions p")
    }

    function fy(e) {
        cy = 1, e, my(!0)
    }

    function py() {
        switch (cy) {
            case 1:
                my();
                break;
            case 2:
                (e = new Xt({
                    onComplete: gy,
                    onUpdate: function() {
                        appProgressBar_play(e.totalTime() / e.totalDuration())
                    },
                    onCompleteParams: [2]
                })).to("#intro1 .title", { y: "-1vh", alpha: 0, duration: 1.4, ease: An.easeOut, onComplete: function() { l_(!1), tr() } }, 0), 

                e.to("#intro1 .photo .back", { height: "0%", duration: 1.4, ease: An.easeInOut }, .1), 
                e.to("#intro1 .descriptions1", { y: "-1vh", alpha: 0, duration: 1.4, ease: An.easeOut }, .2), 
                e.to("#intro1 .descriptions2", { alpha: 1, duration: 1, ease: An.easeOut }, 0), 
                e.to("#intro1 .b2", { height: "100%", duration: 2, ease: An.easeInOut }, .6), 
                e.to("#intro1 .descriptions2 p", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut, stagger: .4 }, 1.6)
        }
        var e
    }

    function my(e) {
        var t = new Xt({
            onComplete: gy,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            },
            onCompleteParams: [1]
        });
        t.to("#intro1 .photo", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, 0), 
        t.to("#intro1 .title span", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, .6), 
        t.to("#intro1 .descriptions1 p", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut, stagger: .4 }, 1.2)
    }

    function gy(e) {
        "active" == $(".page#intro1").attr("data-status") && e == cy && (l_(!1), tr(), "active" == $(".page#intro1").attr("data-status") && (rr($(".page#intro1")), cr()))
    }

    function vy(e) {
        return !0
    }

    function yy(e) {
        return 2 == cy
    }

    function _y(e) {
        qi.set("#intro2 .descriptions p", {
            alpha: 0,
            y: "-1vh"
        })
    }

    function by(e) {
        qi.killTweensOf("#intro2 .descriptions p")
    }

    function wy(e) {
        var t = new Xt({
            onComplete: xy,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to("#intro2 .descriptions p", { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut, stagger: .4 }, .8)
    }

    function Ty(e) {
        return !0
    }

    function ky(e) {
        return !0
    }

    function xy() {
        "active" == $(".page#intro2").attr("data-status") && (rr($(".page#intro2")), cr())
    }

    function Ay(e) {
        qi.set($(".back.to-left", e), { backgroundPosition: "100% 50%" }), 
        qi.set($(".back.to-right", e), { backgroundPosition: "0% 50%" }), 
        qi.set($(".back.to-bottom", e), { backgroundPosition: "50% 0%" }), 
        qi.set($(".back.to-top", e), { backgroundPosition: "50% 100%" }), 
        qi.set($(".title span", e), { alpha: 0, y: "-1.5vh" }), 
        qi.set($(".descriptions p", e), { alpha: 0, y: "-1.5vh" })
    }

    function Sy(e) {
        qi.killTweensOf($(".back", e)), 
        qi.killTweensOf($(".title span", e)), 
        qi.killTweensOf($(".descriptions p", e))
    }

    function Ey(e) {
        iy = e;
        var t = new Xt({
            onComplete: Py,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to($(".back.to-right", iy), { backgroundPosition: "100% 50%", duration: 3, ease: xn.easeInOut }, 0), 
        t.to($(".back.to-left", iy), { backgroundPosition: "0% 50%", duration: 3, ease: xn.easeInOut }, 0), 
        t.to($(".back.to-bottom", iy), { backgroundPosition: "50% 100%", duration: 3, ease: xn.easeInOut }, 0), 
        t.to($(".back.to-top", iy), { backgroundPosition: "50% 0%", duration: 3, ease: xn.easeInOut }, 0), 
        t.to($(".title span", iy), { alpha: 1, y: 0, duration: 2, ease: An.easeOut }, 1), 
        t.to($(".descriptions p", iy), { alpha: 1, y: 0, duration: 2, ease: An.easeOut, stagger: .4 }, 1.4)
    }

    function Oy(e) {
        return !0
    }

    function Cy(e) {
        return !0
    }

    function Py() {
        iy && "active" == $(iy).attr("data-status") && (rr(iy), cr())
    }

    function Iy(e) {
        var t = e.attr("data-move-type"),
            n = "reverse" == t ? "-50%" : "50%";
        qi.set($(".rolling-bg", e), { alpha: 0, x: n });
        var i = "reverse" == t ? "-100%" : "100%";
        qi.set($(".rolling-bg .back", e), { x: i }), 
        qi.set($(".rolling-bg .back.m1", e), { x: "0%" }), 
        qi.set($(".product-name span", e), { alpha: 0, y: "-1.5vh" }), 
        oy && (clearInterval(oy), oy = null)
    }

    function My(e) {
        qi.killTweensOf($(".rolling-bg", e)), 
        qi.killTweensOf($(".back", e)), 
        qi.killTweensOf($(".product-name span", e))
    }

    function Ly(e) {
        ry = e;
        var t = new Xt({
            onComplete: Fy,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to($(".product-name span", ry), { alpha: 1, y: "0vh", duration: 2, ease: An.easeOut }, 0), 
        t.to($(".rolling-bg", ry), { alpha: 1, x: "0%", duration: 1.2, ease: An.easeInOut, onComplete: Ry }, .6), 
        t.to($(".rolling-bg", ry), { alpha: 1, duration: 2 }, 3)
    }

    function Ry() {
        oy && (clearInterval(oy), oy = null), ay = 1, oy = setInterval(Ny, 2e3)
    }

    function Ny() {
        var e = $(".rolling-bg .back", ry).length,
            t = 0 == ay ? e : ay,
            n = ay + 1,
            i = ry.attr("data-move-type"),
            r = "reverse" == i ? "100%" : "-100%",
            o = "reverse" == i ? "-100%" : "100%";
        qi.fromTo($(".rolling-bg .m" + t, ry), { x: "0%" }, { x: r, duration: 1.2, ease: An.easeInOut }),
        qi.fromTo($(".rolling-bg .m" + n, ry), { x: o }, { x: "0%", duration: 1.2, ease: An.easeInOut}), 
        ++ay == e && (ay = 0)
    }

    function jy(e) { return !0 }
    function Dy(e) { return !0 }
    function Fy() { ry && "active" == $(ry).attr("data-status") && (rr(ry), cr()) }

    function $y(e) {
        var t = "reverse" == e.attr("data-move-type") ? "-100%" : "100%";
        qi.set($(".rolling-bg .back", e), { x: t }), 
        qi.set($(".rolling-bg .back.b1", e), { x: "0%" }), 
        qi.set($(".descriptions p", e), { alpha: 0, y: "-1.5vh" }), 
        qi.set($(".product-name span", e), { alpha: 0, y: "-1.5vh" }), 
        qi.set($(".indices", e), { alpha: 0, y: "-1.5vh" }), 
        uy && (clearInterval(uy), uy = null), 
        $(".indices .index:first-child", e).addClass("active").siblings().removeClass("active")
    }

    function Hy(e) {
        qi.killTweensOf($(".back", e)), 
        qi.killTweensOf($(".descriptions p", e)), 
        qi.killTweensOf($(".product-name span", e))
    }

    function Uy(e) {
        sy = e;
        var t = new Xt({
            onComplete: Vy,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to($(".descriptions p", sy), { alpha: 1, y: "0vh", duration: 1.4, ease: An.easeOut }, 0), 
        t.to($(".product-name span", sy), { alpha: 1, y: "0vh", duration: 1.4, ease: An.easeOut }, .4), 
        t.to($(".indices", sy), { alpha: 1, y: "0vh", duration: 1.4, ease: An.easeOut }, .8), 
        t.to($(".rolling-bg", sy), { alpha: 1, duration: 3 }, 3),

        function() {
            uy && (clearInterval(uy), uy = null);
            ly = 1, 
            uy = setInterval(By, 2200)
        }()
    }

    function By() {
        var e = $(".rolling-bg .back", sy).length,
            t = 0 == ly ? e : ly,
            n = ly + 1,
            i = sy.attr("data-move-type"),
            r = "reverse" == i ? "80%" : "-80%",
            o = "reverse" == i ? "-100%" : "100%";
        qi.set($(".rolling-bg .back", sy), { zIndex: 1
        }), 
        qi.fromTo($(".rolling-bg .b" + t, sy), { x: "0%", zIndex: 2 }, { x: r, zIndex: 2, duration: 1.2, ease: An.easeInOut }), 
        qi.fromTo($(".rolling-bg .b" + n, sy), { x: o, zIndex: 3 }, { x: "0%", zIndex: 3, duration: 1.2, ease: An.easeInOut }), 
        $(".indices .index:eq(" + (n - 1) + ")", sy).addClass("active").siblings().removeClass("active"), 
        ++ly == e && (ly = 0)
    }

    function qy(e) {
        return true
    }

    function zy(e) {
        return true
    }

    function Vy() {
        sy && "active" == $(sy).attr("data-status") && (rr(sy), cr())
    }

    function Wy(e) {
        qi.set("#ending .bg-over", { alpha: 0 }), 
        qi.set("#ending .bg-logo", { alpha: 0, scale: 1.1 })
    }

    function Gy(e) {
        qi.killTweensOf("#ending .back")
    }

    function Xy(e) {
        var t = new Xt({
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            }
        });
        t.to("#ending .bg-over", { alpha: 1, duration: .75 }, .4), 
        t.to("#ending .bg-logo", { alpha: 1, scale: 1, duration: .75 }, 1)
    }

    function Yy(e) { return !0 }
    function Qy(e) { return !0 }
    window.addEventListener("SHOWCASE_GO_NEXT", (function() { "active" == $(".page#intro1").attr("data-status") && cy < 2 && (l_(!0), er(), cy++, py()) }));
    var Ky = 1;

    function Zy(e) {
        qi.set("#event .bg-over", { alpha: 0 }), 
        qi.set("#event .event1", { alpha: 0, left: "50%" }), 
        qi.set("#event .event2", { alpha: 0, left: "200%" }),  
        qi.set("#event .indices", { alpha: 0 }), 
        qi.set("#event .btn", { alpha: 0 }), 
        $("#event .indices .index:first-child").addClass("active").siblings().removeClass("active")
    }

    function Jy(e) {
        qi.killTweensOf("#event .event"), 
        qi.killTweensOf("#event .btn")
    }

    function e_(e) {
        Ky = 1, 
        l_(!0), 
        er(), 
        n_(!0), 
        qi.fromTo("#event .btn", { alpha: 0 }, { alpha: 1, yoyo: !0, duration: .5, repeatDelay: .5, repeat: -1 })
    }

    function t_() {
        switch (Ky) {
            case 1:
                n_();
                break;
            case 2:
                (e = new Xt({
                    onComplete: i_,
                    onUpdate: function() {
                        appProgressBar_play(e.totalTime() / e.totalDuration())
                    },
                    onCompleteParams: [2]
                })).to("#event .event1", { left: "-200%", alpha: 1, duration: 1, ease: An.easeInOut}, 0), 
                e.to("#event .event2", { left: "50%", alpha: 1, duration: 1, ease: An.easeInOut }, 0), 
                e.to("#event .indices", { alpha: 1, duration: .8 }, .4), 
                $("#event .indices .index:eq(1)").addClass("active").siblings().removeClass("active")
        }
        var e
    }

    function n_(e) {
        var t = new Xt({
            onComplete: i_,
            onUpdate: function() {
                appProgressBar_play(t.totalTime() / t.totalDuration())
            },
            onCompleteParams: [1]
        });
        t.to("#event .event1", { left: "50%", alpha: 1, duration: 1, ease: An.easeInOut}, 0), 
        t.to("#event .event2", { left: "200%", alpha: 1, duration: 1, ease: An.easeInOut }, 0), 
        t.to("#event .indices", { alpha: 1, duration: .8 }, .4), 
        $("#event .indices .index:eq(0)").addClass("active").siblings().removeClass("active")
    }

    function i_(e) {
        "active" == $("#app #event").attr("data-status") && e == Ky && (l_(!1), tr(), "active" == $("#app #event").attr("data-status") && Ky < 2 && (rr($(".page#event")), cr()))
    }

    function r_(e) {
        return 1 == Ky
    }

    function o_(e) {
        return 2 == Ky
    }
    window.addEventListener("SHOWCASE_GO_NEXT", (function() {
        "active" == $("#app #event").attr("data-status") && Ky < 2 && (l_(!0), er(), Ky++, t_())
    })), window.addEventListener("SHOWCASE_GO_PREV", (function() {
        "active" == $("#app #event").attr("data-status") && Ky > 1 && (l_(!0), er(), Ky--, t_())
    })), qi.registerPlugin(Fi), qi.registerPlugin(Xi);
    var a_ = $(".app .pages"),
        s_ = !0,
        u_ = 1;

    function l_(e) { s_ = e }

    function c_() {
        var e = $("#app .page#cover");
        qi.set(e, { y: 0 }), 
        e.attr("data-status", "active"), 
        requestAnimationFrame((function() {
            d_(e).reset(e), 
            h_(e)
        }))
    }


    function d_(e) {
        switch (e.attr("id")) {
            case "cover":
                return i;
            case "intro1":
                return o;
            case "intro2":
                return a;
            case "chapter1Cover":
            case "chapter2Cover":
                return s;
            case "chapter1_1":
            case "chapter1_2":
            case "chapter1_3":
            case "chapter1_4":
            case "chapter1_5":
                return u;
            case "chapter1_1_detail":
            case "chapter1_2_detail":
            case "chapter1_3_detail":
            case "chapter1_4_detail":
            case "chapter1_5_detail":
                return l;
            case "chapter2_1":
            case "chapter2_2":
            case "chapter2_3":
            case "chapter2_4":
            case "chapter2_5":
            case "chapter2_6":
            case "chapter2_7":
            case "chapter2_8":
                return u;
            case "chapter2_1_detail":
            case "chapter2_2_detail":
            case "chapter2_3_detail":
            case "chapter2_4_detail":
            case "chapter2_5_detail":
            case "chapter2_6_detail":
            case "chapter2_7_detail":
            case "chapter2_8_detail":
                return l;
            case "filmIntro":
            case "filmMaking":
                return r;
            case "event":
                return d;
            case "ending":
                return c
        }
    }

    function h_(e, t) {
        tr(), // Ki = false
        s_ = false, 
        g_(e), // 이미지 대입 함수 
        e.attr("data-status", "active"), 
        e.prev().attr("data-status", "sibling").prevAll().attr("data-status", "prev"), 
        e.next().attr("data-status", "sibling").nextAll().attr("data-status", "next"), 
        d_(e).start(e, t), 
        $(window).trigger("resize")
    }

    function f_() { // 뒤로
        if (!s_) {
            var e = $('#app .page[data-status="active"]');
            if (d_(e).first()) {
                var t = e.prev();
                t[0] && m_(t, "prev")
            }
        }
    }

    function p_() { // 앞으로 
        if (!s_) {
            var e = $('#app .page[data-status="active"]');
            if (d_(e).final()) {
                var t = e.next();
                t[0] && m_(t, "next")
            }
        }
    }

    function m_(e, t, n) {
        if (!s_) {
            var i = $('.page[data-status="active"]');
            i[0] != e[0] && (er(), 
            s_ = !0, 
            u_ = 1, 
            i[0] && d_(i).stop(i), 
            e.attr("data-status", "active"), 
            t || (t = i.index() < e.index() ? "next" : "prev"), 
            $("#app").attr("data-dir", t), 
            d_(e).stop(e, n), 
            d_(e).reset(e, n), 
            g_(e), // 이미지 대입 함수
            qi.globalTimeline.clear(), 
            setTimeout((function() {
                var r;
                if("next" == t ) r = e.attr("data-move-dir")
                else             r = i.attr("data-move-dir")  
                i.removeAttr("style"), 
                e.removeAttr("style"), 
                qi.set(i, { zIndex: 4 }), 
                qi.set(e, { zIndex: 5 });
                var o = new Xt({
                    onComplete: function() {
                        e.prev().attr("data-status", "sibling").prev().attr("data-status", "sibling-sibling").prevAll().attr("data-status", "prev"), 
                        e.next().attr("data-status", "sibling").next().attr("data-status", "sibling-sibling").nextAll().attr("data-status", "next"), 
                        s_ = !1, h_(e, n), 
                        qi.set(".page", { zIndex: 1 }), 
                        qi.set(e, { zIndex: 2 })
                    }); 
                "fade" == (r = r || "vertical") ? function(e, t, n, i) {
                    "next" == t ? (
                        qi.set(n, { zIndex: 4 }), 
                        qi.set(i, { zIndex: 5 }), 
                        e.fromTo(n, { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo(i, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, alpha: 1, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", i), { y: 0, x: "0%" }, { y: 0, x: 0, duration: .5 * u_,  ease: kn.easeOut }, 0)
                    ) : (
                        e.fromTo(n, { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo(i, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, alpha: 1, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", i), { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: "0%", duration: .5 * u_, ease: kn.easeOut }, 0)
                    )
                }(o, t, i, e) : "horizontal" == r ? function(e, t, n, i) {
                    var r = i.attr("data-move-type");
                    if ("next" == t) {
                        var o = "reverse" == r ? "100%" : "-100%",
                            a = "reverse" == r ? "-100%" : "100%",
                            s = "reverse" == r ? "-60%" : "60%",
                            u = "reverse" == r ? "-100%" : "100%";
                        e.fromTo(n, { y: 0, x: 0 }, { y: 0, x: o, duration: u_, ease: xn.easeInOut }, 0), 
                        e.fromTo(i, { y: 0, x: u }, { y: 0, x: 0, duration: u_, ease: xn.easeInOut }, 0), 
                        i.hasClass("product-detail") ? (
                            e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: a, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo($(".page-inner", i), { y: 0, x: "0%" }, { y: 0, x: 0, duration: u_, ease: xn.easeInOut}, 0)
                        ) : ( 
                            e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: s, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo($(".page-inner", i), { y: 0, x: "0%" }, { y: 0, x: 0, duration: u_, ease: xn.easeInOut }, 0)
                        )
                    } else {
                        var l = "reverse" == r ? "-100%" : "100%",
                            c = "reverse" == r ? "100%" : "-100%",
                            d = "reverse" == r ? "60%" : "-60%",
                            h = "reverse" == r ? "100%" : "-100%";
                        e.fromTo(i, { y: 0,x: h }, {y: 0, x: 0, duration: u_, ease: xn.easeInOut }, 0), 
                        e.fromTo(n, { y: 0, x: 0 }, { y: 0, x: l, duration: u_, ease: xn.easeInOut }, 0), 
                        i.hasClass("product-detail__") ? (
                            e.fromTo($(".page-inner", i), { y: 0, x: c }, { y: 0, x: 0, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: "0%", duration: u_, ease: xn.easeInOut }, 0)
                        ) : (
                            e.fromTo($(".page-inner", i), { y: 0, x: d }, { y: 0, x: 0, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: "0%", duration: u_, ease: xn.easeInOut }, 0)
                        )
                    }
                }(o, t, i, e) : "curtain" == r ? function(e, t, n, i) {
                    "next" == t ? (
                        qi.set(n, { zIndex: 5 }), 
                        qi.set(i, { zIndex: 4 }), 
                        e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: "100%", x: "0%", duration: u_, ease: An.easeInOut }, 0), 
                        e.fromTo($(".curtain > *", n), { scaleX: 0 }, { scaleX: 1, duration: u_, ease: An.easeInOut }, .75 * u_), 
                        e.fromTo(i, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, duration: u_, ease: kn.easeOut }, .75 * u_), 
                        e.fromTo(n, { y: 0, x: 0, alpha: 1 }, { y: 0, x: 0, alpha: 1, duration: u_, ease: kn.easeOut }, .75 * u_), 
                        e.fromTo($(".page-inner", i), { y: 0, x: 0 }, { y: 0, x: 0, duration: u_, ease: kn.easeOut }, .75 * u_), 
                        e.set(i, { alpha: 1  })
                    ) : (
                        qi.set(n, { zIndex: 4 }), 
                        qi.set(i, { zIndex: 5 }),
                        e.fromTo($(".curtain > *", n), { scaleX: 1 }, { scaleX: 0, duration: u_, ease: An.easeInOut }, 0), 
                        e.fromTo(n, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, duration: u_, ease: kn.easeOut }, 0), 
                        e.fromTo(i, { y: 0, x: 0, alpha: 1 }, { y: 0, x: 0, alpha: 1, duration: u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", i), { y: 0, x: 0 }, { y: 0, x: 0, duration: u_, ease: kn.easeOut }, 0), 
                        e.fromTo($(".page-inner", n), { y: 0, x: 0 }, { y: 0, x: "0%", duration: u_, ease: kn.easeOut }, 0), 
                        e.set(n, {  alpha: 1 })
                    )
                }(o, t, i, e) 
                : function(e, t, n, i) {
                    var r;
                    if("next" == t)  r = i.attr("data-move-type")
                    else             r = n.attr("data-move-type");

                    ("next" == t) ? 
                        (
                            e.fromTo(n, { x: 0, y: 0 }, { x: 0, y: "-100%", duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo(i, { x: 0, y: "100%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0), 
                            "linear" == r ? (e.set($(".page-inner", n), { x: 0, y: 0 }, 0), e.set($(".page-inner", i), { x: 0, y: 0 }, 0)
                        ) 
                    : 
                        ("collapse" == r) ? (
                                e.fromTo($(".page-inner", n), { x: 0, y: 0 }, { x: 0, y: "100%", duration: u_, ease: xn.easeInOut }, 0), 
                                e.fromTo($(".page-inner", i), { x: 0, y: "-100%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0)
                            ) 
                            : (
                                e.fromTo($(".page-inner", n), { x: 0, y: 0 }, { x: 0, y: "75%", duration: u_, ease: xn.easeInOut }, 0), 
                                e.fromTo($(".page-inner", i), { x: 0, y: "-75%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0)
                                )
                    ) 
                    : (
                            e.fromTo(i, { x: 0, y: "-100%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo(n, { x: 0, y: 0 }, { x: 0, y: "100%", duration: u_, ease: xn.easeInOut }, 0), 
                            "linear" == r ? (e.set($(".page-inner", n), { x: 0, y: 0 }, 0), e.set($(".page-inner", i), { x: 0, y: 0 }, 0)
                        ) 
                        : ("collapse" == r) ? (
                            e.fromTo($(".page-inner", i), { x: 0, y: "100%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0), 
                            e.fromTo($(".page-inner", n), { x: 0, y: 0 }, { x: 0, y: "-100%", duration: u_, ease: xn.easeInOut}, 0)
                            ) : (
                                e.fromTo($(".page-inner", i), { x: 0, y: "75%" }, { x: 0, y: 0, duration: u_, ease: xn.easeInOut }, 0), 
                                e.fromTo($(".page-inner", n), { x: 0, y: 0 }, { x: 0, y: "-75%", duration: u_, ease: xn.easeInOut}, 0)
                                )
                        )
                }(o, t, i, e), 
                appProgressBar_reset();
            }), 60))
        }
    }

    function g_(e) { // 이미지 대입 함수
        $(".back", e).each((function() {
            var e = $(this).attr("data-bg");
            e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
        })), 
        $(".back", e.prev()).each((function() {
            var e = $(this).attr("data-bg");
            e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
        })), 
        $(".back", e.next()).each((function() {
            var e = $(this).attr("data-bg");
            e && "" != e && $(this).css("background-image", "url(".concat(e, ")"))
        })), 
        $("img", e).each((function() {
            var e = $(this).attr("data-src");
            e && "" != e && $(this).attr("src", e)
        })), 
        $("img", e.prev()).each((function() {
            var e = $(this).attr("data-src");
            e && "" != e && $(this).attr("src", e)
        })), 
        $("img", e.next()).each((function() {
            var e = $(this).attr("data-src");
            e && "" != e && $(this).attr("src", e)
        }))
    }

    function v_(e) {
        var t = e.detail,
            n = $(".page" + t);
        n[0] && requestAnimationFrame((function() {
            m_(n, "next", !0)
        }))
    }
    hr($(".page#cover"));
    var y_ = null;

    function __(e) {
        clearTimeout(y_), 
        y_ = null, 
        $(".msg-next").removeClass("active"), 
        y_ = setTimeout((function() {
            $(".msg-next").addClass("active")
        }), 100)
    }
    var b_ = !1;
    $(window).on("click touchstart", (function(e) {
        b_ || ($(".video video").each((function(e, t) {
            t.play(), 
            t.pause()
        })),
         b_ = !0)
    }));
    $("#appLoading");
    var w_ = "#debug" == window.location.hash ? .1 : 5,
        T_ = "#debug" == window.location.hash ? 10 : 400,
        k_ = "#debug" == window.location.hash ? 10 : 2500;

    function x_() {
        setTimeout((function() {
            $("#appLoading .coach-guide").addClass("active"), setTimeout((function() {
                $(window).trigger("resize"), 
                qi.to("#appLoading .guide", { autoAlpha: 0, duration: .5 }), 
                qi.to("#appLoading .loading-area", { autoAlpha: 1, duration: .5, onComplete: A_ })
            }), k_), 
            $(window).trigger("resize") }), T_), 
            qi.set("#appLoading .logo", { alpha: 1 })
    }

    function A_() {
        qi.to("#appLoading .logo", { alpha: 1, duration: w_, onComplete: S_ });
        var e = qi.timeline({ repeat: -1 });
        e.to("#appLoading .logo svg", { rotateX: -360, duration: 1.5, ease: xn.easeInOut }, 0), 
        e.to("#appLoading .logo svg", { rotateY: -360, duration: 1.5, ease: xn.easeInOut }, .9)
    }

    function S_() {
        $("#app").addClass("loading-ended"), 
        window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE")), 
        qi.to("#appLoading", { autoAlpha: 0,duration: .5 })
    }
    window.addEventListener("load", (function() {
            $("#app").addClass("loaded")
        })), 
    window.addEventListener("DOMContentLoaded", (function() {
            x_(), 
            $(window).trigger("resize")
        })), 
        er(),
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
            document.querySelector("#app").addEventListener("mousewheel", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status") || Ji) return !1;
                e.preventDefault();
                var t = e.deltaY, n = e.deltaX;
                return Math.abs(n) > 4 && n > 0 || Math.abs(t) > 4 && t > 0 ? (Ji = !0, setTimeout((function() {
                    Ji = !1
                }), 500), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))) : (Math.abs(n) > 4 && n < 0 || Math.abs(t) > 4 && t < 0) && (Ji = !0, setTimeout((function() {
                    Ji = !1
                }), 500), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))), !1
            })), 
            Qi()(document.querySelector("#app")), 
            document.querySelector("#app").addEventListener("swipe", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                var t = e.detail.directions;
                t.left || t.top ? window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")) : (t.right || t.bottom) && window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
            })), 
            document.getElementById("btnLayerNext").addEventListener("click", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
            })), 
            document.getElementById("btnLayerPrev").addEventListener("click", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
            })), 
            $(window).on("resize", (function() {
                requestAnimationFrame(e), 
                setTimeout((function() { e() }), 100)
            })), 
            $(window).on("orientationchange", (function() {
                requestAnimationFrame(e);
                var t = window.orientation;
                90 == t || -90 == t ? requestAnimationFrame((function() {
                    $(".only-portrait").addClass("active")
                })) : requestAnimationFrame((function() {
                    $(".only-portrait").removeClass("active")
                }))
            })), 
            $(window).on("keydown", (function(e) {
                if (Ki) return !1;
                37 != e.keyCode && 38 != e.keyCode || (Ki = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))), 39 != e.keyCode && 40 != e.keyCode || (Ki = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")))
            })), requestAnimationFrame(e)
        }(), 
        qi.set("#app .page", { y: "100%" }), 
        $(".page", $(".app .pages") ).attr("data-status", "next"), 
        window.addEventListener("SHOWCASE_LOADING_COMPLETE", c_), 
        window.addEventListener("SHOWCASE_GO_PREV", f_), 
        window.addEventListener("SHOWCASE_GO_NEXT", p_), 
        window.addEventListener("SHOWCASE_GO_PAGE", v_), 
        window.addEventListener("SHOW_MSG_NEXT", __), 
        $(".btn-audio").on("click", (function(e) { $(this).hasClass("is-active") ? (Yv.mute(!1), !1) : (Yv.mute(!0), !0) })), 
        $(".btn-visual-autoplay").on("click", (function(e) {
            $(this).hasClass("is-active") ? (lr = !0, $("#app").attr("data-status", "autoplaying"), 
            $("#btnLayerNext, #btnLayerPrev").addClass("disabled"), 
            window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))) : (lr = !1, $("#app").attr("data-status", ""), 
            $("#btnLayerNext, #btnLayerPrev").removeClass("disabled"), 
            sr && (clearTimeout(sr), sr = null))
        }))
}]);