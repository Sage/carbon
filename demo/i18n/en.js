import I18n from 'i18n-js';

I18n.translations['en'] = {
  components: 'Components',
  sage_href: 'http://www.sage.com',

  navigation: {
    articles: 'Articles',
    getting_started: 'Getting Started',
    menu: 'Menu',
    patterns: 'Patterns',
    style: 'Style',
    github: {
      view: 'View on GitHub',
      download: 'Install Carbon'
    }
  },

  footer: {
    legal: `\u00A9 The Sage Group plc. ${ new Date().getFullYear() }. Licensed under Apache 2.`
  },

  homepage: {
    component_showcase: {
      heading: 'The building blocks of ',
      heading_suffix: 'awesome UI',
      text: 'Powerful components, flexible configurations, easy code, and amazing user experience - all working together to build your incredible web application.'
    },

    get_started: {
      ready: 'Ready to Get Started?',
      checkout: 'Check out the Github repository or download Carbon'
    },

    learn_more: {
      global_scale: {
        title: 'Global Scale',
        footer_content: 'Learn more about Sage',
        text: 'At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seamlessly, giving you access to the latest release.'
      },
      constantly_improving: {
        title: 'constantly_improving',
        footer_content: 'Learn more recent updates',
        text: 'At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seamlessly, giving you access to the latest release.'
      }
    },

    page_header_large: {
      heading1: 'Carbon is a library of React components for building great web applications.',
      heading2: 'Carbon is Open Source. It’s hosted, developed, and maintained on Github.'
    },

    sage_loves_carbon: {
      heading: 'Sage Loves ',
      heading_suffix: 'Carbon',
      text: 'Carbon is the heart of global Sage products for hundreds of thousands of users worldwide. Designers and developers at Sage and beyond help Carbon to constantly evolve. Carbon is loaded with knowledge, keeping you ahead in cutting-edge user experience.',
      learn_more: 'Learn more about Sage'
    },

    selling_points: {
      heading: 'Ready, set, ',
      heading_suffix: 'code!',
      text: 'Besides having beautiful UI that is easy to use, you’ll find there’s so much more to using Carbon on your next project.',

      point: {
        heading: 'Easy, fast, powerful',
        text: 'Over 50 components and 340 configurations bring your killer app to life.'
      },
      flexible: {
        heading: 'Beautifully flexible',
        text: 'Carbon is beautiful out-of-the-box, down to colours, icons, and style.'
      },
      brush: {
        heading: 'Designed for UX',
        text: 'Meet your users’ needs with a simple, elegant, delightful experience.'
      },
      hammer: {
        heading: 'Build smarter',
        text: 'Hundreds of thousands of users worldwide help Carbon evolve.'
      },
      plug: {
        heading: 'Powered by you',
        text: 'Carbon powers your app. Contribute your code, so you can power Carbon too.'
      },
      collaborate: {
        heading: 'Seamlessly collaborative',
        text: 'With Carbon’s UI Kit, designers and developers speak the same language.'
      },
    }
  },

  component_page: {
    design_notes: 'Designer Notes',
    related_components: 'Related Components'
  },

  errors: {
    messages: {
      blank: 'This field is required.',
      invalid_characters: 'The field contains invalid characters',
      invalid_email: "Please enter a valid email address.",
      too_long: "is too long (maximum is %{count} characters)",
      wrong_format: 'Invalid format'
    }
  },

  style: {
    colors: {
      subtitle: 'A vibrant palette for a consistent visual style across your app.'
    },

    icons: {
      subtitle: 'Free icons to use in your project.',
    },
  }
};
