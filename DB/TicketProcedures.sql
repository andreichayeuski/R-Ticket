use [R-Ticket]

go
create procedure CreateTicket
@price float,
@spaceId int,
@userId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Ticket)
	insert into Ticket (Price, SpaceId, UserId)
		values (@price, @spaceId, @userId)
	set @countAfter = (select count(*) from Ticket)
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetTicket
as
begin
	select * from Ticket
end

go
create alter procedure AddMoreTickets
	@price float,
	@carSheduleId int
as
begin
	declare @countBefore int,
			@countAfter int,
			@count int,
			@number int,
			@spaceId int,
			@result int
	set @countBefore = (select count(*) from Ticket)
	set @count = (select [Count] from PlaceType 
						where Id = (select PlaceTypeId from Car
										where Id = (select CarId from CarShedule
														where Id = @carSheduleId)))
	declare GetSpacesForCar cursor
		for select Id from [Space] 
			where CarSheduleId = @carSheduleId
	open GetSpacesForCar
	set @number = 1
	while @number <= @count
		begin
			fetch next from GetSpacesForCar into @spaceId;
			exec CreateTicket @price, @spaceId, null
			SET @number = @number + 1
		end
	set @countAfter = (select count(*) from Ticket)
	set @result = @countAfter - @countBefore
	select @result as result
end;
select * from Car
select * from PlaceType


go
create procedure GetAvaivableTicketsInCar
@carSheduleId int
as
begin
	select t.Price, s.Number from Ticket t
	join [Space] s on s.Id = t.SpaceId
	where s.IsBusy != 1 and s.CarSheduleId = @carSheduleId
end