
$(document).ready
    (function () {
        var h = function (d) {
            var g = ["twitter", "facebook", "youtube"], f = parseInt($(".mbr-social-feed").attr("data-posts")) || 3, e = {}; (function () { return g.map(function (c) { return $(".mbr-social-feed").attr("data-" + c).replace(" ", "").split(" ").map(function (a) { if ("youtube" === c && 0 < a.length) return a; if ("twitter" === c && 0 < a.length) return "@" === a[0] ? a : "@" + a; if ("facebook" === c && 0 < a.length) return a }) }) })().map(function (c, a) {
                if ("@" !== c[0] && c[0]) {
                    var b = {}; switch (g[a]) {
                        case "twitter": b.accounts = c; b.consumer_key =
                            "zGH9N8l92xnx14TJF41A2zjqK";
                            b.consumer_secret = "jmx0ZDJcNO2zK3FnCA47VOGbhr9tPD6JwfGI39vx5W4ymA3sD4"; b.limit = f; break; case "youtube": b.accounts = c; b.limit = f; b.access_token = "AIzaSyDXQV0H1ImqLxlviK_ScjOcEv5EMalzteQ"; break; case "facebook": b.accounts = c, b.limit = f, b.access_token = d ? d : $(document).find("section[data-facebooktoken]").attr("data-facebooktoken")
                    }e[g[a]] = b
                }
            });
            $(".social-feed-container").html(""); e.callback = function () { $(".mbr-social-feed").removeClass("loading") }; e.template_html =
                "                            <div class='social-feed-element {{? !it.moderation_passed}}hidden{{?}}' dt-create='{{=it.dt_create}}' social-feed-id = '{{=it.id}}'>                              
                < div class='content' > <a class='pull-left' href='{{=it.author_link}}' target='_blank'>
                    <img class='media-object' src='{{=it.author_picture}}' alt='author not available'>                                 
                        </a>

                    <div class='media-body'>
                        <p>
                        <i class='fa fa-{{=it.social_network}}'></i>
                        <span class='author-title'>{{= it.author_name}}</span>
                        <span class='muted pull-right'> {{= it.time_ago}}</span>
                        </p>
                        <div class='text-wrapper'><p class='social-feed-text'>{{= it.text}}
                            <a href='{{=it.link}}' target='_blank' class='read-button'>read more</a></p>
                        </div>
                    </div>                                
                    </div>
            { {=it.attachment } }                          
            </div > ";

            e.show_media = !0; e.length = 200; $(".social-feed-container").socialfeed(e)
        };
        $(document).on("add.cards", function (d) {
            $(d.target).hasClass("mbr-social-feed") && (h(), setTimeout(function () { $(d.target).removeClass("loading") }, 5E3),
                $(d.target).on("updateSocialFeed", function (d, f) { h(f) }))
        })
    });
