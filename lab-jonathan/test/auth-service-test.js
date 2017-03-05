// 'use strict';

require('app/entry.js');
require('angular-mocks');

let angular = require('angular');

describe('Auth Service', function(){

  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken()', function() {
    it('should return a token', function() {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', '12345');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('12345');
      })
      .catch(err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
  });
});
});
