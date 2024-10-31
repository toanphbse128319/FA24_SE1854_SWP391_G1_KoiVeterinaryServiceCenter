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
    RoleID nvarchar(20) PRIMARY KEY,
    Rolename nvarchar(100) NOT NULL
)
GO

Create table Account(
    AccountID nvarchar(30) primary key ,
    Email nvarchar(30) UNIQUE NOT NULL,
    PhoneNumber nvarchar(10) UNIQUE NOT NULL,
    RoleID nvarchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
    Avatar nvarchar(500),
    Password nvarchar(50) NOT NULL,
    Status nvarchar(50) NOT NULL,
	isActive bit not null,
)

CREATE TABLE Customer(
    CustomerID nvarchar(20) PRIMARY KEY,
    AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20),
    Sex bit,
    Birthday date,
    Address nvarchar(100) NOT NULL,
    Status nvarchar(50) NOT NULL
)
GO

CREATE TABLE Employee(
    EmployeeID nvarchar(20) PRIMARY KEY,
	AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    RoleID nvarchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
	Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20) NOT NULL,
    Sex bit,
    Birthday date,
    Address nvarchar(100) NOT NULL,
    Status nvarchar(50) NOT NULL,
)
GO

CREATE TABLE ServiceDeliveryMethod(
    ServiceDeliveryMethodID nvarchar(20) PRIMARY KEY,
    Name nvarchar(100) NOT NULL,
    Status nvarchar(50)
)
GO

CREATE TABLE Service(
    ServiceID nvarchar(20) PRIMARY KEY,
    ServiceDeliveryMethodID nvarchar(20) FOREIGN KEY REFERENCES ServiceDeliveryMethod(ServiceDeliveryMethodID) NOT NULL,
    Name nvarchar(100) NOT NULL,
    Price money NOT NULL,
    Description nvarchar(MAX),
    Status nvarchar(50)
)
GO

CREATE TABLE Feedback(
    FeedbackID nvarchar(20) PRIMARY KEY,
    ServiceRating int NOT NULL,
    VetRating int NOT NULL,
    Description nvarchar(MAX) NOT NULL,
    Status nvarchar(50) NOT NULL
)
GO

CREATE TABLE Schedule(
    ScheduleID nvarchar(20) PRIMARY KEY,
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID) NOT NULL,
    Date date NOT NULL,
    Note nvarchar(MAX),
	Status nvarchar(50) NOT NULL
)
GO

CREATE TABLE SlotTable(
	SlotTableID nvarchar(20) PRIMARY KEY,
	ScheduleID nvarchar(20) FOREIGN KEY REFERENCES Schedule(ScheduleID) NOT NULL,
	Note nvarchar(MAX),
	Slot int,
    SlotCapacity int,
	SlotOrdered int,
    SlotStatus bit NOT NULL
)
GO

CREATE TABLE Booking(
    BookingID nvarchar(20) PRIMARY KEY ,
    CustomerID nvarchar(20) FOREIGN KEY REFERENCES Customer(CustomerID),
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    BookingDate datetime NOT NULL,
    ExpiredDate datetime NOT NULL,
    Deposit money not null,
    NumberOfFish int not null,
    IncidentalFish int not null,
    NumberOfPool int not null,
    IncidentalPool int not null,
    VAT float,
    BookingAddress nvarchar(200) NOT NULL,
    Distance float NOT NULL,
    DistanceCost money NOT NULL,
    TotalServiceCost money NOT NULL,
    Status nvarchar(50) NOT NULL,
    FeedbackID nvarchar(20) FOREIGN KEY REFERENCES Feedback(FeedbackID) NOT NULL,
    ScheduleID nvarchar(20) FOREIGN KEY REFERENCES Schedule(ScheduleID) NOT NULL,
    Note nvarchar(MAX),
	PaymentMethod nvarchar(50) NOT NULL,
    PaymentStatus nvarchar(50) NOT NULL
)
GO 

CREATE TABLE AnimalType(
    TypeID nvarchar(20) PRIMARY KEY,
    Name nvarchar(100) NOT NULL
)
GO 

CREATE TABLE BookingDetail(
    BookingDetailID nvarchar(20) PRIMARY KEY,
    BookingID nvarchar(20) FOREIGN KEY REFERENCES Booking(BookingID) NOT NULL,
    ServiceID nvarchar(20) FOREIGN KEY REFERENCES Service(ServiceID) NOT NULL,
    UnitPrice money NOT NULL,
    Incidental bit NOT NULL,
    NoteResult nvarchar(MAX),
    AnimalStatusDescription nvarchar(MAX) ,
    ConsultDoctor nvarchar(MAX),
    DrugList nvarchar(MAX),
    PoolStatusDescription nvarchar(MAX),
    ConsultTechnician nvarchar(MAX),
    MaterialList nvarchar(MAX),
)
GO 

CREATE TABLE AnimalProfile(
    AnimalProfileID nvarchar(20) PRIMARY KEY ,
    Name nvarchar(50) NOT NULL,
    TypeID nvarchar(20) FOREIGN KEY REFERENCES AnimalType(TypeID) NOT NULL,
    Size float NOT NULL,
    Age int NOT NULL,
    Color nvarchar(20) NOT NULL,
    Description nvarchar(MAX),
    Sex bit NOT NULL,
    Picture nvarchar(500) 
)
GO

CREATE TABLE PoolProfile(
    PoolProfileID nvarchar(20) PRIMARY KEY,
    Name nvarchar(200) NOT NULL,
    Note nvarchar(MAX),
    Width float NOT NULL,
    Description nvarchar(MAX),
    Height float NOT NULL,
    Depth float NOT NULL,
    Picture nvarchar(500)
)
GO


CREATE TABLE FAQ(
    FaqID nvarchar(20) PRIMARY KEY,
    Question nvarchar(MAX) NOT NULL,
    Answer nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE PostCategory(
    PostCategoryID nvarchar(20) PRIMARY KEY,
    Name nvarchar(MAX) NOT NULL,
)
GO

CREATE TABLE Post(
    PostID nvarchar(20) PRIMARY KEY,
    PostName nvarchar(MAX) NOT NULL,
    PostCategoryID nvarchar(20) FOREIGN KEY REFERENCES PostCategory(PostCategoryID) NOT NULL,
    Context nvarchar(MAX) NOT NULL,
)
GO 

CREATE TABLE ServiceUse (
	ServiceUseID nvarchar(20) PRIMARY KEY,
    AnimalProfileID nvarchar(20) ,
    PoolProfileID nvarchar(20) ,
    BookingDetailID nvarchar(20)
);
GO

USE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]

-- Insert sample data for Role
INSERT INTO Role (RoleID, Rolename) 
VALUES 
('R0', 'Default'),
('R1', 'Manager'),
('R2', 'Staff'),
('R3', 'Veterinarian'),
('R4', 'Customer'),
('R5', 'Guest');
GO

-- Insert sample data for Customer
INSERT INTO Account (AccountID, PhoneNumber, Email, RoleID, Avatar, Password, Status, isActive )
VALUES
('A0', '0000000000', 'null', 'R0', 'null', '', 'Default', 0),
('A1', '0123456789', 'phbtoan9185@gmail.com', 'R2', 'avatar1.jpg', 'caniskip', 'Normal', 1),
('A2', '0987654321', 'admin2@gmail.com', 'R2', 'avatar2.jpg', 'admin', 'Normal', 1),
('A3', '0111111111', 'arandomvet@gmail.com', 'R2', 'avatar3.jpg', 'vet', 'Normal', 1),
('A4', '0121111111', 'manager2@gmail.com', 'R2', 'avatar4.jpg', 'manager', 'Normal', 1),
('A5', '0123212313', 'Test@gmail.com', 'R2', 'avatar5.jpg', 'test', 'Normal', 1),
('A6', '8765785746', 'longtnhse173174@fpt.edu.vn', 'R1', 'avatar1.jpg', 'tangdeptrai', 'Normal', 1),
('A7', '0835377623', 'vet2@gmail.com', 'R3', 'avatar2.jpg', 'vettemp', 'Normal', 1),
('A8', '1122334455', 'Manager@gmail.com', 'R3', 'avatar3.jpg', 'vet', 'Normal', 1),
('A9', '1234554321', 'reception1@gmai.com', 'R1', 'avatar4.jpg', 'manager', 'Normal', 1),
('A10', '1234567876', 'admin@gmail.com', 'R2', 'avatar5.jpg', 'test', 'Normal', 1);
GO

INSERT INTO Customer (CustomerID, Firstname, Lastname, Sex, Birthday, Address, AccountID, Status) 
VALUES 
('C1', 'Vy', 'Nguyen', 1, '2004-11-20', '250 vo van hat', 'A1', 1),
('C2', 'Jane', 'Smith', 0, '1985-03-15', '456 Maple Ave', 'A2', 1),
('C3', 'Alice', 'Johnson', 0, '1995-07-22', '789 Oa St', 'A3', 1),
('C4', 'Bob', 'Brown', 1, '1982-11-02', '321 Birch Ave', 'A4', 1),
('C5', 'Carol', 'White', 0, '1979-08-14', '654 Pine St', 'A5', 1);
GO

-- Insert sample data for Employee
INSERT INTO Employee (EmployeeID, AccountID, RoleID, Firstname, Lastname, Sex, Birthday, Address, Status) 
VALUES 
('E0', 'A0', 'R0', 'Null', 'Null', 1, '2003-01-02', 'Null', 1),
('E1', 'A6', 'R1', 'Duong', 'Tang', 1, '2003-01-02', 'VinHome Q9', 1),
('E2', 'A7', 'R2', 'Lily', 'Anderson', 0, '1988-04-25', '111 Maple St', 1),
('E3', 'A8', 'R3', 'Tom', 'Clark', 1, '1991-02-19', '222 Oak Dr', 1),
('E4', 'A9', 'R2', 'Nancy', 'Lee', 0, '1985-12-12', '333 Pine Ln', 1),
('E5', 'A10', 'R3', 'Michael', 'Scott', 1, '1975-09-08', '444 Birch Rd', 1);

-- Insert sample data for ServiceDeliveryMethod
INSERT INTO ServiceDeliveryMethod (ServiceDeliveryMethodID, Name, Status) 
VALUES 
('SDM1', N'Tại nhà', 1),
('SDM2', N'Tại cơ sở', 1),
('SDM3', N'Trực tuyến', 1)

-- Insert sample data for Service
INSERT INTO Service (ServiceID, ServiceDeliveryMethodID, Name, Price, Description, Status) 
VALUES 
('S1', 'SDM1', N'Kiểm tra sức khỏe cá koi', 100000, N'Kiểm tra sức khỏe cơ bản cho cá koi', 1),
('S2', 'SDM2', N'Kiểm tra sức khỏe cá koi', 100000, N'Kiểm tra sức khỏe cơ bản cho cá koi', 1),
('S3', 'SDM3', N'Tư vấn sức khỏe cá koi', 75000, N'Tư vấn trực tuyến với chuyên gia cá koi', 1),
('S4', 'SDM1', N'Điều trị cá koi', 150000, N'Điều trị cho các bệnh thường gặp ở cá koi', 1),
('S5', 'SDM2', N'Điều trị cá koi', 150000, N'Điều trị cho các bệnh thường gặp ở cá koi', 1),
('S6', 'SDM2', N'Xét nghiệm máu cho cá', 150000, N'Xét nghiệm máu cho cá', 1),
('S7', 'SDM1', N'Kiểm tra mức pH', 150000, N'Kiểm tra mức pH trong nước', 1),
('S8', 'SDM1', N'Loại bỏ nấm ký sinh trong bể', 100000, N'Loại bỏ nấm ký sinh trong bể', 1),
('S9', 'SDM1', N'Kiểm tra hồ cá', 100000, N'Kiểm tra hồ cá, bể cá', 1);
-- Insert sample data for Feedback

INSERT INTO Feedback (FeedbackID, ServiceRating, VetRating, Description, Status) 
VALUES 
('FB0', 0, 0, 'Null', 'Default'),
('FB1', 5, 5, 'Great service!', 'Active'),
('FB2', 3, 3, 'Needs improvement.', 'Active'),
('FB3', 5, 5, 'Very satisfied with the consultation.', 'Active'),
('FB4', 4, 5, 'Prompt and professional.', 'Active'),
('FB5', 5, 5, 'Koi surgery saved my fish!', 'Active');

-- Insert data into Schedule table
INSERT INTO Schedule (ScheduleID, EmployeeID, Date, Note, Status) VALUES
('SCH1', 'E3', '2024-10-25', N'Trực tuyến', 'Active'),
('SCH2', 'E4', '2024-10-25', N'Trực tuyến', 'Active'),
('SCH3', 'E3', '2024-10-26', N'Trực tuyến', 'Active'),
('SCH4', 'E4', '2024-10-26', N'Trực tuyến', 'Active'),
('SCH5', 'E3', '2024-10-27', N'Trực tuyến', 'Active'),
('SCH6', 'E4', '2024-10-27', N'Trực tuyến', 'Active'),
('SCH7', 'E3', '2024-10-28', N'Trực tuyến', 'Active'),
('SCH8', 'E4', '2024-10-28', N'Trực tuyến', 'Active'),
('SCH9', 'E3', '2024-11-05', N'Trực tuyến', 'Active'),
('SCH10', 'E4', '2024-11-05', N'Tại trung tâm', 'Active'),
('SCH11', 'E3', '2024-11-06', N'Tại trung tâm', 'Active'),
('SCH12', 'E4', '2024-11-06', N'Tại trung tâm', 'Active'),
('SCH13', 'E3', '2024-11-07', N'Tại trung tâm', 'Active'),
('SCH14', 'E4', '2024-11-07', N'Tại nhà', 'Active'),
('SCH15', 'E3', '2024-11-08', N'Tại nhà', 'Active'),
('SCH16', 'E4', '2024-11-08', N'Tại trung tâm', 'Active'),
('SCH17', 'E3', '2024-11-02', N'Tại nhà', 'Active'),
('SCH18', 'E4', '2024-11-02', N'Tại nhà', 'Active'),
('SCH19', 'E3', '2024-11-03', N'Tại nhà', 'Active'),
('SCH20', 'E4', '2024-11-03', N'Tại nhà', 'Active'),
('SCH21', 'E3', '2024-11-04', N'Tại nhà', 'Active'),
('SCH22', 'E4', '2024-11-04', N'Tại nhà', 'Active'),
('SCH23', 'E3', '2024-11-05', N'Tại nhà', 'Active'),
('SCH24', 'E4', '2024-11-05', N'Tại nhà', 'Active'),
('SCH25', 'E3', '2024-11-06', N'Tại trung tâm', 'Active'),
('SCH26', 'E4', '2024-11-06', N'Tại nhà', 'Active'),
('SCH27', 'E3', '2024-11-07', N'Tại trung tâm', 'Active'),
('SCH28', 'E4', '2024-11-07', N'Tại nhà', 'Active'),
('SCH29', 'E3', '2024-11-08', N'Tại trung tâm', 'Active'),
('SCH30', 'E4', '2024-11-08', N'Tại nhà', 'Active'),
('SCH31', 'E3', '2024-11-09', N'Tại trung tâm', 'Active'),
('SCH32', 'E4', '2024-11-09', N'Tại nhà', 'Active'),
('SCH33', 'E3', '2024-11-10', N'Tại trung tâm', 'Active'),
('SCH34', 'E4', '2024-11-10', N'Tại nhà', 'Active'),
('SCH35', 'E3', '2024-11-11', N'Tại trung tâm', 'Active'),
('SCH36', 'E4', '2024-11-11', N'Trực tuyến', 'Active'),
('SCH37', 'E3', '2024-11-12', N'Tại trung tâm', 'Active'),
('SCH38', 'E4', '2024-11-12', N'Trực tuyến', 'Active'),
('SCH39', 'E3', '2024-11-13', N'Tại trung tâm', 'Active'),
('SCH40', 'E4', '2024-11-13', N'Trực tuyến', 'Active'),
('SCH41', 'E3', '2024-11-14', N'Tại trung tâm', 'Active'),
('SCH42', 'E4', '2024-11-14', N'Trực tuyến', 'Active'),
('SCH43', 'E3', '2024-11-15', N'Tại trung tâm', 'Active'),
('SCH44', 'E4', '2024-11-15', N'Trực tuyến', 'Active'),
('SCH45', 'E3', '2024-11-16', N'Tại trung tâm', 'Active'),
('SCH46', 'E4', '2024-11-16', N'Trực tuyến', 'Active'),
('SCH47', 'E3', '2024-11-17', N'Trực tuyến', 'Active'),
('SCH48', 'E4', '2024-11-17', N'Trực tuyến', 'Active'),
('SCH49', 'E3', '2024-11-18', N'Trực tuyến', 'Active'),
('SCH50', 'E4', '2024-11-18', N'Trực tuyến', 'Active'),
('SCH51', 'E3', '2024-11-19', N'Trực tuyến', 'Active'),
('SCH52', 'E4', '2024-11-19', N'Tại trung tâm', 'Active'),
('SCH53', 'E3', '2024-11-20', N'Tại trung tâm', 'Active'),
('SCH54', 'E4', '2024-11-20', N'Tại trung tâm', 'Active'),
('SCH55', 'E3', '2024-11-21', N'Tại trung tâm', 'Active'),
('SCH56', 'E4', '2024-11-21', N'Tại trung tâm', 'Active'),
('SCH57', 'E3', '2024-11-22', N'Tại trung tâm', 'Active'),
('SCH58', 'E4', '2024-11-22', N'Tại nhà', 'Active'),
('SCH59', 'E3', '2024-11-23', N'Tại nhà', 'Active'),
('SCH60', 'E4', '2024-11-23', N'Tại nhà', 'Active'),
('SCH61', 'E3', '2024-11-24', N'Tại nhà', 'Active'),
('SCH62', 'E4', '2024-11-24', N'Tại nhà', 'Active');

INSERT INTO SlotTable (SlotTableID, ScheduleID, Note, Slot, SlotCapacity, SlotOrdered, SlotStatus) VALUES
('ST1', 'SCH9', N'Trực tuyến', 1, 10, 5, 1),
('ST2', 'SCH9', N'Trực tuyến', 2, 10, 6, 1),
('ST3', 'SCH9', N'Trực tuyến', 3, 10, 4, 1),
('ST4', 'SCH9', N'Trực tuyến', 4, 10, 7, 1),
('ST5', 'SCH9', N'Trực tuyến', 5, 10, 3, 1),
('ST6', 'SCH9', N'Trực tuyến', 6, 10, 5, 1),
('ST7', 'SCH9', N'Trực tuyến', 7, 10, 4, 1),
('ST8', 'SCH9', N'Trực tuyến', 8, 10, 6, 1),
('ST9', 'SCH10', N'Tại trung tâm', 1, 10, 4, 1),
('ST10', 'SCH10', N'Tại trung tâm', 2, 10, 5, 1),
('ST11', 'SCH10', N'Tại trung tâm', 3, 10, 6, 1),
('ST12', 'SCH10', N'Tại trung tâm', 4, 10, 3, 1),
('ST13', 'SCH10', N'Tại trung tâm', 5, 10, 7, 1),
('ST14', 'SCH10', N'Tại trung tâm', 6, 10, 5, 1),
('ST15', 'SCH10', N'Tại trung tâm', 7, 10, 4, 1),
('ST16', 'SCH10', N'Tại trung tâm', 8, 10, 6, 1),
('ST17', 'SCH11', N'Tại trung tâm', 1, 10, 5, 1),
('ST18', 'SCH11', N'Tại trung tâm', 2, 10, 4, 1),
('ST19', 'SCH11', N'Tại trung tâm', 3, 10, 6, 1),
('ST20', 'SCH11', N'Tại trung tâm', 4, 10, 7, 1),
('ST21', 'SCH11', N'Tại trung tâm', 5, 10, 3, 1),
('ST22', 'SCH11', N'Tại trung tâm', 6, 10, 5, 1),
('ST23', 'SCH11', N'Tại trung tâm', 7, 10, 4, 1),
('ST24', 'SCH11', N'Tại trung tâm', 8, 10, 6, 1),
('ST25', 'SCH12', N'Tại trung tâm', 1, 10, 5, 1),
('ST26', 'SCH12', N'Tại trung tâm', 2, 10, 6, 1),
('ST27', 'SCH12', N'Tại trung tâm', 3, 10, 4, 1),
('ST28', 'SCH12', N'Tại trung tâm', 4, 10, 7, 1),
('ST29', 'SCH12', N'Tại trung tâm', 5, 10, 3, 1),
('ST30', 'SCH12', N'Tại trung tâm', 6, 10, 5, 1),
('ST31', 'SCH12', N'Tại trung tâm', 7, 10, 4, 1),
('ST32', 'SCH12', N'Tại trung tâm', 8, 10, 6, 1),
('ST33', 'SCH13', N'Tại trung tâm', 1, 10, 4, 1),
('ST34', 'SCH13', N'Tại trung tâm', 2, 10, 5, 1),
('ST35', 'SCH13', N'Tại trung tâm', 3, 10, 6, 1),
('ST36', 'SCH13', N'Tại trung tâm', 4, 10, 3, 1),
('ST37', 'SCH13', N'Tại trung tâm', 5, 10, 7, 1),
('ST38', 'SCH13', N'Tại trung tâm', 6, 10, 5, 1),
('ST39', 'SCH13', N'Tại trung tâm', 7, 10, 4, 1),
('ST40', 'SCH13', N'Tại trung tâm', 8, 10, 6, 1),
('ST41', 'SCH14', N'Tại nhà', 1, 10, 5, 1),
('ST42', 'SCH14', N'Tại nhà', 2, 10, 4, 1),
('ST43', 'SCH14', N'Tại nhà', 3, 10, 6, 1),
('ST44', 'SCH14', N'Tại nhà', 4, 10, 7, 1),
('ST45', 'SCH14', N'Tại nhà', 5, 10, 3, 1),
('ST46', 'SCH14', N'Tại nhà', 6, 10, 5, 1),
('ST47', 'SCH14', N'Tại nhà', 7, 10, 4, 1),
('ST48', 'SCH14', N'Tại nhà', 8, 10, 6, 1),
('ST49', 'SCH15', N'Tại nhà', 1, 10, 5, 1),
('ST50', 'SCH15', N'Tại nhà', 2, 10, 6, 1),
('ST51', 'SCH15', N'Tại nhà', 3, 10, 4, 1),
('ST52', 'SCH15', N'Tại nhà', 4, 10, 7, 1),
('ST53', 'SCH15', N'Tại nhà', 5, 10, 3, 1),
('ST54', 'SCH15', N'Tại nhà', 6, 10, 5, 1),
('ST55', 'SCH15', N'Tại nhà', 7, 10, 4, 1),
('ST56', 'SCH15', N'Tại nhà', 8, 10, 6, 1);

--NumberOfFish int not null,
   -- IncidentalFish 
-- Insert sample data for Booking
INSERT INTO Booking (BookingID, CustomerID, EmployeeID, BookingDate, ExpiredDate, Deposit, NumberOfFish, IncidentalFish, NumberOfPool, IncidentalPool, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID, Note, PaymentMethod, PaymentStatus) 
VALUES 
('B1', 'C1', 'E1', '2024-10-31 09:00:00', '2024-09-01 10:00:00', 50.00, 1, 0, 0, 0, 10.00, '250 Vo Van Hat', 5.5, 11.00, 661000, 'Confirmed', 'FB1', 'SCH1', 'Home visit for koi health check', 'Credit Card', 'Pending'),
('B2', 'C2', 'E2', '2024-11-01 14:00:00', '2024-09-02 15:00:00', 37.50, 1, 0, 0, 0, 7.50, '456 Maple Ave', 0, 0.00, 397500, 'Confirmed', 'FB2', 'SCH2', 'Trực tuyến consultation for koi', 'PayPal', 'Pending'),
('B3', 'C3', 'E3', '2024-10-31 18:00:00', '2024-09-03 19:00:00', 75.00, 1, 0, 0, 0, 15.00, '789 Oak St', 3.2, 6.40, 996000, 'Cancelled', 'FB3', 'SCH3', 'Clinic visit for koi disease treatment', 'Cash', 'Pending'),
('B4', 'C4', 'E4', '2024-11-01 22:00:00', '2024-09-05 01:00:00', 150.00, 1, 0, 0, 0, 30.00, '321 Birch Ave', 8.7, 17.40, 2000000, 'In Progress', 'FB4', 'SCH4', 'Emergency koi surgery', 'Credit Card', 'Pending')

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT1', 'Koi'),
('AT2', 'Goldfish'),
('AT3', 'Tropical Fish'),
('AT4', 'Saltwater Fish'),
('AT5', 'Betta Fish');

-- Insert sample data for BookingDetail
INSERT INTO BookingDetail (BookingDetailID, BookingID, ServiceID, UnitPrice, Incidental, NoteResult, AnimalStatusDescription, ConsultDoctor, DrugList, PoolStatusDescription, ConsultTechnician, MaterialList)
VALUES 
('BD1', 'B1', 'S1', 100.00, 0,'Koi appears healthy overall', 'Nishiki shows good coloration and active behavior', 'Dr. Amelia Fish', 'Probiotic supplement', 'Zen Garden Koi Pond maintains good water quality', 'Tech John Doe', 'Water testing kit, net'),
('BD2', 'B2', 'S2', 75.00, 0,'Goldfish exhibiting signs of stress', 'Bubbles has clamped fins and reduced activity', 'Dr. Michael Scales', 'Antibiotics, stress coat additive', 'Indoor Goldfish Tank requires improved filtration', 'Tech Jane Smith', 'New filter system, air pump'),
('BD3', 'B3', 'S3', 150.00, 0,'Tropical fish recovering from minor infection', 'Nemo shows improvement in fin condition and appetite', 'Dr. Sarah Coral', 'Broad-spectrum antibiotic, vitamin supplements', 'Tropical Reef Aquarium parameters stable', 'Tech Robert Johnson', 'UV sterilizer, coral food'),
('BD4', 'B4', 'S4', 300.00, 0,'Emergency surgery successful',  'Azure is stable post-surgery, requires close monitoring', 'Dr. David Finn', 'Pain medication, antibiotics', 'Saltwater Lagoon quarantine section set up', 'Tech Emily Waters', 'Surgical tools, quarantine tank')

-- Insert sample data for AnimalProfile
INSERT INTO AnimalProfile (AnimalProfileID, Name, TypeID, Size, Age, Color, Description, Sex, Picture) 
VALUES 
('AP1', 'Nishiki', 'AT1', 24.5, 3, 'Red and White', 'A beautiful Kohaku koi with vibrant red patches on a white body', 1, 'nishiki_koi.jpg'),
('AP2', 'Bubbles', 'AT2', 6.0, 2, 'Orange', 'Energetic fancy goldfish with a bubbly personality', 0, 'bubbles_goldfish.jpg'),
('AP3', 'Nemo', 'AT3', 3.5, 1, 'Orange and White', 'Playful clownfish, always hiding in the anemone', 1, 'nemo_clownfish.jpg'),
('AP4', 'Azure', 'AT4', 12.0, 4, 'Blue', 'Majestic blue tang with vibrant coloration', 0, 'azure_bluetang.jpg')

-- Insert sample data for PoolProfile
INSERT INTO PoolProfile (PoolProfileID, Name, Note, Width, Description, Height, Depth, Picture)
VALUES 
('PP1', 'Zen Garden Koi Pond','Requires weekly maintenance', 15.0, 'A traditional Japanese-style koi pond with a small waterfall and surrounding rock garden', 2.5, 4.0, 'zen_garden_pond.jpg'),
('PP2', 'Indoor Goldfish Tank', 'Check filter system monthly', 4.0, 'A large, well-lit indoor aquarium designed for multiple goldfish', 2.0, 2.0, 'indoor_goldfish_tank.jpg'),
('PP3', 'Tropical Reef Aquarium', 'Maintain consistent water temperature', 6.0, 'A colorful reef tank with live corals and various tropical fish species', 3.0, 2.5, 'tropical_reef_aquarium.jpg'),
('PP4', 'Saltwater Lagoon', 'Monitor salinity levels regularly', 20.0, 'An expansive outdoor saltwater pool mimicking a natural lagoon environment', 5.0, 6.0, 'saltwater_lagoon.jpg')

-- Insert sample data for FAQ
INSERT INTO FAQ (FaqID, Question, Answer) VALUES
('FAQ1', 'What is a Koi fish?', 'Koi are colorful fish that are kept in ponds and water gardens, known for their beauty and variety.'),
('FAQ2', 'How long do Koi live?', 'Koi can live for several decades, with some living over 200 years under optimal conditions.'),
('FAQ3', 'What do Koi eat?', 'Koi are omnivorous and can eat a variety of foods including pellets, vegetables, and insects.'),
('FAQ4', 'How big do Koi get?', 'Koi can grow to be quite large, often reaching sizes of 2 to 3 feet in length.'),
('FAQ5', 'What is the best water temperature for Koi?', 'Koi thrive in water temperatures between 65��F and 75��F (18��C to 24��C).');

-- Insert sample data for PostCategory
INSERT INTO PostCategory (PostCategoryID, Name) VALUES
('PC1', 'Koi Care'),
('PC2', 'Koi Breeding'),
('PC3', 'Koi Health'),
('PC4', 'Koi Pond Design'),
('PC5', 'Koi Varieties');

-- Insert sample data for Post
INSERT INTO Post (PostID, PostName, PostCategoryID, Context) VALUES
('P1', 'Essential Koi Care Tips', 'PC1', 'This post discusses the essential tips for properly taking care of your Koi fish.'),
('P2', 'Breeding Koi: A Step-by-Step Guide', 'PC2', 'Learn how to breed Koi fish successfully with this comprehensive guide.'),
('P3', 'Common Koi Diseases and Solutions', 'PC3', 'An overview of common diseases that affect Koi and how to treat them.'),
('P4', 'Designing the Perfect Koi Pond', 'PC4', 'Explore the key elements of designing a beautiful and functional Koi pond.'),
('P5', 'A Guide to Popular Koi Varieties', 'PC5', 'This article highlights some of the most popular Koi varieties and their unique features.');
