use [R-Ticket]

go
create procedure ShowSheduleOnStation
	@StationId int
as
begin
	return select * from [Routes]
		where (DepartureStationId = @StationId or ArrivalStationId = @StationId)
			and Id in (select RoutesId from [SheduleRoutes] 
				where SheduleId in (select Id from Shedule
										where [Date] = cast (GETDATE() as date)));
end;

go
create procedure AddNewRoute
	@depStationId int,
	@arrStationId int,
	@trainId int,
	@depTime time,
	@arrTime time
as
begin
	insert into [Routes]
	values (@depStationId, @arrStationId, @trainId, @depTime, @arrTime)
end