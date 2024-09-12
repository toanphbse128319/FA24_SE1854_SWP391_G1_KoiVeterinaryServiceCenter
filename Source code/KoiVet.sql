IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'koi vet')
BEGIN
	ALTER DATABASE [koi vet] SET OFFLINE WITH ROLLBACK IMMEDIATE;
	ALTER DATABASE [koi vet] SET ONLINE;
	DROP DATABASE [koi vet];
END

GO
CREATE DATABASE [koi vet]
GO

USE [koi vet]

Go
Create table Role(
	RoleID varchar(20) primary key,
	Rolename varchar(100)
)

Go
Create table Customer(
	CustomerID varchar(20) primary key,
	Email nvarchar(30) unique not null,
	RoleID varchar(20) foreign key references Role(RoleID),
	PhoneNumber varchar(10) unique not null,
	Firstname nvarchar(20),
	Lastname nvarchar(20),
	Sex int ,
	Birthday date,
	Avatar varchar,
	Address nvarchar(100),
	Password varchar(50),
	Status bit
)

Go




create table Veterinarian(
VeterinarianID varchar(20) primary key,
Email nvarchar unique not null,
RoleID varchar(20) foreign key references Role(RoleID),
PhoneNumber varchar(10) unique not null,
Firstname nvarchar(20),
Lastname nvarchar(20),
Sex int ,
Birthday date,
Avatar varchar,
Address nvarchar(100),
Password varchar(50),
Status bit
)

go
Create table Payment(
PaymentID varchar(20) primary key,
PaymentMethod varchar(50)
)
go

create table ServicesCategories(
CategoryID varchar(20) primary key,
Name varchar(100)
)

go
create table Service(
ServiceID varchar(20) primary key,
CategoryID varchar(20) foreign key references ServicesCategories(CategoryID),
Thumbnail varchar,
Name nvarchar(30),
Price money,
Description nvarchar
)
go

create table TimeSlot(
VeterinarianID varchar(20) foreign key references Veterinarian(VeterinarianID),
Date date,
SlotID int primary key,
Status bit ,
Note varchar(100)
)


go
create table Appointment(
AppointmentID varchar(20) primary key,
CustomerID varchar(20) foreign key references Customer(CustomerID),
VeterinarianID varchar(20) foreign key references Veterinarian(VeterinarianID),
AppointmentDate date,
ExpiredDate date,
TotalPrice money,
PaymentID varchar(20) foreign key references Payment(PaymentID),
ServiceID varchar(20) foreign key references Service(ServiceID),
SlotID int foreign key references TimeSlot(SlotID), 
Status int 
)

go
create table AppointmentDetail(
AppointmentID varchar(20) references Appointment(AppointmentID),
AquariumID varchar(20) references Aquarium(AquariumID),
AnimalID varchar(20) references Animal(AnimalID), 
Duration int,
Price money

)
