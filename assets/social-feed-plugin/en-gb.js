// moment.js locale configuration
// locale : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim
(function (a) { "function" === typeof define && define.amd ? define(["moment"], a) : "object" === typeof exports ? module.exports = a(require("../moment")) : a(window.moment) })
    (function (a) {
        return a.defineLocale("en-gb", {
            months: "January February March April May June July August September October November December".split(" "),
            monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
            longDateFormat: {
                LT: "HH:mm", L: "DD/MM/YYYY",
                LL: "D MMMM YYYY", LLL: "D MMMM YYYY LT",
                LLLL: "dddd, D MMMM YYYY LT"
            },

            calendar: {
                sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT", sameElse: "L"
            },

            relativeTime: {
                future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute",
                mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years"
            },

ordinal:function(a){var b=a%10;return a+(1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th")},week:{dow:1,doy:4}})});
