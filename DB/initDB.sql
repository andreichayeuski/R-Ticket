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
	[Type] nvarchar(max) not null
)

create table Station -- географические станции
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	[Description] nvarchar(max) null,
	Latitude float not null,
	Longitude float not null
)

create table Train -- поезда
(
	Id int identity(1,1) primary key,
	TypeId int foreign key references TrainType not null,
	[Number] nvarchar(5) unique not null
)

create table [Routes] -- маршруты
(
	Id int identity(1,1) primary key,
	DepartureStationid int foreign key references Station not null,
	ArrivalStationId int foreign key references Station not null,
	TrainId int foreign key references Train not null,
	DepartureDate datetime not null,
	ArrivalDate datetime not null
)

create table WeekDay -- дни недели
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null
)

create table Shedule -- расписание под конкретный день (дату), поезд (вагоны)
(
	Id int identity(1,1) primary key,
	TrainId int foreign key references Train not null,
)

create table DaysOfRunning -- дни курсирования
(
	Id int identity(1,1) primary key,
	TrainsID int foreign key references Train not null,
	WeekDayId int foreign key references WeekDay not null
)

create table PlacesType -- типы билетов (плацкарт, купе и т.п.)
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	Code nvarchar(2) not null
)

create table SpacesType -- типы мест (нижний, верхний, боковой)
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null
)

create table Car -- Вагоны
(
	Id int identity(1,1) primary key,
	PlacesTypeId int foreign key references PlacesType,
	SheduleId int foreign key references Shedule
)

create table [Space]
(
	Id int identity(1,1) primary key,
	CarId int foreign key references Car,
	SpacesTypeId int foreign key references SpacesType,
)

create table Country
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	[Description] nvarchar(max) null
)

create table UserDB
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null,
	[Password] nvarchar(max) not null
)

create table UserRole
(
	Id int identity(1,1) primary key,
	[Name] nvarchar(max) not null
)

create table [User]
(
	Id int identity(1,1) primary key,
	FName nvarchar(max) not null,
	SName nvarchar(max) not null,
	MName nvarchar(max) not null,
	Email nvarchar(max) not null,
	Birthday datetime not null,
	Sex bit not null,
	Passport nvarchar(max) not null,
	FNameEn nvarchar(max) not null,
	SNameEn nvarchar(max) not null,
	Telephone nvarchar(max) not null,
	[Login] nvarchar(max) not null,
	[Password] nvarchar(30) not null

)