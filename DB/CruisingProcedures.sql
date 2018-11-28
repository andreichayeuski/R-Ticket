use [R-Ticket]

go
create alter procedure GetCruising
as
begin
	select c.Id as Id, c.IsDaily as IsDaily, c.IsEven as IsEven, t.Number as Number, 
	s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, type1.[Name] as [Type]
		from Cruising c
		join Train t on t.Id = c.TrainId
		join Station s1 on s1.Id = t.DepartureStationId
		join Station s2 on s2.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
	order by t.Number desc
end;

go
create procedure GetWeekDay
as
begin
	select * from [WeekDay]
end;

go
create alter procedure AddCruising
	@trainId int,
	@isDaily int,
	@isEven int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Cruising)
	if @isEven != 2
	begin
	insert into [Cruising] (TrainId, IsDaily, IsEven)
	values (@trainId, @isDaily, @isEven)
	end
	else
	begin
	insert into [Cruising] (TrainId, IsDaily)
	values (@trainId, @isDaily)
	end
	set @countAfter = (select count(*) from Cruising)
	set @result = @countAfter - @countBefore
	select @result as result
end;


go
create procedure AddWeekDayCruising
	@trainId int,
	@weekDayId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from [WeekDayCruising])
	insert into [WeekDayCruising] (CruisingId, WeekDayId)
	values ((select Id from Cruising where TrainId = @trainId), @weekDayId)
	set @countAfter = (select count(*) from [WeekDayCruising])
	set @result = @countAfter - @countBefore
	select @result as result
end;
