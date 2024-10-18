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
    Name nvarchar(30) NOT NULL,
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
    Date Date NOT NULL,
    Note nvarchar(MAX),
    Slot int,
    SlotCapacity int,
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
    ServiceDeliveryMethodID nvarchar(20) FOREIGN KEY REFERENCES ServiceDeliveryMethod(ServiceDeliveryMethodID) NOT NULL,
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
    NoteExamination nvarchar(MAX),
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
    BookingDetailID nvarchar(20) FOREIGN KEY REFERENCES BookingDetail(BookingDetailID) NOT NULL,
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
    BookingDetailID nvarchar(20) FOREIGN KEY REFERENCES BookingDetail(BookingDetailID) NOT NULL,
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

USE [FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter]

-- Insert sample data for Role
INSERT INTO Role (RoleID, Rolename) 
VALUES 
('R1', 'Manager'),
('R2', 'Staff'),
('R3', 'Veterinarian'),
('R4', 'Customer'),
('R5', 'Guest');
GO

-- Insert sample data for Customer
INSERT INTO Account (AccountID, PhoneNumber, Email, RoleID, Avatar, Password, Status, isActive )
VALUES
('A1', '0123456789', 'phbtoan9185@gmail.com', 'R2', 'avatar1.jpg', 'caniskip', 'Normal', 1),
('A2', '0987654321', 'admin2@gmail.com', 'R2', 'avatar2.jpg', 'admin', 'Normal', 1),
('A3', '0111111111', 'arandomvet@gmail.com', 'R2', 'avatar3.jpg', 'vet', 'Normal', 1),
('A4', '0121111111', 'manager2@gmail.com', 'R2', 'avatar4.jpg', 'manager', 'Normal', 1),
('A5', '0123212313', 'Test@gmail.com', 'R2', 'avatar5.jpg', 'test', 'Normal', 1),

('A6', '0000000000', 'longtnhse173174@fpt.edu.vn', 'R1', 'avatar1.jpg', 'tangdeptrai', 'Normal', 1),
('A7', '0835377623', 'vet2@gmail.com', 'R5', 'avatar2.jpg', 'admin', 'Normal', 1),
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
('E1', 'A6', 'R1', 'Duong', 'Tang', 1, '2003-01-02', 'VinHome Q9', 1),
('E2', 'A7', 'R2', 'Lily', 'Anderson', 0, '1988-04-25', '111 Maple St', 1),
('E3', 'A8', 'R3', 'Tom', 'Clark', 1, '1991-02-19', '222 Oak Dr', 1),
('E4', 'A9', 'R2', 'Nancy', 'Lee', 0, '1985-12-12', '333 Pine Ln', 1),
('E5', 'A10', 'R3', 'Michael', 'Scott', 1, '1975-09-08', '444 Birch Rd', 1);

-- Insert sample data for ServiceDeliveryMethod
INSERT INTO ServiceDeliveryMethod (ServiceDeliveryMethodID, Name, Status) 
VALUES 
('SDM1', 'Home Visit', 1),
('SDM2', 'Online Consultation', 1),
('SDM3', 'Clinic Appointment', 1),
('SDM4', 'Emergency Visit', 1),
('SDM5', 'Follow-up Consultation', 1);

-- Insert sample data for Service
INSERT INTO Service (ServiceID, ServiceDeliveryMethodID, Name, Price, Description, Status) 
VALUES 
('S001', 'SDM001', 'Koi Health Check', 100000, 'Basic health check for koi fish', 1),
('S002', 'SDM002', 'Virtual Koi Consultation', 75000, 'Online consultation with koi specialist', 1),
('S003', 'SDM003', 'Koi Disease Treatment', 150000, 'Treatment for common koi diseases', 1),
('S004', 'SDM004', 'Emergency Koi Surgery', 300000, 'Urgent surgical procedure for koi', 1),
('S005', 'SDM005', 'Post-Treatment Checkup', 50000, 'Follow-up checkup after treatment', 1);

-- Insert sample data for Feedback
INSERT INTO Feedback (FeedbackID, ServiceRating, VetRating, Description, Status) 
VALUES 
('FB1', 5, 5, 'Great service!', 'Active'),
('FB2', 3, 3, 'Needs improvement.', 'Active'),
('FB3', 5, 5, 'Very satisfied with the consultation.', 'Active'),
('FB4', 4, 5, 'Prompt and professional.', 'Active'),
('FB5', 5, 5, 'Koi surgery saved my fish!', 'Active');

-- Insert sample data for Schedule
INSERT INTO Schedule (ScheduleID, EmployeeID, Date, Note, Slot, SlotCapacity, SlotStatus) 
VALUES 
('SCH001', 'E003', '2024/09/01', 'Regular checkup', 1, 5, 1),
('SCH002', 'E003', '2024/09/01', 'Consultation', 2, 4, 1),
('SCH003', 'E003', '2024/09/01', 'Follow-up', 3, 3, 1),
('SCH004', 'E003', '2024/09/01', 'Emergency', 4, 4, 1),
('SCH005', 'E003', '2024/09/01', 'Routine check', 5, 1, 1),
('SCH006', 'E003', '2024/09/01', 'Regular checkup', 6, 5, 0),
('SCH007', 'E003', '2024/09/01', 'Consultation', 7, 4, 0),
('SCH008', 'E003', '2024/09/01', 'Follow-up', 8, 3, 0),
('SCH009', 'E005', '2024/09/02', 'Emergency', 1, 4, 1),
('SCH010', 'E005', '2024/09/02', 'Routine check', 2, 1, 0);
--NumberOfFish int not null,
   -- IncidentalFish 
-- Insert sample data for Booking
INSERT INTO Booking (BookingID, CustomerID, EmployeeID, BookingDate, ExpiredDate, Deposit, NumberOfFish, IncidentalFish, ServiceDeliveryMethodID, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID, Note, PaymentMethod, PaymentStatus) 
VALUES 
('B001', 'C001', 'E001', '2024-09-01 09:00:00', '2024-09-01 04:00:00', 50.00, 1, 0,'SDM001', 10.00, '250 vo van hat', 5.5, 11.00, 661000, 'Confirmed', 'FB001', 'SCH001', 'Home visit for koi health check', 'Credit Card', 'Pending'),
('B002', 'C002', 'E002', '2024-09-02 14:00:00', '2024-09-02 04:00:00', 37.50, 1, 0,'SDM002', 7.50, '456 Maple Ave', 0, 0.00, 397500, 'Pending', 'FB002', 'SCH002', 'Online consultation for koi', 'PayPal', 'Pending'),
('B003', 'C003', 'E003', '2024-09-03 18:00:00', '2024-09-03 04:00:00', 75.00, 1, 0,'SDM003', 15.00, '789 Oak St', 3.2, 6.40, 996000, 'Cancelled', 'FB003', 'SCH003', 'Clinic visit for koi disease treatment', 'Cash', 'Pending'),
('B004', 'C004', 'E004', '2024-09-04 22:00:00', '2024-09-05 04:00:00', 150.00, 1, 0,'SDM004', 30.00, '321 Birch Ave', 8.7, 17.40, 2000000, 'In Progress', 'FB004', 'SCH004', 'Emergency koi surgery', 'Credit Card', 'Pending'),
('B005', 'C005', 'E005', '2024-09-05 07:00:00', '2024-09-05 04:00:00', 25.00, 1, 1,'SDM005', 5.00, '654 Pine St', 2.1, 4.20, 867000, 'Completed', 'FB005', 'SCH005', 'Follow-up checkup after treatment', 'Debit Card', 'Pending'); 

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT1', 'Koi'),
('AT2', 'Goldfish'),
('AT3', 'Tropical Fish'),
('AT4', 'Saltwater Fish'),
('AT5', 'Betta Fish');

-- Insert sample data for BookingDetail
INSERT INTO BookingDetail (BookingDetailID, BookingID, ServiceID, UnitPrice, Incidental, NoteResult, NoteExamination, AnimalStatusDescription, ConsultDoctor, DrugList, PoolStatusDescription, ConsultTechnician, MaterialList)
VALUES 
('BD1', 'B1', 'S1', 100.00, 0,'Koi appears healthy overall', 'Routine health check performed', 'Nishiki shows good coloration and active behavior', 'Dr. Amelia Fish', 'Probiotic supplement', 'Zen Garden Koi Pond maintains good water quality', 'Tech John Doe', 'Water testing kit, net'),

('BD2', 'B2', 'S2', 75.00, 0,'Goldfish exhibiting signs of stress', 'Observed labored breathing and loss of appetite', 'Bubbles has clamped fins and reduced activity', 'Dr. Michael Scales', 'Antibiotics, stress coat additive', 'Indoor Goldfish Tank requires improved filtration', 'Tech Jane Smith', 'New filter system, air pump'),

('BD3', 'B3', 'S3', 150.00, 0,'Tropical fish recovering from minor infection', 'Treated for bacterial infection', 'Nemo shows improvement in fin condition and appetite', 'Dr. Sarah Coral', 'Broad-spectrum antibiotic, vitamin supplements', 'Tropical Reef Aquarium parameters stable', 'Tech Robert Johnson', 'UV sterilizer, coral food'),

('BD4', 'B4', 'S4', 300.00, 0,'Emergency surgery successful', 'Removed foreign object from blue tang', 'Azure is stable post-surgery, requires close monitoring', 'Dr. David Finn', 'Pain medication, antibiotics', 'Saltwater Lagoon quarantine section set up', 'Tech Emily Waters', 'Surgical tools, quarantine tank'),

('BD5', 'B5', 'S5', 50.00, 0,'Betta fish in excellent condition', 'Regular check-up completed', 'Crimson displays vibrant colors and active behavior', 'Dr. Lisa Gills', 'None required', 'Betta Paradise tank environment optimal', 'Tech Mark River', 'Water conditioner, betta-specific food');

-- Insert sample data for AnimalProfile
INSERT INTO AnimalProfile (AnimalProfileID, Name, TypeID, BookingDetailID, Size, Age, Color, Description, Sex, Picture) 

VALUES 
('AP1', 'Nishiki', 'AT1', 'BD1', 24.5, 3, 'Red and White', 'A beautiful Kohaku koi with vibrant red patches on a white body', 1, 'nishiki_koi.jpg'),
('AP2', 'Bubbles', 'AT2', 'BD2', 6.0, 2, 'Orange', 'Energetic fancy goldfish with a bubbly personality', 0, 'bubbles_goldfish.jpg'),
('AP3', 'Nemo', 'AT3', 'BD3', 3.5, 1, 'Orange and White', 'Playful clownfish, always hiding in the anemone', 1, 'nemo_clownfish.jpg'),
('AP4', 'Azure', 'AT4', 'BD4', 12.0, 4, 'Blue', 'Majestic blue tang with vibrant coloration', 0, 'azure_bluetang.jpg'),
('AP5', 'Crimson', 'AT5', 'BD5', 2.5, 1, 'Red', 'Feisty betta fish with flowing fins', 1, 'crimson_betta.jpg');

-- Insert sample data for PoolProfile
INSERT INTO PoolProfile (PoolProfileID, Name, BookingDetailID, Note, Width, Description, Height, Depth, Picture)
VALUES 
('PP1', 'Zen Garden Koi Pond', 'BD1', 'Requires weekly maintenance', 15.0, 'A traditional Japanese-style koi pond with a small waterfall and surrounding rock garden', 2.5, 4.0, 'zen_garden_pond.jpg'),
('PP2', 'Indoor Goldfish Tank', 'BD2', 'Check filter system monthly', 4.0, 'A large, well-lit indoor aquarium designed for multiple goldfish', 2.0, 2.0, 'indoor_goldfish_tank.jpg'),
('PP3', 'Tropical Reef Aquarium', 'BD3', 'Maintain consistent water temperature', 6.0, 'A colorful reef tank with live corals and various tropical fish species', 3.0, 2.5, 'tropical_reef_aquarium.jpg'),
('PP4', 'Saltwater Lagoon', 'BD4', 'Monitor salinity levels regularly', 20.0, 'An expansive outdoor saltwater pool mimicking a natural lagoon environment', 5.0, 6.0, 'saltwater_lagoon.jpg'),
('PP5', 'Betta Paradise', 'BD5', 'Ensure proper hiding spots and plant coverage', 2.0, 'A specially designed tank with multiple compartments for housing several betta fish', 1.5, 1.0, 'betta_paradise_tank.jpg');

-- Insert sample data for FAQ
INSERT INTO FAQ (FaqID, Question, Answer) VALUES
('FAQ1', 'What is a Koi fish?', 'Koi are colorful fish that are kept in ponds and water gardens, known for their beauty and variety.'),
('FAQ2', 'How long do Koi live?', 'Koi can live for several decades, with some living over 200 years under optimal conditions.'),
('FAQ3', 'What do Koi eat?', 'Koi are omnivorous and can eat a variety of foods including pellets, vegetables, and insects.'),
('FAQ4', 'How big do Koi get?', 'Koi can grow to be quite large, often reaching sizes of 2 to 3 feet in length.'),
('FAQ5', 'What is the best water temperature for Koi?', 'Koi thrive in water temperatures between 65��F and 75��F (18��C to 24��C).');

-- Insert sample data for PostCategory
INSERT INTO PostCategory (PostCategoryID, Name) VALUES
('CAT1', 'Koi Care'),
('CAT2', 'Koi Breeding'),
('CAT3', 'Koi Health'),
('CAT4', 'Koi Pond Design'),
('CAT5', 'Koi Varieties');

-- Insert sample data for Post
INSERT INTO Post (PostID, PostName, PostCategoryID, Context) VALUES
('POST001', 'Essential Koi Care Tips', 'CAT001', 'This post discusses the essential tips for properly taking care of your Koi fish.'),
('POST002', 'Breeding Koi: A Step-by-Step Guide', 'CAT002', 'Learn how to breed Koi fish successfully with this comprehensive guide.'),
('POST003', 'Common Koi Diseases and Solutions', 'CAT003', 'An overview of common diseases that affect Koi and how to treat them.'),
('POST004', 'Designing the Perfect Koi Pond', 'CAT004', 'Explore the key elements of designing a beautiful and functional Koi pond.'),
('POST005', 'A Guide to Popular Koi Varieties', 'CAT005', 'This article highlights some of the most popular Koi varieties and their unique features.');
