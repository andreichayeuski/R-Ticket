use [R-Ticket]
select * from Train
/*insert into TrainType
values ('Международные линии'),
('Межрегиональные линии бизнес-класса'),
('Межрегиональные линии экономкласса'),
('Региональные линии бизнес-класса'),
('Региональные линии экономкласса'),
('Городские линии')*/

--select * from TrainType

go
create procedure AddNewTrain
	@typeId int,
	@number nvarchar(5)
as
begin
	declare @countBefore int,
			@countAfter int,
			@result int
	set @countBefore = (select count(*) from Train)
	insert into [Train] (TypeId, Number)
	values (@typeId, @number)
	set @countAfter = (select count(*) from Train)
	set @result = @countAfter - @countBefore
	select @result
end


go
alter procedure GetTrainTypes
as
begin
	select * from TrainType;
end

exec GetTrainTypes
