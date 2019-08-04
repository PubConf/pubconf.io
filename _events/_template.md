---
# PubConf Events are defined by this markdown frontmatter. This template
# contains all the supported fields and descriptions.
#
# For how these files are consumed, see the layout at
# `/_layouts/event-2019.html`

# Full title of the event. Will be used in meta tags. Usually "PubConf City Year"
title: PubConf Perth 2019

# ISO8601 Date for the starting time of the event. Make sure the offset is in the
# event location timezone.
date: 2019-08-03T19:30:00+8:00

# ISO8601 Date for the ending time of the event.
end_date: 2019-08-03T23:30:00+8:00

# ISO8601 Date (without offset) for the local time of the event. This is used
# for display because dates are hard.
local_time: 2019-08-03T19:30

# Tickets object. Comment this out until tickets are ready to be sold.
tickets:
  # External URL to purchase tickets. Eventbrite, etc.
  url: https://ti.to/dddperth/pubconf-perth/
  # Number price in local currency
  price: 65
  # Currency code. Used in meta.
  currency: AUD

# Basic images used for every event. I typically use the same ones for a location
# every year. There are templates for creating these in
# `/assets/images/events/_template`
images:
  # Image used in meta. Will be shown in Twitter/Facebook when links are shared.
  share: /assets/images/events/amsterdam/event-share.jpg
  # Vector event logo
  logo: /assets/images/events/amsterdam/event-logo.svg
  # Background Image used in the top-of-page hero.
  background: /assets/images/events/amsterdam/event-hero-bg.jpg

# Most events have a conference partner. This is to highlight them.
partner:
  name: TechoramaNL
  url: https://techorama.nl/
  # Specific dimensions required. This is also in the image template.
  logo: /assets/images/events/amsterdam/partner-logo.png

# The venue where the event will be held. Comment it out until a contract is in
# place. All fields required.
venue:
  name: The Flour Factory
  address: 16 Queen St, Perth WA 6000, Australia
  url: http://theflourfactory.com/

# Speakers. Speaker details are kept separate from events so that they can be
# re-used between multiple events. Reference a speaker by slug (lowercase,
# firstname_lastname). Referenced speakers must have a speaker file to be
# rendered.

# The host of the show
host: todd_gardner

# Speaker object hash. Use the speaker slugs as the keys, alphabetically listed.
# Within each speaker are the event-specific details.
speakers:
  todd_gardner:
    talk: "My awesome pubconf talk"
    # Optional. Fill in after the event to record how the speaker did.
    # Values: "", "finalist", "champion"
    place: "champion"
  dylan_beattie:
    talk: "My awesome pubconf talk"

# Sponsors array for the event.
sponsors:
    # TrackJS is a required sponsor.
  - name: TrackJS
    # Levels are "topshelf" and "rail" indicating if their are first-tier or
    # second-tier sponsors.
    level: topshelf
    url: https://trackjs.com/
    image: /assets/images/sponsors/tjs.png
---

{% comment %}
Any markdown included here will be appended to the end of the "DETAILS" section.
{% endcomment %}
