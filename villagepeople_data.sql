insert into alue (nimi) values ("Talma"), ("Himos"), ("Sappee"), ("Ruka"), ("Yllas"), ("Levi"), ("Pallas"), ("Saariselka");

insert into posti (postinro, toimipaikka) 
values (12100, "Espoo"), (14240, "Sipoo"), (10820, "Hanko"), (10100, "Helsinki"), (25440, "Hyvinkaa"), (22430, "Kirkkonummi"), (24660, "Mantsala"),
 (36500, "Porvoo"), (15170, "Lahti"), (33720, "Tampere"), (78200, "Varkaus"), (70100, "Kuopio"), (98600, "Salla"), (93830, "Ruka"),
 (42100, "Jamsa"), (36450, "Salmentaka"), (95980, "Kolari"), (99130, "Kittila"), (99330, "Pallastunturi"), (99830, "Saariselka");

insert into mokki (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu) values
(1, 14240, "TalmaCottage", "Laskukuja 77", 240, "Rinteiden alla, ski-in/ski-out. Remontoitu 2018", 8, "3 huonetta, keittio, sauna, parveke, palju, taulu-tv, kuivauskomero"),
(2, 42100, "Himos Star 7", "Jyvaskylantie 8", 100, "Hieno mokki, jarven rannalla", 4, "2 huonetta, keittio, sauna, terassi, oma vene"),
(3, 36450, "Mohkontakki", "Salmentaantie 1", 88, "Peruskorjattu -99", 2, ""),
(4, 93830, "Rukan kuksa", "Rukavaarantie 4", 150, "12 km Rukalta, rauhallisella paikalla jankhalla, itikat syo kesalla", 6, ""),
(5, 95980, "Saaga", "Yllasjarventie 9", 120, "Eturinteiden vieressa, kavelymatka Gondolille", 4, "1 huone, keittokulmaus, tuuletusparveke, kuivauskomero"),
(6, 99130, "Vinkkari", "Muoniontie 76", 145, "4 km Levin keskustasta, ski-bussi menee lahelta", 5, "makuuhuone, olohuoneessa vuodeshova, keittio, sauna"),
(7, 99330, "Sioskuru", "Hetantie 99", 450, "Rauhallinen iso mokki keskella ei mitaan", 15, "4 huonetta, keittio, saunaosasto: poreamme, terassi: palju; grilli, kota, laituri, vene"),
(8, 99830, "Poromokki", "Rovanimentie 12", 45, "Vanha poromiesten mokki", 3, "tupa, sauna, sahkoistamaton, vesi kaivosta");

insert into asiakas (postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) 
values (12100, "Harri", "Hursten", "Olarinkatu 77", "harski@gmail.com", "0405215023"),
(36500, "Maija", "Mikkola", "Vaarakatu 8", "mikkis@outlook.com", "0503265651"),
(42100, "Matti", "Muikku", "Tampereentie 22", "masamu@gmail.com", "0445536622"),
(95980, "Seija", "Sailas", "Tunturitue 92", "seija.s@hotmail.com", "0502020213");

insert into varaus (asiakas_id, mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm)
values (1, 1, NOW(), NOW(), NOW(), NOW());

insert into palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv)
values (1, "Paljuvuokra", 1, "3h vuokra", 300, 24), 
(2, "Suksivuokra", 1, "6h vuokra", 35, 24), 
(3, "Moottorikelkka", 1, "3h vuokra", 160, 24), 
(4, "Rekiajelu", 1, "Rekiajelu Huskyjen kanssa n. 2h, sis lounaan", 600, 24), 
(5, "Lumikenkäily oppaan kanssa", 1, "Retken kesto 4h, upeat tunturimaisemat", 250, 24);

insert into varauksen_palvelut (varaus_id, palvelu_id, lkm)
values (3, 5, 2), (8, 5, 1);


SET SQL_SAFE_UPDATES = 0;
delete from mokki;
delete from posti;

