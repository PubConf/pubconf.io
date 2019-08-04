# pubconf.io
Website for PubConf Events

## Developer Setup

This is a Jekyll static site hosted on GitHub Pages, fronted by Cloudflare. The distributed files are hosted on the `master` branch, which are built from the source materials on the `sources` branch. The build is handled by TravisCI.

### Dependencies

1. Install [Ruby](http://rubyinstaller.org/). Include on `path`.
2. Install [Ruby Dev Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
3. `gem install jekyll`
4. `gem install bundle`.
5. `bundle install`

### Structure

Content is based on YAML data files in the `_data` directory.

## Creating and Managing Your Event

If you are hosting a PubConf event, and have already chatted with the PubConf team, you are welcome to submit a PR with changes and details for your event. If you have not chatted with the PubConf team yet, start there. Email `hello@pubconf.io`

Each PubConf event is defined as a file in the `_events` collection. There is a template there defining the structure.

PubConf speakers are defined as a file in the `_speakers` collection. This allows speakers to maintain a profile between events and reduce data collection work. Events and Speakers cross-reference by the `speaker.slug`.

In general, you shouldn't need to make changes to templates or CSS files.

