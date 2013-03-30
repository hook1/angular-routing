﻿var app = angular.module('sample', ['ui.routing']);app.config(['$stateProvider', '$routeProvider',       function ($stateProvider, $routeProvider) {
           $routeProvider               .otherwise({ redirectTo: '/' });
           $stateProvider               .state('home', {
                   route: '/',                   views: {
                       'main': {
                           template: 'tpl/home.html',                           controller: function ($rootScope) { $rootScope.page = "home"; }
                       },                       'hint': { template: { html: '@home' } }
                   }
               })               .state('blog', {
                   route: '/blog',                   views: {
                       'main': {
                           template: 'tpl/blog.html',                           controller: function ($rootScope, $scope, blog) {
                               $rootScope.page = "blog";                               $scope.posts = blog.getAllPosts();                               $scope.categories = blog.getCategories();                               $scope.archives = blog.getArchives();
                           }
                       },                       'hint': { template: { html: '@blog' } },                       'content': {
                           template: 'tpl/blog.list.html'
                       }
                   }
               })               .state('blog.category', {
                   route: '/category/{category}',                   views: {
                       'hint': { template: { html: '@blog.category' } },                       'content': {
                           template: 'tpl/blog.list.html'
                       }
                   }
               })               .state('blog.archive', {
                   route: '/archive/{archive}',                   views: {
                       'main': {
                           template: 'tpl/blog.html',                           controller: function ($rootScope, $scope, blog) {
                               $rootScope.page = "blog";                               $scope.posts = blog.getAllPosts();                               $scope.categories = blog.getCategories();                               $scope.archives = blog.getArchives();
                           }
                       },                       'hint': { template: { html: '@blog.archive' } }
                   }
               })               .state('code', {
                   route: '/code',                   views: {
                       'main': {
                           template: 'tpl/code.html',                           controller: function ($rootScope) { $rootScope.page = "code"; }
                       },                       'hint': { template: { html: '@code' } }
                   }
               })               .state('about', {
                   route: '/about',                   views: {
                       'main': {
                           template: 'tpl/about.html',                           controller: function ($rootScope) { $rootScope.page = "about"; }
                       },                       'hint': { template: { html: '@about' } }
                   }
               })               .transition('*', '*', function ($rootScope) { $rootScope.transition = "global handler"; })               .transition('*', 'home', function ($rootScope) { $rootScope.transition = "root -> home"; })               .transition('*', 'blog', function ($rootScope) { $rootScope.transition = "root -> blog"; })               .transition('*', 'about', function ($rootScope) { $rootScope.transition = "root -> about"; })               .transition('home', 'blog', function ($rootScope) { $rootScope.transition = "home -> blog"; })               .transition('home', 'about', function ($rootScope) { $rootScope.transition = "home -> about"; })               .transition('blog', 'home', function ($rootScope) { $rootScope.transition = "blog -> home"; })               .transition('blog', 'about', function ($rootScope) { $rootScope.transition = "blog -> about"; })               .transition('about', 'home', function ($rootScope) { $rootScope.transition = "about -> home"; })               .transition('about', 'blog', function ($rootScope) { $rootScope.transition = "about -> blog"; });
       }]);
app.service('blog', function () {
    var monthlong = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];    var posts = [        {
            title: 'Route Config',            content: 'Just another post',            category: 'core',
            date: new Date(),            views: 0
        },
        {
            title: 'State Config',            content: 'Just another post',            category: 'core',
            date: new Date(),            views: 0
        },
        {
            title: 'Transition Config',            content: 'Just another post',            category: 'core',            date: new Date(),            views: 0
        },
        {
            title: 'Other Config',            content: 'Just another post',            category: 'other',
            date: new Date(),            views: 0
        }    ];
    this.getAllPosts = function () {
        return posts;
    };
    this.getArchives = function () {
        var months = [];        angular.forEach(posts, function (post) {
            var month = monthlong[post.date.getMonth()] + ' ' + post.date.getFullYear();            if (months.indexOf(month) === -1)                months.push(month);
        });        return months;
    };
    this.getCategories = function () {
        var categories = [];        angular.forEach(posts, function (post) {
            if (categories.indexOf(post.category) === -1)                categories.push(post.category);
        });        return categories;
    };
});
function clean(state) {
    var newState = {};
    newState.self = state.self;    newState.fullname = state.fullname;    newState.children = {};    if (state.route)        newState.route = state.route;
    angular.forEach(state.children, function (child, name) {
        newState.children[name] = clean(child);
    });    return newState;
}
function PageController($scope, $route, $state, $transition) {
    $scope.routes = JSON.stringify($route.routes, null, 2);    $scope.states = JSON.stringify(clean($state.root), null, 2);    $scope.transitions = JSON.stringify($transition.root, null, 2);
}