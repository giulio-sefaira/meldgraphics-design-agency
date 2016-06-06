module app.common {

  interface IdataAccessService {
    getProjectBudgetResource(): any;
    getDesignDevelopmentOptions(): any;
    getPrintIllustrationOptions(): any;
    getUploadFileTypes(): any;
    getBrandingStrategyOptions(): any;
    getProjectDeadlineOptions(): any;
    getPortfolioResource(): any;
    getFeatures(): any;
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
        '&#8364;100 - &#8364;500',
        '&#8364;500 - &#8364;1000',
        '&#8364;1000 - &#8364;5000',
        '&#8364;5000 - &#8364;10000',
        '> &#8364;10000'
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

    getFeatures(): any {
      return [{
        name: '2',
        title: 'UX/UI Design',
        description: ['Website design', 'Application design'],
        size: {
          width: 150,
          height: 160
        }
      },
      {
        name: '5',
        title: 'Strategy',
        description: ['Research facility', 'Content strategy', 'Market research', 'Business Analysis'],
        size: {
          width: 150,
          height: 130
        }
      },
      {
        name: '6',
        title: 'Development',
        description: ['Front-end Development', 'Mobile Development', 'Technical Planning', 'Content Managment'],
        size: {
          width: 145,
          height: 140
        }
      },
      {
        name: '3',
        title: 'Branding',
        description: ['Naming', 'Logo Development', 'Corporate Identity'],
        size: {
          width: 90,
          height: 110
        }
      },
      {
        name: '1',
        title: 'Print Design',
        description: ['Outdoor Advertising', 'Polygraphy', 'Magazines & Books', 'Packaging'],
        size: {
          width: 140,
          height: 130
        }
      },
      {
        name: '4',
        title: 'Illustration',
        description: ['Sketches', 'Book Illustration'],
        size: {
          width: 150,
          height: 110
        }
      }];
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