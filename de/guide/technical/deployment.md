# Deployment

Aktuell gibt es mindestens drei Wege einen Wahlkompass aufzusetzen und zu bereitzustellen.

## Option 1: Das einfache, Nur-eine-Datei Setup

Diese Methode ist am einfachsten anzuwenden und eignet sich für Personen ohne tiefere technische
Kenntnisse. Du verwendest die auf dieser Website bereitgestellten Werkzeuge, um eine einzelne
HTML-Datei zu generieren. Diese Datei wird auf deinem Webspace bereitgestellt. Und das war es auch
schon!

### Anforderungen

- **Webspace**: Du benötigst einen Webserver oder einen Webspace bei einem Shared Hosting Anbieter.
  Wenn du derzeit eine Website hast, sollte das kein Problem werden.
- **FTP-Access**: Um die erforderlichen Dateien auf deinen Webspace hochzuladen, benötigst du
  Zugriff auf das Dateisystem des Servers. Wenn du eine:n Webentwickler:in zur Hand hast, kannst du
  ihm/ihr Zugriff auf die Verwaltungsoberfläche deines Webspace-Anbieters gewähren oder nach den
  FTP- oder SFTP-Anmeldeinformationen suchen. Alternativ haben die meisten Anbieter einen
  Dateimanager in ihre Verwaltungsoberfläche eingebettet. Um eine einzelne Datei hochzuladen, reicht
  dies aus.
- **SSH Certificate**: Deine Website sollte über HTTPS zugänglich sein. Dies ist jedoch keine
  strenge Anforderung. Es wird empfohlen und wirkt sich positiv auf die Privatsphäre deiner
  Besucher:innen aus.

### Step-by-step

1. Stelle deine Inhalte zusammen und öffne den
   [Konfigurations-Editor](/configurator/version-1/configuration-editor.html). **Füge deine Inhalte
   entsprechend ein.**
2. Wenn du zufrieden mit deinen Eingaben bist, klicke auf **'Herunterladen' und speicher die
   generierte JSON-Datei** auf deiner Festplatte. Du musst nicht verstehen, wie diese Datei
   funktioniert. Du musst nur wissen, dass sie alle Inhalte enthält, die du in den
   Konfigurations-Editor eingegeben hast. Sorge dafür, dass du diese Datei nicht verlierst – wenn du
   später Änderungen vornehmen musst, kannst du sie wieder im Konfigurations-Editor öffnen.
3. Öffne den [HTML-Generator](/configurator/version-1/html-generator.html), **lade deine JSON-Datei hochund klicke auf 'Generieren'**. Der Download deiner HTML-Datei startet. Diese Datei enthält nun die gesamte Software und deine Inhalte.
4. **Lade die HTML-Datei auf deinen Webspace hoch.** Du kannst sie umbenennen, solange die Dateierweiterung `.html` erhalten bleibt. Du kannst sie beispielsweise in das Stammverzeichnis hochladen und zu "kompass.html" umbenennen. Sie wäre dann unter `example.com/kompass.html` zugänglich. Wenn dies nicht der Fall ist, suche nach einem Verzeichnis mit den Namen `web`, `public` oder `static` und versuche, sie dort abzulegen. Wenn das auch nicht hilft, wende dich an einen Fachmann.

## Option 2: Manuelles, statisches Setup

TODO

## Option 3: Manuelles Setup mit Nuxt.js

TODO