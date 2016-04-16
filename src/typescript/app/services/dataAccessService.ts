module app.common {

  interface IdataAccessService {
    getProjectBudgetResource(): any;
    getDesignDevelopmentOptions(): any;
    getPrintIllustrationOptions(): any;
    getUploadFileTypes(): any;
    getBrandingStrategyOptions(): any;
    getProjectDeadlineOptions(): any;
    getPortfolioResource(): any;
  }

  interface IResource extends ng.resource.IResource<any> {

  }

  export class DataAccessService
      implements IdataAccessService {

    static $inject = ['$resource'];
    constructor(private $resource: ng.resource.IResourceService) {

    }

    getProjectBudgetResource(): any {
      return [
        100,
        500,
        1000,
        5000,
        10000
      ];
    }
    
    getDesignDevelopmentOptions(): any {
      return [
        {
          title: 'Ui/Ux Design',
          options: ['Website design', 'Application design']
        },
        {
          title: 'Development',
          options: ['Front-end development', 'Mobile development', 'Technical planning', 'Content management']
        }
      ];
    }

    getPrintIllustrationOptions(): any {
      return [
        {
          title: 'Print Design',
          options: ['Outdoor advertising', 'Polygraphy', 'Magazines and books', 'Packaging']
        },
        {
          title: 'Illustration',
          options: ['Sketches', 'Book illustration']
        }
      ];
    }

    getUploadFileTypes(): any {
      return ['pdf', 'zip', 'doc', 'jpg'];
    }

    getBrandingStrategyOptions(): any {
      return [
        {
          title: 'Branding',
          options: ['Naming', 'Logo development', 'Corporate identity']
        },
        {
          title: 'Strategy',
          options: ['Research facility', 'Content strategy', 'Market research', 'Business analysis']
        }
      ];
    }

    getProjectDeadlineOptions(): any {
      return [
        'Can you make it yesterday?',
        'In a week',
        'in a month',
        '2-3 months',
        'I have more time'
      ];
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