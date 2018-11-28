use [R-Ticket]

go
create procedure AddShedule
	@date date
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Shedule)
	if ((select count(*) from Shedule where [Date] = @date) != 1)
	insert into [Shedule] ([Date])
	values (@date)
	set @countAfter = (select count(*) from Shedule)
	set @result = @countAfter - @countBefore
	select @result as result
end;

select * from Shedule

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
create procedure AddSheduleRoutes
	@routesId int,
	@sheduleId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from SheduleRoutes)
	insert into [SheduleRoutes] (RoutesId, SheduleId)
	values (@routesId, @sheduleId)
	set @countAfter = (select count(*) from SheduleRoutes)
	set @result = @countAfter - @countBefore
	select @result as result
end;


go
create procedure ShowSheduleRoutes
as
begin
	select * from [SheduleRoutes]
end;
