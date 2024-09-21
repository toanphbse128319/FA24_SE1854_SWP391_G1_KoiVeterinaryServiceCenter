GO
IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter')
BEGIN
	ALTER DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter] SET OFFLINE WITH ROLLBACK IMMEDIATE;
	ALTER DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter] SET ONLINE;
	Drop DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter];
END

GO
CREATE DATABASE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]
GO

USE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]

Go
Create table Role(
	RoleID varchar(20) primary key,
	Rolename varchar(100) not null
)

Go
Create table Customer(
	CustomerID varchar(20) primary key,
	Email nvarchar(30) unique not null,
	RoleID varchar(20) foreign key references Role(RoleID) not null,
	PhoneNumber varchar(10) unique not null,
	Firstname nvarchar(20),
	Lastname nvarchar(20),
	Sex int ,
	Birthday date,
	Avatar varchar,
	Address nvarchar(100) not null,
	Password varchar(50) not null,
	Status bit not null,
	Picture nvarchar
)

Go




create table Employee(
EmployeeID varchar(20) primary key,
Email nvarchar unique not null,
RoleID varchar(20) foreign key references Role(RoleID) not null,
PhoneNumber varchar(10) unique not null,
Firstname nvarchar(20) not null,
Lastname nvarchar(20),
Sex int ,
Birthday date,
Avatar varchar,
Address nvarchar(100) not null,
Password varchar(50) not null,
Status bit not null,
Picture nvarchar
)

go
Create table PaymentMethod(
PaymentMethodID varchar(20) primary key,
PaymentName varchar(50) not null
)
go
create table PaymentStatus(
PaymentStatusID varchar(20) primary key,
StatusName varchar(50) not null
)

go
create table ServicesCategories(
CategoryID varchar(20) primary key,
Name varchar(100) not null
)

go
create table ServiceType(
ServiceTypeID varchar(20) primary key,
CategoryID varchar(20) foreign key references ServicesCategories(CategoryID) not null,
Name nvarchar(30) not null,
Price money not null,
Description nvarchar
)

go
create table Feedback(
FeedbackID varchar(20) primary key,
Description nvarchar not null,
isAvailable bit not null
)

go
create table SlotCategory(
SlotCategoryID int primary key ,
SlotName nvarchar not null
)

go
create table Schedule(
ScheduleID varchar(20) primary key,
EmployeeID varchar(20) foreign key references Employee(EmployeeID) not null,
Date date not null,
Status bit not null,
Note nvarchar,
SlotCategoryID int foreign key references SlotCategory(SlotCategoryID) not null,
SlotNote nvarchar,
)

go
create table Booking(
BookingID varchar(20) primary key ,
ServiceTypeID varchar(20) foreign key references ServiceType(ServiceTypeID) not null,
CustomerID varchar(20) foreign key references Customer(CustomerID),
EmployeeID varchar(20) foreign key references Employee(EmployeeID),
BookingDate datetime not null,
ExpiredDate date not null,
PaymentMethodID varchar(20) foreign key references PaymentMethod(PaymentMethodID) not null,
PaymentStatusID varchar(20) foreign key references PaymentStatus(PaymentStatusID) not null,
DeliveryMethod nvarchar not null,
VAT varchar,
BookingAddress nvarchar not null,
Distance float not null,
DistanceCost money not null,
TotalServiceCost money not null,
Status nvarchar not null,
FeedbackID varchar(20) foreign key references Feedback(FeedbackID) not null,
ScheduleID varchar(20) foreign key references Schedule(ScheduleID) not null
)

go 
create table AnimalType(
TypeID varchar(20) primary key,
Name nvarchar not null
)

go 
create table AnimalProfile(
AnimalProfileID varchar(20) primary key ,
Name nvarchar(50) not null,
TypeID varchar(20) foreign key references AnimalType(TypeID) not null,
Size float not null,
Age int not null,
Color varchar(20) not null,
Description nvarchar,
Sex int not null,
Picture nvarchar ,
AnimalStatusDescription nvarchar ,
ConsultDoctor nvarchar ,
DrugList nvarchar ,
)

go
create table PoolProfile(
PoolProfileID varchar(20) primary key,
Name nvarchar(20) not null,
Note nvarchar,
Width float not null,
Description nvarchar ,
Height float not null,
Depth float not null,
Picture nvarchar ,
PoolStatusDescription nvarchar,
ConsultTechnician nvarchar,
MaterialList nvarchar,
)

go
create table BookingDetail(
BookingDetailID varchar(20) primary key,
BookingID varchar(20) foreign key references Booking(BookingID) not null,
ServiceTypeID varchar(20) foreign key references ServiceType(ServiceTypeID) not null,
AnimalProfileID varchar(20) foreign key references AnimalProfile(AnimalProfileID) not null, 
PoolProfileID varchar(20) foreign key references PoolProfile(PoolProfileID) not null,
UnitPrice money not null,
NoteResult nvarchar,
NoteExamination nvarchar,
)

go 
create table FAQ(
FaqID varchar(20) primary key,
Question nvarchar not null,
Answer nvarchar not null
)

go
create table PostCategory(
PostCategoryID varchar(20) primary key,
Name nvarchar not null,
)

go
create table Post(
PostID varchar(20) primary key,
PostName nvarchar not null,
PostCategoryID varchar(20) foreign key references PostCategory(PostCategoryID) not null,
Context nvarchar not null,
)

