use [R-Ticket]

go
create procedure GetCar
as
begin
	select c.Id as Id, c.SerialNumber as SerialNumber, p.ShortName as PlaceType from [Car] c
	join PlaceType p on p.Id = c.PlaceTypeId
end;
select * from CarShedule
update Car
set Id = 1
	select * from Train
go
create procedure AddCar
	@serialNumber nvarchar(10),
	@placeTypeId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from [Car])
	insert into [Car] (SerialNumber, PlaceTypeId)
	values (@serialNumber, @placeTypeId)
	set @countAfter = (select count(*) from [Car])
	set @result = @countAfter - @countBefore
	select @result as result
end;

go
create procedure GetPlaceType
as
begin
	select Id as Id, [Name] as [Name], 
	[ShortName] as [ShortName] from PlaceType
end;

go
create procedure GetCarType
as
begin
	select Id as Id, [Code] as [Code], 
	[Description] as [Description] from CarType
end;

go
create alter procedure GetCarOnShedule
@date date
as
begin
	select cs.Id as Id, cs.Number as OrderNumber, c.SerialNumber as SerialNumber,
	p.ShortName as PlaceType, ct.Code as CarType, t.Number as Number,
	s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, 
	type1.[Name] as [Type],
	s3.[Name] as DepStation, s4.[Name] as ArrStation,
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from CarShedule cs
		join Car c on c.Id = cs.CarId
		join PlaceType p on p.Id = c.PlaceTypeId 
		join CarType ct on ct.Id = cs.CarTypeId
		join SheduleRoutes sr on sr.Id = cs.SheduleRoutesId
		join [Routes] r on r.Id = sr.RoutesId
		join RoutesStation rs on rs.Id = r.RoutesStationId
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
		join Train t on t.Id = r.TrainId
		join Station s3 on s3.Id = t.DepartureStationId
		join Station s4 on s4.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
		where sr.SheduleId = (select Id from Shedule where [Date] = @date)
	order by r.DepartureTime asc
end;

go
create procedure GetCarSheduleByPk
@carSheduleId int
as
begin
	select cs.Id as Id, cs.Number as OrderNumber, c.SerialNumber as SerialNumber,
	p.ShortName as PlaceType, ct.Code as CarType, t.Number as Number,
	s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, 
	type1.[Name] as [Type], sh.[Date],
	s3.[Name] as DepStation, s4.[Name] as ArrStation,
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from CarShedule cs
		join Car c on c.Id = cs.CarId
		join PlaceType p on p.Id = c.PlaceTypeId 
		join CarType ct on ct.Id = cs.CarTypeId
		join SheduleRoutes sr on sr.Id = cs.SheduleRoutesId
		join [Routes] r on r.Id = sr.RoutesId
		join RoutesStation rs on rs.Id = r.RoutesStationId
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
		join Train t on t.Id = r.TrainId
		join Station s3 on s3.Id = t.DepartureStationId
		join Station s4 on s4.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
		join Shedule sh on sh.Id = sr.SheduleId
		where cs.Id = @carSheduleId
	order by r.DepartureTime asc
end;

go
create alter procedure GetCarSheduleByRoutes
@routesShedule int
as
begin
	select cs.Id as Id, cs.Number as OrderNumber, c.Id as CarId, c.SerialNumber as SerialNumber,
	p.ShortName as PlaceType, ct.Code as CarType
		from CarShedule cs
		join Car c on c.Id = cs.CarId
		join PlaceType p on p.Id = c.PlaceTypeId 
		join CarType ct on ct.Id = cs.CarTypeId
		where cs.SheduleRoutesId = @routesShedule
end;
select * from CarShedule
go
create procedure AddCarShedule
	@number int,
	@carId int,
	@carTypeId int,
	@sheduleRoutesId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from CarShedule)
	insert into CarShedule (Number, CarId, CarTypeId, SheduleRoutesId)
	values (@number, @carId, @carTypeId, @sheduleRoutesId)
	set @countAfter = (select count(*) from CarShedule)
	set @result = @countAfter - @countBefore
	select @result as result
end;

select * from CarShedule

select * from Shedule

select * from SheduleRoutes

