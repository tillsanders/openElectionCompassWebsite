# Configuration

The election compass is configured in JSON format. The configuration file contains all the theses
answers, parties, logos, translations for any number of languages and other settings.

::: tip Did we mention the Configuration Editor?
You can write the configuration by hand, or you can try our Configuration Editor. The
Configuration Editor generates JSON files in the format of the election compass. This is
particularly useful for people with no technical background.

[:point_right: Configuration Editor](/configurator/version-1/configuration-editor.html)
:::

## Version


The configuration file schema is versioned. The current version '1'. Every configuration file has a
version property, so that the version used can easily be determined:

```json
{
  "version": "1"
}
```

## Internationalization

A single configuration file contains all the languages that the election compass should offer. The
available languages are defined in the configuration.

```json
{
  // The following line is from the example above! All attributes go into the same JSON object, but
  // we will omit them in the other examples to keep things short.
  "version": "1",
  "languages": [{
    "name": "English",
    "code": "en"
  }, {
    "name": "Deutsch",
    "code": "de"
  }]
}
```

Use the name of the language in the language itself for the `name` attribute.

For the `code` attribute, use the two letter, lowercase language code as defined by
<a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO 639-1</a>.
Example: `"en"` for English, `"de"` for German, etc.

Content elements, such as theses and answers, can now be translated in a sub-object. You can see how
to do this in the example of the next section. All attributes where an object with translations is
expected are marked as 'multilingual'.

## General Information

On the root level, the JSON files contain general information, like the title and subtitle, as
displayed in the start section of every election compass.

```json
{
  // version, languages, etc.
  // ...
  "title": {
    "en": "Hogwarts Head Boy and Girl Elections 1993",
    "de": "Hogwarts Schülervertretung 1993"
  },
  "subtitle": {
    "en": "An election compass by Hermione Granger",
    "de": "Ein Wahlkompass von Hermine Granger"
  },
  "introduction": {
    "heading": {
      "en": "Welcome to the Election Compass",
      "de": "Willkommen zum Wahlkompass"
    },
    "text": {
      "en": "All 5 contending students have answered the 10 theses of the Election Compass ...",
      "de": "Alle 5 teilnehmenden Studierenden haben die 10 Thesen des Wahlkompasses ..."
    }
  }
}
```

### title <Badge text="multilingual"/>

The title of the election. Will be displayed as a `h1` element in the start section. Should be
precise and not too long.

Example: `"General Election of the United Nations 2050"`

### subtitle <Badge text="multilingual"/>

The subtitle, visible in the start section. Should, for example, mention the responsible
organization.

Example: `"This election compass is provided by your local democracy support group."`

### introduction.heading <Badge text="mehrsprachig"/>

Below the start section is a short introduction section that starts with a heading. Use about 3 to 5
welcoming words.

Beispiel: `"Welcome to the Election Compass"`

### introduction.text <Badge text="mehrsprachig"/>

Provide a short introduction to your election compass. Don\'t add explanations on how it works,
rather tell your audience, who you are and why you are doing this, how many parties participated,
etc. About 2 - 5 sentences.

Beispiel: `"All 9 parties that are participating in the election have ..."`

## Parties

The `parties` property in the root section contains an array of parties:

```json
{
  // version, languages, title, subtitle, etc.
  // ...
  "parties": [{
    "alias": "spew",
    "name": {
      "en": "Society for the Promotion of Elvish Welfare",
      "de": "Bund für Elfenrechte"
    },
    "short": {
      "en": "SPEW",
      "de": "B.ELFE.R"
    },
    "description": {
      "en": "The Society for the Promotion of Elvish Welfare was founded in 1991 and has since put great efforts into improving the lifes of those in our service.",
      "de": "Die Bund für Elfenrechte wurde 1991 gegründet und hat seither große Anstrengungen unternommen um das Leben derer zu verbessern, die uns dienen."
    },
  }, {
    // another party
  }],
}
```

### parties[].name <Badge text="multilingual"/>

The full name of the party, without abbrevations.

Example: `"Super Democratic Party"`

### parties[].short <Badge text="multilingual"/>

The abbrevation or short name of the party, as it is usually used in logos, charts, etc.

Example: `"SDP"`

### parties[].alias

The identifier of the party, used for technical purposes. Simply enter the abbrevation of the party
name in small letters without spaces and make sure it is unique (no two parties may have the same
identifier). The identifier is used in the theses objects to map the positions to the respective
parties.

Example: `"sdp"`

### parties[].description <Badge text="multilingual"/>

A small description of the history or the political direction of this party.

Example: `"The SDP was established in 2000 and is a very cool party. Vote for it. It is very good."`

<small>(Of course, this is a terrible example :wink:)</small>

### parties[].logo <Badge text="optional"/>

The party's logo. This string will be passed to the `src` attribute of an `img` element. You can
therefore use an URL or a Base64 encoded file. For simplicity, this is what the Configuration Editor
will do. Whichever you choose, make sure the files are as small as possible, compatible with all
browsers and vector based whenever possible. SVG files work best, PNG is second and JPG is third.
The images should have the following dimensions: 400 x 400 px.

Example for Base64: `"data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQi..."`
Example for URL: `"https://example.com/logos/sdp.svg"`

## Theses

The `theses` property in the root section contains an array of theses:

```json
{
  // version, languages, title, parties, etc.
  // ...
  "theses": [{
    "statement": {
      "en": "The Sorting Hat should implement a GDPR-compliant privacy policy.",
      "de": "Der Sprechende Hut soll sich in Zukunft an die DSGVO halten."
    },
    "positions": {
      "spew": {
        "position": "approve",
        "explanation": {
          "en": "Expecto riddikulus aparecium ferula evanesco lacarnum ...",
          "de": "Expecto riddikulus aparecium ferula evanesco lacarnum ..."
        }
      },
      "snape": {
        "position": "reject",
        "explanation": {
          "en": "Lumos amortentia stupefy immobilus patronum. Funnunculus ...",
          "de": "Lumos amortentia stupefy immobilus patronum. Funnunculus ..."
        }
      },
      /* ... more positions for this thesis */
    },
  }, {
    /* ... more theses */
  }],
```

### theses[].title <Badge text="multilingual"/>

A short name, describing what this thesis is about. Two to four words. Will be visible above the
actual statement.

Example: `"Political Education"`

### theses[].statement <Badge text="multilingual"/>

The actual thesis. Choose your words carefully! The thesis needs to be balanced and specific enough.
Explain what should be implemented, but don't be too detailed about how this might be achieved.

Example: `"The government should increase financial support of political education."`

### theses[].positions[]

Every thesis has a `positions` key containing an array of answers:

```json
{
  // thesis object
  // ...
  "spew": { // refers to the `alias` of a party
    "position": "approve",
    "explanation": {
      "en": "Expecto riddikulus aparecium ferula evanesco lacarnum ...",
      "de": "Expecto riddikulus aparecium ferula evanesco lacarnum ..."
    }
  },
  {
    // another position
  }
}
```

#### theses[].positions[].position

The partie's position regarding the respective thesis.

Possible values:

- `approve` – The party approves this thesis.
- `neutral` – The party is neutral to this thesis.
- `reject` – The party rejects this thesis.
- `skip` – The party didn't provide any position.

#### theses[].positions[].explanation <Badge text="multilingual"/>

The parties explanation regarding their position.

Example: `"If all of this comes off as mixed-up to you, that's because it is! ..."`

## Links

The optional `footer-links` property in the root section contains an array of links. These links
will be displayed in the footer and at the bottom of the navigation. Here you can link to your home
page, privacy policy, about page, etc.

```json
{
  // version, languages, title, parties, theses, etc.
  // ...
  "footer-links": [
    {
      "text": {
        "en": "About Hogwarts",
        "de": "Über Hogwarts"
      },
      "href": {
        "en": "https://open-election-compass.com",
        "de": "https://open-election-compass.com/de/"
      }
    },
    {
      "text": {
        "en": "About the Head Boy and Girl",
        "de": "Über die Schülervertretung"
      },
      "href": {
        "en": "https://open-election-compass.com",
        "de": "https://open-election-compass.com/de/"
      }
    }
  ]
```

### footer-links[].text <Badge text="multilingual"/>

The link's caption. Keep it short and precise, 1 – 3 words.

Example: `"Privacy Policy"`

### footer-links[].href <Badge text="multilingual"/>

The actual link as it appears in your browser's address bar. You can provide separate links for
every language in case the linked resource is also multilingual. If not, simply enter the same link
for every language.

Example: `"https://example.com"`