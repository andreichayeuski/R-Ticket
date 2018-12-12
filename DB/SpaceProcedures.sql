use [R-Ticket]

go
create procedure AddSpace
	@carSheduleId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@count int,
			@number int,
			@result int
	set @countBefore = (select count(*) from [Space])
	set @count = (select [Count] from PlaceType 
						where Id = (select PlaceTypeId from Car
										where Id = (select CarId from CarShedule
														where Id = @carSheduleId)))
	set @number = 1
	while @number <= @count
		begin
			insert into [Space] (Number, CarSheduleId)
				values (@number, @carSheduleId)
			SET @number = @number + 1
		end
	set @countAfter = (select count(*) from [Space])
	set @result = @countAfter - @countBefore
	select @result as result
end;

select * from [Space]

go
create alter procedure GetSpace
as
begin
	select count(s.Id) as [Count], s.CarSheduleId,
	cs.Id as Id, cs.Number as OrderNumber, c.SerialNumber as SerialNumber,
	p.ShortName as PlaceType, ct.Code as CarType, t.Number as Number,
	s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, 
	type1.[Name] as [Type],
	s3.[Name] as DepStation, s4.[Name] as ArrStation,
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from [Space] s
		join CarShedule cs on cs.Id = s.CarSheduleId
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
	where s.IsBusy != 1
	group by s.CarSheduleId, cs.Id, cs.Number, c.SerialNumber,
	p.ShortName, ct.Code, t.Number, s1.[Name], s2.[Name], 
	type1.[Name], s3.[Name], s4.[Name],	r.DepartureTime, 
	r.ArrivalTime
	order by r.DepartureTime asc
end

select * from CarShedule

go
create procedure GetSpacesInCar
@carSheduleId int
as
begin
	select * from [Space]
	where IsBusy != 1 and CarSheduleId = @carSheduleId
end