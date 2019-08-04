/**
 * main
 * All the JavaScripts, organized by purpose.
 */


(function main() {

  // No-op for old browsers
  if (!document.querySelector ||
      !document.querySelectorAll ||
      !'filter' in Array.prototype ||
      !'map' in Array.prototype ||
      !'classList' in Element.prototype) {
        return;
  }

  (function debuggingWizardTabs(){

    var allDebuggingTabs = [].slice.call(document.querySelectorAll(".debugging-hero .debugging-tabs .tab"));
    var allDebuggingContent = [].slice.call(document.querySelectorAll(".debugging-hero .tab-contents .tab-content"));

    var selectedTab = allDebuggingTabs.filter(function(x) { return x.classList.contains("selected"); })[0];
    var selectedContent = allDebuggingContent.filter(function(x) { return x.classList.contains("selected"); })[0];

    window.selectDebuggingTab = function (tabName) {
      var tabToSelect = allDebuggingTabs.filter(function(x) { return x.classList.contains(tabName); })[0];
      var contentToSelect = allDebuggingContent.filter(function(x) { return x.classList.contains(tabName); })[0];
      tabToSelect.classList.add('selected');
      contentToSelect.classList.add('selected');

      selectedTab.classList.remove('selected');
      selectedContent.classList.remove('selected');

      selectedTab = tabToSelect;
      selectedContent = contentToSelect;

      // stop any videos playing
      var playingVideos = Array.prototype.slice.call(document.querySelectorAll('.vimeo-loader.vimeo-loaded'));
      playingVideos.forEach(function(playingVideo) {
        playingVideo.removeChild(playingVideo.querySelector('iframe'));
        playingVideo.classList.remove('vimeo-loaded');
      });
    }
  })();

  /**
    * vimeoLoader
    * Load a vimeo embed link once a vimeo-loader link has been clicked. This improves performance
    * as we do not load vimeo unless the user wants to watch a video.
    */
  (function vimeoLoader() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.vimeo-loader'));
    links.forEach(function(link) {
      link.addEventListener('click', function(evt) {
        evt.preventDefault();
        var target = evt.currentTarget;
        if (target.classList.contains('vimeo-loaded')) {
          target.removeChild(target.querySelector('iframe'));
        }
        else {
          var vimeoEl = document.createElement('iframe');
          var vimeoId = target.getAttribute('data-vimeo-id');
          vimeoEl.setAttribute('src', 'https://player.vimeo.com/video/' + vimeoId + '?autoplay=1');
          vimeoEl.setAttribute('frameborder', '0');
          vimeoEl.setAttribute('webkitallowfullscreen', '1');
          vimeoEl.setAttribute('mozallowfullscreen', '1');
          vimeoEl.setAttribute('allowfullscreen', '1');
          target.appendChild(vimeoEl);
        }
        target.classList.toggle('vimeo-loaded');
        gtag('event', 'video_start', {
          'event_category': 'discovery',
          'event_label': vimeoId
        });
      });
    });
  })();

  /**
    * lazyLoadImages
    * @see https://davidwalsh.name/lazyload-image-fade
    * Reduce the perceived load time by deferring some images to load later. Later being when
    * this script loads at the end of everything else.
    */
  (function lazyLoadImages() {
    var lazyLoadEls = Array.prototype.slice.call(document.querySelectorAll('[data-lazy-src]'));
    lazyLoadEls.forEach(function(el) {
      el.setAttribute('src', el.getAttribute('data-lazy-src'));
      el.onload = function() {
        el.removeAttribute('data-lazy-src');
      };
    });
  })();

  (function pageViewCounter() {
    var counterEl = document.querySelector(".js-counter");
    if (!counterEl) return;

    var startCount = parseInt(counterEl.getAttribute("data-start-count"), 10),
      startDate = new Date(counterEl.getAttribute("data-start-date")),
      countPerSecond = parseInt(counterEl.getAttribute("data-count-per-second"), 10);

    setInterval(function () {
      var msSinceStart = (new Date() - startDate);
      var nowCount = startCount + Math.floor(msSinceStart/1000 * countPerSecond);
      counterEl.innerHTML = nowCount.toLocaleString();
    }, 200);
  })();

  (function pricingMonthlyAnnualToggle() {

    var sliderContainer = document.querySelector(".js-pricing-monthly-annual");
    if (!sliderContainer) return;

    var slider = sliderContainer.querySelector(".js-pricing-slider");
    var priceBlocks = document.querySelector(".js-price-blocks");


    slider.addEventListener("click", function (evt){
      evt.preventDefault();
      var isCurrentlyMonthly = evt.currentTarget.classList.contains("monthly");
      priceBlocks.classList.add("hide");
      if(isCurrentlyMonthly){
        switchPricingToAnnual();
      }
      else {
        switchPricingToMonthly();
      }
      setTimeout(function (){ priceBlocks.classList.remove("hide") }, 10);
      gtag('event', 'pricing_toggle', {
        'event_category': 'discovery'
      });
    })

    function switchPricingToAnnual() {
      sliderContainer.querySelector(".label.monthly").classList.remove("selected");
      sliderContainer.querySelector(".label.annual").classList.add("selected");
      slider.classList.remove("monthly");
      slider.classList.add("annual");
      priceBlocks.classList.remove("monthly");
      priceBlocks.classList.add("annual");
    }

    function switchPricingToMonthly() {
      sliderContainer.querySelector(".label.monthly").classList.add("selected");
      sliderContainer.querySelector(".label.annual").classList.remove("selected");
      slider.classList.add("monthly")
      slider.classList.remove("annual");
      priceBlocks.classList.add("monthly");
      priceBlocks.classList.remove("annual");
    }

  })();

  (function toggleNewsletterModal() {
    var toggleEl = document.querySelector(".js-newsletter-toggle");
    var wrapEl = document.querySelector(".js-newsletter-wrap");
    var closeEl = document.querySelector(".js-modal-close");
    if (!toggleEl || !wrapEl || !closeEl) return;
    toggleEl.href = "javascript:void(0);";
    toggleEl.addEventListener("click", function () {
      wrapEl.classList.toggle("visible");
      gtag('event', 'newsletter_open', {
        'event_category': 'engagement'
      });
    });
    window.addEventListener("keyup", function (evt) {
      if (evt.keyCode == 27) {
        wrapEl.classList.remove("visible");
      }
    });
    closeEl.addEventListener("click", function () {
      wrapEl.classList.remove("visible");
    });
  })();

  (function loadDisqusComments () {
    var loadButtonEl = document.querySelector(".js-load-comments");
    if (!loadButtonEl) { return; }
    loadButtonEl.addEventListener("click", function () {
      gtag('event', 'blog_comments', {
        'event_category': 'discovery'
      });
      loadButtonEl.parentNode.removeChild(loadButtonEl);
      // adapted from integration described on disqus.com
      var d = document, s = d.createElement('script');
      s.src = '//trackjs.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    });
  })();

  (function keepShareLinksVisible() {
    var shareListEl = document.querySelector(".js-share-list-wrap");
    if (!shareListEl) { return; }
    window.addEventListener("scroll", function onScroll() {
      if (window.scrollY > 400) {
        shareListEl.classList.add("fixed");
      }
      else {
        shareListEl.classList.remove("fixed");
      }
    });
  })();

  (function analyticsEvents() {
    var newsletterForm = document.querySelector("#js-newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (evt) {
        gtag('event', 'newsletter_subscribe', {
          'event_category': 'engagement',
          'event_callback': gtag.createTimeoutFn(function() { newsletterForm.submit(); })
        });

        evt.preventDefault();
        return false;
      });
    }
  })();

  (function attachClickAnalytics() {
    var actionAttr = 'data-click-event';
    var labelAttr = 'data-click-label';
    var elements = Array.prototype.slice.call(document.querySelectorAll('[' + actionAttr + ']'), 0);
    for(var elementIdx = 0; elementIdx < elements.length; elementIdx++) {
      (function() {
        var element = elements[elementIdx];
        element.addEventListener('click', function(evt) {
          var action = element.getAttribute(actionAttr);
          var label = element.getAttribute(labelAttr);
          gtag('event', action, {
            'event_category': 'discovery',
            'event_label': label
          });
        });
      })();
    }
  })();

  (function storeAcquisitionSources() {
    function getCookieJSON(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length != 2) { return; }
      var value = parts.pop().split(";").shift();
      try {
          return JSON.parse(decodeURIComponent(value));
      } catch(e) {}
      return;
    }
    function setCookieJSON(name, value) {
      document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=.trackjs.com; path=/; secure;";
    }
    function getSearchParam(name) {
      var value = location.search.replace('?', '&');
      var parts = value.split("&" + name + "=");
      if (parts.length != 2) { return; }
      return parts.pop().split("&").shift();
    }

    var cookie = getCookieJSON('TRACKJS_SOURCE') || { source: "", medium: "", campaign: "" };
    var source = getSearchParam('utm_source');
    var medium = getSearchParam('utm_medium');
    var campaign = getSearchParam('utm_campaign');
    if (source || medium || campaign) {
      cookie.source += (source || "") + ",";
      cookie.medium += (medium || "") + ",";
      cookie.campaign += (campaign || "") + ",";
      setCookieJSON('TRACKJS_SOURCE', cookie);

      history.replaceState(null, document.title, location.href
        .replace("utm_source=" + source, "")
        .replace("utm_medium=" + medium, "")
        .replace("utm_campaign=" + campaign, ""));
    }
  })();

})();
