/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="common.ts" />
/// <reference path="interfaces.d.ts" />

'use strict';

function $TemplateProvider() {

    this.$get = [<any>'$http', '$q', '$injector', '$templateCache',
    function ($http: ng.IHttpService, $q: ng.IQService, $injector: ng.auto.IInjectorService, $templateCache: ng.ITemplateCacheService) {

        function getFromUrl(url): ng.IPromise {
            return $http.get(url, { cache: $templateCache }).then(response => { return response.data; });
        }

        function getFromFunction(fn): ng.IPromise {
            return $q.when($injector.invoke(fn));
        }

        function getFromObject(obj): ng.IPromise {
            if (isDefined(obj.url))
                return getFromUrl(obj.url);

            if (isDefined(obj.fn))
                return getFromFunction(obj.fn);

            if (isDefined(obj.html))
                return $q.when(obj.html);

            throw new Error("Object must define url, fn or html.");
        }

        this.get = function (template): ng.IPromise {
            //TODO: Make a regular expression check?
            if (isString(template))
                return getFromUrl(template);

            if (isFunction(template) || isArray(template))
                return getFromFunction(template);

            if (isObject(template))
                return getFromObject(template);

            throw new Error("Template must be either an url as string, function or a object defining either url, fn or html.");
        }

        return this;
    }];
}
angular.module('ui.routing').provider('$template', $TemplateProvider);