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
  licenseYear int(4),
  tagID varchar(9),
  tagProvider varchar(30),

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
