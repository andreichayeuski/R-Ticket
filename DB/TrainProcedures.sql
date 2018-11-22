use [R-Ticket]
select * from Train

go
create procedure AddNewTrain
	@typeId int,
	@number nvarchar(5),
	@departureStationId int,
	@arrivalStationId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Train)
	insert into [Train] (TypeId, Number, DepartureStationId, ArrivalStationId)
	values (@typeId, @number, @departureStationId, @arrivalStationId)
	set @countAfter = (select count(*) from Train)
	set @result = @countAfter - @countBefore
	select @result as result
end


go
create procedure GetTrainTypes
as
begin
	select * from TrainType;
end

