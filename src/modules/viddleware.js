export default function (e) {
    e.beforeEach(function (o, r, n) {
        if (!o.meta.hasOwnProperty('middleware')) return n();
        var e = o.meta.middleare, i = 'function' == typeof e ? [e, n] : e.concat([n]), f = function (e) {
            if (i.length) {
                if (void 0 !== e) return n(e);
                var t = i[0];
                if (i.shift(), t === n) return n();
                t(o, r, f);
            }
        };
        f();
    });

    return e;
};