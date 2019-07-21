# pubconf.io
Event website for PubConf Conferences

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
