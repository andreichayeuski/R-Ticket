use [R-Ticket]

go
create procedure AddRoute
	@depStationId int,
	@arrStationId int,
	@trainId int,
	@depTime time,
	@arrTime time
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from [Routes])
	insert into [Routes]
	values (@depStationId, @arrStationId, @trainId, @depTime, @arrTime)
	set @countAfter = (select count(*) from [Routes])
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetRoutes
as
begin
	select r.Id as Id, t.Number as Number, s1.[Name] as DepartureStation, 
	s2.[Name] as ArrivalStation, convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from [Routes] r
		join Station s1 on s1.Id = r.DepartureStationId
		join Station s2 on s2.Id = r.ArrivalStationId
		join Train t on t.Id = r.TrainId
end