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
);
GO

Create table Account(
    AccountID nvarchar(30) primary key ,
    Email nvarchar(30) UNIQUE NOT NULL,
    PhoneNumber nvarchar(10) UNIQUE NOT NULL,
    RoleID nvarchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
    Avatar nvarchar(500),
    Password nvarchar(50) NOT NULL,
    Status nvarchar(50) NOT NULL,
	IsActive bit not null,
);

CREATE TABLE Customer(
    CustomerID nvarchar(20) PRIMARY KEY,
    AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    FirstName nvarchar(20) NOT NULL,
    LastName nvarchar(20),
    Sex bit,
    Birthday date,
    Address nvarchar(100) NOT NULL,
    Status nvarchar(50) NOT NULL
);
GO

CREATE TABLE Employee(
    EmployeeID nvarchar(20) PRIMARY KEY,
	AccountID nvarchar(30) FOREIGN KEY REFERENCES Account(AccountID),
    RoleID nvarchar(20) FOREIGN KEY REFERENCES Role(RoleID) NOT NULL,
	FirstName nvarchar(20) NOT NULL,
    LastName nvarchar(20) NOT NULL,
    Sex bit,
    Birthday date,
    Address nvarchar(100) NOT NULL,
    Status nvarchar(50) NOT NULL,
);
GO

CREATE TABLE ServiceDeliveryMethod(
    ServiceDeliveryMethodID nvarchar(20) PRIMARY KEY,
    Name nvarchar(100) NOT NULL,
    Status nvarchar(50)
);
GO

CREATE TABLE Service(
    ServiceID nvarchar(20) PRIMARY KEY,
    ServiceDeliveryMethodID nvarchar(20) FOREIGN KEY REFERENCES ServiceDeliveryMethod(ServiceDeliveryMethodID) NOT NULL,
    Name nvarchar(100) NOT NULL,
    Price money NOT NULL,
    Description nvarchar(MAX),
    Status nvarchar(50)
);
GO

CREATE TABLE Feedback(
    FeedbackID nvarchar(20) PRIMARY KEY,
    ServiceRating int NOT NULL,
    VetRating int NOT NULL,
    Description nvarchar(MAX) NOT NULL,
    Status nvarchar(50) NOT NULL
);
GO

CREATE TABLE Schedule(
    ScheduleID nvarchar(20) PRIMARY KEY,
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID) NOT NULL,
    Date date NOT NULL,
    Note nvarchar(MAX),
	Status nvarchar(50) NOT NULL
);
GO

CREATE TABLE SlotTable(
	SlotTableID nvarchar(20) PRIMARY KEY,
	ScheduleID nvarchar(20) FOREIGN KEY REFERENCES Schedule(ScheduleID) NOT NULL,
	Note nvarchar(MAX),
	Slot int,
    SlotCapacity int,
	SlotOrdered int,
    SlotStatus bit NOT NULL
);
GO

CREATE TABLE Booking(
    BookingID nvarchar(20) PRIMARY KEY ,
    CustomerID nvarchar(20) FOREIGN KEY REFERENCES Customer(CustomerID),
    EmployeeID nvarchar(20) FOREIGN KEY REFERENCES Employee(EmployeeID),
    ServiceDeliveryMethodID nvarchar(20) FOREIGN KEY REFERENCES ServiceDeliveryMethod(ServiceDeliveryMethodID) NOT NULL,
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
);
GO 

CREATE TABLE AnimalType(
    TypeID nvarchar(20) PRIMARY KEY,
    Name nvarchar(100) NOT NULL
);
GO 

CREATE TABLE BookingDetail(
    BookingDetailID nvarchar(20) PRIMARY KEY,
    BookingID nvarchar(20) FOREIGN KEY REFERENCES Booking(BookingID) NOT NULL,
    ServiceID nvarchar(20) FOREIGN KEY REFERENCES Service(ServiceID) NOT NULL,
    IsIncidental bit NOT NULL,
    NoteResult nvarchar(MAX),
    ExaminationResult nvarchar(MAX) ,
    VetConsult nvarchar(MAX),
    Formulary nvarchar(MAX),
);
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
);
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
);
GO


CREATE TABLE FAQ(
    FaqID nvarchar(20) PRIMARY KEY,
    Question nvarchar(MAX) NOT NULL,
    Answer nvarchar(MAX) NOT NULL
);
GO

CREATE TABLE PostCategory(
    PostCategoryID nvarchar(20) PRIMARY KEY,
    Name nvarchar(MAX) NOT NULL,
);
GO

CREATE TABLE Post(
    PostID nvarchar(20) PRIMARY KEY,
    PostName nvarchar(MAX) NOT NULL,
    PostCategoryID nvarchar(20) FOREIGN KEY REFERENCES PostCategory(PostCategoryID) NOT NULL,
    Context nvarchar(MAX) NOT NULL,
);
GO 

CREATE TABLE ServiceUse (
	ServiceUseID nvarchar(20) PRIMARY KEY,
    ProfileID nvarchar(20) ,
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
INSERT INTO Account (AccountID, PhoneNumber, Email, RoleID, Avatar, Password, Status, IsActive )
VALUES
('A0', '0000000000', 'null', 'R0', 'null', '', 'Default', 0),
('A1', '0123456789', 'phbtoan9185@gmail.com', 'R4', 'avatar1.jpg', 'caniskip', 'Normal', 1),
('A2', '0987654321', 'admin2@gmail.com', 'R4', 'avatar2.jpg', 'admin123', 'Normal', 1),
('A3', '0111111111', 'arandomvet@gmail.com', 'R4', 'avatar3.jpg', 'vet123', 'Normal', 1),
('A4', '0121111111', 'manager2@gmail.com', 'R4', 'avatar4.jpg', 'manager123', 'Normal', 1),
('A5', '0123212313', 'Test@gmail.com', 'R4', 'avatar5.jpg', 'test12345', 'Normal', 1),
('A6', '8765785746', 'longtnhse173174@fpt.edu.vn', 'R4', 'avatar1.jpg', 'tangdeptrai', 'Normal', 1),
('A9', '0835377623', 'vet2@gmail.com', 'R2', 'avatar2.jpg', 'vettemp', 'Normal', 1),
('A8', '1122334455', 'Manager@gmail.com', 'R2', 'avatar3.jpg', 'vet12345', 'Normal', 1),
('A7', '1234554321', 'reception1@gmai.com', 'R3', 'avatar4.jpg', 'manager123', 'Normal', 1),
('A10', '1234567876', 'admin@gmail.com', 'R1', 'avatar5.jpg', 'test12345', 'Normal', 1),
('A11', '9987654321', 'decsr@gmail.com', 'R3', 'avatar5.jpg', 'long12345', 'Normal123', 1),
('A12', '0100101010', 'kiet@gmail.com', 'R4', 'avatar6.jpg', 'kiet12345', 'Normal123', 1);
GO

INSERT INTO Customer (CustomerID, FirstName, LastName, Sex, Birthday, Address, AccountID, Status) 
VALUES 
('C1', N'Vy', N'Nguyen', 1, '2004-11-20', '250 vo van hat', 'A1', 1),
('C2', N'Bình', N'Hoàng', 0, '1985-03-15', N'456 Điện Biên Phủ', 'A2', 1),
('C3', N'Linh', N'Phạm Gia', 0, '1995-07-22', N'789 Nguyễn Văn Cừ', 'A3', 1), 
('C4', N'Bình', N'Trần', 1, '1982-11-02', N'321 Lê Văn Việt', 'A4', 1),
('C5', N'Kiệt', N'Nguyễn', 0, '1979-08-14', N'200 vo van hat', 'A12', 1);
GO

-- Insert sample data for Employee
INSERT INTO Employee (EmployeeID, AccountID, RoleID, FirstName, LastName, Sex, Birthday, Address, Status) 
VALUES 
('E0', 'A0', 'R0', 'Null', 'Null', 1, '2003-01-02', 'Null', 1),
('E1', 'A6', 'R1', 'Duong', 'Tang', 1, '2003-01-02', 'VinHome Q9', 1),
('E2', 'A7', 'R2', 'Lily', 'Anderson', 0, '1988-04-25', '111 Maple St', 1),
('E3', 'A8', 'R3', 'Tom', 'Clark', 1, '1991-02-19', '222 Oak Dr', 1),
('E4', 'A9', 'R2', 'Nancy', 'Lee', 0, '1985-12-12', '333 Pine Ln', 1),
('E5', 'A10', 'R3', 'Michael', 'Scott', 1, '1975-09-08', '444 Birch Rd', 1),
('E6', 'A11', 'R3', 'Hoang', 'Long', 1, '2000-02-02', 'Vin', 1);

-- Insert sample data for ServiceDeliveryMethod
INSERT INTO ServiceDeliveryMethod (ServiceDeliveryMethodID, Name, Status) 
VALUES 
('SDM1', N'Khám cá tại nhà', 1),
('SDM2', N'Khám hồ tại nhà', 1),
('SDM3', N'Trực tuyến', 1),
('SDM4', N'Tại trung tâm', 1);

-- Insert sample data for Service
INSERT INTO Service (ServiceID, ServiceDeliveryMethodID, Name, Price, Description, Status) 
VALUES 
-- Dịch vụ khám cá tại nhà (SDM1)
('S1', 'SDM1', N'Kiểm tra sức khỏe cá koi cơ bản', 100000, N'Kiểm tra các chỉ số sức khỏe cơ bản của cá koi', 1),
('S2', 'SDM1', N'Điều trị bệnh cá koi', 150000, N'Điều trị các bệnh thông thường ở cá koi', 1),
('S3', 'SDM1', N'Tiêm vaccine cho cá koi', 200000, N'Tiêm phòng các bệnh phổ biến cho cá koi', 1),
('S4', 'SDM1', N'Kiểm tra và điều trị ký sinh trùng', 180000, N'Kiểm tra và điều trị ký sinh trùng trên cá', 1),
('S5', 'SDM1', N'Chữa trị vết thương cho cá', 120000, N'Điều trị các vết thương ngoài da cho cá', 1),
('S6', 'SDM1', N'Kiểm tra và điều trị bệnh nấm', 160000, N'Kiểm tra và điều trị các bệnh nấm trên cá', 1),
('S7', 'SDM1', N'Điều trị bệnh đường ruột', 170000, N'Điều trị các vấn đề về đường tiêu hóa của cá', 1),
('S8', 'SDM1', N'Siêu âm cho cá koi', 250000, N'Kiểm tra sức khỏe cá bằng siêu âm', 1),
('S9', 'SDM1', N'Điều trị bệnh mang', 190000, N'Kiểm tra và điều trị các bệnh về mang cá', 1),
('S10', 'SDM1', N'Cấp cứu cá tại nhà', 300000, N'Dịch vụ cấp cứu khẩn cấp cho cá', 1),

-- Dịch vụ khám hồ tại nhà (SDM2)
('S11', 'SDM2', N'Kiểm tra chất lượng nước cơ bản', 150000, N'Kiểm tra các chỉ số cơ bản của nước', 1),
('S12', 'SDM2', N'Xử lý nước hồ cá', 200000, N'Xử lý và cân bằng các chỉ số nước hồ', 1),
('S13', 'SDM2', N'Vệ sinh hồ cá', 250000, N'Vệ sinh và làm sạch hồ cá', 1),
('S14', 'SDM2', N'Kiểm tra và sửa chữa hệ thống lọc', 180000, N'Kiểm tra và bảo dưỡng hệ thống lọc', 1),
('S15', 'SDM2', N'Xử lý tảo và rong rêu', 170000, N'Xử lý tình trạng tảo và rong rêu trong hồ', 1),
('S16', 'SDM2', N'Kiểm tra và cân bằng pH', 160000, N'Kiểm tra và điều chỉnh độ pH của nước', 1),
('S17', 'SDM2', N'Lắp đặt hệ thống sục khí', 300000, N'Lắp đặt và tối ưu hệ thống sục khí', 1),
('S18', 'SDM2', N'Tư vấn cải tạo hồ', 200000, N'Tư vấn thiết kế và cải tạo hồ cá', 1),
('S19', 'SDM2', N'Xử lý đáy hồ', 220000, N'Xử lý cặn và chất thải đáy hồ', 1),
('S20', 'SDM2', N'Kiểm tra và xử lý dịch bệnh trong hồ', 250000, N'Kiểm tra và xử lý các bệnh dịch trong môi trường hồ', 1),

-- Dịch vụ trực tuyến (SDM3)
('S21', 'SDM3', N'Tư vấn chăm sóc cá koi cơ bản', 75000, N'Tư vấn online về cách chăm sóc cá koi', 1),
('S22', 'SDM3', N'Tư vấn dinh dưỡng cho cá', 80000, N'Tư vấn chế độ dinh dưỡng phù hợp', 1),
('S23', 'SDM3', N'Tư vấn xử lý bệnh khẩn cấp', 100000, N'Tư vấn xử lý các tình huống khẩn cấp', 1),
('S24', 'SDM3', N'Đánh giá chất lượng nước qua ảnh', 90000, N'Đánh giá tình trạng nước qua hình ảnh', 1),
('S25', 'SDM3', N'Tư vấn thiết kế hồ', 120000, N'Tư vấn cách thiết kế và setup hồ cá', 1),
('S26', 'SDM3', N'Tư vấn chọn giống cá', 85000, N'Tư vấn chọn giống cá phù hợp', 1),
('S27', 'SDM3', N'Tư vấn hệ thống lọc', 95000, N'Tư vấn lựa chọn và setup hệ thống lọc', 1),
('S28', 'SDM3', N'Đào tạo chăm sóc cá online', 150000, N'Khóa học online về chăm sóc cá', 1),
('S29', 'SDM3', N'Tư vấn thuốc và hóa chất', 85000, N'Tư vấn sử dụng thuốc và hóa chất an toàn', 1),
('S30', 'SDM3', N'Theo dõi sức khỏe cá định kỳ online', 200000, N'Dịch vụ theo dõi và tư vấn định kỳ', 1),

-- Dịch vụ tại cơ sở (SDM4)
('S31', 'SDM4', N'Khám tổng quát cho cá', 150000, N'Khám tổng quát và đánh giá sức khỏe cá', 1),
('S32', 'SDM4', N'Phẫu thuật cho cá', 500000, N'Dịch vụ phẫu thuật chuyên sâu', 1),
('S33', 'SDM4', N'Xét nghiệm máu', 200000, N'Xét nghiệm các chỉ số máu của cá', 1),
('S34', 'SDM4', N'Chụp X-quang cho cá', 300000, N'Chụp X-quang chẩn đoán bệnh', 1),
('S35', 'SDM4', N'Điều trị bệnh chuyên sâu', 400000, N'Điều trị các bệnh phức tạp', 1),
('S36', 'SDM4', N'Lưu trú và chăm sóc đặc biệt', 250000, N'Dịch vụ lưu trú và chăm sóc tại chỗ', 1),
('S37', 'SDM4', N'Vật lý trị liệu cho cá', 180000, N'Điều trị phục hồi chức năng cho cá', 1),
('S38', 'SDM4', N'Điều trị bằng laser', 350000, N'Điều trị các bệnh bằng công nghệ laser', 1),
('S39', 'SDM4', N'Châm cứu cho cá', 200000, N'Điều trị bằng phương pháp châm cứu', 1),
('S40', 'SDM4', N'Kiểm tra sinh sản', 250000, N'Kiểm tra và tư vấn về sinh sản', 1);

INSERT INTO Feedback (FeedbackID, ServiceRating, VetRating, Description, Status) 
VALUES 
('FB0', 0, 0, 'Null', 'Default'),
('FB1', 5, 5, 'Great service!', 'Active'),
('FB2', 3, 3, 'Needs improvement.', 'Active'),
('FB3', 5, 5, 'Very satisfied with the consultation.', 'Active'),
('FB4', 4, 5, 'Prompt and professional.', 'Active'),
('FB5', 5, 5, 'Koi surgery saved my fish!', 'Active');

-- Insert sample data for AnimalType
INSERT INTO AnimalType (TypeID, Name) 
VALUES 
('AT1', 'Koi'),
('AT2', 'Goldfish'),
('AT3', 'Tropical Fish'),
('AT4', 'Saltwater Fish'),
('AT5', 'Betta Fish');

INSERT INTO ServiceUse (ServiceUseID, ProfileID, BookingDetailID) 
VALUES 
('SU1','AP1','BD5'),
('SU2','AP2','BD5'),
('SU3','AP3','BD5'),
('SU4','AP1','BD6'),
('SU5','AP2','BD6'),
('SU6','AP3','BD6'),
('SU7','AP4','BD7'),
('SU8','PP1','BD8'),
('SU9','PP1','BD8'),
('SU10','AP4','BD9');



-- Insert sample data for AnimalProfile
INSERT INTO AnimalProfile (AnimalProfileID, Name, TypeID, Size, Age, Color, Description, Sex, Picture) 
VALUES 
('AP1', 'Nishiki', 'AT1', 24.5, 3, 'Red and White', 'A beautiful Kohaku koi with vibrant red patches on a white body', 1, 'nishiki_koi.jpg'),
('AP2', 'Bubbles', 'AT2', 6.0, 2, 'Orange', 'Energetic fancy goldfish with a bubbly personality', 0, 'bubbles_goldfish.jpg'),
('AP3', 'Nemo', 'AT3', 3.5, 1, 'Orange and White', 'Playful clownfish, always hiding in the anemone', 1, 'nemo_clownfish.jpg'),
('AP4', 'Azure', 'AT4', 12.0, 4, 'Blue', 'Majestic blue tang with vibrant coloration', 0, 'azure_bluetang.jpg');

-- Insert sample data for PoolProfile
INSERT INTO PoolProfile (PoolProfileID, Name, Note, Width, Description, Height, Depth, Picture)
VALUES 
('PP1', 'Zen Garden Koi Pond','Requires weekly maintenance', 15.0, 'A traditional Japanese-style koi pond with a small waterfall and surrounding rock garden', 2.5, 4.0, 'zen_garden_pond.jpg'),
('PP2', 'Indoor Goldfish Tank', 'Check filter system monthly', 4.0, 'A large, well-lit indoor aquarium designed for multiple goldfish', 2.0, 2.0, 'indoor_goldfish_tank.jpg'),
('PP3', 'Tropical Reef Aquarium', 'Maintain consistent water temperature', 6.0, 'A colorful reef tank with live corals and various tropical fish species', 3.0, 2.5, 'tropical_reef_aquarium.jpg'),
('PP4', 'Saltwater Lagoon', 'Monitor salinity levels regularly', 20.0, 'An expansive outdoor saltwater pool mimicking a natural lagoon environment', 5.0, 6.0, 'saltwater_lagoon.jpg');

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

INSERT INTO Schedule (ScheduleID, EmployeeID, Date, Note, Status) VALUES
('SCH0', 'E0', '2024-11-08', N'', 'Default'),
('SCH9', 'E3', '2024-11-08', N'Trực tuyến', 'Active'),
('SCH10', 'E4', '2024-11-08', N'Tại trung tâm', 'Active'),
('SCH11', 'E3', '2024-11-09', N'Tại trung tâm', 'Active'),
('SCH12', 'E4', '2024-11-09', N'Tại trung tâm', 'Active'),
('SCH13', 'E3', '2024-11-10', N'Tại trung tâm', 'Active'),
('SCH14', 'E4', '2024-11-10', N'Tại nhà', 'Active'),
('SCH15', 'E3', '2024-11-11', N'Tại nhà', 'Active'),
('SCH16', 'E4', '2024-11-11', N'Tại trung tâm', 'Active'),
('SCH17', 'E3', '2024-11-12', N'Tại nhà', 'Active'),
('SCH18', 'E4', '2024-11-12', N'Tại nhà', 'Active'),
('SCH19', 'E3', '2024-11-13', N'Tại nhà', 'Active'),
('SCH20', 'E4', '2024-11-13', N'Tại nhà', 'Active'),
('SCH21', 'E3', '2024-11-14', N'Tại nhà', 'Active'),
('SCH22', 'E4', '2024-11-14', N'Tại nhà', 'Active'),
('SCH23', 'E3', '2024-11-15', N'Tại nhà', 'Active'),
('SCH24', 'E4', '2024-11-15', N'Tại nhà', 'Active'),
('SCH25', 'E3', '2024-11-16', N'Tại trung tâm', 'Active'),
('SCH26', 'E4', '2024-11-16', N'Tại nhà', 'Active'),
('SCH27', 'E3', '2024-11-17', N'Tại trung tâm', 'Active'),
('SCH28', 'E4', '2024-11-17', N'Tại nhà', 'Active'),
('SCH29', 'E3', '2024-11-18', N'Tại trung tâm', 'Active'),
('SCH30', 'E4', '2024-11-18', N'Tại nhà', 'Active'),
('SCH31', 'E3', '2024-11-19', N'Tại trung tâm', 'Active'),
('SCH32', 'E4', '2024-11-19', N'Tại nhà', 'Active'),
('SCH33', 'E3', '2024-11-20', N'Tại trung tâm', 'Active'),
('SCH34', 'E4', '2024-11-20', N'Tại nhà', 'Active'),
('SCH35', 'E3', '2024-11-21', N'Tại trung tâm', 'Active'),
('SCH36', 'E4', '2024-11-21', N'Trực tuyến', 'Active'),
('SCH37', 'E3', '2024-11-22', N'Tại trung tâm', 'Active'),
('SCH38', 'E4', '2024-11-22', N'Trực tuyến', 'Active'),
('SCH39', 'E3', '2024-11-23', N'Tại trung tâm', 'Active'),
('SCH40', 'E4', '2024-11-23', N'Trực tuyến', 'Active'),
('SCH41', 'E3', '2024-11-24', N'Tại trung tâm', 'Active'),
('SCH42', 'E4', '2024-11-24', N'Trực tuyến', 'Active'),
('SCH43', 'E3', '2024-11-25', N'Tại trung tâm', 'Active'),
('SCH44', 'E4', '2024-11-25', N'Trực tuyến', 'Active'),
('SCH45', 'E3', '2024-11-26', N'Tại trung tâm', 'Active'),
('SCH46', 'E4', '2024-11-26', N'Trực tuyến', 'Active'),
('SCH47', 'E3', '2024-11-27', N'Trực tuyến', 'Active'),
('SCH48', 'E4', '2024-11-27', N'Trực tuyến', 'Active');

INSERT INTO SlotTable (SlotTableID, ScheduleID, Note, Slot, SlotCapacity, SlotOrdered, SlotStatus) VALUES
-- SCH0
('ST0', 'SCH0', N'Trực tuyến', 0, 0, 0, 0),

-- SCH9
('ST1', 'SCH9', N'Trực tuyến', 1, 10, 5, 1),
('ST2', 'SCH9', N'Trực tuyến', 2, 10, 6, 1),
('ST3', 'SCH9', N'Trực tuyến', 3, 10, 4, 1),
('ST4', 'SCH9', N'Trực tuyến', 4, 10, 7, 1),
('ST5', 'SCH9', N'Trực tuyến', 5, 10, 3, 1),
('ST6', 'SCH9', N'Trực tuyến', 6, 10, 5, 1),
('ST7', 'SCH9', N'Trực tuyến', 7, 10, 4, 1),
('ST8', 'SCH9', N'Trực tuyến', 8, 10, 6, 1),

-- SCH10
('ST9', 'SCH10', N'Tại trung tâm', 1, 10, 4, 1),
('ST10', 'SCH10', N'Tại trung tâm', 2, 10, 5, 1),
('ST11', 'SCH10', N'Tại trung tâm', 3, 10, 6, 1),
('ST12', 'SCH10', N'Tại trung tâm', 4, 10, 3, 1),
('ST13', 'SCH10', N'Tại trung tâm', 5, 10, 7, 1),
('ST14', 'SCH10', N'Tại trung tâm', 6, 10, 5, 1),
('ST15', 'SCH10', N'Tại trung tâm', 7, 10, 4, 1),
('ST16', 'SCH10', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH11
('ST17', 'SCH11', N'Tại trung tâm', 1, 10, 5, 1),
('ST18', 'SCH11', N'Tại trung tâm', 2, 10, 4, 1),
('ST19', 'SCH11', N'Tại trung tâm', 3, 10, 6, 1),
('ST20', 'SCH11', N'Tại trung tâm', 4, 10, 7, 1),
('ST21', 'SCH11', N'Tại trung tâm', 5, 10, 3, 1),
('ST22', 'SCH11', N'Tại trung tâm', 6, 10, 5, 1),
('ST23', 'SCH11', N'Tại trung tâm', 7, 10, 4, 1),
('ST24', 'SCH11', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH12
('ST25', 'SCH12', N'Tại trung tâm', 1, 10, 5, 1),
('ST26', 'SCH12', N'Tại trung tâm', 2, 10, 6, 1),
('ST27', 'SCH12', N'Tại trung tâm', 3, 10, 4, 1),
('ST28', 'SCH12', N'Tại trung tâm', 4, 10, 7, 1),
('ST29', 'SCH12', N'Tại trung tâm', 5, 10, 3, 1),
('ST30', 'SCH12', N'Tại trung tâm', 6, 10, 5, 1),
('ST31', 'SCH12', N'Tại trung tâm', 7, 10, 4, 1),
('ST32', 'SCH12', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH13
('ST33', 'SCH13', N'Tại trung tâm', 1, 10, 4, 1),
('ST34', 'SCH13', N'Tại trung tâm', 2, 10, 5, 1),
('ST35', 'SCH13', N'Tại trung tâm', 3, 10, 6, 1),
('ST36', 'SCH13', N'Tại trung tâm', 4, 10, 3, 1),
('ST37', 'SCH13', N'Tại trung tâm', 5, 10, 7, 1),
('ST38', 'SCH13', N'Tại trung tâm', 6, 10, 5, 1),
('ST39', 'SCH13', N'Tại trung tâm', 7, 10, 4, 1),
('ST40', 'SCH13', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH14
('ST41', 'SCH14', N'Tại nhà', 1, 10, 5, 1),
('ST42', 'SCH14', N'Tại nhà', 2, 10, 4, 1),
('ST43', 'SCH14', N'Tại nhà', 3, 10, 6, 1),
('ST44', 'SCH14', N'Tại nhà', 4, 10, 7, 1),
('ST45', 'SCH14', N'Tại nhà', 5, 10, 3, 1),
('ST46', 'SCH14', N'Tại nhà', 6, 10, 5, 1),
('ST47', 'SCH14', N'Tại nhà', 7, 10, 4, 1),
('ST48', 'SCH14', N'Tại nhà', 8, 10, 6, 1),

-- SCH15
('ST49', 'SCH15', N'Tại nhà', 1, 10, 5, 1),
('ST50', 'SCH15', N'Tại nhà', 2, 10, 6, 1),
('ST51', 'SCH15', N'Tại nhà', 3, 10, 4, 1),
('ST52', 'SCH15', N'Tại nhà', 4, 10, 7, 1),
('ST53', 'SCH15', N'Tại nhà', 5, 10, 3, 1),
('ST54', 'SCH15', N'Tại nhà', 6, 10, 5, 1),
('ST55', 'SCH15', N'Tại nhà', 7, 10, 4, 1),
('ST56', 'SCH15', N'Tại nhà', 8, 10, 6, 1),

-- SCH16
('ST57', 'SCH16', N'Tại trung tâm', 1, 10, 5, 1),
('ST58', 'SCH16', N'Tại trung tâm', 2, 10, 6, 1),
('ST59', 'SCH16', N'Tại trung tâm', 3, 10, 4, 1),
('ST60', 'SCH16', N'Tại trung tâm', 4, 10, 7, 1),
('ST61', 'SCH16', N'Tại trung tâm', 5, 10, 3, 1),
('ST62', 'SCH16', N'Tại trung tâm', 6, 10, 5, 1),
('ST63', 'SCH16', N'Tại trung tâm', 7, 10, 4, 1),
('ST64', 'SCH16', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH17
('ST65', 'SCH17', N'Tại nhà', 1, 10, 4, 1),
('ST66', 'SCH17', N'Tại nhà', 2, 10, 5, 1),
('ST67', 'SCH17', N'Tại nhà', 3, 10, 6, 1),
('ST68', 'SCH17', N'Tại nhà', 4, 10, 3, 1),
('ST69', 'SCH17', N'Tại nhà', 5, 10, 7, 1),
('ST70', 'SCH17', N'Tại nhà', 6, 10, 5, 1),
('ST71', 'SCH17', N'Tại nhà', 7, 10, 4, 1),
('ST72', 'SCH17', N'Tại nhà', 8, 10, 6, 1),

-- SCH18
('ST73', 'SCH18', N'Tại nhà', 1, 10, 5, 1),
('ST74', 'SCH18', N'Tại nhà', 2, 10, 4, 1),
('ST75', 'SCH18', N'Tại nhà', 3, 10, 6, 1),
('ST76', 'SCH18', N'Tại nhà', 4, 10, 7, 1),
('ST77', 'SCH18', N'Tại nhà', 5, 10, 3, 1),
('ST78', 'SCH18', N'Tại nhà', 6, 10, 5, 1),
('ST79', 'SCH18', N'Tại nhà', 7, 10, 4, 1),
('ST80', 'SCH18', N'Tại nhà', 8, 10, 6, 1),

-- SCH19
('ST81', 'SCH19', N'Tại nhà', 1, 10, 5, 1),
('ST82', 'SCH19', N'Tại nhà', 2, 10, 6, 1),
('ST83', 'SCH19', N'Tại nhà', 3, 10, 4, 1),
('ST84', 'SCH19', N'Tại nhà', 4, 10, 7, 1),
('ST85', 'SCH19', N'Tại nhà', 5, 10, 3, 1),
('ST86', 'SCH19', N'Tại nhà', 6, 10, 5, 1),
('ST87', 'SCH19', N'Tại nhà', 7, 10, 4, 1),
('ST88', 'SCH19', N'Tại nhà', 8, 10, 6, 1),

-- SCH20
('ST89', 'SCH20', N'Tại nhà', 1, 10, 4, 1),
('ST90', 'SCH20', N'Tại nhà', 2, 10, 5, 1),
('ST91', 'SCH20', N'Tại nhà', 3, 10, 6, 1),
('ST92', 'SCH20', N'Tại nhà', 4, 10, 3, 1),
('ST93', 'SCH20', N'Tại nhà', 5, 10, 7, 1),
('ST94', 'SCH20', N'Tại nhà', 6, 10, 5, 1),
('ST95', 'SCH20', N'Tại nhà', 7, 10, 4, 1),
('ST96', 'SCH20', N'Tại nhà', 8, 10, 6, 1),

-- SCH21
('ST97', 'SCH21', N'Tại nhà', 1, 10, 5, 1),
('ST98', 'SCH21', N'Tại nhà', 2, 10, 4, 1),
('ST99', 'SCH21', N'Tại nhà', 3, 10, 6, 1),
('ST100', 'SCH21', N'Tại nhà', 4, 10, 7, 1),
('ST101', 'SCH21', N'Tại nhà', 5, 10, 3, 1),
('ST102', 'SCH21', N'Tại nhà', 6, 10, 5, 1),
('ST103', 'SCH21', N'Tại nhà', 7, 10, 4, 1),
('ST104', 'SCH21', N'Tại nhà', 8, 10, 6, 1),

-- SCH22
('ST105', 'SCH22', N'Tại nhà', 1, 10, 5, 1),
('ST106', 'SCH22', N'Tại nhà', 2, 10, 6, 1),
('ST107', 'SCH22', N'Tại nhà', 3, 10, 4, 1),
('ST108', 'SCH22', N'Tại nhà', 4, 10, 7, 1),
('ST109', 'SCH22', N'Tại nhà', 5, 10, 3, 1),
('ST110', 'SCH22', N'Tại nhà', 6, 10, 5, 1),
('ST111', 'SCH22', N'Tại nhà', 7, 10, 4, 1),
('ST112', 'SCH22', N'Tại nhà', 8, 10, 6, 1),

-- SCH23
('ST113', 'SCH23', N'Tại nhà', 1, 10, 4, 1),
('ST114', 'SCH23', N'Tại nhà', 2, 10, 5, 1),
('ST115', 'SCH23', N'Tại nhà', 3, 10, 6, 1),
('ST116', 'SCH23', N'Tại nhà', 4, 10, 3, 1),
('ST117', 'SCH23', N'Tại nhà', 5, 10, 7, 1),
('ST118', 'SCH23', N'Tại nhà', 6, 10, 5, 1),
('ST119', 'SCH23', N'Tại nhà', 7, 10, 4, 1),
('ST120', 'SCH23', N'Tại nhà', 8, 10, 6, 1),
-- SCH24
('ST121', 'SCH24', N'Tại nhà', 1, 10, 4, 1),
('ST122', 'SCH24', N'Tại nhà', 2, 10, 5, 1),
('ST123', 'SCH24', N'Tại nhà', 3, 10, 6, 1),
('ST124', 'SCH24', N'Tại nhà', 4, 10, 3, 1),
('ST125', 'SCH24', N'Tại nhà', 5, 10, 7, 1),
('ST126', 'SCH24', N'Tại nhà', 6, 10, 5, 1),
('ST127', 'SCH24', N'Tại nhà', 7, 10, 4, 1),
('ST128', 'SCH24', N'Tại nhà', 8, 10, 6, 1),

-- SCH25
('ST129', 'SCH25', N'Tại trung tâm', 1, 10, 5, 1),
('ST130', 'SCH25', N'Tại trung tâm', 2, 10, 4, 1),
('ST131', 'SCH25', N'Tại trung tâm', 3, 10, 6, 1),
('ST132', 'SCH25', N'Tại trung tâm', 4, 10, 7, 1),
('ST133', 'SCH25', N'Tại trung tâm', 5, 10, 3, 1),
('ST134', 'SCH25', N'Tại trung tâm', 6, 10, 5, 1),
('ST135', 'SCH25', N'Tại trung tâm', 7, 10, 4, 1),
('ST136', 'SCH25', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH26
('ST137', 'SCH26', N'Tại nhà', 1, 10, 5, 1),
('ST138', 'SCH26', N'Tại nhà', 2, 10, 6, 1),
('ST139', 'SCH26', N'Tại nhà', 3, 10, 4, 1),
('ST140', 'SCH26', N'Tại nhà', 4, 10, 7, 1),
('ST141', 'SCH26', N'Tại nhà', 5, 10, 3, 1),
('ST142', 'SCH26', N'Tại nhà', 6, 10, 5, 1),
('ST143', 'SCH26', N'Tại nhà', 7, 10, 4, 1),
('ST144', 'SCH26', N'Tại nhà', 8, 10, 6, 1),

-- SCH27
('ST145', 'SCH27', N'Tại trung tâm', 1, 10, 4, 1),
('ST146', 'SCH27', N'Tại trung tâm', 2, 10, 5, 1),
('ST147', 'SCH27', N'Tại trung tâm', 3, 10, 6, 1),
('ST148', 'SCH27', N'Tại trung tâm', 4, 10, 3, 1),
('ST149', 'SCH27', N'Tại trung tâm', 5, 10, 7, 1),
('ST150', 'SCH27', N'Tại trung tâm', 6, 10, 5, 1),
('ST151', 'SCH27', N'Tại trung tâm', 7, 10, 4, 1),
('ST152', 'SCH27', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH28
('ST153', 'SCH28', N'Tại nhà', 1, 10, 5, 1),
('ST154', 'SCH28', N'Tại nhà', 2, 10, 4, 1),
('ST155', 'SCH28', N'Tại nhà', 3, 10, 6, 1),
('ST156', 'SCH28', N'Tại nhà', 4, 10, 7, 1),
('ST157', 'SCH28', N'Tại nhà', 5, 10, 3, 1),
('ST158', 'SCH28', N'Tại nhà', 6, 10, 5, 1),
('ST159', 'SCH28', N'Tại nhà', 7, 10, 4, 1),
('ST160', 'SCH28', N'Tại nhà', 8, 10, 6, 1),

-- SCH29
('ST161', 'SCH29', N'Tại trung tâm', 1, 10, 5, 1),
('ST162', 'SCH29', N'Tại trung tâm', 2, 10, 6, 1),
('ST163', 'SCH29', N'Tại trung tâm', 3, 10, 4, 1),
('ST164', 'SCH29', N'Tại trung tâm', 4, 10, 7, 1),
('ST165', 'SCH29', N'Tại trung tâm', 5, 10, 3, 1),
('ST166', 'SCH29', N'Tại trung tâm', 6, 10, 5, 1),
('ST167', 'SCH29', N'Tại trung tâm', 7, 10, 4, 1),
('ST168', 'SCH29', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH30
('ST169', 'SCH30', N'Tại nhà', 1, 10, 4, 1),
('ST170', 'SCH30', N'Tại nhà', 2, 10, 5, 1),
('ST171', 'SCH30', N'Tại nhà', 3, 10, 6, 1),
('ST172', 'SCH30', N'Tại nhà', 4, 10, 3, 1),
('ST173', 'SCH30', N'Tại nhà', 5, 10, 7, 1),
('ST174', 'SCH30', N'Tại nhà', 6, 10, 5, 1),
('ST175', 'SCH30', N'Tại nhà', 7, 10, 4, 1),
('ST176', 'SCH30', N'Tại nhà', 8, 10, 6, 1),

-- SCH31
('ST177', 'SCH31', N'Tại trung tâm', 1, 10, 5, 1),
('ST178', 'SCH31', N'Tại trung tâm', 2, 10, 4, 1),
('ST179', 'SCH31', N'Tại trung tâm', 3, 10, 6, 1),
('ST180', 'SCH31', N'Tại trung tâm', 4, 10, 7, 1),
('ST181', 'SCH31', N'Tại trung tâm', 5, 10, 3, 1),
('ST182', 'SCH31', N'Tại trung tâm', 6, 10, 5, 1),
('ST183', 'SCH31', N'Tại trung tâm', 7, 10, 4, 1),
('ST184', 'SCH31', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH32
('ST185', 'SCH32', N'Tại nhà', 1, 10, 5, 1),
('ST186', 'SCH32', N'Tại nhà', 2, 10, 6, 1),
('ST187', 'SCH32', N'Tại nhà', 3, 10, 4, 1),
('ST188', 'SCH32', N'Tại nhà', 4, 10, 7, 1),
('ST189', 'SCH32', N'Tại nhà', 5, 10, 3, 1),
('ST190', 'SCH32', N'Tại nhà', 6, 10, 5, 1),
('ST191', 'SCH32', N'Tại nhà', 7, 10, 4, 1),
('ST192', 'SCH32', N'Tại nhà', 8, 10, 6, 1),

-- SCH33
('ST193', 'SCH33', N'Tại trung tâm', 1, 10, 4, 1),
('ST194', 'SCH33', N'Tại trung tâm', 2, 10, 5, 1),
('ST195', 'SCH33', N'Tại trung tâm', 3, 10, 6, 1),
('ST196', 'SCH33', N'Tại trung tâm', 4, 10, 3, 1),
('ST197', 'SCH33', N'Tại trung tâm', 5, 10, 7, 1),
('ST198', 'SCH33', N'Tại trung tâm', 6, 10, 5, 1),
('ST199', 'SCH33', N'Tại trung tâm', 7, 10, 4, 1),
('ST200', 'SCH33', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH34
('ST201', 'SCH34', N'Tại nhà', 1, 10, 5, 1),
('ST202', 'SCH34', N'Tại nhà', 2, 10, 4, 1),
('ST203', 'SCH34', N'Tại nhà', 3, 10, 6, 1),
('ST204', 'SCH34', N'Tại nhà', 4, 10, 7, 1),
('ST205', 'SCH34', N'Tại nhà', 5, 10, 3, 1),
('ST206', 'SCH34', N'Tại nhà', 6, 10, 5, 1),
('ST207', 'SCH34', N'Tại nhà', 7, 10, 4, 1),
('ST208', 'SCH34', N'Tại nhà', 8, 10, 6, 1),

-- SCH35
('ST209', 'SCH35', N'Tại trung tâm', 1, 10, 5, 1),
('ST210', 'SCH35', N'Tại trung tâm', 2, 10, 6, 1),
('ST211', 'SCH35', N'Tại trung tâm', 3, 10, 4, 1),
('ST212', 'SCH35', N'Tại trung tâm', 4, 10, 7, 1),
('ST213', 'SCH35', N'Tại trung tâm', 5, 10, 3, 1),
('ST214', 'SCH35', N'Tại trung tâm', 6, 10, 5, 1),
('ST215', 'SCH35', N'Tại trung tâm', 7, 10, 4, 1),
('ST216', 'SCH35', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH36
('ST217', 'SCH36', N'Trực tuyến', 1, 10, 4, 1),
('ST218', 'SCH36', N'Trực tuyến', 2, 10, 5, 1),
('ST219', 'SCH36', N'Trực tuyến', 3, 10, 6, 1),
('ST220', 'SCH36', N'Trực tuyến', 4, 10, 3, 1),
('ST221', 'SCH36', N'Trực tuyến', 5, 10, 7, 1),
('ST222', 'SCH36', N'Trực tuyến', 6, 10, 5, 1),
('ST223', 'SCH36', N'Trực tuyến', 7, 10, 4, 1),
('ST224', 'SCH36', N'Trực tuyến', 8, 10, 6, 1),

-- SCH37
('ST225', 'SCH37', N'Tại trung tâm', 1, 10, 5, 1),
('ST226', 'SCH37', N'Tại trung tâm', 2, 10, 4, 1),
('ST227', 'SCH37', N'Tại trung tâm', 3, 10, 6, 1),
('ST228', 'SCH37', N'Tại trung tâm', 4, 10, 7, 1),
('ST229', 'SCH37', N'Tại trung tâm', 5, 10, 3, 1),
('ST230', 'SCH37', N'Tại trung tâm', 6, 10, 5, 1),
('ST231', 'SCH37', N'Tại trung tâm', 7, 10, 4, 1),
('ST232', 'SCH37', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH38
('ST233', 'SCH38', N'Trực tuyến', 1, 10, 5, 1),
('ST234', 'SCH38', N'Trực tuyến', 2, 10, 6, 1),
('ST235', 'SCH38', N'Trực tuyến', 3, 10, 4, 1),
('ST236', 'SCH38', N'Trực tuyến', 4, 10, 7, 1),
('ST237', 'SCH38', N'Trực tuyến', 5, 10, 3, 1),
('ST238', 'SCH38', N'Trực tuyến', 6, 10, 5, 1),
('ST239', 'SCH38', N'Trực tuyến', 7, 10, 4, 1),
('ST240', 'SCH38', N'Trực tuyến', 8, 10, 6, 1),

-- SCH39
('ST241', 'SCH39', N'Tại trung tâm', 1, 10, 5, 1),
('ST242', 'SCH39', N'Tại trung tâm', 2, 10, 6, 1),
('ST243', 'SCH39', N'Tại trung tâm', 3, 10, 4, 1),
('ST244', 'SCH39', N'Tại trung tâm', 4, 10, 7, 1),
('ST245', 'SCH39', N'Tại trung tâm', 5, 10, 3, 1),
('ST246', 'SCH39', N'Tại trung tâm', 6, 10, 5, 1),
('ST247', 'SCH39', N'Tại trung tâm', 7, 10, 4, 1),
('ST248', 'SCH39', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH40
('ST249', 'SCH40', N'Trực tuyến', 1, 10, 5, 1),
('ST250', 'SCH40', N'Trực tuyến', 2, 10, 6, 1),
('ST251', 'SCH40', N'Trực tuyến', 3, 10, 4, 1),
('ST252', 'SCH40', N'Trực tuyến', 4, 10, 7, 1),
('ST253', 'SCH40', N'Trực tuyến', 5, 10, 3, 1),
('ST254', 'SCH40', N'Trực tuyến', 6, 10, 5, 1),
('ST255', 'SCH40', N'Trực tuyến', 7, 10, 4, 1),
('ST256', 'SCH40', N'Trực tuyến', 8, 10, 6, 1),

-- SCH41
('ST257', 'SCH41', N'Tại trung tâm', 1, 10, 5, 1),
('ST258', 'SCH41', N'Tại trung tâm', 2, 10, 6, 1),
('ST259', 'SCH41', N'Tại trung tâm', 3, 10, 4, 1),
('ST260', 'SCH41', N'Tại trung tâm', 4, 10, 7, 1),
('ST261', 'SCH41', N'Tại trung tâm', 5, 10, 3, 1),
('ST262', 'SCH41', N'Tại trung tâm', 6, 10, 5, 1),
('ST263', 'SCH41', N'Tại trung tâm', 7, 10, 4, 1),
('ST264', 'SCH41', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH42
('ST265', 'SCH42', N'Trực tuyến', 1, 10, 5, 1),
('ST266', 'SCH42', N'Trực tuyến', 2, 10, 6, 1),
('ST267', 'SCH42', N'Trực tuyến', 3, 10, 4, 1),
('ST268', 'SCH42', N'Trực tuyến', 4, 10, 7, 1),
('ST269', 'SCH42', N'Trực tuyến', 5, 10, 3, 1),
('ST270', 'SCH42', N'Trực tuyến', 6, 10, 5, 1),
('ST271', 'SCH42', N'Trực tuyến', 7, 10, 4, 1),
('ST272', 'SCH42', N'Trực tuyến', 8, 10, 6, 1),

-- SCH43
('ST273', 'SCH43', N'Tại trung tâm', 1, 10, 5, 1),
('ST274', 'SCH43', N'Tại trung tâm', 2, 10, 6, 1),
('ST275', 'SCH43', N'Tại trung tâm', 3, 10, 4, 1),
('ST276', 'SCH43', N'Tại trung tâm', 4, 10, 7, 1),
('ST277', 'SCH43', N'Tại trung tâm', 5, 10, 3, 1),
('ST278', 'SCH43', N'Tại trung tâm', 6, 10, 5, 1),
('ST279', 'SCH43', N'Tại trung tâm', 7, 10, 4, 1),
('ST280', 'SCH43', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH44
('ST281', 'SCH44', N'Trực tuyến', 1, 10, 5, 1),
('ST282', 'SCH44', N'Trực tuyến', 2, 10, 6, 1),
('ST283', 'SCH44', N'Trực tuyến', 3, 10, 4, 1),
('ST284', 'SCH44', N'Trực tuyến', 4, 10, 7, 1),
('ST285', 'SCH44', N'Trực tuyến', 5, 10, 3, 1),
('ST286', 'SCH44', N'Trực tuyến', 6, 10, 5, 1),
('ST287', 'SCH44', N'Trực tuyến', 7, 10, 4, 1),
('ST288', 'SCH44', N'Trực tuyến', 8, 10, 6, 1),

-- SCH45
('ST289', 'SCH45', N'Tại trung tâm', 1, 10, 5, 1),
('ST290', 'SCH45', N'Tại trung tâm', 2, 10, 6, 1),
('ST291', 'SCH45', N'Tại trung tâm', 3, 10, 4, 1),
('ST292', 'SCH45', N'Tại trung tâm', 4, 10, 7, 1),
('ST293', 'SCH45', N'Tại trung tâm', 5, 10, 3, 1),
('ST294', 'SCH45', N'Tại trung tâm', 6, 10, 5, 1),
('ST295', 'SCH45', N'Tại trung tâm', 7, 10, 4, 1),
('ST296', 'SCH45', N'Tại trung tâm', 8, 10, 6, 1),

-- SCH46
('ST297', 'SCH46', N'Trực tuyến', 1, 10, 5, 1),
('ST298', 'SCH46', N'Trực tuyến', 2, 10, 6, 1),
('ST299', 'SCH46', N'Trực tuyến', 3, 10, 4, 1),
('ST300', 'SCH46', N'Trực tuyến', 4, 10, 7, 1),
('ST301', 'SCH46', N'Trực tuyến', 5, 10, 3, 1),
('ST302', 'SCH46', N'Trực tuyến', 6, 10, 5, 1),
('ST303', 'SCH46', N'Trực tuyến', 7, 10, 4, 1),
('ST304', 'SCH46', N'Trực tuyến', 8, 10, 6, 1),

-- SCH47
('ST305', 'SCH47', N'Trực tuyến', 1, 10, 5, 1),
('ST306', 'SCH47', N'Trực tuyến', 2, 10, 6, 1),
('ST307', 'SCH47', N'Trực tuyến', 3, 10, 4, 1),
('ST308', 'SCH47', N'Trực tuyến', 4, 10, 7, 1),
('ST309', 'SCH47', N'Trực tuyến', 5, 10, 3, 1),
('ST310', 'SCH47', N'Trực tuyến', 6, 10, 5, 1),
('ST311', 'SCH47', N'Trực tuyến', 7, 10, 4, 1),
('ST312', 'SCH47', N'Trực tuyến', 8, 10, 6, 1),

-- SCH48
('ST313', 'SCH48', N'Trực tuyến', 1, 10, 5, 1),
('ST314', 'SCH48', N'Trực tuyến', 2, 10, 6, 1),
('ST315', 'SCH48', N'Trực tuyến', 3, 10, 4, 1),
('ST316', 'SCH48', N'Trực tuyến', 4, 10, 7, 1),
('ST317', 'SCH48', N'Trực tuyến', 5, 10, 3, 1),
('ST318', 'SCH48', N'Trực tuyến', 6, 10, 5, 1),
('ST319', 'SCH48', N'Trực tuyến', 7, 10, 4, 1),
('ST320', 'SCH48', N'Trực tuyến', 8, 10, 6, 1);


--NumberOfFish int not null,
-- Insert sample data for Booking
INSERT INTO Booking (BookingID, CustomerID, EmployeeID,ServiceDeliveryMethodID, BookingDate, ExpiredDate, Deposit, NumberOfFish, IncidentalFish, NumberOfPool, IncidentalPool, VAT, BookingAddress, Distance, DistanceCost, TotalServiceCost, Status, FeedbackID, ScheduleID, Note, PaymentMethod, PaymentStatus) 
VALUES 
('B1', 'C1', 'E1','SDM1', '2024-10-31 09:00:00', '2024-09-01 10:00:00', 50.00, 1, 0, 0, 0, 10.00, '250 Vo Van Hat', 5.5, 11.00, 661000, 'Confirmed', 'FB1', 'SCH0', 'Home visit for koi health check', 'Credit Card', 'Pending'),
('B2', 'C2', 'E2','SDM1', '2024-11-01 14:00:00', '2024-09-02 15:00:00', 37.50, 1, 0, 0, 0, 7.50, '456 Maple Ave', 0, 0.00, 397500, 'Confirmed', 'FB2', 'SCH9', 'Trực tuyến consultation for koi', 'PayPal', 'Pending'),
('B3', 'C3', 'E3','SDM1','2024-10-31 18:00:00', '2024-09-03 19:00:00', 75.00, 1, 0, 0, 0, 15.00, '789 Oak St', 3.2, 6.40, 996000, 'Cancelled', 'FB3', 'SCH10', 'Clinic visit for koi disease treatment', 'Cash', 'Pending'),
('B4', 'C4', 'E4','SDM1', '2024-11-01 22:00:00', '2024-09-05 01:00:00', 150.00, 1, 0, 0, 0, 30.00, '321 Birch Ave', 8.7, 17.40, 2000000, 'In Progress', 'FB4', 'SCH11', 'Emergency koi surgery', 'Credit Card', 'Pending'),
--data đúng, đừng quan tâm các data ở trên
('B5', 'C5', 'E4','SDM4', '2024-11-01 11:00:00', '2024-11-01 13:00:00', 150.00, 1, 2, 0, 0, 30.00, '321 Tran Duy Hung', 8.7, 17.40, 2000000, 'Completed', 'FB0', 'SCH12', '', 'VNPay', 'Paid'),
('B6', 'C5', 'E4','SDM1', '2024-11-02 11:00:00', '2024-11-02 13:00:00', 150.00, 1, 0, 0, 2, 30.00, '300 Tran Hung Dao', 8.7, 17.40, 2000000, 'Completed', 'FB0', 'SCH20', 'kham ho', 'VNPay', 'Paid'),
('B7', 'C5', 'E4','SDM1', '2024-11-03 11:00:00', '2024-11-03 13:00:00', 150.00, 1, 0, 0, 0, 30.00, '300 Tran Hung Dao', 8.7, 17.40, 2000000, 'Confirmed', 'FB0', 'SCH18', '', 'VNPay', 'Paid');


-- Insert sample data for BookingDetail
INSERT INTO BookingDetail (BookingDetailID, BookingID, ServiceID, IsIncidental, NoteResult, ExaminationResult, VetConsult, Formulary)
VALUES 
('BD1', 'B1', 'S1', 0,'Koi appears healthy overall', 'Nishiki shows good coloration and active behavior', 'Dr. Amelia Fish', 'Probiotic supplement'),
('BD2', 'B2', 'S2', 0,'Goldfish exhibiting signs of stress', 'Bubbles has clamped fins and reduced activity', 'Dr. Michael Scales', 'Antibiotics, stress coat additive'),
('BD3', 'B3', 'S3', 0,'Tropical fish recovering from minor infection', 'Nemo shows improvement in fin condition and appetite', 'Dr. Sarah Coral', 'Broad-spectrum antibiotic, vitamin supplements'),
('BD4', 'B4', 'S4', 0,'Emergency surgery successful',  'Azure is stable post-surgery, requires close monitoring', 'Dr. David Finn', 'Pain medication, antibiotics'),
('BD5', 'B5', 'S3', 0,'Cá cảm nhẹ', 'cá hơi mập', 'Cần phải đem đi ướp muối cho đỡ lạnh', ' vitamin C'),
('BD6', 'B5', 'S3', 1,'không phát hiện bất thường', 'cá hơi thừa cân', 'kiểm tra lại sau 1 tháng', ''),
('BD7', 'B6', 'S4', 0,'không phát hiện bất thường', 'cá ổn', 'kiểm tra lại sau 1 tháng', ''),
('BD8', 'B6', 'S2', 1,'không phát hiện bất thường', 'hồ bình thường', 'kiểm tra lại sau 1 tháng', 'muối sinh lý'),
('BD9', 'B7', 'S5', 0,'vết sẹo 2cm bên mang trái', 'đã phục hồi thu nhỏ sẹo còn 1cm tình trạng cá ổn,', 'kiểm tra lại sau 1 tháng', 'muối sinh lý');


