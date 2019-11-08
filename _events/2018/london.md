---
# PubConf Events are defined by this markdown frontmatter. This template
# contains all the supported fields and descriptions.
#
# For how these files are consumed, see the layout at
# `/_layouts/event-2019.html`

# Full title of the event. Will be used in meta tags. Usually "PubConf City Year"
title: PubConf London 2018

# ISO8601 Date for the starting time of the event. Make sure the offset is in the
# event location timezone.
date: 2018-01-19T19:30:00Z

# ISO8601 Date for the ending time of the event.
end_date: 2018-01-19T23:30:00Z

# ISO8601 Date (without offset) for the local time of the event. This is used
# for display because dates are hard.
local_time: 2018-01-19T19:30

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
  share: /assets/images/events/london/event-share.jpg
  # Vector event logo
  logo: /assets/images/events/london/event-logo.svg
  # Background Image used in the top-of-page hero.
  background: /assets/images/events/london/event-hero-bg.jpg

# Most events have a conference partner. This is to highlight them.
partner:
  name: NDC London
  url: https://ndc-london.com/
  # Specific dimensions required. This is also in the image template.
  logo: /assets/images/events/london/partner-logo.png

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
  adam_ralph:
    talk: "git commit -m 'add spaces'"
  amie_dansby:
    talk: "You're Never Weird on the Internet."
  chris_odell:
    talk: "Logging #Fails"
  dylan_beattie:
    talk: "Developer Musical Medley"
  heather_downing:
    talk: "Talk Dirty to Me"
    place: "finalist"
  ian_cooper:
    talk: "The Duck Tape Programmer"
    place: "finalist"
  jessica_white:
    talk: "Dicking About With Data"
  kesha_williams:
    talk: "I Know My Code Sucks"
  mark_rendle:
    talk: "Dante's InVerNo: .NET Version Numbers Explained"
    place: "champion"
  rafal_legiedz:
    talk: "VR Will Save Us... Or Not"
  troy_hunt:
    talk: "Make Cyber Great Again"

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
