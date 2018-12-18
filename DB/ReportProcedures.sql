use [R-Ticket]

go
create procedure GetReportByDay
@day date
as
begin
	select sum(t.Price) as result from Ticket t
		where 
			Id in 
				(select TicketId from TicketHistory
					where 
						cast(SellDate as date) = @day
						and ReturnDate is null)
end

go
create procedure GetReportByPeriod
@dateStart date,
@dateEnd date
as
begin
	select sum(t.Price) as result from Ticket t
		where 
			Id in 
				(select TicketId from TicketHistory
					where cast(SellDate as date) 
							between @dateStart and @dateEnd
						and ReturnDate is null)
end

go
create procedure GetReportByTrain
@trainId int
as
begin
	select sum(t.Price) as result from Ticket t
		where 
			Id in 
				(select TicketId from TicketHistory
					where ReturnDate is null)
			and SpaceId in 
				(select Id from [Space]
					where CarSheduleId in 
						(select Id from CarShedule
							where SheduleRoutesId in 
								(select Id from SheduleRoutes
									where RoutesId in
										(select Id from [Routes]
											where TrainId = @trainId))))
end
select * from Routes