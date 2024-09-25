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
create table ServiceDeliveryMethod(
ServiceDeliveryMethodID varchar(20) primary key,
Name varchar(100) not null,
Status bit,
)

go
create table Service(
ServiceID varchar(20) primary key,
ServiceDeliveryMethodID varchar(20) foreign key references ServiceDeliveryMethod(ServiceDeliveryMethodID) not null,
Name nvarchar(30) not null,
Price money not null,
Description nvarchar,
Status bit,
)

go
create table Feedback(
FeedbackID varchar(20) primary key,
Description nvarchar not null,
Status bit not null
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
ServiceTypeID varchar(20) foreign key references Service(ServiceID) not null,
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
)

go
create table BookingDetail(
BookingDetailID varchar(20) primary key,
BookingID varchar(20) foreign key references Booking(BookingID) not null,
ServiceID varchar(20) foreign key references Service(ServiceID) not null,
AnimalProfileID varchar(20) foreign key references AnimalProfile(AnimalProfileID) not null, 
PoolProfileID varchar(20) foreign key references PoolProfile(PoolProfileID) not null,
UnitPrice money not null,
NoteResult nvarchar,
NoteExamination nvarchar,
AnimalStatusDescription nvarchar ,
ConsultDoctor nvarchar ,
DrugList nvarchar ,
PoolStatusDescription nvarchar,
ConsultTechnician nvarchar,
MaterialList nvarchar,
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

go
create table Dashboard(
DashboardID varchar(20) primary key,
CustomerID varchar(20) foreign key references Customer(CustomerID),
BookingID varchar(20) foreign key references Booking(BookingID),
)
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
INSERT INTO Customer (CustomerID, Email, RoleID, PhoneNumber, Firstname, Lastname, Sex, Birthday, Avatar, Address, Password, Status, Picture) 
VALUES 
('C001', 'kyn6036@gmail.com', 'R002', '0123456789', 'Vy', 'Nguyen', 1, '2004-20-11', 'avatar1.jpg', '250 vo van hat', '12345', 1, 'pic1.jpg'),
('C002', 'jane@gmail.com', 'R002', '0987654321', 'Jane', 'Smith', 0, '1985-03-15', 'avatar2.jpg', '456 Maple Ave', '12345', 1, 'pic2.jpg'),
('C003', 'alice@gmail.com', 'R003', '0111222333', 'Alice', 'Johnson', 0, '1995-07-22', 'avatar3.jpg', '789 Oa St', '12345', 1, 'pic3.jpg'),
('C004', 'bob@gmail.com', 'R002', '0223344556', 'Bob', 'Brown', 1, '1982-11-02', 'avatar4.jpg', '321 Birch Ave', '12345', 1, 'pic4.jpg'),
('C005', 'carol@gmail.com', 'R002', '0334455667', 'Carol', 'White', 0, '1979-08-14', 'avatar5.jpg', '654 Pine St', '12345', 1, 'pic5.jpg');

-- Insert sample data for Employee
INSERT INTO Employee (EmployeeID, Email, RoleID, PhoneNumber, Firstname, Lastname, Sex, Birthday, Avatar, Address, Password, Status, Picture) 
VALUES 
('E001', 'vet1@gmail.com', 'R003', '0123456789', 'Sam', 'Wilson', 1, '1980-01-15', 'avatar3.jpg', '789 Cedar St', '123456', 1, 'pic3.jpg'),
('E002', 'vet2@gmail.com', 'R003', '0456677889', 'Lily', 'Anderson', 0, '1988-04-25', 'avatar4.jpg', '111 Maple St', '123456', 1, 'pic4.jpg'),
('E003', 'Manager@gmail.com', 'R001', '0223344556', 'Tom', 'Clark', 1, '1991-02-19', 'avatar5.jpg', '222 Oak Dr', '123456', 1, 'pic5.jpg'),
('E004', 'reception1@gmai.com', 'R005', '0334455667', 'Nancy', 'Lee', 0, '1985-12-12', 'avatar6.jpg', '333 Pine Ln', '123456', 1, 'pic6.jpg'),
('E005', 'admin@gmail.com', 'R001', '0998877665', 'Michael', 'Scott', 1, '1975-09-08', 'avatar7.jpg', '444 Birch Rd', '123456', 1, 'pic7.jpg');

-- Insert sample data for PaymentMethod
INSERT INTO PaymentMethod (PaymentMethodID, PaymentName) 
VALUES 
('PM001', 'Credit Card'),
('PM002', 'PayPal'),
('PM003', 'Bank Transfer'),
('PM004', 'Cash'),


-- Insert sample data for PaymentStatus
INSERT INTO PaymentStatus (PaymentStatusID, StatusName) 
VALUES 
('PS001', 'Paid'),
('PS002', 'Pending'),
('PS003', 'Cancelled'),
('PS004', 'Failed'),
('PS005', 'Refunded');

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
('SCH001', 'E001', '2024-09-01', 1, 'Regular checkup', 1, 'Morning slot'),
('SCH002', 'E001', '2024-09-02', 1, 'Consultation', 2, 'Afternoon slot'),
('SCH003', 'E002', '2024-09-03', 1, 'Follow-up', 3, 'Evening slot'),
('SCH004', 'E003', '2024-09-04', 1, 'Emergency', 4, 'Night slot'),
('SCH005', 'E004', '2024-09-05', 1, 'Routine check', 5, 'Early Morning slot');

-- Insert sample data for Booking
INSERT INTO Booking (BookingID, ServiceTypeID, CustomerID, EmployeeID, BookingDate, ExpiredDate, PaymentMethodID, PaymentStatusID, DeliveryMethod, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID) 
VALUES 
('B001', 'S001', 'C001', 'E001', '2024-08-20', '2024-08-25', 'PM001', 'PS001', 'Home', '10%', '123 Main St', 5.0, 50.00, 150.00, 'Completed', 'FB001', 'SCH001'),
('B002', 'S002', 'C002', 'E002', '2024-08-21', '2024-08-26', 'PM002', 'PS002', 'Online', '15%', '456 Maple Ave', 0, 0.00, 90.00, 'Pending', 'FB002', 'SCH002'),
('B003', 'S003', 'C003', 'E003', '2024-08-22', '2024-08-27', 'PM003', 'PS003', 'Clinic', '20%', '789 Oak St', 8.0, 60.00, 210.00, 'Cancelled', 'FB003', 'SCH003'),
('B004', 'S004', 'C004', 'E004', '2024-08-23', '2024-08-28', 'PM004', 'PS004', 'Emergency', '18%', '321 Birch Ave', 15.0, 90.00, 390.00, 'Failed', 'FB004', 'SCH004'),
('B005', 'S005', 'C005', 'E005', '2024-08-24', '2024-08-29', 'PM005', 'PS005', 'Follow-up', '12%', '654 Pine St', 3.0, 30.00, 80.00, 'Refunded', 'FB005', 'SCH005');

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT001', 'Koi'),
('AT002', 'Goldfish'),
('AT003', 'Tropical Fish'),
('AT004', 'Saltwater Fish'),
('AT005', 'Betta Fish');

-- Insert sample data for AnimalProfile
INSERT INTO AnimalProfile (AnimalProfileID, Name,
