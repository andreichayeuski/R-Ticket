use [R-Ticket]

go
create procedure GetCar
as
begin
	select c.SerialNumber as SerialNumber, p.ShortName as PlaceType from [Car] c
	join PlaceType p on p.Id = c.PlaceTypeId
end;

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