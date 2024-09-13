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
PaymentMethodID varchar(20) primary key,
PaymentName varchar(50)
)
go
create table PaymentStatus(
PaymentStatusID varchar(20) primary key,
StatusName varchar(50)
)

go
create table ServicesCategories(
CategoryID varchar(20) primary key,
Name varchar(100)
)

go
create table ServiceType(
ServiceTypeID varchar(20) primary key,
CategoryID varchar(20) foreign key references ServicesCategories(CategoryID),
Name nvarchar(30),
Price money,
Description nvarchar
)

go
create table Feedback(
FeedbackID varchar(20) primary key,
Description nvarchar,
isAvailable bit
)

go
create table SlotCategory(
SlotCategoryID int primary key ,
SlotName nvarchar
)

go
create table Schedule(
ScheduleID varchar(20) primary key,
EmployeeID varchar(20) foreign key references Employee(EmployeeID),
Date date,
Status bit,
Note nvarchar,
SlotCategoryID int foreign key references SlotCategory(SlotCategoryID),
SlotNote nvarchar,
)

go
create table Booking(
BookingID varchar(20) primary key ,
ServiceTypeID varchar(20) foreign key references ServiceType(ServiceTypeID),
CustomerID varchar(20) foreign key references Customer(CustomerID),
EmployeeID varchar(20) foreign key references Employee(EmployeeID),
BookingDate datetime,
ExpiredDate date,
PaymentMethodID varchar(20) foreign key references PaymentMethod(PaymentMethodID),
PaymentStatusID varchar(20) foreign key references PaymentStatus(PaymentStatusID),
DeliveryMethod nvarchar,
Amount money,
VAT varchar,
VATAmount money,
TotalAmount money,
Status nvarchar,
FeedbackID varchar(20) foreign key references Feedback(FeedbackID),
ScheduleID varchar(20) foreign key references Schedule(ScheduleID)
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
Description nvarchar,
Height float,
Depth float,
Picture nvarchar
)

go
create table BookingDetail(
BookingDetailID varchar(20) primary key,
BookingID varchar(20) foreign key references Booking(BookingID),
ServiceID varchar(20) foreign key references ServiceType(ServiceTypeID),
AnimalID varchar(20) foreign key references Animal(AnimalID), 
AquariumID varchar(20) foreign key references Aquarium(AquariumID),
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
create table ExaminationResult(
ExamResultID varchar(20) primary key,
BookingDetailID varchar(20) foreign key references BookingDetail(BookingDetailID),
BookingID varchar(20) foreign key references Booking(BookingID),
ServiceTypeID varchar(20) foreign key references ServiceType(ServiceTypeID),
ExpiredDate date,
MedicineID varchar(20) foreign key references PrescriptionMedicine(MedicineID),
Note nvarchar,
)




go 

create table FAQ(
FaqID varchar(20),
Question nvarchar,
Answer nvarchar
)



