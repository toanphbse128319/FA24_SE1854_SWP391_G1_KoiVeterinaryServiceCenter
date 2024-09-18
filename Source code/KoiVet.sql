
IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter')
BEGIN
	ALTER DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter] SET OFFLINE WITH ROLLBACK IMMEDIATE;
	ALTER DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter] SET ONLINE;
	DROP DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter];
END

GO
CREATE DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]
GO

USE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]

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
create table AnimalProfile(
AnimalProfileID varchar(20) primary key ,
Name nvarchar(50),
TypeID varchar(20) foreign key references AnimalType(TypeID),
Size float,
Age int,
Color varchar(20),
Description nvarchar,
Sex bit,
Picture nvarchar,

)

go
create table PoolProfile(
PoolProfileID varchar(20) primary key,
Name nvarchar(20),
Note nvarchar,
Width float,
Description nvarchar,
Height float,
Depth float,
Picture nvarchar,

)

go
create table BookingDetail(
BookingDetailID varchar(20) primary key,
BookingID varchar(20) foreign key references Booking(BookingID),
ServiceTypeID varchar(20) foreign key references ServiceType(ServiceTypeID),
AnimalProfileID varchar(20) foreign key references AnimalProfile(AnimalProfileID), 
PoolProfileID varchar(20) foreign key references PoolProfile(PoolProfileID),
UnitPrice money,
NoteResult nvarchar,
NoteExamination nvarchar,
AnimalStatusDescription nvarchar,
ConsultDoctor nvarchar,
DrugList nvarchar,
PoolStatusDescription nvarchar,
ConsultTechnician nvarchar,
MaterialList nvarchar,
)

go 
create table FAQ(
FaqID varchar(20),
Question nvarchar,
Answer nvarchar
)

go
create table PostCategory(
PostCategoryID varchar(20) primary key,
Name nvarchar
)

go
create table Post(
PostID varchar(20) primary key,
PostName nvarchar,
PostCategoryID varchar(20) foreign key references PostCategory(PostCategoryID),
Context nvarchar,
)

