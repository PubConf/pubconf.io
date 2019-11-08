---
# PubConf Events are defined by this markdown frontmatter. This template
# contains all the supported fields and descriptions.
#
# For how these files are consumed, see the layout at
# `/_layouts/event-2019.html`

# Full title of the event. Will be used in meta tags. Usually "PubConf City Year"
title: PubConf London 2017

# ISO8601 Date for the starting time of the event. Make sure the offset is in the
# event location timezone.
date: 2017-01-20T19:30:00Z

# ISO8601 Date for the ending time of the event.
end_date: 2017-01-20T23:30:00Z

# ISO8601 Date (without offset) for the local time of the event. This is used
# for display because dates are hard.
local_time: 2017-01-20T19:30

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
  name: The Fine Line
  address: 29-30 Fishermen’s Walk - 10 Cabot Square, London E14 4DH, United Kingdom
#   url: http://theflourfactory.com/

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
  ben_cull:
    talk: "Continuous Delivery of Beer to my Face"
  damian_brady:
    talk: "How to Code Like an Arsehole"
  dan_north:
    talk: "Why Every Single Element of SOLID is Wrong"
  dylan_beattie:
    talk: "Why Is Talking About Software So Weird?"
  evelina_gabasova:
    talk: "R Wat?!… and a Parrot"
  jennifer_wong:
    talk: "Mobile Safari, Whyyyy?!!?"
  jonathan_mills:
    talk: "JavaScript, The Weird Parts?"
  kasia_mrowca:
    talk: "GDD (Gantt-Chart Driven Development)"
  lars_klint:
    talk: "Why We Can’t Have Nice Things: A Love Story"
  liam_westley:
    talk: "The Secret Life of Programmers"
  mark_rendle:
    talk: "My Combined Language-Framework-Platform-Methodology: 'SilverBullet'"
  niall_merrigan:
    talk: "How to Sound Smart at Conferences"
  pete_smith:
    talk: "What Having a Software Project Has Taught Me About Babies"
  sebastien_lambla:
    talk: "Bugs, Is It Rocket Science?"
  tomas_petricek:
    talk: "16th Century Programming Myths"
  troy_hunt:
    talk: "Let's Face It--Security is Pointless"

# Supporters array for the event.
supporters:
    # TrackJS is a required supporter.
  - name: TrackJS
    # Levels are "topshelf" and "rail" indicating if their are first-tier or
    # second-tier supporters.
    level: topshelf
    url: https://trackjs.com/
    image: /assets/images/supporters/tjs.png
  - name: Pluralsight
    level: topshelf
    url: https://www.pluralsight.com/
    image: /assets/images/supporters/pluralsight.png
  - name: Titania
    level: topshelf
    url: https://www.titania.com/
    image: /assets/images/supporters/titania.png
  - name: Equal Experts
    level: topshelf
    url: https://www.equalexperts.com/
    image: /assets/images/supporters/equalexperts.png
  - name: Katacoda
    level: topshelf
    url: https://www.katacoda.com/
    image: /assets/images/supporters/katacoda.png
---

{% comment %}
Any markdown included here will be appended to the end of the "DETAILS" section.
{% endcomment %}
