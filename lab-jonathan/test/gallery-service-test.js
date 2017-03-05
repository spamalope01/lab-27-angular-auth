// 'use strict';

require('app/entry.js');
require('angular-mocks');

let angular = require('angular');

describe('Gallery Service', function(){

  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      authService.setToken = ('1234');
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  desribe('galleryService.createGallery', function() {
    it('should create a new gallery', function(){
      let galleryData = {
        name: 'test gallery',
        desc: 'test description'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234'
      };

      this.$httpBackend.expectPost('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {
        _id: '666',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
});
});
