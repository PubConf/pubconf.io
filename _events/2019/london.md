---
# PubConf Events are defined by this markdown frontmatter. This template
# contains all the supported fields and descriptions.
#
# For how these files are consumed, see the layout at
# `/_layouts/event-2019.html`

# Full title of the event. Will be used in meta tags. Usually "PubConf City Year"
title: PubConf London 2019

# ISO8601 Date for the starting time of the event. Make sure the offset is in the
# event location timezone.
date: 2019-02-01T19:30:00Z

# ISO8601 Date for the ending time of the event.
end_date: 2019-02-01T23:30:00Z

# ISO8601 Date (without offset) for the local time of the event. This is used
# for display because dates are hard.
local_time: 2019-02-01T19:30

# Tickets object. Comment this out until tickets are ready to be sold.
# tickets:
#   # External URL to purchase tickets. Eventbrite, etc.
#   url: https://ti.to/dddperth/pubconf-perth/
#   # Number price in local currency
#   price: 65
#   # Currency code. Used in meta.
#   currency: AUD

# Basic images used for every event. I typically use the same ones for a location
# every year. There are templates for creating these in
# `/assets/images/events/_template`
images:
  # Image used in meta. Will be shown in Twitter/Facebook when links are shared.
  share: /assets/images/events/london2019/event-share.jpg
  # Vector event logo
  logo: /assets/images/events/london2019/event-logo.svg
  # Background Image used in the top-of-page hero.
  background: /assets/images/events/london2019/event-hero-bg.jpg

# Most events have a conference partner. This is to highlight them.
partner:
  name: NDC London
  url: https://ndc-london.com/
  # Specific dimensions required. This is also in the image template.
  logo: /assets/images/events/london2019/partner-logo.png

# The venue where the event will be held. Comment it out until a contract is in
# place. All fields required.
venue:
  name: The Comedy Pub
  address: 7 Oxendon St, London SW1Y 4EE, UK
  url: https://www.craft-pubs.co.uk/comedy

# Speakers. Speaker details are kept separate from events so that they can be
# re-used between multiple events. Reference a speaker by slug (lowercase,
# firstname_lastname). Referenced speakers must have a speaker file to be
# rendered.

# The host of the show
host: todd_gardner

# How many finalists can be voted for using the voting page
# https://pubconf.io/vote/?event=<eventName>&hash=<secret>
finalist_count: 3

# Speaker object hash. Use the speaker slugs as the keys, alphabetically listed.
# Within each speaker are the event-specific details.
speakers:
  amy_kapernick:
    talk: "The Need for Pagespeed"
  dan_north:
    talk: "Say 'TDD is about testing' one more time!"
  dylan_beattie:
    talk: "Raiders of the Lost Code"
  ian_cooper:
    talk: "Production is a deep ocean of secrets!"
  jennifer_wadella:
    talk: "All the basic front-end shit .NET devs are too dumb to figure out"
    place: "finalist"
  jon_skeet:
    talk: "Life Moves Pretty Fast: Microservices with Kubernetes"
  jonathan_mills:
    talk: "The Dude's Guide to Conferencing"
  lewis_denhamparry:
    talk: "Shaun of the Dev"
    place: "finalist"
  liam_westley:
    talk: "The Visual Basix: Taking the Red Pill"
  mark_rendle:
    talk: "Full Metal Hackit"
    place: "champion"

# Supporters array for the event.
supporters:
    # TrackJS is a required supporter.
  - name: TrackJS
    # Levels are "topshelf" and "rail" indicating if their are first-tier or
    # second-tier supporters.
    level: topshelf
    url: https://trackjs.com/
    image: /assets/images/supporters/tjs.png
---

{% comment %}
Any markdown included here will be appended to the end of the "DETAILS" section.
{% endcomment %}
