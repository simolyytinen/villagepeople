## villagepeople
Tämä projekti oli osa Savonia Code Academy 3 (SCA3) koodarikoulutusta ja se on tehty keväällä 2022. Projekti on tehty kolmen hengen ryhmässä yhdessä VillePa (Ville Paasonen) ja Sinpaix (Sinna Oksman) kanssa.

## Yleistä
Harjoitustyössä vastattiin tarjouspyyntöön toteuttaa matkailualan yritykselle majoitus -ja aktiviteettien varaamiseen tarkoitettu palvelu. Palvelussa piti pystyä kirjautumaan/rekisteröitymään asiakkaana sekä admin-käyttäjänä. Käyttäjän rekisteröinti-lomakkeessa ei kysytä salasanaa vaan sovelluksessa käytetään salasanana käyttäjän etunimeä. Admin käyttäjän tunnus sekä salasana on "admin". Palvelussa piti pystyä asiakkaana varaamaan majoituksia sekä aktiviteetteja ja tarkastelemaan omia tietoja. Admin -käyttäjänä piti pystyä hallinnoimaan (GRUD -toiminnot) käyttäjiä, varauksia, mökkejä sekä aktiviteetteja. Admin -käyttäjän piti pystyä myös muodostamaan ja tarkastelemaan laskuja sekä ajamaan muutamia erilaisia raportteja.

## Frontend
Projektin frontend rakennettiin käyttäen React.js ja hyödyntäen Material UI -komponenttikirjastoa. Reactiin päädyttiin sen takia, kun projektia edeltänyt kevät oli käytetty javascriptiä sekä keskitytty Reactiin. Projektissa käytettiin muun muassa useState-hookia, React Routeria, Context APIa sekä useEffect-hookia kun kommunikoitiin backendin kanssa (REST-rajapinta).

Selainpään sovelluksen saa käyntiin kehitysympäristöön ajamalla seuraavat komennot projektin "client" hakemistossa:
- "npm install"
- "npm start"

## Backend
Projektin backend rakennettiin Node.js hyödyntäen Express.js kirjastoa. Backend rakennettiin toimimaan REST-rajapintana, joka käsittelee MySQL-tietokannassa olevaa dataa. Tähän päädyttiin, koska harjoitustyötä edeltäneenä keväänä oli harjoiteltu REST-rajapintojen tekoa Node.js avulla. Ennen sovelluksen ajamista täytyy muokata tietokannan käyttäjätunnus sekä salasana "/server/db/*" kansiossa oleviin tiedostoihin, joissa määritellään tietokantayhteys.

Backend sovelluksen saa käyntiin kehitysympäristöön ajalla seuraavat komennot projektin "server" hakemistossa:
- "npm install"
- "npm start"

## Tietokanta
Projekti käyttää lokaalisti ajettavaa MySQL-tietokantaa. Ennen sovelluksen ajamista täytyy tietokanta olla muodostettu. Tietokannan salasana ja käyttäjätunnus täytyy muokata backendiin (kts. kohta "Backend"). Tietokannan muodostamisen sql-lause on projektin hakemistossa "villagepeople.sql" sekä esimerkkidataa lisäävä sql-lause "villagepeople_data.sql".
