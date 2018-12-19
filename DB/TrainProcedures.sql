use [R-Ticket]

go
create procedure AddTrain
	@typeId int,
	@number nvarchar(5),
	@departureStationId int,
	@arrivalStationId int
as
begin
	begin try
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Train)
	insert into [Train] (TypeId, Number, DepartureStationId, ArrivalStationId)
	values (@typeId, @number, @departureStationId, @arrivalStationId)
	set @countAfter = (select count(*) from Train)
	set @result = @countAfter - @countBefore
	select @result as result
	end try
	begin catch
		select -1 as result
	end catch
end


go
create procedure GetTrainType
as
begin
	select * from TrainType;
end


go
create procedure GetTrain
as
begin
	select t.Id as Id, t.Number as Number, s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, type1.[Name] as [Type]
		from Train t
		join Station s1 on s1.Id = t.DepartureStationId
		join Station s2 on s2.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
	order by t.Number desc
end

go
create procedure GetTrainById
	@trainId int
as
begin
	select t.Id as Id, t.Number as Number, s1.[Name] as DepartureStation, s2.[Name] as ArrivalStation, type1.[Name] as [Type]
		from Train t
		join Station s1 on s1.Id = t.DepartureStationId
		join Station s2 on s2.Id = t.ArrivalStationId
		join TrainType type1 on type1.Id = t.TypeId
	where t.Id = @trainId
	order by t.Number desc
end
