use [R-Ticket]
select * from Station

go
create procedure AddStation
	@name nvarchar(max),
	@description text,
	@latitude float,
	@longitude float
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Station)
	insert into [Station] ([Name], [Description], Latitude, Longitude)
	values (@name, @description, @latitude, @longitude)
	set @countAfter = (select count(*) from Station)
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetStation
as
begin
	select * from Station;
end

--update Station
--	set [Name] = 'Минск-Пассажирский'
--		where [Name] = 'Минск'