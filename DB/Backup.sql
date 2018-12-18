use [R-Ticket]

go
create procedure CreateBackup
as
begin
	backup database [R-Ticket]
	to disk = 'D:\���������\�����������\5 �������\��\��\DB\Backup_R-Ticket.Bak'  
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
	from disk = 'D:\���������\�����������\5 �������\��\��\DB\Backup_R-Ticket.Bak'  
		with file = 1, recovery;  
end;