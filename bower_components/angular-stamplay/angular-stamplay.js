(function (root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['angular', 'stamplay'], function (angular, stamplay) {
      return factory({}, angular, stamplay);
    });
  }
  // Node.js
  else if (typeof exports === 'object') {
    module.exports = factory({}, require('angular'), require('stamplay'));
  }
  // Angular
  else if (angular) {
    factory(root, root.angular, root.Stamplay);
  }
}(this, function (global, angular, Stamplay) {
  'use strict';
  if (Stamplay && global && !global.Stamplay) {
    global.Stamplay = Stamplay;
  }

  // var stamplaySettings = global.StamplaySettings || {};

  var instance = false;

  // Create a script tag with moment as the source
  // and call onScriptLoad callback when it
  // has been loaded
  // function createScript() {
  //   if (!document) {
  //     return;
  //   }
  //   var script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = 'https://drrjhlchpvi7e.cloudfront.net/libs/stamplay-js-sdk/0.0.4/stamplay.min.js';
  //   // Attach the script tag to the document head
  //   var s = document.getElementsByTagName('head')[0];
  //   s.appendChild(script);
  // }

  // Allow constructor to be used for both $stamplay and Stamplay services
  function $StamplayProvider() {

    var provider = this;

    provider.$get = ['$rootScope', '$log', function ($rootScope, $log) {
      // warn the user if they inject both $stamplay and Stamplay
      if (instance) {
        $log.warn('Please use consider using either $stamplay or Stamplay not both');
      }
      instance = true;

      function $stamplay() {
        global.Stamplay.apply(global.Stamplay, arguments);
        return $stamplay;
      }

      var methods = {
        Cobject: function (options) {
          var cobject = new global.Stamplay.Cobject(options);
          return cobject;
        },
        User: function () {
          var user = new global.Stamplay.User();
          return user;
        },
        Webhook: function () {
          var webhook = new global.Stamplay.Webhook();
          return webhook;
        },
        Stripe: function () {
          var stripe = new global.Stamplay.Stripe();
          return stripe;
        },
        Query: function (option1, option2) {
          var query = new global.Stamplay.Query(option1,option2);
          return query;
        }
      };

      // this allows you to use methods prefixed with '$' to safe $apply on $rootScope
      function buildMethod(func, method) {
        $stamplay[method] = func;
        $stamplay['$' + method] = function () {
          func.apply(Stamplay, arguments);
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
          return $stamplay;
        };
      }

      angular.forEach(methods, buildMethod);

      return $stamplay;
    }]; // end $get
  }

  angular.module('ngStamplay', [])
    .provider('$stamplay', $StamplayProvider)
    .provider('Stamplay', $StamplayProvider);

  // allow you to use either module
  angular.module('angular-stamplay', ['ngStamplay']);

  return angular.module('ngStamplay');

}));
