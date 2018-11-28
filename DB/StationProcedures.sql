use [R-Ticket]
select * from Station

go
create procedure AddStation
	@name nvarchar(max),
	@description text,
	@latitude float,
	@longitude float,
	@isStation bit
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Station)
	insert into [Station] ([Name], [Description], Latitude, Longitude, IsStation)
	values (@name, @description, @latitude, @longitude, @isStation)
	set @countAfter = (select count(*) from Station)
	set @result = @countAfter - @countBefore
	select @result as result
end

go
create procedure GetStation
as
begin
	select * from Station
		order by [Name]
end

go
create procedure GetOneStation
	@id int
as
begin
	select * from Station
		where Id = @id;
end