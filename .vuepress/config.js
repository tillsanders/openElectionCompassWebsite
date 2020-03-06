module.exports = {
  title: 'Open Election Compass',
  description: 'Tiny election compass, free and open source.',
  plugins: [
    [
      'vuepress-plugin-contributors',
      {
        showAvatar: true,
        showCount: true,
        avatarSize: 32,
        defaultAvatar: '/not-found.png',
        avatarProvider: 'github'
      }
    ]
  ],
  themeConfig: {
    logo: '/oec-navbar-logo.png',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          { text: 'Organisation Guide', link: '/guide/organisation' },
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
    ],
    sidebarDepth: 3,
    displayAllHeaders: true,
    sidebar: {
      '/guide/technical/': [
        'overview',
        'deployment',
        'configuration'
      ],
    }
  }
};
