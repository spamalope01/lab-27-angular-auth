'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then(res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch (err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(galleryID, picData) {
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
    })
    .then(res => {
      galleryData.pics.pop(res.data);  //thi sneeds to be splice with the first parameter being the pic id and the second 1 to make sure it only removes that one item.  
      return res.data;
    })
    .catch (err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
};
