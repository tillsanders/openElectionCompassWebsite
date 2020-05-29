module.exports = {
  title: 'OpenElectionCompass',
  description: 'Tiny election compass, free and open source.',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'OpenElectionCompass',
      description: 'Tiny election compass, free and open source.',
    },
    '/de/': {
      lang: 'de-DE',
      title: 'OpenElectionCompass',
      description: 'Minimalistischer Wahlkompass, frei und quelloffen.',
    }
  },
  themeConfig: {
    logo: '/oec-navbar-logo.png',
    locales: {
      '/': {
        selectText: 'Languages',
        ariaLabel: 'Languages',
        label: 'English',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Guide',
            items: [
              { text: 'Organisation Guide', link: '/guide/organisation/01-introduction.html' },
              {
                text: 'Technical Guide',
                items: [
                  { text: 'Overview', link: '/guide/technical/overview.html' },
                  { text: 'Deployment', link: '/guide/technical/deployment.html' },
                  { text: 'Configuration', link: '/guide/technical/configuration.html' },
                ],
              },
            ],
          },
          {
            text: 'Tools',
            items: [
              {
                'text': 'Version 1',
                items: [
                  { text: 'Configuration Editor', link: '/configurator/version-1/configuration-editor' },
                  { text: 'HTML Generator', link: '/configurator/version-1/embed-code' },
                ],
              },
            ],
          },
          {
            text: 'Community',
            items: [
              { text: 'GitHub', link: 'https://github.com/open-election-compass/client' },
              { text: 'Chat / Forum', link: 'https://spectrum.chat/openelectioncompass' },
              { text: 'E-Mail Newsletter', link: 'http://eepurl.com/gRApTD' },
            ]
          },
          {
            text: 'Demos',
            items: [
              { text: 'Hogwarts Demo', link: 'https://open-election-compass.github.io/client/index.html' },
              { text: 'Kommunalwahl Lüdenscheid 2020', link: 'https://open-election-compass.github.io/client/demo-luedenscheid.html' },
            ]
          },
          {
            text: 'About',
            items: [
              { text: 'Contact (German)', link: '/about' },
              { text: 'Privacy Policy (German)', link: '/privacy' },
            ]
          },
        ],
        sidebarDepth: 3,
        displayAllHeaders: true,
        sidebar: {
          '/guide/organisation/': [
            '01-introduction',
            '02-rules',
            '03-phase-1',
            '04-phase-2',
            '05-phase-3',
            '06-phase-4',
            '07-phase-5',
            '08-phase-6',
            '09-phase-7',
            '10-phase-8',
            '11-phase-9',
            '12-phase-10',
          ],
          '/guide/technical/': [
            'overview',
            'configuration',
            'deployment'
          ],
        }
      },
      '/de/': {
        selectText: 'Sprachen',
        ariaLabel: 'Sprachen',
        label: 'Deutsch',
        serviceWorker: {
          updatePopup: {
            message: 'Neue Inhalte sind verfügbar.',
            buttonText: 'Aktualisieren'
          }
        },
        nav: [
          { text: 'Start', link: '/de/index.html' },
          {
            text: 'Handbuch',
            items: [
              { text: 'Organisation', link: '/de/guide/organisation/01-introduction.html' },
              {
                text: 'Technik',
                items: [
                  { text: 'Übersicht', link: '/de/guide/technical/overview.html' },
                  { text: 'Deployment', link: '/de/guide/technical/deployment.html' },
                  { text: 'Konfiguration', link: '/de/guide/technical/configuration.html' },
                ],
              },
            ],
          },
          {
            text: 'Werkzeuge',
            items: [
              {
                'text': 'Version 1',
                items: [
                  { text: 'Konfigurations-Editor', link: '/de/configurator/version-1/configuration-editor' },
                  { text: 'HTML-Generator', link: '/configurator/version-1/embed-code' },
                ],
              },
            ],
          },
          {
            text: 'Gemeinschaft',
            items: [
              { text: 'GitHub', link: 'https://github.com/open-election-compass/client' },
              { text: 'Chat / Forum', link: 'https://spectrum.chat/openelectioncompass' },
              { text: 'E-Mail Newsletter', link: 'http://eepurl.com/gRApTD' },
            ]
          },
          {
            text: 'Demos',
            items: [
              { text: 'Hogwarts Demo', link: 'https://open-election-compass.github.io/client/index.html' },
              { text: 'Kommunalwahl Lüdenscheid 2020', link: 'https://open-election-compass.github.io/client/demo-luedenscheid.html' },
            ]
          },
          {
            text: 'Über',
            items: [
              { text: 'Impressum', link: '/about' },
              { text: 'Datenschutzerklärung', link: '/privacy' },
            ]
          },
        ],
        sidebarDepth: 3,
        displayAllHeaders: true,
        sidebar: {
          '/de/guide/organisation/': [
            '01-introduction',
            '02-rules',
            '03-phase-1',
            '04-phase-2',
            '05-phase-3',
            '06-phase-4',
            '07-phase-5',
            '08-phase-6',
            '09-phase-7',
            '10-phase-8',
            '11-phase-9',
            '12-phase-10',
          ],
          '/de/guide/technical/': [
            'overview',
            'configuration',
            'deployment'
          ],
        }
      }
    },
  }
};
