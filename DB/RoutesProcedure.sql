use [R-Ticket]

go
create procedure AddRoute
	@depStationId int,
	@arrStationId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from [RoutesStation])
	insert into [RoutesStation]
	values (@depStationId, @arrStationId)
	set @countAfter = (select count(*) from [RoutesStation])
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetRoutes
as
begin
	select r.Id as Id, t.Number as Number, s3.[Name] as DepStation, s4.[Name] as ArrStation,
	s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, 
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from [Routes] r
		join RoutesStation rs on rs.Id = r.RoutesStationId
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
		join Train t on t.Id = r.TrainId
		join Station s3 on s3.Id = t.DepartureStationId
		join Station s4 on s4.Id = t.ArrivalStationId
	order by t.Number
end

go
create procedure GetRoutesStation
as
begin
	select rs.Id as Id, s1.[Name] as DepartureStation, 
	s2.[Name] as ArrivalStation
		from RoutesStation rs
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
	order by s1.Name
end

go
create procedure BindRoutesStation
	@routesStationId int,
	@trainId int,
	@depTime time,
	@arrTime time
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from [Routes])
	insert into [Routes] (RoutesStationId, TrainId, DepartureTime, ArrivalTime)
	values (@routesStationId, @trainId, @depTime, @arrTime)
	set @countAfter = (select count(*) from [Routes])
	set @result = @countAfter - @countBefore
	select @result as result
end

select * from [Routes]