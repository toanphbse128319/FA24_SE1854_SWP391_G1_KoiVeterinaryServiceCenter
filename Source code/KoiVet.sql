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
    AccountID nvarchar(30) primary key,
    Email nvarchar(30) UNIQUE NOT NULL,
    RoleID nvarchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
    Avatar nvarchar(500),
    Password nvarchar(50) NOT NULL,
    Status nvarchar(50) NOT NULL,
	isActive bit not null,
)

CREATE TABLE Customer(
    CustomerID nvarchar(20) PRIMARY KEY,
    Email nvarchar(30) UNIQUE NOT NULL,
    PhoneNumber nvarchar(10) UNIQUE NOT NULL,
    Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20),
    Sex bit,
    Birthday date,
    Avatar nvarchar(500),
    Address nvarchar(100) NOT NULL,
    AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    Status nvarchar(50) NOT NULL
)
GO

CREATE TABLE Employee(
    EmployeeID nvarchar(20) PRIMARY KEY,
	AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    Email nvarchar(100)  UNIQUE NOT NULL,
    PhoneNumber nvarchar(10) UNIQUE NOT NULL,
    Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20),
    Sex bit,
    Birthday date,
    Avatar nvarchar(500),
    Address nvarchar(100) NOT NULL,
    Password nvarchar(50) NOT NULL,
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
    Name nvarchar(30) NOT NULL,
    Price money NOT NULL,
    Description nvarchar(MAX),
    Status nvarchar(50)
)
GO

CREATE TABLE Feedback(
    FeedbackID nvarchar(20) PRIMARY KEY,
    Description nvarchar(MAX) NOT NULL,
    Status nvarchar(50) NOT NULL
)
GO

CREATE TABLE SlotCategory(
    SlotCategoryID int PRIMARY KEY ,
    SlotName nvarchar(50) NOT NULL
)
GO

CREATE TABLE Schedule(
    ScheduleID nvarchar(20) PRIMARY KEY,
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID) NOT NULL,
    Date date NOT NULL,
    Status nvarchar(500) NOT NULL,
    Note nvarchar(MAX),
    SlotCategoryID int FOREIGN KEY REFERENCES SlotCategory(SlotCategoryID) NOT NULL,
    SlotNote nvarchar(50)
)
GO

CREATE TABLE Booking(
    BookingID nvarchar(20) PRIMARY KEY ,
    CustomerID nvarchar(20) FOREIGN KEY REFERENCES Customer(CustomerID),
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    BookingDate datetime NOT NULL,
    ExpiredDate date NOT NULL,
    Deposit money not null,
    DeliveryMethod nvarchar(50) NOT NULL,
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

CREATE TABLE AnimalProfile(
    AnimalProfileID nvarchar(20) PRIMARY KEY ,
    Name nvarchar(50) NOT NULL,
    TypeID nvarchar(20) FOREIGN KEY REFERENCES AnimalType(TypeID) NOT NULL,
    BookingDetailID nvarchar(20) FOREIGN KEY REFERENCES BookingDetail(BookingDetailID) NOT NULL,
    Size float NOT NULL,
    Age int NOT NULL,
    Color nvarchar(20) NOT NULL,
    Description nvarchar,
    Sex int NOT NULL,
    Picture nvarchar 
)
GO

CREATE TABLE PoolProfile(
    PoolProfileID nvarchar(20) PRIMARY KEY,
    Name nvarchar(20) NOT NULL,
    BookingDetailID nvarchar(20) FOREIGN KEY REFERENCES BookingDetail(BookingDetailID) NOT NULL,
    Note nvarchar,
    Width float NOT NULL,
    Description nvarchar ,
    Height float NOT NULL,
    Depth float NOT NULL,
    Picture nvarchar
)
GO


CREATE TABLE FAQ(
    FaqID nvarchar(20) PRIMARY KEY,
    Question nvarchar NOT NULL,
    Answer nvarchar NOT NULL
)
GO

CREATE TABLE PostCateGOry(
    PostCateGOryID nvarchar(20) PRIMARY KEY,
    Name nvarchar NOT NULL,
)
GO

CREATE TABLE Post(
    PostID nvarchar(20) PRIMARY KEY,
    PostName nvarchar NOT NULL,
    PostCateGOryID nvarchar(20) FOREIGN KEY REFERENCES PostCategory(PostCategoryID) NOT NULL,
    Context nvarchar NOT NULL,
)
GO 

USE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]

-- Insert sample data for Role
INSERT INTO Role (RoleID, Rolename) 
VALUES 
('R001', 'Manager'),
('R002', 'Customer'),
('R003', 'Veterinarian'),
('R004', 'Guest'),
('R005', 'Staff');

-- Insert sample data for Customer
INSERT INTO Customer (CustomerID, Email, RoleID, PhoneNumber, Firstname, Lastname, Sex, Birthday, Avatar, Address, Password, Status) 
VALUES 
('C001', 'kyn6036@gmail.com', 'R002', '0123456789', 'Vy', 'Nguyen', 1, '2004-11-20', 'avatar1.jpg', '250 vo van hat', '12345', 1),
('C002', 'jane@gmail.com', 'R002', '0987654321', 'Jane', 'Smith', 0, '1985-03-15', 'avatar2.jpg', '456 Maple Ave', '12345', 1),
('C003', 'alice@gmail.com', 'R003', '0111222333', 'Alice', 'Johnson', 0, '1995-07-22', 'avatar3.jpg', '789 Oa St', '12345', 1),
('C004', 'bob@gmail.com', 'R002', '0223344556', 'Bob', 'Brown', 1, '1982-11-02', 'avatar4.jpg', '321 Birch Ave', '12345', 1),
('C005', 'carol@gmail.com', 'R002', '0334455667', 'Carol', 'White', 0, '1979-08-14', 'avatar5.jpg', '654 Pine St', '12345', 1);

-- Insert sample data for Employee
INSERT INTO Employee (EmployeeID, Email, RoleID, PhoneNumber, Firstname, Lastname, Sex, Birthday, Avatar, Address, Password, Status) 
VALUES 
('E001', 'vet1@gmail.com', 'R003', '0123456789', 'Sam', 'Wilson', 1, '1980-01-15', 'avatar3.jpg', '789 Cedar St', '123456', 1),
('E002', 'vet2@gmail.com', 'R003', '0456677889', 'Lily', 'Anderson', 0, '1988-04-25', 'avatar4.jpg', '111 Maple St', '123456', 1),
('E003', 'Manager@gmail.com', 'R001', '0223344556', 'Tom', 'Clark', 1, '1991-02-19', 'avatar5.jpg', '222 Oak Dr', '123456', 1),
('E004', 'reception1@gmai.com', 'R005', '0334455667', 'Nancy', 'Lee', 0, '1985-12-12', 'avatar6.jpg', '333 Pine Ln', '123456', 1),
('E005', 'admin@gmail.com', 'R001', '0998877665', 'Michael', 'Scott', 1, '1975-09-08', 'avatar7.jpg', '444 Birch Rd', '123456', 1);




-- Insert sample data for ServiceDeliveryMethod
INSERT INTO ServiceDeliveryMethod (ServiceDeliveryMethodID, Name, Status) 
VALUES 
('SDM001', 'Home Visit', 1),
('SDM002', 'Online Consultation', 1),
('SDM003', 'Clinic Appointment', 1),
('SDM004', 'Emergency Visit', 1),
('SDM005', 'Follow-up Consultation', 1);

-- Insert sample data for Service
INSERT INTO Service (ServiceID, ServiceDeliveryMethodID, Name, Price, Description, Status) 
VALUES 
('S001', 'SDM001', 'Koi Health Check', 100.00, 'Basic health check for koi fish', 1),
('S002', 'SDM002', 'Virtual Koi Consultation', 75.00, 'Online consultation with koi specialist', 1),
('S003', 'SDM003', 'Koi Disease Treatment', 150.00, 'Treatment for common koi diseases', 1),
('S004', 'SDM004', 'Emergency Koi Surgery', 300.00, 'Urgent surgical procedure for koi', 1),
('S005', 'SDM005', 'Post-Treatment Checkup', 50.00, 'Follow-up checkup after treatment', 1);

-- Insert sample data for Feedback
INSERT INTO Feedback (FeedbackID, Description, Status) 
VALUES 
('FB001', 'Great service!', 1),
('FB002', 'Needs improvement.', 1),
('FB003', 'Very satisfied with the consultation.', 1),
('FB004', 'Prompt and professional.', 1),
('FB005', 'Koi surgery saved my fish!', 1);

-- Insert sample data for SlotCategory
INSERT INTO SlotCategory (SlotCategoryID, SlotName) 
VALUES 
(1, 'Morning'),
(2, 'Afternoon'),
(3, 'Evening'),
(4, 'Night'),
(5, 'Early Morning');

-- Insert sample data for Schedule
INSERT INTO Schedule (ScheduleID, EmployeeID, Date, Status, Note, SlotCategoryID, SlotNote) 
VALUES 
('SCH001', 'E001', '2024/09/01', 1, 'Regular checkup', 1, 'Morning slot'),
('SCH002', 'E002', '2024/09/02', 1, 'Consultation', 2, 'Afternoon slot'),
('SCH003', 'E003', '2024/09/03', 1, 'Follow-up', 3, 'Evening slot'),
('SCH004', 'E004', '2024/09/04', 1, 'Emergency', 4, 'Night slot'),
('SCH005', 'E005', '2024/09/05', 1, 'Routine check', 5, 'Early Morning slot');

-- Insert sample data for Booking
INSERT INTO Booking (BookingID, ServiceID, CustomerID, EmployeeID, BookingDate, ExpiredDate, PaymentMethodID, PaymentStatusID, DeliveryMethod, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID) 
VALUES 
('B001', 'S001', 'C001', 'E001', '2024-08-20', '2024-08-25', 'PM001', 'PS001', 'Home', 0.1, '123 Main St', 5.0, 50.00, 150.00, 'Completed', 'FB001', 'SCH001'),
('B002', 'S002', 'C002', 'E002', '2024-08-21', '2024-08-26', 'PM002', 'PS002', 'Online', 0.1, '456 Maple Ave', 0, 0.00, 90.00, 'Pending', 'FB002', 'SCH002'),
('B003', 'S003', 'C003', 'E003', '2024-08-22', '2024-08-27', 'PM003', 'PS003', 'Clinic', 0.1, '789 Oak St', 8.0, 60.00, 210.00, 'Cancelled', 'FB003', 'SCH003'),
('B004', 'S004', 'C004', 'E004', '2024-08-23', '2024-08-28', 'PM004', 'PS004', 'Emergency', 0.1, '321 Birch Ave', 15.0, 90.00, 390.00, 'Failed', 'FB004', 'SCH004'),
('B005', 'S005', 'C005', 'E005', '2024-08-24', '2024-08-29', 'PM004', 'PS005', 'Follow-up', 0.1, '654 Pine St', 3.0, 30.00, 80.00, 'Refunded', 'FB005', 'SCH005');

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT001', 'Koi'),
('AT002', 'Goldfish'),
('AT003', 'Tropical Fish'),
('AT004', 'Saltwater Fish'),
('AT005', 'Betta Fish');

-- Insert sample data for AnimalProfile
-- INSERT INTO AnimalProfile (AnimalProfileID, Name,
