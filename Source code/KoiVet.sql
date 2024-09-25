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
GO

CREATE TABLE Role(
    RoleID varchar(20) PRIMARY KEY,
    Rolename varchar(100) NOT NULL
)
GO

CREATE TABLE Customer(
    CustomerID varchar(20) PRIMARY KEY,
    Email nvarchar(30) UNIQUE NOT NULL,
    RoleID varchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
    PhoneNumber varchar(10) UNIQUE NOT NULL,
    Firstname nvarchar(20),
    Lastname nvarchar(20),
    Sex int ,
    Birthday date,
    Avatar varchar,
    Address nvarchar(100) NOT NULL,
    Password varchar(50) NOT NULL,
    Status bit NOT NULL,
    Picture nvarchar
)
GO

CREATE TABLE Employee(
    EmployeeID varchar(20) PRIMARY KEY,
    Email nvarchar UNIQUE NOT NULL,
    RoleID varchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
    PhoneNumber varchar(10) UNIQUE NOT NULL,
    Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20),
    Sex int ,
    Birthday date,
    Avatar varchar,
    Address nvarchar(100) NOT NULL,
    Password varchar(50) NOT NULL,
    Status bit NOT NULL,
    Picture nvarchar
)
GO

Create TABLE PaymentMethod(
    PaymentMethodID varchar(20) PRIMARY KEY,
    PaymentName varchar(50) NOT NULL
)
GO

CREATE TABLE PaymentStatus(
    PaymentStatusID varchar(20) PRIMARY KEY,
    StatusName varchar(50) NOT NULL
)
GO

CREATE TABLE ServiceDeliveryMethod(
    ServiceDeliveryMethodID varchar(20) PRIMARY KEY,
    Name varchar(100) NOT NULL,
    Status bit
)
GO

CREATE TABLE Service(
    ServiceID varchar(20) PRIMARY KEY,
    ServiceDeliveryMethodID varchar(20) FOREIGN KEY REFERENCES ServiceDeliveryMethod(ServiceDeliveryMethodID) NOT NULL,
    Name nvarchar(30) NOT NULL,
    Price money NOT NULL,
    Description nvarchar,
    Status bit
)
GO

CREATE TABLE Feedback(
    FeedbackID varchar(20) PRIMARY KEY,
    Description nvarchar NOT NULL,
    Status bit NOT NULL
)
GO

CREATE TABLE SlotCategory(
    SlotCategoryID int PRIMARY KEY ,
    SlotName nvarchar NOT NULL
)
GO

CREATE TABLE Schedule(
    ScheduleID varchar(20) PRIMARY KEY,
    EmployeeID varchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID) NOT NULL,
    Date date NOT NULL,
    Status bit NOT NULL,
    Note nvarchar,
    SlotCategoryID int FOREIGN KEY REFERENCES SlotCategory(SlotCategoryID) NOT NULL,
    SlotNote nvarchar
)
GO

CREATE TABLE Booking(
    BookingID varchar(20) PRIMARY KEY ,
    ServiceTypeID varchar(20) FOREIGN KEY REFERENCES Service(ServiceID) NOT NULL,
    CustomerID varchar(20) FOREIGN KEY REFERENCES Customer(CustomerID),
    EmployeeID varchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    BookingDate datetime NOT NULL,
    ExpiredDate date NOT NULL,
    PaymentMethodID varchar(20) FOREIGN KEY REFERENCES PaymentMethod(PaymentMethodID) NOT NULL,
    PaymentStatusID varchar(20) FOREIGN KEY REFERENCES PaymentStatus(PaymentStatusID) NOT NULL,
    DeliveryMethod nvarchar NOT NULL,
    VAT varchar,
    BookingAddress nvarchar NOT NULL,
    Distance float NOT NULL,
    DistanceCost money NOT NULL,
    TotalServiceCost money NOT NULL,
    Status nvarchar NOT NULL,
    FeedbackID varchar(20) FOREIGN KEY REFERENCES Feedback(FeedbackID) NOT NULL,
    ScheduleID varchar(20) FOREIGN KEY REFERENCES Schedule(ScheduleID) NOT NULL
)
GO 

CREATE TABLE AnimalType(
    TypeID varchar(20) PRIMARY KEY,
    Name nvarchar NOT NULL
)
GO 

CREATE TABLE AnimalProfile(
    AnimalProfileID varchar(20) PRIMARY KEY ,
    Name nvarchar(50) NOT NULL,
    TypeID varchar(20) FOREIGN KEY REFERENCES AnimalType(TypeID) NOT NULL,
    Size float NOT NULL,
    Age int NOT NULL,
    Color varchar(20) NOT NULL,
    Description nvarchar,
    Sex int NOT NULL,
    Picture nvarchar ,
)
GO

CREATE TABLE PoolProfile(
    PoolProfileID varchar(20) PRIMARY KEY,
    Name nvarchar(20) NOT NULL,
    Note nvarchar,
    Width float NOT NULL,
    Description nvarchar ,
    Height float NOT NULL,
    Depth float NOT NULL,
    Picture nvarchar ,
)
GO

CREATE TABLE BookingDetail(
    BookingDetailID varchar(20) PRIMARY KEY,
    BookingID varchar(20) FOREIGN KEY REFERENCES Booking(BookingID) NOT NULL,
    ServiceID varchar(20) FOREIGN KEY REFERENCES Service(ServiceID) NOT NULL,
    AnimalProfileID varchar(20) FOREIGN KEY REFERENCES AnimalProfile(AnimalProfileID) NOT NULL, 
    PoolProfileID varchar(20) FOREIGN KEY REFERENCES PoolProfile(PoolProfileID) NOT NULL,
    UnitPrice money NOT NULL,
    NoteResult nvarchar,
    NoteExamination nvarchar,
    AnimalStatusDescription nvarchar ,
    ConsultDoctor nvarchar ,
    DrugList nvarchar ,
    PoolStatusDescription nvarchar,
    ConsultTechnician nvarchar,
    MaterialList nvarchar,
)
GO 

CREATE TABLE FAQ(
    FaqID varchar(20) PRIMARY KEY,
    Question nvarchar NOT NULL,
    Answer nvarchar NOT NULL
)
GO

CREATE TABLE PostCategory(
    PostCategoryID varchar(20) PRIMARY KEY,
    Name nvarchar NOT NULL,
)
GO

CREATE TABLE Post(
    PostID varchar(20) PRIMARY KEY,
    PostName nvarchar NOT NULL,
    PostCategoryID varchar(20) FOREIGN KEY REFERENCES PostCategory(PostCategoryID) NOT NULL,
    Context nvarchar NOT NULL,
)
GO 

CREATE TABLE Dashboard(
    EmployeeID varchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    BookingID varchar(20) FOREIGN KEY REFERENCES Booking(BookingID),
)
GO
