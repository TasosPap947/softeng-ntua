
create table Station (
  stationID varchar(4) not null,
  stationProvider varchar(30) not null,
  stationName varchar(50) not null,

  primary key (stationID)
);


create table Vehicle (
  vehicleID varchar(12) not null,
  licenseYear int(4),

  primary key (vehicleID)
);


create table Tag (
  tagID varchar(9),
  tagProvider varchar(30),

  primary key (tagID)
);


create table Passes (
  passID varchar(10) not null,
  DateAndTime timestamp not null,
  charge numeric(5,2) not null,
  TagID varchar(9) not null,
  VehiclevehicleID varchar(12) not null,
  StationstationID varchar(4) not null,

  primary key (passID),

  foreign key (VehiclevehicleID) references Vehicle(vehicleID)
    on delete restrict
    on update cascade

  foreign key (StationstationID) references Station(stationID)
    on delete restrict
    on update cascade
);

create table Has (
  VehiclevehicleID varchar(12) not null,
  TagtagID varchar(9) not null,

  foreign key (VehiclevehicleID) references Vehicle(vehicleID)
    on delete restrict
    on update cascade

  foreign key (TagtagID) references Tag(tagID)
    on delete restrict
    on update cascade

);
