module.exports = {
  title: 'Open Election Compass',
  description: 'Tiny election compass, free and open source.',
  themeConfig: {
    logo: '/oec-navbar-logo.png',
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
        text: 'Configurator',
        items: [
          {
            'text': 'Version 1',
            items: [
              { text: 'Language File', link: '/configurator/version-1/language-file' },
              { text: 'Embed Code', link: '/configurator/version-1/embed-code' },
            ],
          },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'GitHub', link: 'https://github.com/tillsanders/openElectionCompass' },
          { text: 'Discord', link: 'https://discord.gg/qjVsRDd' },
          { text: 'E-Mail Newsletter', link: 'http://eepurl.com/gRApTD' },
        ]
      },
      {
        text: 'Demos',
        items: [
          { text: 'Hogwarts Demo', link: 'https://tillsanders.github.io/openElectionCompass/index.html' },
          { text: 'Kommunalwahl Lüdenscheid 2020', link: 'https://tillsanders.github.io/openElectionCompass/demo-de.html' },
        ]
      },
      { text: 'Feedback', link: 'https://forms.gle/dZ6Hwdp2GGX8s4VeA' },
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
        'deployment',
        'configuration'
      ],
    }
  }
};
