use [R-Ticket]

go
create procedure AddShedule
	@date date
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int,
			@sheduleId int
	set @countBefore = (select count(*) from Shedule)
	if ((select count(*) from Shedule where [Date] = @date) != 1)
	insert into [Shedule] ([Date])
	values (@date)
	set @sheduleId = (select Id from Shedule where [Date] = @date)
	set @countAfter = (select count(*) from Shedule)
	set @result = @countAfter - @countBefore
	if (@result = 1)
		exec UpdateSheduleRoutes @sheduleId, @date
	select @result as result
end;

select * from Shedule

go
create procedure ShowSheduleOnStation
	@StationId int
as
begin
	select * from [Routes]
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
create alter procedure ShowSheduleRoutesOnDate
@date date
as
begin
	select t.Id as Id, t.Number as Number, s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, type1.[Name] as [Type],
	s3.[Name] as DepStation, s4.[Name] as ArrStation,
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from Train t
		join Station s3 on s3.Id = t.DepartureStationId
		join Station s4 on s4.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
		join [Routes] r on r.TrainId = t.Id
		join RoutesStation rs on rs.Id = r.RoutesStationId
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
		join SheduleRoutes sr on sr.RoutesId = r.Id
		where sr.SheduleId = (select Id from Shedule where [Date] = @date)
	order by r.DepartureTime asc
end;

go
create procedure ShowSheduleRoutesByPk
@sheduleRoutesId int
as
begin
	select t.Id as Id, t.Number as Number, s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, type1.[Name] as [Type],
	s3.[Name] as DepStation, s4.[Name] as ArrStation,
	convert (varchar, r.DepartureTime, 108) as DepartureTime, 
	convert (varchar, r.ArrivalTime, 108) as ArrivalTime
		from Train t
		join Station s3 on s3.Id = t.DepartureStationId
		join Station s4 on s4.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
		join [Routes] r on r.TrainId = t.Id
		join RoutesStation rs on rs.Id = r.RoutesStationId
		join Station s1 on s1.Id = rs.DepartureStationId
		join Station s2 on s2.Id = rs.ArrivalStationId
		join SheduleRoutes sr on sr.RoutesId = r.Id
		where sr.Id = @sheduleRoutesId
	order by r.DepartureTime asc
end;

exec ShowSheduleRoutesByPk 9

go
create procedure UpdateSheduleRoutes
	@sheduleId int,
	@sheduleDate date
as 
begin
	declare @routesId int,
			@trainId int,
			@day int,
			@isDaily int
	declare RoutesCursor cursor for select Id, TrainId from [Routes]
    open RoutesCursor
        fetch next from RoutesCursor into @routesId, @trainId
		print @trainId
		print @routesId
		while @@FETCH_STATUS = 0
			begin
			select * from Cruising
				set @isDaily = (select IsDaily  from Cruising where TrainId = @trainId)
				print ('isDaily')
				print @isDaily
				print ('trainId')
				print @trainId
				print ('routesId')
				print @routesId
				if (select IsDaily from Cruising where TrainId = @trainId) = 1
					begin
					print '1'
						exec AddSheduleRoutes @routesId, @sheduleId
					end
				else
					begin
						set @day = datepart(dw, @sheduleDate)
						print('day')
						print(@day)
						print(@day % 2)
						if (@day % 2) = 0
							begin
							print('even')
								if (select IsEven from Cruising where TrainId = @trainId) = 1
									begin
									print 'yes even'
										exec AddSheduleRoutes @routesId, @sheduleId
									end
							end
						else
							begin
								print('not even')
								if (select IsEven from Cruising where TrainId = @trainId) = 0
									begin
									print 'yes not even'
										exec AddSheduleRoutes @routesId, @sheduleId
									end
								else
									begin
									print('TRAIN')
									print (@trainId)
									select * from WeekDayCruising
										if @day in (select WeekDayId from WeekDayCruising where CruisingId = (select Id from Cruising where TrainId = @trainId))
											begin
											print 'dayweek'
												exec AddSheduleRoutes @routesId, @sheduleId
											end
									end
							end
					end
					fetch next from RoutesCursor into @routesId, @trainId
			end
			select -1 as de
    close RoutesCursor;
end
select * from [Routes]
select * from SheduleRoutes
select * from Shedule
select * from WeekDayCruising
exec AddShedule '09-11-2018'
delete from Shedule where Id = 18