use [R-Ticket]

go
create procedure CreateBackup
as
begin
	backup database [R-Ticket]
	to disk = 'D:\Документы\Университет\5 семестр\БД\КП\DB\Backup_R-Ticket.Bak'  
		with FORMAT,  
		medianame = 'Z_SQLServerBackups',  
		name = 'Backup_R-Ticket';  
end

go
use [master];
go
create procedure RecoveryFromBackup
as
begin
	restore database [R-Ticket]
	from disk = 'D:\Документы\Университет\5 семестр\БД\КП\DB\Backup_R-Ticket.Bak'  
		with file = 1, recovery;  
end;