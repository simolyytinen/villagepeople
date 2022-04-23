-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema villagepeople
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema villagepeople
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `villagepeople` DEFAULT CHARACTER SET utf8 ;
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
  `laskutus_pvm` DATETIME NOT NULL,
  `erapaiva` DATETIME NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
