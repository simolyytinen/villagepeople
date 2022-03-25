-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema villagepeople
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema villagepeople
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `villagepeople` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema tilaus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tilaus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tilaus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `villagepeople` ;

-- -----------------------------------------------------
-- Table `villagepeople`.`alue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`alue` (
  `alue_id` INT NOT NULL AUTO_INCREMENT,
  `nimi` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`alue_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`posti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`posti` (
  `postinro` CHAR(5) NOT NULL,
  `toimipaikka` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`postinro`),
  UNIQUE INDEX `postinro_UNIQUE` (`postinro` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`asiakas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`asiakas` (
  `asiakas_id` INT NOT NULL AUTO_INCREMENT,
  `postinro` CHAR(5) NOT NULL,
  `etunimi` VARCHAR(20) NOT NULL,
  `sukunimi` VARCHAR(40) NOT NULL,
  `lahiosoite` VARCHAR(40) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `puhelinnro` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`asiakas_id`),
  INDEX `fk_asiakas_posti1_idx` (`postinro` ASC) VISIBLE,
  CONSTRAINT `fk_asiakas_posti`
    FOREIGN KEY (`postinro`)
    REFERENCES `villagepeople`.`posti` (`postinro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`mokki`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`mokki` (
  `mokki_id` INT NOT NULL AUTO_INCREMENT,
  `alue_id` INT NOT NULL,
  `postinro` CHAR(5) NOT NULL,
  `mokkinimi` VARCHAR(45) NOT NULL,
  `katuosoite` VARCHAR(45) NOT NULL,
  `hinta` DOUBLE(8,2) NOT NULL,
  `kuvaus` VARCHAR(150) NOT NULL,
  `henkilomaara` INT NOT NULL,
  `varustelu` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`mokki_id`),
  INDEX `fk_mokki_alue1_idx` (`alue_id` ASC) VISIBLE,
  INDEX `fk_mokki_posti1_idx` (`postinro` ASC) VISIBLE,
  CONSTRAINT `fk_mokki_alue`
    FOREIGN KEY (`alue_id`)
    REFERENCES `villagepeople`.`alue` (`alue_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_mokki_posti`
    FOREIGN KEY (`postinro`)
    REFERENCES `villagepeople`.`posti` (`postinro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`varaus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`varaus` (
  `varaus_id` INT NOT NULL AUTO_INCREMENT,
  `asiakas_id` INT NOT NULL,
  `mokki_id` INT NOT NULL,
  `varattu_pvm` DATETIME NOT NULL,
  `vahvistus_pvm` DATETIME NOT NULL,
  `varattu_alkupvm` DATETIME NOT NULL,
  `varattu_loppupvm` DATETIME NOT NULL,
  PRIMARY KEY (`varaus_id`),
  INDEX `fk_varaus_mokki1_idx` (`mokki_id` ASC) VISIBLE,
  INDEX `fk_varaus_asiakas1_idx` (`asiakas_id` ASC) VISIBLE,
  CONSTRAINT `fk_varaus_asiakas_id`
    FOREIGN KEY (`asiakas_id`)
    REFERENCES `villagepeople`.`asiakas` (`asiakas_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_varaus_mokki_id`
    FOREIGN KEY (`mokki_id`)
    REFERENCES `villagepeople`.`mokki` (`mokki_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`lasku`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`lasku` (
  `lasku_id` INT NOT NULL AUTO_INCREMENT,
  `varaus_id` INT NOT NULL,
  `summa` DOUBLE(8,2) NOT NULL,
  `alv` DOUBLE(8,2) NOT NULL,
  PRIMARY KEY (`lasku_id`),
  INDEX `fk_lasku_varaus1_idx` (`varaus_id` ASC) VISIBLE,
  CONSTRAINT `fk_lasku_varaus`
    FOREIGN KEY (`varaus_id`)
    REFERENCES `villagepeople`.`varaus` (`varaus_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`palvelu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`palvelu` (
  `palvelu_id` INT NOT NULL AUTO_INCREMENT,
  `alue_id` INT NOT NULL,
  `nimi` VARCHAR(40) NOT NULL,
  `tyyppi` INT NOT NULL,
  `kuvaus` VARCHAR(255) NOT NULL,
  `hinta` DOUBLE(8,2) NOT NULL,
  `alv` DOUBLE(8,2) NOT NULL,
  PRIMARY KEY (`palvelu_id`),
  INDEX `fk_palvelu_alue1_idx` (`alue_id` ASC) VISIBLE,
  CONSTRAINT `fk_palvelu_alue`
    FOREIGN KEY (`alue_id`)
    REFERENCES `villagepeople`.`alue` (`alue_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `villagepeople`.`varauksen_palvelut`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `villagepeople`.`varauksen_palvelut` (
  `varaus_id` INT NOT NULL,
  `palvelu_id` INT NOT NULL,
  `lkm` INT NOT NULL,
  PRIMARY KEY (`varaus_id`, `palvelu_id`),
  INDEX `fk_varaus_has_palvelu_palvelu1_idx` (`palvelu_id` ASC) VISIBLE,
  INDEX `fk_varaus_has_palvelu_varaus1_idx` (`varaus_id` ASC) VISIBLE,
  CONSTRAINT `fk_varauksen_palvelut_palveluid`
    FOREIGN KEY (`palvelu_id`)
    REFERENCES `villagepeople`.`palvelu` (`palvelu_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_varauksen_palvelut_varausid`
    FOREIGN KEY (`varaus_id`)
    REFERENCES `villagepeople`.`varaus` (`varaus_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `tilaus` ;

-- -----------------------------------------------------
-- Table `tilaus`.`asiakas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tilaus`.`asiakas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nimi` VARCHAR(45) NULL DEFAULT NULL,
  `kayntiosoite` VARCHAR(45) NULL DEFAULT NULL,
  `postinumero` VARCHAR(45) NULL DEFAULT NULL,
  `postitoimipaikka` VARCHAR(45) NULL DEFAULT NULL,
  `status` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tilaus`.`tilaus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tilaus`.`tilaus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tilausnumero` VARCHAR(45) NULL DEFAULT NULL,
  `tilauspvm` DATETIME NULL DEFAULT NULL,
  `toimituspvm` DATETIME NULL DEFAULT NULL,
  `asiakasid` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tilaus_asiakas_idx` (`asiakasid` ASC) VISIBLE,
  CONSTRAINT `fk_tilaus_asiakas`
    FOREIGN KEY (`asiakasid`)
    REFERENCES `tilaus`.`asiakas` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `tilaus`.`tilausrivi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tilaus`.`tilausrivi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tilausid` INT NULL DEFAULT NULL,
  `tuote` VARCHAR(45) NULL DEFAULT NULL,
  `maara` INT NULL DEFAULT NULL,
  `yksikko` VARCHAR(45) NULL DEFAULT NULL,
  `huomautus` VARCHAR(500) NULL DEFAULT NULL,
  `yksikkohinta` DOUBLE NULL DEFAULT NULL,
  `veroprosentti` DOUBLE NULL DEFAULT NULL,
  `toimitettu` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tilaus_tilausrivi_idx` (`tilausid` ASC) VISIBLE,
  CONSTRAINT `fk_tilausrivi_tilaus`
    FOREIGN KEY (`tilausid`)
    REFERENCES `tilaus`.`tilaus` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
values (), (), (), (), (), (), (), (), ();

insert into palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv)
values (1, ""), (2, ""), (3, ""), (4, ""), (5, ""), (6, ""), (7, ""), (8, "");

insert into lasku (varaus_id, summa, alv)
values (), (), (), (), ();

insert into varauksen_pavelut (varaus_id, palvelu_id, lkm)
values (), (), (), (), ();
