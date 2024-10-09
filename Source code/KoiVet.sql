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
    Firstname nvarchar(20) NOT NULL,
    Lastname nvarchar(20),
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
    Date date NOT NULL,
    Note nvarchar(MAX),
    Slot int,
    SlotCapacity int,
    SlotStatus nvarchar(200) NOT NULL
)
GO

CREATE TABLE Booking(
    BookingID nvarchar(20) PRIMARY KEY ,
    CustomerID nvarchar(20) FOREIGN KEY REFERENCES Customer(CustomerID),
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    BookingDate datetime NOT NULL,
    ExpiredDate date NOT NULL,
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
    Incidental boolean,
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
('R001', 'Manager'),
('R002', 'Customer'),
('R003', 'Veterinarian'),
('R004', 'Guest'),
('R005', 'Staff');
GO

-- Insert sample data for Customer
INSERT INTO Account (AccountID, PhoneNumber, Email, RoleID, Avatar, Password, Status, isActive )
VALUES
('A001', '0123456789', 'phbtoan9185@gmail.com', 'R002', 'avatar1.jpg', 'caniskip', 'Normal', 1),
('A002', '0987654321', 'admin2@gmail.com', 'R002', 'avatar2.jpg', 'admin', 'Normal', 1),
('A003', '0111111111', 'arandomvet@gmail.com', 'R002', 'avatar3.jpg', 'vet', 'Normal', 1),
('A004', '0121111111', 'manager2@gmail.com', 'R002', 'avatar4.jpg', 'manager', 'Normal', 1),
('A005', '0123212313', 'Test@gmail.com', 'R002', 'avatar5.jpg', 'test', 'Normal', 1),

('A006', '0000000000', 'vet1@gmail.com', 'R002', 'avatar1.jpg', 'caniskip', 'Normal', 1),
('A007', '0835377623', 'vet2@gmail.com', 'R005', 'avatar2.jpg', 'admin', 'Normal', 1),
('A008', '1122334455', 'Manager@gmail.com', 'R003', 'avatar3.jpg', 'vet', 'Normal', 1),
('A009', '1234554321', 'reception1@gmai.com', 'R001', 'avatar4.jpg', 'manager', 'Normal', 1),
('A010', '1234567876', 'admin@gmail.com', 'R002', 'avatar5.jpg', 'test', 'Normal', 1);
GO

INSERT INTO Customer (CustomerID, Firstname, Lastname, Sex, Birthday, Address, AccountID, Status) 
VALUES 
('C001', 'Vy', 'Nguyen', 1, '2004-11-20', '250 vo van hat', 'A001', 1),
('C002', 'Jane', 'Smith', 0, '1985-03-15', '456 Maple Ave', 'A002', 1),
('C003', 'Alice', 'Johnson', 0, '1995-07-22', '789 Oa St', 'A003', 1),
('C004', 'Bob', 'Brown', 1, '1982-11-02', '321 Birch Ave', 'A004', 1),
('C005', 'Carol', 'White', 0, '1979-08-14', '654 Pine St', 'A005', 1);
GO
-- Insert sample data for Employee
INSERT INTO Employee (EmployeeID, AccountID, Firstname, Lastname, Sex, Birthday, Address, Status) 
VALUES 
('E001', 'A006', 'Sam', 'Wilson', 1, '1980-01-15', '789 Cedar St', 1),
('E002', 'A007', 'Lily', 'Anderson', 0, '1988-04-25', '111 Maple St', 1),
('E003', 'A008', 'Tom', 'Clark', 1, '1991-02-19', '222 Oak Dr', 1),
('E004', 'A009', 'Nancy', 'Lee', 0, '1985-12-12', '333 Pine Ln', 1),
('E005', 'A010', 'Michael', 'Scott', 1, '1975-09-08', '444 Birch Rd', 1);

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
INSERT INTO Feedback (FeedbackID, ServiceRating, VetRating, Description, Status) 
VALUES 
('FB001', 5, 5, 'Great service!', 'Active'),
('FB002', 3, 3, 'Needs improvement.', 'Active'),
('FB003', 5, 5, 'Very satisfied with the consultation.', 'Active'),
('FB004', 4, 5, 'Prompt and professional.', 'Active'),
('FB005', 5, 5, 'Koi surgery saved my fish!', 'Active');

-- Insert sample data for Schedule
INSERT INTO Schedule (ScheduleID, EmployeeID, Date, Note, Slot, SlotCapacity, SlotStatus) 
VALUES 
('SCH001', 'E001', '2024/09/01', 'Regular checkup', 1, 5, 'Morning slot'),
('SCH002', 'E002', '2024/09/02', 'Consultation', 2, 4, 'Afternoon slot'),
('SCH003', 'E003', '2024/09/03', 'Follow-up', 3, 3, 'Evening slot'),
('SCH004', 'E004', '2024/09/04', 'Emergency', 4, 4, 'Night slot'),
('SCH005', 'E005', '2024/09/05', 'Routine check', 5, 1, 'Early Morning slot');

-- Insert sample data for Booking
INSERT INTO Booking (BookingID, CustomerID, EmployeeID, BookingDate, ExpiredDate, Deposit, ServiceDeliveryMethodID, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID, Note, PaymentMethod, PaymentStatus) 
VALUES 
('B001', 'C001', 'E001', '2024-09-01 09:00:00', '2024-09-01', 50.00, 'SDM001', 10.00, '250 vo van hat', 5.5, 11.00, 111.00, 'Confirmed', 'FB001', 'SCH001', 'Home visit for koi health check', 'Credit Card', 'Paid'),
('B002', 'C002', 'E002', '2024-09-02 14:00:00', '2024-09-02', 37.50, 'SDM002', 7.50, '456 Maple Ave', 0, 0.00, 82.50, 'Pending', 'FB002', 'SCH002', 'Online consultation for koi', 'PayPal', 'Pending'),
('B003', 'C003', 'E003', '2024-09-03 18:00:00', '2024-09-03', 75.00, 'SDM003', 15.00, '789 Oak St', 3.2, 6.40, 171.40, 'Cancelled', 'FB003', 'SCH003', 'Clinic visit for koi disease treatment', 'Cash', 'Refunded'),
('B004', 'C004', 'E004', '2024-09-04 22:00:00', '2024-09-05', 150.00, 'SDM004', 30.00, '321 Birch Ave', 8.7, 17.40, 347.40, 'In Progress', 'FB004', 'SCH004', 'Emergency koi surgery', 'Credit Card', 'Paid'),
('B005', 'C005', 'E005', '2024-09-05 07:00:00', '2024-09-05', 25.00, 'SDM005', 5.00, '654 Pine St', 2.1, 4.20, 59.20, 'Completed', 'FB005', 'SCH005', 'Follow-up checkup after treatment', 'Debit Card', 'Paid'); 

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT001', 'Koi'),
('AT002', 'Goldfish'),
('AT003', 'Tropical Fish'),
('AT004', 'Saltwater Fish'),
('AT005', 'Betta Fish');

-- Insert sample data for BookingDetail
INSERT INTO BookingDetail (BookingDetailID, BookingID, ServiceID, UnitPrice, NoteResult, NoteExamination, AnimalStatusDescription, ConsultDoctor, DrugList, PoolStatusDescription, ConsultTechnician, MaterialList)
VALUES 
('BD001', 'B001', 'S001', 100.00, 'Koi appears healthy overall', 'Routine health check performed', 'Nishiki shows good coloration and active behavior', 'Dr. Amelia Fish', 'Probiotic supplement', 'Zen Garden Koi Pond maintains good water quality', 'Tech John Doe', 'Water testing kit, net'),

('BD002', 'B002', 'S002', 75.00, 'Goldfish exhibiting signs of stress', 'Observed labored breathing and loss of appetite', 'Bubbles has clamped fins and reduced activity', 'Dr. Michael Scales', 'Antibiotics, stress coat additive', 'Indoor Goldfish Tank requires improved filtration', 'Tech Jane Smith', 'New filter system, air pump'),

('BD003', 'B003', 'S003', 150.00, 'Tropical fish recovering from minor infection', 'Treated for bacterial infection', 'Nemo shows improvement in fin condition and appetite', 'Dr. Sarah Coral', 'Broad-spectrum antibiotic, vitamin supplements', 'Tropical Reef Aquarium parameters stable', 'Tech Robert Johnson', 'UV sterilizer, coral food'),

('BD004', 'B004', 'S004', 300.00, 'Emergency surgery successful', 'Removed foreign object from blue tang', 'Azure is stable post-surgery, requires close monitoring', 'Dr. David Finn', 'Pain medication, antibiotics', 'Saltwater Lagoon quarantine section set up', 'Tech Emily Waters', 'Surgical tools, quarantine tank'),

('BD005', 'B005', 'S005', 50.00, 'Betta fish in excellent condition', 'Regular check-up completed', 'Crimson displays vibrant colors and active behavior', 'Dr. Lisa Gills', 'None required', 'Betta Paradise tank environment optimal', 'Tech Mark River', 'Water conditioner, betta-specific food');

-- Insert sample data for AnimalProfile
INSERT INTO AnimalProfile (AnimalProfileID, Name, TypeID, BookingDetailID, Size, Age, Color, Description, Sex, Picture) 

VALUES 
('AP001', 'Nishiki', 'AT001', 'BD001', 24.5, 3, 'Red and White', 'A beautiful Kohaku koi with vibrant red patches on a white body', 1, 'nishiki_koi.jpg'),
('AP002', 'Bubbles', 'AT002', 'BD002', 6.0, 2, 'Orange', 'Energetic fancy goldfish with a bubbly personality', 0, 'bubbles_goldfish.jpg'),
('AP003', 'Nemo', 'AT003', 'BD003', 3.5, 1, 'Orange and White', 'Playful clownfish, always hiding in the anemone', 1, 'nemo_clownfish.jpg'),
('AP004', 'Azure', 'AT004', 'BD004', 12.0, 4, 'Blue', 'Majestic blue tang with vibrant coloration', 0, 'azure_bluetang.jpg'),
('AP005', 'Crimson', 'AT005', 'BD005', 2.5, 1, 'Red', 'Feisty betta fish with flowing fins', 1, 'crimson_betta.jpg');

-- Insert sample data for PoolProfile
INSERT INTO PoolProfile (PoolProfileID, Name, BookingDetailID, Note, Width, Description, Height, Depth, Picture)
VALUES 
('PP001', 'Zen Garden Koi Pond', 'BD001', 'Requires weekly maintenance', 15.0, 'A traditional Japanese-style koi pond with a small waterfall and surrounding rock garden', 2.5, 4.0, 'zen_garden_pond.jpg'),
('PP002', 'Indoor Goldfish Tank', 'BD002', 'Check filter system monthly', 4.0, 'A large, well-lit indoor aquarium designed for multiple goldfish', 2.0, 2.0, 'indoor_goldfish_tank.jpg'),
('PP003', 'Tropical Reef Aquarium', 'BD003', 'Maintain consistent water temperature', 6.0, 'A colorful reef tank with live corals and various tropical fish species', 3.0, 2.5, 'tropical_reef_aquarium.jpg'),
('PP004', 'Saltwater Lagoon', 'BD004', 'Monitor salinity levels regularly', 20.0, 'An expansive outdoor saltwater pool mimicking a natural lagoon environment', 5.0, 6.0, 'saltwater_lagoon.jpg'),
('PP005', 'Betta Paradise', 'BD005', 'Ensure proper hiding spots and plant coverage', 2.0, 'A specially designed tank with multiple compartments for housing several betta fish', 1.5, 1.0, 'betta_paradise_tank.jpg');

-- Insert sample data for FAQ
INSERT INTO FAQ (FaqID, Question, Answer) VALUES
('FAQ001', 'What is a Koi fish?', 'Koi are colorful fish that are kept in ponds and water gardens, known for their beauty and variety.'),
('FAQ002', 'How long do Koi live?', 'Koi can live for several decades, with some living over 200 years under optimal conditions.'),
('FAQ003', 'What do Koi eat?', 'Koi are omnivorous and can eat a variety of foods including pellets, vegetables, and insects.'),
('FAQ004', 'How big do Koi get?', 'Koi can grow to be quite large, often reaching sizes of 2 to 3 feet in length.'),
('FAQ005', 'What is the best water temperature for Koi?', 'Koi thrive in water temperatures between 65��F and 75��F (18��C to 24��C).');

-- Insert sample data for PostCategory
INSERT INTO PostCategory (PostCategoryID, Name) VALUES
('CAT001', 'Koi Care'),
('CAT002', 'Koi Breeding'),
('CAT003', 'Koi Health'),
('CAT004', 'Koi Pond Design'),
('CAT005', 'Koi Varieties');

-- Insert sample data for Post
INSERT INTO Post (PostID, PostName, PostCategoryID, Context) VALUES
('POST001', 'Essential Koi Care Tips', 'CAT001', 'This post discusses the essential tips for properly taking care of your Koi fish.'),
('POST002', 'Breeding Koi: A Step-by-Step Guide', 'CAT002', 'Learn how to breed Koi fish successfully with this comprehensive guide.'),
('POST003', 'Common Koi Diseases and Solutions', 'CAT003', 'An overview of common diseases that affect Koi and how to treat them.'),
('POST004', 'Designing the Perfect Koi Pond', 'CAT004', 'Explore the key elements of designing a beautiful and functional Koi pond.'),
('POST005', 'A Guide to Popular Koi Varieties', 'CAT005', 'This article highlights some of the most popular Koi varieties and their unique features.');
