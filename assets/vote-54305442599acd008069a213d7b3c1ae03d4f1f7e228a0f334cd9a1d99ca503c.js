var API_BASE = "https://api.pubconf.io/";
var MAX_VOTE_COUNT = 3;
var VOTED_COOKIE = "PUBCONF_VOTED";
var VOTE_RESULTS_LOOKBACK_MS = 1000 * 60 * 30; // 30 minutes

var util = {
    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length != 2) { return; }
        return parts.pop().split(";").shift();
    },
    getSearchParam: function(name) {
        var value = location.search.replace('?', '&');
        var parts = value.split("&" + name + "=");
        if (parts.length != 2) { return; }
        return parts.pop().split("&").shift();
    },
    handleFault: function(err) {
        window.TrackJS && TrackJS.track(err);
        document.body.innerHTML = "<h1>Oops</h1>" +
                                  "<div>Something went wrong</div>" +
                                  "<div>" + ((err || {}).message || err) + "</div>" +
                                  "<div>" + (err || {}).stack + "</div>";
    }
};

(function (ready) {
    if (document.readyState === "complete") { ready(); }
    else { document.addEventListener("DOMContentLoaded", ready); }
})(function () { /* the document is now ready. */
    console.info("vote.js starting");

    var eventHash = util.getSearchParam("eventHash");
    if (!eventHash) { return util.handleFault("Invalid EventHash"); }

    console.info("setting up ballot for event", eventHash);

    (function addBallotConstraints() {
        var ballotForm = document.querySelector("#js-ballot");
        if (!ballotForm) { return; }

        var speakerInputs = [].slice.call(ballotForm.querySelectorAll("input[name=speaker]"), 0);
        var submitInputs = [].slice.call(ballotForm.querySelectorAll("button[type=submit]"), 0);
        function updateFormConstraints() {
            var checkedSpeakerCount = speakerInputs.filter(function(speakerInput) {
                return speakerInput.checked;
            }).length;

            speakerInputs
                .filter(function(speakerInput) { return !speakerInput.checked })
                .forEach(function(speakerInput) {
                    if (checkedSpeakerCount >= MAX_VOTE_COUNT) {
                        speakerInput.classList.add("disabled");
                        speakerInput.setAttribute("disabled", "disabled");
                    }
                    else {
                        speakerInput.classList.remove("disabled");
                        speakerInput.removeAttribute("disabled");
                    }
                });

            submitInputs
                .forEach(function(submitInput) {
                    if (checkedSpeakerCount == MAX_VOTE_COUNT) {
                        submitInput.classList.remove("disabled");
                        submitInput.removeAttribute("disabled");
                        submitInput.innerHTML = "Submit Vote"
                    }
                    else {
                        submitInput.classList.add("disabled");
                        submitInput.setAttribute("disabled", "disabled");
                        submitInput.innerHTML = "Pick Your Favorite <strong>" + (MAX_VOTE_COUNT-checkedSpeakerCount) + "</strong> Talks"
                    }
                });
        }
        ballotForm.addEventListener("change", function(evt) {
            if (evt.target.name !== "speaker") { return; }
            updateFormConstraints();
        });
        updateFormConstraints();
    })();

    (function addBallotIntercept() {
        var ballotForm = document.querySelector("#js-ballot");
        if (!ballotForm) { return; }

        var votedCookie = util.getCookie(VOTED_COOKIE);
        if (votedCookie) {
            ballotForm.innerHTML = "<h2>You've Already Voted!</h2>" +
                                   "<div>You can try again on " + votedCookie + "</div>";
            return;
        }

        ballotForm.addEventListener("submit", function(evt) {
            evt.preventDefault();
            var selectedSpeakers = [].map.call(document.querySelectorAll("input[name=speaker]:checked"), function(input) {
                return input.value;
            });

            if (selectedSpeakers.length > MAX_VOTE_COUNT) {
                return fault("Too many speakers selected");
            }

            fetch(API_BASE + eventHash + "/", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "clientId": "clientId",
                    "speakers": selectedSpeakers
                })
            })
            .then(function() {
                console.log("recorded vote");
                var expireTime = new Date(new Date().getTime() + VOTE_RESULTS_LOOKBACK_MS).toUTCString();
                document.cookie = VOTED_COOKIE + "=" + expireTime + "; expires=" + expireTime + ";";
                ballotForm.submit();
            })
            .catch(util.handleFault);
        });
    })();

    (function showResults() {
        var resultsList = document.querySelector("#js-results");
        if (!resultsList) { return; }

        var voteTally = {};
        fetch(API_BASE + eventHash + "/_query", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                find: { "_timestamp": { "$gt": new Date().getTime() - VOTE_RESULTS_LOOKBACK_MS } }
            })
        })
        .then(function(resp) {
            resp.json().then(function(ballots) {
                ballots.forEach(function(ballot) {
                    if (ballot.speakers.length > MAX_VOTE_COUNT) {
                        console.error("found vote for too many speakers", votes);
                        return; // discard bad data.
                    }
                    ballot.speakers.forEach(function(speaker) {
                        voteTally[speaker] = voteTally[speaker] || 0;
                        voteTally[speaker]++;
                    });
                });

                var sortedVoteTally = Object.keys(voteTally)
                    .reduce(function(result, speaker) {
                        result.push({ speaker: speaker, votes: voteTally[speaker] });
                        return result;
                    }, [])
                    .sort(function(a, b) {
                        return b.votes - a.votes;
                    });

                sortedVoteTally.forEach(function(tally) {
                    var resultEl = document.createElement("li");
                    resultEl.innerHTML = "<div class='tally-bar'></div>" +
                                         "<div class='tally-title'><span>" + tally.speaker + "</span><span>" + tally.votes + "</span></div>";
                    resultsList.appendChild(resultEl);
                });
            });
        })
        .catch(util.handleFault);
    })();

});
