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
	Status bit,
	Picture nvarchar
)

Go




create table Employee(
EmployeeID varchar(20) primary key,
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
Status bit,
Picture nvarchar
)

go
Create table PaymentMethod(
PaymentID varchar(20) primary key,
PaymentName varchar(50)
)
go
create table PaymentStatus(
PaymentStatusID varchar(20),
StatusName varchar(50)
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
create table AnimalType(
TypeID varchar(20) primary key,
Name nvarchar
)

go 
create table Animal(
AnimalID varchar(20) primary key ,
Name nvarchar(50),
TypeID varchar(20) foreign key references AnimalType(TypeID),
Size float,
Age int,
Color varchar(20),
Description nvarchar,
Sex bit,
Picture nvarchar
)

go
create table Aquarium(
AquariumID varchar(20) primary key,
Name nvarchar(20),
Note nvarchar,
Width float,
Height float,
Depth float,
Picture nvarchar
)

go
create table AppointmentDetail(
AppointmentID varchar(20) references Appointment(AppointmentID),
AquariumID varchar(20) references Aquarium(AquariumID),
AnimalID varchar(20) references Animal(AnimalID), 
Duration int,
Price money

)

go
create table PrescriptionMedicine(
MedicineID varchar(20) primary key,
Name varchar(30),
Quantity int,
Note nvarchar
)

go
create table Prescription(
PresID varchar(20) primary key,
AppointmentID varchar(20) unique not null foreign key references Appointment(AppointmentID),
ServiceID varchar(20) foreign key references Service(ServiceID),
ExpiredDate date,
MedicineID varchar(20),
Note nvarchar
)

go
create table Feedback(
FeedbackID varchar(20) primary key,
AppointmentID varchar(20) foreign key references Appointment(AppointmentID),
Description nvarchar,
isAvailable bit
)

go 

create table FAQ(
FaqID varchar(20),
Question nvarchar,
Answer nvarchar
)

go
create table Schedule(
EmployeeID varchar(20) foreign key references Employee(EmployeeID),
Date date,
Status bit,
Note nvarchar,
Slot int ,
SlotNote nvarchar
)