drop database db_tolls;
create database db_tolls;
use db_tolls;

create table Station (
  stationID varchar(4) not null,
  stationProvider varchar(30) not null,
  stationName varchar(50) not null,

  primary key (stationID)
);


create table Vehicle (
  vehicleID varchar(12) not null,
  licenseYear int(4) not null,
  tagID varchar(9) not null,
  tagProvider varchar(30) not null,

  primary key (vehicleID)
);


create table Passes (
  passID varchar(10) not null,
  DateAndTime varchar(20) not null,
  charge numeric(5,2) not null,
  VehiclevehicleID varchar(12) not null,
  StationstationID varchar(4) not null,

  primary key (passID),

  foreign key (VehiclevehicleID) references Vehicle(vehicleID)
    on delete restrict
    on update cascade,

  foreign key (StationstationID) references Station(stationID)
    on delete restrict
    on update cascade
);

#μετά το γέμισμα των υπόλοιπων πινάκων, που έγινε με το εργαλείο Wizard του MySQL Workbench
SET GLOBAL local_infile=1;
LOAD DATA LOCAL INFILE
'~/Desktop/passes.csv'
INTO TABLE Passes
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(passID, StationstationID, VehiclevehicleID, @a, charge)
SET DateAndTime = str_to_date(@a, '%c/%e/%Y %k:%i');
