/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="common.ts" />
/// <reference path="interfaces.d.ts" />

'use strict';
var $ScrollProvider = [<any>'$anchorScrollProvider', function ($anchorScrollProvider: ng.IAnchorScrollProvider) {
    var autoscroll: bool = false;


    //TODO: Consider this again... maybe we should just allow for a rerouted disable call?
    // $anchorScrollProvider.disableAutoScrolling();


    this.$get = [<any>'$window', '$rootScope', '$anchorScroll', '$injector','$timeout',
        function ($window: ng.IWindowService, $rootScope: ng.IRootScopeService, $anchorScroll: ng.IAnchorScrollService, $injector: ng.auto.IInjectorService, $timeout: ng.ITimeoutService) {
            var document = $window.document;
            var scroll: any = function(arg: any) {
                var fn;
                if (isUndefined(arg)) {
                    $anchorScroll();
                } else if (isString(arg)) {
                    scrollTo(arg);
                } else if ((fn = injectFn(arg)) !== null) {
                    scrollTo($injector.invoke(arg, fn)[0])
                }
            }
            scroll.$current = 'top';
            //scroll.$register = register;

            //var elements = {};

            //function register(name: string, elm: HTMLElement) {
            //    if (name in elements) {
            //        var existing = elements[name];

            //    }

            //    elements[name] = elm;
            //}

            function scrollTo(elm: any) {
                scroll.$current = elm;
                if (elm === 'top') {
                    $window.scrollTo(0, 0);
                    return;
                }
                $rootScope.$broadcast('$scrollPositionChanged', elm);
                //if (elm) elm.scrollIntoView();
            }
            /****jQuery( "[attribute='value']" 
             * scrollTo: top - scroll to top, explicitly stated.
             *           (This also enables one to override another scrollTo from a parent)
             * scrollTo: null - don't scroll, not even to top.
             * scrollTo: element-selector - scroll to an element id
             * scrollTo: ['$stateParams', function($stateParams) { return stateParams.section; } 
             *           - scroll to element with id or view if starts with @
             */


            return scroll;
        }];
}];
angular.module('ui.routing').provider('$scroll', $ScrollProvider);