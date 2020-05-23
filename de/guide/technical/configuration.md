# Konfiguration

Der Wahlkompass wird im JSON-Format konfiguriert. Die Konfigurationsdatei enthält alle Thesen,
Antworten, Parteien, Logos, Übersetzungen für beliebig viele Sprachen und weitere Einstellungen.

::: tip Kennst du schon den Konfigurations-Editor?
Du kannst die Konfiguration von Hand schreiben, oder du kannst unseren Konfiguratinos-Editor
ausprobieren. Der Konfigurator generiert JSON Dateien in dem Format das Wahlkompasses. Dies ist
besonders nützlich für Menschen ohne technischen Hintergrund.

[:point_right: Konfigurations-Editor](/configurator/version-1/configuration-editor.html)
:::

## Version

Das Schema für Konfigurationsdateien ist versioniert. Aktuell ist Version 1. Damit die Version einer
Konfigurationsdatei leicht bestimmt werden kann, gibt es ein entsprechendes Attribut:

```json
{
  "version": "1"
}
```

## Mehrsprachigkeit

Eine einzelne Konfigurationsdatei enthält sämtliche Sprachen, die der Wahlkompass anbieten soll. In
der Konfiguration wird daher zunächst die Auswahl an Sprachen festgelegt.

```json
{
  // Die folgende Zeile kommt aus dem vorherigen Beispiel! Alle Attribute gehören
  // in dasselbe JSON- Objekt. Wir werden jedoch in den restlichen Beispielen auf
  // diese verzichten, um es kurz zu halten.
  "version": "1",
  "languages": [{
    "name": "Deutsch",
    "code": "de"
  }, {
    "name": "English",
    "code": "en"
  }]
}
```

Als `name` wird der Name der Sprache in der Sprache selbst verwendet.

Als `code` wird ein Sprachcode, bestehend aus zwei Kleinbuchstaben, wie in der Norm
<a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO 639-1</a>
beschrieben, verwendet. Beispiel: `"en"` für Englisch, `"de"` für Deutsch, etc.

Inhaltliche Elemente, wie Thesen und Antworten, können nun in einem Unterobjekt übersetzt werden.
Wie das geht, siehst du im Beispiel des nächsten Abschnitts. Alle Attribute für die ein Objekt mit
Übersetzungen erwartet wird, sind als 'mehrsprachig' markiert.

## Allgemeine Informationen

Auf der obersten Ebene enthält die Konfiguration allgemeine Informationen wie Titel und Untertitel,
welche im Startbereich des Wahlkompasses angezeigt werden.

```json
{
  // version, languages, etc.
  // ...
  "title": {
    "de": "Hogwarts Schülervertretung 1993",
    "en": "Hogwarts Head Boy and Girl Elections 1993"
  },
  "subtitle": {
    "de": "Ein Wahlkompass von Hermine Granger",
    "en": "An election compass by Hermione Granger"
  },
  "introduction": {
    "heading": {
      "de": "Willkommen zum Wahlkompass",
      "en": "Welcome to the Election Compass"
    },
    "text": {
      "de": "Alle 5 teilnehmenden Studierenden haben die 10 Thesen des Wahlkompasses ...",
      "en": "All 5 contending students have answered the 10 theses of the Election Compass ..."
    }
  }
}
```

### title <Badge text="mehrsprachig"/>

Der Titel der Wahl. Wird im Startabschnitt als `h1`-Element angezeigt. Sollte präzise sein und nicht
zu lang.

beispiel: `"Allgemeine Wahl der Vereinten Nationen 2050"`

### subtitle <Badge text="mehrsprachig"/>

Der Untertitel, sichtbar im Startabschnitt ist. Sollte, zum Beispiel, die verantwortliche
Organisation erwähnen.

Beispiel: `"Dieser Wahlkompass wird bereitgestellt von deiner örtlichen Demokratie-Unterstützungsgruppe."`

### introduction.heading <Badge text="mehrsprachig"/>

Unterhalb des Startbereiches folgt eine kurze Einleitung, welche mit einer Überschrift beginnt.
Verwende etwa 3 - 5 Grußworte.

Beispiel: `"Willkommen zum Wahlkompass"`

### introduction.text <Badge text="mehrsprachig"/>

Gib eine kurze Einleitung in deinen Wahlkompass. Erläutere an dieser Stelle nicht die Bedienung,
sondern erkläre deinen Besucher:innen, wer du bist und warum du das tust, wieviele Parteien
teilnehmen, etc. Ungefähr 2 - 5 Sätze.

Beispiel: `"Alle 9 zur Wahl aufgestellten Parteien haben an diesem Wahlkompass ..."`

## Parties (Parteien)

Das `parties` Attribut auf der obersten Ebene enthält die Liste (Array) der Parteien:

```json
{
  // version, languages, title, subtitle, etc.
  // ...
  "parties": [{
    "alias": "spew",
    "name": {
      "de": "Bund für Elfenrechte",
      "en": "Society for the Promotion of Elvish Welfare"
    },
    "short": {
      "de": "B.ELFE.R",
      "en": "SPEW"
    },
    "description": {
      "de": "Die Bund für Elfenrechte wurde 1991 gegründet und hat seither große Anstrengungen unternommen um das Leben derer zu verbessern, die uns dienen.",
      "en": "The Society for the Promotion of Elvish Welfare was founded in 1991 and has since put great efforts into improving the lifes of those in our service."
    },
  }, {
    // another party
  }],
}
```

### parties[].name <Badge text="mehrsprachig"/>

Der vollständige Name der Partei, ohne Abkürzungen.

Beispiel: `"Super Demokratische Partei"`

### parties[].short <Badge text="mehrsprachig"/>

Das Kürzel oder der kurze Name der Partei, wie er für gewöhnlich in Logos und Diagrammen auftaucht.

Example: `"SDP"`

### parties[].alias

Die ID der Partei, für technische Zwecke. Verwende hier einfach die Abkürzung der Partei in
Kleinbuchstaben, ohne Leerzeichen, und stelle sicher, dass sie einzigartig ist (keine zwei Parteien
dürfen dieselbe ID verwenden). Die ID kommt in den Thesen-Objekten zum Einsatz um die Positionen den
entsprechenden Parteien zuzuordnen.

Beispiel: `"sdp"`

### parties[].description <Badge text="mehrsprachig"/>

Eine kurze Beschreibung der Geschichte oder der politischen Ausrichtung der Partei.

Beispiel: `"Die SDP wurde im Jahr 2000 gegründet und ist eine sehr coole Partei. Wählt sie. Sie ist sehr gut."`

<small>(Das ist natürlich ein furchtbares Beispiel :wink:)</small>

### parties[].logo <Badge text="optional"/>

Das Logo der Partei. Diese Zeichenkette wird an das `src`-Attribut des `img`-Elements übergeben. Du
kannst daher eine URL oder eine Base64 kodierten Datei verwenden. Der Einfachheit halber ist dies
auch, was der Konfigurations-Editor tut. Welche Variante du auch wählst, stelle sicher, dass die
Dateien so klein wie möglich sind, kompatibel mit allen Browsern und vektorbasiert, wo immer
möglich. SVG-Dateien liefern die besten Ergebnisse, PNG folgt an zweiter Stelle und JPG an dritter.
Die Grafiken sollten die folgenden Maße haben: 400 x 400 px.

Beispiel für Base64: `"data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQi..."`
Beispiel für URL: `"https://example.com/logos/sdp.svg"`

## Theses (Thesen)

Das `theses` Attribut auf der obersten Ebene enthält die Liste (Array) an Thesen:

```json
{
  // version, languages, title, parties, etc.
  // ...
  "theses": [{
    "statement": {
      "de": "Der Sprechende Hut soll sich in Zukunft an die DSGVO halten.",
      "en": "The Sorting Hat should implement a GDPR-compliant privacy policy."
    },
    "positions": {
      "spew": {
        "position": "approve",
        "explanation": {
          "de": "Expecto riddikulus aparecium ferula evanesco lacarnum ...",
          "en": "Expecto riddikulus aparecium ferula evanesco lacarnum ..."
        }
      },
      "snape": {
        "position": "reject",
        "explanation": {
          "de": "Lumos amortentia stupefy immobilus patronum. Funnunculus ...",
          "en": "Lumos amortentia stupefy immobilus patronum. Funnunculus ..."
        }
      },
      /* ... weitere Positionen zu dieser These */
    },
  }, {
    /* ... weitere Thesen */
  }],
```

### theses[].title <Badge text="mehrsprachig"/>

Ein kurzer Name der das Themengebiet der These beschreibt. Zwei bis vier Wörter. Wird direkt
oberhalb der eigentlichen These angezeigt.

Beispiel: `"Politische Bildung"`

### theses[].statement <Badge text="mehrsprachig"/>

Die eigentliche These. Wähle deine Worte mit Bedacht! Eine These muss ausgewogen und präzise sein.
Erkläre, was umgesetzt werden soll, aber gehe nicht ins Detail, wie dies erreicht werden könnte.

Beispiel: `"Die Bundesregierung soll politische Bildung stärker finanziell unterstützen."`

### theses[].positions[]

Jede These hat eine Liste (Objekt) an Positionen (`positions`) mit Antworten der Parteien:

```json
{
  // thesis-Objekt
  // ...
  "spew": { // Entspricht der ID / dem `alias` Attribut einer Partei
    "position": "approve",
    "explanation": {
      "de": "Expecto riddikulus aparecium ferula evanesco lacarnum ...",
      "en": "Expecto riddikulus aparecium ferula evanesco lacarnum ..."
    }
  },
  {
    // another position
  }
}
```

#### theses[].positions[].position

Die Position der Partei bzgl. der jeweiligen These.

Mögliche Werte:

- `approve` – Die Partei stimmt dieser These zu.
- `neutral` – Die Partei ist zu dieser These neutral.
- `reject` – Die Partei lehnt diese These ab.
- `skip` – Die Partei hat zu dieser These keine Position zur Verfügung gestellt.

#### theses[].positions[].explanation <Badge text="mehrsprachig"/>

Die Antwort der Partei zu dieser These.

Beispiel: `"Wenn all dies für dich durcheinander erscheint, liegt das daran, dass es so ist! ..."`