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
create table Appointment_Type(
TypeID varchar(20) primary key, 
Name nvarchar(50),
isActive bit
)

Go

create table Appointment(
AppointmentID varchar(20),
CustomerID varchar(20) foreign key references Customer(CustomerID),
TypeID varchar(20) foreign key  references Appointment_Type(TypeID),

)
