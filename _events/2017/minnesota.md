---
# PubConf Events are defined by this markdown frontmatter. This template
# contains all the supported fields and descriptions.
#
# For how these files are consumed, see the layout at
# `/_layouts/event-2019.html`

# Full title of the event. Will be used in meta tags. Usually "PubConf City Year"
title: PubConf Minnesota 2017

# ISO8601 Date for the starting time of the event. Make sure the offset is in the
# event location timezone.
date: 2017-04-21T19:00:00-5:00

# ISO8601 Date for the ending time of the event.
end_date: 2017-04-21T23:00:00-5:00

# ISO8601 Date (without offset) for the local time of the event. This is used
# for display because dates are hard.
local_time: 2017-04-21T19:00

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
  share: /assets/images/events/minnesota/event-share.jpg
  # Vector event logo
  logo: /assets/images/events/minnesota/event-logo.svg
  # Background Image used in the top-of-page hero.
  background: /assets/images/events/minnesota/event-hero-bg.jpg

# Most events have a conference partner. This is to highlight them.
# partner:
#   name: TechoramaNL
#   url: https://techorama.nl/
#   # Specific dimensions required. This is also in the image template.
#   logo: /assets/images/events/amsterdam/partner-logo.png

# The venue where the event will be held. Comment it out until a contract is in
# place. All fields required.
venue:
  name: Nomad World Pub
  address: 501 Cedar Ave S Minneapolis, MN 55454
  # url: http://theflourfactory.com/

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
  andrew_murray:
    talk: "I Told You There Was a 20% Chance of Rain!"
  angeliki_beyko:
    talk: "Refactor your Fitness Routine"
  april_king:
    talk: "20 Technology Acronyms that Keep you Safe"
  lemon:
    talk: "I Got Popular (Oops)"
  dan_lew:
    talk: "Hostile Design Patterns"
  donnie_berkholz:
    talk: "Assholes Are Killing Your Project"
  eric_brandes:
    talk: "One Weird Trick to Avoid Losing Money in the Cloud"
  jake_good:
    talk: "You're Wrong About Being Right"
  marc_grabanski:
    talk: "Web Development is Easy"

# Supporters array for the event.
supporters:
    # TrackJS is a required supporter.
  - name: TrackJS
    # Levels are "topshelf" and "rail" indicating if their are first-tier or
    # second-tier supporters.
    level: topshelf
    url: https://trackjs.com/
    image: /assets/images/supporters/tjs.png
  - name: OrderCloud
    level: topshelf
    url: https://ordercloud.io/
    image: /assets/images/supporters/ordercloud.png
  - name: Leadpages
    level: topshelf
    url: https://www.leadpages.net/
    image: /assets/images/supporters/leadpages.png
  - name: Super Go Faster
    level: topshelf
    url: http://supergofaster.com/
    image: /assets/images/supporters/supergofaster.png
---

{% comment %}
Any markdown included here will be appended to the end of the "DETAILS" section.
{% endcomment %}
