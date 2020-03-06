# Configuration

Open Election Compass is configured using JSON files. Every JSON contains all information needed in
a single language. To support multiple languages, you simply create multiple JSON files.

::: tip Did we mention the Configurator?
You can write the configuration from scratch, and there are situations, where you might have to. But
you can also give our Configurator a try. It will generate and edit JSON files in our specific
schema for you. This is especially useful for anyone with less technical experience.

[:point_right: Configurator](/configurator/version-1/language-file.html)
:::

## General Information

On the root level, the JSON files contain general information, like the title and subtitle, as
displayed in the start section of every election compass.

```json
{
  "title": "Hogwarts Head Boy and Girl Elections 1993",
  "subtitle": "An election compass by Hermione Granger",
  "language": "en"
}
```

### title

The title of the election. Will be displayed as a `h1` element in the start section. Should be
precise and not too long.

Example: `"General Election of the United Nations 2050"`

### subtitle

The subtitle, visible in the start section. Should, for example, mention the responsible
organization.

Example: `"This election compass is provided by your local democracy support group."`

### language

A two letter, lowercase language code as defined by
<a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO 639-1</a>.

Example: `"en"` for English, `"de"` for German, etc.

## Parties

The `parties` property in the root section contains an array of parties:

```json
{
  // root object (title, etc.)
  // ...
  "parties": [
    {
      "alias": "spew",
      "name": "Society for the Promotion of Elvish Welfare",
      "short": "SPEW",
      "description": "The Society for the Promotion of Elvish Welfare was founded in 1991 and has since put great efforts into improving the lifes of those in our service.",
    },
    {
      // another party
    }
  ],
}
```

### name

The full name of the party, without abbrevations.

Example: `"Super Democratic Party"`

### short

The abbrevation or short name of the party, as it is usually used in logos, charts, etc.

Example: `"SCP"`

### alias

The identifier of the party, used for technical purposes. Simply enter the abbrevation of the party
name in small letters and make sure it is unique (no two parties may have the same identifier). The
identifier is used in the theses objects to map the positions to the respective parties.

Example: `"scp"`

### description

A small description of the history or the political direction of this party.

Example: `"The SCP was established in 2000 and is a very cool party. Vote for it. It is very good."`

<small>(Of course, this is a terrible example :wink:)</small>

### logo (optional)

The party's logo. This string will be passed to the `src` attribute of an `img` element. You can
therefore use an URL or a Base64 encoded file. For simplicity, this is what the configurator will
do. Whichever you choose, make sure the files are as small as possible, compatible with all browsers
and vector based whenever possible. SVG files work best, PNG is second and JPG is third. The images
should have the following dimensions: 400 x 400 px.

Example for Base64: `"data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQi..."`
Example for URL: `"https://example.com/logos/scp.svg"`