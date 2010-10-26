/*
 * Note:
 * Even with asynchronous loading, some content might be blocked from rendering in certain browsers.
 * To avoid this possibility, other scripts in your site should be positioned in one of these ways:
 * before the tracking code snippet in the <head> section of your HTML
 */

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12678082-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
  })();