# pubconf.io
Event website for PubConf Conferences

## Dependencies

1. Install [Ruby](http://rubyinstaller.org/). Include on `path`.
2. Install [Ruby Dev Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
3. `gem install jekyll`
4. `gem install bundle`.
5. `bundle install`

## To Release

- `bundle`
- `export JEKYLL_ENV=production && jekyll clean && jekyll build`
- `scp -r _site/* <user>@<ip_address>:/var/www/pubconf.io/html`
