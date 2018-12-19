use [master]
grant execute on object::RecoveryFromBackup
    TO [adminR-Ticket];  
  

use [R-Ticket]
exec sp_addrolemember 'db_backupoperator', 'adminR-Ticket'

grant execute on object::AddCar
    TO [adminR-Ticket], [dispatcherR-Ticket];  
  
grant execute on object::AddCarShedule
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddCruising
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddMoreTickets
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddRoute
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddShedule
    TO [adminR-Ticket], [dispatcherR-Ticket];  
  
grant execute on object::AddSheduleRoutes
    TO [adminR-Ticket], [dispatcherR-Ticket];  
  
grant execute on object::AddSpace
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddStation
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddTrain
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::AddWeekDayCruising
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::BindRoutesStation
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::CreateBackup
    TO [adminR-Ticket];  

grant execute on object::CreateTicket
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::CreateUser
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetAvaivableTicketsInCar
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCar
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCarOnShedule
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCarSheduleByPk
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCarSheduleByRoutes
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCarType
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCountry
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetCruising
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetOneStation
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetPlaceType
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetReportByDay
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetReportByPeriod
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetReportByTrain
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetRole
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  
  
grant execute on object::GetRoutes
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetRoutesStation
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  
  
grant execute on object::GetSpace
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  
  
grant execute on object::GetSpacesInCar
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetStation
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetTicket
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetTrain
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetTrainById
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetTrainType
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetUser
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::GetWeekDay
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::LoginIntoRTicket
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  
  
grant execute on object::ShowSheduleRoutes
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  
 
grant execute on object::ShowSheduleRoutesByPk
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::ShowSheduleRoutesOnDate
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket], [defaultR-Ticket];  

grant execute on object::TakeTicket
    TO [adminR-Ticket], [dispatcherR-Ticket], [userR-Ticket];  

grant execute on object::UpdateSheduleRoutes
    TO [adminR-Ticket], [dispatcherR-Ticket];  

grant execute on object::ExportToXML
    TO [adminR-Ticket];  

grant execute on object::DeleteSpaceOnCar
    TO [adminR-Ticket], [dispatcherR-Ticket];  
