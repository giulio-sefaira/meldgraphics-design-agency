module app.common {

  interface IdataAccessService {

  }

  interface IResource extends ng.resource.IResource<any> {

  }

  export class DataAccessService
      implements IdataAccessService {

    static $inject = ['$resource'];
    constructor(private $resource: ng.resource.IResourceService) {

    }
    
    getPortfolioResource(): any {
      return [{
        title: 'Life Lines',
        imageUrl: 'img/thumb-1.jpg',
        url: 'http://google.ru',
        type: 'branding'
      },
      {
        title: 'Horizon Advisor',
        imageUrl: 'img/thumb-2.jpg',
        url: 'http://yandex.ru',
        type: 'design ui/ux'
      },
      {
        title: 'VegFit',
        imageUrl: 'img/thumb-3.jpg',
        url: 'http://fb.com',
        type: 'print design & illustration'
      },
        {
          title: 'Life Lines',
          imageUrl: 'img/thumb-1.jpg',
          url: 'http://google.ru',
          type: 'print design & illustration'
        },
        {
          title: 'Horizon Advisor',
          imageUrl: 'img/thumb-2.jpg',
          url: 'http://yandex.ru',
          type: 'design ui/ux'
        },
        {
          title: 'VegFit',
          imageUrl: 'img/thumb-3.jpg',
          url: 'http://fb.com',
          type: 'branding'
        },
        {
          title: 'Life Lines',
          imageUrl: 'img/thumb-1.jpg',
          url: 'http://google.ru',
          type: 'branding'
        },
        {
          title: 'Horizon Advisor',
          imageUrl: 'img/thumb-2.jpg',
          url: 'http://yandex.ru',
          type: 'print design & illustration'
        },
        {
          title: 'VegFit',
          imageUrl: 'img/thumb-3.jpg',
          url: 'http://fb.com',
          type: 'design ui/ux'
        }];
    }
  }

  angular
    .module('common.services')
    .service('dataAccessService',
              DataAccessService);

}