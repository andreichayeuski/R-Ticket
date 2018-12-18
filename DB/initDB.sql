USE [master]
GO

CREATE DATABASE [R-Ticket]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'R-Ticket', FILENAME = N'D:\Документы\Университет\5 семестр\БД\КП\DB\R-Ticket.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'R-Ticket_log', FILENAME = N'D:\Документы\Университет\5 семестр\БД\КП\DB\R-Ticket_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

ALTER DATABASE [R-Ticket] SET COMPATIBILITY_LEVEL = 140
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [R-Ticket].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [R-Ticket] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [R-Ticket] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [R-Ticket] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [R-Ticket] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [R-Ticket] SET ARITHABORT OFF 
GO

ALTER DATABASE [R-Ticket] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [R-Ticket] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [R-Ticket] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [R-Ticket] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [R-Ticket] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [R-Ticket] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [R-Ticket] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [R-Ticket] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [R-Ticket] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [R-Ticket] SET  DISABLE_BROKER 
GO

ALTER DATABASE [R-Ticket] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [R-Ticket] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [R-Ticket] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [R-Ticket] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [R-Ticket] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [R-Ticket] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [R-Ticket] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [R-Ticket] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [R-Ticket] SET  MULTI_USER 
GO

ALTER DATABASE [R-Ticket] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [R-Ticket] SET DB_CHAINING OFF 
GO

ALTER DATABASE [R-Ticket] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [R-Ticket] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [R-Ticket] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [R-Ticket] SET QUERY_STORE = OFF
GO

ALTER DATABASE [R-Ticket] SET  READ_WRITE 
GO

use [R-Ticket];

create table TrainType -- типы поездов (международный бизнес/эконом и т.п.)
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null
)

create table Station -- географические станции
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	[Description] text null,
	Latitude float not null,
	Longitude float not null,
	IsStation bit not null
)

create table Train -- поезда
(
	Id int identity(1,1) primary key,
	TypeId int foreign key references TrainType not null,
	[Number] nvarchar(5) unique not null,
	DepartureStationId int foreign key references Station not null,
	ArrivalStationId int foreign key references Station not null
)

create table [Routes] -- маршруты
(
	Id int identity(1,1) primary key,
	RoutesStationId int foreign key references RoutesStation not null,
	TrainId int foreign key references Train not null,
	DepartureTime time not null,
	ArrivalTime time not null,
)

create table RoutesStation
(
	Id int identity(1,1) primary key,
	DepartureStationId int foreign key references Station not null,
	ArrivalStationId int foreign key references Station not null
)

create table [WeekDay] -- дни недели
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(12) not null unique,
	[Code] nvarchar(2) not null unique
)

create table Shedule -- расписание под конкретный день (дату), поезд (вагоны)
(
	Id int identity(1,1) primary key,
	[Date] date not null unique
)

create table SheduleRoutes
(
	Id int identity(1,1) primary key,
	RoutesId int foreign key references [Routes] not null,
	SheduleId int foreign key references [Shedule] not null
)
select * from RoutesStation
select * from Station where Id = 33
select * from [Routes]
update RoutesStation
set ArrivalStationId = 33
where Id = 25
update [Routes]
set RoutesStationId = 7
where Id = 15
select * from Train where Id = 12
create table Cruising-- дни курсирования
(
	Id int identity(1,1) primary key,
	TrainId int foreign key references Train not null unique,
	IsDaily bit not null,
	IsEven bit null
)

create table WeekDayCruising
(
	Id int identity(1,1) primary key,
	CruisingId int foreign key references Cruising not null,
	WeekDayId int foreign key references [WeekDay] not null
)

create table PlaceType -- типы билетов (плацкарт, купе и т.п.)
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(70) not null,
	ShortName nvarchar(20) not null,
	Code nvarchar(2) not null,
	[Count] int not null
)

create table CarType -- С услугами
(
	Id int identity(1,1) primary key,
	[Code] nvarchar(5) not null unique,
	[Description] text not null
)

create table Car -- Вагоны
(
	Id int identity(1,1) primary key,
	[SerialNumber] nvarchar(10) not null,
	PlaceTypeId int foreign key references PlaceType not null
)

create table CarShedule
(
	Id int identity(1,1) primary key,
	[Number] int not null,
	CarId int foreign key references Car not null,
	CarTypeId int foreign key references CarType not null,
	SheduleRoutesId int foreign key references [SheduleRoutes] not null
)

create table [Space]
(
	Id int identity(1,1) primary key,
	[Number] int not null,
	CarSheduleId int foreign key references CarShedule not null,
	IsBusy bit not null default 0
)

create table Country
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	[Description] text null
)

create table UserDB
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(30) not null,
	[Password] nvarchar(30) not null
)

create table UserRole
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(20) not null,
	UserDBId int foreign key references UserDB not null
)

create table [User]
(
	Id int identity(1,1) primary key,
	FName nvarchar(50) not null,
	SName nvarchar(50) not null,
	MName nvarchar(50) null,
	Email nvarchar(50) not null,
	Birthday date not null,
	Sex bit not null,
	Passport nvarchar(30) not null,
	FNameEn nvarchar(50) not null,
	SNameEn nvarchar(50) not null,
	Telephone nvarchar(20) null,
	[Login] nvarchar(50) not null,
	[Password] nvarchar(30) not null,
	CountryId int foreign key references Country not null,
	RoleId int foreign key references UserRole not null
)

create table Ticket
(
	Id int identity(1,1) primary key,
	Price float not null,
	SpaceId int foreign key references [Space] not null,
	UserId int foreign key references [User] null
)

create table TicketHistory
(
	Id int identity(1,1) primary key,
	TicketId int foreign key references Ticket not null,
	[SellDate] datetime not null,
	[ReturnDate] datetime null
)