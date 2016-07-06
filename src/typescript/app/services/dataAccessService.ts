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
      return {
        ru: [
          {
            title: 'Ui/Ux Дизайн',
            options: ['Веб-дизайн', 'Веб-разработка']
          },
          {
            title: 'Разработка',
            options: ['Front-end разработка', 'Мобильные приложения', 'Техническое планирование', 'Контент-менеджмент']
          }
        ],
        en: [
          {
            title: 'Ui/Ux Design',
            options: ['Website design', 'Application design']
          },
          {
            title: 'Development',
            options: ['Front-end development', 'Mobile development', 'Technical planning', 'Content management']
          }
        ]
      };
    }

    getPrintIllustrationOptions(): any {
      return {
        ru: [
          {
            title: 'Печатный дизайн',
            options: ['Наружная реклама', 'Полиграфия', 'Журналы и книги', 'Упаковки']
          },
          {
            title: 'Иллюстрация',
            options: ['Скетчи', 'Иллюстрации к книгам']
          }
        ],
        en: [
          {
            title: 'Print Design',
            options: ['Outdoor advertising', 'Polygraphy', 'Magazines and books', 'Packaging']
          },
          {
            title: 'Illustration',
            options: ['Sketches', 'Book illustration']
          }
        ]
      };
    }

    getUploadFileTypes(): any {
      return ['pdf', 'zip', 'doc', 'docx', 'jpg', 'jpeg'];
    }

    getBrandingStrategyOptions(): any {
      return {
        ru: [
          {
            title: 'Брендинг',
            options: ['Нейминг', 'Разработка логотипа', 'Корпоративная айдентика']
          },
          {
            title: 'Стратегия',
            options: ['Исследование объекта', 'Коммуникационная стратегия', 'Исследование рынка', 'Бизнес-анализ']
          }
        ],
        en: [
          {
            title: 'Branding',
            options: ['Naming', 'Logo development', 'Corporate identity']
          },
          {
            title: 'Strategy',
            options: ['Research facility', 'Content strategy', 'Market research', 'Business analysis']
          }
        ]
      };
    }

    getProjectDeadlineOptions(): any {
      return {
        ru: [
          'Уже должен быть готов!',
          'Неделя',
          'Месяц',
          '2-3 месяца',
          'У меня есть больше времени'
        ],
        en: [
          'Can you make it yesterday?',
          'In a week',
          'in a month',
          '2-3 months',
          'I have more time'
        ]
      };
    }

    getFeatures(): any {
      return [{
        name: '2',
        title: {
          en: 'UX/UI Design',
          ru: 'UX/UI Дизайн'
        },
        description: {
          en: ['Website design', 'Application design'],
          ru: ['Веб-дизайн', 'Веб-разработка']
        },
        size: {
          width: 150,
          height: 160
        }
      },
      {
        name: '5',
        title: {
          en: 'Strategy',
          ru: 'Бизнес Стратегия'
        },
        description: {
          en: ['Research facility', 'Content strategy', 'Market research', 'Business Analysis'],
          ru: ['Исследование объекта', 'Коммуникационная стратегия', 'Исследование рынка', 'Бизнес-анализ']
        },
        size: {
          width: 150,
          height: 130
        }
      },
      {
        name: '6',
        title: {
          en: 'Development',
          ru: 'Разработка'
        },
        description: {
          en: ['Front-end Development', 'Mobile Development', 'Technical Planning', 'Content Managment'],
          ru: ['Front-end разработка', 'Мобильные приложения', 'Техническое планирование', 'Контент-менеджмент']
        },
        size: {
          width: 145,
          height: 140
        }
      },
      {
        name: '3',
        title: {
          en: 'Branding',
          ru: 'Брендинг'
        },
        description: {
          en: ['Naming', 'Logo Development', 'Corporate Identity'],
          ru: ['Нейминг', 'Разработка логотипов', 'Корпоративная айдентика']
        },
        size: {
          width: 90,
          height: 110
        }
      },
      {
        name: '1',
        title: {
          en: 'Print Design',
          ru: 'Печатный дизайн'
        },
        description: {
          en: ['Outdoor Advertising', 'Polygraphy', 'Magazines & Books', 'Packaging'],
          ru: ['Наружная реклама', 'Полиграфия', 'Журналы и книги', 'Упаковки']
        },
        size: {
          width: 140,
          height: 130
        }
      },
      {
        name: '4',
        title: {
          en: 'Illustration',
          ru: 'Иллюстрация'
        },
        description: {
          en: ['Sketches', 'Book Illustration'],
          ru: ['Скетчи', 'Иллюстрации к книгам']
        },
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
        url: '/portfolio/presentHorizon',
        type: 'branding'
      },
      {
        title: 'Horizon Advisor',
        imageUrl: 'img/thumb-2.jpg',
        url: '/portfolio/presentHorizon',
        type: 'design ui/ux'
      },
      {
        title: 'VegFit',
        imageUrl: 'img/thumb-3.jpg',
        url: '/portfolio/presentHorizon',
        type: 'print design & illustration'
      },
      {
        title: 'Life Lines',
        imageUrl: 'img/thumb-1.jpg',
        url: '/portfolio/presentHorizon',
        type: 'print design & illustration'
      },
      {
        title: 'Horizon Advisor',
        imageUrl: 'img/thumb-2.jpg',
        url: '/portfolio/presentHorizon',
        type: 'design ui/ux'
      },
      {
        title: 'VegFit',
        imageUrl: 'img/thumb-3.jpg',
        url: '/portfolio/presentHorizon',
        type: 'branding'
      },
      {
        title: 'Life Lines',
        imageUrl: 'img/thumb-1.jpg',
        url: '/portfolio/presentHorizon',
        type: 'branding'
      },
      {
        title: 'Horizon Advisor',
        imageUrl: 'img/thumb-2.jpg',
        url: '/portfolio/presentHorizon',
        type: 'print design & illustration'
      },
      {
        title: 'VegFit',
        imageUrl: 'img/thumb-3.jpg',
        url: '/portfolio/presentHorizon',
        type: 'design ui/ux'
      }];
    }
  }

  angular
    .module('common.services')
    .service('dataAccessService',
              DataAccessService);

}